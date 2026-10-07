// GPU 高度场波纹模拟：波动方程 + 岸线/木桩反射边界 + 落水点注入
import * as THREE from 'three';
import { DOMAIN, DOMAIN_W, DOMAIN_H, pondRR, depthAt } from './common.js';

const RES = 256;
const MAX_DROPS = 28;

export class WaveSim {
  constructor(renderer, obstacles = []) {
    this.renderer = renderer;
    this.drops = [];

    const opts = {
      type: THREE.HalfFloatType, format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
      depthBuffer: false, stencilBuffer: false, wrapS: THREE.ClampToEdgeWrapping, wrapT: THREE.ClampToEdgeWrapping,
    };
    this.rtA = new THREE.WebGLRenderTarget(RES, RES, opts);
    this.rtB = new THREE.WebGLRenderTarget(RES, RES, opts);
    this.texel = new THREE.Vector2(1 / RES, 1 / RES);

    // 边界掩码：1=水 0=岸/桩
    const maskData = new Uint8Array(RES * RES * 4);
    for (let j = 0; j < RES; j++) {
      for (let i = 0; i < RES; i++) {
        const x = DOMAIN.x0 + (i + 0.5) / RES * DOMAIN_W;
        const z = DOMAIN.z0 + (j + 0.5) / RES * DOMAIN_H;
        let m = pondRR(x, z) < 1.0 ? 255 : 0;
        if (m) {
          for (const o of obstacles) {
            const dx = x - o.x, dz = z - o.z;
            if (dx * dx + dz * dz < o.r * o.r) { m = 0; break; }
          }
        }
        const k = (j * RES + i) * 4;
        maskData[k] = m; maskData[k + 3] = 255;
      }
    }
    this.maskTex = new THREE.DataTexture(maskData, RES, RES, THREE.RGBAFormat);
    this.maskTex.minFilter = THREE.LinearFilter;
    this.maskTex.magFilter = THREE.LinearFilter;
    this.maskTex.needsUpdate = true;

    // 池底深度图（供水面着色：水深衰减、焦散强度）
    const DR = 128, dData = new Float32Array(DR * DR);
    for (let j = 0; j < DR; j++) {
      for (let i = 0; i < DR; i++) {
        const x = DOMAIN.x0 + (i + 0.5) / DR * DOMAIN_W;
        const z = DOMAIN.z0 + (j + 0.5) / DR * DOMAIN_H;
        dData[j * DR + i] = depthAt(x, z);
      }
    }
    this.depthTex = new THREE.DataTexture(dData, DR, DR, THREE.RedFormat, THREE.FloatType);
    this.depthTex.minFilter = THREE.LinearFilter;
    this.depthTex.magFilter = THREE.LinearFilter;
    this.depthTex.needsUpdate = true;

    this.quadScene = new THREE.Scene();
    this.quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.dropVecs = [];
    for (let i = 0; i < MAX_DROPS; i++) this.dropVecs.push(new THREE.Vector4());

    this.mat = new THREE.ShaderMaterial({
      uniforms: {
        tField: { value: null }, tMask: { value: this.maskTex },
        texel: { value: this.texel },
        damping: { value: 0.9965 },
        alpha: { value: 0.22 },          // c²：波速平方（texel/步）
        drops: { value: this.dropVecs },
        nDrops: { value: 0 },
        domSize: { value: new THREE.Vector2(DOMAIN_W, DOMAIN_H) },
      },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.);}`,
      fragmentShader: `
        uniform sampler2D tField, tMask;
        uniform vec2 texel, domSize;
        uniform float damping, alpha;
        uniform vec4 drops[${MAX_DROPS}];
        uniform int nDrops;
        varying vec2 vUv;
        float H(vec2 uv){ return texture2D(tField, uv).r; }
        void main(){
          vec4 c = texture2D(tField, vUv);
          float h = c.r, hp = c.g;
          float mC = texture2D(tMask, vUv).r;
          vec2 eL = vec2(-texel.x,0.), eR = vec2(texel.x,0.), eU = vec2(0.,-texel.y), eD = vec2(0.,texel.y);
          float mL = texture2D(tMask, vUv+eL).r, mR = texture2D(tMask, vUv+eR).r;
          float mU = texture2D(tMask, vUv+eU).r, mD = texture2D(tMask, vUv+eD).r;
          float hL = texture2D(tField, vUv+eL).r, hR = texture2D(tField, vUv+eR).r;
          float hU = texture2D(tField, vUv+eU).r, hD = texture2D(tField, vUv+eD).r;
          float next;
          if (mC > 0.5) {
            // 邻居是固体 → 用当前值镜像（零梯度 → 反射）
            float sL = mix(h, hL, mL), sR = mix(h, hR, mR), sU = mix(h, hU, mU), sD = mix(h, hD, mD);
            float lap = sL + sR + sU + sD - 4.0 * h;
            next = 2.0*h - hp + alpha * lap;
            next *= damping;
            for (int i = 0; i < ${MAX_DROPS}; i++) {
              if (i >= nDrops) break;
              vec2 d = (vUv - drops[i].xy) * domSize;
              next += drops[i].w * exp(-dot(d,d) / (drops[i].z * drops[i].z));
            }
            next = clamp(next, -1.5, 1.5);
          } else {
            // 固体像素跟踪相邻水面，保证镜像反射连续
            float s = 0., n = 0.;
            if (mL>0.5){s+=hL;n+=1.;} if (mR>0.5){s+=hR;n+=1.;}
            if (mU>0.5){s+=hU;n+=1.;} if (mD>0.5){s+=hD;n+=1.;}
            next = n > 0. ? s/n : 0.;
          }
          gl_FragColor = vec4(next, h, 0., 1.);
        }`,
      depthTest: false, depthWrite: false,
    });
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat);
    this.quadScene.add(this.quad);

    // 清初始纹理
    const prevRT = renderer.getRenderTarget();
    renderer.setRenderTarget(this.rtA); renderer.setClearColor(0x000000, 0); renderer.clear();
    renderer.setRenderTarget(this.rtB); renderer.clear();
    renderer.setRenderTarget(prevRT);
    this.cur = this.rtA; this.prev = this.rtB;
  }

  // 世界坐标落水点；amp 米，radius 米
  addDrop(x, z, radius, amp) {
    this.drops.push(new THREE.Vector4(
      (x - DOMAIN.x0) / DOMAIN_W, (z - DOMAIN.z0) / DOMAIN_H, radius, amp));
  }

  step(substeps = 2) {
    const r = this.renderer;
    const prevRT = r.getRenderTarget();
    for (let s = 0; s < substeps; s++) {
      const n = Math.min(this.drops.length, MAX_DROPS);
      for (let i = 0; i < n; i++) this.dropVecs[i].copy(this.drops[i]);
      this.mat.uniforms.nDrops.value = n;
      this.drops.splice(0, n);
      this.mat.uniforms.tField.value = this.cur.texture;
      r.setRenderTarget(this.prev);
      r.render(this.quadScene, this.quadCam);
      const t = this.cur; this.cur = this.prev; this.prev = t;
    }
    r.setRenderTarget(prevRT);
  }

  get texture() { return this.cur.texture; }
}
