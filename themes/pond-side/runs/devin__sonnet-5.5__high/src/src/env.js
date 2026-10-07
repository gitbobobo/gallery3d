import * as THREE from 'three';
import { G, clamp, lerp } from './shared.js';
import { NOISE_GLSL } from './materials.js';

const C = (h) => new THREE.Color(h);
const V = (x, y, z) => new THREE.Vector3(x, y, z).normalize();

export const PRESETS = {
  day: {
    sunPos: V(0.5, 0.74, -0.2), moonPos: V(-0.4, -0.5, 0.6),
    lightDir: V(0.5, 0.74, -0.2), lightColor: C('#fff0d8'), lightInt: 3.4,
    hemiSky: C('#9cc4ff'), hemiGround: C('#52602f'), hemiInt: 1.35,
    zenith: C('#2f6cc4'), horizon: C('#b4d3ea'), sunI: 1, moonI: 0, stars: 0,
    cloudLit: C('#ffffff'), cloudSh: C('#a7b8cf'), cloud: 0.45,
    fog: C('#b3cfe4'), fogD: 0.017, exposure: 0.95,
    scatter: C('#3c8566'), scatterK: 0.13, caustic: 1, flies: 0, lantern: 0, sunCol: C('#fff2da'),
  },
  dusk: {
    sunPos: V(-0.45, 0.17, -0.88), moonPos: V(0.6, 0.55, 0.4),
    lightDir: V(-0.45, 0.17, -0.88), lightColor: C('#ff9d52'), lightInt: 3.4,
    hemiSky: C('#9a90d0'), hemiGround: C('#5a4030'), hemiInt: 1.5,
    zenith: C('#2c3f86'), horizon: C('#ff9a5e'), sunI: 1, moonI: 0.25, stars: 0.12,
    cloudLit: C('#ffb08a'), cloudSh: C('#6c5c8c'), cloud: 0.6,
    fog: C('#d98c68'), fogD: 0.026, exposure: 1.1,
    scatter: C('#4a5a62'), scatterK: 0.05, caustic: 0.3, flies: 0.45, lantern: 0.6, sunCol: C('#ff8a3a'),
  },
  night: {
    sunPos: V(0.3, -0.5, 0.8), moonPos: V(-0.28, 0.4, -0.87),
    lightDir: V(-0.28, 0.4, -0.87), lightColor: C('#a5bdff'), lightInt: 0.8,
    hemiSky: C('#3a4f92'), hemiGround: C('#141a26'), hemiInt: 0.65,
    zenith: C('#050c24'), horizon: C('#15264a'), sunI: 0, moonI: 1, stars: 1,
    cloudLit: C('#44557e'), cloudSh: C('#0e1630'), cloud: 0.3,
    fog: C('#0c1730'), fogD: 0.026, exposure: 1.25,
    scatter: C('#2a4a66'), scatterK: 0.012, caustic: 0.1, flies: 1, lantern: 1, sunCol: C('#ffffff'),
  },
};

const NUM = ['lightInt', 'hemiInt', 'sunI', 'moonI', 'stars', 'cloud', 'fogD', 'exposure', 'scatterK', 'caustic', 'flies', 'lantern'];
const COL = ['lightColor', 'hemiSky', 'hemiGround', 'zenith', 'horizon', 'cloudLit', 'cloudSh', 'fog', 'scatter', 'sunCol'];
const VEC = ['sunPos', 'moonPos', 'lightDir'];

export class Env {
  constructor(scene, renderer) {
    this.scene = scene; this.renderer = renderer;
    this.name = 'day';
    this.cur = {};
    for (const k of NUM) this.cur[k] = PRESETS.day[k];
    for (const k of COL) this.cur[k] = PRESETS.day[k].clone();
    for (const k of VEC) this.cur[k] = PRESETS.day[k].clone();
    this.target = PRESETS.day;
    this.rain = 0; this.rainTarget = 0;
    this.out = { brightness: 1, flies: 0, lantern: 0, lightInt: 1 };

    this.sun = new THREE.DirectionalLight(0xffffff, 3);
    this.sun.castShadow = true;
    const sc = this.sun.shadow.camera;
    sc.left = -11; sc.right = 11; sc.top = 11; sc.bottom = -11; sc.near = 1; sc.far = 80;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.bias = -0.0003; this.sun.shadow.normalBias = 0.035;
    this.sun.shadow.radius = 2.5;
    scene.add(this.sun, this.sun.target);
    this.hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    scene.add(this.hemi);
    scene.fog = new THREE.FogExp2(0xb3cfe4, 0.0065);

    this.skyU = {
      uSunPos: { value: new THREE.Vector3() }, uMoonPos: { value: new THREE.Vector3() },
      uZenith: { value: new THREE.Color() }, uHorizon: { value: new THREE.Color() }, uSunCol: { value: new THREE.Color() },
      uCloudLit: { value: new THREE.Color() }, uCloudSh: { value: new THREE.Color() },
      uSunI: { value: 1 }, uMoonI: { value: 0 }, uStars: { value: 0 }, uCloud: { value: 0.5 }, uRain: G.uRain,
      uTime: G.uTime, uWindDir: G.uWindDir,
    };
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(450, 48, 24), new THREE.ShaderMaterial({
      uniforms: this.skyU, side: THREE.BackSide, depthWrite: false, fog: false,
      vertexShader: `varying vec3 vWP; void main(){ vec4 w = modelMatrix*vec4(position,1.0); vWP = w.xyz; gl_Position = projectionMatrix*viewMatrix*w; }`,
      fragmentShader: /* glsl */ `
        varying vec3 vWP;
        uniform vec3 uSunPos, uMoonPos, uZenith, uHorizon, uSunCol, uCloudLit, uCloudSh;
        uniform float uSunI, uMoonI, uStars, uCloud, uRain, uTime; uniform vec2 uWindDir;
        ${NOISE_GLSL}
        float h31(vec3 p){ p = fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
        void main(){
          vec3 d = normalize(vWP - cameraPosition);
          float y = d.y;
          float t = pow(clamp(y, 0.0, 1.0), 0.5);
          vec3 col = mix(uHorizon, uZenith, t);
          col = mix(col, uHorizon*0.55, smoothstep(0.0, -0.25, y));
          float sd = max(dot(d, uSunPos), 0.0);
          col += uSunCol * uSunI * (0.18*pow(sd, 5.0) + 0.5*pow(sd, 48.0));
          col += uSunCol * uSunI * 40.0 * smoothstep(0.99992, 0.99997, sd) * (1.0 - uRain);
          float md = dot(d, uMoonPos);
          if (md > 0.9) {
            vec3 mt = normalize(cross(uMoonPos, vec3(0.0,1.0,0.0)));
            vec3 mb = cross(mt, uMoonPos);
            vec2 mp = vec2(dot(d, mt), dot(d, mb)) * 60.0;
            float disc = smoothstep(0.99955, 0.99972, md);
            float tex = 0.8 + 0.28*fbm(mp*3.0+3.0) - 0.2*smoothstep(0.55,0.7,fbm(mp*2.0+9.0));
            col += vec3(0.9,0.93,1.0) * tex * disc * 7.0 * uMoonI * (1.0-uRain*0.8);
            col += vec3(0.5,0.6,0.9) * uMoonI * (0.06*pow(max(md,0.0), 60.0) + 0.4*pow(max(md,0.0), 900.0));
          }
          if (uStars > 0.01 && y > 0.0) {
            vec3 sp = d * 150.0; vec3 ip = floor(sp); vec3 fp = fract(sp) - 0.5;
            float hh = h31(ip);
            vec3 off = (vec3(h31(ip+1.7), h31(ip+3.1), h31(ip+5.3)) - 0.5) * 0.6;
            float st = step(0.985, hh) * smoothstep(0.22, 0.0, length(fp - off));
            st *= 0.6 + 0.4*sin(uTime*2.0 + hh*80.0);
            col += vec3(0.85,0.9,1.0) * st * 2.2 * uStars * smoothstep(0.0, 0.2, y) * (1.0-uRain) * (1.0 - uCloud*0.5);
          }
          if (y > -0.02) {
            vec2 p = d.xz / (max(y, 0.0) + 0.18) * 0.55 + uWindDir * uTime * 0.012;
            float cover = mix(0.66, 0.28, uCloud);
            float n = fbm(p*1.2) * 0.75 + fbm(p*3.4+7.0)*0.25;
            float dens = smoothstep(cover, cover + 0.22, n);
            float lit = smoothstep(0.35, 0.7, fbm(p*1.2 + uSunPos.xz*0.15 + 3.0));
            vec3 cc = mix(uCloudSh, uCloudLit, lit);
            cc += uSunCol * uSunI * 0.35 * pow(sd, 8.0) * (1.0 - dens*0.5);
            col = mix(col, cc, dens * smoothstep(-0.02, 0.18, y) * 0.92);
          }
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    }));
    this.sky.frustumCulled = false; this.sky.renderOrder = -10;
    scene.add(this.sky);
    this.apply(1);
  }

  set(name) { this.name = name; this.target = PRESETS[name]; }
  setRain(on) { this.rainTarget = on ? 1 : 0; }

  apply(k) {
    const T = this.target, c = this.cur;
    for (const n of NUM) c[n] = lerp(c[n], T[n], k);
    for (const n of COL) c[n].lerp(T[n], k);
    for (const n of VEC) c[n].lerp(T[n], k).normalize();
  }

  update(dt, camera) {
    this.apply(1 - Math.exp(-dt * 1.6));
    this.rain += (this.rainTarget - this.rain) * (1 - Math.exp(-dt * 0.9));
    const R = this.rain, c = this.cur;
    G.uRain.value = R;
    const gray = new THREE.Color(0.42, 0.46, 0.5);
    const lum = clamp(c.hemiInt * 0.5 + c.lightInt * 0.12, 0.05, 1.2);
    const mix = (col, a) => col.clone().lerp(gray.clone().multiplyScalar(lum * 0.55 + 0.05 * (c.sunI)), a);
    const ld = c.lightDir.clone();
    ld.y = Math.max(ld.y, 0.14); ld.normalize();
    this.sun.color.copy(c.lightColor);
    this.sun.intensity = c.lightInt * (1 - 0.82 * R);
    this.sun.position.copy(ld).multiplyScalar(40);
    this.sun.target.position.set(0, 0, 0);
    this.sun.shadow.intensity = 1 - 0.8 * R;
    this.hemi.color.copy(c.hemiSky); this.hemi.groundColor.copy(c.hemiGround);
    this.hemi.intensity = c.hemiInt * (1 - 0.25 * R) + 0.15 * R * (1 - c.stars);
    this.scene.fog.color.copy(mix(c.fog, 0.55 * R));
    this.scene.fog.density = c.fogD * (1 + 1.1 * R);
    this.renderer.toneMappingExposure = c.exposure * (1 + 0.12 * R * (1 - c.stars));

    const u = this.skyU;
    u.uSunPos.value.copy(c.sunPos); u.uMoonPos.value.copy(c.moonPos);
    u.uZenith.value.copy(mix(c.zenith, 0.6 * R)); u.uHorizon.value.copy(mix(c.horizon, 0.55 * R));
    u.uSunCol.value.copy(c.sunCol);
    u.uCloudLit.value.copy(mix(c.cloudLit, 0.5 * R)); u.uCloudSh.value.copy(mix(c.cloudSh, 0.6 * R));
    u.uSunI.value = c.sunI; u.uMoonI.value = c.moonI; u.uStars.value = c.stars;
    u.uCloud.value = lerp(c.cloud, 1, R);

    G.uSunDir.value.copy(ld);
    const sunRad = c.lightColor.clone().multiplyScalar(c.lightInt * (1 - 0.82 * R));
    G.uSunRad.value.set(sunRad.r, sunRad.g, sunRad.b);
    const sc = c.scatter.clone().multiplyScalar(c.scatterK * 5.0 * (1 - 0.35 * R) + 0.0);
    G.uScatter.value.set(sc.r, sc.g, sc.b);
    const elev = clamp((ld.y - 0.1) / 0.5, 0, 1);
    G.uCaustic.value = c.caustic * (1 - R * 0.9) * (0.3 + 0.7 * elev);
    this.out.flies = c.flies * (1 - 0.7 * R);
    this.out.lantern = c.lantern;
    this.out.lightInt = this.sun.intensity;
    this.out.brightness = clamp(0.12 + c.hemiInt * 0.5 + this.sun.intensity * 0.2, 0.1, 2);
    this.out.stars = c.stars;
    this.out.fogColor = this.scene.fog.color;
    this.out.skyAmb = u.uHorizon.value;
    this.out.zenith = u.uZenith.value;
    this.out.moon = c.moonI; this.out.sunI = c.sunI;
    this.out.lightDir = ld; this.out.lightColor = sunRad;
    this.out.elev = ld.y;
    this.sky.position.set(camera.position.x, 0, camera.position.z);
  }
}
