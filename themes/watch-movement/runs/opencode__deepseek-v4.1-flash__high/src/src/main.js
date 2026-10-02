import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildMovement } from './watch.js';

window.addEventListener('error', () => {
  const l = document.getElementById('loading');
  if (l) l.innerHTML = '<span>无法初始化 3D 场景（需要支持 WebGL 的浏览器）</span>';
});

const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;

const scene = new THREE.Scene();

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 400);

// ---- lights ---------------------------------------------------------------
scene.add(new THREE.HemisphereLight(0xbfd4ff, 0x1a1712, 0.55));

const key = new THREE.DirectionalLight(0xfff3dd, 2.4);
key.position.set(6, 9, 8);
scene.add(key);

const fill = new THREE.DirectionalLight(0x7fa6ff, 0.9);
fill.position.set(-8, -3, 4);
scene.add(fill);

const warm = new THREE.PointLight(0xffcf8a, 90, 60, 2);
warm.position.set(-5, 6, 12);
scene.add(warm);

const rim = new THREE.PointLight(0x8fbcff, 45, 60, 2);
rim.position.set(9, -2, -6);
scene.add(rim);

// ---- movement -------------------------------------------------------------
const movement = buildMovement();
scene.add(movement.root);

const R = movement.radius;
const controlsTarget = movement.focus.clone();
camera.up.set(0, 0, 1); // the movement lies in the XY plane
// pleasant three-quarter view directions (portrait turns the long axis upright)
const viewDirWide = new THREE.Vector3(0.5, 0.74, 0.62).normalize();
const viewDirTall = new THREE.Vector3(0.82, 0.02, 0.57).normalize();
let viewDir = viewDirWide.clone();
camera.position.copy(controlsTarget).addScaledVector(viewDir, R * 3.0);
camera.lookAt(controlsTarget);

const controls = new OrbitControls(camera, canvas);
controls.target.copy(controlsTarget);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.rotateSpeed = 0.85;
controls.zoomSpeed = 0.85;
controls.enablePan = false;
controls.minDistance = R * 1.3;
controls.maxDistance = R * 6.5;
controls.minPolarAngle = 0.06;
controls.maxPolarAngle = Math.PI * 0.9;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.35;
controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_ROTATE };
controls.update();

function fitCamera(resetDir = false) {
  const aspect = window.innerWidth / window.innerHeight;
  const vFov = (camera.fov * Math.PI) / 180;
  const tanV = Math.tan(vFov / 2);
  const tanH = tanV * aspect;

  const dv = camera.position.clone().sub(controls.target);
  if (resetDir || dv.lengthSq() < 1e-6) {
    viewDir = aspect < 1.0 ? viewDirTall.clone() : viewDirWide.clone();
    dv.copy(viewDir);
  }
  dv.normalize();

  // camera basis, then project the movement's AABB onto it
  const right = new THREE.Vector3().crossVectors(dv, camera.up).normalize();
  if (right.lengthSq() < 1e-6) right.set(1, 0, 0);
  const up = new THREE.Vector3().crossVectors(right, dv).normalize();
  const FILL = 0.9; // silhouette is round, so the AABB has empty corners
  const s = movement.size;
  const halfW = FILL * 0.5 * (Math.abs(right.x) * s.x + Math.abs(right.y) * s.y + Math.abs(right.z) * s.z);
  const halfH = FILL * 0.5 * (Math.abs(up.x) * s.x + Math.abs(up.y) * s.y + Math.abs(up.z) * s.z);
  const dist = Math.max(halfW / tanH, halfH / tanV) * 1.04;

  camera.position.copy(controls.target).addScaledVector(dv, dist);
  controls.minDistance = dist * 0.35;
  controls.maxDistance = dist * 3.2;
}

// stop auto rotation once the user takes over
const stopAuto = () => {
  controls.autoRotate = false;
};
controls.addEventListener('start', stopAuto);

// ---- UI -------------------------------------------------------------------
const appEl = document.getElementById('app');
const legendEl = document.getElementById('legend');
const panelEl = document.getElementById('panel');
const panelIndexEl = document.getElementById('panel-index');
const panelNameEl = document.getElementById('panel-name');
const panelEnEl = document.getElementById('panel-en');
const panelSpecEl = document.getElementById('panel-spec');
const panelDescEl = document.getElementById('panel-desc');
const hintEl = document.getElementById('hint');
const speedEl = document.getElementById('speed-range');
const speedValEl = document.getElementById('speed-val');

const ORDER = [
  'mainspring',
  'barrel',
  'centerWheel',
  'thirdWheel',
  'fourthWheel',
  'escapeWheel',
  'palletFork',
  'balanceWheel',
  'hairspring',
  'mainplate',
];

const pickables = [];
const legendButtons = new Map();

ORDER.forEach((id, i) => {
  const part = movement.parts.get(id);
  if (!part) return;
  pickables.push(...part.meshes);

  const btn = document.createElement('button');
  btn.className = 'legend-item';
  btn.innerHTML = `<span class="dot"></span><span class="num">${String(i + 1).padStart(
    2,
    '0'
  )}</span><span>${part.name}</span>`;
  btn.addEventListener('click', () => select(id));
  legendEl.appendChild(btn);
  legendButtons.set(id, btn);
});

let selected = null;

function showPanel() {
  panelEl.classList.remove('hidden');
  appEl.classList.add('panel-open');
}
function hidePanel() {
  panelEl.classList.add('hidden');
  appEl.classList.remove('panel-open');
}

function clearSelection() {
  if (!selected) return;
  const part = movement.parts.get(selected);
  part.meshes.forEach((m) => {
    m.material.emissive.copy(m.userData.baseEmissive);
    m.material.emissiveIntensity = 1;
  });
  legendButtons.get(selected)?.classList.remove('active');
  selected = null;
}

function select(id) {
  const part = movement.parts.get(id);
  if (!part) return;
  if (selected === id) {
    clearSelection();
    hidePanel();
    return;
  }
  clearSelection();
  selected = id;
  part.meshes.forEach((m) => {
    m.material.emissive.setHex(0xff8a1e);
    m.material.emissiveIntensity = 0.5;
  });
  legendButtons.get(id)?.classList.add('active');

  const idx = ORDER.indexOf(id);
  panelIndexEl.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(ORDER.length).padStart(2, '0');
  panelNameEl.textContent = part.name;
  panelEnEl.textContent = part.en;
  panelSpecEl.textContent = part.spec || '';
  panelDescEl.textContent = part.desc;
  showPanel();
  hintEl.classList.add('gone');
}

document.getElementById('panel-close').addEventListener('click', () => {
  hidePanel();
  clearSelection();
});

// speed
function syncSpeed() {
  speedValEl.textContent = '×' + Number(speedEl.value).toFixed(1);
}
speedEl.addEventListener('input', syncSpeed);
syncSpeed();

// specs from the actual gear data
const specsEl = document.getElementById('specs');
if (specsEl) {
  const ratio = Math.round(movement.info.overallRatio);
  specsEl.innerHTML = `
    <span>摆轮 <b>${movement.info.balanceHz} Hz</b></span>
    <span>擒纵轮 <b>${movement.info.teeth.eWhl} 齿</b></span>
    <span>总传动比 <b>1 : ${ratio}</b></span>`;
}

// hide hint after a while
setTimeout(() => hintEl.classList.add('gone'), 9000);

// ---- picking --------------------------------------------------------------
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let downX = 0;
let downY = 0;
let downT = 0;

canvas.addEventListener('pointerdown', (e) => {
  downX = e.clientX;
  downY = e.clientY;
  downT = performance.now();
});

canvas.addEventListener('pointerup', (e) => {
  const moved = Math.hypot(e.clientX - downX, e.clientY - downY);
  if (moved > 7 || performance.now() - downT > 700) return;

  const rect = canvas.getBoundingClientRect();
  pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(pickables, false);
  if (hits.length) {
    select(hits[0].object.userData.partId);
  } else {
    hidePanel();
    clearSelection();
  }
});

// ---- resize ---------------------------------------------------------------
let wasPortrait = null;
function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const isPortrait = h > w;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h);
  fitCamera(wasPortrait !== null && wasPortrait !== isPortrait);
  wasPortrait = isPortrait;
}
window.addEventListener('resize', resize);
fitCamera(true);
wasPortrait = window.innerHeight > window.innerWidth;
window.addEventListener('orientationchange', () => setTimeout(resize, 200));

window.__watch = { THREE, scene, camera, controls, movement, select, renderer, fitCamera };

// ---- loop -----------------------------------------------------------------
const clock = new THREE.Clock();
let firstFrame = true;

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  const speed = Number(speedEl.value);

  movement.update(t, speed);

  if (selected) {
    const a = movement.parts.get(selected);
    const pulse = 0.38 + 0.22 * (0.5 + 0.5 * Math.sin(t * 4));
    a.meshes.forEach((m) => (m.material.emissiveIntensity = pulse));
  }

  controls.update();
  renderer.render(scene, camera);

  if (firstFrame) {
    firstFrame = false;
    const loading = document.getElementById('loading');
    loading.classList.add('hidden');
    setTimeout(() => loading.remove(), 800);
  }
}
animate();
