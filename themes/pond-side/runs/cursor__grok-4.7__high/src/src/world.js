import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {
  addSolidDisc,
  pondFactor,
  terrainHeight,
} from './pond.js';
import { U } from './env.js';
import {
  dressGrass,
  dressGround,
  dressLeaf,
  dressLily,
  dressReed,
  dressTree,
  dressWood,
} from './dress.js';

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function tag(obj, kind) {
  obj.traverse((o) => {
    if (o.isMesh) o.userData.kind = kind;
  });
}

function noRay(obj) {
  obj.traverse((o) => {
    o.raycast = () => {};
  });
}

export function createWorld(scene, sim) {
  const rand = mulberry32(14149);
  const posts = [];
  const lilies = [];
  const tips = [];

  const sky = createSky();
  scene.add(sky);

  const terrain = createTerrain();
  scene.add(terrain);

  const pebbles = createPebbles(rand);
  scene.add(pebbles);

  const rocks = createRocks(rand);
  scene.add(rocks);

  const grasses = createGrass(rand);
  scene.add(grasses);

  const reeds = createReeds(rand);
  scene.add(reeds);

  const tree = createTree(rand, tips);
  scene.add(tree.trunk);
  scene.add(tree.leaves);

  const dock = createDock(posts);
  scene.add(dock);
  for (const post of posts) addSolidDisc(sim, post.x, post.z, 0.2);

  const lilyGroup = createLilies(lilies);
  scene.add(lilyGroup);

  return { posts, lilies, tips, sky, terrain };
}

function createSky() {
  const geo = new THREE.SphereGeometry(42, 32, 18);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uTime: U.uTime,
      uRain: U.uRain,
      uSunDir: U.uSunDir,
      uSunColor: U.uSunColor,
      uSunAmt: U.uSunAmt,
      uMoonDir: U.uMoonDir,
      uMoonAmt: U.uMoonAmt,
      uStarAmt: U.uStarAmt,
      uSkyTop: U.uSkyTop,
      uSkyHorizon: U.uSkyHorizon,
      uSkyGround: U.uSkyGround,
    },
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vDir = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: `
      varying vec3 vDir;
      uniform float uTime;
      uniform float uRain;
      uniform float uSunAmt;
      uniform float uMoonAmt;
      uniform float uStarAmt;
      uniform vec3 uSunDir;
      uniform vec3 uSunColor;
      uniform vec3 uMoonDir;
      uniform vec3 uSkyTop;
      uniform vec3 uSkyHorizon;
      uniform vec3 uSkyGround;

      float hash12(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash12(i);
        float b = hash12(i + vec2(1.0, 0.0));
        float c = hash12(i + vec2(0.0, 1.0));
        float d = hash12(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p *= 2.07;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec3 dir = normalize(vDir - cameraPosition);
        float h = dir.y;
        vec3 col = mix(uSkyHorizon, uSkyTop, pow(smoothstep(0.0, 0.45, max(h, 0.0)), 0.55));
        col = mix(uSkyGround, col, smoothstep(-0.18, 0.05, h));

        vec2 cuv = dir.xz / max(dir.y + 0.32, 0.08);
        float n = fbm(cuv * 1.15 + vec2(uTime * 0.008, uTime * 0.003));
        float cloud = smoothstep(0.62, 0.9, n) * smoothstep(0.02, 0.28, h);
        vec3 cloudCol = mix(vec3(1.0, 0.98, 0.96), uSkyHorizon, 0.4);
        cloudCol = mix(cloudCol, vec3(0.45, 0.48, 0.5), uRain);
        col = mix(col, cloudCol, cloud * mix(0.5, 0.95, uRain));
        col *= mix(1.0, 0.38, uRain);
        col = mix(col, vec3(0.16, 0.18, 0.2), uRain * 0.45);

        float sd = dot(dir, normalize(uSunDir));
        float sun = smoothstep(0.99915, 0.9997, sd);
        float glow = pow(max(sd, 0.0), 84.0);
        col += (sun * 5.5 + glow * 0.7) * uSunColor * uSunAmt * (1.0 - uRain * 0.85);

        float md = dot(dir, normalize(uMoonDir));
        float moon = smoothstep(0.9981, 0.99935, md);
        float crater = noise(dir.xy * 180.0);
        float mglow = pow(max(md, 0.0), 14.0);
        col += (moon * (0.75 + 0.25 * crater) * 4.2 + mglow * 0.45) * vec3(0.86, 0.91, 1.0) * uMoonAmt;

        float star = hash12(floor((dir.xy + dir.yz) * 380.0));
        float stars = smoothstep(0.993, 0.9992, star) * smoothstep(0.08, 0.3, h);
        col += stars * uStarAmt * (1.0 - uRain);

        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -10;
  mesh.userData.kind = 'sky';
  noRay(mesh);
  return mesh;
}

function createTerrain() {
  const geo = new THREE.PlaneGeometry(38, 32, 128, 108);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const cDeep = new THREE.Color('#3a3228');
  const cShallow = new THREE.Color('#7b6846');
  const cWet = new THREE.Color('#4a3828');
  const cDry = new THREE.Color('#8d7452');
  const cFar = new THREE.Color('#74624a');
  const tmp = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const h = terrainHeight(x, z);
    pos.setY(i, h);
    const f = pondFactor(x, z);
    const n = ((Math.sin(x * 3.1) + Math.sin(z * 2.7)) * 0.5 + 1) * 0.5;
    if (h < -0.7) tmp.copy(cDeep);
    else if (h < -0.05) tmp.copy(cShallow).lerp(cDeep, Math.min(1, -h / 1.2));
    else if (h < 0.07) tmp.copy(cWet);
    else if (f < 1.6) tmp.copy(cDry);
    else tmp.copy(cFar);
    tmp.offsetHSL(0, 0, (n - 0.5) * 0.06);
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.94,
    metalness: 0,
    side: THREE.DoubleSide,
  });
  dressGround(mat);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  mesh.userData.kind = 'terrain';
  return mesh;
}

function createPebbles(rand) {
  const geo = new THREE.IcosahedronGeometry(1, 0);
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.58, metalness: 0.05 });
  dressGround(mat);
  const count = 230;
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  let n = 0;
  for (let guard = 0; n < count && guard < 5000; guard++) {
    const x = n < 80 ? -1.6 + rand() * 3.6 : (rand() * 2 - 1) * 7.4;
    const z = n < 80 ? 2.95 + rand() * 1.5 : (rand() * 2 - 1) * 5.8;
    const f = pondFactor(x, z);
    const h = terrainHeight(x, z);
    const shore = f > 0.9 && f < 1.28 && h > -0.02 && h < 0.45;
    const shallow = h < -0.02 && h > -0.62 && f < 1;
    if (!shore && !shallow) continue;
    if (shallow && z < -0.4 && rand() > 0.4) continue;
    const s = shallow ? 0.035 + rand() * 0.09 : 0.04 + rand() * 0.14;
    dummy.position.set(x, h + (shallow ? s * 0.15 : -s * 0.35), z);
    dummy.rotation.set(rand() * 6, rand() * 6, rand() * 6);
    dummy.scale.set(s * (0.7 + rand() * 0.8), s * (0.45 + rand() * 0.5), s * (0.7 + rand()));
    dummy.updateMatrix();
    mesh.setMatrixAt(n, dummy.matrix);
    const tone = rand();
    if (tone < 0.55) color.set('#9a9286');
    else if (tone < 0.82) color.set('#b7a48a');
    else color.set('#6e7a68');
    color.offsetHSL(0, 0, (rand() - 0.5) * 0.08);
    mesh.setColorAt(n, color);
    n++;
  }
  mesh.count = n;
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;
  mesh.userData.kind = 'pebble';
  return mesh;
}

function createRocks(rand) {
  const group = new THREE.Group();
  const spots = [
    [-6.15, -1.55],
    [-5.7, -2.7],
    [5.9, 2.15],
    [4.8, 3.3],
    [-3.2, 4.15],
    [1.2, 4.55],
  ];
  for (const [x, z] of spots) {
    const geo = new THREE.DodecahedronGeometry(0.28 + rand() * 0.22, 0);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const jiggle = 0.82 + rand() * 0.36;
      pos.setXYZ(i, pos.getX(i) * jiggle, pos.getY(i) * (0.55 + rand() * 0.3), pos.getZ(i) * jiggle);
    }
    geo.computeVertexNormals();
    const mat = new THREE.MeshStandardMaterial({
      color: rand() > 0.5 ? '#8a8176' : '#6d645c',
      roughness: 0.78,
      metalness: 0.04,
    });
    dressGround(mat);
    const mesh = new THREE.Mesh(geo, mat);
    const h = terrainHeight(x, z);
    mesh.position.set(x, h - 0.1, z);
    mesh.rotation.set(rand(), rand(), rand());
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.kind = 'rock';
    group.add(mesh);
  }
  return group;
}

function createGrass(rand) {
  const geo = new THREE.PlaneGeometry(0.07, 0.42, 1, 4);
  geo.translate(0, 0.21, 0);
  const phases = [];
  const matrices = [];
  const dummy = new THREE.Object3D();
  for (let guard = 0, n = 0; n < 90 && guard < 2500; guard++) {
    const x = (rand() * 2 - 1) * 6.2;
    const z = (rand() * 2 - 1) * 4.6;
    const h = terrainHeight(x, z);
    if (h > -0.08 || h < -0.7) continue;
    if (z < -1 && rand() > 0.45) continue;
    dummy.position.set(x, h, z);
    dummy.rotation.y = rand() * Math.PI;
    dummy.scale.set(0.7 + rand(), 0.55 + rand() * 0.9, 1);
    dummy.updateMatrix();
    matrices.push(dummy.matrix.clone());
    phases.push(rand() * Math.PI * 2);
    n++;
  }
  const mat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  dressGrass(mat);
  const mesh = new THREE.InstancedMesh(geo, mat, matrices.length);
  const phase = new Float32Array(matrices.length);
  for (let i = 0; i < matrices.length; i++) {
    mesh.setMatrixAt(i, matrices[i]);
    phase[i] = phases[i];
  }
  geo.setAttribute('aPhase', new THREE.InstancedBufferAttribute(phase, 1));
  mesh.frustumCulled = false;
  noRay(mesh);
  return mesh;
}

function createReeds(rand) {
  const geo = new THREE.CylinderGeometry(0.016, 0.028, 1, 5, 6, false);
  geo.translate(0, 0.5, 0);
  const mat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.72, side: THREE.DoubleSide });
  dressReed(mat);
  const spots = [];
  const addCluster = (cx, cz, count, watery) => {
    for (let i = 0; i < count; i++) {
      const x = cx + (rand() - 0.5) * 1.3;
      const z = cz + (rand() - 0.5) * 1.1;
      const h = terrainHeight(x, z);
      if (watery) {
        if (h > -0.04 || h < -0.48 || pondFactor(x, z) > 0.98) continue;
      } else if (h < 0.01 || h > 0.55 || pondFactor(x, z) < 0.98) continue;
      spots.push({ x, z, h, watery });
    }
  };
  addCluster(-3.4, 2.5, 18, false);
  addCluster(-4.6, 1.2, 14, false);
  addCluster(3.4, 3.6, 12, false);
  addCluster(-2.2, 2.15, 16, true);
  addCluster(1.8, 2.55, 14, true);
  addCluster(-1.2, -2.4, 12, true);
  addCluster(1.15, -3.15, 16, true);
  addCluster(4.2, -0.6, 10, false);

  const mesh = new THREE.InstancedMesh(geo, mat, Math.max(1, spots.length));
  const phase = new Float32Array(spots.length);
  const cattail = new Float32Array(spots.length);
  const amp = new Float32Array(spots.length);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < spots.length; i++) {
    const s = spots[i];
    const height = s.watery ? 0.9 + rand() * 0.7 : 1.05 + rand() * 0.85;
    dummy.position.set(s.x, s.h, s.z);
    dummy.rotation.y = rand() * Math.PI;
    dummy.rotation.z = (rand() - 0.5) * 0.08;
    dummy.scale.set(0.8 + rand() * 0.6, height, 0.8 + rand() * 0.6);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    phase[i] = rand() * Math.PI * 2;
    cattail[i] = rand() > 0.55 ? 1 : 0;
    amp[i] = 0.12 + rand() * 0.18;
  }
  mesh.count = spots.length;
  geo.setAttribute('aPhase', new THREE.InstancedBufferAttribute(phase, 1));
  geo.setAttribute('aCattail', new THREE.InstancedBufferAttribute(cattail, 1));
  geo.setAttribute('aAmp', new THREE.InstancedBufferAttribute(amp, 1));
  mesh.frustumCulled = false;
  mesh.castShadow = true;
  noRay(mesh);
  return mesh;
}

function lanceLeaf() {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array([
    0, 0, 0,
    0.05, 0.04, 0.006,
    0.022, 0.11, 0.012,
    0, 0.2, 0,
    -0.022, 0.11, 0.012,
    -0.05, 0.04, 0.006,
  ]);
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setIndex([0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5]);
  geo.computeVertexNormals();
  return geo;
}

function pushLeaves(leaves, pt, tangent, rand, n) {
  for (let i = 0; i < n; i++) {
    leaves.push({
      x: pt.x + (rand() - 0.5) * 0.1,
      y: pt.y + (rand() - 0.5) * 0.06,
      z: pt.z + (rand() - 0.5) * 0.1,
      tangent,
      side: rand() > 0.5 ? 1 : -1,
      phase: rand() * Math.PI * 2,
      roll: rand() * Math.PI,
      scale: 0.8 + rand() * 0.85,
      hue: rand(),
    });
  }
}

function createTree(rand, tips) {
  const geos = [];
  const leaves = [];
  const base = new THREE.Vector3(-6.45, terrainHeight(-6.45, -1.85), -1.85);
  const trunkPts = [];
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    const lean = t * t;
    trunkPts.push(new THREE.Vector3(
      base.x + lean * 2.35,
      base.y + t * 2.85,
      base.z + lean * 1.25,
    ));
  }
  const trunkCurve = new THREE.CatmullRomCurve3(trunkPts);
  geos.push(makeTube(trunkCurve, 8, 0.28, 0.09, 0.12, rand() * 6));

  for (let r = 0; r < 3; r++) {
    const ang = -0.2 + r * 0.85;
    const root0 = base.clone();
    const root1 = new THREE.Vector3(
      base.x + Math.cos(ang) * 0.75,
      terrainHeight(base.x + Math.cos(ang) * 0.9, base.z + Math.sin(ang) * 0.7) + 0.02,
      base.z + Math.sin(ang) * 0.55,
    );
    const root2 = new THREE.Vector3(
      base.x + Math.cos(ang) * 1.45,
      Math.min(-0.04, terrainHeight(base.x + Math.cos(ang) * 1.45, base.z + Math.sin(ang) * 1.15)),
      base.z + Math.sin(ang) * 1.2,
    );
    geos.push(makeTube(new THREE.CatmullRomCurve3([root0, root1, root2]), 4, 0.07, 0.028, 0.25, rand() * 6));
  }

  const waterAng = Math.atan2(-base.z * 0.35, -base.x);
  for (let i = 0; i < 6; i++) {
    const t = 0.62 + (i / 6) * 0.32;
    const origin = trunkCurve.getPoint(t);
    const ang = waterAng + (i - 2.5) * 0.55;
    const len = 1.35 + (i % 3) * 0.45;
    const tip = new THREE.Vector3(
      origin.x + Math.cos(ang) * len,
      origin.y + 0.15 + (i % 2) * 0.25,
      origin.z + Math.sin(ang) * len * 0.85,
    );
    const mid = origin.clone().lerp(tip, 0.55);
    mid.y += 0.45;
    const limb = new THREE.CatmullRomCurve3([origin, mid, tip]);
    geos.push(makeTube(limb, 5, 0.05, 0.02, 0.35, rand() * 6));
    const samples = limb.getPoints(5);
    for (let s = 2; s < samples.length; s++) {
      const hang = samples[s];
      const nStrands = 3;
      for (let k = 0; k < nStrands; k++) {
        const spread = ang + (k - 1) * 0.28 + (rand() - 0.5) * 0.2;
        const drop = 0.7 + rand() * 1.15;
        const reach = 0.35 + rand() * 0.85;
        let tipY = Math.max(0.35, hang.y - drop);
        const tx = hang.x + Math.cos(spread) * reach;
        const tz = hang.z + Math.sin(spread) * reach;
        if (pondFactor(tx, tz) > 0.98) tipY = Math.max(tipY, 0.7);
        const p1 = hang.clone().add(new THREE.Vector3(Math.cos(spread) * 0.12, 0.08, Math.sin(spread) * 0.12));
        const p2 = new THREE.Vector3(hang.x + Math.cos(spread) * reach * 0.65, (hang.y + tipY) * 0.5, hang.z + Math.sin(spread) * reach * 0.65);
        const p3 = new THREE.Vector3(tx, tipY, tz);
        const strand = new THREE.CatmullRomCurve3([hang.clone(), p1, p2, p3]);
        const pts = strand.getPoints(6);
        for (let p = 2; p < pts.length; p++) {
          const prev = pts[p - 1];
          const tangent = pts[p].clone().sub(prev);
          if (tangent.lengthSq() < 1e-6) continue;
          tangent.normalize();
          pushLeaves(leaves, pts[p], tangent, rand, p > 3 ? 4 : 3);
        }
      }
    }
  }

  const dips = [
    [-3.15, 0.35],
    [-2.55, -0.45],
    [-3.7, 0.95],
    [-4.15, -0.15],
  ];
  dips.forEach(([dx, dz], index) => {
    const origin = trunkCurve.getPoint(0.78 + index * 0.04);
    const phase = index === 0 ? -Math.PI / 2 - 2.4 : rand() * Math.PI * 2;
    const p3 = new THREE.Vector3(dx, 0.04, dz);
    const p1 = origin.clone().add(new THREE.Vector3((dx - origin.x) * 0.25, 0.35, (dz - origin.z) * 0.25));
    const p2 = new THREE.Vector3(
      origin.x + (dx - origin.x) * 0.7,
      0.85,
      origin.z + (dz - origin.z) * 0.7,
    );
    const whip = new THREE.CatmullRomCurve3([origin, p1, p2, p3]);
    geos.push(makeTube(whip, 7, 0.02, 0.008, 1, phase));
    tips.push({ x: dx, z: dz, baseY: 0.04, phase, wet: false });
    const pts = whip.getPoints(8);
    for (let p = 2; p < pts.length; p++) {
      const tangent = pts[p].clone().sub(pts[p - 1]);
      if (tangent.lengthSq() < 1e-6) continue;
      tangent.normalize();
      pushLeaves(leaves, pts[p], tangent, rand, 4);
    }
  });

  const merged = mergeGeometries(geos, false);
  merged.computeVertexNormals();
  const bark = new THREE.MeshStandardMaterial({
    color: '#6b5344',
    roughness: 0.86,
    metalness: 0,
  });
  dressTree(bark);
  const trunk = new THREE.Mesh(merged, bark);
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  trunk.userData.kind = 'tree';

  const leafGeo = lanceLeaf();
  const leafMat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  dressLeaf(leafMat);
  const leafMesh = new THREE.InstancedMesh(leafGeo, leafMat, Math.max(1, leaves.length));
  const phase = new Float32Array(leaves.length);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i];
    dummy.position.set(leaf.x, leaf.y, leaf.z);
    const q = new THREE.Quaternion().setFromUnitVectors(up, leaf.tangent.clone().normalize());
    const roll = new THREE.Quaternion().setFromAxisAngle(leaf.tangent, leaf.side * 1.05 + (leaf.roll - 1.2) * 0.55);
    dummy.quaternion.copy(q).multiply(roll);
    dummy.scale.setScalar(leaf.scale);
    dummy.updateMatrix();
    leafMesh.setMatrixAt(i, dummy.matrix);
    phase[i] = leaf.phase;
    if (leaf.hue > 0.94) color.set('#d2b15a');
    else color.setHSL(0.2 + leaf.hue * 0.1, 0.55, 0.36 + leaf.hue * 0.16);
    leafMesh.setColorAt(i, color);
  }
  leafMesh.count = leaves.length;
  leafGeo.setAttribute('aPhase', new THREE.InstancedBufferAttribute(phase, 1));
  leafMesh.frustumCulled = false;
  leafMesh.castShadow = true;
  noRay(leafMesh);

  return { trunk, leaves: leafMesh, leafMats: [leafMat] };
}

function makeTube(curve, segs, r0, r1, bendScale, phase) {
  return makeTubeVary(curve, segs, r0, r1, bendScale, phase);
}

function makeTubeVary(curve, tubularSegments, r0, r1, bendScale, phase) {
  const frames = curve.computeFrenetFrames(tubularSegments, false);
  const positions = [];
  const normals = [];
  const uvs = [];
  const bend = [];
  const ph = [];
  const radial = 5;
  const root = curve.getPoint(0);
  const length = curve.getLength();
  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments;
    const p = curve.getPointAt(t);
    const N = frames.normals[i];
    const B = frames.binormals[i];
    const radius = r0 + (r1 - r0) * t;
    const dist = p.distanceTo(root);
    const bt = Math.min(1, dist / Math.max(length, 0.001));
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      const sin = Math.sin(a);
      const cos = Math.cos(a);
      const nx = cos * N.x + sin * B.x;
      const ny = cos * N.y + sin * B.y;
      const nz = cos * N.z + sin * B.z;
      positions.push(p.x + nx * radius, p.y + ny * radius, p.z + nz * radius);
      normals.push(nx, ny, nz);
      uvs.push(j / radial, t);
      bend.push(bendScale * bt * bt);
      ph.push(phase);
    }
  }
  const indices = [];
  for (let i = 0; i < tubularSegments; i++) {
    for (let j = 0; j < radial; j++) {
      const a = i * (radial + 1) + j;
      const b = (i + 1) * (radial + 1) + j;
      const c = (i + 1) * (radial + 1) + j + 1;
      const d = i * (radial + 1) + j + 1;
      indices.push(a, b, d, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setAttribute('aBend', new THREE.Float32BufferAttribute(bend, 1));
  geo.setAttribute('aPhase', new THREE.Float32BufferAttribute(ph, 1));
  geo.setIndex(indices);
  return geo;
}

function createDock(posts) {
  const group = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: '#6d4c32', roughness: 0.8, metalness: 0 });
  const woodDark = new THREE.MeshStandardMaterial({ color: '#4e3828', roughness: 0.84, metalness: 0 });
  dressWood(wood);
  dressWood(woodDark);
  const a = new THREE.Vector3(1.25, 0, -5.2);
  const b = new THREE.Vector3(0.9, 0, -0.4);
  const dir = b.clone().sub(a);
  const len = dir.length();
  dir.multiplyScalar(1 / len);
  const yaw = Math.atan2(dir.x, dir.z);
  const spacing = 0.2;
  const count = Math.max(8, Math.floor(len / spacing));
  const plankGeo = new THREE.BoxGeometry(0.78, 0.045, 0.16);
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const x = THREE.MathUtils.lerp(a.x, b.x, t);
    const z = THREE.MathUtils.lerp(a.z, b.z, t);
    const ground = terrainHeight(x, z);
    const y = ground > 0.03 ? ground + 0.12 : 0.18;
    const plank = new THREE.Mesh(plankGeo, i % 2 ? wood : woodDark);
    plank.position.set(x, y, z);
    plank.rotation.y = yaw + (i % 5 === 0 ? 0.02 : 0);
    plank.castShadow = true;
    plank.receiveShadow = true;
    plank.userData.kind = 'dock';
    group.add(plank);
    if (i % 4 === 0 || i === count) {
      const bottom = Math.min(-0.05, ground);
      const top = y - 0.02;
      const ph = Math.max(0.3, top - bottom);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.065, 1, 7), woodDark);
      post.scale.y = ph;
      post.position.set(x, bottom + ph * 0.5, z);
      post.castShadow = true;
      post.receiveShadow = true;
      post.userData.kind = 'dock';
      group.add(post);
      if (ground < 0.02) posts.push({ x, z, r: 0.16 });
    }
  }
  const railGeo = new THREE.BoxGeometry(0.05, 0.05, len);
  for (const side of [-0.34, 0.34]) {
    const mid = a.clone().lerp(b, 0.5);
    const rail = new THREE.Mesh(railGeo, woodDark);
    rail.position.set(mid.x + Math.cos(yaw) * side, 0.34, mid.z - Math.sin(yaw) * side);
    rail.rotation.y = yaw;
    rail.castShadow = true;
    rail.userData.kind = 'dock';
    group.add(rail);
  }
  return group;
}

function createLilies(lilies) {
  const group = new THREE.Group();
  const geo = new THREE.CircleGeometry(1, 26, 0.42, Math.PI * 2 - 0.85);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const r = Math.hypot(x, z);
    pos.setY(i, r * r * 0.05);
  }
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({
    color: '#3f6b38',
    roughness: 0.48,
    metalness: 0,
    side: THREE.DoubleSide,
  });
  dressLily(mat);
  const spots = [
    [-0.35, 1.45, 0.62, true],
    [1.25, 0.55, 0.48, true],
    [-1.7, -0.15, 0.55, false],
    [0.15, -1.25, 0.42, true],
    [-2.5, 0.85, 0.5, false],
    [2.05, 1.55, 0.4, false],
  ];
  for (const [x, z, radius, flower] of spots) {
    if (pondFactor(x, z) > 0.9) continue;
    const pad = new THREE.Group();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.setScalar(radius);
    mesh.userData.kind = 'lily';
    pad.add(mesh);
    if (flower) {
      const bloom = lotus();
      bloom.scale.setScalar(radius * 1.15);
      bloom.traverse((o) => {
        if (o.isMesh) o.userData.kind = 'lily';
      });
      pad.add(bloom);
    }
    pad.position.set(x, 0.02, z);
    group.add(pad);
    lilies.push({ x, z, r: radius * 0.92, pad });
  }
  return group;
}

function lotus() {
  const g = new THREE.Group();
  const petalGeo = new THREE.SphereGeometry(0.09, 8, 6);
  petalGeo.scale(0.55, 0.28, 1);
  const petalMat = new THREE.MeshStandardMaterial({ color: '#f3c6d0', roughness: 0.48 });
  for (let i = 0; i < 9; i++) {
    const m = new THREE.Mesh(petalGeo, petalMat);
    const a = (i / 9) * Math.PI * 2;
    m.position.set(Math.cos(a) * 0.07, 0.025, Math.sin(a) * 0.07);
    m.rotation.y = -a;
    m.rotation.x = 0.7;
    m.castShadow = true;
    g.add(m);
  }
  const center = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 8, 6),
    new THREE.MeshStandardMaterial({ color: '#e2b84a', roughness: 0.55 }),
  );
  center.position.y = 0.045;
  g.add(center);
  return g;
}
