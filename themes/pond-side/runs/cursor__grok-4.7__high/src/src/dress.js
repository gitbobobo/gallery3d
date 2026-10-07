import { CAUSTIC_GLSL, SIM_GLSL, gerstnerGLSL } from './pond.js';
import { bindEnv } from './env.js';

const WORLD_POS = `
#ifdef USE_INSTANCING
  vWpos = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
#else
  vWpos = (modelMatrix * vec4(transformed, 1.0)).xyz;
#endif
`;

const FRAG_LIBS = `
varying vec3 vWpos;
uniform float uTime;
uniform float uWind;
uniform float uRain;
uniform float uSunAmt;
${SIM_GLSL}
${gerstnerGLSL()}
${CAUSTIC_GLSL}
vec3 toLinear(vec3 c) { return pow(max(c, vec3(0.0)), vec3(2.2)); }
`;

const CAUSTIC_APPLY = `
  if (vWpos.y < 0.02) {
    float cdepth = -vWpos.y;
    float cau = causticLight(vWpos.xz, cdepth) * uSunAmt * (1.0 - uRain * 0.72);
    diffuseColor.rgb *= 0.32 + cau * 3.4;
  }
`;

const WET = `
  float wet = smoothstep(0.22, -0.06, vWpos.y);
  roughnessFactor = mix(roughnessFactor, 0.18, wet);
  diffuseColor.rgb *= mix(1.0, 0.74, wet);
`;

function patchVertex(shader, extraDecls, beginBody) {
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', `#include <common>
      varying vec3 vWpos;
      uniform float uTime;
      uniform float uWind;
      ${extraDecls || ''}
    `)
    .replace('#include <begin_vertex>', `#include <begin_vertex>
      ${beginBody || ''}
    `)
    .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
      ${WORLD_POS}
    `);
}

function patchFragment(shader, extraDecls, colorBody, wet) {
  shader.fragmentShader = shader.fragmentShader
    .replace('#include <common>', `#include <common>
      ${FRAG_LIBS}
      ${extraDecls || ''}
    `)
    .replace('#include <color_fragment>', `#include <color_fragment>
      ${colorBody || ''}
      ${CAUSTIC_APPLY}
    `);
  if (wet) {
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <roughnessmap_fragment>',
      `#include <roughnessmap_fragment>
       ${WET}
      `,
    );
  }
}

export function dressGround(mat) {
  mat.onBeforeCompile = (shader) => {
    bindEnv(shader);
    patchVertex(shader);
    patchFragment(shader, '', '', true);
  };
  mat.customProgramCacheKey = () => 'ground-v1';
}

export function dressWood(mat) {
  mat.onBeforeCompile = (shader) => {
    bindEnv(shader);
    patchVertex(shader);
    patchFragment(shader, '', `
      float grain = sin(vWpos.x * 26.0 + vWpos.z * 8.0 + vWpos.y * 5.0);
      float streak = sin((vWpos.x + vWpos.z) * 47.0);
      diffuseColor.rgb *= mix(0.7, 1.08, grain * 0.5 + 0.5);
      diffuseColor.rgb *= mix(0.92, 1.04, streak * 0.5 + 0.5);
      if (vWpos.y < 0.0) diffuseColor.rgb *= 0.62;
    `, true);
  };
  mat.customProgramCacheKey = () => 'wood-v1';
}

export function dressTree(mat) {
  mat.onBeforeCompile = (shader) => {
    bindEnv(shader);
    patchVertex(shader, `
      attribute float aBend;
      attribute float aPhase;
    `, `
      float s = sin(uTime * (1.05 + uWind * 0.9) + aPhase);
      float amp = aBend * (0.05 + uWind * 0.22);
      transformed.x += s * amp;
      transformed.z += s * 0.65 * amp;
      transformed.y += (s * 0.5 - 0.5) * aBend * (0.02 + uWind * 0.09);
    `);
    patchFragment(shader, '', `
      float moss = smoothstep(1.6, 0.15, vWpos.y);
      float bark = sin(vWpos.y * 18.0 + vWpos.x * 7.0) * 0.5 + 0.5;
      diffuseColor.rgb *= mix(0.72, 1.06, bark);
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.16, 0.28, 0.1), moss * 0.4);
    `, false);
  };
  mat.customProgramCacheKey = () => 'tree-v1';
}

export function dressReed(mat) {
  mat.onBeforeCompile = (shader) => {
    bindEnv(shader);
    patchVertex(shader, `
      attribute float aPhase;
      attribute float aCattail;
      attribute float aAmp;
      varying float vH;
      varying float vCattail;
    `, `
      vH = position.y;
      vCattail = aCattail;
      float sway = sin(uTime * (1.3 + uWind * 0.85) + aPhase) * position.y * position.y;
      transformed.x += sway * aAmp * (0.22 + uWind * 1.45);
      transformed.z += cos(uTime * (1.05 + uWind * 0.7) + aPhase) * position.y * position.y * aAmp * (0.12 + uWind * 0.85);
    `);
    patchFragment(shader, `
      varying float vH;
      varying float vCattail;
    `, `
      vec3 reed = mix(vec3(0.09, 0.28, 0.08), vec3(0.52, 0.62, 0.2), vH);
      if (vCattail > 0.5 && vH > 0.8) {
        reed = mix(vec3(0.35, 0.18, 0.07), vec3(0.22, 0.1, 0.05), smoothstep(0.8, 1.0, vH));
      }
      diffuseColor.rgb = reed;
    `, false);
  };
  mat.customProgramCacheKey = () => 'reed-v1';
}

export function dressLeaf(mat) {
  mat.onBeforeCompile = (shader) => {
    bindEnv(shader);
    patchVertex(shader, `
      attribute float aPhase;
    `, `
      float s = sin(uTime * (1.4 + uWind * 1.1) + aPhase);
      transformed.x += s * position.y * (0.15 + uWind * 0.85);
      transformed.z += cos(uTime * 1.1 + aPhase) * position.y * (0.08 + uWind * 0.45);
    `);
    patchFragment(shader, '', `
      float vein = smoothstep(0.08, 0.0, abs(vWpos.x * 0.0 + 0.0));
      diffuseColor.rgb *= mix(0.85, 1.05, 0.5);
    `, false);
  };
  mat.customProgramCacheKey = () => 'leaf-v1';
}

export function dressGrass(mat) {
  mat.onBeforeCompile = (shader) => {
    bindEnv(shader);
    patchVertex(shader, `
      attribute float aPhase;
    `, `
      float s = sin(uTime * (0.8 + uWind * 0.4) + aPhase) * position.y * position.y;
      transformed.x += s * (0.04 + uWind * 0.08);
    `);
    patchFragment(shader, '', `
      vec3 gcol = mix(vec3(0.04, 0.18, 0.07), vec3(0.28, 0.48, 0.14), clamp(-vWpos.y, 0.0, 1.0));
      diffuseColor.rgb = gcol;
    `, false);
  };
  mat.customProgramCacheKey = () => 'grass-v1';
}

export function dressFish(mat) {
  mat.onBeforeCompile = (shader) => {
    bindEnv(shader);
    patchVertex(shader, `
      attribute float aSpine;
      attribute float aPhase;
      attribute float aPattern;
      attribute float aAmp;
      varying vec3 vObj;
      varying float vPattern;
    `, `
      vObj = position;
      vPattern = aPattern;
      float w = sin(uTime * (4.2 + aAmp * 3.5) + aSpine * 7.5 + aPhase);
      transformed.x += w * aSpine * aSpine * 0.16 * aAmp;
    `);
    patchFragment(shader, `
      varying vec3 vObj;
      varying float vPattern;
    `, `
      vec3 body = vec3(0.72, 0.7, 0.64);
      vec3 mark = vec3(0.55, 0.06, 0.03);
      float id = vPattern;
      if (id < 0.5) {
        body = vec3(0.78, 0.74, 0.68);
        mark = vec3(0.62, 0.05, 0.03);
      } else if (id < 1.5) {
        body = vec3(0.78, 0.18, 0.03);
        mark = vec3(0.9, 0.42, 0.08);
      } else if (id < 2.5) {
        body = vec3(0.82, 0.48, 0.08);
        mark = vec3(0.4, 0.12, 0.02);
      } else if (id < 3.5) {
        body = vec3(0.03, 0.03, 0.035);
        mark = vec3(0.45, 0.07, 0.04);
      } else {
        body = vec3(0.75, 0.73, 0.68);
        mark = vec3(0.55, 0.08, 0.04);
      }
      float n1 = sin(vObj.z * 16.0 + vObj.x * 11.0) * sin(vObj.y * 14.0 + vObj.z * 7.0);
      float spots = smoothstep(0.2, 0.75, n1 * 0.5 + 0.5);
      float band = smoothstep(0.35, 0.85, sin(vObj.z * 9.0 + sin(vObj.x * 18.0) * 2.2) * 0.5 + 0.5);
      float mask = id < 2.5 ? spots : band;
      if (id > 3.5) mask = spots * 0.85;
      diffuseColor.rgb = mix(body, mark, mask);
      float belly = smoothstep(0.02, -0.1, vObj.y);
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.85, 0.8, 0.72), belly * (id < 3.5 ? 0.35 : 0.08));
    `, false);
  };
  mat.customProgramCacheKey = () => 'fish-v1';
}

export function dressLily(mat) {
  mat.onBeforeCompile = (shader) => {
    bindEnv(shader);
    patchVertex(shader);
    patchFragment(shader, '', `
      float vein = 0.5 + 0.5 * sin(vWpos.x * 22.0 + vWpos.z * 16.0);
      diffuseColor.rgb *= mix(0.8, 1.08, vein);
    `, true);
  };
  mat.customProgramCacheKey = () => 'lily-v1';
}
