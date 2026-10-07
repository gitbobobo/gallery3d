import * as THREE from 'three';
import { G, S } from './shared.js';

export const NOISE_GLSL = /* glsl */ `
float h21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),f.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ float s=0.0, a=0.5; for(int i=0;i<5;i++){ s+=a*vn(p); p=p*2.03+vec2(17.1,9.3); a*=0.5; } return s; }
`;

export const SWAY_PARS = /* glsl */ `
attribute float aW; attribute float aPh; attribute float aAmp;
uniform float uWT;
vec3 swayOff(vec3 wp){
  float amp = aAmp * (0.04 + uWind*0.6);
  float gust = 0.75 + 0.25*sin(uTime*0.45 + dot(wp.xz, uWindDir)*0.35);
  float s1 = sin(uWT + aPh);
  float s2 = sin(uWT*1.9 + aPh*1.7 + 1.3);
  float w = aW*aW;
  vec2 d = uWindDir*(0.5 + 0.35*s1 + 0.5*uWind) + vec2(-uWindDir.y, uWindDir.x)*s2*0.3;
  return vec3(d.x, -0.12*w*amp, d.y)*amp*w*gust;
}
`;
export const SWAY_WORLD = `wp.xyz += swayOff(wp.xyz);`;

const COMMON_VS = `
varying vec3 vWP;
uniform float uRefr; uniform float uTime; uniform float uWind; uniform vec2 uWindDir;
`;

function sharedUniforms(shader, extra) {
  Object.assign(shader.uniforms, {
    uRefr: G.uRefr, uTime: G.uTime, uWind: G.uWind, uWindDir: G.uWindDir, uWT: G.uWT,
    uSunDir: G.uSunDir, uSunRad: G.uSunRad, uAbsorb: G.uAbsorb, uScatter: G.uScatter,
    tCaustic: G.tCaustic, uCaustic: G.uCaustic,
  }, extra);
}

const PROJECT = (world) => `
vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
  mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
  mvPosition = instanceMatrix * mvPosition;
#endif
vec4 wp = modelMatrix * mvPosition;
${world}
vWP = wp.xyz;
if (uRefr > 0.5 && wp.y < 0.0) wp.y *= 0.75;
mvPosition = viewMatrix * wp;
gl_Position = projectionMatrix * mvPosition;
`;

const UNDERWATER = /* glsl */ `
if (vWP.y < 0.03) {
  float d = max(-vWP.y, 0.0);
  vec3 Vw = normalize(cameraPosition - vWP);
  float cosI = clamp(abs(Vw.y), 0.05, 1.0);
  float sinR = sqrt(1.0 - cosI*cosI) / 1.333;
  float cosR = sqrt(1.0 - sinR*sinR);
  vec3 sunL = normalize(uSunDir);
  float cosS = sqrt(1.0 - (1.0 - sunL.y*sunL.y) / 1.777);
  vec3 Tsun = exp(-uAbsorb * d / max(cosS, 0.3));
  vec3 Tview = exp(-uAbsorb * d / cosR);
  vec3 wn = inverseTransformDirection(normal, viewMatrix);
  float nl = max(dot(wn, sunL), 0.0);
  float sh = 1.0;
  #ifdef USE_SHADOWMAP
    sh = getShadowMask();
  #endif
  float cs = texture2D(tCaustic, vWP.xz / ${S.toFixed(1)} + 0.5).r;
  vec3 extra = diffuseColor.rgb * RECIPROCAL_PI * uSunRad * nl * sh * (cs - 1.0) * uCaustic * 1.7;
  vec3 lit = max(outgoingLight + extra, vec3(0.0)) * mix(vec3(1.0), Tsun, 0.65);
  vec3 ucol = lit * Tview + uScatter * (1.0 - Tview);
  outgoingLight = mix(outgoingLight, ucol, smoothstep(0.03, -0.01, vWP.y));
}
`;

export function patch(mat, o = {}) {
  const { vsPars = '', vsBegin = '', vsWorld = '', fsPars = '', fsColor = '', fsRough = '', fsNormal = '', uniforms = {}, key = '' } = o;
  mat.onBeforeCompile = (shader) => {
    sharedUniforms(shader, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${COMMON_VS}\n${vsPars}`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>\n${vsBegin}`)
      .replace('#include <project_vertex>', PROJECT(vsWorld));
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vWP;\nuniform float uRefr; uniform float uTime; uniform float uWind;\nuniform vec3 uSunDir; uniform vec3 uSunRad; uniform vec3 uAbsorb; uniform vec3 uScatter;\nuniform sampler2D tCaustic; uniform float uCaustic;\n${NOISE_GLSL}\n${fsPars}`)
      .replace('#include <shadowmap_pars_fragment>', '#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>')
      .replace('#include <color_fragment>', `#include <color_fragment>\n${fsColor}`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>\n${fsRough}`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>\n${fsNormal}`)
      .replace('#include <opaque_fragment>', `${UNDERWATER}\n#include <opaque_fragment>`);
  };
  mat.customProgramCacheKey = () => key;
  return mat;
}

export function depthMat(world = '', pars = '', key = '') {
  const m = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
  m.onBeforeCompile = (shader) => {
    sharedUniforms(shader, {});
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${COMMON_VS}\n${pars}`)
      .replace('#include <project_vertex>', PROJECT(world).replace('if (uRefr > 0.5 && wp.y < 0.0) wp.y *= 0.75;', ''));
  };
  m.customProgramCacheKey = () => 'd' + key;
  return m;
}

export function swayMaterial(mat, key, extra = {}) {
  return patch(mat, { vsPars: SWAY_PARS, vsWorld: SWAY_WORLD, key: 'sway' + key, ...extra });
}
export function swayDepth(key = '') { return depthMat(SWAY_WORLD, SWAY_PARS, 'sway' + key); }

