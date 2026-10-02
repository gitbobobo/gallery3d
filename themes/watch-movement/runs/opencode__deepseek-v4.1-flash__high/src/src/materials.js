import * as THREE from 'three';

export function makeMaterial(params) {
  return new THREE.MeshStandardMaterial(params);
}

export function makeGenevaTexture() {
  const size = 512;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, size, size);
  g.addColorStop(0, '#828a92');
  g.addColorStop(1, '#767e86');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  ctx.save();
  ctx.translate(size / 2, size / 2);
  for (let i = -7; i < 7; i++) {
    ctx.save();
    ctx.rotate(Math.PI / 4);
    const x = i * 52;
    const lg = ctx.createLinearGradient(x - 24, 0, x + 24, 0);
    lg.addColorStop(0, 'rgba(255,255,255,0.09)');
    lg.addColorStop(0.5, 'rgba(255,255,255,0.0)');
    lg.addColorStop(1, 'rgba(0,0,0,0.1)');
    ctx.fillStyle = lg;
    ctx.fillRect(x - 24, -420, 48, 840);
    ctx.restore();
  }
  ctx.restore();

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createMaterials() {
  const brass = new THREE.MeshStandardMaterial({
    color: 0xcfa23e,
    metalness: 1.0,
    roughness: 0.28,
    envMapIntensity: 1.15,
  });
  const gold = new THREE.MeshStandardMaterial({
    color: 0xd8b352,
    metalness: 1.0,
    roughness: 0.24,
    envMapIntensity: 1.2,
  });
  const steel = new THREE.MeshStandardMaterial({
    color: 0xc7ced6,
    metalness: 1.0,
    roughness: 0.22,
    envMapIntensity: 1.1,
  });
  const blued = new THREE.MeshStandardMaterial({
    color: 0x254a86,
    metalness: 1.0,
    roughness: 0.25,
    envMapIntensity: 1.1,
  });
  const mainspring = new THREE.MeshStandardMaterial({
    color: 0x8d98a3,
    metalness: 1.0,
    roughness: 0.32,
  });
  const plate = new THREE.MeshStandardMaterial({
    map: makeGenevaTexture(),
    color: 0xffffff,
    metalness: 0.92,
    roughness: 0.38,
    envMapIntensity: 0.9,
  });
  const bridge = new THREE.MeshStandardMaterial({
    color: 0xb7bec7,
    metalness: 1.0,
    roughness: 0.3,
    envMapIntensity: 1.0,
  });
  const jewel = new THREE.MeshPhysicalMaterial({
    color: 0xa1132f,
    metalness: 0.0,
    roughness: 0.06,
    transmission: 0.75,
    thickness: 0.5,
    ior: 1.77,
    transparent: true,
    opacity: 0.92,
    envMapIntensity: 1.4,
  });

  return { brass, gold, steel, blued, mainspring, plate, bridge, jewel };
}
