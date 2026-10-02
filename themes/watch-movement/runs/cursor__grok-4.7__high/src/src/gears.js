import * as THREE from 'three';
import { ADDENDUM, BACKLASH, DEDENDUM } from './layout.js';

function extrude(shape, thickness, curveSegments = 12) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: false,
    curveSegments,
    steps: 1,
  });
  geo.translate(0, 0, -thickness / 2);
  geo.computeVertexNormals();
  return geo;
}

export function gearShape(teeth, module, backlash = BACKLASH) {
  const alpha = (20 * Math.PI) / 180;
  const rp = (teeth * module) / 2;
  const rb = rp * Math.cos(alpha);
  const ra = rp + ADDENDUM * module;
  const rf = Math.max(rp - DEDENDUM * module, rp * 0.32);
  const step = (Math.PI * 2) / teeth;
  const toothThick = (Math.PI / teeth) * (1 - backlash);

  function flank(r, side) {
    if (r <= rb * 1.00001) {
      const a = side * (toothThick / 2 - involutePolar(rp));
      return [Math.cos(a) * r, Math.sin(a) * r];
    }
    const t = Math.sqrt((r / rb) ** 2 - 1);
    const x = rb * (Math.cos(t) + t * Math.sin(t));
    const y = rb * (Math.sin(t) - t * Math.cos(t));
    const polar = Math.atan2(y, x);
    const a = side * (toothThick / 2 - involutePolar(rp) + polar);
    const rad = Math.hypot(x, y);
    return [Math.cos(a) * rad, Math.sin(a) * rad];
  }

  function involutePolar(r) {
    const rr = Math.max(r, rb);
    const t = Math.sqrt((rr / rb) ** 2 - 1);
    const x = rb * (Math.cos(t) + t * Math.sin(t));
    const y = rb * (Math.sin(t) - t * Math.cos(t));
    return Math.atan2(y, x);
  }

  function turn(p, ang) {
    const c = Math.cos(ang);
    const s = Math.sin(ang);
    return [c * p[0] - s * p[1], s * p[0] + c * p[1]];
  }

  const pts = [];
  const push = (x, y) => {
    const last = pts[pts.length - 1];
    if (last && (x - last[0]) ** 2 + (y - last[1]) ** 2 < 1e-14) return;
    pts.push([x, y]);
  };

  const n = 8;
  for (let i = 0; i < teeth; i++) {
    const base = i * step;
    for (let s = 0; s <= n; s++) {
      const r = rf + (ra - rf) * (s / n);
      const p = turn(flank(r, -1), base);
      push(p[0], p[1]);
    }
    const cw = flank(ra, -1);
    const ccw = flank(ra, 1);
    let a0 = Math.atan2(cw[1], cw[0]);
    let a1 = Math.atan2(ccw[1], ccw[0]);
    if (a1 < a0) a1 += Math.PI * 2;
    for (let s = 1; s < 3; s++) {
      const a = a0 + ((a1 - a0) * s) / 3;
      const p = turn([Math.cos(a) * ra, Math.sin(a) * ra], base);
      push(p[0], p[1]);
    }
    for (let s = 0; s <= n; s++) {
      const r = ra + (rf - ra) * (s / n);
      const p = turn(flank(r, 1), base);
      push(p[0], p[1]);
    }
    const here = flank(rf, 1);
    const next = flank(rf, -1);
    let b0 = Math.atan2(here[1], here[0]) + base;
    let b1 = Math.atan2(next[1], next[0]) + base + step;
    while (b1 < b0) b1 += Math.PI * 2;
    for (let s = 1; s < 3; s++) {
      const a = b0 + ((b1 - b0) * s) / 3;
      push(Math.cos(a) * rf, Math.sin(a) * rf);
    }
  }

  const shape = new THREE.Shape();
  shape.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1]);
  shape.closePath();
  return shape;
}

export function gearGeometry(teeth, module, thickness, holeRadius = 0) {
  const shape = gearShape(teeth, module);
  if (holeRadius > 0) {
    const hole = new THREE.Path();
    hole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  return extrude(shape, thickness);
}

export function escapeGeometry(thickness) {
  const teeth = 15;
  const tip = 0.62;
  const root = 0.34;
  const step = (Math.PI * 2) / teeth;
  const shape = new THREE.Shape();
  const pts = [];
  const push = (a, r) => pts.push([Math.cos(a) * r, Math.sin(a) * r]);
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    push(a - 0.11, root);
    push(a - 0.03, tip);
    push(a + 0.02, tip);
    push(a + 0.09, tip * 0.97);
    push(a + 0.095, root);
    const a0 = a + 0.095;
    const a1 = a + step - 0.11;
    for (let s = 1; s <= 2; s++) {
      const t = s / 3;
      push(a0 + (a1 - a0) * t, root);
    }
  }
  shape.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1]);
  shape.closePath();
  const hole = new THREE.Path();
  hole.absarc(0, 0, 0.07, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return extrude(shape, thickness);
}

export function ratchetGeometry(thickness) {
  const teeth = 28;
  const outer = 0.34;
  const inner = 0.2;
  const step = (Math.PI * 2) / teeth;
  const shape = new THREE.Shape();
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const p1 = [Math.cos(a) * inner, Math.sin(a) * inner];
    const p2 = [Math.cos(a + 0.018) * outer, Math.sin(a + 0.018) * outer];
    const p3 = [Math.cos(a + step * 0.7) * outer, Math.sin(a + step * 0.7) * outer];
    if (i === 0) shape.moveTo(p1[0], p1[1]);
    else shape.lineTo(p1[0], p1[1]);
    shape.lineTo(p2[0], p2[1]);
    shape.lineTo(p3[0], p3[1]);
  }
  shape.closePath();
  const hole = new THREE.Path();
  hole.absarc(0, 0, 0.06, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return extrude(shape, thickness);
}

export function ringGeometry(outer, inner, thickness, segments = 72) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outer, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, inner, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return extrude(shape, thickness, segments);
}

export function stadiumGeometry(x1, z1, x2, z2, r1, r2, thickness) {
  // Shape Y maps to world -Z under the gear's Rx(-90), so store z negated.
  const ax = x1;
  const ay = -z1;
  const bx = x2;
  const by = -z2;
  const ang = Math.atan2(by - ay, bx - ax);
  const left = ang + Math.PI / 2;
  const right = ang - Math.PI / 2;
  const shape = new THREE.Shape();
  shape.moveTo(ax + Math.cos(left) * r1, ay + Math.sin(left) * r1);
  shape.lineTo(bx + Math.cos(left) * r2, by + Math.sin(left) * r2);
  shape.absarc(bx, by, r2, left, right, true);
  shape.lineTo(ax + Math.cos(right) * r1, ay + Math.sin(right) * r1);
  shape.absarc(ax, ay, r1, right, left, true);
  const hole = new THREE.Path();
  hole.absarc(ax, ay, Math.min(r1, r2) * 0.34, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return extrude(shape, thickness);
}

export function stripGeometry(count) {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 4 * 3);
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const indices = [];
  for (let i = 0; i < count - 1; i++) {
    const a = i * 4;
    const b = a + 4;
    indices.push(
      a, a + 1, b,
      a + 1, b + 1, b,
      a + 2, b + 2, a + 3,
      a + 3, b + 2, b + 3,
      a, b, a + 2,
      a + 2, b, b + 2,
      a + 1, a + 3, b + 1,
      a + 3, b + 3, b + 1,
    );
  }
  geo.setIndex(indices);
  return geo;
}

export function writeStrip(geo, points, halfW, halfH) {
  const pos = geo.attributes.position.array;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const p = points[i];
    const q = points[Math.min(n - 1, i + 1)];
    const prev = points[Math.max(0, i - 1)];
    let tx = q.x - prev.x;
    let tz = q.z - prev.z;
    const len = Math.hypot(tx, tz) || 1;
    tx /= len;
    tz /= len;
    const nx = -tz * halfW;
    const nz = tx * halfW;
    const o = i * 12;
    pos[o] = p.x - nx;
    pos[o + 1] = p.y - halfH;
    pos[o + 2] = p.z - nz;
    pos[o + 3] = p.x + nx;
    pos[o + 4] = p.y - halfH;
    pos[o + 5] = p.z + nz;
    pos[o + 6] = p.x - nx;
    pos[o + 7] = p.y + halfH;
    pos[o + 8] = p.z - nz;
    pos[o + 9] = p.x + nx;
    pos[o + 10] = p.y + halfH;
    pos[o + 11] = p.z + nz;
  }
  geo.attributes.position.needsUpdate = true;
  geo.computeVertexNormals();
}
