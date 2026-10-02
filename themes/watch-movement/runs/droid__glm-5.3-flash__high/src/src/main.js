import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/* ================= 基础工具 ================= */
const D2R = Math.PI / 180;
const q = (r, a) => [r * Math.cos(a), r * Math.sin(a)];
const polar = (r, a) => new THREE.Vector2(r * Math.cos(a), r * Math.sin(a));
const angleTo = (a, b) => Math.atan2(b.y - a.y, b.x - a.x);
const clamp = THREE.MathUtils.clamp;
const smooth = (x) => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };

/* ================= 齿轮参数（真实传动比设计） =================
   齿数：发条轮 72 -> 中心轮榫 12（×6）
         中心轮 75 -> 三轮榫 10（×7.5）
         三轮 64 -> 四轮榫 8（×8）
         四轮 60 -> 擒纵轮榫 6（×10）
   摆轮 2.5 Hz（18000 摆频/时），擒纵轮 15 齿每 6 秒一圈，
   四轮 60 秒一圈（秒针），中心轮 1 小时一圈（分针），发条盒 6 小时一圈。
   每对啮合齿轮模数相同，中心距 = m(Z1+Z2)/2，保证正确咬合。 */
const Z = { barrel: 72, cPin: 12, cGear: 75, tPin: 10, tGear: 64, fPin: 8, fGear: 60, ePin: 6, escape: 15 };
const M = { barrel: 0.28, center: 0.24, third: 0.24, fourth: 0.26 };

/* 各轮位置：沿链条按啮合中心距排布，方向手工设计呈弧形 */
const P = {};
P.barrel = new THREE.Vector2(0, 0);
P.center = P.barrel.clone().add(polar(M.barrel * (Z.barrel + Z.cPin) / 2, 10 * D2R));
P.third = P.center.clone().add(polar(M.center * (Z.cGear + Z.tPin) / 2, -55 * D2R));
P.fourth = P.third.clone().add(polar(M.third * (Z.tGear + Z.fPin) / 2, -125 * D2R));
P.escape = P.fourth.clone().add(polar(M.fourth * (Z.fGear + Z.ePin) / 2, 175 * D2R));

const forkDir = 215 * D2R;                     // 擒纵轮 -> 擒纵叉 -> 摆轮 的方向
P.fork = P.escape.clone().add(polar(5.6, forkDir));
P.balance = P.fork.clone().add(polar(4.8, forkDir));

/* 角速度（rad/s），外啮合逐级反转 */
const W_BARREL = 2 * Math.PI / 21600;           // 6 小时一圈
const W_CENTER = -W_BARREL * Z.barrel / Z.cPin;
const W_THIRD = -W_CENTER * Z.cGear / Z.tPin;
const W_FOURTH = -W_THIRD * Z.tGear / Z.fPin;
const W_ESCAPE = -W_FOURTH * Z.fGear / Z.ePin;  // = 2π/6，一圈 6 秒

/* 初始相位：让每对齿轮在接触点齿对槽。
   公式：θB = -(ZA/ZB)(θA - φ) + φ + π/ZB，齿轮几何以局部角 0 为齿中心 */
const TH0 = {};
TH0.barrel = 0;
const phase = (thA, phi, Za, Zb) => -(Za / Zb) * (thA - phi) + phi + Math.PI / Zb;
TH0.center = phase(TH0.barrel, angleTo(P.barrel, P.center), Z.barrel, Z.cPin);
TH0.third = phase(TH0.center, angleTo(P.center, P.third), Z.cGear, Z.tPin);
TH0.fourth = phase(TH0.third, angleTo(P.third, P.fourth), Z.tGear, Z.fPin);
TH0.escape = phase(TH0.fourth, angleTo(P.fourth, P.escape), Z.fGear, Z.ePin);

/* ================= 调速机构运动 ================= */
const PERIOD = 0.4;          // 摆轮全振荡周期（18000 vph）
const HALF = PERIOD / 2;
const AMP = 270 * D2R;       // 摆幅
const balAngle = (t) => AMP * Math.cos(2 * Math.PI * t / PERIOD);
// 擒纵叉由摆轮圆盘钉通过叉槽驱动：叉角 ∝ sin(摆角)，限幅在叉限位之间
const FORK_AMP = 5 * D2R;
const forkAngle = (t) => FORK_AMP * clamp(1.6 * Math.sin(balAngle(t)), -1, 1);
// 擒纵轮每半个周期跳一齿：在摆轮全速通过、叉从一侧限位摆到另一侧时释放
// 叉离开限位/到达限位的时刻（数值解 sin(balAngle)=±0.625）
const T_FLIP0 = Math.acos((Math.PI - Math.asin(0.625)) / AMP) / (2 * Math.PI / PERIOD);
const T_FLIP1 = Math.acos(Math.asin(0.625) / AMP) / (2 * Math.PI / PERIOD);
function escapeAngle(t) {
  const k = Math.floor((t - T_FLIP0) / HALF + 1e-6);
  const s = smooth((t - T_FLIP0 - k * HALF) / (T_FLIP1 - T_FLIP0));
  return (2 * Math.PI / Z.escape) * (k + s);
}

/* ================= 渲染器 / 场景 ================= */
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.getElementById('app').appendChild(renderer.domElement);

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 600);
const CENTER = new THREE.Vector3(8.5, -7, 5);
camera.position.set(CENTER.x + 34, CENTER.y - 34, 40);
camera.lookAt(CENTER);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(CENTER);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 10;
controls.maxDistance = 300;
controls.update();

/* 根据视口宽高比自动取景：保证整个机芯都进入画面 */
const SCENE_RADIUS = 25;
const VIEW_DIR = new THREE.Vector3(0.55, -0.55, 0.64).normalize();
function fitCamera() {
  const vFov = camera.fov * D2R;
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
  const dist = SCENE_RADIUS / Math.sin(Math.min(vFov, hFov) / 2) * 1.06;
  camera.position.copy(CENTER).addScaledVector(VIEW_DIR, dist);
}
fitCamera();

scene.add(new THREE.AmbientLight(0xffffff, 0.25));
const key = new THREE.DirectionalLight(0xfff4e0, 1.6);
key.position.set(20, -30, 50);
scene.add(key);
const fill = new THREE.DirectionalLight(0xbfd4ff, 0.5);
fill.position.set(-30, 20, 25);
scene.add(fill);

/* ================= 材质 ================= */
const MAT = {
  brass: new THREE.MeshStandardMaterial({ color: 0xc9973b, metalness: 0.95, roughness: 0.28 }),
  brassDark: new THREE.MeshStandardMaterial({ color: 0xa87b2e, metalness: 0.9, roughness: 0.35 }),
  steel: new THREE.MeshStandardMaterial({ color: 0xd6d9dd, metalness: 1.0, roughness: 0.3 }),
  blued: new THREE.MeshStandardMaterial({ color: 0x2f4fa0, metalness: 0.9, roughness: 0.28 }),
  ruby: new THREE.MeshStandardMaterial({ color: 0xd0344c, metalness: 0.1, roughness: 0.15 }),
  plate: new THREE.MeshStandardMaterial({ color: 0x6f6a5c, metalness: 0.55, roughness: 0.55 }),
};

/* ================= 几何生成 ================= */
// 标准渐开线近似齿形：齿中心在局部角 0
function gearShape(Zn, mod) {
  const rp = mod * Zn / 2, rTip = rp + mod, rRoot = rp - 1.25 * mod;
  const p = 2 * Math.PI / Zn;
  const s = new THREE.Shape();
  s.moveTo(...q(rRoot, -0.32 * p));
  for (let i = 0; i < Zn; i++) {
    const a = i * p;
    s.absarc(0, 0, rTip, a - 0.10 * p, a + 0.10 * p, false); // 齿顶
    s.absarc(0, 0, rRoot, a + 0.32 * p, a + 0.68 * p, false); // 齿根（斜线为隐式连线）
  }
  s.closePath();
  return s;
}

// 辐条镂空
function addSpokes(shape, rIn, rOut, count, phase = 0) {
  const gap = 0.22;
  for (let i = 0; i < count; i++) {
    const a0 = phase + i * 2 * Math.PI / count + gap;
    const a1 = phase + (i + 1) * 2 * Math.PI / count - gap;
    const h = new THREE.Path();
    h.absarc(0, 0, rIn, a0, a1, false);
    h.absarc(0, 0, rOut, a1, a0, true);
    shape.holes.push(h);
  }
}

function escapeWheelShape(Zn, rTip, rRoot) {
  const p = 2 * Math.PI / Zn;
  const s = new THREE.Shape();
  s.moveTo(...q(rRoot, 0.10 * p));
  for (let i = 1; i <= Zn; i++) {
    const a = i * p;
    s.absarc(0, 0, rRoot, a - 0.90 * p, a - 0.45 * p, false); // 齿根
    s.lineTo(...q(rTip, a - 0.05 * p));                       // 长斜面（锁面）
    s.absarc(0, 0, rTip * 0.97, a - 0.05 * p, a + 0.04 * p, false); // 齿尖小平面
    s.lineTo(...q(rRoot, a + 0.10 * p));                      // 陡直背面
  }
  s.closePath();
  return s;
}

function extrude(shape, depth, mat) {
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 4 });
  g.translate(0, 0, -depth / 2);
  return new THREE.Mesh(g, mat);
}

function cyl(r, h, mat, seg = 32) {
  return new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), mat);
}

/* ================= 零件注册（点击查看） ================= */
const PARTS = {};
function registerPart(group, id, cn, en, desc) {
  const mats = new Set();
  group.traverse((o) => {
    if (o.isMesh) {
      o.material = o.material.clone();
      mats.add(o.material);
    }
  });
  group.userData.part = { id, cn, en, desc, mats: [...mats] };
  PARTS[id] = group.userData.part;
  group.traverse((o) => { o.userData.partRoot = group; });
}

const gears = {}; // 需要旋转的组
function wheelAssembly(id, cn, en, desc, pos, levels) {
  const g = new THREE.Group();
  g.position.set(pos.x, pos.y, 0);
  levels(g);
  scene.add(g);
  registerPart(g, id, cn, en, desc);
  gears[id] = g;
  return g;
}

/* ================= 主夹板 ================= */
{
  const g = new THREE.Group();
  const plate = cyl(27, 1, MAT.plate, 96);
  plate.rotation.x = Math.PI / 2;
  plate.position.set(8.5, -6, 0.5);
  g.add(plate);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(27, 0.55, 12, 96), MAT.brassDark);
  rim.position.set(8.5, -6, 1);
  g.add(rim);
  // 各轴下宝石
  for (const key of ['barrel', 'center', 'third', 'fourth', 'escape', 'fork', 'balance']) {
    const j = cyl(0.55, 0.3, MAT.ruby, 16);
    j.rotation.x = Math.PI / 2;
    j.position.set(P[key].x, P[key].y, 1.15);
    g.add(j);
  }
  scene.add(g);
  registerPart(g, 'plate', '主夹板', 'Main Plate',
    '所有零件的安装基座，轴孔中镶有红宝石轴承，减小摩擦与磨损。');
}

/* ================= 发条盒 + 发条 ================= */
{
  const barrel = new THREE.Group();
  barrel.position.set(P.barrel.x, P.barrel.y, 0);

  // 齿圈（与中心轮榫啮合，z=3.6 层）
  const gearShapeBarrel = gearShape(Z.barrel, M.barrel);
  const ring = extrude(gearShapeBarrel, 0.7, MAT.brass);
  ring.position.z = 3.6;
  barrel.add(ring);
  // 齿圈与鼓身之间的环形连接盘（中空，不遮挡内部发条）
  const web = new THREE.Mesh(new THREE.RingGeometry(7.4, 9.9, 72), MAT.brassDark);
  web.position.z = 3.2;
  barrel.add(web);
  const web2 = web.clone();
  web2.position.z = 3.05;
  web2.rotation.y = Math.PI;
  barrel.add(web2);

  // 鼓身（下部环形带 + 顶圈，中间敞开可看见发条）
  const wall = cyl(7.5, 1.0, MAT.brass, 72);
  wall.rotation.x = Math.PI / 2; wall.position.z = 3.1;
  barrel.add(wall);
  const bottom = cyl(7.3, 0.3, MAT.brassDark, 72);
  bottom.rotation.x = Math.PI / 2; bottom.position.z = 2.75;
  barrel.add(bottom);
  const topRing = new THREE.Mesh(new THREE.TorusGeometry(7.1, 0.4, 10, 72), MAT.brass);
  topRing.position.z = 4.5;
  barrel.add(topRing);

  // 条轴
  const arbor = cyl(0.55, 3.4, MAT.steel, 24);
  arbor.rotation.x = Math.PI / 2; arbor.position.z = 4.2;
  barrel.add(arbor);

  scene.add(barrel);
  registerPart(barrel, 'barrel', '发条盒', 'Mainspring Barrel',
    '动力来源。内部发条上紧后缓慢释放，驱动轮系。转速最慢（约 6 小时一圈）、力量最大，是整个传动链的起点。');
  gears.barrel = barrel;

  // 内部发条（单独可点击，随盒转动）
  const spring = new THREE.Group();
  const pts = [];
  const turns = 5.5;
  for (let i = 0; i <= 300; i++) {
    const u = i / 300;
    const a = u * turns * 2 * Math.PI;
    const r = 1.2 + u * 5.6;
    pts.push(new THREE.Vector3(r * Math.cos(a), r * Math.sin(a), 0));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 300, 0.55, 6), MAT.blued);
  tube.scale.z = 0.28; // 压扁成带状
  tube.position.z = 3.95;
  spring.add(tube);
  barrel.add(spring);
  registerPart(spring, 'mainspring', '发条', 'Mainspring',
    '弹性钢带，上链时储存弹性势能，通过发条盒缓慢释放，为整个机芯提供动力。');
}

/* ================= 中心轮（轮 75 / 榫 12） ================= */
wheelAssembly('center', '中心轮', 'Center Wheel',
  '传动轮系第一级：轮片与发条盒啮合，每小时转一圈，对应分针；轮榫与三号轮啮合并把转速放大 6 倍。',
  P.center, (g) => {
    const s = gearShape(Z.cGear, M.center);
    addSpokes(s, 1.6, 7.6, 5, 0.3);
    const gear = new THREE.Mesh(
      new THREE.ExtrudeGeometry(s, { depth: 0.8, bevelEnabled: false, curveSegments: 4 }), MAT.brass);
    gear.geometry.translate(0, 0, -0.4);
    gear.position.z = 1.6;
    g.add(gear);
    const pin = extrude(gearShape(Z.cPin, M.barrel), 1.3, MAT.steel);
    pin.position.z = 3.6;
    g.add(pin);
    const arbor = cyl(0.45, 4.2, MAT.steel, 20);
    arbor.rotation.x = Math.PI / 2; arbor.position.z = 3.0;
    g.add(arbor);
  });

/* ================= 三号轮（轮 64 / 榫 10） ================= */
wheelAssembly('third', '三号轮（过轮）', 'Third Wheel',
  '传递并继续放大转速：轮片由中心轮驱动，轮榫带动四号轮，两级之间转速提高 7.5 倍。',
  P.third, (g) => {
    const s = gearShape(Z.tGear, M.third);
    addSpokes(s, 1.5, 6.3, 4, 0.7);
    const gear = new THREE.Mesh(
      new THREE.ExtrudeGeometry(s, { depth: 0.7, bevelEnabled: false, curveSegments: 4 }), MAT.brass);
    gear.geometry.translate(0, 0, -0.35);
    gear.position.z = 2.8;
    g.add(gear);
    const pin = extrude(gearShape(Z.tPin, M.center), 1.2, MAT.steel);
    pin.position.z = 1.6;
    g.add(pin);
    const arbor = cyl(0.4, 5.0, MAT.steel, 20);
    arbor.rotation.x = Math.PI / 2; arbor.position.z = 3.6;
    g.add(arbor);
  });

/* ================= 四号轮 / 秒轮（轮 60 / 榫 8） ================= */
wheelAssembly('fourth', '四号轮（秒轮）', 'Fourth Wheel',
  '每分钟转一圈，对应秒针；轮片驱动擒纵轮榫，把动力送入擒纵机构。',
  P.fourth, (g) => {
    const s = gearShape(Z.fGear, M.fourth);
    addSpokes(s, 1.4, 6.2, 4, 0.1);
    const gear = new THREE.Mesh(
      new THREE.ExtrudeGeometry(s, { depth: 0.7, bevelEnabled: false, curveSegments: 4 }), MAT.brass);
    gear.geometry.translate(0, 0, -0.35);
    gear.position.z = 5.2;
    g.add(gear);
    const pin = extrude(gearShape(Z.fPin, M.third), 1.4, MAT.steel);
    pin.position.z = 2.8;
    g.add(pin);
    const arbor = cyl(0.38, 5.4, MAT.steel, 20);
    arbor.rotation.x = Math.PI / 2; arbor.position.z = 3.8;
    g.add(arbor);
  });

/* ================= 擒纵轮（15 齿 + 榫 6） ================= */
wheelAssembly('escape', '擒纵轮', 'Escape Wheel',
  '轮系的最后一环。齿被擒纵叉两侧宝石交替锁住，每半次摆动被放开一齿并"滴答"前进一步（6 秒一圈），把连续转动切成等份的脉冲。',
  P.escape, (g) => {
    const wheel = new THREE.Mesh(
      new THREE.ExtrudeGeometry(escapeWheelShape(Z.escape, 3.7, 2.4),
        { depth: 0.7, bevelEnabled: false, curveSegments: 3 }), MAT.steel);
    wheel.geometry.translate(0, 0, -0.35);
    wheel.position.z = 6.8;
    g.add(wheel);
    const pin = extrude(gearShape(Z.ePin, M.fourth), 1.4, MAT.steel);
    pin.position.z = 5.2;
    g.add(pin);
    const arbor = cyl(0.3, 6.6, MAT.steel, 16);
    arbor.rotation.x = Math.PI / 2; arbor.position.z = 4.3;
    g.add(arbor);
  });

/* ================= 擒纵叉 ================= */
{
  const g = new THREE.Group();
  g.position.set(P.fork.x, P.fork.y, 0);
  const base = angleTo(P.fork, P.escape); // 局部 +x 指向擒纵轮

  // 叉身：指向摆轮的杠杆
  const lever = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.55, 0.5), MAT.steel);
  lever.position.set(-1.95, 0, 7.3);
  g.add(lever);

  // 两条叉臂伸向擒纵轮 + 两颗红宝石瓦
  // 局部坐标系：+x 指向擒纵轮轴心（距离 5.6），宝石放在轮缘朝叉一侧（±30°）
  const dEF = 5.6, rStone = 3.3, spread = 30 * D2R;
  const sx = dEF - rStone * Math.cos(spread);
  const sy = rStone * Math.sin(spread);
  for (const sgn of [1, -1]) {
    const armLen = Math.hypot(sx, sy) - 0.3;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(armLen, 0.4, 0.4), MAT.steel);
    arm.position.set(sx / 2, sgn * sy / 2, 7.1);
    arm.rotation.z = sgn * Math.atan2(sy, sx);
    g.add(arm);
    const stone = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.5, 0.9), MAT.ruby);
    stone.position.set(sx, sgn * sy, 6.9);
    stone.rotation.z = sgn * 0.5;
    g.add(stone);
  }

  // 叉头（两个叉瓦 + 防过转爪）
  const hornA = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.5), MAT.steel);
  hornA.position.set(-3.9, 0.38, 7.3);
  const hornB = hornA.clone();
  hornB.position.y = -0.38;
  g.add(hornA, hornB);

  // 叉轴
  const arbor = cyl(0.28, 2.0, MAT.steel, 16);
  arbor.rotation.x = Math.PI / 2;
  arbor.position.z = 7.4;
  g.add(arbor);

  scene.add(g);
  registerPart(g, 'fork', '擒纵叉', 'Pallet Fork',
    '锚状杠杆：两侧红宝石（进瓦/出瓦）交替锁住并放开擒纵轮齿，同时把每次冲击经叉头传给摆轮，发出"滴答"声。');
  gears.fork = g;
  g.userData.baseRot = base;
}

/* ================= 摆轮 + 游丝 ================= */
let hairspring;
{
  const g = new THREE.Group();
  g.position.set(P.balance.x, P.balance.y, 0);

  // 轮缘
  const rim = new THREE.Mesh(new THREE.TorusGeometry(4.8, 0.45, 14, 72), MAT.brass);
  rim.position.z = 9;
  g.add(rim);
  // 双辐条 + 轴座
  for (const ang of [0, Math.PI / 2]) {
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.7, 0.35), MAT.brass);
    spoke.position.z = 9;
    spoke.rotation.z = ang;
    g.add(spoke);
  }
  const hub = cyl(0.9, 0.8, MAT.brass, 24);
  hub.rotation.x = Math.PI / 2; hub.position.z = 9;
  g.add(hub);

  // 摆轴（上端到摆轮桥，下端到夹板）
  const staff = cyl(0.28, 10, MAT.steel, 16);
  staff.rotation.x = Math.PI / 2; staff.position.z = 6.2;
  g.add(staff);

  // 双层圆盘 + 冲击钉（朝向擒纵叉）
  const roller = cyl(0.95, 0.35, MAT.steel, 24);
  roller.rotation.x = Math.PI / 2; roller.position.z = 7.35;
  g.add(roller);
  const pinDir = angleTo(P.balance, P.fork) - (g.rotation.z || 0);
  const pin = cyl(0.18, 0.9, MAT.ruby, 10);
  pin.rotation.x = Math.PI / 2;
  pin.position.set(0.85 * Math.cos(pinDir), 0.85 * Math.sin(pinDir), 7.35);
  g.add(pin);

  scene.add(g);
  registerPart(g, 'balance', '摆轮', 'Balance Wheel',
    '机芯的"心脏"：以 2.5 Hz 往复摆动（18000 次摆频/时），每次经过中心位置时接收擒纵叉的冲击，维持整个系统不停振动，摆动频率决定走时快慢。');
  gears.balance = g;

  // 游丝（阿基米德螺线，蓝钢）
  const hg = new THREE.Group();
  hg.position.set(P.balance.x, P.balance.y, 10);
  const pts = [];
  const turns = 5;
  for (let i = 0; i <= 260; i++) {
    const u = i / 260;
    const a = u * turns * 2 * Math.PI;
    const r = 1.1 + u * 2.7;
    pts.push(new THREE.Vector3(r * Math.cos(a), r * Math.sin(a), 0));
  }
  const tube = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 260, 0.07, 6), MAT.blued);
  hg.add(tube);
  // 外桩
  const stud = cyl(0.28, 0.9, MAT.brass, 12);
  stud.rotation.x = Math.PI / 2;
  stud.position.set(3.8 * Math.cos(0), 3.8 * Math.sin(0), 0.4);
  hg.add(stud);
  scene.add(hg);
  registerPart(hg, 'hairspring', '游丝', 'Hairspring',
    '极细的弹性蓝钢螺线：摆轮转动时被卷紧/张开，产生回复力矩把摆轮拉回来。它的等时性决定了手表走时的精度。');
  hairspring = hg;
}

/* ================= 夹板与桥 ================= */
{
  const g = new THREE.Group();

  // 条盒轮上方轴承桥
  const bb = cyl(2.3, 0.6, MAT.brassDark, 32);
  bb.rotation.x = Math.PI / 2;
  bb.position.set(P.barrel.x, P.barrel.y, 5.3);
  g.add(bb);
  const bj = cyl(0.55, 0.3, MAT.ruby, 16);
  bj.rotation.x = Math.PI / 2;
  bj.position.set(P.barrel.x, P.barrel.y, 5.75);
  g.add(bj);

  // 轮系桥（跨过三轮与四号轮轴的小型桥）
  for (const pk of [P.third, P.fourth]) {
    const end = cyl(1.05, 0.55, MAT.brassDark, 24);
    end.rotation.x = Math.PI / 2;
    end.position.set(pk.x, pk.y, 6.3);
    g.add(end);
    const jw = cyl(0.45, 0.3, MAT.ruby, 16);
    jw.rotation.x = Math.PI / 2;
    jw.position.set(pk.x, pk.y, 6.72);
    g.add(jw);
  }
  {
    const mid = P.third.clone().add(P.fourth).multiplyScalar(0.5);
    const dir = P.fourth.clone().sub(P.third);
    const ang = Math.atan2(dir.y, dir.x);
    const bar = new THREE.Mesh(new THREE.BoxGeometry(dir.length(), 0.9, 0.4), MAT.brassDark);
    bar.position.set(mid.x, mid.y, 6.2);
    bar.rotation.z = ang;
    g.add(bar);
  }

  // 摆轮桥（摆轮夹板）：从摆轮向外侧（远离机芯中心）伸展
  const outDir = polar(1, angleTo(CENTER.clone().setZ(0), P.balance));
  const cock = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.3, 0.55), MAT.brassDark);
  cock.position.set(P.balance.x + outDir.x * 3.6, P.balance.y + outDir.y * 3.6, 11.1);
  cock.rotation.z = Math.atan2(outDir.y, outDir.x);
  g.add(cock);
  const bjw = cyl(0.5, 0.35, MAT.ruby, 16);
  bjw.rotation.x = Math.PI / 2;
  bjw.position.set(P.balance.x, P.balance.y, 11.55);
  g.add(bjw);

  scene.add(g);
  registerPart(g, 'bridges', '夹板 / 宝石轴承', 'Bridges & Jewels',
    '黄铜桥板把各轴压紧在固定位置，轴孔中的红宝石轴承（人造刚玉）把摩擦降到极低，是机芯耐用与精准的关键。');
}

/* ================= 交互：点击 / 触摸选择零件 ================= */
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let selected = null;

const panel = document.getElementById('info');
const panelName = document.getElementById('info-name');
const panelEn = document.getElementById('info-en');
const panelDesc = document.getElementById('info-desc');

function setSelected(part) {
  if (selected) {
    for (const m of selected.mats) m.emissive.setHex(0x000000);
  }
  selected = part;
  if (part) {
    for (const m of part.mats) m.emissive.setHex(0x7a3c08);
    panelName.textContent = part.cn;
    panelEn.textContent = part.en;
    panelDesc.textContent = part.desc;
    panel.classList.add('show');
  } else {
    panel.classList.remove('show');
  }
}

document.getElementById('info-close').addEventListener('click', () => setSelected(null));

let downPos = null;
renderer.domElement.addEventListener('pointerdown', (e) => {
  downPos = [e.clientX, e.clientY];
});
renderer.domElement.addEventListener('pointerup', (e) => {
  if (!downPos) return;
  const dx = e.clientX - downPos[0], dy = e.clientY - downPos[1];
  downPos = null;
  if (dx * dx + dy * dy > 36) return; // 拖动不算点击
  pointer.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(scene.children, true);
  for (const h of hits) {
    let o = h.object;
    while (o && !o.userData.part) o = o.parent;
    if (o) { setSelected(o.userData.part); return; }
  }
  setSelected(null);
});

renderer.domElement.addEventListener('pointermove', (e) => {
  if (e.pointerType !== 'mouse') return;
  pointer.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(scene.children, true);
  let over = false;
  for (const h of hits) {
    let o = h.object;
    while (o && !o.userData.part) o = o.parent;
    if (o) { over = true; break; }
  }
  renderer.domElement.style.cursor = over ? 'pointer' : 'grab';
});

/* ================= 动画循环 ================= */
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const t = Math.min(clock.getElapsedTime(), 3600);

  gears.barrel.rotation.z = TH0.barrel + W_BARREL * t;
  gears.center.rotation.z = TH0.center + W_CENTER * t;
  gears.third.rotation.z = TH0.third + W_THIRD * t;
  gears.fourth.rotation.z = TH0.fourth + W_FOURTH * t;
  gears.escape.rotation.z = TH0.escape + escapeAngle(t);
  gears.fork.rotation.z = gears.fork.userData.baseRot + forkAngle(t);
  gears.balance.rotation.z = balAngle(t);

  // 游丝轻微"呼吸"
  const b = 1 + 0.02 * Math.cos(2 * Math.PI * t / PERIOD);
  hairspring.scale.set(b, b, 1);

  controls.update();
  renderer.render(scene, camera);
}
animate();

// 供自动化测试调整视角
window.__view = { camera, controls };


addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  fitCamera();
});
