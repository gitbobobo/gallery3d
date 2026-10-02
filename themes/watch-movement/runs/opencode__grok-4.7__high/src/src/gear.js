import * as THREE from "three";

function polar(r, a) {
  return [r * Math.cos(a), r * Math.sin(a)];
}

export function spurShape(teeth, module, fat = 1) {
  const rp = (module * teeth) / 2;
  const ra = rp + module * 0.98;
  const rd = Math.max(module * 0.28, rp - module * 1.22);
  const step = (Math.PI * 2) / teeth;
  const tipHalf = step * 0.16 * fat;
  const rootHalf = step * 0.32 * fat;
  const shape = new THREE.Shape();
  const start = polar(rd, -rootHalf);
  shape.moveTo(start[0], start[1]);
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const tipL = polar(ra, a - tipHalf);
    const tipR = polar(ra, a + tipHalf);
    const rootR = polar(rd, a + rootHalf);
    const next = polar(rd, a + step - rootHalf);
    shape.lineTo(tipL[0], tipL[1]);
    shape.lineTo(tipR[0], tipR[1]);
    shape.lineTo(rootR[0], rootR[1]);
    const arcStart = a + rootHalf;
    const arcEnd = a + step - rootHalf;
    const segs = 3;
    for (let s = 1; s <= segs; s++) {
      const t = s / segs;
      const ang = arcStart + (arcEnd - arcStart) * t;
      const p = polar(rd, ang);
      shape.lineTo(p[0], p[1]);
    }
    if (i === teeth - 1) shape.lineTo(next[0], next[1]);
  }
  shape.closePath();
  return shape;
}

export function extrude(shape, depth, holeRadius = 0) {
  if (holeRadius > 0) {
    const hole = new THREE.Path();
    hole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: false,
    curveSegments: 8,
    steps: 1,
  });
  geo.translate(0, 0, -depth / 2);
  geo.computeVertexNormals();
  return geo;
}

export function wheelGeometry(teeth, module, thickness, holeRadius) {
  return extrude(spurShape(teeth, module, 1), thickness, holeRadius);
}

export function pinionGeometry(leaves, module, thickness) {
  const rp = (module * leaves) / 2;
  const hole = Math.min(rp * 0.28, 0.07);
  return extrude(spurShape(leaves, module, 1.05), thickness, hole);
}

export function escapeWheelGeometry(thickness) {
  const teeth = 15;
  const rRoot = 0.88;
  const rTip = 1.58;
  const step = (Math.PI * 2) / teeth;
  const shape = new THREE.Shape();
  const first = polar(rRoot, -0.07);
  shape.moveTo(first[0], first[1]);
  for (let i = 0; i < teeth; i++) {
    const c = i * step;
    const pts = [
      polar(1.12, c - 0.07),
      polar(1.34, c - 0.075),
      polar(rTip, c - 0.03),
      polar(rTip - 0.1, c + 0.045),
      polar(1.02, c + 0.055),
      polar(rRoot, c + 0.04),
    ];
    for (const p of pts) shape.lineTo(p[0], p[1]);
    const arcStart = c + 0.04;
    const arcEnd = c + step - 0.07;
    for (let s = 1; s <= 3; s++) {
      const t = s / 3;
      const ang = arcStart + (arcEnd - arcStart) * t;
      const p = polar(rRoot, ang);
      shape.lineTo(p[0], p[1]);
    }
  }
  shape.closePath();
  return extrude(shape, thickness, 0.72);
}

export function ratchetGeometry(teeth, radius, thickness) {
  const step = (Math.PI * 2) / teeth;
  const shape = new THREE.Shape();
  const inner = radius * 0.78;
  const first = polar(inner, 0);
  shape.moveTo(first[0], first[1]);
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const p1 = polar(radius, a + step * 0.08);
    const p2 = polar(radius * 0.8, a + step * 0.72);
    const p3 = polar(inner, a + step * 0.82);
    shape.lineTo(p1[0], p1[1]);
    shape.lineTo(p2[0], p2[1]);
    shape.lineTo(p3[0], p3[1]);
  }
  shape.closePath();
  return extrude(shape, thickness, radius * 0.28);
}

export function cyl(radius, height, seg = 20) {
  const geo = new THREE.CylinderGeometry(radius, radius, height, seg);
  geo.rotateX(Math.PI / 2);
  return geo;
}

export function tube(outer, inner, height, seg = 40) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outer, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, inner, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: false,
    curveSegments: seg,
  });
  geo.translate(0, 0, -height / 2);
  return geo;
}

export function springGeometry(turns, inner, outer, width, thick) {
  const n = Math.round(turns * 28);
  const positions = new Float32Array((n + 1) * 2 * 3);
  const indices = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const ang = u * turns * Math.PI * 2;
    const r = inner + (outer - inner) * u;
    const x = Math.cos(ang) * r;
    const y = Math.sin(ang) * r;
    const tx = -Math.sin(ang);
    const ty = Math.cos(ang);
    const len = Math.hypot(tx, ty) || 1;
    const ox = (tx / len) * thick * 0.5;
    const oy = (ty / len) * thick * 0.5;
    const i2 = i * 2;
    positions[i2 * 3] = x - ox;
    positions[i2 * 3 + 1] = y - oy;
    positions[i2 * 3 + 2] = 0;
    positions[(i2 + 1) * 3] = x + ox;
    positions[(i2 + 1) * 3 + 1] = y + oy;
    positions[(i2 + 1) * 3 + 2] = width;
    if (i < n) {
      const a = i2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export function hairspringGeometry(samples = 140) {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array((samples + 1) * 2 * 3);
  const indices = [];
  for (let i = 0; i < samples; i++) {
    const a = i * 2;
    indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setIndex(indices);
  return geo;
}

export function writeHairspring(geo, angle, turns, inner, outer, width) {
  const attr = geo.getAttribute("position");
  const n = attr.count / 2 - 1;
  const stud = 2.35;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const r = inner + (outer - inner) * u;
    const th = stud + (1 - u) * turns * Math.PI * 2 + angle * (1 - u) * (1 - u);
    pts.push([Math.cos(th) * r, Math.sin(th) * r]);
  }
  const w = width * 0.5;
  for (let i = 0; i <= n; i++) {
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(n, i + 1)];
    let tx = next[0] - prev[0];
    let ty = next[1] - prev[1];
    const len = Math.hypot(tx, ty) || 1;
    const px = (-ty / len) * w;
    const py = (tx / len) * w;
    attr.setXYZ(i * 2, pts[i][0] + px, pts[i][1] + py, 0);
    attr.setXYZ(i * 2 + 1, pts[i][0] - px, pts[i][1] - py, 0);
  }
  attr.needsUpdate = true;
  geo.computeVertexNormals();
}

export function pitchRadius(teeth, module) {
  return (module * teeth) / 2;
}
