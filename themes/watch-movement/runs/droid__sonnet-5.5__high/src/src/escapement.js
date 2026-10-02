// Swiss lever escapement kinematics (28 800 vph, 15-tooth escape wheel).
// Pure math, no three.js: usable from the browser and from the node test.
//
// Local frame (all lengths normalised to the escape-wheel radius Re = 1):
//   escape wheel centre O = (0,0), turns clockwise
//   fork pivot P = (0,-D), balance centre Bc = (0,-D-d)
// Pallet lock points sit at -60° and -120° on the wheel circle, 2.5 tooth
// pitches apart, so every flip of the fork advances the wheel by half a pitch.

export const DEG = Math.PI / 180;

export const TEETH = 15;
export const PITCH = (2 * Math.PI) / TEETH; // 24°
export const BEATS_PER_SECOND = 8; // 28 800 vph
export const BALANCE_HZ = BEATS_PER_SECOND / 2; // 4 Hz

const SPAN = 60 * DEG; // angle between the two lock points seen from O
export const D = 1 / Math.cos(SPAN / 2); // fork pivot distance from O (tangents meet at P)
export const P = { x: 0, y: -D };

export const FORK_MAX = 6 * DEG; // banking angle on each side
export const ROLLER_RATIO = 0.2; // roller radius / (pivot-to-balance distance)
export const FORK_TO_BALANCE = 2.2; // d, distance P -> balance centre (Re units)
export const ROLLER_R = ROLLER_RATIO * FORK_TO_BALANCE;
export const BALANCE_AMPLITUDE = 138 * DEG;

const DRAW = 12 * DEG;
const LOCK_IN = 0.04;
const LOCK_OUT = 0.1;
const IMPULSE_LEN = 0.07;
const IMPULSE_ANGLE = 30 * DEG;
const STONE_THICK = 0.13;

const dir = (a) => ({ x: Math.cos(a), y: Math.sin(a) });
const add = (a, b, k = 1) => ({ x: a.x + b.x * k, y: a.y + b.y * k });

function rotAbout(pt, c, ang) {
  const s = Math.sin(ang);
  const co = Math.cos(ang);
  const dx = pt.x - c.x;
  const dy = pt.y - c.y;
  return { x: c.x + dx * co - dy * s, y: c.y + dx * s + dy * co };
}

function hull(points) {
  const pts = points.slice().sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
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
  return lower.concat(upper); // CCW
}

// Stone polygon in world coordinates for the pose in which it is fully engaged.
function stoneEngaged({ lockAt, nlAngle, niAngle }) {
  const C = dir(lockAt);
  const lockIn = dir(nlAngle + Math.PI / 2);
  const impRay = dir(niAngle + Math.PI / 2);
  const nl = dir(nlAngle);
  const ni = dir(niAngle);
  const K = add(C, lockIn, LOCK_IN);
  const A = add(C, lockIn, -LOCK_OUT);
  const B = add(K, impRay, IMPULSE_LEN);
  return {
    contact: C,
    lockInDir: lockIn,
    points: hull([A, K, B, add(A, nl, -STONE_THICK), add(B, ni, -STONE_THICK)]),
    corners: { A, K, B },
  };
}

const LOCK_ENTRY = -(Math.PI / 2 - SPAN / 2); // -60°
const LOCK_EXIT = -(Math.PI / 2 + SPAN / 2); // -120°

// The locking face is the circle about P turned by the draw angle, so the
// wheel pulls the fork onto its banking pin. The impulse face is steeper.
const pToEntry = Math.atan2(Math.sin(LOCK_ENTRY) - P.y, Math.cos(LOCK_ENTRY) - P.x); // +30°
const pToExit = Math.atan2(Math.sin(LOCK_EXIT) - P.y, Math.cos(LOCK_EXIT) - P.x); // +150°

const entryNl = pToEntry - DRAW;
const exitNl = pToExit + Math.PI - DRAW;
const entry = stoneEngaged({ lockAt: LOCK_ENTRY, nlAngle: entryNl, niAngle: entryNl + DRAW + IMPULSE_ANGLE });
const exit = stoneEngaged({ lockAt: LOCK_EXIT, nlAngle: exitNl, niAngle: exitNl + DRAW + IMPULSE_ANGLE });

export const stones = {
  entry: {
    ...entry,
    local: entry.points.map((p) => rotAbout(p, P, -FORK_MAX)),
    engagedAt: FORK_MAX,
  },
  exit: {
    ...exit,
    local: exit.points.map((p) => rotAbout(p, P, FORK_MAX)),
    engagedAt: -FORK_MAX,
  },
};
stones.entry.localCorners = Object.fromEntries(
  Object.entries(entry.corners).map(([k, v]) => [k, rotAbout(v, P, -FORK_MAX)])
);
stones.exit.localCorners = Object.fromEntries(
  Object.entries(exit.corners).map(([k, v]) => [k, rotAbout(v, P, FORK_MAX)])
);

export function forkAngleFromBalance(beta) {
  const g = -Math.atan2(ROLLER_R * Math.sin(beta), FORK_TO_BALANCE - ROLLER_R * Math.cos(beta));
  return Math.max(-FORK_MAX, Math.min(FORK_MAX, g));
}

export function forkAngleUnclamped(beta) {
  return -Math.atan2(ROLLER_R * Math.sin(beta), FORK_TO_BALANCE - ROLLER_R * Math.cos(beta));
}

function inConvex(poly, x, y) {
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    if ((b.x - a.x) * (y - a.y) - (b.y - a.y) * (x - a.x) < 0) return false;
  }
  return true;
}

const TIP0 = LOCK_ENTRY;

export class Escapement {
  constructor() {
    this.t = 0;
    this.p = 0; // clockwise rotation of the escape wheel since start (rad)
    this.beta = -BALANCE_AMPLITUDE;
    this.fork = FORK_MAX;
    this.world = { entry: null, exit: null };
    this.maxRate = 900 * DEG; // free-running wheel speed limit (rad/s of sim time)
    this.recoilTotal = 0;
    this._poseStones(this.fork);
  }

  _poseStones(F) {
    this.world.entry = stones.entry.local.map((q) => rotAbout(q, P, F));
    this.world.exit = stones.exit.local.map((q) => rotAbout(q, P, F));
  }

  blocked(p) {
    const e = this.world.entry;
    const x = this.world.exit;
    for (let k = 0; k < TEETH; k++) {
      let a = TIP0 - p + k * PITCH;
      a = ((a % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // (-π, π]
      if (a > -10 * DEG || a < -170 * DEG) continue;
      const tx = Math.cos(a);
      const ty = Math.sin(a);
      if (inConvex(e, tx, ty) || inConvex(x, tx, ty)) return true;
    }
    return false;
  }

  step(dt) {
    this.t += dt;
    this.beta = -BALANCE_AMPLITUDE * Math.cos(2 * Math.PI * BALANCE_HZ * this.t);
    this.fork = forkAngleFromBalance(this.beta);
    this._poseStones(this.fork);

    const dp = 0.02 * DEG;
    let p = this.p;
    if (this.blocked(p)) {
      let n = 0;
      while (this.blocked(p) && n < 600) {
        p -= dp;
        n++;
      }
      this.recoilTotal += n * dp;
    }
    const limit = p + this.maxRate * dt;
    while (p + dp <= limit && !this.blocked(p + dp)) p += dp;
    this.p = p;
  }
}
