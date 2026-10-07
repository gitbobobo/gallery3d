import * as THREE from 'three';
import { SIM, POND_GLSL, SIM_GLSL, gerstnerGLSL } from './pond.js';
import { U } from './env.js';

export function createWater(scene) {
  const rgba = new Float32Array(SIM.nx * SIM.nz * 4);
  const tex = new THREE.DataTexture(rgba, SIM.nx, SIM.nz, THREE.RGBAFormat, THREE.FloatType);
  tex.flipY = false;
  tex.generateMipmaps = false;
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.colorSpace = THREE.NoColorSpace;
  tex.needsUpdate = true;
  U.uWave.value = tex;

  const reflectorPlane = new THREE.Plane();
  const normal = new THREE.Vector3();
  const reflectorWorldPosition = new THREE.Vector3();
  const cameraWorldPosition = new THREE.Vector3();
  const rotationMatrix = new THREE.Matrix4();
  const lookAtPosition = new THREE.Vector3();
  const obliqueClip = new THREE.Vector4();
  const view = new THREE.Vector3();
  const target = new THREE.Vector3();
  const q = new THREE.Vector4();
  const textureMatrix = new THREE.Matrix4();
  const virtualCamera = new THREE.PerspectiveCamera();

  const reflectRT = new THREE.WebGLRenderTarget(2, 2, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: true,
    stencilBuffer: false,
  });
  const refractRT = new THREE.WebGLRenderTarget(2, 2, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: true,
    stencilBuffer: false,
  });
  refractRT.depthTexture = new THREE.DepthTexture(2, 2);
  refractRT.depthTexture.format = THREE.DepthFormat;
  refractRT.depthTexture.type = THREE.UnsignedIntType;

  const geo = new THREE.PlaneGeometry(SIM.x1 - SIM.x0, SIM.z1 - SIM.z0, 200, 160);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      textureMatrix: { value: textureMatrix },
      uReflect: { value: reflectRT.texture },
      uRefract: { value: refractRT.texture },
      uDepth: { value: refractRT.depthTexture },
      uWave: U.uWave,
      uSimOrigin: U.uSimOrigin,
      uSimSize: U.uSimSize,
      uSimTexel: U.uSimTexel,
      uTime: U.uTime,
      uWind: U.uWind,
      uRain: U.uRain,
      uSunDir: U.uSunDir,
      uSunColor: U.uSunColor,
      uSunAmt: U.uSunAmt,
      uMoonDir: U.uMoonDir,
      uMoonAmt: U.uMoonAmt,
      uDeep: U.uDeep,
      uShallow: U.uShallow,
      uScatter: U.uScatter,
      uAbsorb: U.uAbsorb,
      uResolution: U.uResolution,
      uNear: U.uNear,
      uFar: U.uFar,
    },
    vertexShader: `
      uniform mat4 textureMatrix;
      uniform float uTime;
      uniform float uWind;
      ${SIM_GLSL}
      ${gerstnerGLSL()}
      varying vec4 vMirror;
      varying vec3 vWorld;
      varying vec3 vFlat;
      varying float vViewZ;
      void main() {
        vMirror = textureMatrix * vec4(position, 1.0);
        vec4 flatWorld = modelMatrix * vec4(position, 1.0);
        vFlat = flatWorld.xyz;
        vec3 g = gerstnerAll(flatWorld.xz, uTime, uWind);
        float h = g.x + simH(flatWorld.xz);
        vec3 displaced = position;
        displaced.z += h;
        vec4 world = modelMatrix * vec4(displaced, 1.0);
        vWorld = world.xyz;
        vec4 mv = viewMatrix * world;
        vViewZ = mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform sampler2D uReflect;
      uniform sampler2D uRefract;
      uniform sampler2D uDepth;
      uniform float uTime;
      uniform float uWind;
      uniform float uRain;
      uniform float uSunAmt;
      uniform float uMoonAmt;
      uniform float uAbsorb;
      uniform float uNear;
      uniform float uFar;
      uniform vec2 uResolution;
      uniform vec3 uSunDir;
      uniform vec3 uSunColor;
      uniform vec3 uMoonDir;
      uniform vec3 uDeep;
      uniform vec3 uShallow;
      uniform vec3 uScatter;
      ${SIM_GLSL}
      ${gerstnerGLSL()}
      ${POND_GLSL}
      varying vec4 vMirror;
      varying vec3 vWorld;
      varying vec3 vFlat;
      varying float vViewZ;

      float perspectiveDepthToViewZ(const in float invClipZ, const in float near, const in float far) {
        return (near * far) / ((far - near) * invClipZ - far);
      }

      void main() {
        if (pondFactor(vFlat.xz) > 0.993) discard;
        vec3 g = gerstnerAll(vFlat.xz, uTime, uWind);
        float e = 0.08;
        float s0 = simH(vFlat.xz);
        float sx = (simH(vFlat.xz + vec2(e, 0.0)) - s0) / e;
        float sz = (simH(vFlat.xz + vec2(0.0, e)) - s0) / e;
        float dhdx = g.y + sx;
        float dhdz = g.z + sz;
        float micro = mix(0.02, 0.11, uWind) + uRain * 0.09;
        float freq = mix(2.5, 12.0, uWind);
        dhdx += micro * cos(vFlat.x * freq + vFlat.z * freq * 0.37 + uTime * (1.7 + uWind * 1.4));
        dhdz += micro * cos(vFlat.z * freq * 1.08 - vFlat.x * freq * 0.29 - uTime * 1.45);
        vec3 normal = normalize(vec3(-dhdx, 1.0, -dhdz));

        vec3 viewDir = normalize(cameraPosition - vWorld);
        float ndv = clamp(dot(normal, viewDir), 0.0, 1.0);
        float fres = 0.02 + 0.98 * pow(1.0 - ndv, 5.0);
        fres = mix(fres, fres * 0.72 + 0.06, uRain);

        vec2 distort = normal.xz;
        vec2 ruv = vMirror.xy / vMirror.w + distort * (0.055 + uWind * 0.02);
        vec3 refl;
        if (uRain > 0.04) {
          float b = 0.0045 + uRain * 0.01;
          refl = texture2D(uReflect, ruv).rgb * 0.42;
          refl += texture2D(uReflect, ruv + vec2(b, 0.4 * b)).rgb * 0.16;
          refl += texture2D(uReflect, ruv + vec2(-b, 0.2 * b)).rgb * 0.16;
          refl += texture2D(uReflect, ruv + vec2(0.3 * b, -b)).rgb * 0.13;
          refl += texture2D(uReflect, ruv + vec2(-0.6 * b, -0.7 * b)).rgb * 0.13;
        } else {
          refl = texture2D(uReflect, ruv).rgb;
        }
        refl = mix(refl, vec3(dot(refl, vec3(0.25, 0.5, 0.25))), uRain * 0.28);

        vec2 suv = gl_FragCoord.xy / uResolution + distort * (0.085 + uRain * 0.04);
        suv = clamp(suv, vec2(0.001), vec2(0.999));
        vec3 refr = texture2D(uRefract, suv).rgb;
        float sceneZ = perspectiveDepthToViewZ(texture2D(uDepth, suv).r, uNear, uFar);
        float thickness = max(0.0, vViewZ - sceneZ);
        float transmit = exp(-thickness * uAbsorb);
        float closeBottom = smoothstep(1.2, 0.16, thickness);
        vec3 tinted = mix(uDeep, refr * uShallow, transmit);
        vec3 waterCol = mix(tinted, refr, closeBottom);
        waterCol += uScatter * (1.0 - exp(-thickness * 0.75)) * 0.38 * (1.0 - closeBottom);

        vec3 color = mix(waterCol, refl, fres);
        vec3 L = normalize(uSunDir);
        vec3 H = normalize(L + viewDir);
        float specP = mix(180.0, 32.0, clamp(uWind, 0.0, 1.0));
        specP = mix(specP, 24.0, uRain);
        float spec = pow(clamp(dot(normal, H), 0.0, 1.0), specP);
        color += uSunColor * spec * uSunAmt * (1.0 - uRain * 0.8) * 1.55;

        vec3 Lm = normalize(uMoonDir);
        vec3 Hm = normalize(Lm + viewDir);
        float mspec = pow(clamp(dot(normal, Hm), 0.0, 1.0), mix(240.0, 64.0, uWind));
        color += vec3(0.75, 0.84, 1.0) * mspec * uMoonAmt * 1.7;

        float crest = smoothstep(0.05, 0.16, s0);
        color = mix(color, vec3(0.8, 0.86, 0.84), crest * 0.55);

        gl_FragColor = vec4(color, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0;
  mesh.userData.kind = 'water';
  mesh.frustumCulled = false;
  scene.add(mesh);

  const worldClip = new THREE.Plane(new THREE.Vector3(0, -1, 0), 10000);
  const mask = { refraction: [], reflection: [] };

  function setVisible(list, visible) {
    for (const obj of list) obj.visible = visible;
  }

  function renderReflection(renderer, camera) {
    mesh.visible = false;
    setVisible(mask.reflection, false);
    reflectorWorldPosition.setFromMatrixPosition(mesh.matrixWorld);
    cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld);
    rotationMatrix.extractRotation(mesh.matrixWorld);
    normal.set(0, 0, 1).applyMatrix4(rotationMatrix);
    view.subVectors(reflectorWorldPosition, cameraWorldPosition);
    if (view.dot(normal) > 0) {
      mesh.visible = true;
      setVisible(mask.reflection, true);
      return;
    }
    view.reflect(normal).negate();
    view.add(reflectorWorldPosition);
    rotationMatrix.extractRotation(camera.matrixWorld);
    lookAtPosition.set(0, 0, -1);
    lookAtPosition.applyMatrix4(rotationMatrix);
    lookAtPosition.add(cameraWorldPosition);
    target.subVectors(reflectorWorldPosition, lookAtPosition);
    target.reflect(normal).negate();
    target.add(reflectorWorldPosition);
    virtualCamera.position.copy(view);
    virtualCamera.up.set(0, 1, 0);
    virtualCamera.up.applyMatrix4(rotationMatrix);
    virtualCamera.up.reflect(normal);
    virtualCamera.lookAt(target);
    virtualCamera.far = camera.far;
    virtualCamera.near = camera.near;
    virtualCamera.updateMatrixWorld();
    virtualCamera.projectionMatrix.copy(camera.projectionMatrix);

    textureMatrix.set(
      0.5, 0, 0, 0.5,
      0, 0.5, 0, 0.5,
      0, 0, 0.5, 0.5,
      0, 0, 0, 1,
    );
    textureMatrix.multiply(virtualCamera.projectionMatrix);
    textureMatrix.multiply(virtualCamera.matrixWorldInverse);
    textureMatrix.multiply(mesh.matrixWorld);

    reflectorPlane.setFromNormalAndCoplanarPoint(normal, reflectorWorldPosition);
    reflectorPlane.applyMatrix4(virtualCamera.matrixWorldInverse);
    obliqueClip.set(reflectorPlane.normal.x, reflectorPlane.normal.y, reflectorPlane.normal.z, reflectorPlane.constant);
    const projectionMatrix = virtualCamera.projectionMatrix;
    q.x = (Math.sign(obliqueClip.x) + projectionMatrix.elements[8]) / projectionMatrix.elements[0];
    q.y = (Math.sign(obliqueClip.y) + projectionMatrix.elements[9]) / projectionMatrix.elements[5];
    q.z = -1;
    q.w = (1 + projectionMatrix.elements[10]) / projectionMatrix.elements[14];
    obliqueClip.multiplyScalar(2 / obliqueClip.dot(q));
    const clipBias = 0.004;
    projectionMatrix.elements[2] = obliqueClip.x;
    projectionMatrix.elements[6] = obliqueClip.y;
    projectionMatrix.elements[10] = obliqueClip.z + 1 - clipBias;
    projectionMatrix.elements[14] = obliqueClip.w;

    renderer.setRenderTarget(reflectRT);
    renderer.setClearColor(U.uSkyHorizon.value, 1);
    renderer.clear();
    renderer.render(scene, virtualCamera);
    renderer.setRenderTarget(null);
    mesh.visible = true;
    setVisible(mask.reflection, true);
  }

  function renderRefraction(renderer, camera) {
    mesh.visible = false;
    setVisible(mask.refraction, false);
    worldClip.constant = 0;
    renderer.setRenderTarget(refractRT);
    renderer.setClearColor(U.uDeep.value, 1);
    renderer.clear();
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    worldClip.constant = 10000;
    mesh.visible = true;
    setVisible(mask.refraction, true);
  }

  function setSize(w, h) {
    const rw = Math.max(2, Math.floor(w));
    const rh = Math.max(2, Math.floor(h));
    reflectRT.setSize(rw, rh);
    refractRT.setSize(rw, rh);
    U.uResolution.value.set(rw, rh);
  }

  function upload(sim) {
    const h = sim.curr;
    for (let i = 0; i < h.length; i++) rgba[i * 4] = h[i];
    tex.needsUpdate = true;
  }

  return {
    mesh,
    mask,
    worldClip,
    reflectRT,
    refractRT,
    setSize,
    upload,
    renderReflection,
    renderRefraction,
  };
}
