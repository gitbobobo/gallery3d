import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { G, S, clamp } from './shared.js';
import { buildTerrain, buildTerrainTexture, buildPebbles, buildGrass, buildFarTrees, terrainY, pondF } from './terrain.js';
import { WaveSim } from './sim.js';
import { Water } from './water.js';
import { Env } from './env.js';
import { buildPier } from './pier.js';
import { buildWillow } from './willow.js';
import { buildReeds, buildPlants } from './reeds.js';
import { buildLilies } from './lilies.js';
import { FishSystem } from './fish.js';
import { Splash, Food, Stones, Boats, Leaves, Rain, Fireflies } from './dynamics.js';
import { buildUI } from './ui.js';

const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(52, 1, 0.08, 700);
camera.position.set(4.2, 1.1, 4.9);
const controls = new OrbitControls(camera, canvas);
controls.target.set(-0.9, -0.05, -1.0);
controls.enablePan = false;
controls.enableDamping = true; controls.dampingFactor = 0.07;
controls.minDistance = 1.0; controls.maxDistance = 17;
controls.rotateSpeed = 0.6; controls.zoomSpeed = 0.8;
controls.minPolarAngle = 0.25;
let idleSway = true;
if (innerWidth / innerHeight < 0.8) { camera.position.set(4.9, 2.5, 6.1); controls.target.set(-0.9, -0.4, -0.5); }
controls.update();
controls.addEventListener('start', () => { idleSway = false; });

const env = new Env(scene, renderer);
const sim = new WaveSim();
const terrainTex = buildTerrainTexture(512);
buildTerrain(scene);
buildPebbles(scene);
buildGrass(scene);
buildFarTrees(scene);
const pier = buildPier(scene);
const willow = buildWillow(scene);
const obstacles = [];
buildReeds(scene, sim);
buildPlants(scene);
const lilies = buildLilies(scene, sim, obstacles);
const water = new Water(scene, sim, terrainTex);

const ctx = { sim, scene, env, obstacles };
ctx.splash = new Splash(scene, ctx);
ctx.food = new Food(scene, ctx);
const fishSys = new FishSystem(scene, ctx);
ctx.fish = fishSys;
const stones = new Stones(scene, ctx);
const boats = new Boats(scene, ctx);
const leaves = new Leaves(scene, ctx, willow.tips);
const rain = new Rain(scene, ctx);
const flies = new Fireflies(scene);
for (let i = 0; i < 3; i++) leaves.spawn(true);

const coarse = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
let pr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
let prMax = pr;
let W = 1, H = 1;
function resize() {
  W = canvas.clientWidth || window.innerWidth; H = canvas.clientHeight || window.innerHeight;
  renderer.setPixelRatio(pr);
  renderer.setSize(W, H, false);
  camera.aspect = W / H;
  camera.fov = W / H < 0.8 ? 68 : 52;
  camera.updateProjectionMatrix();
  water.resize(W, H, pr);
}
window.addEventListener('resize', resize);
new ResizeObserver(resize).observe(canvas);
resize();

/* ------------------------------ UI & input ------------------------------ */
let tool = 'ripple';
let windTarget = 0.3;
const ui = buildUI(document.getElementById('ui'), {
  onTool(k) { tool = k; canvas.classList.toggle('aim', k !== 'ripple'); },
  onTime(k) { env.set(k); },
  onRain(on) { env.setRain(on); },
  onWind(v) { windTarget = v; },
});
const dock = document.getElementById('dock');
new ResizeObserver(() => document.getElementById('ui').style.setProperty('--dock-h', dock.offsetHeight + 'px')).observe(dock);

window.addEventListener('keydown', (e) => {
  const map = { 1: 'ripple', 2: 'stone', 3: 'boat', 4: 'food' };
  if (map[e.key]) ui.setTool(map[e.key]);
  else if (e.key === 'Escape') ui.setTool('ripple');
  else if (e.key === 'r' || e.key === 'R') ui.setRain(!ui.rain.classList.contains('on'));
});

const ray = new THREE.Raycaster();
const ndc = new THREE.Vector2();
const down = new Map();
let lastThrow = 0;
canvas.addEventListener('pointerdown', (e) => { down.set(e.pointerId, { x: e.clientX, y: e.clientY, t: performance.now(), multi: down.size > 0 }); if (down.size > 1) for (const d of down.values()) d.multi = true; });
canvas.addEventListener('pointercancel', (e) => down.delete(e.pointerId));
canvas.addEventListener('pointerup', (e) => {
  const d = down.get(e.pointerId); down.delete(e.pointerId);
  if (!d || d.multi) return;
  if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 8 || performance.now() - d.t > 600) return;
  const r = canvas.getBoundingClientRect();
  ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const o = ray.ray.origin, dir = ray.ray.direction;
  if (dir.y >= -0.002) return;
  const t = -o.y / dir.y;
  const hit = ray.intersectObjects(pier.blockers, false)[0];
  if (hit && hit.distance < t) return;
  const x = o.x + dir.x * t, z = o.z + dir.z * t;
  const depth = -terrainY(x, z);
  if (depth < 0.04 || Math.abs(x) > S / 2 - 0.5 || Math.abs(z) > S / 2 - 0.5) { if (tool !== 'ripple') ui.say('这里不是水面'); return; }
  interact(tool, x, z);
});

function interact(k, x, z) {
  const now = performance.now();
  if (k === 'ripple') {
    sim.impulse(x, z, -0.07, 0.15);
    ctx.splash.small(x, z, 3, 0.8);
    fishSys.scare(x, z, 1.6);
  } else if (k === 'stone') {
    if (now - lastThrow < 140) return;
    lastThrow = now;
    stones.throw(x, z, camera.position);
  } else if (k === 'boat') {
    boats.place(x, z);
  } else if (k === 'food') {
    ctx.food.spawn(x, z, 8);
    ctx.splash.small(x, z, 3, 0.6);
  }
}

/* ------------------------------- loop ------------------------------- */
const clock = new THREE.Clock();
const hooks = {
  before(pass) {
    const h = pass === 'refl' ? water.reflRT.height : renderer.domElement.height;
    flies.setScale(h, camera.fov);
  },
};
let windNow = 0.3, ambientT = 2, fpsAcc = 0, fpsN = 0, qCool = 6;
const tmpV = new THREE.Vector3();

function frame() {
  const rdt = clock.getDelta();
  const dt = Math.min(rdt, 0.1);
  G.uTime.value += dt;
  windNow += (windTarget - windNow) * (1 - Math.exp(-dt * 1.8));
  G.uWind.value = windNow;
  G.uWT.value += dt * (1.2 + windNow * 1.6);

  if (idleSway) {
    const da = 0.17 * 0.15 * Math.cos(G.uTime.value * 0.15) * dt;
    tmpV.copy(camera.position).sub(controls.target);
    const c = Math.cos(da), sn = Math.sin(da), x = tmpV.x * c - tmpV.z * sn, z = tmpV.x * sn + tmpV.z * c;
    camera.position.set(controls.target.x + x, camera.position.y, controls.target.z + z);
  }
  const dist = camera.position.distanceTo(controls.target);
  controls.maxPolarAngle = Math.min(1.62, Math.acos(clamp((0.13 - controls.target.y) / dist, -1, 1)));
  controls.update();
  const gy = terrainY(camera.position.x, camera.position.z);
  const minY = gy > 0 ? gy + 0.28 : 0.13;
  if (camera.position.y < minY) camera.position.y = minY;
  camera.updateMatrixWorld();

  env.update(dt, camera);
  sim.update(dt);

  ambientT -= dt;
  if (ambientT <= 0) {
    ambientT = 1.2 + Math.random() * 3;
    for (let k = 0; k < 8; k++) {
      const x = (Math.random() - 0.5) * 10, z = (Math.random() - 0.5) * 8;
      if (-terrainY(x, z) > 0.3) { sim.impulse(x, z, -0.0028, 0.05); break; }
    }
  }
  for (const tc of willow.touchers) if (Math.random() < dt * (0.25 + windNow * 1.6)) sim.impulse(tc.x, tc.z, -0.0022, 0.05);

  lilies.update();
  fishSys.update(dt, G.uTime.value);
  boats.update(dt, G.uTime.value);
  stones.update(dt);
  ctx.food.update(dt);
  leaves.update(dt, G.uTime.value);
  rain.update(dt, camera);
  ctx.splash.update(dt);
  flies.update(env.out.flies);
  pier.update(env, G.uTime.value);
  water.uni.uLanternPos.value.copy(pier.lanternPos);
  water.uni.uLantern.value = env.out.lantern;

  sim.renderSurface(renderer);
  water.update(dt, camera);
  renderer.shadowMap.needsUpdate = true;
  water.renderPasses(renderer, scene, camera, hooks);
  renderer.setRenderTarget(null);
  renderer.render(scene, camera);

  fpsAcc += rdt; fpsN++; qCool -= rdt;
  if (fpsN >= 45) {
    const avg = fpsAcc / fpsN; fpsAcc = 0; fpsN = 0;
    if (qCool <= 0) {
      if (avg > 1 / 26 && pr > 0.7) { pr = Math.max(0.7, pr - 0.25); resize(); qCool = 4; }
      else if (avg < 1 / 52 && pr < prMax) { pr = Math.min(prMax, pr + 0.25); resize(); qCool = 8; }
    }
  }
  if (!window.__bootMs) window.__bootMs = performance.now();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById('loading').classList.add('done')));

window.__pond = { renderer, scene, camera, controls, env, sim, water, G, ctx, stopSway() { idleSway = false; }, fishSys, boats, stones, leaves, ui, interact, setPR(v) { pr = v; prMax = v; resize(); } };
