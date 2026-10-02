import * as THREE from 'three';

/**
 * Creates a 2D THREE.Shape for a watch gear wheel with teeth and spoke cutouts.
 * @param teeth Number of teeth
 * @param module Gear module
 * @param options Styling options
 */
export function createGearShape(
  teeth: number,
  module: number,
  options: {
    boreRadius?: number;
    spokes?: number;
    rimWidth?: number;
    hubRadius?: number;
    pressureAngle?: number; // radians, default 20 deg
    spokeWidth?: number;
    hasSpokes?: boolean;
    bevelOuter?: boolean;
  } = {}
): THREE.Shape {
  const pressureAngle = options.pressureAngle ?? (20 * Math.PI) / 180;
  const pitchRadius = (module * teeth) / 2;
  const addendum = module * 0.95;
  const dedendum = module * 1.15;
  const outerRadius = pitchRadius + addendum;
  const rootRadius = Math.max(0.2, pitchRadius - dedendum);

  const shape = new THREE.Shape();
  const anglePerTooth = (2 * Math.PI) / teeth;
  const halfTooth = anglePerTooth / 2;

  // Generate outer tooth contour
  for (let i = 0; i < teeth; i++) {
    const centerAngle = i * anglePerTooth;

    // 4 points per tooth: root-left, tip-left, tip-right, root-right
    const aRoot1 = centerAngle - halfTooth * 0.55;
    const aPitch1 = centerAngle - halfTooth * 0.35;
    const aTip1 = centerAngle - halfTooth * 0.18;
    const aTip2 = centerAngle + halfTooth * 0.18;
    const aPitch2 = centerAngle + halfTooth * 0.35;
    const aRoot2 = centerAngle + halfTooth * 0.55;
    const aNextRoot = centerAngle + halfTooth * 0.9;

    const rRoot1 = rootRadius;
    const rPitch = pitchRadius;
    const rTip = outerRadius;

    if (i === 0) {
      shape.moveTo(Math.cos(aRoot1) * rRoot1, Math.sin(aRoot1) * rRoot1);
    } else {
      shape.lineTo(Math.cos(aRoot1) * rRoot1, Math.sin(aRoot1) * rRoot1);
    }

    // Flank up
    shape.quadraticCurveTo(
      Math.cos(aPitch1) * rPitch,
      Math.sin(aPitch1) * rPitch,
      Math.cos(aTip1) * rTip,
      Math.sin(aTip1) * rTip
    );

    // Tip crest
    shape.lineTo(Math.cos(aTip2) * rTip, Math.sin(aTip2) * rTip);

    // Flank down
    shape.quadraticCurveTo(
      Math.cos(aPitch2) * rPitch,
      Math.sin(aPitch2) * rPitch,
      Math.cos(aRoot2) * rRoot1,
      Math.sin(aRoot2) * rRoot1
    );

    // Bottom clearance curve to next tooth root
    shape.lineTo(Math.cos(aNextRoot) * rRoot1, Math.sin(aNextRoot) * rRoot1);
  }

  shape.closePath();

  // Spoke cutouts and bore hole
  const boreRadius = options.boreRadius ?? (module * 1.5);
  const spokes = options.spokes ?? 4;
  const hasSpokes = options.hasSpokes ?? (teeth >= 20);

  if (hasSpokes && spokes > 0) {
    const rimWidth = options.rimWidth ?? (module * 2.2);
    const hubRadius = options.hubRadius ?? Math.max(boreRadius * 1.8, module * 2.5);
    const innerRimRadius = rootRadius - rimWidth;

    if (innerRimRadius > hubRadius + module * 0.8) {
      const spokeAngleWidth = (options.spokeWidth ?? 0.28);
      const anglePerSpoke = (2 * Math.PI) / spokes;

      for (let s = 0; s < spokes; s++) {
        const baseA = s * anglePerSpoke;
        const aStart = baseA + spokeAngleWidth;
        const aEnd = baseA + anglePerSpoke - spokeAngleWidth;

        const hole = new THREE.Path();
        const rInner = hubRadius;
        const rOuter = innerRimRadius;

        // Curved window cutout between spokes
        hole.moveTo(Math.cos(aStart) * rInner, Math.sin(aStart) * rInner);
        hole.lineTo(Math.cos(aStart) * rOuter, Math.sin(aStart) * rOuter);
        hole.absarc(0, 0, rOuter, aStart, aEnd, false);
        hole.lineTo(Math.cos(aEnd) * rInner, Math.sin(aEnd) * rInner);
        hole.absarc(0, 0, rInner, aEnd, aStart, true);
        hole.closePath();

        shape.holes.push(hole);
      }
    }
  }

  // Central arbor bore hole
  if (boreRadius > 0.05) {
    const bore = new THREE.Path();
    bore.absarc(0, 0, boreRadius, 0, Math.PI * 2, true);
    shape.holes.push(bore);
  }

  return shape;
}

/**
 * Creates the specialized 15-tooth Swiss lever escape wheel shape.
 * Escape wheel teeth have a slender stem, locking face, impulse ramp, and impulse toe.
 */
export function createEscapeWheelShape(radius = 2.75, teeth = 15): THREE.Shape {
  const shape = new THREE.Shape();
  const anglePerTooth = (2 * Math.PI) / teeth;
  const rootR = radius * 0.48;
  const bodyR = radius * 0.62;

  for (let i = 0; i < teeth; i++) {
    const a = i * anglePerTooth;
    // Angles for the club tooth profile
    const aHeel = a - anglePerTooth * 0.35;
    const aStem = a - anglePerTooth * 0.15;
    const aLocking = a - anglePerTooth * 0.04;
    const aToe = a + anglePerTooth * 0.14;
    const aImpulse = a + anglePerTooth * 0.06;
    const aNext = a + anglePerTooth * 0.45;

    const rStem = bodyR;
    const rHeel = radius * 0.88;
    const rTip = radius;

    if (i === 0) {
      shape.moveTo(Math.cos(aHeel) * rootR, Math.sin(aHeel) * rootR);
    } else {
      shape.lineTo(Math.cos(aHeel) * rootR, Math.sin(aHeel) * rootR);
    }

    // Club tooth undercut stem
    shape.lineTo(Math.cos(aStem) * rStem, Math.sin(aStem) * rStem);
    // Locking face (nearly radial)
    shape.lineTo(Math.cos(aLocking) * rHeel, Math.sin(aLocking) * rHeel);
    // Impulse face ramp to toe
    shape.lineTo(Math.cos(aToe) * rTip, Math.sin(aToe) * rTip);
    // Toe let-off edge
    shape.lineTo(Math.cos(aImpulse) * (radius * 0.94), Math.sin(aImpulse) * (radius * 0.94));
    // Back slope down to rim
    shape.lineTo(Math.cos(aNext) * bodyR, Math.sin(aNext) * bodyR);
  }

  shape.closePath();

  // 4 slender crossing arms cutouts
  const arms = 4;
  const anglePerArm = (2 * Math.PI) / arms;
  const hubR = radius * 0.22;
  const innerRimR = rootR * 0.95;

  for (let s = 0; s < arms; s++) {
    const baseA = s * anglePerArm;
    const aStart = baseA + 0.32;
    const aEnd = baseA + anglePerArm - 0.32;

    const hole = new THREE.Path();
    hole.moveTo(Math.cos(aStart) * hubR, Math.sin(aStart) * hubR);
    hole.lineTo(Math.cos(aStart) * innerRimR, Math.sin(aStart) * innerRimR);
    hole.absarc(0, 0, innerRimR, aStart, aEnd, false);
    hole.lineTo(Math.cos(aEnd) * hubR, Math.sin(aEnd) * hubR);
    hole.absarc(0, 0, hubR, aEnd, aStart, true);
    hole.closePath();
    shape.holes.push(hole);
  }

  // Bore hole
  const bore = new THREE.Path();
  bore.absarc(0, 0, radius * 0.1, 0, Math.PI * 2, true);
  shape.holes.push(bore);

  return shape;
}

/**
 * Creates the Swiss lever pallet fork shape.
 * Pivots at (0, 0).
 * Left arm holds Entry pallet (进瓦), Right arm holds Exit pallet (出瓦).
 * Elongated lever body points towards the balance staff, terminating with fork horns and safety dart.
 */
export function createPalletForkShape(): THREE.Shape {
  const shape = new THREE.Shape();

  // Coordinates designed along the lever axis (Y direction towards balance roller)
  // Pivot is at (0,0)
  // Fork lever body extends along +Y to ~+3.8
  // Arms extend to (-1.8, -1.2) for entry and (+1.8, -1.2) for exit

  shape.moveTo(0, 0.4);
  // Right side of lever
  shape.lineTo(0.35, 1.8);
  shape.lineTo(0.45, 3.2);
  // Right fork horn
  shape.lineTo(0.85, 3.65);
  shape.lineTo(0.65, 3.8);
  shape.lineTo(0.2, 3.4);
  // Fork slot notch (where balance impulse jewel enters)
  shape.lineTo(0.08, 2.9);
  shape.lineTo(-0.08, 2.9);
  // Left fork horn
  shape.lineTo(-0.2, 3.4);
  shape.lineTo(-0.65, 3.8);
  shape.lineTo(-0.85, 3.65);
  shape.lineTo(-0.45, 3.2);
  shape.lineTo(-0.35, 1.8);
  shape.lineTo(0, 0.4);

  // Left arm for entry pallet
  shape.lineTo(-0.5, 0.1);
  shape.lineTo(-1.6, -0.6);
  shape.lineTo(-1.9, -1.4);
  // Entry pallet stone pocket
  shape.lineTo(-1.65, -1.7);
  shape.lineTo(-1.3, -1.35);
  shape.lineTo(-0.6, -0.5);

  // Pivot boss bottom arc
  shape.absarc(0, 0, 0.45, -Math.PI * 0.8, -Math.PI * 0.2, false);

  // Right arm for exit pallet
  shape.lineTo(0.6, -0.5);
  shape.lineTo(1.3, -1.35);
  shape.lineTo(1.65, -1.7);
  shape.lineTo(1.9, -1.4);
  shape.lineTo(1.6, -0.6);
  shape.lineTo(0.5, 0.1);

  shape.closePath();

  // Central pivot hole
  const bore = new THREE.Path();
  bore.absarc(0, 0, 0.18, 0, Math.PI * 2, true);
  shape.holes.push(bore);

  return shape;
}

/**
 * Creates the Glucydur balance wheel rim shape with spokes.
 */
export function createBalanceWheelShape(radius = 7.5, rimThickness = 0.65, spokes = 3): THREE.Shape {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, radius, 0, Math.PI * 2, false);

  const innerRadius = radius - rimThickness;
  const hubRadius = radius * 0.22;
  const spokeAngleWidth = 0.16;
  const anglePerSpoke = (2 * Math.PI) / spokes;

  for (let s = 0; s < spokes; s++) {
    const baseA = s * anglePerSpoke;
    const aStart = baseA + spokeAngleWidth;
    const aEnd = baseA + anglePerSpoke - spokeAngleWidth;

    const hole = new THREE.Path();
    hole.moveTo(Math.cos(aStart) * hubRadius, Math.sin(aStart) * hubRadius);
    hole.lineTo(Math.cos(aStart) * innerRadius, Math.sin(aStart) * innerRadius);
    hole.absarc(0, 0, innerRadius, aStart, aEnd, false);
    hole.lineTo(Math.cos(aEnd) * hubRadius, Math.sin(aEnd) * hubRadius);
    hole.absarc(0, 0, hubRadius, aEnd, aStart, true);
    hole.closePath();
    shape.holes.push(hole);
  }

  // Arbor hole
  const bore = new THREE.Path();
  bore.absarc(0, 0, radius * 0.08, 0, Math.PI * 2, true);
  shape.holes.push(bore);

  return shape;
}
