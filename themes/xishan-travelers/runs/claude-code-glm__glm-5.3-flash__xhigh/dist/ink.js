'use strict';
/* ============================================================
 * ink.js —— 水墨工具箱
 * 定种随机 / 一维值噪声 / 皴擦点染 / 枯笔飞白 / 绢本做旧
 * 全部坐标以"设计单位"为准：画幅 1200 x 2400
 * ============================================================ */
const INK = (() => {

  /* ---------- 随机数（可复现） ---------- */
  let _s = 987654321;
  function srand(s) { _s = s >>> 0; }
  function rnd() {
    _s |= 0; _s = _s + 0x6D2B79F5 | 0;
    let t = Math.imul(_s ^ _s >>> 15, 1 | _s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
  const rr = (a, b) => a + (b - a) * rnd();
  const ri = (a, b) => Math.floor(rr(a, b + 1));
  const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = t => t * t * (3 - 2 * t);
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  /* ---------- 值噪声 ---------- */
  function hash1(i, s) { const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); }
  function noise1(x, s) { const i = Math.floor(x), f = x - i; return lerp(hash1(i, s), hash1(i + 1, s), smooth(f)); }
  function fbm1(x, s, oct = 4) {
    let v = 0, a = .5, f = 1;
    for (let i = 0; i < oct; i++) { v += a * noise1(x * f, s + i * 13); f *= 2; a *= .5; }
    return v;
  }

  /* ---------- 调色（绢与墨） ---------- */
  const PAL = {
    silk:  [141, 121, 82],   // 绢底
    silkHi:[212, 192, 146],  // 绢之亮（雾、水、受光）
    silkLo:[102, 86, 58],    // 绢之暗（旧边）
    ink:   [24, 20, 14],     // 焦墨
    ink2:  [48, 41, 30],     // 浓墨
    ink3:  [82, 71, 52],     // 重墨
    rock:  [116, 102, 76],   // 山石基色
    rockHi:[172, 154, 116],  // 石面受光
    rockLo:[58, 50, 37],     // 石之暗面
    water: [222, 206, 162],  // 水色
    red:   [148, 52, 38]     // 印泥
  };
  const C = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  /* ---------- 画布 ---------- */
  function layer(w, h) { const c = document.createElement('canvas'); c.width = Math.max(1, w | 0); c.height = Math.max(1, h | 0); return c; }

  /* 折线细分 + 噪声抖动，形成"毛边"路径 */
  function roughPath(g, pts, opt) {
    const { jag = 3, step = 14, ns = 1, close = false } = opt || {};
    g.beginPath();
    let started = false;
    const P = pts.map(p => p.slice());
    const n = P.length;
    const emit = (x1, y1, x2, y2) => {
      const d = Math.hypot(x2 - x1, y2 - y1);
      const k = Math.max(2, Math.ceil(d / step));
      for (let i = 0; i <= k; i++) {
        const t = i / k;
        let x = lerp(x1, x2, t), y = lerp(y1, y2, t);
        x += (fbm1((x + y) * .012, ns, 3) - .5) * jag;
        y += (fbm1((x - y) * .014 + 7.3, ns + 5, 3) - .5) * jag;
        if (!started) { g.moveTo(x, y); started = true; } else g.lineTo(x, y);
      }
    };
    for (let i = 0; i < n - 1; i++) emit(P[i][0], P[i][1], P[i + 1][0], P[i + 1][1]);
    if (close) emit(P[n - 1][0], P[n - 1][1], P[0][0], P[0][1]);
    g.closePath();
  }

  /* 一笔：沿折线，宽度起收变化，墨色分两遍叠 */
  function stroke(g, pts, o) {
    const { w = 2, col = PAL.ink2, a = .55, taper = .5, jitter = 0, ns = 3 } = o || {};
    const P = pts.map(p => p.slice());
    if (jitter) for (const p of P) { p[0] += (fbm1(p[0] * .02 + p[1] * .01, ns, 2) - .5) * jitter; p[1] += (fbm1(p[1] * .02 + 5, ns + 9, 2) - .5) * jitter; }
    g.lineCap = 'round'; g.lineJoin = 'round';
    for (let pass = 0; pass < 2; pass++) {
      g.strokeStyle = C(col, pass ? a * .5 : a);
      const lw = pass ? w * .55 : w;
      for (let i = 0; i < P.length - 1; i++) {
        const t = i / (P.length - 1);
        const tp = Math.min(1, Math.sin(Math.PI * Math.min(1, t * .92 + .04)) / Math.sin(Math.PI * .5));
        const width = lw * lerp(1 - taper, 1, tp) * rr(.8, 1.15);
        g.lineWidth = Math.max(.4, width);
        g.beginPath();
        g.moveTo(P[i][0], P[i][1]);
        g.lineTo(P[i + 1][0], P[i + 1][1]);
        g.stroke();
      }
    }
  }

  /* 枯笔：数条平行细线，随机断续 —— 飞白 */
  function dryStroke(g, pts, o) {
    const { w = 3, col = PAL.ink2, a = .4, n = 4, gap = .45, ns = 7 } = o || {};
    const P = pts.map(p => p.slice());
    for (let k = 0; k < n; k++) {
      const off = (k / (n - 1) - .5) * w * 1.6;
      g.strokeStyle = C(col, a * rr(.5, 1));
      g.lineWidth = Math.max(.5, w * rr(.18, .38));
      g.lineCap = 'round';
      g.beginPath();
      let down = false;
      for (let i = 0; i < P.length; i++) {
        const t = i / (P.length - 1);
        const dx = P[i + 1 < P.length ? i + 1 : i][0] - P[Math.max(0, i - 1)][0];
        const dy = P[i + 1 < P.length ? i + 1 : i][1] - P[Math.max(0, i - 1)][1];
        const L = Math.hypot(dx, dy) || 1;
        const px = P[i][0] - dy / L * off + (fbm1(t * 9 + k * 3, ns, 2) - .5) * 1.6;
        const py = P[i][1] + dx / L * off;
        if (hash1(i * 3 + k * 17, ns) < gap) { down = false; continue; }
        if (!down) { g.moveTo(px, py); down = true; } else g.lineTo(px, py);
      }
      g.stroke();
    }
  }

  /* 圆点（苔点 / 雨点皴的最小单位） */
  function dot(g, x, y, r, col, a) {
    g.fillStyle = C(col, a);
    g.beginPath(); g.arc(x, y, r, 0, 6.2832); g.fill();
  }

  /* 软斑：径向渐变湿晕 */
  function blot(g, x, y, r, col, a) {
    const gr = g.createRadialGradient(x, y, r * .1, x, y, r);
    gr.addColorStop(0, C(col, a));
    gr.addColorStop(.65, C(col, a * .55));
    gr.addColorStop(1, C(col, 0));
    g.fillStyle = gr;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }

  /* 湿笔团簇：若干软斑叠成一团墨 */
  function inkBlot(g, x, y, rx, ry, col, a, n = 6, ns = 3) {
    for (let i = 0; i < n; i++) {
      const t = i / n * 6.28;
      blot(g, x + Math.cos(t) * rx * .4 * (fbm1(i * 2.3, ns) - .3) * 2,
             y + Math.sin(t) * ry * .4 * (fbm1(i * 3.1 + 4, ns) - .3) * 2,
           rr(rx, ry) * .55, col, a * rr(.5, 1));
    }
  }

  /* ============================================================
   * 绢本做旧：底色、经纬、霉斑、破损、四边沉暗
   * ============================================================ */
  function silkBase(g, W, H, k) {
    // 底色
    g.fillStyle = C(PAL.silk, 1);
    g.fillRect(0, 0, W, H);
    // 大块不匀（绢色深浅）
    for (let i = 0; i < 26; i++) {
      blot(g, rr(0, W), rr(0, H), rr(W * .12, W * .5),
           rnd() < .5 ? PAL.silkLo : PAL.silkHi, rr(.05, .14));
    }
    // 经纬织纹
    g.globalAlpha = 1;
    for (let y = 0; y < H; y += 2) {
      g.fillStyle = C(PAL.silkLo, .02 + .014 * (y % 4 === 0));
      g.fillRect(0, y, W, 1);
    }
    for (let x = 0; x < W; x += 3) {
      g.fillStyle = C(PAL.silkHi, .012 + .01 * (x % 6 === 0));
      g.fillRect(x, 0, 1, H);
    }
    // 霉点、旧渍、破损白点
    for (let i = 0; i < 90; i++) {
      const x = rr(0, W), y = rr(0, H), r = rr(2, 26);
      blot(g, x, y, r, PAL.silkLo, rr(.04, .13));
    }
    for (let i = 0; i < 240; i++) {
      const x = rr(0, W), y = rr(0, H), r = rr(.6, 3.2);
      dot(g, x, y, r, rnd() < .55 ? PAL.silkHi : PAL.silkLo, rr(.06, .22));
    }
    // 细纤维
    g.lineWidth = 1;
    for (let i = 0; i < 60; i++) {
      const x = rr(0, W), y = rr(0, H), a2 = rr(0, 6.28), l = rr(8, 40);
      g.strokeStyle = C(rnd() < .5 ? PAL.silkHi : PAL.silkLo, rr(.05, .16));
      g.beginPath(); g.moveTo(x, y);
      g.lineTo(x + Math.cos(a2) * l, y + Math.sin(a2) * l); g.stroke();
    }
    // 四边沉暗（包浆）
    const eg = g.createLinearGradient(0, 0, 0, H);
    eg.addColorStop(0, C(PAL.silkLo, .38)); eg.addColorStop(.09, C(PAL.silkLo, 0));
    eg.addColorStop(.9, C(PAL.silkLo, 0)); eg.addColorStop(1, C(PAL.silkLo, .42));
    g.fillStyle = eg; g.fillRect(0, 0, W, H);
    const egx = g.createLinearGradient(0, 0, W, 0);
    egx.addColorStop(0, C(PAL.silkLo, .34)); egx.addColorStop(.06, C(PAL.silkLo, 0));
    egx.addColorStop(.94, C(PAL.silkLo, 0)); egx.addColorStop(1, C(PAL.silkLo, .36));
    g.fillStyle = egx; g.fillRect(0, 0, W, H);
    if (k) k(g);
  }

  /* 收藏印（角上一方，很淡） */
  function seal(g, x, y, s, txt, a = .5) {
    g.save();
    g.translate(x, y); g.rotate(rr(-.03, .03));
    g.fillStyle = C(PAL.red, a * .8);
    g.beginPath();
    if (g.roundRect) g.roundRect(-s / 2, -s / 2, s, s, s * .08);
    else g.rect(-s / 2, -s / 2, s, s);
    g.fill();
    g.fillStyle = C(PAL.silkHi, a * .95);
    g.font = `${s * .52}px "Songti SC","STSong","SimSun",serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(txt, 0, s * .04);
    g.restore();
  }

  return { srand, rnd, rr, ri, clamp, lerp, smooth, ease, noise1, fbm1, PAL, C, layer,
           roughPath, stroke, dryStroke, dot, blot, inkBlot, silkBase, seal };
})();
