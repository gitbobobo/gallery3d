// 天气与特效：雨丝、水面溅珠、萤火虫
import * as THREE from 'three';
import { rand, pondRR, dropletTexture, glowTexture, DOMAIN } from './common.js';

export class FX {
  constructor(scene) {
    this.scene = scene;
    this.t = 0;

    // ---------- 雨 ----------
    const N_RAIN = 500;
    this.rainN = N_RAIN;
    this.rainPos = new Float32Array(N_RAIN * 6);
    this.rainVel = new Float32Array(N_RAIN); // 速度（含相位扰动）
    for (let i = 0; i < N_RAIN; i++) this.resetDrop(i, true);
    const rainGeo = new THREE.BufferGeometry();
    rainGeo.setAttribute('position', new THREE.BufferAttribute(this.rainPos, 3).setUsage(THREE.DynamicDrawUsage));
    this.rainMat = new THREE.LineBasicMaterial({ color: 0xcfe0ea, transparent: true, opacity: 0 });
    this.rain = new THREE.LineSegments(rainGeo, this.rainMat);
    this.rain.frustumCulled = false;
    this.rain.visible = false;
    scene.add(this.rain);
    this.rainAmt = 0;

    // ---------- 水花粒子池 ----------
    const N_SP = 400;
    this.spN = N_SP;
    this.spPos = new Float32Array(N_SP * 3);
    this.spVel = new Float32Array(N_SP * 3);
    this.spLife = new Float32Array(N_SP);
    this.spSize = new Float32Array(N_SP);
    this.spPos.fill(-999);
    const spGeo = new THREE.BufferGeometry();
    spGeo.setAttribute('position', new THREE.BufferAttribute(this.spPos, 3).setUsage(THREE.DynamicDrawUsage));
    spGeo.setAttribute('aSize', new THREE.BufferAttribute(this.spSize, 1).setUsage(THREE.DynamicDrawUsage));
    spGeo.setAttribute('aLife', new THREE.BufferAttribute(this.spLife, 1).setUsage(THREE.DynamicDrawUsage));
    this.spMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { tMap: { value: dropletTexture() } },
      vertexShader: `
        attribute float aSize, aLife;
        varying float vA;
        void main(){
          vA = clamp(aLife * 2.2, 0.0, 1.0);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * 320.0 / max(-mv.z, 0.5);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform sampler2D tMap;
        varying float vA;
        void main(){
          vec4 c = texture2D(tMap, gl_PointCoord);
          gl_FragColor = vec4(c.rgb, c.a * vA);
        }`,
    });
    this.splash = new THREE.Points(spGeo, this.spMat);
    this.splash.frustumCulled = false;
    scene.add(this.splash);
    this.spHead = 0;

    // ---------- 萤火虫 ----------
    const N_FF = 26;
    this.ffN = N_FF;
    this.ffPos = new Float32Array(N_FF * 3);
    this.ffPhase = new Float32Array(N_FF);
    this.ffSeed = new Float32Array(N_FF * 2);
    for (let i = 0; i < N_FF; i++) {
      this.ffPos[i * 3] = rand(-8, 8); this.ffPos[i * 3 + 1] = rand(0.3, 1.6); this.ffPos[i * 3 + 2] = rand(-7, 7);
      this.ffPhase[i] = rand(Math.PI * 2);
      this.ffSeed[i * 2] = rand(-8, 8); this.ffSeed[i * 2 + 1] = rand(-7, 7);
    }
    const ffGeo = new THREE.BufferGeometry();
    ffGeo.setAttribute('position', new THREE.BufferAttribute(this.ffPos, 3).setUsage(THREE.DynamicDrawUsage));
    ffGeo.setAttribute('aPhase', new THREE.BufferAttribute(this.ffPhase, 1));
    this.ffMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { tMap: { value: glowTexture() }, uTime: { value: 0 }, uAmt: { value: 0 } },
      vertexShader: `
        attribute float aPhase;
        uniform float uTime, uAmt;
        varying float vA;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float blink = 0.35 + 0.65 * max(sin(uTime * 1.8 + aPhase), 0.0);
          vA = blink * uAmt;
          gl_PointSize = (60.0 + 40.0 * sin(aPhase * 3.0)) / max(-mv.z, 0.5);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform sampler2D tMap;
        varying float vA;
        void main(){
          vec4 c = texture2D(tMap, gl_PointCoord);
          gl_FragColor = vec4(c.rgb, c.a * vA);
        }`,
    });
    this.fireflies = new THREE.Points(ffGeo, this.ffMat);
    this.fireflies.frustumCulled = false;
    scene.add(this.fireflies);
  }

  resetDrop(i, init = false) {
    const x = rand(-16, 16), z = rand(-14, 14), y = init ? rand(0, 12) : rand(9, 13);
    this.rainPos[i * 6] = x; this.rainPos[i * 6 + 1] = y; this.rainPos[i * 6 + 2] = z;
    this.rainPos[i * 6 + 3] = x; this.rainPos[i * 6 + 4] = y + 0.35; this.rainPos[i * 6 + 5] = z;
    this.rainVel[i] = rand(8, 12);
  }

  burst(x, y, z, n, speed, size = 1) {
    for (let i = 0; i < n; i++) {
      const k = this.spHead = (this.spHead + 1) % this.spN;
      this.spPos[k * 3] = x; this.spPos[k * 3 + 1] = y; this.spPos[k * 3 + 2] = z;
      const a = rand(Math.PI * 2), up = rand(0.4, 1);
      this.spVel[k * 3] = Math.cos(a) * speed * rand(0.3, 1);
      this.spVel[k * 3 + 1] = up * speed * rand(0.8, 1.6);
      this.spVel[k * 3 + 2] = Math.sin(a) * speed * rand(0.3, 1);
      this.spLife[k] = rand(0.4, 0.9);
      this.spSize[k] = size * rand(0.5, 1.4);
    }
  }

  update(dt, rainOn, nightI, wind, sim, waveField) {
    this.t += dt;
    // 雨
    this.rainAmt = THREE.MathUtils.lerp(this.rainAmt, rainOn ? 1 : 0, Math.min(1, dt * 2.5));
    this.rain.visible = this.rainAmt > 0.02;
    this.rainMat.opacity = this.rainAmt * 0.5;
    if (this.rain.visible) {
      const p = this.rainPos;
      const slantX = wind * 1.8, slantZ = wind * 1.0;
      for (let i = 0; i < this.rainN; i++) {
        const v = this.rainVel[i] * dt * (0.7 + this.rainAmt * 0.5);
        const y = p[i * 6 + 1] - v;
        const x = p[i * 6] + slantX * dt * 3;
        const z = p[i * 6 + 2] + slantZ * dt * 3;
        p[i * 6] = x; p[i * 6 + 1] = y; p[i * 6 + 2] = z;
        p[i * 6 + 3] = x + slantX * 0.035; p[i * 6 + 4] = y + 0.4; p[i * 6 + 5] = z + slantZ * 0.035;
        if (y < 0) {
          if (pondRR(x, z) < 1 && Math.random() < 0.5) {
            sim.addDrop(x, z, rand(0.08, 0.18), rand(-0.02, -0.008));
            if (Math.random() < 0.12) waveField.addRipple(x, z, 0.008, 2.4, 0.9);
            if (Math.random() < 0.08) this.burst(x, 0.02, z, 2, 0.5, 0.6);
          }
          this.resetDrop(i);
        }
      }
      this.rain.geometry.attributes.position.needsUpdate = true;
    }

    // 水花粒子
    const gp = 5.5;
    for (let i = 0; i < this.spN; i++) {
      if (this.spLife[i] <= 0) continue;
      this.spLife[i] -= dt;
      this.spVel[i * 3 + 1] -= gp * dt;
      this.spPos[i * 3] += this.spVel[i * 3] * dt;
      this.spPos[i * 3 + 1] += this.spVel[i * 3 + 1] * dt;
      this.spPos[i * 3 + 2] += this.spVel[i * 3 + 2] * dt;
      if (this.spLife[i] <= 0) this.spPos[i * 3 + 1] = -999;
    }
    this.splash.geometry.attributes.position.needsUpdate = true;
    this.splash.geometry.attributes.aLife.needsUpdate = true;
    this.splash.geometry.attributes.aSize.needsUpdate = true;

    // 萤火虫：在芦苇/柳树附近漂游
    this.ffMat.uniforms.uAmt.value = nightI;
    this.ffMat.uniforms.uTime.value = this.t;
    if (nightI > 0.02) {
      for (let i = 0; i < this.ffN; i++) {
        const t = this.t * 0.5 + this.ffPhase[i] * 10;
        const sx = this.ffSeed[i * 2], sz = this.ffSeed[i * 2 + 1];
        this.ffPos[i * 3] = sx + Math.sin(t * 0.7 + this.ffPhase[i]) * 2.4 + Math.sin(t * 2.1) * 0.5;
        this.ffPos[i * 3 + 1] = 0.7 + Math.sin(t * 0.9 + this.ffPhase[i] * 2) * 0.55;
        this.ffPos[i * 3 + 2] = sz + Math.cos(t * 0.6 + this.ffPhase[i]) * 2.4 + Math.cos(t * 1.7) * 0.5;
      }
      this.fireflies.geometry.attributes.position.needsUpdate = true;
    }
  }
}
