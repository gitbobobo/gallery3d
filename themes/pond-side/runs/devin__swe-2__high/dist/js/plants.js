// 芦苇丛（香蒲）+ 垂柳（枝条垂到水面，随风摆）
import * as THREE from 'three';
import { terrainHeight, shoreRadius, rand, fbm } from './common.js';

// ---------- 芦苇 ----------
export function createReeds(simUniforms) {
  const group = new THREE.Group();

  // 茎：细长锥形
  const stalkGeo = new THREE.CylinderGeometry(0.008, 0.02, 1, 5, 4);
  stalkGeo.translate(0, 0.5, 0);
  // 穗：棕色短棒
  const headGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.28, 6);
  headGeo.translate(0, 0.14, 0);
  // 叶：细长片
  const leafGeo = new THREE.PlaneGeometry(0.05, 1, 1, 5);
  leafGeo.translate(0, 0.5, 0);

  const swayInject = (mat, amp) => {
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uTime = simUniforms.uTime;
      sh.uniforms.uWind = simUniforms.uWind;
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\nuniform float uTime,uWind;\nattribute float aPhase;\nattribute float aLean;')
        .replace('#include <begin_vertex>', `#include <begin_vertex>
          {
            float k = transformed.y * transformed.y;
            float sw = sin(uTime * (1.1 + uWind * 1.8) + aPhase) * ${amp} * (0.25 + uWind);
            transformed.x += sw * k * 1.4;
            transformed.z += sw * k * 0.8 + aLean * k;
          }`);
    };
    return mat;
  };
  const stalkMat = swayInject(new THREE.MeshLambertMaterial({ color: 0x6d8f3e }), 0.16);
  const headMat = swayInject(new THREE.MeshLambertMaterial({ color: 0x6b4426 }), 0.2);
  const leafMat = swayInject(new THREE.MeshLambertMaterial({ color: 0x557d33, side: THREE.DoubleSide }), 0.3);

  // 芦苇丛位置：岸边几处（避开栈桥一侧）
  const clusters = [
    { th: 2.5, n: 14 }, { th: 2.95, n: 10 }, { th: 3.6, n: 12 },
    { th: 5.5, n: 9 }, { th: 4.4, n: 7 },
  ];
  let total = 0; clusters.forEach(c => total += c.n);
  const stalks = new THREE.InstancedMesh(stalkGeo, stalkMat, total);
  const heads = new THREE.InstancedMesh(headGeo, headMat, total);
  const leaves = new THREE.InstancedMesh(leafGeo, leafMat, total * 2);
  const stalkPh = new THREE.InstancedBufferAttribute(new Float32Array(total), 1);
  const stalkLean = new THREE.InstancedBufferAttribute(new Float32Array(total), 1);
  const headPh = new THREE.InstancedBufferAttribute(new Float32Array(total), 1);
  const headLean = new THREE.InstancedBufferAttribute(new Float32Array(total), 1);
  const leafPh = new THREE.InstancedBufferAttribute(new Float32Array(total * 2), 1);
  const leafLean = new THREE.InstancedBufferAttribute(new Float32Array(total * 2), 1);

  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3();
  const c1 = new THREE.Color();
  let i = 0, li = 0;
  for (const cl of clusters) {
    const sr = shoreRadius(cl.th);
    const cx = Math.cos(cl.th) * sr * 1.0, cz = Math.sin(cl.th) * sr * 1.0;
    for (let k = 0; k < cl.n; k++) {
      const x = cx + rand(-0.9, 0.9), z = cz + rand(-0.9, 0.9);
      const y = terrainHeight(x, z);
      const h = rand(1.1, 2.1);
      const ph = rand(Math.PI * 2);
      const lean = rand(-0.12, 0.12);
      e.set(rand(-0.1, 0.1), rand(Math.PI * 2), rand(-0.1, 0.1));
      q.setFromEuler(e);
      m4.compose(new THREE.Vector3(x, Math.max(y, -0.15) - 0.05, z), q, s.set(1, h, 1));
      stalks.setMatrixAt(i, m4);
      stalkPh.setX(i, ph); stalkLean.setX(i, lean);
      // 穗在茎顶（跟随后摆由 shader 近似）
      m4.compose(new THREE.Vector3(x, Math.max(y, -0.15) - 0.05 + h * 0.93, z), q, s.set(1, rand(0.8, 1.2), 1));
      heads.setMatrixAt(i, m4);
      headPh.setX(i, ph); headLean.setX(i, lean * h);
      c1.setHSL(0.08, 0.5, rand(0.2, 0.32));
      heads.setColorAt(i, c1);
      for (let j = 0; j < 2; j++) {
        const ly = Math.max(y, -0.15) + rand(0.1, h * 0.5);
        e.set(rand(-0.5, -0.15), rand(Math.PI * 2), 0);
        q.setFromEuler(e);
        m4.compose(new THREE.Vector3(x, ly, z), q, s.set(1, rand(0.5, 1.0), 1));
        leaves.setMatrixAt(li, m4);
        leafPh.setX(li, ph + rand(0.5)); leafLean.setX(li, rand(-0.2, 0.2));
        li++;
      }
      i++;
    }
  }
  stalkGeo.setAttribute('aPhase', stalkPh); stalkGeo.setAttribute('aLean', stalkLean);
  headGeo.setAttribute('aPhase', headPh); headGeo.setAttribute('aLean', headLean);
  leafGeo.setAttribute('aPhase', leafPh); leafGeo.setAttribute('aLean', leafLean);
  stalks.castShadow = true;
  group.add(stalks, heads, leaves);
  return { group };
}

// ---------- 垂柳 ----------
export function createWillow(simUniforms) {
  const group = new THREE.Group();
  const bx = -9.6, bz = -5.9;                 // 西北岸（岸上，枝条探向水面）
  const by = terrainHeight(bx, bz);

  // 树干：弯曲圆锥
  const trunkCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(bx, by - 0.3, bz),
    new THREE.Vector3(bx + 0.25, by + 1.2, bz + 0.15),
    new THREE.Vector3(bx + 0.75, by + 2.4, bz + 0.5),
    new THREE.Vector3(bx + 1.4, by + 3.3, bz + 1.0),
  ]);
  const trunk = new THREE.Mesh(
    new THREE.TubeGeometry(trunkCurve, 12, 0.34, 8), 
    new THREE.MeshStandardMaterial({ color: 0x4f3d2a, roughness: 1 }));
  trunk.castShadow = true;
  group.add(trunk);
  const top = trunkCurve.getPoint(1);

  // 枝条：从树冠向外下垂的悬链线；枝条 = 茎管 + 沿线柳叶（合并几何 + 顶点属性摆动）
  const stemPos = [], stemIdx = [], stemHang = [], stemPh = [];
  const leafPos = [], leafIdx = [], leafNorm = [], leafHang = [], leafPh = [], leafCol = [];
  const NBR = 17;
  let vBase = 0, lBase = 0;
  const tmp = new THREE.Vector3(), tan = new THREE.Vector3(), side = new THREE.Vector3(), nrm = new THREE.Vector3();
  const tips = [];
  for (let b = 0; b < NBR; b++) {
    const ang = (b / NBR) * Math.PI * 2 + rand(-0.15, 0.15);
    const outR = rand(1.8, 3.8);
    const droop = rand(2.2, 4.4);
    const p0 = top.clone().add(new THREE.Vector3(Math.cos(ang) * 0.3, rand(-0.2, 0.3), Math.sin(ang) * 0.3));
    const p1 = p0.clone().add(new THREE.Vector3(Math.cos(ang) * outR * 0.6, rand(0.3, 0.9), Math.sin(ang) * outR * 0.6));
    const p2 = p0.clone().add(new THREE.Vector3(Math.cos(ang) * outR, -droop, Math.sin(ang) * outR));
    if (p2.y < 0.02) p2.y = rand(0.02, 0.35);
    const curve = new THREE.QuadraticBezierCurve3(p0, p1, p2);
    tips.push(p2.clone());
    const SEG = 14;
    const ph = rand(Math.PI * 2);
    for (let i2 = 0; i2 < SEG; i2++) {
      const t0 = i2 / SEG, t1 = (i2 + 1) / SEG;
      const a = curve.getPoint(t0), c = curve.getPoint(t1);
      // 细茎：沿切线垂直方向给一点宽度的四边形
      tan.subVectors(c, a).normalize();
      side.set(-tan.z, 0, tan.x).normalize();
      const sw = 0.014;
      for (const [pt, hang] of [[a, t0], [c, t1]]) {
        stemPos.push(pt.x + side.x * sw, pt.y, pt.z + side.z * sw,
                     pt.x - side.x * sw, pt.y, pt.z - side.z * sw);
        stemHang.push(hang, hang);
        stemPh.push(ph, ph);
      }
      const bi = vBase;
      stemIdx.push(bi, bi + 1, bi + 2, bi + 1, bi + 3, bi + 2);
      vBase += 4;
      // 柳叶：沿枝条两侧交错的小片
      const nl = 3;
      for (let l = 0; l < nl; l++) {
        const t = (i2 + 0.2 + l * 0.32) / SEG;
        if (t > 1) continue;
        const p = curve.getPoint(t);
        curve.getTangent(t, tan);
        side.set(-tan.z, 0, tan.x).normalize();
        nrm.crossVectors(tan, side);
        const lw = 0.05, ll = 0.2 * (1 - t * 0.35);
        const droop2 = new THREE.Vector3(0, -0.7, 0).add(tan.clone().multiplyScalar(0.5)).normalize();
        for (const sgn of [-1, 1]) {
          const bp = p.clone().addScaledVector(side, sgn * 0.015);
          const tip = bp.clone().addScaledVector(droop2, ll).addScaledVector(side, sgn * 0.01);
          const w1 = bp.clone().addScaledVector(side, lw), w2 = bp.clone().addScaledVector(side, -lw);
          leafPos.push(bp.x, bp.y, bp.z, w1.x, w1.y, w1.z, tip.x, tip.y, tip.z, w2.x, w2.y, w2.z);
          for (let vv = 0; vv < 4; vv++) {
            leafNorm.push(nrm.x, nrm.y, nrm.z);
            leafHang.push(t); leafPh.push(ph);
            leafCol.push(0.42 + rand(0.2), 0.58 + rand(0.18), 0.2 + rand(0.06));
          }
          leafIdx.push(lBase, lBase + 1, lBase + 2, lBase, lBase + 2, lBase + 3);
          lBase += 4;
        }
      }
    }
  }
  // 茎几何（面片近似）
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute('position', new THREE.Float32BufferAttribute(stemPos, 3));
  sGeo.setAttribute('aHang', new THREE.Float32BufferAttribute(stemHang, 1));
  sGeo.setAttribute('aPhase', new THREE.Float32BufferAttribute(stemPh, 1));
  sGeo.setIndex(stemIdx);
  const stemMat = new THREE.MeshLambertMaterial({ color: 0x5a4a30, side: THREE.DoubleSide });
  const sway2 = (mat, amp) => {
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uTime = simUniforms.uTime;
      sh.uniforms.uWind = simUniforms.uWind;
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\nuniform float uTime,uWind;\nattribute float aHang;\nattribute float aPhase;')
        .replace('#include <begin_vertex>', `#include <begin_vertex>
          {
            float k = aHang * aHang;
            float sw = sin(uTime * (0.9 + uWind * 2.2) + aPhase) * ${amp} * (0.3 + uWind * 1.6);
            transformed.x += sw * k;
            transformed.z += sw * 0.7 * k;
            transformed.x += sin(uTime * 3.0 + aPhase * 3.0 + aHang * 9.0) * ${amp} * 0.25 * uWind * aHang;
          }`);
    };
    return mat;
  };
  sway2(stemMat, 0.12);
  const stems = new THREE.Mesh(sGeo, stemMat);
  stems.frustumCulled = false;
  group.add(stems);

  const lGeo = new THREE.BufferGeometry();
  lGeo.setAttribute('position', new THREE.Float32BufferAttribute(leafPos, 3));
  lGeo.setAttribute('normal', new THREE.Float32BufferAttribute(leafNorm, 3));
  lGeo.setAttribute('color', new THREE.Float32BufferAttribute(leafCol, 3));
  lGeo.setAttribute('aHang', new THREE.Float32BufferAttribute(leafHang, 1));
  lGeo.setAttribute('aPhase', new THREE.Float32BufferAttribute(leafPh, 1));
  lGeo.setIndex(leafIdx);
  const leafMat2 = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
  sway2(leafMat2, 0.12);
  const willowLeaves = new THREE.Mesh(lGeo, leafMat2);
  willowLeaves.frustumCulled = false;
  willowLeaves.castShadow = true;
  group.add(willowLeaves);

  return { group, tips };
}
