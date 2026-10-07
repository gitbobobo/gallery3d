import * as THREE from 'three';
import { G, setLayers, LAYER } from './shared.js';
import { rng } from './noise.js';
import { shorePoint, heightAt } from './pond.js';

function pointScaleHook(points, uniform) {
  points.onBeforeRender = (renderer, scene, camera) => {
    const rt = renderer.getRenderTarget();
    const h = rt ? rt.height : renderer.getDrawingBufferSize(new THREE.Vector2()).y;
    uniform.value = h * camera.projectionMatrix.elements[5] * 0.5;
  };
}

export class Splashes {
  constructor(max = 1600) {
    this.max = max;
    this.pos = new Float32Array(max * 3);
    this.vel = new Float32Array(max * 3);
    this.size = new Float32Array(max);
    this.life = new Float32Array(max);
    this.alpha = new Float32Array(max);
    this.ripple = new Uint8Array(max);
    this.n = 0;
    const g = new THREE.BufferGeometry();
    this.posAttr = new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage);
    this.sizeAttr = new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage);
    this.alphaAttr = new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('position', this.posAttr);
    g.setAttribute('aSize', this.sizeAttr);
    g.setAttribute('aAlpha', this.alphaAttr);
    g.setDrawRange(0, 0);
    this.uniforms = {
      uScale: { value: 500 },
      uColor: { value: new THREE.Color(1, 1, 1) },
      uLight: { value: new THREE.Color(1, 1, 1) },
    };
    this.points = new THREE.Points(
      g,
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        transparent: true,
        depthWrite: false,
        vertexShader: /* glsl */ `
          attribute float aSize;
          attribute float aAlpha;
          uniform float uScale;
          varying float vA;
          void main(){
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = clamp(aSize * uScale / -mv.z, 1.0, 64.0);
            vA = aAlpha * clamp(aSize * uScale / -mv.z, 0.0, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor, uLight;
          varying float vA;
          void main(){
            vec2 p = gl_PointCoord * 2.0 - 1.0;
            float r = dot(p, p);
            if (r > 1.0) discard;
            float rim = smoothstep(0.3, 1.0, r);
            float hl = smoothstep(0.25, 0.0, length(p - vec2(-0.35, -0.35)));
            vec3 c = uColor * (0.55 + 0.6 * rim) + uLight * hl * 0.8;
            gl_FragColor = vec4(c, vA * (0.35 + 0.55 * rim) * smoothstep(1.0, 0.7, r));
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }
        `,
      })
    );
    this.points.frustumCulled = false;
    this.points.renderOrder = 8;
    pointScaleHook(this.points, this.uniforms.uScale);
    setLayers(this.points, LAYER.MAIN, LAYER.REFL);
  }

  emit(x, y, z, vx, vy, vz, size, life, ripple = 0) {
    if (this.n >= this.max) return;
    const i = this.n++;
    this.pos.set([x, y, z], i * 3);
    this.vel.set([vx, vy, vz], i * 3);
    this.size[i] = size;
    this.life[i] = life;
    this.alpha[i] = 1;
    this.ripple[i] = ripple;
  }

  /** crown splash for a stone */
  stoneSplash(x, z, energy = 1) {
    const r = Math.random;
    const n = Math.floor(70 * energy);
    for (let i = 0; i < n; i++) {
      const a = r() * Math.PI * 2;
      const hs = (0.5 + r() * 1.3) * energy;
      const vs = (1.4 + r() * 1.8) * energy;
      const rr = 0.06 + r() * 0.05;
      this.emit(x + Math.cos(a) * rr, 0.02, z + Math.sin(a) * rr, Math.cos(a) * hs, vs, Math.sin(a) * hs, 0.012 + r() * 0.03, 2, r() < 0.35 ? 1 : 0);
    }
    for (let i = 0; i < 40 * energy; i++) {
      const a = r() * Math.PI * 2;
      const hs = 0.3 + r() * 2.2;
      this.emit(x, 0.03, z, Math.cos(a) * hs, 0.8 + r() * 2.5, Math.sin(a) * hs, 0.006 + r() * 0.01, 1.5);
    }
  }

  jet(x, z, energy = 1) {
    const r = Math.random;
    for (let i = 0; i < 14 * energy; i++) {
      this.emit(x + (r() - 0.5) * 0.03, 0.02, z + (r() - 0.5) * 0.03, (r() - 0.5) * 0.35, (2.0 + r() * 1.8) * energy, (r() - 0.5) * 0.35, 0.02 + r() * 0.025, 2, 1);
    }
  }

  small(x, z, n = 6, speed = 0.8, size = 0.012) {
    const r = Math.random;
    for (let i = 0; i < n; i++) {
      const a = r() * Math.PI * 2;
      const hs = r() * speed * 0.6;
      this.emit(x, 0.01, z, Math.cos(a) * hs, speed * (0.5 + r() * 0.7), Math.sin(a) * hs, size * (0.6 + r() * 0.8), 1);
    }
  }

  update(dt, sim, floor) {
    let j = 0;
    for (let i = 0; i < this.n; i++) {
      let life = this.life[i] - dt;
      const o = i * 3;
      let vx = this.vel[o], vy = this.vel[o + 1] - 9.8 * dt, vz = this.vel[o + 2];
      const drag = 1 - dt * 0.6;
      vx *= drag; vz *= drag;
      const x = this.pos[o] + vx * dt, y = this.pos[o + 1] + vy * dt, z = this.pos[o + 2] + vz * dt;
      const gy = floor(x, z);
      if (y < gy && vy < 0) {
        if (this.ripple[i] && gy <= 0.001) sim.addDrop(x, z, 0.06, -0.004 * (this.size[i] / 0.025));
        life = -1;
      }
      if (life <= 0) continue;
      const k = j * 3;
      this.pos[k] = x; this.pos[k + 1] = y; this.pos[k + 2] = z;
      this.vel[k] = vx; this.vel[k + 1] = vy; this.vel[k + 2] = vz;
      this.size[j] = this.size[i];
      this.life[j] = life;
      this.alpha[j] = Math.min(1, life * 3);
      this.ripple[j] = this.ripple[i];
      j++;
    }
    this.n = j;
    this.points.geometry.setDrawRange(0, j);
    this.posAttr.needsUpdate = true;
    this.sizeAttr.needsUpdate = true;
    this.alphaAttr.needsUpdate = true;
  }
}

export class Rain {
  constructor(count = 5000) {
    const r = rng(9);
    const base = new THREE.PlaneGeometry(1, 1);
    base.translate(0, 0.5, 0);
    const g = new THREE.InstancedBufferGeometry();
    g.index = base.index;
    g.setAttribute('position', base.attributes.position);
    const off = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) off.set([r() * 30 - 15, r() * 14, r() * 30 - 15, 0.8 + r() * 0.4], i * 4);
    g.setAttribute('aOff', new THREE.InstancedBufferAttribute(off, 4));
    g.instanceCount = count;
    this.uniforms = {
      uTime: G.uTime,
      uRain: G.uRain,
      uWind: G.uWind,
      uWindDir: G.uWindDir,
      uCam: { value: new THREE.Vector3() },
      uColor: { value: new THREE.Color() },
    };
    this.mesh = new THREE.Mesh(
      g,
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        vertexShader: /* glsl */ `
          attribute vec4 aOff;
          uniform float uTime, uRain, uWind;
          uniform vec2 uWindDir;
          uniform vec3 uCam;
          varying float vA;
          varying float vX;
          void main(){
            float speed = 8.5 * aOff.w;
            vec3 vel = vec3(uWindDir.x * (0.6 + uWind * 3.5), -speed, uWindDir.y * (0.6 + uWind * 3.5));
            float H = 14.0;
            float y = mod(aOff.y - uTime * speed, H);
            vec3 p = vec3(aOff.x, y, aOff.z);
            p.xz += vel.xz / speed * (H - y);
            p.xz = uCam.xz + mod(p.xz - uCam.xz + 15.0, 30.0) - 15.0;
            vec3 dir = normalize(vel);
            vec3 toCam = normalize(uCam - p);
            vec3 side = normalize(cross(dir, toCam));
            float len = 0.45;
            vec3 wp = p + side * position.x * 0.007 + dir * (position.y - 0.5) * len;
            vX = position.x;
            float dist = length(uCam - p);
            float hide = step(fract(aOff.w * 31.7), uRain);
            vA = hide * smoothstep(0.4, 2.0, dist) * smoothstep(28.0, 12.0, dist);
            gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          varying float vA;
          varying float vX;
          void main(){
            float a = (1.0 - abs(vX) * 2.0) * vA * 0.32;
            if (a < 0.003) discard;
            gl_FragColor = vec4(uColor, a);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }
        `,
      })
    );
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 9;
    setLayers(this.mesh, LAYER.MAIN);
  }
}

export class Fireflies {
  constructor(count = 60) {
    const r = rng(66);
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
      let x, z, y;
      const mode = r();
      if (mode < 0.55) {
        // near shore / reeds
        const th = r.pick([3.05, -0.25, 1.95, -2.55, 2.6]) + r.gauss() * 0.35;
        [x, z] = shorePoint(th, r.gauss() * 1.4);
      } else {
        const a = r() * Math.PI * 2, rad = r() * 6.5;
        x = Math.cos(a) * rad;
        z = Math.sin(a) * rad;
      }
      y = Math.max(heightAt(x, z), 0) + 0.25 + r() * 1.4;
      pos.set([x, y, z], i * 3);
      seed.set([r() * 6.28, 0.3 + r() * 0.6, r() * 6.28, 0.5 + r() * 1.5], i * 4);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
    this.uniforms = { uTime: G.uTime, uScale: { value: 500 }, uAmt: { value: 0 } };
    this.points = new THREE.Points(
      g,
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */ `
          attribute vec4 aSeed;
          uniform float uTime, uScale, uAmt;
          varying float vI;
          void main(){
            float t = uTime * aSeed.y;
            vec3 p = position + vec3(sin(t + aSeed.x) * 0.9 + sin(t * 2.3 + aSeed.z) * 0.3,
                                     sin(t * 1.3 + aSeed.z) * 0.25,
                                     cos(t * 0.8 + aSeed.x * 1.3) * 0.9 + cos(t * 1.9) * 0.2);
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            float blink = pow(max(sin(uTime * aSeed.w + aSeed.x * 3.0), 0.0), 3.0);
            vI = (0.15 + 0.85 * blink) * uAmt;
            gl_PointSize = clamp(0.12 * uScale / -mv.z, 2.0, 40.0);
          }
        `,
        fragmentShader: /* glsl */ `
          varying float vI;
          void main(){
            vec2 p = gl_PointCoord * 2.0 - 1.0;
            float r = length(p);
            float core = smoothstep(0.22, 0.0, r);
            float glow = exp(-r * r * 6.0) * 0.5;
            vec3 c = vec3(0.75, 1.0, 0.3) * (core * 5.0 + glow);
            gl_FragColor = vec4(c * vI, 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }
        `,
      })
    );
    this.points.frustumCulled = false;
    this.points.renderOrder = 9;
    pointScaleHook(this.points, this.uniforms.uScale);
    setLayers(this.points, LAYER.MAIN, LAYER.REFL);
  }
}
