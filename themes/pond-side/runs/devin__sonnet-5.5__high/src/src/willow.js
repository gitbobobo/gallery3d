import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { mulberry, clamp } from './shared.js';
import { terrainY } from './terrain.js';
import { tube, bezier3 } from './geo.js';
import { swayMaterial, swayDepth } from './materials.js';
import { makeBarkTexture } from './textures.js';

const V3 = THREE.Vector3;

export function buildWillow(scene) {
  const rnd = mulberry(1234);
  const bx = -5.1, bz = -3.0, by = terrainY(bx, bz) - 0.15;
  const inward = new THREE.Vector2(-bx, -bz).normalize();
  const barkParts = [];

  const trunkPts = [], trunkR = [];
  const H = 2.1;
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    trunkPts.push(new V3(bx + inward.x * 0.55 * t * t + Math.sin(t * 3.1) * 0.1, by + t * H, bz + inward.y * 0.55 * t * t + Math.cos(t * 2.3) * 0.08));
    trunkR.push(0.34 - 0.12 * t + 0.16 * Math.pow(1 - t, 6));
  }
  barkParts.push(tube(trunkPts, trunkR, 12, 0.6));
  const fork = trunkPts[trunkPts.length - 1].clone();

  const branches = [];
  const leaders = [-0.75, 0.05, 0.85];
  const leaderCurves = [];
  leaders.forEach((yaw, li) => {
    const d = new THREE.Vector2(inward.x, inward.y).rotateAround(new THREE.Vector2(), yaw * 0.55);
    const dir = new V3(d.x, 0, d.y);
    const p0 = fork.clone();
    const pts = bezier3(p0, p0.clone().add(new V3(dir.x * 0.3, 0.9, dir.z * 0.3)), p0.clone().add(new V3(dir.x * 0.9, 1.6, dir.z * 0.9)), p0.clone().add(new V3(dir.x * (1.3 + li * 0.1), 2.0 + rnd() * 0.4, dir.z * (1.3 + li * 0.1))), 10);
    barkParts.push(tube(pts, pts.map((_, i) => 0.17 - 0.1 * (i / 10)), 8, 0.8));
    leaderCurves.push({ pts, dir });
    const nb = 4;
    for (let b = 0; b < nb; b++) {
      const t = 0.35 + (b / nb) * 0.65;
      const pi = Math.min(10, Math.round(t * 10));
      const ang = (rnd() - 0.5) * 2.2 + (b % 2 ? 0.5 : -0.5);
      const dd = new THREE.Vector2(d.x, d.y).rotateAround(new THREE.Vector2(), ang);
      branches.push({ p0: pts[pi].clone(), dir: new V3(dd.x, 0, dd.y), reach: 2.4 + rnd() * 2.4, crown: false });
    }
    branches.push({ p0: pts[10].clone(), dir: dir.clone(), reach: 3.2 + rnd() * 1.6, crown: false });
    branches.push({ p0: pts[7].clone(), dir: new V3(-dir.x, 0, -dir.z).multiplyScalar(0.6).add(new V3((rnd() - 0.5) * 1.2, 0, (rnd() - 0.5) * 1.2)).normalize(), reach: 1.4, crown: true });
  });

  const strands = [];
  const tips = [], touchers = [];
  for (const br of branches) {
    const p0 = br.p0, dir = br.dir, reach = br.reach;
    const pts = bezier3(p0, p0.clone().add(new V3(dir.x * reach * 0.35, 0.55, dir.z * reach * 0.35)),
      p0.clone().add(new V3(dir.x * reach * 0.75, 0.45, dir.z * reach * 0.75)),
      p0.clone().add(new V3(dir.x * reach, -0.1 - rnd() * 0.25, dir.z * reach)), 12);
    barkParts.push(tube(pts, pts.map((_, i) => 0.065 - 0.05 * (i / 12)), 6, 1));
    const ns = Math.round(reach * (br.crown ? 2.4 : 3.6));
    for (let k = 0; k < ns; k++) {
      const t = 0.2 + (k + rnd() * 0.6) / ns * 0.8;
      const fi = t * 12, i0 = Math.min(11, Math.floor(fi));
      const P0 = pts[i0].clone().lerp(pts[i0 + 1], fi - i0);
      const gy = terrainY(P0.x, P0.z);
      let target;
      if (gy > 0) target = gy + 0.1 + rnd() * 0.35;
      else target = rnd() < 0.2 ? -0.03 : 0.08 + rnd() * 0.55;
      let L = Math.max(0.35, P0.y - target);
      if (br.crown) L = 0.4 + rnd() * 0.7;
      strands.push({ P0, L, out: new V3(dir.x, 0, dir.z), ph: rnd() * 6.28, amp: 0.8 + rnd() * 0.5, touch: target < 0 });
    }
  }

  const twigParts = [], leafData = [];
  const SEG = 10;
  for (const s of strands) {
    const pts = [], w = [];
    for (let i = 0; i <= SEG; i++) {
      const t = i / SEG;
      pts.push(new V3(
        s.P0.x + s.out.x * 0.12 * s.L * Math.sin(t * Math.PI * 0.6) + Math.sin(t * 6 + s.ph) * 0.015,
        s.P0.y - s.L * (0.75 * t + 0.25 * t * t),
        s.P0.z + s.out.z * 0.12 * s.L * Math.sin(t * Math.PI * 0.6) + Math.cos(t * 5 + s.ph) * 0.015));
      w.push(t);
    }
    const g = tube(pts, pts.map((_, i) => 0.006 - 0.0035 * (i / SEG)), 3, 1);
    const vc = g.attributes.position.count;
    const aW = new Float32Array(vc), aPh = new Float32Array(vc).fill(s.ph), aAmp = new Float32Array(vc).fill(s.amp), col = new Float32Array(vc * 3);
    for (let i = 0; i <= SEG; i++) for (let j = 0; j <= 3; j++) {
      const vi = i * 4 + j; aW[vi] = w[i];
      col[vi * 3] = 0.33; col[vi * 3 + 1] = 0.3; col[vi * 3 + 2] = 0.13;
    }
    g.setAttribute('aW', new THREE.BufferAttribute(aW, 1));
    g.setAttribute('aPh', new THREE.BufferAttribute(aPh, 1));
    g.setAttribute('aAmp', new THREE.BufferAttribute(aAmp, 1));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.deleteAttribute('uv');
    twigParts.push(g);

    const tipP = pts[SEG];
    tips.push(tipP.clone());
    if (s.touch) touchers.push({ x: tipP.x, z: tipP.z });

    const spacing = 0.07;
    const nodes = Math.floor(s.L * 0.92 / spacing);
    for (let k = 1; k <= nodes; k++) {
      const t = k / nodes * 0.97, fi = t * SEG, i0 = Math.min(SEG - 1, Math.floor(fi));
      const P = pts[i0].clone().lerp(pts[i0 + 1], fi - i0);
      const T = new V3().subVectors(pts[i0 + 1], pts[i0]).normalize();
      for (const side of [-1, 1]) {
        const rot = rnd() * 6.283;
        const sv = new V3(Math.cos(rot), 0, Math.sin(rot));
        sv.sub(T.clone().multiplyScalar(T.dot(sv))).normalize();
        const yAxis = T.clone().multiplyScalar(-1).addScaledVector(sv, side * (0.5 + rnd() * 0.5)).normalize();
        leafData.push({ P, yAxis, t, ph: s.ph, amp: s.amp, sc: 0.8 + rnd() * 0.6 });
      }
    }
  }

  const barkTex = makeBarkTexture();
  const bark = new THREE.Mesh(mergeGeometries(barkParts),
    new THREE.MeshStandardMaterial({ map: barkTex, color: 0xcdbfae, roughness: 0.95 }));
  bark.castShadow = true; bark.receiveShadow = true;
  scene.add(bark);

  const twig = new THREE.Mesh(mergeGeometries(twigParts), swayMaterial(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8, side: THREE.DoubleSide }), 'twig'));
  twig.customDepthMaterial = swayDepth('twig');
  twig.castShadow = true; twig.frustumCulled = false;
  scene.add(twig);

  const leafGeo = new THREE.BufferGeometry();
  leafGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, -0.019, 0.08, 0.006, 0.019, 0.08, 0.006, 0, 0.21, 0.0], 3));
  leafGeo.setAttribute('normal', new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], 3));
  leafGeo.setIndex([0, 2, 1, 1, 2, 3]);
  const nL = leafData.length;
  const leaves = new THREE.InstancedMesh(leafGeo, swayMaterial(new THREE.MeshStandardMaterial({ roughness: 0.6, side: THREE.DoubleSide }), 'leaf'), nL);
  const aW = new Float32Array(nL), aPh = new Float32Array(nL), aAmp = new Float32Array(nL);
  const m = new THREE.Matrix4(), c = new THREE.Color();
  const xAx = new V3(), zAx = new V3();
  leafData.forEach((l, i) => {
    xAx.crossVectors(l.yAxis, new V3(rnd() - 0.5, rnd() - 0.3, rnd() - 0.5)).normalize();
    zAx.crossVectors(xAx, l.yAxis).normalize();
    m.makeBasis(xAx, l.yAxis, zAx);
    m.scale(new V3(l.sc, l.sc, l.sc));
    m.setPosition(l.P);
    leaves.setMatrixAt(i, m);
    c.setHSL(0.19 + rnd() * 0.06, 0.5 + rnd() * 0.2, 0.2 + rnd() * 0.14);
    leaves.setColorAt(i, c);
    aW[i] = l.t; aPh[i] = l.ph; aAmp[i] = l.amp;
  });
  leafGeo.setAttribute('aW', new THREE.InstancedBufferAttribute(aW, 1));
  leafGeo.setAttribute('aPh', new THREE.InstancedBufferAttribute(aPh, 1));
  leafGeo.setAttribute('aAmp', new THREE.InstancedBufferAttribute(aAmp, 1));
  leaves.customDepthMaterial = swayDepth('leaf');
  leaves.castShadow = true; leaves.receiveShadow = true; leaves.frustumCulled = false;
  scene.add(leaves);

  return { tips, touchers, base: new V3(bx, by, bz), leafCount: nL };
}
