import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createMovement } from './movement.js';
import { sampleMotion, trainAngles } from './motion.js';
import { KEY_TO_PART, PARTS } from './parts.js';
import './style.css';

const app = document.getElementById('app');
const canvas = document.getElementById('view');
const hint = document.getElementById('hint');
const card = document.getElementById('card');
const cardTitle = document.getElementById('card-title');
const cardText = document.getElementById('card-text');
const cardLive = document.getElementById('card-live');
const fail = document.getElementById('fail');

window.addEventListener('error', () => {
  fail.hidden = false;
});
window.addEventListener('unhandledrejection', () => {
  fail.hidden = false;
});

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let speed = reduced ? 0 : 1;
let sim = 0;
let userMoved = false;
let selected = null;
let running = true;

let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
} catch (err) {
  fail.hidden = false;
  throw err;
}

if (!renderer.getContext()) {
  fail.hidden = false;
}

renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(app.clientWidth, app.clientHeight, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.02;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x24141c, 1);

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
pmrem.dispose();

const { root, layout, rig, updateSpring } = createMovement();
scene.add(root);

const camera = new THREE.PerspectiveCamera(32, 1, 0.05, 80);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.rotateSpeed = 0.72;
controls.zoomSpeed = 0.7;
controls.minDistance = 3.2;
controls.maxDistance = 28;
controls.minPolarAngle = 0.18;
controls.maxPolarAngle = 1.18;
controls.target.set(0.15, 0.5, -0.2);

const home = { dir: new THREE.Vector3(), target: controls.target.clone() };

function homeDirection() {
  const b = layout.positions.balance;
  const len = Math.hypot(b.x, b.z) || 1;
  const dx = b.x / len;
  const dz = b.z / len;
  return new THREE.Vector3(dx + -dz * 0.38, 1.25, dz + dx * 0.38).normalize();
}

function frameDistance() {
  const aspect = camera.aspect;
  const vfov = THREE.MathUtils.degToRad(camera.fov);
  const hfov = 2 * Math.atan(Math.tan(vfov / 2) * aspect);
  const limit = Math.min(vfov, hfov);
  const margin = aspect < 0.85 ? 1.12 : 1.02;
  return (layout.plateR * margin) / Math.tan(limit / 2);
}

function applyHome() {
  const dir = homeDirection();
  const dist = frameDistance();
  camera.position.copy(controls.target).addScaledVector(dir, dist);
  home.dir.copy(dir);
  home.target.copy(controls.target);
  controls.update();
}

function resize() {
  const w = app.clientWidth;
  const h = app.clientHeight;
  if (!w || !h) return;
  camera.aspect = w / h;
  camera.clearViewOffset();
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
  if (!userMoved) applyHome();
}

const key = new THREE.DirectionalLight(0xfff1e2, 4.4);
key.position.set(-9, 11, 4);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.near = 1;
key.shadow.camera.far = 36;
key.shadow.camera.left = -8;
key.shadow.camera.right = 8;
key.shadow.camera.top = 8;
key.shadow.camera.bottom = -8;
key.shadow.bias = -0.0002;
key.shadow.normalBias = 0.02;
key.target.position.set(0.4, 0.4, -0.3);
scene.add(key, key.target);

scene.add(new THREE.HemisphereLight(0xfff6ee, 0x4a2030, 0.32));
const fill = new THREE.DirectionalLight(0xc9d7ea, 0.7);
fill.position.set(8, 6, -5);
scene.add(fill);
const rim = new THREE.DirectionalLight(0xffe2c2, 1.7);
rim.position.set(5, 4, 9);
scene.add(rim);

const partNodes = new Map();
root.traverse((obj) => {
  if (obj.userData && obj.userData.part) partNodes.set(obj.userData.part, obj);
});

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function partFrom(obj) {
  let node = obj;
  while (node) {
    if (node.userData && node.userData.part) return node.userData.part;
    node = node.parent;
  }
  return null;
}

function paint(id, on) {
  const node = partNodes.get(id);
  if (!node) return;
  node.traverse((obj) => {
    const mat = obj.material;
    if (!mat || !mat.emissive || !mat.userData) return;
    if (on) {
      mat.emissive.setHex(mat.userData.glow || 0x553311);
      mat.emissiveIntensity = 0.62;
    } else {
      mat.emissive.setHex(mat.userData.baseEmissive || 0);
      mat.emissiveIntensity = mat.userData.baseEmissiveIntensity || 0;
    }
  });
}

function select(id) {
  if (selected === id) return;
  if (selected) paint(selected, false);
  selected = id;
  if (!id || !PARTS[id]) {
    card.hidden = true;
    hint.hidden = false;
    return;
  }
  paint(id, true);
  const part = PARTS[id];
  cardTitle.textContent = part.name;
  cardText.textContent = part.body;
  card.hidden = false;
  hint.hidden = true;
}

function wrapDeg(rad) {
  let d = ((rad * 180) / Math.PI) % 360;
  if (d < 0) d += 360;
  return d.toFixed(1);
}

function liveLine(id, motion, angles) {
  if (id === 'balance' || id === 'spring') {
    return `摆角 ${Math.round((motion.balance * 180) / Math.PI)}°`;
  }
  if (id === 'fork') return motion.fork < 0 ? '此刻停在进瓦一侧' : '此刻停在出瓦一侧';
  if (id === 'escape') return `转到 ${wrapDeg(angles.escape)}°`;
  if (id === 'fourth') return `转到 ${wrapDeg(angles.fourth)}°`;
  if (id === 'third') return `转到 ${wrapDeg(angles.third)}°`;
  if (id === 'center') return `转到 ${wrapDeg(angles.center)}°`;
  if (id === 'barrel') return `转到 ${wrapDeg(angles.barrel)}°`;
  return '';
}

function applyMotion() {
  const motion = sampleMotion(sim, 1, layout.forkAmp);
  const angles = trainAngles(motion.escapeSpin, layout.phase);
  rig.barrel.rotation.y = angles.barrel;
  rig.center.rotation.y = angles.center;
  rig.third.rotation.y = angles.third;
  rig.fourth.rotation.y = angles.fourth;
  rig.escape.rotation.y = angles.escape;
  rig.fork.rotation.y = layout.forkBase + motion.fork;
  rig.balance.rotation.y = motion.balance;
  updateSpring(motion.balance);
  if (selected) {
    const line = liveLine(selected, motion, angles);
    if (cardLive.textContent !== line) cardLive.textContent = line;
  } else if (cardLive.textContent) {
    cardLive.textContent = '';
  }
}

function setSpeed(next) {
  speed = next;
  for (const button of document.querySelectorAll('.speeds button')) {
    button.setAttribute('aria-pressed', String(Number(button.dataset.speed) === speed));
  }
}

function pick(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObject(root, true);
  for (const hit of hits) {
    const id = partFrom(hit.object);
    if (id) {
      select(id);
      return;
    }
  }
  select(null);
}

let down = null;
canvas.addEventListener('pointerdown', (event) => {
  down = { x: event.clientX, y: event.clientY };
  canvas.classList.add('dragging');
});
window.addEventListener('pointerup', (event) => {
  canvas.classList.remove('dragging');
  if (!down) return;
  const dx = event.clientX - down.x;
  const dy = event.clientY - down.y;
  down = null;
  if (dx * dx + dy * dy > 16) {
    userMoved = true;
    return;
  }
  if (event.target !== canvas) return;
  pick(event.clientX, event.clientY);
});

canvas.addEventListener('pointermove', (event) => {
  if (down) return;
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObject(root, true);
  const over = hits.some((hit) => partFrom(hit.object));
  canvas.classList.toggle('pointing', over);
});

controls.addEventListener('start', () => {
  userMoved = true;
});

for (const button of document.querySelectorAll('.speeds button')) {
  button.addEventListener('click', () => setSpeed(Number(button.dataset.speed)));
}
document.getElementById('reset').addEventListener('click', () => {
  userMoved = false;
  controls.target.copy(home.target);
  applyHome();
});
document.getElementById('close').addEventListener('click', () => select(null));

const keys = new Set();
window.addEventListener('keydown', (event) => {
  if (event.target instanceof HTMLElement && event.target.closest('button')) return;
  if (KEY_TO_PART[event.key]) {
    select(KEY_TO_PART[event.key]);
    return;
  }
  if (event.key === 'Escape') {
    select(null);
    return;
  }
  if (event.key === 'r' || event.key === 'R') {
    userMoved = false;
    controls.target.copy(home.target);
    applyHome();
    return;
  }
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '=', '-', '_'].includes(event.key)) {
    keys.add(event.key);
    event.preventDefault();
  }
});
window.addEventListener('keyup', (event) => keys.delete(event.key));

function keyboardOrbit(dt) {
  if (!keys.size) return;
  userMoved = true;
  const spherical = new THREE.Spherical().setFromVector3(
    camera.position.clone().sub(controls.target),
  );
  const turn = dt * 1.4;
  if (keys.has('ArrowLeft')) spherical.theta -= turn;
  if (keys.has('ArrowRight')) spherical.theta += turn;
  if (keys.has('ArrowUp')) spherical.phi -= turn;
  if (keys.has('ArrowDown')) spherical.phi += turn;
  spherical.phi = Math.max(controls.minPolarAngle, Math.min(controls.maxPolarAngle, spherical.phi));
  if (keys.has('+') || keys.has('=')) spherical.radius = Math.max(controls.minDistance, spherical.radius * (1 - dt));
  if (keys.has('-') || keys.has('_')) spherical.radius = Math.min(controls.maxDistance, spherical.radius * (1 + dt));
  camera.position.setFromSpherical(spherical).add(controls.target);
  controls.update();
}

if (reduced) setSpeed(0);

resize();
applyMotion();
renderer.render(scene, camera);

const clock = new THREE.Clock();
function tick() {
  if (!running) return;
  const dt = Math.min(0.05, clock.getDelta());
  if (!reduced || speed > 0) sim += dt * (speed || 0);
  keyboardOrbit(dt);
  applyMotion();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

window.addEventListener('resize', resize);
document.addEventListener('visibilitychange', () => {
  running = !document.hidden;
  if (running) {
    clock.getDelta();
    requestAnimationFrame(tick);
  }
});

