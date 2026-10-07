import * as THREE from 'three';
import { SIM_HALF, SIM_RES, CELL } from '../pond.js';
import { G, GLSL_NOISE, LAYER, setLayers } from '../shared.js';

export class WaterSurface {
  constructor(renderer, windWaves, bedTex) {
    this.renderer = renderer;
    this.reflCam = new THREE.PerspectiveCamera();
    this.reflCam.layers.set(LAYER.REFL);
    this.refrCam = new THREE.PerspectiveCamera();
    this.refrCam.layers.set(LAYER.REFR);
    this.textureMatrix = new THREE.Matrix4();
    this.viewProj = new THREE.Matrix4();

    this.reflRT = new THREE.WebGLRenderTarget(4, 4, {
      type: THREE.HalfFloatType,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
      magFilter: THREE.LinearFilter,
    });
    this.refrRT = new THREE.WebGLRenderTarget(4, 4, {
      type: THREE.HalfFloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      generateMipmaps: false,
    });
    this.refrRT.depthTexture = new THREE.DepthTexture(4, 4);
    this.refrRT.depthTexture.type = THREE.UnsignedIntType;

    this.refrClip = [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.12)];

    const seg = SIM_RES - 1;
    const geo = new THREE.PlaneGeometry(SIM_HALF * 2, SIM_HALF * 2, seg, seg);
    geo.rotateX(-Math.PI / 2);

    this.uniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.fog]);
    Object.assign(this.uniforms, {
      uTime: G.uTime,
      uWind: G.uWind,
      uWindDir: G.uWindDir,
      uRain: G.uRain,
      uSim: G.uSim,
      uAbsorb: G.uAbsorb,
      uBed: { value: bedTex },
      uWindTex: { value: windWaves.texture },
      uWindL: { value: windWaves.L },
      uSimHalf: { value: SIM_HALF },
      uTexel: { value: 1 / SIM_RES },
      uCell: { value: CELL },
      uRefl: { value: this.reflRT.texture },
      uRefr: { value: this.refrRT.texture },
      uRefrDepth: { value: this.refrRT.depthTexture },
      uTexMatrix: { value: this.textureMatrix },
      uViewProj: { value: this.viewProj },
      uScreen: { value: new THREE.Vector2(1, 1) },
      uNear: { value: 0.1 },
      uFar: { value: 400 },
      uLightDir: { value: new THREE.Vector3(0, 1, 0) },
      uLightCol: { value: new THREE.Color() },
      uSkyAmb: { value: new THREE.Color() },
      uScatter: { value: new THREE.Color() },
      uHorizon: { value: new THREE.Color() },
      uShadow: { value: null },
      uShadowMat: { value: new THREE.Matrix4() },
      uHasShadow: { value: 0 },
      uShadowTexel: { value: 1 / 2048 },
      uNight: { value: 0 },
    });

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      defines: { HAS_SHADOW: 0 },
      fog: true,
      vertexShader: /* glsl */ `
        uniform sampler2D uSim;
        uniform float uSimHalf;
        varying vec3 vWorld;
        varying vec2 vSimUv;
        varying float vViewZ;
        #include <fog_pars_vertex>
        void main(){
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vec2 suv = wp.xz / (2.0 * uSimHalf) + 0.5;
          vSimUv = suv;
          wp.y += texture2D(uSim, suv).r;
          vWorld = wp.xyz;
          vec4 mvPosition = viewMatrix * wp;
          vViewZ = -mvPosition.z;
          gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        precision highp sampler2DShadow;
        uniform sampler2D uSim, uBed, uWindTex, uRefl, uRefr, uRefrDepth;
        #if HAS_SHADOW
        uniform sampler2DShadow uShadow;
        #endif
        uniform mat4 uShadowMat;
        uniform float uHasShadow, uShadowTexel;
        uniform mat4 uTexMatrix, uViewProj;
        uniform vec2 uScreen, uWindDir;
        uniform float uTime, uWind, uRain, uWindL, uSimHalf, uTexel, uCell, uNear, uFar, uNight;
        uniform vec3 uLightDir, uLightCol, uSkyAmb, uScatter, uAbsorb, uHorizon;
        varying vec3 vWorld;
        varying vec2 vSimUv;
        varying float vViewZ;
        #include <common>
        #include <fog_pars_fragment>
        ${GLSL_NOISE}

        float linZ(float d){
          float z = d * 2.0 - 1.0;
          return 2.0 * uNear * uFar / (uFar + uNear - z * (uFar - uNear));
        }
        float simCubic(vec2 uv){
          vec2 st = uv / uTexel - 0.5;
          vec2 i = floor(st);
          vec2 f = st - i;
          vec2 f2 = f * f, f3 = f2 * f;
          vec2 w0 = (1.0 - 3.0 * f + 3.0 * f2 - f3) / 6.0;
          vec2 w1 = (4.0 - 6.0 * f2 + 3.0 * f3) / 6.0;
          vec2 w2 = (1.0 + 3.0 * f + 3.0 * f2 - 3.0 * f3) / 6.0;
          vec2 w3 = f3 / 6.0;
          vec2 g0 = w0 + w1, g1 = w2 + w3;
          vec2 h0 = (i - 1.0 + w1 / g0 + 0.5) * uTexel;
          vec2 h1 = (i + 1.0 + w3 / g1 + 0.5) * uTexel;
          return g0.y * (g0.x * texture2D(uSim, h0).r + g1.x * texture2D(uSim, vec2(h1.x, h0.y)).r)
               + g1.y * (g0.x * texture2D(uSim, vec2(h0.x, h1.y)).r + g1.x * texture2D(uSim, h1).r);
        }
        float gustAt(vec2 xz){
          vec2 p = xz * 0.13 - uWindDir * uTime * (0.6 + 1.6 * uWind);
          return vnoise(p) * 0.65 + vnoise(p * 2.3 + 5.0) * 0.35;
        }
        // procedural rain ripple rings; returns gradient
        vec2 rainLayer(vec2 p, float t, float density, float seed){
          vec2 cell = floor(p);
          vec2 f = p - cell;
          float r = h12(cell + seed);
          vec2 g = vec2(0.0);
          if (r < density) {
            float tt = fract(t * (1.1 + r * 0.6) + r * 13.0);
            vec2 c = 0.5 + (h22(cell + seed * 1.7 + floor(t * (1.1 + r * 0.6) + r * 13.0)) - 0.5) * 0.5;
            vec2 dv = f - c;
            float d = length(dv);
            float rad = tt * 0.48;
            float x = (d - rad) * 22.0;
            float env = (1.0 - tt) * (1.0 - tt) * smoothstep(0.5, 0.3, d);
            float w = cos(x * 3.0) * exp(-x * x);
            g = (dv / max(d, 1e-3)) * w * env;
          }
          return g;
        }

        void main(){
          vec2 suv = vSimUv;
          vec4 bed = texture2D(uBed, suv);
          // sim normal
          // cubic B-spline sampled heights give a C2 surface, so sharp sun/moon glints don't show the grid
          float hl = simCubic(suv - vec2(uTexel, 0.0));
          float hr = simCubic(suv + vec2(uTexel, 0.0));
          float hd = simCubic(suv - vec2(0.0, uTexel));
          float hu = simCubic(suv + vec2(0.0, uTexel));
          vec2 gSim = vec2(hr - hl, hu - hd) / (2.0 * uCell) * 1.6;

          // wind detail
          vec2 xz = vWorld.xz;
          float gust = gustAt(xz);
          vec2 w1 = texture2D(uWindTex, xz / uWindL).gb;
          const float c1 = 0.7986, s1 = 0.6018;
          vec2 r2 = mat2(c1, s1, -s1, c1) * xz;
          vec2 w2 = texture2D(uWindTex, r2 / (uWindL * 1.37) + 0.31).gb / 1.37;
          w2 = mat2(c1, -s1, s1, c1) * w2;
          float sheltered = mix(0.35, 1.0, smoothstep(0.0, 1.2, -bed.g));
          float gk = mix(0.35, 1.65, gust) * sheltered;
          vec2 gWind = (w1 * 0.72 + w2 * 0.62) * gk;

          // fine capillary sparkle at stronger wind
          vec2 fineP = xz * 9.0 - uWindDir * uTime * 2.0;
          float fn = vnoise(fineP) - vnoise(fineP + vec2(0.37, 0.11));
          float fn2 = vnoise(fineP.yx * 1.3 + 4.0) - vnoise(fineP.yx * 1.3 + 4.0 + vec2(0.29, 0.21));
          vec2 gFine = vec2(fn, fn2) * (0.04 + 0.3 * uWind * uWind) * gust;

          // rain rings
          vec2 gRain = vec2(0.0);
          if (uRain > 0.01) {
            float dens = uRain * 0.85;
            gRain += rainLayer(xz * 3.2, uTime * 1.3, dens, 0.0);
            gRain += rainLayer(xz * 3.2 + 0.5, uTime * 1.3 + 0.37, dens, 3.1);
            gRain += rainLayer(xz * 4.5 + 0.23, uTime * 1.5 + 0.71, dens, 7.3);
            gRain *= 0.28 * smoothstep(0.0, 0.3, uRain);
          }

          float distK = 1.0 / (1.0 + vViewZ * 0.025);
          vec2 grad = gSim + gWind * mix(0.6, 1.0, distK) + gFine * distK * distK + gRain * distK;
          vec3 N = normalize(vec3(-grad.x, 1.0, -grad.y));

          vec3 V = normalize(cameraPosition - vWorld);
          float NoV = max(dot(N, V), 0.0);
          float F = 0.02 + 0.98 * pow(1.0 - NoV, 5.0);

          // ---- refraction ----
          vec2 suvScreen = gl_FragCoord.xy / uScreen;
          float waterZ = vViewZ;
          float sceneZ = linZ(texture2D(uRefrDepth, suvScreen).r);
          float thick0 = max(sceneZ - waterZ, 0.0);
          vec3 I = -V;
          vec3 T = refract(I, N, 1.0 / 1.333);
          float vdepth = thick0 * max(-I.y, 0.03);
          vdepth = min(vdepth, 3.0);
          float L = vdepth / max(-T.y, 0.15);
          vec3 hit = vWorld + T * L;
          vec4 clip = uViewProj * vec4(hit, 1.0);
          vec2 tuv = clip.xy / clip.w * 0.5 + 0.5;
          float z2 = linZ(texture2D(uRefrDepth, tuv).r);
          bool bad = z2 < waterZ - 0.05 || any(lessThan(tuv, vec2(0.0))) || any(greaterThan(tuv, vec2(1.0)));
          if (bad) { tuv = suvScreen + grad * 0.01; z2 = sceneZ; }
          vec3 refr = texture2D(uRefr, tuv).rgb;
          float thick = max(z2 - waterZ, 0.0);
          float vd2 = thick * max(-I.y, 0.03);
          float path = min(vd2 / max(-T.y, 0.15), 12.0);
          vec3 trans = exp(-uAbsorb * path * 1.2);

          float shadow = 1.0;
          #if HAS_SHADOW
          {
            vec4 sc = uShadowMat * vec4(vWorld, 1.0);
            sc.xyz /= sc.w;
            if (sc.x > 0.0 && sc.x < 1.0 && sc.y > 0.0 && sc.y < 1.0) {
              // 3x3 PCF; the jittered rotation hides the shadow-map texel grid in sharp glints
              float ang = h12(gl_FragCoord.xy) * 6.2832;
              mat2 rot = mat2(cos(ang), sin(ang), -sin(ang), cos(ang));
              float s = 0.0;
              for (int i = -1; i <= 1; i++)
                for (int j = -1; j <= 1; j++)
                  s += texture(uShadow, vec3(sc.xy + rot * vec2(float(i), float(j)) * (1.6 * uShadowTexel), sc.z - 0.002));
              shadow = s / 9.0;
            }
          }
          #endif
          vec3 inscatter = uScatter * (1.0 + 0.6 * shadow * dot(uLightCol, vec3(0.33)) / 3.0);
          vec3 water = refr * trans + inscatter * (1.0 - trans);

          // ---- reflection ----
          vec4 rc = uTexMatrix * vec4(vWorld.x, 0.0, vWorld.z, 1.0);
          vec2 ruv = rc.xy / rc.w;
          vec2 distort = vec2(N.x, N.z) * (0.55 / (1.0 + vViewZ * 0.06)) * 0.12;
          ruv += distort;
          float bias = uRain * 3.0 + clamp(length(gWind) * 6.0, 0.0, 1.5);
          ruv = clamp(ruv, vec2(0.002), vec2(0.998));
          vec3 refl = min(texture(uRefl, ruv, bias).rgb, vec3(6.0));
          if (any(isnan(refl))) refl = uHorizon;

          // ---- specular glints ----
          vec3 Hh = normalize(uLightDir + V);
          float NoH = max(dot(N, Hh), 0.0);
          float VoH = max(dot(V, Hh), 0.0);
          float Fh = 0.02 + 0.98 * pow(1.0 - VoH, 5.0);
          float sharp0 = mix(2600.0, 900.0, uWind);
          // specular anti-aliasing: widen the lobe where the normal varies within a pixel
          vec3 dNx = dFdx(N), dNy = dFdy(N);
          float nVar = dot(dNx, dNx) + dot(dNy, dNy);
          float a2 = 2.0 / (sharp0 + 2.0) + min(nVar * 1.5, 0.25);
          float sharp = 2.0 / a2 - 2.0;
          float D1 = (sharp + 8.0) / 25.13 * pow(NoH, sharp);
          float D2 = (168.0 / 25.13) * pow(NoH, 160.0);
          float spec = Fh * (D1 * 0.85 + D2 * 0.15) * max(dot(N, uLightDir), 0.0);
          spec *= smoothstep(-0.02, 0.06, uLightDir.y) * shadow * (1.0 - uRain * 0.85);
          vec3 specCol = uLightCol * spec * (1.0 + uNight * 3.0);

          float shoreFade = smoothstep(0.0, 0.06, thick0);
          float Fk = F * shoreFade;
          vec3 col = mix(water, refl, Fk) + specCol * shoreFade;

          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          #include <fog_fragment>
        }
      `,
    });
    this.mesh = new THREE.Mesh(geo, this.material);
    this.mesh.renderOrder = 5;
    this.mesh.frustumCulled = false;
    setLayers(this.mesh, LAYER.MAIN);
  }

  setSize(w, h, quality) {
    const rs = quality > 0.6 ? 0.5 : 0.4;
    const fs = quality > 0.6 ? 0.75 : 0.6;
    this.reflRT.setSize(Math.max(2, Math.floor(w * rs)), Math.max(2, Math.floor(h * rs)));
    this.refrRT.setSize(Math.max(2, Math.floor(w * fs)), Math.max(2, Math.floor(h * fs)));
    this.uniforms.uScreen.value.set(w, h);
  }

  updateShadow(light) {
    const sm = light.shadow.map;
    if (sm && sm.depthTexture) {
      this.uniforms.uShadow.value = sm.depthTexture;
      this.uniforms.uShadowMat.value.copy(light.shadow.matrix);
      this.uniforms.uHasShadow.value = 1;
      this.uniforms.uShadowTexel.value = 1 / light.shadow.mapSize.x;
      if (this.material.defines.HAS_SHADOW !== 1) {
        this.material.defines.HAS_SHADOW = 1;
        this.material.needsUpdate = true;
      }
    }
  }

  renderPasses(scene, camera) {
    const r = this.renderer;
    const u = this.uniforms;
    u.uNear.value = camera.near;
    u.uFar.value = camera.far;
    this.viewProj.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);

    // --- reflection camera (mirror about y=0) ---
    const rc = this.reflCam;
    rc.near = camera.near;
    rc.far = camera.far;
    rc.fov = camera.fov;
    rc.aspect = camera.aspect;
    const cp = camera.position;
    rc.position.set(cp.x, -cp.y, cp.z);
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    const tgt = cp.clone().add(dir);
    tgt.y = -tgt.y;
    rc.up.set(0, 1, 0);
    const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
    rc.up.set(camUp.x, -camUp.y, camUp.z);
    rc.lookAt(tgt);
    rc.updateMatrixWorld();
    rc.projectionMatrix.copy(camera.projectionMatrix);
    this.textureMatrix.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
    this.textureMatrix.multiply(rc.projectionMatrix).multiply(rc.matrixWorldInverse);
    // oblique near plane clipping at y = -0.02
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.03);
    plane.applyMatrix4(rc.matrixWorldInverse);
    const clipPlane = new THREE.Vector4(plane.normal.x, plane.normal.y, plane.normal.z, plane.constant);
    const pm = rc.projectionMatrix;
    const q = new THREE.Vector4(
      (Math.sign(clipPlane.x) + pm.elements[8]) / pm.elements[0],
      (Math.sign(clipPlane.y) + pm.elements[9]) / pm.elements[5],
      -1,
      (1 + pm.elements[10]) / pm.elements[14]
    );
    clipPlane.multiplyScalar(2 / clipPlane.dot(q));
    pm.elements[2] = clipPlane.x;
    pm.elements[6] = clipPlane.y;
    pm.elements[10] = clipPlane.z + 1;
    pm.elements[14] = clipPlane.w;
    rc.projectionMatrixInverse.copy(pm).invert();

    r.setRenderTarget(this.reflRT);
    r.clear();
    r.render(scene, rc);

    // --- refraction (underwater only) ---
    const fc = this.refrCam;
    fc.position.copy(camera.position);
    fc.quaternion.copy(camera.quaternion);
    fc.near = camera.near;
    fc.far = camera.far;
    fc.fov = camera.fov;
    fc.aspect = camera.aspect;
    fc.projectionMatrix.copy(camera.projectionMatrix);
    fc.projectionMatrixInverse.copy(camera.projectionMatrixInverse);
    fc.updateMatrixWorld();
    r.clippingPlanes = this.refrClip;
    r.setRenderTarget(this.refrRT);
    r.clear();
    r.render(scene, fc);
    r.clippingPlanes = [];
    r.setRenderTarget(null);
  }
}
