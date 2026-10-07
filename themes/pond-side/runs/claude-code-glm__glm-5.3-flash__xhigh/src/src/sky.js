import * as THREE from 'three';
import { U, state } from './shared.js';

// 三种时段的调色板（十六进制为 sRGB，three 自动转线性）
const PAL = {
  day: {
    top: 0x2e6cb8, horizon: 0xb9d6e2,
    sunDir: new THREE.Vector3(0.45, 0.72, 0.35),
    lightColor: 0xfff2dc, lightIntensity: 3.0,
    hemiSky: 0xaecadb, hemiGround: 0x6d7d58, hemiIntensity: 1.15,
    deep: 0x0c443c, absorb: new THREE.Vector3(0.52, 0.17, 0.11),
    fog: 0xb9d6e2, fogDensity: 0.019,
    sunColor: 0xfff6e0
  },
  dusk: {
    top: 0x2a3060, horizon: 0xe89050,
    sunDir: new THREE.Vector3(0.92, 0.14, -0.30),
    lightColor: 0xff9448, lightIntensity: 1.8,
    hemiSky: 0x6a5a78, hemiGround: 0x4a382c, hemiIntensity: 0.55,
    deep: 0x08222e, absorb: new THREE.Vector3(0.62, 0.22, 0.16),
    fog: 0xc08054, fogDensity: 0.016,
    sunColor: 0xffa860
  },
  night: {
    top: 0x04070f, horizon: 0x111c27,
    sunDir: new THREE.Vector3(-0.38, 0.60, -0.48),
    lightColor: 0xa4bce8, lightIntensity: 0.55,
    hemiSky: 0x232f40, hemiGround: 0x0e1414, hemiIntensity: 0.45,
    deep: 0x02070a, absorb: new THREE.Vector3(0.82, 0.34, 0.26),
    fog: 0x0c141c, fogDensity: 0.02,
    sunColor: 0xc8d8ff
  }
};

const SKY_FRAG = /* glsl */ `
  varying vec3 vDir;
  uniform vec3 uTop, uHorizon, uSunDir, uMoonDir;
  uniform vec3 uSunTint;
  uniform float uNight, uDusk, uRain, uTime;
  uniform vec2 uWindDir;
  uniform int uClipMode;

  float hash2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
  float hash3(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
  float vnoise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash2(i), hash2(i+vec2(1,0)), u.x), mix(hash2(i+vec2(0,1)), hash2(i+vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p){
    float s = 0.0, a = 0.5;
    for(int i=0;i<4;i++){ s += a*vnoise(p); p = p*2.13 + 17.7; a *= 0.5; }
    return s;
  }

  void main(){
    vec3 d = normalize(vDir);
    float h = d.y;
    vec3 sky = mix(uHorizon, uTop, pow(clamp(h, 0.0, 1.0), 0.55));
    sky = mix(sky, uHorizon * 0.7, smoothstep(0.0, -0.3, h));

    // 太阳
    float sunAmt = max(dot(d, uSunDir), 0.0);
    sky += uSunTint * pow(sunAmt, 1100.0) * 4.0 * (1.0 - uNight) * (1.0 - uRain * 0.9);
    sky += uSunTint * pow(sunAmt, 14.0) * 0.20 * (1.0 - uNight) * (1.0 - uRain * 0.8);
    // 黄昏地平线暖带
    vec2 sa = normalize(uSunDir.xz + vec2(1e-4));
    float az = max(dot(normalize(d.xz + vec2(1e-4)), sa), 0.0);
    sky += vec3(1.0, 0.42, 0.16) * pow(az, 3.0) * exp(-abs(h) * 9.0) * uDusk * 0.55 * (1.0 - uRain);

    // 月亮
    float moonAmt = max(dot(d, uMoonDir), 0.0);
    float disk = smoothstep(0.99930, 0.99965, moonAmt);
    float crater = 0.82 + 0.18 * vnoise(d.xz * 260.0);
    sky += vec3(0.92, 0.96, 1.0) * disk * crater * uNight * 1.5;
    sky += vec3(0.50, 0.60, 0.85) * pow(moonAmt, 90.0) * uNight * 0.30 * (1.0 - uRain * 0.8);

    // 星星
    vec3 cell = floor(d * 230.0);
    float star = step(0.9977, hash3(cell)) * uNight * (1.0 - uRain);
    float tw = 0.55 + 0.45 * sin(uTime * 2.4 + hash3(cell + 7.0) * 6.28);
    sky += vec3(0.85, 0.9, 1.0) * star * tw * smoothstep(0.02, 0.25, h) * 0.9;

    // 云
    vec2 cuv = d.xz / (abs(d.y) + 0.14);
    float cl = fbm(cuv * 0.62 + uWindDir * uTime * 0.006 + 31.0);
    float mask = smoothstep(0.52, 0.74, cl) * smoothstep(0.015, 0.16, h);
    vec3 cloudCol = mix(vec3(0.92, 0.95, 0.99), vec3(1.0, 0.62, 0.42), uDusk * 0.85);
    cloudCol = mix(cloudCol, vec3(0.10, 0.14, 0.22), uNight * 0.92);
    cloudCol = mix(cloudCol, vec3(0.42, 0.45, 0.5), uRain * 0.6);
    sky = mix(sky, cloudCol, mask * 0.72);

    // 下雨：压暗去饱和
    float lum = dot(sky, vec3(0.299, 0.587, 0.114));
    sky = mix(sky, vec3(lum) * vec3(0.5, 0.56, 0.62), uRain * 0.5);
    sky *= 1.0 - uRain * 0.30;

    if (uClipMode == 2 && h > 0.02) discard;
    if (uClipMode == 1 && h < -0.55) discard;

    gl_FragColor = vec4(sky, 1.0);
    #include <colorspace_fragment>
  }
`;

const SKY_VERT = /* glsl */ `
  varying vec3 vDir;
  void main(){
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export class SkySystem {
  constructor(scene) {
    this.scene = scene;
    this.uniforms = {
      uTop: U.uSkyTop, uHorizon: U.uSkyHorizon,
      uSunDir: { value: new THREE.Vector3().copy(PAL.day.sunDir).normalize() },
      uMoonDir: { value: new THREE.Vector3().copy(PAL.night.sunDir).normalize() },
      uSunTint: { value: new THREE.Color(1, 0.96, 0.88) },
      uNight: U.uNight, uDusk: U.uDusk, uRain: U.uRain, uTime: U.uTime,
      uWindDir: U.uWindDir, uClipMode: U.uClipMode
    };
    this.mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      side: THREE.BackSide,
      depthWrite: false
    });
    this.mesh = new THREE.Mesh(new THREE.SphereGeometry(190, 40, 24), this.mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = -10;
    scene.add(this.mesh);

    this.sun = new THREE.DirectionalLight(0xfff2dc, 2.7);
    this.hemi = new THREE.HemisphereLight(0x9db8c8, 0x5a6a48, 0.9);
    scene.add(this.sun, this.hemi);

    scene.fog = new THREE.FogExp2(0xb9d6e2, 0.013);

    this.tmp = { dir: new THREE.Vector3(), col: new THREE.Color(), deep: new THREE.Color(), absorb: new THREE.Vector3() };
  }

  update(dt, camera) {
    const w = state.weights;
    // 平滑过渡到目标时段
    const target = { day: 0, dusk: 0, night: 0 };
    target[state.time] = 1;
    const speed = Math.min(1, dt * 1.6);
    for (const k of ['day', 'dusk', 'night']) w[k] += (target[k] - w[k]) * speed;
    const s = w.day + w.dusk + w.night;
    for (const k of ['day', 'dusk', 'night']) w[k] /= s;

    const mix = (a, b, c) => a * w.day + b * w.dusk + c * w.night;
    const t = this.tmp;

    // 光方向：黄昏太阳低垂，夜晚切到月亮
    t.dir.set(0, 0, 0)
      .addScaledVector(PAL.day.sunDir, w.day)
      .addScaledVector(PAL.dusk.sunDir, w.dusk)
      .addScaledVector(PAL.night.sunDir, w.night)
      .normalize();
    U.uSunDir.value.copy(t.dir);
    U.uLightDir.value.copy(t.dir);

    U.uNight.value = w.night;
    U.uDusk.value = w.dusk;

    const lightI = mix(PAL.day.lightIntensity, PAL.dusk.lightIntensity, PAL.night.lightIntensity);
    const rainDim = 1 - state.rain * 0.55;
    t.col.setHex(PAL.day.lightColor).lerp(new THREE.Color(PAL.dusk.lightColor), w.dusk).lerp(new THREE.Color(PAL.night.lightColor), w.night);
    U.uLightColor.value.copy(t.col);
    this.sun.color.copy(t.col);
    this.sun.intensity = lightI * rainDim;
    this.sun.position.copy(t.dir).multiplyScalar(60);

    this.hemi.color.setHex(PAL.day.hemiSky).lerp(new THREE.Color(PAL.dusk.hemiSky), w.dusk).lerp(new THREE.Color(PAL.night.hemiSky), w.night);
    this.hemi.groundColor.setHex(PAL.day.hemiGround).lerp(new THREE.Color(PAL.dusk.hemiGround), w.dusk).lerp(new THREE.Color(PAL.night.hemiGround), w.night);
    this.hemi.intensity = mix(PAL.day.hemiIntensity, PAL.dusk.hemiIntensity, PAL.night.hemiIntensity) * rainDim;

    // 水体颜色 / 吸收
    U.uDeepColor.value.setHex(PAL.day.deep).lerp(new THREE.Color(PAL.dusk.deep), w.dusk).lerp(new THREE.Color(PAL.night.deep), w.night);
    U.uAbsorb.value.set(
      mix(PAL.day.absorb.x, PAL.dusk.absorb.x, PAL.night.absorb.x),
      mix(PAL.day.absorb.y, PAL.dusk.absorb.y, PAL.night.absorb.y),
      mix(PAL.day.absorb.z, PAL.dusk.absorb.z, PAL.night.absorb.z)
    );

    // 天空 / 雾
    U.uSkyTop.value.setHex(PAL.day.top).lerp(new THREE.Color(PAL.dusk.top), w.dusk).lerp(new THREE.Color(PAL.night.top), w.night);
    U.uSkyHorizon.value.setHex(PAL.day.horizon).lerp(new THREE.Color(PAL.dusk.horizon), w.dusk).lerp(new THREE.Color(PAL.night.horizon), w.night);
    this.uniforms.uSunTint.value.setHex(PAL.day.sunColor).lerp(new THREE.Color(PAL.dusk.sunColor), w.dusk).lerp(new THREE.Color(PAL.night.sunColor), w.night);
    U.uFogColor.value.setHex(PAL.day.fog).lerp(new THREE.Color(PAL.dusk.fog), w.dusk).lerp(new THREE.Color(PAL.night.fog), w.night);
    U.uFogDensity.value = mix(PAL.day.fogDensity, PAL.dusk.fogDensity, PAL.night.fogDensity) * (1 + state.rain * 0.5);
    this.scene.fog.color.copy(U.uFogColor.value);
    this.scene.fog.density = U.uFogDensity.value;

    // 太阳 / 月亮盘方向
    this.uniforms.uSunDir.value.copy(t.dir);
    this.uniforms.uMoonDir.value.copy(PAL.night.sunDir).normalize();
  }

  // 焦散/高光强度系数（白天强，夜晚弱）
  get sunAltitude() {
    const w = state.weights;
    return w.day * 1.0 + w.dusk * 0.45 + w.night * 0.12;
  }
}
