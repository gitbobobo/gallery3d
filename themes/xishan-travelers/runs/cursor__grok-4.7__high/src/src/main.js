import "./style.css";

const PW = 800;
const PH = 1600;
const SW = 400;
const SH = 800;

const INK = [32, 22, 14];
const DEEP = [14, 9, 6];
const PALE = [232, 220, 196];

const PEAK = [
  [0.38, 0.038], [0.43, 0.012], [0.48, 0.026], [0.54, 0.006],
  [0.6, 0.02], [0.66, 0.004], [0.72, 0.018], [0.78, 0.008],
  [0.84, 0.022], [0.9, 0.01], [0.96, 0.026],
  [1, 0.06], [1, 0.26], [0.995, 0.4], [0.92, 0.47],
  [0.76, 0.5], [0.58, 0.508], [0.42, 0.49],
  [0.26, 0.45], [0.18, 0.3], [0.16, 0.16], [0.2, 0.08], [0.28, 0.045], [0.34, 0.036],
];

const LEFT_CLIFF = [
  [0, 0.4], [0.07, 0.355], [0.15, 0.372], [0.2, 0.43],
  [0.17, 0.53], [0.08, 0.575], [0, 0.55],
];

const FOREST = [
  [0.46, 0.75], [0.5, 0.665], [0.58, 0.632], [0.68, 0.624],
  [0.8, 0.64], [0.9, 0.655], [0.98, 0.69], [1, 0.76],
  [0.96, 0.825], [0.88, 0.84], [0.78, 0.805], [0.64, 0.8],
  [0.52, 0.775],
];

const LEFT_WOODS = [
  [0, 0.67], [0.1, 0.645], [0.22, 0.69], [0.26, 0.77],
  [0.14, 0.84], [0, 0.82],
];

const BOULDERS = [
  [[0, 0.87], [0.1, 0.835], [0.22, 0.855], [0.32, 0.9], [0.28, 1], [0, 1]],
  [[0.18, 0.93], [0.3, 0.86], [0.46, 0.848], [0.62, 0.855], [0.72, 0.9], [0.66, 1], [0.22, 1]],
  [[0.55, 0.92], [0.68, 0.862], [0.82, 0.875], [0.96, 0.845], [1, 0.87], [1, 1], [0.58, 1]],
];

const GATE = [
  [0, 0.735], [0.09, 0.7], [0.17, 0.745], [0.15, 0.86], [0.05, 0.885], [0, 0.86],
];

const PATH = [
  [0.99, 0.8], [0.88, 0.792], [0.74, 0.808], [0.6, 0.798],
  [0.46, 0.814], [0.32, 0.8], [0.2, 0.778], [0.1, 0.752], [0.02, 0.72],
];

const STREAM = [
  [0.2, 0.745], [0.32, 0.758], [0.46, 0.748], [0.6, 0.764], [0.74, 0.752], [0.84, 0.76],
];

const LOOP = 52;

const ACTS = [
  { name: "晨雾", start: 0, end: 9, lines: ["天刚亮，山脚雾气很浓。", "峰从雾里露出来，瀑布开始流动。"] },
  { name: "行旅", start: 9, end: 21, lines: ["一队商旅赶着四头驮骡，从右边林中出来。", "他们沿着溪边的小路往左走。"] },
  { name: "钟声", start: 21, end: 34, lines: ["林中寺院响起钟声，鸟从树梢飞起。", "走在最后的人停下来望山，又快步跟上。"] },
  { name: "入山", start: 34, end: 48, lines: ["驮队走进左边的山路，渐渐看不见了。", "雾气合上，叶间浮现出「范宽」两个字。"] },
];

const FOG_KEYS = [
  [0, 0.16, 0.42, 0.62, 0, 0],
  [3.2, 0, 0.24, 0.12, 0.8, 0],
  [8, 0, 0.18, 0.06, 1, 0],
  [36, 0, 0.18, 0.06, 1, 0],
  [41, 0, 0.28, 0.16, 0.8, 0.35],
  [45, 0, 0.32, 0.14, 0.62, 1],
  [48, 0, 0.3, 0.12, 0.5, 1],
  [52, 0.16, 0.42, 0.62, 0, 0],
];

function mulberry32(a) {
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash2(x, y) {
  let n = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

function noise2(x, y) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const aa = hash2(xi, yi);
  const ba = hash2(xi + 1, yi);
  const ab = hash2(xi, yi + 1);
  const bb = hash2(xi + 1, yi + 1);
  return aa * (1 - u) * (1 - v) + ba * u * (1 - v) + ab * (1 - u) * v + bb * u * v;
}

function fbm(x, y) {
  let f = 0;
  let amp = 0.5;
  for (let i = 0; i < 4; i++) {
    f += amp * noise2(x, y);
    x = x * 2.03 + 1.7;
    y = y * 2.03 + 0.9;
    amp *= 0.5;
  }
  return f;
}

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function smooth(t) {
  t = clamp(t, 0, 1);
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function sampleKeys(t, keys) {
  if (t <= keys[0][0]) return keys[0].slice(1);
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (t <= b[0]) {
      const u = smooth((t - a[0]) / (b[0] - a[0]));
      const out = [];
      for (let j = 1; j < a.length; j++) out.push(a[j] + (b[j] - a[j]) * u);
      return out;
    }
  }
  return keys[keys.length - 1].slice(1);
}

function pointInPoly(poly, x, y) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0];
    const yi = poly[i][1];
    const xj = poly[j][0];
    const yj = poly[j][1];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-9) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function fillPoly(mask, pts, id) {
  const pix = pts.map(([x, y]) => [x * (SW - 1), y * (SH - 1)]);
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of pix) {
    if (p[1] < minY) minY = p[1];
    if (p[1] > maxY) maxY = p[1];
  }
  const y0 = Math.max(0, Math.floor(minY));
  const y1 = Math.min(SH - 1, Math.ceil(maxY));
  for (let y = y0; y <= y1; y++) {
    const xs = [];
    for (let i = 0; i < pix.length; i++) {
      const [x1, y1] = pix[i];
      const [x2, y2] = pix[(i + 1) % pix.length];
      if ((y1 <= y && y2 > y) || (y2 <= y && y1 > y)) {
        const t = (y - y1) / (y2 - y1);
        xs.push(x1 + (x2 - x1) * t);
      }
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      let xa = Math.max(0, Math.ceil(xs[k]));
      let xb = Math.min(SW - 1, Math.floor(xs[k + 1]));
      const row = y * SW;
      for (let x = xa; x <= xb; x++) mask[row + x] = id;
    }
  }
}

function blurShade(src, w, h) {
  const tmp = new Float32Array(src.length);
  const rad = 1;
  for (let y = 0; y < h; y++) {
    const row = y * w;
    for (let x = 0; x < w; x++) {
      let s = 0;
      let n = 0;
      for (let k = -rad; k <= rad; k++) {
        const xx = x + k;
        if (xx < 0 || xx >= w) continue;
        s += src[row + xx];
        n++;
      }
      tmp[row + x] = s / n;
    }
  }
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let s = 0;
      let n = 0;
      for (let k = -rad; k <= rad; k++) {
        const yy = y + k;
        if (yy < 0 || yy >= h) continue;
        s += tmp[yy * w + x];
        n++;
      }
      src[y * w + x] = s / n;
    }
  }
}

function mix(data, i, col, k) {
  if (k <= 0) return;
  if (k > 1) k = 1;
  data[i] += (col[0] - data[i]) * k;
  data[i + 1] += (col[1] - data[i + 1]) * k;
  data[i + 2] += (col[2] - data[i + 2]) * k;
}

function plot(data, x, y, col, a) {
  x |= 0;
  y |= 0;
  if (x < 0 || y < 0 || x >= PW || y >= PH || a <= 0) return;
  mix(data, (y * PW + x) * 4, col, a);
}

function disc(data, x, y, r, col, a) {
  if (a <= 0.02 || r <= 0) return;
  if (r < 1.05) {
    plot(data, x, y, col, a);
    return;
  }
  const r2 = r * r;
  const x0 = Math.max(0, (x - r) | 0);
  const x1 = Math.min(PW - 1, (x + r + 1) | 0);
  const y0 = Math.max(0, (y - r) | 0);
  const y1 = Math.min(PH - 1, (y + r + 1) | 0);
  for (let yy = y0; yy <= y1; yy++) {
    const dy = yy + 0.5 - y;
    for (let xx = x0; xx <= x1; xx++) {
      const dx = xx + 0.5 - x;
      const e = dx * dx + dy * dy;
      if (e > r2) continue;
      mix(data, (yy * PW + xx) * 4, col, a * (1 - (e / r2) * 0.45));
    }
  }
}

function dab(data, x, y, len, ang, col, a) {
  const steps = Math.max(1, len | 0);
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  let px = x - c * len * 0.5;
  let py = y - s * len * 0.5;
  const dx = (c * len) / steps;
  const dy = (s * len) / steps;
  for (let i = 0; i <= steps; i++) {
    if (hash2(i + (x | 0), (y | 0) + 3) > 0.12) {
      plot(data, px, py, col, a);
      plot(data, px + 1, py, col, a * 0.72);
    }
    px += dx;
    py += dy;
  }
}

function distToPoly(px, py, pts) {
  let best = 1e9;
  for (let i = 0; i < pts.length - 1; i++) {
    const ax = pts[i][0];
    const ay = pts[i][1];
    const bx = pts[i + 1][0];
    const by = pts[i + 1][1];
    const dx = bx - ax;
    const dy = by - ay;
    const l2 = dx * dx + dy * dy || 1e-6;
    let t = ((px - ax) * dx + (py - ay) * dy) / l2;
    t = clamp(t, 0, 1);
    const x = ax + dx * t;
    const y = ay + dy * t;
    const d = Math.hypot(px - x, py - y);
    if (d < best) best = d;
  }
  return best;
}

function fallNx(ny) {
  return 0.828 + (ny - 0.1) * 0.1 + Math.sin(ny * 46) * 0.004;
}

function shadePeak(nx, ny) {
  let s = 0.34 + fbm(nx * 1.7, ny * 0.7) * 0.26 + fbm(nx * 5.5, ny * 1.4) * 0.12;
  const seams = [0.27, 0.41, 0.55, 0.68, 0.8];
  for (let i = 0; i < seams.length; i++) {
    const cx = seams[i] + Math.sin(ny * (3.1 + i * 0.7) + i) * 0.028;
    const width = 0.006 + (i % 2) * 0.004;
    const d = Math.abs(nx - cx);
    if (d > width * 2) continue;
    const gap = hash2((ny * 9 + i * 3) | 0, 20 + i);
    if (gap < 0.62) continue;
    const g = 1 - d / (width * 2);
    s += g * 0.2;
  }
  if (nx > 0.36 && nx < 0.98) {
    const cap = skyY(nx);
    const u = 1 - (ny - cap) / 0.065;
    if (u > 0 && ny > cap - 0.01) s += Math.min(1, u) * 0.42;
  }
  const fx = fallNx(ny);
  const dd = Math.abs(nx - fx);
  if (ny > 0.07 && ny < 0.47 && dd < 0.032) {
    s = Math.max(s, 0.72 + (1 - dd / 0.032) * 0.24);
  }
  if (ny > 0.45) s *= 1 - smooth((ny - 0.45) / 0.055);
  s += (nx - 0.45) * 0.06;
  return clamp(s, 0, 0.97);
}

function shadeLeft(nx, ny) {
  let s = 0.26 + fbm(nx * 5, ny * 2.2) * 0.22 + Math.max(0, Math.sin(nx * 40)) * 0.1;
  if (ny > 0.5) s *= 1 - smooth((ny - 0.5) / 0.08);
  return clamp(s, 0, 0.72);
}

function shadeForest(nx, ny) {
  let s = 0.62 + fbm(nx * 4.2, ny * 3.1) * 0.2;
  if (nx < 0.58) s = 0.5 + fbm(nx * 5, ny * 3) * 0.22;
  if (nx > 0.72 && nx < 0.96 && ny > 0.635 && ny < 0.72) s *= 0.55;
  return clamp(s, 0.28, 0.9);
}

function shadeWoods(nx, ny) {
  return clamp(0.4 + fbm(nx * 6, ny * 4) * 0.25, 0.2, 0.8);
}

function shadeRock(nx, ny) {
  let s = 0.66 + fbm(nx * 3.2, ny * 3.6) * 0.2;
  s += Math.max(0, fbm(nx * 9, ny * 2) - 0.55) * 0.35;
  return clamp(s, 0.4, 0.94);
}

function buildPainting() {
  const t0 = performance.now();
  const canvas = document.createElement("canvas");
  canvas.width = PW;
  canvas.height = PH;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const image = ctx.createImageData(PW, PH);
  const data = image.data;

  const lowW = 80;
  const lowH = 160;
  const low = new Float32Array(lowW * lowH);
  for (let y = 0; y < lowH; y++) {
    for (let x = 0; x < lowW; x++) {
      low[y * lowW + x] = fbm(x * 0.18, y * 0.15) * 2 - 0.7;
    }
  }
  const sampleLow = (nx, ny) => {
    const x = nx * (lowW - 1);
    const y = ny * (lowH - 1);
    const x0 = x | 0;
    const y0 = y | 0;
    const x1 = Math.min(lowW - 1, x0 + 1);
    const y1 = Math.min(lowH - 1, y0 + 1);
    const tx = x - x0;
    const ty = y - y0;
    const i = (yy, xx) => low[yy * lowW + xx];
    return i(y0, x0) * (1 - tx) * (1 - ty) + i(y0, x1) * tx * (1 - ty) + i(y1, x0) * (1 - tx) * ty + i(y1, x1) * tx * ty;
  };

  for (let y = 0; y < PH; y++) {
    const ny = y / (PH - 1);
    for (let x = 0; x < PW; x++) {
      const nx = x / (PW - 1);
      const n = sampleLow(nx, ny);
      const grain = hash2(x, y) - 0.5;
      const weave = x % 3 === 0 ? -0.045 : 0;
      const age = (1 - Math.min(1, Math.min(nx, 1 - nx) * 14, Math.min(ny, 1 - ny) * 18)) * 0.22;
      const lift = (1 - nx) * 0.08 + (1 - ny) * 0.03;
      let v = n * 0.22 + grain * 0.05 + weave - age + lift;
      const i = (y * PW + x) * 4;
      data[i] = 166 + v * 48;
      data[i + 1] = 128 + v * 36;
      data[i + 2] = 78 + v * 22;
      data[i + 3] = 255;
    }
  }

  const rngStain = mulberry32(11);
  for (let s = 0; s < 18; s++) {
    disc(
      data,
      rngStain() * PW,
      rngStain() * PH,
      18 + rngStain() * 50,
      [120, 86, 48],
      0.05 + rngStain() * 0.07
    );
  }

  const mask = new Uint8Array(SW * SH);
  fillPoly(mask, PEAK, 1);
  fillPoly(mask, LEFT_CLIFF, 2);
  fillPoly(mask, FOREST, 3);
  fillPoly(mask, LEFT_WOODS, 4);
  for (const b of BOULDERS) fillPoly(mask, b, 5);
  fillPoly(mask, GATE, 5);

  const raw = new Float32Array(SW * SH);
  for (let y = 0; y < SH; y++) {
    const ny = y / (SH - 1);
    for (let x = 0; x < SW; x++) {
      const id = mask[y * SW + x];
      if (!id) continue;
      const nx = x / (SW - 1);
      let s = 0;
      if (id === 1) s = shadePeak(nx, ny);
      else if (id === 2) s = shadeLeft(nx, ny);
      else if (id === 3) s = shadeForest(nx, ny);
      else if (id === 4) s = shadeWoods(nx, ny);
      else s = shadeRock(nx, ny);
      raw[y * SW + x] = s;
    }
  }
  const soft = new Float32Array(raw);
  blurShade(soft, SW, SH);

  for (let y = 0; y < SH; y++) {
    const ny = y / (SH - 1);
    for (let x = 0; x < SW; x++) {
      const i = y * SW + x;
      if (ny > 0.51 && ny < 0.6 && mask[i] === 0) soft[i] *= 0.2;
      const nx = x / (SW - 1);
      if (ny > 0.72 && ny < 0.86 && nx > 0.16 && nx < 0.86) {
        const dp = distToPoly(nx, ny, PATH);
        if (dp < 0.02) {
          const k = 1 - dp / 0.02;
          soft[i] *= 1 - k * 0.78;
          raw[i] *= 1 - k * 0.85;
        }
        const ds = distToPoly(nx, ny, STREAM);
        if (ds < 0.016) {
          const k = 1 - ds / 0.016;
          soft[i] *= 1 - k * 0.55;
        }
      }
      const sig = Math.hypot((nx - 0.812) / 0.04, (ny - 0.892) / 0.038);
      if (sig < 1) {
        const k = 1 - sig;
        soft[i] *= 1 - k * 0.72;
        raw[i] *= 1 - k * 0.8;
      }
    }
  }

  for (let y = 0; y < PH; y++) {
    const ny = y / (PH - 1);
    const sy = ny * (SH - 1);
    const y0 = sy | 0;
    const y1 = Math.min(SH - 1, y0 + 1);
    const ty = sy - y0;
    for (let x = 0; x < PW; x++) {
      const nx = x / (PW - 1);
      const sx = nx * (SW - 1);
      const x0 = sx | 0;
      const x1 = Math.min(SW - 1, x0 + 1);
      const tx = sx - x0;
      const s =
        soft[y0 * SW + x0] * (1 - tx) * (1 - ty) +
        soft[y0 * SW + x1] * tx * (1 - ty) +
        soft[y1 * SW + x0] * (1 - tx) * ty +
        soft[y1 * SW + x1] * tx * ty;
      if (s < 0.012) continue;
      const k = Math.min(0.93, Math.pow(s, 0.92) * 0.95);
      mix(data, (y * PW + x) * 4, INK, k);
    }
  }

  const sampleRaw = (nx, ny) => {
    const x = clamp(nx, 0, 1) * (SW - 1);
    const y = clamp(ny, 0, 1) * (SH - 1);
    const x0 = x | 0;
    const y0 = y | 0;
    return raw[Math.min(SH - 1, y0) * SW + Math.min(SW - 1, x0)];
  };
  const sampleMask = (nx, ny) => {
    const x = clamp((nx * (SW - 1)) | 0, 0, SW - 1);
    const y = clamp((ny * (SH - 1)) | 0, 0, SH - 1);
    return mask[y * SW + x];
  };

  sprinkle(data, 1, 0.12, 0.0, 1, 0.52, 78000, sampleMask, sampleRaw);
  sprinkle(data, 5, 0.0, 0.8, 1, 1, 32000, sampleMask, sampleRaw);
  sprinkle(data, 2, 0, 0.34, 0.24, 0.58, 9000, sampleMask, sampleRaw);
  sprinkle(data, 3, 0.4, 0.62, 0.62, 0.82, 8000, sampleMask, sampleRaw);

  summitTrees(data);
  edgeMoss(data, PEAK);
  edgeMoss(data, LEFT_CLIFF);
  fillCanopy(data, FOREST, 21, 0.5);
  fillCanopy(data, LEFT_WOODS, 33, 0);

  const back = scatter(FOREST, 5, 21, "leaf", [0.05, 0.08]);
  const woods = scatter(LEFT_WOODS, 3, 33, "leaf", [0.045, 0.07]);
  const pines = [];
  for (let i = 0; i < 12; i++) {
    pines.push({
      x: 0.5 + i * 0.038,
      y: 0.652 + Math.sin(i * 1.7) * 0.008,
      h: 0.048 + (i % 3) * 0.008,
      seed: 800 + i,
      kind: "pine",
    });
  }
  for (const spec of pines) drawTree(data, spec);
  for (const spec of back) drawTree(data, spec);
  for (const spec of woods) drawTree(data, spec);
  drawTemple(data, 0.8 * PW, 0.678 * PH, 132);
  drawTemple(data, 0.92 * PW, 0.662 * PH, 72);

  const front = [
    { x: 0.5, y: 0.76, h: 0.1, seed: 3, kind: "leaf", bare: 0.2 },
    { x: 0.61, y: 0.768, h: 0.11, seed: 8, kind: "leaf", bare: 0.08 },
    { x: 0.71, y: 0.758, h: 0.095, seed: 13, kind: "leaf", bare: 0.28 },
    { x: 0.95, y: 0.79, h: 0.08, seed: 19, kind: "leaf", bare: 0.15 },
    { x: 0.08, y: 0.77, h: 0.08, seed: 23, kind: "leaf", bare: 0.25 },
  ];
  for (const spec of front) drawTree(data, spec);

  paintStaticFall(data);
  paintCascade(data);
  paintRipples(data);
  paintShrubs(data);
  rockContours(data);

  ctx.putImageData(image, 0, 0);
  const overlay = buildOverlay(canvas);
  return { canvas, overlay, ms: performance.now() - t0 };
}

function sprinkle(data, id, x0, y0, x1, y1, count, sampleMask, sampleRaw) {
  const rng = mulberry32(400 + id * 17);
  for (let n = 0; n < count; n++) {
    const nx = x0 + rng() * (x1 - x0);
    const ny = y0 + rng() * (y1 - y0);
    if (sampleMask(nx, ny) !== id) continue;
    const tone = sampleRaw(nx, ny);
    if (tone < 0.1) continue;
    const cluster = fbm(nx * 13, ny * 9);
    if (cluster < 0.36) continue;
    if (rng() > 0.5 + tone * 0.42) continue;
    const x = nx * PW;
    const y = ny * PH;
    const len = 2.2 + tone * 3.2 + rng() * 2.2;
    const ang = Math.PI / 2 + (rng() - 0.5) * (id === 5 ? 0.9 : 0.42);
    const a = 0.32 + tone * 0.55;
    const col = tone > 0.72 ? DEEP : INK;
    dab(data, x, y, len, ang, col, a);
    if (tone > 0.6 && rng() < 0.08) disc(data, x, y, 2.1 + rng(), DEEP, 0.65);
  }
}

function summitTrees(data) {
  const rng = mulberry32(70);
  for (let i = 0; i < 30; i++) {
    const nx = 0.39 + rng() * 0.56;
    const ny = skyY(nx) - 0.012 + rng() * 0.02;
    const rx = 14 + rng() * 26;
    const ry = 9 + rng() * 14;
    const n = 22 + ((rng() * 24) | 0);
    for (let k = 0; k < n; k++) {
      const a = rng() * 6.28;
      const d = Math.pow(rng(), 0.65);
      disc(
        data,
        nx * PW + Math.cos(a) * rx * d,
        ny * PH + Math.sin(a) * ry * d,
        1.6 + rng() * 2.4,
        DEEP,
        0.55 + rng() * 0.45
      );
    }
  }
}

function skyY(nx) {
  const top = PEAK.slice(0, 11);
  if (nx <= top[0][0]) return top[0][1];
  for (let i = 0; i < top.length - 1; i++) {
    if (nx >= top[i][0] && nx <= top[i + 1][0]) {
      const t = (nx - top[i][0]) / (top[i + 1][0] - top[i][0]);
      return top[i][1] + (top[i + 1][1] - top[i][1]) * t;
    }
  }
  return top[top.length - 1][1];
}

function edgeMoss(data, poly) {
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    if ((a[1] + b[1]) * 0.5 > 0.46) continue;
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) * PW;
    const steps = Math.max(1, len / 5);
    for (let s = 0; s < steps; s++) {
      if (hash2(s, i + 9) < 0.35) continue;
      const t = s / steps;
      const x = (a[0] + (b[0] - a[0]) * t) * PW;
      const y = (a[1] + (b[1] - a[1]) * t) * PH;
      disc(data, x, y, 1.1 + hash2(i, s) * 1.7, DEEP, 0.55 + hash2(s, i) * 0.4);
    }
  }
}

function fillCanopy(data, poly, seed, xMin) {
  const rng = mulberry32(seed + 90);
  let guard = 0;
  let n = 0;
  while (n < 6800 && guard < 28000) {
    guard++;
    const x = rng();
    const y = rng();
    if (x < xMin || !pointInPoly(poly, x, y)) continue;
    if (x > 0.72 && x < 0.96 && y > 0.63 && y < 0.715) continue;
    disc(data, x * PW, y * PH, 1.8 + rng() * 2.6, DEEP, 0.34 + rng() * 0.5);
    n++;
  }
}

function scatter(poly, n, seed, kind, hRange) {
  const rng = mulberry32(seed);
  const out = [];
  let guard = 0;
  while (out.length < n && guard < n * 50) {
    guard++;
    const x = rng();
    const y = rng();
    if (!pointInPoly(poly, x, y)) continue;
    out.push({
      x,
      y,
      h: hRange[0] + rng() * (hRange[1] - hRange[0]),
      seed: (rng() * 1e9) | 0,
      kind,
      bare: rng() * 0.35,
    });
  }
  return out;
}

function drawTree(data, spec) {
  const rng = mulberry32(spec.seed || 1);
  const x = spec.x * PW;
  const y = spec.y * PH;
  const h = spec.h * PH;
  if (spec.kind === "pine") {
    drawPine(data, x, y, h, rng);
    return;
  }
  const pts = [{ x, y, w: Math.max(2.2, h * 0.048) }];
  let cx = x;
  let cy = y;
  const segs = 5;
  for (let i = 1; i <= segs; i++) {
    cx += (rng() - 0.48) * h * 0.14;
    cy -= (h / segs) * (0.8 + rng() * 0.35);
    pts.push({ x: cx, y: cy, w: Math.max(0.55, h * 0.05 * (1 - i / segs)) });
  }
  ribbon(data, pts, DEEP, 0.9);
  for (let i = 2; i < pts.length; i++) {
    const forks = i > 3 ? 3 : 2;
    for (let b = 0; b < forks; b++) {
      const dir = rng() < 0.5 ? -1 : 1;
      drawBranch(data, pts[i].x, pts[i].y, dir, h * (0.16 + rng() * 0.2), rng, spec.bare || 0);
    }
  }
}

function drawBranch(data, x, y, dir, len, rng, bare) {
  let ang = -Math.PI / 2 + dir * (0.45 + rng() * 0.7);
  let cx = x;
  let cy = y;
  const pts = [{ x, y, w: 1.35 }];
  for (let i = 0; i < 3; i++) {
    ang += (rng() - 0.42) * 0.7;
    const L = len * (0.5 - i * 0.08);
    cx += Math.cos(ang) * L;
    cy += Math.sin(ang) * L;
    pts.push({ x: cx, y: cy, w: Math.max(0.35, 1.2 - i * 0.35) });
  }
  ribbon(data, pts, DEEP, 0.82);
  if (rng() > bare) foliage(data, cx, cy, len * 0.55, rng);
  if (rng() > bare + 0.2) foliage(data, lerp(x, cx, 0.55), lerp(y, cy, 0.55), len * 0.32, rng);
}

function foliage(data, x, y, r, rng) {
  const count = 26 + ((rng() * 24) | 0);
  for (let i = 0; i < count; i++) {
    const a = rng() * 6.28;
    const d = Math.sqrt(rng()) * r;
    disc(data, x + Math.cos(a) * d * 1.15, y + Math.sin(a) * d * 0.8, 0.9 + rng() * 1.5, DEEP, 0.32 + rng() * 0.55);
  }
}

function drawPine(data, x, y, h, rng) {
  ribbon(data, [
    { x, y, w: 1.5 },
    { x: x + (rng() - 0.5) * 3, y: y - h * 0.92, w: 0.5 },
  ], DEEP, 0.85);
  const tiers = 7;
  for (let t = 0; t < tiers; t++) {
    const ty = y - h * (0.22 + t * 0.1);
    const spread = h * (0.28 - t * 0.025);
    const n = 9;
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (i - (n - 1) / 2) * 0.22;
      const x2 = x + Math.cos(a) * spread;
      const y2 = ty + Math.sin(a) * spread * 0.55 + 2;
      dab(data, (x + x2) / 2, (ty + y2) / 2, Math.hypot(x2 - x, y2 - ty), Math.atan2(y2 - ty, x2 - x), DEEP, 0.55);
    }
  }
}

function ribbon(data, pts, col, alpha) {
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    const steps = Math.max(1, len | 0);
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const x = a.x + (b.x - a.x) * t;
      const y = a.y + (b.y - a.y) * t;
      const w = a.w + (b.w - a.w) * t;
      if (hash2((s + i * 13) | 0, (x * 3) | 0) < 0.14) continue;
      disc(data, x, y, Math.max(0.55, w * 0.55), col, alpha * (0.65 + 0.35 * hash2(s, i + 4)));
    }
  }
}

function roofBand(data, cx, cy, halfW, rise, thick) {
  const steps = Math.max(16, (halfW * 2) | 0);
  for (let i = 0; i <= steps; i++) {
    const u = (i / steps) * 2 - 1;
    const x = cx + u * halfW;
    const y = cy - rise * u * u;
    disc(data, x, y, thick, DEEP, 0.92);
    disc(data, x, y + thick * 1.15, Math.max(0.8, thick * 0.45), [214, 196, 156], 0.7);
  }
}

function drawTemple(data, x, y, s) {
  disc(data, x, y, s * 0.08, DEEP, 0.3);
  dab(data, x, y + 1, s * 0.7, 0, DEEP, 0.7);
  const cols = [-0.28, -0.1, 0.1, 0.28];
  for (const c of cols) {
    ribbon(data, [
      { x: x + c * s, y: y, w: 1.3 },
      { x: x + c * s, y: y - s * 0.22, w: 1.1 },
    ], DEEP, 0.85);
  }
  roofBand(data, x, y - s * 0.26, s * 0.52, s * 0.08, 3.4);
  roofBand(data, x, y - s * 0.48, s * 0.36, s * 0.06, 2.8);
  disc(data, x, y - s * 0.12, 2.2, DEEP, 0.9);
  dab(data, x, y - s * 0.12, s * 0.08, Math.PI / 2, DEEP, 0.8);
}

function paintStaticFall(data) {
  for (let i = 0; i < 28; i++) {
    const ny = 0.11 + i * 0.012;
    const x = fallNx(ny) * PW;
    const y = ny * PH;
    dab(data, x, y, 11 + (i % 4) * 3, Math.PI / 2 + (hash2(i, 2) - 0.5) * 0.08, PALE, 0.35 + (i % 3) * 0.12);
    if (i % 3 === 0) dab(data, x + 1.4, y + 5, 6, Math.PI / 2, [246, 238, 220], 0.4);
  }
  disc(data, fallNx(0.45) * PW, 0.452 * PH, 6, PALE, 0.12);
}

function paintCascade(data) {
  for (let i = 0; i < 5; i++) {
    const x = (0.24 + (i % 3) * 0.018) * PW + (hash2(i, 4) - 0.5) * 6;
    const y = 0.7 * PH;
    const len = 28 + (i % 3) * 16;
    dab(data, x, y, len, Math.PI / 2 + (hash2(i, 8) - 0.5) * 0.15, PALE, 0.34 + (i % 2) * 0.15);
  }
}

function paintRipples(data) {
  for (let i = 0; i < STREAM.length - 1; i++) {
    const ax = STREAM[i][0] * PW;
    const ay = STREAM[i][1] * PH;
    const bx = STREAM[i + 1][0] * PW;
    const by = STREAM[i + 1][1] * PH;
    for (let k = 0; k < 4; k++) {
      const t = (k + 0.5) / 4;
      const x = ax + (bx - ax) * t;
      const y = ay + (by - ay) * t;
      dab(data, x, y, 16, 0.1 * (k % 2 === 0 ? 1 : -1), INK, 0.28);
    }
  }
}

function paintShrubs(data) {
  const rng = mulberry32(55);
  for (let i = 0; i < 46; i++) {
    const x = (0.7 + rng() * 0.26) * PW;
    const y = (0.86 + rng() * 0.12) * PH;
    foliage(data, x, y, 8 + rng() * 14, rng);
    if (rng() < 0.5) {
      ribbon(data, [
        { x, y: y + 6, w: 0.8 },
        { x: x + (rng() - 0.5) * 8, y: y - 8, w: 0.4 },
      ], DEEP, 0.7);
    }
  }
}

function rockContours(data) {
  const lines = [
    [[0.02, 0.86], [0.12, 0.84], [0.24, 0.86], [0.3, 0.9]],
    [[0.26, 0.875], [0.4, 0.85], [0.55, 0.858], [0.68, 0.89]],
    [[0.62, 0.9], [0.76, 0.868], [0.9, 0.88], [0.98, 0.85]],
    [[0.02, 0.74], [0.08, 0.71], [0.15, 0.75]],
  ];
  for (const line of lines) {
    for (let i = 0; i < line.length - 1; i++) {
      const a = line[i];
      const b = line[i + 1];
      const x0 = a[0] * PW;
      const y0 = a[1] * PH;
      const x1 = b[0] * PW;
      const y1 = b[1] * PH;
      const len = Math.hypot(x1 - x0, y1 - y0);
      dab(data, (x0 + x1) / 2, (y0 + y1) / 2, len, Math.atan2(y1 - y0, x1 - x0), DEEP, 0.55);
    }
  }
}

function buildOverlay(source) {
  const sctx = source.getContext("2d", { willReadFrequently: true });
  const src = sctx.getImageData(0, 0, PW, PH);
  const dst = new ImageData(PW, PH);
  const s = src.data;
  const d = dst.data;
  for (let y = 0; y < PH; y++) {
    for (let x = 0; x < PW; x++) {
      const a = occlude(x, y);
      if (a <= 0) continue;
      const i = (y * PW + x) * 4;
      d[i] = s[i];
      d[i + 1] = s[i + 1];
      d[i + 2] = s[i + 2];
      d[i + 3] = a * 255;
    }
  }
  const c = document.createElement("canvas");
  c.width = PW;
  c.height = PH;
  c.getContext("2d").putImageData(dst, 0, 0);
  return c;
}

function occlude(x, y) {
  const nx = x / PW;
  const ny = y / PH;
  let a = 0;
  if (nx > 0.855 && ny > 0.62 && ny < 0.845) {
    a = Math.max(a, smooth((nx - 0.855) / 0.03));
  }
  if (nx < 0.175 && ny > 0.7 && ny < 0.9) {
    a = Math.max(a, smooth((0.175 - nx) / 0.03));
  }
  return a;
}

function buildMist() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext("2d");
  const rng = mulberry32(404);
  for (let i = 0; i < 36; i++) {
    const x = rng() * 512;
    const y = 40 + rng() * 180;
    const rx = 70 + rng() * 160;
    const ry = 16 + rng() * 42;
    const g = ctx.createRadialGradient(x, y, rx * 0.1, x, y, rx);
    const a = 0.08 + rng() * 0.16;
    g.addColorStop(0, `rgba(214, 186, 136, ${a})`);
    g.addColorStop(1, "rgba(214, 186, 136, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  return c;
}

function buildMount() {
  const c = document.createElement("canvas");
  c.width = 160;
  c.height = 160;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#3c2e25";
  ctx.fillRect(0, 0, 160, 160);
  const img = ctx.getImageData(0, 0, 160, 160);
  const rng = mulberry32(8);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (rng() - 0.5) * 16;
    img.data[i] += n;
    img.data[i + 1] += n * 0.75;
    img.data[i + 2] += n * 0.4;
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

const MEMBERS = [
  { kind: "person", role: "lead", back: 0 },
  { kind: "mule", back: 50, scale: 1, pack: 0 },
  { kind: "mule", back: 96, scale: 0.94, pack: 1 },
  { kind: "mule", back: 142, scale: 1.04, pack: 0 },
  { kind: "mule", back: 188, scale: 0.96, pack: 1 },
  { kind: "person", role: "last", back: 236 },
];

function buildPath() {
  const pts = [];
  for (let i = 0; i < PATH.length - 1; i++) {
    const a = { x: PATH[i][0] * PW, y: PATH[i][1] * PH };
    const b = { x: PATH[i + 1][0] * PW, y: PATH[i + 1][1] * PH };
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    const n = Math.max(1, Math.ceil(len / 8));
    for (let k = 0; k < n; k++) {
      const t = k / n;
      pts.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
  }
  const last = PATH[PATH.length - 1];
  pts.push({ x: last[0] * PW, y: last[1] * PH });
  const dist = [0];
  for (let i = 1; i < pts.length; i++) {
    dist.push(dist[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  }
  return { pts, dist, total: dist[dist.length - 1] };
}

function pointAlong(path, distance) {
  if (distance <= 0) return null;
  if (distance >= path.total) return null;
  let lo = 0;
  let hi = path.dist.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (path.dist[mid] <= distance) lo = mid;
    else hi = mid;
  }
  const span = path.dist[hi] - path.dist[lo] || 1;
  const t = (distance - path.dist[lo]) / span;
  const a = path.pts[lo];
  const b = path.pts[hi];
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    ang: Math.atan2(b.y - a.y, b.x - a.x),
  };
}

function leadDistance(t, total) {
  const keys = [
    [8.4, -0.02],
    [12, 0.2],
    [20, 0.5],
    [27, 0.6],
    [34, 0.74],
    [42, 1.06],
  ];
  let p = 0;
  if (t <= keys[0][0]) p = keys[0][1];
  else if (t >= keys[keys.length - 1][0]) p = keys[keys.length - 1][1];
  else {
    for (let i = 0; i < keys.length - 1; i++) {
      if (t <= keys[i + 1][0]) {
        const u = smooth((t - keys[i][0]) / (keys[i + 1][0] - keys[i][0]));
        p = keys[i][1] + (keys[i + 1][1] - keys[i][1]) * u;
        break;
      }
    }
  }
  return p * total;
}

function lastLag(t) {
  if (t < 22.2 || t > 31) return 0;
  if (t < 23.6) return smooth((t - 22.2) / 1.4) * 70;
  if (t < 26.8) return 70;
  return 70 * (1 - smooth((t - 26.8) / 3.2));
}

function lookAmount(t) {
  if (t < 23 || t > 28) return 0;
  if (t < 23.8) return smooth((t - 23) / 0.8);
  if (t < 26.4) return 1;
  return 1 - smooth((t - 26.4) / 1.4);
}

function drawMule(ctx, x, y, ang, phase, scale, pack) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(ang - Math.PI);
  ctx.scale(scale, scale);
  const bob = Math.sin(phase * 2) * 1.1;
  ctx.translate(0, bob);
  ctx.fillStyle = "rgba(22, 14, 8, 0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 3, 16, 3.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#140e0a";
  ctx.strokeStyle = "#140e0a";
  ctx.lineWidth = 3.4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.ellipse(-4, -18, 18, 9, -0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-18, -20);
  ctx.quadraticCurveTo(-28, -26, -34, -30);
  ctx.quadraticCurveTo(-38, -27, -34, -22);
  ctx.quadraticCurveTo(-28, -16, -16, -15);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-33, -30);
  ctx.lineTo(-36, -38);
  ctx.lineTo(-30, -29);
  ctx.fill();
  ctx.fillStyle = pack ? "#5a4030" : "#6a4c34";
  ctx.fillRect(-14, -30, 9, 8);
  ctx.fillRect(-3, -29, 9, 7);
  ctx.strokeStyle = "#140e0a";
  const legs = [-16, -7, 2, 11];
  for (let i = 0; i < legs.length; i++) {
    const a = Math.sin(phase + i * 1.3) * 0.55;
    ctx.beginPath();
    ctx.moveTo(legs[i], -12);
    ctx.lineTo(legs[i] + Math.sin(a) * 7, 0);
    ctx.lineTo(legs[i] + Math.sin(a) * 3, 7);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(12, -20);
  ctx.quadraticCurveTo(20, -16, 16, -8);
  ctx.stroke();
  ctx.restore();
}

function drawPerson(ctx, x, y, ang, phase, look) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(ang - Math.PI);
  const walking = look < 0.65;
  const bob = walking ? Math.sin(phase * 2) * 0.8 : 0;
  ctx.translate(0, bob);
  ctx.rotate(-look * 0.22);
  ctx.fillStyle = "rgba(20, 12, 8, 0.25)";
  ctx.beginPath();
  ctx.ellipse(0, 2, 8, 2.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#120e0a";
  ctx.strokeStyle = "#120e0a";
  ctx.lineWidth = 3.6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-6, -40);
  ctx.lineTo(6, -40);
  ctx.lineTo(8, -12);
  ctx.quadraticCurveTo(0, -8, -8, -12);
  ctx.closePath();
  ctx.fill();
  const hx = look * 4;
  const hy = -48 - look * 5;
  ctx.beginPath();
  ctx.arc(hx, hy, 5.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(hx - 5.5, hy - 6.5, 11, 3);
  if (walking) {
    for (let i = 0; i < 2; i++) {
      const a = Math.sin(phase + i * Math.PI) * 0.55;
      ctx.beginPath();
      ctx.moveTo(-3 + i * 6, -12);
      ctx.lineTo(-3 + i * 6 + Math.sin(a) * 6, 4);
      ctx.stroke();
    }
  } else {
    ctx.beginPath();
    ctx.moveTo(-2, -12);
    ctx.lineTo(-2, 4);
    ctx.moveTo(3, -12);
    ctx.lineTo(3, 4);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRope(ctx, a, b) {
  if (!a || !b) return;
  ctx.save();
  ctx.strokeStyle = "rgba(20, 14, 8, 0.75)";
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y - 20);
  ctx.quadraticCurveTo((a.x + b.x) / 2, (a.y + b.y) / 2 - 10, b.x + 10, b.y - 24);
  ctx.stroke();
  ctx.restore();
}

const BIRDS = Array.from({ length: 11 }, (_, i) => {
  const rng = mulberry32(1200 + i * 9);
  return {
    x: (0.5 + rng() * 0.36) * PW,
    y: (0.6 + rng() * 0.05) * PH,
    vx: (rng() - 0.35) * 46,
    vy: -(26 + rng() * 40),
    delay: rng() * 1.4,
    size: 7 + rng() * 5,
    phase: rng() * 6,
  };
});

function drawBirds(ctx, t) {
  const start = 21.15;
  ctx.save();
  ctx.strokeStyle = "#16100c";
  ctx.lineWidth = 2.2;
  ctx.lineCap = "round";
  for (const b of BIRDS) {
    const u = t - start - b.delay;
    if (u < 0 || u > 7.5) continue;
    const x = b.x + b.vx * u;
    const y = b.y + b.vy * u + Math.sin(u * 3 + b.phase) * 6;
    const fade = u < 0.4 ? u / 0.4 : u > 5 ? 1 - (u - 5) / 2.5 : 1;
    if (fade <= 0) continue;
    ctx.globalAlpha = fade;
    const flap = 0.35 + Math.abs(Math.sin(u * 14 + b.phase)) * 0.9;
    ctx.beginPath();
    ctx.moveTo(x - b.size, y + b.size * 0.15);
    ctx.quadraticCurveTo(x - b.size * 0.45, y - b.size * flap, x, y);
    ctx.quadraticCurveTo(x + b.size * 0.45, y - b.size * flap, x + b.size, y + b.size * 0.15);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBells(ctx, t) {
  const times = [21.1, 24.1, 27.4];
  const cx = 0.8 * PW;
  const cy = 0.66 * PH;
  ctx.save();
  ctx.lineWidth = 1.4;
  for (const bt of times) {
    const u = t - bt;
    if (u < 0 || u > 1.5) continue;
    ctx.beginPath();
    ctx.arc(cx, cy, 10 + u * 52, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(232, 220, 196, ${(1 - u / 1.5) * 0.4})`;
    ctx.stroke();
  }
  ctx.restore();
}

function drawFalls(ctx, t, flow) {
  if (flow <= 0.02) return;
  ctx.save();
  ctx.lineCap = "round";
  const travel = (t * 70 * (0.35 + flow)) % 220;
  for (let i = 0; i < 16; i++) {
    const ny = 0.12 + ((i * 0.02 * PH + travel) % (0.32 * PH)) / PH;
    const x = fallNx(ny) * PW;
    const y = ny * PH;
    const len = 8 + (i % 5) * 7;
    ctx.strokeStyle = `rgba(240, 232, 210, ${(0.25 + (i % 3) * 0.18) * flow})`;
    ctx.lineWidth = i % 4 === 0 ? 2.4 : 1.3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.sin(i * 1.7) * 1.2, y + len);
    ctx.stroke();
  }
  ctx.restore();
}

function drawFog(ctx, mist, t, peak, waist, foot) {
  const drift = Math.sin(t * 0.18) * 36;
  const bands = [
    [0.36 * PH, 0.32 * PH, peak * 0.95, drift],
    [0.52 * PH, 0.22 * PH, waist, -drift * 0.6],
    [0.86 * PH, 0.32 * PH, foot, drift * 0.4],
  ];
  ctx.save();
  for (const [y, h, a, d] of bands) {
    if (a < 0.02) continue;
    ctx.globalAlpha = a;
    ctx.drawImage(mist, -PW * 0.15 + d, y - h / 2, PW * 1.3, h);
  }
  ctx.restore();
}

function drawSignature(ctx, alpha) {
  if (alpha <= 0.01) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#140e0a";
  ctx.font = '600 38px "Song", "Songti SC", "STSong", serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const x = 0.812 * PW;
  const y = 0.888 * PH;
  ctx.fillText("范", x, y);
  ctx.fillText("宽", x, y + 42);
  ctx.restore();
}

const FRONT_LEAVES = (() => {
  const rng = mulberry32(77);
  const list = [];
  for (let i = 0; i < 28; i++) {
    const ang = rng() * Math.PI * 2;
    const rad = 34 + rng() * 26;
    list.push({
      x: 0.812 * PW + Math.cos(ang) * rad * 1.2,
      y: 0.9 * PH + Math.sin(ang) * rad * 0.9,
      r: 1.4 + rng() * 1.8,
    });
  }
  return list;
})();

function drawFrontLeaves(ctx) {
  ctx.save();
  ctx.fillStyle = "#120e0a";
  for (const leaf of FRONT_LEAVES) {
    ctx.globalAlpha = 0.82;
    ctx.beginPath();
    ctx.arc(leaf.x, leaf.y, leaf.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function layoutOf(vw, vh) {
  const padX = Math.max(8, Math.min(28, vw * 0.03));
  const padTop = Math.max(8, Math.min(22, vh * 0.02));
  const padBot = Math.max(68, Math.min(104, vh * 0.11));
  const aw = vw - padX * 2;
  const ah = vh - padTop - padBot;
  let w = aw;
  let h = w * (PH / PW);
  if (h > ah) {
    h = ah;
    w = h * (PW / PH);
  }
  return {
    x: (vw - w) / 2,
    y: padTop + (ah - h) / 2,
    w,
    h,
    padBot,
  };
}

const canvas = document.getElementById("view");
const vctx = canvas.getContext("2d", { alpha: false });
const caption = document.getElementById("caption");
const actEl = document.getElementById("act");
const l1 = document.getElementById("l1");
const l2 = document.getElementById("l2");

const params = new URLSearchParams(location.search);
const seek = params.has("t") ? Number(params.get("t")) || 0 : 0;
const still = params.has("still");
const debug = params.has("debug");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

let art = null;
let mist = null;
let mount = null;
let mountPat = null;
let path = null;
let view = { w: 0, h: 0, dpr: 0 };
let clock = 0;

function ensureView() {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (view.w === w && view.h === h && view.dpr === dpr) return;
  view = { w, h, dpr };
  canvas.width = Math.max(1, Math.round(w * dpr));
  canvas.height = Math.max(1, Math.round(h * dpr));
  mountPat = null;
}

function drawFrame(t) {
  ensureView();
  const dpr = view.dpr;
  const L = layoutOf(view.w, view.h);
  vctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (!mountPat) mountPat = vctx.createPattern(mount, "repeat");
  vctx.fillStyle = mountPat;
  vctx.fillRect(0, 0, view.w, view.h);
  vctx.fillStyle = "rgba(28, 18, 12, 0.18)";
  vctx.fillRect(0, 0, view.w, view.h);

  vctx.strokeStyle = "#b9a27a";
  vctx.lineWidth = 1;
  vctx.strokeRect(L.x - 7, L.y - 7, L.w + 14, L.h + 14);
  vctx.strokeStyle = "#241910";
  vctx.lineWidth = 4;
  vctx.strokeRect(L.x - 4, L.y - 4, L.w + 8, L.h + 8);

  vctx.save();
  vctx.beginPath();
  vctx.rect(L.x, L.y, L.w, L.h);
  vctx.clip();
  vctx.drawImage(art.canvas, L.x, L.y, L.w, L.h);
  vctx.translate(L.x, L.y);
  vctx.scale(L.w / PW, L.h / PH);

  const fog = sampleKeys(t, FOG_KEYS);
  drawFalls(vctx, t, fog[3]);
  drawFog(vctx, mist, t, fog[0], fog[1], fog[2]);
  drawBells(vctx, t);
  drawCaravan(vctx, t);
  vctx.drawImage(art.overlay, 0, 0);
  drawSignature(vctx, fog[4]);
  drawFrontLeaves(vctx);
  drawBirds(vctx, t);
  if (debug) drawDebug(vctx);
  vctx.restore();

  caption.style.height = `${L.padBot}px`;
  updateCaption(t);
}

function drawCaravan(ctx, t) {
  if (t < 8.2 || t > 44) return;
  const lead = leadDistance(t, path.total);
  const lag = lastLag(t);
  const look = lookAmount(t);
  const placed = [];
  for (const m of MEMBERS) {
    const extra = m.role === "last" ? lag : 0;
    const at = pointAlong(path, lead - m.back - extra);
    if (!at) continue;
    const phase = (lead - m.back) * 0.09;
    placed.push({ m, at, phase });
  }
  let ropeA = null;
  let ropeB = null;
  for (let i = placed.length - 1; i >= 0; i--) {
    const { m, at, phase } = placed[i];
    if (m.kind === "mule") {
      drawMule(ctx, at.x, at.y, at.ang, phase + i, m.scale, m.pack);
      if (!ropeB) ropeB = at;
    } else {
      drawPerson(ctx, at.x, at.y, at.ang, phase, m.role === "last" ? look : 0);
      if (m.role === "lead") ropeA = at;
    }
  }
  drawRope(ctx, ropeA, ropeB);
}

function drawDebug(ctx) {
  ctx.save();
  ctx.strokeStyle = "rgba(180, 40, 40, 0.8)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i < PATH.length; i++) {
    const x = PATH[i][0] * PW;
    const y = PATH[i][1] * PH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

function updateCaption(t) {
  if (reduce) {
    caption.style.opacity = "1";
    actEl.textContent = "入山";
    l1.textContent = ACTS[3].lines[0];
    l2.textContent = ACTS[3].lines[1];
    return;
  }
  let act = null;
  for (const a of ACTS) {
    if (t >= a.start && t < a.end) act = a;
  }
  if (!act) {
    caption.style.opacity = "0";
    return;
  }
  const fade = 0.7;
  const o = Math.min(1, (t - act.start) / fade, (act.end - t) / fade);
  if (caption.dataset.act !== act.name) {
    caption.dataset.act = act.name;
    actEl.textContent = act.name;
    l1.textContent = act.lines[0];
    l2.textContent = act.lines[1];
  }
  caption.style.opacity = String(o);
}

async function boot() {
  const fontP = document.fonts.load('600 18px "Song"').catch(() => {});
  art = buildPainting();
  mist = buildMist();
  mount = buildMount();
  path = buildPath();
  document.body.dataset.build = String(Math.round(art.ms));
  clock = reduce ? 45 : seek;
  drawFrame(clock);
  document.body.dataset.ready = "1";
  await fontP;
  drawFrame(clock);
  if (reduce || still) return;
  const t0 = performance.now() - seek * 1000;
  const loop = (now) => {
    clock = (((now - t0) / 1000) % LOOP + LOOP) % LOOP;
    drawFrame(clock);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

window.addEventListener("resize", () => {
  if (art) drawFrame(clock);
});

boot();
