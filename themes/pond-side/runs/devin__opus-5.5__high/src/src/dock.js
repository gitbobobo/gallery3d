import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { DOCK, PILINGS, heightAt } from './pond.js';
import { rng } from './noise.js';
import { patchMaterial, setLayers, LAYER } from './shared.js';

function woodTexture() {
  const W = 1024, H = 128;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  g.fillStyle = '#9c8c76';
  g.fillRect(0, 0, W, H);
  const r = rng(12);
  for (let i = 0; i < 140; i++) {
    const y = r() * H;
    const amp = 2 + r() * 6;
    const f = 0.004 + r() * 0.01;
    const v = Math.floor(70 + r() * 70);
    g.strokeStyle = `rgba(${v},${Math.floor(v * 0.88)},${Math.floor(v * 0.75)},${0.18 + r() * 0.3})`;
    g.lineWidth = 0.6 + r() * 2.2;
    g.beginPath();
    for (let x = 0; x <= W; x += 8) {
      const yy = y + Math.sin(x * f + i) * amp + Math.sin(x * f * 3.1) * amp * 0.3;
      if (x === 0) g.moveTo(x, yy);
      else g.lineTo(x, yy);
    }
    g.stroke();
  }
  for (let i = 0; i < 10; i++) {
    const x = r() * W, y = r() * H, rr = 3 + r() * 6;
    g.fillStyle = 'rgba(50,38,28,0.6)';
    g.beginPath();
    g.ellipse(x, y, rr * 1.8, rr, 0, 0, Math.PI * 2);
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function boxWithUV(w, h, d, uOff, vOff, uScale) {
  const g = new THREE.BoxGeometry(w, h, d);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * uScale + uOff, uv.getY(i) * 0.25 + vOff);
  return g;
}

export function createDock() {
  const r = rng(321);
  const { start, dir, side, length, width, deck } = DOCK;
  const yaw = Math.atan2(dir[0], dir[1]);
  const group = new THREE.Group();
  const deckParts = [];
  const plankW = 0.16, gap = 0.014;
  for (let s = 0; s < length; s += plankW + gap) {
    const t = 0.03 + r() * 0.01;
    const g = boxWithUV(width + (r() - 0.5) * 0.04, t, plankW - r() * 0.01, r(), r() * 0.75, 1.2);
    g.rotateY((r() - 0.5) * 0.02);
    g.translate((r() - 0.5) * 0.03, deck - t / 2 + (r() - 0.5) * 0.006, s + plankW / 2);
    deckParts.push(g);
  }
  // stringers
  for (const k of [-1, 1]) {
    const g2 = new THREE.BoxGeometry(0.08, 0.12, length);
    const uv = g2.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getY(i) * 3, uv.getX(i) * 0.25);
    g2.translate(k * (width / 2 - 0.12), deck - 0.1, length / 2);
    deckParts.push(g2);
  }
  // cross beams on pilings
  for (let s = 1.0; s <= length + 0.01; s += 1.3) {
    const g = boxWithUV(width + 0.1, 0.1, 0.08, r(), r() * 0.75, 1);
    g.translate(0, deck - 0.2, s);
    deckParts.push(g);
  }
  const deckGeo = mergeGeometries(deckParts.map((g) => g.toNonIndexed()));
  const woodMap = woodTexture();
  const deckMat = new THREE.MeshStandardMaterial({ map: woodMap, roughness: 0.85, color: 0xc8b8a4 });
  patchMaterial(deckMat, { wet: 0.4 });
  const deckMesh = new THREE.Mesh(deckGeo, deckMat);
  deckMesh.position.set(start[0], 0, start[1]);
  deckMesh.rotation.y = yaw;
  deckMesh.castShadow = true;
  deckMesh.receiveShadow = true;
  setLayers(deckMesh, LAYER.MAIN, LAYER.REFL);
  group.add(deckMesh);

  // pilings (world space)
  const pileParts = [];
  for (const p of PILINGS) {
    const bottom = heightAt(p.x, p.z) - 0.25;
    const top = deck - 0.12;
    const h = top - bottom;
    const g = new THREE.CylinderGeometry(p.r * 0.95, p.r, h, 12, 8);
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 0.5 + r(), uv.getY(i) * 0.4 + r());
    g.rotateY(r() * 6);
    g.translate(p.x, bottom + h / 2, p.z);
    pileParts.push(g);
  }
  // two mooring posts at the end
  for (const k of [-1, 1]) {
    const x = start[0] + dir[0] * (length - 0.08) + side[0] * k * (width / 2 - 0.05);
    const z = start[1] + dir[1] * (length - 0.08) + side[1] * k * (width / 2 - 0.05);
    const g = new THREE.CylinderGeometry(0.07, 0.075, 0.5, 12);
    g.translate(x, deck + 0.22, z);
    pileParts.push(g);
  }
  const pileMat = new THREE.MeshStandardMaterial({ map: woodMap, roughness: 0.9, color: 0xa89884 });
  patchMaterial(pileMat, {
    underwater: true,
    wet: 0.5,
    fragColor: /* glsl */ `
      float alg = smoothstep(0.02, -0.1, vWPos.y);
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.16, 0.2, 0.08), alg * 0.75);
      float band = smoothstep(0.12, 0.0, vWPos.y) * smoothstep(-0.06, 0.0, vWPos.y);
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.22, 0.2, 0.12), band * 0.6);
    `,
  });
  const pileMesh = new THREE.Mesh(mergeGeometries(pileParts.map((g) => g.toNonIndexed())), pileMat);
  pileMesh.castShadow = true;
  pileMesh.receiveShadow = true;
  setLayers(pileMesh, LAYER.MAIN, LAYER.REFL, LAYER.REFR);
  group.add(pileMesh);
  return group;
}
