// 主入口：渲染管线（波纹模拟 → 镜面反射 → 折射 → 主渲染）、相机、交互、环境控制
import * as THREE from 'three';
import { OrbitControls } from '../vendor/OrbitControls.js';
import {
  DOMAIN, DOMAIN_W, DOMAIN_H, pondRR, depthAt, terrainHeight,
  WaveField, samplePalette, clamp, lerp, rand,
} from './common.js';
import { WaveSim } from './sim.js';
import { Water } from './water.js';
import { createSky } from './sky.js';
import { createTerrain } from './terrain.js';
import { createDock } from './dock.js';
import { createReeds, createWillow } from './plants.js';
import { Koi } from './koi.js';
import { Floaters } from './floaters.js';
import { FX } from './fx.js';

const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xbfd9de, 0.011);

const camera = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, 0.1, 300);
camera.position.set(7.2, 4.6, 10.8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, -0.2, 0.5);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 3;
controls.maxDistance = 24;
controls.minPolarAngle = 0.12;
controls.maxPolarAngle = Math.PI * 0.56;
controls.enablePan = false;
controls.update();

// ---------- 灯光 ----------
const sun = new THREE.DirectionalLight(0xfff3dd, 2.6);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -16; sun.shadow.camera.right = 16;
sun.shadow.camera.top = 16; sun.shadow.camera.bottom = -16;
sun.shadow.camera.near = 5; sun.shadow.camera.far = 80;
sun.shadow.bias = -0.0008;
scene.add(sun, sun.target);
const hemi = new THREE.HemisphereLight(0x9cc8e8, 0x6b7a55, 0.55);
scene.add(hemi);

// ---------- 共享 uniform ----------
const simUniforms = {
  tHeight: { value: null },
  uTime: { value: 0 },
  uWind: { value: 0.25 },
  uSunDir: { value: new THREE.Vector3(0.3, 0.8, 0.4) },
  uSunColor: { value: new THREE.Color(0xfff3dd) },
  uCaustic: { value: 1 },
};

// ---------- 场景搭建 ----------
const dock = createDock();
const sim = new WaveSim(renderer, dock.posts);
simUniforms.tHeight.value = sim.texture;

const sky = createSky();
scene.add(sky.mesh);
const terrain = createTerrain(simUniforms);
scene.add(terrain.group);
scene.add(dock.group);
const reeds = createReeds(simUniforms);
scene.add(reeds.group);
const willow = createWillow(simUniforms);
scene.add(willow.group);

const waveField = new WaveField();
const water = new Water(renderer, sim);
scene.add(water.mesh);
const koi = new Koi(scene, 5, sim);
const floaters = new Floaters(scene, waveField, simUniforms);
floaters.colliders = dock.posts;
floaters.willowTips = willow.tips;
const fx = new FX(scene);

// 落水事件：溅花 + 模拟涟漪 + 惊鱼
floaters.onSplash = (x, z, power) => {
  if (power > 0.5) {
    sim.addDrop(x, z, 0.5, -0.55);
    sim.addDrop(x, z, 0.18, 0.3);
    waveField.addRipple(x, z, 0.14, 2.8, 2.6);
    fx.burst(x, 0.05, z, 26, 1.6, 1.1);
    koi.scare(x, z, 1);
  } else if (power > 0.02) {
    sim.addDrop(x, z, 0.15, -0.06);
    waveField.addRipple(x, z, 0.02, 2.2, 1.4);
  }
};

// ---------- 状态 ----------
const params = { wind: 0.25, rain: 0, rainOn: false, tod: 0, todTarget: 0 };
let tool = 'tap';

// ---------- UI ----------
const hint = document.getElementById('hint');
let hintTimer = 0;
function showHint(text) {
  hint.textContent = text;
  hint.classList.remove('fade');
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => hint.classList.add('fade'), 5000);
}
const toolHints = {
  tap: '轻点水面，激起一圈涟漪',
  stone: '点击水面：抛出石子',
  boat: '点击水面：放一只纸船',
  food: '点击水面：撒一把鱼食',
};
document.getElementById('tools').addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-tool]');
  if (!btn) return;
  tool = btn.dataset.tool;
  document.querySelectorAll('#tools .tbtn').forEach(b => b.classList.toggle('on', b === btn));
  showHint(toolHints[tool]);
});
document.getElementById('wind').addEventListener('input', (ev) => {
  params.wind = parseFloat(ev.target.value);
  showHint(`风力 ${(params.wind * 100) | 0}%`);
});
const rainBtn = document.getElementById('rainBtn');
rainBtn.addEventListener('click', () => {
  params.rainOn = !params.rainOn;
  rainBtn.classList.toggle('on', params.rainOn);
  showHint(params.rainOn ? '下雨了' : '雨停了');
});
document.getElementById('tod').addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-tod]');
  if (!btn) return;
  params.todTarget = parseFloat(btn.dataset.tod);
  document.querySelectorAll('#tod .tbtn').forEach(b => b.classList.toggle('on', b === btn));
  showHint(['白天', '黄昏', '夜晚'][params.todTarget]);
});

// ---------- 点击水面 ----------
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
let downInfo = null;
renderer.domElement.addEventListener('pointerdown', (ev) => {
  downInfo = { x: ev.clientX, y: ev.clientY, t: performance.now() };
});
renderer.domElement.addEventListener('pointerup', (ev) => {
  if (!downInfo) return;
  const dx = ev.clientX - downInfo.x, dy = ev.clientY - downInfo.y;
  const dt = performance.now() - downInfo.t;
  downInfo = null;
  if (dx * dx + dy * dy > 64 || dt > 500) return;
  ndc.set((ev.clientX / innerWidth) * 2 - 1, -(ev.clientY / innerHeight) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  const o = raycaster.ray.origin, d = raycaster.ray.direction;
  if (d.y >= -0.001) return;
  const t = -o.y / d.y;
  const px = o.x + d.x * t, pz = o.z + d.z * t;
  if (pondRR(px, pz) > 0.985) return;
  onWaterTap(px, pz);
});

function onWaterTap(x, z) {
  if (tool === 'tap') {
    sim.addDrop(x, z, 0.45, -0.42);
    waveField.addRipple(x, z, 0.08, 2.6, 2.4);
    fx.burst(x, 0.03, z, 4, 0.5, 0.7);
  } else if (tool === 'stone') {
    floaters.throwStone(x, z);
  } else if (tool === 'boat') {
    floaters.addBoat(x, z);
    sim.addDrop(x, z, 0.3, -0.1);
    waveField.addRipple(x, z, 0.04, 2.4, 1.8);
    showHint('纸船入水了');
  } else if (tool === 'food') {
    floaters.addFood(x, z);
    sim.addDrop(x, z, 0.2, -0.06);
    waveField.addRipple(x, z, 0.02, 2.2, 1.4);
    showHint('鱼来了');
  }
}

// ---------- 尺寸 ----------
function onResize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  const size = renderer.getDrawingBufferSize(new THREE.Vector2());
  water.setSize(size.x, size.y);
}
window.addEventListener('resize', onResize);
onResize();

// ---------- 环境更新 ----------
const pal = {};
const sunDir = new THREE.Vector3(), moonDir = new THREE.Vector3(-0.4, 0.7, -0.3).normalize();
let ambientTimer = 0;

function updateEnvironment(dt) {
  params.tod += (params.todTarget - params.tod) * Math.min(1, dt * 1.8);
  params.rain += ((params.rainOn ? 1 : 0) - params.rain) * Math.min(1, dt * 1.5);
  const t = params.tod, rain = params.rain;
  samplePalette(t, pal);

  // 太阳（夜晚即月光）
  const el = pal.sunElev, az = pal.sunAzim;
  sunDir.set(Math.cos(el) * Math.cos(az), Math.sin(el), Math.cos(el) * Math.sin(az)).normalize();
  const dim = 1 - rain * 0.55;
  sun.position.copy(sunDir).multiplyScalar(40);
  sun.color.copy(pal.sunColor);
  sun.intensity = pal.sunI * dim;
  hemi.color.copy(pal.hemiSky);
  hemi.groundColor.copy(pal.hemiGnd);
  hemi.intensity = pal.hemiI * (1 - rain * 0.3);

  scene.fog.color.copy(pal.fog);
  scene.fog.density = pal.fogD * (1 + rain * 0.8);

  // 天空
  sky.uniforms.zenith.value.copy(pal.zenith);
  sky.uniforms.horizon.value.copy(pal.horizon);
  sky.uniforms.sunDir.value.copy(sunDir);
  sky.uniforms.sunColor.value.copy(pal.sunColor).multiplyScalar(dim);
  sky.uniforms.moonDir.value.copy(moonDir);
  sky.uniforms.moonI.value = pal.moonI;
  sky.uniforms.starI.value = pal.starI * (1 - rain * 0.85);
  sky.uniforms.cloudA.value = pal.cloud + rain * 0.3;
  sky.uniforms.rainDark.value = rain;

  // 水
  const wu = water.uniforms;
  wu.uSunDir.value.copy(sunDir);
  wu.uSunCol.value.copy(pal.sunColor).multiplyScalar(pal.sunI * dim * 0.5);
  wu.uMoonDir.value.copy(moonDir);
  wu.uMoonI.value = pal.moonI * (1 - rain * 0.7);
  wu.uDeep.value.copy(pal.deepWater);
  wu.uShallow.value.copy(pal.shallowTint);
  wu.uSkyAmb.value.copy(pal.hemiSky);
  wu.uWind.value = params.wind;
  wu.uRain.value = rain;

  simUniforms.uWind.value = params.wind;
  simUniforms.uSunDir.value.copy(sunDir);
  simUniforms.uSunColor.value.copy(pal.sunColor).multiplyScalar(pal.sunI * dim);
  simUniforms.uCaustic.value = (1 - rain * 0.75) * clamp(sunDir.y * 2, 0.15, 1);
}

// ---------- 主循环 ----------
const clock = new THREE.Clock();
let simAcc = 0;

function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  simUniforms.uTime.value = t;
  sky.uniforms.time.value = t;

  waveField.update(t);
  updateEnvironment(dt);
  floaters.update(dt, params.wind, pal.firefly * (1 - params.rain));
  koi.update(dt, floaters.foods, waveField);
  fx.update(dt, params.rain > 0.5, pal.firefly * (1 - params.rain), params.wind, sim, waveField);

  // 环境偶发涟漪（微风皱水）
  ambientTimer -= dt;
  if (ambientTimer <= 0) {
    ambientTimer = rand(1.2, 3.2) / (0.4 + params.wind);
    const th = rand(Math.PI * 2), rr = rand(0.2, 0.85);
    const sr = 9;
    sim.addDrop(Math.cos(th) * sr * rr, Math.sin(th) * sr * rr, rand(0.2, 0.5), rand(-0.05, -0.02) * (0.4 + params.wind));
  }

  controls.update();
  // 相机不入水
  if (camera.position.y < 0.42) camera.position.y = 0.42;

  // 波纹推进（与帧率解耦：约 120 步/秒）
  simAcc = Math.min(simAcc + dt * 120, 6);
  const steps = Math.floor(simAcc);
  simAcc -= steps;
  if (steps > 0) sim.step(steps);
  simUniforms.tHeight.value = sim.texture;
  water.uniforms.tHeight.value = sim.texture;

  water.updateMirror(camera);

  water.mesh.visible = false;
  // 倒影：只画水面以上
  renderer.clippingPlanes = water.clipAbove;
  renderer.setRenderTarget(water.reflRT);
  renderer.render(scene, water.mirrorCam);
  // 折射：只画水面以下
  renderer.clippingPlanes = water.clipBelow;
  renderer.setRenderTarget(water.refrRT);
  renderer.render(scene, camera);
  renderer.clippingPlanes = [];
  renderer.setRenderTarget(null);

  water.mesh.visible = true;
  renderer.render(scene, camera);
}
frame();

// 调试钩子
window.__pond = { camera, controls, params, sim, water, koi, floaters, fx, scene, renderer, waveField, onWaterTap };
