import * as THREE from 'three';
import { pondDepth, floorY, clamp01 } from './pond.js';
import { ambientWave } from './sim.js';
import { paperTexture, foamRingTexture } from './textures.js';
import { events } from './events.js';

// 纸船几何：经典折纸船形
function buildBoatGeo() {
  const v = [];
  const tri = (a, b, c) => { v.push(...a, ...b, ...c); };
  const A = [-0.17, 0.015, 0], B = [0.17, 0.015, 0];         // 龙骨两端
  const L1 = [-0.235, 0.085, 0.085], L2 = [0.235, 0.085, 0.085];   // 左舷上缘
  const R1 = [-0.235, 0.085, -0.085], R2 = [0.235, 0.085, -0.085]; // 右舷
  const Lm = [-0.235, 0.055, 0.0], Rm = [0.235, 0.055, 0.0];       // 船舯上缘
  // 左舷外壳（双面材质无需翻面）
  tri(A, L1, Lm); tri(A, Lm, L2); tri(B, Lm, L1); tri(B, L2, Lm);
  // 右舷
  tri(A, Rm, R1); tri(A, R2, Rm); tri(B, R1, Rm); tri(B, Rm, R2);
  // 中央帆
  tri([-0.11, 0.075, 0], [0.13, 0.075, 0], [0.015, 0.21, 0]);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
  g.computeVertexNormals();
  // 简易 UV
  const uv = [];
  for (let i = 0; i < v.length / 3; i++) uv.push((v[i * 3] + 0.25) * 2, (v[i * 3 + 1] + 0.1) * 4);
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return g;
}

export class Floaters {
  constructor(scene, sim) {
    this.scene = scene;
    this.sim = sim;
    this.stones = [];
    this.boats = [];
    this.pellets = [];
    this.leaves = [];
    this.droplets = [];
    this.rings = [];
    this.pendingDrops = [];
    this.splashT = 0;
    this.tmpM = new THREE.Matrix4();
    this.tmpQ = new THREE.Quaternion();
    this.tmpV = new THREE.Vector3();
    this.tmpE = new THREE.Euler();

    // 石子
    this.stoneGeo = new THREE.IcosahedronGeometry(0.045, 1);
    const sp = this.stoneGeo.attributes.position;
    for (let i = 0; i < sp.count; i++) {
      const s = 0.75 + Math.random() * 0.5;
      sp.setXYZ(i, sp.getX(i) * s, sp.getY(i) * s * 0.7, sp.getZ(i) * s);
    }
    this.stoneGeo.computeVertexNormals();
    this.stoneMat = new THREE.MeshStandardMaterial({ color: 0x8a8078, roughness: 0.9 });

    // 纸船
    this.boatGeo = buildBoatGeo();
    this.boatMat = new THREE.MeshStandardMaterial({
      map: paperTexture(), roughness: 0.8, side: THREE.DoubleSide, flatShading: true
    });

    // 鱼食
    this.pelletGeo = new THREE.SphereGeometry(0.016, 6, 5);
    this.pelletMat = new THREE.MeshStandardMaterial({ color: 0xb08040, roughness: 0.9 });

    // 落叶（柳叶形）
    const lf2 = new THREE.Shape();
    lf2.moveTo(0, 0);
    lf2.quadraticCurveTo(0.019, 0.05, 0, 0.15);
    lf2.quadraticCurveTo(-0.019, 0.05, 0, 0);
    this.leafGeo = new THREE.ShapeGeometry(lf2, 6);
    this.leafGeo.translate(0, -0.075, 0); // 中心在原点
    this.leafMat = new THREE.MeshStandardMaterial({ color: 0x7a9a3a, roughness: 0.8, side: THREE.DoubleSide });

    // 水滴池
    this.dropMesh = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.022, 6, 5),
      new THREE.MeshStandardMaterial({ color: 0xcfe4ea, roughness: 0.15, transparent: true, opacity: 0.85 }),
      64
    );
    this.dropMesh.count = 0;
    this.dropMesh.renderOrder = 8;
    this.dropMesh.frustumCulled = false;
    scene.add(this.dropMesh);

    // 泡沫环池（独立 mesh 便于逐个淡出）
    const ringGeo = new THREE.PlaneGeometry(1, 1);
    ringGeo.rotateX(-Math.PI / 2);
    this.ringPool = [];
    for (let i = 0; i < 18; i++) {
      const mat = new THREE.MeshBasicMaterial({
        map: foamRingTexture(), transparent: true, depthWrite: false, opacity: 0
      });
      const mesh = new THREE.Mesh(ringGeo, mat);
      mesh.renderOrder = 7;
      mesh.visible = false;
      mesh.frustumCulled = false;
      scene.add(mesh);
      this.ringPool.push(mesh);
    }
    this.activeRings = [];
  }

  // ------- 生成 -------
  throwStone(x, z, cameraPos) {
    const dx = cameraPos.x - x, dz = cameraPos.z - z;
    const d = Math.hypot(dx, dz) || 1;
    const sx = x + dx / d * 1.6, sz = z + dz / d * 1.6;
    const mesh = new THREE.Mesh(this.stoneGeo, this.stoneMat);
    const t_fall = Math.sqrt(2 * Math.max(0.1, 1.35) / 9.8);
    const stone = {
      mesh, phase: 'fly',
      x: sx, y: 1.35, z: sz,
      vx: -(dx / d) * (1.6 / t_fall), vy: -0.6, vz: -(dz / d) * (1.6 / t_fall),
      spin: new THREE.Vector3(Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() * 6 - 3)
    };
    this.scene.add(mesh);
    this.stones.push(stone);
    if (this.stones.length > 22) this.removeStone(this.stones[0]);
  }

  removeStone(s) {
    this.scene.remove(s.mesh);
    this.stones.splice(this.stones.indexOf(s), 1);
  }

  placeBoat(x, z, heading) {
    const mesh = new THREE.Mesh(this.boatGeo, this.boatMat);
    const boat = {
      mesh, x, z, vx: 0, vz: 0,
      heading: heading ?? Math.random() * Math.PI * 2,
      phase: Math.random() * 10
    };
    this.scene.add(mesh);
    this.boats.push(boat);
    if (this.boats.length > 6) {
      const old = this.boats.shift();
      this.scene.remove(old.mesh);
    }
    this.ring(x, z, 0.45, 0.7);
    return boat;
  }

  sprinkleFood(x, z) {
    const n = 7 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * 0.45;
      const px = x + Math.cos(a) * r, pz = z + Math.sin(a) * r;
      if (pondDepth(px, pz) < 0.06) continue;
      const mesh = new THREE.Mesh(this.pelletGeo, this.pelletMat);
      const pe = { mesh, x: px, z: pz, vx: 0, vz: 0, eaten: false, age: 0, phase: Math.random() * 10 };
      this.scene.add(mesh);
      this.pellets.push(pe);
    }
    if (this.pellets.length > 42) {
      for (let i = 0; i < n; i++) {
        const old = this.pellets.shift();
        if (old && !old.eaten) this.scene.remove(old.mesh);
      }
    }
    this.ring(x, z, 0.4, 0.6);
  }

  spawnLeaf(x, y, z) {
    if (this.leaves.length > 44) {
      const old = this.leaves.shift();
      this.scene.remove(old.mesh);
    }
    const mesh = new THREE.Mesh(this.leafGeo, this.leafMat);
    const leaf = {
      mesh, phase: 'fall',
      x, y, z,
      vx: (Math.random() - 0.5) * 0.3, vy: 0, vz: (Math.random() - 0.5) * 0.3,
      rot: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
      spin: 1.5 + Math.random() * 2.5,
      age: 0, floatAge: 0
    };
    this.scene.add(mesh);
    this.leaves.push(leaf);
  }

  // ------- 水花 -------
  splash(x, z, power = 1) {
    this.sim.addDrop(x, z, 0.42, 0.22 * power);
    this.ring(x, z, 1.0 * power + 0.35, 1.3);
    // 水腔回涌的次级涟漪
    this.pendingDrops.push({ x, z, at: 0.28, r: 0.5, a: 0.09 * power, dx: 0.25, dz: 0.1 });
    this.pendingDrops.push({ x, z, at: 0.55, r: 0.6, a: 0.06 * power, dx: -0.2, dz: -0.18 });
    const n = Math.floor(10 + power * 9);
    for (let i = 0; i < n; i++) {
      if (this.droplets.length >= 60) break;
      const a = Math.random() * Math.PI * 2;
      const sp = 0.6 + Math.random() * 1.4 * power;
      this.droplets.push({
        x, y: 0.03, z,
        vx: Math.cos(a) * sp * 0.55, vy: 1.1 + Math.random() * 1.5 * power, vz: Math.sin(a) * sp * 0.55,
        life: 0.75 + Math.random() * 0.4
      });
    }
    events.emit('splash', { x, z, power });
  }

  ring(x, z, size, dur = 0.9) {
    this.activeRings.push({ x, z, size, dur, age: 0 });
    if (this.activeRings.length > 24) this.activeRings.shift();
  }

  rippleAt(x, z, radius, amp) {
    this.sim.addDrop(x, z, radius, amp);
  }

  // ------- 更新 -------
  update(dt, t, wind, windDir) {
    const sim = this.sim;
    const wForce = 0.05 + wind * 0.6;
    // 次级涟漪计时
    if (this.pendingDrops.length) {
      this.splashT += dt;
      for (let i = this.pendingDrops.length - 1; i >= 0; i--) {
        const pd = this.pendingDrops[i];
        if (this.splashT >= pd.at) {
          sim.addDrop(pd.x + pd.dx, pd.z + pd.dz, pd.r, pd.a);
          this.pendingDrops.splice(i, 1);
        }
      }
      if (!this.pendingDrops.length) this.splashT = 0;
    }

    const surface = (x, z) => {
      const amb = ambientWave(x, z, t, wind);
      return { h: sim.heightAt(x, z) + amb.h * 0.9, gx: sim.gradAt(x, z).gx + amb.gx * 0.7, gz: sim.gradAt(x, z).gz + amb.gz * 0.7 };
    };
    const depthGrad = (x, z) => {
      const e = 0.3;
      return {
        gx: (pondDepth(x + e, z) - pondDepth(x - e, z)) / (2 * e),
        gz: (pondDepth(x, z + e) - pondDepth(x, z - e)) / (2 * e)
      };
    };
    const constrain = (o, minD, push) => {
      const d = pondDepth(o.x, o.z);
      if (d < minD) {
        const g = depthGrad(o.x, o.z);
        const gl = Math.hypot(g.gx, g.gz) + 1e-5;
        o.vx += (g.gx / gl) * push * dt;
        o.vz += (g.gz / gl) * push * dt;
        if (d < 0.02) {
          o.x += (g.gx / gl) * (minD - d) * 2;
          o.z += (g.gz / gl) * (minD - d) * 2;
          o.vx *= 0.5; o.vz *= 0.5;
        }
      }
    };
    const avoidPads = (o, r) => {
      for (const pad of this.pads || []) {
        const dx = o.x - pad.position.x, dz = o.z - pad.position.z;
        const rr = pad.userData.r + r;
        const d2 = dx * dx + dz * dz;
        if (d2 < rr * rr && d2 > 1e-6) {
          const d = Math.sqrt(d2);
          o.x += (dx / d) * (rr - d);
          o.z += (dz / d) * (rr - d);
          const vn = (o.vx * dx + o.vz * dz) / d;
          if (vn < 0) { o.vx -= dx / d * vn; o.vz -= dz / d * vn; }
        }
      }
    };

    // 石子
    for (let i = this.stones.length - 1; i >= 0; i--) {
      const s = this.stones[i];
      if (s.phase === 'fly') {
        s.vy -= 9.8 * dt;
        s.x += s.vx * dt; s.y += s.vy * dt; s.z += s.vz * dt;
        s.mesh.rotation.x += s.spin.x * dt; s.mesh.rotation.y += s.spin.y * dt;
        const wh = surface(s.x, s.z).h;
        if (s.y <= wh + 0.02) {
          s.y = wh;
          this.splash(s.x, s.z, 1.0);
          s.phase = 'sink';
        }
      } else {
        s.vy = Math.max(s.vy - 3.5 * dt, -0.55);
        s.x += s.vx * dt * Math.exp(-3 * dt); s.z += s.vz * dt * Math.exp(-3 * dt);
        s.vx *= Math.exp(-3 * dt); s.vz *= Math.exp(-3 * dt);
        s.y += s.vy * dt;
        const fl = floorY(s.x, s.z) + 0.03;
        if (s.y <= fl) { s.y = fl; s.vy = 0; s.vx = 0; s.vz = 0; }
      }
      s.mesh.position.set(s.x, s.y, s.z);
    }

    // 纸船
    for (const b of this.boats) {
      const sv = surface(b.x, b.z);
      b.vx -= sv.gx * 2.6 * dt; b.vz -= sv.gz * 2.6 * dt;
      b.vx += windDir.x * wForce * 0.75 * dt; b.vz += windDir.y * wForce * 0.75 * dt;
      const drag = Math.exp(-1.6 * dt);
      b.vx *= drag; b.vz *= drag;
      b.x += b.vx * dt; b.z += b.vz * dt;
      constrain(b, 0.1, 2.2);
      avoidPads(b, 0.24);
      // 船间排斥
      for (const o of this.boats) {
        if (o === b) continue;
        const dx = b.x - o.x, dz = b.z - o.z;
        const d2 = dx * dx + dz * dz;
        if (d2 < 0.09 && d2 > 1e-6) {
          const d = Math.sqrt(d2);
          b.x += dx / d * (0.3 - d) * 0.5; b.z += dz / d * (0.3 - d) * 0.5;
        }
      }
      const sp = Math.hypot(b.vx, b.vz);
      if (sp > 0.035) {
        let da = Math.atan2(b.vz, b.vx) - b.heading;
        while (da > Math.PI) da -= Math.PI * 2;
        while (da < -Math.PI) da += Math.PI * 2;
        b.heading += da * Math.min(1, dt * 2.5);
      }
      const sv2 = surface(b.x, b.z);
      b.mesh.position.set(b.x, sv2.h + 0.028, b.z);
      b.mesh.rotation.set(0, -b.heading, 0);
      b.mesh.rotation.x = Math.max(-0.3, Math.min(0.3, sv2.gz * 2.2)) + Math.sin(t * 2.1 + b.phase) * 0.035;
      b.mesh.rotation.z = Math.max(-0.3, Math.min(0.3, -sv2.gx * 2.2)) + Math.cos(t * 1.7 + b.phase) * 0.035;
    }

    // 鱼食
    for (let i = this.pellets.length - 1; i >= 0; i--) {
      const pe = this.pellets[i];
      if (pe.eaten) {
        this.scene.remove(pe.mesh);
        this.pellets.splice(i, 1);
        continue;
      }
      pe.age += dt;
      if (pe.age > 90) { this.scene.remove(pe.mesh); this.pellets.splice(i, 1); continue; }
      const sv = surface(pe.x, pe.z);
      pe.vx -= sv.gx * 1.4 * dt; pe.vz -= sv.gz * 1.4 * dt;
      pe.vx += windDir.x * wForce * 1.2 * dt; pe.vz += windDir.y * wForce * 1.2 * dt;
      const drag = Math.exp(-2.4 * dt);
      pe.vx *= drag; pe.vz *= drag;
      pe.x += pe.vx * dt; pe.z += pe.vz * dt;
      constrain(pe, 0.06, 1.6);
      const sv2 = surface(pe.x, pe.z);
      pe.mesh.position.set(pe.x, sv2.h + 0.012, pe.z);
    }

    // 落叶
    for (let i = this.leaves.length - 1; i >= 0; i--) {
      const lf = this.leaves[i];
      lf.age += dt;
      if (lf.phase === 'fall') {
        lf.vy = Math.max(lf.vy - 1.2 * dt, -0.55);
        lf.vx += windDir.x * (0.15 + wind * 1.1) * dt + Math.sin(t * 2.4 + lf.spin) * 0.25 * dt;
        lf.vz += windDir.y * (0.15 + wind * 1.1) * dt + Math.cos(t * 2.1 + lf.spin) * 0.25 * dt;
        lf.x += lf.vx * dt; lf.y += lf.vy * dt; lf.z += lf.vz * dt;
        lf.rot.x += lf.spin * dt; lf.rot.z += lf.spin * 0.7 * dt;
        const wh = surface(lf.x, lf.z).h;
        if (lf.y <= wh + 0.012) {
          lf.phase = 'float';
          lf.floatAge = 0;
          this.ring(lf.x, lf.z, 0.22, 0.6);
        }
        lf.mesh.rotation.copy(lf.rot);
        lf.mesh.position.set(lf.x, lf.y, lf.z);
      } else {
        lf.floatAge += dt;
        if (lf.floatAge > 36 || pondDepth(lf.x, lf.z) < 0.015) {
          if (lf.floatAge > 36) { // 淡出
            lf.mesh.scale.multiplyScalar(Math.exp(-2.5 * dt));
            if (lf.mesh.scale.x < 0.08) { this.scene.remove(lf.mesh); this.leaves.splice(i, 1); continue; }
          } else { this.scene.remove(lf.mesh); this.leaves.splice(i, 1); continue; }
        }
        const sv = surface(lf.x, lf.z);
        lf.vx -= sv.gx * 1.2 * dt; lf.vz -= sv.gz * 1.2 * dt;
        lf.vx += windDir.x * wForce * 1.35 * dt; lf.vz += windDir.y * wForce * 1.35 * dt;
        const drag = Math.exp(-2.6 * dt);
        lf.vx *= drag; lf.vz *= drag;
        lf.x += lf.vx * dt; lf.z += lf.vz * dt;
        constrain(lf, 0.04, 1.2);
        const sv2 = surface(lf.x, lf.z);
        lf.mesh.position.set(lf.x, sv2.h + 0.008, lf.z);
        lf.mesh.rotation.set(Math.max(-0.4, Math.min(0.4, sv2.gx)), lf.rot.y + dt * 0.15, Math.max(-0.4, Math.min(0.4, sv2.gz)));
      }
    }

    // 水滴
    let dn = 0;
    for (let i = this.droplets.length - 1; i >= 0; i--) {
      const d = this.droplets[i];
      d.life -= dt;
      if (d.life <= 0) {
        if (pondDepth(d.x, d.z) > 0.04) this.sim.addDrop(d.x, d.z, 0.09, 0.006);
        this.droplets.splice(i, 1);
        continue;
      }
      d.vy -= 9.8 * dt;
      d.x += d.vx * dt; d.y += d.vy * dt; d.z += d.vz * dt;
      if (d.y < 0 && pondDepth(d.x, d.z) > 0.04) { d.life = 0; continue; }
      if (dn < 64) {
        this.tmpM.makeScale(1, 1, 1).setPosition(d.x, d.y, d.z);
        this.dropMesh.setMatrixAt(dn++, this.tmpM);
      }
    }
    this.dropMesh.count = dn;
    this.dropMesh.instanceMatrix.needsUpdate = true;

    // 泡沫环
    for (let i = this.activeRings.length - 1; i >= 0; i--) {
      const r = this.activeRings[i];
      r.age += dt;
      if (r.age >= r.dur) { this.activeRings.splice(i, 1); continue; }
      const u = r.age / r.dur;
      const mesh = this.ringPool[i % this.ringPool.length];
      const s = r.size * (0.3 + u * 1.15);
      const h = this.sim.heightAt(r.x, r.z);
      mesh.position.set(r.x, h + 0.013, r.z);
      mesh.scale.set(s, 1, s);
      mesh.material.opacity = (1 - u) * 0.75;
      mesh.visible = true;
    }
    for (let i = this.activeRings.length; i < this.ringPool.length; i++) {
      this.ringPool[i].visible = false;
    }
  }
}
