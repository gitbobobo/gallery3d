import * as THREE from 'three';
import { woodTexture } from './textures.js';
import { causticsInject } from './glsl.js';
import { floorY } from './pond.js';

// 小木栈桥：从岸边伸进水里，木桩插在水下（会成为涟漪反射体）
export function buildDock(scene, sim) {
  const A = new THREE.Vector2(-11.0, -3.6);
  const B = new THREE.Vector2(-4.2, -1.25);
  const dir = B.clone().sub(A);
  const len = dir.length();
  dir.normalize();
  const perp = new THREE.Vector2(-dir.y, dir.x);
  const deckY = 0.46;
  const width = 1.3;

  const wood = new THREE.MeshStandardMaterial({ map: woodTexture(), roughness: 0.85, metalness: 0 });
  wood.map.wrapS = wood.map.wrapT = THREE.RepeatWrapping;
  const woodDark = wood.clone();
  woodDark.color = new THREE.Color(0x9a7a55);
  woodDark.onBeforeCompile = causticsInject;
  wood.onBeforeCompile = causticsInject;

  const group = new THREE.Group();

  // 桥面板
  const slatLen = 0.24, gap = 0.02;
  const nSlats = Math.floor(len / (slatLen + gap));
  const slatGeo = new THREE.BoxGeometry(width, 0.055, slatLen);
  const slats = new THREE.InstancedMesh(slatGeo, wood, nSlats);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  const angle = Math.atan2(dir.x, dir.y); // local +z 对准桥轴方向
  e.set(0, angle, 0);
  q.setFromEuler(e);
  for (let i = 0; i < nSlats; i++) {
    const t = (i + 0.5) / nSlats;
    const p = A.clone().lerp(B, t);
    m.compose(new THREE.Vector3(p.x, deckY, p.y), q, new THREE.Vector3(1, 1, 1));
    slats.setMatrixAt(i, m);
  }
  group.add(slats);

  // 承重梁
  const beamGeo = new THREE.BoxGeometry(0.09, 0.09, len);
  const beamMat = woodDark;
  for (const side of [-1, 1]) {
    const beam = new THREE.Mesh(beamGeo, beamMat);
    const c = A.clone().lerp(B, 0.5).add(perp.clone().multiplyScalar(side * (width / 2 - 0.12)));
    beam.position.set(c.x, deckY - 0.07, c.y);
    beam.rotation.y = angle;
    group.add(beam);
  }

  // 木桩（插入水底，上下都可见 → 折射错位）
  const postGeo = new THREE.CylinderGeometry(0.085, 0.095, 1, 8);
  const posts = [];
  const postTs = [0.30, 0.55, 0.82];
  let postIdx = 0;
  const postList = [];
  for (const t of postTs) {
    for (const side of [-1, 1]) {
      const p = A.clone().lerp(B, t).add(perp.clone().multiplyScalar(side * (width / 2 - 0.1)));
      const bottom = floorY(p.x, p.y) - 0.25;
      const top = deckY + 0.34;
      const h = top - bottom;
      const post = new THREE.Mesh(postGeo, woodDark);
      post.position.set(p.x, bottom + h / 2, p.y);
      post.scale.y = h;
      group.add(post);
      posts.push(post);
      postList.push({ x: p.x, z: p.y, r: 0.16 });
      postIdx++;
    }
  }
  sim.setObstacles(postList);

  // 扶手
  const railGeo = new THREE.BoxGeometry(0.05, 0.05, len * 0.62);
  for (const side of [-1, 1]) {
    const rail = new THREE.Mesh(railGeo, woodDark);
    const c = A.clone().lerp(B, 0.32).add(perp.clone().multiplyScalar(side * (width / 2 - 0.03)));
    rail.position.set(c.x, deckY + 0.32, c.y);
    rail.rotation.y = angle;
    rail.rotation.z = 0.12;
    group.add(rail);
  }

  scene.add(group);
  return { group, posts };
}
