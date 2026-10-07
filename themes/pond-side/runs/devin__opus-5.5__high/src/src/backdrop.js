import * as THREE from 'three';
import { heightAt, signedShore, insideDock, willowBase } from './pond.js';
import { rng, vnoise, fbm } from './noise.js';
import { patchMaterial, patchedDepthMaterial, setLayers, LAYER } from './shared.js';

function clumpTexture() {
  const S = 256;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  const r = rng(77);
  for (let i = 0; i < 520; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.pow(r(), 0.65) * S * 0.44;
    const x = S / 2 + Math.cos(a) * d, y = S / 2 + Math.sin(a) * d;
    const l = 55 + r() * 120;
    const sh = (0.55 + (1 - d / (S * 0.44)) * 0.25 + r() * 0.3) * (y < S / 2 ? 1.08 : 0.88);
    g.fillStyle = `rgb(${Math.min(255, l * sh * 0.95)},${Math.min(255, (l + 40) * sh)},${Math.min(255, l * sh * 0.55)})`;
    g.beginPath();
    g.ellipse(x, y, 3 + r() * 5, 1.6 + r() * 2.4, r() * Math.PI, 0, Math.PI * 2);
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function placeTrees(r) {
  const trees = [];
  // groves: clusters of overlapping trees read as a woodland edge rather than single props
  for (let gi = 0; gi < 12; gi++) {
    const ga = (gi / 12) * Math.PI * 2 + (r() - 0.5) * 0.4;
    if (ga > 0.5 && ga < 1.3) continue;
    const grad = 22 + r() * 7, n = 3 + Math.floor(r() * 4);
    for (let k = 0; k < n; k++) {
      const a = ga + (r() - 0.5) * 0.22;
      const rad = grad + (r() - 0.5) * 5;
      const x = Math.cos(a) * rad, z = Math.sin(a) * rad;
      if (signedShore(x, z) < 6 || insideDock(x, z, 3)) continue;
      if (Math.hypot(x - willowBase[0], z - willowBase[1]) < 7) continue;
      trees.push({ x, z, s: 0.85 + r() * 0.5 });
    }
  }
  return trees;
}

function createTrees(r) {
  const group = new THREE.Group();
  const trees = placeTrees(r);
  // trunks
  const trunkGeo = new THREE.CylinderGeometry(0.12, 0.24, 1, 7, 1, true);
  trunkGeo.translate(0, 0.5, 0);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3a3028, roughness: 0.95 });
  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, trees.length);
  const dummy = new THREE.Object3D();
  const clumps = [];
  trees.forEach((t, i) => {
    const y0 = heightAt(t.x, t.z) - 0.1;
    const h = (2.2 + r() * 1.2) * t.s;
    dummy.position.set(t.x, y0, t.z);
    dummy.scale.set(t.s, h + 2.5 * t.s, t.s);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    trunks.setMatrixAt(i, dummy.matrix);
    const crownR = (2.3 + r() * 0.9) * t.s, crownH = (2.2 + r() * 0.9) * t.s;
    const cy = y0 + h + crownH * 0.8;
    const n = 55 + Math.floor(r() * 25);
    const hue = r();
    for (let k = 0; k < n; k++) {
      const u = r() * 2 - 1, th = r() * Math.PI * 2, rad = Math.pow(r(), 0.4);
      const nx = Math.sqrt(1 - u * u) * Math.cos(th), nz = Math.sqrt(1 - u * u) * Math.sin(th), ny = u;
      const lump = 1 + vnoise(nx * 2.5 + i, ny * 2.5 + nz * 2.1, i) * 0.25;
      clumps.push({
        x: t.x + nx * rad * crownR * lump,
        y: cy + ny * rad * crownH * lump,
        z: t.z + nz * rad * crownR * lump,
        s: (1.0 + r() * 0.8) * t.s,
        n: [nx, ny * 1.2 + 0.25, nz],
        rot: r() * Math.PI * 2,
        shade: (0.55 + r() * 0.35) * (0.75 + 0.35 * (ny * 0.5 + 0.5)) * (0.7 + 0.3 * rad),
        hue,
      });
    }
  });
  trunks.castShadow = true;
  trunks.receiveShadow = true;
  trunks.frustumCulled = false;
  setLayers(trunks, LAYER.MAIN, LAYER.REFL);
  group.add(trunks);

  const quad = new THREE.PlaneGeometry(1, 1);
  const nArr = new Float32Array(clumps.length * 3);
  const rotArr = new Float32Array(clumps.length);
  const tex = clumpTexture();
  const billboard = {
    vertHead: 'attribute vec3 aN; attribute float aRot;',
    begin: /* glsl */ `
      float cr = cos(aRot), sr = sin(aRot);
      transformed.xy = mat2(cr, sr, -sr, cr) * transformed.xy;
    `,
    displace: /* glsl */ `
      float bs = length(instanceMatrix[0].xyz);
      vec3 camR = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
      vec3 camU = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
      wp4.xyz = iOrigin + (camR * transformed.x + camU * transformed.y) * bs;
      float gk = gustAt(iOrigin.xz);
      wp4.xz += uWindDir * (uWind * (0.15 + 0.5 * gk) + 0.03 * sin(uTime * 1.4 + iOrigin.x * 0.7)) * max(iOrigin.y - 2.0, 0.0) * 0.06;
    `,
  };
  const mat = new THREE.MeshStandardMaterial({ map: tex, alphaTest: 0.5, alphaToCoverage: true, roughness: 0.9, side: THREE.DoubleSide });
  patchMaterial(mat, {
    ...billboard,
    vertHead: billboard.vertHead + ' varying vec3 vClumpN;',
    begin: billboard.begin + ' vClumpN = normalize(normalMatrix * normalize(aN));',
    fragHead: 'varying vec3 vClumpN;',
    fragNormal: 'normal = normalize(vClumpN);',
    fragLights: 'reflectedLight.indirectDiffuse *= 1.3;',
  });
  const mesh = new THREE.InstancedMesh(quad, mat, clumps.length);
  clumps.forEach((c, i) => {
    dummy.position.set(c.x, c.y, c.z);
    dummy.scale.setScalar(c.s);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    mesh.setColorAt(i, new THREE.Color((0.36 + c.hue * 0.14) * c.shade, (0.5 + c.hue * 0.06) * c.shade, 0.3 * c.shade));
    nArr.set(c.n, i * 3);
    rotArr[i] = c.rot;
  });
  quad.setAttribute('aN', new THREE.InstancedBufferAttribute(nArr, 3));
  quad.setAttribute('aRot', new THREE.InstancedBufferAttribute(rotArr, 1));
  mesh.customDepthMaterial = patchedDepthMaterial({ ...billboard, map: tex, alphaTest: 0.5, side: THREE.DoubleSide });
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;
  setLayers(mesh, LAYER.MAIN, LAYER.REFL);
  group.add(mesh);
  return group;
}

export function createBackdrop() {
  const group = new THREE.Group();
  const r = rng(555);
  group.add(createTrees(r));

  // distant woodland silhouette: union of round crowns of random size
  const seg = 1400, R = 34;
  const crowns = [];
  for (let i = 0; i < 260; i++) {
    const rr = 1.2 + Math.pow(r(), 1.5) * 2.6;
    crowns.push({ a: r() * Math.PI * 2, r: rr, y: 3.2 + r() * 2.8 + (fbm(i * 0.07, 2.1, 3, 8) * 0.5 + 0.5) * 2.5 });
  }
  const pos = [], idx = [], col = [];
  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * Math.PI * 2;
    const x = Math.cos(a) * R, z = Math.sin(a) * R;
    const base = heightAt(x * 0.97, z * 0.97) - 0.6;
    let top = 3;
    for (const c of crowns) {
      let da = Math.abs(a - c.a);
      da = Math.min(da, Math.PI * 2 - da) * R;
      if (da < c.r) top = Math.max(top, c.y + Math.sqrt(c.r * c.r - da * da) * 0.8);
    }
    pos.push(x, base, z, x, base + top, z);
    col.push(0.5, 0.5, 0.5, 1, 1, 1);
  }
  for (let i = 0; i < seg; i++) {
    const a = i * 2;
    idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }
  const lg = new THREE.BufferGeometry();
  lg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  lg.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  lg.setIndex(idx);
  const lm = new THREE.MeshBasicMaterial({ color: 0x2a3a26, vertexColors: true, side: THREE.DoubleSide });
  const line = new THREE.Mesh(lg, lm);
  setLayers(line, LAYER.MAIN, LAYER.REFL);
  group.add(line);
  group.userData.treeline = lm;
  return group;
}
