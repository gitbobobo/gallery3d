import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { state, U } from './shared.js';
import { POND, pondDepth, floorY } from './pond.js';
import { WaveSim } from './sim.js';
import { SkySystem } from './sky.js';
import { buildTerrain, buildRocks, buildSeaweed } from './terrain.js';
import { buildDock } from './dock.js';
import { buildReeds, buildWillow, buildLilies, updateLilies } from './plants.js';
import { Floaters } from './floaters.js';
import { KoiSchool } from './koi.js';
import { Weather } from './weather.js';
import { WaterSystem } from './water.js';
import { initUI, applyUrlOverrides } from './ui.js';

const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.NoToneMapping;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 500);

const view = applyUrlOverrides();
const az = isNaN(view.az) ? 0.62 : view.az;
const el = isNaN(view.el) ? 0.44 : view.el;
const dist = isNaN(view.d) ? 11.2 : view.d;
camera.position.set(
  Math.sin(az) * Math.cos(el) * dist,
  Math.sin(el) * dist + 0.2,
  Math.cos(az) * Math.cos(el) * dist
);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.minDistance = 1.5;
controls.maxDistance = 24;
controls.maxPolarAngle = 1.545;
controls.rotateSpeed = 0.6;
controls.zoomSpeed = 0.9;

// ---- 场景 ----
window.__NOCAUST = new URLSearchParams(location.search).get('nocaust') === '1';
const floatLinear = renderer.extensions.has('OES_texture_float_linear');
const sim = new WaveSim();
sim.setLinearFilter(floatLinear);

const sky = new SkySystem(scene);
buildTerrain(scene);
buildRocks(scene);
buildSeaweed(scene);
buildDock(scene, sim);
buildReeds(scene);
const willow = buildWillow(scene);
const pads = buildLilies(scene);

const floaters = new Floaters(scene, sim);
floaters.pads = pads;
const koi = new KoiSchool(scene);
const weather = new Weather(scene);
const water = new WaterSystem(scene, renderer, camera, sim);

// ---- UI ----
initUI();

// ---- 交互：点击水面 ----
const raycaster = new THREE.Raycaster();
function pickWater(cx, cy) {
  const ndc = new THREE.Vector2((cx / innerWidth) * 2 - 1, -(cy / innerHeight) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  const o = raycaster.ray.origin, d = raycaster.ray.direction;
  if (d.y > -0.005) return null;
  const tt = -o.y / d.y;
  if (tt < 0 || tt > 120) return null;
  const x = o.x + d.x * tt, z = o.z + d.z * tt;
  if (pondDepth(x, z) < 0.05) return null;
  return { x, z };
}

let pDown = null;
let multiTouch = false;
canvas.addEventListener('pointerdown', (e) => {
  if (e.isPrimary === false) { multiTouch = true; return; }
  multiTouch = false;
  pDown = { x: e.clientX, y: e.clientY, t: performance.now() };
});
canvas.addEventListener('pointerup', (e) => {
  if (!pDown || multiTouch || e.isPrimary === false) { pDown = null; return; }
  const dx = e.clientX - pDown.x, dy = e.clientY - pDown.y;
  const dt = performance.now() - pDown.t;
  pDown = null;
  if (dx * dx + dy * dy > 64 || dt > 450) return;
  const p = pickWater(e.clientX, e.clientY);
  if (!p) return;
  if (state.tool === 'ripple') {
    sim.addDrop(p.x, p.z, 0.32, 0.075);
    floaters.ring(p.x, p.z, 0.55, 0.9);
  } else if (state.tool === 'stone') {
    floaters.throwStone(p.x, p.z, camera.position);
  } else if (state.tool === 'boat') {
    floaters.placeBoat(p.x, p.z);
  } else if (state.tool === 'food') {
    floaters.sprinkleFood(p.x, p.z);
  }
});
canvas.addEventListener('pointercancel', () => { pDown = null; });

// 锦鲤嘴部涟漪
const koiRipple = (x, z, r, amp) => {
  sim.addDrop(x, z, r, amp);
  floaters.ring(x, z, 0.16, 0.45);
};

// ---- 柳叶飘落 ----
let leafTimer = 2.2; // 页面打开后 soon 飘落第一片柳叶
function spawnLeaf() {
  const src = willow.leafSources[Math.floor(Math.random() * willow.leafSources.length)];
  if (src) floaters.spawnLeaf(src.x, src.y, src.z);
}

// ---- 主循环 ----
const clock = new THREE.Clock();
let t = 0;
let windSm = state.wind;
let ambientAcc = 0;

function frame() {
  const dt = Math.min(clock.getDelta(), 0.05);
  t += dt;

  // 状态平滑
  state.rain += (state.rainTarget - state.rain) * Math.min(1, dt * 1.1);
  windSm += (state.wind - windSm) * Math.min(1, dt * 2);
  U.uRain.value = state.rain;
  U.uWind.value = windSm;
  U.uTime.value = t;

  sky.update(dt, camera);
  U.uCausStrength.value = sky.sunAltitude * (1 - state.rain * 0.75) * 1.2;

  // 波动模拟
  sim.step(dt);
  // 微风随机扰动 → 持续的细小涟漪
  ambientAcc += dt * windSm * 26;
  while (ambientAcc >= 1) {
    ambientAcc -= 1;
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * 6.8;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (pondDepth(x, z) > 0.12) sim.addDrop(x, z, 0.06 + Math.random() * 0.1, 0.002 + windSm * 0.007);
  }
  // 雨点落水
  const hits = weather.takeRainHits();
  let n = Math.min(hits.length, 42);
  for (let i = 0; i < n; i++) {
    const h = hits[(Math.random() * hits.length) | 0];
    sim.addDrop(h.x, h.z, 0.05 + Math.random() * 0.07, 0.003 + Math.random() * 0.008);
    if (Math.random() < 0.06) floaters.ring(h.x, h.z, 0.14, 0.4);
  }

  weather.update(dt, t);
  floaters.update(dt, t, windSm, U.uWindDir.value);
  updateLilies(pads, dt, t, sim, windSm);
  koi.update(dt, t, { pellets: floaters.pellets, ripple: koiRipple });

  leafTimer -= dt;
  if (leafTimer <= 0) {
    spawnLeaf();
    leafTimer = (2.5 + Math.random() * 4) / (0.25 + windSm * 1.6);
  }

  controls.update();
  // 相机不钻进地面 / 不低于水面
  const cam = camera.position;
  const gy = floorY(cam.x, cam.z);
  const minY = Math.max(0.14, (gy > -0.05 ? gy : -0.05) + 0.28);
  if (cam.y < minY) cam.y = minY;

  water.render();
}
renderer.setAnimationLoop(frame);

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  water.onResize();
});


window.__view = (o) => {
  if (o.az !== undefined) { /* 立即生效 */ }
  const a2 = o.az ?? az, e2 = o.el ?? el, d2 = o.d ?? dist;
  camera.position.set(Math.sin(a2) * Math.cos(e2) * d2, Math.sin(e2) * d2 + 0.2, Math.cos(a2) * Math.cos(e2) * d2);
  controls.target.set(o.tx ?? 0, o.ty ?? 0.15, o.tz ?? 0);
  controls.update();
};
