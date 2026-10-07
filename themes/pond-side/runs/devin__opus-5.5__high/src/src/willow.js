import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { willowBase, heightAt } from './pond.js';
import { rng } from './noise.js';
import { patchMaterial, patchedDepthMaterial, setLayers, LAYER } from './shared.js';

function taperedTube(points, r0, r1, radial = 7) {
  const curve = new THREE.CatmullRomCurve3(points);
  const segs = Math.max(4, Math.round(curve.getLength() * 5));
  const frames = curve.computeFrenetFrames(segs, false);
  const pos = [], nor = [], uv = [], idx = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const p = curve.getPointAt(t);
    const r = r0 + (r1 - r0) * Math.pow(t, 0.8);
    const N = frames.normals[i], B = frames.binormals[i];
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      const n = new THREE.Vector3().addScaledVector(N, Math.cos(a)).addScaledVector(B, Math.sin(a));
      pos.push(p.x + n.x * r, p.y + n.y * r, p.z + n.z * r);
      nor.push(n.x, n.y, n.z);
      uv.push(j / radial, t * curve.getLength() * 2);
    }
  }
  for (let i = 0; i < segs; i++)
    for (let j = 0; j < radial; j++) {
      const a = i * (radial + 1) + j, b = a + radial + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return { geo: g, curve };
}

function barkTexture() {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 512;
  const g = c.getContext('2d');
  g.fillStyle = '#4a3d31';
  g.fillRect(0, 0, 128, 512);
  const r = rng(91);
  for (let i = 0; i < 260; i++) {
    const x = r() * 128, w = 1 + r() * 4;
    const l = 30 + r() * 160, y = r() * 512;
    const v = Math.floor(30 + r() * 60);
    g.fillStyle = `rgba(${v},${Math.floor(v * 0.85)},${Math.floor(v * 0.7)},${0.35 + r() * 0.5})`;
    g.fillRect(x, y, w, l);
    g.fillRect(x - 128, y, w, l);
    g.fillRect(x, y - 512, w, l);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function leafGeometry(len = 0.11, wid = 0.016) {
  // lanceolate leaf lying along +Y, in XY plane
  const pts = [
    [0, 0], [wid * 0.45, len * 0.18], [wid * 0.5, len * 0.45], [wid * 0.3, len * 0.75], [0, len],
    [-wid * 0.3, len * 0.75], [-wid * 0.5, len * 0.45], [-wid * 0.45, len * 0.18],
  ];
  const pos = [], idx = [];
  for (const [x, y] of pts) pos.push(x, y, Math.abs(x) * -0.8);
  pos.push(0, len * 0.45, 0.002);
  const c = pts.length;
  for (let i = 0; i < pts.length; i++) idx.push(c, i, (i + 1) % pts.length);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  const n = g.attributes.normal;
  for (let i = 0; i < n.count; i++) n.setXYZ(i, 0, 0.3, 1);
  g.attributes.normal.needsUpdate = true;
  g.normalizeNormals();
  return g;
}

export function createWillow(quality) {
  const r = rng(2024);
  const group = new THREE.Group();
  const [bx, bz] = willowBase;
  const by = heightAt(bx, bz) - 0.15;
  const toWater = new THREE.Vector3(-bx, 0, -bz).normalize();
  const side = new THREE.Vector3(-toWater.z, 0, toWater.x);
  const base = new THREE.Vector3(bx, by, bz);

  const branchGeos = [];
  const anchors = [];

  const trunkPts = [
    base.clone(),
    base.clone().add(new THREE.Vector3(0, 1.0, 0)).addScaledVector(toWater, 0.15),
    base.clone().add(new THREE.Vector3(0, 2.0, 0)).addScaledVector(toWater, 0.55).addScaledVector(side, 0.15),
    base.clone().add(new THREE.Vector3(0, 2.9, 0)).addScaledVector(toWater, 0.95),
  ];
  const trunk = taperedTube(trunkPts, 0.36, 0.24, 10);
  branchGeos.push(trunk.geo);
  // root flare
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + r() * 0.6;
    const d = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    const p0 = base.clone().add(new THREE.Vector3(0, 0.55, 0));
    const p1 = base.clone().addScaledVector(d, 0.45).add(new THREE.Vector3(0, 0.12, 0));
    const p2 = base.clone().addScaledVector(d, 0.85).add(new THREE.Vector3(0, -0.12, 0));
    branchGeos.push(taperedTube([p0, p1, p2], 0.16, 0.04, 6).geo);
  }
  const top = trunkPts[3];
  const crownC = top.clone().addScaledVector(toWater, 1.2).add(new THREE.Vector3(0, 2.0, 0));

  const limbCount = 6;
  for (let i = 0; i < limbCount; i++) {
    const a = (i / limbCount) * Math.PI * 2 + r() * 0.5;
    let dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    dir.addScaledVector(toWater, 0.7).normalize();
    const len = 2.6 + r() * 1.4;
    const p0 = top.clone().add(new THREE.Vector3(0, -0.2, 0));
    const p1 = p0.clone().addScaledVector(dir, len * 0.3).add(new THREE.Vector3(0, len * 0.45, 0));
    const p2 = p0.clone().addScaledVector(dir, len * 0.7).add(new THREE.Vector3(0, len * 0.65, 0));
    const p3 = p0.clone().addScaledVector(dir, len).add(new THREE.Vector3(0, len * 0.5, 0));
    const limb = taperedTube([p0, p1, p2, p3], 0.15, 0.04, 7);
    branchGeos.push(limb.geo);
    // sub branches
    const subs = 4 + Math.floor(r() * 3);
    for (let k = 0; k < subs; k++) {
      const t = 0.35 + r() * 0.6;
      const sp = limb.curve.getPointAt(t);
      const sa = a + (r() - 0.5) * 2.2;
      const sd = new THREE.Vector3(Math.cos(sa), 0, Math.sin(sa)).addScaledVector(toWater, 0.3).normalize();
      const sl = 1.0 + r() * 1.5;
      const q1 = sp.clone().addScaledVector(sd, sl * 0.5).add(new THREE.Vector3(0, sl * 0.35, 0));
      const q2 = sp.clone().addScaledVector(sd, sl).add(new THREE.Vector3(0, sl * 0.15, 0));
      const sub = taperedTube([sp, q1, q2], 0.05, 0.015, 5);
      branchGeos.push(sub.geo);
      for (let m = 0; m < 5; m++) anchors.push(sub.curve.getPointAt(0.3 + m * 0.17));
    }
    for (let m = 0; m < 6; m++) anchors.push(limb.curve.getPointAt(0.45 + m * 0.1));
  }

  const barkMat = new THREE.MeshStandardMaterial({ map: barkTexture(), roughness: 0.95, color: 0xb0a090 });
  patchMaterial(barkMat, { wet: 0.4 });
  const wood = new THREE.Mesh(mergeGeometries(branchGeos), barkMat);
  wood.castShadow = true;
  wood.receiveShadow = true;
  setLayers(wood, LAYER.MAIN, LAYER.REFL);
  group.add(wood);

  // hanging strands
  const leafPos = [];
  const leafData = []; // per instance: t (hang distance), phase
  const twigPos = [];
  const twigData = [];
  const strandsPer = quality > 0.6 ? 3 : 2;
  const dummy = new THREE.Object3D();
  const matrices = [];
  const colors = [];
  const leafSpacing = quality > 0.6 ? 0.055 : 0.085;
  for (const a of anchors) {
    for (let s = 0; s < strandsPer + 2; s++) {
      const isShort = s >= strandsPer;
      const phase = r() * Math.PI * 2;
      const out = new THREE.Vector3(a.x - crownC.x, 0, a.z - crownC.z);
      if (out.lengthSq() < 0.01) out.set(r() - 0.5, 0, r() - 0.5);
      out.normalize();
      const jitter = new THREE.Vector3((r() - 0.5) * 0.4, (r() - 0.5) * 0.3, (r() - 0.5) * 0.4);
      const start = a.clone().add(jitter);
      const ground = Math.max(heightAt(start.x, start.z), 0);
      const tipY = ground + (heightAt(start.x, start.z) < 0 ? 0.08 + r() * 0.5 : 0.5 + r() * 1.4);
      const maxLen = Math.max(0.6, start.y - tipY + 0.3);
      const len = isShort ? 0.3 + r() * 0.8 : maxLen * (0.55 + r() * 0.45);
      let dir = out.clone().multiplyScalar(0.8).add(new THREE.Vector3(0, isShort ? 0.9 : 0.45, 0)).normalize();
      const p = start.clone();
      let tdist = 0;
      let prev = p.clone();
      let nextLeaf = 0;
      const step = 0.05;
      let leafSide = 1;
      while (tdist < len) {
        dir.add(new THREE.Vector3(0, -0.22, 0)).normalize();
        p.addScaledVector(dir, step);
        tdist += step;
        if (p.y < tipY) break;
        twigPos.push(prev.x, prev.y, prev.z, p.x, p.y, p.z);
        twigData.push(Math.max(tdist - step, 0), phase, tdist, phase);
        prev.copy(p);
        if (tdist >= nextLeaf) {
          nextLeaf = tdist + leafSpacing * (0.7 + r() * 0.6);
          leafSide = -leafSide;
          const ldir = dir.clone();
          const perp = new THREE.Vector3().crossVectors(ldir, new THREE.Vector3(0, 1, 0));
          if (perp.lengthSq() < 1e-4) perp.set(1, 0, 0);
          perp.normalize();
          // leaf points mostly downward/outward along strand, angled away
          const lv = ldir.clone().multiplyScalar(0.75).addScaledVector(perp, leafSide * 0.55).add(new THREE.Vector3(0, -0.1, 0)).normalize();
          dummy.position.copy(p);
          dummy.up.set(0, 1, 0);
          const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), lv);
          const twist = new THREE.Quaternion().setFromAxisAngle(lv, r() * Math.PI * 2);
          dummy.quaternion.copy(twist.multiply(q));
          const sc = 0.75 + r() * 0.5 + Math.min(tdist / len, 1) * 0.2;
          dummy.scale.set(sc, sc, sc);
          dummy.updateMatrix();
          matrices.push(dummy.matrix.clone());
          leafPos.push(p.clone());
          leafData.push(tdist, phase);
          const yel = r();
          colors.push(new THREE.Color().setRGB(0.24 + yel * 0.14, 0.38 + yel * 0.12, 0.08 + yel * 0.04));
        }
      }
    }
  }
  // dense leaf clusters along branches
  const leafGeo = leafGeometry();
  const leafMat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.62, color: 0xffffff });
  const swayOpts = {
    vertHead: 'attribute vec2 aSway;',
    displace: /* glsl */ `
      float tt = aSway.x;
      vec3 sw = windSway(iOrigin, tt, aSway.y, 0.05);
      // individual leaf flutter
      float fl = sin(uTime * (4.0 + uWind * 9.0) + aSway.y * 7.0 + tt * 11.0) * (0.01 + 0.05 * uWind);
      wp4.xyz += sw + vec3(fl, fl * 0.5, -fl) * (transformed.y * 6.0);
    `,
  };
  patchMaterial(leafMat, {
    ...swayOpts,
    fragLights: /* glsl */ `
      // subtle translucency when backlit
      reflectedLight.indirectDiffuse *= 1.35;
    `,
  });
  const leaves = new THREE.InstancedMesh(leafGeo, leafMat, matrices.length);
  for (let i = 0; i < matrices.length; i++) {
    leaves.setMatrixAt(i, matrices[i]);
    leaves.setColorAt(i, colors[i]);
  }
  leafGeo.setAttribute('aSway', new THREE.InstancedBufferAttribute(new Float32Array(leafData), 2));
  leaves.castShadow = true;
  leaves.receiveShadow = true;
  leaves.customDepthMaterial = patchedDepthMaterial({ ...swayOpts, side: THREE.DoubleSide });
  leaves.frustumCulled = false;
  setLayers(leaves, LAYER.MAIN, LAYER.REFL);
  group.add(leaves);

  const twigGeo = new THREE.BufferGeometry();
  twigGeo.setAttribute('position', new THREE.Float32BufferAttribute(twigPos, 3));
  twigGeo.setAttribute('aSway', new THREE.Float32BufferAttribute(twigData, 2));
  const twigMat = new THREE.LineBasicMaterial({ color: 0x4a4a22, transparent: true, opacity: 0.7 });
  patchMaterial(twigMat, {
    vertHead: 'attribute vec2 aSway;',
    displace: 'wp4.xyz += windSway(wp4.xyz, aSway.x, aSway.y, 0.05);',
  });
  const twigs = new THREE.LineSegments(twigGeo, twigMat);
  twigs.frustumCulled = false;
  setLayers(twigs, LAYER.MAIN, LAYER.REFL);
  group.add(twigs);

  return { group, leafPositions: leafPos, leafData, crown: crownC, twigMat };
}
