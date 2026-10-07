import * as THREE from 'three';
import { POND, floorY, pondDepth, fbm, clamp01 } from './pond.js';
import { groundTexture } from './textures.js';
import { causticsInject, swayInject } from './glsl.js';
import { U } from './shared.js';

// 地形网格：池底 - 岸坡 - 草地，顶点色区分泥/卵石/草
export function buildTerrain(scene) {
  const geo = new THREE.PlaneGeometry(104, 104, 200, 200);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const c = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    const n = pondNormQuick(x, z);
    const depth = pondDepth(x, z);
    const under = depth > 0;
    let h;
    if (under) {
      // 池底：浅处卵石起伏，深处平坦
      const shallow = 1 - clamp01(depth / 1.1);
      h = -depth + (fbm(x * 2.6 + 3, z * 2.6, 3) - 0.5) * 0.16 * shallow - depth * 0.05;
    } else {
      const t = clamp01((n - POND.R0) * 0.6);
      h = floorY(x, z) + (fbm(x * 0.9 + 7, z * 0.9 - 2, 3) - 0.5) * 0.34 * Math.min(1, t + 0.15);
    }
    pos.setY(i, h);

    // 顶点色
    if (under) {
      const deep = clamp01(depth / 1.3);
      const peb = fbm(x * 2.2 - 5, z * 2.2 + 8, 3);
      c.setRGB(0.38, 0.31, 0.21);
      c.lerp(new THREE.Color(0.55, 0.53, 0.48), clamp01(peb * 1.8 - 0.45) * (1 - deep) * 0.9);
      c.multiplyScalar(1 - deep * 0.55);
    } else {
      const wet = clamp01(1 - h / 0.28);
      const grass = fbm(x * 0.33 + 11, z * 0.33 - 7, 3);
      const dirt = new THREE.Color(0.46, 0.37, 0.25);
      const g1 = new THREE.Color(0.42, 0.55, 0.24).lerp(new THREE.Color(0.52, 0.63, 0.30), clamp01(grass * 1.6 - 0.3));
      c.copy(dirt).lerp(g1, clamp01((h - 0.15) * 1.6 + grass * 0.5 - 0.25));
      c.lerp(new THREE.Color(0.22, 0.18, 0.12), wet * 0.8);
    }
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    map: groundTexture(),
    vertexColors: true,
    roughness: 0.96,
    metalness: 0
  });
  mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
  mat.map.repeat.set(14, 14);
  if (!window.__NOCAUST) mat.onBeforeCompile = causticsInject;

  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = false;
  scene.add(mesh);
  return mesh;
}

function pondNormQuick(x, z) {
  const r = Math.hypot(x, z);
  if (r < 1e-6) return 0;
  const a = Math.atan2(z, x);
  const w = 1 + 0.16 * Math.sin(3 * a + 1.2) + 0.10 * Math.sin(5 * a + 4.0) + 0.07 * Math.sin(8 * a + 2.2);
  return r / w;
}

// 水下卵石 / 岸边石头
export function buildRocks(scene) {
  const geo = new THREE.DodecahedronGeometry(1, 1);
  // 压扁+扰动
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(p, i);
    const n = 1 + (fbm(v.x * 2.1 + v.z, v.y * 2.1, 2) - 0.5) * 0.55;
    v.multiplyScalar(n);
    v.y *= 0.62;
    p.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0.02 });
  mat.onBeforeCompile = causticsInject;
  const inst = new THREE.InstancedMesh(geo, mat, 420);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3();
  const col = new THREE.Color();
  let count = 0;
  const r = () => Math.random();
  while (count < 420) {
    const a = r() * Math.PI * 2;
    const rr = 2.2 + Math.pow(r(), 0.6) * 6.8;
    const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
    const d = pondDepth(x, z);
    let y, scale;
    if (d > 0.02) { y = -d + 0.02; scale = 0.05 + r() * 0.1; if (d > 1.05 && r() < 0.6) { continue; } }
    else {
      const n = pondNormQuick(x, z);
      if (n > POND.R0 + 1.6) continue;
      y = floorY(x, z) + 0.01; scale = 0.06 + r() * 0.14;
    }
    e.set(r() * 3, r() * 3, r() * 3);
    q.setFromEuler(e);
    s.set(scale * (0.8 + r() * 0.5), scale * (0.6 + r() * 0.4), scale * (0.8 + r() * 0.5));
    m.compose(new THREE.Vector3(x, y, z), q, s);
    inst.setMatrixAt(count, m);
    const g = 0.32 + r() * 0.3;
    col.setRGB(g * (0.95 + r() * 0.1), g * 0.95, g * 0.88);
    inst.setColorAt(count, col);
    count++;
  }
  inst.instanceMatrix.needsUpdate = true;
  scene.add(inst);
  return inst;
}

// 水草：浅水中的细长叶束
export function buildSeaweed(scene) {
  const blade = new THREE.PlaneGeometry(0.05, 1, 1, 4);
  blade.translate(0, 0.5, 0);
  const cross = mergeGeoms([blade, blade.clone().rotateY(Math.PI / 2)]);
  const flex = new Float32Array(cross.attributes.position.count);
  const p = cross.attributes.position;
  for (let i = 0; i < p.count; i++) flex[i] = clamp01(p.getY(i));
  cross.setAttribute('aFlex', new THREE.BufferAttribute(flex, 1));

  const mat = new THREE.MeshStandardMaterial({
    color: 0x2d5a2a, roughness: 0.8, side: THREE.DoubleSide
  });
  mat.onBeforeCompile = (sh) => { swayInject(sh, { amp: 0.5, speed: 1.6 }); sh.uniforms.uWind.value = U.uWind.value; };
  const inst = new THREE.InstancedMesh(cross, mat, 260);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3();
  let count = 0, guard = 0;
  while (count < 260 && guard++ < 4000) {
    const a = Math.random() * Math.PI * 2;
    const rr = 3.4 + Math.random() * 4.4;
    const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
    const d = pondDepth(x, z);
    if (d < 0.12 || d > 0.72) continue;
    const hgt = 0.22 + Math.random() * 0.34;
    e.set(0, Math.random() * Math.PI * 2, 0);
    q.setFromEuler(e);
    s.set(0.8 + Math.random() * 0.6, hgt, 0.8 + Math.random() * 0.6);
    m.compose(new THREE.Vector3(x, -d - 0.02, z), q, s);
    inst.setMatrixAt(count, m);
    count++;
  }
  inst.count = count;
  inst.instanceMatrix.needsUpdate = true;
  scene.add(inst);
  return inst;
}

export function mergeGeoms(list) {
  // 简易合并（属性集一致的前提下）
  const g = new THREE.BufferGeometry();
  let vCount = 0, iCount = 0;
  for (const gg of list) { vCount += gg.attributes.position.count; iCount += gg.index ? gg.index.count : gg.attributes.position.count; }
  const attrs = {};
  for (const name of Object.keys(list[0].attributes)) {
    const itemSize = list[0].attributes[name].itemSize;
    const arr = new Float32Array(vCount * itemSize);
    attrs[name] = new THREE.BufferAttribute(arr, itemSize);
  }
  g.setAttribute('position', attrs.position);
  let vo = 0, io = 0;
  const index = new Uint32Array(iCount);
  for (const gg of list) {
    for (const name of Object.keys(attrs)) {
      if (!gg.attributes[name]) continue;
      const src = gg.attributes[name];
      attrs[name].array.set(src.array, vo * src.itemSize);
    }
    if (gg.index) {
      for (let i = 0; i < gg.index.count; i++) index[io++] = gg.index.getX(i) + vo;
    } else {
      for (let i = 0; i < gg.attributes.position.count; i++) index[io++] = i + vo;
    }
    vo += gg.attributes.position.count;
  }
  g.setIndex(new THREE.BufferAttribute(index, 1));
  for (const name of Object.keys(attrs)) {
    if (name !== 'position') g.setAttribute(name, attrs[name]);
  }
  return g;
}
