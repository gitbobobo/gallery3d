// 地形：池底 + 泥岸（径向网格），卵石，水下草，岸上草丛；池底焦散
import * as THREE from 'three';
import { terrainHeight, depthAt, shoreRadius, fbm, rand, clamp, smoothstep, DOMAIN, DOMAIN_W, DOMAIN_H } from './common.js';

export function createTerrain(simUniforms) {
  const group = new THREE.Group();
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), sc = new THREE.Vector3();

  // ---------- 地形网格 ----------
  const SEG_T = 200, SEG_R = 130, R_MAX = 30;
  const verts = [], cols = [], idx = [];
  const cSand = new THREE.Color(0x9b8a6d), cMudDeep = new THREE.Color(0x4e4538);
  const cWet = new THREE.Color(0x5b4c3a), cDirt = new THREE.Color(0x77644a);
  const cGrass = new THREE.Color(0x5d7c3c), cGrass2 = new THREE.Color(0x74914a);
  const tmp = new THREE.Color();
  for (let j = 0; j <= SEG_R; j++) {
    const r = Math.pow(j / SEG_R, 1.35) * R_MAX; // 中心密
    for (let i = 0; i <= SEG_T; i++) {
      const th = i / SEG_T * Math.PI * 2;
      const x = Math.cos(th) * r, z = Math.sin(th) * r;
      const y = terrainHeight(x, z);
      verts.push(x, y, z);
      const n = fbm(x * 0.35, z * 0.35, 3);
      if (y < -0.04) {
        const d = clamp(-y / 2.4, 0, 1);
        tmp.copy(cSand).lerp(cMudDeep, d * 0.85);
        tmp.offsetHSL(0, 0, (n - 0.5) * 0.09);
      } else if (y < 0.16) {
        tmp.copy(cWet); tmp.offsetHSL(0, 0, (n - 0.5) * 0.1);
      } else if (y < 0.55) {
        tmp.copy(cDirt).lerp(cGrass, smoothstep(0.28, 0.55, y) * 0.7);
        tmp.offsetHSL(0, 0, (n - 0.5) * 0.12);
      } else {
        tmp.copy(cGrass).lerp(cGrass2, n);
        tmp.offsetHSL(0, (n - 0.5) * 0.06, (n - 0.5) * 0.14);
      }
      cols.push(tmp.r, tmp.g, tmp.b);
    }
  }
  for (let j = 0; j < SEG_R; j++) {
    for (let i = 0; i < SEG_T; i++) {
      const a = j * (SEG_T + 1) + i, b = a + 1, c = a + SEG_T + 1, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();

  const terrainMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.96, metalness: 0 });
  terrainMat.onBeforeCompile = (sh) => {
    sh.uniforms.tHeight = simUniforms.tHeight;
    sh.uniforms.uTime = simUniforms.uTime;
    sh.uniforms.uSunDir = simUniforms.uSunDir;
    sh.uniforms.uSunCol = simUniforms.uSunColor;
    sh.uniforms.uCaustic = simUniforms.uCaustic;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWp;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvWp = (modelMatrix * vec4(transformed,1.)).xyz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
        varying vec3 vWp;
        uniform sampler2D tHeight;
        uniform float uTime, uCaustic;
        uniform vec3 uSunDir, uSunCol;`)
      .replace('#include <opaque_fragment>', `
        {
          float depth = -vWp.y;
          if (depth > 0.015) {
            // 水面波场拉普拉斯 → 光线汇聚（焦散）
            vec2 uv = vec2((vWp.x - (${DOMAIN.x0.toFixed(1)})) / ${DOMAIN_W.toFixed(1)},
                           (vWp.z - (${DOMAIN.z0.toFixed(1)})) / ${DOMAIN_H.toFixed(1)});
            vec2 ee = vec2(1.0 / 256.0);
            float hc = texture2D(tHeight, uv).r;
            float lap = (texture2D(tHeight, uv + vec2(ee.x, 0.)).r + texture2D(tHeight, uv - vec2(ee.x, 0.)).r +
                         texture2D(tHeight, uv + vec2(0., ee.y)).r + texture2D(tHeight, uv - vec2(0., ee.y)).r - 4.0 * hc);
            float focus = clamp(1.0 + lap * (60.0 + depth * 130.0), 0.0, 4.0);
            focus = pow(focus, 3.0);
            float shimmer = 0.6 + 0.4 * sin(vWp.x * 3.1 + uTime * 2.0) * sin(vWp.z * 2.7 - uTime * 1.7);
            float mask = smoothstep(0.015, 0.16, depth) * (1.0 - smoothstep(0.9, 2.1, depth));
            float sun = clamp(uSunDir.y * 1.4, 0.0, 1.0);
            float ca = focus * shimmer * mask * sun * uCaustic;
            outgoingLight += diffuseColor.rgb * uSunCol * ca * 1.4;
            outgoingLight += uSunCol * ca * 0.05;
            // 深水压暗
            outgoingLight *= mix(1.0, 0.3, smoothstep(0.3, 2.3, depth));
          } else {
            // 水线湿泥
            float wet = smoothstep(0.16, 0.02, abs(vWp.y - 0.02));
            outgoingLight *= 1.0 - wet * 0.35;
          }
        }
        #include <opaque_fragment>`);
  };
  const terrain = new THREE.Mesh(geo, terrainMat);
  terrain.receiveShadow = true;
  group.add(terrain);

  // ---------- 卵石 ----------
  const rockGeo = new THREE.IcosahedronGeometry(1, 1);
  {
    const p = rockGeo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const n = fbm(v.x * 1.3 + 7, v.y * 1.3 + v.z, 2);
      v.multiplyScalar(0.8 + n * 0.45);
      v.y *= 0.62;
      p.setXYZ(i, v.x, v.y, v.z);
    }
    rockGeo.computeVertexNormals();
  }
  const rockMat = new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0.02 });
  const N_ROCK = 160;
  const rocks = new THREE.InstancedMesh(rockGeo, rockMat, N_ROCK);
  const rc = new THREE.Color();
  for (let i = 0; i < N_ROCK; i++) {
    const th = rand(Math.PI * 2);
    const rr = i < 95 ? rand(1.0, 1.15) : rand(0.86, 0.995);
    const sr = shoreRadius(th);
    const x = Math.cos(th) * sr * rr, z = Math.sin(th) * sr * rr;
    const y = terrainHeight(x, z);
    const s = rand(0.06, 0.26);
    e.set(rand(Math.PI), rand(Math.PI * 2), rand(Math.PI));
    q.setFromEuler(e);
    sc.set(s * rand(0.8, 1.4), s * rand(0.55, 0.9), s * rand(0.8, 1.4));
    m4.compose(new THREE.Vector3(x, y + s * 0.15, z), q, sc);
    rocks.setMatrixAt(i, m4);
    const g = rand(0.35, 0.62);
    rc.setRGB(g * rand(0.9, 1.1), g * rand(0.85, 1.0), g * rand(0.8, 0.95));
    rocks.setColorAt(i, rc);
  }
  rocks.castShadow = true; rocks.receiveShadow = true;
  group.add(rocks);

  // ---------- 水下草（浅水里摇曳的丝带） ----------
  const weedGeo = new THREE.PlaneGeometry(0.07, 1, 1, 6);
  weedGeo.translate(0, 0.5, 0);
  const weedMat = new THREE.MeshLambertMaterial({ color: 0x2d5a30, side: THREE.DoubleSide });
  weedMat.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = simUniforms.uTime;
    sh.uniforms.uWind = simUniforms.uWind;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uTime,uWind;\nattribute float aPhase;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        {
          float k = transformed.y;
          float sw = sin(uTime * (1.2 + uWind) + aPhase + k * 1.5) * (0.08 + uWind * 0.1);
          transformed.x += sw * k; transformed.z += sw * 0.6 * k;
        }`);
  };
  const N_WEED = 46;
  const weeds = new THREE.InstancedMesh(weedGeo, weedMat, N_WEED);
  const weedPhase = new THREE.InstancedBufferAttribute(new Float32Array(N_WEED), 1);
  for (let i = 0; i < N_WEED; i++) {
    let x = 0, z = 0, tries = 0;
    do {
      const th = rand(Math.PI * 2);
      const rr = rand(0.7, 0.96);
      const sr = shoreRadius(th);
      x = Math.cos(th) * sr * rr; z = Math.sin(th) * sr * rr;
    } while (depthAt(x, z) < 0.15 && ++tries < 10);
    const d = Math.max(0.2, depthAt(x, z));
    const hgt = Math.min(rand(0.5, 1.1), d + 0.05);
    m4.compose(new THREE.Vector3(x, -d, z),
      q.setFromEuler(e.set(0, rand(Math.PI * 2), 0)),
      sc.set(rand(0.8, 1.6), hgt, 1));
    weeds.setMatrixAt(i, m4);
    weedPhase.setX(i, rand(Math.PI * 2));
  }
  weedGeo.setAttribute('aPhase', weedPhase);
  group.add(weeds);

  // ---------- 岸上草丛 ----------
  const tuftGeo = new THREE.PlaneGeometry(0.55, 0.55, 1, 3);
  tuftGeo.translate(0, 0.26, 0);
  const tuftMat = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });
  tuftMat.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = simUniforms.uTime;
    sh.uniforms.uWind = simUniforms.uWind;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uTime,uWind;\nattribute float aPhase;\nvarying vec2 vUvG;\nvarying float vPhG;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        vUvG = uv; vPhG = aPhase;
        transformed.x += sin(uTime * (1.6 + uWind * 2.5) + aPhase) * (0.03 + uWind * 0.13) * transformed.y * 2.2;`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vUvG;\nvarying float vPhG;')
      .replace('#include <color_fragment>', `#include <color_fragment>
        // 把方片裁成一丛草叶
        float blade = fract(vUvG.x * 9.0 + vPhG * 3.7);
        float width = (1.0 - vUvG.y) * 0.5 + 0.03;
        if (blade > width) discard;
        diffuseColor.rgb *= 0.55 + 0.55 * vUvG.y;`);
  };
  const N_TUFT = 120;
  const tufts = new THREE.InstancedMesh(tuftGeo, tuftMat, N_TUFT);
  const tuftPhase = new THREE.InstancedBufferAttribute(new Float32Array(N_TUFT), 1);
  const gc = new THREE.Color();
  for (let i = 0; i < N_TUFT; i++) {
    const th = rand(Math.PI * 2);
    const sr = shoreRadius(th);
    const rr = rand(1.02, 1.5);
    const x = Math.cos(th) * sr * rr, z = Math.sin(th) * sr * rr;
    const y = terrainHeight(x, z);
    if (y < 0.12) { tuftPhase.setX(i, 0); m4.makeScale(0, 0, 0); tufts.setMatrixAt(i, m4); continue; }
    m4.compose(new THREE.Vector3(x, y - 0.03, z),
      q.setFromEuler(e.set(0, rand(Math.PI * 2), rand(-0.12, 0.12))),
      sc.set(rand(0.6, 1.4), rand(0.45, 1.05), 1));
    tufts.setMatrixAt(i, m4);
    tuftPhase.setX(i, rand(Math.PI * 2));
    gc.setHSL(0.24 + rand(-0.03, 0.04), rand(0.4, 0.6), rand(0.28, 0.45));
    tufts.setColorAt(i, gc);
  }
  tuftGeo.setAttribute('aPhase', tuftPhase);
  group.add(tufts);

  return { group };
}
