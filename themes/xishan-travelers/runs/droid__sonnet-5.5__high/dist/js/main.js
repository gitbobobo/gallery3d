/* 溪山行旅：时间线、镜头、渲染循环 */
(function (G) {
  'use strict';
  const { TAU, W, H, RNG, clamp, lerp, smooth, ease } = G.U;
  const A = G.Actors, P = G.Paint;

  const T = 66;                 // 一轮总时长（秒）
  const FIRST_OFFSET = 2.0;     // 首轮跳过最浓的前两秒，保证一打开就能看见全貌
  const params = new URLSearchParams(location.search);
  const FREEZE = params.has('t') ? parseFloat(params.get('t')) : null;

  /* ---------- 关键帧工具 ---------- */
  function kf(arr, t) {
    if (t <= arr[0][0]) return arr[0][1];
    for (let i = 1; i < arr.length; i++) {
      if (t < arr[i][0]) {
        const u = (t - arr[i - 1][0]) / (arr[i][0] - arr[i - 1][0]);
        return lerp(arr[i - 1][1], arr[i][1], ease(u));
      }
    }
    return arr[arr.length - 1][1];
  }
  function kfv(arr, t) { // arr: [t, [v...]]
    if (t <= arr[0][0]) return arr[0][1];
    for (let i = 1; i < arr.length; i++) {
      if (t < arr[i][0]) {
        const u = ease((t - arr[i - 1][0]) / (arr[i][0] - arr[i - 1][0]));
        return arr[i][1].map((v, k) => lerp(arr[i - 1][1][k], v, u));
      }
    }
    return arr[arr.length - 1][1];
  }

  /* ---------- 时间线 ---------- */
  const MIST = {
    high: [[0, 0.7], [4, 0.15], [9, 0], [60, 0], [62.5, 0.06], [66, 0.82]],
    mid: [[0, 0.75], [5, 0.3], [10.5, 0], [55, 0], [58, 0.12], [62.5, 0.1], [66, 0.85]],
    low: [[0, 0.88], [6, 0.5], [12, 0.2], [20, 0.16], [52, 0.18], [58, 0.46], [62.5, 0.3], [66, 0.88]],
    foot: [[0, 0.95], [3, 0.66], [9, 0.36], [14, 0.2], [20, 0.12], [50, 0.14], [56, 0.58], [60, 0.46], [62.5, 0.3], [66, 0.95]]
  };
  const DAWN = [[0, 0.38], [3, 0.24], [8, 0.07], [13, 0], [61, 0], [63.5, 0.1], [66, 0.38]];
  const FALL_PROG = [[0, 0], [5.5, 0], [11.5, 1]];
  const FALL_ALPHA = [[0, 1], [61, 1], [65, 0], [66, 0]];
  const SIGN = [[0, 0], [53, 0], [56.5, 1], [63, 1], [65.5, 0], [66, 0]];
  const CAM = [
    [0, [1.0, 512, 1024]], [13, [1.0, 512, 1024]], [18.5, [1.55, 700, 1500]], [30, [1.55, 640, 1500]],
    [33.5, [1.35, 630, 1230]], [41, [1.35, 600, 1230]], [44.5, [1.6, 480, 1500]], [51, [1.6, 300, 1490]],
    [56, [1.5, 300, 1480]], [61.5, [1.0, 512, 1024]], [66, [1.0, 512, 1024]]
  ];

  const ACT_NAMES = ['晨雾', '行旅', '钟声', '入山'];
  const ACT_NUM = ['壹', '贰', '叁', '肆'];
  const ACT_START = [0, 14, 30, 46];
  const CAPTIONS = [
    [0.2, 6.9, 0, '天刚亮，山脚的雾还很浓。'],
    [7.3, 13.8, 0, '雾慢慢散开，主峰从云里露出来，瀑布也流动起来。'],
    [14.4, 21.8, 1, '一队商旅从右边的树林里走出来，四头驮骡缓缓跟着。'],
    [22.2, 29.6, 1, '他们沿着溪边的小路，一路向左。'],
    [30.4, 36.8, 2, '林中寺院忽然响起钟声，惊起一群飞鸟。'],
    [37.2, 45.6, 2, '走在最后的人停下脚步，抬头望了一会儿大山，再快步追上队伍。'],
    [46.4, 53.2, 3, '驮队转进左边的山路，渐渐看不见了。'],
    [53.6, 62.0, 3, '雾气重新合拢，山水又回到原来的样子。']
  ];

  /* ---------- 驮队 ---------- */
  const T_START = 14.5, VEL = 29, HIDE0 = 840, HIDE1 = 935;
  const WALKERS = [
    { type: 'person', kind: 'leader', off: 0, seed: 1 },
    { type: 'mule', idx: 0, off: -66, seed: 2 },
    { type: 'mule', idx: 1, off: -130, seed: 3 },
    { type: 'person', kind: 'driver', off: -170, seed: 4, dy: 3 },
    { type: 'mule', idx: 2, off: -212, seed: 5 },
    { type: 'mule', idx: 3, off: -274, seed: 6 },
    { type: 'person', kind: 'last', off: -345, seed: 7, last: true }
  ];
  const T_STOP = 34, T_GO = 39.5;
  function headS(t) {
    const tt = t - T_START;
    if (tt <= 0) return -999;
    return tt < 2 ? VEL * tt * tt / 4 : VEL * (tt - 1);
  }
  function walkerS(w, t) {
    const follow = headS(t) + w.off;
    if (!w.last) return follow;
    const sa = headS(T_STOP) + w.off;
    if (t < T_STOP) return follow;
    if (t < T_GO) return sa;
    return Math.min(follow, sa + 2 * VEL * (t - T_GO));
  }
  const lookAmt = t => smooth(34.5, 35.7, t) * (1 - smooth(38.3, 39.4, t));

  /* ---------- 飞鸟 ---------- */
  const BIRDS = (function () {
    const r = new RNG(77), arr = [];
    for (let i = 0; i < 18; i++) {
      const dx = r.range(-70, 70), dy = r.range(-40, 40);
      arr.push({
        d: r.range(0, 1.4), dur: r.range(8.5, 10.5), size: r.range(8.5, 12.5), fr: r.range(5.5, 8), ph: r.range(0, TAU), wob: r.range(0.6, 1.4),
        pts: [[620 + r.range(0, 260), 1385 + r.range(-20, 25)], [700 + dx, 1250 + dy], [540 + dx, 1170 + dy], [340 + dx, 1200 + dy], [150 + dx, 1100 + dy], [-60, 1010 + dy]]
      });
    }
    return arr;
  })();
  const T_BELL = [31.0, 34.3];
  const BELL = [918, 1417];
  function catmull(pts, u) {
    const n = pts.length - 1, f = clamp(u, 0, 1) * n, i = Math.min(n - 1, Math.floor(f)), t = f - i;
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(n, i + 2)];
    const c = k => 0.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t * t + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t * t * t);
    return [c(0), c(1)];
  }

  /* ---------- 状态 ---------- */
  const cv = document.getElementById('c');
  const ctx = cv.getContext('2d');
  const capEl = document.getElementById('cap'), capLab = capEl.querySelector('.lab'), capTxt = capEl.querySelector('.txt');
  const sideEl = document.getElementById('side'), progEl = document.getElementById('prog'), loadEl = document.getElementById('load');
  let L = null, art = null, sprites = null, weave = null, dpr = 1;
  let curCap = -1, curAct = -1;

  function layout() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const vw = window.innerWidth, vh = window.innerHeight;
    cv.width = Math.round(vw * dpr); cv.height = Math.round(vh * dpr);
    cv.style.width = vw + 'px'; cv.style.height = vh + 'px';
    const capH = vw < 520 ? 96 : 92, padT = 12;
    let fh = vh - capH - padT, fw = fh / 2;
    if (fw > vw - 20) { fw = vw - 20; fh = fw * 2; }
    const fx = (vw - fw) / 2, fy = padT + Math.max(0, (vh - capH - padT - fh) / 2);
    L = { vw, vh, fx, fy, fw, fh, side: fx };
    const capW = Math.min(vw - 20, Math.max(fw, 360));
    capEl.style.width = capW + 'px';
    capEl.style.left = (vw - capW) / 2 + 'px';
    capEl.style.top = (fy + fh + 10) + 'px';
    capEl.style.fontSize = (vw < 520 ? 16 : clamp(fw / 24, 15, 20)) + 'px';
    const wide = fx >= 96;
    sideEl.style.display = progEl.style.display = wide ? 'block' : 'none';
    if (wide) {
      const sw = Math.min(fx - 24, 120);
      sideEl.style.left = Math.max(12, fx - sw - 8) + 'px'; sideEl.style.width = sw + 'px';
      sideEl.style.top = fy + 'px'; sideEl.style.fontSize = clamp(sw * 0.62, 28, 64) + 'px';
      progEl.style.left = (fx + fw + 14) + 'px'; progEl.style.top = fy + 'px';
    }
    // 编织纹理（屏幕空间，按设备像素对齐）
    const wc = document.createElement('canvas'); const n = Math.max(3, Math.round(3 * dpr));
    wc.width = wc.height = n * 2;
    const wx = wc.getContext('2d');
    wx.fillStyle = 'rgba(0,0,0,0.028)'; wx.fillRect(0, 0, n * 2, 1 * dpr);
    wx.fillStyle = 'rgba(255,230,170,0.02)'; wx.fillRect(0, n, n * 2, 1 * dpr);
    wx.fillStyle = 'rgba(0,0,0,0.02)'; wx.fillRect(0, 0, 1 * dpr, n * 2);
    wx.fillStyle = 'rgba(255,230,170,0.015)'; wx.fillRect(n, 0, 1 * dpr, n * 2);
    weave = ctx.createPattern(wc, 'repeat');
    if (FREEZE !== null && art) render(FREEZE);
  }

  function makeMist(w, h, seed, y, a, aspect) {
    const rng = new RNG(seed), c = P.canvas(w / 2, h / 2), x = c.getContext('2d');
    x.scale(0.5, 0.5);
    const col = P.silkColor(y, 0.14).map(v => Math.round(Math.min(255, v + 16)));
    for (let i = 0; i < 80; i++) {
      const cx = rng.range(w * 0.08, w * 0.92), cy = h * 0.5 + rng.gauss() * h * 0.16;
      const r = rng.range(0.14, 0.3) * h;
      x.save(); x.translate(cx, cy); x.scale(aspect || 2.8, 1);
      const g = x.createRadialGradient(0, 0, 0, 0, 0, r);
      g.addColorStop(0, 'rgba(' + col + ',' + a + ')'); g.addColorStop(0.55, 'rgba(' + col + ',' + a * 0.45 + ')'); g.addColorStop(1, 'rgba(' + col + ',0)');
      x.fillStyle = g; x.beginPath(); x.arc(0, 0, r, 0, TAU); x.fill(); x.restore();
    }
    // 上下、左右羽化
    x.globalCompositeOperation = 'destination-in';
    const gv = x.createLinearGradient(0, 0, 0, h); gv.addColorStop(0, 'rgba(0,0,0,0)'); gv.addColorStop(0.28, 'rgba(0,0,0,1)'); gv.addColorStop(0.72, 'rgba(0,0,0,1)'); gv.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = gv; x.fillRect(0, 0, w, h);
    const gh = x.createLinearGradient(0, 0, w, 0); gh.addColorStop(0, 'rgba(0,0,0,0)'); gh.addColorStop(0.1, 'rgba(0,0,0,1)'); gh.addColorStop(0.9, 'rgba(0,0,0,1)'); gh.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = gh; x.fillRect(0, 0, w, h);
    return c;
  }

  function buildSprites() {
    return {
      high: { c: makeMist(1500, 560, 1, 480, 0.55), y: 200, h: 560, dir: -1, ph: 0.3 },
      mid: { c: makeMist(1500, 600, 2, 850, 0.55), y: 560, h: 600, dir: 1, ph: 1.7 },
      low: { c: makeMist(1500, 600, 3, 1200, 0.6), y: 900, h: 600, dir: -1, ph: 2.9 },
      foot: { c: makeMist(1500, 640, 4, 1560, 0.6), y: 1270, h: 640, dir: 1, ph: 4.2 }
    };
  }
  function drawMist(name, level, t) {
    if (level <= 0.01) return;
    const s = sprites[name];
    const x = -238 + s.dir * (1 - level) * 230 + Math.sin(t * 0.13 + s.ph) * 42;
    const yy = s.y + Math.sin(t * 0.09 + s.ph) * 10;
    ctx.globalAlpha = Math.min(1, level * 1.35); ctx.drawImage(s.c, x, yy, 1500, s.h);
    if (level > 0.45) { ctx.globalAlpha = Math.min(1, (level - 0.45) * 1.5); ctx.drawImage(s.c, x + 60, yy, 1500, s.h); }
    ctx.globalAlpha = 1;
  }

  /* ---------- 动态元素 ---------- */
  const FALL = [[862, 704], [858, 760], [853, 830], [850, 900], [849, 980], [847, 1060], [847, 1140], [846, 1242]];
  const FALL_LEN = FALL.reduce((s, p, i) => (i ? s + Math.hypot(p[0] - FALL[i - 1][0], p[1] - FALL[i - 1][1]) : 0), 0);
  function fallPath(prog) {
    let rem = FALL_LEN * prog; const pts = [FALL[0]];
    for (let i = 1; i < FALL.length && rem > 0; i++) {
      const a = FALL[i - 1], b = FALL[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (rem >= d) { pts.push(b); rem -= d; } else { const u = rem / d; pts.push([lerp(a[0], b[0], u), lerp(a[1], b[1], u)]); rem = 0; }
    }
    return pts;
  }
  function drawFall(t, prog, alpha) {
    if (prog <= 0.001 || alpha <= 0.01) return;
    const pts = fallPath(prog);
    const path = () => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); };
    ctx.save(); ctx.globalAlpha = alpha; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    path(); ctx.strokeStyle = 'rgba(232,214,160,0.18)'; ctx.lineWidth = 9; ctx.stroke();
    path(); ctx.strokeStyle = 'rgba(236,226,196,0.78)'; ctx.lineWidth = 3.2; ctx.stroke();
    ctx.setLineDash([11, 27]); ctx.lineDashOffset = -t * 78;
    path(); ctx.strokeStyle = 'rgba(255,252,236,0.8)'; ctx.lineWidth = 2.2; ctx.stroke();
    ctx.setLineDash([4, 19]); ctx.lineDashOffset = -t * 130;
    path(); ctx.strokeStyle = 'rgba(255,248,220,0.6)'; ctx.lineWidth = 1.3; ctx.stroke();
    ctx.setLineDash([]);
    if (prog >= 0.98) { // 潭口水雾
      const k = 0.7 + 0.3 * Math.sin(t * 1.7);
      const g = ctx.createRadialGradient(846, 1242, 0, 846, 1242, 48);
      g.addColorStop(0, 'rgba(236,222,180,' + 0.35 * k + ')'); g.addColorStop(1, 'rgba(236,222,180,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(846, 1242, 52, 30, 0, 0, TAU); ctx.fill();
    }
    ctx.restore();
  }
  function drawCascade(t, alpha) {
    if (alpha <= 0.01) return;
    ctx.save(); ctx.globalAlpha = alpha * 0.8; ctx.lineCap = 'round';
    for (let i = 0; i < 6; i++) {
      const x = 454 + i * 10;
      ctx.setLineDash([6, 12 + (i % 3) * 5]); ctx.lineDashOffset = -t * (50 + i * 9);
      ctx.strokeStyle = 'rgba(240,226,184,0.6)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x, 1650); ctx.lineTo(x - 2 + (i % 2) * 3, 1742); ctx.stroke();
    }
    ctx.setLineDash([]); ctx.restore();
  }
  function drawGlints(t) {
    ctx.save(); ctx.lineCap = 'round';
    for (let i = 0; i < 26; i++) {
      const sp = 14 + (i % 4) * 5, span = 800;
      const x = 1040 - ((i * 131 + t * sp) % span) - 20;
      const y = 1826 + ((i * 53) % 38) + Math.sin(t * 0.9 + i) * 1.2;
      const len = 8 + (i % 5) * 4;
      ctx.strokeStyle = 'rgba(232,214,160,' + (0.14 + 0.1 * Math.sin(t * 1.3 + i * 2)) + ')'; ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + len, y + 0.4); ctx.stroke();
    }
    for (let i = 0; i < 10; i++) {
      const x = ((i * 71 + t * 9) % 230) - 10, y = 1876 + (i * 17) % 60;
      ctx.strokeStyle = 'rgba(210,190,140,' + (0.1 + 0.08 * Math.sin(t * 1.1 + i)) + ')'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 14, y + 0.3); ctx.stroke();
    }
    ctx.restore();
  }

  function drawWalkers(t) {
    const list = [];
    for (const w of WALKERS) {
      const s = walkerS(w, t);
      if (s < -30 || s > HIDE1 + 5) continue;
      const alpha = 1 - smooth(HIDE0, HIDE1, s);
      if (alpha < 0.02) continue;
      const pos = A.posAt(s);
      list.push({ w, s, pos, alpha });
    }
    list.sort((a, b) => a.pos.y - b.pos.y);
    for (const it of list) {
      const { w, s, pos, alpha } = it;
      const dt = 0.06, v = (s - walkerS(w, t - dt)) / dt;
      const amp = clamp(v / VEL, 0, 1.05);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(pos.x, pos.y + (w.dy || 0) * pos.sc);
      ctx.scale(-pos.sc * 1.3, pos.sc * 1.3);
      if (w.type === 'mule') A.drawMule(ctx, { idx: w.idx, phase: s / 34 * TAU, amp, t, seed: w.seed });
      else {
        const run = clamp(v / VEL - 1, 0, 1);
        A.drawPerson(ctx, { kind: w.kind, phase: s / 27 * TAU, amp: Math.min(amp, 1), run, look: w.last ? lookAmt(t) : 0, t, seed: w.seed });
      }
      ctx.restore();
    }
  }

  function drawBirds(t) {
    for (const b of BIRDS) {
      const u = (t - T_BELL[0] - 0.3 - b.d) / b.dur;
      if (u <= 0 || u >= 1) continue;
      const [x0, y0] = catmull(b.pts, u), [x1, y1] = catmull(b.pts, u + 0.01);
      const x = x0 + Math.sin(t * 1.3 * b.wob + b.ph) * 14, y = y0 + Math.cos(t * 1.7 * b.wob + b.ph) * 9;
      const a = smooth(0, 0.05, u) * (1 - smooth(0.78, 1, u));
      const fl = Math.sin(t * b.fr * TAU / 2 + b.ph) * (0.6 + 0.4 * smooth(0, 0.3, u));
      const sz = b.size * (1 - 0.25 * u);
      A.drawBird(ctx, x, y, Math.atan2(y1 - y0, x1 - x0), sz, fl, a);
    }
  }

  function drawBell(t) {
    for (const tb of T_BELL) {
      const age = t - tb;
      if (age < 0 || age > 5) continue;
      const k0 = Math.exp(-age * 2.2);
      const g = ctx.createRadialGradient(BELL[0], BELL[1], 0, BELL[0], BELL[1], 46);
      g.addColorStop(0, 'rgba(250,228,160,' + 0.55 * k0 + ')'); g.addColorStop(1, 'rgba(250,228,160,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(BELL[0], BELL[1], 46, 0, TAU); ctx.fill();
      for (let k = 0; k < 4; k++) {
        const a = age - k * 0.5; if (a < 0 || a > 4) continue;
        const u = a / 4, r = 14 + 190 * (1 - Math.pow(1 - u, 2.2));
        ctx.strokeStyle = 'rgba(240,222,164,' + 0.5 * Math.pow(1 - u, 1.6) + ')';
        ctx.lineWidth = lerp(3, 0.8, u);
        ctx.beginPath(); ctx.ellipse(BELL[0], BELL[1], r, r * 0.86, 0, 0, TAU); ctx.stroke();
      }
    }
  }

  function drawSignature(a) {
    if (a <= 0.01) return;
    ctx.save();
    ctx.globalAlpha = a;
    const x = 962, y = 1566;
    ctx.font = '40px "Ma Shan Zheng","STKaiti","Kaiti SC","KaiTi",serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const blur = (1 - a) * 6;
    ctx.shadowColor = 'rgba(20,16,8,0.75)'; ctx.shadowBlur = 3 + blur; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
    ctx.fillStyle = 'rgba(232,208,150,0.96)';
    ctx.fillText('范', x, y); ctx.fillText('宽', x + 1, y + 44);
    ctx.shadowBlur = 0;
    // 小印
    ctx.fillStyle = 'rgba(166,46,32,0.92)';
    ctx.fillRect(x - 10, y + 72, 20, 20);
    ctx.strokeStyle = 'rgba(240,200,170,0.7)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(x - 6, y + 78); ctx.lineTo(x + 6, y + 78); ctx.moveTo(x - 6, y + 83); ctx.lineTo(x + 4, y + 83); ctx.moveTo(x, y + 76); ctx.lineTo(x, y + 88); ctx.stroke();
    ctx.restore();
  }

  /* ---------- 渲染 ---------- */
  function render(t) {
    const { vw, vh, fx, fy, fw, fh } = L;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, vw, vh);
    // 画框
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 6;
    ctx.fillStyle = '#4a3a24'; ctx.fillRect(fx - 5, fy - 5, fw + 10, fh + 10);
    ctx.restore();
    ctx.fillStyle = '#6b5434'; ctx.fillRect(fx - 3, fy - 3, fw + 6, fh + 6);
    ctx.save();
    ctx.beginPath(); ctx.rect(fx, fy, fw, fh); ctx.clip();
    if (!art) { ctx.fillStyle = '#7a5c30'; ctx.fillRect(fx, fy, fw, fh); ctx.restore(); return; }

    // 镜头
    const cam = kfv(CAM, t);
    const z = cam[0], vwl = W / z, vhl = H / z;
    const cx = clamp(cam[1], vwl / 2, W - vwl / 2), cy = clamp(cam[2], vhl / 2, H - vhl / 2);
    const sc = fw / vwl;
    ctx.setTransform(dpr * sc, 0, 0, dpr * sc, dpr * (fx - (cx - vwl / 2) * sc), dpr * (fy - (cy - vhl / 2) * sc));
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(art.base, 0, 0, W, H);

    const fa = kf(FALL_ALPHA, t);
    drawFall(t, kf(FALL_PROG, t), fa);
    drawCascade(t, kf(FALL_PROG, t) * fa);
    drawMist('high', kf(MIST.high, t), t);
    drawMist('mid', kf(MIST.mid, t), t);
    drawMist('low', kf(MIST.low, t), t);
    drawGlints(t);
    drawWalkers(t);
    drawBirds(t);
    ctx.drawImage(art.occR.canvas, art.occR.x, art.occR.y, art.occR.w, art.occR.h);
    ctx.drawImage(art.occL.canvas, art.occL.x, art.occL.y, art.occL.w, art.occL.h);
    drawMist('foot', kf(MIST.foot, t), t);
    drawBell(t);
    drawSignature(kf(SIGN, t));

    // 屏幕空间：绢的经纬、晨昏明暗、收边
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = weave; ctx.fillRect(fx, fy, fw, fh);
    const dawn = kf(DAWN, t);
    if (dawn > 0.003) { ctx.fillStyle = 'rgba(12,18,32,' + dawn + ')'; ctx.fillRect(fx, fy, fw, fh); }
    const vg = ctx.createRadialGradient(fx + fw / 2, fy + fh / 2, Math.min(fw, fh) * 0.35, fx + fw / 2, fy + fh / 2, fh * 0.72);
    vg.addColorStop(0, 'rgba(20,12,4,0)'); vg.addColorStop(1, 'rgba(20,12,4,0.3)');
    ctx.fillStyle = vg; ctx.fillRect(fx, fy, fw, fh);
    ctx.restore();

    updateText(t);
  }

  function actOf(t) { let a = 0; for (let i = 0; i < ACT_START.length; i++) if (t >= ACT_START[i]) a = i; return a; }
  function updateText(t) {
    let ci = -1, alpha = 0;
    for (let i = 0; i < CAPTIONS.length; i++) {
      const c = CAPTIONS[i];
      if (t >= c[0] - 0.4 && t <= c[1] + 0.4) {
        ci = i; alpha = smooth(c[0] - 0.4, c[0] + 0.5, t) * (1 - smooth(c[1] - 0.4, c[1] + 0.4, t)); break;
      }
    }
    if (ci !== curCap) {
      curCap = ci;
      if (ci >= 0) { capTxt.textContent = CAPTIONS[ci][3]; capLab.textContent = ACT_NUM[CAPTIONS[ci][2]] + ' · ' + ACT_NAMES[CAPTIONS[ci][2]]; }
    }
    capEl.style.opacity = ci >= 0 ? alpha.toFixed(3) : '0';
    const act = actOf(t);
    if (act !== curAct) {
      curAct = act;
      sideEl.classList.remove('in'); void sideEl.offsetWidth;
      sideEl.textContent = ACT_NAMES[act]; sideEl.classList.add('in');
      progEl.querySelectorAll('i').forEach((el, i) => el.classList.toggle('on', i === act));
    }
  }

  /* ---------- 启动 ---------- */
  function fontLink() {
    const chars = Array.from(new Set((CAPTIONS.map(c => c[3]).join('') + ACT_NAMES.join('') + ACT_NUM.join('') + '范宽 · '))).join('');
    const l1 = document.createElement('link'); l1.rel = 'stylesheet';
    l1.href = 'https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@500&text=' + encodeURIComponent(chars);
    document.head.appendChild(l1);
  }

  function start() {
    layout();
    window.addEventListener('resize', layout);
    const K = clamp(Math.ceil(dpr * L.fw * 1.6 / 1024 * 4) / 4, 1, 1.75);
    setTimeout(() => {
      art = P.paintAll(K);
      sprites = buildSprites();
      loadEl.style.display = 'none';
      G.__ready = true;
      if (FREEZE !== null) { const f = () => render(FREEZE); f(); setTimeout(f, 600); setTimeout(f, 1500); return; }
      let t = FIRST_OFFSET, last = performance.now();
      function frame(now) {
        const dt = Math.min(0.1, (now - last) / 1000); last = now;
        t += dt; if (t >= T) t -= T;
        render(t);
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }, 30);
  }
  fontLink();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})(window);
