/* 静态画面：用代码一笔一笔“画”出溪山行旅图的基底 */
(function (G) {
  'use strict';
  const { TAU, W, H, RNG, clamp, lerp, smooth, vnoise, fbm, GW, GH, GS, Grid, boxBlur, smoothPts, polyPath, Ink } = G.U;

  const INK = '22,22,14';      // 浓墨
  const INK_G = '28,32,20';    // 偏绿的墨
  const INK_O = '72,66,38';    // 叶尖淡墨
  const INK_B = '44,34,20';    // 偏褐的墨（树干、石）

  function canvas(w, h) { const c = document.createElement('canvas'); c.width = Math.ceil(w); c.height = Math.ceil(h); return c; }

  /* 绢底色：随高度变化，雾带处偏亮 */
  function silkColor(y, n) {
    n = n || 0;
    const g = Math.exp(-Math.pow((y - 1330) / 430, 2));
    const t = clamp(0.30 + 0.62 * g + n, 0, 1);
    return [lerp(104, 166, t), lerp(78, 124, t), lerp(38, 60, t)];
  }

  function paintSilk(ctx, rng) {
    const w = 128, h = 256;
    const c = canvas(w, h), cx = c.getContext('2d'), img = cx.createImageData(w, h);
    for (let py = 0; py < h; py++) for (let px = 0; px < w; px++) {
      const x = px * 8 + 4, y = py * 8 + 4;
      const f = fbm(x * 0.0035, y * 0.0028, 4) - 0.5;
      const col = silkColor(y, f * 0.55);
      // 边缘氧化发暗
      const ed = Math.min(x, W - x) / 160, ey = Math.min(y, H - y) / 200;
      const v = 0.62 + 0.38 * smooth(0, 1, Math.min(ed, ey));
      const i = (py * w + px) * 4;
      img.data[i] = col[0] * v; img.data[i + 1] = col[1] * v; img.data[i + 2] = col[2] * v; img.data[i + 3] = 255;
    }
    cx.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(c, 0, 0, W, H);
  }

  /* —— 山石：通用“有机体”绘制 —— */
  function maskFromPoly(pts) {
    const c = canvas(GW, GH), cx = c.getContext('2d');
    cx.fillStyle = '#fff';
    cx.beginPath();
    cx.moveTo(pts[0][0] / GS, pts[0][1] / GS);
    for (let i = 1; i < pts.length; i++) cx.lineTo(pts[i][0] / GS, pts[i][1] / GS);
    cx.closePath(); cx.fill();
    const d = cx.getImageData(0, 0, GW, GH).data, m = new Float32Array(GW * GH);
    for (let i = 0; i < m.length; i++) m[i] = d[i * 4 + 3] / 255;
    return m;
  }

  function bbox(pts) {
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    for (const p of pts) { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); }
    return [x0, y0, x1, y1];
  }

  function scatter(ink, rng, o) {
    const [bx0, by0, bx1, by1] = o.box;
    let placed = 0, tries = 0;
    while (placed < o.count && tries < o.count * 14) {
      tries++;
      const x = rng.range(bx0, bx1), y = rng.range(by0, by1);
      const t = o.grid.get(x, y);
      if (t <= 0.02) continue;
      if (rng.next() > Math.pow(t, o.pw || 1) * (o.dens || 1)) continue;
      placed++;
      const a = o.angle(x, y, rng), L = rng.range(o.len[0], o.len[1]);
      const dx = Math.cos(a) * L * 0.5, dy = Math.sin(a) * L * 0.5;
      const c = rng.range(-1, 1) * (o.curve || 0);
      const nx = -Math.sin(a) * c, ny = Math.cos(a) * c;
      const al = rng.range(o.alpha[0], o.alpha[1]) * (o.tw ? lerp(1, t, o.tw) : 1);
      ink.line(o.color || INK, rng.range(o.w[0], o.w[1]), al, x - dx, y - dy, x + nx, y + ny, x + dx, y + dy);
    }
  }

  /* 断续的枯笔线（飞白） */
  function dryLine(ink, rng, pts, w, a, color) {
    let i = 0;
    while (i < pts.length - 1) {
      const n = rng.int(2, 6), j = Math.min(i + n, pts.length - 1);
      if (rng.next() > 0.16) {
        const aa = a * rng.range(0.55, 1.1), ww = w * rng.range(0.7, 1.25);
        for (let k = i; k < j; k++) {
          const p = pts[k], q = pts[k + 1];
          ink.line(color || INK, ww, aa, p[0], p[1], (p[0] + q[0]) / 2 + rng.range(-0.4, 0.4), (p[1] + q[1]) / 2, q[0], q[1]);
        }
      }
      i = j;
    }
  }

  /* 粗细变化的毛笔线：按点列画出锥形填充 */
  function brushLine(ctx, pts, w0, w1, color, a, wob, rng) {
    const n = pts.length; if (n < 2) return;
    const L = [], R = [];
    for (let i = 0; i < n; i++) {
      const p = pts[i], q = pts[Math.min(i + 1, n - 1)], o = pts[Math.max(i - 1, 0)];
      let dx = q[0] - o[0], dy = q[1] - o[1]; const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
      const t = i / (n - 1);
      const w = (lerp(w0, w1, t) * (0.75 + 0.5 * vnoise(i * 0.35 + (wob || 0), 3.3)) * (0.6 + 0.4 * Math.sin(Math.PI * Math.min(1, t * 1.15)))) / 2;
      L.push([p[0] - dy * w, p[1] + dx * w]); R.push([p[0] + dy * w, p[1] - dx * w]);
    }
    ctx.fillStyle = 'rgba(' + color + ',' + a + ')';
    ctx.beginPath(); ctx.moveTo(L[0][0], L[0][1]);
    for (let i = 1; i < n; i++) ctx.lineTo(L[i][0], L[i][1]);
    for (let i = n - 1; i >= 0; i--) ctx.lineTo(R[i][0], R[i][1]);
    ctx.closePath(); ctx.fill();
  }

  function landform(ctx, o) {
    const rng = new RNG(o.seed);
    const pts = o.smooth === false ? o.pts : smoothPts(o.pts, o.sub || 6, o.jit === undefined ? 5 : o.jit, rng, true);
    const mask = maskFromPoly(pts);
    const inner = boxBlur(mask, o.blur || 7, 2);
    const tone = new Float32Array(GW * GH);
    const helper = { fbm, vnoise, smooth, clamp, lerp };
    for (let gy = 0; gy < GH; gy++) for (let gx = 0; gx < GW; gx++) {
      const i = gy * GW + gx; const m = mask[i];
      if (m < 0.02) continue;
      const x = gx * GS + 2, y = gy * GS + 2;
      const inn = inner[i], edge = clamp((1 - inn) * 2.2, 0, 1);
      tone[i] = clamp(o.tone(x, y, inn, edge, helper), 0, 1) * m;
    }
    const grid = new Grid(tone);
    // 淡墨渲染层
    const wc = canvas(GW, GH), wx = wc.getContext('2d'), img = wx.createImageData(GW, GH);
    const col = (o.wash || INK).split(',').map(Number);
    for (let i = 0; i < tone.length; i++) {
      img.data[i * 4] = col[0]; img.data[i * 4 + 1] = col[1]; img.data[i * 4 + 2] = col[2];
      img.data[i * 4 + 3] = clamp(tone[i] * (o.washA === undefined ? 0.85 : o.washA), 0, 1) * 255;
    }
    wx.putImageData(img, 0, 0);

    ctx.save();
    polyPath(ctx, pts, true); ctx.clip();
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(wc, 0, 0, W, H);
    const box = bbox(pts);
    const ink = new Ink(ctx);
    for (const s of (o.strokes || [])) scatter(ink, rng, Object.assign({ box, grid }, s));
    if (o.inside) o.inside(ctx, ink, rng, grid, pts);
    ink.flush();
    ctx.restore();
    // 轮廓线
    if (o.rim) {
      const r = o.rim, ink2 = new Ink(ctx);
      const open = r.open;
      const rp = open ? pts.filter(p => open(p)) : pts;
      // 轮廓按段断续描边
      let seg = [];
      const emit = () => { if (seg.length > 2) { dryLine(ink2, rng, seg, r.w, r.a, r.color); if (r.w > 1.6) dryLine(ink2, rng, seg.map(p => [p[0] + rng.range(-1, 1), p[1] + rng.range(-0.5, 0.5)]), r.w * 0.55, r.a * 0.8, r.color); } seg = []; };
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (open && !open(p)) { emit(); continue; }
        seg.push(p);
      }
      emit(); ink2.flush();
    }
    return { pts, grid, mask };
  }

  /* —— 树叶团 —— */
  function foliage(ctx, ink, rng, cx, cy, rx, ry, o) {
    o = o || {};
    const dens = o.dens || 0.16, dark = o.dark === undefined ? 1 : o.dark;
    // 底墨团
    const nb = Math.max(4, Math.round(rx * ry / (o.bump || 380)));
    for (let i = 0; i < nb; i++) {
      const a = rng.range(0, TAU), r = Math.sqrt(rng.next()) * 0.6;
      const bx = cx + Math.cos(a) * rx * r, by = cy + Math.sin(a) * ry * r;
      const br = rng.range(0.2, 0.36) * Math.min(rx, ry * 1.4) + 3;
      ctx.fillStyle = 'rgba(' + (o.under || INK_G) + ',' + (0.2 * dark + 0.05) + ')';
      ctx.beginPath(); ctx.ellipse(bx, by, br * 1.15, br * 0.85, 0, 0, TAU); ctx.fill();
    }
    const n = Math.round(rx * ry * dens);
    for (let i = 0; i < n; i++) {
      const a = rng.range(0, TAU), rr = Math.pow(rng.next(), 0.55);
      const wob = 1 + (vnoise(Math.cos(a) * 2 + cx * 0.1, Math.sin(a) * 2 + cy * 0.1) - 0.5) * 0.5;
      const x = cx + Math.cos(a) * rx * rr * wob, y = cy + Math.sin(a) * ry * rr * wob;
      const up = (cy - y) / ry; // 越靠上越亮
      const lt = rng.next();
      let c = INK, al = rng.range(0.5, 0.88) * dark;
      if (lt < 0.25 + 0.35 * clamp(up, 0, 1)) { c = INK_O; al = rng.range(0.45, 0.8) * dark; }
      else if (lt < 0.45) { c = INK_G; }
      const th = rng.range(0, TAU), L = rng.range(2.5, o.leaf || 6.5);
      const dx = Math.cos(th) * L, dy = Math.sin(th) * L * 0.8;
      ink.line(c, rng.range(1.1, 2.0), al, x, y, x + dy * 0.3, y - dx * 0.3, x + dx, y + dy);
    }
  }

  /* —— 阔叶树：虬曲树干 + 一团团叶 —— */
  function drawTree(ctx, sp) {
    const rng = new RNG(sp.seed), ink = new Ink(ctx);
    const { x, y, h } = sp, lean = sp.lean || 0, dark = sp.dark === undefined ? 1 : sp.dark;
    const tH = h * (sp.trunk || 0.5), segs = 9, ph = rng.range(0, 6);
    const tp = [];
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      tp.push([x + lean * t * h * 0.35 + Math.sin(t * 3.2 + ph) * h * 0.045 * t + (t > 0.55 ? Math.sin(t * 9 + ph) * h * 0.02 : 0), y - tH * t]);
    }
    const bw = h * (sp.bw || 0.095);
    // 树干填充
    const L = [], R = [];
    for (let i = 0; i <= segs; i++) {
      const t = i / segs, w = bw * (1 - 0.6 * t) * (i === 0 ? 1.5 : 1) * (1 + 0.14 * Math.sin(i * 2.1 + ph)) / 2;
      L.push([tp[i][0] - w, tp[i][1]]); R.push([tp[i][0] + w, tp[i][1]]);
    }
    const trunk = () => { ctx.beginPath(); ctx.moveTo(L[0][0], L[0][1]); for (let i = 1; i <= segs; i++) ctx.lineTo(L[i][0], L[i][1]); for (let i = segs; i >= 0; i--) ctx.lineTo(R[i][0], R[i][1]); ctx.closePath(); };
    trunk(); ctx.fillStyle = 'rgba(' + INK_B + ',' + (0.5 * dark + 0.1) + ')'; ctx.fill();
    // 树干明暗：右侧暗
    ctx.save(); trunk(); ctx.clip();
    ctx.fillStyle = 'rgba(' + INK + ',0.28)';
    ctx.beginPath(); ctx.moveTo(tp[0][0], tp[0][1]);
    for (let i = 1; i <= segs; i++) ctx.lineTo(tp[i][0], tp[i][1]);
    for (let i = segs; i >= 0; i--) ctx.lineTo(R[i][0], R[i][1]);
    ctx.fill();
    ctx.restore();
    // 树干勾线与树皮
    dryLine(ink, rng, L, 1.3, 0.8 * dark); dryLine(ink, rng, R, 1.5, 0.85 * dark);
    for (let i = 0; i < 26; i++) {
      const t = rng.range(0.05, 0.95), k = Math.min(segs - 1, Math.floor(t * segs));
      const px = lerp(tp[k][0], tp[k + 1][0], t * segs - k), py = lerp(tp[k][1], tp[k + 1][1], t * segs - k);
      const w = bw * (1 - 0.6 * t) * 0.4;
      const dx = rng.range(-w, w), len = rng.range(3, 9);
      ink.line(INK, 0.9, 0.55 * dark, px + dx, py, px + dx * 1.2 + rng.range(-1, 1), py - len / 2, px + dx, py - len);
    }
    // 树瘤
    for (let i = 0; i < 2; i++) {
      const k = rng.int(1, 4), px = tp[k][0] + rng.range(-bw * 0.15, bw * 0.15), py = tp[k][1];
      ctx.strokeStyle = 'rgba(' + INK + ',0.6)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(px, py, bw * 0.2, bw * 0.28, 0, 0, TAU); ctx.stroke();
    }
    // 枝条
    const tips = [];
    const nb = sp.branches || rng.int(4, 6);
    const branch = (bx, by, ang, len, wd, depth) => {
      const pts = [[bx, by]]; let cx = bx, cy = by, a = ang;
      const n = 6;
      for (let i = 0; i < n; i++) {
        a += rng.range(-0.28, 0.28) + (depth === 0 ? -0.05 * Math.sign(Math.cos(ang)) : 0);
        cx += Math.cos(a) * len / n; cy += Math.sin(a) * len / n;
        pts.push([cx, cy]);
      }
      brushLine(ctx, pts, wd, wd * 0.25, INK_B, 0.82 * dark, bx, rng);
      if (depth < 1 && len > 14) {
        for (let k = 0; k < 2; k++) {
          const j = rng.int(2, 4);
          branch(pts[j][0], pts[j][1], a + (k ? 1 : -1) * rng.range(0.4, 0.9), len * rng.range(0.45, 0.7), wd * 0.55, depth + 1);
        }
      }
      tips.push([cx, cy, len]);
    };
    for (let i = 0; i < nb; i++) {
      const k = rng.int(4, segs);
      const side = i % 2 ? 1 : -1;
      const ang = -Math.PI / 2 + side * rng.range(0.45, 1.25);
      branch(tp[k][0], tp[k][1], ang, h * rng.range(0.28, 0.5), bw * 0.4 * (1 - k / segs * 0.4), 0);
    }
    tips.push([tp[segs][0], tp[segs][1] - h * 0.08, h * 0.3]);
    // 叶团
    const baseR = h * (sp.leaf || 0.2);
    ink.flush();
    for (const t of tips) {
      const r = baseR * rng.range(0.7, 1.15);
      foliage(ctx, ink, rng, t[0], t[1] - r * 0.15, r * 1.2, r * 0.82, { dens: sp.dens || 0.15, dark, leaf: sp.leafLen || 6.5 });
    }
    ink.flush();
  }

  function drawBush(ctx, sp) {
    const rng = new RNG(sp.seed), ink = new Ink(ctx);
    foliage(ctx, ink, rng, sp.x, sp.y, sp.rx, sp.ry, { dens: 0.22, dark: sp.dark || 1, leaf: 6, bump: 260 });
    ink.flush();
  }

  /* —— 松杉 —— */
  function drawConifer(ctx, sp) {
    const rng = new RNG(sp.seed), ink = new Ink(ctx);
    const { x, y, h } = sp, dark = sp.dark === undefined ? 1 : sp.dark;
    const w0 = h * 0.17;
    // 塔形暗团
    ctx.fillStyle = 'rgba(' + INK_G + ',' + 0.55 * dark + ')';
    ctx.beginPath(); ctx.moveTo(x, y - h);
    const n = 9;
    for (let i = 1; i <= n; i++) { const t = i / n; ctx.lineTo(x + w0 * t * (0.7 + 0.5 * rng.next()), y - h * (1 - t) - (i % 2 ? 0 : h * 0.025)); }
    for (let i = n; i >= 1; i--) { const t = i / n; ctx.lineTo(x - w0 * t * (0.7 + 0.5 * rng.next()), y - h * (1 - t) - (i % 2 ? 0 : h * 0.025)); }
    ctx.closePath(); ctx.fill();
    // 层层下垂的针叶
    for (let i = 0; i < h * 1.6; i++) {
      const t = rng.range(0.04, 1), yy = y - h * (1 - t), ww = w0 * t;
      const side = rng.next() < 0.5 ? -1 : 1, xx = x + side * rng.range(0, ww);
      const L = rng.range(3, 8);
      ink.line(rng.next() < 0.25 ? INK_O : INK, 1.2, rng.range(0.5, 0.9) * dark, xx, yy, xx + side * L * 0.4, yy + L * 0.2, xx + side * L, yy + L * 0.9);
    }
    ctx.strokeStyle = 'rgba(' + INK + ',0.8)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 0.5, y - h * 0.97); ctx.stroke();
    ink.flush();
  }

  /* —— 寺院 —— */
  function roof(ctx, cx, cy, hw, h, a) {
    ctx.beginPath();
    ctx.moveTo(cx - hw - 7, cy + 3);
    ctx.quadraticCurveTo(cx - hw * 0.55, cy + 1, cx - hw * 0.28, cy - h);
    ctx.lineTo(cx + hw * 0.28, cy - h);
    ctx.quadraticCurveTo(cx + hw * 0.55, cy + 1, cx + hw + 7, cy + 3);
    ctx.quadraticCurveTo(cx, cy + h * 0.45, cx - hw - 7, cy + 3);
    ctx.closePath();
    ctx.fillStyle = 'rgba(' + INK + ',' + a + ')'; ctx.fill();
    ctx.strokeStyle = 'rgba(' + INK + ',0.9)'; ctx.lineWidth = 1; ctx.stroke();
    // 瓦垄
    ctx.strokeStyle = 'rgba(150,120,60,0.35)'; ctx.lineWidth = 0.6;
    for (let i = -4; i <= 4; i++) {
      ctx.beginPath(); ctx.moveTo(cx + i * hw * 0.07, cy - h); ctx.lineTo(cx + i * hw * 0.2, cy + 2); ctx.stroke();
    }
  }
  function drawTemple(ctx) {
    const cx = 918;
    const wall = (x0, y0, x1, y1) => {
      ctx.fillStyle = 'rgba(72,58,34,0.7)'; ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
      ctx.strokeStyle = 'rgba(' + INK + ',0.75)'; ctx.lineWidth = 0.9;
      for (let x = x0 + 3; x < x1; x += 6) { ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke(); }
    };
    // 侧殿
    wall(955, 1428, 1002, 1448);
    roof(ctx, 978, 1430, 26, 9, 0.85);
    // 主阁
    wall(902, 1424, 936, 1452);
    roof(ctx, cx, 1444, 38, 11, 0.9);
    wall(905, 1404, 931, 1424);
    roof(ctx, cx, 1424, 31, 10, 0.9);
    wall(909, 1388, 927, 1404);
    roof(ctx, cx, 1405, 24, 9, 0.92);
    ctx.strokeStyle = 'rgba(' + INK + ',0.9)'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(cx, 1388); ctx.lineTo(cx, 1370); ctx.stroke();
    // 阁子里的钟（微亮）
    ctx.fillStyle = 'rgba(170,140,70,0.5)'; ctx.fillRect(914, 1411, 8, 8);
  }

  /* —— 主要山体 —— */
  const PEAK = [
    [228, 1500], [224, 1390], [214, 1300], [206, 1200], [200, 1100], [196, 1000], [190, 900], [172, 800], [142, 705], [128, 625], [150, 572], [172, 520], [168, 440], [174, 360], [186, 300],
    [200, 262], [240, 238], [300, 215], [352, 192], [402, 172], [426, 140], [432, 102], [452, 72], [500, 52], [560, 46], [610, 58], [650, 84], [704, 92], [770, 110], [800, 140],
    [812, 200], [818, 262], [862, 250], [920, 240], [968, 272], [992, 322], [1030, 362], [1030, 1500]
  ];

  const CROWNS = [ // 山顶林木团 cx,cy,rx,ry,dens
    [520, 112, 108, 60, 0.28], [468, 160, 72, 46, 0.26], [610, 100, 66, 36, 0.26], [670, 138, 90, 44, 0.26], [400, 200, 80, 40, 0.24],
    [235, 232, 70, 48, 0.26], [300, 215, 70, 40, 0.24], [350, 250, 100, 50, 0.24], [470, 262, 130, 54, 0.24], [600, 280, 120, 56, 0.24], [730, 270, 100, 52, 0.24],
    [890, 290, 90, 52, 0.28], [950, 300, 70, 46, 0.26], [820, 220, 38, 36, 0.24],
    [330, 440, 90, 52, 0.22], [250, 470, 54, 40, 0.2], [650, 405, 100, 52, 0.22], [730, 440, 70, 40, 0.22], [560, 380, 60, 32, 0.2],
    [470, 590, 120, 42, 0.18], [620, 570, 90, 36, 0.18], [335, 600, 80, 34, 0.16], [740, 600, 70, 34, 0.16],
    [905, 450, 70, 130, 0.22], [920, 600, 60, 110, 0.18], [860, 360, 40, 60, 0.2]
  ];

  function paintPeak(ctx, rng) {
    const cleftN = (x, y) => Math.exp(-Math.pow((x - 858) / 64, 2)) * smooth(300, 440, y) * smooth(1290, 1000, y);
    const res = landform(ctx, {
      seed: 11, pts: PEAK, blur: 9, sub: 5, jit: 7, washA: 0.95,
      tone: (x, y, inn, edge, h) => {
        const streak = h.fbm(x * 0.045, y * 0.0045, 3);
        const blotch = h.fbm(x * 0.008 + 5, y * 0.006, 4);
        const dd = Math.sqrt(Math.pow((x - 540) / 300, 2) + Math.pow((y - 1330) / 780, 2));
        const ring = Math.exp(-Math.pow((dd - 1.0) / 0.14, 2)) * smooth(1450, 1100, y);
        const arch = smooth(0.95, 0.55, dd) * smooth(450, 800, y) * smooth(1450, 1050, y) - 1.5 * ring;
        const band = h.fbm(x * 0.016 + 9, y * 0.0022, 3);
        let t = 0.40 + 0.30 * Math.pow(edge, 1.25) + 0.5 * smooth(1000, 300, y) - 0.27 * arch + (streak - 0.5) * 0.5 + (band - 0.5) * 0.7 + (blotch - 0.5) * 0.4 + 0.38 * cleftN(x, y) + 0.14 * smooth(880, 960, x) * smooth(380, 520, y) * smooth(1250, 900, y);
        // 左右肩的暗部（垂直折面）
        return t * smooth(1470, 1130, y) * (0.35 + 0.65 * smooth(1470, 1000, y));
      },
      strokes: [
        { count: 34000, len: [7, 26], w: [1.0, 1.9], alpha: [0.16, 0.38], curve: 2.5, pw: 0.9, tw: 0.6,
          angle: (x, y, r) => Math.PI / 2 - (x - 520) / 520 * 0.24 * smooth(300, 1300, y) + (r.next() - 0.5) * 0.42 },
        { count: 2600, len: [50, 190], w: [0.6, 1.1], alpha: [0.1, 0.24], curve: 6, pw: 1.1, tw: 0.4,
          angle: (x, y, r) => Math.PI / 2 - (x - 520) / 520 * 0.2 * smooth(300, 1300, y) + (r.next() - 0.5) * 0.12 },
        { count: 9000, len: [1.5, 3.5], w: [1.5, 2.4], alpha: [0.3, 0.55], curve: 1, pw: 1.4, dens: 0.8,
          angle: (x, y, r) => r.range(0, TAU) },
        // 斜向的小皴，打破单一竖线
        { count: 5000, len: [10, 30], w: [0.7, 1.2], alpha: [0.1, 0.22], curve: 3, pw: 1.2, tw: 0.5,
          angle: (x, y, r) => Math.PI / 2 + (x < 540 ? 1 : -1) * r.range(0.5, 1.0) * (r.next() < 0.5 ? 1 : -0.4) },
        // 枯笔露底：绢色的细丝，模拟飞白
        { count: 24000, len: [6, 20], w: [0.6, 1.2], alpha: [0.12, 0.28], curve: 2, pw: 0.9, color: '172,134,66',
          angle: (x, y, r) => Math.PI / 2 - (x - 520) / 520 * 0.24 * smooth(300, 1300, y) + (r.next() - 0.5) * 0.3 }
      ],
      inside: (ctx, ink, r, grid) => {
        // 林木团下方晕开的墨
        for (const c of CROWNS) {
          const g = ctx.createRadialGradient(c[0], c[1] + c[3] * 0.6, 0, c[0], c[1] + c[3] * 0.6, 1);
          ctx.save();
          ctx.translate(c[0], c[1] + c[3] * 0.7); ctx.scale(c[2] * 1.15, c[3] * 2.1);
          const gg = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
          gg.addColorStop(0, 'rgba(' + INK + ',0.42)'); gg.addColorStop(0.7, 'rgba(' + INK + ',0.18)'); gg.addColorStop(1, 'rgba(' + INK + ',0)');
          ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(0, 0, 1, 0, TAU); ctx.fill();
          ctx.restore();
        }
        // 山体折痕
        const creases = [];
        for (let i = 0; i < 24; i++) {
          const set = i < 11 ? 0 : 1;
          const xs = lerp(250, 800, (i % 12 + r.next() * 0.9) / 12.5);
          const ys = set === 0 ? r.range(330, 560) : r.range(620, 820);
          const ye = r.range(1050, 1400), n = 22, pts = [];
          const sgn = Math.sign(xs - 540) || 1;
          const bend = r.range(0.2, 0.6);
          for (let k = 0; k <= n; k++) {
            const t = k / n;
            pts.push([xs + (xs - 540) * bend * Math.pow(t, 1.4) + (fbm(k * 0.2 + i * 3.1, i * 1.7, 3) - 0.5) * 22 * (1 - t * 0.4) + sgn * 0 , ys + (ye - ys) * t]);
          }
          creases.push({ pts, w: r.range(1.5, 3.4) * (set ? 1 : 0.85), a: r.range(0.5, 0.8), edge: Math.abs(xs - 540) / 300 });
        }
        for (const c of creases) {
          const a = c.a * (0.4 + 0.6 * clamp(c.edge, 0, 1));
          dryLine(ink, r, c.pts, c.w, a);
          dryLine(ink, r, c.pts.map(p => [p[0] + 3.5, p[1] + 1]), c.w * 0.5, a * 0.5);
          // 折痕旁的亮面（枯墨留白感）：偏亮的细线
        }
        ink.flush();
        // 折痕旁亮笔（露出绢色）
        ctx.save(); ctx.globalCompositeOperation = 'source-over';
        for (const c of creases) {
          if (c.edge < 0.25) continue;
          const pts = c.pts.slice(3, 16).map(p => [p[0] - 4.5, p[1]]);
          ctx.strokeStyle = 'rgba(165,128,62,0.16)'; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
          ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke();
        }
        ctx.restore();
        // 层叠的岩体横向阶梯（淡）
        for (let i = 0; i < 30; i++) {
          const y = r.range(560, 1150), x = r.range(300, 760), L = r.range(40, 140);
          const t = grid.get(x, y);
          if (t < 0.1) continue;
          ink.line(INK, 1.1, 0.08 + t * 0.1, x, y, x + L / 2, y + r.range(-4, 4), x + L, y + r.range(-6, 6));
        }
        ink.flush();
      },
      rim: { w: 2.0, a: 0.78, open: p => p[1] < 1380 && p[0] < 1018 }
    });

    // 树叶：顶部与山腰
    const ink = new Ink(ctx);
    for (const c of CROWNS) {
      foliage(ctx, ink, rng, c[0], c[1], c[2], c[3], { dens: c[4] * 1.25, dark: 1.2, leaf: 6.5, bump: 260 });
      ink.flush();
    }
  }

  function paintCleft(ctx) {
    const pts = [[822, 330], [832, 420], [840, 520], [836, 600], [830, 700], [828, 800], [834, 900], [838, 1000], [840, 1100], [846, 1200], [856, 1252],
      [898, 1240], [893, 1150], [890, 1050], [880, 950], [874, 850], [869, 760], [864, 700], [860, 600], [852, 480], [850, 400], [844, 330]];
    landform(ctx, {
      seed: 31, pts, blur: 3, sub: 6, jit: 9, washA: 0.95,
      tone: (x, y, inn, edge, h) => (0.75 + 0.25 * h.fbm(x * 0.05, y * 0.01, 3)) * (0.25 + 0.75 * smooth(1260, 1000, y)),
      strokes: [
        { count: 2400, len: [10, 40], w: [0.8, 1.4], alpha: [0.25, 0.5], curve: 2, angle: (x, y, r) => Math.PI / 2 + (r.next() - 0.5) * 0.3 },
        { count: 700, len: [2, 4], w: [1.4, 2.2], alpha: [0.4, 0.7], angle: (x, y, r) => r.range(0, TAU) }
      ],
      rim: { w: 1.6, a: 0.8 }
    });
    // 峭壁两侧的石纹
    const rng = new RNG(35), ink = new Ink(ctx);
    for (let i = 0; i < 60; i++) {
      const side = i % 2 ? 1 : -1, y = rng.range(420, 1200);
      const x = (side < 0 ? 832 : 880) + side * rng.range(0, 22) + (y - 700) * 0.01;
      const L = rng.range(20, 70);
      ink.line(INK, 1.1, rng.range(0.25, 0.5), x, y, x + side * 2, y + L / 2, x + side * rng.range(-3, 4), y + L);
    }
    ink.flush();
  }

  function paintFarLeft(ctx) {
    const pts = [[0, 560], [44, 574], [96, 596], [132, 640], [138, 700], [122, 780], [108, 860], [102, 940], [96, 1000], [0, 1010]];
    landform(ctx, {
      seed: 21, pts, blur: 6, washA: 0.5,
      tone: (x, y, inn, edge, h) => (0.28 + 0.3 * edge + 0.18 * smooth(700, 560, y)) * smooth(1010, 820, y) + (h.fbm(x * 0.05, y * 0.01, 3) - 0.5) * 0.2,
      strokes: [
        { count: 3200, len: [8, 26], w: [0.8, 1.3], alpha: [0.1, 0.24], curve: 2, tw: 0.7, angle: (x, y, r) => Math.PI / 2 + 0.08 + (r.next() - 0.5) * 0.35 }
      ],
      rim: { w: 1.4, a: 0.4, open: p => p[0] > 4 && p[1] < 900 }
    });
    const rng = new RNG(22), ink = new Ink(ctx);
    foliage(ctx, ink, rng, 52, 620, 60, 40, { dens: 0.2, dark: 0.7 });
    foliage(ctx, ink, rng, 92, 640, 36, 26, { dens: 0.2, dark: 0.6 });
    ink.flush();
  }

  function paintLeftCliff(ctx) {
    const pts = [[0, 958], [60, 942], [112, 962], [150, 1004], [166, 1100], [184, 1200], [214, 1292], [228, 1380], [226, 1450], [0, 1470]];
    landform(ctx, {
      seed: 41, pts, blur: 7, jit: 5,
      tone: (x, y, inn, edge, h) => (0.32 + 0.4 * Math.pow(edge, 1.2) + 0.18 * smooth(1300, 980, y) + (h.fbm(x * 0.04, y * 0.006, 3) - 0.5) * 0.35) * smooth(1470, 1220, y),
      strokes: [
        { count: 7500, len: [7, 22], w: [0.8, 1.4], alpha: [0.15, 0.34], curve: 2, tw: 0.6, angle: (x, y, r) => Math.PI / 2 + 0.1 + (r.next() - 0.5) * 0.4 },
        { count: 700, len: [40, 150], w: [0.6, 1], alpha: [0.1, 0.22], curve: 5, tw: 0.5, angle: (x, y, r) => Math.PI / 2 + 0.07 + (r.next() - 0.5) * 0.1 },
        { count: 2000, len: [1.5, 3.5], w: [1.5, 2.3], alpha: [0.3, 0.55], pw: 1.4, angle: (x, y, r) => r.range(0, TAU) }
      ],
      rim: { w: 1.9, a: 0.75, open: p => p[0] > 4 && p[1] < 1420 }
    });
    const rng = new RNG(42), ink = new Ink(ctx);
    foliage(ctx, ink, rng, 40, 988, 80, 44, { dens: 0.26 });
    foliage(ctx, ink, rng, 110, 996, 52, 34, { dens: 0.26 });
    foliage(ctx, ink, rng, 140, 1020, 30, 24, { dens: 0.24 });
    ink.flush();
    // 崖面折痕
    const r2 = new RNG(43), ink2 = new Ink(ctx);
    for (let i = 0; i < 7; i++) {
      const xs = r2.range(60, 190), pts2 = [];
      for (let k = 0; k <= 14; k++) pts2.push([xs + k * 1.2 * r2.range(0.5, 1.2) + Math.sin(k * 0.6 + i) * 4, 1010 + k * r2.range(22, 28)]);
      dryLine(ink2, r2, pts2, r2.range(1, 1.8), r2.range(0.25, 0.45));
    }
    ink2.flush();
  }

  /* 雾（画进底图的那一层，用绢色涂出“留白”） */
  function paintHaze(ctx, rng, y0, y1, a, rx) {
    for (let i = 0; i < 140; i++) {
      const x = rng.range(-100, W + 100), y = rng.range(y0, y1);
      const r = rng.range(80, 220) * (rx || 1);
      const c = silkColor(y, 0.1);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + a + ')');
      g.addColorStop(1, 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',0)');
      ctx.fillStyle = g;
      ctx.save(); ctx.translate(x, y); ctx.scale(1.6, 0.55); ctx.translate(-x, -y);
      ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore();
    }
  }

  /* —— 中景山丘 —— */
  const MIDHILL = [
    [430, 1650], [428, 1560], [436, 1486], [456, 1432], [492, 1402], [522, 1362], [562, 1342], [622, 1334], [700, 1328], [780, 1324], [842, 1346], [882, 1372], [960, 1382], [1030, 1382],
    [1030, 1810], [960, 1800], [900, 1792], [820, 1786], [700, 1790], [620, 1796], [560, 1784], [500, 1760], [452, 1722]
  ];
  const LEFTHILL = [
    [0, 1405], [58, 1436], [112, 1478], [172, 1500], [222, 1528], [262, 1560], [302, 1604], [332, 1654], [372, 1704], [404, 1752], [424, 1796], [300, 1808], [150, 1798], [0, 1806]
  ];

  function paintMidHill(ctx) {
    landform(ctx, {
      seed: 51, pts: MIDHILL, blur: 6, jit: 6,
      tone: (x, y, inn, edge, h) => {
        const n = h.fbm(x * 0.02, y * 0.02, 4);
        let t = 0.22 + 0.4 * smooth(1360, 1800, y) + 0.25 * edge + (n - 0.5) * 0.4;
        t *= 0.6 + 0.4 * smooth(1320, 1480, y);
        return t;
      },
      strokes: [
        { count: 7000, len: [6, 22], w: [0.8, 1.5], alpha: [0.15, 0.34], curve: 2, tw: 0.6, angle: (x, y, r) => Math.PI / 2 + (x < 640 ? 0.3 : -0.2) + (r.next() - 0.5) * 0.7 },
        { count: 3500, len: [1.5, 3.5], w: [1.5, 2.4], alpha: [0.3, 0.55], pw: 1.2, angle: (x, y, r) => r.range(0, TAU) }
      ],
      rim: { w: 1.9, a: 0.78, open: p => p[1] < 1760 && p[0] < 1020 }
    });
    // 坡根的斜面石块与瀑布
    const rng = new RNG(52), ink = new Ink(ctx);
    for (let i = 0; i < 1300; i++) {
      const x = rng.range(450, 760), y = rng.range(1560, 1790);
      const a = -0.95 + rng.range(-0.25, 0.25), L = rng.range(8, 24);
      ink.line(INK, 1.1, rng.range(0.14, 0.3), x, y, x + Math.cos(a) * L * 0.5 + 1, y + Math.sin(a) * L * 0.5, x + Math.cos(a) * L, y + Math.sin(a) * L);
    }
    ink.flush();
  }

  function paintLeftHill(ctx) {
    landform(ctx, {
      seed: 61, pts: LEFTHILL, blur: 6, jit: 7,
      tone: (x, y, inn, edge, h) => {
        const n = h.fbm(x * 0.02, y * 0.02, 4);
        return (0.28 + 0.36 * smooth(1420, 1800, y) + 0.22 * edge + (n - 0.5) * 0.45) * (0.6 + 0.4 * smooth(1400, 1520, y));
      },
      strokes: [
        { count: 6500, len: [6, 22], w: [0.8, 1.5], alpha: [0.15, 0.34], curve: 2, tw: 0.6, angle: (x, y, r) => Math.PI / 2 - 0.5 + (r.next() - 0.5) * 0.8 },
        { count: 2600, len: [1.5, 3.5], w: [1.5, 2.4], alpha: [0.3, 0.55], pw: 1.2, angle: (x, y, r) => r.range(0, TAU) }
      ],
      rim: { w: 1.9, a: 0.78, open: p => p[1] < 1780 && p[0] > 4 }
    });
  }

  /* —— 前景大石 —— */
  function rockTone(x, y, inn, edge, h, top, bot) {
    const n = h.fbm(x * 0.025, y * 0.025, 4);
    return 0.5 + 0.3 * smooth(top, bot, y) + 0.2 * edge + (n - 0.5) * 0.6;
  }
  function facetAngle(x, y, r) {
    const q = Math.floor(fbm(x * 0.012 + 3, y * 0.012, 2) * 5);
    return 0.35 + q * 0.28 + (r.next() - 0.5) * 0.25 + (x < 520 ? 0 : 0.2);
  }
  const bx0 = p => Math.min(...p.map(q => q[0])), bx1 = p => Math.max(...p.map(q => q[0])), by0 = p => Math.min(...p.map(q => q[1])), by1 = p => Math.max(...p.map(q => q[1]));
  function paintRocks(ctx) {
    const A = [[190, 2060], [204, 1992], [226, 1944], [280, 1908], [352, 1886], [430, 1868], [500, 1852], [560, 1845], [622, 1854], [682, 1880], [732, 1916], [772, 1952], [802, 2002], [812, 2060]];
    const B = [[-10, 1996], [58, 1964], [138, 1976], [190, 2012], [204, 2060], [-10, 2060]];
    const C = [[740, 2060], [780, 1996], [850, 1952], [930, 1926], [1030, 1900], [1030, 2060]];
    const mk = (pts, seed, top, bot, open) => landform(ctx, {
      seed, pts, blur: 6, jit: 7, sub: 6,
      tone: (x, y, inn, edge, h) => rockTone(x, y, inn, edge, h, top, bot),
      strokes: [
        { count: 5200, len: [6, 22], w: [0.9, 1.7], alpha: [0.18, 0.42], curve: 2, tw: 0.5, angle: facetAngle },
        { count: 900, len: [20, 60], w: [0.7, 1.2], alpha: [0.12, 0.26], curve: 4, tw: 0.4, angle: facetAngle },
        { count: 2400, len: [1.5, 3.5], w: [1.6, 2.6], alpha: [0.3, 0.6], pw: 1.1, angle: (x, y, r) => r.range(0, TAU) }
      ],
      inside: (ctx, ink, r, grid) => {
        // 折线状的石缝，棱角分明
        for (let i = 0; i < 26; i++) {
          let x = r.range(bx0(pts), bx1(pts)), y = r.range(by0(pts), by1(pts));
          if (grid.get(x, y) < 0.2) continue;
          const seg = [[x, y]]; let a = r.range(0.3, 2.8);
          for (let k = 0; k < r.int(3, 6); k++) { a += r.range(-0.9, 0.9); const L = r.range(10, 30); x += Math.cos(a) * L; y += Math.sin(a) * L; seg.push([x, y]); }
          dryLine(ink, r, seg.flatMap((p, k) => k ? [[(seg[k-1][0]+p[0])/2, (seg[k-1][1]+p[1])/2], p] : [p]), r.range(1.2, 2.2), r.range(0.4, 0.7));
        }
      },
      rim: { w: 2.3, a: 0.85, open }
    });
    mk(B, 71, 1960, 2060, p => p[0] > 4 && p[1] < 2040);
    mk(C, 73, 1900, 2060, p => p[0] < 1018 && p[1] < 2040);
    mk(A, 72, 1850, 2060, p => p[1] < 2040);
    // 苔点
    const rng = new RNG(74), ink = new Ink(ctx);
    for (let i = 0; i < 160; i++) {
      const x = rng.range(250, 780), y = rng.range(1860, 1990);
      ink.line(INK, 1.8, rng.range(0.3, 0.6), x, y, x + 1, y, x + rng.range(1, 4), y + rng.range(-1, 1));
    }
    ink.flush();
  }

  /* —— 溪流与河滩 —— */
  function paintWater(ctx) {
    const rng = new RNG(81);
    // 河滩（沙洲）：路面稍亮
    ctx.save();
    const sand = [[1030, 1770], [940, 1784], [820, 1790], [700, 1796], [560, 1798], [450, 1800], [360, 1794], [300, 1778], [240, 1752], [196, 1722], [150, 1690], [110, 1655], [70, 1620], [30, 1590], [-10, 1572], [-10, 1640], [60, 1676], [110, 1716], [160, 1752], [210, 1782], [270, 1806], [360, 1822], [470, 1832], [600, 1830], [740, 1826], [880, 1822], [1030, 1816]];
    polyPath(ctx, smoothPts(sand, 5, 0, rng, true), true);
    const c = silkColor(1700, 0.2);
    ctx.fillStyle = 'rgba(' + (c[0] + 18 | 0) + ',' + (c[1] + 14 | 0) + ',' + (c[2] + 6 | 0) + ',0.3)'; ctx.fill();
    ctx.restore();
    // 水面：淡墨横线
    const ink = new Ink(ctx);
    const water = (x0, x1, y0, y1, n, a) => {
      for (let i = 0; i < n; i++) {
        const y = rng.range(y0, y1), x = rng.range(x0, x1), L = rng.range(18, 90);
        ink.line(INK, rng.range(0.5, 1.0), rng.range(a * 0.5, a), x, y, x + L / 2, y + rng.range(-1, 1), x + L, y + rng.range(-1.5, 1.5));
      }
    };
    water(300, 1030, 1822, 1866, 260, 0.16);
    // 左侧的深水
    const lake = [[-10, 1866], [90, 1872], [190, 1890], [240, 1900], [200, 1940], [100, 1952], [-10, 1962]];
    landform(ctx, {
      seed: 82, pts: lake, blur: 3, jit: 3, washA: 0.6,
      tone: (x, y, inn, edge, h) => 0.45 + 0.3 * edge + (h.fbm(x * 0.04, y * 0.1, 2) - 0.5) * 0.3,
      strokes: [{ count: 500, len: [30, 90], w: [0.6, 1.1], alpha: [0.1, 0.25], curve: 0.5, angle: (x, y, r) => (r.next() - 0.5) * 0.06 }],
      rim: { w: 1.2, a: 0.5, open: p => p[1] < 1900 }
    });
    ink.flush();
  }

  /* —— 中景小瀑布和溪口 —— */
  function paintCascade(ctx) {
    const rng = new RNG(91), ink = new Ink(ctx);
    // 坡上白练：以留白+淡墨表现
    for (let i = 0; i < 26; i++) {
      const x = 436 + rng.range(0, 62), y0 = 1640 + rng.range(0, 30), L = rng.range(30, 70);
      ink.line(INK, 0.8, rng.range(0.15, 0.3), x, y0, x + rng.range(-3, 3), y0 + L / 2, x + rng.range(-6, 2), y0 + L);
    }
    ink.flush();
    for (let i = 0; i < 6; i++) {
      const x = 452 + i * 10 + rng.range(-3, 3);
      ctx.strokeStyle = 'rgba(200,170,100,0.22)'; ctx.lineWidth = 2.5 + rng.range(0, 3);
      ctx.beginPath(); ctx.moveTo(x, 1640); ctx.lineTo(x + rng.range(-4, 2), 1745); ctx.stroke();
    }
  }

  /* —— 色晕：印章 —— */
  function seal(ctx, x, y, w, h, rng, a) {
    ctx.save();
    ctx.globalAlpha = a;
    ctx.fillStyle = 'rgb(150,40,28)';
    ctx.beginPath();
    const n = 14;
    ctx.moveTo(x, y);
    for (let i = 1; i <= n; i++) ctx.lineTo(x + w * i / n, y + rng.range(-0.8, 0.8));
    for (let i = 1; i <= n; i++) ctx.lineTo(x + w + rng.range(-0.8, 0.8), y + h * i / n);
    for (let i = 1; i <= n; i++) ctx.lineTo(x + w - w * i / n, y + h + rng.range(-0.8, 0.8));
    for (let i = 1; i <= n; i++) ctx.lineTo(x + rng.range(-0.8, 0.8), y + h - h * i / n);
    ctx.fill();
    ctx.strokeStyle = 'rgba(210,150,110,0.55)'; ctx.lineWidth = 1.2;
    for (let i = 0; i < Math.round(h / 8); i++) {
      const yy = y + 5 + i * 8 + rng.range(-1, 1);
      ctx.beginPath(); ctx.moveTo(x + 4, yy); ctx.lineTo(x + w - 4 - rng.range(0, w * 0.5), yy + rng.range(-1, 1)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + w * 0.5, yy - 2); ctx.lineTo(x + w * 0.5 + rng.range(-3, 3), yy + 4); ctx.stroke();
    }
    ctx.restore();
  }

  function paintAging(ctx, rng) {
    // 水渍、老化斑
    for (let i = 0; i < 26; i++) {
      const x = rng.range(0, W), y = rng.range(0, H), r = rng.range(60, 240);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      const dark = rng.next() < 0.7;
      g.addColorStop(0, dark ? 'rgba(60,40,15,0.07)' : 'rgba(210,170,90,0.07)');
      g.addColorStop(1, 'rgba(60,40,15,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    }
    // 绢缝（竖向的细亮痕）
    for (const sx of [338, 684]) {
      ctx.strokeStyle = 'rgba(210,175,100,0.14)'; ctx.lineWidth = 1.4;
      ctx.beginPath(); for (let y = 0; y <= H; y += 24) ctx.lineTo(sx + Math.sin(y * 0.01 + sx) * 1.2, y); ctx.stroke();
      ctx.strokeStyle = 'rgba(40,28,10,0.12)'; ctx.lineWidth = 1;
      ctx.beginPath(); for (let y = 0; y <= H; y += 24) ctx.lineTo(sx + 2 + Math.sin(y * 0.01 + sx) * 1.2, y); ctx.stroke();
    }
    // 划痕：旧绢常见的白色折痕
    for (let i = 0; i < 220; i++) {
      const x = rng.range(0, W), y = rng.range(0, H), L = rng.range(8, 60);
      const a = Math.PI / 2 + rng.range(-0.5, 0.5) * (rng.next() < 0.3 ? 3 : 0.3);
      ctx.strokeStyle = 'rgba(215,190,130,' + rng.range(0.05, 0.16) + ')'; ctx.lineWidth = rng.range(0.6, 1.4);
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); ctx.stroke();
    }
    // 印章
    seal(ctx, 22, 28, 30, 62, rng, 0.62);
    seal(ctx, 28, 360, 24, 42, rng, 0.45);
    seal(ctx, 972, 20, 28, 40, rng, 0.5);
    seal(ctx, 980, 1900, 30, 52, rng, 0.55);
    // 边缘暗角
    const g = ctx.createLinearGradient(0, 0, W, 0);
    g.addColorStop(0, 'rgba(30,18,6,0.34)'); g.addColorStop(0.06, 'rgba(30,18,6,0)'); g.addColorStop(0.94, 'rgba(30,18,6,0)'); g.addColorStop(1, 'rgba(30,18,6,0.34)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const g2 = ctx.createLinearGradient(0, 0, 0, H);
    g2.addColorStop(0, 'rgba(30,18,6,0.3)'); g2.addColorStop(0.05, 'rgba(30,18,6,0)'); g2.addColorStop(0.96, 'rgba(30,18,6,0)'); g2.addColorStop(1, 'rgba(30,18,6,0.34)');
    ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
  }

  /* 树木布局：[x, 根部y, 高, 倾斜, seed, 暗度, 是否遮挡层] */
  const TREES = [
    // 中景山丘
    { x: 532, y: 1500, h: 130, lean: -0.5, seed: 101 },
    { x: 612, y: 1566, h: 150, lean: 0.4, seed: 102 },
    { x: 690, y: 1504, h: 120, lean: -0.3, seed: 103 },
    { x: 760, y: 1600, h: 190, lean: 0.2, seed: 104, bw: 0.085 },
    { x: 836, y: 1544, h: 140, lean: -0.4, seed: 105 },
    { x: 650, y: 1664, h: 130, lean: -0.6, seed: 106 },
    { x: 575, y: 1716, h: 100, lean: 0.5, seed: 107 },
    { x: 860, y: 1708, h: 150, lean: 0.5, seed: 108 },
    { x: 724, y: 1700, h: 140, lean: -0.2, seed: 109 },
    { x: 905, y: 1600, h: 190, lean: 0.4, seed: 110, bw: 0.085 },
    { x: 962, y: 1650, h: 210, lean: -0.3, seed: 111, bw: 0.09 },
    { x: 484, y: 1566, h: 100, lean: 0.4, seed: 112 },
    { x: 1000, y: 1760, h: 180, lean: 0.2, seed: 113, bw: 0.09, occ: 'R' },
    { x: 940, y: 1782, h: 150, lean: -0.5, seed: 114, bw: 0.085, occ: 'R' },
    { x: 578, y: 1440, h: 90, lean: 0.3, seed: 131 },
    { x: 650, y: 1420, h: 100, lean: -0.3, seed: 132 },
    { x: 722, y: 1410, h: 95, lean: 0.4, seed: 133 },
    { x: 790, y: 1440, h: 110, lean: -0.2, seed: 134 },
    { x: 850, y: 1480, h: 120, lean: 0.3, seed: 135 },
    { x: 940, y: 1500, h: 130, lean: -0.3, seed: 136 },
    { x: 1005, y: 1520, h: 140, lean: -0.4, seed: 137 },
    { x: 470, y: 1640, h: 90, lean: 0.5, seed: 138 },
    { x: 520, y: 1690, h: 90, lean: -0.3, seed: 139 },
    { x: 680, y: 1760, h: 100, lean: 0.4, seed: 140 },
    { x: 800, y: 1740, h: 120, lean: -0.5, seed: 141 },
    { x: 990, y: 1700, h: 160, lean: 0.3, seed: 142, bw: 0.09 },
    { x: 880, y: 1770, h: 110, lean: 0.4, seed: 143 },
    // 左边山坡
    { x: 22, y: 1520, h: 150, lean: 0.4, seed: 121 },
    { x: 96, y: 1522, h: 120, lean: -0.4, seed: 122 },
    { x: 160, y: 1560, h: 110, lean: 0.3, seed: 123 },
    { x: 214, y: 1596, h: 110, lean: -0.3, seed: 124 },
    { x: 262, y: 1650, h: 100, lean: 0.4, seed: 125 },
    { x: 330, y: 1710, h: 90, lean: -0.5, seed: 126 },
    { x: 60, y: 1620, h: 150, lean: 0.4, seed: 127, occ: 'L' },
    { x: 118, y: 1668, h: 120, lean: -0.5, seed: 128, occ: 'L' },
    { x: 196, y: 1718, h: 110, lean: 0.4, seed: 129, occ: 'L' },
    { x: 262, y: 1756, h: 90, lean: -0.3, seed: 130, occ: 'L' },
    { x: 8, y: 1580, h: 130, lean: 0.3, seed: 144 },
    { x: 60, y: 1470, h: 100, lean: -0.3, seed: 145 },
    { x: 130, y: 1486, h: 90, lean: 0.4, seed: 146 },
    { x: 190, y: 1520, h: 90, lean: -0.4, seed: 147 },
    { x: 300, y: 1690, h: 80, lean: 0.5, seed: 148 },
    { x: 30, y: 1690, h: 90, lean: 0.2, seed: 149 }
  ];
  const BUSH_R = [{ x: 1006, y: 1752, rx: 48, ry: 40, seed: 201 }, { x: 944, y: 1764, rx: 40, ry: 30, seed: 202 }];
  const BUSH_L = [{ x: 272, y: 1748, rx: 40, ry: 42, seed: 211 }, { x: 206, y: 1708, rx: 46, ry: 50, seed: 212 }, { x: 138, y: 1664, rx: 50, ry: 52, seed: 213 }, { x: 72, y: 1614, rx: 54, ry: 54, seed: 214 }];
  const CONIFERS = [
    { x: 500, y: 1412, h: 120, seed: 301 }, { x: 536, y: 1396, h: 112, seed: 302 }, { x: 562, y: 1384, h: 84, seed: 303 }, { x: 596, y: 1372, h: 62, seed: 304 },
    { x: 640, y: 1362, h: 100, seed: 305 }, { x: 668, y: 1352, h: 78, seed: 306 }, { x: 702, y: 1360, h: 64, seed: 307 },
    { x: 985, y: 1386, h: 86, seed: 308 }, { x: 1010, y: 1380, h: 70, seed: 309 }
  ];

  function paintAll(K, progress) {
    const t0 = performance.now();
    const base = canvas(W * K, H * K), ctx = base.getContext('2d');
    ctx.scale(K, K);
    const rng = new RNG(7);
    paintSilk(ctx, rng);
    paintFarLeft(ctx);
    paintLeftCliff(ctx);
    paintPeak(ctx, rng);
    paintCleft(ctx);
    // 山脚的雾
    paintHaze(ctx, new RNG(5), 1190, 1420, 0.1, 1.0);
    paintHaze(ctx, new RNG(6), 1380, 1560, 0.07, 1.2);
    paintMidHill(ctx);
    paintCascade(ctx);
    paintLeftHill(ctx);
    paintWater(ctx);
    // 远处松杉
    for (const c of CONIFERS) drawConifer(ctx, c);
    drawTemple(ctx);
    // 树：按根部 y 从远到近
    const order = TREES.slice().sort((a, b) => a.y - b.y);
    for (const t of order) drawTree(ctx, t);
    for (const b of BUSH_R) drawBush(ctx, b);
    for (const b of BUSH_L) drawBush(ctx, b);
    paintRocks(ctx);
    paintAging(ctx, new RNG(99));

    // 遮挡层：右、左两处林子，用来让驮队“从林中走出”“走进山中”
    const mkOcc = (x, y, w, h, trees, bushes) => {
      const c = canvas(w * K, h * K), cx = c.getContext('2d');
      cx.setTransform(K, 0, 0, K, -x * K, -y * K);
      for (const t of trees.slice().sort((a, b) => a.y - b.y)) drawTree(cx, t);
      for (const b of bushes) drawBush(cx, b);
      return { canvas: c, x, y, w, h };
    };
    const occR = mkOcc(860, 1480, 164, 340, TREES.filter(t => t.occ === 'R'), BUSH_R);
    const occL = mkOcc(0, 1480, 340, 330, TREES.filter(t => t.occ === 'L'), BUSH_L);
    console.log('painted in', Math.round(performance.now() - t0), 'ms');
    return { base, occR, occL };
  }

  G.Paint = { paintAll, silkColor, canvas, drawTree, INK };
})(window);
