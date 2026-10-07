import * as THREE from 'three';
import { SIM_HALF, WIND_DIR } from './pond.js';

export const G = {
  uTime: { value: 0 },
  uWind: { value: 0.3 },
  uWindDir: { value: new THREE.Vector2(WIND_DIR[0], WIND_DIR[1]) },
  uRain: { value: 0 },
  uSim: { value: null },
  uSimHalf: { value: SIM_HALF },
  uCausticTile: { value: null },
  uCausticPond: { value: null },
  uTileL: { value: 5.0 },
  uCausticAmt: { value: 1.0 },
  uAbsorb: { value: new THREE.Vector3(0.95, 0.55, 0.68) },
};

export const GLSL_NOISE = /* glsl */ `
float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec2 h22(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973)); p3 += dot(p3, p3.yzx+33.33); return fract((p3.xx+p3.yz)*p3.zy); }
float vnoise(vec2 p){ vec2 i = floor(p); vec2 f = fract(p); vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(h12(i), h12(i+vec2(1,0)), u.x), mix(h12(i+vec2(0,1)), h12(i+vec2(1,1)), u.x), u.y); }
float fbm3(vec2 p){ float s = 0.0, a = 0.5; for(int i=0;i<3;i++){ s += a*vnoise(p); p = p*2.03 + 17.1; a *= 0.5; } return s/0.875; }
float fbm5(vec2 p){ float s = 0.0, a = 0.5; for(int i=0;i<5;i++){ s += a*vnoise(p); p = p*2.03 + 17.1; a *= 0.5; } return s/0.96875; }
`;

export const GLSL_WIND = /* glsl */ `
uniform float uTime;
uniform float uWind;
uniform vec2 uWindDir;
float gustAt(vec2 xz){
  vec2 p = xz * 0.13 - uWindDir * uTime * (0.6 + 1.6 * uWind);
  return vnoise(p) * 0.65 + vnoise(p * 2.3 + 5.0) * 0.35;
}
vec3 windSway(vec3 base, float k, float phase, float stiff){
  float g = gustAt(base.xz);
  float w = uWind;
  float bend = w * (0.35 + 1.1 * g) + 0.04;
  float fl = sin(uTime * (1.3 + w * 3.5) + phase + dot(base.xz, vec2(0.9, 0.6))) * (0.05 + 0.3 * w)
           + sin(uTime * (2.9 + w * 5.0) + phase * 1.7) * (0.02 + 0.12 * w);
  vec2 side = vec2(-uWindDir.y, uWindDir.x);
  vec2 d = uWindDir * (bend + fl * 0.6) + side * fl * 0.5;
  float kk = k * k * stiff;
  return vec3(d.x * kk, -dot(d, d) * kk * 0.35, d.y * kk);
}
`;

export const GLSL_UNDERWATER = /* glsl */ `
uniform sampler2D uCausticTile;
uniform sampler2D uCausticPond;
uniform float uTileL;
uniform float uSimHalf;
uniform float uCausticAmt;
uniform vec3 uAbsorb;
uniform float uRain;
vec3 causticLight(vec3 wp){
  float d = -wp.y;
  if (d <= 0.0) return vec3(1.0);
  float ct = min(texture(uCausticTile, wp.xz / uTileL).r, 6.0);
  vec2 puv = wp.xz / (2.0 * uSimHalf) + 0.5;
  float cp = min(texture(uCausticPond, puv).r, 4.0);
  float c = mix(1.0, ct, uCausticAmt * exp(-d * 0.9) * 0.85) * mix(1.0, cp, uCausticAmt * exp(-d * 0.5));
  c = max(c, 0.0);
  c = c / (1.0 + max(c - 1.0, 0.0) * 0.35);
  float edge = smoothstep(0.0, 0.05, d);
  return mix(vec3(1.0), c * exp(-uAbsorb * d * 1.3), edge);
}
`;

const PROJECT_REPLACE = /* glsl */ `
vec4 wp4 = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
  wp4 = instanceMatrix * wp4;
#endif
wp4 = modelMatrix * wp4;
#ifdef USE_INSTANCING
  vec3 iOrigin = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
#else
  vec3 iOrigin = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
#endif
/*DISPLACE*/
vWPos = wp4.xyz;
vec4 mvPosition = viewMatrix * wp4;
gl_Position = projectionMatrix * mvPosition;
`;

let keyCounter = 0;

/**
 * Patch a built-in material. opts:
 *  uniforms, vertHead, displace (glsl modifying wp4.xyz, has iOrigin, transformed),
 *  fragHead, fragColor (after color_fragment), fragRough, fragLights (after lights_fragment_end),
 *  underwater: bool (adds caustics), wet: number (wetness amount near waterline)
 */
export function patchMaterial(mat, opts = {}) {
  const key = 'p' + keyCounter++;
  mat.customProgramCacheKey = () => key;
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, G, opts.uniforms || {});
    let vs = shader.vertexShader;
    vs = vs.replace(
      '#include <common>',
      `#include <common>\nvarying vec3 vWPos;\n${GLSL_NOISE}\n${GLSL_WIND}\n${opts.vertHead || ''}`
    );
    vs = vs.replace('#include <begin_vertex>', `#include <begin_vertex>\n${opts.begin || ''}`);
    vs = vs.replace('#include <project_vertex>', PROJECT_REPLACE.replace('/*DISPLACE*/', opts.displace || ''));
    vs = vs.replace('#include <worldpos_vertex>', 'vec4 worldPosition = wp4;');
    shader.vertexShader = vs;

    let fs = shader.fragmentShader;
    const needUW = opts.underwater || opts.wet;
    fs = fs.replace(
      '#include <common>',
      `#include <common>\nvarying vec3 vWPos;\n${GLSL_NOISE}\n${needUW ? GLSL_UNDERWATER : ''}\n${opts.fragHead || ''}`
    );
    let colorChunk = opts.fragColor || '';
    if (opts.wet) {
      colorChunk += `
      float wetK = smoothstep(0.1, -0.03, vWPos.y);
      wetK = max(wetK, uRain * 0.7 * smoothstep(-0.2, 0.0, vWPos.y));
      diffuseColor.rgb *= mix(1.0, ${(1 - opts.wet).toFixed(3)}, wetK);`;
    }
    fs = fs.replace('#include <color_fragment>', `#include <color_fragment>\n${colorChunk}`);
    let roughChunk = opts.fragRough || '';
    if (opts.wet) roughChunk += `\nroughnessFactor = mix(roughnessFactor, 0.3, wetK);`;
    fs = fs.replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>\n${roughChunk}`);
    if (opts.fragNormal) fs = fs.replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>\n${opts.fragNormal}`);
    let lightChunk = opts.fragLights || '';
    if (opts.underwater) {
      lightChunk += `
      vec3 cl = causticLight(vWPos);
      reflectedLight.directDiffuse *= cl;
      reflectedLight.directSpecular *= cl;
      float dd = max(-vWPos.y, 0.0);
      reflectedLight.indirectDiffuse *= mix(vec3(1.0), exp(-uAbsorb * dd * 0.6), smoothstep(0.0, 0.05, dd));`;
    }
    fs = fs.replace('#include <lights_fragment_end>', `#include <lights_fragment_end>\n${lightChunk}`);
    fs = fs.replace(
      '#include <opaque_fragment>',
      `${opts.fragEnd || ''}\nif (any(isnan(outgoingLight)) || any(isinf(outgoingLight))) outgoingLight = vec3(0.0);\n#include <opaque_fragment>`
    );
    shader.fragmentShader = fs;
    if (opts.onShader) opts.onShader(shader);
  };
  return mat;
}

/** Depth material for shadows that applies the same displacement */
export function patchedDepthMaterial(opts) {
  const m = new THREE.MeshDepthMaterial({ side: opts.side ?? THREE.FrontSide, map: opts.map ?? null, alphaTest: opts.alphaTest ?? 0 });
  const key = 'd' + keyCounter++;
  m.customProgramCacheKey = () => key;
  m.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, G, opts.uniforms || {});
    let vs = shader.vertexShader;
    vs = vs.replace(
      '#include <common>',
      `#include <common>\nvarying vec3 vWPos;\n${GLSL_NOISE}\n${GLSL_WIND}\n${opts.vertHead || ''}`
    );
    vs = vs.replace('#include <begin_vertex>', `#include <begin_vertex>\n${opts.begin || ''}`);
    vs = vs.replace('#include <project_vertex>', PROJECT_REPLACE.replace('/*DISPLACE*/', opts.displace || ''));
    shader.vertexShader = vs;
  };
  return m;
}

export function setLayers(obj, ...layers) {
  obj.layers.disableAll();
  for (const l of layers) obj.layers.enable(l);
  return obj;
}

export const LAYER = { MAIN: 0, REFL: 1, REFR: 2 };
