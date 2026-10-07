import * as THREE from 'three';
import { pondDepth } from './pond.js';
import { koiTexture } from './textures.js';
import { events } from './events.js';

// 锦鲤：程序化建模（椭球变形 + 鳍），游动 AI（巡逻 / 觅食 / 惊散）
function buildBodyGeo() {
  const geo = new THREE.SphereGeometry(0.5, 20, 12);
  geo.rotateZ(-Math.PI / 2); // 头朝 +x
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    let f = 1;
    if (x > 0.12) f = 1 - (x - 0.12) * 0.85;                    // 头部收窄
    else if (x < -0.1) f = Math.max(0.28, 1 - (-x - 0.1) * 1.15); // 尾部收窄
    p.setY(i, y * f * 0.9);
    p.setZ(i, z * f * 0.72);
    if (y < 0) p.setY(i, y * 0.82); // 腹部略平
  }
  geo.computeVertexNormals();
  geo.scale(0.55, 0.17, 0.115); // 体长≈0.55、窄高的纺锤形
  return geo;
}

function finGeo(pts) {
  const s = new THREE.Shape();
  s.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
  return new THREE.ShapeGeometry(s);
}

export class Koi {
  constructor(scene, kind, scale) {
    this.group = new THREE.Group();
    this.inner = new THREE.Group();
    this.group.add(this.inner);

    const tex = koiTexture(kind);
    const bodyMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.42, metalness: 0.05 });
    const finMat = new THREE.MeshStandardMaterial({
      color: kind === 2 ? 0xe8e2d4 : 0xf0b070, roughness: 0.5,
      side: THREE.DoubleSide, transparent: true, opacity: 0.82
    });

    const body = new THREE.Mesh(buildBodyGeo(), bodyMat);
    this.inner.add(body);

    const tail = new THREE.Mesh(finGeo([[0, 0.012], [-0.15, 0.1], [-0.11, 0], [-0.15, -0.1]]), finMat);
    tail.position.set(-0.24, 0, 0);
    this.tail = tail;
    this.inner.add(tail);

    const dorsal = new THREE.Mesh(finGeo([[0.08, 0.02], [-0.07, 0.025], [-0.02, 0.085]]), finMat);
    dorsal.position.set(0.02, 0.075, 0);
    this.inner.add(dorsal);

    for (const side of [-1, 1]) {
      const pec = new THREE.Mesh(finGeo([[0, 0], [-0.06, 0.022], [-0.055, -0.024]]), finMat);
      pec.position.set(0.1, -0.02, side * 0.045);
      pec.rotation.x = side * 0.9;
      pec.rotation.z = -0.5;
      this.inner.add(pec);
    }

    const eyeGeo = new THREE.SphereGeometry(0.012, 6, 5);
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x1a1512, roughness: 0.3 });
    for (const side of [-1, 1]) {
      const eye = new THREE.Mesh(eyeGeo, eyeMat);
      eye.position.set(0.15, 0.015, side * 0.032);
      this.inner.add(eye);
    }

    this.group.scale.setScalar(scale);
    scene.add(this.group);

    // 状态
    const a = Math.random() * Math.PI * 2;
    const r = 1.5 + Math.random() * 3.5;
    this.pos = new THREE.Vector3(Math.cos(a) * r, -0.45, Math.sin(a) * r);
    this.heading = Math.random() * Math.PI * 2;
    this.speed = 0.22 + Math.random() * 0.12;
    this.baseSpeed = this.speed;
    this.wander = this.heading;
    this.retarget = Math.random() * 2;
    this.target = new THREE.Vector3();
    this.flee = 0;
    this.fleeDir = new THREE.Vector2();
    this.feeding = null; // 目标鱼食
    this.nibbleCd = 0;
    this.wagPhase = Math.random() * 10;
  }

  update(dt, t, ctx) {
    const { pellets, others, ripple } = ctx;
    this.nibbleCd -= dt;
    if (this.flee > 0) this.flee -= dt;

    // ---- 选目标 ----
    this.retarget -= dt;
    if (this.retarget <= 0) {
      this.retarget = 2.5 + Math.random() * 3.5;
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * 4.6;
      this.wander = a;
      this.wanderPos = new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r);
      this.feeding = null;
    }

    // 觅食：找最近的鱼食
    if (this.flee <= 0 && pellets) {
      let best = null, bd = 5.5;
      for (const pe of pellets) {
        if (pe.eaten) continue;
        const d = Math.hypot(pe.x - this.pos.x, pe.z - this.pos.z);
        if (d < bd) { bd = d; best = pe; }
      }
      if (best) {
        this.feeding = best;
        this.target.set(best.x, -0.05, best.z);
      }
    }

    // ---- 转向 ----
    const desired = new THREE.Vector2();
    if (this.flee > 0) {
      desired.copy(this.fleeDir);
    } else if (this.feeding) {
      const pe = this.feeding;
      if (pe.eaten) { this.feeding = null; }
      else desired.set(pe.x - this.pos.x, pe.z - this.pos.z);
    }
    if (desired.lengthSq() < 1e-6) {
      if (!this.wanderPos || this.pos.x * 0 + Math.hypot(this.wanderPos.x - this.pos.x, this.wanderPos.y - this.pos.z) < 0.6) {
        const a = Math.random() * Math.PI * 2;
        const r = 1 + Math.sqrt(Math.random()) * 4.2;
        this.wanderPos = new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r);
      }
      desired.set(this.wanderPos.x - this.pos.x, this.wanderPos.y - this.pos.z);
    }
    desired.normalize();

    // 避浅水：往深处偏
    const depth = pondDepth(this.pos.x, this.pos.z);
    if (depth < 0.4) {
      const e = 0.4;
      const gx = pondDepth(this.pos.x + e, this.pos.z) - pondDepth(this.pos.x - e, this.pos.z);
      const gz = pondDepth(this.pos.x, this.pos.z + e) - pondDepth(this.pos.x, this.pos.z - e);
      desired.x += gx * 3.5; desired.y += gz * 3.5;
      desired.normalize();
    }
    // 相互 separation
    for (const o of others) {
      if (o === this) continue;
      const dx = this.pos.x - o.pos.x, dz = this.pos.z - o.pos.z;
      const d2 = dx * dx + dz * dz;
      if (d2 < 0.16 && d2 > 1e-6) { const d = Math.sqrt(d2); desired.x += dx / d * 0.8; desired.y += dz / d * 0.8; }
    }
    desired.normalize();

    const ta = Math.atan2(desired.y, desired.x);
    let da = ta - this.heading;
    while (da > Math.PI) da -= Math.PI * 2;
    while (da < -Math.PI) da += Math.PI * 2;
    this.heading += da * Math.min(1, dt * (this.flee > 0 ? 6 : 2.6));

    // ---- 速度 ----
    let spd = this.baseSpeed;
    if (this.flee > 0) spd = 1.5;
    else if (this.feeding) spd = 0.55;
    this.speed += (spd - this.speed) * Math.min(1, dt * 3);

    this.pos.x += Math.cos(this.heading) * this.speed * dt;
    this.pos.z += Math.sin(this.heading) * this.speed * dt;

    // ---- 深度 ----
    const depthNow = pondDepth(this.pos.x, this.pos.z);
    let targetY;
    if (this.feeding && this.flee <= 0) targetY = -0.045;
    else targetY = -Math.min(0.72, depthNow * 0.5 + 0.08);
    this.pos.y += (targetY - this.pos.y) * Math.min(1, dt * 1.6);

    // ---- 吃食 ----
    if (this.feeding && this.nibbleCd <= 0) {
      const pe = this.feeding;
      const d = Math.hypot(pe.x - this.pos.x, pe.z - this.pos.z);
      if (d < 0.16 && !pe.eaten) {
        pe.eaten = true;
        this.nibbleCd = 0.35 + Math.random() * 0.4;
        ripple(pe.x, pe.z, 0.05, -0.008);
      }
    }

    // ---- 姿态 ----
    this.group.position.copy(this.pos);
    this.group.rotation.y = -this.heading;
    const wag = Math.sin(t * (3.5 + this.speed * 9) + this.wagPhase);
    this.tail.rotation.y = wag * 0.55;
    this.inner.rotation.y = wag * 0.1;
    this.group.rotation.z = wag * 0.06;
    const pitch = Math.max(-0.4, Math.min(0.4, (targetY - this.pos.y) * -3));
    this.group.rotation.z += 0;
    this.inner.rotation.x = pitch * 0.5;
  }

  scare(x, z, radius) {
    const dx = this.pos.x - x, dz = this.pos.z - z;
    const d = Math.hypot(dx, dz);
    if (d < radius) {
      this.flee = 2.2 + Math.random() * 1.5;
      this.fleeDir.set(dx / (d + 1e-4), dz / (d + 1e-4));
      this.feeding = null;
    }
  }
}

export class KoiSchool {
  constructor(scene) {
    const kinds = [0, 1, 2, 0, 3, 1];
    this.kois = kinds.map((k, i) => new Koi(scene, k, 0.75 + Math.random() * 0.5));
    events.on('splash', (e) => {
      for (const k of this.kois) k.scare(e.x, e.z, 4.5);
    });
  }

  update(dt, t, ctx) {
    for (const k of this.kois) k.update(dt, t, { ...ctx, others: this.kois });
  }
}
