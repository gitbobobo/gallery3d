import * as THREE from 'three';
import { POND } from './pond.js';

// 全局状态（UI 驱动）
export const state = {
  tool: 'ripple',
  wind: 0.26,
  rain: 0,          // 平滑后的雨量 0..1
  rainTarget: 0,
  time: 'day',      // 'day' | 'dusk' | 'night'
  weights: { day: 1, dusk: 0, night: 0 } // 平滑过渡权重
};

// 跨材质共享 uniform（同一对象引用，改一处全部生效）
export const U = {
  uTime: { value: 0 },
  uWind: { value: 0.26 },
  uWindDir: { value: new THREE.Vector2(0.87, 0.5) },
  uRain: { value: 0 },
  uNight: { value: 0 },
  uDusk: { value: 0 },
  uSunDir: { value: new THREE.Vector3(0.45, 0.72, 0.35).normalize() },
  uLightDir: { value: new THREE.Vector3(0.45, 0.72, 0.35).normalize() },
  uLightColor: { value: new THREE.Color(1.0, 0.96, 0.88) },
  uDeepColor: { value: new THREE.Color(0.016, 0.11, 0.10) },
  uAbsorb: { value: new THREE.Vector3(0.55, 0.16, 0.11) },
  uSkyTop: { value: new THREE.Color(0.10, 0.30, 0.56) },
  uSkyHorizon: { value: new THREE.Color(0.66, 0.80, 0.86) },
  uFogColor: { value: new THREE.Color(0.66, 0.80, 0.86) },
  uFogDensity: { value: 0.015 },
  uWaterY: { value: 0 },
  uCausStrength: { value: 1.0 }, // 焦散强度（随时段/雨变化）
  uHeightTex: { value: null },
  uTexel: { value: 1 / POND.SIM },
  uDomain: { value: POND.DOMAIN },
  // 每趟渲染的裁剪模式：0=不裁剪 1=保留水面上 2=保留水面下（供自定义 shader 手动 discard）
  uClipMode: { value: 0 }
};
