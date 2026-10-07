// 锦鲤：程序化身体 + 尾鳍摆动的顶点动画；漫游 / 抢食 / 受惊逃散
import * as THREE from 'three';
import { koiTexture, pondRR, depthAt, rand, clamp, lerp, fbm } from './common.js';

function fishGeometry() {
  // 身体：椭球拉伸 + 尾鳍三角面 + 背鳍/胸鳍小片，合并为单个几何体
  const geos = [];
  const body = new THREE.SphereGeometry(0.5, 14, 10);
  body.scale(1.5, 0.62, 0.42); // 长0.75 高0.31 宽0.21
  geos.push(body);
  const mk = (pts) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts.flat(), 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(pts.map(() => [0.5, 0.5]).flat(), 2));
    g.computeVertexNormals();
    return g;
  };
  // 尾鳍（两三角叉形）
  geos.push(mk([[-0.72, 0, 0], [-1.05, 0.16, 0], [-0.98, 0, 0]]));
  geos.push(mk([[-0.72, 0, 0], [-0.98, 0, 0], [-1.05, -0.16, 0]]));
  // 背鳍
  geos.push(mk([[-0.1, 0.28, 0], [-0.42, 0.3, 0], [-0.25, 0.48, 0]]));
  // 胸鳍
  geos.push(mk([[0.2, -0.08, 0.12], [0.05, -0.1, 0.12], [0.1, -0.2, 0.28]]));
  geos.push(mk([[0.2, -0.08, -0.12], [0.05, -0.1, -0.12], [0.1, -0.2, -0.28]]));
  // 合并
  let total = 0, itotal = 0;
  const pos = [], uv = [], idx = [];
  for (const g of geos) {
    const p = g.attributes.position, u = g.attributes.uv;
    for (let i = 0; i < p.count; i++) {
      pos.push(p.getX(i), p.getY(i), p.getZ(i));
      uv.push(u.getX(i), u.getY(i));
    }
    const index = g.index;
    if (index) for (let i = 0; i < index.count; i++) idx.push(index.getX(i) + total);
    else for (let i = 0; i < p.count; i++) idx.push(i + total);
    total += p.count;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

export class Koi {
  constructor(scene, n = 5, simHooks) {
    this.fishes = [];
    this.group = new THREE.Group();
    const geo = fishGeometry();
    for (let i = 0; i < n; i++) {
      const tex = koiTexture(i * 0.37 + 0.13);
      const mat = new THREE.MeshStandardMaterial({
        map: tex, roughness: 0.55, metalness: 0,
        emissive: 0x40200a, emissiveIntensity: 0.85, // 水下弱发光，提升可见度
      });
      const phase = rand(Math.PI * 2), speed = rand(4, 6);
      mat.onBeforeCompile = (sh) => {
        sh.uniforms.uTime = { value: 0 };
        sh.uniforms.uWag = { value: 1 };
        mat.userData.sh = sh;
        sh.vertexShader = sh.vertexShader
          .replace('#include <common>', '#include <common>\nuniform float uTime,uWag;')
          .replace('#include <begin_vertex>', `#include <begin_vertex>
            {
              float bx = transformed.x;
              float wag = sin(uTime * ${speed.toFixed(1)} + bx * 2.6) * uWag;
              transformed.z += wag * (0.06 + max(-bx, 0.0) * 0.35);
              transformed.x += wag * 0.02;
            }`);
      };
      const m = new THREE.Mesh(geo, mat);
      const th = rand(Math.PI * 2);
      const rr = rand(0.15, 0.6);
      const f = {
        mesh: m, mat, phase,
        pos: new THREE.Vector3(Math.cos(th) * 8 * rr, -rand(0.35, 0.9), Math.sin(th) * 7 * rr),
        vel: new THREE.Vector3(rand(-1, 1), 0, rand(-1, 1)).normalize().multiplyScalar(0.4),
        heading: rand(Math.PI * 2), speed: rand(0.35, 0.55),
        state: 'wander', target: null, fleeT: 0, nibbleT: 0, depth: rand(0.25, 0.8),
        scale: rand(0.75, 1.05),
      };
      m.scale.setScalar(f.scale);
      this.fishes.push(f);
      this.group.add(m);
    }
    scene.add(this.group);
    this.scares = [];
    this.food = [];
    this.sim = simHooks;
    this.t = 0;
  }

  scare(x, z, power = 1) {
    for (const f of this.fishes) {
      const d = Math.hypot(f.pos.x - x, f.pos.z - z);
      if (d < 4 * power + 1) {
        f.state = 'flee';
        f.fleeT = rand(1.2, 2.2);
        f.fleeDir = Math.atan2(f.pos.z - z, f.pos.x - x) + rand(-0.4, 0.4);
      }
    }
  }

  update(dt, foods, waveField) {
    this.t += dt;
    for (const f of this.fishes) {
      // 选择状态
      if (f.state !== 'flee') {
        let best = null, bd = 4.5;
        for (const fd of foods) {
          if (fd.amount <= 0) continue;
          const d = Math.hypot(fd.x - f.pos.x, fd.z - f.pos.z);
          if (d < bd) { bd = d; best = fd; }
        }
        f.target = best;
        f.state = best ? 'seek' : 'wander';
      }

      let wantSpeed = f.speed, wantY = -f.depth;
      if (f.state === 'flee') {
        f.fleeT -= dt;
        const desired = f.fleeDir;
        f.heading += angDiff(desired, f.heading) * Math.min(1, dt * 6);
        wantSpeed = 2.6;
        wantY = -Math.max(0.7, f.depth);
        if (f.fleeT <= 0) f.state = 'wander';
      } else if (f.state === 'seek' && f.target) {
        const d = Math.hypot(f.target.x - f.pos.x, f.target.z - f.pos.z);
        const desired = Math.atan2(f.target.z - f.pos.z, f.target.x - f.pos.x);
        f.heading += angDiff(desired, f.heading) * Math.min(1, dt * 3.5);
        wantSpeed = d > 1 ? 1.1 : 0.25;
        wantY = d < 0.8 ? -0.1 : lerp(-0.25, -f.depth, clamp(d / 3, 0, 1));
        // 到嘴边：啄食 → 小涟漪
        if (d < 0.45) {
          f.nibbleT -= dt;
          if (f.nibbleT <= 0) {
            f.nibbleT = rand(0.35, 0.7);
            f.target.amount -= 1;
            this.sim.addDrop(f.pos.x, f.pos.z, 0.12, -0.05);
            waveField.addRipple(f.pos.x, f.pos.z, 0.015, 2.2, 1.2);
          }
        }
      } else {
        // 漫游：噪声转向 + 避开岸边
        const n = fbm(f.pos.x * 0.2 + this.t * 0.1, f.pos.z * 0.2, 2) - 0.5;
        f.heading += n * dt * 2.2 + Math.sin(this.t * 0.3 + f.phase) * dt * 0.4;
        wantSpeed = f.speed;
        wantY = -f.depth;
      }

      // 边界：靠近岸边回转
      const rr = pondRR(f.pos.x, f.pos.z);
      if (rr > 0.8) {
        const toCenter = Math.atan2(-f.pos.z, -f.pos.x);
        f.heading += angDiff(toCenter, f.heading) * Math.min(1, dt * 4 * (rr - 0.7) * 4);
      }
      // 深度限制
      const floorY = -depthAt(f.pos.x, f.pos.z) + 0.25;
      if (wantY < floorY) wantY = floorY;

      // 前进
      const vx = Math.cos(f.heading) * wantSpeed, vz = Math.sin(f.heading) * wantSpeed;
      f.vel.x = lerp(f.vel.x, vx, Math.min(1, dt * 2.5));
      f.vel.z = lerp(f.vel.z, vz, Math.min(1, dt * 2.5));
      f.vel.y = lerp(f.vel.y, (wantY - f.pos.y) * 1.5, Math.min(1, dt * 3));
      f.pos.addScaledVector(f.vel, dt);

      // 姿态
      f.mesh.position.copy(f.pos);
      const sp = Math.hypot(f.vel.x, f.vel.z);
      const yaw = Math.atan2(-f.vel.z, f.vel.x);
      const pitch = sp > 0.05 ? Math.atan2(-f.vel.y, sp) * 0.7 : 0;
      f.mesh.rotation.set(0, yaw, pitch, 'YXZ');
      f.mesh.rotation.z = clamp(pitch, -0.5, 0.5);

      if (f.mat.userData.sh) {
        f.mat.userData.sh.uniforms.uTime.value = this.t + f.phase;
        f.mat.userData.sh.uniforms.uWag.value = clamp(sp * 2.2 + 0.3, 0.4, 1.4);
      }
    }
  }
}

function angDiff(a, b) {
  let d = a - b;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}
