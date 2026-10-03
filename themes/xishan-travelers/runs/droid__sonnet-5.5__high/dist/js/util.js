/* 基础工具：随机数、噪声、网格、批量笔触 */
(function (G) {
  'use strict';
  const TAU = Math.PI * 2;
  const W = 1024, H = 2048; // 画面逻辑坐标

  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  class RNG {
    constructor(seed) { this.f = mulberry32(seed | 0); }
    next() { return this.f(); }
    range(a, b) { return a + (b - a) * this.f(); }
    int(a, b) { return Math.floor(this.range(a, b + 1)); }
    gauss() { let u = 0; for (let i = 0; i < 4; i++) u += this.f(); return (u - 2) / 0.58; }
    pick(arr) { return arr[Math.floor(this.f() * arr.length)]; }
  }

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const ease = t => t * t * (3 - 2 * t);

  // 值噪声
  const NS = 256;
  const nTable = new Float32Array(NS * NS);
  (function () { const r = mulberry32(20240607); for (let i = 0; i < nTable.length; i++) nTable[i] = r(); })();
  function vnoise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const x0 = xi & 255, x1 = (xi + 1) & 255, y0 = yi & 255, y1 = (yi + 1) & 255;
    const a = nTable[y0 * NS + x0], b = nTable[y0 * NS + x1];
    const c = nTable[y1 * NS + x0], d = nTable[y1 * NS + x1];
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function fbm(x, y, oct) {
    let s = 0, amp = 0.5, f = 1, n = 0;
    for (let i = 0; i < (oct || 4); i++) { s += amp * vnoise(x * f + i * 17.3, y * f + i * 9.1); n += amp; amp *= 0.5; f *= 2.03; }
    return s / n;
  }

  /* 低分辨率网格：4px 一格 */
  const GW = 256, GH = 512, GS = 4;
  class Grid {
    constructor(d) { this.d = d || new Float32Array(GW * GH); }
    get(x, y) {
      const fx = clamp(x / GS - 0.5, 0, GW - 1.001), fy = clamp(y / GS - 0.5, 0, GH - 1.001);
      const ix = fx | 0, iy = fy | 0, tx = fx - ix, ty = fy - iy;
      const d = this.d, i = iy * GW + ix;
      return (d[i] * (1 - tx) + d[i + 1] * tx) * (1 - ty) + (d[i + GW] * (1 - tx) + d[i + GW + 1] * tx) * ty;
    }
  }
  function boxBlur(src, r, passes) {
    let a = new Float32Array(src), b = new Float32Array(src.length);
    for (let p = 0; p < (passes || 2); p++) {
      // 横向
      for (let y = 0; y < GH; y++) {
        let acc = 0; const row = y * GW;
        for (let x = -r; x <= r; x++) acc += a[row + clamp(x, 0, GW - 1)];
        for (let x = 0; x < GW; x++) {
          b[row + x] = acc / (2 * r + 1);
          acc += a[row + clamp(x + r + 1, 0, GW - 1)] - a[row + clamp(x - r, 0, GW - 1)];
        }
      }
      // 纵向
      for (let x = 0; x < GW; x++) {
        let acc = 0;
        for (let y = -r; y <= r; y++) acc += b[clamp(y, 0, GH - 1) * GW + x];
        for (let y = 0; y < GH; y++) {
          a[y * GW + x] = acc / (2 * r + 1);
          acc += b[clamp(y + r + 1, 0, GH - 1) * GW + x] - b[clamp(y - r, 0, GH - 1) * GW + x];
        }
      }
    }
    return a;
  }

  /* Catmull-Rom 平滑 + 抖动，返回加密后的点列 */
  function smoothPts(pts, sub, jit, rng, closed) {
    const out = [], n = pts.length;
    const P = i => closed ? pts[(i + n) % n] : pts[clamp(i, 0, n - 1)];
    const segs = closed ? n : n - 1;
    for (let i = 0; i < segs; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      for (let k = 0; k < sub; k++) {
        const t = k / sub, t2 = t * t, t3 = t2 * t;
        const x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);
        const y = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);
        let jx = 0, jy = 0;
        if (jit) { jx = (fbm(x * 0.05, y * 0.05, 3) - 0.5) * 2 * jit; jy = (fbm(x * 0.05 + 40, y * 0.05 + 7, 3) - 0.5) * 2 * jit; }
        out.push([x + jx, y + jy]);
      }
    }
    if (!closed) out.push([pts[n - 1][0], pts[n - 1][1]]);
    return out;
  }
  function polyPath(ctx, pts, closed) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    if (closed) ctx.closePath();
  }

  /* 批量笔触：相同样式的二次曲线合并绘制，兼顾速度和叠墨效果 */
  class Ink {
    constructor(ctx) { this.ctx = ctx; this.m = new Map(); }
    line(color, w, a, x0, y0, cx, cy, x1, y1) {
      a = Math.round(a * 24) / 24;
      if (a <= 0.02) return;
      w = Math.round(w * 4) / 4 || 0.25;
      const k = color + '|' + w + '|' + a;
      let b = this.m.get(k);
      if (!b) { b = { p: new Path2D(), n: 0, color, w, a }; this.m.set(k, b); }
      b.p.moveTo(x0, y0); b.p.quadraticCurveTo(cx, cy, x1, y1);
      if (++b.n >= 90) this._f(b);
    }
    _f(b) {
      const c = this.ctx;
      c.lineCap = 'round'; c.lineJoin = 'round';
      c.strokeStyle = 'rgba(' + b.color + ',' + b.a + ')';
      c.lineWidth = b.w;
      c.stroke(b.p);
      b.p = new Path2D(); b.n = 0;
    }
    flush() { for (const b of this.m.values()) if (b.n) this._f(b); }
  }

  G.U = { TAU, W, H, RNG, mulberry32, clamp, lerp, smooth, ease, vnoise, fbm, GW, GH, GS, Grid, boxBlur, smoothPts, polyPath, Ink };
})(window);
