import * as THREE from 'three';
import { createGearGeometry, pinionOpts, wheelOpts, escapeWheelOpts } from './gear.js';
import { createMaterials } from './materials.js';

const TAU = Math.PI * 2;
const DEG = Math.PI / 180;

// ---- movement specification ------------------------------------------------
// every meshing pair shares its own module (tooth size), like a real train
const MOD = { s0: 0.16, s1: 0.13, s2: 0.11, s3: 0.1, esc: 0.14 };

const TEETH = {
  barrel: 72,
  cPin: 8,
  cWhl: 60,
  tPin: 8,
  tWhl: 64,
  fPin: 8,
  fWhl: 56,
  ePin: 7,
  eWhl: 15,
};

const rp = (n, m) => (m * n) / 2;

const BALANCE_HZ = 1.0; // base oscillations per second (=> 2 beats / s)
const T_BARREL = 9 * 3600; // barrel: one turn per 9 h
const OMEGA_BARREL = TAU / T_BARREL;

// ---- layout ---------------------------------------------------------------
const dir = (deg) => new THREE.Vector2(Math.cos(deg * DEG), Math.sin(deg * DEG));

const P_BARREL = new THREE.Vector2(0, 0);
const P_CENTER = P_BARREL.clone().addScaledVector(dir(200), rp(TEETH.barrel, MOD.s0) + rp(TEETH.cPin, MOD.s0));
const P_THIRD = P_CENTER.clone().addScaledVector(dir(300), rp(TEETH.cWhl, MOD.s1) + rp(TEETH.tPin, MOD.s1));
const P_FOURTH = P_THIRD.clone().addScaledVector(dir(20), rp(TEETH.tWhl, MOD.s2) + rp(TEETH.fPin, MOD.s2));
const P_ESCAPE = P_FOURTH.clone().addScaledVector(dir(-35), rp(TEETH.fWhl, MOD.s3) + rp(TEETH.ePin, MOD.s3));
const P_PALLET = P_ESCAPE.clone().addScaledVector(dir(35), 2.5);
const P_BALANCE = P_PALLET.clone().addScaledVector(dir(35), 2.95);

const DZ = 0.86;
const Z = {
  barrel: 0,
  cPin: 0,
  cWhl: DZ,
  tPin: DZ,
  tWhl: DZ * 2,
  fPin: DZ * 2,
  fWhl: DZ * 3,
  ePin: DZ * 3,
  eWhl: DZ * 3 + 0.8,
};
Z.pallet = Z.eWhl;
Z.balance = Z.eWhl + 0.12;
const PLATE_TOP = -0.95;

// angular velocities (signed, rad/s)
const W = { barrel: OMEGA_BARREL };
W.cPin = -W.barrel * (TEETH.barrel / TEETH.cPin);
W.cWhl = W.cPin;
W.tPin = -W.cWhl * (TEETH.cWhl / TEETH.tPin);
W.tWhl = W.tPin;
W.fPin = -W.tWhl * (TEETH.tWhl / TEETH.fPin);
W.fWhl = W.fPin;
W.ePin = -W.fWhl * (TEETH.fWhl / TEETH.ePin);
W.eWhl = W.ePin;

const rimInner = (n, m) => rp(n, m) - m * 3.0;
const hubR = (m) => Math.max(m * 4.2, 0.5);

// ---- small geometry helpers ----------------------------------------------
function cylZ(rTop, rBot, h, seg = 32, open = false) {
  const g = new THREE.CylinderGeometry(rTop, rBot, h, seg, 1, open);
  g.rotateX(Math.PI / 2);
  return g;
}

function spiralGeometry({ turns, r0, r1, z, radius, seg = 480 }) {
  const pts = [];
  for (let i = 0; i <= seg; i++) {
    const t = i / seg;
    const r = r0 + (r1 - r0) * t;
    const a = t * turns * TAU;
    pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, z));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  return new THREE.TubeGeometry(curve, seg, radius, 6, false);
}

export function buildMovement() {
  const MAT = createMaterials();
  const root = new THREE.Group();
  const parts = new Map();
  const meshRotators = [];

  const registerPart = (id, info, group) => {
    group.userData.partId = id;
    const meshes = [];
    group.traverse((o) => {
      if (o.isMesh) {
        o.userData.partId = id;
        o.material = o.material.clone();
        o.userData.baseEmissive = o.material.emissive.clone();
        meshes.push(o);
      }
    });
    parts.set(id, { id, ...info, group, meshes });
  };

  const makeGear = (opts, material) => new THREE.Mesh(createGearGeometry(opts), material);

  // ============ main plate =================================================
  const plateGroup = new THREE.Group();
  const PLATE_C = new THREE.Vector2(-1.4, -3.9);
  const plateBase = new THREE.Mesh(cylZ(9.4, 9.8, 0.7, 96), MAT.plate);
  const plateStep = new THREE.Mesh(cylZ(8.6, 9.4, 0.32, 96), MAT.plate);
  plateStep.position.z = 0.5;
  plateGroup.add(plateBase, plateStep);
  plateGroup.position.set(PLATE_C.x, PLATE_C.y, PLATE_TOP - 0.35);

  const screwGeo = cylZ(0.3, 0.3, 0.2, 18);
  const slotGeo = new THREE.BoxGeometry(0.46, 0.08, 0.06);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU + 0.35;
    const s = new THREE.Mesh(screwGeo, MAT.blued);
    s.position.set(Math.cos(a) * 8.4, Math.sin(a) * 8.4, 0.72);
    const slot = new THREE.Mesh(slotGeo, MAT.steel);
    slot.position.set(s.position.x, s.position.y, 0.83);
    slot.rotation.z = a * 1.7;
    plateGroup.add(s, slot);
  }
  root.add(plateGroup);

  // ============ arbors + jewels ===========================================
  const jewelGeo = cylZ(0.3, 0.3, 0.16, 20);
  const arborDefs = [
    [P_BARREL, 1.35],
    [P_CENTER, Z.cWhl + 0.3],
    [P_THIRD, Z.tWhl + 0.3],
    [P_FOURTH, Z.fWhl + 0.3],
    [P_ESCAPE, Z.eWhl + 0.3],
  ];
  for (const [p, top] of arborDefs) {
    const h = top - PLATE_TOP;
    const a = new THREE.Mesh(cylZ(0.11, 0.13, h, 14), MAT.steel);
    a.position.set(p.x, p.y, PLATE_TOP + h / 2);
    root.add(a);
    const j = new THREE.Mesh(jewelGeo, MAT.jewel);
    j.position.set(p.x, p.y, PLATE_TOP + 0.18);
    root.add(j);
  }
  for (const p of [P_PALLET, P_BALANCE]) {
    const j = new THREE.Mesh(cylZ(0.27, 0.27, 0.16, 20), MAT.jewel);
    j.position.set(p.x, p.y, PLATE_TOP + 0.18);
    root.add(j);
  }

  // ============ barrel + mainspring =======================================
  const barrelGroup = new THREE.Group();
  barrelGroup.position.set(P_BARREL.x, P_BARREL.y, 0);
  barrelGroup.add(makeGear(wheelOpts(TEETH.barrel, MOD.s0, 0.55, 0, 0, 0), MAT.brass));
  const wallR = rp(TEETH.barrel, MOD.s0) - MOD.s0 * 1.7;
  const wall = new THREE.Mesh(cylZ(wallR, wallR, 1.2, 72, true), MAT.brass);
  wall.position.z = 0.78;
  const bottom = new THREE.Mesh(cylZ(wallR + 0.18, wallR + 0.18, 0.12, 72), MAT.brass);
  bottom.position.z = 0.24;
  barrelGroup.add(wall, bottom);
  root.add(barrelGroup);

  const springGroup = new THREE.Group();
  springGroup.position.set(P_BARREL.x, P_BARREL.y, 0);
  springGroup.add(
    new THREE.Mesh(
      spiralGeometry({ turns: 6.5, r0: 0.9, r1: rp(TEETH.barrel, MOD.s0) - MOD.s0 * 3.0, z: 0.55, radius: 0.11 }),
      MAT.mainspring
    )
  );
  root.add(springGroup);

  // ============ gear train ================================================
  const trainDefs = [
    { id: 'centerWheel', pos: P_CENTER, z: Z.cPin, opts: pinionOpts(TEETH.cPin, MOD.s0, 0.6), omega: W.cPin },
    { id: 'centerWheel', pos: P_CENTER, z: Z.cWhl, opts: wheelOpts(TEETH.cWhl, MOD.s1, 0.4, 5, hubR(MOD.s1), rimInner(TEETH.cWhl, MOD.s1)), omega: W.cWhl },
    { id: 'thirdWheel', pos: P_THIRD, z: Z.tPin, opts: pinionOpts(TEETH.tPin, MOD.s1, 0.6), omega: W.tPin },
    { id: 'thirdWheel', pos: P_THIRD, z: Z.tWhl, opts: wheelOpts(TEETH.tWhl, MOD.s2, 0.4, 5, hubR(MOD.s2), rimInner(TEETH.tWhl, MOD.s2)), omega: W.tWhl },
    { id: 'fourthWheel', pos: P_FOURTH, z: Z.fPin, opts: pinionOpts(TEETH.fPin, MOD.s2, 0.6), omega: W.fPin },
    { id: 'fourthWheel', pos: P_FOURTH, z: Z.fWhl, opts: wheelOpts(TEETH.fWhl, MOD.s3, 0.4, 5, hubR(MOD.s3), rimInner(TEETH.fWhl, MOD.s3)), omega: W.fWhl },
    { id: 'escapeWheel', pos: P_ESCAPE, z: Z.ePin, opts: pinionOpts(TEETH.ePin, MOD.s3, 0.6), omega: W.ePin },
    { id: 'escapeWheel', pos: P_ESCAPE, z: Z.eWhl, opts: escapeWheelOpts(TEETH.eWhl, MOD.esc, 0.38), omega: W.eWhl },
  ];

  const gearGroups = {};
  const gearMeshes = [];
  for (const d of trainDefs) {
    if (!gearGroups[d.id]) {
      const g = new THREE.Group();
      g.position.set(d.pos.x, d.pos.y, 0);
      root.add(g);
      gearGroups[d.id] = g;
    }
    const mesh = makeGear(d.opts, d.id === 'escapeWheel' ? MAT.steel : MAT.gold);
    mesh.position.z = d.z;
    gearGroups[d.id].add(mesh);
    gearMeshes.push({ id: d.id, mesh, omega: d.omega });
  }

  // ---- correct meshing phases -------------------------------------------
  const meshPhase = (na, nb, cDriver, cDriven) => {
    const a = Math.atan2(cDriven.y - cDriver.y, cDriven.x - cDriver.x);
    const b = a + Math.PI;
    return { driverPhase: a, drivenPhase: b - Math.PI / nb, dir: a };
  };
  const m0 = meshPhase(TEETH.barrel, TEETH.cPin, P_BARREL, P_CENTER);
  const m1 = meshPhase(TEETH.cWhl, TEETH.tPin, P_CENTER, P_THIRD);
  const m2 = meshPhase(TEETH.tWhl, TEETH.fPin, P_THIRD, P_FOURTH);
  const m3 = meshPhase(TEETH.fWhl, TEETH.ePin, P_FOURTH, P_ESCAPE);

  const phaseByKey = {
    [`centerWheel:${Z.cPin}`]: m0.drivenPhase,
    [`centerWheel:${Z.cWhl}`]: m1.driverPhase,
    [`thirdWheel:${Z.tPin}`]: m1.drivenPhase,
    [`thirdWheel:${Z.tWhl}`]: m2.driverPhase,
    [`fourthWheel:${Z.fPin}`]: m2.drivenPhase,
    [`fourthWheel:${Z.fWhl}`]: m3.driverPhase,
    [`escapeWheel:${Z.ePin}`]: m3.drivenPhase,
    [`escapeWheel:${Z.eWhl}`]: 0.9,
  };
  for (const gm of gearMeshes) {
    const key = `${gm.id}:${gm.mesh.position.z}`;
    if (phaseByKey[key] === undefined) continue;
    meshRotators.push({ object: gm.mesh, phase: phaseByKey[key], omega: gm.omega });
  }

  // barrel + spring turn together
  meshRotators.push({ object: barrelGroup, phase: m0.driverPhase, omega: W.barrel });
  meshRotators.push({ object: springGroup, phase: m0.driverPhase, omega: W.barrel });

  // ============ pallet fork ===============================================
  const palletGroup = new THREE.Group();
  palletGroup.position.set(P_PALLET.x, P_PALLET.y, Z.pallet);
  const palletBaseAngle = Math.atan2(P_ESCAPE.y - P_PALLET.y, P_ESCAPE.x - P_PALLET.x);
  {
    palletGroup.add(new THREE.Mesh(cylZ(0.36, 0.36, 0.5, 22), MAT.steel));
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.24, 0.22), MAT.steel);
    body.position.x = 0.35;
    palletGroup.add(body);
    // entry / exit pallet arms with ruby stones, reaching the escape wheel
    for (const sgn of [-1, 1]) {
      const arm = new THREE.Group();
      arm.rotation.z = sgn * 24 * DEG;
      const a = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.18, 0.18), MAT.steel);
      a.position.x = 0.85;
      const stone = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.22, 0.3), MAT.jewel);
      stone.position.set(1.42, 0, 0);
      stone.rotation.z = sgn * 26 * DEG;
      arm.add(a, stone);
      palletGroup.add(arm);
    }
    // fork end reaching toward the balance roller
    const fork = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.18, 0.18), MAT.steel);
    fork.position.x = -1.4;
    palletGroup.add(fork);
    for (const sgn of [-1, 1]) {
      const horn = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.11, 0.16), MAT.steel);
      horn.position.set(-2.0, sgn * 0.16, 0);
      horn.rotation.z = sgn * 24 * DEG;
      palletGroup.add(horn);
    }
  }
  root.add(palletGroup);

  // ============ balance wheel =============================================
  const balanceGroup = new THREE.Group();
  balanceGroup.position.set(P_BALANCE.x, P_BALANCE.y, Z.balance);
  const BAL_R = 3.3;
  {
    balanceGroup.add(new THREE.Mesh(new THREE.TorusGeometry(BAL_R, 0.24, 16, 72), MAT.gold));
    for (let i = 0; i < 3; i++) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(BAL_R * 2 - 0.15, 0.3, 0.26), MAT.gold);
      spoke.rotation.z = (i / 3) * Math.PI;
      balanceGroup.add(spoke);
    }
    balanceGroup.add(new THREE.Mesh(cylZ(0.62, 0.62, 0.5, 24), MAT.gold));
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU;
      const scr = new THREE.Mesh(cylZ(0.13, 0.13, 0.5, 12), MAT.steel);
      scr.position.set(Math.cos(a) * BAL_R, Math.sin(a) * BAL_R, 0);
      scr.rotation.z = a - Math.PI / 2;
      balanceGroup.add(scr);
    }
    const roller = new THREE.Mesh(cylZ(0.44, 0.44, 0.2, 20), MAT.steel);
    roller.position.z = -0.38;
    balanceGroup.add(roller);
    const impulse = new THREE.Mesh(cylZ(0.09, 0.09, 0.36, 10), MAT.jewel);
    impulse.position.set(0.38, 0, -0.5);
    balanceGroup.add(impulse);
  }
  root.add(balanceGroup);

  // ============ hairspring ===============================================
  const hairGroup = new THREE.Group();
  hairGroup.position.set(P_BALANCE.x, P_BALANCE.y, Z.balance + 0.5);
  {
    hairGroup.add(
      new THREE.Mesh(spiralGeometry({ turns: 9, r0: 0.6, r1: 2.6, z: 0, radius: 0.045, seg: 520 }), MAT.blued)
    );
    const stud = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.26, 0.5), MAT.blued);
    stud.position.set(2.7, 0, -0.16);
    hairGroup.add(stud);
  }
  root.add(hairGroup);

  // ============ balance cock =============================================
  const cockGroup = new THREE.Group();
  const pillarPos = new THREE.Vector2(P_BALANCE.x - 2.6, P_BALANCE.y + 1.3);
  const cockZ = Z.balance + 0.8;
  {
    const pillar = new THREE.Mesh(cylZ(0.48, 0.56, cockZ - PLATE_TOP, 24), MAT.bridge);
    pillar.position.set(pillarPos.x, pillarPos.y, (cockZ + PLATE_TOP) / 2);
    const armLen = pillarPos.distanceTo(P_BALANCE) + 1.0;
    const cockArm = new THREE.Mesh(new THREE.BoxGeometry(armLen, 0.95, 0.34), MAT.bridge);
    const mid = pillarPos.clone().lerp(P_BALANCE, 0.5);
    cockArm.position.set(mid.x, mid.y, cockZ);
    cockArm.rotation.z = Math.atan2(P_BALANCE.y - pillarPos.y, P_BALANCE.x - pillarPos.x);
    const cap = new THREE.Mesh(cylZ(0.72, 0.72, 0.36, 28), MAT.bridge);
    cap.position.set(P_BALANCE.x, P_BALANCE.y, cockZ);
    const capJewel = new THREE.Mesh(cylZ(0.27, 0.27, 0.18, 20), MAT.jewel);
    capJewel.position.set(P_BALANCE.x, P_BALANCE.y, cockZ + 0.27);
    const balArbor = new THREE.Mesh(cylZ(0.11, 0.11, cockZ - Z.balance + 0.4, 14), MAT.steel);
    balArbor.position.set(P_BALANCE.x, P_BALANCE.y, (cockZ + Z.balance) / 2);
    cockGroup.add(pillar, cockArm, cap, capJewel, balArbor);
  }
  root.add(cockGroup);

  // ============ register clickable parts =================================
  const partInfo = {
    centerWheel: { name: '二轮（中心轮）', en: 'CENTER WHEEL', spec: '60 齿 · 60 分钟 / 圈', desc: '传动轮系的第一级，由发条盒带动。它的轴通常就是表针轴，每小时转一圈带动分针，同时驱动三轮。' },
    thirdWheel: { name: '三轮', en: 'THIRD WHEEL', spec: '64 齿 · 8 分钟 / 圈', desc: '传动轮系的中间级，把二轮传来的动力进一步增速后交给四轮。' },
    fourthWheel: { name: '四轮', en: 'FOURTH WHEEL', spec: '56 齿 · 1 分钟 / 圈', desc: '传动轮系的末级，约每分钟转一圈，通常用来带动秒针，并把动力传给擒纵轮。' },
    escapeWheel: { name: '擒纵轮', en: 'ESCAPE WHEEL', spec: '15 齿 · 每拍走 1 齿 · 7.5 秒 / 圈', desc: '它被擒纵叉一齿一齿地“放行”，每一拍放行一个齿，把轮系连续的转动变成规律的间歇运动。' },
  };
  for (const id of ['centerWheel', 'thirdWheel', 'fourthWheel', 'escapeWheel']) {
    registerPart(id, partInfo[id], gearGroups[id]);
  }
  registerPart(
    'barrel',
    { name: '发条盒', en: 'BARREL', spec: '72 齿 · 9 小时 / 圈', desc: '机芯的动力储存器。上弦时发条被卷紧，随后缓慢释放；盒壁上的 72 枚齿把动力送往二轮（中心轮）。本模型里它约 9 小时转一圈，是整列齿轮中最慢的。' },
    barrelGroup
  );
  registerPart(
    'mainspring',
    { name: '发条', en: 'MAINSPRING', desc: '盘绕在发条盒内的弹性钢带。卷紧时储存弹性势能，放松时输出扭矩，是整个机芯唯一的动力来源。' },
    springGroup
  );
  registerPart(
    'palletFork',
    { name: '擒纵叉', en: 'PALLET FORK', spec: '每秒翻转 2 次（2 拍 / 秒）', desc: '位于擒纵轮与摆轮之间的“开关”。摆轮每摆一次，它就翻转一次：一侧的宝石锁住擒纵轮、另一侧放行，同时把冲量传给摆轮维持振动。' },
    palletGroup
  );
  registerPart(
    'balanceWheel',
    { name: '摆轮', en: 'BALANCE WHEEL', spec: '1 Hz · 2 拍 / 秒', desc: '与游丝组成的振动系统，是机械表的“心跳”。它以固定频率来回摆动——本模型为 1 Hz（每秒一个完整摆动），走时的快慢就由这个频率决定。' },
    balanceGroup
  );
  registerPart(
    'hairspring',
    { name: '游丝', en: 'HAIRSPRING', desc: '连接摆轮与夹板的螺旋弹簧。它让摆轮具有固定的振动周期，并把摆轮拉回中位，是决定走时精度最关键的零件之一。' },
    hairGroup
  );
  registerPart(
    'mainplate',
    { name: '主夹板', en: 'MAIN PLATE', desc: '机芯的基座与骨架，所有轮系的宝石轴承、夹板和摆轮卡子都固定在它上面，为整枚机芯提供刚性与准确的轴心定位。' },
    plateGroup
  );

  // ============ recentre ==================================================
  const box = new THREE.Box3().setFromObject(root);
  const center = box.getCenter(new THREE.Vector3());
  root.position.sub(new THREE.Vector3(center.x, center.y, 0));
  const sphere = box.getBoundingSphere(new THREE.Sphere());
  const focus = new THREE.Vector3(0, 0, sphere.center.z);
  const radius = sphere.radius;
  const size = box.getSize(new THREE.Vector3());

  // ============ animation ================================================
  const update = (time, speed) => {
    const st = time * speed;
    for (const r of meshRotators) {
      r.object.rotation.z = r.phase + r.omega * st;
    }
    const beat = TAU * BALANCE_HZ * st;
    balanceGroup.rotation.z = 3.2 * Math.sin(beat);
    const target = Math.max(-1, Math.min(1, Math.sin(beat) * 2.4));
    palletGroup.rotation.z = palletBaseAngle + 0.19 * target;
  };

  return {
    root,
    parts,
    update,
    radius,
    focus,
    size,
    info: {
      teeth: TEETH,
      omega: W,
      balanceHz: BALANCE_HZ,
      overallRatio: Math.abs(W.eWhl / OMEGA_BARREL),
    },
  };
}
