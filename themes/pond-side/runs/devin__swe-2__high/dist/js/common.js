// 公共模块：池塘形状、噪声、调色板、CPU 波场、程序化贴图
import * as THREE from 'three';

// ---------- 模拟域（水面波模拟覆盖的世界范围） ----------
export const DOMAIN = { x0: -15, x1: 15, z0: -12, z1: 12 };
export const DOMAIN_W = DOMAIN.x1 - DOMAIN.x0;
export const DOMAIN_H = DOMAIN.z1 - DOMAIN.z0;

export function worldToUV(x, z, out) {
  out = out || {};
  out.u = (x - DOMAIN.x0) / DOMAIN_W;
  out.v = (z - DOMAIN.z0) / DOMAIN_H;
  return out;
}

// ---------- 确定性噪声 ----------
function hash2(x, y) {
  let h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return h - Math.floor(h);
}
export function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi), b = hash2(xi + 1, yi), c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
export function fbm(x, y, oct = 4) {
  let s = 0, a = 0.5, f = 1;
  for (let i = 0; i < oct; i++) { s += a * vnoise(x * f, y * f); a *= 0.5; f *= 2.03; }
  return s;
}
export function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
export function lerp(a, b, t) { return a + (b - a) * t; }
export function smoothstep(a, b, x) {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}
export function rand(a = 1, b) { return b === undefined ? Math.random() * a : a + Math.random() * (b - a); }

// ---------- 池塘形状 ----------
// 岸线：以原点为中心的椭圆 + 角度噪声扰动
const RX = 10.6, RZ = 8.4;
export function shoreRadius(theta) {
  const c = Math.cos(theta), s = Math.sin(theta);
  const base = (RX * RZ) / Math.sqrt((RZ * c) * (RZ * c) + (RX * s) * (RX * s));
  const wob = 1 + 0.09 * Math.sin(2 * theta + 1.3) + 0.06 * Math.sin(3 * theta + 4.1) + 0.04 * Math.sin(5 * theta + 0.6);
  return base * wob;
}
// rr < 1 在水里
export function pondRR(x, z) {
  const d = Math.sqrt(x * x + z * z);
  const th = Math.atan2(z, x);
  return d / shoreRadius(th);
}
const MAX_DEPTH = 2.4;
export function depthAt(x, z) {
  const rr = pondRR(x, z);
  if (rr >= 1) return 0;
  const t = 1 - rr;
  let d = MAX_DEPTH * Math.pow(smoothstep(0.0, 0.62, t), 0.85);
  d += (fbm(x * 0.55 + 9.1, z * 0.55 + 3.7, 3) - 0.5) * 0.22 * smoothstep(0.02, 0.2, t);
  return Math.max(0, d);
}
// 地形高度：水里是负的池底，岸边隆起
export function terrainHeight(x, z) {
  const rr = pondRR(x, z);
  if (rr < 1) return -depthAt(x, z);
  const t = rr - 1;
  const rise = Math.min(1.7, t * 6.5) * (0.72 + 0.5 * fbm(x * 0.18 + 4.4, z * 0.18 + 8.8, 3));
  const mound = fbm(x * 0.07 + 1.1, z * 0.07 + 2.2, 3) * 0.9;
  return -0.04 + rise + mound * smoothstep(0.02, 0.3, t);
}
// 往岸内的法向（指向水中心）
export function insidePond(x, z, margin = 0) {
  return pondRR(x, z) < 1 - margin;
}

// ---------- CPU 波场（供浮物采样高度/梯度，与 GPU 模拟事件同步） ----------
export class WaveField {
  constructor() { this.ripples = []; this.time = 0; }
  addRipple(x, z, amp, speed = 2.6, decay = 2.8) {
    this.ripples.push({ x, z, t0: this.time, amp, speed, decay });
    if (this.ripples.length > 40) this.ripples.shift();
  }
  update(t) {
    this.time = t;
    while (this.ripples.length && t - this.ripples[0].t0 > this.ripples[0].decay * 2.2) this.ripples.shift();
  }
  heightAt(x, z, wind = 0) {
    let h = 0;
    const t = this.time;
    for (const r of this.ripples) {
      const dt = t - r.t0;
      if (dt <= 0) continue;
      const dx = x - r.x, dz = z - r.z;
      const d = Math.sqrt(dx * dx + dz * dz);
      const front = r.speed * dt;
      const w = 0.5 + 0.22 * front;
      const g = Math.exp(-((d - front) * (d - front)) / (2 * w * w));
      h += r.amp * Math.sin(6.5 * (d - front)) * g * Math.exp(-dt / r.decay) * Math.exp(-front * 0.1);
    }
    // 风碎波
    if (wind > 0.01) {
      const wa = wind * 0.028;
      h += wa * Math.sin(x * 2.1 + t * 2.4 + Math.sin(z * 1.3 + t)) ;
      h += wa * 0.7 * Math.sin(z * 2.9 - t * 3.1 + x * 0.9);
      h += wa * 0.5 * Math.sin((x + z) * 4.2 + t * 4.4);
    }
    return h;
  }
  gradientAt(x, z, wind = 0, eps = 0.18) {
    const hx = this.heightAt(x + eps, z, wind) - this.heightAt(x - eps, z, wind);
    const hz = this.heightAt(x, z + eps, wind) - this.heightAt(x, z - eps, wind);
    return { x: hx / (2 * eps), z: hz / (2 * eps) };
  }
}

// ---------- 时间调色板（tod: 0白天 1黄昏 2夜晚，连续插值） ----------
const C = (h) => new THREE.Color(h);
export const PALETTES = [
  { // 白天
    zenith: C(0x3f7ec2), horizon: C(0xc8e2ec), sunColor: C(0xfff3dd), sunI: 2.6,
    sunElev: 0.95, sunAzim: 0.7, hemiSky: C(0x9cc8e8), hemiGnd: C(0x6b7a55), hemiI: 0.55,
    fog: C(0xbfd9de), fogD: 0.011, deepWater: C(0x06403c), shallowTint: C(0x8fd0c0),
    cloud: 0.5, moonI: 0, starI: 0, firefly: 0,
  },
  { // 黄昏
    zenith: C(0x2c3a6e), horizon: C(0xf08345), sunColor: C(0xffb066), sunI: 1.6,
    sunElev: 0.16, sunAzim: 2.4, hemiSky: C(0x8a6a8f), hemiGnd: C(0x4a4238), hemiI: 0.38,
    fog: C(0xc78d64), fogD: 0.014, deepWater: C(0x1a3038), shallowTint: C(0xcf9a6a),
    cloud: 0.62, moonI: 0.15, starI: 0.15, firefly: 0.25,
  },
  { // 夜晚
    zenith: C(0x050a18), horizon: C(0x0d1a26), sunColor: C(0xaac4ff), sunI: 0.5,
    sunElev: 0.7, sunAzim: 4.2, hemiSky: C(0x223349), hemiGnd: C(0x111a16), hemiI: 0.3,
    fog: C(0x0a1520), fogD: 0.02, deepWater: C(0x020c12), shallowTint: C(0x1d4a55),
    cloud: 0.3, moonI: 1, starI: 1, firefly: 1,
  },
];
export function samplePalette(tod, out) {
  const t = clamp(tod, 0, 2);
  const i = Math.min(1, Math.floor(t)), f = t - i;
  const a = PALETTES[i], b = PALETTES[i + 1];
  out = out || {};
  const lc = (k) => out[k] = a[k].clone().lerp(b[k], f);
  ['zenith','horizon','sunColor','hemiSky','hemiGnd','fog','deepWater','shallowTint'].forEach(lc);
  const ln = (k) => out[k] = lerp(a[k], b[k], f);
  ['sunI','sunElev','sunAzim','hemiI','fogD','cloud','moonI','starI','firefly'].forEach(ln);
  return out;
}

// ---------- 程序化贴图 ----------
export function makeCanvas(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
// 木纹
export function woodTexture() {
  return makeCanvas(256, 256, (g, w, h) => {
    g.fillStyle = '#8a6547'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 90; i++) {
      const y = Math.random() * h;
      g.strokeStyle = `rgba(${40 + Math.random() * 40 | 0},${25 + Math.random() * 25 | 0},${12 + Math.random() * 15 | 0},${0.12 + Math.random() * 0.25})`;
      g.lineWidth = 1 + Math.random() * 2.5;
      g.beginPath();
      g.moveTo(0, y);
      for (let x = 0; x <= w; x += 16) g.lineTo(x, y + Math.sin(x * 0.05 + i) * 3 + (Math.random() - 0.5) * 2);
      g.stroke();
    }
    for (let i = 0; i < 7; i++) {
      const x = Math.random() * w, y = Math.random() * h;
      g.fillStyle = 'rgba(45,28,15,.5)';
      g.beginPath(); g.ellipse(x, y, 4 + Math.random() * 5, 2.5 + Math.random() * 3, Math.random(), 0, 7); g.fill();
    }
  });
}
// 锦鲤花纹
export function koiTexture(seed) {
  const rnd = (() => { let s = seed * 7919 % 1; return () => (s = (s * 9301 + 0.211) % 1) * 2 - 1 + 1; })();
  const r = () => { const v = rnd(); return v > 1 ? v - 1 : v; };
  return makeCanvas(128, 64, (g, w, h) => {
    g.fillStyle = '#f2ede2'; g.fillRect(0, 0, w, h);
    const colors = ['#e2571e', '#d93b14', '#ef7d2a', '#c22910'];
    const n = 3 + Math.floor(r() * 3);
    for (let i = 0; i < n; i++) {
      g.fillStyle = colors[Math.floor(r() * colors.length)];
      const cx = r() * w, cy = r() * h, rad = 8 + r() * 18;
      g.beginPath();
      for (let a = 0; a < Math.PI * 2; a += 0.5) {
        const rr2 = rad * (0.7 + 0.5 * Math.sin(a * 3 + i));
        const px = cx + Math.cos(a) * rr2, py = cy + Math.sin(a) * rr2 * 0.6;
        a === 0 ? g.moveTo(px, py) : g.lineTo(px, py);
      }
      g.closePath(); g.fill();
    }
    // 背脊阴影
    const gr = g.createLinearGradient(0, 0, 0, h);
    gr.addColorStop(0, 'rgba(60,40,30,.25)'); gr.addColorStop(0.4, 'rgba(0,0,0,0)');
    gr.addColorStop(1, 'rgba(255,255,255,.28)');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
  });
}
// 柔光点（萤火虫/水滴）
export function glowTexture(inner = 'rgba(255,255,220,1)', outer = 'rgba(255,220,120,0)') {
  const t = makeCanvas(64, 64, (g) => {
    const gr = g.createRadialGradient(32, 32, 2, 32, 32, 30);
    gr.addColorStop(0, inner); gr.addColorStop(0.3, inner.replace(',1)', ',.6)'));
    gr.addColorStop(1, outer);
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  });
  return t;
}
// 水滴/水花点
export function dropletTexture() {
  return makeCanvas(32, 32, (g) => {
    const gr = g.createRadialGradient(16, 16, 1, 16, 16, 14);
    gr.addColorStop(0, 'rgba(255,255,255,.95)');
    gr.addColorStop(0.5, 'rgba(220,240,255,.5)');
    gr.addColorStop(1, 'rgba(200,230,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 32, 32);
  });
}
