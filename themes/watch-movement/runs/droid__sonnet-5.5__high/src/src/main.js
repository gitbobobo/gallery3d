import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { buildMovement } from './movement.js';
import { Escapement, BALANCE_HZ } from './escapement.js';
import { ESCAPE_RATE } from './layout.js';
import { PARTS } from './parts.js';

const stage = document.getElementById('stage');
const $ = (id) => document.getElementById(id);

// ---------------------------------------------------------------- renderer / scene
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.8;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
stage.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.6;

const key = new THREE.DirectionalLight(0xfff1dc, 2.0);
key.position.set(26, 60, 22);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
const sc = key.shadow.camera;
sc.left = -27;
sc.right = 27;
sc.top = 27;
sc.bottom = -27;
sc.near = 10;
sc.far = 140;
key.shadow.bias = -0.0004;
key.shadow.normalBias = 0.04;
key.shadow.radius = 3;
scene.add(key);
const rim = new THREE.DirectionalLight(0x8fb4ff, 0.7);
rim.position.set(-40, 25, -30);
scene.add(rim);

const movement = buildMovement();
scene.add(movement.root);

const camera = new THREE.PerspectiveCamera(36, 1, 1, 600);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 10;
controls.maxDistance = 240;
controls.maxPolarAngle = Math.PI * 0.495;
controls.rotateSpeed = 0.7;
controls.zoomSpeed = 0.9;
controls.screenSpacePanning = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.target.set(0, 3, 0);

let fitDist = 80;
function resize() {
  const w = stage.clientWidth || window.innerWidth;
  const h = stage.clientHeight || window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  const vHalf = THREE.MathUtils.degToRad(camera.fov / 2);
  const hHalf = Math.atan(Math.tan(vHalf) * camera.aspect);
  const half = Math.min(vHalf, hHalf);
  const R = h > w ? 23 : 22.5;
  const nd = R / Math.sin(half);
  // keep the user's zoom ratio when the frame changes size
  const ratio = camera.userData.fit ? camera.position.distanceTo(controls.target) / camera.userData.fit : 1;
  fitDist = nd;
  camera.userData.fit = nd;
  if (!camera.userData.placed) {
    const polar = 0.62;
    const az = -0.62;
    camera.position.set(
      controls.target.x + nd * Math.sin(polar) * Math.sin(az),
      controls.target.y + nd * Math.cos(polar),
      controls.target.z + nd * Math.sin(polar) * Math.cos(az)
    );
    camera.userData.placed = true;
  } else {
    const dir = camera.position.clone().sub(controls.target).normalize();
    camera.position.copy(controls.target).addScaledVector(dir, nd * ratio);
  }
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(stage);
window.addEventListener('resize', resize);
resize();

// ---------------------------------------------------------------- simulation
const esc = new Escapement();
const SPEEDS = [
  { id: 's16', label: '1/16×', slow: 1 / 16, lapse: 1, note: '慢放：看清每一次“入瓦—脱离—锁定”' },
  { id: 's4', label: '1/4×', slow: 0.25, lapse: 1, note: '慢放：摆轮每 1 秒一个来回' },
  { id: 's1', label: '实速', slow: 1, lapse: 1, note: '真实速度：摆轮每秒 4 个来回，每秒 8 次“滴答”' },
  { id: 'x40', label: '40×', slow: 1, lapse: 40, note: '加速观察轮系：擒纵叉与摆轮仍按实速摆动，齿轮按真实传动比加快' },
  { id: 'x500', label: '500×', slow: 1, lapse: 500, note: '高倍速：能看到中心轮、发条盒也在转；擒纵叉与摆轮仍按实速摆动' },
];
let speed = SPEEDS[1];
let paused = false;
let extra = 0; // smooth extra rotation (rad of escape wheel) used by the time-lapse presets
const state = { p: 0, beta: esc.beta, fork: esc.fork };

const speedBar = $('speedBar');
{
  const lab = document.createElement('span');
  lab.className = 'lab';
  lab.textContent = '时间流速';
  speedBar.appendChild(lab);
  for (const s of SPEEDS) {
    const b = document.createElement('button');
    b.textContent = s.label;
    b.dataset.id = s.id;
    b.addEventListener('click', () => setSpeed(s));
    speedBar.appendChild(b);
  }
}
function setSpeed(s) {
  speed = s;
  for (const b of speedBar.querySelectorAll('button')) b.classList.toggle('on', b.dataset.id === s.id);
  $('note').textContent = s.note;
}
setSpeed(speed);

const SUB = 1 / 960;
function advance(dt) {
  const simDt = dt * speed.slow;
  const n = Math.max(1, Math.ceil(simDt / SUB));
  for (let i = 0; i < n; i++) esc.step(simDt / n);
  if (speed.lapse > 1) extra += (speed.lapse - 1) * ESCAPE_RATE * dt;
  state.p = esc.p + extra;
  state.beta = esc.beta;
  state.fork = esc.fork;
}
movement.update(state);

// ---------------------------------------------------------------- UI: toggles
let bridgesOn = true;
$('btnBridges').addEventListener('click', () => {
  bridgesOn = !bridgesOn;
  movement.setBridgesVisible(bridgesOn);
  $('btnBridges').textContent = bridgesOn ? '隐藏夹板' : '显示夹板';
  $('btnBridges').classList.toggle('on', !bridgesOn);
});
let explodeTarget = 0;
let explodeNow = 0;
$('explode').addEventListener('input', (e) => (explodeTarget = e.target.value / 100));
$('btnPause').addEventListener('click', togglePause);
function togglePause() {
  paused = !paused;
  $('btnPause').textContent = paused ? '继续' : '暂停';
  $('btnPause').classList.toggle('on', paused);
}
window.addEventListener('keydown', (e) => {
  if (e.target && e.target.tagName === 'INPUT') return;
  if (e.code === 'Space') {
    e.preventDefault();
    togglePause();
  } else if (e.key === 'b' || e.key === 'B') $('btnBridges').click();
  else if (e.key === 'Escape') deselect();
  else if (e.key >= '1' && e.key <= String(SPEEDS.length)) setSpeed(SPEEDS[Number(e.key) - 1]);
});

// ---------------------------------------------------------------- picking
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
let selected = null; // {id, groups, anchorObj, anchorLocal}
const restore = [];

function partOf(obj) {
  for (let o = obj; o; o = o.parent) if (o.userData && o.userData.partId) return o;
  return null;
}

function setHighlight(groups, on) {
  if (on) {
    for (const g of groups) {
      g.traverse((m) => {
        if (!m.isMesh) return;
        const orig = m.material;
        const tint = (mt) => {
          const c = mt.clone();
          c.emissive = new THREE.Color(0xffa63a);
          c.emissiveIntensity = 0.38;
          return c;
        };
        m.userData._orig = orig;
        m.material = Array.isArray(orig) ? orig.map(tint) : tint(orig);
        restore.push(m);
      });
    }
  } else {
    for (const m of restore) {
      const cur = m.material;
      m.material = m.userData._orig;
      (Array.isArray(cur) ? cur : [cur]).forEach((x) => x.dispose());
    }
    restore.length = 0;
  }
}

function select(hit) {
  const g = partOf(hit.object);
  if (!g) return deselect();
  const id = g.userData.partId;
  const info = PARTS[id];
  if (!info) return deselect();
  setHighlight([], false);
  const groups = movement.parts[id] || [g];
  setHighlight(groups, true);
  selected = { id, info, anchorObj: hit.object, anchorLocal: hit.object.worldToLocal(hit.point.clone()) };
  $('iName').textContent = info.name;
  $('iEn').textContent = info.en;
  $('iRole').textContent = info.role;
  $('facts').innerHTML = info.facts.map((f) => `<span>${f}</span>`).join('');
  $('info').classList.add('show');
  $('hint').classList.add('hide');
  $('labelText').textContent = info.name;
  $('label').classList.add('show');
  updateLive();
}
function deselect() {
  setHighlight([], false);
  selected = null;
  $('info').classList.remove('show');
  $('hint').classList.remove('hide');
  $('label').classList.remove('show');
}
$('close').addEventListener('click', deselect);

let down = null;
renderer.domElement.addEventListener('pointerdown', (e) => {
  down = { x: e.clientX, y: e.clientY, t: performance.now() };
  controls.autoRotate = false;
});
renderer.domElement.addEventListener('pointerup', (e) => {
  if (!down) return;
  const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
  const dt = performance.now() - down.t;
  down = null;
  if (moved > 6 || dt > 600) return;
  const r = renderer.domElement.getBoundingClientRect();
  ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  const hits = raycaster.intersectObject(movement.root, true).filter((h) => {
    for (let o = h.object; o; o = o.parent) if (!o.visible) return false;
    return !!partOf(h.object);
  });
  if (hits.length) select(hits[0]);
  else deselect();
});
renderer.domElement.addEventListener('wheel', () => (controls.autoRotate = false), { passive: true });

// live readout inside the info card
const REAL_RPM = { barrel: 1 / 480, center: 1 / 60, third: 8 / 60, fourth: 1, escape: 16 };
const fmtRate = (rpm) => {
  if (rpm >= 1) return `${rpm.toFixed(rpm >= 10 ? 1 : 2)} 圈/分`;
  if (rpm * 60 >= 1) return `${(rpm * 60).toFixed(2)} 圈/小时`;
  return `${(rpm * 60 * 24).toFixed(2)} 圈/天`;
};
function updateLive() {
  if (!selected) return;
  const id = selected.id;
  const f = speed.slow * speed.lapse;
  let t = '';
  if (REAL_RPM[id] !== undefined) {
    t = `画面中的转速：${paused ? '暂停' : fmtRate(REAL_RPM[id] * f)}（实际 ${fmtRate(REAL_RPM[id])}）`;
  } else if (['fork', 'pallets'].includes(id)) {
    t = `画面中的摆动：${paused ? '暂停' : (BALANCE_HZ * 2 * speed.slow).toFixed(2) + ' 次/秒'}（实际 8 次/秒）`;
  } else if (['balance', 'balanceAssembly', 'hairspring', 'roller'].includes(id)) {
    t = `画面中的摆动：${paused ? '暂停' : (BALANCE_HZ * speed.slow).toFixed(2) + ' 个来回/秒'}（实际 4 个来回/秒）`;
  }
  $('live').textContent = t;
}

// ---------------------------------------------------------------- loop
const clock = new THREE.Clock();
const tmp = new THREE.Vector3();
let liveTimer = 0;
function frame() {
  const dt = Math.min(clock.getDelta(), 0.05);
  if (!paused) {
    advance(dt);
    movement.update(state);
  }
  explodeNow += (explodeTarget - explodeNow) * Math.min(1, dt * 6);
  if (Math.abs(explodeTarget - explodeNow) > 0.0005 || explodeNow !== lastExplode) {
    movement.setExplode(explodeNow);
    lastExplode = explodeNow;
  }
  controls.update();
  renderer.render(scene, camera);

  if (selected) {
    selected.anchorObj.updateWorldMatrix(true, false);
    tmp.copy(selected.anchorLocal);
    selected.anchorObj.localToWorld(tmp);
    tmp.project(camera);
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    const lab = $('label');
    lab.style.left = `${(tmp.x * 0.5 + 0.5) * w}px`;
    lab.style.top = `${(-tmp.y * 0.5 + 0.5) * h}px`;
    lab.style.visibility = tmp.z < 1 ? 'visible' : 'hidden';
    liveTimer += dt;
    if (liveTimer > 0.25) {
      liveTimer = 0;
      updateLive();
    }
  }
  requestAnimationFrame(frame);
}
let lastExplode = 0;
requestAnimationFrame(() => {
  $('loading').classList.add('done');
  frame();
});

// optional view presets via the query string, handy for checking details: ?top=1&bridges=0&speed=s16&zoom=0.4&cx=3&cy=-5
{
  const q = new URLSearchParams(location.search);
  if (q.get('bridges') === '0') $('btnBridges').click();
  if (q.get('speed')) setSpeed(SPEEDS.find((s) => s.id === q.get('speed')) || speed);
  if (q.get('explode')) {
    $('explode').value = q.get('explode');
    explodeTarget = explodeNow = q.get('explode') / 100;
    movement.setExplode(explodeNow);
  }
  if (q.get('top') || q.get('zoom') || q.get('cx')) {
    controls.autoRotate = false;
    const cx = Number(q.get('cx') || 0);
    const cz = -Number(q.get('cy') || 0);
    controls.target.set(cx, 3, cz);
    const dist = fitDist * Number(q.get('zoom') || 1);
    const polar = q.get('top') ? 0.001 : 0.62;
    camera.position.set(cx, 3 + dist * Math.cos(polar), cz + dist * Math.sin(polar));
    controls.update();
  }
  if (q.get('pause')) togglePause();
}
window.__movement = { movement, esc, state, camera, controls };
