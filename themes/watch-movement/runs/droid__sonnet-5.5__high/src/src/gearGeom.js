import * as THREE from 'three';
import { gearOutline, DEG } from './gearMath.js';
import * as ESC from './escapement.js';

export function shapeFromPts(pts) {
  const s = new THREE.Shape();
  pts.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  s.closePath();
  return s;
}

export function circlePts(r, n = 64, cx = 0, cy = 0, a0 = 0) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = a0 + (i / n) * Math.PI * 2;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
}

export function holeFromPts(pts) {
  const p = new THREE.Path();
  pts.forEach(([x, y], i) => (i ? p.lineTo(x, y) : p.moveTo(x, y)));
  p.closePath();
  return p;
}

// Spoke windows between rIn (hub) and rOut (rim). Curved by `twist` radians.
export function spokeWindows({ hubR, rimIn, n, spokeW, twist = 0, offset = 0, arc = 10 }) {
  const holes = [];
  for (let i = 0; i < n; i++) {
    const a0 = offset + (i / n) * Math.PI * 2;
    const a1 = offset + ((i + 1) / n) * Math.PI * 2;
    const dOut = Math.asin(Math.min(0.99, spokeW / 2 / rimIn));
    const dIn = Math.asin(Math.min(0.99, spokeW / 2 / hubR));
    const pts = [];
    for (let j = 0; j <= arc; j++) {
      const a = a0 + dOut + ((a1 - a0 - 2 * dOut) * j) / arc;
      pts.push([rimIn * Math.cos(a), rimIn * Math.sin(a)]);
    }
    for (let j = arc; j >= 0; j--) {
      const a = a0 + dIn + twist + ((a1 - a0 - 2 * dIn) * j) / arc;
      pts.push([hubR * Math.cos(a), hubR * Math.sin(a)]);
    }
    holes.push(holeFromPts(pts));
  }
  return holes;
}

export function extrude(shape, depth, { bevel = 0.02, center = true } = {}) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelOffset: -bevel,
    bevelSegments: 1,
    curveSegments: 12,
  });
  if (center) g.translate(0, 0, -depth / 2);
  g.computeVertexNormals();
  return g;
}

// Toothed wheel with optional spokes. Returns {geometry, rp, ra, rf}.
export function wheelGeometry(spec, { thickness = 0.4, spokes = 0, hubR = 1, rimWidth = 0.5, spokeW = 0.4, twist = 0.3, bevel = 0.018 } = {}) {
  const o = gearOutline(spec.z, spec.m, { pressure: spec.pressure ?? 20 });
  const shape = shapeFromPts(o.pts);
  if (spokes > 0) {
    shape.holes.push(...spokeWindows({ hubR, rimIn: o.rf - rimWidth, n: spokes, spokeW, twist }));
  }
  return { geometry: extrude(shape, thickness, { bevel }), rp: o.rp, ra: o.ra, rf: o.rf };
}

// Ratchet-tooth escape wheel (hooked teeth, tip on angle 0 of each tooth).
export function escapeWheelGeometry({ thickness = 0.4, scale = 1 } = {}) {
  const T = ESC.TEETH;
  const lean = 12 * DEG;
  const lf = 0.27;
  const L = { x: 1 - lf * Math.cos(lean), y: lf * Math.sin(lean) };
  const rr = Math.hypot(L.x, L.y);
  const aL = Math.atan2(L.y, L.x);
  const aR = 21 * DEG;
  const pts = [];
  const pol = (r, a) => [scale * r * Math.cos(a), scale * r * Math.sin(a)];
  for (let k = 0; k < T; k++) {
    const base = k * ESC.PITCH;
    pts.push(pol(1, base));
    pts.push(pol(rr, base + aR));
    const next = base + ESC.PITCH + aL;
    const n = 3;
    for (let j = 1; j <= n; j++) pts.push(pol(rr, base + aR + ((next - base - aR) * j) / (n + 1)));
    pts.push(pol(rr, next));
  }
  const shape = shapeFromPts(pts);
  shape.holes.push(...spokeWindows({ hubR: 0.3 * scale, rimIn: (rr - 0.12) * scale, n: 5, spokeW: 0.1 * scale, twist: 0.35 }));
  return extrude(shape, thickness, { bevel: 0.015 });
}

export function discGeometry(r, depth, { bevel = 0.02, n = 96 } = {}) {
  return extrude(shapeFromPts(circlePts(r, n)), depth, { bevel });
}

function hull2(points) {
  const pts = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [];
  for (const p of pts) {
    while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop();
    lo.push(p);
  }
  const up = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop();
    up.push(p);
  }
  up.pop();
  lo.pop();
  return lo.concat(up);
}

// Tapered capsule between two points (bridge arms, fork arms)
export function capsulePts(p0, p1, r0, r1, n = 20) {
  return hull2([...circlePts(r0, n, p0.x, p0.y), ...circlePts(r1, n, p1.x, p1.y)]);
}

export function convexPts(points) {
  return hull2(points);
}

// Spiral ribbon of rectangular section (hairspring, mainspring); rebuilt on demand.
export function spiralRibbon({ turns, r0, r1, z0, z1, thick, segments }) {
  const n = segments + 1;
  const pos = new Float32Array(n * 4 * 3);
  const idx = [];
  for (let i = 0; i < n - 1; i++) {
    for (let k = 0; k < 4; k++) {
      const a = i * 4 + k;
      const b = i * 4 + ((k + 1) % 4);
      const c = (i + 1) * 4 + ((k + 1) % 4);
      const d = (i + 1) * 4 + k;
      idx.push(a, b, c, a, c, d);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setIndex(idx);
  const set = (angleOffset = () => 0, radialScale = () => 1, phi0 = 0) => {
    for (let i = 0; i < n; i++) {
      const s = i / (n - 1);
      const phi = phi0 + turns * 2 * Math.PI * s + angleOffset(s);
      const r = (r0 + (r1 - r0) * s) * radialScale(s);
      const c = Math.cos(phi);
      const sn = Math.sin(phi);
      const ri = r - thick / 2;
      const ro = r + thick / 2;
      pos.set(
        [ri * c, ri * sn, z0, ri * c, ri * sn, z1, ro * c, ro * sn, z1, ro * c, ro * sn, z0],
        i * 12
      );
    }
    g.attributes.position.needsUpdate = true;
    g.computeVertexNormals();
    g.computeBoundingSphere();
  };
  return { geometry: g, set };
}
