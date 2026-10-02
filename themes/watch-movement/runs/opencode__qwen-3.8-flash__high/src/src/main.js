import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { buildMovement, PART_INFO } from './movement.js';

const canvas = document.getElementById('c');
const app = document.getElementById('app');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0b0d11, 0.0013);

const camera = new THREE.PerspectiveCamera(32, 1, 1, 3000);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const key = new THREE.DirectionalLight(0xffffff, 1.35);
key.position.set(90, 160, 70);
scene.add(key);
const warm = new THREE.PointLight(0xffd9a6, 420, 900, 1.8);
warm.position.set(-70, 90, -60);
scene.add(warm);

const ground = new THREE.Mesh(
  new THREE.CircleGeometry(900, 48),
  new THREE.MeshStandardMaterial({ color: 0x0e1013, metalness: 0.15, roughness: 0.92 }),
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -7;
scene.add(ground);

const mv = buildMovement();
scene.add(mv.root);
mv.root.updateMatrixWorld(true);
scene.updateMatrixWorld(true);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.minDistance = 60;
controls.maxDistance = 900;
controls.autoRotate = !reduceMotion;
controls.autoRotateSpeed = 0.45;

const L = mv.layout;
const CENTER = new THREE.Vector3(L.PLATE.x, 9, -L.PLATE.y);
{
  const bbox = new THREE.Box3().setFromObject(mv.root);
  const R = bbox.getBoundingSphere(new THREE.Sphere()).radius;
  function fitCamera() {
    const a = camera.aspect;
    const vR = R / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const hf = 2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * Math.min(1, a));
    const hR = R / Math.tan(hf / 2);
    return Math.max(vR, hR) * (a < 1 ? 1.02 : 0.78);
  }
  mv.fitCamera = fitCamera;
  mv.radius = R;
}
controls.target.copy(CENTER);

const az = THREE.MathUtils.degToRad(38);
const el = THREE.MathUtils.degToRad(30);
function homePosition() {
  const d = mv.fitCamera();
  return CENTER.clone().add(new THREE.Vector3(Math.cos(el) * Math.sin(az), Math.sin(el), Math.cos(el) * Math.cos(az)).multiplyScalar(d));
}
camera.position.copy(homePosition());

// ---------- 尺寸自适应 ----------
function resize() {
  const w = app.clientWidth;
  const h = app.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
resize();
controls.minDistance = mv.radius * 0.55;

// ---------- 标签层 ----------
const labelsEl = document.getElementById('labels');
const LABEL_IDS = ['barrel', 'mainspring', 'centerWheel', 'thirdWheel', 'fourthWheel', 'escapeWheel', 'palletFork', 'balance', 'hairspring'];
const labelNodes = {};
for (const id of LABEL_IDS) {
  const d = document.createElement('div');
  d.className = 'tag3d';
  d.textContent = PART_INFO[id].name;
  d.addEventListener('pointerdown', (e) => e.stopPropagation());
  d.addEventListener('click', () => selectPart(id));
  labelsEl.appendChild(d);
  labelNodes[id] = d;
}
let labelsOn = innerWidth >= 760;

// ---------- 拾取 ----------
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const tip = document.getElementById('tip');
let hovered = null;

const meshesById = new Map();
for (const { id, object } of mv.pick) {
  if (!meshesById.has(id)) meshesById.set(id, []);
  meshesById.get(id).push(object);
}

let selected = null;
function clearHighlight() {
  if (!selected) return;
  for (const m of meshesById.get(selected) ?? []) {
    if (m.userData.baseMat) {
      m.material.dispose();
      m.material = m.userData.baseMat;
      m.userData.baseMat = null;
    }
  }
}

function highlight(id) {
  for (const m of meshesById.get(id) ?? []) {
    if (!m.userData.baseMat) {
      m.userData.baseMat = m.material;
      const mm = m.material.clone();
      mm.emissive = new THREE.Color(0x2f6ea8);
      mm.emissiveIntensity = 0.55;
      m.material = mm;
    }
  }
}

const panel = document.getElementById('panel');
const panelName = document.getElementById('p-name');
const panelEn = document.getElementById('p-en');
const panelDesc = document.getElementById('p-desc');
const panelSpec = document.getElementById('p-spec');

function selectPart(id) {
  if (selected === id) return;
  clearHighlight();
  selected = id;
  highlight(id);
  const info = PART_INFO[id];
  panelName.textContent = info.name;
  panelEn.textContent = info.en;
  panelDesc.textContent = info.desc;
  panelSpec.innerHTML = '';
  for (const [k, v] of info.spec) {
    const row = document.createElement('div');
    row.className = 'spec-row';
    const ks = document.createElement('span');
    ks.textContent = k;
    const vs = document.createElement('span');
    vs.textContent = v;
    row.append(ks, vs);
    panelSpec.appendChild(row);
  }
  panel.classList.add('show');
  document.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c.dataset.id === id));
  flyTarget(id);
}

function deselect() {
  clearHighlight();
  selected = null;
  panel.classList.remove('show');
  document.querySelectorAll('.chip').forEach((c) => c.classList.remove('on'));
}

// 选中时把观察目标移到该零件
let fly = null;
function flyTarget(id) {
  const anchor = mv.anchors[id];
  if (!anchor) return;
  const world = anchor.clone();
  mv.root.updateMatrixWorld();
  mv.root.localToWorld(world);
  fly = { from: controls.target.clone(), to: world, t: 0 };
}

function pickAt(cx, cy) {
  pointer.x = (cx / innerWidth) * 2 - 1;
  pointer.y = -(cy / innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(mv.pick.map((p) => p.object), false);
  return hits.length ? hits[0].object.userData.partId : null;
}

let downPos = null;
canvas.addEventListener('pointerdown', (e) => {
  downPos = [e.clientX, e.clientY];
  controls.autoRotate = false;
  hideHint();
});
canvas.addEventListener('pointerup', (e) => {
  if (!downPos) return;
  const dx = e.clientX - downPos[0];
  const dy = e.clientY - downPos[1];
  downPos = null;
  if (Math.hypot(dx, dy) > 7) return;
  const id = pickAt(e.clientX, e.clientY);
  if (id) selectPart(id);
  else deselect();
});
canvas.addEventListener('pointermove', (e) => {
  if (e.pointerType !== 'mouse') return;
  const id = pickAt(e.clientX, e.clientY);
  if (id !== hovered) {
    hovered = id;
    canvas.style.cursor = id ? 'pointer' : 'grab';
    if (id) {
      tip.textContent = PART_INFO[id].name;
      tip.style.display = 'block';
    } else {
      tip.style.display = 'none';
    }
  }
  if (hovered) {
    tip.style.left = `${e.clientX + 14}px`;
    tip.style.top = `${e.clientY - 10}px`;
  }
});

// ---------- 控件 ----------
const chipsEl = document.getElementById('chips');
for (const id of LABEL_IDS) {
  const b = document.createElement('button');
  b.className = 'chip';
  b.dataset.id = id;
  b.textContent = PART_INFO[id].name;
  b.addEventListener('click', () => {
    selectPart(id);
    hideHint();
  });
  chipsEl.appendChild(b);
}

const speedBtns = [...document.querySelectorAll('.speed')];
let speed = 0.5;
let running = true;
for (const b of speedBtns) {
  b.addEventListener('click', () => {
    speed = parseFloat(b.dataset.speed);
    for (const o of speedBtns) o.classList.toggle('on', o === b);
  });
}
const pauseBtn = document.getElementById('pause');
pauseBtn.addEventListener('click', () => {
  running = !running;
  pauseBtn.textContent = running ? '暂停' : '继续';
});
const labelBtn = document.getElementById('labelsToggle');
labelBtn.classList.toggle('on', labelsOn);
labelBtn.addEventListener('click', () => {
  labelsOn = !labelsOn;
  labelBtn.classList.toggle('on', labelsOn);
});
document.getElementById('reset').addEventListener('click', () => {
  deselect();
  fly = null;
  controls.target.copy(CENTER);
  camera.position.copy(homePosition());
  controls.autoRotate = false;
});
document.getElementById('p-close').addEventListener('click', deselect);

const hint = document.getElementById('hint');
let hintTimer = setTimeout(() => hint.classList.add('fade'), 9000);
function hideHint() {
  clearTimeout(hintTimer);
  hint.classList.add('fade');
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') deselect();
});

const qs = new URLSearchParams(location.search);
const camParam = qs.get('cam');
if (camParam) {
  const [x, y, z, tx, ty, tz] = camParam.split(',').map(Number);
  camera.position.set(x, y, z);
  controls.target.set(tx, ty, tz);
  controls.autoRotate = false;
  labelsOn = false;
  document.querySelectorAll('#brand,#toolbar,#chips,#hint,#panel').forEach((el) => (el.style.display = 'none'));
}
const partParam = qs.get('part');
if (partParam && PART_INFO[partParam]) setTimeout(() => selectPart(partParam), 250);
const stillMode = qs.has('still');

// ---------- 渲染循环 ----------
const clock = new THREE.Clock();
const tmp = new THREE.Vector3();

const LABEL_PRIO = { balance: 0, palletFork: 1, escapeWheel: 2, barrel: 3, hairspring: 4, centerWheel: 5, fourthWheel: 6, thirdWheel: 7, mainspring: 8 };

function renderLabels() {
  const placed = [];
  const items = [];
  for (const id of LABEL_IDS) {
    const node = labelNodes[id];
    tmp.copy(mv.anchors[id]);
    mv.root.updateMatrixWorld();
    mv.root.localToWorld(tmp);
    const dist = tmp.distanceTo(camera.position);
    tmp.project(camera);
    if (tmp.z > 1) {
      node.style.display = 'none';
      continue;
    }
    const x = (tmp.x * 0.5 + 0.5) * app.clientWidth;
    const y = (-tmp.y * 0.5 + 0.5) * app.clientHeight;
    node.style.transform = `translate(-50%,-130%) translate(${x}px,${y}px)`;
    node.classList.toggle('sel', id === selected);
    items.push({ id, node, x, y, dist });
  }
  items.sort((a, b) => (LABEL_PRIO[a.id] - LABEL_PRIO[b.id]) || (a.dist - b.dist));
  for (const it of items) {
    if (!labelsOn) {
      it.node.style.display = 'none';
      continue;
    }
    it.node.style.visibility = 'hidden';
    it.node.style.display = 'block';
    const w = it.node.offsetWidth;
    const h = it.node.offsetHeight;
    const box = { x0: it.x - w / 2 - 6, x1: it.x + w / 2 + 6, y0: it.y - h - 10, y1: it.y + 4 };
    const clash = placed.some((p) => !(box.x1 < p.x0 || box.x0 > p.x1 || box.y1 < p.y0 || box.y0 > p.y1));
    if (clash) {
      it.node.style.display = 'none';
    } else {
      placed.push(box);
      it.node.style.visibility = 'visible';
    }
  }
}

function animate() {
  const dt = Math.min(clock.getDelta(), 0.05);
  if (running) mv.update(dt, 2, speed);

  if (fly) {
    fly.t = Math.min(1, fly.t + dt * 2.2);
    const k = fly.t * fly.t * (3 - 2 * fly.t);
    controls.target.lerpVectors(fly.from, fly.to, k);
    if (fly.t >= 1) fly = null;
  }

  controls.update();
  renderer.render(scene, camera);
  renderLabels();

  if (selected) {
    const pulse = 0.4 + 0.25 * (1 + Math.sin(performance.now() * 0.005));
    for (const m of meshesById.get(selected) ?? []) {
      if (m.userData.baseMat) m.material.emissiveIntensity = pulse;
    }
  }

  requestAnimationFrame(animate);
}
mv.update(0.001, 2, speed);

if (stillMode) {
  running = false;
  controls.autoRotate = false;
  mv.setState(parseFloat(qs.get('beats') || '0'));
}
requestAnimationFrame(animate);
