import * as THREE from 'three';
import { mulberry, clamp, lerp } from './shared.js';
import { terrainY, pondF, PILES } from './terrain.js';
import { patch } from './materials.js';

const wFn = (s) => 0.014 + 0.092 * Math.pow(Math.sin(Math.PI * Math.min(1, Math.pow(s, 0.85) * 0.98)), 0.75);

function koiGeometry() {
  const pos = [], kind = [], idx = [];
  const NS = 28, R = 12;
  const push = (x, y, z, k) => { pos.push(x, y, z); kind.push(k); return pos.length / 3 - 1; };
  for (let i = 0; i <= NS; i++) {
    const s = i / NS, x = -0.5 + s, w = wFn(s), hh = w * 0.95;
    for (let j = 0; j < R; j++) {
      const a = (j / R) * Math.PI * 2, c = Math.cos(a), sn = Math.sin(a);
      push(x, c * hh * (c > 0 ? 1.08 : 0.8), sn * w, 0);
    }
  }
  for (let i = 0; i < NS; i++) for (let j = 0; j < R; j++) {
    const a = i * R + j, b = i * R + (j + 1) % R, c = (i + 1) * R + j, d = (i + 1) * R + (j + 1) % R;
    idx.push(a, c, b, b, c, d);
  }
  const tipB = push(-0.5 - 0.0, 0, 0, 0), tipH = push(0.515, -0.004, 0, 0);
  for (let j = 0; j < R; j++) { idx.push(tipB, j, (j + 1) % R); idx.push(tipH, NS * R + (j + 1) % R, NS * R + j); }

  const grid = (fn, nu, nv, k) => {
    const base = pos.length / 3;
    for (let i = 0; i <= nu; i++) for (let j = 0; j <= nv; j++) { const p = fn(i / nu, j / nv); push(p[0], p[1], p[2], k); }
    for (let i = 0; i < nu; i++) for (let j = 0; j < nv; j++) {
      const a = base + i * (nv + 1) + j, b = a + 1, c = a + nv + 1, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  };
  grid((u, v) => {
    const c = v * 2 - 1;
    const ext = 0.014 + 0.16 * Math.pow(u, 0.85);
    const xx = -0.5 - 0.3 * u * (1 - 0.2 * (1 - Math.abs(c)) * u);
    return [xx, c * ext, 0];
  }, 8, 8, 1);
  grid((u, v) => {
    const x = 0.14 - 0.46 * u, s = x + 0.5;
    const top = wFn(s) * 0.95 * 1.05;
    const hgt = 0.075 * Math.sin(Math.PI * Math.pow(u, 0.7)) * (1 - 0.3 * u) + 0.01;
    return [x, top * 0.9 + hgt * v, 0];
  }, 8, 2, 1);
  for (const sd of [-1, 1]) {
    grid((u, v) => {
      const x = lerp(0.24, 0.1, v) - u * 0.1 * v;
      return [x - u * 0.1, -0.04 - u * 0.025, sd * (0.075 + u * 0.15 * (0.4 + 0.6 * v))];
    }, 3, 3, 1);
  }
  const eyes = new THREE.SphereGeometry(0.016, 6, 5);
  for (const sd of [-1, 1]) {
    const base = pos.length / 3;
    const p = eyes.attributes.position;
    for (let i = 0; i < p.count; i++) push(p.getX(i) + 0.42, p.getY(i) + 0.03, p.getZ(i) + sd * 0.062, 2);
    const ix = eyes.index.array;
    for (let i = 0; i < ix.length; i++) idx.push(base + ix[i]);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aKind', new THREE.Float32BufferAttribute(kind, 1));
  const aS = new Float32Array(pos.length / 3);
  for (let i = 0; i < aS.length; i++) aS[i] = clamp((0.42 - pos[i * 3]) / 1.2, 0, 1);
  g.setAttribute('aS', new THREE.BufferAttribute(aS, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

const FISH_VS = `attribute float aS; attribute float aKind; varying vec3 vOP; varying float vKind; uniform float uPhase; uniform float uAmp;`;
const FISH_BEGIN = `
vOP = position; vKind = aKind;
float sw = pow(aS, 1.4);
transformed.z += uAmp * sin(uPhase - position.x*5.5) * sw * 0.15;
transformed.z += uAmp * 0.012 * sin(uPhase + 1.6) * (1.0 - aS);
if (aKind > 0.5 && aKind < 1.5 && abs(position.z) > 0.05) transformed.y += sin(uPhase*0.5) * 0.02 * (abs(position.z) - 0.05) * 5.0;
`;
const FISH_FS_PARS = `varying vec3 vOP; varying float vKind; uniform float uSeed; uniform float uVar; uniform float uBlack;`;
const FISH_FS_COLOR = `
{
  vec2 q = vec2(vOP.x*5.5, vOP.z*9.0 + vOP.y*6.0 + uSeed*3.0);
  float n = fbm(q + uSeed*7.0);
  vec3 white = vec3(0.92,0.89,0.82);
  vec3 red = mix(vec3(0.85,0.2,0.03), vec3(0.96,0.48,0.07), uVar);
  float rm = smoothstep(0.48, 0.55, n + 0.12*smoothstep(0.1,0.5,vOP.x));
  vec3 c = mix(white, red, rm);
  float bl = smoothstep(0.67, 0.72, fbm(vec2(vOP.x*8.0, vOP.z*13.0 + vOP.y*9.0) + uSeed*11.0 + 4.0)) * uBlack;
  c = mix(c, vec3(0.025), bl);
  c = mix(c, white, smoothstep(-0.02, -0.1, vOP.y)*0.7);
  if (vKind > 0.5 && vKind < 1.5) c = mix(c, vec3(1.0,0.78,0.5), 0.35);
  if (vKind > 1.5) c = vec3(0.01);
  diffuseColor.rgb = pow(c, vec3(2.2));
}
`;

export class FishSystem {
  constructor(scene, ctx) {
    this.ctx = ctx;
    this.geo = koiGeometry();
    this.fish = [];
    const rnd = mulberry(404);
    const defs = [[0.88, 0.1, 0.0], [0.72, 0.55, 0.7], [0.95, 0.2, 0.5], [0.66, 0.85, 0.0], [0.8, 0.3, 0.9], [0.7, 0.95, 0.4], [0.9, 0.0, 0.0]];
    defs.forEach((d, i) => {
      const u = { uPhase: { value: rnd() * 6 }, uAmp: { value: 0.8 }, uSeed: { value: rnd() * 10 }, uVar: { value: d[1] }, uBlack: { value: d[2] } };
      const mat = patch(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38, metalness: 0, side: THREE.DoubleSide }), {
        vsPars: FISH_VS, vsBegin: FISH_BEGIN, fsPars: FISH_FS_PARS, fsColor: FISH_FS_COLOR, uniforms: u, key: 'fish',
      });
      const mesh = new THREE.Mesh(this.geo, mat);
      mesh.rotation.order = 'YZX';
      mesh.scale.setScalar(d[0]);
      mesh.castShadow = true; mesh.layers.enable(1); mesh.frustumCulled = false;
      scene.add(mesh);
      let x = 0, z = 0;
      for (let t = 0; t < 200; t++) { x = (rnd() - 0.5) * 9; z = (rnd() - 0.5) * 7; if (terrainY(x, z) < -0.8 && !this.nearPile(x, z, 0.8)) break; }
      this.fish.push({
        mesh, u, scale: d[0], x, z, y: -0.5 - rnd() * 0.3, yaw: rnd() * 6.28, speed: 0.3, pitch: 0, roll: 0,
        state: 'cruise', stateT: 0, tx: 0, tz: 0, tT: 0, pref: rnd(), flee: 0, eat: 0, wakeT: 0, rate: 0,
      });
    });
  }

  nearPile(x, z, r) { return PILES.some(p => Math.hypot(p.x - x, p.z - z) < r); }

  scare(x, z, r = 5.5) {
    for (const f of this.fish) {
      const d = Math.hypot(f.x - x, f.z - z);
      if (d < r) {
        f.state = 'flee'; f.stateT = 1.6 + Math.random() * 1.6 + (r - d) * 0.15;
        f.fx = f.x - x; f.fz = f.z - z; f.fyaw = Math.atan2(f.fz, f.fx) + (Math.random() - 0.5) * 0.7;
        f.speed = Math.max(f.speed, 1.6 + Math.random() * 0.8);
      }
    }
  }

  pickTarget(f) {
    for (let t = 0; t < 40; t++) {
      const x = (Math.random() - 0.5) * 10, z = (Math.random() - 0.5) * 8;
      if (terrainY(x, z) < -0.7 && !this.nearPile(x, z, 0.5)) { f.tx = x; f.tz = z; f.tT = 4 + Math.random() * 6; return; }
    }
    f.tx = 0; f.tz = 0; f.tT = 3;
  }

  update(dt, t) {
    const { sim, food } = this.ctx;
    for (const f of this.fish) {
      f.stateT -= dt; f.tT -= dt; f.eat -= dt; f.wakeT -= dt;
      let desired = f.yaw, tspeed = 0.35 + 0.15 * Math.sin(t * 0.3 + f.pref * 9), ty = -0.3 - f.pref * 0.45, turn = 2.0;
      if (f.state === 'flee' && f.stateT <= 0) f.state = 'cruise';
      let target = null;
      if (f.state === 'cruise' && food) target = food.nearest(f.x, f.z, 8);
      if (f.state === 'flee') {
        desired = f.fyaw; tspeed = 1.9; ty = -0.6 - f.pref * 0.3; turn = 6;
      } else if (target) {
        const dx = target.x - f.x, dz = target.z - f.z, d = Math.hypot(dx, dz);
        desired = Math.atan2(dz, dx);
        tspeed = d > 2 ? 1.0 : d > 0.6 ? 0.55 : 0.28;
        if (d < 1.4) ty = -0.045;
        turn = 4;
        const mx = f.x + Math.cos(f.yaw) * 0.42 * f.scale, mz = f.z + Math.sin(f.yaw) * 0.42 * f.scale;
        const md = Math.hypot(target.x - mx, target.z - mz);
        if (md < 0.13 && f.y > -0.13 && f.eat <= 0) {
          food.eat(target);
          sim.impulse(mx, mz, 0.005, 0.045);
          this.ctx.splash?.mouth(mx, mz);
          f.eat = 0.45; f.pitch = 0.35;
        }
      } else {
        if (f.tT <= 0) this.pickTarget(f);
        const dx = f.tx - f.x, dz = f.tz - f.z;
        desired = Math.atan2(dz, dx);
        if (Math.hypot(dx, dz) < 0.8) f.tT = 0;
      }
      const lx = f.x + Math.cos(f.yaw) * 0.9, lz = f.z + Math.sin(f.yaw) * 0.9;
      const ahead = -terrainY(lx, lz);
      if (ahead < (f.state === 'flee' ? 0.25 : 0.45) && !(target && ahead > 0.15)) {
        const e = 0.4;
        const gx = -terrainY(f.x + e, f.z) + terrainY(f.x - e, f.z), gz = -terrainY(f.x, f.z + e) + terrainY(f.x, f.z - e);
        const w = clamp((0.6 - ahead) * 2.4, 0, 1);
        const away = Math.atan2(gz, gx);
        desired = lerpAngle(desired, away, w);
        turn = Math.max(turn, 3.5); tspeed = Math.min(tspeed, 0.45);
      }
      for (const p of PILES) {
        const dx = p.x - f.x, dz = p.z - f.z, d = Math.hypot(dx, dz);
        if (d < 0.9 && f.y > -1.7) {
          const ang = Math.atan2(dz, dx), rel = angDiff(ang, f.yaw);
          if (Math.abs(rel) < 1.2) desired = lerpAngle(desired, f.yaw - Math.sign(rel || 1) * 1.0, 0.7);
        }
      }
      for (const o of this.fish) if (o !== f) {
        const dx = o.x - f.x, dz = o.z - f.z, d = Math.hypot(dx, dz);
        if (d < 0.7 && Math.abs(o.y - f.y) < 0.35) desired = lerpAngle(desired, Math.atan2(-dz, -dx), 0.35);
      }
      const diff = angDiff(desired, f.yaw);
      const rate = clamp(diff * turn, -3.2, 3.2);
      f.yaw += rate * dt;
      f.rate = lerp(f.rate, rate, 0.1);
      f.speed += (tspeed - f.speed) * (1 - Math.exp(-dt * (f.state === 'flee' ? 1.2 : 1.5)));
      f.x += Math.cos(f.yaw) * f.speed * dt; f.z += Math.sin(f.yaw) * f.speed * dt;
      const gy = terrainY(f.x, f.z);
      if (gy > -0.2) { f.x -= Math.cos(f.yaw) * f.speed * dt * 1.5; f.z -= Math.sin(f.yaw) * f.speed * dt * 1.5; f.yaw += 1.5 * dt; }
      const minY = gy + 0.12 * f.scale + 0.06;
      ty = Math.max(ty, minY); ty = Math.min(ty, -0.04);
      const vy = (ty - f.y) * 1.6;
      f.y += vy * dt;
      f.pitch += ((clamp(vy * 0.7, -0.3, 0.3) + (f.eat > 0 ? 0.25 : 0)) - f.pitch) * (1 - Math.exp(-dt * 5));
      f.roll += (clamp(-f.rate * 0.12, -0.35, 0.35) - f.roll) * (1 - Math.exp(-dt * 4));
      f.u.uPhase.value += dt * (4.0 + f.speed * 7.5);
      f.u.uAmp.value += ((0.45 + Math.min(f.speed, 2.2) * 0.65) - f.u.uAmp.value) * 0.1;

      if (f.y > -0.2 && f.speed > 0.45 && f.wakeT <= 0) {
        f.wakeT = 0.16;
        sim.impulse(f.x + Math.cos(f.yaw) * 0.25, f.z + Math.sin(f.yaw) * 0.25, 0.0012 * Math.min(f.speed, 1.8), 0.07);
      }
      f.mesh.position.set(f.x, f.y, f.z);
      f.mesh.rotation.set(f.roll, -f.yaw, f.pitch);
    }
  }
}

function angDiff(a, b) { let d = a - b; while (d > Math.PI) d -= 6.2832; while (d < -Math.PI) d += 6.2832; return d; }
function lerpAngle(a, b, t) { return a + angDiff(b, a) * t; }
