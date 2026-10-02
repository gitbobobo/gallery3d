import * as THREE from 'three';
import {
  gearShape, pinionShape, escapeShape, ratchetShape,
  addSpokeWindows, addCircleHole, springGeometry, springGeometryMorphed,
  blobShape, extrude,
} from './geometry.js';
import { plateGrainTexture, brushedTexture } from './textures.js';

const TAU = Math.PI * 2;
const M = 0.8;

const deg = (d) => (d * Math.PI) / 180;
const at = (p, dist, a) => ({ x: p.x + dist * Math.cos(deg(a)), y: p.y + dist * Math.sin(deg(a)) });

const B = { x: -30, y: 26 };
const C = at(B, (96 + 16) * M * 0.5, -57);
const T = at(C, (72 + 12) * M * 0.5, -8);
const F = at(T, (80 + 8) * M * 0.5, 48);
const E = at(F, (72 + 6) * M * 0.5, -66);
const FP = at(E, 23, 205);
const dEF = { x: (FP.x - E.x) / 23, y: (FP.y - E.y) / 23 };
const BAL = { x: FP.x + 20.5 * dEF.x, y: FP.y + 20.5 * dEF.y };
const STUD = { x: 33.5, y: -50.5 };

const PLATE = { x: 3, y: 4, r: 77 };

const RATIO = [96 / 16, 72 / 12, 80 / 8, 72 / 6];
const CUM = [6, 36, 360, 4320].map((_, i) => RATIO.slice(0, i + 1).reduce((a, b) => a * b, 1));

function meshPhase(deltaA, TA, posA, TB, posB) {
  const beta = Math.atan2(posB.y - posA.y, posB.x - posA.x);
  const pA = TAU / TA;
  const pB = TAU / TB;
  const u0 = (beta - deltaA) / pA;
  const v0 = u0 - Math.floor(u0);
  return { beta, delta: beta + Math.PI + pB * (v0 - 0.5) };
}

export const PART_INFO = {
  barrel: {
    name: '发条盒', en: 'Mainspring Barrel',
    desc: '机芯的能量仓库。黄铜盒内盘绕着主发条，上链时发条被卷紧，释放时通过盒外缘的 96 齿齿轮持续输出扭矩。擒纵机构控制它释放的速度——这是整只表唯一的动力来源。',
    spec: [['齿数', '96'], ['真实转速', '约 6 小时/圈'], ['输出给', '中心齿轴（16 齿，增速 ×6）']],
  },
  mainspring: {
    name: '主发条', en: 'Mainspring',
    desc: '一条约 1 米长的弹性钢带，以阿基米德螺线盘绕在发条盒里：外端钩住盒壁，内端锁在盒轴上。上链把它越卷越紧，它就以几乎恒定的力矩慢慢松开，驱动全部轮系。',
    spec: [['形式', '阿基米德螺旋 · 约 6 圈'], ['作用', '储存能量（动力来源）']],
  },
  ratchet: {
    name: '大钢轮与棘爪', en: 'Ratchet Wheel & Click',
    desc: '发条盒轴顶端的锯齿轮。上发条时棘爪越过齿面发出“咔咔”声；松手后棘爪卡住锯齿，防止发条倒卷冲出。锯齿的单向性保证了能量只进不出。',
    spec: [['齿形', '锯齿棘轮'], ['作用', '上链储能 · 防逆转']],
  },
  centerWheel: {
    name: '中心轮（二轮）', en: 'Center Wheel',
    desc: '轮系第一级大轮，被发条盒直接驱动。真实手表中它恰好每小时一圈——分针就装在这根轴上。轮顶的 12 齿轴把动力交给第三轮。',
    spec: [['齿数', '72 / 齿轴 12'], ['真实转速', '1 圈/小时'], ['角色', '分针轴 · 传动起点']],
  },
  thirdWheel: {
    name: '第三轮', en: 'Third Wheel',
    desc: '轮系中间级。转速是中心轮的 6 倍（真实表中每 10 分钟一圈），继续提高转速、降低扭矩，把动力送到秒轮。镂空辐孔是为了减重。',
    spec: [['齿数', '80 / 齿轴 8'], ['真实转速', '1 圈/10 分钟'], ['级间比', '×6']],
  },
  fourthWheel: {
    name: '秒轮（四轮）', en: 'Fourth Wheel',
    desc: '轮系终点。真实表中每分钟整转一圈——小秒针即装在它轴上。它的 6 叶齿轴与 72 齿轮咬合后，转速再放大 12 倍交给擒纵轮。',
    spec: [['齿数', '72 / 齿轴 6'], ['真实转速', '1 圈/分钟'], ['驱动', '擒纵轮 ×12']],
  },
  escapeWheel: {
    name: '擒纵轮', en: 'Escape Wheel',
    desc: '20 枚细长钩齿的特殊齿轮，轮系在此被“切碎”：摆轮每摆过中心一次，它的齿被擒纵叉宝石瓦释放半齿，同时齿面经宝石瓦给摆轮一次补冲。滴答声就来自这里。',
    spec: [['齿数', '20（钩形齿）'], ['真实转速', '5 秒/圈（4Hz）'], ['节拍', '每摆动前进半齿']],
  },
  palletFork: {
    name: '擒纵叉', en: 'Pallet Fork',
    desc: '瑞士杠杆擒纵的“闸门”。叉头两端各镶一颗红宝石瓦，交替锁止／释放擒纵轮齿；叉尾的叉口接受摆轮圆盘钉。它把连续旋转切成等时脉冲，又反过来把冲量送回摆轮。',
    spec: [['宝石', '进瓦 · 出瓦'], ['摆角', '约 ±11°'], ['动作', '每次摆轮回中换向']],
  },
  balance: {
    name: '摆轮', en: 'Balance Wheel',
    desc: '机芯的心脏、机械谐振子。轮缘上的配重螺钉调节惯量，与游丝共同决定摆动周期：真实摆频 28800 次/小时（4Hz）。全机芯的存在只是为了维持它每 1/8 秒一次的精确往返。',
    spec: [['摆频', '演示 2Hz · 真实 4Hz'], ['振幅', '±140°'], ['配重', '8 枚调校螺钉']],
  },
  hairspring: {
    name: '游丝', en: 'Hairspring',
    desc: '比头发还细的蓝钢螺旋簧：内端固定在摆轮轴、外端插在摆轮夹板的桩头上。摆轮每偏离平衡位置，游丝就被卷紧或放松，产生与转角成正比的回复力矩——等时性的来源。注意观察它随摆轮“呼吸”张缩。',
    spec: [['圈数', '4'], ['材质', '烤蓝钢（示意）'], ['作用', '提供回复力矩 · 定周期']],
  },
  roller: {
    name: '冲击盘与圆盘钉', en: 'Impulse Roller',
    desc: '摆轮轴下端的转盘，镶一颗红宝石圆盘钉。摆轮每经过中心位置，圆盘钉进入擒纵叉叉口——这是动力进入振荡系统的唯一通道，也是安全限速的接口。',
    spec: [['宝石', '圆盘钉'], ['频率', '每秒两次进入叉口']],
  },
  pinion: {
    name: '齿轴', en: 'Pinion',
    desc: '装在每根轴上的叶状小齿轮（16/12/8/6 叶）。上一级的大轮齿推下一级齿轴：齿数比逐级放大转速。齿轴叶数越少、单级增速越大，制造也越难。',
    spec: [['本机芯', '16 → 12 → 8 → 6 叶'], ['总增速', '发条盒→擒纵轮 ×4320']],
  },
  arbor: {
    name: '轮轴', en: 'Arbor',
    desc: '抛光钢轴，齿轮与齿轴同轴固定其上，两端伸入红宝石轴承。轴颈极细，硬度与光洁度决定摩擦损耗。',
    spec: [['支撑', '上下宝石各一枚']],
  },
  plate: {
    name: '主夹板', en: 'Main Plate',
    desc: '整块机芯的地基：所有轴、宝石、夹板都立于这块镀铑板上，板面冲压鱼鳞纹（perlage）。下宝石轴承压装在它的孔位中。',
    spec: [['装饰', '鱼鳞纹'], ['作用', '支撑全部零件']],
  },
  barrelBridge: {
    name: '发条盒夹板', en: 'Barrel Bridge',
    desc: '镂空骨架式夹板：发条盒开大窗以便观察发条卷放，中心轮与三轮处开观察窗，轴端宝石托压在其下方并以蓝钢螺钉固定。',
    spec: [['覆盖', '发条盒 · 中心轮 · 三轮'], ['固定', '3 枚螺钉']],
  },
  trainBridge: {
    name: '传动轮夹板', en: 'Train Wheel Bridge',
    desc: '压住秒轮与擒纵轮上轴端的夹板，中部的窗正对“72 齿秒轮 × 6 叶擒纵齿轴”的咬合处，可看到 12:1 增速进入擒纵。',
    spec: [['覆盖', '秒轮 · 擒纵轮轴'], ['关键窗口', '秒轮–擒纵啮合处']],
  },
  palletCock: {
    name: '擒纵叉夹板', en: 'Pallet Cock',
    desc: '悬臂式小夹板，托住擒纵叉轴上宝石——让全机芯唯一做往复摆动的轴精确地悬在擒纵轮缘上方。',
    spec: [['支撑', '擒纵叉轴上端']],
  },
  balanceCock: {
    name: '摆轮夹板', en: 'Balance Cock',
    desc: '悬于摆轮上方的标志性夹板：摆轮上宝石嵌于其中，游丝桩头立于它的外臂。摆轮唯一“无支撑悬空”的一面，就托在这片夹板上。',
    spec: [['支撑', '摆轮上轴 · 游丝外端']],
  },
  jewel: {
    name: '宝石轴承', en: 'Jewel',
    desc: '合成红宝石压入金属托（钻座）作轴瓦：硬度极高、摩擦小、可抛光。每根轴上下各一枚——“17 钻”即指这类宝石数量。',
    spec: [['材质', '人造刚玉'], ['位置', '各轴上下端']],
  },
  screw: {
    name: '蓝钢螺钉', en: 'Blued Screw',
    desc: '约 290°C 热氧化生成致密氧化层的钢螺钉：防锈、识别度高，是高级制表的传统细节。',
    spec: [['工艺', '烤蓝'], ['用途', '固定夹板']],
  },
};

export function buildMovement() {
  const mats = {
    brass: new THREE.MeshStandardMaterial({ color: 0xd0a63f, metalness: 0.95, roughness: 0.3 }),
    brassWall: new THREE.MeshStandardMaterial({ color: 0xc49b38, metalness: 0.9, roughness: 0.4, side: THREE.DoubleSide }),
    gold: new THREE.MeshStandardMaterial({ color: 0xdbb877, metalness: 0.95, roughness: 0.26 }),
    nickel: new THREE.MeshStandardMaterial({ color: 0xc9cdd3, metalness: 0.92, roughness: 0.32 }),
    steel: new THREE.MeshStandardMaterial({ color: 0xb7bec8, metalness: 1.0, roughness: 0.22 }),
    blued: new THREE.MeshStandardMaterial({ color: 0x2b58b0, metalness: 0.9, roughness: 0.22 }),
    ruby: new THREE.MeshPhysicalMaterial({ color: 0xb31238, metalness: 0.1, roughness: 0.12, clearcoat: 0.9, transparent: true, opacity: 0.95 }),
    spring: new THREE.MeshStandardMaterial({ color: 0x8d97a6, metalness: 0.95, roughness: 0.35, side: THREE.DoubleSide }),
    plate: new THREE.MeshStandardMaterial({ map: plateGrainTexture(), bumpMap: null, color: 0xbcc0c5, metalness: 0.8, roughness: 0.45 }),
    bridge: new THREE.MeshStandardMaterial({ map: brushedTexture(), color: 0xc6cacf, metalness: 0.9, roughness: 0.38 }),
    slot: new THREE.MeshStandardMaterial({ color: 0x0b1528, metalness: 0.7, roughness: 0.5 }),
  };

  const root = new THREE.Group();
  const pick = [];
  const anim = {};

  const tag = (id, obj) => obj.traverse((n) => { if (n.isMesh) { n.userData.partId = id; pick.push({ id, object: n }); } });
  const put = (parent, geo, mat, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };
  const cyl = (r1, r2, h, seg, open = false) => new THREE.CylinderGeometry(r1, r2, h, seg, 1, open);
  const vCyl = (parent, mat, r1, r2, h, x, y, z, seg = 20, open = false) => {
    const m = new THREE.Mesh(cyl(r1, r2, h, seg, open), mat);
    m.rotation.x = Math.PI / 2;
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  };
  const latheRing = (rIn, rOut, z0, z1) => {
    const pts = [new THREE.Vector2(rIn, -z0), new THREE.Vector2(rOut, -z0), new THREE.Vector2(rOut, z1), new THREE.Vector2(rIn, z1)];
    const g = new THREE.LatheGeometry(pts, 24);
    g.rotateX(Math.PI / 2);
    return g;
  };

  const jewelAt = (x, y, z) => {
    const g = new THREE.Group();
    put(g, latheRing(1.0, 2.9, 0.05, 0.6), mats.gold, 0, 0, z);
    put(g, latheRing(1.0, 1.8, 0.1, 0.95), mats.ruby, 0, 0, z);
    g.position.set(x, y, 0);
    root.add(g);
    tag('jewel', g);
  };

  const screwAt = (x, y, z, ang = 0) => {
    const g = new THREE.Group();
    vCyl(g, mats.blued, 1.45, 1.45, 0.8, 0, 0, 0);
    const slot = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.45, 0.95), mats.slot);
    slot.rotation.z = ang;
    slot.position.z = 0.08;
    g.add(slot);
    g.position.set(x, y, z);
    root.add(g);
    tag('screw', g);
  };

  const bossOn = (x, y, z, bossR = 3.3) => {
    const g = new THREE.Group();
    vCyl(g, mats.gold, bossR, bossR * 1.12, 0.8, 0, 0, 0.4);
    put(g, latheRing(1.0, 1.75, 0.1, 0.75), mats.ruby, 0, 0, 0.9);
    g.position.set(x, y, z);
    root.add(g);
    tag('jewel', g);
  };

  // ============ 主夹板 ============
  {
    const plate = vCyl(root, mats.plate, PLATE.r, PLATE.r, 3.2, PLATE.x, PLATE.y, -1.6, 120);
    tag('plate', plate);
    for (const a of [deg(212), deg(262), deg(332), deg(38), deg(128)]) {
      screwAt(PLATE.x + Math.cos(a) * 71.5, PLATE.y + Math.sin(a) * 71.5, 0.45, a + 0.4);
    }
  }

  // ============ 发条盒 ============
  const barrelG = new THREE.Group();
  barrelG.position.set(B.x, B.y, 0);
  {
    put(barrelG, extrude(gearShape(96, M, { thickness: 0.4, addendum: 0.85, dedendum: 0.95 }), 1.2), mats.brass, 0, 0, 5.5);
    put(barrelG, new THREE.RingGeometry(4.2, 36.6, 80), mats.brassWall, 0, 0, 0.55);
    put(barrelG, new THREE.RingGeometry(30.2, 37.9, 80), mats.brassWall, 0, 0, 5.4);
    vCyl(barrelG, mats.brassWall, 36.5, 36.5, 4.9, 0, 0, 3.0, 96, true);
    const spring = put(barrelG, springGeometry(7.5, 34.2, 6.2, 0.42, 2.3, { phase0: deg(90) }), mats.spring, 0, 0, 3.2);
    tag('mainspring', spring);
    vCyl(barrelG, mats.steel, 3.1, 3.1, 2.6, 0, 0, 3.2, 20);
    vCyl(barrelG, mats.steel, 1.9, 1.9, 8.4, 0, 0, 4.6, 20);
    put(barrelG, extrude(ratchetShape(20, 12.5), 1.1), mats.steel, 0, 0, 6.8);
    vCyl(barrelG, mats.steel, 3.6, 3.6, 1.2, 0, 0, 7.35, 20);
    const sq = vCyl(barrelG, mats.gold, 1.4, 1.4, 0.9, 0, 0, 8.55, 4);
    sq.rotation.z = Math.PI / 4;
    tag('barrel', barrelG);
  }
  root.add(barrelG);
  jewelAt(B.x, B.y, 0);
  anim.barrel = barrelG;
  {
    const clickA = deg(125);
    const cg = new THREE.Group();
    cg.position.set(B.x, B.y, 8.1);
    cg.rotation.z = clickA;
    const bar = put(cg, extrude(blobShape([{ x: 12.4, y: 0, r: 1.15 }, { x: 18.6, y: 0, r: 1.9 }], 0.5, { smooth: 2 }), 0.7), mats.blued, 0, 0, 0);
    vCyl(cg, mats.steel, 0.85, 0.85, 1.6, 18.6, 0, 0.6);
    tag('ratchet', cg);
    void bar;
  }

  // ============ 中心轮 ============
  const phC = meshPhase(0, 96, B, 16, C);
  const centerG = new THREE.Group();
  centerG.position.set(C.x, C.y, 0);
  {
    const p = put(centerG, extrude(pinionShape(16, M), 1.4), mats.steel, 0, 0, 5.15);
    p.rotation.z = phC.delta;
    tag('pinion', p);
    const ws = gearShape(72, M);
    addSpokeWindows(ws, 72, M, { count: 5, hubR: 8.6, rimR: 26.2 });
    tag('centerWheel', put(centerG, extrude(ws, 1.3), mats.brass, 0, 0, 7.7));
    for (let i = 0; i < 2; i++) {
      const b = put(centerG, new THREE.BoxGeometry(15, 1.5, 1.25), mats.brass, 0, 0, 6.95);
      b.rotation.z = i * Math.PI / 2 + deg(20);
    }
    vCyl(centerG, mats.steel, 1.1, 1.1, 11.6, 0, 0, 5.8, 16);
    tag('arbor', centerG.children[centerG.children.length - 1]);
  }
  root.add(centerG);
  jewelAt(C.x, C.y, 0);
  anim.center = centerG;

  // ============ 三轮 ============
  const phT = meshPhase(0, 72, C, 12, T);
  const thirdG = new THREE.Group();
  thirdG.position.set(T.x, T.y, 0);
  {
    const p = put(thirdG, extrude(pinionShape(12, M), 1.3), mats.steel, 0, 0, 7.75);
    p.rotation.z = phT.delta;
    tag('pinion', p);
    const ws = gearShape(80, M);
    addSpokeWindows(ws, 80, M, { count: 5, hubR: 9.6, rimR: 29 });
    tag('thirdWheel', put(thirdG, extrude(ws, 1.25), mats.brass, 0, 0, 3.9));
    for (let i = 0; i < 2; i++) {
      const b = put(thirdG, new THREE.BoxGeometry(15, 1.5, 2.7), mats.steel, 0, 0, 6.2);
      b.rotation.z = i * Math.PI / 2 + deg(24);
    }
    vCyl(thirdG, mats.steel, 1.0, 1.0, 11.6, 0, 0, 5.8, 16);
    tag('arbor', thirdG.children[thirdG.children.length - 1]);
  }
  root.add(thirdG);
  jewelAt(T.x, T.y, 0);
  anim.third = thirdG;

  // ============ 秒轮 ============
  const phF = meshPhase(0, 80, T, 8, F);
  const fourthG = new THREE.Group();
  fourthG.position.set(F.x, F.y, 0);
  {
    const p = put(fourthG, extrude(pinionShape(8, M), 1.25), mats.steel, 0, 0, 3.95);
    p.rotation.z = phF.delta;
    tag('pinion', p);
    const ws = gearShape(72, M);
    addSpokeWindows(ws, 72, M, { count: 5, hubR: 8.6, rimR: 26 });
    tag('fourthWheel', put(fourthG, extrude(ws, 1.25), mats.brass, 0, 0, 7.7));
    for (let i = 0; i < 2; i++) {
      const b = put(fourthG, new THREE.BoxGeometry(15, 1.5, 2.7), mats.steel, 0, 0, 6.15);
      b.rotation.z = i * Math.PI / 2 + deg(15);
    }
    vCyl(fourthG, mats.steel, 1.0, 1.0, 11.6, 0, 0, 5.8, 16);
    tag('arbor', fourthG.children[fourthG.children.length - 1]);
  }
  root.add(fourthG);
  jewelAt(F.x, F.y, 0);
  anim.fourth = fourthG;

  // ============ 擒纵轮（轮步进 + 齿轴匀速） ============
  const phE = meshPhase(0, 72, F, 6, E);
  const escapePinion = new THREE.Group();
  escapePinion.position.set(E.x, E.y, 0);
  {
    const p = put(escapePinion, extrude(pinionShape(6, M), 1.3), mats.steel, 0, 0, 7.75);
    p.rotation.z = phE.delta;
    tag('pinion', p);
  }
  root.add(escapePinion);
  const escapeG = new THREE.Group();
  escapeG.position.set(E.x, E.y, 5.4);
  {
    const es = escapeShape(20, (20 * M) / 2);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * TAU;
      addCircleHole(es, Math.cos(a) * 3.6, Math.sin(a) * 3.6, 1.0);
    }
    tag('escapeWheel', put(escapeG, extrude(es, 1.15), mats.brass, 0, 0, 0));
    vCyl(escapeG, mats.brass, 1.2, 1.2, 1.9, 0, 0, 1.45, 14);
    vCyl(escapeG, mats.steel, 0.9, 0.9, 11.6, 0, 0, 0.4, 14);
    tag('arbor', escapeG.children[escapeG.children.length - 1]);
  }
  root.add(escapeG);
  jewelAt(E.x, E.y, 0);
  anim.escapeWheel = escapeG;
  anim.escapePinion = escapePinion;

  // ============ 擒纵叉 ============
  const forkG = new THREE.Group();
  forkG.position.set(FP.x, FP.y, 0);
  {
    const jr = 13.2;
    const jaws = [deg(27), deg(-27)];
    const circles = [{ x: 0, y: 0, r: 2.5 },
      ...jaws.map((a) => ({ x: Math.cos(a) * jr, y: Math.sin(a) * jr, r: 2.0 })),
      { x: -11, y: 0, r: 1.8 },
      { x: -15.2, y: 1.55, r: 1.2 },
      { x: -15.2, y: -1.55, r: 1.2 }];
    const shape = blobShape(circles, 0.7, { holes: [{ x: 0, y: 0, r: 0.95 }], smooth: 2 });
    put(forkG, extrude(shape, 0.9), mats.nickel, 0, 0, 5.9);
    for (const a of jaws) {
      const jx = Math.cos(a) * jr;
      const jy = Math.sin(a) * jr;
      const toE = Math.atan2(-jy, 23 - jx);
      const st = put(forkG, new THREE.BoxGeometry(1.5, 3.3, 1.6), mats.ruby, jx + Math.cos(toE) * 1.15, jy + Math.sin(toE) * 1.15, 6.1);
      st.rotation.z = toE + Math.PI / 2;
    }
    vCyl(forkG, mats.steel, 0.22, 0.22, 1.5, -16.2, 0, 6.7, 8);
    vCyl(forkG, mats.steel, 0.8, 0.8, 9.4, 0, 0, 5.1, 12);
    tag('palletFork', forkG);
  }
  root.add(forkG);
  jewelAt(FP.x, FP.y, 0);
  anim.fork = forkG;

  // ============ 摆轮 + 游丝 ============
  const balanceG = new THREE.Group();
  balanceG.position.set(BAL.x, BAL.y, 0);
  {
    put(balanceG, new THREE.TorusGeometry(15, 1.95, 14, 64), mats.gold, 0, 0, 15);
    for (let i = 0; i < 2; i++) {
      const arm = put(balanceG, new THREE.BoxGeometry(26, 2.6, 0.95), mats.gold, 0, 0, 15);
      arm.rotation.z = i * Math.PI / 2 + deg(30);
    }
    vCyl(balanceG, mats.gold, 4.3, 4.3, 1.7, 0, 0, 15, 24);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * TAU + deg(12);
      const s = new THREE.Mesh(cyl(0.95, 0.95, 2.7, 10), mats.brass);
      s.rotation.z = a + Math.PI / 2;
      s.position.set(Math.cos(a) * 16.5, Math.sin(a) * 16.5, 15);
      balanceG.add(s);
      tag('balance', s);
    }
    const roller = new THREE.Group();
    vCyl(roller, mats.nickel, 4.6, 4.6, 0.8, 0, 0, 0, 28);
    const pinA = Math.atan2(FP.y - BAL.y, FP.x - BAL.x);
    vCyl(roller, mats.ruby, 0.55, 0.55, 1.7, Math.cos(pinA) * 4.2, Math.sin(pinA) * 4.2, -0.35, 10);
    roller.position.z = 7.7;
    balanceG.add(roller);
    tag('roller', roller);
    vCyl(balanceG, mats.steel, 0.85, 0.85, 20.2, 0, 0, 10.5, 14);
    tag('arbor', balanceG.children[balanceG.children.length - 1]);
    const phase0 = Math.atan2(STUD.y - BAL.y, STUD.x - BAL.x);
    const hs = put(balanceG, springGeometryMorphed(2.8, 11.8, 4.0, 0.3, 0.5, { phase0 }), mats.blued, 0, 0, 17.6);
    hs.morphTargetInfluences = [0];
    tag('hairspring', hs);
    put(balanceG, new THREE.TorusGeometry(2.6, 0.42, 8, 20), mats.gold, 0, 0, 17.6);
    tag('balance', balanceG);
  }
  root.add(balanceG);
  jewelAt(BAL.x, BAL.y, 0);
  anim.balance = balanceG;

  // ============ 夹板 ============
  const mid = (p, q, f = 0.5) => ({ x: p.x + (q.x - p.x) * f, y: p.y + (q.y - p.y) * f });
  {
    const shape = blobShape(
      [{ x: B.x, y: B.y, r: 38 }, { x: C.x, y: C.y, r: 25 }, { x: T.x, y: T.y, r: 24 }], 2.6,
      {
        holes: [
          { x: B.x, y: B.y, r: 30 }, { x: C.x, y: C.y, r: 2 }, { x: T.x, y: T.y, r: 2 },
          { x: mid(B, C).x + 2, y: mid(B, C).y, r: 12.5 }, { x: mid(C, T).x, y: mid(C, T).y + 1, r: 12 },
        ],
      },
    );
    tag('barrelBridge', put(root, extrude(shape, 1.6), mats.bridge, 0, 0, 9.9));
    bossOn(C.x, C.y, 11.5);
    bossOn(T.x, T.y, 11.5);
    for (const a of [95, 152, 214]) screwAt(B.x + Math.cos(deg(a)) * 34.5, B.y + Math.sin(deg(a)) * 34.5, 11.55, deg(a));
  }
  {
    const shape = blobShape(
      [{ x: F.x, y: F.y, r: 26 }, { x: E.x, y: E.y, r: 12.5 }, { x: 76, y: -28, r: 4.4 }], 2.4,
      { holes: [{ x: F.x, y: F.y, r: 2 }, { x: E.x, y: E.y, r: 2 }, { x: mid(F, E).x, y: mid(F, E).y, r: 11.5 }] },
    );
    tag('trainBridge', put(root, extrude(shape, 1.6), mats.bridge, 0, 0, 9.9));
    bossOn(F.x, F.y, 11.5);
    bossOn(E.x, E.y, 11.5);
    screwAt(F.x + Math.cos(deg(20)) * 26.2, F.y + Math.sin(deg(20)) * 26.2, 11.55, deg(20));
    screwAt(76, -28, 11.55, 0.7);
  }
  {
    const shape = blobShape([{ x: FP.x, y: FP.y, r: 5.2 }, { x: 52, y: -42, r: 4.2 }], 1.5, { holes: [{ x: FP.x, y: FP.y, r: 1.1 }] });
    tag('palletCock', put(root, extrude(shape, 1.4), mats.bridge, 0, 0, 8.2));
    bossOn(FP.x, FP.y, 9.6, 2.8);
    screwAt(52, -42, 9.6, 0.35);
  }
  {
    const shape = blobShape([{ x: BAL.x, y: BAL.y, r: 4.2 }, { x: 33, y: -49, r: 4.2 }, { x: 48, y: -56, r: 3.4 }], 1.6, { holes: [{ x: BAL.x, y: BAL.y, r: 1.1 }] });
    tag('balanceCock', put(root, extrude(shape, 1.3), mats.bridge, 0, 0, 19.4));
    bossOn(BAL.x, BAL.y, 20.7, 3.1);
    screwAt(48, -56, 20.75, 0.9);
    const stud = vCyl(root, mats.bridge, 1.5, 1.8, 2.0, STUD.x, STUD.y, 18.4, 14);
    tag('balanceCock', stud);
  }

  root.rotation.x = -Math.PI / 2;

  // ============ 运动学 ============
  const pE = TAU / 20;
  let beats = 0;

  function setState(Bt) {
    const Theta = (TAU * Bt) / (CUM[3] * 40);

    anim.barrel.rotation.z = Theta;
    anim.center.rotation.z = -CUM[0] * Theta;
    anim.third.rotation.z = CUM[1] * Theta;
    anim.fourth.rotation.z = -CUM[2] * Theta;
    anim.escapePinion.rotation.z = CUM[3] * Theta;

    const n = Math.floor(Bt);
    const u = Math.min(1, (Bt - n) / 0.42);
    const ramp = u * u * (3 - 2 * u);
    anim.escapeWheel.rotation.z = (pE / 2) * (n + ramp);

    anim.balance.rotation.z = 2.44 * Math.sin(Math.PI * Bt);
    anim.fork.rotation.z = -0.195 * Math.tanh(6 * Math.sin(Math.PI * Bt));

    for (const child of anim.balance.children) {
      if (child.morphTargetInfluences) child.morphTargetInfluences[0] = Math.abs(Math.sin(Math.PI * Bt));
    }
  }

  function update(dt, hz, speed) {
    beats += dt * 2 * hz * speed;
    setState(beats);
  }

  const anchors = {
    barrel: new THREE.Vector3(B.x, B.y, 7.5),
    mainspring: new THREE.Vector3(B.x + 13, B.y - 18, 4.6),
    centerWheel: new THREE.Vector3(C.x, C.y, 8.4),
    thirdWheel: new THREE.Vector3(T.x, T.y, 4.6),
    fourthWheel: new THREE.Vector3(F.x, F.y, 8.4),
    escapeWheel: new THREE.Vector3(E.x, E.y, 6.1),
    palletFork: new THREE.Vector3(FP.x, FP.y, 6.5),
    balance: new THREE.Vector3(BAL.x, BAL.y, 15.2),
    hairspring: new THREE.Vector3(BAL.x + 8, BAL.y - 8, 17.6),
  };

  return { root, pick, update, setState, anchors, layout: { B, C, T, F, E, FP, BAL, PLATE } };
}
