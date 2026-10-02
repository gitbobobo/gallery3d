import * as THREE from 'three';
import {
  wheelGeo, pinionGeo, escapeWheelGeo, barrelTeethGeo, ratchetGeo,
  balanceWheel, hairspringGeo, bridgeGeo, plateGeo, stripesTexture, screw, jewel
} from './gears.js';

const TAU = Math.PI * 2, D2R = Math.PI / 180;
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

/* ================= 布局与齿数（模拟 18000 vph 手动上弦机芯） ================= */
const M = { 1: 0.22, 2: 0.18, 3: 0.16, 4: 0.15 };
const N = { barrel: 72, cP: 12, cW: 64, tP: 8, tW: 60, fP: 8, fW: 70, eP: 7, esc: 15 };

const CHAIN = [
  { parent: 'barrel', child: 'center', m: M[1], psi: -8 * D2R },   // 条盒轮 → 中心轮瓣
  { parent: 'center', child: 'third',  m: M[2], psi: -55 * D2R },  // 中心轮 → 三轮瓣
  { parent: 'third',  child: 'fourth', m: M[3], psi: 12 * D2R },   // 三轮 → 四轮瓣
  { parent: 'fourth', child: 'escape', m: M[4], psi: -95 * D2R }   // 四轮 → 擒纵轮瓣
];

const pos = { barrel: new THREE.Vector2(-8.6, 2.6) };
for (const l of CHAIN) {
  const d = (l.m * N[{ barrel: 'barrel', center: 'cW', third: 'tW', fourth: 'fW' }[l.parent]]) / 2
          + (l.m * N[{ center: 'cP', third: 'tP', fourth: 'fP', escape: 'eP' }[l.child]]) / 2;
  l.d = d;
  pos[l.child] = new THREE.Vector2(
    pos[l.parent].x + d * Math.cos(l.psi),
    pos[l.parent].y + d * Math.sin(l.psi)
  );
}
const E = pos.escape;
const FORK_D = 3.1, FORK_LEN = 3.6;
const forkA = 197 * D2R;
const P = new THREE.Vector2(E.x + FORK_D * Math.cos(forkA), E.y + FORK_D * Math.sin(forkA));
const balA = 233 * D2R;
const B = new THREE.Vector2(P.x + FORK_LEN * Math.cos(balA), P.y + FORK_LEN * Math.sin(balA));
const forkRot = Math.atan2(E.y - P.y, E.x - P.x);      // 擒纵叉局部 +X 指向擒纵轮
const jewelAng = Math.atan2(P.y - B.y, P.x - B.x);     // 圆盘钉初相位（指向叉头）

/* 相对擒纵轮的传动比与旋向 */
const RATIO = { escape: 1, fourth: N.eP / N.fW, third: (N.eP / N.fW) * (N.fP / N.tW),
                center: (N.eP / N.fW) * (N.fP / N.tW) * (N.tP / N.cW),
                barrel: (N.eP / N.fW) * (N.fP / N.tW) * (N.tP / N.cW) * (N.cP / N.barrel) };
const SIGN = { escape: 1, fourth: -1, third: 1, center: -1, barrel: 1 };
const BEATS_PER_SEC = 5;          // 18000 vph
const BAL_AMP = 270 * D2R;

/* 齿轮啮合相位求解：I = (φp−ψ)/αp + (φc−ψ−π)/αc ≡ 1/2 */
function solvePhases() {
  const ph = { barrel: 0 };
  for (const l of CHAIN) {
    const Np = N[{ barrel: 'barrel', center: 'cW', third: 'tW', fourth: 'fW' }[l.parent]];
    const Nc = N[{ center: 'cP', third: 'tP', fourth: 'fP', escape: 'eP' }[l.child]];
    const ap = TAU / Np, ac = TAU / Nc;
    ph[l.child] = l.psi + Math.PI + ac * (0.5 - ((ph[l.parent] - l.psi) / ap));
  }
  return ph;
}
const PH0 = solvePhases();

/* ================= 零件说明 ================= */
export const PART_INFO = {
  barrel: { name: '发条盒', en: 'Mainspring Barrel',
    desc: '机芯的动力来源。盒内盘绕的长发条上紧后持续回弹，推动条盒轮缓慢旋转，是把“储存的能量”变成“转动的力”的第一级。条盒外缘的齿带动中心轮瓣，走时的全部能量都从这里流出。',
    stats: ['72 齿', '约 6 小时/圈', '6 : 1 → 中心轮'] },
  ratchet: { name: '大钢轮', en: 'Ratchet Wheel',
    desc: '上弦时随条盒轴转动、把力传给发条内钩的棘轮。运行中它被条夹板上的棘爪(千斤)顶住不动，使发条无法倒转松开——你看到它静止，正是因为机芯正在正常走时。',
    stats: ['棘轮', '仅上弦时转动', '棘爪止逆'] },
  center: { name: '中心轮', en: 'Center Wheel',
    desc: '轮系第二级，轮片驱动三轮瓣，同轴的小齿瓣被条盒轮驱动。在完整机芯中它的轴穿过表盘中心，每小时恰好一圈，分针就装在这根轴上。',
    stats: ['轮片 64 齿 / 齿瓣 12', '1 圈/小时', '8 : 1 → 三轮'] },
  third: { name: '三轮（过轮）', en: 'Third Wheel',
    desc: '中间的过桥轮，只负责按正确比例继续减速、把旋转传向秒轮。它不连接任何指针，却是传动比链条里不可缺少的一环。',
    stats: ['轮片 60 齿 / 齿瓣 8', '1 圈 / 7.5 分钟', '7.5 : 1 → 四轮'] },
  fourth: { name: '四轮（秒轮）', en: 'Fourth Wheel',
    desc: '轮系的最后一级传动轮，每分钟整一圈。在传统机芯上，秒针装在这根轴上——表盘 6 点位的小秒盘就由它驱动。你看它带动的细长秒针，正是“每秒一格”的来源。',
    stats: ['轮片 70 齿 / 齿瓣 8', '1 圈/分钟', '10 : 1 → 擒纵轮'] },
  escape: { name: '擒纵轮', en: 'Escape Wheel',
    desc: '轮系的出口。它的尖齿被擒纵叉一卡一放，把连续旋转切成一个个微小的“步进”，并在每次释放时给摆轮补一次冲量。没有这一级，发条的力矩会一口气泄光。',
    stats: ['15 齿', '1 圈 / 6 秒', '每齿 2 拍 · 18000 vph'] },
  fork: { name: '擒纵叉', en: 'Pallet Fork',
    desc: '马仔。两枚红宝石瓦（进瓦、出瓦）交替楔入擒纵齿：一侧“锁住”轮齿，另一侧被顶开“释放”，同时叉头通过圆盘钉敲击摆轮。它每秒左右摆动 5 次，发出我们熟悉的滴答声。',
    stats: ['红宝石瓦 ×2', '摆角约 ±9°', '每秒 5 拍'] },
  balance: { name: '摆轮', en: 'Balance Wheel',
    desc: '机芯的心脏。一根恒弹性的游丝让它始终回到平衡位置，于是摆轮以固定频率往复摆动（这里为每秒 2.5 个来回），像钟摆一样为整台机器提供唯一的“时间基准”。',
    stats: ['摆幅 ±270°', '2.5 Hz（18000 vph）', '由游丝驱动'] },
  hairspring: { name: '游丝', en: 'Hairspring',
    desc: '比头发还细的阿基米德螺线弹簧。摆轮每转过来，它就把它推回去；振动周期只取决于它的弹性与摆轮的惯量——这正是机械表走时精度的全部秘密。快慢针拨动它的有效长度即可调校快慢。',
    stats: ['阿基米德螺线', '约 5 圈', '决定振动频率'] },
  plate: { name: '主夹板', en: 'Main Plate',
    desc: '机芯的地基。所有齿轮轴的下轴榫都插在它的钻孔里，各零件的位置精度都由它保证。表盘和指针最终也安装在它的正面。',
    stats: ['基础板', '黄铜镀铑/金', '钻眼轴承'] },
  bridgeBarrel: { name: '条夹板', en: 'Barrel Bridge',
    desc: '盖住发条盒的桥板，压住条轴上轴榫并承载中心轮的上轴承。上弦机构的棘爪也固定在它上面。大面积的日内瓦条纹是传统机芯的装饰工艺。',
    stats: ['日内瓦条纹', '固定条轴', '棘爪座'] },
  bridgeTrain: { name: '轮系夹板', en: 'Train Bridge',
    desc: '一次压住三轮、四轮、擒纵轮与擒纵叉的上轴榫。孔中镶着红宝石轴承，把钢轴榫的摩擦降到极低——机芯标注的“钻数”大多就是这些托钻。',
    stats: ['红宝石轴承 ×4', '统一压紧', '同轴度基准'] },
  cock: { name: '摆轮夹板', en: 'Balance Cock',
    desc: '悬臂式的单柱夹板，末端镶有带防震器的摆轮轴承。它是机芯里最重要的桥板：摆轮轴榫极细，全靠它定位与保护。装拆摆轮必须先取下它。',
    stats: ['悬臂结构', '防震器轴承', '微调摆幅'] }
};
export const CHIPS = ['barrel', 'center', 'third', 'fourth', 'escape', 'fork', 'balance', 'hairspring'];

/* ================= 材质 ================= */
function mats() {
  const stripes = stripesTexture();
  stripes.repeat.set(0.11, 0.11);
  const mk = (o) => new THREE.MeshStandardMaterial(o);
  return {
    brass: mk({ color: 0xc49a4a, metalness: 1.0, roughness: 0.36, envMapIntensity: 1.15 }),
    brassBright: mk({ color: 0xd4af60, metalness: 1.0, roughness: 0.24, envMapIntensity: 1.3 }),
    steel: mk({ color: 0xb6bcc6, metalness: 1.0, roughness: 0.32, envMapIntensity: 1.1 }),
    blued: mk({ color: 0x27459c, metalness: 0.85, roughness: 0.25, envMapIntensity: 1.3 }),
    ruby: mk({ color: 0xc01044, metalness: 0.15, roughness: 0.15, emissive: 0x52031b, emissiveIntensity: 0.7 }),
    plate: mk({ color: 0xb5924c, metalness: 0.95, roughness: 0.45, map: stripes, envMapIntensity: 1.05 }),
    dark: mk({ color: 0x59503c, metalness: 0.9, roughness: 0.6 })
  };
}

/* ================= 组装 ================= */
export function createMovement() {
  const root = new THREE.Group();
  const MAT = mats();
  const parts = {};       // id -> {group, mats:Set, focus, radius}
  const spin = {};        // id -> Object3D (随动部件)

  function reg(id, group, focus, radius) {
    group.traverse((o) => { if (o.isMesh) o.userData.part = id; });
    // 每个零件独立材质实例，便于高亮
    const map = new Map();
    group.traverse((o) => {
      if (o.isMesh) {
        if (!map.has(o.material)) map.set(o.material, o.material.clone());
        o.material = map.get(o.material);
      }
    });
    parts[id] = { group, mats: [...map.values()], focus, radius };
    root.add(group);
  }
  const at = (x, y, z) => { const g = new THREE.Group(); g.position.set(x, y, z); return g; };

  /* ---- 主夹板 ---- */
  {
    const w = 34.6, h = 31.2;
    const pivots = Object.values(pos).concat([P, B]).map((v) => ({ x: v.x + 0.76, y: v.y + 3.55 }));
    const g = at(-0.76, -3.55, 0.1);
    const mesh = new THREE.Mesh(plateGeo(w, h, 7.5, pivots), MAT.plate);
    mesh.castShadow = mesh.receiveShadow = true;
    g.add(mesh);
    // 边缘装饰螺钉
    for (const [sx, sy] of [[-14.5, -12.5], [13.5, -11.5], [14.2, 10.5], [-13.5, 11.5], [0, 14.5], [-1, -14.8]]) {
      const sc = screw(MAT.steel, 0.3); sc.position.set(sx, sy, 0.24); g.add(sc);
    }
    // 下轴榫红宝石
    for (const id of ['center', 'third', 'fourth', 'escape']) {
      const j = jewel(MAT.ruby, 0.26, 0.16); j.position.set(pos[id].x, pos[id].y, 0.2); g.add(j);
    }
    const jf = jewel(MAT.ruby, 0.22, 0.14); jf.position.set(P.x, P.y, 0.2); g.add(jf);
    reg('plate', g, new THREE.Vector3(0, 0, -0.2), 19);
  }

  /* ---- 发条盒 ---- */
  {
    const g = at(pos.barrel.x, pos.barrel.y, 0);
    const barrel = new THREE.Group();
    const rp = (M[1] * N.barrel) / 2;
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(rp - 0.42, rp - 0.42, 1.7, 72, 1, true), MAT.brass);
    wall.rotation.x = Math.PI / 2; wall.position.z = 0.95; wall.castShadow = true;
    const bottom = new THREE.Mesh(new THREE.CylinderGeometry(rp - 0.42, rp - 0.42, 0.16, 72), MAT.brassBright);
    bottom.rotation.x = Math.PI / 2; bottom.position.z = 0.18;
    const teeth = new THREE.Mesh(barrelTeethGeo(N.barrel, M[1], 0.5), MAT.brass);
    teeth.position.z = 0.9; teeth.castShadow = true;
    // 敞开的盒内发条（可见螺线）
    const spring = new THREE.Mesh(hairspringGeo(1.0, rp - 0.6, 6, 0.16), MAT.dark);
    spring.position.z = 1.0;
    barrel.add(wall, bottom, teeth, spring);
    // 条盒轴 + 大钢轮 + 方榫螺钉
    const arbor = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 2.3, 16), MAT.steel);
    arbor.rotation.x = Math.PI / 2; arbor.position.z = 1.0;
    const ratchet = new THREE.Mesh(ratchetGeo(4.9, 64, 0.18), MAT.steel);
    ratchet.position.z = 1.98; ratchet.castShadow = true;
    const ratchetScr = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.62, 0.2, 20), MAT.blued);
    ratchetScr.rotation.x = Math.PI / 2; ratchetScr.position.z = 2.12;
    barrel.add(arbor, ratchet, ratchetScr);
    g.add(barrel);
    spin.barrel = barrel;
    reg('barrel', g, new THREE.Vector3(pos.barrel.x, pos.barrel.y, 1), 8.2);

    // 大钢轮/棘爪：条盒轴上的静止件
    const g2 = new THREE.Group(); g2.position.z = 0;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.5, 0.16), MAT.steel);
    arm.position.set(pos.barrel.x + 3.2, pos.barrel.y + 5.6, 2.2); arm.rotation.z = 0.6;
    const cscr = screw(MAT.blued, 0.26); cscr.position.set(pos.barrel.x + 2.3, pos.barrel.y + 6.3, 2.28);
    g2.add(arm, cscr);
    // 点击代理（不可见但可拾取）
    const proxy = new THREE.Mesh(
      new THREE.CylinderGeometry(4.9, 4.9, 0.04, 40),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
    );
    proxy.rotation.x = Math.PI / 2; proxy.position.set(pos.barrel.x, pos.barrel.y, 2.08);
    g2.add(proxy);
    reg('ratchet', g2, new THREE.Vector3(pos.barrel.x, pos.barrel.y, 2.0), 5.0);
  }

  /* ---- 轮系（中心轮 / 三轮 / 四轮 / 擒纵轮） ---- */
  function trainWheel(id, cfg) {
    const g = at(pos[id].x, pos[id].y, 0);
    const arbor = new THREE.Group();
    const wheel = new THREE.Mesh(wheelGeo(cfg.wN, cfg.wM, cfg.th ?? 0.26, cfg.spokes ?? 4), MAT.brass);
    wheel.position.z = cfg.wZ; wheel.castShadow = true;
    const pin = new THREE.Mesh(pinionGeo(cfg.pN, cfg.pM, cfg.pH), MAT.steel);
    pin.position.z = cfg.pZ; pin.castShadow = true;
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, cfg.shaftH, 10), MAT.steel);
    shaft.rotation.x = Math.PI / 2; shaft.position.z = cfg.shaftZ;
    arbor.add(wheel, pin, shaft);
    g.add(arbor);
    spin[id] = arbor;
    return { g, wheel, pin };
  }

  trainWheel('center', { wN: N.cW, wM: M[2], wZ: 2.3, pN: N.cP, pM: M[1], pH: 1.5, pZ: 0.9, shaftH: 3.4, shaftZ: 1.7 });
  trainWheel('third',  { wN: N.tW, wM: M[3], wZ: 1.15, pN: N.tP, pM: M[2], pH: 1.3, pZ: 2.3, shaftH: 2.9, shaftZ: 1.9 });
  trainWheel('fourth', { wN: N.fW, wM: M[4], wZ: 2.9, pN: N.fP, pM: M[3], pH: 1.2, pZ: 1.15, shaftH: 3.1, shaftZ: 2.0 });

  // 四轮上的小秒针（1 圈/分钟）
  {
    const hand = new THREE.Group(); hand.position.z = 3.14;
    const stem = new THREE.Mesh(new THREE.BoxGeometry(4.1, 0.16, 0.06), MAT.blued);
    stem.position.x = 2.05;
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.34, 0.14, 14), MAT.blued);
    hub.rotation.x = Math.PI / 2;
    hand.add(stem, hub);
    spin.fourth.add(hand);
  }

  for (const id of ['center', 'third', 'fourth'])
    reg(id, spin[id].parent, new THREE.Vector3(pos[id].x, pos[id].y, 2), 5.4);

  // 擒纵轮
  {
    const g = at(E.x, E.y, 0);
    const arbor = new THREE.Group();
    const wheel = new THREE.Mesh(escapeWheelGeo(2.3, N.esc), MAT.steel);
    wheel.position.z = 1.85; wheel.castShadow = true;
    const pin = new THREE.Mesh(pinionGeo(N.eP, M[4], 0.68), MAT.steel);
    pin.position.z = 2.9;
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 3.3, 10), MAT.steel);
    shaft.rotation.x = Math.PI / 2; shaft.position.z = 2.0;
    arbor.add(wheel, pin, shaft);
    g.add(arbor);
    spin.escape = arbor;
    spin.escWheel = wheel;
    reg('escape', g, new THREE.Vector3(E.x, E.y, 1.9), 2.6);
  }

  /* ---- 擒纵叉 ---- */
  {
    const g = at(P.x, P.y, 0);
    const fork = new THREE.Group();
    const body = new THREE.Group();
    body.position.z = 1.95;
    const mat = MAT.steel;
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 14), mat);
    hub.rotation.x = Math.PI / 2;
    body.add(hub);
    // 两臂至进/出瓦位置
    const stoneAng = 33 * D2R, stoneR = 2.42;
    for (const s of [-1, 1]) {
      const a = Math.PI - s * stoneAng;
      const sx = FORK_D + stoneR * Math.cos(a), sy = stoneR * Math.sin(a);
      const len = Math.hypot(sx, sy), ang = Math.atan2(sy, sx);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(len, 0.3, 0.2), mat);
      arm.position.set(sx / 2, sy / 2, 0); arm.rotation.z = ang;
      arm.castShadow = true;
      const stone = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.3), MAT.ruby);
      stone.position.set(sx, sy, 0); stone.rotation.z = ang - s * 0.24;
      body.add(arm, stone);
    }
    // 叉身与叉头（朝摆轮 −X）
    const lever = new THREE.Mesh(new THREE.BoxGeometry(FORK_LEN - 0.4, 0.26, 0.2), mat);
    lever.position.x = -(FORK_LEN - 0.4) / 2; lever.castShadow = true;
    const hornA = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.16, 0.2), mat);
    hornA.position.set(-FORK_LEN + 0.15, 0.3, 0); hornA.rotation.z = -0.35;
    const hornB = hornA.clone(); hornB.position.y = -0.3; hornB.rotation.z = 0.35;
    const guard = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 6), mat);
    guard.rotation.x = Math.PI / 2; guard.position.set(-FORK_LEN + 0.05, 0, -0.2);
    body.add(lever, hornA, hornB, guard);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 3.4, 10), MAT.steel);
    shaft.rotation.x = Math.PI / 2; shaft.position.z = -0.15;
    body.add(shaft);
    fork.add(body);
    g.add(fork);
    spin.fork = body;
    reg('fork', g, new THREE.Vector3(P.x, P.y, 1.9), 3.6);
  }

  /* ---- 摆轮 + 游丝 ---- */
  {
    const g = at(B.x, B.y, 0);
    const bal = new THREE.Group();
    bal.position.z = 0;
    const rimG = new THREE.Group(); rimG.position.z = 3.7;
    const bw = balanceWheel(5.0, MAT.brassBright, MAT.blued);
    rimG.add(bw);
    const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.4, 10), MAT.steel);
    staff.rotation.x = Math.PI / 2; staff.position.z = 3.1;
    const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.16, 18), MAT.steel);
    roller.rotation.x = Math.PI / 2; roller.position.z = 2.5;
    const imp = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.34, 0.3), MAT.ruby);
    imp.position.set(Math.cos(jewelAng) * 0.5, Math.sin(jewelAng) * 0.5, 2.5);
    imp.rotation.z = jewelAng;
    const collet = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.2, 12), MAT.blued);
    collet.rotation.x = Math.PI / 2; collet.position.z = 4.22;
    bal.add(rimG, staff, roller, imp, collet);
    // 游丝（内端随摆轮转动）
    const hs = new THREE.Group(); hs.position.z = 4.05;
    const spring = new THREE.Mesh(hairspringGeo(0.42, 4.0, 5, 0.04), MAT.blued);
    hs.add(spring);
    bal.add(hs);
    g.add(bal);
    spin.balance = bal;
    spin.hairspring = hs;
    reg('balance', bal, new THREE.Vector3(B.x, B.y, 3.6), 5.4);
    reg('hairspring', hs, new THREE.Vector3(B.x, B.y, 4.05), 4.2);
  }

  /* ---- 夹板 ---- */
  const bridgeMats = [];
  function pillar(g, x, y, z0, z1, r = 0.55) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(r, r, z1 - z0, 16), MAT.plate);
    p.rotation.x = Math.PI / 2; p.position.set(x, y, (z0 + z1) / 2);
    g.add(p);
  }
  function bridge(id, circles, zTop, th, scr, pls) {
    const g = new THREE.Group();
    const mesh = new THREE.Mesh(bridgeGeo(circles, zTop, th), MAT.plate);
    mesh.position.z = zTop; mesh.castShadow = mesh.receiveShadow = true;
    g.add(mesh);
    for (const s of scr) { const sc = screw(MAT.blued, 0.3); sc.position.set(s[0], s[1], zTop + 0.06); g.add(sc); }
    for (const p of pls || []) pillar(g, p[0], p[1], 0.15, zTop - th);
    // 上轴承红宝石
    for (const c of circles) if (c.jewel) {
      const j = jewel(c.rubyMat ?? MAT.ruby, c.jewel, 0.2);
      j.position.set(c.x, c.y, zTop + 0.04); g.add(j);
    }
    const sum = circles.reduce((a, c) => a.add(new THREE.Vector2(c.x, c.y)), new THREE.Vector2()).multiplyScalar(1 / circles.length);
    reg(id, g, new THREE.Vector3(sum.x, sum.y, zTop), 6);
    bridgeMats.push(g);
  }
  bridge('bridgeBarrel',
    [{ x: pos.barrel.x, y: pos.barrel.y, r: 7.2 }, { x: pos.center.x, y: pos.center.y, r: 1.4, jewel: 0.3 }],
    2.82, 0.36,
    [[pos.barrel.x - 4.4, pos.barrel.y + 4.4], [pos.barrel.x - 4.6, pos.barrel.y - 4.2], [pos.center.x + 0.9, pos.center.y + 1.0]],
    [[pos.barrel.x + 5.2, pos.barrel.y + 3.9], [pos.barrel.x + 5.2, pos.barrel.y - 3.9], [pos.barrel.x - 5.2, pos.barrel.y]]);
  bridge('bridgeTrain',
    [{ x: pos.third.x, y: pos.third.y, r: 1.55, jewel: 0.26 },
     { x: pos.fourth.x, y: pos.fourth.y, r: 1.6, jewel: 0.26 },
     { x: E.x, y: E.y, r: 1.05, jewel: 0.22 },
     { x: P.x, y: P.y, r: 1.0, jewel: 0.22 }],
    3.62, 0.36,
    [[(pos.third.x + pos.fourth.x) / 2, (pos.third.y + pos.fourth.y) / 2 + 0.6]],
    [[pos.third.x - 1.2, pos.third.y - 2.2], [pos.fourth.x + 1.0, pos.fourth.y + 2.6]]);
  bridge('cock',
    [{ x: B.x, y: B.y, r: 1.9, jewel: 0.34, rubyMat: MAT.ruby },
     { x: B.x + 4.4, y: B.y - 2.2, r: 1.15 }],
    4.55, 0.34,
    [[B.x + 4.4, B.y - 2.2]],
    [[B.x + 4.4, B.y - 2.2, 0.5]]);
  // 摆轮防震器（金圈 + 宝石）
  {
    const inc = new THREE.Group(); inc.position.set(B.x, B.y, 4.62);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.12, 8, 24), MAT.brassBright);
    const jj = jewel(MAT.ruby, 0.3, 0.2); jj.position.z = 0.06;
    inc.add(ring, jj);
    root.add(inc);
  }

  /* ================= 运动学 ================= */
  let beats = 0;
  const ESC_PER_BEAT = 1 / (2 * N.esc);
  const ESC_OFF = 0.35 * (TAU / N.esc);

  function update(dt, speed, running) {
    if (running) beats += dt * BEATS_PER_SEC * speed;
    const i = Math.floor(beats), f = beats - i;
    const s = smooth(0.05, 0.4, f);
    const uEff = i + s;
    const escRev = uEff * ESC_PER_BEAT;

    for (const id of ['barrel', 'center', 'third', 'fourth', 'escape'])
      spin[id].rotation.z = PH0[id] + SIGN[id] * TAU * escRev * RATIO[id];
    spin.escWheel.rotation.z = ESC_OFF;

    // 擒纵叉：每拍交替换向
    const side = i % 2 === 0 ? -1 : 1;
    spin.fork.rotation.z = forkRot + side * (2 * s - 1) * 9 * D2R;

    // 摆轮：θ = A·sin(π·b)，过零时刻即换向/步进时刻
    const theta = BAL_AMP * Math.sin(Math.PI * beats);
    spin.balance.rotation.z = theta;
    spin.hairspring.rotation.z = theta / 5;
    const br = 1 + 0.05 * Math.cos(Math.PI * beats);
    spin.hairspring.scale.set(br, br, 1);
  }

  function setBridgesVisible(v) {
    for (const g of bridgeMats) g.visible = v;
  }

  update(0, 1, false);
  return { root, parts, update, setBridgesVisible };
}
