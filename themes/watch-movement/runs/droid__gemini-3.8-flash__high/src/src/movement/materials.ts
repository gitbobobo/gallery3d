import * as THREE from 'three';
import {
  createPerlageTexture,
  createGenevaStripesTexture,
  createSunburstTexture,
} from './proceduralTextures';

export interface MovementMaterials {
  mainplate: THREE.MeshStandardMaterial;
  bridge: THREE.MeshStandardMaterial;
  goldWheel: THREE.MeshStandardMaterial;
  steelPinion: THREE.MeshStandardMaterial;
  bluedScrew: THREE.MeshStandardMaterial;
  bluedHairspring: THREE.MeshStandardMaterial;
  rubyJewel: THREE.MeshPhysicalMaterial;
  brassChaton: THREE.MeshStandardMaterial;
  sunburstRatchet: THREE.MeshStandardMaterial;
  escapeWheel: THREE.MeshStandardMaterial;
  palletBody: THREE.MeshStandardMaterial;
  barrelWall: THREE.MeshStandardMaterial;
  mainspringCoil: THREE.MeshStandardMaterial;
  incablocSpring: THREE.MeshStandardMaterial;
}

export function createMovementMaterials(): MovementMaterials {
  const perlageTex = createPerlageTexture(1024);
  const genevaTex = createGenevaStripesTexture(1024);
  const sunburstTex = createSunburstTexture(512);

  // Mainplate: German silver / rhodium with perlage finish
  const mainplate = new THREE.MeshStandardMaterial({
    color: 0xdce2e8,
    map: perlageTex,
    roughness: 0.32,
    metalness: 0.88,
    bumpMap: perlageTex,
    bumpScale: 0.015,
  });

  // Bridges: Rhodium plated with Côtes de Genève stripes
  const bridge = new THREE.MeshStandardMaterial({
    color: 0xedf1f6,
    map: genevaTex,
    roughness: 0.28,
    metalness: 0.92,
    bumpMap: genevaTex,
    bumpScale: 0.012,
    transparent: true,
    opacity: 1.0,
    depthWrite: true,
  });

  // Wheels: 18K Yellow Gold / Glucydur
  const goldWheel = new THREE.MeshStandardMaterial({
    color: 0xe5ba4f,
    roughness: 0.22,
    metalness: 0.94,
  });

  // Mirror-polished steel for pinions, arbors, click
  const steelPinion = new THREE.MeshStandardMaterial({
    color: 0xf0f3f8,
    roughness: 0.12,
    metalness: 0.98,
  });

  // Heat-blued steel for screws
  const bluedScrew = new THREE.MeshStandardMaterial({
    color: 0x1d4ed8,
    roughness: 0.24,
    metalness: 0.88,
  });

  // Heat-blued steel for balance hairspring
  const bluedHairspring = new THREE.MeshStandardMaterial({
    color: 0x2563eb,
    roughness: 0.3,
    metalness: 0.85,
  });

  // Synthetic ruby corundum jewels (Translucent red)
  const rubyJewel = new THREE.MeshPhysicalMaterial({
    color: 0xdc2626,
    roughness: 0.08,
    metalness: 0.05,
    transmission: 0.65,
    ior: 1.77,
    thickness: 1.2,
    attenuationColor: new THREE.Color(0x991b1b),
    attenuationDistance: 0.8,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
  });

  // Brass chatons (rings holding ruby jewels into the plates)
  const brassChaton = new THREE.MeshStandardMaterial({
    color: 0xcca038,
    roughness: 0.26,
    metalness: 0.92,
  });

  // Ratchet wheel with sunburst radial brush
  const sunburstRatchet = new THREE.MeshStandardMaterial({
    color: 0xe2e7ed,
    map: sunburstTex,
    roughness: 0.22,
    metalness: 0.94,
  });

  // Escape wheel (fine polished steel or special blued/gold)
  const escapeWheel = new THREE.MeshStandardMaterial({
    color: 0xf4f6f9,
    roughness: 0.14,
    metalness: 0.96,
  });

  // Pallet fork body (satin finished light steel)
  const palletBody = new THREE.MeshStandardMaterial({
    color: 0xdfe4ec,
    roughness: 0.22,
    metalness: 0.94,
  });

  // Barrel drum wall
  const barrelWall = new THREE.MeshStandardMaterial({
    color: 0xd8af48,
    roughness: 0.28,
    metalness: 0.9,
  });

  // Internal mainspring spiral steel coil
  const mainspringCoil = new THREE.MeshStandardMaterial({
    color: 0x475569,
    roughness: 0.35,
    metalness: 0.92,
  });

  // Incabloc lyre spring (gold-plated spring)
  const incablocSpring = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    roughness: 0.18,
    metalness: 0.95,
  });

  return {
    mainplate,
    bridge,
    goldWheel,
    steelPinion,
    bluedScrew,
    bluedHairspring,
    rubyJewel,
    brassChaton,
    sunburstRatchet,
    escapeWheel,
    palletBody,
    barrelWall,
    mainspringCoil,
    incablocSpring,
  };
}
