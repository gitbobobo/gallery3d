import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createMovement, PART_INFO, CHIPS } from './watch.js';

const app = document.getElementById('app');

/* ---------- 渲染器 / 场景 ---------- */
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.92;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const movement = createMovement();
scene.add(movement.root);
movement.root.rotation.x = 0;

/* ---------- 环境 / 灯光 ---------- */
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const key = new THREE.DirectionalLight(0xfff2dc, 1.5);
key.position.set(-14, -10, 30);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.left = -24; key.shadow.camera.right = 24;
key.shadow.camera.top = 24; key.shadow.camera.bottom = -24;
key.shadow.camera.near = 5; key.shadow.camera.far = 80;
key.shadow.bias = -0.0006;
key.target.position.set(0, -2, 0);
scene.add(key, key.target);

const fill = new THREE.DirectionalLight(0xbfd4ff, 0.4);
fill.position.set(18, 14, 18);
scene.add(fill);

const rim = new THREE.DirectionalLight(0xffd9a0, 0.35);
rim.position.set(4, -26, -14);
scene.add(rim);

scene.add(new THREE.AmbientLight(0x332e26, 0.3));

/* ---------- 相机 / 控制 ---------- */
const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.5, 400);

/* 默认取景：按画幅比例自动调整距离，保证机芯完整可见 */
const HOME_TARGET = new THREE.Vector3(0, -3, 1.2);
const HOME_DIR = new THREE.Vector3(-13.5, -63.5, 50.5);
function homeView() {
  const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const tanH = tanV * camera.aspect;
  const dist = Math.max(24.5 / tanV, 23.5 / tanH);
  camera.position.copy(HOME_TARGET).addScaledVector(HOME_DIR.clone().normalize(), dist);
  controls.target.copy(HOME_TARGET);
  controls.update();
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 8;
controls.maxDistance = 90;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.target.set(0, -3, 1.2);
controls.update();

let userTouched = false;
renderer.domElement.addEventListener('pointerdown', () => {
  userTouched = true;
  controls.autoRotate = false;
}, { passive: true });

/* ---------- 状态 ---------- */
let speed = 1, running = true, selected = null;
const highlight = (id, on) => {
  if (!id) return;
  for (const m of movement.parts[id].mats) {
    if (!m.emissive) continue;
    m.emissive.setHex(on ? 0x8a5a12 : m.userDataBase);
    m.emissiveIntensity = on ? 0.55 : m.userDataInt;
  }
};
// 记录自发光材质的原始值
for (const id in movement.parts)
  for (const m of movement.parts[id].mats) {
    if (!m.emissive) continue;
    m.userDataBase = m.emissive.getHex();
    m.userDataInt = m.emissiveIntensity;
  }

/* ---------- 零件清单 ---------- */
const chipsEl = document.getElementById('chips');
for (const id of CHIPS) {
  const b = document.createElement('button');
  b.className = 'chip'; b.textContent = PART_INFO[id].name; b.dataset.id = id;
  b.addEventListener('click', () => select(id, true));
  chipsEl.appendChild(b);
}

/* ---------- 信息卡 ---------- */
const card = document.getElementById('card');
const cardName = document.getElementById('cardName');
const cardEn = document.getElementById('cardEn');
const cardDesc = document.getElementById('cardDesc');
const cardStats = document.getElementById('cardStats');
document.getElementById('cardClose').addEventListener('click', () => select(null));

/* ---------- 相机对焦动画 ---------- */
const fromT = new THREE.Vector3(), toT = new THREE.Vector3();
const fromC = new THREE.Vector3(), toC = new THREE.Vector3();
let animT = 1;
function flyTo(id) {
  fromT.copy(controls.target); fromC.copy(camera.position);
  if (!id) {
    toT.copy(HOME_TARGET);
    const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const dist = Math.max(24.5 / tanV, 23.5 / (tanV * camera.aspect));
    toC.copy(toT).addScaledVector(HOME_DIR.clone().normalize(), dist);
  }
  else {
    const p = movement.parts[id];
    toT.copy(p.focus);
    const d = Math.max(p.radius * 2.6, 9);
    const dir = camera.position.clone().sub(controls.target).normalize();
    if (dir.lengthSq() < 0.01) dir.set(0, -0.7, 0.7).normalize();
    dir.z = Math.max(dir.z, 0.35); dir.normalize();
    toC.copy(toT).add(dir.multiplyScalar(d));
  }
  animT = 0;
}

/* ---------- 选取 ---------- */
function select(id, fly) {
  if (selected === id) { if (!id) return; }
  if (selected) highlight(selected, false);
  selected = id;
  document.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c.dataset.id === id));
  if (!id) {
    card.classList.remove('show');
  } else {
    const info = PART_INFO[id];
    cardName.textContent = info.name;
    cardEn.textContent = info.en;
    cardDesc.textContent = info.desc;
    cardStats.innerHTML = '';
    for (const s of info.stats) {
      const el = document.createElement('span');
      el.className = 'st'; el.textContent = s;
      cardStats.appendChild(el);
    }
    card.classList.add('show');
    if (fly) flyTo(id);
  }
}

const ray = new THREE.Raycaster();
const ndc = new THREE.Vector2();
let downX = 0, downY = 0, downT = 0;
renderer.domElement.addEventListener('pointerdown', (e) => { downX = e.clientX; downY = e.clientY; downT = performance.now(); });
renderer.domElement.addEventListener('pointerup', (e) => {
  if (Math.hypot(e.clientX - downX, e.clientY - downY) > 8 || performance.now() - downT > 450) return;
  ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const hits = ray.intersectObjects(movement.root.children, true);
  let id = null;
  for (const h of hits) { if (h.object.userData.part) { id = h.object.userData.part; break; } }
  select(id, true);
});

/* 悬停指针 */
renderer.domElement.addEventListener('pointermove', (e) => {
  if (e.pointerType === 'touch') return;
  ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const hits = ray.intersectObjects(movement.root.children, true);
  let hover = null;
  for (const h of hits) { if (h.object.userData.part) { hover = h.object.userData.part; break; } }
  renderer.domElement.style.cursor = hover ? 'pointer' : 'grab';
}, { passive: true });

/* ---------- 控制面板 ---------- */
document.getElementById('btnPause').addEventListener('click', function () {
  running = !running;
  this.textContent = running ? '⏸' : '▶';
});
document.querySelectorAll('#speedSeg button').forEach((b) => {
  b.addEventListener('click', () => {
    speed = parseFloat(b.dataset.s);
    document.querySelectorAll('#speedSeg button').forEach((x) => x.classList.toggle('on', x === b));
  });
});
document.getElementById('btnBridge').addEventListener('click', function () {
  const v = this.textContent.includes('隐藏');
  movement.setBridgesVisible(!v);
  this.textContent = v ? '显示夹板' : '隐藏夹板';
});

/* ---------- 自适应 ---------- */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (!userTouched) homeView();
});
homeView();

/* ---------- 主循环 ---------- */
const clock = new THREE.Clock();
function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), 0.05);
  movement.update(dt, speed, running);
  if (animT < 1) {
    animT = Math.min(1, animT + dt * 2.2);
    const k = 1 - Math.pow(1 - animT, 3);
    controls.target.lerpVectors(fromT, toT, k);
    camera.position.lerpVectors(fromC, toC, k);
  }
  controls.update();
  renderer.render(scene, camera);
}
loop();

/* 5 秒后淡出提示 */
setTimeout(() => {
  const h = document.getElementById('hint');
  if (h) { h.style.opacity = '0'; setTimeout(() => h.remove(), 1200); }
}, 6000);
