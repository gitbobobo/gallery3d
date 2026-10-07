// 小木栈桥：伸进水面的木板道 + 打入水底的木桩
import * as THREE from 'three';
import { woodTexture, terrainHeight, rand } from './common.js';

export function createDock() {
  const group = new THREE.Group();
  const wood = woodTexture();
  const mat = new THREE.MeshStandardMaterial({ map: wood, roughness: 0.85, metalness: 0 });
  const matDark = new THREE.MeshStandardMaterial({ map: wood, color: 0x9a8266, roughness: 0.9 });

  // 栈桥从东南岸伸向水中心
  const start = new THREE.Vector3(8.6, 0, 6.9);
  const dir = new THREE.Vector3(-0.68, 0, -0.62).normalize();
  const LEN = 6.2, W = 1.15;
  const deckY = 0.34;

  // 沿桥面的高度渐变（岸边略高）
  const yaw = Math.atan2(dir.x, dir.z);
  const plankGeo = new THREE.BoxGeometry(W, 0.045, 0.2);
  for (let i = 0; i < 26; i++) {
    const t = i / 25;
    const p = start.clone().addScaledVector(dir, t * LEN);
    const plank = new THREE.Mesh(plankGeo, mat);
    plank.position.set(p.x, deckY + (1 - t) * 0.18 + rand(-0.008, 0.008), p.z);
    plank.rotation.y = yaw + rand(-0.03, 0.03);
    plank.rotation.z = rand(-0.02, 0.02);
    plank.castShadow = true; plank.receiveShadow = true;
    group.add(plank);
  }
  // 两条纵向龙骨架
  for (const side of [-1, 1]) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.1, LEN + 0.4), matDark);
    const mid = start.clone().addScaledVector(dir, LEN / 2);
    const perp = new THREE.Vector3(-dir.z, 0, dir.x);
    beam.position.set(mid.x + perp.x * side * (W / 2 - 0.08), deckY - 0.07 + 0.09, mid.z + perp.z * side * (W / 2 - 0.08));
    beam.rotation.y = yaw;
    beam.castShadow = true;
    group.add(beam);
  }

  // 木桩（延伸到水里/水下）——这些是波纹反射的障碍物
  const posts = [];
  const postGeo = new THREE.CylinderGeometry(0.075, 0.09, 2.6, 8);
  for (const t of [0.15, 0.5, 0.85, 1.0]) {
    for (const side of [-1, 1]) {
      const p = start.clone().addScaledVector(dir, t * LEN);
      const perp = new THREE.Vector3(-dir.z, 0, dir.x);
      const px = p.x + perp.x * side * (W / 2 + 0.05);
      const pz = p.z + perp.z * side * (W / 2 + 0.05);
      const post = new THREE.Mesh(postGeo, matDark);
      post.position.set(px, deckY - 0.85, pz);
      post.rotation.y = rand(0.6);
      post.castShadow = true;
      group.add(post);
      if (terrainHeight(px, pz) < 0.02) posts.push({ x: px, z: pz, r: 0.16 });
    }
  }
  // 端部扶手柱
  const end = start.clone().addScaledVector(dir, LEN + 0.05);
  for (const side of [-1, 1]) {
    const perp = new THREE.Vector3(-dir.z, 0, dir.x);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.7, 6), matDark);
    post.position.set(end.x + perp.x * side * (W / 2), deckY + 0.3, end.z + perp.z * side * (W / 2));
    post.castShadow = true;
    group.add(post);
  }

  return { group, posts };
}
