import * as THREE from 'three';
import { POND, GLSL_POND } from './pond.js';
import { U } from './shared.js';
import { GLSL_NOISE, GLSL_HEIGHT } from './glsl.js';

const WATER_VERT = /* glsl */ `
  uniform sampler2D uHeightTex;
  uniform float uDomain;
  uniform mat4 uReflMatrix;
  varying vec3 vWorld;
  varying vec4 vReflCoord;
  varying float vSimH;
  void main(){
    vec3 p = position;
    vec2 uv = p.xz / (2.0 * uDomain) + 0.5;
    float h = texture2D(uHeightTex, uv).r;
    p.y += h;
    vWorld = p;
    vSimH = h;
    vReflCoord = uReflMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
  }
`;

const WATER_FRAG = /* glsl */ `
  uniform sampler2D uReflTex;
  uniform sampler2D uRefrTex;
  uniform vec2 uViewport;
  uniform float uTime, uWind, uRain, uNight;
  uniform vec3 uLightDir, uLightColor;
  uniform vec3 uDeepColor, uAbsorb;
  uniform vec3 uFogColor;
  uniform float uFogDensity;
  uniform vec2 uWindDir;
  varying vec3 vWorld;
  varying vec4 vReflCoord;
  varying float vSimH;

  ${GLSL_NOISE}
  ${GLSL_POND}
  ${GLSL_HEIGHT}

  // 风致细波梯度（行波叠加 + 随机扰动 + 雨点抖动）
  vec2 microGrad(vec2 p, float t){
    float amp = 0.016 + uWind * 0.062;
    float k = 2.0 + uWind * 4.5;
    vec2 g = vec2(0.0);
    vec2 d0 = normalize(uWindDir + vec2(0.001));
    vec2 d1 = vec2(-d0.y, d0.x);
    for (int i = 0; i < 3; i++) {
      float fi = float(i);
      vec2 d = normalize(d0 + d1 * (fi - 1.0) * 0.55 + vec2(sin(fi * 12.3), cos(fi * 7.7)) * 0.2);
      float kk = k * (1.0 + fi * 0.83);
      float ph = dot(p, d) * kk + t * (1.1 + fi * 0.53) * (0.5 + uWind * 1.6);
      float w = 1.0 / (1.0 + fi * 1.1);
      g += d * kk * w * cos(ph);
    }
    g *= amp;
    float j = vnoise(p * 6.5 + d0 * t * 1.4);
    g += d0 * (j - 0.5) * (0.05 + uWind * 0.55);
    vec2 rj = vec2(vnoise(p * 14.0 + vec2(t * 8.0, -t * 6.0)), vnoise(p * 14.0 + vec2(-t * 5.0, t * 7.0) + 31.0)) - 0.5;
    g += rj * uRain * 3.2;
    return g;
  }

  void main(){
    vec2 w = vWorld.xz;
    float depth = pondDepth(w);
    if (depth <= 0.004) discard;

    // 法线：波动场梯度 + 微观细波
    vec2 g = heightGradW(w) * 1.35 + microGrad(w, uTime) * (0.55 + uWind * 0.5 + uRain * 0.9);
    vec3 N = normalize(vec3(-g.x, 1.0, -g.y));
    vec3 V = normalize(cameraPosition - vWorld);
    float cosT = max(dot(N, V), 0.0);
    float F = clamp((0.02 + 0.98 * pow(1.0 - cosT, 5.0)) * 1.55, 0.0, 1.0);

    // ---- 反射（平面镜像 RT，随波纹扭曲；下雨时模糊）----
    vec2 ruv = vReflCoord.xy / max(vReflCoord.w, 1e-4);
    ruv += N.xz * 0.09;
    float edge = smoothstep(0.0, 0.03, ruv.x) * smoothstep(1.0, 0.97, ruv.x)
               * smoothstep(0.0, 0.03, ruv.y) * smoothstep(1.0, 0.97, ruv.y);
    float blur = 0.0015 + uRain * 0.011 + uWind * 0.0012;
    vec3 refl = texture2D(uReflTex, clamp(ruv, 0.002, 0.998)).rgb * 0.38;
    refl += texture2D(uReflTex, clamp(ruv + vec2( blur,  blur * 0.6), 0.002, 0.998)).rgb * 0.155;
    refl += texture2D(uReflTex, clamp(ruv + vec2(-blur,  blur * 0.6), 0.002, 0.998)).rgb * 0.155;
    refl += texture2D(uReflTex, clamp(ruv + vec2( blur * 0.5, -blur), 0.002, 0.998)).rgb * 0.155;
    refl += texture2D(uReflTex, clamp(ruv + vec2(-blur * 0.5, -blur), 0.002, 0.998)).rgb * 0.155;

    // ---- 折射（屏幕空间扭曲 + 深度吸收）----
    vec2 suv = gl_FragCoord.xy / uViewport;
    float dist = length(cameraPosition - vWorld);
    float distort = 0.042 / (1.0 + dist * 0.10);
    vec3 refr = texture2D(uRefrTex, clamp(suv + N.xz * distort, 0.002, 0.998)).rgb;
    vec3 trans = exp(-uAbsorb * depth * 1.35);
    vec3 waterCol = refr * trans + uDeepColor * (1.0 - trans);

    vec3 col = mix(waterCol, refl, clamp(F, 0.0, 1.0) * edge);

    // ---- 太阳 / 月亮高光与 glitter ----
    vec3 Hv = normalize(uLightDir + V);
    float nh = max(dot(N, Hv), 0.0);
    float nightDim = 1.0 - uNight * 0.62;
    col += uLightColor * pow(nh, 340.0) * 1.35 * nightDim;
    col += uLightColor * pow(nh, 2400.0) * 4.0 * nightDim;

    // ---- 泡沫：波峰 + 岸边 ----
    float crest = smoothstep(0.02, 0.055, vSimH);
    float shore = smoothstep(0.3, 0.015, depth);
    float fn = fbm2(w * 2.6 - uWindDir * uTime * 0.3);
    float foam = clamp(crest * (0.35 + 1.1 * fn) * 2.4, 0.0, 1.0) * 0.85 + shore * clamp(fn * 1.5 - 0.25, 0.0, 1.0) * 0.42;
    foam = clamp(foam, 0.0, 1.0);
    vec3 foamCol = (uLightColor * 0.5 + vec3(0.44, 0.5, 0.5)) * (0.22 + 0.78 * max(uLightDir.y, 0.1)) * (1.0 - uNight * 0.72);
    col = mix(col, foamCol, foam * 0.8);

    // ---- 雾 ----
    float fogF = 1.0 - exp(-uFogDensity * uFogDensity * dist * dist);
    col = mix(col, uFogColor, clamp(fogF, 0.0, 1.0));

    float alpha = smoothstep(0.0, 0.07, depth);
    alpha = max(alpha, foam * 0.95);

    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`;

export class WaterSystem {
  constructor(scene, renderer, camera, sim) {
    this.debugNoClip = new URLSearchParams(location.search).get('noclip') === '1';
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    this.sim = sim;
    U.uHeightTex.value = sim.texture;

    const isSmall = Math.min(innerWidth, innerHeight) < 700;
    const rtSize = isSmall ? 448 : 768;
    const rtOpts = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: true };
    this.reflRT = new THREE.WebGLRenderTarget(rtSize, rtSize, rtOpts);
    this.refrRT = new THREE.WebGLRenderTarget(rtSize, rtSize, rtOpts);
    this.reflRT.texture.generateMipmaps = false;
    this.refrRT.texture.generateMipmaps = false;

    const geo = new THREE.PlaneGeometry(POND.DOMAIN * 2, POND.DOMAIN * 2, POND.SIM - 1, POND.SIM - 1);
    geo.rotateX(-Math.PI / 2);

    this.uniforms = {
      uHeightTex: U.uHeightTex,
      uTexel: U.uTexel,
      uDomain: U.uDomain,
      uReflMatrix: { value: new THREE.Matrix4() },
      uReflTex: { value: this.reflRT.texture },
      uRefrTex: { value: this.refrRT.texture },
      uViewport: { value: new THREE.Vector2(1, 1) },
      uTime: U.uTime, uWind: U.uWind, uRain: U.uRain, uNight: U.uNight,
      uWindDir: U.uWindDir,
      uLightDir: U.uLightDir, uLightColor: U.uLightColor,
      uDeepColor: U.uDeepColor, uAbsorb: U.uAbsorb,
      uFogColor: U.uFogColor, uFogDensity: U.uFogDensity
    };
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: WATER_VERT,
      fragmentShader: WATER_FRAG,
      transparent: true,
      depthWrite: true,
      side: THREE.DoubleSide
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.renderOrder = 4;
    this.mesh.frustumCulled = false;
    scene.add(this.mesh);

    this.reflCam = new THREE.PerspectiveCamera();
    this.clipKeepAbove = [new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.02)];
    this.clipKeepBelow = [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.03)];

    this._v1 = new THREE.Vector3();
    this._v2 = new THREE.Vector3();
    this._v3 = new THREE.Vector3();

    this.onResize();
  }

  onResize() {
    const size = new THREE.Vector2();
    this.renderer.getDrawingBufferSize(size);
    this.uniforms.uViewport.value.copy(size);
  }

  updateReflection(camera) {
    const p = camera.position;
    this.reflCam.position.set(p.x, -p.y, p.z);
    camera.getWorldDirection(this._v1);
    this._v2.copy(p).add(this._v1);
    this._v2.y = -this._v2.y;
    this._v3.set(0, 1, 0).applyQuaternion(camera.quaternion);
    this._v3.y = -this._v3.y;
    this.reflCam.up.copy(this._v3);
    this.reflCam.lookAt(this._v2);
    this.reflCam.updateMatrixWorld();
    this.reflCam.matrixWorldInverse.copy(this.reflCam.matrixWorld).invert();
    this.reflCam.projectionMatrix.copy(camera.projectionMatrix);
    this.uniforms.uReflMatrix.value.multiplyMatrices(this.reflCam.projectionMatrix, this.reflCam.matrixWorldInverse);
  }

  render() {
    const { renderer, scene, camera, mesh } = this;
    mesh.visible = false;

    // 反射：镜像相机 + 保留水面上方
    this.updateReflection(camera);
    U.uClipMode.value = 1;
    renderer.clippingPlanes = this.debugNoClip ? [] : this.clipKeepAbove;
    renderer.setRenderTarget(this.reflRT);
    renderer.setClearColor(U.uSkyHorizon.value);
    renderer.clear();
    renderer.render(scene, this.reflCam);

    // 折射：主相机 + 保留水面下方
    U.uClipMode.value = 2;
    renderer.clippingPlanes = this.debugNoClip ? [] : this.clipKeepBelow;
    renderer.setRenderTarget(this.refrRT);
    renderer.setClearColor(U.uDeepColor.value);
    renderer.clear();
    renderer.render(scene, camera);

    // 主画面
    U.uClipMode.value = 0;
    renderer.clippingPlanes = [];
    renderer.setRenderTarget(null);
    mesh.visible = true;
    renderer.render(scene, camera);
  }
}
