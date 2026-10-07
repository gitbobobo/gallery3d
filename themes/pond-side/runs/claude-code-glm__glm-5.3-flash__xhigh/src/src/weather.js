import * as THREE from 'three';
import { pondDepth, floorY, fbm } from './pond.js';
import { glowTexture } from './textures.js';
import { U, state } from './shared.js';
import { mergeGeoms } from './terrain.js';

// 雨：斜落的雨丝 + 落水回调（涟漪/小水花在主循环节流后加入高度场）
export class Weather {
  constructor(scene) {
    this.scene = scene;

    // ---- 雨丝（十字交叉面片，任意角度可见）----
    const streak = new THREE.PlaneGeometry(0.016, 0.34);
    const cross = mergeGeoms([streak, streak.clone().rotateY(Math.PI / 2)]);
    const N = 340;
    this.rainMat = new THREE.MeshBasicMaterial({
      color: 0xaec4d4, transparent: true, opacity: 0, depthWrite: false
    });
    this.rain = new THREE.InstancedMesh(cross, this.rainMat, N);
    this.rain.frustumCulled = false;
    this.rain.renderOrder = 9;
    this.rain.visible = false;
    scene.add(this.rain);
    this.drops = [];
    for (let i = 0; i < N; i++) {
      this.drops.push(this.newDrop(true));
    }
    this.rainHits = [];

    // ---- 萤火虫 ----
    const FN = 26;
    const fGeo = new THREE.BufferGeometry();
    this.fPos = new Float32Array(FN * 3);
    this.fPhase = new Float32Array(FN);
    this.fBase = [];
    for (let i = 0; i < FN; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random() * 6.5;
      this.fBase.push({
        x: Math.cos(a) * r, y: 0.25 + Math.random() * 1.0, z: Math.sin(a) * r,
        ax: 0.3 + Math.random() * 0.7, ay: 0.2 + Math.random() * 0.4, az: 0.3 + Math.random() * 0.7,
        px: Math.random() * 6.28, py: Math.random() * 6.28, pz: Math.random() * 6.28,
        sp: 0.25 + Math.random() * 0.5
      });
      this.fPhase[i] = Math.random();
    }
    fGeo.setAttribute('position', new THREE.BufferAttribute(this.fPos, 3));
    fGeo.setAttribute('aPhase', new THREE.BufferAttribute(this.fPhase, 1));
    this.flyMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: U.uTime,
        uOpacity: { value: 0 },
        uMap: { value: glowTexture('rgba(220,255,150,1)') },
        uClipMode: U.uClipMode
      },
      vertexShader: /* glsl */ `
        attribute float aPhase;
        uniform float uTime;
        varying float vA;
        varying vec3 vW;
        void main(){
          vW = position;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float blink = pow(max(0.0, sin(uTime * 1.6 + aPhase * 6.283)), 2.2);
          vA = blink;
          gl_PointSize = min((56.0 + blink * 90.0) / max(-mv.z, 0.5), 22.0);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D uMap;
        uniform float uOpacity;
        uniform int uClipMode;
        varying float vA;
        varying vec3 vW;
        void main(){
          if (uClipMode == 2 && vW.y > 0.03) discard;
          if (uClipMode == 1 && vW.y < -0.03) discard;
          vec4 c = texture2D(uMap, gl_PointCoord);
          gl_FragColor = vec4(c.rgb * vec3(0.85, 1.0, 0.45), c.a * vA * uOpacity);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    this.fireflies = new THREE.Points(fGeo, this.flyMat);
    this.fireflies.frustumCulled = false;
    this.fireflies.renderOrder = 10;
    scene.add(this.fireflies);
  }

  newDrop(anyY) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * 17;
    return {
      x: Math.cos(a) * r, z: Math.sin(a) * r,
      y: anyY ? Math.random() * 7 : 5.5 + Math.random() * 2.5,
      vy: 7.5 + Math.random() * 4
    };
  }

  update(dt, t) {
    const wind = U.uWind.value;
    const wd = U.uWindDir.value;
    const rain = state.rain;

    // 雨
    if (rain > 0.015) {
      this.rain.visible = true;
      this.rainMat.opacity = rain * 0.4;
      const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
      const s = new THREE.Vector3(1, 1, 1);
      const tilt = wind * 0.35;
      const yaw = Math.atan2(wd.x, wd.y);
      e.set(tilt, yaw, 0);
      q.setFromEuler(e);
      for (let i = 0; i < this.drops.length; i++) {
        const d = this.drops[i];
        d.y -= d.vy * dt;
        d.x += wd.x * wind * 2.4 * dt;
        d.z += wd.y * wind * 2.4 * dt;
        const pd = pondDepth(d.x, d.z);
        const ground = pd > 0.02 ? 0 : floorY(d.x, d.z);
        if (d.y <= ground) {
          if (pd > 0.04 && Math.random() < 0.65) this.rainHits.push({ x: d.x, z: d.z });
          this.drops[i] = this.newDrop(false);
        }
        m.compose(new THREE.Vector3(d.x, d.y, d.z), q, s);
        this.rain.setMatrixAt(i, m);
      }
      this.rain.instanceMatrix.needsUpdate = true;
    } else if (this.rain.visible) {
      this.rain.visible = false;
    }

    // 萤火虫（夜晚 + 无雨时活跃）
    const nightW = state.weights.night;
    this.flyMat.uniforms.uOpacity.value = nightW * (1 - rain * 0.85);
    if (nightW > 0.02) {
      const pos = this.fireflies.geometry.attributes.position;
      for (let i = 0; i < this.fBase.length; i++) {
        const b = this.fBase[i];
        const tt = t * b.sp + b.px;
        pos.setXYZ(i,
          b.x + Math.sin(tt * b.ax) * 0.9 + Math.sin(tt * 0.37) * 0.5,
          b.y + Math.sin(tt * b.ay + b.py) * 0.3,
          b.z + Math.cos(tt * b.az) * 0.9 + Math.cos(tt * 0.31) * 0.5
        );
      }
      pos.needsUpdate = true;
      this.fireflies.visible = true;
    } else {
      this.fireflies.visible = false;
    }
  }

  // 取走本帧的雨点落水事件
  takeRainHits() {
    const h = this.rainHits;
    this.rainHits = [];
    return h;
  }
}
