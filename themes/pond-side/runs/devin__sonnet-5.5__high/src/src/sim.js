import * as THREE from 'three';
import { S, N, DX, clamp, smoothstep } from './shared.js';
import { terrainY, PILES } from './terrain.js';

const B = 0.012, NU = 0.022, KMAX = 0.2;

export class WaveSim {
  constructor() {
    const n2 = N * N;
    this.h = new Float32Array(n2);
    this.hn = new Float32Array(n2);
    this.v = new Float32Array(n2);
    this.lap = new Float32Array(n2);
    this.mask = new Float32Array(n2);
    this.k = new Float32Array(n2);
    this.damp = new Float32Array(n2);
    this.depth = new Float32Array(n2);
    this.acc = 0;
    this.tex = new THREE.DataTexture(this.h, N, N, THREE.RedFormat, THREE.FloatType);
    this.tex.minFilter = this.tex.magFilter = THREE.NearestFilter;
    this.tex.generateMipmaps = false;
    this.tex.needsUpdate = true;
    this.buildMasks();
    this.surfRT = new THREE.WebGLRenderTarget(N, N, {
      type: THREE.HalfFloatType, format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
      depthBuffer: false, wrapS: THREE.ClampToEdgeWrapping, wrapT: THREE.ClampToEdgeWrapping,
    });
    this.passScene = new THREE.Scene();
    this.passCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.passMat = new THREE.ShaderMaterial({
      uniforms: { tH: { value: this.tex }, uN: { value: N }, uDX: { value: DX } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: `
        uniform sampler2D tH; uniform float uN; uniform float uDX; varying vec2 vUv;
        float H(ivec2 p){ int n = int(uN) - 1; return texelFetch(tH, clamp(p, ivec2(0), ivec2(n)), 0).r; }
        void main(){
          ivec2 p = ivec2(vUv * uN);
          float c = H(p);
          float gx = ((H(p+ivec2(1,-1)) + 2.0*H(p+ivec2(1,0)) + H(p+ivec2(1,1))) - (H(p+ivec2(-1,-1)) + 2.0*H(p+ivec2(-1,0)) + H(p+ivec2(-1,1)))) / (8.0*uDX);
          float gz = ((H(p+ivec2(-1,1)) + 2.0*H(p+ivec2(0,1)) + H(p+ivec2(1,1))) - (H(p+ivec2(-1,-1)) + 2.0*H(p+ivec2(0,-1)) + H(p+ivec2(1,-1)))) / (8.0*uDX);
          gl_FragColor = vec4(c, gx, gz, 1.0);
        }`,
      depthTest: false, depthWrite: false,
    });
    this.passScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.passMat));
  }

  buildMasks() {
    const { mask, k, damp, depth } = this;
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const x = ((i + 0.5) / N - 0.5) * S, z = ((j + 0.5) / N - 0.5) * S;
      const d = -terrainY(x, z);
      const idx = j * N + i;
      depth[idx] = d;
      const edge = i < 2 || j < 2 || i > N - 3 || j > N - 3;
      mask[idx] = d > 0.03 && !edge ? 1 : 0;
      k[idx] = KMAX * clamp(d / 1.0, 0.18, 1);
      damp[idx] = 0.9983 - 0.014 * (1 - smoothstep(0.04, 0.45, d));
    }
    for (const p of PILES) this.carve(p.x, p.z, p.r + 0.015);
  }

  carve(x, z, r) {
    const { mask, h, v } = this;
    const gi = (x / S + 0.5) * N, gj = (z / S + 0.5) * N, rr = r / DX;
    for (let j = Math.floor(gj - rr - 1); j <= Math.ceil(gj + rr + 1); j++) for (let i = Math.floor(gi - rr - 1); i <= Math.ceil(gi + rr + 1); i++) {
      if (i < 1 || j < 1 || i >= N - 1 || j >= N - 1) continue;
      const dx = i + 0.5 - gi, dz = j + 0.5 - gj;
      if (dx * dx + dz * dz <= rr * rr) { const idx = j * N + i; mask[idx] = 0; h[idx] = 0; v[idx] = 0; }
    }
  }

  addDamping(x, z, r, amount) {
    const { damp, mask } = this;
    const gi = (x / S + 0.5) * N, gj = (z / S + 0.5) * N, rr = r / DX;
    for (let j = Math.floor(gj - rr); j <= Math.ceil(gj + rr); j++) for (let i = Math.floor(gi - rr); i <= Math.ceil(gi + rr); i++) {
      if (i < 1 || j < 1 || i >= N - 1 || j >= N - 1) continue;
      const dx = i + 0.5 - gi, dz = j + 0.5 - gj;
      const d = Math.sqrt(dx * dx + dz * dz) / rr;
      if (d < 1) { const idx = j * N + i; damp[idx] = Math.max(0.93, damp[idx] - amount * (1 - d * d)); }
    }
  }

  impulse(x, z, amp, sigma) {
    const { h, mask } = this;
    const gi = (x / S + 0.5) * N, gj = (z / S + 0.5) * N, rr = (sigma * 3.2) / DX;
    const s2 = (sigma / DX) * (sigma / DX);
    for (let j = Math.floor(gj - rr); j <= Math.ceil(gj + rr); j++) for (let i = Math.floor(gi - rr); i <= Math.ceil(gi + rr); i++) {
      if (i < 1 || j < 1 || i >= N - 1 || j >= N - 1) continue;
      const idx = j * N + i;
      if (!mask[idx]) continue;
      const dx = i + 0.5 - gi, dz = j + 0.5 - gj;
      const q = (dx * dx + dz * dz) / s2;
      h[idx] += amp * (1 - q) * Math.exp(-q);
    }
  }

  bump(x, z, amp, sigma) {
    const { h, mask } = this;
    const gi = (x / S + 0.5) * N, gj = (z / S + 0.5) * N, rr = (sigma * 3) / DX;
    const s2 = (sigma / DX) * (sigma / DX);
    for (let j = Math.floor(gj - rr); j <= Math.ceil(gj + rr); j++) for (let i = Math.floor(gi - rr); i <= Math.ceil(gi + rr); i++) {
      if (i < 1 || j < 1 || i >= N - 1 || j >= N - 1) continue;
      const idx = j * N + i;
      if (!mask[idx]) continue;
      const dx = i + 0.5 - gi, dz = j + 0.5 - gj;
      h[idx] += amp * Math.exp(-(dx * dx + dz * dz) / s2);
    }
  }

  step() {
    const { h, hn, v, lap, mask, k, damp } = this;
    for (let j = 1; j < N - 1; j++) {
      const row = j * N;
      for (let i = 1; i < N - 1; i++) {
        const idx = row + i;
        if (mask[idx] === 0) { lap[idx] = 0; continue; }
        const c = h[idx];
        lap[idx] = mask[idx - 1] * (h[idx - 1] - c) + mask[idx + 1] * (h[idx + 1] - c) + mask[idx - N] * (h[idx - N] - c) + mask[idx + N] * (h[idx + N] - c);
      }
    }
    for (let j = 1; j < N - 1; j++) {
      const row = j * N;
      for (let i = 1; i < N - 1; i++) {
        const idx = row + i;
        if (mask[idx] === 0) { hn[idx] = 0; v[idx] = 0; continue; }
        const l = lap[idx];
        const l2 = mask[idx - 1] * (lap[idx - 1] - l) + mask[idx + 1] * (lap[idx + 1] - l) + mask[idx - N] * (lap[idx - N] - l) + mask[idx + N] * (lap[idx + N] - l);
        const vv = (v[idx] + k[idx] * l - B * l2) * damp[idx];
        v[idx] = vv;
        hn[idx] = h[idx] + vv + NU * l;
      }
    }
    this.h = hn; this.hn = h;
    this.tex.image.data = this.h;
  }

  update(dt) {
    this.acc += Math.min(dt, 0.05);
    let n = 0;
    while (this.acc >= 1 / 60 && n < 2) { this.step(); this.acc -= 1 / 60; n++; }
    if (this.acc > 1 / 30) this.acc = 0;
  }

  renderSurface(renderer) {
    this.tex.needsUpdate = true;
    const prev = renderer.getRenderTarget();
    renderer.setRenderTarget(this.surfRT);
    renderer.render(this.passScene, this.passCam);
    renderer.setRenderTarget(prev);
  }

  idx(x, z) { return [(x / S + 0.5) * N - 0.5, (z / S + 0.5) * N - 0.5]; }

  sample(x, z) {
    const [fi, fj] = this.idx(x, z);
    const i = Math.floor(fi), j = Math.floor(fj);
    if (i < 0 || j < 0 || i >= N - 1 || j >= N - 1) return 0;
    const u = fi - i, w = fj - j, h = this.h, o = j * N + i;
    return (h[o] * (1 - u) + h[o + 1] * u) * (1 - w) + (h[o + N] * (1 - u) + h[o + N + 1] * u) * w;
  }

  slope(x, z, out) {
    const d = 0.06;
    out.x = (this.sample(x + d, z) - this.sample(x - d, z)) / (2 * d);
    out.y = (this.sample(x, z + d) - this.sample(x, z - d)) / (2 * d);
    return out;
  }

  depthAt(x, z) {
    return -terrainY(x, z);
  }
}
