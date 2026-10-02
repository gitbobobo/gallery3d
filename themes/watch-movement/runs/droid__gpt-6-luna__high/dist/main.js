import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector("#movement");
const frame = document.querySelector("#canvas-frame");
const loadingState = document.querySelector("#loading-state");
const selectedTitle = document.querySelector("#part-title");
const selectedDescription = document.querySelector("#part-description");
const selectedKicker = document.querySelector("#part-kicker");
const selectedAction = document.querySelector("#part-action");
const selectedValue = document.querySelector("#part-value");
const toggleButton = document.querySelector("#toggle-motion");
const toggleLabel = document.querySelector("#toggle-label");
const motionState = document.querySelector("#motion-state");
const speedLabel = document.querySelector("#speed-label");
const speedButton = document.querySelector("#speed-button");
const resetButton = document.querySelector("#reset-view");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const descriptions = {
  barrel: {
    kicker: "动力源 · POWER SOURCE",
    title: "发条盒",
    description: "卷紧的主发条储存能量，经盒缘齿传给中心轮小齿轴，持续驱动整套轮系。",
    action: "储能 · 释放",
    value: "96 齿 <small>／ 主发条驱动轮</small>",
  },
  center: {
    kicker: "轮系 · CENTER WHEEL",
    title: "中心轮",
    description: "中心轮与 12 齿小齿轴同轴；80 齿轮片再驱动三轮小齿轴，将转速逐级提高。",
    action: "同轴复合轮",
    value: "80 / 12 <small>齿 · 8 : 1</small>",
  },
  third: {
    kicker: "轮系 · THIRD WHEEL",
    title: "三轮",
    description: "接收中心轮的动力，以 75 齿轮片带动四轮的 10 齿小齿轴。",
    action: "减速比传递",
    value: "75 / 10 <small>齿 · 7.5 : 1</small>",
  },
  fourth: {
    kicker: "轮系 · FOURTH WHEEL",
    title: "四轮",
    description: "四轮以 80 齿轮片驱动擒纵轮轴上的 10 齿小齿轴，把动力送至擒纵机构。",
    action: "驱动擒纵轮",
    value: "80 / 10 <small>齿 · 8 : 1</small>",
  },
  escape: {
    kicker: "擒纵机构 · ESCAPE WHEEL",
    title: "擒纵轮",
    description: "15 枚尖齿依次与擒纵叉的宝石瓦相遇，轮系的连续转动由此变成可控的脉冲。",
    action: "逐齿释放",
    value: "15 齿 <small>／ 钢制擒纵轮</small>",
  },
  fork: {
    kicker: "擒纵机构 · PALLET FORK",
    title: "擒纵叉",
    description: "两颗红宝石瓦交替锁住、释放擒纵轮齿；叉口同时把脉冲传给摆轮。",
    action: "锁定 · 冲量",
    value: "双瓦式 <small>／ 往复摆动</small>",
  },
  balance: {
    kicker: "调速机构 · REGULATOR",
    title: "摆轮",
    description: "摆轮与游丝往复振荡，为整枚机芯提供稳定的时间基准。",
    action: "往复摆动",
    value: "4 Hz <small>／ 28,800 次·小时</small>",
  },
};

const partButtons = [...document.querySelectorAll("[data-part]")];
const scene = new THREE.Scene();
scene.background = new THREE.Color("#0a171f");
scene.fog = new THREE.Fog("#0a171f", 12, 23);

const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
camera.position.set(0.1, 6.2, 9.1);
camera.lookAt(-0.05, 0.36, 0.05);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(-0.05, 0.36, 0.05);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.minDistance = 5.4;
controls.maxDistance = 14;
controls.minPolarAngle = 0.28;
controls.maxPolarAngle = 1.42;
controls.enablePan = true;
controls.panSpeed = 0.6;
controls.zoomSpeed = 0.72;
controls.rotateSpeed = 0.62;
controls.update();

scene.add(new THREE.HemisphereLight("#c8e0d7", "#1d2932", 2.15));
const keyLight = new THREE.DirectionalLight("#ffe3b8", 3.0);
keyLight.position.set(-4.5, 8, 5);
scene.add(keyLight);
const coolLight = new THREE.DirectionalLight("#7db7c4", 2.25);
coolLight.position.set(5, 5, -5);
scene.add(coolLight);
const rimLight = new THREE.PointLight("#c5915a", 38, 10);
rimLight.position.set(-3.8, 2.2, 2.5);
scene.add(rimLight);

const root = new THREE.Group();
root.position.y = 0.62;
scene.add(root);
const parts = new Map();
const clickableMeshes = [];
const brass = new THREE.MeshStandardMaterial({
  color: "#b98b56",
  metalness: 0.84,
  roughness: 0.28,
});
const paleBrass = new THREE.MeshStandardMaterial({
  color: "#dfbf89",
  metalness: 0.88,
  roughness: 0.23,
});
const steel = new THREE.MeshStandardMaterial({
  color: "#789da1",
  metalness: 0.9,
  roughness: 0.24,
});
const darkSteel = new THREE.MeshStandardMaterial({
  color: "#3a636b",
  metalness: 0.86,
  roughness: 0.29,
});
const jewel = new THREE.MeshStandardMaterial({
  color: "#c87660",
  metalness: 0.46,
  roughness: 0.2,
  emissive: "#35130d",
});
const plateMaterial = new THREE.MeshStandardMaterial({
  color: "#182c34",
  metalness: 0.77,
  roughness: 0.42,
});
const shadowMaterial = new THREE.MeshStandardMaterial({
  color: "#0b171d",
  metalness: 0.48,
  roughness: 0.48,
});

function makePart(id, position) {
  const group = new THREE.Group();
  group.position.set(position.x, 0, position.z);
  group.userData.partId = id;
  root.add(group);
  parts.set(id, group);
  return group;
}

function tagMeshes(group, partId) {
  group.traverse((object) => {
    if (object.isMesh) {
      object.userData.partId = partId;
      clickableMeshes.push(object);
    }
  });
}

function makeGearOutline(teeth, pitchRadius, special = false) {
  const step = (Math.PI * 2) / teeth;
  const rootRadius = pitchRadius - Math.min(0.013, pitchRadius * 0.13);
  const tipRadius = pitchRadius + Math.min(0.008, pitchRadius * 0.08);
  const points = [];
  for (let tooth = 0; tooth < teeth; tooth += 1) {
    const center = tooth * step;
    if (special) {
      points.push(
        [center - step * 0.43, rootRadius],
        [center - step * 0.23, rootRadius],
        [center - step * 0.18, pitchRadius - step * pitchRadius * 0.02],
        [center - step * 0.08, tipRadius],
        [center + step * 0.04, tipRadius],
        [center + step * 0.27, rootRadius],
        [center + step * 0.43, rootRadius],
      );
    } else {
      points.push(
        [center - step * 0.5, rootRadius],
        [center - step * 0.25, rootRadius],
        [center - step * 0.22, tipRadius],
        [center + step * 0.22, tipRadius],
        [center + step * 0.25, rootRadius],
      );
    }
  }

  const shape = new THREE.Shape();
  points.forEach(([angle, radius], index) => {
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  });
  shape.closePath();

  const hole = new THREE.Path();
  hole.absarc(0, 0, Math.max(pitchRadius * 0.38, 0.036), 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return shape;
}

function addGear(group, { teeth, radius, y, material = brass, thickness = 0.11, special = false, spokes = 3 }) {
  const shape = makeGearOutline(teeth, radius, special);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelSize: 0.006,
    bevelThickness: 0.006,
    curveSegments: 2,
  });
  geometry.translate(0, 0, -thickness / 2);
  geometry.rotateX(-Math.PI / 2);
  const layer = new THREE.Group();
  layer.position.y = y;
  group.add(layer);
  const wheel = new THREE.Mesh(geometry, material);
  wheel.castShadow = true;
  wheel.receiveShadow = true;
  layer.add(wheel);

  const barLength = radius * 1.34;
  for (let index = 0; index < spokes; index += 1) {
    const spoke = new THREE.Mesh(
      new THREE.BoxGeometry(barLength, 0.035, Math.max(0.035, radius * 0.075)),
      material === steel ? steel : paleBrass,
    );
    spoke.position.set(0, y < 0.01 ? 0 : 0, 0);
    spoke.rotation.y = (Math.PI * index) / spokes;
    spoke.castShadow = true;
    layer.add(spoke);
  }
  const hubRadius = Math.max(0.046, radius * 0.16);
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(hubRadius, hubRadius * 1.08, 0.13, 28),
    material === steel ? steel : paleBrass,
  );
  hub.position.y = 0;
  hub.castShadow = true;
  layer.add(hub);
  const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.027, 0.027, 0.155, 18), jewel);
  pin.position.y = 0.012;
  layer.add(pin);
  return layer;
}

function addCylinder(parent, radiusTop, radiusBottom, height, material, position, segments = 32) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments),
    material,
  );
  mesh.position.set(position.x, position.y, position.z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function addHorizontalRing(parent, radius, tube, y, material, segments = 96) {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 8, segments), material);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = y;
  ring.castShadow = true;
  parent.add(ring);
  return ring;
}

function addBar(parent, from, to, width, height, material) {
  const dx = to.x - from.x;
  const dz = to.z - from.z;
  const length = Math.hypot(dx, dz);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(length, height, width), material);
  bar.position.set((from.x + to.x) / 2, (from.y + to.y) / 2, (from.z + to.z) / 2);
  bar.rotation.y = -Math.atan2(dz, dx);
  bar.castShadow = true;
  bar.receiveShadow = true;
  parent.add(bar);
  return bar;
}

function addSpiral(parent, radiusStart, radiusEnd, turns, y, color, tube = 0.012) {
  const points = [];
  const count = Math.ceil(turns * 72);
  for (let index = 0; index <= count; index += 1) {
    const t = index / count;
    const angle = t * turns * Math.PI * 2;
    const radius = radiusStart + (radiusEnd - radiusStart) * t;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, count, tube, 6, false), color);
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}

function addPlate() {
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(3.63, 3.72, 0.22, 128), plateMaterial);
  plate.position.set(-0.1, -0.31, 0.02);
  plate.receiveShadow = true;
  plate.castShadow = true;
  root.add(plate);
  addHorizontalRing(root, 3.52, 0.022, -0.183, paleBrass);
  addHorizontalRing(root, 3.38, 0.008, -0.183, darkSteel);

  const screwPositions = [
    [-3.31, -0.34], [-2.54, 2.55], [-0.52, -3.23],
    [1.94, -2.72], [3.06, -0.78], [2.63, 2.23],
    [0.2, 3.37], [-2.49, -2.45],
  ];
  screwPositions.forEach(([x, z], index) => {
    addCylinder(root, 0.07, 0.07, 0.026, darkSteel, { x, y: -0.185, z }, 20);
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.008, 0.012), paleBrass);
    slot.position.set(x, -0.166, z);
    slot.rotation.y = index * 0.43;
    root.add(slot);
  });

  const engraved = new THREE.Mesh(
    new THREE.TorusGeometry(3.72, 0.012, 6, 160),
    darkSteel,
  );
  engraved.rotation.x = Math.PI / 2;
  engraved.position.set(-0.1, -0.38, 0.02);
  root.add(engraved);
}

addPlate();

const positions = {
  barrel: { x: -2.25, z: 0 },
  center: { x: -1.17, z: 0 },
  third: { x: -0.27, z: 0 },
  fourth: { x: 0.503, z: 0.356 },
  escape: { x: 1.241, z: -0.16 },
  fork: { x: 1.58, z: 0.52 },
  balance: { x: 2.43, z: 1.23 },
};

const barrel = makePart("barrel", positions.barrel);
addCylinder(barrel, 0.82, 0.84, 0.2, brass, { x: 0, y: -0.025, z: 0 }, 96);
addHorizontalRing(barrel, 0.84, 0.035, -0.095, paleBrass, 96);
addGear(barrel, { teeth: 96, radius: 0.96, y: 0, material: brass, thickness: 0.115, spokes: 5 });
addSpiral(barrel, 0.69, 0.13, 4.1, 0.135, paleBrass, 0.016);
addCylinder(barrel, 0.11, 0.11, 0.2, darkSteel, { x: 0, y: 0.135, z: 0 }, 24);

const center = makePart("center", positions.center);
addGear(center, { teeth: 12, radius: 0.12, y: 0, material: paleBrass, thickness: 0.09, spokes: 3 });
addGear(center, { teeth: 80, radius: 0.8, y: 0.24, material: brass, thickness: 0.105, spokes: 4 });
addCylinder(center, 0.045, 0.045, 0.47, darkSteel, { x: 0, y: 0.12, z: 0 }, 20);

const third = makePart("third", positions.third);
addGear(third, { teeth: 10, radius: 0.1, y: 0.24, material: paleBrass, thickness: 0.085, spokes: 3 });
addGear(third, { teeth: 75, radius: 0.75, y: 0.48, material: brass, thickness: 0.105, spokes: 4 });
addCylinder(third, 0.04, 0.04, 0.49, darkSteel, { x: 0, y: 0.24, z: 0 }, 18);

const fourth = makePart("fourth", positions.fourth);
addGear(fourth, { teeth: 10, radius: 0.1, y: 0.48, material: paleBrass, thickness: 0.085, spokes: 3 });
addGear(fourth, { teeth: 80, radius: 0.8, y: 0.72, material: brass, thickness: 0.105, spokes: 4 });
addCylinder(fourth, 0.04, 0.04, 0.73, darkSteel, { x: 0, y: 0.36, z: 0 }, 18);

const escape = makePart("escape", positions.escape);
addGear(escape, { teeth: 10, radius: 0.1, y: 0.72, material: paleBrass, thickness: 0.085, spokes: 3 });
addGear(escape, { teeth: 15, radius: 0.285, y: 0.97, material: steel, thickness: 0.085, special: true, spokes: 3 });
addCylinder(escape, 0.035, 0.035, 0.92, darkSteel, { x: 0, y: 0.46, z: 0 }, 18);

const fork = makePart("fork", positions.fork);
fork.userData.baseRotation = -0.14;
const escapeCenterFromFork = { x: positions.escape.x - positions.fork.x, z: positions.escape.z - positions.fork.z };
const palletA = { x: escapeCenterFromFork.x - 0.08, y: 0.99, z: escapeCenterFromFork.z + 0.225 };
const palletB = { x: escapeCenterFromFork.x + 0.23, y: 0.99, z: escapeCenterFromFork.z - 0.07 };
const pivot = { x: 0, y: 1.03, z: 0 };
const impulseEnd = { x: 0.78, y: 1.03, z: 0.62 };
addBar(fork, pivot, palletA, 0.12, 0.09, steel);
addBar(fork, pivot, palletB, 0.12, 0.09, steel);
addBar(fork, pivot, impulseEnd, 0.105, 0.09, steel);
const forkPivot = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.14, 28), paleBrass);
forkPivot.position.set(0, 1.03, 0);
fork.add(forkPivot);
for (const pallet of [palletA, palletB]) {
  const stone = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.085, 0.075), jewel);
  stone.position.set(pallet.x, pallet.y, pallet.z);
  stone.rotation.y = 0.55;
  fork.add(stone);
}
const rollerPin = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.08, 20), jewel);
rollerPin.position.set(impulseEnd.x, impulseEnd.y, impulseEnd.z);
fork.add(rollerPin);

const balance = makePart("balance", positions.balance);
balance.userData.baseRotation = 0;
const balanceWheel = new THREE.Group();
balance.add(balanceWheel);
const balanceRim = new THREE.Mesh(new THREE.TorusGeometry(0.64, 0.035, 10, 100), steel);
balanceRim.rotation.x = Math.PI / 2;
balanceRim.position.y = 1.18;
balanceRim.castShadow = true;
balanceWheel.add(balanceRim);
const innerRim = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.012, 6, 80), darkSteel);
innerRim.rotation.x = Math.PI / 2;
innerRim.position.y = 1.18;
balanceWheel.add(innerRim);
for (let spokeIndex = 0; spokeIndex < 4; spokeIndex += 1) {
  const spoke = new THREE.Mesh(
    new THREE.BoxGeometry(1.12, 0.065, 0.065),
    paleBrass,
  );
  spoke.rotation.y = (Math.PI * spokeIndex) / 2;
  spoke.position.y = 1.18;
  spoke.castShadow = true;
  balanceWheel.add(spoke);
}
const balanceHub = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.13, 0.14, 32), brass);
balanceHub.position.y = 1.18;
balanceWheel.add(balanceHub);
const balanceJewel = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 0.16, 24), jewel);
balanceJewel.position.y = 1.2;
balanceWheel.add(balanceJewel);
for (let weightIndex = 0; weightIndex < 4; weightIndex += 1) {
  const angle = (Math.PI * 2 * weightIndex) / 4 + Math.PI / 4;
  const weight = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.075, 0.09), brass);
  weight.position.set(Math.cos(angle) * 0.58, 1.18, Math.sin(angle) * 0.58);
  weight.rotation.y = -angle;
  balanceWheel.add(weight);
}

const hairspring = new THREE.Group();
balance.add(hairspring);
addSpiral(hairspring, 0.39, 0.065, 3.25, 1.285, steel, 0.011);
const outerStud = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 12), paleBrass);
outerStud.position.set(-0.39, 1.285, 0);
balance.add(outerStud);

const partRadii = {
  barrel: 1.02,
  center: 0.83,
  third: 0.78,
  fourth: 0.83,
  escape: 0.32,
  fork: 0.72,
  balance: 0.7,
};
const selectionHalo = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.012, 6, 100),
  new THREE.MeshBasicMaterial({ color: "#83d2cc", transparent: true, opacity: 0.78 }),
);
selectionHalo.rotation.x = Math.PI / 2;
selectionHalo.visible = false;
scene.add(selectionHalo);

const axes = {};
const gearConnections = [
  ["barrel", "center", 96, 12],
  ["center", "third", 80, 10],
  ["third", "fourth", 75, 10],
  ["fourth", "escape", 80, 10],
];

function localDirection(from, to) {
  return -Math.atan2(to.z - from.z, to.x - from.x);
}

function meshFollowerPhase(driver, follower, driverTeeth, followerTeeth) {
  const followerDirection = localDirection(positions[follower], positions[driver]);
  return followerDirection + Math.PI / followerTeeth;
}

function installGearTrain() {
  axes.barrel = { initial: localDirection(positions.barrel, positions.center), ratio: 1 };
  let driverId = "barrel";
  for (const [from, to, driverTeeth, followerTeeth] of gearConnections) {
    const driverAxis = axes[from];
    const followerPhase = meshFollowerPhase(from, to, driverTeeth, followerTeeth);
    const driverPhase = driverAxis.initial;
    const relationPhase = followerPhase + (driverTeeth / followerTeeth) * driverPhase;
    axes[to] = {
      initial: followerPhase,
      phase: relationPhase,
      ratio: driverAxis.ratio * (-driverTeeth / followerTeeth),
    };
    if (from !== driverId) driverId = from;
  }
  for (const id of ["barrel", "center", "third", "fourth", "escape"]) {
    parts.get(id).rotation.y = axes[id].initial;
  }
}

installGearTrain();

function finalizeParts() {
  for (const [id, group] of parts) tagMeshes(group, id);
}

finalizeParts();

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let pointerStart = null;
let selectedId = "balance";

function selectPart(id) {
  const detail = descriptions[id];
  if (!detail) return;
  selectedId = id;
  selectedTitle.textContent = detail.title;
  selectedDescription.textContent = detail.description;
  selectedKicker.textContent = detail.kicker;
  selectedAction.textContent = detail.action;
  selectedValue.innerHTML = detail.value;
  partButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.part === id);
    if (button.dataset.part === id) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  });
  const group = parts.get(id);
  const position = group.getWorldPosition(new THREE.Vector3());
  const haloHeights = {
    barrel: 0.21,
    center: 0.48,
    third: 0.72,
    fourth: 0.96,
    escape: 1.18,
    fork: 1.22,
    balance: 1.43,
  };
  selectionHalo.position.set(position.x, haloHeights[id] + root.position.y, position.z);
  selectionHalo.scale.setScalar(partRadii[id]);
  selectionHalo.visible = true;
}

partButtons.forEach((button) => {
  button.addEventListener("click", () => selectPart(button.dataset.part));
});
selectPart(selectedId);

function pointerToCanvas(event) {
  const bounds = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
}

renderer.domElement.addEventListener("pointerdown", (event) => {
  pointerStart = { x: event.clientX, y: event.clientY };
});

renderer.domElement.addEventListener("pointerup", (event) => {
  if (!pointerStart) return;
  const moved = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y);
  pointerStart = null;
  if (moved > 6) return;
  pointerToCanvas(event);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(clickableMeshes, false)[0];
  if (!hit) return;
  let object = hit.object;
  while (object && !object.userData.partId) object = object.parent;
  if (object?.userData.partId) selectPart(object.userData.partId);
});

let running = !reducedMotion;
let speedIndex = 0;
const speedMultipliers = [1, 2, 0.5];
let elapsed = 0;
let previousTime = performance.now();
const balanceFrequency = 4;
const balanceAmplitude = 0.34;
const escapeTeethPerSecond = balanceFrequency * 2;
const escapeAngularSpeed = (Math.PI * 2 * escapeTeethPerSecond) / 15;
const drivenWheels = ["barrel", "center", "third", "fourth", "escape"];
const rateById = Object.fromEntries(
  drivenWheels.map((id) => [id, escapeAngularSpeed * axes[id].ratio / axes.escape.ratio]),
);
const angleStart = {};
for (const id of drivenWheels) angleStart[id] = parts.get(id).rotation.y;

function updateControls() {
  running = !running;
  toggleButton.classList.toggle("is-playing", !running);
  toggleButton.setAttribute("aria-label", running ? "暂停机芯" : "继续运转");
  toggleLabel.textContent = running ? "暂停" : "继续";
  motionState.textContent = running ? "机芯运行" : "机芯已暂停";
  document.querySelector(".motion-line").classList.toggle("is-paused", !running);
}

toggleButton.addEventListener("click", updateControls);
if (reducedMotion) {
  toggleButton.classList.add("is-playing");
  toggleButton.setAttribute("aria-label", "继续运转");
  toggleLabel.textContent = "继续";
  motionState.textContent = "机芯已暂停";
  document.querySelector(".motion-line").classList.add("is-paused");
}

speedButton.addEventListener("click", () => {
  speedIndex = (speedIndex + 1) % speedMultipliers.length;
  speedLabel.textContent = `速度 ×${speedMultipliers[speedIndex]}`;
});

const initialDesktopCameraPosition = camera.position.clone();
const initialDesktopTarget = controls.target.clone();
const initialMobileCameraPosition = new THREE.Vector3(0.12, 7.8, 12.2);
const initialMobileTarget = new THREE.Vector3(-0.05, 0.36, 0.05);
const mobileQuery = window.matchMedia("(max-width: 760px)");
function applyResponsiveCamera() {
  const mobile = mobileQuery.matches;
  const position = mobile ? initialMobileCameraPosition : initialDesktopCameraPosition;
  const target = mobile ? initialMobileTarget : initialDesktopTarget;
  camera.fov = mobile ? 45 : 32;
  camera.position.copy(position);
  controls.target.copy(target);
  camera.updateProjectionMatrix();
  controls.update();
}

resetButton.addEventListener("click", applyResponsiveCamera);
mobileQuery.addEventListener("change", applyResponsiveCamera);

function resize() {
  const bounds = frame.getBoundingClientRect();
  const width = Math.max(1, bounds.width);
  const height = Math.max(1, bounds.height);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

const resizeObserver = new ResizeObserver(resize);
resizeObserver.observe(frame);
resize();
applyResponsiveCamera();
loadingState.classList.add("is-hidden");

const oscillator = 2 * Math.PI * balanceFrequency;
function animate(now) {
  requestAnimationFrame(animate);
  const delta = Math.min((now - previousTime) / 1000, 0.05);
  previousTime = now;
  if (running) {
    const speed = speedMultipliers[speedIndex];
    elapsed += delta * speed;
    for (const id of drivenWheels) {
      const group = parts.get(id);
      const rotation = angleStart[id] + rateById[id] * elapsed * speed;
      group.rotation.y = rotation;
    }
    const phase = oscillator * elapsed;
    balanceWheel.rotation.y = balanceAmplitude * Math.sin(phase);
    fork.rotation.y = fork.userData.baseRotation + 0.13 * Math.sin(phase + Math.PI / 2);
    hairspring.rotation.y = -0.035 * Math.sin(phase);
  }
  controls.update();
  renderer.render(scene, camera);
}

requestAnimationFrame(animate);

window.addEventListener("beforeunload", () => {
  resizeObserver.disconnect();
  controls.dispose();
  renderer.dispose();
});
