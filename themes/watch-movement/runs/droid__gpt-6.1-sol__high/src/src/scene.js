import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { MODULE, STAGES, PARTS, movementAt } from './mechanics.js';

const TAU = Math.PI * 2;
const BALANCE = { x: -2.85, y: -0.45, z: 1.53, radius: 1.38 };
const FORK = { x: -2.18, y: -1.83, z: 1.04 };

function extrude(shape, depth, bevel = 0.015) {
  return new THREE.ExtrudeGeometry(shape, {
    depth, bevelEnabled: bevel > 0, bevelSegments: 2,
    steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 72,
  });
}

function ringGeometry(outer, inner, depth) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outer, 0, TAU, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, inner, 0, TAU, true);
  shape.holes.push(hole);
  return extrude(shape, depth, 0.008);
}

// Involute flanks, 20° pressure angle, small backlash for running clearance.
export function gearShape(teeth, module = MODULE, skeleton = true) {
  const pitch = teeth * module / 2;
  const base = pitch * Math.cos(20 * Math.PI / 180);
  const root = pitch - 1.25 * module;
  const tip = pitch + module;
  const half = Math.PI / (2 * teeth) * 0.94;
  const involute = (radius) => {
    const t = Math.sqrt(Math.max(0, (radius / base) ** 2 - 1));
    return t - Math.atan(t);
  };
  const offset = half + involute(pitch);
  const points = [];
  const point = (radius, angle) => points.push(new THREE.Vector2(radius * Math.cos(angle), radius * Math.sin(angle)));
  for (let n = 0; n < teeth; n++) {
    const center = n * TAU / teeth;
    point(root, center - Math.PI / teeth);
    point(root, center - offset);
    for (let step = 0; step <= 5; step++) {
      const r = Math.max(base, root) + (tip - Math.max(base, root)) * step / 5;
      point(r, center - offset + involute(r));
    }
    for (let step = 5; step >= 0; step--) {
      const r = Math.max(base, root) + (tip - Math.max(base, root)) * step / 5;
      point(r, center + offset - involute(r));
    }
    point(root, center + offset);
    point(root, center + Math.PI / teeth);
  }
  const shape = new THREE.Shape(points);
  if (skeleton && teeth > 25) {
    const spokes = 5;
    for (let i = 0; i < spokes; i++) {
      const start = i * TAU / spokes + 0.13;
      const end = (i + 1) * TAU / spokes - 0.13;
      const hole = new THREE.Path();
      hole.absarc(0, 0, root - 0.13, start, end, false);
      hole.absarc(0, 0, pitch * 0.2, end, start, true);
      hole.closePath();
      shape.holes.push(hole);
    }
  }
  return shape;
}

function escapeShape() {
  const points = [];
  for (let i = 0; i < 15; i++) {
    const angle = i * TAU / 15;
    for (const [radius, offset] of [[0.77, -0.17], [0.94, -0.055], [0.99, 0], [0.86, 0.065], [0.77, 0.14]]) {
      points.push(new THREE.Vector2(radius * Math.cos(angle + offset), radius * Math.sin(angle + offset)));
    }
  }
  const shape = new THREE.Shape(points);
  for (let i = 0; i < 5; i++) {
    const a = i * TAU / 5 + 0.12;
    const b = (i + 1) * TAU / 5 - 0.12;
    const hole = new THREE.Path();
    hole.absarc(0, 0, 0.65, a, b, false);
    hole.absarc(0, 0, 0.23, b, a, true);
    hole.closePath();
    shape.holes.push(hole);
  }
  return shape;
}

function spiralCurve(turns, inner, outer, z, twist = 0) {
  const points = [];
  const count = turns * 100;
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const a = t * turns * TAU + twist * (1 - t);
    const r = inner + (outer - inner) * t;
    points.push(new THREE.Vector3(r * Math.cos(a), r * Math.sin(a), z));
  }
  return new THREE.CatmullRomCurve3(points);
}

function surfaceTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#b9c3ba';
  ctx.fillRect(0, 0, 1024, 1024);
  for (let row = -1; row < 17; row++) {
    for (let col = -1; col < 17; col++) {
      const x = col * 66 + (row % 2) * 33, y = row * 62;
      for (let radius = 4; radius < 48; radius += 2.7) {
        ctx.strokeStyle = radius % 5 < 2.5 ? '#ffffff13' : '#1a302511';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, TAU);
        ctx.stroke();
      }
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function createMovement(canvas, onSelect, onReady) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.up.set(0, 0, 1);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.minDistance = 9;
  controls.maxDistance = 35;
  controls.minPolarAngle = 0.02;
  controls.maxPolarAngle = Math.PI * 0.58;
  controls.rotateSpeed = 0.7;
  controls.zoomSpeed = 0.7;
  controls.target.set(0, 0, 0.55);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  scene.environmentIntensity = 1;
  scene.add(new THREE.HemisphereLight(0xf9fff0, 0x667a68, 1.25));
  const light = new THREE.DirectionalLight(0xfff6df, 2.5);
  light.position.set(-5, 5, 12);
  light.castShadow = true;
  light.shadow.mapSize.set(1024, 1024);
  Object.assign(light.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 0.1, far: 30 });
  light.shadow.bias = -0.0005;
  light.shadow.normalBias = 0.02;
  scene.add(light);
  const fill = new THREE.DirectionalLight(0xe4edff, 1.5);
  fill.position.set(5, -3, 5);
  scene.add(fill);

  const mat = {
    brass: new THREE.MeshStandardMaterial({ color: 0xb58b36, metalness: 0.85, roughness: 0.31 }),
    brassLight: new THREE.MeshStandardMaterial({ color: 0xd0a64f, metalness: 0.85, roughness: 0.28 }),
    steel: new THREE.MeshStandardMaterial({ color: 0xb5c4bf, metalness: 0.85, roughness: 0.31 }),
    plate: new THREE.MeshStandardMaterial({ color: 0xd1d6cc, map: surfaceTexture(), metalness: 0.82, roughness: 0.47 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x3a4543, metalness: 0.82, roughness: 0.25 }),
    ruby: new THREE.MeshPhysicalMaterial({ color: 0x9f234d, metalness: 0.12, roughness: 0.19, clearcoat: 1, clearcoatRoughness: 0.1 }),
    blue: new THREE.MeshStandardMaterial({ color: 0x344e61, metalness: 0.85, roughness: 0.26 }),
  };
  const movement = new THREE.Group();
  scene.add(movement);
  const selectable = [];
  const animated = [];
  const layers = [];
  let selected = 'balance';
  let exploded = 0, explosionTarget = 0, simTime = 0, speed = 1, playing = true;
  let last = performance.now(), frameCount = 0, raf = 0, stopped = false;
  let viewTransition = null;

  function mesh(geometry, material, parent, x = 0, y = 0, z = 0) {
    const object = new THREE.Mesh(geometry, material);
    object.position.set(x, y, z);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  function cylinder(radius, depth, material, parent, x, y, z, segments = 48) {
    const object = mesh(new THREE.CylinderGeometry(radius, radius, depth, segments), material, parent, x, y, z);
    object.rotation.x = Math.PI / 2;
    return object;
  }
  function register(group, id, layer) {
    group.userData.part = id;
    group.traverse((child) => {
      if (child.isMesh) { child.userData.part = id; selectable.push(child); }
    });
    layers.push({ group, layer, initial: group.position.z });
  }
  function screw(parent, x, y, z, radius = 0.13, blue = true) {
    cylinder(radius * 1.35, 0.035, mat.steel, parent, x, y, z);
    cylinder(radius, 0.06, blue ? mat.blue : mat.steel, parent, x, y, z + 0.04);
    const slot = mesh(new THREE.BoxGeometry(radius * 1.65, 0.023, 0.013), mat.dark, parent, x, y, z + 0.075);
    slot.rotation.z = x * 0.8 + y * 0.4;
  }
  function jewel(parent, x, y, z, radius = 0.13) {
    mesh(ringGeometry(radius * 1.52, radius * 0.93, 0.045), mat.brassLight, parent, x, y, z);
    cylinder(radius, 0.06, mat.ruby, parent, x, y, z + 0.025);
    cylinder(radius * 0.31, 0.073, mat.dark, parent, x, y, z + 0.042);
    cylinder(radius * 0.16, 0.08, mat.steel, parent, x, y, z + 0.045);
  }
  function bar(parent, from, to, width, depth, material, z) {
    const length = Math.hypot(to[0] - from[0], to[1] - from[1]);
    const object = mesh(new THREE.BoxGeometry(length, width, depth), material, parent, (to[0] + from[0]) / 2, (to[1] + from[1]) / 2, z);
    object.rotation.z = Math.atan2(to[1] - from[1], to[0] - from[0]);
    return object;
  }

  const base = new THREE.Group();
  movement.add(base);
  cylinder(4.66, 0.31, mat.steel, base, 0, 0, -0.25, 128);
  cylinder(4.56, 0.19, mat.plate, base, 0, 0, -0.035, 128);
  mesh(ringGeometry(4.67, 4.54, 0.03), mat.brass, base, 0, 0, -0.15);
  mesh(ringGeometry(4.54, 4.44, 0.035), mat.steel, base, 0, 0, 0.065);
  mesh(ringGeometry(4.3, 4.29, 0.006), mat.dark, base, 0, 0, 0.073);
  for (let i = 0; i < 60; i++) {
    const a = i * TAU / 60;
    const tick = mesh(new THREE.BoxGeometry(i % 5 ? 0.06 : 0.12, 0.009, 0.006), mat.dark, base, 4.37 * Math.cos(a), 4.37 * Math.sin(a), 0.076);
    tick.rotation.z = a;
  }
  for (const [x, y] of [[-1.5, 3.9], [2.7, 3.1], [4.1, 0.25], [2.6, -3.2], [-1.55, -3.8], [-4.15, 0.35]]) screw(base, x, y, 0.085, 0.15);
  for (const stage of STAGES) {
    cylinder(stage.pinion ? 0.32 : 0.4, 0.08, mat.steel, base, stage.x, stage.y, 0.11);
    jewel(base, stage.x, stage.y, 0.17, 0.11);
  }
  const engravingCanvas = document.createElement('canvas');
  engravingCanvas.width = 512; engravingCanvas.height = 256;
  const engravingCtx = engravingCanvas.getContext('2d');
  engravingCtx.fillStyle = '#63736a';
  engravingCtx.textAlign = 'center';
  engravingCtx.font = '32px Georgia';
  engravingCtx.fillText('ATELIER OF TIME', 256, 87);
  engravingCtx.font = '17px monospace';
  engravingCtx.fillText('CAL. 01   ·   18 000 A/h', 256, 124);
  engravingCtx.fillText('SWISS LEVER STUDY', 256, 164);
  const engravingTexture = new THREE.CanvasTexture(engravingCanvas);
  const engraving = mesh(new THREE.PlaneGeometry(2, 1), new THREE.MeshBasicMaterial({ map: engravingTexture, transparent: true, depthWrite: false }), base, 2.55, -1.57, 0.078);
  engraving.rotation.z = -0.16;

  STAGES.forEach((stage, index) => {
    const group = new THREE.Group();
    group.position.set(stage.x, stage.y, 0);
    movement.add(group);
    const wheel = stage.id === 'escape' ? escapeShape() : gearShape(stage.teeth, MODULE, stage.id !== 'barrel');
    mesh(extrude(wheel, stage.id === 'barrel' ? 0.12 : 0.075, 0.006), stage.id === 'escape' ? mat.steel : mat.brass, group, 0, 0, stage.z);
    if (stage.pinion) {
      mesh(extrude(gearShape(stage.pinion, MODULE, false), 0.12, 0.003), mat.steel, group, 0, 0, stage.pinionZ - 0.022);
    }
    cylinder(0.064, Math.max(stage.z, stage.pinionZ ?? 0) + 0.38, mat.steel, group, 0, 0, (Math.max(stage.z, stage.pinionZ ?? 0) + 0.38) / 2 + 0.02);
    cylinder(0.16, 0.10, mat.brassLight, group, 0, 0, stage.z + 0.07);
    if (stage.id === 'barrel') {
      mesh(ringGeometry(1.75, 1.59, 0.39), mat.brassLight, group, 0, 0, stage.z + 0.08);
      mesh(new THREE.TubeGeometry(spiralCurve(8, 0.22, 1.53, 0.65), 800, 0.016, 5, false), mat.dark, group);
      mesh(ringGeometry(1.6, 1.565, 0.02), mat.steel, group, 0, 0, 0.78);
      cylinder(0.24, 0.14, mat.steel, group, 0, 0, 0.75);
      screw(group, 0, 0, 0.84, 0.11, false);
    }
    group.rotation.z = stage.phase;
    animated.push(group);
    register(group, stage.id === 'barrel' ? 'barrel' : stage.id === 'escape' ? 'escape' : 'train', index * 0.8 + 0.3);
  });

  // Narrow skeleton bridges leave both the wheel and its pinion visible.
  function bridge(id, start, end, z, width, layer) {
    const group = new THREE.Group();
    movement.add(group);
    bar(group, start, end, width, 0.14, mat.plate, z);
    cylinder(width / 2, 0.14, mat.plate, group, ...start, z);
    cylinder(width * 0.66, 0.14, mat.plate, group, ...end, z);
    bar(group, start, end, width * 0.7, 0.008, mat.steel, z + 0.075);
    jewel(group, ...start, z + 0.08, 0.10);
    screw(group, ...end, z + 0.08, 0.14);
    cylinder(0.22, z - 0.05, mat.steel, group, ...end, (z - 0.05) / 2 + 0.06);
    register(group, id, layer);
  }
  bridge('barrel', [STAGES[0].x, STAGES[0].y], [-2.25, 3.65], 1.00, 0.35, 4.5);
  bridge('train', [STAGES[1].x, STAGES[1].y], [0.8, 3.58], 1.23, 0.36, 4.8);
  bridge('train', [STAGES[2].x, STAGES[2].y], [3.65, 0.83], 1.65, 0.36, 5.1);
  bridge('train', [STAGES[3].x, STAGES[3].y], [1.65, -3.64], 2.08, 0.33, 5.4);
  bridge('escape', [STAGES[4].x, STAGES[4].y], [-0.85, -3.85], 2.05, 0.29, 5.3);

  const fork = new THREE.Group();
  fork.position.set(FORK.x, FORK.y, FORK.z);
  movement.add(fork);
  const forkOutline = new THREE.Shape([
    new THREE.Vector2(-0.67, 1.00), new THREE.Vector2(-0.55, 1.07), new THREE.Vector2(0.02, 0.12),
    new THREE.Vector2(0.45, 0.46), new THREE.Vector2(0.58, 0.39), new THREE.Vector2(0.52, 0.28),
    new THREE.Vector2(0.14, -0.03), new THREE.Vector2(0.34, -0.80), new THREE.Vector2(0.24, -0.94),
    new THREE.Vector2(0.14, -0.85), new THREE.Vector2(-0.11, -0.1),
  ]);
  mesh(extrude(forkOutline, 0.055, 0.012), mat.steel, fork);
  bar(fork, [-0.64, 0.97], [-0.82, 1.17], 0.055, 0.055, mat.steel, 0.13);
  bar(fork, [-0.54, 1.03], [-0.51, 1.23], 0.055, 0.055, mat.steel, 0.13);
  const entry = mesh(new THREE.BoxGeometry(0.22, 0.11, 0.085), mat.ruby, fork, 0.50, 0.39, -0.027);
  entry.rotation.z = -0.43;
  const exit = mesh(new THREE.BoxGeometry(0.22, 0.11, 0.085), mat.ruby, fork, 0.24, -0.88, -0.027);
  exit.rotation.z = 0.85;
  cylinder(0.09, 0.28, mat.steel, fork, 0, 0, 0.04);
  register(fork, 'fork', 3.5);
  bridge('fork', [FORK.x, FORK.y], [-3.2, -2.9], 1.31, 0.22, 5.1);

  const balance = new THREE.Group();
  balance.position.set(BALANCE.x, BALANCE.y, BALANCE.z);
  movement.add(balance);
  mesh(ringGeometry(BALANCE.radius, BALANCE.radius - 0.115, 0.12), mat.brassLight, balance, 0, 0, 0);
  mesh(ringGeometry(BALANCE.radius - 0.04, BALANCE.radius - 0.065, 0.018), mat.brass, balance, 0, 0, 0.132);
  for (let i = 0; i < 3; i++) {
    const angle = i * TAU / 3;
    bar(balance, [0, 0], [1.29 * Math.cos(angle), 1.29 * Math.sin(angle)], 0.105, 0.075, mat.brassLight, 0.043);
  }
  for (let i = 0; i < 12; i++) {
    const angle = i * TAU / 12;
    const block = mesh(new THREE.BoxGeometry(0.1, 0.10, 0.09), mat.brass, balance, 1.33 * Math.cos(angle), 1.33 * Math.sin(angle), 0.08);
    block.rotation.z = angle;
  }
  cylinder(0.07, 0.66, mat.steel, balance, 0, 0, 0.035);
  cylinder(0.18, 0.10, mat.steel, balance, 0, 0, -0.3);
  cylinder(0.055, 0.10, mat.ruby, balance, 0.14, 0.02, -0.34);
  register(balance, 'balance', 4);
  const hairspring = new THREE.Group();
  hairspring.position.copy(balance.position);
  movement.add(hairspring);
  const springGeometry = new THREE.BufferGeometry();
  const springPoints = new Float32Array(701 * 3);
  springGeometry.setAttribute('position', new THREE.BufferAttribute(springPoints, 3));
  const spring = new THREE.Line(springGeometry, new THREE.LineBasicMaterial({ color: 0x344b5a }));
  hairspring.add(spring);
  register(hairspring, 'balance', 4);
  const balanceBridge = new THREE.Group();
  movement.add(balanceBridge);
  bar(balanceBridge, [BALANCE.x, BALANCE.y], [-4.04, 1.05], 0.32, 0.15, mat.plate, 2.04);
  cylinder(0.21, 0.15, mat.plate, balanceBridge, BALANCE.x, BALANCE.y, 2.04);
  cylinder(0.36, 0.16, mat.plate, balanceBridge, -4.04, 1.05, 2.04);
  cylinder(0.25, 1.95, mat.steel, balanceBridge, -4.04, 1.05, 1.02);
  jewel(balanceBridge, BALANCE.x, BALANCE.y, 2.13, 0.16);
  screw(balanceBridge, -4.04, 1.05, 2.13, 0.19);
  const regulator = mesh(new THREE.BoxGeometry(0.65, 0.075, 0.05), mat.dark, balanceBridge, BALANCE.x + 0.24, BALANCE.y - 0.1, 2.19);
  regulator.rotation.z = -0.35;
  cylinder(0.055, 0.5, mat.steel, balanceBridge, BALANCE.x + 0.89, BALANCE.y + 0.34, 1.88);
  register(balanceBridge, 'balance', 6);

  // A procedural contact shadow anchors the movement, without external textures.
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = shadowCanvas.height = 128;
  const shadowCtx = shadowCanvas.getContext('2d');
  const gradient = shadowCtx.createRadialGradient(64, 64, 10, 64, 64, 64);
  gradient.addColorStop(0, '#31402b37'); gradient.addColorStop(0.55, '#31402b28'); gradient.addColorStop(1, '#31402b00');
  shadowCtx.fillStyle = gradient; shadowCtx.fillRect(0, 0, 128, 128);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(13, 13), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }));
  shadow.position.set(0.35, -0.2, -0.5);
  scene.add(shadow);

  const selectionRing = new THREE.Mesh(ringGeometry(1.53, 1.516, 0.006), new THREE.MeshBasicMaterial({ color: 0x718f69, transparent: true, opacity: 0.52, depthWrite: false }));
  selectionRing.position.set(BALANCE.x, BALANCE.y, BALANCE.z + 0.18);
  selectionRing.raycast = () => {};
  movement.add(selectionRing);

  function updateSelection() {
    const data = PARTS[selected];
    const radius = { barrel: 2.02, train: 1.65, escape: 1.10, fork: 0.50, balance: 1.53 }[selected];
    selectionRing.scale.setScalar(radius / 1.53);
    const point = data.target;
    const layer = { barrel: 0.3, train: 1.9, escape: 3.5, fork: 3.5, balance: 4 }[selected];
    selectionRing.position.set(point[0], point[1], point[2] + 0.16 + exploded * layer);
  }
  function reset(top = false) {
    const narrow = canvas.clientWidth < 500;
    const distance = Math.max(narrow ? 20 : 21.4, 17.3 / camera.aspect);
    const target = new THREE.Vector3(0, 0, explosionTarget ? 1.7 : 0.65);
    const offset = top ? new THREE.Vector3(0, -0.01, distance) : new THREE.Vector3(0.3, -distance * 0.50, distance * 0.87);
    viewTransition = { from: camera.position.clone(), to: offset.add(target), targetFrom: controls.target.clone(), targetTo: target, start: performance.now() };
  }
  camera.position.set(0.3, -10.7, 19.2);
  let previousSize = '';
  function resize() {
    const width = canvas.clientWidth, height = canvas.clientHeight;
    if (!width || !height) return;
    const size = `${width}x${height}`;
    if (size === previousSize) return;
    const was = previousSize;
    previousSize = size;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Fit to the more restricted dimension, so half-width iframes remain useful.
    camera.fov = camera.aspect < 0.85 ? 40 : 34;
    camera.updateProjectionMatrix();
    const minimumDistance = Math.max(16, 17.3 / camera.aspect);
    controls.maxDistance = Math.max(35, minimumDistance * 1.7);
    if (!was || camera.position.distanceTo(controls.target) < minimumDistance) {
      camera.position.sub(controls.target).setLength(minimumDistance).add(controls.target);
    }
  }
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let down = null, dragging = false, pointers = new Set();
  canvas.addEventListener('pointerdown', (event) => {
    pointers.add(event.pointerId);
    if (pointers.size > 1) dragging = true;
    else { down = { x: event.clientX, y: event.clientY }; dragging = false; }
    viewTransition = null;
  });
  canvas.addEventListener('pointermove', (event) => {
    if (down && Math.hypot(event.clientX - down.x, event.clientY - down.y) > 6) dragging = true;
    if (!down) {
      const rect = canvas.getBoundingClientRect();
      pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      canvas.style.cursor = raycaster.intersectObjects(selectable, false).length ? 'pointer' : 'grab';
    }
  });
  canvas.addEventListener('pointerup', (event) => {
    pointers.delete(event.pointerId);
    if (down && !dragging && pointers.size === 0) {
      const rect = canvas.getBoundingClientRect();
      pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(selectable, false);
      if (hits.length) onSelect(hits[0].object.userData.part);
    }
    if (pointers.size === 0) down = null;
  });
  canvas.addEventListener('pointercancel', (event) => { pointers.delete(event.pointerId); down = null; dragging = true; });
  canvas.addEventListener('keydown', (event) => {
    const arrows = { ArrowLeft: -0.10, ArrowRight: 0.10, ArrowUp: -0.10, ArrowDown: 0.10 };
    if (event.key in arrows) {
      event.preventDefault();
      const offset = camera.position.clone().sub(controls.target);
      const spherical = new THREE.Spherical().setFromVector3(offset.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(camera.up, new THREE.Vector3(0, 1, 0))));
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') spherical.theta += arrows[event.key];
      else spherical.phi = THREE.MathUtils.clamp(spherical.phi + arrows[event.key], controls.minPolarAngle, controls.maxPolarAngle);
      offset.setFromSpherical(spherical).applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), camera.up));
      camera.position.copy(controls.target).add(offset);
    } else if (['+', '=', '-'].includes(event.key)) {
      event.preventDefault();
      const offset = camera.position.clone().sub(controls.target);
      const distance = THREE.MathUtils.clamp(offset.length() * (event.key === '-' ? 1.1 : 0.9), controls.minDistance, controls.maxDistance);
      camera.position.copy(controls.target).add(offset.setLength(distance));
    }
  });

  function frame(now) {
    if (stopped) return;
    raf = requestAnimationFrame(frame);
    const delta = Math.min((now - last) / 1000, 0.1);
    last = now;
    if (document.hidden) return;
    if (playing) simTime += delta * speed;
    const state = movementAt(simTime);
    animated.forEach((group, i) => { group.rotation.z = state.angles[i]; });
    balance.rotation.z = state.balance;
    fork.rotation.z = state.fork;
    for (let i = 0; i <= 700; i++) {
      const t = i / 700;
      const angle = t * 7 * TAU + state.balance * (1 - t);
      const r = 0.15 + 0.80 * t;
      springPoints[i * 3] = r * Math.cos(angle);
      springPoints[i * 3 + 1] = r * Math.sin(angle);
      springPoints[i * 3 + 2] = 0.3;
    }
    springGeometry.attributes.position.needsUpdate = true;
    springGeometry.computeBoundingSphere();
    exploded += (explosionTarget - exploded) * Math.min(delta * 6, 1);
    layers.forEach(({ group, layer, initial }) => { group.position.z = initial + layer * exploded; });
    updateSelection();
    if (viewTransition) {
      const t = Math.min((now - viewTransition.start) / 700, 1);
      const smooth = t * t * (3 - 2 * t);
      camera.position.lerpVectors(viewTransition.from, viewTransition.to, smooth);
      controls.target.lerpVectors(viewTransition.targetFrom, viewTransition.targetTo, smooth);
      if (t === 1) viewTransition = null;
    }
    controls.update();
    renderer.render(scene, camera);
    if (++frameCount === 1) onReady();
    if (frameCount % 3 === 0) {
      const label = document.getElementById('scene-label');
      const position = selectionRing.position.clone().add(new THREE.Vector3(-0.30, 0.0, 0.4)).project(camera);
      const x = (position.x * 0.5 + 0.5) * canvas.clientWidth;
      const y = (-position.y * 0.5 + 0.5) * canvas.clientHeight;
      label.style.left = `${THREE.MathUtils.clamp(x - label.offsetWidth - 18, 12, canvas.clientWidth - label.offsetWidth - 12)}px`;
      label.style.top = `${THREE.MathUtils.clamp(y - 6, 45, canvas.clientHeight - 68)}px`;
      label.style.opacity = position.z > 1 || position.z < -1 ? '0' : '1';
    }
  }
  raf = requestAnimationFrame(frame);
  return {
    select(id) { selected = id; updateSelection(); },
    setPlaying(value) { playing = value; },
    setSpeed(value) { speed = value; },
    explode(value) { explosionTarget = value ? 0.72 : 0; reset(); },
    reset, top: () => reset(true),
    inspect: () => ({
      simTime, playing, speed, exploded, selected, frames: frameCount,
      angles: animated.map((group) => group.rotation.z),
      balance: balance.rotation.z, fork: fork.rotation.z,
      camera: camera.position.toArray(),
      meshCount: selectable.length,
      projected: Object.fromEntries(Object.entries(PARTS).map(([id, part]) => {
        const p = new THREE.Vector3(...part.target).project(camera);
        const rect = canvas.getBoundingClientRect();
        return [id, { x: rect.left + (p.x * 0.5 + 0.5) * rect.width, y: rect.top + (-p.y * 0.5 + 0.5) * rect.height }];
      })),
    }),
    destroy() {
      stopped = true;
      cancelAnimationFrame(raf);
      observer.disconnect(); controls.dispose();
      scene.traverse((object) => { object.geometry?.dispose(); });
      Object.values(mat).forEach((material) => { material.map?.dispose(); material.dispose(); });
      environment.dispose(); renderer.dispose();
    },
  };
}
