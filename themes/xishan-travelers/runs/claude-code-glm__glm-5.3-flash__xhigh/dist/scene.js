'use strict';
/* ============================================================
 * scene.js —— 依《溪山行旅图》构图，纯代码造出一幅绢本水墨
 * 主峰顶天 / 右侧飞瀑 / 山腰云断 / 中景林寺 / 溪路驮道 / 巨石前横
 * 画法：湿笔铺底 → 雨点皴、豆瓣皴密点 → 枯笔飞白 → 勾勒收边
 * ============================================================ */
const SCENE = (() => {
  const { srand, rnd, rr, ri, clamp, lerp, fbm1, PAL, C, layer,
          roughPath, stroke, dryStroke, dot, blot, inkBlot, silkBase, seal } = INK;

  const DW = 1200, DH = 2400;      // 设计坐标
  const PS = 1.2;                  // 绘制精度
  const PW = Math.round(DW * PS), PH = Math.round(DH * PS);

  srand(20240517);

  /* ---------------- 构图数据 ---------------- */
  const PEAK = [
    [60,1568],[88,1478],[104,1392],[114,1298],[120,1198],[124,1096],[127,992],[130,888],
    [136,786],[148,690],[166,606],[190,532],[220,468],[256,414],[296,368],[338,318],
    [380,290],[430,236],[472,208],[520,160],[566,128],[612,96],[656,86],[700,98],
    [738,88],[786,104],[824,136],[872,168],[908,214],[948,262],[980,318],[1010,380],
    [1036,448],[1056,520],[1068,600],[1072,690],[1070,768],[1064,848],[1056,930],
    [1048,1014],[1042,1098],[1038,1182],[1036,1264],[1036,1344],[1038,1420],
    [1042,1492],[1046,1568]
  ];
  const RREDGE = [
    [1052,700],[1096,662],[1146,636],[1197,620],[1197,1568],[1086,1568],
    [1064,1330],[1052,1080],[1046,860]
  ];
  const CROWN_BOT = [
    [296,462],[352,520],[414,576],[478,622],[544,652],[612,666],[682,660],[750,636],
    [814,602],[876,586],[936,606],[988,656],[1032,712],[1062,764]
  ];
  // 左肩岩台（峰腰左出的一道石台，上置树木）
  const LEDGE = [[36,1014],[84,996],[134,996],[168,1012],[162,1034],[118,1046],
                 [66,1042],[36,1030]];
  const LCLIFF = [
    [0,1568],[52,1552],[104,1556],[150,1580],[186,1616],[210,1662],[222,1714],
    [220,1768],[204,1822],[178,1872],[144,1916],[102,1952],[54,1976],[0,1988],[0,2080]
  ];
  const OUTCROP = [
    [470,1782],[498,1736],[530,1694],[566,1656],[606,1624],[640,1590],[672,1560],
    [706,1534],[744,1516],[786,1506],[830,1510],[872,1496],[916,1484],[962,1478],
    [1008,1474],[1054,1478],[1098,1488],[1142,1502],[1197,1518],[1197,1962],
    [1100,1976],[1000,1988],[900,1996],[810,2000],[724,1994],[650,1978],[580,1956],
    [520,1926],[486,1888],[470,1846]
  ];
  const ROCK_LBIG  = [[0,2076],[70,2046],[150,2030],[228,2044],[290,2082],[330,2136],
                      [344,2200],[338,2270],[306,2334],[252,2380],[180,2400],[0,2400]];
  const ROCK_LMID  = [[196,1988],[268,1954],[342,1966],[398,2004],[410,2052],[368,2092],
                      [292,2108],[222,2094],[188,2044]];
  const ROCK_GIANT = [[770,2148],[880,2100],[996,2078],[1110,2092],[1200,2136],
                      [1200,2400],[770,2400]];
  const STREAM = [[340,2122],[520,2100],[700,2108],[806,2140],[778,2204],[640,2234],
                  [480,2218],[382,2182]];
  const PATH = [[1197,1972],[1108,1962],[1010,1968],[906,1978],[806,1990],[706,2002],
                [608,2014],[512,2026],[420,2036],[336,2044],[268,2044],[216,2032],
                [186,2004],[172,1968],[162,1928]];

  const FALL = { x: 944, top: 762, bot: 1430, w: 17 };
  const TEMPLE = { x: 998, y: 1620 };
  const BIRD_SPOTS = [[764,1506],[920,1490],[1036,1498],[660,1524]];

  /* ---------------- 影调底 + 雨点皴 ---------------- */
  function shadeCtx() { const c = layer(PW, PH); const g = c.getContext('2d', { willReadFrequently: true }); g.scale(PS, PS); return { c, g }; }

  function form(sg, pts, tone, paint, ns, jag = 9) {
    const g = sg.g;
    g.save();
    roughPath(g, pts, { jag, step: 10, ns, close: true });
    g.clip();
    g.fillStyle = tone; g.fillRect(0, 0, DW, DH);
    paint(g);
    g.restore();
  }

  // 山体明暗：受光面、阴影面，再以大团湿墨破其平整
  function rockLight(g, x0, x1, y0, y1, ns, hi = .5, lo = .62, canopyY = 0) {
    let gr = g.createLinearGradient(x0, y0, x1, y1);
    gr.addColorStop(0, C(PAL.rockHi, hi * .5));
    gr.addColorStop(.45, C(PAL.rockHi, 0));
    gr.addColorStop(1, C(PAL.rockLo, lo * .72));
    g.fillStyle = gr; g.fillRect(x0 - 40, y0 - 40, x1 - x0 + 80, y1 - y0 + 80);
    gr = g.createLinearGradient(x0, y0, x0, y1);
    gr.addColorStop(0, C(PAL.rockLo, lo * .5));
    gr.addColorStop(.4, C(PAL.rockLo, 0));
    g.fillStyle = gr; g.fillRect(x0 - 40, y0 - 40, x1 - x0 + 80, y1 - y0 + 80);
    // 峰顶林冠压下的阴影（上重下轻，过渡要缓）
    if (canopyY) {
      gr = g.createLinearGradient(0, canopyY - 80, 0, canopyY + 560);
      gr.addColorStop(0, C(PAL.ink, 0));
      gr.addColorStop(.22, C(PAL.ink, .34));
      gr.addColorStop(1, C(PAL.ink, 0));
      g.fillStyle = gr; g.fillRect(x0 - 40, canopyY - 80, x1 - x0 + 80, 640);
    }
    // 大块湿墨（让大片坡面有浓淡呼吸）
    for (let i = 0; i < 12; i++) {
      const bx = lerp(x0, x1, rnd()), by = lerp(y0, y1, rnd());
      inkBlot(g, bx, by, rr(30, 100), rr(60, 170), rnd() < .68 ? PAL.ink : PAL.rockHi,
              rnd() < .68 ? rr(.07, .18) : rr(.05, .12), 5, ns + i * 3);
    }
  }

  // 长短节理（垂直皴缝，兼淡墨拖带）
  function crevices(g, x0, x1, y0, y1, n, ns, a = .4) {
    for (let i = 0; i < n; i++) {
      const bx = lerp(x0, x1, (i + rr(.15, .85)) / n);
      const top = y0 + rr(-60, 160), bot = y1 - rr(0, 220);
      const pts = [];
      for (let y = top; y <= bot; y += 24)
        pts.push([bx + (fbm1(y * .013 + i * 7, ns) - .5) * 26, y]);
      stroke(g, pts, { w: rr(1.8, 4), col: PAL.ink2, a: a * rr(.45, .9), taper: .2, jitter: 2.4, ns: ns + i });
      // 皴缝旁的淡墨拖带
      stroke(g, pts.map(p => [p[0] + rr(3, 7), p[1] + rr(0, 8)]),
        { w: rr(3, 6), col: PAL.ink3, a: a * .28, taper: .4, jitter: 4, ns: ns + i + 40 });
      if (rnd() < .5) dryStroke(g, pts, { w: 5, col: PAL.ink3, a: .18, n: 3, gap: .5, ns: ns + 3 });
    }
  }

  // 雨点皴：读影调图，浓处密、亮处疏，兼点受光碎点
  function texturePass(g, sg, bx0, by0, bx1, by1, opt = {}) {
    const { step = 2.9, base = .8, size = 1.9 } = opt;
    const x0 = Math.max(0, Math.floor(bx0 * PS)), y0 = Math.max(0, Math.floor(by0 * PS));
    const w = Math.min(PW, Math.ceil(bx1 * PS)) - x0, h = Math.min(PH, Math.ceil(by1 * PS)) - y0;
    if (w <= 0 || h <= 0) return;
    const img = sg.g.getImageData(x0, y0, w, h).data;
    const buckets = new Map();
    const put = (a, x, y, rw, rh) => {
      const k = a < 0 ? -1 : Math.min(8, Math.round(a * 8));
      if (!buckets.has(k)) buckets.set(k, []);
      buckets.get(k).push([x, y, rw, rh]);
    };
    for (let py = 0; py < h; py += step * PS) {
      for (let px = 0; px < w; px += step * PS) {
        const ix = (Math.floor(py) * w + Math.floor(px)) * 4 + 3;
        if (img[ix] < 70) continue;
        const r = img[ix - 3], gg = img[ix - 2], b = img[ix - 1];
        const lum = (r * .5 + gg * .42 + b * .08) / 255;
        const dark = 1 - lum;
        const dx = x0 / PS + px / PS, dy = y0 / PS + py / PS;
        if (rnd() < .05 + lum * .38) continue;             // 亮处留白
        const s = (1.1 + dark * 3.4) * size * rr(.6, 1.4);
        put(base * (.32 + dark * .68) * rr(.45, 1), dx + rr(-1.6, 1.6), dy + rr(-1.6, 1.6), s * .75, s * 1.9);
        if (dark < .34 && rnd() < .14)                     // 枯笔碎点（干擦）
          put(base * .55, dx + rr(-2.4, 2.4), dy + rr(-3, 3), s * .5, s * rr(2.4, 4.2));
        if (lum > .68 && rnd() < .3)                       // 石面受光碎点
          put(-1, dx + rr(-2.8, 2.8), dy + rr(-2.8, 2.8), s * .85, s * .75);
      }
    }
    for (const [k, arr] of buckets) {
      g.fillStyle = k === -1 ? C(PAL.silkHi, .19) : C(PAL.ink, .04 + k * .055);
      g.beginPath();
      for (const [x, y, rw, rh] of arr) g.rect(x, y, rw, rh);
      g.fill();
    }
  }

  // 勾勒收边（山石轮廓，毛而不滑）
  function edgeStroke(g, pts, opt = {}) {
    const { w = 2.2, a = .5, jag = 5, ns = 5, skip = .12, double = true } = opt;
    const P = pts.map(p => p.slice());
    for (let i = 0; i < P.length - 1; i++) {
      if (rnd() < skip) continue;                          // 意到笔不到
      const seg = [P[i], [(P[i][0] + P[i + 1][0]) / 2, (P[i][1] + P[i + 1][1]) / 2], P[i + 1]];
      stroke(g, seg, { w: w * rr(.7, 1.2), col: PAL.ink, a: a * rr(.6, 1), taper: .5, jitter: jag, ns: ns + i });
      if (double && rnd() < .5)
        stroke(g, [[seg[1][0] + rr(2, 5), seg[1][1] + rr(2, 5)], seg[2]],
          { w: w * .8, col: PAL.ink2, a: a * .5, taper: .3, jitter: jag, ns: ns + i + 60 });
    }
  }

  /* ---------------- 草木 ---------------- */
  function leafCluster(g, x, y, r, a = .8) {
    inkBlot(g, x, y, r * .95, r * .8, PAL.ink, a * .68, 5, ri(1, 99));
    const n = 44 + r * 3.4 | 0;
    for (let i = 0; i < n; i++) {
      const t = rnd() * 6.28, d = Math.sqrt(rnd()) * r;
      dot(g, x + Math.cos(t) * d * 1.12, y + Math.sin(t) * d * .85,
          rr(1.4, 4.4), PAL.ink, a * rr(.5, 1));
    }
    for (let i = 0; i < n * .14; i++) {
      const t = rnd() * 6.28, d = Math.sqrt(rnd()) * r * .9;
      dot(g, x + Math.cos(t) * d, y + Math.sin(t) * d * .8, rr(.9, 2.2), PAL.silkHi, .3);
    }
  }

  function tree(g, x, y, h, lean = 0, a = .88) {
    const fork = (bx, by, ang, len, w0, depth) => {
      const pts = []; let cx = bx, cy = by, a2 = ang;
      const seg = Math.max(3, len / 9 | 0);
      for (let i = 0; i < seg; i++) {
        a2 += (fbm1(i * 2.7 + bx, depth + 3) - .5) * .8;
        const nx = cx + Math.cos(a2) * len / seg, ny = cy + Math.sin(a2) * len / seg;
        pts.push([cx, cy]); cx = nx; cy = ny;
      }
      pts.push([cx, cy]);
      stroke(g, pts, { w: w0, col: PAL.silkHi, a: a * .75, taper: .8 });
      stroke(g, pts, { w: w0 * .4, col: PAL.silkHi, a: a * .9, taper: .8 });
      if (depth < 2) {
        const k = ri(2, 3);
        for (let i = 0; i < k; i++) {
          const t = rr(.35, .85), p = pts[Math.min(pts.length - 1, t * seg | 0)];
          leafCluster(g, p[0] + rr(-4, 4), p[1] + rr(-7, 2), rr(11, 22), a * .92);
          if (i === 0) fork(p[0], p[1], a2 + rr(-1.5, 1.5) - .5, len * rr(.45, .7), w0 * .5, depth + 1);
        }
      } else leafCluster(g, cx, cy, rr(8, 14), a * .9);
    };
    fork(x, y, -Math.PI / 2 + lean, h, 3.6, 0);
  }

  function conifer(g, x, y, h, a = .9) {
    stroke(g, [[x, y], [x + rr(-2, 2), y - h]], { w: 2.2, col: PAL.silkHi, a: a * .5, taper: .7 });
    const lv = 10;
    for (let i = 0; i < lv; i++) {
      const t = i / lv, yy = y - h * t, wd = (1 - t * .8) * h * .32;
      for (const s of [-1, 1]) {
        const pts = [[x, yy], [x + s * wd * .6, yy + 2.4], [x + s * wd, yy + 5 + t * 4]];
        stroke(g, pts, { w: 1.8, col: PAL.ink, a: a * .85, taper: .3, jitter: 1.2 });
      }
      dot(g, x, yy, 1.8, PAL.ink, a);
    }
    leafCluster(g, x, y - h - 2, 6, a);
  }

  function shrubs(g, pts, r0, r1, a = .85) {
    for (const [x, y] of pts) leafCluster(g, x + rr(-6, 6), y + rr(-4, 4), rr(r0, r1), a);
  }

  // 林线：沿山脊铺一条墨林带，再叠树头
  function treeline(g, pts, d0, d1, ns, a = .93) {
    const band = pts.concat(pts.slice().reverse().map(([x, y]) =>
      [x + rr(-5, 5), y + d0 + fbm1(x * .03, ns) * (d1 - d0)]));
    g.save();
    roughPath(g, band, { jag: 7, step: 10, ns: ns + 1, close: true });
    g.fillStyle = C(PAL.ink, a); g.fill();
    g.restore();
    for (let i = 0; i < pts.length - 1; i++) {
      const t = rr(.1, .9);
      leafCluster(g, lerp(pts[i][0], pts[i + 1][0], t) + rr(-5, 5),
                     lerp(pts[i][1], pts[i + 1][1], t) + rr(-6, 6), rr(9, 17), a);
    }
  }

  /* ---------------- 殿阁 ---------------- */
  function roof(g, cx, y, w, h) {
    g.save();
    // 前坡面：梯形，坡边微凹，两端起翘
    g.beginPath();
    g.moveTo(cx - w / 2, y);
    g.quadraticCurveTo(cx - w * .30, y - h * .62, cx - w * .15, y - h);
    g.lineTo(cx + w * .15, y - h);
    g.quadraticCurveTo(cx + w * .30, y - h * .62, cx + w / 2, y);
    g.closePath();
    g.fillStyle = C(PAL.ink, .88); g.fill();
    g.strokeStyle = C(PAL.silkHi, .75); g.lineWidth = 1.2; g.stroke();
    // 正脊与两端鸱吻
    g.strokeStyle = C(PAL.ink, .92); g.lineWidth = 2.6;
    g.beginPath(); g.moveTo(cx - w * .15, y - h); g.lineTo(cx + w * .15, y - h); g.stroke();
    g.lineWidth = 1.4; g.strokeStyle = C(PAL.ink, .85);
    g.beginPath(); g.moveTo(cx - w * .15, y - h); g.lineTo(cx - w * .21, y - h - 3.4); g.stroke();
    g.beginPath(); g.moveTo(cx + w * .15, y - h); g.lineTo(cx + w * .21, y - h - 3.4); g.stroke();
    // 檐口勾出瓦线
    g.strokeStyle = C(PAL.silkHi, .4); g.lineWidth = .8;
    for (let i = 1; i < 4; i++) {
      const t = i / 4;
      g.beginPath();
      g.moveTo(lerp(cx - w * .42, cx - w * .13, t), y - h * t * .96);
      g.lineTo(lerp(cx + w * .13, cx + w * .42, t) - w * .0, y - h * t * .96);
      g.stroke();
    }
    g.restore();
  }
  function temple(g, x, y) {
    blot(g, x, y - 24, 56, PAL.silkHi, .13);   // 林中透亮，殿宇得以显
    g.fillStyle = C(PAL.rockLo, .85);
    g.fillRect(x - 56, y - 6, 112, 10);
    roof(g, x, y - 5, 122, 32);           // 下檐
    g.fillStyle = C(PAL.rockHi, .5); g.fillRect(x - 34, y - 38, 68, 18);
    roof(g, x, y - 32, 82, 26);           // 上檐
    roof(g, x - 74, y + 2, 40, 14);       // 侧院
    roof(g, x + 70, y, 34, 12);
    g.strokeStyle = C(PAL.silkHi, .55); g.lineWidth = 1;
    g.beginPath(); g.moveTo(x - 34, y - 19); g.lineTo(x + 34, y - 19); g.stroke();
  }

  /* ---------------- 泉瀑溪水 ---------------- */
  function waterfall(g) {
    const { x, top, bot, w } = FALL;
    // 瀑身石缝：上窄下宽的深暗，边缘晕散
    const cx0 = x - 44, cx1 = x + 44;
    for (let i = 0; i < 26; i++) {
      const t = i / 25, yy = lerp(top - 40, bot + 70, t);
      const half = lerp(20, 46, t) * rr(.8, 1.2);
      blot(g, x + rr(-half, half) * .6, yy, rr(14, 30), PAL.ink, rr(.12, .3));
    }
    g.save();
    roughPath(g, [[cx0 + 12, top - 46], [cx0 + 4, top + 120], [cx0 - 2, top + 420], [cx0 + 2, bot + 80],
                  [cx1 - 2, bot + 80], [cx1 - 4, top + 400], [cx1 - 6, top + 100], [cx1 - 10, top - 46]],
      { jag: 6, step: 11, ns: 31, close: true });
    g.clip();
    const gr = g.createLinearGradient(cx0, 0, cx1, 0);
    gr.addColorStop(0, C(PAL.rockLo, .25)); gr.addColorStop(.32, C(PAL.ink, .82));
    gr.addColorStop(.68, C(PAL.ink, .82)); gr.addColorStop(1, C(PAL.rockLo, .25));
    g.fillStyle = gr; g.fillRect(cx0 - 20, top - 60, cx1 - cx0 + 40, bot - top + 200);
    crevices(g, cx0 + 4, cx0 + 22, top, bot, 3, 37, .5);
    crevices(g, cx1 - 22, cx1 - 4, top, bot, 3, 41, .5);
    g.restore();
    // 瀑水（细而直，微有摆荡）
    g.save();
    roughPath(g, [[x - w * .42, top], [x - w * .55, top + (bot - top) * .5], [x - w * .6, bot],
                  [x + w * .6, bot], [x + w * .55, top + (bot - top) * .45], [x + w * .42, top]],
      { jag: 3, step: 9, ns: 43, close: true });
    g.clip();
    const wg = g.createLinearGradient(x, top, x, bot);
    wg.addColorStop(0, C(PAL.silkHi, .88));
    wg.addColorStop(.5, C(PAL.water, .8));
    wg.addColorStop(1, C(PAL.silkHi, .3));
    g.fillStyle = wg; g.fillRect(x - w, top - 8, w * 2, bot - top + 60);
    for (let i = 0; i < 7; i++) {
      const sx = x + rr(-w * .4, w * .4);
      stroke(g, [[sx, top + rr(0, 60)], [sx + rr(-3, 3), top + (bot - top) * rr(.4, .7)], [sx + rr(-5, 5), bot - rr(0, 40)]],
        { w: rr(.7, 1.4), col: PAL.rockLo, a: rr(.12, .3), taper: .1 });
    }
    // 石梁两道（瀑分三叠）
    for (const yy of [top + 205, top + 415]) {
      g.fillStyle = C(PAL.rockLo, .8);
      g.fillRect(x - w * .72, yy, w * 1.44, rr(3.5, 6));
      g.fillStyle = C(PAL.silkHi, .5);
      g.fillRect(x - w * .72, yy + 5, w * 1.44, 2.2);
    }
    g.restore();
    // 瀑口与瀑脚
    blot(g, x, top - 6, 20, PAL.silkHi, .3);
    for (let i = 0; i < 9; i++) blot(g, x + rr(-28, 28), bot + rr(-4, 30), rr(10, 26), PAL.silkHi, rr(.16, .36));
    stroke(g, [[x - w * .52, top], [x - w * .66, top + 300], [x - w * .62, bot]],
      { w: 2.2, col: PAL.ink, a: .6, taper: .1, jitter: 2.4, ns: 47 });
    stroke(g, [[x + w * .52, top], [x + w * .68, top + 300], [x + w * .64, bot]],
      { w: 2.6, col: PAL.ink, a: .68, taper: .1, jitter: 2.4, ns: 49 });
  }

  function cascade(g) {   // 左崖叠瀑
    const x = 118, y0 = 1688;
    inkBlot(g, x, y0 + 120, 34, 130, PAL.ink, .35, 6, 161);   // 瀑后石影
    for (let i = 0; i < 3; i++) {
      const yy = y0 + i * 86, xx = x - i * 8 + rr(-3, 3);
      g.save();
      g.beginPath();
      g.moveTo(xx - (6 - i), yy - 30);
      g.quadraticCurveTo(xx - (9 - i), yy, xx - (5 - i), yy + 26);
      g.lineTo(xx + (5 - i), yy + 26);
      g.quadraticCurveTo(xx + (9 - i), yy, xx + (6 - i), yy - 30);
      g.closePath(); g.clip();
      const gr = g.createLinearGradient(xx - 8, 0, xx + 8, 0);
      gr.addColorStop(0, C(PAL.silkHi, .2)); gr.addColorStop(.5, C(PAL.silkHi, .46)); gr.addColorStop(1, C(PAL.silkHi, .15));
      g.fillStyle = gr; g.fillRect(xx - 12, yy - 34, 24, 66);
      g.restore();
      // 石梁
      g.fillStyle = C(PAL.rockLo, .85);
      g.fillRect(xx - 14, yy + 24, 28, 3.4);
      for (let k = 0; k < 4; k++)
        stroke(g, [[xx - 7 + k * 4.5, yy - 26], [xx - 9 + k * 4.5, yy + 18]],
          { w: .9, col: PAL.rockLo, a: .28, taper: .1 });
      blot(g, xx, yy + 30, 8, PAL.silkHi, .25);
    }
    for (let i = 0; i < 6; i++) blot(g, x + 4 + rr(-14, 14), y0 + 258 + rr(-6, 10), rr(9, 16), PAL.silkHi, rr(.14, .28));
  }

  function streamBed(g) {
    g.save();
    roughPath(g, STREAM, { jag: 6, step: 13, ns: 53, close: true });
    g.clip();
    const gr = g.createLinearGradient(0, 2090, 0, 2240);
    gr.addColorStop(0, C(PAL.silkHi, .42)); gr.addColorStop(1, C(PAL.silkHi, .16));
    g.fillStyle = gr; g.fillRect(320, 2080, 520, 180);
    for (let i = 0; i < 30; i++) {
      const y = rr(2100, 2230), x = rr(350, 760), l = rr(14, 60);
      stroke(g, [[x, y], [x + l, y + rr(-1.5, 1.5)]], { w: rr(.6, 1.3), col: PAL.rockLo, a: rr(.1, .3), taper: .8 });
    }
    g.restore();
    edgeStroke(g, STREAM.concat([STREAM[0]]), { w: 1.6, a: .4, jag: 3, ns: 55, double: false });
    for (const [bx, by, brx, bry] of [[470,2140,26,17],[580,2172,32,21],[688,2148,20,14],[410,2098,15,10],[636,2112,12,8]]) {
      g.save();
      g.beginPath(); g.ellipse(bx, by, brx, bry, rr(-.2, .2), 0, 6.2832); g.clip();
      g.fillStyle = C(PAL.rock, .95); g.fillRect(bx - brx, by - bry, brx * 2, bry * 2);
      const gr = g.createLinearGradient(bx - brx, by - bry, bx + brx, by + bry);
      gr.addColorStop(0, C(PAL.rockHi, .4)); gr.addColorStop(1, C(PAL.rockLo, .78));
      g.fillStyle = gr; g.fillRect(bx - brx, by - bry, brx * 2, bry * 2);
      for (let i = 0; i < 12; i++)
        dot(g, bx + rr(-brx, brx), by + rr(-bry, bry), rr(.8, 2), PAL.ink2, rr(.15, .4));
      g.restore();
      stroke(g, [[bx - brx, by + bry * .5], [bx, by + bry], [bx + brx, by + bry * .4]],
        { w: 1.8, col: PAL.ink2, a: .6, taper: .2, jitter: 1.6, ns: 61 + bx });
    }
  }

  function footpath(g) {
    const wid = 13;
    g.save();
    const up = PATH.map(([x, y]) => [x, y - wid]);
    const dn = PATH.slice().reverse().map(([x, y]) => [x, y + wid]);
    roughPath(g, up.concat(dn), { jag: 3.4, step: 11, ns: 67, close: true });
    g.clip();
    const gr = g.createLinearGradient(0, 1940, 0, 2070);
    gr.addColorStop(0, C(PAL.silkHi, .8)); gr.addColorStop(1, C(PAL.silkHi, .45));
    g.fillStyle = gr; g.fillRect(120, 1900, 1090, 190);
    for (let i = 0; i < 46; i++) {
      const t = rnd(), p = PATH[Math.min(PATH.length - 1, t * PATH.length | 0)];
      dot(g, p[0] + rr(-9, 9), p[1] + rr(-8, 8), rr(.8, 2.4), PAL.rockLo, rr(.1, .35));
    }
    g.restore();
    edgeStroke(g, PATH.map(([x, y]) => [x, y - wid]).concat([[162, 1928 - wid]]),
      { w: 1.2, a: .34, jag: 2.4, ns: 71, double: false });
    edgeStroke(g, PATH.map(([x, y]) => [x, y + wid]).concat([[162, 1928 + wid]]),
      { w: 1.4, a: .4, jag: 2.4, ns: 73, double: false });
  }

  /* ---------------- 冠部密林 ---------------- */
  function crownCanopy(g) {
    // 峰肩轮廓沿外法线作树冠状起伏
    const ridge = PEAK.slice(14, 35);
    const top = [];
    for (let i = 0; i < ridge.length; i++) {
      const p = ridge[i];
      const q = ridge[Math.min(ridge.length - 1, i + 1)], p0 = ridge[Math.max(0, i - 1)];
      let nx = -(q[1] - p0[1]), ny = q[0] - p0[0];
      const L = Math.hypot(nx, ny) || 1; nx /= L; ny /= L;
      if (ny > 0) { nx = -nx; ny = -ny; }
      const bump = 6 + Math.abs(Math.sin(i * 1.9)) * 17 + fbm1(i * 1.3, 105) * 15;
      top.push([p[0] + nx * bump, p[1] + ny * bump]);
    }
    const bot = [];
    for (let x = 296; x <= 1066; x += 15) {
      const yb = crownBotAt(x);
      bot.push([x, yb + Math.abs(Math.sin(x * .055)) * 14 + fbm1(x * .02, 103) * 16]);
    }
    const poly = top.concat(bot.reverse());
    g.save();
    roughPath(g, poly, { jag: 6, step: 9, ns: 101, close: true });
    g.fillStyle = C(PAL.ink, .96); g.fill();
    g.clip();
    for (let i = 0; i < 170; i++) {
      const x = lerp(300, 1066, rnd());
      const yb = crownBotAt(x);
      leafCluster(g, x + rr(-13, 13), lerp(96, yb + 10, rnd() * rnd()), rr(13, 30), .95);
    }
    g.restore();
    // 林缘探出的树头
    for (const p of top) if (rnd() < .8)
      leafCluster(g, p[0] + rr(-6, 6), p[1] + rr(-6, 4), rr(8, 16), .92);
    // 林冠下缘的团簇（破圆弧）
    for (let x = 300; x <= 1064; x += rr(13, 23)) {
      leafCluster(g, x, crownBotAt(x) + rr(0, 15), rr(8, 17), .95);
    }
    // 矾头（峰头小平台）与苔点
    for (const bx of [352, 470, 596, 722, 852, 978]) {
      const by = crownBotAt(bx) + rr(30, 52);
      g.save();
      g.beginPath();
      g.arc(bx, by, rr(13, 21), Math.PI * 1.05, Math.PI * 1.95);
      g.strokeStyle = C(PAL.ink2, .5); g.lineWidth = 2.4; g.stroke();
      g.restore();
      shrubs(g, [[bx, by - 2]], 5, 9, .85);
      for (let i = 0; i < 5; i++)
        dot(g, bx + rr(-16, 16), by + rr(2, 10), rr(1.2, 2.6), PAL.ink2, rr(.3, .6));
    }
  }

  /* ============================================================
   * 总装
   * ============================================================ */
  function build() {
    const cv = layer(PW, PH);
    const g = cv.getContext('2d');
    g.scale(PS, PS);

    silkBase(g, DW, DH);
    g.save(); g.globalAlpha = .5;
    seal(g, 46, 130, 64, '緝熈', .3);
    g.restore();

    /* ---- 一、远峰与主峰 ---- */
    let sg = shadeCtx();
    form(sg, RREDGE, C([90, 78, 58], .85), gg => {
      rockLight(gg, 1046, 1197, 620, 1568, 81, .2, .34);
      crevices(gg, 1070, 1190, 660, 1500, 6, 83, .3);
    }, 81, 7);
    form(sg, PEAK, C([92, 80, 59], .94), gg => {
      rockLight(gg, 110, 1072, 90, 1568, 87, .5, .72, 640);
      crevices(gg, 200, 900, 620, 1540, 16, 91, .42);
      crevices(gg, 880, 1040, 640, 1480, 5, 97, .5);
      // 石面受光的几片亮板
      for (const [px, py, prx, pry, pa] of [[430,980,70,200,.15],[560,1160,62,220,.13],
                                            [330,860,52,160,.11],[700,920,55,170,.08]])
        inkBlot(gg, px, py, prx, pry, PAL.silkHi, pa, 4, 93 + px);
      // 深谷竖沟（破其圆浑）
      for (const gx of [318, 640, 856]) {
        inkBlot(gg, gx, 950, 24, 360, PAL.ink, .14, 6, 60 + gx);
        inkBlot(gg, gx + 10, 1280, 20, 260, PAL.ink, .1, 5, 61 + gx);
      }
      // 右侧面沉暗，左缘勾沉（背光）
      const rg = gg.createLinearGradient(830, 0, 1072, 0);
      rg.addColorStop(0, C(PAL.ink, 0)); rg.addColorStop(1, C(PAL.ink, .3));
      gg.fillStyle = rg; gg.fillRect(830, 300, 242, 1268);
      const lg = gg.createLinearGradient(110, 0, 300, 0);
      lg.addColorStop(0, C(PAL.ink, .32)); lg.addColorStop(1, C(PAL.ink, 0));
      gg.fillStyle = lg; gg.fillRect(110, 300, 190, 1268);
      const gr = gg.createLinearGradient(FALL.x - 70, 0, FALL.x + 70, 0);
      gr.addColorStop(0, C(PAL.rockLo, 0)); gr.addColorStop(.5, C(PAL.ink, .5)); gr.addColorStop(1, C(PAL.rockLo, 0));
      gg.fillStyle = gr; gg.fillRect(FALL.x - 70, 700, 140, 780);
    }, 87, 12);
    g.drawImage(sg.c, 0, 0, PW, PH, 0, 0, DW, DH);
    texturePass(g, sg, 40, 80, 1197, 1568);
    sg = null;
    // 勾勒：主峰两侧与肩部
    edgeStroke(g, PEAK.slice(0, 33), { w: 2.6, a: .52, jag: 6, ns: 89, skip: .1 });
    edgeStroke(g, RREDGE.slice(0, 4), { w: 2, a: .4, jag: 5, ns: 82, double: false });
    crownCanopy(g);
    waterfall(g);
    shrubs(g, [[FALL.x, FALL.top - 18], [FALL.x - 24, FALL.top], [FALL.x + 24, FALL.top + 2]], 10, 16, .9);

    /* ---- 云断山腰（烘焙的静雾） ---- */
    mistVeil(g, 1320, 1560, 1700, .68);
    for (let i = 0; i < 30; i++)
      blot(g, rr(40, 1160), rr(1380, 1650), rr(70, 230), PAL.silkHi, rr(.1, .3));
    for (let i = 0; i < 16; i++)   // 雾上缘的絮
      blot(g, rr(40, 1160), 1350 + rr(-50, 60), rr(60, 150), PAL.silkHi, rr(.12, .28));

    /* ---- 二、左肩岩台与左崖 ---- */
    sg = shadeCtx();
    form(sg, LCLIFF, C([89, 77, 57], .93), gg => {
      rockLight(gg, 0, 222, 1550, 2080, 121, .4, .62);
      crevices(gg, 6, 210, 1600, 2040, 6, 123, .45);
    }, 121, 8);
    g.drawImage(sg.c, 0, 0, PW, PH, 0, 0, DW, DH);
    texturePass(g, sg, 0, 850, 310, 2080);
    sg = null;
    edgeStroke(g, LCLIFF.slice(0, 14), { w: 2.2, a: .5, jag: 5, ns: 119, skip: .14 });
    // 左肩岩台：石骨一道，树木其上
    g.save();
    roughPath(g, LEDGE, { jag: 5, step: 9, ns: 145, close: true });
    g.fillStyle = C([96, 84, 62], .96); g.fill();
    g.restore();
    for (let i = 0; i < 50; i++) {
      dot(g, rr(42, 164), rr(1000, 1040), rr(1, 2.4), PAL.ink2, rr(.2, .5));
    }
    edgeStroke(g, LEDGE, { w: 2, a: .5, jag: 4, ns: 147, skip: .16 });
    treeline(g, LEDGE.slice(0, 5), 9, 20, 149, .93);
    conifer(g, 92, 1000, 26, .9); tree(g, 138, 1006, 30, -.3, .9); conifer(g, 60, 1006, 22, .88);
    // 崖头树与叠瀑
    treeline(g, LCLIFF.slice(0, 9), 14, 42, 151, .94);
    tree(g, 96, 1592, 48, .3, .92); tree(g, 156, 1622, 40, -.4, .9);
    conifer(g, 34, 1572, 32, .92); conifer(g, 186, 1648, 28, .88);
    cascade(g);
    mistVeil(g, 1660, 1780, 1930, .28);

    /* ---- 三、右侧林台（梵宇藏林） ---- */
    sg = shadeCtx();
    form(sg, OUTCROP, C([89, 77, 57], .94), gg => {
      rockLight(gg, 470, 1197, 1470, 2040, 131, .42, .64);
      crevices(gg, 490, 1180, 1560, 2000, 9, 133, .42);
      for (let i = 0; i < 8; i++) {
        const x = rr(490, 1180);
        stroke(gg, [[x, rr(1700, 1800)], [x + rr(-30, 30), rr(1860, 1960)]],
          { w: rr(2, 4), col: PAL.ink2, a: rr(.3, .5), taper: .3, jitter: 4, ns: 141 + i });
      }
    }, 131, 10);
    g.drawImage(sg.c, 0, 0, PW, PH, 0, 0, DW, DH);
    texturePass(g, sg, 466, 1470, 1197, 2040);
    sg = null;
    edgeStroke(g, OUTCROP.slice(0, 20), { w: 2.2, a: .5, jag: 5, ns: 129, skip: .12 });
    // 林台顶部：墨叶成林，密不透风（先铺林带，再叠树头）
    const crest = OUTCROP.slice(2, 20);
    const band = crest.concat(crest.slice().reverse().map(([x, y]) => [x, y + 42 + fbm1(x * .02, 135) * 46]));
    g.save();
    roughPath(g, band, { jag: 8, step: 10, ns: 137, close: true });
    g.fillStyle = C(PAL.ink, .9); g.fill();
    g.restore();
    for (const [x, y] of crest)
      for (let i = 0; i < 3; i++)
        leafCluster(g, x + rr(-15, 15), y + rr(-20, 10), rr(14, 26), .94);
    for (let i = 0; i < 14; i++)
      leafCluster(g, rr(496, 1190), rr(1524, 1640), rr(12, 22), .9);
    temple(g, TEMPLE.x, TEMPLE.y);
    // 殿宇两侧的树梢掩映（让出檐顶）
    shrubs(g, [[TEMPLE.x - 62, TEMPLE.y - 6], [TEMPLE.x + 58, TEMPLE.y - 34],
               [TEMPLE.x - 20, TEMPLE.y - 56], [TEMPLE.x - 30, TEMPLE.y + 10],
               [TEMPLE.x + 74, TEMPLE.y + 8], [TEMPLE.x - 88, TEMPLE.y + 4]], 12, 22, .93);
    for (const [x, y] of [[536,1672],[610,1624],[700,1564],[806,1548],[900,1524],[1010,1516],[1108,1528],[1170,1548]])
      tree(g, x, y + 6, rr(42, 76), rr(-.5, .5), .92);
    for (const [x, y] of [[676,1552],[762,1536],[864,1516],[980,1504],[1090,1512],[1160,1532]])
      conifer(g, x, y + 4, rr(26, 46), .92);
    shrubs(g, [[520,1800],[560,1880],[640,1930],[760,1962],[900,1964],[1050,1952],[1160,1934]], 10, 21, .82);
    // 崖边小树（驮道口）
    tree(g, 1168, 1958, 58, .2, .94); tree(g, 1194, 1934, 46, -.3, .92);
    shrubs(g, [[1152,1966],[1180,1948],[1196,1974]], 9, 16, .92);

    /* ---- 四、溪床、驮道、前景巨石 ---- */
    streamBed(g);
    footpath(g);
    sg = shadeCtx();
    form(sg, ROCK_LMID, C([94, 82, 61], .96), gg => rockLight(gg, 188, 410, 1954, 2108, 151, .36, .64), 151, 6);
    form(sg, ROCK_LBIG, C([82, 71, 53], .97), gg => {
      rockLight(gg, 0, 344, 2030, 2400, 157, .3, .7);
      crevices(gg, 10, 330, 2060, 2390, 5, 161, .5);
    }, 157, 8);
    form(sg, ROCK_GIANT, C([82, 71, 53], .97), gg => {
      rockLight(gg, 770, 1200, 2078, 2400, 167, .26, .74);
      crevices(gg, 790, 1190, 2100, 2396, 6, 171, .55);
    }, 167, 8);
    g.drawImage(sg.c, 0, 0, PW, PH, 0, 0, DW, DH);
    texturePass(g, sg, 0, 1950, 1200, 2400, { step: 2.7, base: .78 });
    sg = null;
    edgeStroke(g, ROCK_LBIG.slice(0, 11), { w: 2.6, a: .55, jag: 5, ns: 155, skip: .1 });
    edgeStroke(g, ROCK_GIANT.slice(0, 5), { w: 2.6, a: .55, jag: 5, ns: 165, skip: .1 });
    edgeStroke(g, ROCK_LMID, { w: 2.2, a: .5, jag: 4, ns: 149, skip: .14 });
    shrubs(g, [[240,2046],[318,2086],[864,2106],[1006,2086],[1130,2100],[420,2062]], 5, 10, .82);
    blot(g, 1072, 1710, 34, PAL.silkHi, .3);   // 落款叶隙

    /* ---- 旧色总渲染 ---- */
    for (let i = 0; i < 18; i++)
      blot(g, rr(0, DW), rr(0, DH), rr(40, 170), PAL.silkLo, rr(.04, .1));
    g.fillStyle = C(PAL.silkLo, .1);
    g.fillRect(0, 0, DW, 8); g.fillRect(0, DH - 8, DW, 8);
    g.fillRect(0, 0, 8, DH); g.fillRect(DW - 8, 0, 8, DH);
    return cv;
  }

  function crownBotAt(x) {
    const B = CROWN_BOT;
    if (x <= B[0][0]) return B[0][1];
    for (let i = 0; i < B.length - 1; i++) {
      if (x <= B[i + 1][0]) {
        const t = (x - B[i][0]) / (B[i + 1][0] - B[i][0]);
        return lerp(B[i][1], B[i + 1][1], t);
      }
    }
    return B[B.length - 1][1];
  }

  function mistVeil(g, y0, yPeak, y1, a) {
    const gr = g.createLinearGradient(0, y0, 0, y1);
    gr.addColorStop(0, C(PAL.silkHi, 0));
    gr.addColorStop(clamp((yPeak - y0) / (y1 - y0), 0, 1), C(PAL.silkHi, a));
    gr.addColorStop(1, C(PAL.silkHi, a * .22));
    g.fillStyle = gr; g.fillRect(0, y0, DW, y1 - y0);
  }

  /* ---------------- 动画用素材 ---------------- */
  function fogSprite() {
    const c = layer(900, 300), g = c.getContext('2d');
    for (let i = 0; i < 150; i++)
      blot(g, rr(0, 900), rr(60, 260), rr(60, 200), PAL.silkHi, rr(.05, .13));
    for (let i = 0; i < 60; i++)
      blot(g, rr(0, 900), rr(120, 230), rr(90, 240), PAL.silk, rr(.04, .1));
    // 四边渐隐，避免拼贴痕迹
    g.globalCompositeOperation = 'destination-in';
    g.save();
    g.setTransform(1, 0, 0, 300 / 450, 0, 0);
    const gr = g.createRadialGradient(450, 225, 80, 450, 225, 450);
    gr.addColorStop(0, 'rgba(0,0,0,1)');
    gr.addColorStop(.68, 'rgba(0,0,0,.9)');
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, 900, 450);
    g.restore();
    g.globalCompositeOperation = 'source-over';
    return c;
  }
  function fallFlow() {
    const c = layer(80, 720), g = c.getContext('2d');
    for (let i = 0; i < 90; i++) {
      const x = rr(6, 74), y = rr(0, 720), l = rr(20, 90);
      g.strokeStyle = C(PAL.silkHi, rr(.1, .4));
      g.lineWidth = rr(.8, 2.2);
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + rr(-2, 2), y + l); g.stroke();
    }
    return c;
  }
  function grainTile() {
    const c = layer(256, 256), g = c.getContext('2d');
    for (let y = 0; y < 256; y += 2) { g.fillStyle = C(PAL.silkLo, .05); g.fillRect(0, y, 256, 1); }
    for (let x = 0; x < 256; x += 3) { g.fillStyle = C(PAL.silkHi, .04); g.fillRect(x, 0, 1, 256); }
    for (let i = 0; i < 400; i++)
      dot(g, rr(0, 256), rr(0, 256), rr(.4, 1.4), rnd() < .5 ? PAL.silkHi : PAL.silkLo, rr(.03, .1));
    return c;
  }

  const painting = build();
  const grain = grainTile();
  const fog = fogSprite();
  const flow = fallFlow();

  /* 路径弧长（供行旅使用） */
  const pathPts = PATH;
  const pathCum = [0];
  for (let i = 1; i < pathPts.length; i++)
    pathCum.push(pathCum[i - 1] + Math.hypot(pathPts[i][0] - pathPts[i - 1][0], pathPts[i][1] - pathPts[i - 1][1]));
  function pathAt(s) {
    const L = pathCum[pathCum.length - 1];
    const d = clamp(s, 0, L);
    let i = 1; while (i < pathCum.length - 1 && pathCum[i] < d) i++;
    const t = (d - pathCum[i - 1]) / (pathCum[i] - pathCum[i - 1] || 1);
    return [lerp(pathPts[i - 1][0], pathPts[i][0], t), lerp(pathPts[i - 1][1], pathPts[i][1], t)];
  }

  return {
    DW, DH, PS, painting, grain, fog, flow,
    FALL, TEMPLE, BIRD_SPOTS, PATH, pathPts, pathAt, pathLen: pathCum[pathCum.length - 1]
  };
})();
