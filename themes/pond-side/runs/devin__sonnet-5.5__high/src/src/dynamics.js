import * as THREE from 'three';
import { G, clamp, lerp, mulberry } from './shared.js';
import { terrainY, PILES, pondF } from './terrain.js';
import { patch } from './materials.js';

const V3 = THREE.Vector3;
const depthAt = (x, z) => -terrainY(x, z);

function shoreNormal(x, z, out) {
  const e = 0.12;
  out.x = -terrainY(x + e, z) + terrainY(x - e, z);
  out.y = -terrainY(x, z + e) + terrainY(x, z - e);
  const l = Math.hypot(out.x, out.y) || 1;
  out.x /= l; out.y /= l;
  return out;
}

function windVec(out, k = 1) {
  const w = G.uWind.value, d = G.uWindDir.value;
  const gust = 0.75 + 0.25 * Math.sin(G.uTime.value * 0.45) + 0.1 * Math.sin(G.uTime.value * 1.3);
  out.set(d.x * (0.05 + 0.55 * w * gust) * k, d.y * (0.05 + 0.55 * w * gust) * k);
  return out;
}

/* ----------------------------- splash ----------------------------- */
export class Splash {
  constructor(scene, ctx) {
    this.ctx = ctx;
    this.MAX = 360;
    const geo = new THREE.IcosahedronGeometry(1, 0);
    this.mat = new THREE.MeshStandardMaterial({ color: 0xdff0ff, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.85 });
    this.mesh = new THREE.InstancedMesh(geo, this.mat, this.MAX);
    this.mesh.frustumCulled = false;
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(this.mesh);
    this.p = Array.from({ length: this.MAX }, () => ({ alive: false, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, s: 0, life: 0 }));
    this.cursor = 0;
    this.crownMat = new THREE.MeshBasicMaterial({ color: 0xd8eaf4, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
    const cg = new THREE.CylinderGeometry(0.5, 0.2, 1, 20, 1, true); cg.translate(0, 0.5, 0);
    this.crowns = Array.from({ length: 6 }, () => {
      const m = new THREE.Mesh(cg, this.crownMat.clone()); m.visible = false; m.frustumCulled = false; scene.add(m);
      return { m, t: 1, dur: 0.6, r: 0.3, h: 0.3 };
    });
    this.ci = 0;
    this.tmp = new THREE.Matrix4(); this.q = new THREE.Quaternion(); this.sc = new V3();
    this._d = new V3(); this._p = new V3(); this._up = new V3(0, 1, 0);
  }

  emit(x, y, z, vx, vy, vz, s) {
    const p = this.p[this.cursor]; this.cursor = (this.cursor + 1) % this.MAX;
    p.alive = true; p.x = x; p.y = y; p.z = z; p.vx = vx; p.vy = vy; p.vz = vz; p.s = s; p.life = 2;
  }

  stone(x, z, size = 1) {
    for (let i = 0; i < 30; i++) {
      const a = Math.random() * 6.283, sp = (0.5 + Math.random() * 1.1) * size;
      this.emit(x + Math.cos(a) * 0.08, 0.02, z + Math.sin(a) * 0.08, Math.cos(a) * sp, 1.6 + Math.random() * 1.8, Math.sin(a) * sp, 0.008 + Math.random() * 0.011);
    }
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * 6.283, sp = Math.random() * 0.35;
      this.emit(x, 0.05, z, Math.cos(a) * sp, 2.6 + Math.random() * 1.8, Math.sin(a) * sp, 0.01 + Math.random() * 0.014);
    }
    const c = this.crowns[this.ci]; this.ci = (this.ci + 1) % this.crowns.length;
    c.m.position.set(x, 0, z); c.t = 0; c.dur = 0.65; c.r = 0.34 * size; c.h = 0.34 * size; c.m.visible = true;
  }

  small(x, z, n = 2, v = 1) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.283, sp = (0.1 + Math.random() * 0.35) * v;
      this.emit(x, 0.01, z, Math.cos(a) * sp, 0.9 + Math.random() * 1.1 * v, Math.sin(a) * sp, 0.006 + Math.random() * 0.006);
    }
  }
  mouth(x, z) { this.small(x, z, 5, 1.2); }

  update(dt) {
    const b = this.ctx.env.out.brightness;
    this.mat.color.setScalar(clamp(0.35 + b * 0.5, 0.2, 1.3));
    for (const c of this.crowns) {
      if (c.t >= 1) { c.m.visible = false; continue; }
      c.t = Math.min(1, c.t + dt / c.dur);
      const t = c.t;
      const grow = Math.sin(Math.min(1, t * 1.6) * Math.PI * 0.5);
      const hh = c.h * Math.sin(Math.PI * Math.pow(t, 0.6)) * 1.0;
      c.m.scale.set(c.r * (0.3 + grow * 1.2), Math.max(hh, 0.001), c.r * (0.3 + grow * 1.2));
      c.m.material.opacity = (1 - t) * 0.45;
      c.m.material.color.setScalar(clamp(0.3 + b * 0.6, 0.2, 1.2));
    }
    const { sim } = this.ctx;
    for (let i = 0; i < this.MAX; i++) {
      const p = this.p[i];
      if (!p.alive) { this.tmp.makeScale(0, 0, 0); this.mesh.setMatrixAt(i, this.tmp); continue; }
      p.vy -= 9.8 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; p.life -= dt;
      if (p.y < 0 && p.vy < 0) {
        p.alive = false;
        if (p.s > 0.012 && Math.random() < 0.5) sim.impulse(p.x, p.z, -0.0022, 0.04);
        this.tmp.makeScale(0, 0, 0); this.mesh.setMatrixAt(i, this.tmp); continue;
      }
      if (p.life < 0) p.alive = false;
      const sp = Math.hypot(p.vx, p.vy, p.vz);
      this.sc.set(p.s, p.s * (1 + Math.min(sp * 0.25, 1.4)), p.s);
      this._d.set(p.vx, p.vy, p.vz).normalize();
      this.q.setFromUnitVectors(this._up, this._d);
      this.tmp.compose(this._p.set(p.x, p.y, p.z), this.q, this.sc);
      this.mesh.setMatrixAt(i, this.tmp);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}

/* ----------------------------- food ----------------------------- */
export class Food {
  constructor(scene, ctx) {
    this.ctx = ctx; this.MAX = 90;
    const geo = new THREE.SphereGeometry(1, 8, 6);
    this.mesh = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: 0xc9893d, roughness: 0.55, emissive: 0x3a1c05, emissiveIntensity: 0.4 }), this.MAX);
    this.mesh.frustumCulled = false; this.mesh.castShadow = true;
    scene.add(this.mesh);
    this.p = Array.from({ length: this.MAX }, () => ({ alive: false, x: 0, z: 0, vx: 0, vz: 0, age: 0, s: 0.024, dying: 0 }));
    this.cursor = 0; this.tmp = new THREE.Matrix4(); this.sl = new THREE.Vector2(); this.n = new THREE.Vector2(); this.w = new THREE.Vector2();
  }
  spawn(x, z, count = 8) {
    for (let i = 0; i < count; i++) {
      const p = this.p[this.cursor]; this.cursor = (this.cursor + 1) % this.MAX;
      const a = Math.random() * 6.283, r = Math.sqrt(Math.random()) * 0.28;
      p.alive = true; p.x = x + Math.cos(a) * r; p.z = z + Math.sin(a) * r; p.vx = p.vz = 0; p.age = 0; p.dying = 0; p.s = 0.02 + Math.random() * 0.008;
      if (depthAt(p.x, p.z) < 0.05) { p.x = x; p.z = z; }
      this.ctx.sim.impulse(p.x, p.z, -0.0016, 0.035);
    }
  }
  nearest(x, z, maxR) {
    let best = null, bd = maxR;
    for (const p of this.p) if (p.alive && !p.dying) { const d = Math.hypot(p.x - x, p.z - z); if (d < bd) { bd = d; best = p; } }
    return best;
  }
  eat(p) { p.dying = 0.001; }
  update(dt) {
    const { sim, obstacles } = this.ctx;
    windVec(this.w, 0.55);
    for (let i = 0; i < this.MAX; i++) {
      const p = this.p[i];
      if (!p.alive) { this.tmp.makeScale(0, 0, 0); this.mesh.setMatrixAt(i, this.tmp); continue; }
      p.age += dt;
      if (p.dying) { p.dying += dt * 6; if (p.dying > 1) { p.alive = false; continue; } }
      if (p.age > 80) p.dying = Math.max(p.dying, 0.5);
      sim.slope(p.x, p.z, this.sl);
      p.vx += (-this.sl.x * 2.2 + (this.w.x - p.vx) * 0.9) * dt;
      p.vz += (-this.sl.y * 2.2 + (this.w.y - p.vz) * 0.9) * dt;
      const nx = p.x + p.vx * dt, nz = p.z + p.vz * dt;
      if (depthAt(nx, nz) > 0.05) { p.x = nx; p.z = nz; } else { p.vx *= -0.2; p.vz *= -0.2; }
      for (const o of obstacles) {
        const dx = p.x - o.x, dz = p.z - o.z, d = Math.hypot(dx, dz);
        if (d < o.r) { p.x = o.x + dx / d * o.r; p.z = o.z + dz / d * o.r; }
      }
      const h = sim.sample(p.x, p.z);
      const s = p.s * (p.dying ? 1 - p.dying : 1);
      this.tmp.compose(new V3(p.x, 0.006 + h, p.z), new THREE.Quaternion(), new V3(s, s * 0.7, s));
      this.mesh.setMatrixAt(i, this.tmp);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}

/* ----------------------------- stones ----------------------------- */
export class Stones {
  constructor(scene, ctx) {
    this.ctx = ctx; this.scene = scene; this.list = [];
    const g = new THREE.IcosahedronGeometry(1, 1);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const n = 1 + 0.16 * Math.sin(x * 5 + y * 3) * Math.cos(z * 4 + x * 2);
      p.setXYZ(i, x * n, y * n * 0.75, z * n * 0.9);
    }
    g.computeVertexNormals();
    this.geo = g;
    this.mat = patch(new THREE.MeshStandardMaterial({ color: 0x8a8780, roughness: 0.7 }), { key: 'stone' });
  }
  throw(x, z, camPos) {
    const { sim, fish } = this.ctx;
    const r = 0.06 + Math.random() * 0.035;
    const mesh = new THREE.Mesh(this.geo, this.mat.clone());
    mesh.material.color.setHSL(0.09 + Math.random() * 0.05, 0.08, 0.28 + Math.random() * 0.2);
    mesh.scale.setScalar(r); mesh.castShadow = true; mesh.layers.enable(1);
    this.scene.add(mesh);
    const dx = camPos.x - x, dz = camPos.z - z, dl = Math.hypot(dx, dz) || 1;
    const k = Math.min(dl, 3.0);
    const s = { mesh, r, state: 'fly', t: 0, dur: 0.6, sx: x + dx / dl * k, sz: z + dz / dl * k, sy: 1.6, tx: x, tz: z, vy: 0, spin: new V3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(14) };
    mesh.position.set(s.sx, s.sy, s.sz);
    this.list.push(s);
    if (this.list.length > 22) { const o = this.list.shift(); this.scene.remove(o.mesh); o.mesh.material.dispose(); }
  }
  update(dt) {
    const { sim, fish, splash } = this.ctx;
    for (const s of this.list) {
      const m = s.mesh;
      if (s.state === 'fly') {
        s.t += dt / s.dur;
        const t = Math.min(s.t, 1);
        m.position.x = lerp(s.sx, s.tx, t); m.position.z = lerp(s.sz, s.tz, t);
        m.position.y = lerp(s.sy, 0, t) + Math.sin(t * Math.PI) * 1.4;
        m.rotation.x += s.spin.x * dt; m.rotation.y += s.spin.y * dt; m.rotation.z += s.spin.z * dt;
        if (s.t >= 1) {
          s.state = 'sink'; s.vy = -3.2;
          const d = depthAt(s.tx, s.tz);
          if (d > 0.04) {
            const big = clamp(d / 0.4, 0.5, 1);
            sim.impulse(s.tx, s.tz, -0.115 * big, 0.17);
            sim.impulse(s.tx, s.tz, -0.04 * big, 0.34);
            splash.stone(s.tx, s.tz, big);
            fish.scare(s.tx, s.tz, 5.5);
            this.ctx.onStone?.(s.tx, s.tz);
          } else splash.small(s.tx, s.tz, 4, 1);
        }
      } else if (s.state === 'sink') {
        s.vy += (-0.85 - s.vy) * (1 - Math.exp(-dt * 4)); s.spin.multiplyScalar(Math.exp(-dt * 3));
        m.position.y += s.vy * dt;
        m.position.x += Math.sin(m.position.y * 9 + s.r * 90) * 0.15 * dt;
        m.rotation.x += s.spin.x * dt * 0.4; m.rotation.z += s.spin.z * dt * 0.4;
        const floor = terrainY(m.position.x, m.position.z) + s.r * 0.5;
        if (m.position.y <= floor) { m.position.y = floor; s.state = 'rest'; }
      }
    }
  }
}

/* ----------------------------- boats ----------------------------- */
function boatGeometry() {
  const tris = [];
  const T = (a, b, c) => tris.push(...a, ...b, ...c);
  const bo = [[-0.17, 0, -0.05], [0.17, 0, -0.05], [0.17, 0, 0.05], [-0.17, 0, 0.05]];
  T(bo[0], bo[2], bo[1]); T(bo[0], bo[3], bo[2]);
  const tl = [[-0.21, 0.075, -0.09], [0.21, 0.075, -0.09], [0.21, 0.075, 0.09], [-0.21, 0.075, 0.09]];
  T(bo[3], bo[2], tl[2]); T(bo[3], tl[2], tl[3]);
  T(bo[1], bo[0], tl[0]); T(bo[1], tl[0], tl[1]);
  T(bo[1], bo[2], tl[2]); T(bo[1], tl[2], [0.235, 0.1, 0]); T(bo[1], [0.235, 0.1, 0], tl[1]);
  T(bo[0], tl[3], bo[3]); T(bo[0], [-0.235, 0.1, 0], tl[3]); T(bo[0], tl[0], [-0.235, 0.1, 0]);
  T([-0.17, 0.075, 0], [0.17, 0.075, 0], [0, 0.23, 0]);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(tris, 3));
  g.computeVertexNormals();
  return g;
}

export class Boats {
  constructor(scene, ctx) {
    this.ctx = ctx; this.scene = scene; this.list = [];
    this.geo = boatGeometry();
    this.palette = [0xfbf7ee, 0xf6c9d0, 0xbfd8ee, 0xf7e3a1, 0xe9a590, 0xcfe5c8];
    this.sl = new THREE.Vector2(); this.n = new THREE.Vector2(); this.w = new THREE.Vector2();
    this.up = new V3(0, 1, 0);
  }
  place(x, z) {
    const mat = new THREE.MeshStandardMaterial({ color: this.palette[Math.floor(Math.random() * this.palette.length)], roughness: 0.85, flatShading: true, side: THREE.DoubleSide, emissive: 0xffffff, emissiveIntensity: 0.0 });
    mat.emissive.copy(mat.color); mat.emissiveIntensity = 0.12;
    const mesh = new THREE.Mesh(this.geo, mat);
    mesh.scale.setScalar(1.35); mesh.castShadow = true; mesh.receiveShadow = true;
    mesh.rotation.order = 'YXZ';
    this.scene.add(mesh);
    const b = { mesh, x, z, vx: 0, vz: 0, yaw: Math.random() * 6.28, av: 0, y: 0.5, vy: 0, ph: Math.random() * 6, wake: 0, qx: new THREE.Quaternion() };
    this.list.push(b);
    this.ctx.sim.impulse(x, z, -0.012, 0.09);
    this.ctx.splash.small(x, z, 5, 0.8);
    if (this.list.length > 12) { const o = this.list.shift(); this.scene.remove(o.mesh); o.mesh.material.dispose(); }
  }
  update(dt, t) {
    const { sim, obstacles } = this.ctx;
    windVec(this.w, 0.9);
    const R = 0.28;
    for (const b of this.list) {
      sim.slope(b.x, b.z, this.sl);
      const ax = -this.sl.x * 7 + (this.w.x - b.vx) * 0.9;
      const az = -this.sl.y * 7 + (this.w.y - b.vz) * 0.9;
      b.vx += ax * dt; b.vz += az * dt;
      const sp0 = Math.hypot(b.vx, b.vz);
      if (sp0 > 1.6) { b.vx *= 1.6 / sp0; b.vz *= 1.6 / sp0; }
      let nx = b.x + b.vx * dt, nz = b.z + b.vz * dt;
      if (depthAt(nx, nz) < 0.12) {
        shoreNormal(b.x, b.z, this.n);
        const vn = b.vx * this.n.x + b.vz * this.n.y;
        if (vn < 0) { b.vx -= 1.4 * vn * this.n.x; b.vz -= 1.4 * vn * this.n.y; }
        b.vx += this.n.x * 0.15 * dt * 10; b.vz += this.n.y * 0.15 * dt * 10;
        b.av += (Math.random() - 0.5) * 1.2;
        nx = b.x + b.vx * dt; nz = b.z + b.vz * dt;
        if (depthAt(nx, nz) < 0.1) { nx = b.x + this.n.x * 0.01; nz = b.z + this.n.y * 0.01; }
      }
      for (const p of PILES) {
        const dx = nx - p.x, dz = nz - p.z, d = Math.hypot(dx, dz), rr = p.r + R * 0.6;
        if (d < rr) { const k = d || 0.001; nx = p.x + dx / k * rr; nz = p.z + dz / k * rr; const vn = (b.vx * dx + b.vz * dz) / k; if (vn < 0) { b.vx -= 1.3 * vn * dx / k; b.vz -= 1.3 * vn * dz / k; } b.av += (Math.random() - 0.5) * 0.8; }
      }
      for (const o of obstacles) {
        const dx = nx - o.x, dz = nz - o.z, d = Math.hypot(dx, dz), rr = o.r + R * 0.5;
        if (d < rr) { const k = d || 0.001; nx = o.x + dx / k * rr; nz = o.z + dz / k * rr; const vn = (b.vx * dx + b.vz * dz) / k; if (vn < 0) { b.vx -= 1.2 * vn * dx / k; b.vz -= 1.2 * vn * dz / k; } }
      }
      for (const o of this.list) if (o !== b) {
        const dx = nx - o.x, dz = nz - o.z, d = Math.hypot(dx, dz);
        if (d < R * 1.3 && d > 0.0001) { const push = (R * 1.3 - d) * 0.5; nx += dx / d * push; nz += dz / d * push; }
      }
      b.x = nx; b.z = nz;
      const speed = Math.hypot(b.vx, b.vz);
      const targetYaw = Math.atan2(-b.vz, b.vx);
      b.av += angDiff(targetYaw, b.yaw) * Math.min(speed * 2.5, 1.2) * dt * 3 - b.av * dt * 2.5;
      b.av += Math.sin(t * 0.7 + b.ph) * 0.05 * dt;
      b.yaw += b.av * dt;
      b.wake -= dt;
      if (speed > 0.05 && b.wake <= 0) { b.wake = 0.22; sim.impulse(b.x + b.vx * 0.12, b.z + b.vz * 0.12, -0.0012 * Math.min(speed, 1), 0.06); }
      const h = sim.sample(b.x, b.z);
      const targetY = 0.03 + h;
      b.vy += (targetY - b.y) * 90 * dt - b.vy * 7 * dt;
      b.y += b.vy * dt;
      if (b.y < targetY - 0.15) b.y = targetY - 0.15;
      b.mesh.position.set(b.x, b.y, b.z);
      const cy = Math.cos(b.yaw), sy = Math.sin(b.yaw);
      const sx = this.sl.x * cy - this.sl.y * sy, sz = this.sl.x * sy + this.sl.y * cy;
            const pitch = clamp(sx * 2.2, -0.5, 0.5), roll = clamp(-sz * 2.2 + Math.sin(t * 1.3 + b.ph) * 0.03, -0.5, 0.5);
      b.mesh.rotation.set(roll, b.yaw, pitch);
    }
  }
}
function angDiff(a, b) { let d = a - b; while (d > Math.PI) d -= 6.2832; while (d < -Math.PI) d += 6.2832; return d; }

/* ----------------------------- leaves ----------------------------- */
export class Leaves {
  constructor(scene, ctx, tips) {
    this.ctx = ctx; this.tips = tips; this.MAX = 90;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute([0, -0.07, 0, -0.016, -0.02, 0.004, 0.016, -0.02, 0.004, 0, 0.07, 0], 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], 3));
    g.setIndex([0, 2, 1, 1, 2, 3]);
    this.mesh = new THREE.InstancedMesh(g, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, side: THREE.DoubleSide }), this.MAX);
    this.mesh.frustumCulled = false; this.mesh.castShadow = false;
    scene.add(this.mesh);
    this.p = Array.from({ length: this.MAX }, () => ({ alive: false }));
    this.cursor = 0; this.next = 1.2; this.tmp = new THREE.Matrix4(); this.q = new THREE.Quaternion(); this.sl = new THREE.Vector2(); this.w = new THREE.Vector2();
    this.col = new THREE.Color();
    for (let i = 0; i < this.MAX; i++) this.mesh.setColorAt(i, this.col.setHSL(0.2, 0.5, 0.3));
  }
  spawn(float = false) {
    const p = this.p[this.cursor]; this.cursor = (this.cursor + 1) % this.MAX;
    const tip = this.tips[Math.floor(Math.random() * this.tips.length)];
    p.alive = true; p.state = 'fall'; p.age = 0; p.ph = Math.random() * 6.28; p.sc = 0.9 + Math.random() * 0.5;
    p.x = tip.x; p.y = tip.y + Math.random() * 0.4; p.z = tip.z; p.vx = p.vz = 0;
    p.rot = new V3(Math.random() * 6, Math.random() * 6, Math.random() * 6);
    p.yaw = Math.random() * 6.28;
    this.mesh.setColorAt(this.p.indexOf(p), this.col.setHSL(0.14 + Math.random() * 0.1, 0.55, 0.28 + Math.random() * 0.12));
    this.mesh.instanceColor.needsUpdate = true;
    if (float) {
      for (let k = 0; k < 40; k++) { const x = (Math.random() - 0.5) * 8, z = (Math.random() - 0.5) * 6; if (depthAt(x, z) > 0.4) { p.x = x; p.z = z; break; } }
      p.y = 0; p.state = 'float';
    }
  }
  update(dt, t) {
    const wind = G.uWind.value;
    this.next -= dt;
    if (this.next <= 0) { this.spawn(); this.next = (5 + Math.random() * 6) / (0.25 + wind * 3.2); }
    windVec(this.w, 1);
    const { sim } = this.ctx;
    for (let i = 0; i < this.MAX; i++) {
      const p = this.p[i];
      if (!p.alive) { this.tmp.makeScale(0, 0, 0); this.mesh.setMatrixAt(i, this.tmp); continue; }
      p.age += dt;
      let s = p.sc;
      if (p.state === 'fall') {
        p.vx += (this.w.x * 2.4 - p.vx) * dt * 1.2 + Math.sin(t * 2.3 + p.ph) * 0.35 * dt;
        p.vz += (this.w.y * 2.4 - p.vz) * dt * 1.2 + Math.cos(t * 2.1 + p.ph) * 0.35 * dt;
        p.x += p.vx * dt; p.z += p.vz * dt; p.y -= (0.42 + 0.12 * Math.sin(t * 3 + p.ph)) * dt;
        const gy = terrainY(p.x, p.z);
        if (p.y <= Math.max(gy, 0) + 0.005) {
          if (gy < -0.03) { p.state = 'float'; p.y = 0; sim.impulse(p.x, p.z, -0.0035, 0.05); p.vx *= 0.1; p.vz *= 0.1; }
          else { p.state = 'rest'; p.age = 0; p.y = gy + 0.01; }
        }
        this.q.setFromEuler(new THREE.Euler(p.rot.x + t * 2.2 + Math.sin(t * 3 + p.ph) * 0.8, p.rot.y + t * 1.1, p.rot.z + Math.sin(t * 2 + p.ph)));
        this.tmp.compose(new V3(p.x, p.y, p.z), this.q, new V3(s, s, s));
      } else if (p.state === 'float') {
        sim.slope(p.x, p.z, this.sl);
        p.vx += (-this.sl.x * 2 + (this.w.x * 0.6 - p.vx) * 0.7) * dt;
        p.vz += (-this.sl.y * 2 + (this.w.y * 0.6 - p.vz) * 0.7) * dt;
        const nx = p.x + p.vx * dt, nz = p.z + p.vz * dt;
        if (depthAt(nx, nz) > 0.05) { p.x = nx; p.z = nz; } else { p.vx = p.vz = 0; }
        const h = sim.sample(p.x, p.z);
        p.yaw += Math.sin(t * 0.5 + p.ph) * 0.2 * dt;
        const n = new V3(-this.sl.x * 1.5, 1, -this.sl.y * 1.5).normalize();
        this.q.setFromUnitVectors(new V3(0, 0, 1), n);
        const qy = new THREE.Quaternion().setFromAxisAngle(new V3(0, 0, 1), p.yaw);
        this.q.multiply(qy);
        if (p.age > 140) s *= Math.max(0, 1 - (p.age - 140) / 8);
        if (p.age > 148) p.alive = false;
        this.tmp.compose(new V3(p.x, 0.005 + h, p.z), this.q, new V3(s, s, s));
      } else {
        this.q.setFromEuler(new THREE.Euler(-1.45, 0, p.yaw));
        if (p.age > 20) s *= Math.max(0, 1 - (p.age - 20) / 4);
        if (p.age > 24) p.alive = false;
        this.tmp.compose(new V3(p.x, p.y, p.z), this.q, new V3(s, s, s));
      }
      this.mesh.setMatrixAt(i, this.tmp);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}

/* ----------------------------- rain ----------------------------- */
export class Rain {
  constructor(scene, ctx) {
    this.ctx = ctx;
    const N = 2600, rnd = mulberry(5);
    const pos = [], rr = [], idx = [];
    for (let i = 0; i < N; i++) {
      const r = [rnd(), rnd(), rnd(), rnd()];
      for (const [cx, cy] of [[-1, 0], [1, 0], [-1, 1], [1, 1]]) { pos.push(cx, cy, 0); rr.push(...r); }
      const b = i * 4; idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('aR', new THREE.Float32BufferAttribute(rr, 4));
    g.setIndex(idx);
    this.mat = new THREE.ShaderMaterial({
      uniforms: { uTime: G.uTime, uWind: G.uWind, uWindDir: G.uWindDir, uRain: G.uRain, uCol: { value: new THREE.Color(0.7, 0.78, 0.9) } },
      transparent: true, depthWrite: false, fog: false,
      vertexShader: `
        attribute vec4 aR; uniform float uTime, uWind, uRain; uniform vec2 uWindDir; varying float vA;
        void main(){
          float H = 9.0, W = 20.0;
          float spd = 11.0 + aR.w*3.0;
          float y = mod(aR.y*H - uTime*spd, H);
          vec3 p = vec3((aR.x-0.5)*W, y, (aR.z-0.5)*W*0.9);
          vec3 sl = normalize(vec3(uWindDir.x*(0.08+0.3*uWind), -1.0, uWindDir.y*(0.08+0.3*uWind)));
          p.xz += -sl.xz * (y/(-sl.y)) * 0.0;
          float len = 0.45 + aR.w*0.3;
          vec3 vd = normalize(p - cameraPosition);
          vec3 right = normalize(cross(vd, sl));
          float dist = length(p - cameraPosition);
          float wd = 0.006 + dist*0.0012;
          vec3 wp = p + right*position.x*wd - sl*position.y*len;
          vA = smoothstep(0.0,0.6,y) * (1.0 - smoothstep(14.0, 26.0, dist)) * (0.35 + 0.5*aR.z) * step(aR.x, uRain);
          gl_Position = projectionMatrix*viewMatrix*vec4(wp,1.0);
        }`,
      fragmentShader: `uniform vec3 uCol; varying float vA; void main(){ gl_FragColor = vec4(uCol, vA*0.6);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        }`,
    });
    this.mesh = new THREE.Mesh(g, this.mat);
    this.mesh.frustumCulled = false; this.mesh.visible = false; this.mesh.renderOrder = 8;
    scene.add(this.mesh);
    this.acc = 0; this.acc2 = 0;
  }
  update(dt, camera) {
    const R = G.uRain.value;
    this.mesh.visible = R > 0.02;
    this.mat.uniforms.uCol.value.setRGB(0.55, 0.62, 0.72).multiplyScalar(0.2 + this.ctx.env.out.brightness * 0.5);
    if (R < 0.05) return;
    const { sim, splash } = this.ctx;
    this.acc += dt * 95 * R;
    while (this.acc >= 1) {
      this.acc -= 1;
      for (let k = 0; k < 6; k++) {
        const x = (Math.random() - 0.5) * 11.5, z = (Math.random() - 0.5) * 9.5;
        if (depthAt(x, z) > 0.05) {
          sim.impulse(x, z, -(0.0012 + Math.random() * 0.0018), 0.04);
          if (Math.hypot(x - camera.position.x, z - camera.position.z) < 9 && Math.random() < 0.5) splash.small(x, z, 2, 0.6);
          break;
        }
      }
    }
  }
}

/* --------------------------- fireflies ---------------------------- */
export class Fireflies {
  constructor(scene) {
    const N = 80, rnd = mulberry(66);
    const base = [], ph = [], fr = [];
    for (let i = 0; i < N; i++) {
      let x, z;
      for (let t = 0; t < 50; t++) { x = (rnd() - 0.5) * 15; z = (rnd() - 0.5) * 12; if (pondF(x, z) < 1.25) break; }
      base.push(x, 0.35 + rnd() * 1.6, z);
      ph.push(rnd() * 6.28, rnd() * 6.28, rnd() * 6.28, rnd() * 6.28);
      fr.push(0.3 + rnd() * 0.5, 0.4 + rnd() * 0.6, 0.3 + rnd() * 0.5, 0.5 + rnd() * 0.8);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(base, 3));
    g.setAttribute('aP', new THREE.Float32BufferAttribute(ph, 4));
    g.setAttribute('aF', new THREE.Float32BufferAttribute(fr, 4));
    this.mat = new THREE.ShaderMaterial({
      uniforms: { uTime: G.uTime, uScale: { value: 800 }, uAmt: { value: 0 } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
      vertexShader: `
        attribute vec4 aP; attribute vec4 aF; uniform float uTime, uScale, uAmt; varying float vB;
        void main(){
          vec3 p = position + vec3(sin(uTime*aF.x+aP.x)*1.1 + sin(uTime*aF.w*0.31+aP.w)*0.8, sin(uTime*aF.y+aP.y)*0.35, cos(uTime*aF.z+aP.z)*1.1);
          float bl = pow(max(0.0, sin(uTime*aF.w*1.9 + aP.w*6.0)), 2.0)*0.9 + 0.1;
          vB = bl * uAmt;
          vec4 mv = viewMatrix*vec4(p,1.0);
          gl_PointSize = clamp(0.16 * uScale / -mv.z, 2.5, 34.0);
          gl_Position = projectionMatrix*mv;
        }`,
      fragmentShader: `varying float vB; void main(){ float d = length(gl_PointCoord-0.5)*2.0; float a = pow(max(1.0-d,0.0), 2.2); gl_FragColor = vec4(vec3(0.75,1.0,0.35)*a*vB*2.2, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        }`,
    });
    this.mesh = new THREE.Points(g, this.mat);
    this.mesh.frustumCulled = false; this.mesh.visible = false; this.mesh.renderOrder = 7;
    scene.add(this.mesh);
  }
  update(amt) { this.mat.uniforms.uAmt.value = amt; this.mesh.visible = amt > 0.02; }
  setScale(px, fov) { this.mat.uniforms.uScale.value = px / (2 * Math.tan(THREE.MathUtils.degToRad(fov) / 2)); }
}
