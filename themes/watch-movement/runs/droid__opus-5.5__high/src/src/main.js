import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { gearProfile, spokeHoles, circlePath, planarUV, extrude, escapeWheelShape, spiralRibbon } from './geometry.js';
import { perlageTexture, cotesTexture, sunburstTexture, snailTexture } from './textures.js';
import { PARTS } from './parts.js';

const DEG = Math.PI / 180;
const TAU = Math.PI * 2;

// ---------------------------------------------------------------------------
// Gear train (tooth counts and modules, mm)
// barrel 80 -> center pinion 10 (×8), center 80 -> third pinion 10 (×8),
// third 75 -> fourth pinion 10 (×7.5), fourth 72 -> escape pinion 6 (×12)
// center: 1 rev/h, fourth: 1 rev/min, escape: 12 rev/min, 15 teeth -> 360 beats/min = 3 Hz
// ---------------------------------------------------------------------------
const TR = {
  barrel: { teeth: 80, m: 0.12 },
  center: { pinion: 10, wheel: 80, m: 0.08 },
  third: { pinion: 10, wheel: 75, m: 0.075 },
  fourth: { pinion: 10, wheel: 72, m: 0.075 },
  escape: { pinion: 6, teeth: 15 },
};
const BALANCE_HZ = 3;
const AMPLITUDE = 270 * DEG;
const BANK = 7.5 * DEG;
const ESC_DIR = -1; // escape wheel turns clockwise seen from above
const ESC_TIP = 1.3;
const ESC_ROOT = 0.95;
const LOCK = 0.1;
const STONE_W = 0.13;
const D_EP = 2.6; // escape arbor -> lever pivot
const L_PB = 3.2; // lever pivot -> balance staff
const RR = 0.75; // impulse pin radius on roller
const BAL_R = 3.55; // balance rim outer radius
const COCK_LEN = BAL_R + 1.25;

const v2 = (x, y) => new THREE.Vector2(x, y);
const dir2 = (a) => v2(Math.cos(a), Math.sin(a));
const centreDist = (z1, z2, m) => (m * (z1 + z2)) / 2;
const ang = (v) => Math.atan2(v.y, v.x);

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
const L = {};
L.C = v2(0, 0);
L.B = L.C.clone().addScaledVector(dir2(140 * DEG), centreDist(TR.barrel.teeth, TR.center.pinion, TR.barrel.m));
L.T = L.C.clone().addScaledVector(dir2(-20 * DEG), centreDist(TR.center.wheel, TR.third.pinion, TR.center.m));
L.F = L.T.clone().addScaledVector(dir2(-110 * DEG), centreDist(TR.third.wheel, TR.fourth.pinion, TR.third.m));
L.E = L.F.clone().addScaledVector(dir2(-10 * DEG), centreDist(TR.fourth.wheel, TR.escape.pinion, TR.fourth.m));
const U_ANG = -120 * DEG;
const U = dir2(U_ANG);
L.P = L.E.clone().addScaledVector(U, D_EP);
L.Bc = L.P.clone().addScaledVector(U, L_PB);

const extents = [
  [L.B, 5.0],
  [L.C, 3.4],
  [L.T, 3.0],
  [L.F, 2.9],
  [L.E, 1.4],
  [L.Bc, BAL_R + 0.45],
];
{
  const min = v2(Infinity, Infinity);
  const max = v2(-Infinity, -Infinity);
  for (const [p, r] of extents) {
    min.x = Math.min(min.x, p.x - r);
    min.y = Math.min(min.y, p.y - r);
    max.x = Math.max(max.x, p.x + r);
    max.y = Math.max(max.y, p.y + r);
  }
  const o = min.clone().add(max).multiplyScalar(0.5);
  for (const k of Object.keys(L)) L[k].sub(o);
}
let PLATE_R = 0;
for (const [p, r] of extents) PLATE_R = Math.max(PLATE_R, p.length() + r);
PLATE_R += 0.7;

// balance cock post: pick a direction from the balance that keeps the post clear of the train
let COCK_ANG = 0;
{
  const away = ang(L.Bc);
  let best = null;
  for (let d = -110; d <= 110; d += 5) {
    const a = away + d * DEG;
    const base = L.Bc.clone().addScaledVector(dir2(a), COCK_LEN);
    if (base.length() + 1.0 > PLATE_R) continue;
    const clear = Math.min(
      base.distanceTo(L.F) - 3.0,
      base.distanceTo(L.E) - 2.3,
      base.distanceTo(L.T) - 3.1,
      base.distanceTo(L.P) - 2.4,
    );
    if (clear < 0) continue;
    const score = Math.abs(d);
    if (!best || score < best.score) best = { a, score };
  }
  COCK_ANG = best ? best.a : away + 60 * DEG;
}

// ---------------------------------------------------------------------------
// Escapement geometry (lever frame: pivot at origin, +x toward the balance)
// ---------------------------------------------------------------------------
const phiGeom = (th) => Math.atan2(-RR * Math.sin(th), L_PB - RR * Math.cos(th));
let THETA_E;
{
  let lo = 0;
  let hi = Math.PI / 2;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (Math.abs(phiGeom(mid)) < BANK) lo = mid;
    else hi = mid;
  }
  THETA_E = (lo + hi) / 2;
}
const OMEGA = TAU * BALANCE_HZ;
const TAU_WIN = Math.asin(THETA_E / AMPLITUDE) / OMEGA;
const PHI_EVEN = Math.max(-BANK, Math.min(BANK, phiGeom(-1)));

const E_LOCAL = v2(-D_EP, 0);
function stoneTip(sign, gamma, rs, phi) {
  const s = E_LOCAL.clone().add(dir2(sign * gamma).multiplyScalar(rs));
  s.rotateAround(v2(0, 0), phi);
  const w = s.sub(E_LOCAL);
  return { rho: w.length(), psi: ang(w) };
}
let GAMMA = 30 * DEG;
let RS = ESC_TIP;
const IN_SIGN = stoneTip(1, GAMMA, RS, PHI_EVEN).rho < stoneTip(-1, GAMMA, RS, PHI_EVEN).rho ? 1 : -1;
for (let i = 0; i < 200; i++) {
  const t = stoneTip(IN_SIGN, GAMMA, RS, PHI_EVEN);
  GAMMA += 30 * DEG - IN_SIGN * t.psi;
  RS += ESC_TIP - LOCK - t.rho;
}
const PSI_IN = stoneTip(IN_SIGN, GAMMA, RS, PHI_EVEN).psi;
const DELTA = STONE_W / 2 / (ESC_TIP - LOCK / 2) + 0.5 * DEG;
const THETA_ESC0 = U_ANG + PSI_IN - ESC_DIR * DELTA;

// gear phases: wheel W drives pinion P, alpha = direction W -> P
function meshWheelAngle(thetaP, zP, zW, alpha) {
  const pP = TAU / zP;
  const pW = TAU / zW;
  let uP = (alpha + Math.PI - thetaP) / pP;
  uP -= Math.floor(uP);
  const uW = 0.5 - uP;
  return alpha - uW * pW;
}
const PH = {};
PH.escape = THETA_ESC0;
PH.fourth = meshWheelAngle(PH.escape, TR.escape.pinion, TR.fourth.wheel, ang(L.E.clone().sub(L.F)));
PH.third = meshWheelAngle(PH.fourth, TR.fourth.pinion, TR.third.wheel, ang(L.F.clone().sub(L.T)));
PH.center = meshWheelAngle(PH.third, TR.third.pinion, TR.center.wheel, ang(L.T.clone().sub(L.C)));
PH.barrel = meshWheelAngle(PH.center, TR.center.pinion, TR.barrel.teeth, ang(L.C.clone().sub(L.B)));
const K = {};
K.escape = 1;
K.fourth = (-K.escape * TR.escape.pinion) / TR.fourth.wheel;
K.third = (-K.fourth * TR.fourth.pinion) / TR.third.wheel;
K.center = (-K.third * TR.third.pinion) / TR.center.wheel;
K.barrel = (-K.center * TR.center.pinion) / TR.barrel.teeth;

// Quasi-static escapement. The escape wheel advance "a" (positive in the running direction)
// is always pushed forward by the train until a tooth meets a pallet stone, and pushed back
// when a stone draws into it. Rest (locked) positions and the motion while the lever swings
// between the bankings are solved once against the real tooth and stone outlines.
const HALF_PITCH = TAU / TR.escape.teeth / 2;
const ESC_TABLE_N = 240;
const ESC = (() => {
  const wheel = escapeWheelShape(TR.escape.teeth, ESC_TIP, ESC_ROOT, ESC_DIR).getPoints(1);
  if (wheel[0].equals(wheel[wheel.length - 1])) wheel.pop();
  const STONE_LEN = 0.6;
  const stones = [1, -1].map((sgn) => ({
    c: E_LOCAL.clone().add(dir2(sgn * GAMMA).multiplyScalar(RS + STONE_LEN / 2)),
    a: sgn * GAMMA,
  }));
  const hx = STONE_LEN / 2;
  const hy = STONE_W / 2;
  const tmp = v2(0, 0);
  const o = v2(0, 0);
  const toWorldLever = (q, phi) => tmp.copy(q).rotateAround(o, U_ANG + phi).add(L.P);

  function inWheel(p, wa) {
    const lp = p.clone().sub(L.E).rotateAround(o, -wa);
    if (lp.length() > ESC_TIP) return false;
    let inside = false;
    for (let i = 0, j = wheel.length - 1; i < wheel.length; j = i++) {
      const a = wheel[i];
      const b = wheel[j];
      if (a.y > lp.y !== b.y > lp.y && lp.x < ((b.x - a.x) * (lp.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
    }
    return inside;
  }
  function collides(adv, phi) {
    const wa = PH.escape + ESC_DIR * adv;
    const corners = [];
    const frames = stones.map((s) => {
      const c = toWorldLever(s.c, phi).clone();
      const ang = U_ANG + phi + s.a;
      const ux = dir2(ang);
      const uy = dir2(ang + Math.PI / 2);
      for (const [sx, sy] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        corners.push(c.clone().addScaledVector(ux, sx * hx).addScaledVector(uy, sy * hy));
      }
      return { c, ux, uy };
    });
    const w = v2(0, 0);
    for (const q of wheel) {
      w.copy(q).rotateAround(o, wa).add(L.E);
      if (w.distanceToSquared(L.P) > (D_EP + 0.2) ** 2) continue;
      for (const f of frames) {
        const dx = w.x - f.c.x;
        const dy = w.y - f.c.y;
        if (Math.abs(dx * f.ux.x + dy * f.ux.y) < hx && Math.abs(dx * f.uy.x + dy * f.uy.y) < hy) return true;
      }
    }
    for (const p of corners) if (inWheel(p, wa)) return true;
    return false;
  }

  const STEP = 0.01 * DEG;
  const advanceUntilBlocked = (a, phi, limit) => {
    while (a + STEP <= limit && !collides(a + STEP, phi)) a += STEP;
    return a;
  };
  // state n is locked with the lever on the (-1)^n banking; approach from behind the lock
  const rest = [0, 1].map((n) => {
    const phi = (n ? -1 : 1) * BANK;
    const nominal = HALF_PITCH * n;
    return advanceUntilBlocked(nominal - 4 * DEG, phi, nominal + 4 * DEG);
  });
  const restAdvance = (n) => rest[n & 1] + HALF_PITCH * (n - (n & 1));

  const tables = [];
  for (const k of [0, 1]) {
    const s = k === 0 ? 1 : -1;
    const a0 = restAdvance(k);
    const a1 = restAdvance(k + 1);
    const tab = new Float32Array(ESC_TABLE_N + 1);
    let a = a0;
    for (let i = 0; i <= ESC_TABLE_N; i++) {
      const phi = s * BANK * (1 - (2 * i) / ESC_TABLE_N);
      let guard = 0;
      while (collides(a, phi) && guard++ < 400) a -= STEP;
      a = advanceUntilBlocked(a, phi, a1);
      tab[i] = a - a0;
    }
    tab[ESC_TABLE_N] = a1 - a0;
    tables.push(tab);
  }
  return { tables, restAdvance };
})();
const restAdvance = ESC.restAdvance;

function kinematics(t) {
  const thB = AMPLITUDE * Math.sin(OMEGA * t);
  // outside the impulse window the pin has left the fork and the lever rests on a banking pin
  const phi = Math.abs(thB) >= THETA_E ? -Math.sign(thB) * BANK : Math.max(-BANK, Math.min(BANK, phiGeom(thB)));
  const half = 0.5 / BALANCE_HZ;
  const k = Math.round(t / half);
  const dt = t - k * half;
  let adv;
  if (dt <= -TAU_WIN) adv = restAdvance(k);
  else if (dt >= TAU_WIN) adv = restAdvance(k + 1);
  else {
    // beat k swings the lever from s·BANK to −s·BANK
    const s = k & 1 ? -1 : 1;
    const x = ((1 - (s * phi) / BANK) / 2) * ESC_TABLE_N;
    const i = Math.max(0, Math.min(ESC_TABLE_N - 1, Math.floor(x)));
    const f = Math.max(0, Math.min(1, x - i));
    const tab = ESC.tables[k & 1];
    adv = restAdvance(k) + tab[i] * (1 - f) + tab[i + 1] * f;
  }
  return { thB, phi, X: ESC_DIR * adv };
}

// ---------------------------------------------------------------------------
// Renderer / scene
// ---------------------------------------------------------------------------
const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;
scene.environmentIntensity = 0.85;

const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.1, 400);
camera.up.set(0, 0, 1);

scene.add(new THREE.HemisphereLight(0xfff4e0, 0x202530, 0.6));
const key = new THREE.DirectionalLight(0xfff1dc, 2.2);
key.position.set(-14, -10, 30);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.left = key.shadow.camera.bottom = -PLATE_R - 1;
key.shadow.camera.right = key.shadow.camera.top = PLATE_R + 1;
key.shadow.camera.near = 5;
key.shadow.camera.far = 70;
key.shadow.bias = -0.0004;
key.shadow.normalBias = 0.02;
key.shadow.radius = 3;
scene.add(key);
const rim = new THREE.DirectionalLight(0xc8d8ff, 0.8);
rim.position.set(18, 16, 10);
scene.add(rim);

// ---------------------------------------------------------------------------
// Materials
// ---------------------------------------------------------------------------
const tex = {
  perlage: perlageTexture(),
  cotes: cotesTexture(),
  sun: sunburstTexture(),
  snail: snailTexture(),
};
const M = {
  gold: new THREE.MeshStandardMaterial({ color: 0xe0b867, metalness: 1, roughness: 0.3, map: tex.sun }),
  balance: new THREE.MeshStandardMaterial({ color: 0xe7b47a, metalness: 1, roughness: 0.22, map: tex.sun }),
  steel: new THREE.MeshStandardMaterial({ color: 0xdfe3e8, metalness: 1, roughness: 0.14 }),
  steelSun: new THREE.MeshStandardMaterial({ color: 0xd9dde2, metalness: 1, roughness: 0.22, map: tex.snail }),
  darkSteel: new THREE.MeshStandardMaterial({ color: 0x7a838f, metalness: 0.9, roughness: 0.35, side: THREE.DoubleSide }),
  blued: new THREE.MeshStandardMaterial({ color: 0x2747b3, metalness: 0.85, roughness: 0.22 }),
  hair: new THREE.MeshStandardMaterial({ color: 0x9fb6ea, metalness: 0.95, roughness: 0.18, side: THREE.DoubleSide }),
  plate: new THREE.MeshStandardMaterial({ color: 0x9ea4ac, metalness: 1, roughness: 0.48, map: tex.perlage }),
  plateEdge: new THREE.MeshStandardMaterial({ color: 0xbfc4ca, metalness: 1, roughness: 0.3 }),
  bridge: new THREE.MeshStandardMaterial({ color: 0xd6dade, metalness: 1, roughness: 0.25, map: tex.cotes }),
  ruby: new THREE.MeshPhysicalMaterial({
    color: 0xc0122f,
    metalness: 0,
    roughness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    emissive: 0x3a0008,
    emissiveIntensity: 1,
  }),
  chaton: new THREE.MeshStandardMaterial({ color: 0xe6c27a, metalness: 1, roughness: 0.15 }),
};

function mesh(geo, mat, z = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.z = z;
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}
function cylZ(r, z0, z1, mat, seg = 32, x = 0, y = 0) {
  const g = new THREE.CylinderGeometry(r, r, z1 - z0, seg);
  g.rotateX(Math.PI / 2);
  const m = mesh(g, mat, (z0 + z1) / 2);
  m.position.x = x;
  m.position.y = y;
  return m;
}
function gearMesh({ teeth, m, z, depth, mat = M.gold, spokes = 0, hub = 0.5, rimW = 0.3, spokeW = 0.32, pinion = false, curve = 0 }) {
  const prof = pinion
    ? gearProfile({ teeth, module: m, addendum: 0.9, dedendum: 1.45, thickness: 0.4 })
    : gearProfile({ teeth, module: m });
  if (spokes) prof.shape.holes.push(...spokeHoles(spokes, hub, prof.rr - rimW, spokeW, 0.3, curve));
  const geo = extrude(prof.shape, depth, pinion ? 0.006 : 0.012);
  planarUV(geo, prof.ra);
  return mesh(geo, mat, z);
}

// ---------------------------------------------------------------------------
// Part registry
// ---------------------------------------------------------------------------
const pickables = [];
const partMeshes = {};
function register(obj, keyName) {
  obj.traverse((o) => {
    if (!o.isMesh) return;
    if (Array.isArray(o.material)) {
      o.material = o.material.map((m) => m.clone());
      o.userData.noGlow = true;
    } else {
      o.material = o.material.clone();
      o.userData.baseEmissive = o.material.emissive ? o.material.emissive.getHex() : 0;
      o.userData.baseEmissiveIntensity = o.material.emissiveIntensity ?? 1;
    }
    o.userData.part = keyName;
    pickables.push(o);
    (partMeshes[keyName] ||= []).push(o);
  });
  return obj;
}
const at = (p, z = 0) => {
  const g = new THREE.Group();
  g.position.set(p.x, p.y, z);
  return g;
};
const root = new THREE.Group();
scene.add(root);

// ---------------------------------------------------------------------------
// Main plate + jewels + screws
// ---------------------------------------------------------------------------
{
  const g = new THREE.Group();
  const pg = new THREE.CylinderGeometry(PLATE_R, PLATE_R, 0.7, 160, 1);
  pg.rotateX(Math.PI / 2);
  const plate = new THREE.Mesh(pg, [M.plateEdge, M.plate, M.plateEdge]);
  plate.position.z = -0.35;
  plate.receiveShadow = true;
  g.add(plate);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(PLATE_R - 0.02, 0.06, 8, 200), M.plateEdge);
  ring.position.z = -0.02;
  g.add(ring);
  for (const p of [L.B, L.C, L.T, L.F, L.E, L.P, L.Bc]) {
    g.add(cylZ(0.42, 0, 0.03, M.chaton, 32, p.x, p.y));
    g.add(cylZ(0.26, 0.03, 0.07, M.ruby, 32, p.x, p.y));
  }
  // screws placed only where they don't sit under a moving part
  const obstacles = [...extents, [L.Bc.clone().addScaledVector(dir2(COCK_ANG), COCK_LEN), 1.4]];
  let placed = [];
  for (let a = 0; a < 360 && placed.length < 6; a += 7) {
    const p = dir2(a * DEG).multiplyScalar(PLATE_R - 0.85);
    if (obstacles.some(([c, r]) => c.distanceTo(p) < r + 0.5)) continue;
    if (placed.some((q) => q.distanceTo(p) < 5)) continue;
    placed.push(p);
    const s = at(p);
    s.add(cylZ(0.42, 0, 0.18, M.blued, 32));
    const slot = mesh(new THREE.BoxGeometry(0.75, 0.08, 0.1), M.plateEdge, 0.16);
    slot.rotation.z = Math.random() * Math.PI;
    s.add(slot);
    g.add(s);
  }
  register(g, 'plate');
  root.add(g);
}

// ---------------------------------------------------------------------------
// Barrel (rotating) + barrel arbor, ratchet and click (static while running)
// ---------------------------------------------------------------------------
const barrel = at(L.B);
{
  const prof = gearProfile({ teeth: TR.barrel.teeth, module: TR.barrel.m });
  prof.shape.holes.push(circlePath(prof.rr - 0.35));
  const teeth = mesh(extrude(prof.shape, 0.2), M.gold, 0.25);
  planarUV(teeth.geometry, prof.ra);
  barrel.add(teeth);
  const wall = new THREE.LatheGeometry(
    [v2(4.4, 0.3), v2(4.6, 0.3), v2(4.6, 1.44), v2(4.54, 1.5), v2(4.4, 1.5), v2(4.4, 0.3)],
    128,
  );
  wall.rotateX(Math.PI / 2);
  barrel.add(mesh(wall, M.gold));
  barrel.add(cylZ(4.45, 0.25, 0.33, M.gold, 96));
  const cover = new THREE.Shape();
  cover.absarc(0, 0, 4.5, 0, TAU, false);
  cover.holes.push(...spokeHoles(3, 1.25, 4.05, 1.1, 0.4));
  const cg = extrude(cover, 0.08, 0.01);
  planarUV(cg, 4.6);
  barrel.add(mesh(cg, M.steelSun, 1.4));
  const spring = spiralRibbon({ r0: 1.0, r1: 4.32, turns: 8, N: 700, height: 0.95, thick: 0.06 });
  barrel.add(mesh(spring.geometry, M.darkSteel, 0.38));
  register(barrel, 'barrel');
  root.add(barrel);

  const arbor = new THREE.Group();
  arbor.add(cylZ(0.32, 0, 2.0, M.steel));
  arbor.add(cylZ(0.95, 0.33, 1.4, M.steel, 48));
  // ratchet wheel (saw teeth)
  const rt = 36;
  const pts = [];
  for (let j = 0; j < rt; j++) {
    const c = (j * TAU) / rt;
    const p = TAU / rt;
    pts.push(dir2(c).multiplyScalar(2.78));
    pts.push(dir2(c + p * 0.78).multiplyScalar(3.05));
    pts.push(dir2(c + p * 0.84).multiplyScalar(3.05));
  }
  const rs = new THREE.Shape(pts);
  const rg = extrude(rs, 0.12, 0.01);
  planarUV(rg, 3.1);
  const ratchetWheel = mesh(rg, M.steelSun, 1.55);
  const screw = cylZ(0.6, 1.69, 1.82, M.blued, 40);
  const slot = mesh(new THREE.BoxGeometry(1.0, 0.1, 0.06), M.steel, 1.81);
  const ratchet = new THREE.Group();
  ratchet.add(arbor, ratchetWheel, screw, slot);
  const rGroup = at(L.B);
  rGroup.add(ratchet);
  // click
  const aCl = ang(L.B.clone().sub(L.C)) - 70 * DEG;
  const pv = dir2(aCl).multiplyScalar(3.9);
  const pol = (r, a) => dir2(aCl + a).multiplyScalar(r);
  const cs = new THREE.Shape([pol(4.25, -0.08), pol(4.25, 0.1), pol(3.25, 0.34), pol(2.93, 0.31), pol(3.55, -0.08)]);
  rGroup.add(mesh(extrude(cs, 0.12, 0.01), M.steel, 1.55));
  rGroup.add(cylZ(0.3, 1.55, 1.78, M.blued, 24, pv.x, pv.y));
  register(rGroup, 'ratchet');
  root.add(rGroup);
}

// ---------------------------------------------------------------------------
// Train arbors
// ---------------------------------------------------------------------------
function handShape(len, tail, w) {
  return new THREE.Shape([
    v2(-tail, 0),
    v2(-tail * 0.6, -w * 1.4),
    v2(0, -w * 1.6),
    v2(len * 0.92, -w * 0.25),
    v2(len, 0),
    v2(len * 0.92, w * 0.25),
    v2(0, w * 1.6),
    v2(-tail * 0.6, w * 1.4),
  ]);
}

const center = at(L.C);
{
  center.add(gearMesh({ teeth: TR.center.pinion, m: TR.barrel.m, z: 0.2, depth: 0.3, mat: M.steel, pinion: true }));
  center.add(gearMesh({ teeth: TR.center.wheel, m: TR.center.m, z: 1.75, depth: 0.1, spokes: 4, hub: 0.62, rimW: 0.32, spokeW: 0.36, curve: 0.18 }));
  center.add(cylZ(0.11, 0, 2.48, M.steel));
  center.add(cylZ(0.42, 1.68, 1.96, M.steel));
  register(center, 'center');
  const hand = new THREE.Group();
  hand.add(mesh(extrude(handShape(4.4, 0.9, 0.11), 0.035, 0.005), M.blued, 2.36));
  hand.add(cylZ(0.3, 2.34, 2.44, M.blued));
  register(hand, 'minute');
  center.add(hand);
  root.add(center);
}

const third = at(L.T);
{
  third.add(gearMesh({ teeth: TR.third.pinion, m: TR.center.m, z: 1.65, depth: 0.3, mat: M.steel, pinion: true }));
  third.add(gearMesh({ teeth: TR.third.wheel, m: TR.third.m, z: 0.85, depth: 0.1, spokes: 4, hub: 0.5, rimW: 0.28, spokeW: 0.3, curve: 0.18 }));
  third.add(cylZ(0.09, 0, 2.05, M.steel));
  third.add(cylZ(0.34, 0.78, 1.05, M.steel));
  register(third, 'third');
  root.add(third);
}

const fourth = at(L.F);
{
  fourth.add(gearMesh({ teeth: TR.fourth.pinion, m: TR.third.m, z: 0.75, depth: 0.3, mat: M.steel, pinion: true }));
  fourth.add(gearMesh({ teeth: TR.fourth.wheel, m: TR.fourth.m, z: 1.35, depth: 0.1, spokes: 4, hub: 0.48, rimW: 0.26, spokeW: 0.28, curve: 0.18 }));
  fourth.add(cylZ(0.085, 0, 2.3, M.steel));
  fourth.add(cylZ(0.32, 1.28, 1.52, M.steel));
  register(fourth, 'fourth');
  const hand = new THREE.Group();
  hand.add(mesh(extrude(handShape(2.1, 0.65, 0.05), 0.03, 0.004), M.blued, 2.2));
  hand.add(cylZ(0.17, 2.18, 2.27, M.blued));
  register(hand, 'seconds');
  fourth.add(hand);
  root.add(fourth);
}

const escape = at(L.E);
{
  escape.add(gearMesh({ teeth: TR.escape.pinion, m: TR.fourth.m, z: 1.25, depth: 0.3, mat: M.steel, pinion: true }));
  const shape = escapeWheelShape(TR.escape.teeth, ESC_TIP, ESC_ROOT, ESC_DIR);
  shape.holes.push(...spokeHoles(5, 0.28, ESC_ROOT - 0.16, 0.12, 0.2, 0.15 * ESC_DIR));
  const geo = extrude(shape, 0.1, 0.008);
  planarUV(geo, ESC_TIP);
  escape.add(mesh(geo, M.steelSun, 0.45));
  escape.add(cylZ(0.075, 0, 1.7, M.steel));
  escape.add(cylZ(0.22, 0.4, 0.62, M.steel));
  register(escape, 'escape');
  root.add(escape);
}

// ---------------------------------------------------------------------------
// Pallet fork (lever)
// ---------------------------------------------------------------------------
const lever = at(L.P);
{
  const g = new THREE.Group();
  const span = GAMMA + 10 * DEG;
  const rIn = RS + 0.38;
  const rOut = RS + 0.68;
  const arc = new THREE.Shape();
  const ex = E_LOCAL.x;
  arc.moveTo(ex + rOut * Math.cos(-span), rOut * Math.sin(-span));
  arc.absarc(ex, 0, rOut, -span, span, false);
  arc.lineTo(ex + rIn * Math.cos(span), rIn * Math.sin(span));
  arc.absarc(ex, 0, rIn, span, -span, true);
  g.add(mesh(extrude(arc, 0.1, 0.008), M.steel, 0.45));
  const xa = ex + RS + 0.5;
  const xf0 = L_PB - RR - 0.34;
  const xf1 = L_PB - RR + 0.03;
  const slot = 0.095;
  const bar = new THREE.Shape([
    v2(xa, -0.15),
    v2(0, -0.21),
    v2(xf0, -0.25),
    v2(xf1, -0.21),
    v2(xf1, -slot),
    v2(xf0 + 0.14, -slot),
    v2(xf0 + 0.14, slot),
    v2(xf1, slot),
    v2(xf1, 0.21),
    v2(xf0, 0.25),
    v2(0, 0.21),
    v2(xa, 0.15),
  ]);
  g.add(mesh(extrude(bar, 0.1, 0.008), M.steel, 0.45));
  g.add(cylZ(0.24, 0.4, 0.62, M.steel));
  g.add(cylZ(0.06, 0, 0.85, M.steel));
  for (const sgn of [1, -1]) {
    const len = 0.6;
    const st = mesh(new THREE.BoxGeometry(len, STONE_W, 0.2), M.ruby, 0.5);
    const c = E_LOCAL.clone().add(dir2(sgn * GAMMA).multiplyScalar(RS + len / 2));
    st.position.x = c.x;
    st.position.y = c.y;
    st.rotation.z = sgn * GAMMA;
    g.add(st);
  }
  lever.add(g);
  register(lever, 'lever');
  root.add(lever);

  const bank = new THREE.Group();
  const bx = 1.15;
  const hw = 0.21 + (0.04 * bx) / xf0;
  for (const sgn of [1, -1]) {
    const y = sgn * (bx * Math.sin(BANK) + hw * Math.cos(BANK) + 0.07);
    const p = L.P.clone().add(v2(bx, y).rotateAround(v2(0, 0), U_ANG));
    bank.add(cylZ(0.07, 0, 0.7, M.chaton, 20, p.x, p.y));
  }
  register(bank, 'banking');
  root.add(bank);
}

// ---------------------------------------------------------------------------
// Balance, roller, hairspring, cock
// ---------------------------------------------------------------------------
const balance = at(L.Bc);
const roller = new THREE.Group();
{
  const rimShape = new THREE.Shape();
  rimShape.absarc(0, 0, BAL_R, 0, TAU, false);
  rimShape.holes.push(circlePath(BAL_R - 0.35));
  const rg = extrude(rimShape, 0.38, 0.015);
  planarUV(rg, BAL_R);
  balance.add(mesh(rg, M.balance, 2.36));
  const arms = new THREE.Shape();
  arms.absarc(0, 0, BAL_R - 0.3, 0, TAU, false);
  arms.holes.push(...spokeHoles(3, 0.55, BAL_R - 0.33, 0.34, 0.5));
  const ag = extrude(arms, 0.13, 0.01);
  planarUV(ag, BAL_R - 0.3);
  balance.add(mesh(ag, M.balance, 2.5));
  const screwGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.12, 16);
  const shankGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.12, 8);
  for (let i = 0; i < 15; i++) {
    const a = (i * TAU) / 15;
    const s = new THREE.Group();
    const head = mesh(screwGeo, i % 3 === 0 ? M.blued : M.balance);
    head.position.y = BAL_R + 0.06;
    const shank = mesh(shankGeo, M.steel);
    shank.position.y = BAL_R - 0.03;
    s.add(head, shank);
    s.rotation.z = a - Math.PI / 2;
    s.position.z = 2.55;
    balance.add(s);
  }
  balance.add(cylZ(0.06, 0.06, 3.18, M.steel, 16));
  balance.add(cylZ(0.42, 2.42, 2.66, M.balance, 32));
  balance.add(cylZ(0.3, 1.98, 2.12, M.steel, 24)); // hairspring collet
  register(balance, 'balance');

  roller.add(cylZ(0.95, 0.7, 0.77, M.steel, 48));
  roller.add(cylZ(0.48, 0.47, 0.56, M.steel, 32));
  roller.add(cylZ(0.12, 0.56, 0.7, M.steel, 16));
  roller.add(cylZ(0.075, 0.42, 0.7, M.ruby, 16, RR, 0));
  register(roller, 'roller');
  balance.add(roller);
  root.add(balance);
}

const HS_TURNS = 12;
const HS_R1 = 1.78;
const hairspring = spiralRibbon({
  r0: 0.36,
  r1: HS_R1,
  turns: HS_TURNS,
  N: 1100,
  height: 0.1,
  thick: 0.022,
  start: COCK_ANG - TAU * HS_TURNS,
});
{
  const g = at(L.Bc);
  g.add(mesh(hairspring.geometry, M.hair, 2.0));
  register(g, 'hairspring');
  root.add(g);
}

{
  const len = COCK_LEN;
  const base = L.Bc.clone().addScaledVector(dir2(COCK_ANG), len);
  const g = at(base);
  g.rotation.z = COCK_ANG + Math.PI;
  const pts = [];
  for (let a = -90; a <= 90; a += 6) pts.push(v2(len, 0).add(dir2(a * DEG).multiplyScalar(0.72)));
  for (let a = 90; a <= 270; a += 6) pts.push(dir2(a * DEG).multiplyScalar(1.2));
  const shape = new THREE.Shape(pts);
  const geo = extrude(shape, 0.3, 0.03);
  {
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + 1.5) / (len + 3), pos.getY(i) / (len + 3));
  }
  g.add(mesh(geo, M.bridge, 3.0));
  g.add(cylZ(0.8, 0, 3.0, M.plateEdge, 40));
  g.add(cylZ(0.45, 3.33, 3.48, M.blued, 32));
  const sl = mesh(new THREE.BoxGeometry(0.8, 0.09, 0.06), M.steel, 3.47);
  sl.rotation.z = 0.6;
  g.add(sl);
  const lyre = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.06, 10, 40), M.chaton);
  lyre.position.set(len, 0, 3.36);
  g.add(lyre);
  g.add(cylZ(0.24, 3.3, 3.39, M.ruby, 24, len, 0));
  // hairspring stud under the cock, at the outer end of the spring
  const studR = HS_R1 + 0.02;
  const stud = mesh(new THREE.BoxGeometry(0.22, 0.22, 0.95), M.steel, 2.52);
  stud.position.x = len - studR;
  g.add(stud);
  register(g, 'cock');
  root.add(g);
}

// ---------------------------------------------------------------------------
// Animation state
// ---------------------------------------------------------------------------
function applyState(t) {
  const s = kinematics(t);
  escape.rotation.z = PH.escape + K.escape * s.X;
  fourth.rotation.z = PH.fourth + K.fourth * s.X;
  third.rotation.z = PH.third + K.third * s.X;
  center.rotation.z = PH.center + K.center * s.X;
  barrel.rotation.z = PH.barrel + K.barrel * s.X;
  lever.rotation.z = U_ANG + s.phi;
  balance.rotation.z = U_ANG + Math.PI + s.thB;
  hairspring.update(s.thB);
  return s;
}

// ---------------------------------------------------------------------------
// Camera / controls
// ---------------------------------------------------------------------------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 6;
controls.maxDistance = 120;
controls.maxPolarAngle = Math.PI * 0.62;
controls.zoomSpeed = 0.9;
controls.rotateSpeed = 0.8;
const VIEW_DIR = new THREE.Vector3(0.22, -0.78, 1).normalize();
const TARGET = new THREE.Vector3(0, -0.8, 1);

function fitDistance() {
  const aspect = window.innerWidth / window.innerHeight;
  const vf = camera.fov * DEG;
  const hf = 2 * Math.atan(Math.tan(vf / 2) * aspect);
  const f = Math.min(vf, hf);
  const r = PLATE_R * (aspect < 0.8 ? 1.04 : 1.13);
  return r / Math.sin(f / 2);
}
let userMoved = false;
function resetView(animate) {
  const endPos = TARGET.clone().addScaledVector(VIEW_DIR, fitDistance());
  if (!animate) {
    camera.position.copy(endPos);
    controls.target.copy(TARGET);
    controls.update();
    return;
  }
  const p0 = camera.position.clone();
  const t0 = controls.target.clone();
  const start = performance.now();
  const step = () => {
    const k = Math.min(1, (performance.now() - start) / 700);
    const e = smooth(k);
    camera.position.lerpVectors(p0, endPos, e);
    controls.target.lerpVectors(t0, TARGET, e);
    if (k < 1) requestAnimationFrame(step);
  };
  step();
}
resetView(false);
controls.addEventListener('start', () => (userMoved = true));

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (!userMoved) resetView(false);
});

// ---------------------------------------------------------------------------
// Picking & UI
// ---------------------------------------------------------------------------
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
function pick(clientX, clientY) {
  const rect = renderer.domElement.getBoundingClientRect();
  ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  const hit = raycaster.intersectObjects(pickables, false)[0];
  return hit ? hit.object.userData.part : null;
}

const infoEl = document.getElementById('info');
const hoverEl = document.getElementById('hoverLabel');
let selected = null;
let hovered = null;

function setSelected(k) {
  selected = k;
  for (const [name, list] of Object.entries(partMeshes)) {
    if (name === k) continue;
    for (const o of list) {
      if (o.material.emissive) {
        o.material.emissive.setHex(o.userData.baseEmissive);
        o.material.emissiveIntensity = o.userData.baseEmissiveIntensity;
      }
    }
  }
  if (!k) {
    infoEl.hidden = true;
    return;
  }
  const d = PARTS[k];
  document.getElementById('infoKicker').textContent = d.kicker;
  document.getElementById('infoName').textContent = d.name;
  document.getElementById('infoDesc').textContent = d.desc;
  const dl = document.getElementById('infoSpecs');
  dl.innerHTML = '';
  for (const [a, b] of d.specs) {
    const dt = document.createElement('dt');
    dt.textContent = a;
    const dd = document.createElement('dd');
    dd.textContent = b;
    dl.append(dt, dd);
  }
  infoEl.hidden = false;
}
document.getElementById('infoClose').addEventListener('click', () => setSelected(null));

const canvasEl = renderer.domElement;
let down = null;
canvasEl.addEventListener('pointerdown', (e) => {
  down = { x: e.clientX, y: e.clientY, t: performance.now() };
});
canvasEl.addEventListener('pointerup', (e) => {
  if (!down) return;
  const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
  if (moved < 6 && performance.now() - down.t < 600) {
    const k = pick(e.clientX, e.clientY);
    setSelected(k && k === selected ? null : k);
  }
  down = null;
});
canvasEl.addEventListener('pointermove', (e) => {
  if (e.pointerType !== 'mouse' || e.buttons) {
    hoverEl.style.display = 'none';
    return;
  }
  hovered = pick(e.clientX, e.clientY);
  if (hovered) {
    hoverEl.textContent = PARTS[hovered].name;
    hoverEl.style.left = e.clientX + 'px';
    hoverEl.style.top = e.clientY + 'px';
    hoverEl.style.display = 'block';
    canvasEl.style.cursor = 'pointer';
  } else {
    hoverEl.style.display = 'none';
    canvasEl.style.cursor = 'grab';
  }
});
canvasEl.addEventListener('pointerleave', () => {
  hoverEl.style.display = 'none';
  hovered = null;
});

// speed control
const SPEEDS = [
  ['1/50×', 0.02],
  ['1/10×', 0.1],
  ['1/4×', 0.25],
  ['实时', 1],
  ['60×', 60],
];
let speed = 0.1;
let paused = false;
const speedEl = document.getElementById('speed');
{
  const lab = document.createElement('span');
  lab.textContent = '速度';
  speedEl.append(lab);
  for (const [label, v] of SPEEDS) {
    const b = document.createElement('button');
    b.textContent = label;
    if (v === speed) b.classList.add('active');
    b.addEventListener('click', () => {
      speed = v;
      speedEl.querySelectorAll('button').forEach((x) => x.classList.toggle('active', x === b));
    });
    speedEl.append(b);
  }
}
const pauseBtn = document.getElementById('pauseBtn');
pauseBtn.addEventListener('click', () => {
  paused = !paused;
  pauseBtn.textContent = paused ? '继续' : '暂停';
  pauseBtn.classList.toggle('active', paused);
});
document.getElementById('resetBtn').addEventListener('click', () => {
  userMoved = false;
  resetView(true);
});
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    pauseBtn.click();
    e.preventDefault();
  } else if (e.key >= '1' && e.key <= String(SPEEDS.length)) {
    speedEl.querySelectorAll('button')[Number(e.key) - 1].click();
  } else if (e.key === 'r' || e.key === 'R') {
    document.getElementById('resetBtn').click();
  } else if (e.key === 'Escape') {
    setSelected(null);
  }
});

// gear-train panel
const trainEl = document.getElementById('train');
document.getElementById('trainToggle').addEventListener('click', () => trainEl.classList.toggle('open'));
const trainBody = document.getElementById('trainBody');
trainBody.innerHTML = `
<table>
<tr><td>发条盒</td><td class="n">80</td><td class="sep">→</td><td>中心轮齿轴</td><td class="n">10</td><td class="n">×8</td></tr>
<tr><td>中心轮</td><td class="n">80</td><td class="sep">→</td><td>过轮齿轴</td><td class="n">10</td><td class="n">×8</td></tr>
<tr><td>过轮</td><td class="n">75</td><td class="sep">→</td><td>秒轮齿轴</td><td class="n">10</td><td class="n">×7.5</td></tr>
<tr><td>秒轮</td><td class="n">72</td><td class="sep">→</td><td>擒纵轮齿轴</td><td class="n">6</td><td class="n">×12</td></tr>
</table>
<div class="foot">总传动比 5760 · 擒纵轮 15 齿 × 2 = 30 拍/圈<br>12 圈/分 × 30 = 360 拍/分 = 3 Hz</div>
<div class="foot" id="simClock"></div>`;
const simClock = document.getElementById('simClock');

// ---------------------------------------------------------------------------
// Loop
// ---------------------------------------------------------------------------
let simT = 0.04;
let last = performance.now();
let clockTick = 0;
function frame(now) {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  if (!paused) simT += dt * speed;
  applyState(simT);

  const pulse = 0.55 + 0.35 * Math.sin(now * 0.006);
  if (selected) {
    for (const o of partMeshes[selected]) {
      if (!o.material.emissive) continue;
      o.material.emissive.setHex(0xffa62b);
      o.material.emissiveIntensity = 0.35 * pulse;
    }
  }

  clockTick += dt;
  if (clockTick > 0.1) {
    clockTick = 0;
    const s = simT;
    const hh = Math.floor(s / 3600);
    const mm = Math.floor((s % 3600) / 60);
    const ss = (s % 60).toFixed(1).padStart(4, '0');
    simClock.textContent = `机芯走时 ${hh}:${String(mm).padStart(2, '0')}:${ss}（${speed === 1 ? '实时' : speed + ' 倍速'}）`;
  }

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// fade the hint after a while
setTimeout(() => {
  const h = document.getElementById('hint');
  if (h) h.style.transition = 'opacity 1s';
  if (h) h.style.opacity = '0.5';
}, 6000);

window.__watch = { camera, controls, setSpeed: (v) => (speed = v), setTime: (t) => (simT = t), pause: (p) => (paused = p), applyState, L, partMeshes, esc: ESC };
