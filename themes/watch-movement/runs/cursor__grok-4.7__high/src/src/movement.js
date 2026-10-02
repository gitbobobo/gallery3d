import * as THREE from 'three';
import {
  MODULE,
  PITCH,
  TEETH,
  buildLayout,
  tipRadius,
} from './layout.js';
import {
  escapeGeometry,
  gearGeometry,
  ratchetGeometry,
  ringGeometry,
  stadiumGeometry,
  stripGeometry,
  writeStrip,
} from './gears.js';

const TH = 0.05;
const Y = {
  plateTop: 0.15,
  barrelTeeth: 0.28,
  barrelTop: 0.46,
  center: 0.6,
  third: 0.76,
  fourth: 0.92,
  escape: 1.08,
  balance: 1.24,
  spring: 1.345,
};

function metal(color, roughness, glow, extra = {}) {
  const mat = new THREE.MeshStandardMaterial({
    color,
    metalness: extra.metalness ?? 1,
    roughness,
    envMapIntensity: 1.35,
    emissive: extra.emissive || 0x000000,
    emissiveIntensity: extra.emissiveIntensity || 0,
  });
  mat.userData.glow = glow;
  mat.userData.baseEmissive = extra.emissive || 0x000000;
  mat.userData.baseEmissiveIntensity = extra.emissiveIntensity || 0;
  return mat;
}

function cloneMat(tpl) {
  const mat = tpl.clone();
  mat.userData.glow = tpl.userData.glow;
  mat.userData.baseEmissive = tpl.userData.baseEmissive;
  mat.userData.baseEmissiveIntensity = tpl.userData.baseEmissiveIntensity;
  return mat;
}

function templates() {
  return {
    brass: metal(0xb88830, 0.22, 0x7a4010),
    barrel: metal(0xa9782c, 0.26, 0x7a4010),
    steel: metal(0xc5ced8, 0.16, 0x3c4a58),
    blue: metal(0x1a4a86, 0.22, 0x12386e),
    ruby: metal(0xd0123c, 0.1, 0xaa1838, {
      metalness: 0.12,
      emissive: 0x6a0a18,
      emissiveIntensity: 0.7,
    }),
    plate: metal(0x8d959e, 0.4, 0x4a453c),
    bridge: metal(0xa7b0b8, 0.3, 0x5a5348),
    balance: metal(0xd4ae4a, 0.2, 0x8a5a12),
    velvet: new THREE.MeshStandardMaterial({
      color: 0x6d3140,
      metalness: 0,
      roughness: 0.96,
    }),
  };
}

function lay(geo, mat, y) {
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = y;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function addGear(parent, geo, mat, y, clock = 0) {
  const pivot = new THREE.Group();
  pivot.position.y = y;
  pivot.rotation.y = clock;
  pivot.add(lay(geo, mat, 0));
  parent.add(pivot);
  return pivot;
}

function addSpokes(parent, mat, y, inner, outer, count = 5) {
  const len = outer - inner;
  const geo = new THREE.BoxGeometry(0.042, TH * 0.78, len);
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const mesh = new THREE.Mesh(geo, mat);
    const mid = inner + len / 2;
    mesh.position.set(Math.sin(a) * mid, y, Math.cos(a) * mid);
    mesh.rotation.y = a;
    mesh.castShadow = true;
    parent.add(mesh);
  }
}

function addHub(parent, mat, y, radius) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, TH * 0.9, 18), mat);
  mesh.position.y = y;
  mesh.castShadow = true;
  parent.add(mesh);
}

function addStaff(parent, mat, y0, y1, radius = 0.02) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, y1 - y0, 12),
    mat,
  );
  mesh.position.y = (y0 + y1) / 2;
  mesh.castShadow = true;
  parent.add(mesh);
}

function addScrew(parent, mat, x, y, z) {
  const head = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.072, 0.04, 16), mat);
  head.position.set(x, y, z);
  head.castShadow = true;
  const slot = new THREE.Mesh(new THREE.BoxGeometry(0.084, 0.018, 0.014), mat);
  slot.position.set(x, y + 0.02, z);
  slot.rotation.y = ((x * 13 + z * 7) % 1) * Math.PI;
  parent.add(head, slot);
}

function addJewel(parent, ruby, gold, x, y, z, scale = 1) {
  const stone = new THREE.Mesh(new THREE.CylinderGeometry(0.055 * scale, 0.055 * scale, 0.034, 18), ruby);
  stone.position.set(x, y, z);
  const chaton = new THREE.Mesh(new THREE.TorusGeometry(0.078 * scale, 0.014 * scale, 8, 20), gold);
  chaton.rotation.x = Math.PI / 2;
  chaton.position.set(x, y, z);
  stone.castShadow = true;
  parent.add(stone, chaton);
}

function brushTexture() {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const g = canvas.getContext('2d');
  g.fillStyle = '#9aa3ad';
  g.fillRect(0, 0, size, size);
  for (let r = 8; r < size / 2; r += 2) {
    g.strokeStyle = r % 4 === 0 ? 'rgba(255,255,255,0.13)' : 'rgba(30,34,38,0.05)';
    g.beginPath();
    g.arc(size / 2, size / 2, r, 0, Math.PI * 2);
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function contactTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const g = canvas.getContext('2d');
  const grd = g.createRadialGradient(256, 256, 40, 256, 256, 250);
  grd.addColorStop(0, 'rgba(0,0,0,0.42)');
  grd.addColorStop(0.55, 'rgba(0,0,0,0.18)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 512, 512);
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function velvetTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const g = canvas.getContext('2d');
  const grd = g.createRadialGradient(256, 230, 20, 256, 256, 280);
  grd.addColorStop(0, '#7a3a48');
  grd.addColorStop(0.55, '#642c3a');
  grd.addColorStop(1, '#3c1822');
  g.fillStyle = grd;
  g.fillRect(0, 0, 512, 512);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function awayAngle(pivot, neighbors) {
  let best = 0;
  let bestScore = -Infinity;
  for (let deg = 0; deg < 360; deg += 6) {
    const a = (deg * Math.PI) / 180;
    const dx = Math.cos(a);
    const dz = Math.sin(a);
    let score = 4;
    for (const n of neighbors) {
      const vx = n.x - pivot.x;
      const vz = n.z - pivot.z;
      const len = Math.hypot(vx, vz) || 1;
      score = Math.min(score, 1 - (dx * vx + dz * vz) / len);
    }
    if (score > bestScore) {
      bestScore = score;
      best = a;
    }
  }
  return best;
}

function placeFoot(pivot, angle, start, obstacles, plateR) {
  for (let len = start; len <= start + 1.6; len += 0.06) {
    const foot = {
      x: pivot.x + Math.cos(angle) * len,
      z: pivot.z + Math.sin(angle) * len,
    };
    if (Math.hypot(foot.x, foot.z) > plateR - 0.25) break;
    const clear = obstacles.every(
      (o) => Math.hypot(foot.x - o.x, foot.z - o.z) > o.r + 0.12,
    );
    if (clear) return foot;
  }
  const len = start;
  return {
    x: pivot.x + Math.cos(angle) * len,
    z: pivot.z + Math.sin(angle) * len,
  };
}

function springPoints(origin, jewelAngle, beta, turns, inner, outer, y, count) {
  const pts = [];
  for (let i = 0; i < count; i++) {
    const u = i / (count - 1);
    const a = jewelAngle + turns * Math.PI * 2 * u - beta * (1 - u) ** 2;
    const r = inner + (outer - inner) * u;
    pts.push({
      x: origin.x + Math.cos(a) * r,
      y,
      z: origin.z + Math.sin(a) * r,
    });
  }
  return pts;
}

export function createMovement() {
  const layout = buildLayout();
  const { positions: P, phase, clock, plateR } = layout;
  const root = new THREE.Group();
  const base = templates();

  const velvetMat = base.velvet;
  velvetMat.map = velvetTexture();
  const tray = new THREE.Mesh(new THREE.CircleGeometry(plateR + 2.4, 72), velvetMat);
  tray.rotation.x = -Math.PI / 2;
  tray.position.y = -0.04;
  tray.receiveShadow = true;
  root.add(tray);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(plateR * 0.92, 48),
    new THREE.MeshBasicMaterial({
      map: contactTexture(),
      transparent: true,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.02;
  root.add(shadow);

  const plateKit = {
    plate: cloneMat(base.plate),
    ruby: cloneMat(base.ruby),
    brass: cloneMat(base.brass),
    steel: cloneMat(base.steel),
  };
  const plate = new THREE.Group();
  plate.userData.part = 'plate';
  const edge = new THREE.Mesh(new THREE.CylinderGeometry(plateR, plateR * 0.985, 0.15, 80), plateKit.plate);
  edge.position.y = 0.075;
  edge.castShadow = true;
  edge.receiveShadow = true;
  plate.add(edge);
  const topMat = cloneMat(base.plate);
  const brush = brushTexture();
  brush.colorSpace = THREE.NoColorSpace;
  topMat.roughnessMap = brush;
  topMat.roughness = 0.48;
  topMat.userData.glow = base.plate.userData.glow;
  topMat.userData.baseEmissive = 0;
  topMat.userData.baseEmissiveIntensity = 0;
  const top = new THREE.Mesh(new THREE.CircleGeometry(plateR - 0.01, 80), topMat);
  top.rotation.x = -Math.PI / 2;
  top.position.y = Y.plateTop + 0.001;
  top.receiveShadow = true;
  plate.add(top);
  const lip = new THREE.Mesh(new THREE.TorusGeometry(plateR - 0.02, 0.018, 8, 90), plateKit.steel);
  lip.rotation.x = Math.PI / 2;
  lip.position.y = Y.plateTop;
  plate.add(lip);
  root.add(plate);

  const obstacles = [
    { x: P.barrel.x, z: P.barrel.z, r: tipRadius(PITCH.barrel, MODULE.barrelCenter) },
    { x: P.center.x, z: P.center.z, r: tipRadius(PITCH.center, MODULE.centerThird) },
    { x: P.third.x, z: P.third.z, r: tipRadius(PITCH.third, MODULE.thirdFourth) },
    { x: P.fourth.x, z: P.fourth.z, r: tipRadius(PITCH.fourth, MODULE.fourthEscape) },
    { x: P.escape.x, z: P.escape.z, r: 0.66 },
    { x: P.balance.x, z: P.balance.z, r: 1.08 },
  ];

  function arbor(id, pos) {
    const part = new THREE.Group();
    part.userData.part = id;
    const spin = new THREE.Group();
    spin.position.set(pos.x, 0, pos.z);
    part.add(spin);
    root.add(part);
    return { part, spin };
  }

  function wheel(spin, spec) {
    const hole = spec.hole ?? spec.pitch * 0.66;
    const geo = gearGeometry(spec.teeth, spec.module, spec.thick || TH, hole);
    const pivot = addGear(spin, geo, spec.mat, spec.y, spec.clock || 0);
    if (spec.spokes !== false) {
      addSpokes(pivot, spec.mat, 0, 0.1, hole + 0.05, spec.spokeCount || 5);
      addHub(pivot, spec.mat, 0, 0.09);
    }
    if (spec.mark) {
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, TH + 0.02, 10), spec.mark);
      pin.position.set(hole * 0.55, 0, 0);
      pivot.add(pin);
    }
    return pivot;
  }

  const barrel = arbor('barrel', P.barrel);
  const bKit = {
    barrel: cloneMat(base.barrel),
    blue: cloneMat(base.blue),
    steel: cloneMat(base.steel),
  };
  const barrelHole = PITCH.barrel * 0.7;
  wheel(barrel.spin, {
    teeth: TEETH.barrel,
    module: MODULE.barrelCenter,
    pitch: PITCH.barrel,
    y: Y.barrelTeeth,
    mat: bKit.barrel,
    hole: barrelHole,
    mark: bKit.blue,
    spokeCount: 0,
    spokes: false,
  });
  const wallMat = cloneMat(base.barrel);
  wallMat.side = THREE.DoubleSide;
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(1.46, 1.46, 0.2, 72, 1, true), wallMat);
  wall.position.y = 0.36;
  wall.castShadow = true;
  barrel.spin.add(wall);
  barrel.spin.add(lay(ringGeometry(1.46, 0.16, 0.03), bKit.barrel, 0.23));
  barrel.spin.add(lay(ringGeometry(1.46, 0.9, 0.028), bKit.barrel, Y.barrelTop));
  const mainCount = 120;
  const mainGeo = stripGeometry(mainCount);
  const mainPts = [];
  for (let i = 0; i < mainCount; i++) {
    const u = i / (mainCount - 1);
    const a = 4.25 * Math.PI * 2 * u;
    const r = 0.26 + (1.02 - 0.26) * u;
    mainPts.push({ x: Math.cos(a) * r, y: 0.33, z: Math.sin(a) * r });
  }
  writeStrip(mainGeo, mainPts, 0.012, 0.02);
  const mainSpring = new THREE.Mesh(mainGeo, bKit.blue);
  mainSpring.castShadow = true;
  barrel.spin.add(mainSpring);
  addStaff(barrel.spin, bKit.steel, Y.plateTop, Y.barrelTop, 0.045);

  const center = arbor('center', P.center);
  const cKit = {
    brass: cloneMat(base.brass),
    steel: cloneMat(base.steel),
    blue: cloneMat(base.blue),
  };
  const centerPinion = gearGeometry(TEETH.centerPinion, MODULE.barrelCenter, 0.09, 0.03);
  addGear(center.spin, centerPinion, cKit.steel, Y.barrelTeeth, 0);
  wheel(center.spin, {
    teeth: TEETH.center,
    module: MODULE.centerThird,
    pitch: PITCH.center,
    y: Y.center,
    mat: cKit.brass,
    clock: clock.center,
    mark: cKit.blue,
  });
  addStaff(center.spin, cKit.steel, Y.plateTop, Y.center + 0.04);

  const third = arbor('third', P.third);
  const tKit = {
    brass: cloneMat(base.brass),
    steel: cloneMat(base.steel),
    blue: cloneMat(base.blue),
  };
  addGear(
    third.spin,
    gearGeometry(TEETH.thirdPinion, MODULE.centerThird, 0.09, 0.028),
    tKit.steel,
    Y.center,
    0,
  );
  wheel(third.spin, {
    teeth: TEETH.third,
    module: MODULE.thirdFourth,
    pitch: PITCH.third,
    y: Y.third,
    mat: tKit.brass,
    clock: clock.third,
    mark: tKit.blue,
  });
  addStaff(third.spin, tKit.steel, Y.plateTop, Y.third + 0.04);

  const fourth = arbor('fourth', P.fourth);
  const fKit = {
    brass: cloneMat(base.brass),
    steel: cloneMat(base.steel),
    blue: cloneMat(base.blue),
  };
  addGear(
    fourth.spin,
    gearGeometry(TEETH.fourthPinion, MODULE.thirdFourth, 0.09, 0.026),
    fKit.steel,
    Y.third,
    0,
  );
  wheel(fourth.spin, {
    teeth: TEETH.fourth,
    module: MODULE.fourthEscape,
    pitch: PITCH.fourth,
    y: Y.fourth,
    mat: fKit.brass,
    clock: clock.fourth,
    mark: fKit.blue,
  });
  addStaff(fourth.spin, fKit.steel, Y.plateTop, Y.fourth + 0.04);

  const escape = arbor('escape', P.escape);
  const eKit = {
    steel: cloneMat(base.steel),
    blue: cloneMat(base.blue),
  };
  addGear(
    escape.spin,
    gearGeometry(TEETH.escapePinion, MODULE.fourthEscape, 0.08, 0.02),
    eKit.steel,
    Y.fourth,
    0,
  );
  addGear(escape.spin, escapeGeometry(0.055), eKit.steel, Y.escape, clock.escape);
  addStaff(escape.spin, eKit.steel, Y.plateTop, Y.escape + 0.03, 0.018);

  const forkKit = {
    steel: cloneMat(base.steel),
    ruby: cloneMat(base.ruby),
    brass: cloneMat(base.brass),
  };
  const fork = new THREE.Group();
  fork.userData.part = 'fork';
  fork.position.set(P.fork.x, 0, P.fork.z);
  root.add(fork);

  const escapeLocal = invYaw(layout.forkBase, P.escape.x - P.fork.x, P.escape.z - P.fork.z);
  for (const local of [layout.entryLocal, layout.exitLocal]) {
    const dx = local.x;
    const dz = local.z;
    const len = Math.hypot(dx, dz);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.04, len - 0.04), forkKit.steel);
    arm.position.set(dx * 0.48, Y.escape, dz * 0.48);
    arm.rotation.y = Math.atan2(dx, dz);
    arm.castShadow = true;
    fork.add(arm);

    const stone = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.05, 0.042), forkKit.ruby);
    stone.position.set(local.x, Y.escape, local.z);
    const tx = escapeLocal.x - local.x;
    const tz = escapeLocal.z - local.z;
    stone.rotation.y = Math.atan2(tx, tz);
    stone.castShadow = true;
    fork.add(stone);
  }
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.042, 0.92), forkKit.steel);
  tail.position.set(0.5, Y.escape, 0);
  tail.rotation.y = Math.PI / 2;
  tail.castShadow = true;
  fork.add(tail);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.06, 16), forkKit.steel);
  hub.position.y = Y.escape;
  hub.castShadow = true;
  fork.add(hub);
  for (const side of [-1, 1]) {
    const horn = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.036, 0.38), forkKit.steel);
    horn.position.set(1.08, Y.escape, side * 0.058);
    horn.rotation.y = Math.PI / 2;
    horn.castShadow = true;
    fork.add(horn);
  }
  const pick = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.16, 0.36),
    new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false }),
  );
  pick.position.set(0.55, Y.escape, 0);
  fork.add(pick);

  for (const side of [-1, 1]) {
    const local = { x: 0.58, z: side * 0.14 };
    const yaw = layout.forkBase + side * layout.forkAmp;
    const w = worldFromYaw(P.fork, yaw, local);
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.12, 10), forkKit.brass);
    pin.position.set(w.x, Y.escape, w.z);
    pin.castShadow = true;
    root.add(pin);
  }

  const balKit = {
    balance: cloneMat(base.balance),
    steel: cloneMat(base.steel),
    blue: cloneMat(base.blue),
    ruby: cloneMat(base.ruby),
    brass: cloneMat(base.brass),
  };
  const balance = new THREE.Group();
  balance.userData.part = 'balance';
  balance.position.set(P.balance.x, 0, P.balance.z);
  root.add(balance);
  const rim = lay(ringGeometry(1.06, 0.8, 0.05), balKit.balance, Y.balance);
  balance.add(rim);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.04, 0.09), balKit.balance);
  bar.position.y = Y.balance;
  bar.castShadow = true;
  balance.add(bar);
  const collet = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.06, 16), balKit.brass);
  collet.position.y = Y.balance;
  balance.add(collet);
  const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.04, 24), balKit.steel);
  roller.position.y = Y.escape;
  balance.add(roller);
  const jewelAngle = Math.atan2(P.fork.z - P.balance.z, P.fork.x - P.balance.x);
  const impulse = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.07, 12), balKit.ruby);
  impulse.position.set(Math.cos(jewelAngle) * 0.145, Y.escape, Math.sin(jewelAngle) * 0.145);
  impulse.castShadow = true;
  balance.add(impulse);
  addStaff(balance, balKit.steel, Y.plateTop, Y.balance + 0.08, 0.02);
  const screwGeo = new THREE.CylinderGeometry(0.028, 0.028, 0.03, 10);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + 0.2;
    const screw = new THREE.Mesh(screwGeo, balKit.blue);
    screw.position.set(Math.cos(a) * 0.93, Y.balance + 0.03, Math.sin(a) * 0.93);
    balance.add(screw);
  }

  const springKit = cloneMat(base.blue);
  const springCount = 200;
  const springGeo = stripGeometry(springCount);
  const springMesh = new THREE.Mesh(springGeo, springKit);
  springMesh.castShadow = true;
  springMesh.frustumCulled = false;
  const spring = new THREE.Group();
  spring.userData.part = 'spring';
  spring.add(springMesh);
  const springPick = lay(ringGeometry(0.7, 0.16, 0.02), new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: false,
  }), Y.spring);
  springPick.position.x = P.balance.x;
  springPick.position.z = P.balance.z;
  spring.add(springPick);
  root.add(spring);

  const turns = 6.5;
  const updateSpring = (beta) => {
    const pts = springPoints(P.balance, jewelAngle, beta, turns, 0.09, 0.68, Y.spring, springCount);
    writeStrip(springGeo, pts, 0.008, 0.026);
  };
  updateSpring(0);

  const endA = jewelAngle + Math.PI;
  const stud = {
    x: P.balance.x + Math.cos(endA) * 0.66,
    z: P.balance.z + Math.sin(endA) * 0.66,
  };

  function addCock(id, pivot, foot, y, rPivot, rFoot, kit) {
    const group = new THREE.Group();
    group.userData.part = id;
    const geo = stadiumGeometry(pivot.x, pivot.z, foot.x, foot.z, rPivot, rFoot, 0.04);
    group.add(lay(geo, kit.bridge, y));
    addScrew(group, kit.blue, foot.x, y + 0.028, foot.z);
    addJewel(group, kit.ruby, kit.brass, pivot.x, y + 0.03, pivot.z, rPivot > 0.2 ? 1.15 : 0.9);
    if (Math.hypot(foot.x, foot.z) < plateR - 0.3) {
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.06, y - Y.plateTop, 12),
        kit.bridge,
      );
      pillar.position.set(foot.x, (y + Y.plateTop) / 2, foot.z);
      pillar.castShadow = true;
      group.add(pillar);
    }
    root.add(group);
    return group;
  }

  function cockKit() {
    return {
      bridge: cloneMat(base.bridge),
      blue: cloneMat(base.blue),
      ruby: cloneMat(base.ruby),
      brass: cloneMat(base.brass),
      steel: cloneMat(base.steel),
    };
  }

  const barrelOut = Math.atan2(P.barrel.z, P.barrel.x);
  const barrelFoot = placeFoot(P.barrel, barrelOut, 1.15, obstacles, plateR);
  const barrelBridge = addCock(
    'barrelBridge',
    P.barrel,
    barrelFoot,
    0.56,
    0.34,
    0.22,
    cockKit(),
  );
  const ratchet = lay(ratchetGeometry(0.04), cloneMat(base.steel), 0.51);
  ratchet.position.x = P.barrel.x;
  ratchet.position.z = P.barrel.z;
  barrelBridge.add(ratchet);
  const click = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.012, 6, 18, Math.PI * 0.85), cloneMat(base.steel));
  click.rotation.x = Math.PI / 2;
  click.position.set(
    P.barrel.x + Math.cos(barrelOut + 1.35) * 0.16,
    0.52,
    P.barrel.z + Math.sin(barrelOut + 1.35) * 0.16,
  );
  click.rotation.z = barrelOut;
  barrelBridge.add(click);

  addCock(
    'centerBridge',
    P.center,
    placeFoot(P.center, awayAngle(P.center, [P.barrel, P.third]), 0.95, obstacles, plateR),
    Y.center + 0.08,
    0.28,
    0.18,
    cockKit(),
  );
  addCock(
    'thirdBridge',
    P.third,
    placeFoot(P.third, awayAngle(P.third, [P.center, P.fourth]), 0.72, obstacles, plateR),
    Y.third + 0.08,
    0.24,
    0.16,
    cockKit(),
  );
  addCock(
    'fourthBridge',
    P.fourth,
    placeFoot(P.fourth, awayAngle(P.fourth, [P.third, P.escape]), 0.7, obstacles, plateR),
    Y.fourth + 0.08,
    0.24,
    0.16,
    cockKit(),
  );
  addCock(
    'escapeBridge',
    P.escape,
    placeFoot(P.escape, awayAngle(P.escape, [P.fourth, P.fork, P.balance]), 0.55, obstacles, plateR),
    Y.escape + 0.08,
    0.2,
    0.14,
    cockKit(),
  );

  const forkFoot = placeFoot(
    P.fork,
    awayAngle(P.fork, [P.escape, P.balance]),
    0.55,
    obstacles,
    plateR,
  );
  addCock('forkBridge', P.fork, forkFoot, Y.escape + 0.09, 0.16, 0.12, cockKit());

  const cock = cockKit();
  const balFoot = placeFoot(P.balance, endA, 0.85, obstacles, plateR);
  const cockGroup = new THREE.Group();
  cockGroup.userData.part = 'cock';
  const pad = lay(ringGeometry(0.4, 0.06, 0.045), cock.bridge, Y.spring + 0.07);
  pad.position.x = P.balance.x;
  pad.position.z = P.balance.z;
  cockGroup.add(pad);
  cockGroup.add(lay(
    stadiumGeometry(P.balance.x, P.balance.z, balFoot.x, balFoot.z, 0.18, 0.13, 0.04),
    cock.bridge,
    Y.spring + 0.05,
  ));
  addScrew(cockGroup, cock.blue, balFoot.x, Y.spring + 0.09, balFoot.z);
  addJewel(cockGroup, cock.ruby, cock.brass, P.balance.x, Y.spring + 0.1, P.balance.z, 1.2);
  const pillar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.07, Y.spring + 0.05 - Y.plateTop, 12),
    cock.bridge,
  );
  pillar.position.set(balFoot.x, (Y.spring + 0.05 + Y.plateTop) / 2, balFoot.z);
  pillar.castShadow = true;
  cockGroup.add(pillar);
  const studMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.08, 10), cock.steel);
  studMesh.position.set(stud.x, Y.spring + 0.02, stud.z);
  cockGroup.add(studMesh);
  const index = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.02, 0.03), cock.steel);
  index.position.set(
    P.balance.x + Math.cos(endA + 0.35) * 0.5,
    Y.spring + 0.08,
    P.balance.z + Math.sin(endA + 0.35) * 0.5,
  );
  index.rotation.y = -endA;
  cockGroup.add(index);
  root.add(cockGroup);

  const jewelSpots = [P.barrel, P.center, P.third, P.fourth, P.escape, P.fork, P.balance];
  for (const spot of jewelSpots) {
    addJewel(plate, plateKit.ruby, plateKit.brass, spot.x, Y.plateTop + 0.02, spot.z, 0.85);
  }

  const sinkMat = new THREE.MeshStandardMaterial({
    color: 0x4e555e,
    metalness: 0.45,
    roughness: 0.62,
  });
  const sinks = [
    [P.barrel, tipRadius(PITCH.barrel, MODULE.barrelCenter) * 0.92],
    [P.center, tipRadius(PITCH.center, MODULE.centerThird) * 0.92],
    [P.third, tipRadius(PITCH.third, MODULE.thirdFourth) * 0.92],
    [P.fourth, tipRadius(PITCH.fourth, MODULE.fourthEscape) * 0.96],
    [P.escape, 0.7],
    [P.balance, 1.12],
  ];
  sinks.forEach(([spot, radius], index) => {
    const sink = new THREE.Mesh(new THREE.CircleGeometry(radius, 48), sinkMat);
    sink.rotation.x = -Math.PI / 2;
    sink.position.set(spot.x, Y.plateTop + 0.003 + index * 0.0004, spot.z);
    sink.receiveShadow = true;
    plate.add(sink);
  });

  return {
    root,
    layout,
    updateSpring,
    rig: {
      barrel: barrel.spin,
      center: center.spin,
      third: third.spin,
      fourth: fourth.spin,
      escape: escape.spin,
      fork,
      balance,
    },
  };
}

function invYaw(yaw, dx, dz) {
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  return { x: dx * c - dz * s, z: dx * s + dz * c };
}

function worldFromYaw(origin, yaw, local) {
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  return {
    x: origin.x + local.x * c + local.z * s,
    z: origin.z - local.x * s + local.z * c,
  };
}
