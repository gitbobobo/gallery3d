import * as THREE from 'three';
import {
  createGearShape,
  createEscapeWheelShape,
  createPalletForkShape,
  createBalanceWheelShape,
} from './gearMath';
import { MovementMaterials } from './materials';

export interface MovementNodes {
  rootGroup: THREE.Group;
  barrelGroup: THREE.Group;
  centerWheelGroup: THREE.Group;
  thirdWheelGroup: THREE.Group;
  fourthWheelGroup: THREE.Group;
  escapeWheelGroup: THREE.Group;
  palletForkGroup: THREE.Group;
  balanceWheelGroup: THREE.Group;
  hairspringMesh: THREE.Line;
  bridgesGroup: THREE.Group;
  mainplateMesh: THREE.Mesh;
  allExplodeObjects: { object: THREE.Object3D; explodeDist: number; originalZ: number }[];
  clickableMeshes: THREE.Object3D[];
}

// Gear train center positions
export const POSITIONS = {
  center: new THREE.Vector2(0, 0),
  barrel: new THREE.Vector2(-10.394, 10.394), // Distance = 14.70
  third: new THREE.Vector2(7.722, -6.479), // Distance = 10.08
  fourth: new THREE.Vector2(0.270, -5.827), // Distance from third = 7.48
  escape: new THREE.Vector2(1.340, -11.893), // Distance from fourth = 6.16
  pallet: new THREE.Vector2(-1.951, -9.993), // Distance from escape = 3.80
  balance: new THREE.Vector2(-5.719, -7.355), // Distance from pallet = 4.60
};

// Gear tooth specifications
export const GEAR_SPECS = {
  barrel: { teeth: 72, module: 0.35, pitchR: 12.60 },
  centerPinion: { teeth: 12, module: 0.35, pitchR: 2.10 },
  centerWheel: { teeth: 64, module: 0.28, pitchR: 8.96 },
  thirdPinion: { teeth: 8, module: 0.28, pitchR: 1.12 },
  thirdWheel: { teeth: 60, module: 0.22, pitchR: 6.60 },
  fourthPinion: { teeth: 8, module: 0.22, pitchR: 0.88 },
  fourthWheel: { teeth: 70, module: 0.16, pitchR: 5.60 },
  escapePinion: { teeth: 7, module: 0.16, pitchR: 0.56 },
  escapeWheel: { teeth: 15, radius: 2.75 },
};

/**
 * Creates a detailed 3D blued screw with an authentic driver slot.
 */
function createBluedScrew(
  materials: MovementMaterials,
  radius = 0.65,
  height = 0.45
): THREE.Group {
  const screwGroup = new THREE.Group();

  // Screw head is a beveled cylinder with a central slot
  const headGeo = new THREE.CylinderGeometry(radius, radius * 0.95, height, 24);
  const headMesh = new THREE.Mesh(headGeo, materials.bluedScrew);
  headMesh.castShadow = true;
  headMesh.receiveShadow = true;
  screwGroup.add(headMesh);

  // Driver slot (darker recess)
  const slotGeo = new THREE.BoxGeometry(radius * 2.05, height * 0.45, radius * 0.28);
  const slotMat = new THREE.MeshStandardMaterial({
    color: 0x0a1428,
    roughness: 0.6,
    metalness: 0.8,
  });
  const slotMesh = new THREE.Mesh(slotGeo, slotMat);
  slotMesh.position.y = height * 0.3;
  screwGroup.add(slotMesh);

  // Thread shank below
  const shankGeo = new THREE.CylinderGeometry(radius * 0.55, radius * 0.55, height * 1.5, 16);
  const shankMesh = new THREE.Mesh(shankGeo, materials.steelPinion);
  shankMesh.position.y = -height;
  screwGroup.add(shankMesh);

  return screwGroup;
}

/**
 * Creates a synthetic ruby jewel bearing seated in a brass chaton.
 */
function createJewelBearing(
  materials: MovementMaterials,
  outerRadius = 0.95,
  holeRadius = 0.25,
  height = 0.4
): THREE.Group {
  const jewelGroup = new THREE.Group();

  // Brass chaton outer ring
  const chatonGeo = new THREE.CylinderGeometry(outerRadius * 1.35, outerRadius * 1.35, height * 0.8, 24);
  const chatonMesh = new THREE.Mesh(chatonGeo, materials.brassChaton);
  chatonMesh.receiveShadow = true;
  jewelGroup.add(chatonMesh);

  // Synthetic ruby jewel (annular disc with pivot sink)
  const rubyShape = new THREE.Shape();
  rubyShape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
  rubyShape.holes.push(hole);

  const rubyGeo = new THREE.ExtrudeGeometry(rubyShape, {
    depth: height,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.08,
    bevelThickness: 0.08,
  });
  rubyGeo.center();
  const rubyMesh = new THREE.Mesh(rubyGeo, materials.rubyJewel);
  rubyMesh.position.y = height * 0.1;
  rubyMesh.rotation.x = Math.PI / 2;
  rubyMesh.castShadow = true;
  jewelGroup.add(rubyMesh);

  return jewelGroup;
}

/**
 * Builds the entire 3D watch movement.
 */
export function buildWatchMovement(materials: MovementMaterials): MovementNodes {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'watch_movement';

  const clickableMeshes: THREE.Object3D[] = [];
  const allExplodeObjects: { object: THREE.Object3D; explodeDist: number; originalZ: number }[] = [];

  const registerClickable = (mesh: THREE.Object3D, partKey: string) => {
    mesh.userData = mesh.userData || {};
    mesh.userData.partKey = partKey;
    mesh.userData.isWatchPart = true;
    clickableMeshes.push(mesh);
  };

  const registerExplode = (object: THREE.Object3D, explodeDist: number) => {
    allExplodeObjects.push({
      object,
      explodeDist,
      originalZ: object.position.z,
    });
  };

  // -------------------------------------------------------------
  // 1. MAINPLATE (主夹板) - Base Foundation (Z = -1.2 to 0.0)
  // -------------------------------------------------------------
  const plateShape = new THREE.Shape();
  const plateR = 18.5;
  plateShape.absarc(0, 0, plateR, 0, Math.PI * 2, false);

  // Balance wheel circular cutout window
  const balHole = new THREE.Path();
  balHole.absarc(POSITIONS.balance.x, POSITIONS.balance.y, 8.2, 0, Math.PI * 2, true);
  plateShape.holes.push(balHole);

  // Escapement viewing window
  const escHole = new THREE.Path();
  escHole.absarc(POSITIONS.escape.x * 0.7 + POSITIONS.pallet.x * 0.3, POSITIONS.escape.y * 0.7 + POSITIONS.pallet.y * 0.3, 3.2, 0, Math.PI * 2, true);
  plateShape.holes.push(escHole);

  const plateGeo = new THREE.ExtrudeGeometry(plateShape, {
    depth: 1.6,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.35,
    bevelThickness: 0.25,
  });
  plateGeo.center();

  const mainplateMesh = new THREE.Mesh(plateGeo, materials.mainplate);
  mainplateMesh.name = 'mainplate';
  mainplateMesh.position.set(0, 0, -0.9);
  mainplateMesh.receiveShadow = true;
  rootGroup.add(mainplateMesh);
  registerClickable(mainplateMesh, 'mainplate');
  registerExplode(mainplateMesh, 0); // Mainplate stays grounded

  // Rim outer casing ring (movement holder/chassis)
  const ringGeo = new THREE.CylinderGeometry(plateR + 0.6, plateR + 0.6, 2.2, 64, 1, true);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.2,
    metalness: 0.9,
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 2;
  ringMesh.position.z = -0.6;
  rootGroup.add(ringMesh);

  // Mainplate jewel bearings for bottom pivots
  const addPlateJewel = (pos: THREE.Vector2, name: string) => {
    const j = createJewelBearing(materials, 0.7, 0.2, 0.35);
    j.position.set(pos.x, pos.y, -0.05);
    j.rotation.x = Math.PI / 2;
    rootGroup.add(j);
    registerClickable(j, 'jewels');
    registerExplode(j, 0);
  };
  addPlateJewel(POSITIONS.center, 'jewel_center_bottom');
  addPlateJewel(POSITIONS.third, 'jewel_third_bottom');
  addPlateJewel(POSITIONS.fourth, 'jewel_fourth_bottom');
  addPlateJewel(POSITIONS.escape, 'jewel_escape_bottom');
  addPlateJewel(POSITIONS.pallet, 'jewel_pallet_bottom');

  // Banking pins for pallet fork on mainplate
  const pinGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 16);
  const pin1 = new THREE.Mesh(pinGeo, materials.steelPinion);
  pin1.position.set(POSITIONS.pallet.x - 0.75, POSITIONS.pallet.y - 0.45, 0.5);
  pin1.rotation.x = Math.PI / 2;
  rootGroup.add(pin1);

  const pin2 = new THREE.Mesh(pinGeo, materials.steelPinion);
  pin2.position.set(POSITIONS.pallet.x + 0.75, POSITIONS.pallet.y - 0.45, 0.5);
  pin2.rotation.x = Math.PI / 2;
  rootGroup.add(pin2);

  // -------------------------------------------------------------
  // 2. MAINSPRING BARREL (发条盒) (Center: POSITIONS.barrel)
  // -------------------------------------------------------------
  const barrelGroup = new THREE.Group();
  barrelGroup.name = 'mainspring_barrel';
  barrelGroup.position.set(POSITIONS.barrel.x, POSITIONS.barrel.y, 0.5);
  rootGroup.add(barrelGroup);

  // Barrel drum base with 72 gear teeth
  const barrelShape = createGearShape(GEAR_SPECS.barrel.teeth, GEAR_SPECS.barrel.module, {
    spokes: 0,
    hasSpokes: false,
    boreRadius: 1.5,
  });
  const barrelGearGeo = new THREE.ExtrudeGeometry(barrelShape, {
    depth: 0.6,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.08,
    bevelThickness: 0.08,
  });
  const barrelGearMesh = new THREE.Mesh(barrelGearGeo, materials.barrelWall);
  barrelGearMesh.castShadow = true;
  barrelGearMesh.receiveShadow = true;
  barrelGroup.add(barrelGearMesh);
  registerClickable(barrelGearMesh, 'mainspring_barrel');

  // Barrel drum wall cylinder
  const drumWallGeo = new THREE.CylinderGeometry(11.8, 11.8, 1.6, 48, 1, true);
  const drumWallMesh = new THREE.Mesh(drumWallGeo, materials.barrelWall);
  drumWallMesh.rotation.x = Math.PI / 2;
  drumWallMesh.position.z = 1.0;
  barrelGroup.add(drumWallMesh);
  registerClickable(drumWallMesh, 'mainspring_barrel');

  // Internal coiled mainspring (S-shape spiral strip)
  const springPoints: THREE.Vector3[] = [];
  const springTurns = 4.5;
  const numPts = 180;
  for (let i = 0; i <= numPts; i++) {
    const u = i / numPts;
    const a = u * springTurns * Math.PI * 2;
    const r = 2.4 + u * 8.2;
    springPoints.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0.9));
  }
  const springGeo = new THREE.BufferGeometry().setFromPoints(springPoints);
  const springLineMat = new THREE.LineBasicMaterial({ color: 0x475569, linewidth: 2 });
  const springMesh = new THREE.Line(springGeo, springLineMat);
  barrelGroup.add(springMesh);

  // S-coiled metal strip thickness representation
  const coilStripGeo = new THREE.CylinderGeometry(10.2, 10.2, 1.1, 48, 1, true);
  const coilStripMesh = new THREE.Mesh(coilStripGeo, materials.mainspringCoil);
  coilStripMesh.rotation.x = Math.PI / 2;
  coilStripMesh.position.z = 0.9;
  barrelGroup.add(coilStripMesh);

  const coilStripInnerGeo = new THREE.CylinderGeometry(6.4, 6.4, 1.1, 36, 1, true);
  const coilStripInnerMesh = new THREE.Mesh(coilStripInnerGeo, materials.mainspringCoil);
  coilStripInnerMesh.rotation.x = Math.PI / 2;
  coilStripInnerMesh.position.z = 0.9;
  barrelGroup.add(coilStripInnerMesh);

  // Barrel arbor (center axle)
  const barrelArborGeo = new THREE.CylinderGeometry(1.4, 1.4, 3.2, 24);
  const barrelArborMesh = new THREE.Mesh(barrelArborGeo, materials.steelPinion);
  barrelArborMesh.rotation.x = Math.PI / 2;
  barrelArborMesh.position.z = 1.2;
  barrelGroup.add(barrelArborMesh);

  registerExplode(barrelGroup, 6.0);

  // Ratchet wheel (大钢轮) sitting on top of the barrel arbor
  const ratchetGroup = new THREE.Group();
  ratchetGroup.name = 'ratchet_wheel';
  ratchetGroup.position.set(POSITIONS.barrel.x, POSITIONS.barrel.y, 2.7);
  rootGroup.add(ratchetGroup);

  const ratchetShape = createGearShape(42, 0.32, {
    spokes: 0,
    hasSpokes: false,
    boreRadius: 1.2,
  });
  const ratchetGeo = new THREE.ExtrudeGeometry(ratchetShape, {
    depth: 0.55,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.08,
    bevelThickness: 0.08,
  });
  const ratchetMesh = new THREE.Mesh(ratchetGeo, materials.sunburstRatchet);
  ratchetMesh.castShadow = true;
  ratchetGroup.add(ratchetMesh);
  registerClickable(ratchetMesh, 'ratchet_wheel');

  // Center blued screw for ratchet wheel
  const ratchetScrew = createBluedScrew(materials, 1.1, 0.5);
  ratchetScrew.position.set(0, 0, 0.6);
  ratchetScrew.rotation.x = Math.PI / 2;
  ratchetGroup.add(ratchetScrew);
  registerClickable(ratchetScrew, 'blued_screws');

  // Click (止逆棘爪) and spring next to ratchet wheel
  const clickGroup = new THREE.Group();
  clickGroup.name = 'click_mechanism';
  clickGroup.position.set(POSITIONS.barrel.x + 8.5, POSITIONS.barrel.y - 1.5, 2.7);

  const clickShape = new THREE.Shape();
  clickShape.moveTo(0, 0);
  clickShape.lineTo(-1.8, 1.2);
  clickShape.lineTo(-2.2, 0.7);
  clickShape.lineTo(-0.6, -0.4);
  clickShape.closePath();
  const clickGeo = new THREE.ExtrudeGeometry(clickShape, {
    depth: 0.45,
    bevelEnabled: true,
    bevelSize: 0.05,
    bevelThickness: 0.05,
  });
  const clickMesh = new THREE.Mesh(clickGeo, materials.steelPinion);
  clickGroup.add(clickMesh);

  // Click screw
  const clickScrew = createBluedScrew(materials, 0.55, 0.35);
  clickScrew.position.set(0, 0, 0.45);
  clickScrew.rotation.x = Math.PI / 2;
  clickGroup.add(clickScrew);

  rootGroup.add(clickGroup);
  registerClickable(clickGroup, 'ratchet_wheel');
  registerExplode(ratchetGroup, 18.0);
  registerExplode(clickGroup, 18.0);

  // -------------------------------------------------------------
  // 3. CENTER WHEEL (二轮 / 分轮) (Center: POSITIONS.center)
  // -------------------------------------------------------------
  const centerWheelGroup = new THREE.Group();
  centerWheelGroup.name = 'center_wheel';
  centerWheelGroup.position.set(POSITIONS.center.x, POSITIONS.center.y, 0.0);
  rootGroup.add(centerWheelGroup);

  // Center pinion (12 teeth, steel) meshes with barrel
  const centerPinionShape = createGearShape(GEAR_SPECS.centerPinion.teeth, GEAR_SPECS.centerPinion.module, {
    hasSpokes: false,
    boreRadius: 0.45,
  });
  const centerPinionGeo = new THREE.ExtrudeGeometry(centerPinionShape, {
    depth: 1.1,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.05,
    bevelThickness: 0.05,
  });
  const centerPinionMesh = new THREE.Mesh(centerPinionGeo, materials.steelPinion);
  centerPinionMesh.position.z = 0.2;
  centerPinionMesh.castShadow = true;
  centerWheelGroup.add(centerPinionMesh);
  registerClickable(centerPinionMesh, 'center_wheel');

  // Center wheel plate (64 teeth, gold) sitting on pinion shoulder
  const centerWheelShape = createGearShape(GEAR_SPECS.centerWheel.teeth, GEAR_SPECS.centerWheel.module, {
    spokes: 4,
    hasSpokes: true,
    boreRadius: 1.1,
    rimWidth: 0.7,
    spokeWidth: 0.24,
  });
  const centerWheelGeo = new THREE.ExtrudeGeometry(centerWheelShape, {
    depth: 0.35,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  });
  const centerWheelMesh = new THREE.Mesh(centerWheelGeo, materials.goldWheel);
  centerWheelMesh.position.z = 1.0;
  centerWheelMesh.castShadow = true;
  centerWheelGroup.add(centerWheelMesh);
  registerClickable(centerWheelMesh, 'center_wheel');

  // Center arbor
  const centerArborGeo = new THREE.CylinderGeometry(0.35, 0.35, 3.2, 16);
  const centerArborMesh = new THREE.Mesh(centerArborGeo, materials.steelPinion);
  centerArborMesh.rotation.x = Math.PI / 2;
  centerArborMesh.position.z = 0.9;
  centerWheelGroup.add(centerArborMesh);

  registerExplode(centerWheelGroup, 8.0);

  // -------------------------------------------------------------
  // 4. THIRD WHEEL (三轮) (Center: POSITIONS.third)
  // -------------------------------------------------------------
  const thirdWheelGroup = new THREE.Group();
  thirdWheelGroup.name = 'third_wheel';
  thirdWheelGroup.position.set(POSITIONS.third.x, POSITIONS.third.y, 0.0);
  rootGroup.add(thirdWheelGroup);

  // Third pinion (8 teeth, steel) meshes with center wheel
  const thirdPinionShape = createGearShape(GEAR_SPECS.thirdPinion.teeth, GEAR_SPECS.thirdPinion.module, {
    hasSpokes: false,
    boreRadius: 0.3,
  });
  const thirdPinionGeo = new THREE.ExtrudeGeometry(thirdPinionShape, {
    depth: 0.9,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  });
  const thirdPinionMesh = new THREE.Mesh(thirdPinionGeo, materials.steelPinion);
  thirdPinionMesh.position.z = 0.8;
  thirdPinionMesh.castShadow = true;
  thirdWheelGroup.add(thirdPinionMesh);
  registerClickable(thirdPinionMesh, 'third_wheel');

  // Third wheel plate (60 teeth, gold)
  const thirdWheelShape = createGearShape(GEAR_SPECS.thirdWheel.teeth, GEAR_SPECS.thirdWheel.module, {
    spokes: 4,
    hasSpokes: true,
    boreRadius: 0.8,
    rimWidth: 0.6,
    spokeWidth: 0.22,
  });
  const thirdWheelGeo = new THREE.ExtrudeGeometry(thirdWheelShape, {
    depth: 0.32,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  });
  const thirdWheelMesh = new THREE.Mesh(thirdWheelGeo, materials.goldWheel);
  thirdWheelMesh.position.z = 1.45;
  thirdWheelMesh.castShadow = true;
  thirdWheelGroup.add(thirdWheelMesh);
  registerClickable(thirdWheelMesh, 'third_wheel');

  // Third arbor
  const thirdArborGeo = new THREE.CylinderGeometry(0.25, 0.25, 2.6, 16);
  const thirdArborMesh = new THREE.Mesh(thirdArborGeo, materials.steelPinion);
  thirdArborMesh.rotation.x = Math.PI / 2;
  thirdArborMesh.position.z = 1.2;
  thirdWheelGroup.add(thirdArborMesh);

  registerExplode(thirdWheelGroup, 9.0);

  // -------------------------------------------------------------
  // 5. FOURTH WHEEL / SECONDS WHEEL (四轮/秒轮) (Center: POSITIONS.fourth)
  // -------------------------------------------------------------
  const fourthWheelGroup = new THREE.Group();
  fourthWheelGroup.name = 'fourth_wheel';
  fourthWheelGroup.position.set(POSITIONS.fourth.x, POSITIONS.fourth.y, 0.0);
  rootGroup.add(fourthWheelGroup);

  // Fourth pinion (8 teeth, steel) meshes with third wheel
  const fourthPinionShape = createGearShape(GEAR_SPECS.fourthPinion.teeth, GEAR_SPECS.fourthPinion.module, {
    hasSpokes: false,
    boreRadius: 0.25,
  });
  const fourthPinionGeo = new THREE.ExtrudeGeometry(fourthPinionShape, {
    depth: 0.8,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  });
  const fourthPinionMesh = new THREE.Mesh(fourthPinionGeo, materials.steelPinion);
  fourthPinionMesh.position.z = 1.25;
  fourthPinionMesh.castShadow = true;
  fourthWheelGroup.add(fourthPinionMesh);
  registerClickable(fourthPinionMesh, 'fourth_wheel');

  // Fourth wheel plate (70 teeth, gold) sits lower to mesh with escape pinion
  const fourthWheelShape = createGearShape(GEAR_SPECS.fourthWheel.teeth, GEAR_SPECS.fourthWheel.module, {
    spokes: 4,
    hasSpokes: true,
    boreRadius: 0.7,
    rimWidth: 0.55,
    spokeWidth: 0.2,
  });
  const fourthWheelGeo = new THREE.ExtrudeGeometry(fourthWheelShape, {
    depth: 0.28,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  });
  const fourthWheelMesh = new THREE.Mesh(fourthWheelGeo, materials.goldWheel);
  fourthWheelMesh.position.z = 0.55;
  fourthWheelMesh.castShadow = true;
  fourthWheelGroup.add(fourthWheelMesh);
  registerClickable(fourthWheelMesh, 'fourth_wheel');

  // Extended seconds arbor
  const fourthArborGeo = new THREE.CylinderGeometry(0.2, 0.2, 3.4, 16);
  const fourthArborMesh = new THREE.Mesh(fourthArborGeo, materials.steelPinion);
  fourthArborMesh.rotation.x = Math.PI / 2;
  fourthArborMesh.position.z = 1.0;
  fourthWheelGroup.add(fourthArborMesh);

  registerExplode(fourthWheelGroup, 10.0);

  // -------------------------------------------------------------
  // 6. ESCAPE WHEEL (擒纵轮 - 15 Club Teeth) (Center: POSITIONS.escape)
  // -------------------------------------------------------------
  const escapeWheelGroup = new THREE.Group();
  escapeWheelGroup.name = 'escape_wheel';
  escapeWheelGroup.position.set(POSITIONS.escape.x, POSITIONS.escape.y, 0.0);
  rootGroup.add(escapeWheelGroup);

  // Escape pinion (7 teeth, steel) meshes with fourth wheel
  const escapePinionShape = createGearShape(GEAR_SPECS.escapePinion.teeth, GEAR_SPECS.escapePinion.module, {
    hasSpokes: false,
    boreRadius: 0.2,
  });
  const escapePinionGeo = new THREE.ExtrudeGeometry(escapePinionShape, {
    depth: 0.7,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  });
  const escapePinionMesh = new THREE.Mesh(escapePinionGeo, materials.steelPinion);
  escapePinionMesh.position.z = 0.35;
  escapePinionMesh.castShadow = true;
  escapeWheelGroup.add(escapePinionMesh);
  registerClickable(escapePinionMesh, 'escape_wheel');

  // 15-tooth Swiss lever escape wheel
  const escapeShape = createEscapeWheelShape(GEAR_SPECS.escapeWheel.radius, GEAR_SPECS.escapeWheel.teeth);
  const escapeGeo = new THREE.ExtrudeGeometry(escapeShape, {
    depth: 0.25,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.025,
    bevelThickness: 0.025,
  });
  const escapeMesh = new THREE.Mesh(escapeGeo, materials.escapeWheel);
  escapeMesh.position.z = 1.15;
  escapeMesh.castShadow = true;
  escapeWheelGroup.add(escapeMesh);
  registerClickable(escapeMesh, 'escape_wheel');

  // Escape staff
  const escapeStaffGeo = new THREE.CylinderGeometry(0.18, 0.18, 2.5, 16);
  const escapeStaffMesh = new THREE.Mesh(escapeStaffGeo, materials.steelPinion);
  escapeStaffMesh.rotation.x = Math.PI / 2;
  escapeStaffMesh.position.z = 1.1;
  escapeWheelGroup.add(escapeStaffMesh);

  registerExplode(escapeWheelGroup, 11.0);

  // -------------------------------------------------------------
  // 7. PALLET FORK (擒纵叉与进出瓦红宝石) (Center: POSITIONS.pallet)
  // -------------------------------------------------------------
  const palletForkGroup = new THREE.Group();
  palletForkGroup.name = 'pallet_fork';
  palletForkGroup.position.set(POSITIONS.pallet.x, POSITIONS.pallet.y, 1.2);
  rootGroup.add(palletForkGroup);

  // Fork lever body
  const forkShape = createPalletForkShape();
  const forkGeo = new THREE.ExtrudeGeometry(forkShape, {
    depth: 0.28,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.03,
    bevelThickness: 0.03,
  });
  const forkMesh = new THREE.Mesh(forkGeo, materials.palletBody);
  forkMesh.castShadow = true;
  palletForkGroup.add(forkMesh);
  registerClickable(forkMesh, 'pallet_fork');

  // Entry Pallet Ruby Stone (进瓦)
  const rubyStoneGeo = new THREE.BoxGeometry(0.38, 0.8, 0.45);
  const entryRuby = new THREE.Mesh(rubyStoneGeo, materials.rubyJewel);
  entryRuby.position.set(-1.6, -1.3, 0.14);
  entryRuby.rotation.z = -0.35;
  entryRuby.castShadow = true;
  palletForkGroup.add(entryRuby);
  registerClickable(entryRuby, 'pallet_fork');

  // Exit Pallet Ruby Stone (出瓦)
  const exitRuby = new THREE.Mesh(rubyStoneGeo, materials.rubyJewel);
  exitRuby.position.set(1.6, -1.3, 0.14);
  exitRuby.rotation.z = 0.35;
  exitRuby.castShadow = true;
  palletForkGroup.add(exitRuby);
  registerClickable(exitRuby, 'pallet_fork');

  // Guard pin (dart / 防震安全钉)
  const dartGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.9, 12);
  const dartMesh = new THREE.Mesh(dartGeo, materials.steelPinion);
  dartMesh.position.set(0, 3.2, -0.2);
  palletForkGroup.add(dartMesh);

  // Pallet staff (pivot arbor)
  const palletStaffGeo = new THREE.CylinderGeometry(0.18, 0.18, 1.8, 16);
  const palletStaffMesh = new THREE.Mesh(palletStaffGeo, materials.steelPinion);
  palletStaffMesh.rotation.x = Math.PI / 2;
  palletStaffMesh.position.z = 0.14;
  palletForkGroup.add(palletStaffMesh);

  registerExplode(palletForkGroup, 14.0);

  // -------------------------------------------------------------
  // 8. BALANCE WHEEL & HAIRSPRING (摆轮与游丝) (Center: POSITIONS.balance)
  // -------------------------------------------------------------
  const balanceWheelGroup = new THREE.Group();
  balanceWheelGroup.name = 'balance_wheel';
  balanceWheelGroup.position.set(POSITIONS.balance.x, POSITIONS.balance.y, 0.0);
  rootGroup.add(balanceWheelGroup);

  // Balance staff (摆轴)
  const balStaffGeo = new THREE.CylinderGeometry(0.22, 0.22, 3.8, 16);
  const balStaffMesh = new THREE.Mesh(balStaffGeo, materials.steelPinion);
  balStaffMesh.rotation.x = Math.PI / 2;
  balStaffMesh.position.z = 2.0;
  balStaffMesh.castShadow = true;
  balanceWheelGroup.add(balStaffMesh);

  // Double roller (双圆盘) with ruby impulse pin (圆盘钉)
  const rollerGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.32, 24);
  const rollerMesh = new THREE.Mesh(rollerGeo, materials.steelPinion);
  rollerMesh.rotation.x = Math.PI / 2;
  rollerMesh.position.z = 1.35;
  balanceWheelGroup.add(rollerMesh);

  // Ruby impulse pin (D-shaped or cylindrical ruby jewel)
  const impulsePinGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.5, 12);
  const impulsePinMesh = new THREE.Mesh(impulsePinGeo, materials.rubyJewel);
  impulsePinMesh.rotation.x = Math.PI / 2;
  impulsePinMesh.position.set(0, 0.65, 1.35);
  balanceWheelGroup.add(impulsePinMesh);

  // Balance wheel rim & 3 arms (Glucydur gold rim)
  const balRimShape = createBalanceWheelShape(7.5, 0.65, 3);
  const balRimGeo = new THREE.ExtrudeGeometry(balRimShape, {
    depth: 0.42,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.05,
    bevelThickness: 0.05,
  });
  const balWheelMesh = new THREE.Mesh(balRimGeo, materials.goldWheel);
  balWheelMesh.position.z = 2.0;
  balWheelMesh.castShadow = true;
  balanceWheelGroup.add(balWheelMesh);
  registerClickable(balWheelMesh, 'balance_wheel');

  // Poise screws around the perimeter of the balance wheel
  const numPoiseScrews = 16;
  for (let i = 0; i < numPoiseScrews; i++) {
    const a = (i / numPoiseScrews) * Math.PI * 2;
    const screwHeadGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.35, 12);
    const screwMesh = new THREE.Mesh(screwHeadGeo, materials.goldWheel);
    const rPos = 7.72;
    screwMesh.position.set(Math.cos(a) * rPos, Math.sin(a) * rPos, 2.21);
    screwMesh.rotation.z = a;
    screwMesh.rotation.x = Math.PI / 2;
    balanceWheelGroup.add(screwMesh);
  }

  // Collet (inner ring fixing hairspring to staff)
  const colletGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.35, 20);
  const colletMesh = new THREE.Mesh(colletGeo, materials.steelPinion);
  colletMesh.rotation.x = Math.PI / 2;
  colletMesh.position.z = 2.65;
  balanceWheelGroup.add(colletMesh);

  // DYNAMIC HAIRSPRING (游丝 - 12-turn blued steel Archimedean spiral)
  const hairspringTurns = 12;
  const hairspringPtsCount = 380;
  const hairspringPositions = new Float32Array(hairspringPtsCount * 3);
  const rMin = 0.58;
  const rMax = 3.65;

  for (let i = 0; i < hairspringPtsCount; i++) {
    const u = i / (hairspringPtsCount - 1);
    const theta = u * hairspringTurns * Math.PI * 2;
    const r = rMin + u * (rMax - rMin);
    const x = Math.cos(theta) * r;
    const y = Math.sin(theta) * r;
    const z = 2.75 + u * 0.15; // Breguet overcoil slight elevation

    hairspringPositions[i * 3] = x;
    hairspringPositions[i * 3 + 1] = y;
    hairspringPositions[i * 3 + 2] = z;
  }

  const hairspringGeo = new THREE.BufferGeometry();
  hairspringGeo.setAttribute(
    'position',
    new THREE.BufferAttribute(hairspringPositions, 3).setUsage(THREE.DynamicDrawUsage)
  );

  const hairspringLineMat = new THREE.LineBasicMaterial({
    color: 0x2563eb,
    linewidth: 2,
  });
  const hairspringMesh = new THREE.Line(hairspringGeo, hairspringLineMat);
  hairspringMesh.name = 'hairspring';
  balanceWheelGroup.add(hairspringMesh);
  registerClickable(hairspringMesh, 'hairspring');

  registerExplode(balanceWheelGroup, 16.0);

  // -------------------------------------------------------------
  // 9. BRIDGES & COCKS (夹板系统)
  // -------------------------------------------------------------
  const bridgesGroup = new THREE.Group();
  bridgesGroup.name = 'bridges';
  rootGroup.add(bridgesGroup);

  // (A) BARREL BRIDGE (发条夹板) - Covers barrel and center wheel
  const barrelBridgeShape = new THREE.Shape();
  barrelBridgeShape.moveTo(-16.5, 3.0);
  barrelBridgeShape.lineTo(-17.5, 9.0);
  barrelBridgeShape.absarc(-10.4, 10.4, 8.5, Math.PI * 0.85, Math.PI * 0.15, true);
  barrelBridgeShape.lineTo(2.0, 7.5);
  barrelBridgeShape.lineTo(2.5, 2.0);
  barrelBridgeShape.lineTo(-2.0, 0.5);
  barrelBridgeShape.lineTo(-6.0, 1.0);
  barrelBridgeShape.lineTo(-13.0, 1.5);
  barrelBridgeShape.closePath();

  // Hole for barrel arbor
  const bHole = new THREE.Path();
  bHole.absarc(POSITIONS.barrel.x, POSITIONS.barrel.y, 2.2, 0, Math.PI * 2, true);
  barrelBridgeShape.holes.push(bHole);

  // Exhibition cutaway exposing the mainspring barrel drum perimeter
  const barrelDrumHole = new THREE.Path();
  barrelDrumHole.moveTo(-15.5, 3.8);
  barrelDrumHole.lineTo(-10.5, 4.5);
  barrelDrumHole.lineTo(-6.8, 3.2);
  barrelDrumHole.lineTo(-7.8, 1.8);
  barrelDrumHole.lineTo(-14.5, 2.2);
  barrelDrumHole.closePath();
  barrelBridgeShape.holes.push(barrelDrumHole);

  const barrelBridgeGeo = new THREE.ExtrudeGeometry(barrelBridgeShape, {
    depth: 0.7,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.15,
    bevelThickness: 0.15,
  });
  const barrelBridgeMesh = new THREE.Mesh(barrelBridgeGeo, materials.bridge);
  barrelBridgeMesh.name = 'barrel_bridge';
  barrelBridgeMesh.position.z = 1.95;
  barrelBridgeMesh.castShadow = true;
  barrelBridgeMesh.receiveShadow = true;
  bridgesGroup.add(barrelBridgeMesh);
  registerClickable(barrelBridgeMesh, 'barrel_bridge');

  // Screws holding barrel bridge
  const bbScrew1 = createBluedScrew(materials, 0.7, 0.45);
  bbScrew1.position.set(-15.0, 5.0, 2.7);
  bbScrew1.rotation.x = Math.PI / 2;
  bridgesGroup.add(bbScrew1);
  registerClickable(bbScrew1, 'blued_screws');

  const bbScrew2 = createBluedScrew(materials, 0.7, 0.45);
  bbScrew2.position.set(-2.0, 6.8, 2.7);
  bbScrew2.rotation.x = Math.PI / 2;
  bridgesGroup.add(bbScrew2);
  registerClickable(bbScrew2, 'blued_screws');

  // (B) TRAIN WHEEL BRIDGE (轮系夹板) - Covers center, third, fourth, escape wheels
  const trainBridgeShape = new THREE.Shape();
  trainBridgeShape.moveTo(2.5, 2.0);
  trainBridgeShape.lineTo(16.5, 1.0);
  trainBridgeShape.absarc(0, 0, plateR * 0.95, 0.1, -Math.PI * 0.35, true);
  trainBridgeShape.lineTo(3.0, -14.5);
  trainBridgeShape.lineTo(-0.5, -9.5);
  trainBridgeShape.lineTo(0.5, -3.5);
  trainBridgeShape.lineTo(-1.8, 0.2);
  trainBridgeShape.closePath();

  // Exhibition skeleton window exposing center and third wheel meshing
  const trainHole = new THREE.Path();
  trainHole.moveTo(4.2, 0.4);
  trainHole.lineTo(10.8, -0.8);
  trainHole.lineTo(10.2, -4.8);
  trainHole.lineTo(4.6, -2.2);
  trainHole.closePath();
  trainBridgeShape.holes.push(trainHole);

  const trainBridgeGeo = new THREE.ExtrudeGeometry(trainBridgeShape, {
    depth: 0.7,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.15,
    bevelThickness: 0.15,
  });
  const trainBridgeMesh = new THREE.Mesh(trainBridgeGeo, materials.bridge);
  trainBridgeMesh.name = 'train_bridge';
  trainBridgeMesh.position.z = 2.0;
  trainBridgeMesh.castShadow = true;
  trainBridgeMesh.receiveShadow = true;
  bridgesGroup.add(trainBridgeMesh);
  registerClickable(trainBridgeMesh, 'train_bridge');

  // Train bridge jewels & chatons on top
  const addBridgeJewel = (pos: THREE.Vector2, name: string) => {
    const j = createJewelBearing(materials, 0.85, 0.22, 0.45);
    j.position.set(pos.x, pos.y, 2.7);
    j.rotation.x = Math.PI / 2;
    bridgesGroup.add(j);
    registerClickable(j, 'jewels');
  };
  addBridgeJewel(POSITIONS.center, 'jewel_center_top');
  addBridgeJewel(POSITIONS.third, 'jewel_third_top');
  addBridgeJewel(POSITIONS.fourth, 'jewel_fourth_top');
  addBridgeJewel(POSITIONS.escape, 'jewel_escape_top');

  // Blued screws holding train wheel bridge
  const tbScrew1 = createBluedScrew(materials, 0.7, 0.45);
  tbScrew1.position.set(14.0, -0.5, 2.7);
  tbScrew1.rotation.x = Math.PI / 2;
  bridgesGroup.add(tbScrew1);
  registerClickable(tbScrew1, 'blued_screws');

  const tbScrew2 = createBluedScrew(materials, 0.7, 0.45);
  tbScrew2.position.set(13.5, -8.5, 2.7);
  tbScrew2.rotation.x = Math.PI / 2;
  bridgesGroup.add(tbScrew2);
  registerClickable(tbScrew2, 'blued_screws');

  const tbScrew3 = createBluedScrew(materials, 0.7, 0.45);
  tbScrew3.position.set(3.5, -3.2, 2.7);
  tbScrew3.rotation.x = Math.PI / 2;
  bridgesGroup.add(tbScrew3);
  registerClickable(tbScrew3, 'blued_screws');

  // (C) PALLET COCK (擒纵叉夹板)
  const palletCockShape = new THREE.Shape();
  palletCockShape.moveTo(POSITIONS.pallet.x - 1.2, POSITIONS.pallet.y - 1.8);
  palletCockShape.lineTo(POSITIONS.pallet.x + 1.2, POSITIONS.pallet.y - 1.8);
  palletCockShape.lineTo(POSITIONS.pallet.x + 0.9, POSITIONS.pallet.y + 1.2);
  palletCockShape.lineTo(POSITIONS.pallet.x - 0.9, POSITIONS.pallet.y + 1.2);
  palletCockShape.closePath();

  const palletCockGeo = new THREE.ExtrudeGeometry(palletCockShape, {
    depth: 0.5,
    bevelEnabled: true,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  });
  const palletCockMesh = new THREE.Mesh(palletCockGeo, materials.bridge);
  palletCockMesh.position.z = 1.7;
  bridgesGroup.add(palletCockMesh);
  registerClickable(palletCockMesh, 'train_bridge');

  const palletJewel = createJewelBearing(materials, 0.65, 0.18, 0.35);
  palletJewel.position.set(POSITIONS.pallet.x, POSITIONS.pallet.y, 2.2);
  palletJewel.rotation.x = Math.PI / 2;
  bridgesGroup.add(palletJewel);
  registerClickable(palletJewel, 'jewels');

  // (D) BALANCE COCK (摆轮夹板) - Arched cantilever bridge curving over balance wheel
  const balanceCockShape = new THREE.Shape();
  balanceCockShape.moveTo(-16.5, -4.5);
  balanceCockShape.lineTo(-13.5, -2.5);
  balanceCockShape.lineTo(-8.5, -4.0);
  // Curve towards balance staff center
  balanceCockShape.absarc(POSITIONS.balance.x, POSITIONS.balance.y, 2.8, -Math.PI * 0.4, Math.PI * 0.65, false);
  balanceCockShape.lineTo(-10.5, -13.5);
  balanceCockShape.lineTo(-15.5, -11.0);
  balanceCockShape.closePath();

  const balanceCockGeo = new THREE.ExtrudeGeometry(balanceCockShape, {
    depth: 0.8,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.18,
    bevelThickness: 0.18,
  });
  const balanceCockMesh = new THREE.Mesh(balanceCockGeo, materials.bridge);
  balanceCockMesh.name = 'balance_cock';
  balanceCockMesh.position.z = 3.2;
  balanceCockMesh.castShadow = true;
  balanceCockMesh.receiveShadow = true;
  bridgesGroup.add(balanceCockMesh);
  registerClickable(balanceCockMesh, 'balance_cock');

  // Balance cock blued screw
  const balScrew = createBluedScrew(materials, 0.85, 0.5);
  balScrew.position.set(-14.2, -7.5, 4.05);
  balScrew.rotation.x = Math.PI / 2;
  bridgesGroup.add(balScrew);
  registerClickable(balScrew, 'blued_screws');

  // INCABLOC SHOCK ABSORBER (因加百录避震器总成) on top of balance cock
  const incablocGroup = new THREE.Group();
  incablocGroup.name = 'incabloc';
  incablocGroup.position.set(POSITIONS.balance.x, POSITIONS.balance.y, 4.05);

  // Gold chaton cup
  const incaCupGeo = new THREE.CylinderGeometry(1.3, 1.1, 0.45, 24);
  const incaCupMesh = new THREE.Mesh(incaCupGeo, materials.brassChaton);
  incaCupMesh.rotation.x = Math.PI / 2;
  incablocGroup.add(incaCupMesh);

  // Red cap jewel (合成红宝石防震盖石)
  const incaRubyGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.35, 24);
  const incaRubyMesh = new THREE.Mesh(incaRubyGeo, materials.rubyJewel);
  incaRubyMesh.rotation.x = Math.PI / 2;
  incaRubyMesh.position.z = 0.12;
  incablocGroup.add(incaRubyMesh);

  // Gold Lyre spring (七弦琴形金色防震卡簧)
  const lyreShape = new THREE.Shape();
  lyreShape.absarc(0, 0, 0.95, -Math.PI * 0.7, Math.PI * 0.7, false);
  lyreShape.lineTo(0.2, 0.4);
  lyreShape.lineTo(-0.2, 0.4);
  lyreShape.closePath();
  const lyreGeo = new THREE.ExtrudeGeometry(lyreShape, {
    depth: 0.1,
    bevelEnabled: false,
  });
  const lyreMesh = new THREE.Mesh(lyreGeo, materials.incablocSpring);
  lyreMesh.position.z = 0.28;
  incablocGroup.add(lyreMesh);

  bridgesGroup.add(incablocGroup);
  registerClickable(incablocGroup, 'incabloc');

  // REGULATOR INDEX (快慢针系统)
  const regGroup = new THREE.Group();
  regGroup.name = 'regulator';
  regGroup.position.set(POSITIONS.balance.x, POSITIONS.balance.y, 3.8);

  // Pointer needle extending outwards towards balance bridge scale
  const pointerShape = new THREE.Shape();
  pointerShape.moveTo(-0.35, 0);
  pointerShape.lineTo(-0.15, 3.6);
  pointerShape.lineTo(0, 4.2); // needle tip
  pointerShape.lineTo(0.15, 3.6);
  pointerShape.lineTo(0.35, 0);
  pointerShape.absarc(0, 0, 1.1, 0, Math.PI, true);
  pointerShape.closePath();

  const pointerGeo = new THREE.ExtrudeGeometry(pointerShape, {
    depth: 0.12,
    bevelEnabled: true,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  });
  const pointerMesh = new THREE.Mesh(pointerGeo, materials.steelPinion);
  pointerMesh.rotation.z = 0.35; // Positioned pointing slightly right of center
  regGroup.add(pointerMesh);

  bridgesGroup.add(regGroup);
  registerClickable(regGroup, 'regulator');

  registerExplode(bridgesGroup, 22.0);

  return {
    rootGroup,
    barrelGroup,
    centerWheelGroup,
    thirdWheelGroup,
    fourthWheelGroup,
    escapeWheelGroup,
    palletForkGroup,
    balanceWheelGroup,
    hairspringMesh,
    bridgesGroup,
    mainplateMesh,
    allExplodeObjects,
    clickableMeshes,
  };
}
