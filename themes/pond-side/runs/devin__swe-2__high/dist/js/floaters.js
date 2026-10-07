// 浮物：荷叶、睡莲、纸船、鱼食、飘落的柳叶、入水石子
import * as THREE from 'three';
import { rand, clamp, lerp, pondRR, depthAt, terrainHeight } from './common.js';

// ---------- 荷叶 ----------
function padGeometry(r) {
  const shape = new THREE.Shape();
  const notch = 0.3;
  shape.moveTo(Math.cos(notch) * r, Math.sin(notch) * r);
  shape.absarc(0, 0, r, notch, Math.PI * 2 - notch, false);
  shape.lineTo(Math.cos(notch) * r, Math.sin(notch) * r);
  const g = new THREE.ShapeGeometry(shape, 24);
  g.rotateX(-Math.PI / 2);
  // 边缘微翘
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i);
    const rr = Math.hypot(x, z) / r;
    p.setY(i, rr * rr * 0.035 + (rr > 0.9 ? 0.02 : 0));
  }
  g.computeVertexNormals();
  return g;
}
// ---------- 睡莲花 ----------
function lilyFlower() {
  const grp = new THREE.Group();
  const mat = new THREE.MeshLambertMaterial({ color: 0xf5e9f0, side: THREE.DoubleSide });
  const mat2 = new THREE.MeshLambertMaterial({ color: 0xe9a8c4, side: THREE.DoubleSide });
  const petal = new THREE.SphereGeometry(0.5, 6, 4, 0, Math.PI * 0.7, 0, Math.PI * 0.5);
  petal.scale(0.16, 0.07, 0.34);
  for (let ring = 0; ring < 2; ring++) {
    const n = ring === 0 ? 6 : 8;
    for (let i = 0; i < n; i++) {
      const m = new THREE.Mesh(petal, ring === 0 ? mat : mat2);
      const a = (i / n) * Math.PI * 2 + ring * 0.4;
      m.rotation.y = a;
      m.rotation.x = ring === 0 ? -0.9 : -0.45;
      m.position.y = ring * 0.02;
      m.scale.setScalar(ring === 0 ? 0.7 : 1);
      grp.add(m);
    }
  }
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), new THREE.MeshLambertMaterial({ color: 0xf2c53d }));
  core.scale.y = 0.6; core.position.y = 0.05;
  grp.add(core);
  grp.scale.setScalar(0.55);
  return grp;
}

// ---------- 纸船 ----------
function boatGeometry() {
  const v = [];
  const tri = (a, b, c) => v.push(...a, ...b, ...c);
  const K0 = [-0.4, 0, 0], K1 = [0.4, 0, 0];
  const G0n = [-0.52, 0.17, -0.17], G0p = [-0.52, 0.17, 0.17];
  const G1n = [0.52, 0.17, -0.17], G1p = [0.52, 0.17, 0.17];
  const R0 = [-0.28, 0.36, 0], R1 = [0.28, 0.36, 0];
  // 船底两侧
  tri(K0, K1, G1p); tri(K0, G1p, G0p);
  tri(K1, K0, G0n); tri(K1, G0n, G1n);
  // 船头尾封板
  tri(K0, G0p, G0n); tri(K1, G1n, G1p);
  // 顶部折篷
  tri(R0, R1, G1p); tri(R0, G1p, G0p);
  tri(R1, R0, G0n); tri(R1, G0n, G1n);
  tri(R0, G0p, G0n); tri(R1, G1n, G1p);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
  g.computeVertexNormals();
  return g;
}

// ---------- 柳叶 ----------
function leafGeometry() {
  const g = new THREE.BufferGeometry();
  const v = [0, 0, -0.06, 0.022, 0, 0, 0, 0, 0.07, -0.022, 0, 0];
  g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
  g.setIndex([0, 1, 2, 0, 2, 3]);
  g.computeVertexNormals();
  return g;
}

export class Floaters {
  constructor(scene, waveField, simUniforms) {
    this.scene = scene;
    this.wf = waveField;
    this.group = new THREE.Group();
    scene.add(this.group);
    this.t = 0;
    this.wind = 0.25;
    this.windDir = new THREE.Vector2(0.8, 0.45).normalize();

    // 荷叶
    this.pads = [];
    const padGeoA = padGeometry(0.34), padGeoB = padGeometry(0.24), padGeoC = padGeometry(0.42);
    const padMat = new THREE.MeshLambertMaterial({ color: 0x3e7d3a, side: THREE.DoubleSide });
    const padMat2 = new THREE.MeshLambertMaterial({ color: 0x4f9040, side: THREE.DoubleSide });
    const padSpots = [
      [2.2, -2.8, 0.34, 0], [3.0, -2.2, 0.24, 0], [2.6, -3.6, 0.42, 1], [1.6, -3.3, 0.24, 0],
      [-3.2, 2.4, 0.4, 1], [-2.5, 3.0, 0.26, 0], [-3.9, 1.7, 0.3, 0],
      [0.5, 4.2, 0.34, 0], [-0.3, 4.7, 0.26, 0],
    ];
    padSpots.forEach(([x, z, r, flower], i) => {
      const g = r > 0.38 ? padGeoC : r < 0.3 ? padGeoB : padGeoA;
      const m = new THREE.Mesh(g, i % 3 ? padMat : padMat2);
      m.position.set(x, 0, z);
      m.rotation.y = rand(Math.PI * 2);
      this.group.add(m);
      const pad = { mesh: m, x, z, r, rot: rand(Math.PI * 2), phase: rand(Math.PI * 2) };
      if (flower) {
        const f = lilyFlower();
        f.position.y = 0.02;
        m.add(f);
      }
      this.pads.push(pad);
    });

    // 动态对象池
    this.boats = [];
    this.foods = [];
    this.leaves = [];
    this.stones = [];
    this.boatGeo = boatGeometry();
    this.boatMat = new THREE.MeshStandardMaterial({ color: 0xf3f0e8, roughness: 0.6, side: THREE.DoubleSide });
    this.leafGeo = leafGeometry();
    this.leafMat = new THREE.MeshLambertMaterial({ color: 0x9ab84a, side: THREE.DoubleSide });
    this.stoneGeo = new THREE.IcosahedronGeometry(1, 0);
    this.stoneMat = new THREE.MeshStandardMaterial({ color: 0x6a675f, roughness: 0.85 });
    this.foodGeo = new THREE.SphereGeometry(0.022, 6, 4);
    this.foodMat = new THREE.MeshLambertMaterial({ color: 0x8a6a3a });

    this.colliders = []; // {x,z,r} 桩等
    this.onSplash = null; // 回调(x,z,power)
    this.leafTimer = 3;
    this.willowTips = [];
  }

  addBoat(x, z) {
    if (this.boats.length >= 8) {
      const old = this.boats.shift();
      this.group.remove(old.mesh);
    }
    const m = new THREE.Mesh(this.boatGeo, this.boatMat);
    m.castShadow = true;
    const b = { mesh: m, pos: new THREE.Vector3(x, 0, z), vel: new THREE.Vector2(0, 0), yaw: rand(Math.PI * 2), spin: 0 };
    m.position.set(x, 0.05, z);
    this.group.add(m);
    this.boats.push(b);
  }

  addFood(x, z) {
    const grp = new THREE.Group();
    const pellets = [];
    for (let i = 0; i < 10; i++) {
      const m = new THREE.Mesh(this.foodGeo, this.foodMat);
      const a = rand(Math.PI * 2), r = rand(0.2);
      m.position.set(Math.cos(a) * r, 0, Math.sin(a) * r);
      grp.add(m);
      pellets.push(m);
    }
    grp.position.set(x, 0.03, z);
    this.group.add(grp);
    this.foods.push({ grp, x, z, amount: 10, life: 30, pellets });
  }

  throwStone(x, z) {
    if (this.stones.length > 16) {
      const old = this.stones.shift();
      this.group.remove(old.mesh);
    }
    const m = new THREE.Mesh(this.stoneGeo, this.stoneMat);
    const s = rand(0.05, 0.09);
    m.scale.set(s, s * 0.7, s);
    m.position.set(x + rand(-0.1, 0.1), 1.6, z + rand(-0.1, 0.1));
    m.castShadow = true;
    this.group.add(m);
    this.stones.push({ mesh: m, vel: new THREE.Vector3(rand(-0.2, 0.2), 0, rand(-0.2, 0.2)), state: 'fall' });
  }

  spawnLeaf(x, y, z) {
    if (this.leaves.length > 16) { const old = this.leaves.shift(); this.group.remove(old.mesh); }
    const m = new THREE.Mesh(this.leafGeo, this.leafMat);
    m.position.set(x, y, z);
    m.rotation.set(rand(Math.PI), rand(Math.PI), 0);
    this.group.add(m);
    this.leaves.push({
      mesh: m, vel: new THREE.Vector3(rand(-0.2, 0.2), 0, rand(-0.2, 0.2)),
      state: 'fall', life: rand(25, 45), spin: rand(1, 3), phase: rand(Math.PI * 2),
    });
  }

  update(dt, wind, fireflyI) {
    this.t += dt;
    this.wind = wind;
    const wf = this.wf, t = this.t;

    // 荷叶随浪起伏
    for (const p of this.pads) {
      const h = wf.heightAt(p.x, p.z, wind);
      const g = wf.gradientAt(p.x, p.z, wind);
      p.mesh.position.y = h + 0.012;
      p.mesh.rotation.x = clamp(-g.z * 2.0, -0.3, 0.3);
      p.mesh.rotation.z = clamp(g.x * 2.0, -0.3, 0.3);
      p.mesh.rotation.y = p.rot + Math.sin(t * 0.2 + p.phase) * 0.1;
    }

    // 纸船
    for (const b of this.boats) {
      const g = wf.gradientAt(b.pos.x, b.pos.z, wind);
      const h = wf.heightAt(b.pos.x, b.pos.z, wind);
      b.vel.x += (-g.x * 1.5 + this.windDir.x * wind * 0.35) * dt;
      b.vel.y += (-g.z * 1.5 + this.windDir.y * wind * 0.35) * dt;
      b.vel.multiplyScalar(Math.exp(-dt * 0.55));
      b.pos.x += b.vel.x * dt; b.pos.z += b.vel.y * dt;
      // 岸界碰撞
      if (pondRR(b.pos.x, b.pos.z) > 0.9) {
        const d = Math.hypot(b.pos.x, b.pos.z);
        const nx = -b.pos.x / d, nz = -b.pos.z / d;
        const dot = b.vel.x * nx + b.vel.y * nz;
        if (dot < 0) { b.vel.x -= 1.6 * dot * nx; b.vel.y -= 1.6 * dot * nz; }
        const sr = d / pondRR(b.pos.x, b.pos.z) * 0.9;
        b.pos.x = -nx * sr; b.pos.z = -nz * sr;
      }
      // 荷叶/桩/船碰撞
      const hit = (cx, cz, r) => {
        const dx = b.pos.x - cx, dz = b.pos.z - cz;
        const d2 = dx * dx + dz * dz, rr2 = (r + 0.35) * (r + 0.35);
        if (d2 < rr2 && d2 > 1e-6) {
          const d = Math.sqrt(d2), nx = dx / d, nz = dz / d;
          b.pos.x = cx + nx * (r + 0.35); b.pos.z = cz + nz * (r + 0.35);
          const dot = b.vel.x * nx + b.vel.y * nz;
          if (dot < 0) { b.vel.x -= 1.7 * dot * nx; b.vel.y -= 1.7 * dot * nz; }
          return true;
        }
        return false;
      };
      for (const p of this.pads) hit(p.x, p.z, p.r);
      for (const c of this.colliders) hit(c.x, c.z, c.r);
      for (const o of this.boats) if (o !== b) hit(o.pos.x, o.pos.z, 0.3);
      const sp = Math.hypot(b.vel.x, b.vel.y);
      if (sp > 0.05) {
        const want = Math.atan2(b.vel.x, b.vel.y);
        let dyaw = want - b.yaw;
        while (dyaw > Math.PI) dyaw -= Math.PI * 2;
        while (dyaw < -Math.PI) dyaw += Math.PI * 2;
        b.yaw += dyaw * Math.min(1, dt * 2);
      }
      b.mesh.position.set(b.pos.x, h + 0.015, b.pos.z);
      const fwd = { x: Math.sin(b.yaw), y: Math.cos(b.yaw) };
      const pitch = clamp((g.x * fwd.x + g.z * fwd.y) * 1.8, -0.5, 0.5);
      const roll = clamp((g.x * fwd.y - g.z * fwd.x) * -1.8, -0.5, 0.5);
      b.mesh.rotation.set(pitch, b.yaw, roll, 'YXZ');
    }

    // 鱼食
    for (let i = this.foods.length - 1; i >= 0; i--) {
      const f = this.foods[i];
      f.life -= dt;
      f.x += this.windDir.x * wind * 0.06 * dt;
      f.z += this.windDir.y * wind * 0.06 * dt;
      const h = wf.heightAt(f.x, f.z, wind);
      f.grp.position.set(f.x, h + 0.015, f.z);
      const scale = clamp(f.amount / 10, 0, 1) * clamp(f.life / 5, 0, 1);
      f.grp.scale.setScalar(Math.max(scale, 0.01));
      if (f.amount <= 0 || f.life <= 0) {
        this.group.remove(f.grp);
        this.foods.splice(i, 1);
      }
    }

    // 柳叶：柳枝偶尔飘落
    this.leafTimer -= dt * (0.5 + wind * 2.5);
    if (this.leafTimer <= 0 && this.willowTips.length) {
      this.leafTimer = rand(4, 9);
      const tip = this.willowTips[Math.floor(rand(this.willowTips.length))];
      this.spawnLeaf(tip.x + rand(-0.3, 0.3), tip.y, tip.z + rand(-0.3, 0.3));
    }
    for (let i = this.leaves.length - 1; i >= 0; i--) {
      const l = this.leaves[i];
      l.life -= dt;
      const m = l.mesh;
      if (l.state === 'fall') {
        l.vel.y = Math.max(l.vel.y - 1.5 * dt, -0.55);
        l.vel.x = this.windDir.x * wind * 0.6 + Math.sin(t * 3 + l.phase) * 0.35;
        l.vel.z = this.windDir.y * wind * 0.6 + Math.cos(t * 2.6 + l.phase) * 0.35;
        m.position.addScaledVector(l.vel, dt);
        m.rotation.x += l.spin * dt; m.rotation.z += l.spin * 0.7 * dt;
        const wh = wf.heightAt(m.position.x, m.position.z, wind);
        if (m.position.y <= wh + 0.01) {
          if (pondRR(m.position.x, m.position.z) < 0.99) {
            l.state = 'float';
            this.onSplash && this.onSplash(m.position.x, m.position.z, 0.04);
          } else {
            l.state = 'land';
            m.position.y = terrainHeight(m.position.x, m.position.z) + 0.02;
            m.rotation.x = -Math.PI / 2 + rand(-0.3, 0.3);
          }
        }
      } else if (l.state === 'float') {
        const wh = wf.heightAt(m.position.x, m.position.z, wind);
        m.position.y = wh + 0.008;
        m.position.x += (this.windDir.x * wind * 0.25) * dt;
        m.position.z += (this.windDir.y * wind * 0.25) * dt;
        m.rotation.y += 0.3 * dt;
        if (pondRR(m.position.x, m.position.z) > 0.97) l.state = 'land';
      }
      if (l.life < 3) {
        l.mesh.scale.setScalar(Math.max(0.01, l.life / 3));
      }
      if (l.life <= 0) { this.group.remove(m); this.leaves.splice(i, 1); }
    }

    // 石子
    for (const s of this.stones) {
      const m = s.mesh;
      if (s.state === 'fall') {
        s.vel.y -= 6 * dt;
        m.position.addScaledVector(s.vel, dt);
        m.rotation.x += 4 * dt;
        if (m.position.y <= 0.02) {
          s.state = 'sink';
          s.vel.set(rand(-0.05, 0.05), -0.5, rand(-0.05, 0.05));
          this.onSplash && this.onSplash(m.position.x, m.position.z, 1);
        }
      } else if (s.state === 'sink') {
        m.position.addScaledVector(s.vel, dt);
        m.rotation.y += dt;
        const floor = terrainHeight(m.position.x, m.position.z);
        if (m.position.y <= floor + 0.05) {
          m.position.y = floor + 0.03;
          s.state = 'rest';
        }
      }
    }
  }
}
