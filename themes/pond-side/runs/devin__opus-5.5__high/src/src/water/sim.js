import * as THREE from 'three';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';
import { SIM_HALF, SIM_RES, CELL, heightAt, PILINGS } from '../pond.js';

const MAX_DROPS = 32;

function makeRT(size, extra = {}) {
  return new THREE.WebGLRenderTarget(size, size, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: false,
    generateMipmaps: false,
    ...extra,
  });
}

/** Builds a half-float texture: R = water mask, G = bed height */
export function buildBedTexture() {
  const N = SIM_RES;
  const data = new Uint16Array(N * N * 4);
  const maskArr = new Float32Array(N * N);
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const x = -SIM_HALF + (i + 0.5) * CELL;
      const z = -SIM_HALF + (j + 0.5) * CELL;
      const h = heightAt(x, z);
      let m = h < -0.015 ? 1 : 0;
      for (const p of PILINGS) {
        if (Math.hypot(x - p.x, z - p.z) < p.r + CELL * 0.35) m = 0;
      }
      maskArr[j * N + i] = m;
      const o = (j * N + i) * 4;
      data[o] = THREE.DataUtils.toHalfFloat(m);
      data[o + 1] = THREE.DataUtils.toHalfFloat(h);
      data[o + 2] = 0;
      data[o + 3] = THREE.DataUtils.toHalfFloat(1);
    }
  }
  const tex = new THREE.DataTexture(data, N, N, THREE.RGBAFormat, THREE.HalfFloatType);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return { tex, maskArr };
}

const quadVS = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

export class WaterSim {
  constructor(renderer, bedTex) {
    this.renderer = renderer;
    this.a = makeRT(SIM_RES);
    this.b = makeRT(SIM_RES);
    this.drops = [];
    this.acc = 0;
    this.dropArr = Array.from({ length: MAX_DROPS }, () => new THREE.Vector4());
    this.mat = new THREE.ShaderMaterial({
      uniforms: {
        uState: { value: null },
        uBed: { value: bedTex },
        uTexel: { value: 1 / SIM_RES },
        uC2: { value: 0.075 * Math.pow(SIM_RES / 256, 2) },
        uDamp: { value: 0.9965 },
        uDrops: { value: this.dropArr },
        uCount: { value: 0 },
      },
      vertexShader: quadVS,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D uState;
        uniform sampler2D uBed;
        uniform float uTexel, uC2, uDamp;
        uniform vec4 uDrops[${MAX_DROPS}];
        uniform int uCount;
        float nb(vec2 uv, float h){
          float m = texture2D(uBed, uv).r;
          return m > 0.5 ? texture2D(uState, uv).r : h;
        }
        void main(){
          vec4 bed = texture2D(uBed, vUv);
          if (bed.r < 0.5) { gl_FragColor = vec4(0.0); return; }
          vec4 s = texture2D(uState, vUv);
          float h = s.r;
          float sum = nb(vUv + vec2(uTexel, 0.0), h) + nb(vUv - vec2(uTexel, 0.0), h)
                    + nb(vUv + vec2(0.0, uTexel), h) + nb(vUv - vec2(0.0, uTexel), h);
          float diag = nb(vUv + vec2(uTexel, uTexel), h) + nb(vUv - vec2(uTexel, uTexel), h)
                     + nb(vUv + vec2(uTexel, -uTexel), h) + nb(vUv + vec2(-uTexel, uTexel), h);
          float lap = (sum * 4.0 + diag - 20.0 * h) / 6.0;
          float depth = -bed.g;
          float c2 = uC2 * mix(0.45, 1.0, smoothstep(0.0, 0.35, depth));
          float v = s.g + lap * c2;
          v *= uDamp;
          h += v;
          h *= 0.9993;
          for (int i = 0; i < ${MAX_DROPS}; i++) {
            if (i >= uCount) break;
            vec4 d = uDrops[i];
            float dist = length((vUv - d.xy) / uTexel) / d.z;
            if (dist < 1.0) {
              // oscillating profile seeds a train of rings, mimicking capillary dispersion
              float k = (0.5 + 0.5 * cos(dist * 3.14159265)) * cos(dist * 7.5);
              h += d.w * k;
            }
          }
          gl_FragColor = vec4(h, v, 0.0, 1.0);
        }
      `,
    });
    this.quad = new FullScreenQuad(this.mat);
    this.clear();
  }

  clear() {
    const r = this.renderer;
    const prev = r.getRenderTarget();
    const cc = r.getClearColor(new THREE.Color());
    const ca = r.getClearAlpha();
    r.setClearColor(0x000000, 0);
    for (const t of [this.a, this.b]) {
      r.setRenderTarget(t);
      r.clear(true, false, false);
    }
    r.setClearColor(cc, ca);
    r.setRenderTarget(prev);
  }

  get texture() {
    return this.a.texture;
  }

  /** world coords; radius in meters; strength in meters of height */
  addDrop(x, z, radius, strength) {
    if (Math.abs(x) > SIM_HALF || Math.abs(z) > SIM_HALF) return;
    // the grid can't resolve centimetre ripples, so impulses are boosted to give comparable slopes
    this.drops.push([x, z, radius, strength * 3]);
  }

  step(dt) {
    this.acc = Math.min(this.acc + dt, 4 / 60);
    const STEP = 1 / 60;
    let n = 0;
    while (this.acc >= STEP && n < 4) {
      this.acc -= STEP;
      n++;
      this._step();
    }
  }

  _step() {
    const r = this.renderer;
    const count = Math.min(this.drops.length, MAX_DROPS);
    for (let i = 0; i < count; i++) {
      const [x, z, rad, s] = this.drops[i];
      this.dropArr[i].set(
        (x + SIM_HALF) / (2 * SIM_HALF),
        (z + SIM_HALF) / (2 * SIM_HALF),
        Math.max(rad / CELL, 1.6),
        s
      );
    }
    this.drops.splice(0, count);
    this.mat.uniforms.uCount.value = count;
    this.mat.uniforms.uState.value = this.a.texture;
    r.setRenderTarget(this.b);
    this.quad.render(r);
    [this.a, this.b] = [this.b, this.a];
  }
}

/* -------- wind wave tile -------- */
const NW = 40;
export class WindWaves {
  constructor(renderer, L = 5) {
    this.renderer = renderer;
    this.L = L;
    this.rt = makeRT(256, {
      wrapS: THREE.RepeatWrapping,
      wrapT: THREE.RepeatWrapping,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
    });
    this.rt.texture.wrapS = this.rt.texture.wrapT = THREE.RepeatWrapping;
    this.k = Array.from({ length: NW }, () => new THREE.Vector4());
    this.p = Array.from({ length: NW }, () => new THREE.Vector2());
    this.base = [];
    const seen = new Set();
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const windAng = Math.atan2(0.3, 0.9);
    let tries = 0;
    while (this.base.length < NW && tries < 5000) {
      tries++;
      const t = this.base.length / NW;
      const lambda = 0.07 * Math.pow(1.3 / 0.07, 1 - t) * (0.9 + rnd() * 0.2);
      const spread = 0.45 + (1 - Math.min(lambda, 1)) * 0.9;
      const g = (rnd() + rnd() + rnd() - 1.5) * 1.2;
      const ang = windAng + g * spread;
      const kmag = L / lambda;
      const m = Math.round(Math.cos(ang) * kmag);
      const n = Math.round(Math.sin(ang) * kmag);
      if (m === 0 && n === 0) continue;
      const key = m + ',' + n;
      if (seen.has(key)) continue;
      seen.add(key);
      const kx = (2 * Math.PI * m) / L, kz = (2 * Math.PI * n) / L;
      const k = Math.hypot(kx, kz);
      const omega = Math.sqrt(9.81 * k + 0.074e-3 * k * k * k);
      this.base.push({ kx, kz, k, lambda: (2 * Math.PI) / k, omega, phase: rnd() * Math.PI * 2 });
    }
    this.mat = new THREE.ShaderMaterial({
      uniforms: { uK: { value: this.k }, uP: { value: this.p }, uTime: { value: 0 }, uL: { value: L } },
      vertexShader: quadVS,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        uniform vec4 uK[${NW}];
        uniform vec2 uP[${NW}];
        uniform float uTime, uL;
        void main(){
          vec2 p = vUv * uL;
          float h = 0.0; vec2 g = vec2(0.0);
          for (int i = 0; i < ${NW}; i++) {
            vec4 k = uK[i];
            if (k.z <= 0.0) continue;
            float th = dot(k.xy, p) - k.w * uTime + uP[i].x;
            float s = sin(th), c = cos(th);
            h += k.z * s;
            g += k.z * c * k.xy;
          }
          gl_FragColor = vec4(h, g, 1.0);
        }
      `,
    });
    this.quad = new FullScreenQuad(this.mat);
    this.cur = -1;
  }

  setWind(w) {
    if (Math.abs(w - this.cur) < 1e-4) return;
    this.cur = w;
    const weights = this.base.map((b) => {
      const l = b.lambda;
      const shortW = Math.exp(-Math.pow(Math.log(l / 0.12), 2) / 0.8) * (0.06 + 1.9 * Math.pow(w, 1.6));
      const midW = Math.exp(-Math.pow(Math.log(l / 0.35), 2) / 0.6) * (0.5 + 0.9 * w);
      const longW = Math.exp(-Math.pow(Math.log(l / 0.9), 2) / 0.5) * (0.15 + 1.4 * w * w);
      return shortW + midW + longW;
    });
    const sumSq = weights.reduce((s, x) => s + x * x, 0);
    const targetRms = 0.01 + 0.05 * w + 0.09 * w * w;
    const norm = targetRms / Math.sqrt(sumSq / 2);
    this.base.forEach((b, i) => {
      const slope = weights[i] * norm;
      this.k[i].set(b.kx, b.kz, slope / b.k, b.omega);
      this.p[i].set(b.phase, 0);
    });
  }

  update(t) {
    this.mat.uniforms.uTime.value = t;
    this.renderer.setRenderTarget(this.rt);
    this.quad.render(this.renderer);
  }

  get texture() {
    return this.rt.texture;
  }
}

/* -------- caustics -------- */
function gridGeometry(n, lo, hi) {
  const g = new THREE.BufferGeometry();
  const pos = new Float32Array((n + 1) * (n + 1) * 3);
  let o = 0;
  for (let j = 0; j <= n; j++)
    for (let i = 0; i <= n; i++) {
      pos[o++] = lo + ((hi - lo) * i) / n;
      pos[o++] = lo + ((hi - lo) * j) / n;
      pos[o++] = 0;
    }
  const idx = [];
  for (let j = 0; j < n; j++)
    for (let i = 0; i < n; i++) {
      const a = j * (n + 1) + i, b = a + 1, c = a + n + 1, d = c + 1;
      idx.push(a, b, d, a, d, c);
    }
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setIndex(idx);
  return g;
}

const causticFS = /* glsl */ `
precision highp float;
varying vec2 vOld;
varying vec2 vNew;
uniform float uGain;
void main(){
  float oldA = length(dFdx(vOld)) * length(dFdy(vOld));
  float newA = length(dFdx(vNew)) * length(dFdy(vNew));
  float r = oldA / max(newA, 1e-7);
  gl_FragColor = vec4(min(r, 12.0) * uGain, 0.0, 0.0, 1.0);
}
`;

export class Caustics {
  constructor(renderer, windWaves, bedTex, quality = 1) {
    this.renderer = renderer;
    this.ww = windWaves;
    this.light = new THREE.Vector3(0.3, 1, 0.2).normalize();
    this.tileRT = makeRT(quality > 0.6 ? 512 : 256, { wrapS: THREE.RepeatWrapping, wrapT: THREE.RepeatWrapping });
    this.tileRT.texture.wrapS = this.tileRT.texture.wrapT = THREE.RepeatWrapping;
    this.pondRT = makeRT(256);
    const blend = {
      blending: THREE.CustomBlending,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneFactor,
      blendEquation: THREE.AddEquation,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
    };
    const tn = quality > 0.6 ? 256 : 128;
    this.tileMat = new THREE.ShaderMaterial({
      ...blend,
      uniforms: {
        uWind: { value: windWaves.texture },
        uL: { value: windWaves.L },
        uDepth: { value: 0.6 },
        uLight: { value: this.light },
        uGain: { value: (tn * tn) / (this.tileRT.width * this.tileRT.width) * 1.0 },
        uAmp: { value: 1.0 },
      },
      vertexShader: /* glsl */ `
        uniform sampler2D uWind;
        uniform float uL, uDepth, uAmp;
        uniform vec3 uLight;
        varying vec2 vOld, vNew;
        void main(){
          vec2 uv = position.xy;
          vec3 w = texture2D(uWind, uv).rgb;
          vec3 n = normalize(vec3(-w.g * uAmp, 1.0, -w.b * uAmp));
          vec3 I = -uLight;
          vec3 r = refract(I, n, 1.0 / 1.333);
          vec3 r0 = refract(I, vec3(0.0, 1.0, 0.0), 1.0 / 1.333);
          vec2 p = uv * uL;
          vec2 np = p + r.xz * (uDepth / max(-r.y, 0.2));
          vec2 op = p + r0.xz * (uDepth / max(-r0.y, 0.2));
          vOld = op; vNew = np;
          vec2 o = (np - (op - p)) / uL;
          gl_Position = vec4(o * 2.0 - 1.0, 0.0, 1.0);
        }
      `,
      fragmentShader: causticFS,
    });
    this.tileMat.uniforms.uGain.value = 1.0;
    this.tileMesh = new THREE.Mesh(gridGeometry(tn, -0.08, 1.08), this.tileMat);
    this.tileMesh.frustumCulled = false;
    this.tileScene = new THREE.Scene();
    this.tileScene.add(this.tileMesh);

    const pn = 256;
    this.pondMat = new THREE.ShaderMaterial({
      ...blend,
      uniforms: {
        uSim: { value: null },
        uBed: { value: bedTex },
        uHalf: { value: SIM_HALF },
        uTexel: { value: 1 / SIM_RES },
        uCell: { value: CELL },
        uLight: { value: this.light },
        uGain: { value: 1.0 },
      },
      vertexShader: /* glsl */ `
        uniform sampler2D uSim, uBed;
        uniform float uHalf, uTexel, uCell;
        uniform vec3 uLight;
        varying vec2 vOld, vNew;
        void main(){
          vec2 uv = position.xy;
          float hl = texture2D(uSim, uv - vec2(uTexel * 1.5, 0.0)).r;
          float hr = texture2D(uSim, uv + vec2(uTexel * 1.5, 0.0)).r;
          float hd = texture2D(uSim, uv - vec2(0.0, uTexel * 1.5)).r;
          float hu = texture2D(uSim, uv + vec2(0.0, uTexel * 1.5)).r;
          vec2 gr = vec2(hr - hl, hu - hd) / (3.0 * uCell);
          gr *= min(1.0, 0.35 / max(length(gr), 1e-4));
          vec3 n = normalize(vec3(-gr.x, 1.0, -gr.y));
          float depth = clamp(-texture2D(uBed, uv).g, 0.02, 1.6);
          vec3 I = -uLight;
          vec3 r = refract(I, n, 1.0 / 1.333);
          vec3 r0 = refract(I, vec3(0.0, 1.0, 0.0), 1.0 / 1.333);
          vec2 p = (uv * 2.0 - 1.0) * uHalf;
          vec2 np = p + r.xz * (depth / max(-r.y, 0.2));
          vec2 op = p + r0.xz * (depth / max(-r0.y, 0.2));
          vOld = op; vNew = np;
          vec2 o = (np - (op - p)) / uHalf;
          gl_Position = vec4(o, 0.0, 1.0);
        }
      `,
      fragmentShader: causticFS,
    });
    this.pondMesh = new THREE.Mesh(gridGeometry(pn, 0, 1), this.pondMat);
    this.pondMesh.frustumCulled = false;
    this.pondScene = new THREE.Scene();
    this.pondScene.add(this.pondMesh);
    this.cam = new THREE.Camera();
  }

  update(simTex, lightDir) {
    const r = this.renderer;
    this.light.copy(lightDir);
    if (this.light.y < 0.08) this.light.y = 0.08;
    this.light.normalize();
    const cc = r.getClearColor(new THREE.Color());
    const ca = r.getClearAlpha();
    r.setClearColor(0x000000, 0);
    r.setRenderTarget(this.tileRT);
    r.clear(true, false, false);
    r.render(this.tileScene, this.cam);
    this.pondMat.uniforms.uSim.value = simTex;
    r.setRenderTarget(this.pondRT);
    r.clear(true, false, false);
    r.render(this.pondScene, this.cam);
    r.setClearColor(cc, ca);
  }
}

/* -------- probes: read back sim height+gradient at points -------- */
const NPROBE = 64;
export class Probes {
  constructor(renderer) {
    this.renderer = renderer;
    this.rt = new THREE.WebGLRenderTarget(NPROBE, 1, {
      type: THREE.UnsignedByteType,
      format: THREE.RGBAFormat,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      depthBuffer: false,
    });
    this.pts = Array.from({ length: NPROBE }, () => new THREE.Vector2(999, 999));
    this.buf = new Uint8Array(NPROBE * 4);
    this.mat = new THREE.ShaderMaterial({
      uniforms: {
        uSim: { value: null },
        uPts: { value: this.pts },
        uHalf: { value: SIM_HALF },
        uTexel: { value: 1 / SIM_RES },
        uCell: { value: CELL },
      },
      vertexShader: quadVS,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform sampler2D uSim;
        uniform vec2 uPts[${NPROBE}];
        uniform float uHalf, uTexel, uCell;
        void main(){
          int i = int(gl_FragCoord.x);
          vec2 p = uPts[0];
          for (int k = 0; k < ${NPROBE}; k++) { if (k == i) p = uPts[k]; }
          vec2 uv = p / (2.0 * uHalf) + 0.5;
          float h = texture2D(uSim, uv).r;
          float gx = (texture2D(uSim, uv + vec2(uTexel, 0.0)).r - texture2D(uSim, uv - vec2(uTexel, 0.0)).r) / (2.0 * uCell);
          float gz = (texture2D(uSim, uv + vec2(0.0, uTexel)).r - texture2D(uSim, uv - vec2(0.0, uTexel)).r) / (2.0 * uCell);
          gl_FragColor = vec4(clamp(h / 0.3 * 0.5 + 0.5, 0.0, 1.0), clamp(gx * 0.5 + 0.5, 0.0, 1.0), clamp(gz * 0.5 + 0.5, 0.0, 1.0), 1.0);
        }
      `,
    });
    this.quad = new FullScreenQuad(this.mat);
    this.pending = false;
    this.users = [];
  }

  /** objects: array with .x .z and receives .wh .wgx .wgz */
  run(simTex, objects) {
    if (this.pending) return;
    const list = objects.slice(0, NPROBE);
    for (let i = 0; i < NPROBE; i++) {
      const o = list[i];
      if (o) this.pts[i].set(o.x, o.z);
      else this.pts[i].set(999, 999);
    }
    this.mat.uniforms.uSim.value = simTex;
    const r = this.renderer;
    r.setRenderTarget(this.rt);
    this.quad.render(r);
    r.setRenderTarget(null);
    this.pending = true;
    const done = () => {
      for (let i = 0; i < list.length; i++) {
        const o = list[i];
        const b = this.buf;
        o.wh = ((b[i * 4] / 255) * 2 - 1) * 0.3;
        o.wgx = (b[i * 4 + 1] / 255) * 2 - 1;
        o.wgz = (b[i * 4 + 2] / 255) * 2 - 1;
      }
      this.pending = false;
    };
    if (r.readRenderTargetPixelsAsync) {
      r.readRenderTargetPixelsAsync(this.rt, 0, 0, NPROBE, 1, this.buf).then(done, () => (this.pending = false));
    } else {
      r.readRenderTargetPixels(this.rt, 0, 0, NPROBE, 1, this.buf);
      done();
    }
  }
}
