// Movement layout: gear specs, arbor positions, mesh phases and speed ratios.
// Units are arbitrary "mm-like" units, the plane is XY and +Z points toward the viewer.

import { DEG, meshPhase } from './gearMath.js';
import * as ESC from './escapement.js';

export const RE = 3.4; // escape wheel tip radius

const dir = (deg) => ({ x: Math.cos(deg * DEG), y: Math.sin(deg * DEG) });
const plus = (p, d, r) => ({ x: p.x + d.x * r, y: p.y + d.y * r });

// All wheel/pinion pairs share a module per mesh.
export const SPEC = {
  barrel: { z: 80, m: 0.18 },
  cPinion: { z: 10, m: 0.18 },
  cWheel: { z: 80, m: 0.15 },
  tPinion: { z: 10, m: 0.15 },
  tWheel: { z: 75, m: 0.14 },
  fPinion: { z: 10, m: 0.14 },
  fWheel: { z: 96, m: 0.1, pressure: 25 },
  ePinion: { z: 6, m: 0.1, pressure: 25 },
};

const pitchR = (s) => (s.z * s.m) / 2;

const raw = {};
raw.C = { x: 0, y: 0 };
raw.B = plus(raw.C, dir(150), pitchR(SPEC.barrel) + pitchR(SPEC.cPinion));
raw.T = plus(raw.C, dir(20), pitchR(SPEC.cWheel) + pitchR(SPEC.tPinion));
raw.F = plus(raw.T, dir(-60), pitchR(SPEC.tWheel) + pitchR(SPEC.fPinion));
raw.E = plus(raw.F, dir(-150), pitchR(SPEC.fWheel) + pitchR(SPEC.ePinion));

const ESC_DIR = -150; // direction from the escape wheel to the fork pivot
const toRe = (v) => v * RE;
raw.P = plus(raw.E, dir(ESC_DIR), toRe(ESC.D));
raw.Bal = plus(raw.E, dir(ESC_DIR), toRe(ESC.D + ESC.FORK_TO_BALANCE));

export const PLATE_CENTER = { x: -0.6, y: -3.1 };
export const PLATE_R = 19.6;

// positions re-centred on the plate
export const POS = {};
for (const k of Object.keys(raw)) POS[k] = { x: raw[k].x - PLATE_CENTER.x, y: raw[k].y - PLATE_CENTER.y };

export const FRAME_ROT = (ESC_DIR + 90) * DEG; // escapement local frame -> world

const angleOf = (a, b) => Math.atan2(b.y - a.y, b.x - a.x);

// Phases of tooth 0 on every arbor at p = 0 (escape wheel locked on the entry pallet).
const lockAngle = Math.atan2(ESC.stones.entry.contact.y, ESC.stones.entry.contact.x);
export const PHASE = { E: FRAME_ROT + lockAngle };
PHASE.F = meshPhase(PHASE.E, SPEC.ePinion.z, SPEC.fWheel.z, angleOf(raw.E, raw.F));
PHASE.T = meshPhase(PHASE.F, SPEC.fPinion.z, SPEC.tWheel.z, angleOf(raw.F, raw.T));
PHASE.C = meshPhase(PHASE.T, SPEC.tPinion.z, SPEC.cWheel.z, angleOf(raw.T, raw.C));
PHASE.B = meshPhase(PHASE.C, SPEC.cPinion.z, SPEC.barrel.z, angleOf(raw.C, raw.B));

// ratio = escape-wheel turns per arbor turn. dir = rotation sense (+1 CCW).
export const ARBORS = {
  B: { ratio: (80 / 10) * (80 / 10) * (75 / 10) * (96 / 6), dir: -1 },
  C: { ratio: (80 / 10) * (75 / 10) * (96 / 6), dir: +1 },
  T: { ratio: (75 / 10) * (96 / 6), dir: -1 },
  F: { ratio: 96 / 6, dir: +1 },
  E: { ratio: 1, dir: -1 },
};

export const arborAngle = (k, p) => PHASE[k] + (ARBORS[k].dir * p) / ARBORS[k].ratio;

// Vertical stack (bottom of each element)
export const Z = {
  plateTop: 0,
  s1: 1.25, // mesh plane centres
  s2: 2.5,
  s3: 3.7,
  s4: 4.9,
  s5: 6.2,
  bridgeBottom: 7.25,
  bridgeTop: 7.75,
};

// escape wheel real-time rate: 16 rpm at 28 800 vph
export const ESCAPE_RATE = (ESC.BEATS_PER_SECOND * (ESC.PITCH / 2)); // rad/s mean, p advances 12° per beat
