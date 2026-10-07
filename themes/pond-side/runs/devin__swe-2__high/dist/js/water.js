// 水面：高度场位移 + 平面镜反射 + 屏空间折射 + 水深吸收 + 菲涅尔 + 高光 + 岸沿泡沫
import * as THREE from 'three';
import { DOMAIN, DOMAIN_W, DOMAIN_H } from './common.js';

export class Water {
  constructor(renderer, sim) {
    this.renderer = renderer;
    this.sim = sim;

    const rtOpts = {
      type: THREE.HalfFloatType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
      depthBuffer: true, stencilBuffer: false,
    };
    this.reflRT = new THREE.WebGLRenderTarget(512, 512, rtOpts);
    this.refrRT = new THREE.WebGLRenderTarget(512, 512, rtOpts);

    this.mirrorCam = new THREE.PerspectiveCamera();
    this.textureMatrix = new THREE.Matrix4();
    this.clipAbove = [new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.0)];   // 只留 y>0（倒影）
    this.clipBelow = [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.0)]; // 只留 y<0（折射）

    const uniforms = this.uniforms = {
      tHeight: { value: null },
      tDepth: { value: sim.depthTex },
      tRefl: { value: this.reflRT.texture },
      tRefr: { value: this.refrRT.texture },
      uTexMat: { value: this.textureMatrix },
      uSunDir: { value: new THREE.Vector3(0.3, 0.8, 0.4) },
      uSunCol: { value: new THREE.Color(1, 0.95, 0.85) },
      uMoonDir: { value: new THREE.Vector3(-0.4, 0.7, -0.3) },
      uMoonI: { value: 0 },
      uDeep: { value: new THREE.Color(0x06403c) },
      uShallow: { value: new THREE.Color(0x8fd0c0) },
      uSkyAmb: { value: new THREE.Color(0x9cc8e8) },
      uTime: { value: 0 },
      uWind: { value: 0.25 },
      uRain: { value: 0 },
      uReflAmt: { value: 1 },
    };

    const geo = new THREE.PlaneGeometry(DOMAIN_W, DOMAIN_H, 210, 168);
    geo.rotateX(-Math.PI / 2);
    geo.translate(DOMAIN.x0 + DOMAIN_W / 2, 0, DOMAIN.z0 + DOMAIN_H / 2);

    const mat = new THREE.ShaderMaterial({
      uniforms,
      transparent: false,
      vertexShader: `
        uniform sampler2D tHeight;
        uniform mat4 uTexMat;
        varying vec3 vWp;
        varying vec4 vUvR;
        varying vec4 vClip;
        varying vec2 vDuv;
        void main(){
          vec3 p = position;
          vec2 duv = vec2((p.x - (${DOMAIN.x0.toFixed(1)})) / ${DOMAIN_W.toFixed(1)},
                          (p.z - (${DOMAIN.z0.toFixed(1)})) / ${DOMAIN_H.toFixed(1)});
          float h = texture2D(tHeight, duv).r;
          p.y += h;
          vWp = p;
          vDuv = duv;
          vUvR = uTexMat * vec4(p, 1.0);
          vec4 clip = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          vClip = clip;
          gl_Position = clip;
        }`,
      fragmentShader: `
        uniform sampler2D tHeight, tDepth, tRefl, tRefr;
        uniform vec3 uSunDir, uMoonDir, uDeep, uShallow, uSkyAmb;
        uniform vec3 uSunCol;
        uniform float uMoonI, uTime, uWind, uRain, uReflAmt;
        varying vec3 vWp;
        varying vec4 vUvR;
        varying vec4 vClip;
        varying vec2 vDuv;

        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
        float noise(vec2 p){
          vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y);
        }
        // 细波（风驱动）的法线扰动
        vec2 chopGrad(vec2 p, float t, float wind){
          vec2 g = vec2(0.);
          float a = 0.014 + wind * 0.05;
          g += vec2(0.9,0.4) * a * sin(dot(p, vec2(2.6,1.4)) + t*2.3);
          g += vec2(-0.5,0.8) * a * sin(dot(p, vec2(-1.8,3.1)) + t*2.9);
          g += vec2(0.7,-0.7) * a * 0.8 * sin(dot(p, vec2(4.2,-2.2)) + t*3.7);
          g += vec2(0.3,1.0) * a * 0.7 * sin(dot(p, vec2(6.1,3.7)) + t*4.6);
          g += vec2(1.0,-0.4) * a * 0.5 * sin(dot(p, vec2(8.4,-5.5)) + t*5.8);
          float hf = wind * wind * 0.09;
          g += hf * vec2(sin(p.x*13.7 + t*6.0) * sin(p.y*9.1 - t*4.0),
                          sin(p.y*12.3 + t*5.0) * sin(p.x*8.7 + t*3.0));
          return g;
        }
        void main(){
          // 场高梯度 → 法线
          vec2 e = vec2(1.0/256.0, 0.0);
          float hC = texture2D(tHeight, vDuv).r;
          float hR = texture2D(tHeight, vDuv + e.xy).r;
          float hL = texture2D(tHeight, vDuv - e.xy).r;
          float hD = texture2D(tHeight, vDuv + e.yx).r;
          float hU = texture2D(tHeight, vDuv - e.yx).r;
          vec2 texW = vec2(${(DOMAIN_W / 256).toFixed(4)}, ${(DOMAIN_H / 256).toFixed(4)});
          vec2 grad = vec2(hR - hL, hD - hU) / (2.0 * texW);
          vec2 g = -grad * 1.6;
          g += chopGrad(vWp.xz, uTime, uWind);
          if (uRain > 0.001) {
            g += uRain * 0.06 * vec2(
              sin(vWp.x*31. + uTime*30.) * sin(vWp.z*17. - uTime*11.),
              sin(vWp.z*27. - uTime*26.) * sin(vWp.x*15. + uTime*9.));
          }
          vec3 n = normalize(vec3(g.x, 1.0, g.y));

          vec3 viewDir = normalize(cameraPosition - vWp);
          float depthRaw = texture2D(tDepth, vDuv).r;
          if (depthRaw < 0.004) discard;
          float depth = max(depthRaw - hC, 0.0);

          // 菲涅尔
          float cosT = max(dot(viewDir, n), 0.0);
          float fres = 0.02 + 0.98 * pow(1.0 - cosT, 5.0);
          fres = clamp(fres * uReflAmt, 0.0, 1.0);

          // 反射（投影贴图 + 法线扰动，雨天加模糊抖动）
          vec2 rUV = vUvR.xy / vUvR.w;
          vec2 rOff = n.xz * (0.05 + uRain * 0.03);
          vec3 refl = texture2D(tRefl, rUV + rOff).rgb;
          if (uRain > 0.001) {
            vec3 blur = texture2D(tRefl, rUV + rOff + vec2(0.012, 0.0)).rgb
                      + texture2D(tRefl, rUV + rOff - vec2(0.012, 0.0)).rgb
                      + texture2D(tRefl, rUV + rOff + vec2(0.0, 0.012)).rgb
                      + texture2D(tRefl, rUV + rOff - vec2(0.0, 0.012)).rgb;
            refl = mix(refl, blur * 0.25, uRain * 0.65);
          }

          // 折射（屏空间，偏移随深度加大 → 水下物体错位扭动）
          vec2 sUV = vClip.xy / vClip.w * 0.5 + 0.5;
          float refrK = clamp(depth * 0.6, 0.03, 1.0);
          vec2 fOff = n.xz * (0.02 + 0.09 * refrK);
          vec3 refr = texture2D(tRefr, clamp(sUV + fOff, 0.001, 0.999)).rgb;
          // 水色吸收：红光衰减快，深处沉入水色
          vec3 absorb = exp(-depth * vec3(1.0, 0.42, 0.32));
          refr *= absorb;
          refr = mix(refr, uDeep, 1.0 - exp(-depth * 0.62));
          refr += uShallow * exp(-depth * 2.0) * 0.16;

          vec3 col = mix(refr, refl * (0.55 + 0.45 * uSkyAmb), fres);
          col += uSkyAmb * 0.035;

          // 岸沿/桩边泡沫
          float foamBand = smoothstep(0.10, 0.015, depth);
          float fn = noise(vWp.xz * 6.0 + uTime * 0.7) * noise(vWp.xz * 13.0 - uTime * 0.4);
          float foam = foamBand * smoothstep(0.28, 0.75, fn + hC * 2.5);
          col += vec3(0.85, 0.92, 0.9) * foam * 0.35;

          // 太阳/月亮高光
          vec3 hv = normalize(viewDir + uSunDir);
          float spec = pow(max(dot(n, hv), 0.0), 700.0) * 2.6
                     + pow(max(dot(n, hv), 0.0), 60.0) * 0.12;
          col += uSunCol * spec;
          vec3 hv2 = normalize(viewDir + uMoonDir);
          col += vec3(0.8, 0.88, 1.0) * uMoonI * pow(max(dot(n, hv2), 0.0), 900.0) * 4.0;

          gl_FragColor = vec4(col, 1.0);
        }`,
    });

    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 5;
  }

  setSize(w, h) {
    const rw = Math.max(256, Math.floor(w * 0.5));
    const rh = Math.max(256, Math.floor(h * 0.5));
    this.reflRT.setSize(rw, rh);
    this.refrRT.setSize(rw, rh);
  }

  // 计算镜像相机 + 投影矩阵（y=0 平面反射）
  updateMirror(camera) {
    const cam = this.mirrorCam;
    const camPos = new THREE.Vector3(), lookAt = new THREE.Vector3(), up = new THREE.Vector3();
    const rot = new THREE.Matrix4();
    camera.getWorldPosition(camPos);
    rot.extractRotation(camera.matrixWorld);
    lookAt.set(0, 0, -1).applyMatrix4(rot).add(camPos);
    up.set(0, 1, 0).applyMatrix4(rot);
    cam.position.set(camPos.x, -camPos.y, camPos.z);
    cam.up.set(up.x, -up.y, up.z);
    cam.lookAt(lookAt.x, -lookAt.y, lookAt.z);
    cam.far = camera.far;
    cam.updateMatrixWorld();
    cam.projectionMatrix.copy(camera.projectionMatrix);

    this.textureMatrix.set(
      0.5, 0, 0, 0.5,
      0, 0.5, 0, 0.5,
      0, 0, 0.5, 0.5,
      0, 0, 0, 1
    );
    this.textureMatrix.multiply(cam.projectionMatrix);
    this.textureMatrix.multiply(cam.matrixWorldInverse);
  }
}
