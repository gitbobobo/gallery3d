import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// ---------- renderer / scene ----------
const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.06).texture;

const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.5, 200);
camera.position.set(6, 40, 24);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0.5, 1.2, 0.5);

function fitCamera() {
  const dir = camera.position.clone().sub(controls.target).normalize();
  const t = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
  const dist = 17.8 / t / Math.min(camera.aspect, 1);
  camera.position.copy(controls.target).addScaledVector(dir, dist);
}
fitCamera();
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 8;
controls.maxDistance = 180;
controls.maxPolarAngle = Math.PI * 0.62;
controls.enablePan = true;

const key = new THREE.DirectionalLight(0xfff2dd, 2.4);
key.position.set(10, 26, 12);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.left = key.shadow.camera.bottom = -18;
key.shadow.camera.right = key.shadow.camera.top = 18;
key.shadow.camera.far = 60;
key.shadow.bias = -0.0004;
key.shadow.radius = 4;
scene.add(key);
scene.add(new THREE.AmbientLight(0x8898b8, 0.35));

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(60, 48),
  new THREE.ShadowMaterial({ opacity: 0.35 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.7;
floor.receiveShadow = true;
scene.add(floor);

// ---------- materials ----------
function stripesTexture(scale = 1, hue = '#b2aa99', dark = '#948b79') {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d');
  g.fillStyle = hue; g.fillRect(0, 0, 512, 512);
  g.save();
  g.translate(256, 256); g.rotate(-Math.PI / 5.2);
  for (let i = -14; i < 14; i++) {
    g.fillStyle = i % 2 ? dark : hue;
    g.globalAlpha = 0.55;
    g.fillRect(-400, i * 30 * scale, 800, 30 * scale);
  }
  g.restore();
  g.globalAlpha = 0.06;
  for (let i = 0; i < 2600; i++) {
    g.fillStyle = Math.random() > .5 ? '#fff' : '#000';
    g.fillRect(Math.random() * 512, Math.random() * 512, 1.6, 1.6);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

const M = {
  plate:  new THREE.MeshStandardMaterial({ map: stripesTexture(1), color: 0xb6ad9c, metalness: 0.72, roughness: 0.46 }),
  bridge: new THREE.MeshStandardMaterial({ map: stripesTexture(0.55, '#aca393', '#8f8674'), color: 0xbdb4a4, metalness: 0.8, roughness: 0.36 }),
  gold:   new THREE.MeshStandardMaterial({ color: 0xd9b365, metalness: 0.95, roughness: 0.3 }),
  goldHi: new THREE.MeshStandardMaterial({ color: 0xe8c87e, metalness: 0.95, roughness: 0.22 }),
  steel:  new THREE.MeshStandardMaterial({ color: 0xcdd3dc, metalness: 0.95, roughness: 0.26 }),
  steelDark: new THREE.MeshStandardMaterial({ color: 0x8f97a3, metalness: 0.9, roughness: 0.38 }),
  blued:  new THREE.MeshStandardMaterial({ color: 0x24406e, metalness: 0.9, roughness: 0.32 }),
  spring: new THREE.MeshStandardMaterial({ color: 0x3d5a94, metalness: 0.85, roughness: 0.35, side: THREE.DoubleSide }),
  ruby:   new THREE.MeshStandardMaterial({ color: 0xb01030, metalness: 0.3, roughness: 0.15, emissive: 0x30000a }),
  dark:   new THREE.MeshStandardMaterial({ color: 0x3a3f4a, metalness: 0.6, roughness: 0.6 }),
};

// ---------- gear outline ----------
// profile fractions of one pitch: [rootEnd, flankTop, tipEnd, flankDown]
function gearOutline(z, rPitch, add, ded, prof = [0.3, 0.46, 0.62, 0.78], lean = 0) {
  const rT = rPitch + add, rR = Math.max(rPitch - ded, 0.05);
  const p = Math.PI * 2 / z, pts = [];
  const rad = u => {
    if (u < prof[0] || u >= prof[3]) return rR;
    if (u < prof[1]) return rR + (rT - rR) * (u - prof[0]) / (prof[1] - prof[0]);
    if (u < prof[2]) return rT;
    return rT - (rT - rR) * (u - prof[2]) / (prof[3] - prof[2]);
  };
  const steps = 6;
  for (let k = 0; k < z; k++) {
    for (let s = 0; s <= steps; s++) {
      const u = s / steps;
      const a = k * p + (u + lean * (rad(u) - rR) / (rT - rR)) * p;
      pts.push(new THREE.Vector2(Math.cos(a) * rad(u), Math.sin(a) * rad(u)));
    }
  }
  return pts;
}

function shapeFromPts(pts) {
  const s = new THREE.Shape();
  s.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) s.lineTo(pts[i].x, pts[i].y);
  s.closePath();
  return s;
}

function extrude(pts, h, mat, bevel = 0.02) {
  const geo = new THREE.ExtrudeGeometry(shapeFromPts(pts), {
    depth: h, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 1,
  });
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = true;
  return m;
}

// toothed rim with circular hole + spokes + hub
function makeWheel(z, rPitch, add, ded, h, mat, opts = {}) {
  const g = new THREE.Group();
  const pts = gearOutline(z, rPitch, add, ded, opts.prof, opts.lean);
  const shape = shapeFromPts(pts);
  const rimIn = opts.rimIn ?? (rPitch - ded - 0.55);
  const hole = new THREE.Path();
  hole.absarc(0, 0, rimIn, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const rim = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, {
    depth: h, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 1,
  }), mat);
  rim.castShadow = true;
  g.add(rim);

  const hubR = opts.hubR ?? 0.55;
  const n = opts.spokes ?? 4;
  for (let i = 0; i < n; i++) {
    const len = rimIn - hubR + 0.35;
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(len, opts.spokeW ?? 0.75, h * 0.8), mat);
    spoke.castShadow = true;
    spoke.position.set(Math.cos(i / n * Math.PI * 2) * (hubR + len / 2 - 0.15), Math.sin(i / n * Math.PI * 2) * (hubR + len / 2 - 0.15), h * 0.5);
    spoke.rotation.z = i / n * Math.PI * 2;
    g.add(spoke);
  }
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(hubR, hubR, h, 24), mat);
  hub.rotation.x = Math.PI / 2;
  hub.position.z = h / 2;
  hub.castShadow = true;
  g.add(hub);
  return g;
}

function makePinion(z, rPitch, add, ded, h, mat) {
  const pts = gearOutline(z, rPitch, add, ded, [0.16, 0.42, 0.58, 0.84]);
  return extrude(pts, h, mat, 0.012);
}

function arbor(r, z0, z1, mat) {
  const a = new THREE.Mesh(new THREE.CylinderGeometry(r, r, z1 - z0, 16), mat);
  a.rotation.x = Math.PI / 2;
  a.position.z = (z0 + z1) / 2;
  a.castShadow = true;
  return a;
}

// ---------- train definition ----------
// wheel speeds derived from a real going train, centre wheel = 1 rev / hour
const TAU = Math.PI * 2;
const omC = TAU / 3600;          // centre wheel rad/s
const OM = {
  center: -omC,
  third:  omC * 60 / 10,         // centre wheel 60t : third pinion 10l
  fourth: -omC * 60 / 10 * 70 / 7,
  escape: omC * 60 / 10 * 70 / 7 * 72 / 6,
  barrel: omC * 12 / 84,
};

const P = {
  barrel: new THREE.Vector2(-5.2, 4.8),
  center: new THREE.Vector2(2.63, 1.15),
  third:  new THREE.Vector2(10.07, -0.84),
  fourth: new THREE.Vector2(5.37, -2.55),
  escape: new THREE.Vector2(0.42, -4.86),
  fork:   new THREE.Vector2(-4.84, -6.11),
  balance:new THREE.Vector2(-7.6, -6.6),
};

const dirTo = (a, b) => Math.atan2(b.y - a.y, b.x - a.x);

// ---------- movement group ----------
const movement = new THREE.Group();
movement.rotation.x = -Math.PI / 2;   // local +z -> world +y
scene.add(movement);

const pickables = [];   // meshes with userData.partId
const parts = {};       // partId -> {root, mats:[{m,e}]}
function register(root, id) {
  root.traverse(o => { if (o.isMesh) { o.userData.partId = id; pickables.push(o); } });
}

function jewel(x, y, z, rJ = 0.4, rC = 0.78) {
  const g = new THREE.Group();
  const chaton = new THREE.Mesh(new THREE.CylinderGeometry(rC, rC * 0.92, 0.28, 24), M.goldHi);
  chaton.rotation.x = Math.PI / 2;
  const j = new THREE.Mesh(new THREE.CylinderGeometry(rJ, rJ, 0.22, 20), M.ruby);
  j.rotation.x = Math.PI / 2;
  j.position.z = 0.05;
  g.add(chaton, j);
  g.position.set(x, y, z);
  return g;
}

function screw(x, y, z, r = 0.62, mat = M.blued) {
  const g = new THREE.Group();
  const head = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.9, 0.3, 20), mat);
  head.rotation.x = Math.PI / 2;
  const slot = new THREE.Mesh(new THREE.BoxGeometry(r * 1.5, 0.1, 0.1), M.dark);
  slot.position.z = 0.16;
  slot.rotation.z = Math.random() * Math.PI;
  g.add(head, slot);
  g.position.set(x, y, z);
  return g;
}

// ---------- plate ----------
{
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(15.8, 16.1, 1.4, 96), M.plate);
  plate.rotation.x = Math.PI / 2;
  plate.position.z = -0.7;
  plate.receiveShadow = true;
  const rim = new THREE.Mesh(new THREE.TorusGeometry(15.8, 0.28, 12, 96), M.steelDark);
  rim.position.z = -0.05;
  movement.add(plate, rim);
  [[-13.5, 3.2], [13.6, -3.4], [-2.0, 14.6], [-11.8, -9.0], [12.2, 8.8]].forEach(([x, y]) =>
    movement.add(screw(x, y, -0.06, 0.7, M.steelDark)));
  register(plate, 'plate'); register(rim, 'plate');
}

// ---------- barrel ----------
const barrel = new THREE.Group();
{
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(7.24, 7.24, 2.2, 96), M.gold);
  drum.rotation.x = Math.PI / 2; drum.position.z = 1.5;
  const teeth = extrude(gearOutline(84, 7.56, 0.27, 0.2), 0.85, M.gold);
  teeth.position.z = 0.6;
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(7.1, 7.1, 0.18, 96), M.goldHi);
  lid.rotation.x = Math.PI / 2; lid.position.z = 2.64;
  const innerRing = new THREE.Mesh(new THREE.TorusGeometry(5.6, 0.12, 10, 72), M.steelDark);
  innerRing.position.z = 2.75;
  barrel.add(drum, teeth, lid, innerRing);
  barrel.add(arbor(0.4, -0.5, 4.9, M.steel));
  const square = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.72, 0.8), M.steel);
  square.position.z = 5.35;
  barrel.add(square);
  barrel.position.set(P.barrel.x, P.barrel.y, 0);
  movement.add(barrel);
  register(barrel, 'barrel');
}

// ---------- wheel arbors ----------
// spec: [id, wheelZ, mWheel, pinionZ, wheelR(add/ded factors), zWheel, spokes]
const arbors = {};
function buildArbor(id, pos, wheelTeeth, rPitchW, pinionTeeth, rPitchP, opt = {}) {
  const g = new THREE.Group();
  const wheel = makeWheel(wheelTeeth, rPitchW, opt.add ?? 0.22, opt.ded ?? 0.28, opt.h ?? 0.42,
    opt.mat ?? M.gold, { spokes: opt.spokes ?? 4, rimIn: opt.rimIn, spokeW: opt.spokeW, prof: opt.prof, lean: opt.lean, hubR: opt.hubR });
  wheel.position.z = opt.zWheel ?? 1.5;
  const pinion = makePinion(pinionTeeth, rPitchP, opt.pAdd ?? 0.16, opt.pDed ?? 0.14, 3.0, M.steel);
  pinion.position.z = 0.5;
  g.add(wheel, pinion);
  g.add(arbor(0.22, 0.1, opt.arborTop ?? 4.45, M.steel));
  g.position.set(pos.x, pos.y, 0);
  movement.add(g);
  register(g, id);
  arbors[id] = { group: g, wheel, pinion };
  return arbors[id];
}

buildArbor('center', P.center, 60, 6.6, 12, 1.08, { spokes: 4, rimIn: 5.4, zWheel: 3.0 });
buildArbor('third',  P.third,  70, 4.55, 10, 1.1, { spokes: 4, rimIn: 3.6, add: 0.2, ded: 0.24, zWheel: 1.4 });
buildArbor('fourth', P.fourth, 72, 5.04, 7, 0.455, { spokes: 4, rimIn: 4.1, add: 0.2, ded: 0.24, zWheel: 2.45 });

// escape arbor: pinion 6 + escape wheel 15 (hooked teeth)
{
  const g = new THREE.Group();
  const wheel = makeWheel(15, 3.3, 0.62, 0.55, 0.36, M.steel, {
    spokes: 4, rimIn: 2.35, spokeW: 0.5, hubR: 0.42,
    prof: [0.34, 0.66, 0.7, 0.86], lean: 0.1,
  });
  wheel.position.z = 2.0;
  const pinion = makePinion(6, 0.42, 0.15, 0.14, 3.0, M.steel);
  pinion.position.z = 0.5;
  g.add(wheel, pinion);
  g.add(arbor(0.18, 0.2, 3.4, M.steel));
  g.position.set(P.escape.x, P.escape.y, 0);
  movement.add(g);
  register(g, 'escape');
  arbors.escape = { group: g, wheel, pinion };
}

// ---------- meshing phase offsets ----------
// toothPhase so teeth interleave at t=0: driver tooth -> child, driven pinion gap -> parent
const phase = { wheel: {}, pinion: {} };
function setMeshPhase(driverId, driverZ, drivenId, drivenZ, pd, pc) {
  const alpha = dirTo(pd, pc);
  phase.wheel[driverId] = alpha;
  phase.pinion[drivenId] = alpha + Math.PI - Math.PI / drivenZ;
}
setMeshPhase('barrel', 84, 'center', 12, P.barrel, P.center);
setMeshPhase('center', 60, 'third', 10, P.center, P.third);
setMeshPhase('third', 70, 'fourth', 7, P.third, P.fourth);
setMeshPhase('fourth', 72, 'escape', 6, P.fourth, P.escape);

// ---------- pallet fork ----------
const fork = new THREE.Group();
const forkBase = dirTo(P.fork, P.escape);   // local +x points at escape centre
{
  const F = P.fork, E = P.escape, B = P.balance;
  const alphaFE = dirTo(E, F);              // direction E->F on wheel circle
  const rStone = 3.55;
  // stones sit on the tooth-tip circle, ~ +/-30 deg either side of the F direction
  const stoneAng = [alphaFE + 0.62, alphaFE - 0.62];
  const local = v => {
    const dx = v.x - F.x, dy = v.y - F.y;
    const c = Math.cos(-forkBase), s = Math.sin(-forkBase);
    return new THREE.Vector2(dx * c - dy * s, dx * s + dy * c);
  };
  const stoneWorld = stoneAng.map(a => new THREE.Vector2(E.x + Math.cos(a) * rStone, E.y + Math.sin(a) * rStone));
  const stoneLocal = stoneWorld.map(local);

  // anchor body
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.5, 24), M.steel);
  body.rotation.x = Math.PI / 2; body.position.z = 0.25;
  fork.add(body);

  // arms to stones
  stoneLocal.forEach((sp, i) => {
    const len = Math.hypot(sp.x, sp.y);
    const ang = Math.atan2(sp.y, sp.x);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(len, 0.5, 0.4), M.steel);
    arm.position.set(Math.cos(ang) * len / 2, Math.sin(ang) * len / 2, 0.2);
    arm.rotation.z = ang;
    arm.castShadow = true;
    fork.add(arm);
    const stone = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.3, 0.5), M.ruby);
    stone.position.set(sp.x, sp.y, 0.25);
    stone.rotation.z = ang + (i === 0 ? 0.5 : -0.5) + Math.PI / 2;
    fork.add(stone);
  });

  // tail toward balance + horns straddling the impulse pin path
  const pinR = 0.6;
  const pinWorld = new THREE.Vector2(B.x + Math.cos(dirTo(B, F)) * pinR, B.y + Math.sin(dirTo(B, F)) * pinR);
  const pinL = local(pinWorld);
  const tailLen = Math.abs(pinL.x) - 0.2;
  const tail = new THREE.Mesh(new THREE.BoxGeometry(tailLen, 0.34, 0.36), M.steel);
  tail.position.set(-tailLen / 2, 0, 0.2);
  tail.castShadow = true;
  fork.add(tail);
  [-1, 1].forEach(s => {
    const horn = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.22, 0.4), M.steel);
    horn.position.set(pinL.x + 0.12, pinL.y + s * 0.44, 0.22);
    fork.add(horn);
  });
  const guard = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.5, 10), M.steel);
  guard.rotation.x = Math.PI / 2;
  guard.position.set(pinL.x + 0.3, pinL.y, -0.15);
  fork.add(guard);
  fork.add(arbor(0.16, -0.3, 1.65, M.steel));

  fork.position.set(F.x, F.y, 1.92);
  fork.rotation.z = forkBase;
  movement.add(fork);
  register(fork, 'pallet');
}

// ---------- balance ----------
const balance = new THREE.Group();
let hairGeo, hairPts, hairIdx;
{
  const B = P.balance;
  // staff
  balance.add(arbor(0.16, 0.6, 5.9, M.steel));
  // roller + impulse pin
  const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.28, 32), M.steelDark);
  roller.rotation.x = Math.PI / 2; roller.position.z = 2.15;
  const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.55, 12), M.ruby);
  pin.rotation.x = Math.PI / 2; pin.position.set(0.6, 0, 2.15);
  balance.add(roller, pin);
  // rim
  const rim = new THREE.Mesh(new THREE.TorusGeometry(4.3, 0.34, 14, 72), M.goldHi);
  rim.position.z = 4.25; rim.castShadow = true;
  balance.add(rim);
  // two arms
  for (const a of [0, Math.PI / 2]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(8.3, 0.55, 0.4), M.goldHi);
    arm.position.z = 4.25; arm.rotation.z = a; arm.castShadow = true;
    balance.add(arm);
  }
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.55, 24), M.goldHi);
  hub.rotation.x = Math.PI / 2; hub.position.z = 4.25;
  balance.add(hub);
  // timing screws on rim outside
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * TAU + 0.26;
    const s = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.5, 12), M.gold);
    s.rotation.z = a - Math.PI / 2;
    s.position.set(Math.cos(a) * 4.72, Math.sin(a) * 4.72, 4.25);
    balance.add(s);
  }
  // collet
  const collet = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.4, 16), M.blued);
  collet.rotation.x = Math.PI / 2; collet.position.z = 4.8;
  balance.add(collet);
  balance.position.set(B.x, B.y, 0);
  movement.add(balance);
  register(balance, 'balance');
}

// hairspring: flat ribbon spiral, inner end rotates with balance, outer end pinned
{
  const N = 340, coils = 4.5833, r0 = 0.55, r1 = 3.05;
  const pos = new Float32Array(N * 2 * 3);
  hairIdx = [];
  for (let i = 0; i < N - 1; i++) {
    const a = i * 2;
    hairIdx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  hairGeo = new THREE.BufferGeometry();
  hairGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  hairGeo.setIndex(hairIdx);
  hairPts = { N, coils, r0, r1, w: 0.07, z: 4.8 };
  const spring = new THREE.Mesh(hairGeo, M.spring);
  spring.position.set(P.balance.x, P.balance.y, 0);
  movement.add(spring);
}

function updateHairspring(theta) {
  const { N, coils, r0, r1, w, z } = hairPts;
  const p = hairGeo.attributes.position.array;
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const phi = t * coils * TAU;
    const r = r0 + (r1 - r0) * t;
    const ang = phi + theta * (1 - t);          // inner end follows staff, outer fixed
    const cx = Math.cos(ang) * r, cy = Math.sin(ang) * r;
    const nr = (r1 - r0) / (coils * TAU);       // radial dir for ribbon width
    const nx = Math.cos(ang), ny = Math.sin(ang);
    p[i * 6]     = cx + nx * w; p[i * 6 + 1] = cy + ny * w; p[i * 6 + 2] = z;
    p[i * 6 + 3] = cx - nx * w; p[i * 6 + 4] = cy - ny * w; p[i * 6 + 5] = z;
  }
  hairGeo.attributes.position.needsUpdate = true;
}

// ---------- bridges ----------
function bridgeBetween(a, b, w, h, z, mat, rEndA = w / 2, rEndB = w / 2) {
  const d = Math.hypot(b.x - a.x, b.y - a.y);
  const s = new THREE.Shape();
  const ang = Math.atan2(b.y - a.y, b.x - a.x);
  const ca = Math.cos(ang), sa = Math.sin(ang);
  s.absarc(0, 0, rEndA, ang + Math.PI / 2, ang - Math.PI / 2, false);
  s.lineTo(ca * d + Math.cos(ang + Math.PI / 2) * rEndB, sa * d + Math.sin(ang + Math.PI / 2) * rEndB);
  s.absarc(ca * d, sa * d, rEndB, ang + Math.PI / 2, ang - Math.PI / 2, false);
  s.closePath();
  const m = new THREE.Mesh(new THREE.ExtrudeGeometry(s, {
    depth: h, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 2,
  }), mat);
  m.position.set(a.x, a.y, z);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}

const pillar = (x, y, zTop, r = 0.5) => {
  const p = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.1, zTop, 20), M.steelDark);
  p.rotation.x = Math.PI / 2;
  p.position.set(x, y, zTop / 2);
  p.castShadow = true;
  movement.add(p);
  return p;
};

{
  // train bridge: center -> third -> fourth (two capsules + pivot bosses)
  const b1 = bridgeBetween(P.center, P.third, 2.6, 0.7, 3.9, M.bridge, 2.9, 2.6);
  const b2 = bridgeBetween(P.third, P.fourth, 2.5, 0.7, 3.9, M.bridge, 2.6, 2.4);
  movement.add(b1, b2);
  register(b1, 'bridge'); register(b2, 'bridge');
  for (const p of [P.center, P.third, P.fourth]) movement.add(jewel(p.x, p.y, 4.62));
  movement.add(screw(6.61, 1.12, 4.68), screw(7.38, -0.75, 4.68));

  // barrel cock
  const bcEnd = new THREE.Vector2(-13.0, 8.1);
  const bc = bridgeBetween(P.barrel, bcEnd, 3.0, 0.7, 5.0, M.bridge, 3.2, 1.5);
  movement.add(bc);
  register(bc, 'bridge');
  movement.add(jewel(P.barrel.x, P.barrel.y, 5.72));
  pillar(bcEnd.x + 0.3, bcEnd.y - 0.2, 5.0, 0.55);
  movement.add(screw(-12.7, 7.9, 5.78));

  // ratchet wheel above barrel cock
  const ratchet = extrude(gearOutline(30, 2.2, 0.16, 0.18, [0.2, 0.5, 0.56, 0.9], 0.12), 0.3, M.steel);
  ratchet.position.set(P.barrel.x, P.barrel.y, 5.8);
  const rscrew = screw(P.barrel.x, P.barrel.y, 6.12, 0.55);
  movement.add(ratchet, rscrew);
  register(ratchet, 'barrel');

  // escape wheel cock
  const ec = bridgeBetween(P.escape, new THREE.Vector2(3.12, -8.46), 1.6, 0.55, 2.9, M.bridge, 1.1, 0.9);
  movement.add(ec);
  register(ec, 'bridge');
  movement.add(jewel(P.escape.x, P.escape.y, 3.48, 0.3, 0.58));
  pillar(3.1, -8.3, 2.9, 0.42);
  movement.add(screw(3.1, -8.3, 3.5, 0.45));

  // pallet cock
  const pc = bridgeBetween(P.fork, new THREE.Vector2(-3.6, -7.9), 1.3, 0.45, 3.0, M.bridge, 1.1, 0.75);
  movement.add(pc);
  register(pc, 'bridge');
  movement.add(jewel(P.fork.x, P.fork.y, 3.48, 0.28, 0.5));
  pillar(-3.55, -7.75, 3.0, 0.42);
  movement.add(screw(-3.55, -7.75, 3.5, 0.42));

  // balance cock: balance -> outer edge, carries the stud + jewel
  const B = P.balance;
  const end = new THREE.Vector2(-12.2, -9.0);
  const bck = bridgeBetween(B, end, 1.9, 0.8, 5.4, M.bridge, 1.7, 1.15);
  movement.add(bck);
  register(bck, 'bridge');
  movement.add(jewel(B.x, B.y, 6.23, 0.42, 0.8));
  pillar(end.x + 0.5, end.y + 0.3, 5.4, 0.6);
  movement.add(screw(end.x + 0.5, end.y + 0.3, 6.27, 0.62));
  // stud holding hairspring outer end
  const studAng = 0 * TAU + hairPts.coils * TAU;   // outer end at phi = coils*TAU
  const sx = B.x + Math.cos(studAng) * (hairPts.r1 + 0.1);
  const sy = B.y + Math.sin(studAng) * (hairPts.r1 + 0.1);
  const stud = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.9), M.steelDark);
  stud.position.set(sx, sy, 4.95);
  movement.add(stud);
  register(stud, 'balance');
}

// ---------- part info ----------
const INFO = {
  barrel: { name: '发条盒', en: 'Mainspring Barrel', spec: '84 齿 · 约 7 小时转一周',
    desc: '机芯的动力来源。盒内卷绕着发条，缓慢释放弹性能量，通过外缘齿圈驱动整个轮系。' },
  center: { name: '中心轮（二轮）', en: 'Centre Wheel', spec: '60 齿 / 12 齿轴 · 1 小时转一周',
    desc: '由发条盒驱动，每小时转一圈——在整表中它的轴伸出表盘，直接带动分针。' },
  third: { name: '三轮（过轮）', en: 'Third Wheel', spec: '70 齿 / 10 齿轴 · 10 分钟转一周',
    desc: '介于中心轮与四轮之间的传动轮，继续提高转速、传递扭矩。' },
  fourth: { name: '四轮（秒轮）', en: 'Fourth Wheel', spec: '72 齿 / 7 齿轴 · 1 分钟转一周',
    desc: '每分钟转一圈，整表中带动秒针。它同时驱动擒纵轮的齿轴。' },
  escape: { name: '擒纵轮', en: 'Escape Wheel', spec: '15 齿 / 6 齿轴 · 5 秒转一周',
    desc: '轮系的最后一级。它被擒纵叉交替锁住和释放，每次节拍前进一个齿，把连续的转动变成精准的间歇步进。' },
  pallet: { name: '擒纵叉', en: 'Pallet Fork', spec: '双叉瓦宝石 · 每秒摆动 3 次',
    desc: '随摆轮摆动而左右换向：两块宝石叉瓦交替卡入擒纵轮齿间——一次锁住轮系，一次释放并给摆轮补一点能量。' },
  balance: { name: '摆轮与游丝', en: 'Balance & Hairspring', spec: '1.5 Hz · 10 800 次/小时',
    desc: '机芯的"心脏"与计时基准。游丝像弹簧一样把摆轮拉回中点，使其以固定频率往复摆动；每次经过中点都会拨动擒纵叉释放一个擒纵轮齿。' },
  plate: { name: '主夹板', en: 'Main Plate', spec: '机芯骨架',
    desc: '所有轮轴的一端都装在主夹板的红宝石轴承孔里。表面饰有日内瓦条纹。' },
  bridge: { name: '夹板（桥）', en: 'Bridge / Cock', spec: '固定轮轴上端',
    desc: '从上方压住各轮轴的上轴承，与主夹板一起把轮系悬空固定。夹板上的金圈红宝石是减少摩擦的宝石轴承。' },
};

// ---------- picking ----------
const ray = new THREE.Raycaster();
const info = document.getElementById('info');
let selected = null;

function setHighlight(root, on) {
  root.traverse(o => {
    if (!o.isMesh) return;
    if (on) {
      if (!o.userData.origMat) {
        o.userData.origMat = o.material;
        o.material = o.material.clone();
      }
      if (o.material.emissive) o.material.emissive.setHex(0x3d5a9e);
    } else if (o.userData.origMat) {
      o.material.dispose();
      o.material = o.userData.origMat;
      delete o.userData.origMat;
    }
  });
}

function pick(cx, cy) {
  ray.setFromCamera(new THREE.Vector2(cx / innerWidth * 2 - 1, -(cy / innerHeight) * 2 + 1), camera);
  const hits = ray.intersectObjects(pickables, false);
  const hit = hits.find(h => h.object.userData.partId);
  if (selected) { const old = findRoot(selected); if (old) setHighlight(old, false); selected = null; }
  if (!hit) { info.classList.remove('show'); return; }
  const id = hit.object.userData.partId;
  selected = id;
  const root = findRoot(id);
  if (root) setHighlight(root, true);
  const d = INFO[id];
  document.getElementById('infoName').textContent = d.name;
  document.getElementById('infoEn').textContent = d.en;
  document.getElementById('infoDesc').textContent = d.desc;
  document.getElementById('infoSpec').textContent = d.spec;
  info.classList.add('show');
}

const idRoots = {};
function findRoot(id) {
  if (!idRoots[id]) {
    let r = null;
    movement.traverse(o => { if (!r && o.userData.partId === id) r = o; });
    // climb to the registered group (direct child-level group)
    let node = r;
    while (node && node.parent !== movement) node = node.parent;
    idRoots[id] = node || r;
  }
  return idRoots[id];
}

let pd = null;
renderer.domElement.addEventListener('pointerdown', e => { pd = { x: e.clientX, y: e.clientY, t: performance.now() }; });
renderer.domElement.addEventListener('pointerup', e => {
  if (!pd) return;
  const moved = Math.hypot(e.clientX - pd.x, e.clientY - pd.y);
  if (moved < 7 && performance.now() - pd.t < 500) pick(e.clientX, e.clientY);
  pd = null;
});
document.getElementById('infoX').addEventListener('click', () => {
  info.classList.remove('show');
  if (selected) { const r = findRoot(selected); if (r) setHighlight(r, false); selected = null; }
});

// ---------- speed ----------
let speed = 1;
document.getElementById('speed').addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  speed = +b.dataset.s;
  document.querySelectorAll('#speed button').forEach(x => x.classList.toggle('on', x === b));
});

// ---------- animation ----------
// escapement: balance f=1.5 Hz -> 3 beats/s; escape wheel 15 teeth -> 1 pitch per beat -> 5 s/rev
const F_BAL = 1.5, T_BEAT = 1 / (2 * F_BAL), PITCH_E = TAU / 15;
const AMP_BAL = THREE.MathUtils.degToRad(230);
const FORK_AMP = THREE.MathUtils.degToRad(9);
const ESC_PHASE = 0.35;
const balBase = dirTo(P.balance, P.fork);   // impulse pin points at fork at theta=0

const smooth = x => { x = Math.min(Math.max(x, 0), 1); return x * x * (3 - 2 * x); };

function escAngle(wt) {
  const n = Math.floor(wt / T_BEAT);
  const f = (wt - n * T_BEAT) / T_BEAT;
  const d = 0.32;
  let e;
  if (f < d) {
    const x = f / d;
    e = 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2); // overshoot then settle
  } else e = 1;
  return PITCH_E * (n + e);
}
function forkAngle(wt) {
  const n = Math.floor(wt / T_BEAT);
  const f = (wt - n * T_BEAT) / T_BEAT;
  const side = n % 2 === 0 ? 1 : -1;
  const u = smooth((f - 0.05) / 0.14);
  return side * (1 - 2 * u) * FORK_AMP;
}
const balAngle = wt => AMP_BAL * Math.sin(TAU * F_BAL * wt);

let wt = 0, last = performance.now();
function tick(now) {
  const dt = Math.min((now - last) / 1000, 0.1);
  last = now;
  wt += dt * speed;

  arbors.center.group.rotation.z = OM.center * wt;
  arbors.third.group.rotation.z = OM.third * wt;
  arbors.fourth.group.rotation.z = OM.fourth * wt;
  barrel.rotation.z = OM.barrel * wt;
  arbors.escape.group.rotation.z = escAngle(wt);

  // tooth-phase alignment baked into wheel/pinion local offsets
  arbors.center.wheel.rotation.z = phase.wheel.center;
  arbors.center.pinion.rotation.z = phase.pinion.center;
  arbors.third.wheel.rotation.z = phase.wheel.third;
  arbors.third.pinion.rotation.z = phase.pinion.third;
  arbors.fourth.wheel.rotation.z = phase.wheel.fourth;
  arbors.fourth.pinion.rotation.z = phase.pinion.fourth;
  arbors.escape.wheel.rotation.z = ESC_PHASE;
  arbors.escape.pinion.rotation.z = phase.pinion.escape;
  fork.rotation.z = forkBase + forkAngle(wt);
  const bt = balAngle(wt);
  balance.rotation.z = balBase + bt;
  updateHairspring(bt * 0.55);

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

// barrel drum teeth phase: tooth points at centre wheel
barrel.children[1].rotation.z = phase.wheel.barrel;

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  fitCamera();
});

requestAnimationFrame(tick);
