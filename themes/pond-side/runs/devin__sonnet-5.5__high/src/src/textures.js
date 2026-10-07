import * as THREE from 'three';
import { mulberry, fbm2 } from './shared.js';

export function makeChopTexture(size = 256) {
  const rnd = mulberry(5);
  const waves = [];
  for (let i = 0; i < 170; i++) {
    const mag = 3.2 * Math.pow(15, rnd());
    const ang = i * 2.399963 + rnd() * 0.9;
    let kx = Math.round(Math.cos(ang) * mag), ky = Math.round(Math.sin(ang) * mag);
    if (!kx && !ky) kx = 1;
    const m = Math.hypot(kx, ky);
    waves.push({ kx, ky, a: Math.pow(m, -1.3) * 2 * Math.PI, ph: rnd() * 6.283 });
  }
  const gx = new Float32Array(size * size), gy = new Float32Array(size * size);
  let sum = 0;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    let sx = 0, sy = 0;
    for (const w of waves) {
      const c = Math.cos(2 * Math.PI * (w.kx * x + w.ky * y) / size + w.ph) * w.a;
      sx += c * w.kx; sy += c * w.ky;
    }
    const i = y * size + x;
    gx[i] = sx; gy[i] = sy; sum += sx * sx + sy * sy;
  }
  const std = Math.sqrt(sum / (size * size * 2));
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    data[i * 4] = Math.round(clamp01(gx[i] / (3.2 * std) * 0.5 + 0.5) * 255);
    data[i * 4 + 1] = Math.round(clamp01(gy[i] / (3.2 * std) * 0.5 + 0.5) * 255);
    data[i * 4 + 2] = 128; data[i * 4 + 3] = 255;
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.UnsignedByteType);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.minFilter = THREE.LinearMipmapLinearFilter; tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true; tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}
const clamp01 = (x) => Math.max(0, Math.min(1, x));

export function makeWoodTexture(seed = 3, w = 512, h = 512, base = [122, 92, 62]) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d');
  const rnd = mulberry(seed);
  g.fillStyle = `rgb(${base[0]},${base[1]},${base[2]})`; g.fillRect(0, 0, w, h);
  const img = g.getImageData(0, 0, w, h);
  const d = img.data;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const warp = fbm2(x * 0.004 + seed, y * 0.05, 3) * 40;
    const ring = Math.sin((y + warp) * 0.35 + fbm2(x * 0.01, y * 0.02 + seed, 2) * 6) * 0.5 + 0.5;
    const fine = fbm2(x * 0.03 + seed * 3, y * 0.9, 2);
    const v = 0.72 + ring * 0.2 + fine * 0.22 + (rnd() - 0.5) * 0.06;
    const i = (y * w + x) * 4;
    d[i] = base[0] * v; d[i + 1] = base[1] * v; d[i + 2] = base[2] * v * 0.97;
  }
  g.putImageData(img, 0, 0);
  g.strokeStyle = 'rgba(30,20,10,0.28)';
  for (let i = 0; i < 26; i++) {
    g.lineWidth = 0.5 + rnd() * 1.2;
    g.beginPath(); const y = rnd() * h; g.moveTo(0, y);
    for (let x = 0; x <= w; x += 32) g.lineTo(x, y + Math.sin(x * 0.02 + i) * 3 + (rnd() - 0.5) * 1.5);
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

export function makeBarkTexture(seed = 11, w = 256, h = 512, base = [96, 80, 64]) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d');
  const img = g.createImageData(w, h); const d = img.data;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const warp = fbm2(x * 0.02 + seed, y * 0.01, 2) * 18;
    const n = fbm2((x + warp) * 0.09, y * 0.012 + seed, 4);
    const crack = Math.pow(1 - Math.abs(Math.sin((x + warp) * 0.19 + n * 5)), 6);
    const v = 0.55 + n * 0.7 - crack * 0.45;
    const i = (y * w + x) * 4;
    d[i] = base[0] * v; d[i + 1] = base[1] * v; d[i + 2] = base[2] * v; d[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}
