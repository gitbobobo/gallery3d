import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createSim } from './pond.js';
import { inPond } from './pond.js';
import { U, applyLook, createLights } from './env.js';
import { createWorld } from './world.js';
import { createActors } from './actors.js';
import { createWater } from './water.js';

const app = document.querySelector('#app');
const stage = document.querySelector('#stage');
const toolButtons = [...document.querySelectorAll('[data-tool]')];
const timeButtons = [...document.querySelectorAll('[data-time]')];
const windInput = document.querySelector('#wind');
const windName = document.querySelector('#wind-name');
const rainButton = document.querySelector('#rain');

const canvas = document.createElement('canvas');
stage.appendChild(canvas);
const gl = canvas.getContext('webgl2', {
  antialias: true,
  alpha: false,
  powerPreference: 'high-performance',
});
if (!gl) {
  stage.textContent = '需要 WebGL 2 才能显示这片池塘。';
  throw new Error('WebGL2 unavailable');
}

const renderer = new THREE.WebGLRenderer({ canvas, context: gl, antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.02;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;
renderer.setClearColor(0x102028, 1);
renderer.localClippingEnabled = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, 1, 0.08, 180);
camera.position.set(1.35, 1.65, 6.55);

const controls = new OrbitControls(camera, canvas);
controls.target.set(-0.7, -0.08, 0.15);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enablePan = false;
controls.minDistance = 1.7;
controls.maxDistance = 12.5;
controls.minPolarAngle = 0.28;
controls.maxPolarAngle = 1.48;
controls.touches.ONE = THREE.TOUCH.ROTATE;
controls.touches.TWO = THREE.TOUCH.DOLLY_PAN;
controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;
controls.mouseButtons.MIDDLE = THREE.MOUSE.DOLLY;
controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE;
controls.update();

const sim = createSim();
const lights = createLights(scene);
const water = createWater(scene);
renderer.clippingPlanes = [water.worldClip];
const world = createWorld(scene, sim);
const actors = createActors(scene, sim, world, () => water.upload(sim));
water.mask.refraction.push(world.sky, actors.rain, actors.flies);
water.mask.reflection.push(actors.rain);

let tool = 'ripple';
let wind = 0.22;
let rainTarget = 0;
let rain = 0;
let timeTarget = 0;
let timeOfDay = 0;
const keys = new Set();

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const solidHit = new Set(['dock', 'tree', 'rock']);

function windLabel(v) {
  if (v < 0.08) return '无风';
  if (v < 0.34) return '微风';
  if (v < 0.62) return '清风';
  if (v < 0.85) return '强风';
  return '劲风';
}

function setTool(next) {
  tool = next;
  for (const button of toolButtons) {
    const on = button.dataset.tool === next;
    button.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
}

function setTime(next) {
  timeTarget = next;
  for (const button of timeButtons) {
    const on = Number(button.dataset.time) === next;
    button.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
}

function resize() {
  const w = stage.clientWidth || window.innerWidth;
  const h = stage.clientHeight || window.innerHeight;
  const aspect = w / Math.max(1, h);
  const dprCap = w < 700 ? 1.45 : 1.7;
  const pr = Math.min(window.devicePixelRatio || 1, dprCap);
  renderer.setPixelRatio(pr);
  renderer.setSize(w, h, false);
  camera.aspect = aspect;
  camera.fov = aspect < 0.82 ? 52 : 42;
  camera.updateProjectionMatrix();
  U.uNear.value = camera.near;
  U.uFar.value = camera.far;
  const buf = renderer.getDrawingBufferSize(new THREE.Vector2());
  water.setSize(buf.x, buf.y);
}

function limitPolar() {
  const dist = Math.max(0.001, controls.getDistance());
  const minOffset = 0.12 - controls.target.y;
  const maxPhi = Math.acos(THREE.MathUtils.clamp(minOffset / dist, -1, 1));
  controls.maxPolarAngle = Math.min(1.52, maxPhi);
}

function pick(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(scene.children, true);
  for (const hit of hits) {
    const kind = hit.object.userData.kind;
    if (!kind || kind === 'sky' || kind === 'pebble') continue;
    if (solidHit.has(kind)) return;
    const { x, z } = hit.point;
    if (!inPond(x, z, -0.03)) return;
    if (tool === 'stone') actors.throwStone(x, z, camera.position);
    else if (tool === 'boat') actors.placeBoat(x, z);
    else if (tool === 'food') actors.placeFood(x, z);
    else actors.ripple(x, z);
    return;
  }
}

const pointers = new Map();
canvas.addEventListener('pointerdown', (event) => {
  pointers.set(event.pointerId, {
    x: event.clientX,
    y: event.clientY,
    t: performance.now(),
    n: pointers.size + 1,
  });
  canvas.classList.add('is-dragging');
});
canvas.addEventListener('pointerup', (event) => {
  const rec = pointers.get(event.pointerId);
  pointers.delete(event.pointerId);
  if (pointers.size === 0) canvas.classList.remove('is-dragging');
  if (!rec || rec.n > 1 || pointers.size > 0) return;
  const dist = Math.hypot(event.clientX - rec.x, event.clientY - rec.y);
  if (dist > 8 || performance.now() - rec.t > 480) return;
  pick(event.clientX, event.clientY);
});
canvas.addEventListener('pointercancel', (event) => {
  pointers.delete(event.pointerId);
});
canvas.addEventListener('contextmenu', (event) => event.preventDefault());

for (const button of toolButtons) {
  button.addEventListener('click', () => setTool(button.dataset.tool));
}
for (const button of timeButtons) {
  button.addEventListener('click', () => setTime(Number(button.dataset.time)));
}
windInput.addEventListener('input', () => {
  wind = Number(windInput.value) / 100;
  windName.textContent = windLabel(wind);
});
rainButton.addEventListener('click', () => {
  rainTarget = rainTarget > 0.5 ? 0 : 1;
  rainButton.setAttribute('aria-pressed', rainTarget > 0.5 ? 'true' : 'false');
});

window.addEventListener('keydown', (event) => {
  if (event.target instanceof HTMLInputElement) return;
  keys.add(event.key);
  if (event.key === '1') setTool('ripple');
  if (event.key === '2') setTool('stone');
  if (event.key === '3') setTool('boat');
  if (event.key === '4') setTool('food');
  if (event.key === '5') setTime(0);
  if (event.key === '6') setTime(1);
  if (event.key === '7') setTime(2);
  if (event.key === 'r' || event.key === 'R') rainButton.click();
  if (event.key === '[') windInput.value = String(Math.max(0, Number(windInput.value) - 5));
  if (event.key === ']') windInput.value = String(Math.min(100, Number(windInput.value) + 5));
  if (event.key === '[' || event.key === ']') windInput.dispatchEvent(new Event('input'));
});
window.addEventListener('keyup', (event) => keys.delete(event.key));

function nudgeCamera(dt) {
  const offset = camera.position.clone().sub(controls.target);
  const sph = new THREE.Spherical().setFromVector3(offset);
  let changed = false;
  if (keys.has('ArrowLeft')) {
    sph.theta += dt * 0.7;
    changed = true;
  }
  if (keys.has('ArrowRight')) {
    sph.theta -= dt * 0.7;
    changed = true;
  }
  if (keys.has('ArrowUp')) {
    sph.phi -= dt * 0.45;
    changed = true;
  }
  if (keys.has('ArrowDown')) {
    sph.phi += dt * 0.45;
    changed = true;
  }
  if (keys.has('-') || keys.has('_')) {
    sph.radius *= 1 + dt * 0.7;
    changed = true;
  }
  if (keys.has('=') || keys.has('+')) {
    sph.radius *= 1 - dt * 0.55;
    changed = true;
  }
  if (!changed) return;
  sph.phi = THREE.MathUtils.clamp(sph.phi, controls.minPolarAngle, controls.maxPolarAngle);
  sph.radius = THREE.MathUtils.clamp(sph.radius, controls.minDistance, controls.maxDistance);
  offset.setFromSpherical(sph);
  camera.position.copy(controls.target).add(offset);
}

const clock = new THREE.Clock();
resize();
applyLook(0, 0, lights);
water.upload(sim);
new ResizeObserver(resize).observe(stage);

renderer.setAnimationLoop(() => {
  const dt = Math.min(0.05, clock.getDelta());
  U.uTime.value += dt;
  timeOfDay = THREE.MathUtils.damp(timeOfDay, timeTarget, 2.2, dt);
  rain = THREE.MathUtils.damp(rain, rainTarget, 2.5, dt);
  U.uWind.value = wind;
  U.uRain.value = rain;
  applyLook(timeOfDay, rain, lights);
  nudgeCamera(dt);
  limitPolar();
  controls.update();
  world.sky.position.copy(camera.position);
  actors.update(dt);
  renderer.shadowMap.needsUpdate = true;
  water.worldClip.constant = 10000;
  water.renderReflection(renderer, camera);
  water.renderRefraction(renderer, camera);
  renderer.setClearColor(0x102028, 1);
  renderer.render(scene, camera);
});

void app;
