import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { S, G, mulberry, clamp, lerp, smoothstep, fbm2, vnoise } from './shared.js';
import { patch, swayMaterial, swayDepth } from './materials.js';

export const POND = { a: 5.6, b: 4.4 };
export const PIER = { x: -1.6, z0: 4.95, z1: 0.45, w: 1.5, y: 0.58 };
export const PILES = [];
for (const z of [3.75, 2.65, 1.55, 0.6]) for (const s of [-1, 1]) PILES.push({ x: PIER.x + s * 0.64, z, r: 0.1 });

export function pondF(x, z) {
  const nx = x / POND.a, nz = z / POND.b;
  const th = Math.atan2(nz, nx);
  const m = 1 + 0.07 * Math.sin(2 * th + 0.7) + 0.06 * Math.sin(3 * th + 2.1) + 0.035 * Math.sin(5 * th + 0.3);
  return Math.sqrt(nx * nx + nz * nz) / m;
}

export function terrainY(x, z) {
  const f = pondF(x, z);
  const u = 1 - f;
  const n = fbm2(x * 0.5 + 11, z * 0.5 + 3, 3);
  if (u > 0) {
    const t = clamp(u / 0.58, 0, 1);
    let y = -1.75 * Math.pow(t, 1.35);
    y += (n - 0.5) * 0.12 * smoothstep(0.02, 0.2, u);
    y += (fbm2(x * 1.7, z * 1.7, 2) - 0.5) * 0.06 * smoothstep(0.1, 0.4, u);
    return Math.min(y, -0.0005 - u * 0.001);
  }
  const e = -u;
  const ec = Math.min(e, 1.3) + Math.max(e - 1.3, 0) * 0.06;
  let y = ec * 0.5 + ec * ec * 0.22;
  y += smoothstep(2.0, 5.0, f) * (fbm2(x * 0.08 + 40, z * 0.08, 3) - 0.3) * 2.4;
  y += (n - 0.5) * 0.25 * smoothstep(0.05, 0.4, e);
  return Math.max(y, 0.0008 + e * 0.002);
}

export function inPond(x, z, margin = 0) { return terrainY(x, z) < -margin; }

function gridAxis() {
  const a = [];
  const inner = 8.6, step = 0.08;
  const n = Math.round(inner / step);
  for (let i = -n; i <= n; i++) a.push(i * step);
  let x = n * step, d = step;
  const pos = [], neg = [];
  for (let i = 0; i < 34; i++) { d *= 1.13; x += d; pos.push(x); neg.push(-x); }
  return [...neg.reverse(), ...a, ...pos];
}

const TERRAIN_FS_PARS = /* glsl */ `
vec3 perturbN(vec3 sp, vec3 sn, vec2 dH, float fd){
  vec3 sx = dFdx(sp), sy = dFdy(sp);
  vec3 R1 = cross(sy, sn), R2 = cross(sn, sx);
  float det = dot(sx, R1) * fd;
  vec3 g = sign(det) * (dH.x*R1 + dH.y*R2);
  return normalize(abs(det)*sn - g);
}
float gWet; float gSand;
vec3 lin(vec3 c){ return pow(c, vec3(2.2)); }
`;
const TERRAIN_FS_COLOR = /* glsl */ `
{
  vec2 p = vWP.xz; float y = vWP.y;
  float n1 = fbm(p*0.55), n2 = fbm(p*2.7+5.0), n3 = vn(p*16.0), n4 = fbm(p*0.23+9.0);
  vec3 grass = mix(vec3(0.13,0.21,0.05), vec3(0.28,0.36,0.09), n1);
  grass = mix(grass, vec3(0.34,0.38,0.12), smoothstep(0.55,0.8,n2)*0.5);
  vec3 dry = mix(vec3(0.27,0.19,0.11), vec3(0.36,0.28,0.18), n2);
  vec3 wetc = vec3(0.10,0.07,0.045);
  vec3 silt = mix(vec3(0.36,0.31,0.21), vec3(0.2,0.25,0.11), n1);
  silt = mix(silt, vec3(0.55,0.49,0.36), smoothstep(0.42,0.65,n4)*0.7);
  float gm = smoothstep(0.02, 0.32, y + (n1-0.5)*0.4);
  vec3 c = mix(dry, grass, gm);
  float sand = smoothstep(0.55,0.7,n4) * smoothstep(0.45,0.0,y) * smoothstep(-0.55,-0.05,y);
  c = mix(c, vec3(0.50,0.44,0.33), sand*0.8);
  gWet = smoothstep(0.16, 0.0, y);
  c = mix(c, c*0.38, gWet*0.85);
  c = mix(c, silt, smoothstep(0.0,-0.15,y));
  float alg = smoothstep(0.45,0.7,fbm(p*1.3+31.0)) * smoothstep(-0.05,-0.4,y) * smoothstep(-1.4,-0.6,y);
  c = mix(c, vec3(0.09,0.2,0.06), alg*0.55);
  c *= 0.72 + 0.55*n3;
  diffuseColor.rgb = lin(c);
}
`;
const TERRAIN_FS_ROUGH = `roughnessFactor = mix(0.95, 0.4, gWet);`;
const TERRAIN_FS_NORMAL = /* glsl */ `
{
  float bh = fbm(vWP.xz*7.0)*0.6 + vn(vWP.xz*34.0)*0.35;
  vec2 dH = vec2(dFdx(bh), dFdy(bh)) * 0.06;
  normal = perturbN(-vViewPosition, normal, dH, faceDirection);
}
`;

export function buildTerrain(scene) {
  const xs = gridAxis(), zs = xs;
  const nx = xs.length, nz = zs.length;
  const pos = new Float32Array(nx * nz * 3);
  let k = 0;
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
    pos[k++] = xs[i]; pos[k++] = terrainY(xs[i], zs[j]); pos[k++] = zs[j];
  }
  const idx = new Uint32Array((nx - 1) * (nz - 1) * 6);
  k = 0;
  for (let j = 0; j < nz - 1; j++) for (let i = 0; i < nx - 1; i++) {
    const a = j * nx + i, b = a + 1, c = a + nx, d = c + 1;
    idx[k++] = a; idx[k++] = c; idx[k++] = b; idx[k++] = b; idx[k++] = c; idx[k++] = d;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setIndex(new THREE.BufferAttribute(idx, 1));
  geo.computeVertexNormals();
  const mat = patch(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.95, metalness: 0 }), {
    fsPars: TERRAIN_FS_PARS, fsColor: TERRAIN_FS_COLOR, fsRough: TERRAIN_FS_ROUGH, fsNormal: TERRAIN_FS_NORMAL, key: 'terrain',
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  mesh.layers.enable(1);
  mesh.frustumCulled = false;
  scene.add(mesh);
  return mesh;
}

export function buildTerrainTexture(size = 512) {
  const data = new Uint16Array(size * size);
  const toH = THREE.DataUtils.toHalfFloat;
  for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) {
    const x = ((i + 0.5) / size - 0.5) * S, z = ((j + 0.5) / size - 0.5) * S;
    data[j * size + i] = toH(terrainY(x, z));
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RedFormat, THREE.HalfFloatType);
  tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearFilter;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return tex;
}

export function buildPebbles(scene) {
  const rnd = mulberry(7);
  let geo = new THREE.IcosahedronGeometry(1, 1);
  geo.deleteAttribute('uv'); geo.deleteAttribute('normal');
  geo = mergeVertices(geo);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const n = 1 + 0.18 * (vnoise(x * 2 + 5, y * 2 + z * 2) - 0.5);
    p.setXYZ(i, x * n, y * n, z * n);
  }
  geo.computeVertexNormals();
  const items = [];
  let tries = 0;
  while (items.length < 1500 && tries < 60000) {
    tries++;
    const x = (rnd() - 0.5) * 16, z = (rnd() - 0.5) * 16;
    const f = pondF(x, z);
    if (f < 0.55 || f > 1.16) continue;
    const y = terrainY(x, z);
    if (y < -0.9 || y > 0.28) continue;
    const dens = fbm2(x * 0.45 + 3, z * 0.45 + 8, 3);
    const edge = 1 - Math.abs(f - 0.98) * 3.2;
    if (rnd() > clamp(dens * 1.5 * edge, 0.03, 0.95)) continue;
    if (Math.abs(x - PIER.x) < 0.9 && z > 0.4) { if (rnd() < 0.8) continue; }
    const big = rnd() < 0.06;
    const s = big ? 0.1 + rnd() * 0.12 : 0.02 + Math.pow(rnd(), 2) * 0.06;
    items.push({ x, z, y, s, ry: rnd() * 6.28, flat: 0.45 + rnd() * 0.4, el: 0.6 + rnd() * 0.7 });
  }
  const mesh = new THREE.InstancedMesh(geo, patch(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55 }), {
    fsPars: TERRAIN_FS_PARS, key: 'pebble',
  }), items.length);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), c = new THREE.Color();
  items.forEach((it, i) => {
    e.set(0, it.ry, 0);
    q.setFromEuler(e);
    m.compose(new THREE.Vector3(it.x, it.y + it.s * it.flat * 0.35, it.z), q, new THREE.Vector3(it.s * it.el, it.s * it.flat, it.s));
    mesh.setMatrixAt(i, m);
    const r = rnd();
    if (r < 0.45) c.setHSL(0.09 + rnd() * 0.04, 0.14, 0.2 + rnd() * 0.18);
    else if (r < 0.8) c.setHSL(0.11, 0.07, 0.22 + rnd() * 0.16);
    else if (r < 0.92) c.setHSL(0.08, 0.3, 0.22 + rnd() * 0.1);
    else c.setHSL(0.12, 0.1, 0.4 + rnd() * 0.12);
    mesh.setColorAt(i, c);
  });
  mesh.instanceMatrix.needsUpdate = true;
  mesh.castShadow = true; mesh.receiveShadow = true;
  mesh.layers.enable(1);
  scene.add(mesh);
  return mesh;
}

export function buildGrass(scene) {
  const rnd = mulberry(21);
  const seg = 3;
  const verts = [], wts = [], idxs = [];
  for (let i = 0; i <= seg; i++) {
    const t = i / seg, w = 0.5 * (1 - t * 0.92);
    verts.push(-w, t, t * t * 0.35, w, t, t * t * 0.35);
    wts.push(t, t);
  }
  for (let i = 0; i < seg; i++) { const a = i * 2; idxs.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('aW', new THREE.Float32BufferAttribute(wts, 1));
  geo.setIndex(idxs);
  geo.computeVertexNormals();
  const normals = geo.attributes.normal;
  for (let i = 0; i < normals.count; i++) normals.setXYZ(i, 0, 1, 0.2);

  const count = 24000;
  const mesh = new THREE.InstancedMesh(geo, null, count);
  const ph = new Float32Array(count), amp = new Float32Array(count);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), c = new THREE.Color();
  let n = 0, tries = 0;
  while (n < count && tries < count * 8) {
    tries++;
    const th = rnd() * Math.PI * 2;
    const r = Math.sqrt(lerp(1.03 * 1.03, 2.7 * 2.7, rnd()));
    const mm = 1 + 0.07 * Math.sin(2 * th + 0.7) + 0.06 * Math.sin(3 * th + 2.1);
    const x = Math.cos(th) * r * mm * POND.a, z = Math.sin(th) * r * mm * POND.b;
    const f = pondF(x, z);
    const y = terrainY(x, z);
    if (y < 0.1) continue;
    if (Math.abs(x - PIER.x) < 1.15 && z > 3.4) continue;
    const dens = 0.35 + fbm2(x * 0.35, z * 0.35, 3) * 1.1;
    if (rnd() > dens * smoothstep(0.1, 0.4, y)) continue;
    const h = (0.08 + rnd() * 0.15) * (1 + 0.7 * smoothstep(1.4, 2.4, f));
    e.set((rnd() - 0.5) * 0.35, rnd() * 6.28, 0);
    q.setFromEuler(e);
    m.compose(new THREE.Vector3(x, y - 0.02, z), q, new THREE.Vector3(h * 0.08 + 0.015, h, h));
    mesh.setMatrixAt(n, m);
    c.setHSL(0.2 + rnd() * 0.08, 0.45 + rnd() * 0.2, 0.12 + rnd() * 0.12);
    mesh.setColorAt(n, c);
    ph[n] = rnd() * 6.28; amp[n] = 0.4 + rnd() * 0.5;
    n++;
  }
  mesh.count = n;
  geo.setAttribute('aPh', new THREE.InstancedBufferAttribute(ph, 1));
  geo.setAttribute('aAmp', new THREE.InstancedBufferAttribute(amp, 1));
  mesh.material = swayMaterial(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, side: THREE.DoubleSide }), 'grass');
  mesh.frustumCulled = false;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

export function buildFarTrees(scene) {
  const rnd = mulberry(99);
  const parts = [];
  const trunk = new THREE.CylinderGeometry(0.12, 0.2, 4.2, 6); trunk.translate(0, 2.1, 0);
  trunk.deleteAttribute('uv');
  const paint = (g, fn) => {
    const arr = new Float32Array(g.attributes.position.count * 3), p = g.attributes.position, c = new THREE.Color();
    for (let k = 0; k < p.count; k++) { fn(c, p.getX(k), p.getY(k), p.getZ(k)); arr[k * 3] = c.r; arr[k * 3 + 1] = c.g; arr[k * 3 + 2] = c.b; }
    g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  };
  paint(trunk, (c) => c.set(0x3a2c20));
  parts.push(trunk);
  const hue = 0.22 + rnd() * 0.05;
  for (let i = 0; i < 4; i++) {
    let b = new THREE.IcosahedronGeometry(1.7 - i * 0.18, 2);
    b.deleteAttribute('uv'); b.deleteAttribute('normal');
    b = mergeVertices(b);
    const p = b.attributes.position;
    for (let k = 0; k < p.count; k++) {
      const x = p.getX(k), y = p.getY(k), z = p.getZ(k);
      const nn = 1 + 0.22 * (vnoise(x * 1.8 + i * 5, y * 1.8 + z * 1.8) - 0.5) + 0.1 * (vnoise(x * 5 + i, z * 5 + y * 5) - 0.5);
      p.setXYZ(k, x * nn, y * nn * 0.8, z * nn);
    }
    b.translate((rnd() - 0.5) * 1.8, 3.4 + i * 0.8 - (i > 2 ? 0.3 : 0), (rnd() - 0.5) * 1.8);
    b.computeVertexNormals();
    const seed = i * 7.1;
    paint(b, (c, x, y, z) => { const t = clamp((y - 2.6) / 4.2, 0, 1); c.setHSL(hue + (vnoise(x * 2 + seed, z * 2) - 0.5) * 0.04, 0.5, 0.075 + 0.09 * t + 0.05 * vnoise(x * 4, y * 4 + z * 4)); });
    parts.push(b);
  }
  const geo = mergeGeometries(parts);
  const items = [];
  let tries = 0;
  while (items.length < 95 && tries < 5000) {
    tries++;
    const th = rnd() * Math.PI * 2;
    const r = 3.4 + rnd() * 3.6;
    const x = Math.cos(th) * r * POND.a, z = Math.sin(th) * r * POND.b;
    if (z > 11 && Math.abs(x) < 9) continue;
    items.push({ x, z, y: terrainY(x, z), s: 0.5 + rnd() * 0.6, ry: rnd() * 6.28 });
  }
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 });
  const mesh = new THREE.InstancedMesh(geo, mat, items.length);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), c = new THREE.Color();
  items.forEach((it, i) => {
    e.set(0, it.ry, 0); q.setFromEuler(e);
    m.compose(new THREE.Vector3(it.x, it.y - 0.3, it.z), q, new THREE.Vector3(it.s, it.s * (0.9 + rnd() * 0.5), it.s));
    mesh.setMatrixAt(i, m);
    c.setScalar(0.75 + rnd() * 0.5);
    mesh.setColorAt(i, c);
  });
  mesh.castShadow = false; mesh.receiveShadow = false;
  scene.add(mesh);
  return mesh;
}
