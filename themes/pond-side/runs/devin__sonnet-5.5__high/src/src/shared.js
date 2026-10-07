import * as THREE from 'three';

export const S = 14;
export const N = 384;
export const DX = S / N;

export const G = {
  uTime: { value: 0 },
  uWind: { value: 0.3 },
  uWT: { value: 0 },
  uWindDir: { value: new THREE.Vector2(0.8, -0.6).normalize() },
  uRefr: { value: 0 },
  uSunDir: { value: new THREE.Vector3(0.5, 0.7, 0.2).normalize() },
  uSunRad: { value: new THREE.Vector3(3, 3, 3) },
  uAbsorb: { value: new THREE.Vector3(0.95, 0.3, 0.42) },
  uScatter: { value: new THREE.Vector3(0.03, 0.1, 0.08) },
  tCaustic: { value: null },
  uCaustic: { value: 1 },
  uRain: { value: 0 },
};

export function mulberry(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

function hash2(ix, iy) {
  let h = (ix * 374761393 + iy * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
export function vnoise(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy), b = hash2(ix + 1, iy), c = hash2(ix, iy + 1), d = hash2(ix + 1, iy + 1);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}
export function fbm2(x, y, oct = 4) {
  let s = 0, a = 0.5, f = 1;
  for (let i = 0; i < oct; i++) { s += a * vnoise(x * f, y * f); f *= 2.03; a *= 0.5; }
  return s;
}

export const events = new EventTarget();
