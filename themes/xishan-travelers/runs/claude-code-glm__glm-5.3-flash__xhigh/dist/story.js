'use strict';
/* ============================================================
 * story.js —— 四幕动画：晨雾 / 行旅 / 钟声 / 入山
 * 全片为时间 t 的纯函数，播完自动循环
 * ============================================================ */
(() => {
  const { PAL, C, stroke, blot, dot, clamp, lerp, smooth, ease, seal } = INK;
  const S = SCENE;
  const DW = S.DW, DH = S.DH, T = 48;

  const cv = document.getElementById('cv');
  const g = cv.getContext('2d');
  const scrollEl = document.getElementById('scroll');

  /* ---------------- 布局 ---------------- */
  let scale = 1, k = 1;
  function fit() {
    const vw = innerWidth, vh = innerHeight;
    scale = Math.min(vw / DW, vh / DH);
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const sw = DW * scale | 0, sh = DH * scale | 0;
    scrollEl.style.width = sw + 'px';
    scrollEl.style.height = sh + 'px';
    cv.width = Math.round(sw * dpr);
    cv.height = Math.round(sh * dpr);
    k = cv.width / DW;
    // 题签置于裱边（两侧留白足够时才显示）
    const t = document.getElementById('title');
    if (t) {
      const margin = (vw - sw) / 2;
      if (margin > 110) {
        t.style.opacity = '.8';
        t.style.left = ((vw + sw) / 2 + Math.min(28, margin * .16)) + 'px';
      } else t.style.opacity = '0';
    }
  }
  addEventListener('resize', fit);
  fit();

  /* ---------------- 字幕 ---------------- */
  const ACTS = [
    { t0: 0,  t1: 11, act: '壹 · 晨雾', lines: ['天将晓，溪山犹在雾中', '雾渐散，主峰始露，一瀑悬空'] },
    { t0: 11, t1: 23, act: '贰 · 行旅', lines: ['晓雾初开，商旅出行', '四骡负货，沿溪踏晓行'] },
    { t0: 23, t1: 34, act: '叁 · 钟声', lines: ['山寺钟鸣，惊起林鸟一片', '殿后人停步仰观，复急行赶上驮队'] },
    { t0: 34, t1: 48, act: '肆 · 入山', lines: ['驮队入山，渐远渐无', '雾合溪山，叶间隐现「范宽」款'] }
  ];
  const caps = document.getElementById('caps');
  const boxes = ACTS.map(a => {
    const b = document.createElement('div');
    b.className = 'box';
    b.innerHTML = `<p class="act">${a.act}</p>` + a.lines.map(l => `<p class="ln">${l}</p>`).join('');
    caps.appendChild(b);
    return b;
  });
  let curAct = -1;
  function setAct(i) {
    if (i === curAct) return;
    curAct = i;
    boxes.forEach((b, j) => {
      b.classList.toggle('on', j === i);
      b.querySelectorAll('.ln').forEach((p, m) => {
        p.style.transitionDelay = j === i ? `${.9 + m * 2.4}s` : '0s';
      });
    });
  }

  /* ---------------- 幕间参数 ---------------- */
  const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
  // 雾：浓→散（一幕）→合拢（四幕）
  function fogState(t) {
    let amt, top;
    if (t < 11) { const u = ease(seg(t, 0, 9)); amt = lerp(.95, .24, u); top = lerp(1235, 1500, u); }
    else if (t < 36) { amt = .24 + Math.sin(t * .7) * .015; top = 1500; }
    else { const u = ease(seg(t, 36, 44)); amt = lerp(.24, .88, u); top = lerp(1500, 1320, u); }
    return { amt, top };
  }
  // 瀑布水势
  function fallPower(t) {
    const a = smooth(seg(t, 1.2, 5.5));
    return .35 + .65 * a;
  }

  /* ---------------- 行旅（驮队） ---------------- */
  const ENTER = 11.8, SPEED = 36, GAP = 44, FADE_IN = 42, FADE0 = 880, FADE1 = 962;
  function headS(t) { return (t - ENTER) * SPEED; }
  // 殿后人：队尾（落后 5 个身位），三幕中停步观山，再急步赶上
  function lastS(t) {
    if (t < 25) return headS(t) - GAP * 5;
    if (t < 29) return headS(25) - GAP * 5;
    return Math.min(headS(25) + (t - 29) * SPEED * 2, headS(t)) - GAP * 5;
  }

  function mule(g2, x, y, ph, a) {
    g2.save(); g2.translate(x, y);
    g2.strokeStyle = C(PAL.ink, a); g2.fillStyle = C(PAL.ink, a);
    g2.lineCap = 'round';
    // 四足
    g2.lineWidth = 1.7;
    const legs = [[-10, 0], [-7, 2.1], [6, 4.2], [9, 1.2]];
    for (const [lx, lph] of legs) {
      const sw = Math.sin(ph + lph) * 3.1;
      g2.beginPath(); g2.moveTo(lx, -9); g2.lineTo(lx + sw, 0); g2.stroke();
    }
    // 身
    g2.beginPath(); g2.ellipse(-1, -12.6, 11.4, 5.4, -.04, 0, 6.2832); g2.fill();
    // 颈与头
    g2.lineWidth = 4.6;
    g2.beginPath(); g2.moveTo(-8, -15); g2.quadraticCurveTo(-13, -18, -15.5, -18.5); g2.stroke();
    g2.beginPath(); g2.ellipse(-17.6, -17.4, 3.4, 2.1, -.5, 0, 6.2832); g2.fill();
    g2.lineWidth = 1.2;   // 双耳
    g2.beginPath(); g2.moveTo(-16.5, -19.5); g2.lineTo(-17.5, -22.5); g2.stroke();
    g2.beginPath(); g2.moveTo(-15.4, -19.8); g2.lineTo(-15.6, -23); g2.stroke();
    // 货驮两垛
    g2.fillStyle = C(PAL.ink2, a);
    g2.beginPath(); g2.ellipse(-5, -18.6, 4.6, 3.4, 0, 0, 6.2832); g2.fill();
    g2.beginPath(); g2.ellipse(3.4, -18.4, 4.6, 3.4, 0, 0, 6.2832); g2.fill();
    g2.strokeStyle = C(PAL.silkHi, a * .5); g2.lineWidth = .9;
    g2.beginPath(); g2.moveTo(-9.5, -17.4); g2.quadraticCurveTo(-1, -14.6, 8, -17); g2.stroke();
    // 尾
    g2.strokeStyle = C(PAL.ink, a); g2.lineWidth = 1.3;
    g2.beginPath(); g2.moveTo(10, -14.5); g2.quadraticCurveTo(12.4, -10, 11.8, -6.4); g2.stroke();
    g2.restore();
  }

  function walker(g2, x, y, ph, a, mode) {   // mode: walk / stand / gaze
    g2.save(); g2.translate(x, y);
    const ink = C(PAL.ink, a);
    g2.strokeStyle = ink; g2.fillStyle = ink; g2.lineCap = 'round';
    if (mode === 'walk') {
      g2.lineWidth = 1.5;
      for (const s of [0, Math.PI]) {
        const sw = Math.sin(ph + s) * 2.6;
        g2.beginPath(); g2.moveTo(0, -8.4); g2.lineTo(sw, -.4); g2.stroke();
      }
    } else {
      g2.lineWidth = 1.6;
      g2.beginPath(); g2.moveTo(-1.4, -8.4); g2.lineTo(-2, 0); g2.stroke();
      g2.beginPath(); g2.moveTo(1.4, -8.4); g2.lineTo(2, 0); g2.stroke();
    }
    // 身
    g2.lineWidth = 3.4;
    g2.beginPath(); g2.moveTo(0, -8.2); g2.lineTo(-.4, -13.6); g2.stroke();
    // 臂 + 拄杖
    g2.lineWidth = 1.2;
    const armSw = mode === 'walk' ? Math.sin(ph) * 2 : 0;
    g2.beginPath(); g2.moveTo(-.6, -12.6); g2.lineTo(-2.6 + armSw, -9.6); g2.stroke();
    g2.beginPath(); g2.moveTo(-3, -10); g2.lineTo(-4.2, .4); g2.stroke();   // 杖
    // 头与斗笠（gaze 时仰首）
    const hy = mode === 'gaze' ? -17.6 : -16.2, hx = mode === 'gaze' ? -1.8 : -.4;
    dot(g2, hx, hy, 1.5, PAL.ink, a);
    g2.save(); g2.translate(hx, hy - 1.4); g2.rotate(mode === 'gaze' ? -.5 : -.12);
    g2.beginPath(); g2.ellipse(0, 0, 3.6, 1.1, 0, 0, 6.2832); g2.fill();
    g2.restore();
    g2.restore();
  }

  function caravan(t) {
    if (t < ENTER - .1) return;
    const draw = (s, ph, kind, mode) => {
      if (s < -6 || s > FADE1) return;
      let a = .8;
      if (s < FADE_IN) a *= smooth(seg(s, 2, FADE_IN));
      if (s > FADE0) a *= 1 - smooth(seg(s, FADE0, FADE1));
      if (a <= 0) return;
      const [x, y] = S.pathAt(Math.max(0, s));
      const bob = mode === 'walk' ? Math.sin(ph * 2) * .7 : 0;
      if (kind === 'mule') mule(g, x, y + bob, ph, a);
      else walker(g, x, y + bob, ph, a, mode);
    };
    const h = headS(t), lb = lastS(t);
    const ph = t * 7.2;
    draw(h, ph, 'walker', 'walk');                    // 前引路人
    for (let i = 1; i <= 4; i++) draw(h - GAP * i, ph + i * 1.3, 'mule', 'walk');
    const mode = t < 25 ? 'walk' : t < 25.6 ? 'stand' : t < 28.7 ? 'gaze' : 'walk';
    const lph = mode === 'walk' ? t * 7.2 + 5.6 : 0;
    draw(lb, lph, 'walker', mode);
  }

  /* ---------------- 钟声与飞鸟 ---------------- */
  const BELLS = [23.8, 27.0, 30.2];
  function bells(t) {
    for (const bt of BELLS) {
      const d = t - bt;
      if (d < 0 || d > 2.8) continue;
      const r = d * 92, a = (1 - d / 2.8) * .26;
      g.strokeStyle = C(PAL.ink, a); g.lineWidth = 1.2;
      g.beginPath(); g.arc(S.TEMPLE.x, S.TEMPLE.y - 26, r, 0, 6.2832); g.stroke();
      g.strokeStyle = C(PAL.ink, a * .55); g.lineWidth = .8;
      g.beginPath(); g.arc(S.TEMPLE.x, S.TEMPLE.y - 26, r * .78, 0, 6.2832); g.stroke();
    }
  }
  const BIRDS = [];
  {
    let seedN = 7;
    const rr = () => (seedN = (seedN * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    for (let i = 0; i < 19; i++) {
      const sp = S.BIRD_SPOTS[i % S.BIRD_SPOTS.length];
      const ang = -Math.PI / 2 + (rr() - .5) * 1.5;
      BIRDS.push({
        x: sp[0] + (rr() - .5) * 30, y: sp[1] + (rr() - .5) * 14,
        vx: Math.cos(ang) * (95 + rr() * 90), vy: Math.sin(ang) * (95 + rr() * 80),
        d: i * .07, sz: 4.6 + rr() * 3.2, ph: rr() * 6.28
      });
    }
  }
  function birds(t) {
    if (t < 23.6 || t > 32.5) return;
    for (const b of BIRDS) {
      const d = t - 23.6 - b.d;
      if (d < 0) continue;
      const x = b.x + b.vx * d, y = b.y + b.vy * d - 14 * d * d * .12;
      let a = smooth(seg(d, 0, .5)) * (1 - smooth(seg(d, 5.6, 7)));
      const sz = b.sz * lerp(1, .72, seg(d, 0, 7));
      if (a <= 0) continue;
      const f = Math.abs(Math.sin(t * 13 + b.ph)) * sz * .9 + sz * .25;
      g.strokeStyle = C(PAL.ink, a * .9); g.lineWidth = Math.max(.8, sz * .26); g.lineCap = 'round';
      g.beginPath();
      g.moveTo(x - sz, y - f * .55); g.quadraticCurveTo(x - sz * .3, y + f * .3, x, y);
      g.quadraticCurveTo(x + sz * .3, y + f * .3, x + sz, y - f * .55);
      g.stroke();
    }
  }

  /* ---------------- 落款 ---------------- */
  function signature(t) {
    const a = smooth(seg(t, 39.5, 43.5)) * (t > 46.5 ? 1 - seg(t, 46.5, 48) : 1);
    if (a <= 0) return;
    blot(g, 1072, 1712, 34, PAL.silkHi, .34 * a);
    g.save();
    g.translate(1072, 1700); g.rotate(-.035);
    g.fillStyle = C([20, 16, 11], .95 * a);
    g.font = '17px "Songti SC","STSong","Noto Serif SC","SimSun",serif';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('范', 0, 0);
    g.fillText('宽', 0, 19);
    g.restore();
    seal(g, 1072, 1738, 11, '寬', .6 * a);
  }

  /* ---------------- 每帧合成 ---------------- */
  let fogGrad = null;
  function frame(t) {
    g.setTransform(k, 0, 0, k, 0, 0);
    g.clearRect(0, 0, DW, DH);
    g.drawImage(S.painting, 0, 0, S.painting.width, S.painting.height, 0, 0, DW, DH);

    const { amt, top } = fogState(t);

    // 云腰常飘的两层薄雾
    const FW = 1900, FH = 560;
    g.globalAlpha = .30 + Math.sin(t * .23) * .05;
    g.drawImage(S.fog, -((t * 11) % FW), 1330, FW, FH);
    g.drawImage(S.fog, -((t * 11) % FW) + FW, 1330, FW, FH);
    g.globalAlpha = .18 + Math.cos(t * .17) * .04;
    g.drawImage(S.fog, -((t * 26 + 400) % (FW * 1.15)), 1395, FW * 1.15, FH * .9);
    g.drawImage(S.fog, -((t * 26 + 400) % (FW * 1.15)) + FW * 1.15, 1395, FW * 1.15, FH * .9);
    g.globalAlpha = 1;

    // 幕内浓淡雾（山脚 / 合拢）
    if (amt > .01) {
      const gr = g.createLinearGradient(0, top - 300, 0, DH);
      gr.addColorStop(0, C(PAL.silkHi, 0));
      gr.addColorStop(.42, C(PAL.silkHi, .62 * amt));
      gr.addColorStop(.62, C(PAL.silkHi, .5 * amt));
      gr.addColorStop(1, C(PAL.silkHi, .3 * amt));
      g.fillStyle = gr; g.fillRect(0, top - 300, DW, DH - top + 300);
      g.globalAlpha = .5 * amt;
      g.drawImage(S.fog, -((t * 17) % FW), top - 170, FW, FH);
      g.drawImage(S.fog, -((t * 17) % FW) + FW, top - 170, FW, FH);
      g.globalAlpha = 1;
      // 雾沿山脚的絮状边
      for (let i = 0; i < 7; i++) {
        const bx = ((i * 197 + t * 23) % (DW + 300)) - 150;
        blot(g, bx, top + Math.sin(i * 2.4 + t * .4) * 26, 90 + (i % 3) * 40, PAL.silkHi, .1 * amt);
      }
    }

    // 瀑布流
    const fp = fallPower(t);
    if (fp > .01) {
      const { x, top: fy, bot, w } = S.FALL;
      g.save();
      g.beginPath();
      g.rect(x - w * .62, fy - 6, w * 1.24, bot - fy + 66);
      g.clip();
      const off = (t * 130) % 720;
      g.globalAlpha = .5 * fp;
      g.drawImage(S.flow, x - 40, fy - 720 + off, 80, 720);
      g.drawImage(S.flow, x - 40, fy + off - 1440, 80, 720);
      g.globalAlpha = .35 * fp;
      g.drawImage(S.flow, x - 40, fy - 720 + off + 360, 80, 720);
      g.globalAlpha = 1;
      g.restore();
      // 瀑脚水花明灭
      blot(g, x + Math.sin(t * 2.1) * 6, bot + 16, 14 + Math.sin(t * 3.3) * 4, PAL.silkHi, .18 * fp);
    }

    bells(t);
    birds(t);
    caravan(t);
    signature(t);

    // 绢纹（盖在动层上，保住"画"的质地）
    if (!fogGrad) fogGrad = g.createPattern(S.grain, 'repeat');
    g.fillStyle = fogGrad;
    g.fillRect(0, 0, DW, DH);
  }

  /* ---------------- 主循环 ---------------- */
  const qp = new URLSearchParams(location.search);
  const tFix = parseFloat(qp.get('t')) || 0;
  const frozen = qp.get('freeze') === '1';
  const t0 = performance.now() - tFix * 1000;
  function loop(now) {
    const t = frozen ? tFix : ((now - t0) / 1000) % T;
    setAct(ACTS.findIndex(a => t >= a.t0 && t < a.t1));
    frame(t);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
