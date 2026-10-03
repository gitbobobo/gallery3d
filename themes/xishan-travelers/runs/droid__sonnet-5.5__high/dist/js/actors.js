/* 会动的角色：行人、驮骡、飞鸟，以及驮队走的小路 */
(function (G) {
  'use strict';
  const { TAU, clamp, lerp, smooth } = G.U;

  /* —— 路径：从右侧林中出来，沿溪边向左，再拐进左边山路 —— */
  const PATH = [[1070, 1771], [990, 1774], [900, 1782], [800, 1790], [700, 1794], [600, 1796], [500, 1798], [420, 1796], [350, 1788], [290, 1770], [240, 1744], [195, 1712], [150, 1676], [110, 1640], [70, 1604], [30, 1570], [-20, 1534], [-80, 1490]];
  const CUM = [0];
  for (let i = 1; i < PATH.length; i++) CUM.push(CUM[i - 1] + Math.hypot(PATH[i][0] - PATH[i - 1][0], PATH[i][1] - PATH[i - 1][1]));
  const PATH_LEN = CUM[CUM.length - 1];

  function posAt(s) {
    s = clamp(s, 0, PATH_LEN - 0.01);
    let i = 1; while (i < CUM.length - 1 && CUM[i] < s) i++;
    const t = (s - CUM[i - 1]) / (CUM[i] - CUM[i - 1]);
    const a = PATH[i - 1], b = PATH[i];
    const x = lerp(a[0], b[0], t), y = lerp(a[1], b[1], t);
    // 越往左上走，人越小（走远了）
    const sc = lerp(1, 0.66, smooth(360, 40, x));
    return { x, y, sc };
  }

  const ink = (c, a) => 'rgba(' + c + ',' + a + ')';
  function stroke(ctx, pts, w, col) {
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.stroke();
  }

  /* —— 行人（朝右绘制，外面翻转） —— */
  const KINDS = {
    leader: { robe: '38,34,26', hat: 'bamboo', item: 'staff' },
    driver: { robe: '74,64,48', hat: 'bamboo', item: 'whip' },
    last: { robe: '30,30,26', hat: 'cap', item: 'pole' }
  };

  function drawPerson(ctx, o) {
    const K = KINDS[o.kind], ph = o.phase, amp = o.amp, look = o.look || 0, run = o.run || 0, t = o.t;
    const bob = -Math.abs(Math.sin(ph)) * (1.1 + run) * amp;
    const lean = run * 0.2 - look * 0.1;
    // 脚下的淡影
    ctx.fillStyle = 'rgba(20,16,10,0.2)';
    ctx.beginPath(); ctx.ellipse(0, 0.5, 8, 1.8, 0, 0, TAU); ctx.fill();

    // 腿
    const leg = (s, a) => {
      const p = ph + s * Math.PI, sw = Math.sin(p) * (5 + 4.5 * run) * amp;
      const lift = Math.max(0, Math.cos(p)) * (2.2 + 2.4 * run) * amp;
      const hip = [0, -14 + bob], knee = [sw * 0.5 + 1.2 * amp, -7.5 + bob * 0.5 - lift * 0.4], foot = [sw, -lift];
      stroke(ctx, [hip, knee, foot], 2.2, ink('30,26,20', a));
      stroke(ctx, [foot, [foot[0] + 3, foot[1]]], 1.8, ink('20,16,12', a));
    };
    leg(1, 0.6);

    ctx.save();
    ctx.translate(0, -14); ctx.rotate(lean); ctx.translate(0, 14);
    // 远侧手臂
    const swing = Math.sin(ph) * 0.6 * amp;
    const armFar = [[0, -29.5 + bob], [-Math.sin(swing) * 5, -24 + bob], [-Math.sin(swing) * 9, -19.5 + bob]];
    stroke(ctx, armFar, 2, ink(K.robe, 0.7));
    // 袍
    const sway = Math.sin(ph) * 1.4 * amp;
    ctx.beginPath();
    ctx.moveTo(-3.3, -31 + bob);
    ctx.quadraticCurveTo(-5.2, -22 + bob, -6.4 + sway, -11 + bob * 0.4);
    ctx.lineTo(6.2 + sway, -11 + bob * 0.4);
    ctx.quadraticCurveTo(5, -22 + bob, 3.6, -31 + bob);
    ctx.closePath();
    ctx.fillStyle = ink(K.robe, 0.92); ctx.fill();
    ctx.strokeStyle = 'rgba(15,12,8,0.7)'; ctx.lineWidth = 0.7; ctx.stroke();
    // 腰带与衣褶
    stroke(ctx, [[-4.4, -21 + bob], [4.4, -21.5 + bob]], 1, 'rgba(180,150,90,0.55)');
    stroke(ctx, [[-1, -20 + bob], [-2 + sway * 0.5, -11.5 + bob]], 0.6, 'rgba(0,0,0,0.35)');
    ctx.restore();

    leg(0, 0.95);

    ctx.save();
    ctx.translate(0, -14); ctx.rotate(lean); ctx.translate(0, 14);
    // 头与帽（抬头时绕颈部后仰）
    ctx.save();
    ctx.translate(0.6, -31 + bob); ctx.rotate(-look * 0.85); ctx.translate(-0.6, 31 - bob);
    const hx = 1.2, hy = -35.8 + bob;
    ctx.fillStyle = 'rgba(224,198,146,0.97)';
    ctx.beginPath(); ctx.ellipse(hx, hy, 3.1, 3.4, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(20,16,10,0.7)'; ctx.lineWidth = 0.55; ctx.stroke();
    ctx.fillStyle = 'rgba(15,12,8,0.85)'; ctx.fillRect(hx + 1.6, hy - 0.6, 0.9, 0.9); // 眼
    if (K.hat === 'bamboo') {
      ctx.beginPath();
      ctx.moveTo(hx - 10, hy - 1.6); ctx.quadraticCurveTo(hx - 3, hy - 3.5, hx + 0.4, hy - 9.8);
      ctx.quadraticCurveTo(hx + 4, hy - 3.5, hx + 10.5, hy - 1.6);
      ctx.quadraticCurveTo(hx, hy + 0.3, hx - 10, hy - 1.6);
      ctx.fillStyle = 'rgba(82,66,40,0.95)'; ctx.fill();
      ctx.strokeStyle = 'rgba(18,14,8,0.8)'; ctx.lineWidth = 0.6; ctx.stroke();
      stroke(ctx, [[hx - 5, hy - 2.4], [hx, hy - 8], [hx + 5.5, hy - 2.4]], 0.5, 'rgba(190,160,100,0.5)');
    } else {
      ctx.fillStyle = 'rgba(18,16,12,0.95)';
      ctx.beginPath(); ctx.ellipse(hx - 0.6, hy - 2.6, 3.4, 2.3, 0, Math.PI, TAU); ctx.fill();
      const fl = Math.sin(t * 5 + ph) * 1.2 * (0.3 + amp);
      stroke(ctx, [[hx - 3, hy - 2.6], [hx - 6, hy - 1.5 + fl], [hx - 8, hy + 0.6 + fl]], 0.9, 'rgba(18,16,12,0.9)');
    }
    ctx.restore();

    // 近侧手臂与随身物
    const shoulder = [0.4, -29.5 + bob];
    let hand = [Math.sin(swing) * 8, -19.5 + bob], elbow = [Math.sin(swing) * 4.2 - 0.6, -24.5 + bob];
    if (look > 0) { // 抬手遮额
      const k = look;
      hand = [lerp(hand[0], 5.2, k), lerp(hand[1], -38 + bob, k)];
      elbow = [lerp(elbow[0], 5.6, k), lerp(elbow[1], -30.5 + bob, k)];
    }
    if (K.item === 'pole') {
      // 肩挑的包袱
      const bs = Math.sin(ph * 2) * 1.4 * amp - run * 2;
      stroke(ctx, [[-15, -32.5 + bob], [16, -28.5 + bob]], 1.3, 'rgba(70,52,30,0.95)');
      for (const [px, py, sz] of [[-14, -32.5, 1], [15, -28.8, 0.85]]) {
        stroke(ctx, [[px, py + bob], [px + bs * 0.3, py + bob + 7]], 0.6, 'rgba(30,22,12,0.8)');
        ctx.fillStyle = 'rgba(138,112,72,0.97)';
        ctx.beginPath(); ctx.ellipse(px + bs * 0.4, py + bob + 10 * sz, 4.4 * sz, 4.8 * sz, 0, 0, TAU); ctx.fill();
        ctx.strokeStyle = 'rgba(20,16,10,0.8)'; ctx.lineWidth = 0.6; ctx.stroke();
        stroke(ctx, [[px + bs * 0.4 - 3 * sz, py + bob + 10 * sz], [px + bs * 0.4 + 3 * sz, py + bob + 10 * sz]], 0.5, 'rgba(20,16,10,0.6)');
      }
    }
    stroke(ctx, [shoulder, elbow, hand], 2.1, ink(K.robe, 0.95));
    ctx.fillStyle = 'rgba(224,198,146,0.95)';
    ctx.beginPath(); ctx.arc(hand[0], hand[1], 1.1, 0, TAU); ctx.fill();
    if (K.item === 'staff') {
      const gx = hand[0] + 6 + (look > 0 ? 0 : 3);
      stroke(ctx, [[hand[0] - 1.5, hand[1] - 8], [gx, -0.5 - Math.max(0, Math.cos(ph)) * 2 * amp]], 1.5, 'rgba(60,44,24,0.95)');
    } else if (K.item === 'whip') {
      const fl = Math.sin(t * 4.2 + o.seed) * 4;
      stroke(ctx, [[hand[0], hand[1]], [hand[0] + 8, hand[1] - 9], [hand[0] + 17, hand[1] - 5 + fl], [hand[0] + 24, hand[1] + 1 - fl * 0.6]], 0.9, 'rgba(40,28,14,0.9)');
    }
    ctx.restore();
  }

  /* —— 驮骡（朝右绘制，外面翻转） —— */
  const MULE = [
    { body: '58,48,36', shade: '30,24,18', pack: [198, 172, 120], size: 1 },
    { body: '34,30,24', shade: '16,14,10', pack: [186, 158, 104], size: 1.02 },
    { body: '86,74,56', shade: '46,38,28', pack: [204, 180, 130], size: 0.98 },
    { body: '48,40,30', shade: '22,18,14', pack: [190, 164, 112], size: 1 }
  ];

  function drawMule(ctx, o) {
    const M = MULE[o.idx % MULE.length], ph = o.phase, amp = o.amp, t = o.t;
    const bob = -Math.abs(Math.sin(ph * 2)) * 0.9 * amp;
    const by = -17 + bob;
    ctx.save(); ctx.scale(M.size, M.size);
    ctx.fillStyle = 'rgba(20,16,10,0.22)';
    ctx.beginPath(); ctx.ellipse(1, 0.8, 17, 2.4, 0, 0, TAU); ctx.fill();

    const leg = (x, p, a, front) => {
      const sw = Math.sin(p) * 4.8 * amp;
      const lift = Math.max(0, Math.cos(p)) * 3.4 * amp;
      const hip = [x, by + 4], knee = [x + sw * 0.35 + (front ? 1.2 : -1.2), -8.5 - lift * 0.5], foot = [x + sw, -lift];
      stroke(ctx, [hip, knee, foot], 2.2, ink(M.shade, a));
      stroke(ctx, [foot, [foot[0] + 1.6, foot[1]]], 2, ink('12,10,8', a));
    };
    leg(-9.5, ph + Math.PI, 0.55, false); leg(8.5, ph, 0.55, true);

    // 尾
    const tw = Math.sin(t * 2.4 + o.seed) * 2.2;
    stroke(ctx, [[-13, by - 1.5], [-17 + tw * 0.4, by + 3], [-17.5 + tw, by + 9]], 1.7, ink(M.shade, 0.9));
    // 躯干
    ctx.fillStyle = ink(M.body, 0.95);
    ctx.beginPath(); ctx.ellipse(0, by, 14.5, 6.6, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = ink(M.shade, 0.45);
    ctx.beginPath(); ctx.ellipse(0.5, by + 2.4, 13, 3.6, 0, 0, TAU); ctx.fill();
    // 颈与头
    ctx.fillStyle = ink(M.body, 0.95);
    ctx.beginPath();
    ctx.moveTo(8, by - 4.5); ctx.quadraticCurveTo(14, by - 11, 18, by - 13.5);
    ctx.lineTo(21.5, by - 9); ctx.quadraticCurveTo(15, by - 3, 12, by + 2); ctx.closePath(); ctx.fill();
    const hb = Math.sin(ph * 2) * 0.8 * amp;
    ctx.save(); ctx.translate(21, by - 11.5 + hb); ctx.rotate(0.5);
    ctx.fillStyle = ink(M.body, 1); ctx.beginPath(); ctx.ellipse(0, 0, 5.8, 2.9, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = ink(M.shade, 0.9); ctx.beginPath(); ctx.ellipse(4, 0.8, 2.2, 1.9, 0, 0, TAU); ctx.fill();
    ctx.restore();
    // 耳
    stroke(ctx, [[18, by - 14 + hb], [17.2, by - 19 + hb]], 1.8, ink(M.shade, 1));
    stroke(ctx, [[19.6, by - 14.2 + hb], [20.2, by - 19 + hb]], 1.5, ink(M.shade, 0.8));
    // 鬃
    stroke(ctx, [[14, by - 9.5], [11, by - 7], [8, by - 4.5]], 1.2, ink(M.shade, 0.8));
    // 铃
    const bsw = Math.sin(t * 7 + o.seed + ph) * 0.8 * (0.3 + amp);
    ctx.fillStyle = 'rgba(190,150,60,0.95)';
    ctx.beginPath(); ctx.arc(13.5 + bsw, by + 1.2, 1.3, 0, TAU); ctx.fill();

    // 驮货：鞍毯、两个包裹、两侧布袋
    const P = M.pack, pc = 'rgb(' + P[0] + ',' + P[1] + ',' + P[2] + ')';
    const pd = 'rgb(' + (P[0] - 40) + ',' + (P[1] - 40) + ',' + (P[2] - 36) + ')';
    ctx.fillStyle = 'rgba(70,52,34,0.95)'; ctx.fillRect(-10, by - 7.4, 20, 2.6);
    const sag = Math.sin(ph * 2 + 1) * 0.5 * amp;
    for (const [bx, w, h, yy] of [[-12 + 0, 13, 11, -6.6], [-0.5, 11.5, 9.5, -6.6]]) {
      ctx.beginPath();
      const x0 = bx, y0 = by + yy + sag, r = 3;
      ctx.moveTo(x0 + r, y0 - h); ctx.arcTo(x0 + w, y0 - h, x0 + w, y0, r); ctx.arcTo(x0 + w, y0, x0, y0, r); ctx.arcTo(x0, y0, x0, y0 - h, r); ctx.arcTo(x0, y0 - h, x0 + w, y0 - h, r); ctx.closePath();
      ctx.fillStyle = pc; ctx.fill(); ctx.strokeStyle = 'rgba(24,18,10,0.85)'; ctx.lineWidth = 0.8; ctx.stroke();
      ctx.strokeStyle = pd; ctx.lineWidth = 0.7;
      ctx.beginPath(); ctx.moveTo(x0 + 1, y0 - h * 0.5); ctx.lineTo(x0 + w - 1, y0 - h * 0.5); ctx.moveTo(x0 + w * 0.5, y0 - h + 1); ctx.lineTo(x0 + w * 0.5, y0 - 1); ctx.stroke();
    }
    for (const bx of [-9, 8]) {
      ctx.fillStyle = pd; ctx.beginPath(); ctx.ellipse(bx, by + 4.5 + sag, 3, 5, 0, 0, TAU); ctx.fill();
      ctx.strokeStyle = 'rgba(24,18,10,0.8)'; ctx.lineWidth = 0.7; ctx.stroke();
    }
    leg(-9.5, ph, 0.95, false); leg(8.5, ph + Math.PI, 0.95, true);
    ctx.restore();
  }

  /* —— 飞鸟 —— */
  function drawBird(ctx, x, y, ang, size, flap, alpha) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(clamp(Math.cos(ang) * -0.3, -0.4, 0.4) * 0.6); ctx.scale(size, size);
    const wing = (sgn, col, w) => {
      ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(0, 0.04);
      ctx.quadraticCurveTo(sgn * 0.5, -0.52 * flap - 0.1, sgn * 1.05, -0.62 * flap + 0.08 + 0.22 * (1 - Math.abs(flap)));
      ctx.stroke();
    };
    wing(-1, 'rgba(214,190,130,' + 0.42 * alpha + ')', 0.52); wing(1, 'rgba(214,190,130,' + 0.42 * alpha + ')', 0.52);
    wing(-1, 'rgba(14,12,8,' + alpha + ')', 0.22); wing(1, 'rgba(14,12,8,' + alpha + ')', 0.22);
    ctx.fillStyle = 'rgba(14,12,8,' + alpha + ')';
    ctx.beginPath(); ctx.ellipse(0, 0.08, 0.26, 0.17, 0, 0, TAU); ctx.fill();
    ctx.restore();
  }

  G.Actors = { PATH, PATH_LEN, posAt, drawPerson, drawMule, drawBird };
})(window);
