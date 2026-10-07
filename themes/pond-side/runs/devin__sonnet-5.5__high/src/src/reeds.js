import * as THREE from 'three';
import { mulberry, fbm2, clamp } from './shared.js';
import { terrainY, pondF, PIER } from './terrain.js';
import { tube } from './geo.js';
import { swayMaterial, swayDepth } from './materials.js';

const V3 = THREE.Vector3;

function ribbon(seg, width, bend, taper = 1.3) {
  const pos = [], nor = [], w = [], idx = [];
  for (let i = 0; i <= seg; i++) {
    const t = i / seg, hw = width * (1 - Math.pow(t, taper) * 0.97);
    const z = bend * t * t;
    pos.push(-hw, t, z, hw, t, z);
    nor.push(0, 0.2, 1, 0, 0.2, 1);
    w.push(t, t);
  }
  for (let i = 0; i < seg; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('aW', new THREE.Float32BufferAttribute(w, 1));
  g.setIndex(idx);
  return g;
}

function stalkGeo(seg, r0) {
  const pts = [], rad = [], w = [];
  for (let i = 0; i <= seg; i++) { pts.push(new V3(0, i / seg, 0)); rad.push(r0 * (1 - 0.55 * i / seg)); }
  const g = tube(pts, rad, 5, 1);
  g.deleteAttribute('uv');
  const vc = g.attributes.position.count, aw = new Float32Array(vc);
  for (let i = 0; i <= seg; i++) for (let j = 0; j <= 5; j++) aw[i * 6 + j] = i / seg;
  g.setAttribute('aW', new THREE.BufferAttribute(aw, 1));
  return g;
}

function headGeo() {
  const g = new THREE.CylinderGeometry(0.026, 0.02, 0.17, 7, 1);
  g.translate(0, 0.085, 0);
  g.deleteAttribute('uv');
  g.setAttribute('aW', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count).fill(1), 1));
  return g;
}

function makeInst(geo, mat, n, key, shadow = true) {
  const mesh = new THREE.InstancedMesh(geo, swayMaterial(mat, key), n);
  mesh.customDepthMaterial = swayDepth(key);
  mesh.castShadow = shadow; mesh.receiveShadow = true; mesh.frustumCulled = false;
  mesh.layers.enable(1);
  return mesh;
}

export function buildReeds(scene, sim) {
  const rnd = mulberry(314);
  const stalks = [];
  let tries = 0;
  while (stalks.length < 420 && tries < 40000) {
    tries++;
    const x = (rnd() - 0.5) * 14, z = (rnd() - 0.5) * 12;
    const f = pondF(x, z);
    if (f < 0.9 || f > 1.05) continue;
    const y = terrainY(x, z);
    if (y < -0.4) continue;
    if (Math.abs(x - PIER.x) < 1.3 && z > 2.0) continue;
    if (!(z < 0.6 || x < -3.6)) continue;
    const cl = fbm2(x * 0.55 + 5, z * 0.55 + 2, 3);
    if (cl < 0.5 || rnd() > (cl - 0.45) * 3) continue;
    stalks.push({ x, z, y });
  }
  const n = stalks.length;
  const stalk = makeInst(stalkGeo(8, 0.011), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 }), n, 'stalk');
  const blade = makeInst(ribbon(8, 0.034, 0.5), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, side: THREE.DoubleSide }), n * 2, 'blade', false);
  const nHeads = Math.round(n * 0.3);
  const head = makeInst(headGeo(), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }), nHeads, 'head', false);

  const sPh = new Float32Array(n), sAmp = new Float32Array(n);
  const bPh = new Float32Array(n * 2), bAmp = new Float32Array(n * 2);
  const hPh = new Float32Array(nHeads), hAmp = new Float32Array(nHeads);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), c = new THREE.Color();
  let hi = 0;
  stalks.forEach((s, i) => {
    const h = 1.2 + rnd() * 0.9;
    const tx = (rnd() - 0.5) * 0.18, tz = (rnd() - 0.5) * 0.18;
    e.set(tx, rnd() * 6.28, tz, 'YXZ'); q.setFromEuler(e);
    const base = new V3(s.x, s.y - 0.12, s.z);
    m.compose(base, q, new V3(1, h, 1));
    stalk.setMatrixAt(i, m);
    c.setHSL(0.17 + rnd() * 0.05, 0.4 + rnd() * 0.2, 0.28 + rnd() * 0.12); stalk.setColorAt(i, c);
    const ph = rnd() * 6.28, amp = 0.55 + rnd() * 0.45;
    sPh[i] = ph; sAmp[i] = amp;
    if (hi < nHeads && rnd() < 0.34) {
      const top = new V3(0, h - 0.17, 0).applyQuaternion(q).add(base);
      m.compose(top, q, new V3(1, 1, 1));
      head.setMatrixAt(hi, m);
      c.setHSL(0.07 + rnd() * 0.03, 0.55, 0.12 + rnd() * 0.06); head.setColorAt(hi, c);
      hPh[hi] = ph; hAmp[hi] = amp; hi++;
    }
    for (let k = 0; k < 2; k++) {
      const bh = 0.9 + rnd() * 1.0;
      const yaw = rnd() * 6.28;
      e.set((rnd() - 0.5) * 0.3, yaw, (rnd() - 0.5) * 0.3, 'YXZ'); q.setFromEuler(e);
      m.compose(new V3(s.x + (rnd() - 0.5) * 0.06, s.y - 0.1, s.z + (rnd() - 0.5) * 0.06), q, new V3(1, bh, bh * (0.8 + rnd() * 0.6)));
      blade.setMatrixAt(i * 2 + k, m);
      c.setHSL(0.2 + rnd() * 0.06, 0.45 + rnd() * 0.2, 0.22 + rnd() * 0.12); blade.setColorAt(i * 2 + k, c);
      bPh[i * 2 + k] = ph + k; bAmp[i * 2 + k] = amp * 1.1;
    }
    sim.addDamping(s.x, s.z, 0.28, 0.0025);
  });
  head.count = hi;
  stalk.geometry.setAttribute('aPh', new THREE.InstancedBufferAttribute(sPh, 1));
  stalk.geometry.setAttribute('aAmp', new THREE.InstancedBufferAttribute(sAmp, 1));
  blade.geometry.setAttribute('aPh', new THREE.InstancedBufferAttribute(bPh, 1));
  blade.geometry.setAttribute('aAmp', new THREE.InstancedBufferAttribute(bAmp, 1));
  head.geometry.setAttribute('aPh', new THREE.InstancedBufferAttribute(hPh, 1));
  head.geometry.setAttribute('aAmp', new THREE.InstancedBufferAttribute(hAmp, 1));
  scene.add(stalk, blade, head);
  return { stalks };
}

export function buildPlants(scene) {
  const rnd = mulberry(55);
  const centers = [];
  let tries = 0;
  while (centers.length < 90 && tries < 20000) {
    tries++;
    const x = (rnd() - 0.5) * 13, z = (rnd() - 0.5) * 11;
    const y = terrainY(x, z);
    if (y > -0.1 || y < -1.1) continue;
    if (fbm2(x * 0.4 + 9, z * 0.4 + 1, 3) < 0.47) continue;
    if (Math.abs(x - PIER.x) < 0.5 && z > 0.3) continue;
    centers.push({ x, z });
  }
  const per = 16, n = centers.length * per;
  const geo = ribbon(6, 0.018, 0.25, 1.0);
  const mesh = makeInst(geo, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, side: THREE.DoubleSide }), n, 'plant', false);
  const ph = new Float32Array(n), amp = new Float32Array(n);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), c = new THREE.Color();
  let k = 0;
  for (const ce of centers) for (let i = 0; i < per; i++) {
    const x = ce.x + (rnd() - 0.5) * 0.35, z = ce.z + (rnd() - 0.5) * 0.35;
    const y = terrainY(x, z);
    const h = 0.3 + rnd() * 0.55;
    e.set((rnd() - 0.5) * 0.4, rnd() * 6.28, (rnd() - 0.5) * 0.4, 'YXZ'); q.setFromEuler(e);
    m.compose(new V3(x, y - 0.03, z), q, new V3(1, h, h * (0.6 + rnd())));
    mesh.setMatrixAt(k, m);
    c.setHSL(0.22 + rnd() * 0.1, 0.5 + rnd() * 0.25, 0.14 + rnd() * 0.16); mesh.setColorAt(k, c);
    ph[k] = rnd() * 6.28; amp[k] = 0.35 + rnd() * 0.3;
    k++;
  }
  geo.setAttribute('aPh', new THREE.InstancedBufferAttribute(ph, 1));
  geo.setAttribute('aAmp', new THREE.InstancedBufferAttribute(amp, 1));
  scene.add(mesh);
  return mesh;
}
