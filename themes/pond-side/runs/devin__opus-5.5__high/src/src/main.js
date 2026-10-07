import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { G } from './shared.js';
import { heightAt, SIM_HALF } from './pond.js';
import { Environment } from './env.js';
import { WaterSim, WindWaves, Caustics, Probes, buildBedTexture } from './water/sim.js';
import { WaterSurface } from './water/water.js';
import { createTerrain } from './terrain.js';
import { createWillow } from './willow.js';
import { createReeds, createGrass, createWeeds, createPebbles, createLilies } from './flora.js';
import { createDock } from './dock.js';
import { createBackdrop } from './backdrop.js';
import { Fishes } from './fish.js';
import { Stones, Boats, Food, FallingLeaves, WAVE_SPEED } from './props.js';
import { Splashes, Rain, Fireflies } from './particles.js';
import { initUI } from './ui.js';

const canvas = document.getElementById('scene');
const coarse = matchMedia('(pointer: coarse)').matches;
const small = Math.min(innerWidth, innerHeight) < 600;
const quality = coarse || small ? 0.5 : 1;

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: quality > 0.6, powerPreference: 'high-performance' });
} catch (e) {
  document.body.classList.add('no-webgl');
  throw e;
}
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.autoUpdate = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 400);
camera.position.set(5.6, 2.5, 6.8);
const controls = new OrbitControls(camera, canvas);
controls.target.set(-1.6, 0.3, -2.0);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 1.2;
controls.maxDistance = 30;
controls.rotateSpeed = 0.6;
controls.zoomSpeed = 0.9;
controls.panSpeed = 0.6;
controls.screenSpacePanning = false;
controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
controls.update();

const env = new Environment(scene, renderer);
const bed = buildBedTexture();
const sim = new WaterSim(renderer, bed.tex);
const wind = new WindWaves(renderer, 5);
const caustics = new Caustics(renderer, wind, bed.tex, quality);
const probes = new Probes(renderer);
G.uSim.value = sim.texture;
G.uCausticTile.value = caustics.tileRT.texture;
G.uCausticPond.value = caustics.pondRT.texture;
G.uTileL.value = wind.L;

const water = new WaterSurface(renderer, wind, bed.tex);
scene.add(water.mesh);
scene.add(createTerrain(quality));
const willow = createWillow(quality);
scene.add(willow.group);
scene.add(createReeds(quality));
scene.add(createGrass(quality));
scene.add(createWeeds(quality));
const pebbles = createPebbles(quality);
scene.add(pebbles.group);
const lilies = createLilies();
scene.add(lilies.group);
scene.add(createDock());
const backdrop = createBackdrop();
scene.add(backdrop);
const treeline = backdrop.userData.treeline;

const fishes = new Fishes(quality > 0.6 ? 8 : 7, sim, quality);
scene.add(fishes.mesh);
const stones = new Stones();
scene.add(stones.mesh);
const boats = new Boats();
scene.add(boats.mesh);
const food = new Food();
scene.add(food.mesh);
const leafSources = willow.leafPositions.filter((p, i) => i % 7 === 0 && p.y > 1.2);
const leaves = new FallingLeaves(leafSources);
scene.add(leaves.mesh);
const splashes = new Splashes();
scene.add(splashes.points);
const rain = new Rain(quality > 0.6 ? 6000 : 3000);
scene.add(rain.mesh);
const fireflies = new Fireflies(quality > 0.6 ? 70 : 45);
scene.add(fireflies.points);

for (let i = 0; i < 6; i++) leaves.spawn(true);
for (let i = 0; i < 2; i++) leaves.spawn(false);
leaves.list.slice(-2).forEach((l, i) => (l.y = 1.4 + i * 0.8));

const pads = lilies.pads.map((p) => ({ x: p.x, z: p.z, r: p.r * 0.92 }));

/* ---------- state ---------- */
const state = { tool: 'ripple', wind: 0.3, windCur: 0.3, rain: false, time: 0 };
let elapsed = 0;
const impulses = [];

function scheduleImpulses(x, z, strength) {
  const floaters = [...boats.list, ...leaves.floating(), ...food.floating()];
  for (const o of floaters) {
    const dx = o.x - x, dz = o.z - z;
    const d = Math.hypot(dx, dz);
    if (d > 7 || d < 1e-3) continue;
    const m = (strength / (1 + d * 1.4)) * (o.vx !== undefined ? 1 : 0);
    impulses.push({ o, at: elapsed + d / WAVE_SPEED, ix: (dx / d) * m, iz: (dz / d) * m });
  }
}

const ctx = {
  sim,
  pads,
  rocks: pebbles.bigRocks,
  wind: 0.3,
  time: 0,
  rain: 0,
  onStoneImpact(x, z, s) {
    const e = Math.min(1.4, s / 0.06);
    sim.addDrop(x, z, 0.36 * Math.sqrt(e), -0.05 * e);
    splashes.stoneSplash(x, z, 0.8 + e * 0.3);
    setTimeout(() => {
      sim.addDrop(x, z, 0.12, 0.03 * e);
      splashes.jet(x, z, 0.9 + e * 0.2);
    }, 140);
    fishes.scare(x, z, 4.8);
    scheduleImpulses(x, z, 0.32 * e);
  },
  onBubble(x, z) {
    if (Math.random() < 0.3) sim.addDrop(x + (Math.random() - 0.5) * 0.1, z + (Math.random() - 0.5) * 0.1, 0.05, 0.0015);
  },
};

/* ---------- interaction ---------- */
const raycaster = new THREE.Raycaster();
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let down = null;
let activePointers = 0;
canvas.addEventListener('pointerdown', (e) => {
  activePointers++;
  down = activePointers === 1 ? { x: e.clientX, y: e.clientY, t: performance.now() } : null;
});
const endPointer = (e) => {
  activePointers = Math.max(0, activePointers - 1);
  if (!down) return;
  const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
  const dur = performance.now() - down.t;
  down = null;
  if (moved > 8 || dur > 600 || e.type === 'pointercancel') return;
  const rect = canvas.getBoundingClientRect();
  const ndc = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  const p = new THREE.Vector3();
  if (!raycaster.ray.intersectPlane(plane, p)) return;
  if (Math.abs(p.x) > SIM_HALF - 0.2 || Math.abs(p.z) > SIM_HALF - 0.2) return;
  if (heightAt(p.x, p.z) > -0.03) return;
  useTool(p);
};
canvas.addEventListener('pointerup', endPointer);
canvas.addEventListener('pointercancel', endPointer);

function useTool(p) {
  switch (state.tool) {
    case 'stone':
      stones.throwTo(p, camera.position);
      break;
    case 'boat':
      boats.add(p.x, p.z);
      sim.addDrop(p.x, p.z, 0.14, -0.008);
      break;
    case 'food':
      food.scatter(p.x, p.z);
      break;
    default:
      sim.addDrop(p.x, p.z, 0.22, -0.035);
      splashes.small(p.x, p.z, 5, 0.6, 0.009);
      scheduleImpulses(p.x, p.z, 0.08);
  }
}

initUI(state, {
  onTime: (i) => env.setTime(i),
  onRain: (on) => env.setRain(on),
});

/* ---------- sizing ---------- */
let pixelRatio = Math.min(devicePixelRatio || 1, quality > 0.6 ? 1.75 : 1.5);
function resize() {
  const w = canvas.clientWidth || innerWidth;
  const h = canvas.clientHeight || innerHeight;
  const maxPix = quality > 0.6 ? 3.2e6 : 1.4e6;
  const pr = Math.min(pixelRatio, Math.sqrt(maxPix / (w * h)));
  renderer.setPixelRatio(pr);
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.fov = w / h < 0.8 ? 62 : 48;
  camera.updateProjectionMatrix();
  const db = renderer.getDrawingBufferSize(new THREE.Vector2());
  water.setSize(db.x, db.y, quality);
}
addEventListener('resize', resize);
resize();

/* ---------- loop ---------- */
let lastT = performance.now();
let ambientT = 2;
let frameTimes = [];
const tmpV = new THREE.Vector3();

function clampCamera() {
  const t = controls.target;
  const r = Math.hypot(t.x, t.z);
  if (r > 12) { t.x *= 12 / r; t.z *= 12 / r; }
  t.y = 0.3;
  const dist = camera.position.distanceTo(t);
  controls.maxPolarAngle = Math.acos(THREE.MathUtils.clamp((t.y - 0.07) / dist, -1, 1));
  const gy = Math.max(heightAt(camera.position.x, camera.position.z), 0) + 0.07;
  if (camera.position.y < gy + (gy > 0.08 ? 0.25 : 0)) camera.position.y = gy + (gy > 0.08 ? 0.25 : 0);
}

function frame() {
  const now = performance.now();
  const dt = Math.min((now - lastT) / 1000, 1 / 20);
  lastT = now;
  elapsed += dt;
  G.uTime.value = elapsed;

  state.windCur += (state.wind - state.windCur) * Math.min(1, dt * 1.2);
  G.uWind.value = state.windCur;
  env.update(dt);
  G.uRain.value = env.rain;
  G.uCausticAmt.value = (1 - env.rain * 0.75) * (1 - env.night * 0.7);
  ctx.wind = state.windCur;
  ctx.time = elapsed;
  ctx.rain = env.rain;

  controls.update();
  clampCamera();

  // rain drops on the water
  if (env.rain > 0.02) {
    const n = env.rain * 90 * dt;
    let k = Math.floor(n) + (Math.random() < n % 1 ? 1 : 0);
    while (k-- > 0) {
      const x = (Math.random() * 2 - 1) * SIM_HALF, z = (Math.random() * 2 - 1) * SIM_HALF;
      if (heightAt(x, z) > -0.02) continue;
      sim.addDrop(x, z, 0.1 + Math.random() * 0.05, -0.0025 - Math.random() * 0.0025);
    }
    const m = env.rain * 260 * dt;
    let s = Math.floor(m) + (Math.random() < m % 1 ? 1 : 0);
    camera.getWorldDirection(tmpV);
    while (s-- > 0) {
      const a = Math.random() * Math.PI * 2, rr = 1 + Math.random() * 12;
      const x = camera.position.x + tmpV.x * 6 + Math.cos(a) * rr;
      const z = camera.position.z + tmpV.z * 6 + Math.sin(a) * rr;
      if (Math.abs(x) > SIM_HALF || Math.abs(z) > SIM_HALF || heightAt(x, z) > -0.02) continue;
      splashes.small(x, z, 2 + Math.floor(Math.random() * 2), 0.9, 0.007);
    }
  }
  // occasional insect touching the surface
  ambientT -= dt;
  if (ambientT <= 0) {
    ambientT = 2.5 + Math.random() * 5;
    for (let i = 0; i < 10; i++) {
      const a = Math.random() * 6.28, rr = Math.random() * 6;
      const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
      if (heightAt(x, z) < -0.2) {
        sim.addDrop(x, z, 0.06, -0.0035);
        break;
      }
    }
  }

  for (let i = impulses.length - 1; i >= 0; i--) {
    const im = impulses[i];
    if (elapsed >= im.at) {
      im.o.vx += im.ix;
      im.o.vz += im.iz;
      if (im.o.wy !== undefined) im.o.wy += (Math.random() - 0.5) * Math.hypot(im.ix, im.iz) * 8;
      impulses.splice(i, 1);
    }
  }

  wind.setWind(state.windCur);
  wind.update(elapsed);
  sim.step(dt);
  G.uSim.value = sim.texture;
  caustics.update(sim.texture, env.lightDir);
  probes.run(sim.texture, [...boats.list, ...leaves.floating(), ...food.floating()]);

  fishes.update(dt, { pellets: food.floating() });
  stones.update(dt, ctx);
  boats.update(dt, ctx);
  boats.render(ctx);
  food.update(dt, ctx);
  leaves.update(dt, ctx);
  splashes.update(dt, sim, (x, z) => Math.max(heightAt(x, z), 0));

  // lighting-dependent uniforms
  const wu = water.uniforms;
  wu.uLightDir.value.copy(env.lightDir);
  wu.uLightCol.value.copy(env.lightColor);
  wu.uSkyAmb.value.copy(env.skyAmb);
  wu.uScatter.value.copy(env.scatter).multiply(new THREE.Color(1, 1, 1).lerp(env.skyAmb, 0.0));
  wu.uHorizon.value.copy(env.horizon);
  wu.uNight.value = env.night;
  splashes.uniforms.uColor.value.copy(env.skyAmb).multiplyScalar(0.9).add(env.horizon.clone().multiplyScalar(0.4));
  splashes.uniforms.uLight.value.copy(env.lightColor).multiplyScalar(0.5);
  // twigs are unlit lines: tint them by the current light so they don't glow at night
  willow.twigMat.color.setRGB(0.26, 0.25, 0.12)
    .multiply(env.skyAmb.clone().multiplyScalar(0.6).add(env.lightColor.clone().multiplyScalar(0.12)));
  treeline.color.setRGB(0.09, 0.13, 0.06).multiply(env.skyAmb).multiplyScalar(1.4)
    .add(new THREE.Color(0.04, 0.06, 0.025).multiply(env.lightColor)).lerp(env.horizon, 0.2);
  rain.uniforms.uCam.value.copy(camera.position);
  rain.uniforms.uColor.value.copy(env.skyAmb).multiplyScalar(0.9).add(env.horizon.clone().multiplyScalar(0.5));
  fireflies.uniforms.uAmt.value = Math.max(0, env.timeCur - 1.3) / 0.7 * (1 - env.rain * 0.8);

  renderer.shadowMap.needsUpdate = true;
  water.renderPasses(scene, camera);
  water.updateShadow(env.sun);
  renderer.setRenderTarget(null);
  renderer.render(scene, camera);

  // adaptive resolution
  frameTimes.push(dt);
  if (frameTimes.length >= 90) {
    const avg = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
    frameTimes = [];
    if (avg > 1 / 32 && pixelRatio > 0.7) {
      pixelRatio = Math.max(0.7, renderer.getPixelRatio() - 0.2);
      resize();
    }
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
window.__pond = { readyAt: performance.now(), renderer, scene, camera, controls, sim, state, env, fishes, boats, stones, food, leaves, useTool };
