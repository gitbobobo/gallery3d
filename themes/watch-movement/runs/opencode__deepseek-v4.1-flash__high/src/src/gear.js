import * as THREE from 'three';

const TAU = Math.PI * 2;

/**
 * Build a 2D gear profile (THREE.Shape) with trapezoidal, slightly
 * rounded teeth. One tooth centre sits at local angle 0, which makes
 * meshing phases trivial to compute.
 */
function gearShape({
  teeth,
  module: m,
  addendum = 1.0,
  dedendum = 1.25,
  rootFactor = 0.30,
  tipFactor = 0.155,
  hubRadius = 0,
  boreRadius = 0,
  spokes = 0,
  rimInner = 0,
}) {
  const pitch = (TAU / teeth) * 1;
  const rp = (m * teeth) / 2;
  const ra = rp + m * addendum;
  const rd = Math.max(rp - m * dedendum, m * 0.7);
  const rootHalf = pitch * rootFactor;
  const tipHalf = pitch * tipFactor;
  const arcSteps = 3;

  const shape = new THREE.Shape();
  let first = true;

  for (let i = 0; i < teeth; i++) {
    const b = i * pitch;
    const pts = [
      [rd, b - rootHalf],
      [ra, b - tipHalf],
      [ra, b + tipHalf],
      [rd, b + rootHalf],
    ];
    for (const [r, a] of pts) {
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (first) {
        shape.moveTo(x, y);
        first = false;
      } else {
        shape.lineTo(x, y);
      }
    }
    // root arc over to the next tooth
    const a0 = b + rootHalf;
    const a1 = b + pitch - rootHalf;
    for (let s = 1; s <= arcSteps; s++) {
      const a = a0 + ((a1 - a0) * s) / arcSteps;
      shape.lineTo(Math.cos(a) * rd, Math.sin(a) * rd);
    }
  }
  shape.closePath();

  const holes = [];

  if (spokes > 0 && rimInner > hubRadius) {
    const step = TAU / spokes;
    const openW = step * 0.72;
    const r1 = hubRadius + m * 0.6;
    const r2 = rimInner;
    for (let i = 0; i < spokes; i++) {
      const c = i * step + step * 0.5;
      const a0 = c - openW / 2;
      const a1 = c + openW / 2;
      const p = new THREE.Path();
      p.moveTo(Math.cos(a0) * r1, Math.sin(a0) * r1);
      p.absarc(0, 0, r1, a0, a1, false);
      p.lineTo(Math.cos(a1) * r2, Math.sin(a1) * r2);
      p.absarc(0, 0, r2, a1, a0, true);
      p.lineTo(Math.cos(a0) * r1, Math.sin(a0) * r1);
      holes.push(p);
    }
  }

  if (boreRadius > 0) {
    const p = new THREE.Path();
    p.absarc(0, 0, boreRadius, 0, TAU, true);
    holes.push(p);
  }

  shape.holes = holes;
  return { shape, rp, ra, rd };
}

export function createGearGeometry(opts) {
  const { shape, rd } = gearShape(opts);
  const thickness = opts.thickness ?? 0.42;
  const bevel = Math.min(opts.module * 0.16, 0.05);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 1,
    steps: 1,
    curveSegments: 18,
  });
  geo.translate(0, 0, -(thickness - bevel * 2) / 2 - bevel);
  geo.computeVertexNormals();
  geo.userData = { pitchRadius: opts.module * opts.teeth / 2, rootRadius: rd };
  return geo;
}

/**
 * A gear mesh whose profile is a small "pinion": chunky rounded teeth.
 */
export function pinionOpts(teeth, module, thickness) {
  return {
    teeth,
    module,
    thickness,
    addendum: 1.15,
    dedendum: 1.05,
    rootFactor: 0.34,
    tipFactor: 0.19,
    boreRadius: Math.max(module * 0.7, 0.12),
  };
}

export function wheelOpts(teeth, module, thickness, spokes, hub, rimInner) {
  return {
    teeth,
    module,
    thickness,
    addendum: 1.0,
    dedendum: 1.25,
    rootFactor: 0.30,
    tipFactor: 0.155,
    spokes,
    hubRadius: hub,
    rimInner,
    boreRadius: Math.max(module * 1.1, 0.16),
  };
}

export function escapeWheelOpts(teeth, module, thickness) {
  return {
    teeth,
    module,
    thickness,
    addendum: 1.5,
    dedendum: 0.85,
    rootFactor: 0.33,
    tipFactor: 0.045,
    boreRadius: Math.max(module * 0.9, 0.14),
  };
}
