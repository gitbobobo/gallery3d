import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { heightAt, shorePoint, shoreRadius, signedShore, insideDock, willowBase, PILINGS } from './pond.js';
import { rng, fbm, vnoise } from './noise.js';
import { patchMaterial, patchedDepthMaterial, setLayers, LAYER } from './shared.js';

const dummy = new THREE.Object3D();

function buildInstanced(geo, mat, items) {
  const m = new THREE.InstancedMesh(geo, mat, items.length);
  items.forEach((it, i) => {
    dummy.position.copy(it.pos);
    dummy.rotation.set(it.rx || 0, it.ry || 0, it.rz || 0, 'YXZ');
    if (it.quat) dummy.quaternion.copy(it.quat);
    dummy.scale.copy(it.scale);
    dummy.updateMatrix();
    m.setMatrixAt(i, dummy.matrix);
    if (it.color) m.setColorAt(i, it.color);
  });
  m.frustumCulled = false;
  return m;
}

/* ---------------- reeds ---------------- */
function reedLeafGeometry() {
  const segs = 7;
  const pos = [], idx = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const w = 0.014 * (1 - t * 0.85);
    const z = 0.28 * t * t;
    const y = t * (1 - 0.15 * t * t);
    pos.push(-w, y, z, w, y, z);
  }
  for (let i = 0; i < segs; i++) {
    const a = i * 2;
    idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

export function createReeds(quality) {
  const r = rng(77);
  const group = new THREE.Group();
  const clusters = [
    { th: 3.05, span: 2.4, n: 190 },
    { th: -0.25, span: 1.8, n: 140 },
    { th: 1.95, span: 1.6, n: 110 },
    { th: -1.75, span: 1.0, n: 60 },
  ];
  const k = quality > 0.6 ? 1 : 0.6;
  const stems = [], heads = [], leaves = [];
  for (const c of clusters) {
    const n = Math.floor(c.n * k);
    for (let i = 0; i < n; i++) {
      const R = shoreRadius(c.th);
      const dth = (r.gauss() * c.span * 0.5) / R;
      const th = c.th + dth;
      const off = -1.0 + Math.pow(r(), 0.8) * 2.0 + r.gauss() * 0.2;
      const [x, z] = shorePoint(th, off);
      if (insideDock(x, z, 0.4)) continue;
      const by = heightAt(x, z);
      if (by < -0.55) continue;
      const H = 1.3 + r() * 1.2 - Math.max(0, off) * 0.15;
      const phase = r() * 6.28;
      const lean = 0.04;
      const base = new THREE.Vector3(x, by - 0.05, z);
      const sc = new THREE.Vector3(1 + r() * 0.4, H, 1 + r() * 0.4);
      stems.push({ pos: base, ry: r() * 6.28, rx: (r() - 0.5) * lean, rz: (r() - 0.5) * lean, scale: sc, phase, H });
      if (r() < 0.38) heads.push({ base, H, phase, scale: 0.8 + r() * 0.5 });
      const nl = 2 + Math.floor(r() * 3);
      for (let l = 0; l < nl; l++) {
        const lh = H * (0.45 + r() * 0.45);
        leaves.push({
          pos: base.clone().add(new THREE.Vector3(0, H * r() * 0.25, 0)),
          ry: r() * 6.28,
          scale: new THREE.Vector3(1, lh, lh * (0.7 + r() * 0.6)),
          phase,
          color: new THREE.Color().setHSL(0.18 + r() * 0.05, 0.45, 0.22 + r() * 0.1),
        });
      }
    }
  }

  const swayDisplace = (stiff) => /* glsl */ `
    float Hs = length(vec3(instanceMatrix[1].xyz));
    float kk = clamp((wp4.y - iOrigin.y) / max(Hs, 0.01), 0.0, 1.2);
    float sub = smoothstep(-0.05, 0.25, wp4.y);
    wp4.xyz += windSway(iOrigin, kk, aPhase, ${stiff}) * Hs * sub;
  `;
  const stemGeo = new THREE.CylinderGeometry(0.005, 0.009, 1, 5, 10, true);
  stemGeo.translate(0, 0.5, 0);
  const stemMat = new THREE.MeshStandardMaterial({ color: 0x8a8a4a, roughness: 0.7 });
  const stemOpts = { vertHead: 'attribute float aPhase;', displace: swayDisplace('0.32'), underwater: true, wet: 0.35 };
  patchMaterial(stemMat, stemOpts);
  const stemMesh = buildInstanced(stemGeo, stemMat, stems);
  stemGeo.setAttribute('aPhase', new THREE.InstancedBufferAttribute(new Float32Array(stems.map((s) => s.phase)), 1));
  stemMesh.castShadow = true;
  stemMesh.customDepthMaterial = patchedDepthMaterial(stemOpts);
  setLayers(stemMesh, LAYER.MAIN, LAYER.REFL, LAYER.REFR);
  group.add(stemMesh);

  const leafGeo = reedLeafGeometry();
  const leafMat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.6 });
  const leafOpts = { vertHead: 'attribute float aPhase;', displace: swayDisplace('0.4'), underwater: true };
  patchMaterial(leafMat, leafOpts);
  const leafMesh = buildInstanced(leafGeo, leafMat, leaves);
  leafGeo.setAttribute('aPhase', new THREE.InstancedBufferAttribute(new Float32Array(leaves.map((s) => s.phase)), 1));
  leafMesh.castShadow = true;
  leafMesh.customDepthMaterial = patchedDepthMaterial({ ...leafOpts, side: THREE.DoubleSide });
  setLayers(leafMesh, LAYER.MAIN, LAYER.REFL, LAYER.REFR);
  group.add(leafMesh);

  // cattail heads
  const headGeo = new THREE.CapsuleGeometry(0.019, 0.17, 4, 8);
  headGeo.translate(0, 0.105, 0);
  const tip = new THREE.CylinderGeometry(0.002, 0.003, 0.12, 4);
  tip.translate(0, 0.25, 0);
  const headGeoM = mergeGeometries([headGeo.toNonIndexed(), tip.toNonIndexed()]);
  const headMat = new THREE.MeshStandardMaterial({ color: 0x4a2e1a, roughness: 0.9 });
  const headOpts = {
    vertHead: 'attribute vec4 aStem;',
    displace: /* glsl */ `
      float kk = clamp((wp4.y - aStem.y) / aStem.w, 0.0, 1.3);
      wp4.xyz += windSway(aStem.xyz, kk, aPhaseH, 0.32) * aStem.w;
    `,
  };
  headOpts.vertHead += 'attribute float aPhaseH;';
  patchMaterial(headMat, headOpts);
  const headItems = heads.map((h) => ({
    pos: h.base.clone().add(new THREE.Vector3(0, h.H * 0.96, 0)),
    scale: new THREE.Vector3(h.scale, h.scale, h.scale),
  }));
  const headMesh = buildInstanced(headGeoM, headMat, headItems);
  const stemAttr = new Float32Array(heads.length * 4);
  heads.forEach((h, i) => stemAttr.set([h.base.x, h.base.y, h.base.z, h.H], i * 4));
  headGeoM.setAttribute('aStem', new THREE.InstancedBufferAttribute(stemAttr, 4));
  headGeoM.setAttribute('aPhaseH', new THREE.InstancedBufferAttribute(new Float32Array(heads.map((h) => h.phase)), 1));
  headMesh.castShadow = true;
  headMesh.customDepthMaterial = patchedDepthMaterial(headOpts);
  setLayers(headMesh, LAYER.MAIN, LAYER.REFL);
  group.add(headMesh);
  return group;
}

/* ---------------- grass ---------------- */
export function createGrass(quality) {
  const r = rng(5);
  const N = quality > 0.6 ? 22000 : 9000;
  const items = [];
  let tries = 0;
  while (items.length < N && tries < N * 8) {
    tries++;
    const ang = r() * Math.PI * 2;
    const rad = 6 + Math.pow(r(), 1.4) * 16;
    const x = Math.cos(ang) * rad, z = Math.sin(ang) * rad;
    const sd = signedShore(x, z);
    if (sd < 0.35 + r() * 0.6) continue;
    if (insideDock(x, z, 0.1)) continue;
    const dens = fbm(x * 0.3, z * 0.3, 3, 19) * 0.5 + 0.5;
    if (r() > dens * 1.3 + 0.05) continue;
    const wx = x - willowBase[0], wz = z - willowBase[1];
    if (wx * wx + wz * wz < 0.6) continue;
    const y = heightAt(x, z);
    const h = (0.12 + r() * 0.25) * (0.6 + dens * 0.7) * Math.min(1, (sd - 0.2) * 1.5);
    items.push({
      pos: new THREE.Vector3(x, y - 0.01, z),
      ry: r() * 6.28,
      rx: (r() - 0.5) * 0.5,
      scale: new THREE.Vector3(1.4 + r() * 1.4, h, 1),
      color: new THREE.Color().setHSL(0.16 + r() * 0.08, 0.4 + r() * 0.2, 0.2 + r() * 0.12),
      phase: r() * 6.28,
    });
  }
  const pos = [0, 0, 0.002, -0.012, 0, 0, 0.012, 0, 0, -0.008, 0.45, 0.03, 0.008, 0.45, 0.03, 0, 1, 0.1];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex([1, 2, 4, 1, 4, 3, 3, 4, 5]);
  g.computeVertexNormals();
  const n = g.attributes.normal;
  for (let i = 0; i < n.count; i++) n.setXYZ(i, 0, 1, 0);
  const mat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.85 });
  patchMaterial(mat, {
    vertHead: 'attribute float aPhase;',
    displace: /* glsl */ `
      float Hs = length(vec3(instanceMatrix[1].xyz));
      float kk = clamp((wp4.y - iOrigin.y) / max(Hs, 0.01), 0.0, 1.0);
      wp4.xyz += windSway(iOrigin, kk, aPhase, 0.5) * Hs;
    `,
    fragColor: 'diffuseColor.rgb *= 0.75 + 0.25 * smoothstep(0.0, 0.25, vWPos.y - 0.0);',
    fragNormal: 'normal = normalize((viewMatrix * vec4(0.15, 1.0, 0.1, 0.0)).xyz);',
  });
  const mesh = buildInstanced(g, mat, items);
  g.setAttribute('aPhase', new THREE.InstancedBufferAttribute(new Float32Array(items.map((s) => s.phase)), 1));
  mesh.receiveShadow = true;
  setLayers(mesh, LAYER.MAIN, LAYER.REFL);
  return mesh;
}

/* ---------------- underwater weeds ---------------- */
export function createWeeds(quality) {
  const r = rng(13);
  const N = quality > 0.6 ? 700 : 350;
  const items = [];
  let tries = 0;
  while (items.length < N && tries < N * 20) {
    tries++;
    const th = r() * Math.PI * 2;
    const [x, z] = shorePoint(th, -0.4 - r() * 3.2);
    const y = heightAt(x, z);
    if (y > -0.12 || y < -1.2) continue;
    const cl = vnoise(x * 0.6, z * 0.6, 3);
    if (cl < 0.1) continue;
    const h = (0.15 + r() * 0.4) * Math.min(1, -y * 1.2);
    items.push({
      pos: new THREE.Vector3(x, y - 0.01, z),
      ry: r() * 6.28,
      scale: new THREE.Vector3(1, h, 1),
      color: new THREE.Color().setHSL(0.2 + r() * 0.08, 0.55, 0.2 + r() * 0.12),
      phase: r() * 6.28,
    });
  }
  const segs = 6;
  const pos = [], idx = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const w = 0.02 * (1 - t * 0.6);
    pos.push(-w, t, 0, w, t, 0);
  }
  for (let i = 0; i < segs; i++) {
    const a = i * 2;
    idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.7 });
  patchMaterial(mat, {
    vertHead: 'attribute float aPhase;',
    displace: /* glsl */ `
      float Hs = length(vec3(instanceMatrix[1].xyz));
      float kk = clamp((wp4.y - iOrigin.y) / max(Hs, 0.01), 0.0, 1.0);
      float s = sin(uTime * 0.9 + aPhase + kk * 2.5) * 0.6 + sin(uTime * 1.7 + aPhase * 2.0) * 0.3;
      wp4.x += s * kk * kk * Hs * 0.35;
      wp4.z += cos(uTime * 0.7 + aPhase) * kk * kk * Hs * 0.25;
    `,
    fragNormal: 'normal = normalize((viewMatrix * vec4(0.2, 1.0, 0.1, 0.0)).xyz);',
    underwater: true,
  });
  const mesh = buildInstanced(g, mat, items);
  g.setAttribute('aPhase', new THREE.InstancedBufferAttribute(new Float32Array(items.map((s) => s.phase)), 1));
  setLayers(mesh, LAYER.MAIN, LAYER.REFR);
  return mesh;
}

/* ---------------- pebbles & rocks ---------------- */
export function rockGeometry(seed, detail = 2) {
  let g = new THREE.IcosahedronGeometry(1, detail);
  g.deleteAttribute('normal');
  g.deleteAttribute('uv');
  g = mergeVertices(g);
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  const r = rng(seed);
  const sx = 0.8 + r() * 0.5, sy = 0.45 + r() * 0.25, sz = 0.7 + r() * 0.4;
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = vnoise(v.x * 1.7 + seed, v.y * 1.7 + v.z * 1.3, seed) * 0.16 + vnoise(v.x * 4 + v.z, v.y * 4, seed + 3) * 0.05;
    v.multiplyScalar(1 + n);
    v.set(v.x * sx, v.y * sy, v.z * sz);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

export function rockMaterial() {
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.8, color: 0xffffff });
  patchMaterial(mat, {
    underwater: true,
    wet: 0.45,
    fragColor: /* glsl */ `
      float rn = fbm3(vWPos.xz * 30.0 + vWPos.y * 20.0);
      diffuseColor.rgb *= 0.75 + 0.5 * rn;
      // algae tint underwater
      diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.6, 0.75, 0.4), smoothstep(-0.05, -0.4, vWPos.y) * 0.7);
    `,
  });
  return mat;
}

export function createPebbles(quality) {
  const r = rng(31);
  const group = new THREE.Group();
  const variants = [0, 1, 2, 3].map((s) => rockGeometry(100 + s, 1));
  const lists = variants.map(() => []);
  const N = quality > 0.6 ? 1500 : 800;
  const palette = [
    [0.55, 0.53, 0.5], [0.42, 0.4, 0.37], [0.62, 0.58, 0.5], [0.35, 0.33, 0.32], [0.5, 0.44, 0.36], [0.7, 0.68, 0.64],
  ];
  let tries = 0, count = 0;
  while (count < N && tries < N * 10) {
    tries++;
    const th = r() * Math.PI * 2;
    const off = r.gauss() * 0.9 - 0.2;
    if (off < -2.6 || off > 2.0) continue;
    const [x, z] = shorePoint(th, off);
    const band = vnoise(x * 0.5, z * 0.5, 9);
    if (band < -0.3 && r() < 0.7) continue;
    const y = heightAt(x, z);
    const s = 0.025 + Math.pow(r(), 3) * 0.12;
    const c = r.pick(palette);
    const tint = 0.85 + r() * 0.3;
    lists[count % 4].push({
      pos: new THREE.Vector3(x, y + s * 0.1, z),
      rx: (r() - 0.5) * 0.4,
      ry: r() * 6.28,
      scale: new THREE.Vector3(s, s, s),
      color: new THREE.Color(c[0] * tint, c[1] * tint, c[2] * tint),
    });
    count++;
  }
  // larger rocks
  const big = [];
  for (let i = 0; i < 16; i++) {
    const th = r() * Math.PI * 2;
    if (Math.abs(th - 5.18) < 0.25) continue;
    const off = -0.4 + r() * 1.6;
    const [x, z] = shorePoint(th, off);
    if (insideDock(x, z, 0.5)) continue;
    const s = 0.18 + r() * 0.35;
    const c = r.pick(palette);
    big.push({
      pos: new THREE.Vector3(x, heightAt(x, z) + s * 0.05, z),
      ry: r() * 6.28,
      rx: (r() - 0.5) * 0.3,
      scale: new THREE.Vector3(s, s, s),
      color: new THREE.Color(c[0] * 0.9, c[1] * 0.9, c[2] * 0.88),
    });
  }
  const mat = rockMaterial();
  variants.forEach((g, i) => {
    const m = buildInstanced(g, mat, lists[i]);
    m.receiveShadow = true;
    setLayers(m, LAYER.MAIN, LAYER.REFL, LAYER.REFR);
    group.add(m);
  });
  const bigMesh = buildInstanced(rockGeometry(555, 3), mat, big);
  bigMesh.castShadow = true;
  bigMesh.receiveShadow = true;
  setLayers(bigMesh, LAYER.MAIN, LAYER.REFL, LAYER.REFR);
  group.add(bigMesh);
  return { group, bigRocks: big.map((b) => ({ x: b.pos.x, z: b.pos.z, r: b.scale.x * 0.9 })) };
}

/* ---------------- lily pads & water lilies ---------------- */
function padTexture() {
  const S = 256;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(S / 2, S / 2, 4, S / 2, S / 2, S / 2);
  grd.addColorStop(0, '#5d7a2c');
  grd.addColorStop(0.7, '#3f6020');
  grd.addColorStop(0.95, '#4c5a1c');
  grd.addColorStop(1, '#6b5a28');
  g.fillStyle = grd;
  g.fillRect(0, 0, S, S);
  g.strokeStyle = 'rgba(150,180,90,0.35)';
  g.lineWidth = 1.4;
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2;
    g.beginPath();
    g.moveTo(S / 2, S / 2);
    const mx = S / 2 + Math.cos(a + 0.08) * S * 0.25, my = S / 2 + Math.sin(a + 0.08) * S * 0.25;
    g.quadraticCurveTo(mx, my, S / 2 + Math.cos(a) * S * 0.49, S / 2 + Math.sin(a) * S * 0.49);
    g.stroke();
  }
  const r = rng(4);
  for (let i = 0; i < 90; i++) {
    g.fillStyle = `rgba(${r() < 0.5 ? '120,90,40' : '30,50,15'},${0.05 + r() * 0.12})`;
    g.beginPath();
    g.arc(r() * S, r() * S, 2 + r() * 10, 0, Math.PI * 2);
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function padGeometry() {
  const notch = 0.22;
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  const segs = 40;
  for (let i = 0; i <= segs; i++) {
    const a = notch + (i / segs) * (Math.PI * 2 - 2 * notch);
    const rr = 1 + Math.sin(a * 5) * 0.015;
    shape.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  const g = new THREE.ShapeGeometry(shape, 12);
  g.rotateX(-Math.PI / 2);
  const p = g.attributes.position;
  const uv = g.attributes.uv;
  const nrm = g.attributes.normal;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i);
    const d = Math.hypot(x, z);
    p.setY(i, 0.04 * Math.pow(d, 6) - 0.01 * d * d);
    uv.setXY(i, x * 0.5 + 0.5, z * 0.5 + 0.5);
    // analytic normal of the cupped surface (avoids NaNs from degenerate triangles)
    const dyd = 0.24 * Math.pow(d, 5) - 0.02 * d;
    const nx = d > 1e-5 ? (-dyd * x) / d : 0, nz = d > 1e-5 ? (-dyd * z) / d : 0;
    const l = Math.hypot(nx, 1, nz);
    nrm.setXYZ(i, nx / l, 1 / l, nz / l);
  }
  return g;
}

function flowerGeometry() {
  const parts = [];
  const petal = (len, wid, tilt, cup) => {
    const g = new THREE.PlaneGeometry(wid, len, 4, 6);
    const p = g.attributes.position;
    const col = [];
    for (let i = 0; i < p.count; i++) {
      let x = p.getX(i), y = p.getY(i) + len / 2;
      const t = y / len;
      const w = Math.sin(Math.PI * Math.min(1, t * 0.95 + 0.05)) * (1 - t * 0.25);
      x *= w;
      const z = -cup * (x * x) / (wid * wid) * 4 * wid;
      p.setXYZ(i, x, y, z);
      const pink = Math.pow(t, 1.4);
      col.push(1.0, 0.92 - pink * 0.42, 0.95 - pink * 0.32);
    }
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    g.rotateX(-(Math.PI / 2 - tilt));
    return g;
  };
  const rings = [
    { n: 9, len: 0.085, wid: 0.034, tilt: 0.25, cup: 0.25, off: 0 },
    { n: 8, len: 0.075, wid: 0.032, tilt: 0.65, cup: 0.35, off: 0.35 },
    { n: 7, len: 0.06, wid: 0.028, tilt: 1.0, cup: 0.45, off: 0.1 },
  ];
  for (const ring of rings) {
    for (let i = 0; i < ring.n; i++) {
      const g = petal(ring.len, ring.wid, ring.tilt, ring.cup);
      g.rotateY((i / ring.n) * Math.PI * 2 + ring.off);
      g.translate(0, 0.01, 0);
      parts.push(g.toNonIndexed());
    }
  }
  const center = new THREE.CylinderGeometry(0.012, 0.016, 0.03, 10);
  center.translate(0, 0.03, 0);
  const cc = [];
  for (let i = 0; i < center.attributes.position.count; i++) cc.push(1.0, 0.75, 0.12);
  center.setAttribute('color', new THREE.Float32BufferAttribute(cc, 3));
  delete center.attributes.uv;
  parts.forEach((p) => delete p.attributes.uv);
  parts.push(center.toNonIndexed());
  return mergeGeometries(parts);
}

const BOB = /* glsl */ `
uniform sampler2D uSim;
uniform float uSimHalf;
float simH(vec2 xz){ return texture(uSim, xz / (2.0 * uSimHalf) + 0.5).r; }
`;

export function createLilies() {
  const r = rng(808);
  const pads = [];
  const groups = [
    { th: 2.7, frac: 0.62, n: 6 },
    { th: 2.2, frac: 0.5, n: 4 },
    { th: -0.55, frac: 0.6, n: 5 },
    { th: 1.0, frac: 0.55, n: 3 },
    { th: -2.0, frac: 0.45, n: 3 },
  ];
  for (const gr of groups) {
    const R = shoreRadius(gr.th) * gr.frac;
    const cx = Math.cos(gr.th) * R, cz = Math.sin(gr.th) * R;
    for (let i = 0; i < gr.n; i++) {
      for (let t = 0; t < 30; t++) {
        const x = cx + r.gauss() * 0.9, z = cz + r.gauss() * 0.9;
        const s = 0.16 + r() * 0.22;
        if (heightAt(x, z) > -0.3) continue;
        if (insideDock(x, z, s + 0.3)) continue;
        if (PILINGS.some((p) => Math.hypot(p.x - x, p.z - z) < s + 0.2)) continue;
        if (pads.some((p) => Math.hypot(p.x - x, p.z - z) < p.r + s + 0.02)) continue;
        pads.push({ x, z, r: s, ry: r() * 6.28 });
        break;
      }
    }
  }
  const group = new THREE.Group();
  const padMat = new THREE.MeshStandardMaterial({ map: padTexture(), roughness: 0.55, color: 0xffffff });
  patchMaterial(padMat, {
    vertHead: BOB,
    displace: 'wp4.y += simH(wp4.xz) + 0.012;',
  });
  const padItems = pads.map((p) => ({
    pos: new THREE.Vector3(p.x, 0, p.z),
    ry: p.ry,
    scale: new THREE.Vector3(p.r, p.r, p.r),
    color: new THREE.Color().setHSL(0.24 + r() * 0.04, 0.4, 0.5 + r() * 0.15),
  }));
  const padMesh = buildInstanced(padGeometry(), padMat, padItems);
  padMesh.receiveShadow = true;
  padMesh.castShadow = true;
  padMesh.renderOrder = 6;
  // REFL layer so pads cast shadows (shadow map is rendered with the reflection camera's layers)
  setLayers(padMesh, LAYER.MAIN, LAYER.REFL);
  group.add(padMesh);

  // flowers on a subset of pads (beside the pad)
  const flowers = [];
  for (const p of pads) {
    if (r() < 0.38 || flowers.length < 2) {
      const a = r() * 6.28;
      flowers.push({
        pos: new THREE.Vector3(p.x + Math.cos(a) * p.r * 0.3, 0, p.z + Math.sin(a) * p.r * 0.3),
        ry: r() * 6.28,
        scale: new THREE.Vector3(1, 1, 1).multiplyScalar(0.9 + r() * 0.6),
        color: r() < 0.3 ? new THREE.Color(1, 1.0, 0.98) : new THREE.Color(1, 0.85, 0.9),
      });
    }
    if (flowers.length >= 7) break;
  }
  const flMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.5, side: THREE.DoubleSide });
  patchMaterial(flMat, {
    vertHead: BOB,
    displace: 'wp4.y += simH(iOrigin.xz) + 0.012;',
    fragLights: 'reflectedLight.indirectDiffuse *= 1.35;',
  });
  const flMesh = buildInstanced(flowerGeometry(), flMat, flowers);
  flMesh.castShadow = true;
  setLayers(flMesh, LAYER.MAIN, LAYER.REFL);
  group.add(flMesh);
  return { group, pads };
}
