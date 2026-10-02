import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';

const moduleSize = 0.027;
const escapementTeeth = 15;
const balanceRate = 4;
const vibrationRate = balanceRate * 2;
const trainRatio = (90 / 10) * (72 / 9) * (64 / 8) * (56 / 8);
const escapeRate = vibrationRate / escapementTeeth;
const barrelRate = (escapeRate * Math.PI * 2) / trainRatio;

const catalog = [
  {
    id: 'barrel', name: '发条盒', english: 'The mainspring barrel', category: '动力源 · BARREL',
    description: '发条储存上链时注入的能量。缓慢释放时，带动盒缘大齿轮，为整列轮系提供稳定动力。',
    teeth: '90 齿', ratio: '9 : 1', direction: '顺时针', list: '发条盒', order: '01 / 07', color: '#aa7944',
  },
  {
    id: 'center', name: '中心轮', english: 'The center wheel', category: '第一轮系 · CENTER WHEEL',
    description: '中心轮的小齿轴承接发条盒动力，大轮再推动第三轮。这里是整列传动的第一处减速换挡。',
    teeth: '72 齿 / 9 轴', ratio: '8 : 1', direction: '逆时针', list: '中心轮', order: '02 / 07', color: '#b08852',
  },
  {
    id: 'third', name: '第三轮', english: 'The third wheel', category: '传动轮系 · THIRD WHEEL',
    description: '第三轮在两级齿轮之间接力，将中心轮的慢速转动继续提速，平稳送往分轮。',
    teeth: '64 齿 / 8 轴', ratio: '8 : 1', direction: '顺时针', list: '第三轮', order: '03 / 07', color: '#a98555',
  },
  {
    id: 'fourth', name: '第四轮', english: 'The fourth wheel', category: '传动轮系 · FOURTH WHEEL',
    description: '第四轮连接更快的末级传动；它的小齿轴啮合擒纵轮，准备把连续旋转交给擒纵机构。',
    teeth: '56 齿 / 8 轴', ratio: '7 : 1', direction: '逆时针', list: '第四轮', order: '04 / 07', color: '#bb965d',
  },
  {
    id: 'escape', name: '擒纵轮', english: 'The escape wheel', category: '擒纵机构 · ESCAPE WHEEL',
    description: '15 齿擒纵轮每半个摆动周期前进一步，把发条的连续动力切分成规律的脉冲。',
    teeth: '15 齿', ratio: '每拍 1 齿', direction: '顺时针', list: '擒纵轮', order: '05 / 07', color: '#ac8049',
  },
  {
    id: 'pallet', name: '擒纵叉', english: 'The pallet fork', category: '脉冲门控 · PALLET FORK',
    description: '擒纵叉左右摆动，两颗红宝石叉瓦交替锁住与释放擒纵轮，同时把能量送至摆轮。',
    teeth: '2 颗红宝石叉瓦', ratio: '每拍释放 1 齿', direction: '往复摆动', list: '擒纵叉', order: '06 / 07', color: '#8d6072',
  },
  {
    id: 'balance', name: '摆轮', english: 'The balance wheel', category: '计时调速 · BALANCE',
    description: '摆轮与游丝构成调速器。4 Hz 的规律往复设定节拍，擒纵叉因此每秒放行 8 次。',
    teeth: '4 Hz', ratio: '28,800 次 / 时', direction: '左右往复', list: '摆轮', order: '07 / 07', color: '#97744b',
  },
];

const sceneHost = document.querySelector('#scene');
const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 80);
camera.position.set(0.1, -3.45, 10.65);
camera.lookAt(-0.05, -0.16, 0.08);
const initialCamera = camera.position.clone();
const initialTarget = new THREE.Vector3(-0.05, -0.16, 0.08);
const portraitTarget = new THREE.Vector3(0.8, -0.5, 0.08);
const portraitCamera = new THREE.Vector3(0.9, -4.6, 12.35);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.22;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.setAttribute('aria-label', '机械机芯三维模型，可拖动旋转视角');
sceneHost.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(initialTarget);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.minDistance = 5.9;
controls.maxDistance = 17;
controls.minPolarAngle = 0.35;
controls.maxPolarAngle = 1.42;
controls.rotateSpeed = 0.68;
controls.zoomSpeed = 0.76;
controls.enablePan = true;

scene.add(new THREE.HemisphereLight(0xffffff, 0x899688, 2.0));
const keyLight = new THREE.DirectionalLight(0xfff2d9, 4.25);
keyLight.position.set(-4.5, 5.7, 9);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
keyLight.shadow.camera.left = -6;
keyLight.shadow.camera.right = 6;
keyLight.shadow.camera.top = 5;
keyLight.shadow.camera.bottom = -5;
keyLight.shadow.bias = -0.00035;
scene.add(keyLight);
const fillLight = new THREE.DirectionalLight(0xd4e6e0, 2.35);
fillLight.position.set(5, -4, 7);
scene.add(fillLight);
const rimLight = new THREE.PointLight(0xb1c7bb, 10, 11, 2);
rimLight.position.set(-2, -1, 3.7);
scene.add(rimLight);

const mats = {
  plate: new THREE.MeshStandardMaterial({ color: 0xd0dbd0, metalness: 0.42, roughness: 0.41, side: THREE.DoubleSide }),
  plateInset: new THREE.MeshStandardMaterial({ color: 0xbecbbf, metalness: 0.53, roughness: 0.33 }),
  brass: new THREE.MeshStandardMaterial({ color: 0xc49a5e, metalness: 0.76, roughness: 0.26 }),
  paleGold: new THREE.MeshStandardMaterial({ color: 0xd9b77c, metalness: 0.74, roughness: 0.22 }),
  darkSteel: new THREE.MeshStandardMaterial({ color: 0x566760, metalness: 0.79, roughness: 0.31 }),
  steel: new THREE.MeshStandardMaterial({ color: 0x8eaaa0, metalness: 0.79, roughness: 0.25 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x394c43, metalness: 0.73, roughness: 0.28 }),
  jewel: new THREE.MeshStandardMaterial({ color: 0x984f5d, metalness: 0.45, roughness: 0.19, emissive: 0x31090e, emissiveIntensity: 0.22 }),
  sapphire: new THREE.MeshStandardMaterial({ color: 0x688f9a, metalness: 0.56, roughness: 0.2, emissive: 0x11323a, emissiveIntensity: 0.14 }),
  spring: new THREE.MeshStandardMaterial({ color: 0x795934, metalness: 0.71, roughness: 0.34 }),
};

const interactiveRoots = [];
const partObjects = new Map();
const gears = {};

function tagPart(root, id) {
  root.userData.partId = id;
  root.traverse((object) => {
    if (object.isMesh) {
      object.userData.partId = id;
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
  partObjects.set(id, root);
  interactiveRoots.push(root);
  scene.add(root);
  return root;
}

function cylinder(parent, radiusTop, radiusBottom, height, material, z, segments = 48) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments), material);
  mesh.rotation.x = Math.PI / 2;
  mesh.position.z = z;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function flatRing(parent, inner, outer, depth, material, z, segments = 72) {
  const mesh = new THREE.Mesh(new THREE.RingGeometry(inner, outer, segments), material);
  mesh.position.z = z;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function roundedPlateShape(width, height, radius, holes) {
  const x = width / 2;
  const y = height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(-x + radius, -y);
  shape.lineTo(x - radius, -y);
  shape.quadraticCurveTo(x, -y, x, -y + radius);
  shape.lineTo(x, y - radius);
  shape.quadraticCurveTo(x, y, x - radius, y);
  shape.lineTo(-x + radius, y);
  shape.quadraticCurveTo(-x, y, -x, y - radius);
  shape.lineTo(-x, -y + radius);
  shape.quadraticCurveTo(-x, -y, -x + radius, -y);
  for (const hole of holes) {
    const path = new THREE.Path();
    path.absellipse(hole.x, hole.y, hole.r, hole.r, 0, Math.PI * 2, false, 0);
    shape.holes.push(path);
  }
  return shape;
}

const axes = {
  barrel: { x: -2.54, y: -0.05 },
  center: { x: -1.19, y: -0.05 },
  third: { x: -0.0965, y: -0.05 },
  fourth: { x: 0.8755, y: -0.05 },
  escape: { x: 1.7395, y: -0.05 },
  pallet: { x: 2.30, y: -0.49 },
  balance: { x: 2.71, y: -1.43 },
};
const plateHoles = [
  { ...axes.barrel, r: 0.12 }, { ...axes.center, r: 0.1 }, { ...axes.third, r: 0.09 },
  { ...axes.fourth, r: 0.09 }, { ...axes.escape, r: 0.1 }, { ...axes.pallet, r: 0.07 }, { ...axes.balance, r: 0.12 },
  { x: -3.47, y: 0.9, r: 0.045 }, { x: 2.17, y: 0.95, r: 0.045 },
  { x: -3.48, y: -1.08, r: 0.045 }, { x: 2.95, y: -2.23, r: 0.045 },
];
const plateOrigin = { x: -0.19, y: -0.5 };
const alignedHoles = plateHoles.map((hole) => ({ ...hole, x: hole.x - plateOrigin.x, y: hole.y - plateOrigin.y }));
const plateGeometry = new THREE.ShapeGeometry(roundedPlateShape(7.9, 4.9, 0.2, alignedHoles), 5);
const plate = new THREE.Mesh(plateGeometry, mats.plate);
plate.position.set(plateOrigin.x, plateOrigin.y, -0.31);
plate.receiveShadow = true;
scene.add(plate);

const plateLines = new THREE.Group();
plateLines.position.z = -0.292;
scene.add(plateLines);
function makeLine(points, material, parent = plateLines) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points.map(([x, y, z = 0]) => new THREE.Vector3(x, y, z)));
  const line = new THREE.Line(geometry, material);
  parent.add(line);
  return line;
}
const engraving = new THREE.LineBasicMaterial({ color: 0xa2b0a4, transparent: true, opacity: 0.67 });
for (const [x, y, r] of [
  [axes.barrel.x, axes.barrel.y, 0.2], [axes.center.x, axes.center.y, 0.19], [axes.third.x, axes.third.y, 0.17],
  [axes.fourth.x, axes.fourth.y, 0.16], [axes.escape.x, axes.escape.y, 0.15], [axes.balance.x, axes.balance.y, 0.12],
]) {
  const ring = new THREE.Mesh(new THREE.RingGeometry(r - 0.003, r, 48), engraving);
  ring.position.set(x, y, 0.004);
  plateLines.add(ring);
}
const perimeterTicks = [];
for (let i = 0; i < 52; i++) {
  const angle = (i / 52) * Math.PI * 2;
  const radius = 1.12;
  perimeterTicks.push([
    axes.balance.x + Math.cos(angle) * radius,
    axes.balance.y + Math.sin(angle) * radius,
  ]);
}
for (let i = 0; i < perimeterTicks.length; i++) {
  const [x, y] = perimeterTicks[i];
  const angle = (i / perimeterTicks.length) * Math.PI * 2;
  const outer = [x + Math.cos(angle) * (i % 5 === 0 ? 0.065 : 0.034), y + Math.sin(angle) * (i % 5 === 0 ? 0.065 : 0.034)];
  makeLine([[x, y], outer], new THREE.LineBasicMaterial({ color: 0xaab4a8, transparent: true, opacity: i % 5 === 0 ? 0.83 : 0.51 }));
}

function polar(radius, angle) { return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }; }

function createGearShape(teeth, mod) {
  const pitch = (Math.PI * 2) / teeth;
  const rootRadius = mod * (teeth / 2 - 1.2);
  const outerRadius = mod * (teeth / 2 + 0.12);
  const profile = [
    [-0.5, rootRadius], [-0.34, rootRadius], [-0.235, outerRadius], [-0.15, outerRadius],
    [0.15, outerRadius], [0.235, outerRadius], [0.34, rootRadius], [0.5, rootRadius],
  ];
  const shape = new THREE.Shape();
  profile.forEach(([fraction, radius], index) => {
    const angle = pitch * fraction;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  });
  for (let tooth = 1; tooth < teeth; tooth++) {
    for (let point = 1; point < profile.length; point++) {
      const [fraction, radius] = profile[point];
      const angle = pitch * (tooth + fraction);
      shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
  }
  const startAngle = pitch * (teeth - 0.5);
  shape.lineTo(Math.cos(startAngle) * rootRadius, Math.sin(startAngle) * rootRadius);
  return { shape, rootRadius, pitchRadius: mod * teeth / 2, outerRadius };
}

function makeGear(parent, teeth, z, thickness, material, options = {}) {
  const { shape, rootRadius, pitchRadius, outerRadius } = createGearShape(teeth, options.module ?? moduleSize);
  const bore = Math.min(rootRadius * 0.48, options.bore ?? rootRadius * 0.48);
  const innerPath = new THREE.Path();
  innerPath.absellipse(0, 0, bore, bore, 0, Math.PI * 2, true, 0);
  shape.holes.push(innerPath);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: Math.min(0.016, thickness * 0.14),
    bevelSize: 0.009,
    bevelSegments: 2,
    curveSegments: 1,
    steps: 1,
  });
  geometry.computeVertexNormals();
  const gear = new THREE.Mesh(geometry, material);
  gear.position.z = z - thickness / 2;
  gear.castShadow = true;
  gear.receiveShadow = true;
  parent.add(gear);

  if (teeth >= 32) {
    const spokeCount = teeth >= 75 ? 7 : 6;
    const hubRadius = Math.min(pitchRadius * 0.16, options.hubRadius ?? 0.135);
    const innerWeb = bore + (rootRadius - bore) * 0.1;
    const outerWeb = rootRadius * 0.78;
    const spokeLength = Math.max(0.02, outerWeb - innerWeb);
    const spokeGeometry = new THREE.BoxGeometry(spokeLength, Math.max(0.051, moduleSize * 2.5), Math.max(0.052, thickness * 0.78));
    const spokeMaterial = options.spokeMaterial ?? material;
    const webZ = z;
    for (let spoke = 0; spoke < spokeCount; spoke++) {
      const angle = (spoke / spokeCount) * Math.PI * 2 + 0.2;
      const point = polar((innerWeb + outerWeb) / 2, angle);
      const bar = new THREE.Mesh(spokeGeometry, spokeMaterial);
      bar.position.set(point.x, point.y, webZ);
      bar.rotation.z = angle;
      bar.castShadow = true;
      bar.receiveShadow = true;
      parent.add(bar);
    }
    cylinder(parent, hubRadius * 1.17, hubRadius * 1.27, thickness * 1.28, mats.darkSteel, z, 40);
    cylinder(parent, hubRadius * 0.84, hubRadius * 0.84, thickness * 1.37, options.hubMaterial ?? mats.paleGold, z + thickness * 0.09, 36);
    flatRing(parent, hubRadius * 0.64, hubRadius * 0.76, thickness, mats.darkSteel, z + thickness * 0.09, 36);
  } else {
    cylinder(parent, Math.min(bore * 0.76, 0.06), Math.min(bore * 0.85, 0.07), thickness * 1.08, mats.darkSteel, z, 32);
    flatRing(parent, bore * 0.35, bore * 0.62, thickness * 0.5, mats.paleGold, z + thickness * 0.34, 24);
  }

  return { mesh: gear, rootRadius, pitchRadius, outerRadius, teeth, z };
}

function makeAxle(id, { x, y }, color = 0xb58b54) {
  const root = new THREE.Group();
  root.position.set(x, y, 0);
  root.userData.partId = id;
  cylinder(root, 0.057, 0.064, 0.82, mats.darkSteel, 0.1, 32);
  cylinder(root, 0.040, 0.040, 0.84, new THREE.MeshStandardMaterial({ color, metalness: 0.79, roughness: 0.22 }), 0.12, 24);
  cylinder(root, 0.028, 0.03, 0.91, mats.dark, 0.125, 24);
  return root;
}

function addScrews(root, radius, z, count = 3) {
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + 0.3;
    const point = polar(radius, angle);
    cylinder(root, 0.027, 0.032, 0.032, mats.darkSteel, z, 18).position.set(point.x, point.y, z);
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.006, 0.006), mats.paleGold);
    slot.position.set(point.x, point.y, z + 0.017);
    slot.rotation.z = angle;
    root.add(slot);
  }
}

function addSpiral(root, radius, turns, z, material, tube = 0.014) {
  const points = [];
  const steps = 190;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * Math.PI * 2 * turns;
    const r = 0.025 + t * radius;
    points.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, z));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const coil = new THREE.Mesh(new THREE.TubeGeometry(curve, steps, tube, 5, false), material);
  coil.castShadow = true;
  root.add(coil);
  return coil;
}

// The barrel shell and coiled mainspring sit below its 90-tooth drive wheel.
const barrel = tagPart(makeAxle('barrel', axes.barrel, 0xb18850), 'barrel');
gears.barrel = barrel;
cylinder(barrel, 0.77, 0.77, 0.34, mats.darkSteel, 0.08, 96);
cylinder(barrel, 0.74, 0.74, 0.16, new THREE.MeshStandardMaterial({ color: 0x8e7048, metalness: 0.67, roughness: 0.34 }), 0.265, 96);
flatRing(barrel, 0.65, 0.76, 0.06, mats.paleGold, 0.36, 96);
cylinder(barrel, 0.625, 0.625, 0.026, mats.dark, 0.378, 96);
addSpiral(barrel, 0.51, 2.45, 0.408, mats.spring, 0.019);
cylinder(barrel, 0.12, 0.15, 0.08, mats.paleGold, 0.41, 40);
gears.barrelWheel = makeGear(barrel, 90, 0.44, 0.12, mats.brass, { hubMaterial: mats.darkSteel });
addScrews(barrel, 0.14, 0.524, 3);

const center = tagPart(makeAxle('center', axes.center, 0xc39b61), 'center');
gears.center = center;
gears.centerPinion = makeGear(center, 10, 0.44, 0.095, mats.darkSteel, { module: moduleSize, bore: 0.055 });
gears.centerWheel = makeGear(center, 72, 0.635, 0.12, mats.paleGold, { hubMaterial: mats.darkSteel });
flatRing(center, 0.079, 0.093, 0.032, mats.darkSteel, 0.713, 32);
addScrews(center, 0.116, 0.704, 3);

const third = tagPart(makeAxle('third', axes.third, 0xaa8656), 'third');
gears.third = third;
gears.thirdPinion = makeGear(third, 9, 0.635, 0.092, mats.darkSteel, { bore: 0.053 });
gears.thirdWheel = makeGear(third, 64, 0.83, 0.12, mats.brass, { hubMaterial: mats.darkSteel });
flatRing(third, 0.079, 0.093, 0.032, mats.darkSteel, 0.908, 32);
addScrews(third, 0.105, 0.897, 3);

const fourth = tagPart(makeAxle('fourth', axes.fourth, 0xc39b61), 'fourth');
gears.fourth = fourth;
gears.fourthPinion = makeGear(fourth, 8, 0.83, 0.092, mats.darkSteel, { bore: 0.05 });
gears.fourthWheel = makeGear(fourth, 56, 1.025, 0.12, mats.paleGold, { hubMaterial: mats.darkSteel });
flatRing(fourth, 0.079, 0.093, 0.032, mats.darkSteel, 1.103, 32);
addScrews(fourth, 0.095, 1.092, 3);

const escape = tagPart(makeAxle('escape', axes.escape, 0x9a7448), 'escape');
gears.escape = escape;
gears.escapePinion = makeGear(escape, 8, 1.025, 0.088, mats.darkSteel, { bore: 0.05 });
const escapeWheel = makeGear(escape, escapementTeeth, 1.22, 0.12, mats.paleGold, { bore: 0.08 });
for (let i = 0; i < escapementTeeth; i++) {
  const angle = (i / escapementTeeth) * Math.PI * 2;
  const p = polar(escapeWheel.outerRadius * 0.80, angle);
  const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.033, 0), mats.sapphire);
  gem.position.set(p.x, p.y, 1.305);
  gem.rotation.z = angle;
  escape.add(gem);
}
cylinder(escape, 0.061, 0.07, 0.08, mats.darkSteel, 1.315, 28);
cylinder(escape, 0.035, 0.036, 0.035, mats.paleGold, 1.365, 24);

// The jewels are embedded at the ends of the oscillating pallet-fork arms.
const pallet = tagPart(new THREE.Group(), 'pallet');
pallet.position.set(axes.pallet.x, axes.pallet.y, 0.94);
gears.pallet = pallet;
const forkShape = new THREE.Shape();
forkShape.moveTo(-0.115, 0.035);
forkShape.lineTo(-0.409, 0.362);
forkShape.lineTo(-0.526, 0.303);
forkShape.lineTo(-0.481, 0.149);
forkShape.lineTo(-0.350, 0.067);
forkShape.lineTo(-0.106, -0.105);
forkShape.lineTo(0.305, -0.515);
forkShape.lineTo(0.412, -0.435);
forkShape.lineTo(0.193, -0.100);
forkShape.lineTo(0.115, 0.043);
forkShape.quadraticCurveTo(0.018, 0.123, -0.115, 0.035);
const forkBody = new THREE.Mesh(new THREE.ExtrudeGeometry(forkShape, { depth: 0.072, bevelEnabled: true, bevelThickness: 0.018, bevelSize: 0.014, bevelSegments: 2 }), mats.paleGold);
forkBody.position.z = 0.035;
forkBody.castShadow = true;
forkBody.receiveShadow = true;
pallet.add(forkBody);
const palletPivot = cylinder(pallet, 0.103, 0.11, 0.12, mats.darkSteel, 0.078, 48);
palletPivot.position.set(0, 0, 0.078);
cylinder(pallet, 0.071, 0.078, 0.07, mats.brass, 0.145, 40).position.set(0, 0, 0.145);
cylinder(pallet, 0.031, 0.034, 0.075, mats.darkSteel, 0.19, 30).position.set(0, 0, 0.19);
for (const [x, y, rotation] of [[-0.454, 0.293, -0.2], [-0.465, 0.144, 0.22]]) {
  const jewel = new THREE.Mesh(new THREE.BoxGeometry(0.112, 0.058, 0.051), mats.jewel);
  jewel.position.set(x, y, 0.105);
  jewel.rotation.z = rotation;
  jewel.castShadow = true;
  jewel.receiveShadow = true;
  pallet.add(jewel);
}
const forkPin = new THREE.Mesh(new THREE.SphereGeometry(0.055, 20, 12), mats.jewel);
forkPin.position.set(0.29, -0.485, 0.15);
pallet.add(forkPin);

// A balanced ring, cross-arms, four poising screws and a blue-steel hairspring.
const balance = tagPart(new THREE.Group(), 'balance');
balance.position.set(axes.balance.x, axes.balance.y, 0);
gears.balance = balance;
const balanceZ = 1.04;
const balanceWheel = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.052, 12, 100), mats.paleGold);
balanceWheel.position.z = balanceZ;
balanceWheel.castShadow = true;
balanceWheel.receiveShadow = true;
balance.add(balanceWheel);
flatRing(balance, 0.596, 0.625, 0.045, mats.darkSteel, balanceZ + 0.008, 96);
for (let i = 0; i < 4; i++) {
  const angle = i * Math.PI / 2 + Math.PI / 4;
  const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.67, 0.047, 0.086), mats.darkSteel);
  spoke.position.set(Math.cos(angle) * 0.315, Math.sin(angle) * 0.315, balanceZ);
  spoke.rotation.z = angle;
  spoke.castShadow = true;
  balance.add(spoke);
  const weight = new THREE.Mesh(new THREE.SphereGeometry(0.084, 20, 14), mats.brass);
  weight.position.set(Math.cos(angle) * 0.55, Math.sin(angle) * 0.55, balanceZ + 0.027);
  weight.castShadow = true;
  balance.add(weight);
  cylinder(balance, 0.038, 0.044, 0.034, mats.darkSteel, balanceZ + 0.07, 24).position.set(weight.position.x, weight.position.y, balanceZ + 0.07);
}
cylinder(balance, 0.19, 0.20, 0.12, mats.darkSteel, balanceZ + 0.012, 56);
cylinder(balance, 0.139, 0.15, 0.11, mats.brass, balanceZ + 0.065, 48);
flatRing(balance, 0.105, 0.128, 0.026, mats.paleGold, balanceZ + 0.125, 48);
addSpiral(balance, 0.245, 4.35, balanceZ + 0.12, mats.steel, 0.0095);
const impulseRoller = new THREE.Mesh(new THREE.CylinderGeometry(0.057, 0.064, 0.072, 24), mats.sapphire);
impulseRoller.rotation.x = Math.PI / 2;
impulseRoller.position.set(0.17, 0.02, balanceZ + 0.09);
balance.add(impulseRoller);
const impulseJewel = new THREE.Mesh(new THREE.SphereGeometry(0.044, 18, 12), mats.jewel);
impulseJewel.position.set(0.17, 0.02, balanceZ + 0.13);
balance.add(impulseJewel);

// Visible jewels and screws around the bridge marks anchor each wheel position.
const jewelRivetMaterial = new THREE.MeshStandardMaterial({ color: 0x526b62, metalness: 0.61, roughness: 0.28 });
for (const point of [
  [-3.47, 0.9], [2.17, 0.95], [-3.48, -1.08], [2.95, -2.23],
]) {
  const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.064, 0.064, 0.042, 8), jewelRivetMaterial);
  screw.rotation.x = Math.PI / 2;
  screw.position.set(point[0], point[1], 0.015);
  screw.castShadow = true;
  scene.add(screw);
  const line = new THREE.Mesh(new THREE.BoxGeometry(0.059, 0.008, 0.009), mats.paleGold);
  line.position.set(point[0], point[1], 0.039);
  line.rotation.z = Math.PI / 4;
  scene.add(line);
}

// Tooth-space phase offsets make every external pair start in mesh.
const gearPhase = {
  barrel: 0,
  center: Math.PI - Math.PI / 10,
  third: 0,
  fourth: 0,
  escape: 0,
};
gearPhase.third = Math.PI - Math.PI / 9 - 8 * gearPhase.center;
gearPhase.fourth = Math.PI - Math.PI / 8 - 8 * gearPhase.third;
gearPhase.escape = Math.PI - Math.PI / 8 - 7 * gearPhase.fourth;

const selectHalo = new THREE.Mesh(
  new THREE.TorusGeometry(0.7, 0.018, 8, 96),
  new THREE.MeshBasicMaterial({ color: 0xaf8050, transparent: true, opacity: 0.8, depthWrite: false }),
);
selectHalo.visible = false;
selectHalo.renderOrder = 9;
scene.add(selectHalo);

const partList = document.querySelector('#part-list');
const buttons = new Map();
for (const part of catalog) {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-current', 'false');
  button.dataset.part = part.id;
  button.innerHTML = `<span class="list-dot"></span><span class="list-name">${part.list}</span><span class="list-count">${part.order.slice(0, 2)}</span>`;
  button.addEventListener('click', () => selectPart(part.id));
  partList.append(button);
  buttons.set(part.id, button);
}

const nameEl = document.querySelector('#part-name');
const englishEl = document.querySelector('#part-english');
const categoryEl = document.querySelector('#part-category');
const descriptionEl = document.querySelector('#part-description');
const orderEl = document.querySelector('#part-number');
const teethEl = document.querySelector('#spec-teeth');
const ratioEl = document.querySelector('#spec-ratio');
const directionEl = document.querySelector('#spec-direction');
const mobileName = document.querySelector('#mobile-selected-name');
let selectedId = '';

function partFocus(id) {
  const position = axes[id];
  const radius = { barrel: 1.38, center: 1.12, third: 1.01, fourth: 0.92, escape: 0.43, pallet: 0.67, balance: 0.81 }[id];
  const height = { barrel: 0.74, center: 0.85, third: 1.05, fourth: 1.2, escape: 1.39, pallet: 1.34, balance: 1.76 }[id];
  selectHalo.position.set(position.x, position.y, height);
  selectHalo.scale.setScalar(radius / 0.7);
  selectHalo.visible = true;
}

function selectPart(id) {
  const part = catalog.find((item) => item.id === id);
  if (!part) return;
  selectedId = id;
  nameEl.textContent = part.name;
  englishEl.textContent = part.english;
  categoryEl.textContent = part.category;
  descriptionEl.textContent = part.description;
  orderEl.textContent = part.order;
  teethEl.textContent = part.teeth;
  ratioEl.textContent = part.ratio;
  directionEl.textContent = part.direction;
  mobileName.textContent = part.name;
  for (const entry of catalog) buttons.get(entry.id).setAttribute('aria-current', String(entry.id === id));
  partFocus(id);
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let downPointer = null;
renderer.domElement.addEventListener('pointerdown', (event) => {
  downPointer = { x: event.clientX, y: event.clientY };
});
renderer.domElement.addEventListener('pointerup', (event) => {
  if (!downPointer || Math.hypot(event.clientX - downPointer.x, event.clientY - downPointer.y) > 7) {
    downPointer = null;
    return;
  }
  downPointer = null;
  const bounds = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(interactiveRoots, true);
  let hitObject = hits[0]?.object;
  while (hitObject && !hitObject.userData.partId) hitObject = hitObject.parent;
  if (hitObject) selectPart(hitObject.userData.partId);
});
renderer.domElement.addEventListener('pointercancel', () => { downPointer = null; });

const pauseButton = document.querySelector('#pause-button');
const pauseSymbol = pauseButton.querySelector('.pause-symbol');
const runLabel = document.querySelector('#run-label');
let isPaused = false;
let pausedAt = 0;
let pausedTotal = 0;
pauseButton.addEventListener('click', () => {
  if (!isPaused) pausedAt = performance.now();
  else pausedTotal += performance.now() - pausedAt;
  isPaused = !isPaused;
  runLabel.textContent = isPaused ? '机芯已暂停' : '机芯运转中';
  pauseSymbol.textContent = isPaused ? '▶' : 'Ⅱ';
  pauseButton.lastElementChild.textContent = isPaused ? '继续' : '暂停';
  pauseButton.setAttribute('aria-label', isPaused ? '继续机芯' : '暂停机芯');
  document.querySelector('.pulse-dot').style.background = isPaused ? '#ad8050' : '#809b70';
});

document.querySelector('#reset-button').addEventListener('click', () => {
  if (viewportMode === 'portrait') {
    camera.up.set(1, 0, 0);
    camera.position.copy(portraitCamera);
    controls.target.copy(portraitTarget);
  } else {
    camera.up.set(0, 1, 0);
    camera.position.copy(initialCamera);
    controls.target.copy(initialTarget);
  }
  camera.lookAt(controls.target);
  controls.update();
});
for (const button of document.querySelectorAll('.zoom-button')) {
  button.addEventListener('click', () => {
    const direction = new THREE.Vector3().subVectors(camera.position, controls.target);
    direction.multiplyScalar(button.dataset.zoom === 'in' ? 0.82 : 1.22);
    camera.position.copy(controls.target).add(direction);
    controls.update();
  });
}

selectPart('barrel');

const clock = new THREE.Clock();
const timeOrigin = performance.now();
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let reducedMotion = mediaQuery.matches;
mediaQuery.addEventListener?.('change', (event) => { reducedMotion = event.matches; });
let viewportMode = '';
function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();
  const time = isPaused ? (pausedAt - timeOrigin - pausedTotal) / 1000 : (performance.now() - timeOrigin - pausedTotal) / 1000;
  const motionTime = time * (reducedMotion ? 0.15 : 1);
  const driveAngle = -barrelRate * motionTime;
  gears.barrel.rotation.z = driveAngle;
  gears.center.rotation.z = -9 * driveAngle + gearPhase.center;
  gears.third.rotation.z = 72 * driveAngle + gearPhase.third;
  gears.fourth.rotation.z = -576 * driveAngle + gearPhase.fourth;
  gears.escape.rotation.z = trainRatio * driveAngle + gearPhase.escape;

  const balanceAngle = Math.sin(motionTime * Math.PI * 2 * balanceRate) * 0.345;
  balance.rotation.z = balanceAngle;
  pallet.rotation.z = Math.sin(motionTime * Math.PI * 2 * balanceRate - 0.42) * 0.125;

  if (selectHalo.visible) {
    selectHalo.material.opacity = 0.66 + 0.12 * Math.sin(elapsed * 2.2);
  }
  controls.update();
  renderer.render(scene, camera);
}
animate();

const resizeObserver = new ResizeObserver(() => {
  const width = sceneHost.clientWidth;
  const height = sceneHost.clientHeight;
  if (!width || !height) return;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 680 ? 1.55 : 2));
  const nextMode = width < height * 0.82 ? 'portrait' : 'landscape';
  if (nextMode !== viewportMode) {
    viewportMode = nextMode;
    if (nextMode === 'portrait') {
      camera.up.set(1, 0, 0);
      controls.target.copy(portraitTarget);
      camera.position.copy(portraitCamera);
    } else {
      camera.up.set(0, 1, 0);
      controls.target.copy(initialTarget);
      camera.position.copy(initialCamera);
    }
    camera.lookAt(controls.target);
    controls.update();
  }
});
resizeObserver.observe(sceneHost);

window.addEventListener('beforeunload', () => {
  resizeObserver.disconnect();
  controls.dispose();
  renderer.dispose();
});
