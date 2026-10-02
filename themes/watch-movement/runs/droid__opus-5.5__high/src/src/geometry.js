import * as THREE from 'three';

const TAU = Math.PI * 2;
const polar = (r, a) => new THREE.Vector2(r * Math.cos(a), r * Math.sin(a));

/**
 * Watch-style gear profile: radial flanks below the pitch circle and an
 * ogival (rounded) addendum, as used on cycloidal horological wheels/pinions.
 * Tooth 0 is centred on angle 0.
 */
export function gearProfile({ teeth, module: m, addendum = 1.2, dedendum = 1.3, thickness = 0.48 }) {
  const rp = (m * teeth) / 2;
  const ra = rp + addendum * m;
  const rr = rp - dedendum * m;
  const p = TAU / teeth;
  const hwLen = (thickness * Math.PI * m) / 2;
  const hwA = hwLen / rp;
  const K = 6;
  const pts = [];
  for (let j = 0; j < teeth; j++) {
    const c = j * p;
    const left = [];
    left.push(polar(rr, c - hwA * 1.04));
    left.push(polar(rp, c - hwA));
    for (let k = 1; k <= K; k++) {
      const t = (k / K) * (Math.PI / 2);
      const r = rp + (ra - rp) * Math.sin(t);
      const w = hwLen * (0.22 + 0.78 * Math.cos(t));
      left.push(polar(r, c - w / r));
    }
    pts.push(...left);
    for (let k = K; k >= 1; k--) {
      const t = (k / K) * (Math.PI / 2);
      const r = rp + (ra - rp) * Math.sin(t);
      const w = hwLen * (0.22 + 0.78 * Math.cos(t));
      pts.push(polar(r, c + w / r));
    }
    pts.push(polar(rp, c + hwA));
    pts.push(polar(rr, c + hwA * 1.04));
    const a0 = c + hwA * 1.04;
    const a1 = c + p - hwA * 1.04;
    const segs = Math.max(1, Math.ceil((a1 - a0) / 0.12));
    for (let s = 1; s < segs; s++) pts.push(polar(rr, a0 + ((a1 - a0) * s) / segs));
  }
  return { shape: new THREE.Shape(pts), rp, ra, rr, pitch: p };
}

/** Spoke windows between hub radius rh and rim radius ri. */
export function spokeHoles(n, rh, ri, width, rot = 0, curve = 0) {
  const holes = [];
  const step = 30;
  for (let i = 0; i < n; i++) {
    const a = rot + (i * TAU) / n;
    const b = a + TAU / n;
    const edge = (rho, base, side) => base + side * Math.asin(Math.min(0.95, width / 2 / rho)) + curve * (rho - rh);
    const path = new THREE.Path();
    const pts = [];
    for (let s = 0; s <= step; s++) {
      const rho = rh + ((ri - rh) * s) / step;
      pts.push(polar(rho, edge(rho, a, 1)));
    }
    const o0 = edge(ri, a, 1);
    const o1 = edge(ri, b, -1);
    for (let s = 1; s < step; s++) pts.push(polar(ri, o0 + ((o1 - o0) * s) / step));
    for (let s = step; s >= 0; s--) {
      const rho = rh + ((ri - rh) * s) / step;
      pts.push(polar(rho, edge(rho, b, -1)));
    }
    const i0 = edge(rh, b, -1);
    const i1 = edge(rh, a, 1);
    for (let s = 1; s < 8; s++) pts.push(polar(rh, i0 + ((i1 - i0) * s) / 8));
    path.setFromPoints(pts);
    holes.push(path);
  }
  return holes;
}

export function circlePath(r, seg = 64, cx = 0, cy = 0) {
  const p = new THREE.Path();
  p.absarc(cx, cy, r, 0, TAU, false);
  return p;
}

/** Planar UVs centred on the origin, so radial textures line up with the arbor. */
export function planarUV(geo, R) {
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, pos.getX(i) / (2 * R) + 0.5, pos.getY(i) / (2 * R) + 0.5);
  }
  uv.needsUpdate = true;
  return geo;
}

export function extrude(shape, depth, bevel = 0.012) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 1,
    curveSegments: 48,
  });
  if (bevel > 0) geo.translate(0, 0, bevel);
  return geo;
}

/**
 * Swiss club-tooth style escape wheel outline. The locking face of tooth 0
 * sits on angle 0 and the teeth lean toward rotation direction `dir` (+1 CCW).
 */
export function escapeWheelShape(teeth, rTip, rRoot, dir) {
  const p = TAU / teeth;
  const deg = Math.PI / 180;
  const pts = [];
  for (let j = 0; j < teeth; j++) {
    const c = j * p * dir;
    // offsets in "positive rotation" convention, mirrored for clockwise wheels
    const seq = [
      [rRoot, -20 * deg],
      [rRoot + (rTip - rRoot) * 0.35, -15 * deg],
      [rRoot + (rTip - rRoot) * 0.72, -9.5 * deg],
      [rTip - 0.02, -5 * deg],
      [rTip, -3.2 * deg],
      [rTip, 0],
      [rTip - 0.12, 0.6 * deg],
      [rRoot + 0.08, 1.4 * deg],
      [rRoot, 2.6 * deg],
    ];
    for (const [r, o] of seq) pts.push({ r, a: c + o * dir });
  }
  if (dir < 0) pts.reverse();
  return new THREE.Shape(pts.map((q) => polar(q.r, q.a)));
}

/**
 * Flat spiral ribbon (hairspring / mainspring) with rectangular section.
 * update(rot) winds the inner end by `rot` radians while the outer end stays put.
 */
export function spiralRibbon({ r0, r1, turns, N = 900, height, thick, start = 0 }) {
  const geo = new THREE.BufferGeometry();
  const V = 8;
  const pos = new Float32Array((N + 1) * V * 3);
  const nor = new Float32Array((N + 1) * V * 3);
  const idx = [];
  for (let i = 0; i < N; i++) {
    const a = i * V;
    const b = (i + 1) * V;
    const quad = (o0, o1) => {
      idx.push(a + o0, b + o0, a + o1, a + o1, b + o0, b + o1);
    };
    quad(1, 0); // top
    quad(2, 3); // bottom
    quad(4, 5); // outer
    quad(7, 6); // inner
  }
  geo.setIndex(idx);
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  const h0 = 0;
  const h1 = height;
  const update = (rot = 0) => {
    for (let i = 0; i <= N; i++) {
      const f = i / N;
      const ang = start + TAU * turns * f + rot * (1 - f);
      const r = r0 + (r1 - r0) * f;
      const c = Math.cos(ang);
      const s = Math.sin(ang);
      const ri = r - thick / 2;
      const ro = r + thick / 2;
      const verts = [
        [ri, h1, 0, 0, 1],
        [ro, h1, 0, 0, 1],
        [ri, h0, 0, 0, -1],
        [ro, h0, 0, 0, -1],
        [ro, h0, 1, 0, 0],
        [ro, h1, 1, 0, 0],
        [ri, h0, -1, 0, 0],
        [ri, h1, -1, 0, 0],
      ];
      for (let v = 0; v < V; v++) {
        const [rad, z, nr, , nz] = verts[v];
        const k = (i * V + v) * 3;
        pos[k] = rad * c;
        pos[k + 1] = rad * s;
        pos[k + 2] = z;
        nor[k] = nr * c;
        nor[k + 1] = nr * s;
        nor[k + 2] = nz;
      }
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.normal.needsUpdate = true;
  };
  update(0);
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, height / 2), r1 + 0.5);
  geo.boundingBox = new THREE.Box3(new THREE.Vector3(-r1 - 0.5, -r1 - 0.5, 0), new THREE.Vector3(r1 + 0.5, r1 + 0.5, height));
  return { geometry: geo, update, endAngle: start + TAU * turns };
}
