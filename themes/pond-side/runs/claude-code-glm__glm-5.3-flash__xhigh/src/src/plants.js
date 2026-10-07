import * as THREE from 'three';
import { POND, floorY, pondDepth, pondNorm, fbm, clamp01 } from './pond.js';
import { lilyPadTexture, petalTexture, barkTexture } from './textures.js';
import { swayInject } from './glsl.js';
import { mergeGeoms } from './terrain.js';
import { ambientWave } from './sim.js';

function wobble(a) {
  return 1 + 0.16 * Math.sin(3 * a + 1.2) + 0.10 * Math.sin(5 * a + 4.0) + 0.07 * Math.sin(8 * a + 2.2);
}
function shoreRadius(angle) { return POND.R0 * wobble(angle); }

// ---------------- 芦苇 ----------------
export function buildReeds(scene) {
  const stem = new THREE.CylinderGeometry(0.007, 0.016, 1, 5, 3);
  stem.translate(0, 0.5, 0);
  const head = new THREE.CylinderGeometry(0.013, 0.013, 0.17, 5);
  head.translate(0, 0.94, 0);
  const geo = mergeGeoms([stem, head]);

  // 顶点色：秆绿 → 穗褐
  const p = geo.attributes.position;
  const col = new Float32Array(p.count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    if (p.getY(i) > 0.84) c.setRGB(0.30, 0.21, 0.11);
    else c.setRGB(0.32 + Math.random() * 0.08, 0.38, 0.15);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const flex = new Float32Array(p.count);
  for (let i = 0; i < p.count; i++) flex[i] = clamp01(p.getY(i)) ** 1.5;
  geo.setAttribute('aFlex', new THREE.BufferAttribute(flex, 1));

  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, side: THREE.DoubleSide });
  mat.onBeforeCompile = (sh) => swayInject(sh, { amp: 0.34, speed: 1.15 });

  const N = 300;
  const inst = new THREE.InstancedMesh(geo, mat, N);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3();
  const clusters = [0.55, 2.05, 3.65, 5.35];
  let count = 0;
  for (const baseA of clusters) {
    const n = 68 + Math.floor(Math.random() * 10);
    for (let i = 0; i < n && count < N; i++) {
      const a = baseA + (Math.random() - 0.5) * 0.5;
      const r = shoreRadius(a) - Math.random() * 1.5;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const d = pondDepth(x, z);
      const y = d > 0 ? -d + 0.02 : floorY(x, z) - 0.03;
      const hgt = 1.1 + Math.random() * 1.15;
      e.set((Math.random() - 0.5) * 0.14, Math.random() * 6.28, (Math.random() - 0.5) * 0.14);
      q.setFromEuler(e);
      s.set(1, hgt, 1);
      m.compose(new THREE.Vector3(x, y, z), q, s);
      inst.setMatrixAt(count++, m);
    }
  }
  inst.count = count;
  inst.instanceMatrix.needsUpdate = true;
  scene.add(inst);
  return inst;
}

// ---------------- 柳树 ----------------
export function buildWillow(scene) {
  const group = new THREE.Group();
  const base = new THREE.Vector3(6.1, 0, -5.6);
  const lean = new THREE.Vector3(-0.32, 0, 0.42).normalize(); // 朝水面倾斜
  base.y = floorY(base.x, base.z) - 0.15;
  const topY = 3.9;
  const top = base.clone().addScaledVector(lean, 1.1).setY(base.y + topY);

  const bark = barkTexture();
  bark.wrapS = bark.wrapT = THREE.RepeatWrapping;
  bark.repeat.set(2, 3);

  // 树干
  const profile = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    profile.push(new THREE.Vector2(0.34 * (1 - t * 0.62) + Math.sin(t * 9) * 0.015, t * topY));
  }
  const trunkGeo = new THREE.LatheGeometry(profile, 10);
  const trunk = new THREE.Mesh(trunkGeo, new THREE.MeshStandardMaterial({ map: bark, roughness: 0.95 }));
  trunk.position.copy(base);
  trunk.rotation.z = -lean.x * 0.5;
  trunk.rotation.x = lean.z * 0.5;
  group.add(trunk);

  // 下垂枝条 + 小枝
  const rng = mulberry(12);
  const branchMat = new THREE.MeshStandardMaterial({ color: 0x5a4526, roughness: 0.9 });
  branchMat.onBeforeCompile = (sh) => swayInject(sh, { amp: 0.10, speed: 0.9 });
  const twigMat = new THREE.MeshStandardMaterial({ color: 0x6a5328, roughness: 0.9 });
  twigMat.onBeforeCompile = (sh) => swayInject(sh, { amp: 0.2, speed: 1.2, phase: 2.2 });

  // 细长柳叶形（两端尖）
  const lf = new THREE.Shape();
  lf.moveTo(0, 0);
  lf.quadraticCurveTo(0.017, 0.045, 0, 0.135);
  lf.quadraticCurveTo(-0.017, 0.045, 0, 0);
  const leafGeoBase = new THREE.ShapeGeometry(lf, 6);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7, side: THREE.DoubleSide });
  leafMat.onBeforeCompile = (sh) => swayInject(sh, { amp: 0.3, speed: 1.9, phase: 5.1 });

  const MAX_LEAVES = 2400;
  const leafInst = new THREE.InstancedMesh(leafGeoBase, leafMat, MAX_LEAVES);
  const lm = new THREE.Matrix4(), lq = new THREE.Quaternion(), le = new THREE.Euler(), ls = new THREE.Vector3();
  const lc = new THREE.Color();
  let leafCount = 0;
  const leafSources = [];

  const branchPts = [];
  const nBr = 9;
  for (let i = 0; i < nBr; i++) {
    const a = (i / nBr) * Math.PI * 2 + rng() * 0.5;
    const horiz = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    // 混合倾斜方向，让树冠偏向水面
    horiz.lerp(new THREE.Vector3(lean.x, 0, lean.z).normalize(), 0.45).normalize();
    const L = 2.6 + rng() * 1.7;
    const drop = 2.3 + rng() * 1.9;
    const p0 = top.clone().addScaledVector(horiz, 0.15);
    const pts = [
      p0,
      p0.clone().addScaledVector(horiz, L * 0.33).add(new THREE.Vector3(0, 0.75, 0)),
      p0.clone().addScaledVector(horiz, L * 0.66).add(new THREE.Vector3(0, 0.45, 0)),
      p0.clone().addScaledVector(horiz, L * 0.88).add(new THREE.Vector3(0, -drop * 0.55, 0)),
      p0.clone().addScaledVector(horiz, L).add(new THREE.Vector3(0, -drop, 0))
    ];
    branchPts.push(pts);
    const curve = new THREE.CatmullRomCurve3(pts);
    const tube = new THREE.TubeGeometry(curve, 14, 0.05 - 0.02 * (i % 2), 5);
    group.add(new THREE.Mesh(tube, branchMat));

    // 小枝与叶
    const twigs = [];
    const nTwig = 9;
    for (let t = 0; t < nTwig; t++) {
      const u = 0.45 + (t / nTwig) * 0.53;
      const sp = curve.getPoint(u);
      const down = new THREE.Vector3((rng() - 0.5) * 0.5, -1, (rng() - 0.5) * 0.5).normalize();
      const len2 = 0.55 + rng() * 0.75;
      const tCurve = new THREE.CatmullRomCurve3([
        sp,
        sp.clone().addScaledVector(down, len2 * 0.5).add(new THREE.Vector3((rng() - 0.5) * 0.2, 0, (rng() - 0.5) * 0.2)),
        sp.clone().addScaledVector(down, len2)
      ]);
      twigs.push(tCurve);
      const tg = new THREE.TubeGeometry(tCurve, 6, 0.011, 4);
      const twig = new THREE.Mesh(tg, twigMat);
      group.add(twig);

      // 沿小枝放叶
      const nLeaf = 19;
      for (let k = 0; k < nLeaf && leafCount < MAX_LEAVES; k++) {
        const u2 = 0.08 + (k / nLeaf) * 0.92;
        const lp = tCurve.getPoint(u2);
        le.set(rng() * 6.28, rng() * 6.28, rng() * 6.28);
        lq.setFromEuler(le);
        ls.setScalar(0.85 + rng() * 0.5);
        lm.compose(lp, lq, ls);
        leafInst.setMatrixAt(leafCount, lm);
        const g = 0.75 + rng() * 0.5;
        lc.setRGB(0.24 * g, 0.42 * g, 0.13 * g);
        leafInst.setColorAt(leafCount, lc);
        leafCount++;
        if (leafSources.length < 60 && rng() < 0.12) leafSources.push(lp.clone());
      }
    }
  }
  leafInst.count = leafCount;
  leafInst.instanceMatrix.needsUpdate = true;
  group.add(leafInst);
  scene.add(group);
  return { group, leafSources, top };
}

function mulberry(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------- 荷叶与睡莲 ----------------
export function buildLilies(scene) {
  const pads = [];
  const tex = lilyPadTexture();
  const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.62, side: THREE.DoubleSide });
  const petalMat = new THREE.MeshStandardMaterial({ map: petalTexture(), roughness: 0.55, side: THREE.DoubleSide });
  const centerMat = new THREE.MeshStandardMaterial({ color: 0xd8b84a, roughness: 0.5 });

  const clusters = [
    { cx: 2.9, cz: 2.4, n: 7 },
    { cx: 4.4, cz: 0.6, n: 5 },
    { cx: 0.4, cz: 4.1, n: 4 }
  ];
  for (const cl of clusters) {
    for (let i = 0; i < cl.n; i++) {
      const a = Math.random() * 6.28;
      const r = Math.sqrt(Math.random()) * 1.5;
      const x = cl.cx + Math.cos(a) * r, z = cl.cz + Math.sin(a) * r;
      const d = pondDepth(x, z);
      if (d < 0.18) continue;
      const rad = 0.2 + Math.random() * 0.17;
      const shape = new THREE.Shape();
      const notch = 0.9; // 缺口角
      shape.absarc(0, 0, rad, notch / 2, Math.PI * 2 - notch / 2, false);
      shape.lineTo(0, 0);
      const geo = new THREE.ShapeGeometry(shape, 20);
      // 轻微上拱
      const p = geo.attributes.position;
      for (let k = 0; k < p.count; k++) {
        const px = p.getX(k), py = p.getY(k);
        const dd = Math.hypot(px, py) / rad;
        p.setZ(k, (1 - dd * dd) * 0.035);
      }
      geo.computeVertexNormals();
      // ShapeGeometry 的 UV 是原始坐标，重映射到 0..1
      const uv = geo.attributes.uv;
      for (let k = 0; k < uv.count; k++) {
        uv.setXY(k, (uv.getX(k) / rad + 1) * 0.5, (uv.getY(k) / rad + 1) * 0.5);
      }
      const pad = new THREE.Mesh(geo, mat);
      pad.rotation.x = -Math.PI / 2;
      pad.position.set(x, 0.02, z);
      pad.userData = { x, z, r: rad * 0.92, phase: Math.random() * 6.28 };
      scene.add(pad);
      pads.push(pad);

      // 睡莲花
      if (i % 3 === 0 && rad > 0.26) {
        const fl = new THREE.Group();
        const nPet = 9;
        for (let k = 0; k < nPet; k++) {
          const pg = new THREE.PlaneGeometry(0.05, 0.11);
          const pet = new THREE.Mesh(pg, petalMat);
          const a2 = (k / nPet) * Math.PI * 2;
          pet.position.set(Math.cos(a2) * 0.035, 0.045, Math.sin(a2) * 0.035);
          pet.rotation.y = -a2;
          pet.rotation.x = 0.7;
          fl.add(pet);
        }
        const cc = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 6), centerMat);
        cc.position.y = 0.07;
        fl.add(cc);
        fl.position.set(x + (Math.random() - 0.5) * 0.1, 0.05, z + (Math.random() - 0.5) * 0.1);
        pad.userData.flower = fl;
        scene.add(fl);
      }
    }
  }
  return pads;
}

// 荷叶随波起伏（由主循环调用）
export function updateLilies(pads, dt, t, sim, wind) {
  for (const pad of pads) {
    const u = pad.userData;
    const amb = ambientWave(u.x, u.z, t, wind);
    const h = sim.heightAt(u.x, u.z) + amb.h;
    pad.position.y = 0.015 + h * 0.9;
    const g = sim.gradAt(u.x, u.z);
    pad.rotation.x = -Math.PI / 2 + Math.max(-0.25, Math.min(0.25, Math.atan(g.gz) * 0.5));
    pad.rotation.z = Math.max(-0.25, Math.min(0.25, Math.atan(g.gx) * 0.5));
    if (u.flower) {
      u.flower.position.y = pad.position.y + 0.035;
      u.flower.rotation.z = pad.rotation.z;
      u.flower.rotation.x = pad.rotation.x;
    }
  }
}
