import * as THREE from 'three';
import { heightAt, heightGrad, PILINGS, WIND_DIR } from './pond.js';
import { vnoise } from './noise.js';
import { rockGeometry, rockMaterial } from './flora.js';
import { leafGeometry } from './willow.js';
import { patchMaterial, patchedDepthMaterial, setLayers, LAYER } from './shared.js';

const WAVE_SPEED = 1.25;
const tmpObj = new THREE.Object3D();

function gustCPU(x, z, t, w) {
  const px = x * 0.13 - WIND_DIR[0] * t * (0.6 + 1.6 * w);
  const pz = z * 0.13 - WIND_DIR[1] * t * (0.6 + 1.6 * w);
  return (vnoise(px, pz, 1) * 0.5 + 0.5) * 0.65 + (vnoise(px * 2.3 + 5, pz * 2.3 + 5, 2) * 0.5 + 0.5) * 0.35;
}

/** Shared floating-object physics on the water surface */
function floatPhysics(o, dt, ctx, { radius, windK, waveK, drag, obstacles }) {
  const w = ctx.wind;
  const g = gustCPU(o.x, o.z, ctx.time, w);
  const ws = (0.02 + w * 0.6) * (0.4 + 1.2 * g) * windK;
  const ax = (WIND_DIR[0] * ws - o.vx) * drag - (o.wgx || 0) * waveK;
  const az = (WIND_DIR[1] * ws - o.vz) * drag - (o.wgz || 0) * waveK;
  o.vx += ax * dt;
  o.vz += az * dt;
  o.x += o.vx * dt;
  o.z += o.vz * dt;
  // shore
  const b = heightAt(o.x, o.z);
  const lim = -0.04 - radius * 0.2;
  if (b > lim) {
    const [gx, gz] = heightGrad(o.x, o.z);
    const gl = Math.hypot(gx, gz) || 1;
    const nx = gx / gl, nz = gz / gl;
    const push = Math.min((b - lim) / Math.max(gl, 0.05), 0.2);
    o.x -= nx * push;
    o.z -= nz * push;
    const vn = o.vx * nx + o.vz * nz;
    if (vn > 0) {
      o.vx -= vn * nx * 1.3;
      o.vz -= vn * nz * 1.3;
    }
  }
  // circle obstacles (pads, pilings, rocks)
  for (const c of obstacles) {
    const dx = o.x - c.x, dz = o.z - c.z;
    const d = Math.hypot(dx, dz);
    const min = c.r + radius;
    if (d < min && d > 1e-4) {
      const nx = dx / d, nz = dz / d;
      o.x = c.x + nx * min;
      o.z = c.z + nz * min;
      const vn = o.vx * nx + o.vz * nz;
      if (vn < 0) {
        o.vx -= vn * nx * 1.2;
        o.vz -= vn * nz * 1.2;
      }
    }
  }
}

/* ---------------- stones ---------------- */
export class Stones {
  constructor(max = 24) {
    this.max = max;
    this.list = [];
    this.mesh = new THREE.InstancedMesh(rockGeometry(901, 2), rockMaterial(), max);
    this.mesh.count = 0;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.frustumCulled = false;
    const cols = [0x8a857c, 0x6e6a64, 0x9a9184, 0x5d5a55];
    for (let i = 0; i < max; i++) this.mesh.setColorAt(i, new THREE.Color(cols[i % 4]));
    setLayers(this.mesh, LAYER.MAIN, LAYER.REFL, LAYER.REFR);
  }

  throwTo(target, camPos) {
    const dir = new THREE.Vector3().subVectors(camPos, target);
    dir.y = 0;
    const dist = Math.min(dir.length(), 5);
    dir.normalize();
    const start = target.clone().addScaledVector(dir, dist);
    start.y = 1.4 + dist * 0.15;
    const T = 0.55 + dist * 0.06;
    const v = new THREE.Vector3((target.x - start.x) / T, (0 - start.y + 0.5 * 9.8 * T * T) / T, (target.z - start.z) / T);
    if (this.list.length >= this.max) this.list.shift();
    const s = 0.045 + Math.random() * 0.03;
    this.list.push({
      p: start,
      v,
      q: new THREE.Quaternion().random(),
      spin: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(14),
      s,
      state: 'air',
      bed: heightAt(target.x, target.z) + s * 0.4,
      wob: Math.random() * 6,
    });
  }

  update(dt, ctx) {
    const qd = new THREE.Quaternion();
    for (const st of this.list) {
      if (st.state === 'air') {
        st.v.y -= 9.8 * dt;
        st.p.addScaledVector(st.v, dt);
        if (st.p.y <= 0) {
          st.p.y = -0.01;
          st.state = 'sink';
          st.v.set(st.v.x * 0.08, -0.5, st.v.z * 0.08);
          st.spin.multiplyScalar(0.25);
          ctx.onStoneImpact(st.p.x, st.p.z, st.s);
        }
      } else if (st.state === 'sink') {
        st.wob += dt * 6;
        st.v.y += (-0.75 - st.v.y) * dt * 3;
        st.p.x += (st.v.x + Math.sin(st.wob) * 0.05) * dt;
        st.p.z += (st.v.z + Math.cos(st.wob * 1.3) * 0.05) * dt;
        st.p.y += st.v.y * dt;
        if (Math.random() < dt * 12) ctx.onBubble(st.p.x, st.p.z);
        if (st.p.y <= st.bed) {
          st.p.y = st.bed;
          st.state = 'rest';
        }
      }
      if (st.state !== 'rest') {
        const ang = st.spin.length() * dt;
        if (ang > 0) {
          qd.setFromAxisAngle(st.spin.clone().normalize(), ang);
          st.q.premultiply(qd);
        }
      }
    }
    this.list.forEach((st, i) => {
      tmpObj.position.copy(st.p);
      tmpObj.quaternion.copy(st.q);
      tmpObj.scale.setScalar(st.s);
      tmpObj.updateMatrix();
      this.mesh.setMatrixAt(i, tmpObj.matrix);
    });
    this.mesh.count = this.list.length;
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}

/* ---------------- paper boats ---------------- */
function boatGeometry() {
  const L = 0.13, l = 0.085, H = 0.055, W = 0.04, S = 0.13;
  const v = [];
  const tri = (a, b, c) => v.push(...a, ...b, ...c);
  const quad = (a, b, c, d) => { tri(a, b, c); tri(a, c, d); };
  const b0 = [-l, 0, 0], b1 = [l, 0, 0];
  const tl = [-L, H, W], tr = [L, H, W], tlb = [-L, H, -W], trb = [L, H, -W];
  // hull sides
  quad(b0, b1, tr, tl);
  quad(b1, b0, tlb, trb);
  // ends (folded triangles pointing up)
  tri(b0, tl, [-L * 1.08, H * 1.15, 0]);
  tri(b0, [-L * 1.08, H * 1.15, 0], tlb);
  tri(b1, [L * 1.08, H * 1.15, 0], tr);
  tri(b1, trb, [L * 1.08, H * 1.15, 0]);
  // sail: two slightly separated triangles
  const sw = 0.004;
  tri([-l * 0.85, H * 0.6, sw], [l * 0.85, H * 0.6, sw], [0, S, 0]);
  tri([l * 0.85, H * 0.6, -sw], [-l * 0.85, H * 0.6, -sw], [0, S, 0]);
  // inner flaps from gunwale to sail base
  quad(tl, tr, [l * 0.85, H * 0.6, sw], [-l * 0.85, H * 0.6, sw]);
  quad(trb, tlb, [-l * 0.85, H * 0.6, -sw], [l * 0.85, H * 0.6, -sw]);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
  g.computeVertexNormals();
  g.scale(1.25, 1.25, 1.25);
  return g;
}

export class Boats {
  constructor(max = 10) {
    this.max = max;
    this.list = [];
    const mat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.75, flatShading: true });
    patchMaterial(mat, {
      fragColor: /* glsl */ `
        float fib = vnoise(vWPos.xz * 300.0 + vWPos.y * 200.0);
        diffuseColor.rgb *= 0.93 + 0.07 * fib;
        // waterline soaking
        diffuseColor.rgb *= mix(1.0, 0.78, smoothstep(0.035, 0.0, vWPos.y));
      `,
      fragLights: 'reflectedLight.indirectDiffuse *= 1.35;',
    });
    this.mesh = new THREE.InstancedMesh(boatGeometry(), mat, max);
    this.mesh.count = 0;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.frustumCulled = false;
    const cols = [0xf4f1ea, 0xf2e6b8, 0xcfe0ee, 0xf0cfd2, 0xd8d6cf, 0xe4efd2];
    for (let i = 0; i < max; i++) this.mesh.setColorAt(i, new THREE.Color(cols[i % cols.length]));
    setLayers(this.mesh, LAYER.MAIN, LAYER.REFL);
  }

  add(x, z) {
    if (this.list.length >= this.max) this.list.shift();
    this.list.push({ x, z, vx: 0, vz: 0, yaw: Math.random() * 6.28, wy: 0, drop: 0.25, wh: 0, wgx: 0, wgz: 0, ph: Math.random() * 6 });
  }

  update(dt, ctx) {
    const obstacles = [...ctx.pads, ...PILINGS, ...ctx.rocks];
    for (const b of this.list) {
      floatPhysics(b, dt, ctx, { radius: 0.12, windK: 1.0, waveK: 1.6, drag: 0.9, obstacles });
      // boat-boat
      for (const o of this.list) {
        if (o === b) continue;
        const dx = b.x - o.x, dz = b.z - o.z;
        const d = Math.hypot(dx, dz);
        if (d < 0.26 && d > 1e-4) {
          const p = (0.26 - d) * 0.5;
          b.x += (dx / d) * p; b.z += (dz / d) * p;
          b.vx += (dx / d) * 0.1; b.vz += (dz / d) * 0.1;
        }
      }
      // yaw: slowly align with drift, plus wave torque
      const sp = Math.hypot(b.vx, b.vz);
      if (sp > 0.01) {
        const target = Math.atan2(-b.vz, b.vx);
        let d = target - b.yaw;
        while (d > Math.PI) d -= Math.PI * 2;
        while (d < -Math.PI) d += Math.PI * 2;
        if (Math.abs(d) > Math.PI / 2) d -= Math.sign(d) * Math.PI;
        b.wy += d * sp * 2.0 * dt;
      }
      b.wy *= 1 - dt * 1.5;
      b.yaw += b.wy * dt;
      b.drop = Math.max(0, b.drop - dt * 0.8);
    }
  }

  render(ctx) {
    const t = ctx.time;
    const w = ctx.wind;
    this.list.forEach((b, i) => {
      b.ph += 0;
      const bob = Math.sin(t * 2.3 + b.ph) * (0.002 + 0.006 * w) + Math.sin(t * 3.7 + b.ph * 2) * (0.001 + 0.004 * w);
      tmpObj.position.set(b.x, (b.wh || 0) + bob - 0.012 + b.drop * b.drop * 2, b.z);
      const cy = Math.cos(b.yaw), sy = Math.sin(b.yaw);
      const gx = b.wgx || 0, gz = b.wgz || 0;
      const along = gx * cy - gz * sy;
      const across = gx * sy + gz * cy;
      const rollW = Math.sin(t * 1.9 + b.ph) * (0.02 + 0.08 * w);
      tmpObj.rotation.set(Math.atan(across) * 0.9 + rollW, b.yaw, Math.atan(along) * 0.9, 'YXZ');
      tmpObj.scale.setScalar(1);
      tmpObj.updateMatrix();
      this.mesh.setMatrixAt(i, tmpObj.matrix);
    });
    this.mesh.count = this.list.length;
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}

/* ---------------- fish food ---------------- */
export class Food {
  constructor(max = 80) {
    this.max = max;
    this.list = [];
    const mat = new THREE.MeshStandardMaterial({ color: 0x9a5a22, roughness: 0.8 });
    this.mesh = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.011, 1), mat, max);
    this.mesh.count = 0;
    this.mesh.frustumCulled = false;
    setLayers(this.mesh, LAYER.MAIN);
  }

  scatter(x, z) {
    const n = 9;
    for (let i = 0; i < n; i++) {
      if (this.list.length >= this.max) this.list.shift();
      const a = Math.random() * 6.28, r = Math.sqrt(Math.random()) * 0.32;
      this.list.push({
        x: x + Math.cos(a) * r, z: z + Math.sin(a) * r, y: 0.5 + Math.random() * 0.3,
        vy: 0, vx: 0, vz: 0, state: 'air', eaten: false, targeted: 0, life: 70, s: 0.8 + Math.random() * 0.5,
      });
    }
  }

  update(dt, ctx) {
    const obstacles = ctx.pads;
    for (const p of this.list) {
      if (p.state === 'air') {
        p.vy -= 9.8 * dt;
        p.y += p.vy * dt;
        if (p.y <= 0) {
          p.state = 'float';
          ctx.sim.addDrop(p.x, p.z, 0.05, -0.0025);
        }
      } else if (p.state === 'float') {
        p.life -= dt;
        floatPhysics(p, dt, ctx, { radius: 0.02, windK: 0.45, waveK: 0.9, drag: 1.3, obstacles });
        p.y = (p.wh || 0) + 0.003;
        if (p.life <= 0) p.state = 'sink';
      } else if (p.state === 'sink') {
        p.y -= dt * 0.05;
      }
    }
    this.list = this.list.filter((p) => !p.eaten && p.y > -0.15);
    this.list.forEach((p, i) => {
      tmpObj.position.set(p.x, p.y, p.z);
      tmpObj.rotation.set(0, 0, 0);
      tmpObj.scale.setScalar(p.s);
      tmpObj.updateMatrix();
      this.mesh.setMatrixAt(i, tmpObj.matrix);
    });
    this.mesh.count = this.list.length;
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  floating() {
    return this.list.filter((p) => p.state === 'float');
  }
}

/* ---------------- falling willow leaves ---------------- */
export class FallingLeaves {
  constructor(sources, max = 70) {
    this.sources = sources;
    this.max = max;
    this.list = [];
    this.acc = 0;
    const geo = leafGeometry(0.11, 0.017);
    const mat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.55 });
    patchMaterial(mat, {
      underwater: true,
      fragColor: 'diffuseColor.rgb *= mix(1.0, 0.75, smoothstep(0.01, -0.01, vWPos.y));',
      fragLights: 'reflectedLight.indirectDiffuse *= 1.35;',
    });
    this.mesh = new THREE.InstancedMesh(geo, mat, max);
    this.mesh.count = 0;
    this.mesh.frustumCulled = false;
    this.mesh.castShadow = true;
    for (let i = 0; i < max; i++) {
      const y = Math.random();
      this.mesh.setColorAt(i, new THREE.Color().setRGB(0.32 + y * 0.35, 0.42 + y * 0.15, 0.08 + y * 0.03));
    }
    setLayers(this.mesh, LAYER.MAIN, LAYER.REFL);
  }

  spawn(floating = false) {
    if (this.list.length >= this.max) {
      const idx = this.list.findIndex((l) => l.state !== 'fall');
      if (idx < 0) return;
      this.list.splice(idx, 1);
    }
    const s = this.sources[Math.floor(Math.random() * this.sources.length)];
    const l = {
      x: s.x, y: s.y, z: s.z, vx: 0, vz: 0, vy: 0,
      state: 'fall', t: Math.random() * 10, life: 50 + Math.random() * 40,
      yaw: Math.random() * 6.28, tilt: 0, roll: 0, spinR: (Math.random() - 0.5) * 6, fallV: 0.45 + Math.random() * 0.35,
      wh: 0, wgx: 0, wgz: 0, fade: 1, sink: 0,
    };
    if (floating) {
      // pre-place on water under / downwind of the willow
      for (let k = 0; k < 20; k++) {
        const x = s.x + Math.random() * 4 - 1, z = s.z + (Math.random() - 0.5) * 4;
        if (heightAt(x, z) < -0.1) {
          l.x = x; l.z = z; l.y = 0; l.state = 'float';
          break;
        }
      }
    }
    this.list.push(l);
  }

  update(dt, ctx) {
    const w = ctx.wind;
    const rate = 0.12 + w * w * 3.2 + (ctx.rain || 0) * 0.3;
    this.acc += dt * rate;
    while (this.acc > 1) {
      this.acc -= 1;
      this.spawn();
    }
    for (const l of this.list) {
      l.t += dt;
      if (l.state === 'fall') {
        const g = gustCPU(l.x, l.z, ctx.time, w);
        const ws = (0.15 + w * 3.0) * (0.4 + 1.2 * g);
        l.vx += (WIND_DIR[0] * ws - l.vx) * dt * 1.5;
        l.vz += (WIND_DIR[1] * ws - l.vz) * dt * 1.5;
        const sway = Math.sin(l.t * 3.1) * 0.6;
        l.x += (l.vx + Math.cos(l.yaw) * sway) * dt;
        l.z += (l.vz + Math.sin(l.yaw) * sway) * dt;
        l.y -= l.fallV * (0.8 + 0.4 * Math.abs(Math.cos(l.t * 3.1))) * dt;
        l.tilt = Math.sin(l.t * 3.1) * 0.9;
        l.roll += l.spinR * dt;
        l.yaw += dt * 0.6;
        const gy = heightAt(l.x, l.z);
        if (l.y <= Math.max(gy, 0)) {
          if (gy < -0.02) {
            l.state = 'float';
            l.y = 0;
            ctx.sim.addDrop(l.x, l.z, 0.08, -0.0035);
          } else {
            l.state = 'ground';
            l.y = gy + 0.01;
            l.life = 15 + Math.random() * 10;
          }
          l.vx *= 0.3; l.vz *= 0.3;
        }
      } else if (l.state === 'float') {
        l.life -= dt;
        floatPhysics(l, dt, ctx, { radius: 0.04, windK: 0.7, waveK: 1.2, drag: 1.1, obstacles: ctx.pads });
        l.yaw += (l.vx * 0.8 - l.vz * 0.6) * dt * 2;
        l.tilt *= 1 - dt * 3;
        l.roll *= 1 - dt * 3;
        l.y = (l.wh || 0) + 0.006 - l.sink;
        if (l.life <= 0) l.sink += dt * 0.03;
      } else if (l.state === 'ground') {
        l.life -= dt;
        if (l.life <= 0) l.fade -= dt * 0.5;
      }
    }
    this.list = this.list.filter((l) => l.fade > 0 && l.sink < 0.25);
    this.list.forEach((l, i) => {
      tmpObj.position.set(l.x, l.y, l.z);
      if (l.state === 'fall') tmpObj.rotation.set(1.2 + l.tilt, l.yaw, l.roll, 'YXZ');
      else tmpObj.rotation.set(-Math.PI / 2 + l.tilt * 0.2, l.yaw, 0, 'YXZ');
      tmpObj.scale.setScalar(1.1 * Math.max(l.fade, 0.01));
      tmpObj.updateMatrix();
      this.mesh.setMatrixAt(i, tmpObj.matrix);
    });
    this.mesh.count = this.list.length;
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  floating() {
    return this.list.filter((l) => l.state === 'float');
  }
}

export { WAVE_SPEED };
