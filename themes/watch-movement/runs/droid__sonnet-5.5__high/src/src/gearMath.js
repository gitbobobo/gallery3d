// Pure gear maths: involute tooth outlines and mesh phasing (no three.js).

export const DEG = Math.PI / 180;
const inv = (a) => Math.tan(a) - a;

// Outline of a spur gear, CCW, tooth 0 centred on angle 0.
// Returns an array of [x, y].
export function gearOutline(z, m, o = {}) {
  const pa = (o.pressure ?? 20) * DEG;
  const add = o.addendum ?? 1.0;
  const ded = o.dedendum ?? 1.25;
  const rp = (m * z) / 2;
  const rb = rp * Math.cos(pa);
  const ra = rp + add * m;
  const rf = rp - ded * m;
  const psiP = ((Math.PI / z) / 2) * (1 - (o.backlash ?? 0.05));
  const psi = (r) => {
    const base = psiP + inv(pa);
    if (r <= rb) return base;
    return Math.max(0.02 * (Math.PI / z), base - inv(Math.acos(Math.min(1, rb / r))));
  };
  const steps = o.flankSteps ?? 6;
  const rs = [];
  for (let i = 0; i <= steps; i++) rs.push(rf + ((ra - rf) * i) / steps);
  const pts = [];
  const pol = (r, a) => [r * Math.cos(a), r * Math.sin(a)];
  for (let k = 0; k < z; k++) {
    const c = (2 * Math.PI * k) / z;
    for (let i = 0; i <= steps; i++) pts.push(pol(rs[i], c - psi(rs[i]))); // rising flank (CW side)
    const t = psi(ra);
    pts.push(pol(ra, c - t * 0.5));
    pts.push(pol(ra, c + t * 0.5));
    for (let i = steps; i >= 0; i--) pts.push(pol(rs[i], c + psi(rs[i])));
    const nextStart = c + (2 * Math.PI) / z - psi(rf);
    const endA = c + psi(rf);
    const n = 2;
    for (let j = 1; j <= n; j++) pts.push(pol(rf, endA + ((nextStart - endA) * j) / (n + 1)));
  }
  return { pts, rp, ra, rf, rb };
}

// Phase of the driven gear so that a tooth of A faces a gap of B on the line of centres.
// a, b are the angles of tooth 0 on each gear; phi is the direction from A to B.
export function meshPhase(a, zA, zB, phi) {
  return phi + Math.PI - (Math.PI - (phi - a) * zA) / zB;
}

export function pointInPoly(poly, x, y) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function transformPts(pts, ang, cx, cy) {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return pts.map(([x, y]) => [cx + x * c - y * s, cy + x * s + y * c]);
}

// Counts outline vertices of one gear that sit inside the other, over a range of motion.
export function meshInterference(A, B, phi, aPhase, bPhase, ratio, steps = 200, span = 3) {
  const d = A.rp + B.rp;
  const cb = [d * Math.cos(phi), d * Math.sin(phi)];
  let worst = 0;
  let hits = 0;
  for (let i = 0; i < steps; i++) {
    const da = (i / steps) * span * ((2 * Math.PI) / A.z);
    const pa = transformPts(A.pts, aPhase + da, 0, 0);
    const pb = transformPts(B.pts, bPhase - da * ratio, cb[0], cb[1]);
    for (const [x, y] of pa) {
      if (pointInPoly(pb, x, y)) {
        hits++;
      }
    }
    for (const [x, y] of pb) {
      if (pointInPoly(pa, x, y)) hits++;
    }
    worst = Math.max(worst, hits);
  }
  return hits;
}
