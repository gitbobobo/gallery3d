import * as THREE from 'three';
import { SIM } from './pond.js';

export const U = {
  uTime: { value: 0 },
  uWind: { value: 0.22 },
  uRain: { value: 0 },
  uSunAmt: { value: 1 },
  uMoonAmt: { value: 0 },
  uStarAmt: { value: 0 },
  uNight: { value: 0 },
  uAbsorb: { value: 1.1 },
  uSunDir: { value: new THREE.Vector3() },
  uSunColor: { value: new THREE.Color() },
  uMoonDir: { value: new THREE.Vector3(-0.05, 0.055, -0.95).normalize() },
  uDeep: { value: new THREE.Color() },
  uShallow: { value: new THREE.Color() },
  uScatter: { value: new THREE.Color() },
  uSkyTop: { value: new THREE.Color() },
  uSkyHorizon: { value: new THREE.Color() },
  uSkyGround: { value: new THREE.Color() },
  uWave: { value: null },
  uSimOrigin: { value: new THREE.Vector2(SIM.x0, SIM.z0) },
  uSimSize: { value: new THREE.Vector2(SIM.x1 - SIM.x0, SIM.z1 - SIM.z0) },
  uSimTexel: { value: new THREE.Vector2(SIM.nx, SIM.nz) },
  uResolution: { value: new THREE.Vector2(1, 1) },
  uNear: { value: 0.08 },
  uFar: { value: 180 },
};

const LOOKS = [
  {
    sunDir: new THREE.Vector3(-0.32, 0.88, -0.35),
    sunColor: new THREE.Color('#fff1d2'),
    sunIntensity: 2.55,
    hemiIntensity: 0.62,
    skyTop: new THREE.Color('#3f86c8'),
    skyHorizon: new THREE.Color('#c5e4ea'),
    skyGround: new THREE.Color('#b7c3a4'),
    hemiSky: new THREE.Color('#c5dff2'),
    hemiGround: new THREE.Color('#8d6b49'),
    deep: new THREE.Color('#062428'),
    shallow: new THREE.Color('#e7f3ec'),
    scatter: new THREE.Color('#2a8f86'),
    sunAmt: 1,
    moonAmt: 0,
    starAmt: 0,
    night: 0,
    absorb: 0.72,
  },
  {
    sunDir: new THREE.Vector3(-0.78, 0.24, -0.5),
    sunColor: new THREE.Color('#ff7a3c'),
    sunIntensity: 1.55,
    hemiIntensity: 0.36,
    skyTop: new THREE.Color('#2a3266'),
    skyHorizon: new THREE.Color('#e8885e'),
    skyGround: new THREE.Color('#6a3548'),
    hemiSky: new THREE.Color('#e09878'),
    hemiGround: new THREE.Color('#3a2430'),
    deep: new THREE.Color('#160d1c'),
    shallow: new THREE.Color('#f0c4aa'),
    scatter: new THREE.Color('#8a4038'),
    sunAmt: 0.72,
    moonAmt: 0.28,
    starAmt: 0.18,
    night: 0.12,
    absorb: 1.22,
  },
  {
    sunDir: new THREE.Vector3(0.4, 0.8, -0.28),
    sunColor: new THREE.Color('#d5e2ff'),
    sunIntensity: 0.46,
    hemiIntensity: 0.1,
    skyTop: new THREE.Color('#070b16'),
    skyHorizon: new THREE.Color('#1a2748'),
    skyGround: new THREE.Color('#070910'),
    hemiSky: new THREE.Color('#243456'),
    hemiGround: new THREE.Color('#0c0e12'),
    deep: new THREE.Color('#02050c'),
    shallow: new THREE.Color('#a9bbd0'),
    scatter: new THREE.Color('#102033'),
    sunAmt: 0.04,
    moonAmt: 1,
    starAmt: 1,
    night: 1,
    absorb: 1.65,
  },
];

for (const look of LOOKS) look.sunDir.normalize();

function lerpColor(out, a, b, t) {
  out.copy(a).lerp(b, t);
}

export function createLights(scene) {
  const hemi = new THREE.HemisphereLight('#c5dff2', '#8d6b49', 0.62);
  const sun = new THREE.DirectionalLight('#fff1d2', 2.55);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 48;
  sun.shadow.camera.left = -14;
  sun.shadow.camera.right = 14;
  sun.shadow.camera.top = 14;
  sun.shadow.camera.bottom = -14;
  sun.shadow.bias = -0.00035;
  sun.shadow.normalBias = 0.028;
  sun.position.copy(LOOKS[0].sunDir).multiplyScalar(24);
  const amb = new THREE.AmbientLight('#ffffff', 0.08);
  const fill = new THREE.DirectionalLight('#e7f2ff', 0.22);
  fill.position.set(6, 5, 7);
  scene.add(hemi, sun, sun.target, amb, fill);
  return { hemi, sun, amb, fill };
}

export function applyLook(t, rain, lights) {
  const x = THREE.MathUtils.clamp(t, 0, 2);
  const i = Math.min(1, Math.floor(x));
  const f = x - i;
  const A = LOOKS[i];
  const B = LOOKS[Math.min(i + 1, 2)];
  const k = f * f * (3 - 2 * f);

  U.uSunDir.value.copy(A.sunDir).lerp(B.sunDir, k).normalize();
  lerpColor(U.uSunColor.value, A.sunColor, B.sunColor, k);
  lerpColor(U.uDeep.value, A.deep, B.deep, k);
  lerpColor(U.uShallow.value, A.shallow, B.shallow, k);
  lerpColor(U.uScatter.value, A.scatter, B.scatter, k);
  lerpColor(U.uSkyTop.value, A.skyTop, B.skyTop, k);
  lerpColor(U.uSkyHorizon.value, A.skyHorizon, B.skyHorizon, k);
  lerpColor(U.uSkyGround.value, A.skyGround, B.skyGround, k);

  const rainGray = new THREE.Color('#222830');
  if (rain > 0) {
    U.uSkyTop.value.lerp(rainGray, rain * 0.72);
    U.uSkyHorizon.value.lerp(new THREE.Color('#3a4048'), rain * 0.55);
    U.uSunColor.value.lerp(new THREE.Color('#9aa4b0'), rain * 0.65);
  }

  U.uSunAmt.value = THREE.MathUtils.lerp(A.sunAmt, B.sunAmt, k) * (1 - rain * 0.82);
  U.uMoonAmt.value = THREE.MathUtils.lerp(A.moonAmt, B.moonAmt, k);
  U.uStarAmt.value = THREE.MathUtils.lerp(A.starAmt, B.starAmt, k) * (1 - rain * 0.85);
  U.uNight.value = THREE.MathUtils.lerp(A.night, B.night, k);
  U.uAbsorb.value = THREE.MathUtils.lerp(A.absorb, B.absorb, k);
  U.uMoonDir.value.set(-0.05, 0.055, -0.95).normalize();

  const sunI = THREE.MathUtils.lerp(A.sunIntensity, B.sunIntensity, k) * (1 - rain * 0.78);
  const hemiI = THREE.MathUtils.lerp(A.hemiIntensity, B.hemiIntensity, k) * (1 - rain * 0.4);
  lights.sun.color.copy(U.uSunColor.value);
  lights.sun.intensity = sunI;
  lights.sun.position.copy(U.uSunDir.value).multiplyScalar(24);
  lights.hemi.intensity = hemiI;
  const night = U.uNight.value;
  lights.amb.intensity = 0.08 * (1 - night * 0.7) * (1 - rain * 0.35);
  lights.fill.intensity = 0.22 * (1 - night * 0.88) * (1 - rain * 0.5);
  lights.hemi.color.copy(A.hemiSky).lerp(B.hemiSky, k);
  lights.hemi.groundColor.copy(A.hemiGround).lerp(B.hemiGround, k);
  if (rain > 0) {
    lights.hemi.color.lerp(rainGray, rain * 0.5);
    lights.hemi.groundColor.lerp(new THREE.Color('#1a1c1e'), rain * 0.4);
  }
}

export const ENV_KEYS = [
  'uTime', 'uWind', 'uRain', 'uSunAmt', 'uMoonAmt', 'uStarAmt', 'uNight',
  'uSunDir', 'uSunColor', 'uMoonDir', 'uWave', 'uSimOrigin', 'uSimSize', 'uSimTexel',
];

export function bindEnv(shader, keys = ENV_KEYS) {
  for (const key of keys) shader.uniforms[key] = U[key];
}
