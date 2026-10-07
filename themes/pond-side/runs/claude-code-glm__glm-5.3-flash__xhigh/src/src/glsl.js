import { GLSL_POND } from './pond.js';
import { U } from './shared.js';

// 基础噪声
export const GLSL_NOISE = /* glsl */ `
  float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vnoise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash21(i), hash21(i+vec2(1.0,0.0)), u.x),
               mix(hash21(i+vec2(0.0,1.0)), hash21(i+vec2(1.0,1.0)), u.x), u.y);
  }
  float fbm2(vec2 p){
    float s = 0.0, a = 0.5;
    for(int i = 0; i < 4; i++){ s += a * vnoise(p); p = p * 2.17 + 13.7; a *= 0.5; }
    return s;
  }
`;

// 高度场采样（依赖 GLSL_POND 提供的 uDomain）
export const GLSL_HEIGHT = /* glsl */ `
  uniform sampler2D uHeightTex;
  uniform float uTexel;
  float heightAtUV(vec2 uv){ return texture2D(uHeightTex, uv).r; }
  float heightAtW(vec2 w){ return heightAtUV(w / (2.0 * uDomain) + 0.5); }
  vec2 heightGradW(vec2 w){
    vec2 uv = w / (2.0 * uDomain) + 0.5;
    float e = uTexel * 1.5;
    float gx = heightAtUV(uv + vec2(e, 0.0)) - heightAtUV(uv - vec2(e, 0.0));
    float gz = heightAtUV(uv + vec2(0.0, e)) - heightAtUV(uv - vec2(0.0, e));
    return vec2(gx, gz) / (2.0 * e * 2.0 * uDomain);
  }
`;

// 注入到 Standard 材质：焦散光斑 + 水下色调 + 湿土压暗
export function causticsInject(shader) {
  shader.uniforms.uTime = U.uTime;
  shader.uniforms.uHeightTex = U.uHeightTex;
  shader.uniforms.uTexel = U.uTexel;
  shader.uniforms.uDomain = U.uDomain;
  shader.uniforms.uLightColor2 = U.uLightColor;
  shader.uniforms.uCausStrength = U.uCausStrength;
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', '#include <common>\nvarying vec3 vCausWP;')
    .replace('#include <begin_vertex>', `#include <begin_vertex>
      #ifdef USE_INSTANCING
        vCausWP = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
      #else
        vCausWP = (modelMatrix * vec4(transformed, 1.0)).xyz;
      #endif`);
  shader.fragmentShader = shader.fragmentShader
    .replace('#include <common>', `#include <common>
      varying vec3 vCausWP;
      uniform float uTime, uCausStrength;
      uniform vec3 uLightColor2;
      ${GLSL_NOISE}
      ${GLSL_POND}
      ${GLSL_HEIGHT}
      float causticLayer(vec2 p, float t){
        float n1 = vnoise(p * 1.9 + vec2(t * 0.31, t * 0.23));
        float n2 = vnoise(p * 2.6 + vec2(-t * 0.22, t * 0.34) + 7.31);
        return pow(clamp(n1 * n2 * 3.0, 0.0, 1.0), 4.0);
      }`)
    .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
      {
        float pd = pondDepth(vCausWP.xz);
        float under = step(0.04, pd);
        float shallow = smoothstep(1.05, 0.06, pd);
        vec2 cuv = vCausWP.xz * 1.5 + heightGradW(vCausWP.xz) * 0.45;
        float web = min(causticLayer(cuv, uTime), causticLayer(cuv * 1.27 + 4.7, uTime * 1.13));
        float hh = heightAtW(vCausWP.xz);
        web *= 0.55 + 0.75 * clamp(hh * 9.0 + 0.45, 0.0, 1.7);
        totalEmissiveRadiance += uLightColor2 * (web * shallow * under * uCausStrength * 0.38);
        float wet = smoothstep(0.26, 0.02, vCausWP.y);
        diffuseColor.rgb *= mix(vec3(1.0), vec3(0.72, 0.86, 0.88), under * 0.45);
        diffuseColor.rgb *= mix(1.0, 0.55, wet * (1.0 - under));
      }`);
  return shader;
}

// 注入摇摆（芦苇/水草/柳叶），几何体 y∈[0,1]，attribute aFlex 为柔性权重
export function swayInject(shader, opts = {}) {
  const speed = (opts.speed ?? 1).toFixed(2);
  const amp = (opts.amp ?? 0.28).toFixed(3);
  shader.uniforms.uTime = U.uTime;
  shader.uniforms.uWind = U.uWind;
  shader.uniforms.uWindDir = U.uWindDir;
  shader.uniforms.uSwayPhase = { value: opts.phase ?? 0 };
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', `#include <common>
      uniform float uTime, uWind, uSwayPhase;
      uniform vec2 uWindDir;
      attribute float aFlex;`)
    .replace('#include <begin_vertex>', `#include <begin_vertex>
      {
        float flex = aFlex * aFlex;
        #ifdef USE_INSTANCING
          vec3 ipos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
        #else
          vec3 ipos = vec3(0.0);
        #endif
        float ph = ipos.x * 2.7 + ipos.z * 1.9 + uSwayPhase;
        float sp = (0.9 + uWind * 2.2) * ${speed};
        float sw = sin(uTime * sp + ph) * 0.6 + sin(uTime * sp * 1.73 + ph * 1.31) * 0.4;
        float gust = 0.75 + 0.25 * sin(uTime * 0.43 + ph * 0.21);
        vec2 dir = normalize(uWindDir + vec2(0.001));
        transformed.xz += dir * sw * gust * flex * (0.05 + uWind * ${amp});
        transformed.x += sin(uTime * sp * 2.3 + ph * 3.1) * flex * 0.012 * (0.3 + uWind);
      }`);
  return shader;
}
