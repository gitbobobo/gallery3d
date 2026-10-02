// Cal. 18000 going train.
// Center wheel 1 rph, fourth wheel 60 rph, escape wheel 600 rph, 15 teeth × 2 = 18,000 vph.
// Every pinion has 6 leaves so the teeth stay large enough to read on screen.

export const VPH = 18000;
export const ESCAPE_TEETH = 15;
export const BEATS_PER_SEC = VPH / 3600;
export const OSC_HZ = BEATS_PER_SEC / 2;

export const TEETH = {
  barrel: 48,
  centerPinion: 6,
  center: 48,
  thirdPinion: 6,
  third: 45,
  fourthPinion: 6,
  fourth: 60,
  escapePinion: 6,
  escape: ESCAPE_TEETH,
};

// Pitch radii. Module of each mesh is 2r / z, and differs from stage to stage
// the way a real train gets finer toward the escapement.
const R = {
  barrel: 1.62,
  center: 1.28,
  third: 1.12,
  fourth: 0.96,
};

export function moduleOf(wheelTeeth, wheelR) {
  return (2 * wheelR) / wheelTeeth;
}

export const MODULE = {
  barrelCenter: moduleOf(TEETH.barrel, R.barrel),
  centerThird: moduleOf(TEETH.center, R.center),
  thirdFourth: moduleOf(TEETH.third, R.third),
  fourthEscape: moduleOf(TEETH.fourth, R.fourth),
};

function pinionR(wheelR, wheelTeeth, pinionTeeth) {
  return wheelR * (pinionTeeth / wheelTeeth);
}

export const PITCH = {
  barrel: R.barrel,
  centerPinion: pinionR(R.barrel, TEETH.barrel, TEETH.centerPinion),
  center: R.center,
  thirdPinion: pinionR(R.center, TEETH.center, TEETH.thirdPinion),
  third: R.third,
  fourthPinion: pinionR(R.third, TEETH.third, TEETH.fourthPinion),
  fourth: R.fourth,
  escapePinion: pinionR(R.fourth, TEETH.fourth, TEETH.escapePinion),
};

export const ADDENDUM = 0.9;
export const DEDENDUM = 1.28;
export const BACKLASH = 0.07;

export function tipRadius(pitch, module) {
  return pitch + ADDENDUM * module;
}

const CD = {
  barrelCenter: PITCH.barrel + PITCH.centerPinion,
  centerThird: PITCH.center + PITCH.thirdPinion,
  thirdFourth: PITCH.third + PITCH.fourthPinion,
  fourthEscape: PITCH.fourth + PITCH.escapePinion,
};

function polar(origin, deg, dist) {
  const a = (deg * Math.PI) / 180;
  return { x: origin.x + Math.cos(a) * dist, z: origin.z + Math.sin(a) * dist };
}

function ang(from, to) {
  return Math.atan2(to.z - from.z, to.x - from.x);
}

// Tooth 0 of a gear whose arbor.rotation.y is `psi` (plus wheel clock)
// points at world angle -psi, measured atan2(z, x). See movement.js.
function psiForToothAim(aim) {
  return -aim;
}

function psiForGapAim(aim, teeth) {
  // A gap sits half a pitch past tooth 0.
  return -aim - Math.PI / teeth;
}

const ESCAPE_TIP = 0.62;
const PALLET_R = 0.545;
const FORK_DIST = 1.05;
const BALANCE_DIST = 1.32;
const FORK_AMP = (13 * Math.PI) / 180;
const PALLET_HALF = (38 * Math.PI) / 180;

function circlePoint(center, radius, angle) {
  return {
    x: center.x + Math.cos(angle) * radius,
    z: center.z + Math.sin(angle) * radius,
  };
}

function forkLocal(fork, baseYaw, world) {
  const dx = world.x - fork.x;
  const dz = world.z - fork.z;
  const c = Math.cos(baseYaw);
  const s = Math.sin(baseYaw);
  return {
    x: dx * c - dz * s,
    z: dx * s + dz * c,
  };
}

function worldFromFork(fork, yaw, local) {
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  return {
    x: fork.x + local.x * c + local.z * s,
    z: fork.z - local.x * s + local.z * c,
  };
}

export function assertTrain() {
  const thirdRph = TEETH.center / TEETH.thirdPinion;
  const fourthRph = thirdRph * (TEETH.third / TEETH.fourthPinion);
  const escapeRph = fourthRph * (TEETH.fourth / TEETH.escapePinion);
  const vph = escapeRph * TEETH.escape * 2;
  if (Math.abs(fourthRph - 60) > 1e-6) throw new Error(`fourth wheel ${fourthRph} rph`);
  if (Math.abs(vph - VPH) > 1e-6) throw new Error(`vph ${vph}`);
  const barrelRph = TEETH.centerPinion / TEETH.barrel;
  return { thirdRph, fourthRph, escapeRph, vph, barrelRph };
}

export function buildLayout(overrides = {}) {
  assertTrain();
  const palletR = overrides.palletR ?? PALLET_R;
  const forkDist = overrides.forkDist ?? FORK_DIST;
  const balanceDist = overrides.balanceDist ?? BALANCE_DIST;
  const forkAmp = overrides.forkAmp ?? FORK_AMP;
  const palletHalf = overrides.palletHalf ?? PALLET_HALF;
  const lockBias = overrides.lockBias ?? -0.1;

  const center = { x: 0, z: 0 };
  const barrel = polar(center, 168, CD.barrelCenter);
  const third = polar(center, -28, CD.centerThird);
  const fourth = polar(third, -108, CD.thirdFourth);
  const escape = polar(fourth, 18, CD.fourthEscape);

  const forkDir = ang(escape, polar(escape, 62, 1));
  const fork = circlePoint(escape, forkDist, forkDir);
  const balance = circlePoint(fork, balanceDist, forkDir);

  const positions = { barrel, center, third, fourth, escape, fork, balance };

  // Arbor phases so each pinion's gap meets the previous wheel's tooth.
  const phiBC = ang(barrel, center);
  const phiCT = ang(center, third);
  const phiTF = ang(third, fourth);
  const phiFE = ang(fourth, escape);

  const phase = {
    barrel: psiForToothAim(phiBC),
    center: psiForGapAim(phiBC + Math.PI, TEETH.centerPinion),
    third: 0,
    fourth: 0,
    escape: 0,
  };

  const clock = { center: 0, third: 0, fourth: 0, escape: 0 };

  clock.center = psiForToothAim(phiCT) - phase.center;
  phase.third = psiForGapAim(phiCT + Math.PI, TEETH.thirdPinion);

  clock.third = psiForToothAim(phiTF) - phase.third;
  phase.fourth = psiForGapAim(phiTF + Math.PI, TEETH.fourthPinion);

  clock.fourth = psiForToothAim(phiFE) - phase.fourth;
  phase.escape = psiForGapAim(phiFE + Math.PI, TEETH.escapePinion);

  // Fork local +X points toward the balance when forkAngle is 0.
  const dirFB = ang(fork, balance);
  const forkBase = -dirFB;

  // Jewels sit on a circle around the escape wheel, ±PALLET_HALF off the line of centers.
  // Fork angle 0 is centered: both stones on that circle. Banking swings one in, one out.
  const lineEF = ang(escape, fork);
  const entryWorld = circlePoint(escape, palletR, lineEF + palletHalf);
  const exitWorld = circlePoint(escape, palletR, lineEF - palletHalf);
  const entryLocal = forkLocal(fork, forkBase, entryWorld);
  const exitLocal = forkLocal(fork, forkBase, exitWorld);

  // At the entry lock the fork is at -amp and a tooth face meets the entry stone.
  const entryAtLock = worldFromFork(fork, forkBase - forkAmp, entryLocal);
  const entryAim = Math.atan2(entryAtLock.z - escape.z, entryAtLock.x - escape.x);
  // Bias rotates the tooth so the locking face, not the tip centerline, meets the stone.
  clock.escape = psiForToothAim(entryAim + lockBias) - phase.escape;

  const radii = {
    barrel: tipRadius(PITCH.barrel, MODULE.barrelCenter),
    center: tipRadius(PITCH.center, MODULE.centerThird),
    third: tipRadius(PITCH.third, MODULE.thirdFourth),
    fourth: tipRadius(PITCH.fourth, MODULE.fourthEscape),
    escape: ESCAPE_TIP,
    balance: 1.06,
    fork: 0.35,
  };

  let plateR = 0;
  for (const key of ['barrel', 'center', 'third', 'fourth', 'escape', 'balance']) {
    const p = positions[key];
    plateR = Math.max(plateR, Math.hypot(p.x, p.z) + (radii[key] || 0));
  }
  plateR += 0.42;

  return {
    positions,
    phase,
    clock,
    forkBase,
    forkAmp,
    radii,
    plateR,
    pitch: PITCH,
    module: MODULE,
    escapeTip: ESCAPE_TIP,
    palletR,
    entryLocal,
    exitLocal,
    cd: CD,
  };
}

// How far the exit stone misses a tooth after one beat. Used while tuning.
export function exitLockError(layout) {
  const { positions, phase, clock, forkBase, forkAmp, entryLocal, exitLocal } = layout;
  const step = (Math.PI * 2) / TEETH.escape;
  const exitAtLock = worldFromFork(positions.fork, forkBase + forkAmp, exitLocal);
  const aim = Math.atan2(exitAtLock.z - positions.escape.z, exitAtLock.x - positions.escape.x);
  // Wheel has advanced one tooth. Tooth k aims at -(psi+clock+step) - k*step.
  const baseAim = -(phase.escape + clock.escape + step);
  let best = Math.PI;
  for (let k = 0; k < TEETH.escape; k++) {
    let d = aim - (baseAim - k * step);
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    if (Math.abs(d) < Math.abs(best)) best = d;
  }
  return best;
}
