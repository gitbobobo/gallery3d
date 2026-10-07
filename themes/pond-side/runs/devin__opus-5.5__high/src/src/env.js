import * as THREE from 'three';
import { GLSL_NOISE, LAYER, setLayers } from './shared.js';
import { LOW_END } from './pond.js';

const D2R = Math.PI / 180;
const dirFrom = (azDeg, elDeg) => {
  const a = azDeg * D2R, e = elDeg * D2R;
  return new THREE.Vector3(Math.cos(e) * Math.cos(a), Math.sin(e), Math.cos(e) * Math.sin(a));
};
const C = (r, g, b) => new THREE.Color(r, g, b);

const KEYS = [
  {
    // day
    light: dirFrom(-112, 52),
    lightCol: C(1.0, 0.95, 0.87),
    lightI: 3.1,
    hemiSky: C(0.5, 0.63, 0.82),
    hemiGround: C(0.3, 0.28, 0.2),
    hemiI: 1.25,
    zenith: C(0.16, 0.36, 0.78),
    horizon: C(0.66, 0.78, 0.9),
    ground: C(0.32, 0.36, 0.33),
    fog: C(0.62, 0.72, 0.8),
    fogD: 0.017,
    exposure: 0.78,
    sunVis: 1,
    moonVis: 0,
    stars: 0,
    cloudLit: C(1.0, 0.98, 0.95),
    cloudShade: C(0.62, 0.68, 0.78),
    sunGlow: C(1.0, 0.9, 0.75),
    scatter: C(0.042, 0.072, 0.05),
  },
  {
    // dusk
    light: dirFrom(-124, 9),
    lightCol: C(1.0, 0.5, 0.2),
    lightI: 2.3,
    hemiSky: C(0.45, 0.4, 0.55),
    hemiGround: C(0.28, 0.18, 0.13),
    hemiI: 0.7,
    zenith: C(0.12, 0.15, 0.36),
    horizon: C(1.0, 0.52, 0.26),
    ground: C(0.22, 0.16, 0.14),
    fog: C(0.72, 0.48, 0.36),
    fogD: 0.013,
    exposure: 0.95,
    sunVis: 1,
    moonVis: 0.15,
    stars: 0.08,
    cloudLit: C(1.0, 0.55, 0.35),
    cloudShade: C(0.32, 0.22, 0.32),
    sunGlow: C(1.0, 0.45, 0.15),
    scatter: C(0.04, 0.05, 0.045),
  },
  {
    // night
    light: dirFrom(-130, 24),
    lightCol: C(0.6, 0.7, 1.0),
    lightI: 0.55,
    hemiSky: C(0.11, 0.15, 0.3),
    hemiGround: C(0.03, 0.03, 0.04),
    hemiI: 0.42,
    zenith: C(0.006, 0.01, 0.03),
    horizon: C(0.035, 0.05, 0.1),
    ground: C(0.02, 0.025, 0.03),
    fog: C(0.03, 0.045, 0.08),
    fogD: 0.014,
    exposure: 1.35,
    sunVis: 0,
    moonVis: 1,
    stars: 1,
    cloudLit: C(0.2, 0.24, 0.34),
    cloudShade: C(0.03, 0.04, 0.07),
    sunGlow: C(0.0, 0.0, 0.0),
    scatter: C(0.006, 0.01, 0.014),
  },
];

const RAIN = {
  zenith: C(0.3, 0.33, 0.36),
  horizon: C(0.46, 0.49, 0.52),
  fog: C(0.42, 0.45, 0.48),
  cloud: C(0.5, 0.53, 0.56),
};

export class Environment {
  constructor(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;
    this.timeTarget = 0;
    this.timeCur = 0;
    this.rainTarget = 0;
    this.rainCur = 0;

    this.sun = new THREE.DirectionalLight(0xffffff, 3);
    this.sun.castShadow = true;
    const sm = LOW_END ? 1024 : 2048;
    this.sun.shadow.mapSize.set(sm, sm);
    const sc = this.sun.shadow.camera;
    sc.left = -17; sc.right = 17; sc.top = 17; sc.bottom = -17;
    sc.near = 1; sc.far = 80;
    this.sun.shadow.bias = -0.0004;
    this.sun.shadow.normalBias = 0.03;
    this.sun.target.position.set(-1, 0, -1);
    scene.add(this.sun, this.sun.target);

    this.hemi = new THREE.HemisphereLight(0xffffff, 0x333322, 1);
    scene.add(this.hemi);
    // lights must be visible to the reflection / refraction cameras' layers too
    this.sun.layers.enableAll();
    this.hemi.layers.enableAll();
    scene.fog = new THREE.FogExp2(0x9fb4c8, 0.012);

    this.moonDir = KEYS[2].light.clone();
    this.sunDir = KEYS[0].light.clone();

    this.lightDir = new THREE.Vector3();
    this.lightColor = new THREE.Color();
    this.skyAmb = new THREE.Color();
    this.horizon = new THREE.Color();
    this.zenith = new THREE.Color();
    this.scatter = new THREE.Color();
    this.night = 0;
    this.dusk = 0;

    this.skyUniforms = {
      uZenith: { value: new THREE.Color() },
      uHorizon: { value: new THREE.Color() },
      uGround: { value: new THREE.Color() },
      uSunDir: { value: new THREE.Vector3() },
      uSunVis: { value: 1 },
      uSunGlow: { value: new THREE.Color() },
      uMoonDir: { value: new THREE.Vector3() },
      uMoonVis: { value: 0 },
      uStars: { value: 0 },
      uCloudLit: { value: new THREE.Color() },
      uCloudShade: { value: new THREE.Color() },
      uCover: { value: 0.35 },
      uRain: { value: 0 },
      uTime: { value: 0 },
      uDisk: { value: 1 },
    };
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(200, 48, 24),
      new THREE.ShaderMaterial({
        uniforms: this.skyUniforms,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        vertexShader: /* glsl */ `
          varying vec3 vDir;
          void main(){
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vDir = wp.xyz - cameraPosition;
            gl_Position = projectionMatrix * viewMatrix * wp;
            gl_Position.z = gl_Position.w * 0.99999;
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vDir;
          uniform vec3 uZenith, uHorizon, uGround, uSunDir, uSunGlow, uMoonDir, uCloudLit, uCloudShade;
          uniform float uSunVis, uMoonVis, uStars, uCover, uRain, uTime, uDisk;
          ${GLSL_NOISE}
          void main(){
            vec3 d = normalize(vDir);
            float y = d.y;
            vec3 col = mix(uHorizon, uZenith, pow(clamp(y, 0.0, 1.0), 0.55));
            col = mix(col, uGround, smoothstep(0.0, -0.12, y));
            float sd = max(dot(d, uSunDir), 0.0);
            col += uSunGlow * (pow(sd, 6.0) * 0.45 + pow(sd, 48.0) * 0.8) * uSunVis * (1.0 - uRain * 0.85);
            float horizonGlow = exp(-abs(y) * 9.0);
            col += uSunGlow * horizonGlow * pow(sd, 2.0) * 0.35 * uSunVis * (1.0 - uRain);
            // stars
            if (uStars > 0.0 && y > 0.0) {
              vec2 sp = d.xz / (y + 0.35) * 140.0;
              vec2 cell = floor(sp);
              vec2 f = fract(sp);
              float s = h12(cell);
              vec2 c = h22(cell) * 0.6 + 0.2;
              float dd = length(f - c);
              float tw = 0.65 + 0.35 * sin(uTime * (1.5 + s * 3.0) + s * 50.0);
              float star = step(0.93, s) * smoothstep(0.12, 0.0, dd) * tw * smoothstep(0.02, 0.3, y);
              star *= 0.5 + 2.5 * step(0.99, s);
              col += vec3(0.8, 0.86, 1.0) * star * uStars * (1.0 - uRain);
            }
            // moon
            float md = dot(d, uMoonDir);
            float mdisk = smoothstep(0.99975, 0.99982, md);
            vec3 mcol = vec3(1.0, 0.97, 0.88) * (0.8 + 0.25 * vnoise(d.xz * 900.0));
            col += mcol * mdisk * 7.0 * uMoonVis * (1.0 - uRain * 0.9) * mix(0.12, 1.0, uDisk);
            col += vec3(0.5, 0.6, 0.85) * (pow(max(md, 0.0), 400.0) * 0.5 + pow(max(md, 0.0), 40.0) * 0.08) * uMoonVis * (1.0 - uRain * 0.7);
            // sun disk
            col += vec3(1.0, 0.92, 0.8) * smoothstep(0.99985, 0.99992, sd) * 40.0 * uSunVis * (1.0 - uRain) * uDisk;
            // clouds
            if (y > -0.02) {
              vec2 cp = d.xz / (max(y, 0.0) + 0.09);
              cp = cp * 0.55 + vec2(uTime * 0.012, uTime * 0.004);
              float n = fbm5(cp);
              float cover = mix(uCover, 0.95, uRain);
              float c = smoothstep(1.0 - cover, 1.0 - cover + 0.32, n);
              float shade = smoothstep(0.3, 0.9, fbm3(cp * 2.0 + 3.1));
              vec3 cc = mix(uCloudLit, uCloudShade, shade * 0.75 + uRain * 0.4);
              cc += uSunGlow * pow(sd, 8.0) * 0.6 * uSunVis * (1.0 - uRain);
              float fade = smoothstep(-0.02, 0.12, y);
              col = mix(col, cc, c * fade * 0.92);
            }
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      })
    );
    sky.frustumCulled = false;
    sky.renderOrder = -10;
    sky.onBeforeRender = (r, s, cam) => {
      sky.position.copy(cam.position);
      sky.updateMatrixWorld();
      // the sun's mirror image is drawn analytically by the water shader
      this.skyUniforms.uDisk.value = cam.layers.isEnabled(LAYER.REFL) && !cam.layers.isEnabled(LAYER.MAIN) ? 0 : 1;
    };
    setLayers(sky, LAYER.MAIN, LAYER.REFL, LAYER.REFR);
    scene.add(sky);
    this.sky = sky;
    this.update(0, true);
  }

  setTime(i) {
    this.timeTarget = i;
  }
  setRain(on) {
    this.rainTarget = on ? 1 : 0;
  }

  update(dt, snap = false) {
    const k = snap ? 1 : 1 - Math.exp(-dt * 1.4);
    this.timeCur += (this.timeTarget - this.timeCur) * k;
    if (Math.abs(this.timeTarget - this.timeCur) < 0.001) this.timeCur = this.timeTarget;
    const kr = snap ? 1 : 1 - Math.exp(-dt * 0.9);
    this.rainCur += (this.rainTarget - this.rainCur) * kr;
    const t = this.timeCur;
    const i0 = Math.min(Math.floor(t), 1);
    const f = t - i0;
    const s = f * f * (3 - 2 * f);
    const A = KEYS[i0], B = KEYS[i0 + 1];
    const lc = (a, b) => new THREE.Color().copy(a).lerp(b, s);
    const ln = (a, b) => a + (b - a) * s;
    const r = this.rainCur;
    this.rain = r;

    this.night = Math.max(0, t - 1);
    this.dusk = 1 - Math.abs(t - 1);

    // light direction: sun until mid-dusk→night, then moon
    if (i0 === 0) this.lightDir.copy(A.light).lerp(B.light, s).normalize();
    else {
      const sw = Math.min(1, s * 1.6);
      this.lightDir.copy(A.light).lerp(B.light, sw * sw * (3 - 2 * sw)).normalize();
    }
    const lightI = ln(A.lightI, B.lightI) * (1 - r * 0.85);
    const lightCol = lc(A.lightCol, B.lightCol);
    const grey = (c, amt) => {
      const l = c.r * 0.3 + c.g * 0.55 + c.b * 0.15;
      return c.lerp(new THREE.Color(l, l, l * 1.05), amt);
    };
    grey(lightCol, r * 0.6);
    this.sun.color.copy(lightCol);
    this.sun.intensity = lightI;
    this.lightColor.copy(lightCol).multiplyScalar(lightI);
    this.sun.position.copy(this.lightDir).multiplyScalar(40).add(this.sun.target.position);

    const hs = grey(lc(A.hemiSky, B.hemiSky), r * 0.7);
    const hg = lc(A.hemiGround, B.hemiGround);
    this.hemi.color.copy(hs);
    this.hemi.groundColor.copy(hg);
    this.hemi.intensity = ln(A.hemiI, B.hemiI) * (1 - r * 0.4);
    this.skyAmb.copy(hs).multiplyScalar(this.hemi.intensity);

    const dark = 1 - this.night * 0.9;
    const z = lc(A.zenith, B.zenith).lerp(RAIN.zenith.clone().multiplyScalar(dark * (1 - this.dusk * 0.35)), r * 0.85);
    const h = lc(A.horizon, B.horizon).lerp(RAIN.horizon.clone().multiplyScalar(dark * (1 - this.dusk * 0.3)), r * 0.85);
    this.zenith.copy(z);
    this.horizon.copy(h);
    const su = this.skyUniforms;
    su.uZenith.value.copy(z);
    su.uHorizon.value.copy(h);
    su.uGround.value.copy(lc(A.ground, B.ground));
    this.sunDir.copy(A.light).lerp(B.light, i0 === 0 ? s : 0).normalize();
    if (i0 === 1) this.sunDir.copy(KEYS[1].light).lerp(dirFrom(-124, -12), s).normalize();
    su.uSunDir.value.copy(this.sunDir);
    su.uSunVis.value = ln(A.sunVis, B.sunVis);
    su.uSunGlow.value.copy(lc(A.sunGlow, B.sunGlow));
    su.uMoonDir.value.copy(this.moonDir);
    su.uMoonVis.value = ln(A.moonVis, B.moonVis);
    su.uStars.value = ln(A.stars, B.stars);
    su.uCloudLit.value.copy(lc(A.cloudLit, B.cloudLit)).lerp(RAIN.cloud.clone().multiplyScalar(dark), r * 0.8);
    su.uCloudShade.value.copy(lc(A.cloudShade, B.cloudShade)).lerp(RAIN.cloud.clone().multiplyScalar(dark * 0.55), r * 0.8);
    su.uRain.value = r;

    const fogC = lc(A.fog, B.fog).lerp(RAIN.fog.clone().multiplyScalar(dark * (1 - this.dusk * 0.3)), r * 0.85);
    this.scene.fog.color.copy(fogC);
    this.scene.fog.density = ln(A.fogD, B.fogD) * (1 + r * 1.8);
    this.renderer.toneMappingExposure = ln(A.exposure, B.exposure) * (1 - r * 0.12);
    this.scatter.copy(lc(A.scatter, B.scatter)).multiplyScalar(1 - r * 0.4);
  }
}
