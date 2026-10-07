import * as THREE from 'three';
import { S, G } from './shared.js';
import { NOISE_GLSL } from './materials.js';
import { makeChopTexture } from './textures.js';

const CHOP_GLSL = /* glsl */ `
uniform sampler2D tChop; uniform sampler2D tSurf; uniform vec2 uWOff; uniform float uWind; uniform float uGain; uniform float uRain; uniform float uTime;
vec2 guv(vec2 p){ return p / ${S.toFixed(1)} + 0.5; }
vec2 chopSlope(vec2 p){
  vec2 uvA = (p + uWOff*0.5) * 0.31;
  vec2 uvB = (mat2(0.8,-0.6,0.6,0.8) * p + uWOff*1.0) * 0.97 + 0.37;
  vec2 uvC = (mat2(0.6,0.8,-0.8,0.6) * p + uWOff*1.5) * 2.9 + 0.71;
  float g = vn(p*0.16 - uWOff*0.6);
  float gust = mix(0.55, 1.5, smoothstep(0.25, 0.8, g));
  float w = uWind;
  vec2 a = CH(uvA)*2.0-1.0;
  vec2 b = (CH(uvB)*2.0-1.0);
  vec2 c = (CH(uvC)*2.0-1.0);
  return a*(0.05+0.16*w) + b*(0.05+0.34*w)*gust + c*(0.008+0.4*w*w)*gust;
}
vec2 ringHash(vec2 p){ return vec2(h21(p), h21(p+17.31)); }
vec2 rainRings(vec2 p, float scale, float seed){
  vec2 q = p*scale + seed*13.7; vec2 id = floor(q); vec2 f = fract(q) - 0.5;
  float h = h21(id + seed);
  float act = step(h, uRain*0.9);
  float period = 0.55 + h*0.7;
  float tt = fract(uTime/period + h*9.0);
  vec2 c = (ringHash(id+seed*3.1) - 0.5) * 0.24;
  vec2 d = f - c; float r = length(d);
  float R = tt*0.38;
  float w = r - R;
  float env = (1.0-tt)*(1.0-tt)*smoothstep(0.0, 0.06, tt);
  float prof = sin(w*85.0) * exp(-w*w*900.0);
  return normalize(d + 1e-5) * prof * env * act * 0.55;
}
vec2 surfSlope(vec2 p, float simGain, float wo){
  vec3 s = texture2D(tSurf, guv(p)).rgb;
  vec2 sl = s.gb * simGain + chopSlope(p) * wo;
  if (uRain > 0.01) sl += rainRings(p, 2.6, 0.0) + rainRings(p, 4.1, 1.0)*0.8;
  return sl;
}
`;

export class Water {
  constructor(scene, sim, terrainTex) {
    this.scene = scene; this.sim = sim;
    this.chopTex = makeChopTexture(256);
    this.wOff = new THREE.Vector2();
    this.rtOpts = { type: THREE.HalfFloatType, format: THREE.RGBAFormat, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: true, generateMipmaps: false };
    this.reflRT = new THREE.WebGLRenderTarget(4, 4, this.rtOpts);
    this.refrRT = new THREE.WebGLRenderTarget(4, 4, this.rtOpts);
    this.causticRT = new THREE.WebGLRenderTarget(512, 512, { ...this.rtOpts, depthBuffer: false, wrapS: THREE.ClampToEdgeWrapping, wrapT: THREE.ClampToEdgeWrapping });
    G.tCaustic.value = this.causticRT.texture;
    this.vcam = new THREE.PerspectiveCamera();
    this.rcam = new THREE.PerspectiveCamera();
    this.reflMat = new THREE.Matrix4();
    this.uni = {
      tRefl: { value: this.reflRT.texture }, tRefr: { value: this.refrRT.texture },
      tSurf: { value: sim.surfRT.texture }, tTerr: { value: terrainTex }, tChop: { value: this.chopTex },
      uReflMat: { value: this.reflMat }, uRes: { value: new THREE.Vector2(1, 1) },
      uTime: G.uTime, uWind: G.uWind, uWindDir: G.uWindDir, uWOff: { value: this.wOff }, uRain: G.uRain, uGain: { value: 2.0 },
      uSunDir: G.uSunDir, uSunRad: G.uSunRad, uAbsorb: G.uAbsorb, uScatter: G.uScatter,
      uLanternPos: { value: new THREE.Vector3(0, 1, 0) }, uLantern: { value: 0 },
    };
    this.buildWater();
    this.buildCaustics();
    this.plane = new THREE.Plane(); this.q = new THREE.Vector4(); this.cp = new THREE.Vector4();
    this.tmpV = new THREE.Vector3(); this.tmpU = new THREE.Vector3(); this.tmpT = new THREE.Vector3(); this.rot = new THREE.Matrix4();
  }

  buildWater() {
    const geo = new THREE.PlaneGeometry(S, S, 1, 1); geo.rotateX(-Math.PI / 2);
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uni, transparent: true, depthWrite: true, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 3,
      vertexShader: `varying vec3 vWP; void main(){ vec4 w = modelMatrix*vec4(position,1.0); vWP = w.xyz; gl_Position = projectionMatrix*viewMatrix*w; }`,
      fragmentShader: /* glsl */ `
        varying vec3 vWP;
        uniform sampler2D tRefl, tRefr, tTerr;
        uniform mat4 uReflMat; uniform vec2 uRes; uniform vec2 uWindDir;
        uniform vec3 uSunDir, uSunRad, uAbsorb, uScatter, uLanternPos; uniform float uLantern;
        ${NOISE_GLSL}
        #define CH(uv) texture2D(tChop, uv).rg
        ${CHOP_GLSL}
        void main(){
          vec2 p = vWP.xz;
          float depth = -texture2D(tTerr, guv(p)).r;
          float edgeA = smoothstep(0.0, 0.07, depth);
          if (edgeA < 0.002) discard;
          vec3 Vd = cameraPosition - vWP;
          float dist = length(Vd);
          vec3 V = Vd / dist;
          float far = 1.0 / (1.0 + dist*0.035);
          vec2 sl = surfSlope(p, uGain, far);
          sl *= mix(1.0, 0.8, smoothstep(0.0, 0.3, depth) * 0.0);
          vec3 n = normalize(vec3(-sl.x, 1.0, -sl.y));
          float NV = clamp(dot(n, V), 0.0, 1.0);
          float NVf = clamp(dot(vec3(0.0,1.0,0.0), V), 0.0, 1.0);
          float F = 0.02 + 0.98*pow(1.0 - mix(NV, NVf, 0.35), 5.0);

          vec3 nv = mat3(viewMatrix) * n; vec3 uv3 = mat3(viewMatrix) * vec3(0.0,1.0,0.0);
          vec2 off = nv.xy - uv3.xy;

          vec4 rc = uReflMat * vec4(vWP, 1.0);
          vec2 ruv = rc.xy / rc.w;
          ruv += vec2(off.x, -off.y) * 0.17 / (1.0 + dist*0.08);
          float blur = 0.0012 + 0.011*uRain + 0.003*uWind;
          vec3 refl = texture2D(tRefl, ruv).rgb * 0.4
            + texture2D(tRefl, ruv + vec2(blur, 0.0)).rgb * 0.15 + texture2D(tRefl, ruv - vec2(blur, 0.0)).rgb * 0.15
            + texture2D(tRefl, ruv + vec2(0.0, blur)).rgb * 0.15 + texture2D(tRefl, ruv - vec2(0.0, blur)).rgb * 0.15;

          vec2 suv = gl_FragCoord.xy / uRes;
          float dfade = clamp(depth*2.0, 0.0, 1.0);
          vec2 ruv2 = suv + off * 0.09 * dfade / (1.0 + dist*0.06);
          vec3 refr = texture2D(tRefr, ruv2).rgb;
          float wetEdge = 1.0 - smoothstep(0.0, 0.12, depth);
          refr = mix(refr, refr*vec3(0.8,0.78,0.7) + uScatter*0.5, wetEdge*0.35);

          vec3 col = mix(refr, refl, F);

          vec3 L = normalize(uSunDir);
          vec3 H = normalize(V + L);
          float nh = max(dot(n, H), 0.0);
          float a = 0.03 + 0.05*uWind + 0.05*uRain; float a2 = a*a;
          float dd = nh*nh*(a2 - 1.0) + 1.0;
          float D = a2 / (3.14159*dd*dd);
          float Fs = 0.02 + 0.98*pow(1.0 - max(dot(V, H), 0.0), 5.0);
          float nl = max(dot(n, L), 0.0);
          col += uSunRad * D * Fs * 0.25 * nl / max(NV, 0.08) * 0.5 * smoothstep(0.0, 0.08, L.y);

          if (uLantern > 0.01) {
            vec3 Ld = uLanternPos - vWP; float ld = length(Ld); vec3 Ll = Ld/ld;
            vec3 Hl = normalize(V + Ll); float nhl = max(dot(n, Hl), 0.0);
            float dl = nhl*nhl*(a2 - 1.0) + 1.0; float Dl = a2/(3.14159*dl*dl);
            col += vec3(1.0,0.62,0.28) * uLantern * 6.0 * Dl * 0.02 / max(NV, 0.08) / (1.0 + ld*ld*0.15) * max(dot(n,Ll),0.0);
          }

          gl_FragColor = vec4(col, edgeA);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.renderOrder = 5;
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);
  }

  buildCaustics() {
    const geo = new THREE.PlaneGeometry(S, S, 255, 255); geo.rotateX(-Math.PI / 2);
    this.caustScene = new THREE.Scene();
    this.caustCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.caustMat = new THREE.ShaderMaterial({
      uniforms: { ...this.uni, uLightDir: { value: new THREE.Vector3(0, -1, 0) }, uCSun: { value: 1 } },
      blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false, transparent: true,
      vertexShader: /* glsl */ `
        uniform sampler2D tTerr; uniform vec3 uLightDir; uniform vec2 uWindDir;
        varying vec3 vOld; varying vec3 vNew; varying float vVis;
        ${NOISE_GLSL}
        #define CH(uv) textureLod(tChop, uv, 1.2).rg
        ${CHOP_GLSL}
        void main(){
          vec2 xz = position.xz;
          float D = -textureLod(tTerr, guv(xz), 0.0).r;
          vVis = step(0.03, D);
          vec2 sl = surfSlope(xz, uGain, 0.8);
          vec3 n = normalize(vec3(-sl.x, 1.0, -sl.y));
          vec3 r  = refract(uLightDir, n, 1.0/1.333);
          vec3 r0 = refract(uLightDir, vec3(0.0,1.0,0.0), 1.0/1.333);
          vec3 s = vec3(xz.x, 0.0, xz.y);
          vec3 hit = s + r * (max(D,0.0) / -r.y);
          float D2 = max(-textureLod(tTerr, guv(hit.xz), 0.0).r, 0.0);
          hit = s + r * (D2 / -r.y);
          vec3 old = s + r0 * (D2 / -r0.y);
          vOld = old; vNew = hit;
          gl_Position = vec4(hit.xz / ${(S / 2).toFixed(1)}, 0.0, 1.0);
          if (D < 0.03) gl_Position = vec4(3.0, 3.0, 3.0, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform float uCSun;
        varying vec3 vOld; varying vec3 vNew; varying float vVis;
        void main(){
          float oa = length(dFdx(vOld)) * length(dFdy(vOld));
          float na = length(dFdx(vNew)) * length(dFdy(vNew));
          float I = min(oa / max(na, 1e-7), 7.0);
          gl_FragColor = vec4(I * vVis, 0.0, 0.0, 1.0);
        }`,
    });
    this.caustMat.extensions = { derivatives: true };
    const m = new THREE.Mesh(geo, this.caustMat);
    m.frustumCulled = false;
    this.caustScene.add(m);
  }

  resize(w, h, pr) {
    const rs = 0.62, fs = 0.8;
    this.reflRT.setSize(Math.max(2, Math.round(w * pr * rs)), Math.max(2, Math.round(h * pr * rs)));
    this.refrRT.setSize(Math.max(2, Math.round(w * pr * fs)), Math.max(2, Math.round(h * pr * fs)));
    this.uni.uRes.value.set(Math.round(w * pr), Math.round(h * pr));
  }

  oblique(cam, normal, constant) {
    cam.updateMatrixWorld();
    this.plane.set(normal, constant);
    this.plane.applyMatrix4(cam.matrixWorldInverse);
    const cp = this.cp.set(this.plane.normal.x, this.plane.normal.y, this.plane.normal.z, this.plane.constant);
    const pm = cam.projectionMatrix, q = this.q, e = pm.elements;
    q.x = (Math.sign(cp.x) + e[8]) / e[0];
    q.y = (Math.sign(cp.y) + e[9]) / e[5];
    q.z = -1.0;
    q.w = (1.0 + e[10]) / e[14];
    cp.multiplyScalar(2.0 / cp.dot(q));
    e[2] = cp.x; e[6] = cp.y; e[10] = cp.z + 1.0 - 0.003; e[14] = cp.w;
  }

  update(dt, camera) {
    this.wOff.addScaledVector(G.uWindDir.value, dt * (0.12 + 0.5 * G.uWind.value));
    this.caustMat.uniforms.uLightDir.value.copy(G.uSunDir.value).negate();
  }

  renderPasses(renderer, scene, camera, hooks) {
    const prevRT = renderer.getRenderTarget();
    const prevAuto = renderer.autoClear;
    this.mesh.visible = false;

    renderer.setRenderTarget(this.causticRT);
    renderer.setClearColor(0x000000, 1);
    renderer.clear();
    renderer.render(this.caustScene, this.caustCam);

    camera.updateMatrixWorld();
    const cp = this.tmpV.setFromMatrixPosition(camera.matrixWorld);
    this.rot.extractRotation(camera.matrixWorld);
    const look = this.tmpT.set(0, 0, -1).applyMatrix4(this.rot).add(cp);
    const up = this.tmpU.set(0, 1, 0).applyMatrix4(this.rot);
    const v = this.vcam;
    v.position.set(cp.x, -cp.y, cp.z);
    v.up.set(up.x, -up.y, up.z);
    v.lookAt(look.x, -look.y, look.z);
    v.far = camera.far; v.near = camera.near; v.fov = camera.fov; v.aspect = camera.aspect;
    v.updateMatrixWorld();
    v.projectionMatrix.copy(camera.projectionMatrix);
    v.matrixWorldInverse.copy(v.matrixWorld).invert();
    this.reflMat.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
    this.reflMat.multiply(v.projectionMatrix).multiply(v.matrixWorldInverse);
    this.oblique(v, new THREE.Vector3(0, 1, 0), 0.02);

    hooks.before('refl');
    renderer.setRenderTarget(this.reflRT);
    renderer.setClearColor(0x000000, 1);
    renderer.clear();
    renderer.render(scene, v);

    const r = this.rcam;
    r.copy(camera);
    r.layers.set(1);
    r.updateMatrixWorld();
    r.matrixWorldInverse.copy(r.matrixWorld).invert();
    this.oblique(r, new THREE.Vector3(0, -1, 0), 0.03);
    G.uRefr.value = 1;
    hooks.before('refr');
    renderer.setRenderTarget(this.refrRT);
    renderer.setClearColor(new THREE.Color(G.uScatter.value.x, G.uScatter.value.y, G.uScatter.value.z), 1);
    renderer.clear();
    renderer.render(scene, r);
    G.uRefr.value = 0;
    hooks.before('main');

    renderer.setRenderTarget(prevRT);
    renderer.autoClear = prevAuto;
    this.mesh.visible = true;
  }
}
