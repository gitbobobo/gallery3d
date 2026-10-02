import * as THREE from 'three';

const TAU = Math.PI * 2;
const pol = (r, a) => new THREE.Vector2(r * Math.cos(a), r * Math.sin(a));

/* ---------- 渐开线近似齿轮轮廓 ---------- */
export function gearShape(N, m, opts = {}) {
  const add = opts.add ?? 1.0, ded = opts.ded ?? 1.25;
  const rp = (m * N) / 2;
  const ra = rp + m * add, rr = Math.max(rp - m * ded, rp * 0.55);
  const p = TAU / N;
  const tipF = opts.tipF ?? 0.10;      // 齿顶半宽（占节距比例）
  const rootF = opts.rootF ?? 0.20;    // 齿根处齿侧起点
  const s = new THREE.Shape();
  for (let k = 0; k < N; k++) {
    const a = k * p;
    const pts = [
      pol(rr, a - p * 0.5 + (N < 16 ? p * 0.06 : 0)),
      pol(rr, a - p * rootF),
      pol(ra, a - p * tipF),
      pol(ra, a + p * tipF),
      pol(rr, a + p * rootF)
    ];
    if (k === 0) s.moveTo(pts[0].x, pts[0].y); else s.lineTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) s.lineTo(pts[i].x, pts[i].y);
  }
  s.closePath();
  return s;
}

/* ---------- 辐条镂空（环形扇孔） ---------- */
function sectorHole(cx, cy, r0, r1, a0, a1) {
  const h = new THREE.Path();
  const n = 14;
  for (let i = 0; i <= n; i++) {
    const pt = pol(1, a0 + ((a1 - a0) * i) / n);
    const x = cx + pt.x * r1, y = cy + pt.y * r1;
    if (i === 0) h.moveTo(x, y); else h.lineTo(x, y);
  }
  for (let i = n; i >= 0; i--) {
    const pt = pol(1, a0 + ((a1 - a0) * i) / n);
    h.lineTo(cx + pt.x * r0, cy + pt.y * r0);
  }
  h.closePath();
  return h;
}

export function wheelGeo(N, m, thickness, spokes = 4) {
  const shape = gearShape(N, m);
  const ra = (m * N) / 2 + m;
  const rHub = Math.max(ra * 0.17, 0.42), rIn = ra * 0.76;
  for (let i = 0; i < spokes; i++) {
    const a0 = (i / spokes) * TAU + 0.10, a1 = ((i + 1) / spokes) * TAU - 0.10;
    shape.holes.push(sectorHole(0, 0, rHub, rIn, a0, a1));
  }
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: thickness, bevelEnabled: true, bevelThickness: thickness * 0.14,
    bevelSize: thickness * 0.12, bevelSegments: 1, curveSegments: 4
  });
  g.translate(0, 0, -thickness / 2);
  return g;
}

export function pinionGeo(N, m, h) {
  const g = new THREE.ExtrudeGeometry(gearShape(N, m, { tipF: 0.14, rootF: 0.24, ded: 1.0 }), {
    depth: h, bevelEnabled: false, curveSegments: 3
  });
  g.translate(0, 0, -h / 2);
  return g;
}

/* ---------- 擒纵轮（尖齿 + 细辐条） ---------- */
export function escapeWheelGeo(r, N = 15) {
  const p = TAU / N, rr = r * 0.80;
  const s = new THREE.Shape();
  for (let k = 0; k < N; k++) {
    const a = k * p;
    const pts = [
      pol(rr, a - p * 0.40),
      pol(r * 0.995, a - p * 0.26),
      pol(r, a - p * 0.13),
      pol(rr, a + p * 0.03)
    ];
    if (k === 0) s.moveTo(pts[0].x, pts[0].y); else s.lineTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) s.lineTo(pts[i].x, pts[i].y);
  }
  s.closePath();
  const rHub = r * 0.16, rIn = r * 0.66;
  for (let i = 0; i < 5; i++) {
    const a0 = (i / 5) * TAU + 0.16, a1 = ((i + 1) / 5) * TAU - 0.16;
    s.holes.push(sectorHole(0, 0, rHub, rIn, a0, a1));
  }
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.2, bevelEnabled: false, curveSegments: 4 });
  g.translate(0, 0, -0.1);
  return g;
}

/* ---------- 发条盒齿圈（内径挖空成环） ---------- */
export function barrelTeethGeo(N, m, thickness) {
  const shape = gearShape(N, m, { tipF: 0.11, rootF: 0.2 });
  const hole = new THREE.Path();
  hole.absarc(0, 0, (m * N) / 2 - m * 1.9, 0, TAU, true);
  shape.holes.push(hole);
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: thickness, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 1, curveSegments: 4
  });
  g.translate(0, 0, -thickness / 2);
  return g;
}

/* ---------- 棘爪大钢轮（细密锯齿） ---------- */
export function ratchetGeo(r, N, thickness) {
  const s = new THREE.Shape();
  for (let k = 0; k < N; k++) {
    const a = (k / N) * TAU, w = TAU / N;
    const pts = [pol(r * 0.94, a), pol(r, a + w * 0.42), pol(r * 0.94, a + w * 0.5)];
    if (k === 0) s.moveTo(pts[0].x, pts[0].y); else s.lineTo(pts[0].x, pts[0].y);
    s.lineTo(pts[1].x, pts[1].y);
    s.lineTo(pts[2].x, pts[2].y);
  }
  s.closePath();
  const hole = new THREE.Path();
  hole.absarc(0, 0, r * 0.16, 0, TAU, true);
  s.holes.push(hole);
  const g = new THREE.ExtrudeGeometry(s, { depth: thickness, bevelEnabled: false, curveSegments: 3 });
  g.translate(0, 0, -thickness / 2);
  return g;
}

/* ---------- 摆轮（带轮缘螺钉） ---------- */
export function balanceWheel(rimR, mat, screwMat) {
  const g = new THREE.Group();
  const rim = new THREE.Mesh(
    new THREE.CylinderGeometry(rimR, rimR, 0.42, 64, 1, true), mat
  );
  rim.rotation.x = Math.PI / 2;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(rimR, 0.21, 12, 64), mat);
  g.add(ring);
  for (const sgn of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(rimR * 2 - 0.5, 0.42, 0.2), mat);
    arm.rotation.z = sgn * Math.PI / 4;
    g.add(arm);
  }
  // 轮缘外侧调速螺钉
  const sg = new THREE.CylinderGeometry(0.14, 0.14, 0.24, 8);
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * TAU + 0.12;
    const sc = new THREE.Mesh(sg, screwMat);
    sc.position.set(Math.cos(a) * (rimR + 0.1), Math.sin(a) * (rimR + 0.1), 0);
    sc.rotation.x = Math.PI / 2;
    g.add(sc);
  }
  g.userData.rim = ring;
  return g;
}

/* ---------- 游丝（阿基米德螺线管） ---------- */
export function hairspringGeo(r0, r1, turns, tubeR = 0.035) {
  class Spiral extends THREE.Curve {
    getPoint(t, target = new THREE.Vector3()) {
      const a = t * turns * TAU;
      const r = r0 + (r1 - r0) * t;
      return target.set(r * Math.cos(a), r * Math.sin(a), Math.sin(t * 6) * 0.015);
    }
  }
  return new THREE.TubeGeometry(new Spiral(), 520, tubeR, 6, false);
}

/* ---------- 凸多边形包络（夹板外形：若干圆的外包络） ---------- */
export function hullShape(circles) {
  const pts = [];
  for (const c of circles)
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * TAU;
      pts.push(new THREE.Vector2(c.x + c.r * Math.cos(a), c.y + c.r * Math.sin(a)));
    }
  // Jarvis gift wrapping
  pts.sort((p, q) => p.x - q.x || p.y - q.y);
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lower = [], upper = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  const hull = lower.slice(0, -1).concat(upper.slice(0, -1));
  const s = new THREE.Shape(hull);
  return s;
}

export function bridgeGeo(circles, zTop, th) {
  const s = hullShape(circles);
  // 挖轴孔
  for (const c of circles) {
    if (!c.jewel) continue;
    const h = new THREE.Path();
    h.absarc(c.x, c.y, 0.34, 0, TAU, true);
    s.holes.push(h);
  }
  const g = new THREE.ExtrudeGeometry(s, {
    depth: th, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 1, curveSegments: 6
  });
  g.translate(0, 0, -th);
  return g;
}

/* ---------- 主夹板（圆角矩形 + 轴孔） ---------- */
export function plateGeo(w, h, r, pivots) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y); s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r); s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h); s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r); s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  for (const p of pivots) {
    const hole = new THREE.Path();
    hole.absarc(p.x, p.y, 0.4, 0, TAU, true);
    s.holes.push(hole);
  }
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.6, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.1, bevelSegments: 2, curveSegments: 10 });
  g.translate(0, 0, -0.6);
  return g;
}

/* ---------- 日内瓦条纹贴图（程序生成） ---------- */
export function stripesTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#b0b0b0';
  ctx.fillRect(0, 0, 512, 512);
  const bw = 64;
  for (let x = 0; x < 512; x += bw) {
    const g = ctx.createLinearGradient(x, 0, x + bw, 0);
    g.addColorStop(0, 'rgba(255,255,255,0.13)');
    g.addColorStop(0.45, 'rgba(255,255,255,0.02)');
    g.addColorStop(0.55, 'rgba(0,0,0,0.09)');
    g.addColorStop(1, 'rgba(0,0,0,0.02)');
    ctx.fillStyle = g;
    ctx.fillRect(x, 0, bw, 512);
  }
  ctx.globalAlpha = 0.03;
  for (let i = 0; i < 1400; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? '#fff' : '#000';
    ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 40, 1);
  }
  ctx.globalAlpha = 1;
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/* ---------- 标准件 ---------- */
export function screw(matBlued, r = 0.22) {
  const g = new THREE.Group();
  const head = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.92, 0.14, 16), matBlued);
  head.rotation.x = Math.PI / 2;
  const slot = new THREE.Mesh(new THREE.BoxGeometry(r * 1.7, r * 0.42, 0.05), matBlued);
  slot.position.z = 0.06;
  g.add(head, slot);
  g.rotation.z = Math.random() * TAU;
  return g;
}

export function jewel(mat, r = 0.24, h = 0.18) {
  const j = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.8, h, 14), mat);
  j.rotation.x = Math.PI / 2;
  return j;
}
