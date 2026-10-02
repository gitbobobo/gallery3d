import * as THREE from 'three';

const TAU = Math.PI * 2;
const lerp = THREE.MathUtils.lerp;

function polar(r, a) {
  return [r * Math.cos(a), r * Math.sin(a)];
}

function shapeFromPoints(pts) {
  const s = new THREE.Shape();
  s.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
  s.closePath();
  return s;
}

// 正齿轮（渐开线近似）：齿中心位于 local 角度 0 起每隔 2π/T
export function gearShape(T, m, o = {}) {
  const add = (o.addendum ?? 0.85) * m;
  const ded = (o.dedendum ?? 1.05) * m;
  const rp = (T * m) / 2;
  const rt = rp + add;
  const rr = Math.max(rp * 0.08, rp - ded);
  const p = TAU / T;
  const thk = o.thickness ?? 0.42;
  const half = (r) => {
    const h = (p * thk) / 2;
    if (r >= rp) return h * lerp(1, 0.42, Math.min(1, (r - rp) / add));
    return h * lerp(1, 1.75, Math.min(1, (rp - r) / ded));
  };
  const steps = o.steps ?? 3;
  const pts = [];
  for (let k = 0; k < T; k++) {
    const a = k * p;
    pts.push(polar(rr, a - p / 2));
    for (let s = 0; s <= steps; s++) {
      const r = lerp(rr, rt, s / steps);
      pts.push(polar(r, a - half(r)));
    }
    for (let s = steps; s >= 0; s--) {
      const r = lerp(rr, rt, s / steps);
      pts.push(polar(r, a + half(r)));
    }
  }
  return shapeFromPoints(pts);
}

// 齿轴（pinion）：齿薄、根圆深，近似圆凸叶形
export function pinionShape(T, m) {
  const rp = (T * m) / 2;
  const add = 0.95 * m;
  const ded = 1.25 * m;
  const rt = rp + add;
  const rr = rp - ded;
  const p = TAU / T;
  const pts = [];
  const steps = 4;
  const half = (r) => {
    const h = (p * 0.26) / 2;
    return h * lerp(1.6, 0.35, Math.min(1, Math.max(0, (r - rr) / (rt - rr))));
  };
  for (let k = 0; k < T; k++) {
    const a = k * p;
    pts.push(polar(rr, a - p / 2));
    for (let s = 0; s <= steps; s++) {
      const r = lerp(rr, rt, s / steps);
      pts.push(polar(r, a - half(r)));
    }
    for (let s = steps; s >= 0; s--) {
      const r = lerp(rr, rt, s / steps);
      pts.push(polar(r, a + half(r)));
    }
  }
  return shapeFromPoints(pts);
}

// 辐孔（镂空轮辐）
export function addSpokeWindows(shape, T, m, o = {}) {
  const rp = (T * m) / 2;
  const n = o.count ?? 5;
  const rIn = o.hubR ?? rp * 0.3;
  const rOut = o.rimR ?? rp - 1.4 * m;
  if (rOut - rIn < m * 1.8) return;
  const openFrac = o.openFrac ?? 0.58;
  const halfW = (Math.PI / n) * openFrac;
  const off = o.phase ?? 0;
  for (let k = 0; k < n; k++) {
    const a = (k + 0.5) * (TAU / n) + off;
    const hole = new THREE.Path();
    hole.absarc(0, 0, rOut, a - halfW, a + halfW, false);
    hole.absarc(0, 0, rIn, a + halfW, a - halfW, true);
    shape.holes.push(hole);
  }
}

export function addCircleHole(shape, x, y, r) {
  const hole = new THREE.Path();
  hole.absarc(x, y, r, 0, TAU, true);
  shape.holes.push(hole);
}

// 擒纵轮：20 个细长钩状齿，旋转方向为 +
export function escapeShape(T = 20, rp = 8) {
  const p = TAU / T;
  const rr = rp * 0.83;
  const rt = rp * 1.42;
  const pts = [];
  for (let k = 0; k < T; k++) {
    const a = k * p;
    pts.push(polar(rr, a + 0.30 * p));
    pts.push(polar(lerp(rr, rt, 0.24), a + 0.12 * p));
    pts.push(polar(lerp(rr, rt, 0.62), a + 0.02 * p));
    pts.push(polar(rt, a - 0.02 * p));
    pts.push(polar(lerp(rr, rt, 0.88), a - 0.14 * p));
    pts.push(polar(lerp(rr, rt, 0.4), a - 0.26 * p));
    pts.push(polar(rr, a - 0.34 * p));
  }
  return shapeFromPoints(pts);
}

// 棘轮（大钢轮）：锯齿
export function ratchetShape(T = 20, rp = 12.5) {
  const p = TAU / T;
  const rr = rp - 1.2;
  const rt = rp + 0.8;
  const pts = [];
  for (let k = 0; k < T; k++) {
    const a = k * p;
    pts.push(polar(rr, a - 0.45 * p));
    pts.push(polar(rt, a + 0.30 * p));
    pts.push(polar(rr, a + 0.30 * p));
  }
  return shapeFromPoints(pts);
}

// 螺旋发条/游丝：沿阿基米德螺旋扫掠矩形截面
export function springGeometry(r0, r1, turns, th, wd, o = {}) {
  const segs = Math.max(160, Math.round(turns * 72));
  const pos = [];
  const idx = [];
  const corner = (i, sn, sz) => {
    const t = i / segs;
    const a = (o.phase0 ?? 0) + t * turns * TAU;
    const r = lerp(r0, r1, t) + sn * th * 0.5;
    const z = sz * wd * 0.5;
    return [r * Math.cos(a), r * Math.sin(a), z];
  };
  for (let i = 0; i <= segs; i++) {
    pos.push(...corner(i, -1, 1), ...corner(i, 1, 1), ...corner(i, 1, -1), ...corner(i, -1, -1));
  }
  for (let i = 0; i < segs; i++) {
    const b0 = i * 4;
    const b1 = (i + 1) * 4;
    for (let e = 0; e < 4; e++) {
      const a = b0 + e;
      const b = b0 + ((e + 1) % 4);
      const c = b1 + ((e + 1) % 4);
      const d = b1 + e;
      idx.push(a, b, c, a, c, d);
    }
  }
  idx.push(0, 2, 1, 0, 3, 2);
  const last = segs * 4;
  idx.push(last, last + 1, last + 2, last, last + 2, last + 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

// 带形态目标（呼吸）的游丝
export function springGeometryMorphed(r0, r1, turns, th, wd, o = {}) {
  const geo = springGeometry(r0, r1, turns, th, wd, o);
  const p = geo.attributes.position;
  const arr = new Float32Array(p.count * 3);
  const ph0 = o.phase0 ?? 0;
  const span = turns * TAU;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    const r = Math.hypot(x, y) || 1e-6;
    const a = Math.atan2(y, x);
    let t = (a - ph0) / span;
    if (t < 0) t += Math.floor(-t / 1 + 1);
    t = Math.min(1, Math.max(0, t));
    const k = 1 - 0.075 * t;
    const na = a - 0.12 * t * (1 - t) * 4 * 0.5;
    const nr = r * k;
    arr[i * 3] = nr * Math.cos(na);
    arr[i * 3 + 1] = nr * Math.sin(na);
    arr[i * 3 + 2] = p.getZ(i);
  }
  geo.morphAttributes.position = [new THREE.Float32BufferAttribute(arr, 3)];
  return geo;
}

// 夹板轮廓：多个圆的凸包 + Chaikin 平滑
export function blobShape(circles, margin, o = {}) {
  const pts = [];
  for (const c of circles) {
    const n = 40;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU;
      pts.push([c.x + (c.r + margin) * Math.cos(a), c.y + (c.r + margin) * Math.sin(a)]);
    }
  }
  let hull = convexHull(pts);
  const rounds = o.smooth ?? 3;
  for (let r = 0; r < rounds; r++) hull = chaikin(hull);
  const s = new THREE.Shape();
  s.moveTo(hull[0][0], hull[0][1]);
  for (let i = 1; i < hull.length; i++) s.lineTo(hull[i][0], hull[i][1]);
  s.closePath();
  for (const h of o.holes ?? []) addCircleHole(s, h.x, h.y, h.r);
  return s;
}

function chaikin(pts) {
  const out = [];
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const p0 = pts[i];
    const p1 = pts[(i + 1) % n];
    out.push([lerp(p0[0], p1[0], 0.25), lerp(p0[1], p1[1], 0.25)]);
    out.push([lerp(p0[0], p1[0], 0.75), lerp(p0[1], p1[1], 0.75)]);
  }
  return out;
}

function convexHull(points) {
  const pts = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

export function extrude(shape, depth, o = {}) {
  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: o.bevel ?? true,
    bevelThickness: 0.14,
    bevelSize: 0.14,
    bevelSegments: 1,
    curveSegments: o.curveSegments ?? 12,
  });
}
