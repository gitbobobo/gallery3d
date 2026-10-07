import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { heightAt, PILINGS } from './pond.js';
import { rng } from './noise.js';
import { patchMaterial, patchedDepthMaterial, setLayers, LAYER } from './shared.js';

function bodyGeometry() {
  const nu = 30, nv = 16;
  const pos = [], idx = [];
  const shape = (u) => Math.pow(Math.max(Math.sin(Math.PI * Math.pow(u, 0.72)), 0), 0.62);
  for (let i = 0; i <= nu; i++) {
    const u = 0.015 + (i / nu) * 0.975;
    const x = -0.5 + u;
    const s = shape(u);
    const hy = 0.105 * s, hz = 0.07 * s;
    const yc = 0.008 * s;
    for (let j = 0; j <= nv; j++) {
      const a = (j / nv) * Math.PI * 2;
      let y = Math.sin(a) * hy;
      if (y < 0) y *= 0.85;
      pos.push(x, y + yc, Math.cos(a) * hz);
    }
  }
  for (let i = 0; i < nu; i++)
    for (let j = 0; j < nv; j++) {
      const a = i * (nv + 1) + j, b = a + nv + 1;
      idx.push(a, a + 1, b, b, a + 1, b + 1);
    }
  // nose cap
  const tip = pos.length / 3;
  pos.push(0.5, 0.004, 0);
  const last = nu * (nv + 1);
  for (let j = 0; j < nv; j++) idx.push(last + j, tip, last + j + 1);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  g.setAttribute('aFin', new THREE.Float32BufferAttribute(new Float32Array(pos.length / 3), 1));
  return g;
}

function finGrid(fn, nu, nv) {
  const pos = [], idx = [];
  for (let i = 0; i <= nu; i++)
    for (let j = 0; j <= nv; j++) {
      const p = fn(i / nu, j / nv);
      pos.push(p[0], p[1], p[2]);
    }
  for (let i = 0; i < nu; i++)
    for (let j = 0; j < nv; j++) {
      const a = i * (nv + 1) + j, b = a + nv + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  g.setAttribute('aFin', new THREE.Float32BufferAttribute(new Float32Array(pos.length / 3).fill(1), 1));
  return g;
}

function koiGeometry() {
  const body = bodyGeometry();
  const tail = finGrid((s, t) => {
    const tt = t * 2 - 1;
    const span = 0.025 + s * 0.15;
    const len = 0.26 * (0.55 + 0.45 * Math.pow(Math.abs(tt), 1.3));
    return [-0.47 - s * len, tt * span, 0];
  }, 6, 10);
  const dorsal = finGrid((s, t) => {
    const x = 0.12 - s * 0.42;
    const h = 0.055 * Math.sin(Math.PI * Math.min(1, s * 0.9 + 0.1)) * (1 - s * 0.3);
    const base = 0.1 * Math.pow(Math.max(Math.sin(Math.PI * Math.pow(x + 0.5, 0.72)), 0), 0.62);
    return [x - t * 0.03, base - 0.004 + t * h, 0];
  }, 8, 3);
  const pect = (k) =>
    finGrid((s, t) => {
      const tt = t * 2 - 1;
      const len = 0.11 * (1 - Math.abs(tt) * 0.4);
      return [0.22 - s * len * 0.7 + tt * 0.02, -0.055 - s * len * 0.45, k * (0.045 + s * len * 0.6)];
    }, 4, 4);
  const pelvic = (k) =>
    finGrid((s, t) => {
      const tt = t * 2 - 1;
      return [-0.02 - s * 0.06 + tt * 0.012, -0.075 - s * 0.03, k * (0.02 + s * 0.035)];
    }, 3, 3);
  return mergeGeometries([body, tail, dorsal, pect(1), pect(-1), pelvic(1), pelvic(-1)]);
}

export class Fishes {
  constructor(count, sim, quality) {
    this.sim = sim;
    const r = (this.r = rng(4242));
    this.fish = [];
    for (let i = 0; i < count; i++) {
      const ang = r() * Math.PI * 2;
      const rad = 1 + r() * 3.5;
      this.fish.push({
        pos: new THREE.Vector3(Math.cos(ang) * rad, -0.45 - r() * 0.3, Math.sin(ang) * rad),
        yaw: r() * Math.PI * 2,
        pitch: 0,
        speed: 0.2,
        turn: 0,
        scale: 0.55 + r() * 0.25,
        phase: r() * 10,
        seed: i / count + r() * 0.05,
        kind: i % 6,
        state: 'wander',
        target: null,
        timer: 0,
        cautious: 0,
        mouthT: 0,
        pellet: null,
        cool: 0,
        speedMul: 0.85 + r() * 0.3,
      });
    }
    const geo = koiGeometry();
    const anim = new Float32Array(count * 4);
    this.anim = new THREE.InstancedBufferAttribute(anim, 4);
    this.anim.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute('aAnim', this.anim);
    const kinds = new Float32Array(count);
    this.fish.forEach((f, i) => (kinds[i] = f.kind + f.seed));
    geo.setAttribute('aKind', new THREE.InstancedBufferAttribute(kinds, 1));

    const bend = /* glsl */ `
      float xl = transformed.x;
      float tailK = clamp((0.3 - xl) / 1.05, 0.0, 1.0);
      float sw = aAnim.y * (tailK * tailK * 1.1 + 0.04) * sin(aAnim.x - xl * 6.5);
      float bnd = aAnim.z * (xl - 0.15) * (xl - 0.15);
      transformed.z += sw + bnd;
      // pectoral fin paddling
      if (aFin > 0.5 && xl > 0.05 && transformed.y < -0.04) {
        transformed.y += sin(aAnim.x * 0.5 + sign(transformed.z) * 1.5) * 0.012 * abs(transformed.z) * 10.0;
      }
    `;
    const opts = {
      vertHead: 'attribute vec4 aAnim; attribute float aFin; attribute float aKind; varying vec3 vLocal; varying float vFin; varying float vKind;',
      begin: bend + 'vLocal = position; vFin = aFin; vKind = aKind;',
      underwater: true,
      fragHead: 'varying vec3 vLocal; varying float vFin; varying float vKind; float gMetal;',
      fragColor: /* glsl */ `
        float kind = floor(vKind);
        float seed = fract(vKind) * 37.0;
        vec3 white = vec3(0.93, 0.91, 0.86);
        vec3 red = vec3(0.82, 0.18, 0.04);
        vec3 orng = vec3(0.98, 0.45, 0.07);
        vec3 blk = vec3(0.025, 0.022, 0.02);
        vec3 gold = vec3(1.0, 0.68, 0.22);
        vec2 pp = vec2(vLocal.x * 6.5 + seed, vLocal.y * 9.0 + abs(vLocal.z) * 5.0 + seed * 0.7);
        float n = fbm3(pp);
        float n2 = fbm3(pp * 2.3 + 11.0);
        float top = smoothstep(-0.05, 0.02, vLocal.y);
        vec3 c = white;
        gMetal = 0.0;
        if (kind < 0.5) { c = mix(white, red, smoothstep(0.48, 0.53, n) * top); }
        else if (kind < 1.5) { c = mix(white, red, smoothstep(0.5, 0.55, n) * top); c = mix(c, blk, smoothstep(0.7, 0.73, n2) * top); }
        else if (kind < 2.5) { c = blk; c = mix(c, red, smoothstep(0.52, 0.56, n) * top); c = mix(c, white, smoothstep(0.62, 0.66, n2)); }
        else if (kind < 3.5) { c = gold; gMetal = 0.55; }
        else if (kind < 4.5) { c = orng * (0.85 + 0.2 * n2); }
        else { c = white; float hd = length((vLocal.xy - vec2(0.3, 0.07)) * vec2(1.0, 1.6)); c = mix(red, c, smoothstep(0.06, 0.075, hd)); }
        // belly lighter
        c = mix(c, white * 0.95, smoothstep(-0.02, -0.08, vLocal.y) * 0.65 * (kind > 1.5 && kind < 2.5 ? 0.5 : 1.0));
        // scales reticulation
        float sc = sin(vLocal.x * 160.0 + abs(vLocal.z) * 60.0) * sin(vLocal.y * 160.0 + vLocal.x * 80.0);
        c *= 0.92 + 0.08 * sc * (1.0 - vFin);
        // fins: translucent white with body tint
        if (vFin > 0.5) {
          float ray = 0.85 + 0.15 * sin(atan(vLocal.y, vLocal.x + 0.45) * 60.0);
          c = mix(white, c, 0.35) * ray;
        }
        // eyes
        vec2 e = vec2(vLocal.x - 0.41, vLocal.y - 0.022);
        float eye = smoothstep(0.016, 0.011, length(e)) * step(0.01, abs(vLocal.z));
        c = mix(c, vec3(0.02), eye);
        diffuseColor.rgb = c;
      `,
      fragNormal: 'metalnessFactor = gMetal; roughnessFactor = mix(0.32, 0.55, vFin);',
    };
    const mat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.35 });
    patchMaterial(mat, opts);
    this.mesh = new THREE.InstancedMesh(geo, mat, count);
    this.mesh.castShadow = true;
    this.mesh.frustumCulled = false;
    this.mesh.customDepthMaterial = patchedDepthMaterial({ vertHead: opts.vertHead, begin: bend, side: THREE.DoubleSide });
    setLayers(this.mesh, LAYER.REFL, LAYER.REFR);
    this.dummy = new THREE.Object3D();
    this.dummy.rotation.order = 'YZX';
    this.update(0, { pellets: [] });
  }

  scare(x, z, radius) {
    for (const f of this.fish) {
      const dx = f.pos.x - x, dz = f.pos.z - z;
      const d = Math.hypot(dx, dz);
      if (d < radius) {
        f.state = 'flee';
        f.timer = 2.2 + this.r() * 1.5;
        f.cautious = 3 + this.r() * 2;
        const l = Math.max(d, 0.01);
        f.fleeDir = [dx / l, dz / l];
        if (f.pellet) f.pellet.targeted--;
        f.pellet = null;
        f.speed = Math.max(f.speed, 0.9);
      }
    }
  }

  pickWander(f) {
    for (let k = 0; k < 30; k++) {
      const a = this.r() * Math.PI * 2, rad = 0.5 + this.r() * 5.5;
      const x = Math.cos(a) * rad, z = Math.sin(a) * rad;
      const b = heightAt(x, z);
      if (b < -0.38) {
        f.target = new THREE.Vector3(x, Math.max(b + 0.16, -0.16 - this.r() * 0.32), z);
        f.timer = 6 + this.r() * 8;
        return;
      }
    }
    f.target = new THREE.Vector3(0, -0.6, 0);
  }

  update(dt, ctx) {
    const pellets = ctx.pellets;
    const t = performance.now() / 1000;
    this.fish.forEach((f, i) => {
      f.timer -= dt;
      f.cautious -= dt;
      f.cool -= dt;
      const fwd = [Math.cos(f.yaw), -Math.sin(f.yaw)];
      const nose = [f.pos.x + fwd[0] * 0.5 * f.scale, f.pos.z + fwd[1] * 0.5 * f.scale];
      let desired = null, speedT = 0.28 * f.speedMul, ty = -0.5;

      // food seeking
      if (f.state !== 'flee' && f.cautious <= 0 && f.cool <= 0) {
        if (!f.pellet || f.pellet.eaten || f.pellet.state !== 'float') {
          if (f.pellet) f.pellet.targeted--;
          f.pellet = null;
          let best = null, bd = 9;
          for (const p of pellets) {
            if (p.state !== 'float' || p.eaten) continue;
            const d = Math.hypot(p.x - nose[0], p.z - nose[1]) + p.targeted * 0.6;
            if (d < bd) { bd = d; best = p; }
          }
          if (best) { f.pellet = best; best.targeted++; f.state = 'feed'; }
          else if (f.state === 'feed') { f.state = 'wander'; f.target = null; }
        }
      }
      if (f.state === 'feed' && f.pellet) {
        const p = f.pellet;
        const dx = p.x - nose[0], dz = p.z - nose[1];
        const d = Math.hypot(dx, dz);
        desired = [p.x - f.pos.x, p.z - f.pos.z];
        speedT = Math.min(0.75, 0.25 + d * 0.25) * f.speedMul;
        // nose up towards the pellet, body staying under water
        f.feedPitch = d < 1.0 ? 0.42 : 0;
        ty = d < 1.5 ? -0.045 - f.scale * 0.5 * Math.sin(f.feedPitch) - f.scale * 0.04 : -0.25;
        if (d < 0.1 + f.scale * 0.06 && f.pos.y > -0.3) {
          p.eaten = true;
          p.targeted--;
          f.pellet = null;
          f.cool = 0.35 + this.r() * 0.4;
          this.sim.addDrop(p.x, p.z, 0.1, -0.012);
          if (ctx.onEat) ctx.onEat(p.x, p.z);
        }
        // mouth breaking the surface stirs small ripples
        f.mouthT -= dt;
        if (f.pos.y > -0.3 && d < 0.6 && f.mouthT <= 0) {
          f.mouthT = 0.18 + this.r() * 0.25;
          this.sim.addDrop(nose[0], nose[1], 0.07, -0.006);
          if (ctx.onMouth) ctx.onMouth(nose[0], nose[1]);
        }
      } else if (f.state === 'flee') {
        desired = f.fleeDir;
        speedT = 1.5;
        ty = Math.max(heightAt(f.pos.x, f.pos.z) + 0.15, -1.0);
        if (f.timer <= 0) { f.state = 'wander'; f.target = null; }
      } else {
        if (!f.target || f.timer <= 0 || Math.hypot(f.target.x - f.pos.x, f.target.z - f.pos.z) < 0.6) this.pickWander(f);
        desired = [f.target.x - f.pos.x, f.target.z - f.pos.z];
        ty = f.target.y;
        // lazy cruising with occasional sprint
        speedT = (0.22 + 0.1 * Math.sin(t * 0.3 + i * 2.1)) * f.speedMul;
      }

      // avoid shallows
      let ax = 0, az = 0;
      for (const la of [0.6, 1.2]) {
        const lx = f.pos.x + fwd[0] * la, lz = f.pos.z + fwd[1] * la;
        const b = heightAt(lx, lz);
        if (b > -0.32) {
          const w = (b + 0.32) * 6 / la;
          ax -= lx * w * 0.2;
          az -= lz * w * 0.2;
        }
      }
      for (const p of PILINGS) {
        const dx = f.pos.x - p.x, dz = f.pos.z - p.z;
        const d = Math.hypot(dx, dz);
        if (d < 0.7) { ax += (dx / d) * (0.7 - d) * 4; az += (dz / d) * (0.7 - d) * 4; }
      }
      for (const o of this.fish) {
        if (o === f) continue;
        const dx = f.pos.x - o.pos.x, dz = f.pos.z - o.pos.z;
        const d = Math.hypot(dx, dz);
        const dy = Math.abs(f.pos.y - o.pos.y);
        if (d < 0.45 && dy < 0.2 && d > 1e-3) { ax += (dx / d) * (0.45 - d) * 3; az += (dz / d) * (0.45 - d) * 3; }
      }
      let dl = Math.hypot(desired[0], desired[1]) || 1;
      let dvx = desired[0] / dl + ax, dvz = desired[1] / dl + az;
      const desiredYaw = Math.atan2(-dvz, dvx);
      let dy = desiredYaw - f.yaw;
      while (dy > Math.PI) dy -= Math.PI * 2;
      while (dy < -Math.PI) dy += Math.PI * 2;
      const maxTurn = (f.state === 'flee' ? 5 : 1.6) * dt;
      const turn = Math.max(-maxTurn, Math.min(maxTurn, dy * Math.min(1, dt * 3)));
      f.yaw += turn;
      f.turn += ((dt > 0 ? turn / dt : 0) - f.turn) * Math.min(1, dt * 5);
      f.speed += (speedT - f.speed) * Math.min(1, dt * (f.state === 'flee' ? 6 : 1.5));

      const bed = heightAt(f.pos.x, f.pos.z);
      if (f.state !== 'feed') f.feedPitch = 0;
      ty = Math.min(ty, -0.06 - f.scale * 0.05);
      ty = Math.max(ty, bed + 0.1);
      const vy = (ty - f.pos.y) * Math.min(1, dt * 1.5);
      f.pos.y += vy;
      const swimPitch = Math.atan2(vy / Math.max(dt, 1e-3), Math.max(f.speed, 0.1)) * 0.6;
      f.pitch += (Math.max(swimPitch, f.feedPitch || 0) - f.pitch) * Math.min(1, dt * 3);
      f.pos.x += Math.cos(f.yaw) * f.speed * dt;
      f.pos.z += -Math.sin(f.yaw) * f.speed * dt;
      // hard keep inside water
      const nb = heightAt(f.pos.x, f.pos.z);
      if (nb > -0.2) {
        const l = Math.hypot(f.pos.x, f.pos.z) || 1;
        f.pos.x -= (f.pos.x / l) * dt * 0.8;
        f.pos.z -= (f.pos.z / l) * dt * 0.8;
      }

      f.phase += dt * (3.5 + f.speed * 16);
      const amp = 0.03 + f.speed * 0.09;
      this.anim.setXYZW(i, f.phase, amp, -f.turn * 0.35, 0);
      const d = this.dummy;
      d.position.copy(f.pos);
      d.rotation.set(0, f.yaw, f.pitch);
      d.scale.setScalar(f.scale);
      d.updateMatrix();
      this.mesh.setMatrixAt(i, d.matrix);
    });
    this.anim.needsUpdate = true;
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}
