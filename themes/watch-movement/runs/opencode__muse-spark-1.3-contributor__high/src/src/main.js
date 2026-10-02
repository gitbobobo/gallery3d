import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import './style.css';

/* ============ 基础参数：真实传动比 ============ */
const TEETH = { barrel: 96, centerPinion: 12, centerWheel: 75, thirdPinion: 10, thirdWheel: 70, fourthPinion: 10, fourthWheel: 60, escapePinion: 8, escapeWheel: 15 };
const MODULE = 0.065;                 // 所有齿轮统一模数，保证正确咬合
const pitchR = (z) => (MODULE * z) / 2;
const BAL_FREQ = 2;                   // 摆轮 2 Hz
const BEATS_PER_SEC = BAL_FREQ * 2;   // 4 beats/s = 14400 vph
const ESC_PITCH = (Math.PI * 2) / TEETH.escapeWheel;
const BAL_AMP = THREE.MathUtils.degToRad(250);
const PALLET_AMP = THREE.MathUtils.degToRad(9);

const PARTS = {
  overview: { name: '机械表机芯', en: 'Mechanical Calibre · Running', teeth: '—', ratio: '3150 : 1', rpm: '—',
    desc: '发条盒 → 中央轮 → 三轮 → 四轮 → 擒纵轮 → 擒纵叉 → 摆轮。整列轮系按真实齿数比传动，擒纵轮被擒纵叉锁放、每次跳动一齿，摆轮以 2Hz 来回摆动。拖动旋转、滚轮缩放，点击任意零件查看说明。' },
  barrel: { name: '发条盒', en: 'Barrel · Mainspring', teeth: '96 齿', ratio: '主动轮', rpm: '0.005°/s 级',
    desc: '储存能量的“油箱”。盒内盘绕着发条，上弦后缓慢释放，以约 3 小时转一圈的速度驱动中央轮轴齿。是全表唯一的动力来源。' },
  center: { name: '中央轮', en: 'Center Wheel', teeth: '轮 75 / 轴齿 12', ratio: '8 : 1', rpm: '约 0.04 转/分',
    desc: '与分针同轴的轮子。轴齿 12 被发条盒 96 齿推动（减速 8 倍），本轮 75 齿再去推三轮轴齿。它的转速接近 1 转/小时。' },
  third: { name: '三轮', en: 'Third Wheel', teeth: '轮 70 / 轴齿 10', ratio: '7.5 : 1', rpm: '约 0.3 转/分',
    desc: '中间过渡轮。把中央轮的转矩继续加速 7.5 倍后传给四轮，同时把轮系折返布满夹板，是机芯布局呈 S 形的原因。' },
  fourth: { name: '四轮', en: 'Fourth Wheel', teeth: '轮 60 / 轴齿 10', ratio: '7 : 1', rpm: '约 2.1 转/分',
    desc: '通常-long 秒针就装在它的轴上。本轮 60 齿驱动擒纵轮轴齿 8 齿（加速 7.5 倍），转速约 28 秒一圈，肉眼可见地匀速转动。' },
  escape: { name: '擒纵轮', en: 'Escape Wheel · 15 齿', teeth: '轮 15 / 轴齿 8', ratio: '7.5 : 1 · 步进', rpm: '平均 16 转/分',
    desc: '用特殊尖齿切割的钢轮。平时被擒纵叉的红宝石锁住，摆轮每次摆过中心就放行一齿（24°），发出“滴答”——走时的最小时间单位在这里产生。' },
  pallet: { name: '擒纵叉', en: 'Pallet Fork', teeth: '进瓦 / 出瓦', ratio: '±9° 摆动', rpm: '4 拍/秒',
    desc: '连接擒纵轮与摆轮的“开关”。两颗红宝石托钻交替锁住/释放擒纵轮，并把擒纵轮的冲量传给摆轮，维持摆轮不停摆动。' },
  balance: { name: '摆轮 · 游丝', en: 'Balance · Hairspring 2Hz', teeth: '摆幅 ±250°', ratio: '14400 次/时', rpm: '2 Hz 全振动',
    desc: '机芯的心脏。摆轮在游丝作用下以每秒 2 个全周期来回摆动，周期稳定即走时准确。叉瓦拨动它、它反过来控制叉瓦的锁放。' },
  plate: { name: '主夹板 · 宝石轴承', en: 'Mainplate · Jewels', teeth: '17 石', ratio: '基础', rpm: '—',
    desc: '所有零件的地基。金色圈是防震器与托钻（人造红宝石），把金属轴尖的滑动摩擦变成宝石上的微小转动，几十年不磨损。' },
};

/* ============ 渲染器 / 场景 ============ */
const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.domElement.id = 'scene';
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0c0d10);
scene.fog = new THREE.Fog(0x0c0d10, 26, 60);

const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.1, 200);
camera.position.set(7.6, 9.2, 11.8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0.1, 1.3, 0.7);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 3.2;
controls.maxDistance = 30;
controls.maxPolarAngle = Math.PI * 0.55;

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const key = new THREE.DirectionalLight(0xfff2dd, 2.2);
key.position.set(6, 12, 5);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.left = -10; key.shadow.camera.right = 10;
key.shadow.camera.top = 10; key.shadow.camera.bottom = -10;
key.shadow.bias = -0.0004;
scene.add(key);
const rim = new THREE.DirectionalLight(0x8fb4ff, 0.9);
rim.position.set(-7, 5, -6);
scene.add(rim);
scene.add(new THREE.AmbientLight(0xffffff, 0.25));

/* 地面阴影 */
{
  const g = new THREE.Mesh(
    new THREE.CircleGeometry(16, 64),
    new THREE.ShadowMaterial({ opacity: 0.35 })
  );
  g.rotation.x = -Math.PI / 2; g.position.y = -0.85; g.receiveShadow = true;
  scene.add(g);
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(16, 64),
    new THREE.MeshStandardMaterial({ color: 0x101216, roughness: 0.95, metalness: 0 })
  );
  disc.rotation.x = -Math.PI / 2; disc.position.y = -0.86;
  scene.add(disc);
}

/* ============ 材质（每零件克隆一份，方便选中高亮） ============ */
function metal(color, rough = 0.32, met = 1.0) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: met });
}
const MAT = {
  brass: () => metal(0xcfa14a, 0.3, 1.0),
  brassDark: () => metal(0x9a742e, 0.42, 1.0),
  steel: () => metal(0xd6d9de, 0.24, 1.0),
  steelDark: () => metal(0x8b9097, 0.4, 1.0),
  blued: () => metal(0x2e5aa8, 0.28, 0.95),
  ruby: () => new THREE.MeshStandardMaterial({ color: 0xb8002e, roughness: 0.15, metalness: 0.2, emissive: 0x550011, emissiveIntensity: 0.7 }),
  plate: () => metal(0xb3a88f, 0.5, 0.9),
  plateDark: () => metal(0x6f675a, 0.6, 0.8),
};

/* 日内瓦条纹：代码生成的 Canvas 贴图（非下载素材） */
function genevaTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 512;
  const x = c.getContext('2d');
  x.fillStyle = '#b3a88f'; x.fillRect(0, 0, 512, 512);
  for (let i = -8; i < 16; i++) {
    const g = x.createLinearGradient(i * 64, 0, i * 64 + 64, 0);
    g.addColorStop(0, 'rgba(255,255,255,.14)'); g.addColorStop(0.5, 'rgba(0,0,0,.10)'); g.addColorStop(1, 'rgba(255,255,255,.12)');
    x.fillStyle = g;
    x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64 + 64, 0); x.lineTo(i * 64 + 32, 512); x.lineTo(i * 64 - 32, 512); x.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2, 2);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ============ 齿轮几何 ============ */
function spurGearGeometry(teeth, mod, thick, opts = {}) {
  const r = (mod * teeth) / 2;
  const add = mod * (opts.addK ?? 0.85);
  const ded = mod * (opts.dedK ?? 1.0);
  const ro = r + add, rr = r - ded;
  const rimInner = opts.rimInner ?? r * 0.72;
  const pitch = (Math.PI * 2) / teeth;
  const rootHalf = pitch * (opts.rootHalf ?? 0.30);
  const tipHalf = pitch * (opts.tipHalf ?? 0.14);
  const shape = new THREE.Shape();
  for (let i = 0; i < teeth; i++) {
    const a = i * pitch;
    const pts = [
      [rr, a - rootHalf], [rr, a - rootHalf * 0.9],
      [ro, a - tipHalf], [ro, a + tipHalf],
      [rr, a + rootHalf],
    ];
    for (const [rad, ang] of pts) {
      const px = Math.cos(ang) * rad, py = Math.sin(ang) * rad;
      if (i === 0 && ang === a - rootHalf) shape.moveTo(px, py);
      else shape.lineTo(px, py);
    }
    // 齿根圆弧过渡到下一齿
    const a2 = a + pitch - rootHalf;
    const segs = 2;
    for (let s = 1; s <= segs; s++) {
      const ang = a + rootHalf + ((a2 - a - rootHalf) * s) / segs;
      shape.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr);
    }
  }
  shape.closePath();
  if (rimInner > 0) {
    const hole = new THREE.Path();
    hole.absarc(0, 0, rimInner, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thick, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 1, curveSegments: 4,
  });
  geo.translate(0, 0, -thick / 2);
  return { geo, r, ro, rr };
}

function solidPinionGeometry(teeth, mod, thick) {
  const r = (mod * teeth) / 2;
  const ro = r + mod * 0.7, rr = Math.max(0.06, r - mod * 0.9);
  const pitch = (Math.PI * 2) / teeth;
  const shape = new THREE.Shape();
  for (let i = 0; i < teeth; i++) {
    const a = i * pitch;
    const seq = [[rr, a - pitch * 0.28], [ro, a - pitch * 0.12], [ro, a + pitch * 0.12], [rr, a + pitch * 0.28]];
    for (const [rad, ang] of seq) {
      const px = Math.cos(ang) * rad, py = Math.sin(ang) * rad;
      if (i === 0 && ang === seq[0][1]) shape.moveTo(px, py);
      else shape.lineTo(px, py);
    }
  }
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, { depth: thick, bevelEnabled: false, curveSegments: 3 });
  geo.translate(0, 0, -thick / 2);
  return { geo, r, ro, rr };
}

function escapeWheelGeometry(teeth, rootR, tipR, thick) {
  const shape = new THREE.Shape();
  const pitch = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * pitch;
    // 尖齿：缓升前缘 + 陡直后缘（典型擒纵轮）
    const aBase0 = a - pitch * 0.42, aTip = a + pitch * 0.10, aBack = a + pitch * 0.22;
    const seq = [
      [rootR, aBase0],
      [rootR * 1.02, a + pitch * 0.02],
      [tipR, aTip],
      [rootR, aBack],
    ];
    for (const [rad, ang] of seq) {
      const px = Math.cos(ang) * rad, py = Math.sin(ang) * rad;
      if (i === 0 && ang === aBase0) shape.moveTo(px, py);
      else shape.lineTo(px, py);
    }
    const aNext = a + pitch - pitch * 0.42;
    for (let s = 1; s <= 3; s++) {
      const ang = aBack + ((aNext - aBack) * s) / 3;
      shape.lineTo(Math.cos(ang) * rootR, Math.sin(ang) * rootR);
    }
  }
  shape.closePath();
  const hole = new THREE.Path();
  hole.absarc(0, 0, rootR * 0.45, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: thick, bevelEnabled: false, curveSegments: 4 });
  geo.translate(0, 0, -thick / 2);
  return geo;
}

/* 把 XY 平面挤出的齿轮放平成绕 Y 旋转 */
function layFlat(mesh) {
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}
function wheelGroup(partId, mesh) {
  const g = new THREE.Group();
  g.userData.partId = partId;
  const holder = new THREE.Group();
  holder.add(mesh);
  g.add(holder);
  g.userData.spin = holder; // 实际自转的节点（绕本地 Z）
  return g;
}

/* ============ 轮系布局（距离 = 两节圆半径之和，保证咬合） ============ */
const R = {
  barrel: pitchR(TEETH.barrel), cp: pitchR(TEETH.centerPinion),
  cw: pitchR(TEETH.centerWheel), tp: pitchR(TEETH.thirdPinion),
  tw: pitchR(TEETH.thirdWheel), fp: pitchR(TEETH.fourthPinion),
  fw: pitchR(TEETH.fourthWheel), ep: pitchR(TEETH.escapePinion),
};
const D = {
  bc: R.barrel + R.cp, ct: R.cw + R.tp, tf: R.tw + R.fp, fe: R.fw + R.ep,
};
function place(from, dist, deg) {
  const a = THREE.MathUtils.degToRad(deg);
  return { x: from.x + Math.cos(a) * dist, z: from.z + Math.sin(a) * dist };
}
const P = {};
P.barrel = { x: -3.6, z: -2.1 };
P.center = place(P.barrel, D.bc, -4);
P.third = place(P.center, D.ct, 52);
P.fourth = place(P.third, D.tf, 152);
P.escape = place(P.fourth, D.fe, 32);
P.pallet = place(P.escape, 1.55, 52);
P.balance = place(P.pallet, 1.9, 48);

const Y = { barrel: 0.35, centerW: 1.02, thirdW: 1.62, fourthW: 2.2, escapeW: 2.2, pallet: 2.34, balance: 3.35 };

/* 咬合相位：从动轮 = -(Z主/Z从)*主动 + K */
function meshK(zDrive, zDriven, psi) {
  return ((zDrive + zDriven) / zDriven) * psi + Math.PI / zDriven;
}
function meshForward(drive, zDrive, zDriven, psi) {
  return -(zDrive / zDriven) * drive + meshK(zDrive, zDriven, psi);
}
function meshInverse(driven, zDrive, zDriven, psi) {
  const K = meshK(zDrive, zDriven, psi);
  return -((zDriven / zDrive) * (driven - K));
}
const psiOf = (a, b) => Math.atan2(-(b.z - a.z), b.x - a.x);
const PSI = {
  bc: psiOf(P.barrel, P.center),
  ct: psiOf(P.center, P.third),
  tf: psiOf(P.third, P.fourth),
  fe: psiOf(P.fourth, P.escape),
};

/* ============ 建造 ============ */
const movement = new THREE.Group();
scene.add(movement);
const pickables = [];
function tag(group, partId) {
  group.userData.partId = partId;
  group.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.userData.partId = partId; pickables.push(o); } });
}

/* 主夹板 */
{
  const g = new THREE.Group(); g.userData.partId = 'plate';
  const tex = genevaTexture();
  const plateMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, metalness: 0.85 });
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(6.9, 6.9, 0.5, 96), plateMat);
  plate.position.y = -0.35; plate.receiveShadow = true;
  g.add(plate);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(6.9, 0.12, 16, 128), MAT.brassDark());
  ring.rotation.x = Math.PI / 2; ring.position.y = -0.1;
  g.add(ring);
  // 装饰柱 / 螺丝
  const screwMat = MAT.steel();
  [[-5.6, -4.2], [5.6, -4.4], [-5.8, 4.6], [5.9, 4.2]].forEach(([x, z]) => {
    const s = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.14, 24), screwMat);
    s.position.set(x, -0.02, z); g.add(s);
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.02, 0.05), new THREE.MeshStandardMaterial({ color: 0x222222 }));
    slot.position.set(x, 0.055, z); slot.rotation.y = Math.atan2(x, z); g.add(slot);
  });
  movement.add(g); tag(g, 'plate');
}

/* 宝石轴承 */
function jewel(x, y, z, r = 0.16) {
  const g = new THREE.Group();
  const chaton = new THREE.Mesh(new THREE.TorusGeometry(r, r * 0.35, 12, 32), MAT.brass());
  chaton.rotation.x = Math.PI / 2;
  const stone = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.72, r * 0.72, 0.06, 24), MAT.ruby());
  g.add(chaton, stone);
  g.position.set(x, y, z);
  return g;
}

/* 发条盒 */
let barrelSpin, barrelDrum;
{
  const g = new THREE.Group(); g.position.set(P.barrel.x, 0, P.barrel.z); g.userData.partId = 'barrel';
  const brass = MAT.brass(), brassD = MAT.brassDark(), steel = MAT.steelDark();
  const { geo } = spurGearGeometry(TEETH.barrel, MODULE, 0.42, { rimInner: 0 });
  const teethMesh = new THREE.Mesh(geo, brass);
  layFlat(teethMesh); teethMesh.position.y = Y.barrel;
  const spin = new THREE.Group(); spin.add(teethMesh); g.add(spin);
  barrelSpin = spin;
  barrelDrum = new THREE.Mesh(new THREE.CylinderGeometry(R.barrel * 0.86, R.barrel * 0.86, 0.5, 72), brassD);
  barrelDrum.position.y = Y.barrel + 0.32; spin.add(barrelDrum);
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(R.barrel * 0.86, R.barrel * 0.86, 0.06, 72), brass);
  lid.position.y = Y.barrel + 0.6; spin.add(lid);
  // 发条：平面阿基米德螺旋（Tube）
  const pts = [];
  for (let i = 0; i <= 220; i++) {
    const t = i / 220, a = t * Math.PI * 2 * 5.2, rr = 0.3 + t * (R.barrel * 0.72 - 0.3);
    pts.push(new THREE.Vector3(Math.cos(a) * rr, 0, Math.sin(a) * rr));
  }
  const spring = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 220, 0.022, 6, false),
    MAT.steelDark()
  );
  spring.position.y = Y.barrel + 0.66;
  // 发条不随盒转（简化：随盒缓慢转，视觉几乎不动）
  const arbor = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.4, 20), steel);
  arbor.position.y = Y.barrel + 0.3; g.add(arbor);
  const sq = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.24), steel);
  sq.position.y = Y.barrel + 1.05; g.add(sq);
  spin.add(spring);
  const j = jewel(0, Y.barrel + 0.68, 0, 0.2); g.add(j);
  movement.add(g); tag(g, 'barrel');
}

/* 通用：同轴轮组（大轮 + 小轴齿） */
function coaxialWheel(partId, pos, zWheel, zPinion, yWheel, yPinion, opts = {}) {
  const g = new THREE.Group(); g.position.set(pos.x, 0, pos.z); g.userData.partId = partId;
  const spin = new THREE.Group(); g.add(spin);
  const wheelMat = opts.wheelMat ?? MAT.brass();
  const steelMat = MAT.steel();
  const wg = spurGearGeometry(zWheel, MODULE, opts.thick ?? 0.22, { rimInner: pitchR(zWheel) * (opts.rimK ?? 0.68) });
  const wm = new THREE.Mesh(wg.geo, wheelMat);
  layFlat(wm); wm.position.y = yWheel; spin.add(wm);
  // 轮辐
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.3, 20), steelMat);
  hub.position.y = yWheel; spin.add(hub);
  const nSp = opts.spokes ?? 4;
  for (let i = 0; i < nSp; i++) {
    const sp = new THREE.Mesh(new THREE.BoxGeometry(pitchR(zWheel) * 0.72, 0.09, 0.16), wheelMat);
    const a = (i / nSp) * Math.PI * 2;
    sp.position.set(Math.cos(a) * pitchR(zWheel) * 0.38, yWheel, -Math.sin(a) * pitchR(zWheel) * 0.38);
    sp.rotation.y = a;
    spin.add(sp);
  }
  const pg = solidPinionGeometry(zPinion, MODULE, 0.5);
  const pm = new THREE.Mesh(pg.geo, steelMat);
  layFlat(pm); pm.position.y = yPinion; spin.add(pm);
  const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, yWheel - yPinion + 1.2, 12), MAT.steelDark());
  staff.position.y = (yWheel + yPinion) / 2; spin.add(staff);
  const j = jewel(0, yWheel + 0.18, 0, 0.15); g.add(j);
  movement.add(g); tag(g, partId);
  return spin;
}

const centerSpin = coaxialWheel('center', P.center, TEETH.centerWheel, TEETH.centerPinion, Y.centerW, Y.barrel, { spokes: 4 });
const thirdSpin = coaxialWheel('third', P.third, TEETH.thirdWheel, TEETH.thirdPinion, Y.thirdW, Y.centerW, { spokes: 4 });
const fourthSpin = coaxialWheel('fourth', P.fourth, TEETH.fourthWheel, TEETH.fourthPinion, Y.fourthW, Y.thirdW, { spokes: 4, wheelMat: MAT.steel() });
/* 四轮轴上加秒针，方便看出转动 */
{
  const hand = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.03, 0.07), MAT.blued());
  hand.position.set(P.fourth.x + 0.55, Y.fourthW + 0.25, P.fourth.z);
  hand.geometry.translate(0.3, 0, 0);
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.05, 20), MAT.blued());
  tail.position.set(P.fourth.x, Y.fourthW + 0.25, P.fourth.z);
  const hg = new THREE.Group(); hg.userData.partId = 'fourth';
  hg.add(hand, tail);
  // 秒针跟随四轮：每帧同步 rotation
  hg.userData.follow = fourthSpin;
  movement.add(hg); tag(hg, 'fourth');
  var secondHand = hg;
}

/* 擒纵轮 */
let escapeSpin;
{
  const g = new THREE.Group(); g.position.set(P.escape.x, 0, P.escape.z); g.userData.partId = 'escape';
  const spin = new THREE.Group(); g.add(spin); escapeSpin = spin;
  const steel = MAT.steel();
  const eg = escapeWheelGeometry(TEETH.escapeWheel, 0.62, 1.02, 0.14);
  const em = new THREE.Mesh(eg, steel);
  layFlat(em); em.position.y = Y.escapeW; spin.add(em);
  for (let i = 0; i < 4; i++) {
    const sp = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.05, 0.1), steel);
    const a = (i / 4) * Math.PI * 2 + 0.4;
    sp.position.set(Math.cos(a) * 0.3, Y.escapeW, -Math.sin(a) * 0.3); sp.rotation.y = a;
    spin.add(sp);
  }
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.2, 16), steel);
  hub.position.y = Y.escapeW; spin.add(hub);
  const pg = solidPinionGeometry(TEETH.escapePinion, MODULE, 0.45);
  const pm = new THREE.Mesh(pg.geo, MAT.steelDark());
  layFlat(pm); pm.position.y = Y.escapeW; spin.add(pm);
  const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.4, 12), MAT.steelDark());
  staff.position.y = Y.escapeW - 0.2; spin.add(staff);
  const j = jewel(0, Y.escapeW + 0.16, 0, 0.14); g.add(j);
  movement.add(g); tag(g, 'escape');
}

/* 擒纵叉 */
let palletSpin;
{
  const g = new THREE.Group(); g.position.set(P.pallet.x, 0, P.pallet.z); g.userData.partId = 'pallet';
  const spin = new THREE.Group(); spin.position.y = Y.pallet; g.add(spin); palletSpin = spin;
  const steel = MAT.steel();
  // 叉身：梯形挤出
  const s = new THREE.Shape();
  const dir = Math.atan2(-(P.escape.z - P.pallet.z), P.escape.x - P.pallet.x); // 朝向擒纵轮
  const L = 1.55;
  s.moveTo(0, -0.09); s.lineTo(L, -0.16); s.lineTo(L, 0.16); s.lineTo(0, 0.09); s.closePath();
  const bodyGeo = new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: false });
  bodyGeo.translate(0, 0, -0.06);
  const body = new THREE.Mesh(bodyGeo, steel);
  body.rotation.x = 0; // 保持在 XZ? 形状在 XY，需放平
  body.rotation.x = 0;
  const holder = new THREE.Group();
  const flat = new THREE.Mesh(bodyGeo, steel);
  flat.rotation.x = -Math.PI / 2; flat.position.y = 0;
  holder.add(flat);
  // 让叉身指向擒纵轮
  holder.rotation.y = -dir;
  spin.add(holder);
  // 进瓦 / 出瓦（红宝石）
  const ruby = MAT.ruby();
  const inStone = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.3), ruby);
  const outStone = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.3), ruby);
  const a1 = -dir;
  inStone.position.set(Math.cos(a1) * (L - 0.15), 0, -Math.sin(a1) * (L - 0.15));
  inStone.rotation.y = a1 + 0.5;
  outStone.position.set(Math.cos(a1) * (L - 0.55), 0.02, -Math.sin(a1) * (L - 0.55) + 0.22);
  outStone.rotation.y = a1 - 0.5;
  spin.add(inStone, outStone);
  // 叉头叉口（朝摆轮）
  const forkDir = Math.atan2(-(P.balance.z - P.pallet.z), P.balance.x - P.pallet.x);
  const forkArm = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.1, 0.12), steel);
  forkArm.position.set(Math.cos(forkDir) * 0.55, 0, -Math.sin(forkDir) * 0.55);
  forkArm.rotation.y = forkDir;
  spin.add(forkArm);
  const horn1 = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.1, 0.09), steel);
  horn1.position.set(Math.cos(forkDir) * 1.05, 0, -Math.sin(forkDir) * 1.05 + 0.12);
  horn1.rotation.y = forkDir + 0.35;
  const horn2 = horn1.clone();
  horn2.position.z -= 0.24; horn2.rotation.y = forkDir - 0.35;
  spin.add(horn1, horn2);
  const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.9, 12), MAT.steelDark());
  staff.position.y = -0.3; spin.add(staff);
  const j = jewel(0, 0.35, 0, 0.14); spin.add(j);
  movement.add(g); tag(g, 'pallet');
}

/* 摆轮 + 游丝 + 摆夹板 */
let balanceSpin, hairspringMesh, rollerJewel;
{
  const g = new THREE.Group(); g.position.set(P.balance.x, 0, P.balance.z); g.userData.partId = 'balance';
  const spin = new THREE.Group(); spin.position.y = Y.balance; g.add(spin); balanceSpin = spin;
  const gold = MAT.brass();
  const rimT = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.13, 18, 96), gold);
  rimT.rotation.x = Math.PI / 2; spin.add(rimT);
  // 配重螺丝
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const sc = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.12, 12), MAT.steelDark());
    sc.position.set(Math.cos(a) * 1.28, 0, Math.sin(a) * 1.28);
    spin.add(sc);
  }
  for (let i = 0; i < 2; i++) {
    const a = (i / 2) * Math.PI + 0.3;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.07, 0.16), gold);
    arm.rotation.y = a; spin.add(arm);
  }
  const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.2, 12), MAT.steelDark());
  staff.position.y = -0.6; spin.add(staff);
  // 圆盘（双圆盘）+ 冲量宝石
  const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.1, 32), MAT.steelDark());
  roller.position.y = -1.05; spin.add(roller);
  rollerJewel = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.16, 12), MAT.ruby());
  rollerJewel.position.set(0.24, -1.05, 0); spin.add(rollerJewel);
  // 游丝：阿基米德螺旋 6 圈（不随摆轮整体转，只做呼吸）
  const pts = [];
  for (let i = 0; i <= 400; i++) {
    const t = i / 400, a = t * Math.PI * 2 * 6, rr = 0.18 + t * 0.85;
    pts.push(new THREE.Vector3(Math.cos(a) * rr, 0, Math.sin(a) * rr));
  }
  hairspringMesh = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 400, 0.014, 5, false),
    MAT.blued()
  );
  hairspringMesh.position.y = Y.balance + 0.45;
  g.add(hairspringMesh);
  const stud = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.2, 0.14), MAT.steelDark());
  stud.position.set(Math.cos(6 * Math.PI * 2) * 1.03, Y.balance + 0.45, Math.sin(6 * Math.PI * 2) * 1.03);
  g.add(stud);
  // 摆夹板：一条抛光桥板
  const bridgeShape = new THREE.Shape();
  bridgeShape.moveTo(-2.2, -0.4); bridgeShape.lineTo(0.6, -0.55); bridgeShape.absarc(0, 0, 0.62, -Math.PI / 2.4, Math.PI / 2.4, false);
  bridgeShape.lineTo(-2.2, 0.4); bridgeShape.closePath();
  const bridgeGeo = new THREE.ExtrudeGeometry(bridgeShape, { depth: 0.18, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 1 });
  const bridge = new THREE.Mesh(bridgeGeo, MAT.plate());
  bridge.rotation.x = -Math.PI / 2;
  bridge.position.set(-0.6, Y.balance + 0.95, 0.6);
  bridge.rotation.y = 0.5;
  bridge.castShadow = true;
  g.add(bridge);
  const bj = jewel(0, Y.balance + 0.9, 0, 0.17); g.add(bj);
  movement.add(g); tag(g, 'balance');
}

/* 轮系小桥板（两条细长桥，避免遮挡） */
{
  const mat = MAT.plate();
  function bar(a, b, y, w = 0.55) {
    const dx = b.x - a.x, dz = b.z - a.z;
    const len = Math.hypot(dx, dz) + 1.2;
    const m = new THREE.Mesh(new THREE.BoxGeometry(len, 0.16, w), mat);
    m.position.set((a.x + b.x) / 2, y, (a.z + b.z) / 2);
    m.rotation.y = -Math.atan2(dz, dx);
    m.castShadow = true; m.receiveShadow = true;
    const g = new THREE.Group(); g.userData.partId = 'plate'; g.add(m);
    movement.add(g); tag(g, 'plate');
  }
  bar(P.center, P.third, Y.centerW + 0.55);
  bar(P.third, P.fourth, Y.thirdW + 0.55);
}

/* ============ UI ============ */
const ui = document.createElement('div');
ui.innerHTML = `
<div class="hud-top">
  <div class="title">
    <h1><span class="dot">●</span> 机械表机芯 · 3D 运转</h1>
    <p>发条盒 → 轮系 → 擒纵 → 摆轮，全链路按真实齿数比啮合。摆轮 2Hz（14400vph），擒纵轮每拍跳一齿。</p>
    <div class="spec"><span>96/12 · 75/10 · 70/10 · 60/8</span><span>总减速 3150:1</span><span>擒纵 15 齿</span></div>
  </div>
  <div class="beat" id="beat"><i></i><span id="beatTxt">4 拍/秒 · 滴答</span></div>
</div>
<div class="train">
  <div class="t">TRANSMISSION · 传动链</div>
  <div>发条盒 <b>96</b> → 中央 <b>12/75</b> → 三轮 <b>10/70</b></div>
  <div>→ 四轮 <b>10/60</b> → 擒纵 <b>8/15</b> → 叉 → 摆轮</div>
</div>
<div class="panel" id="panel">
  <h2 id="pName">整机概览</h2>
  <div class="en" id="pEn">click a part · 点击零件</div>
  <div class="desc" id="pDesc">${PARTS.overview.desc}</div>
  <div class="meta">
    <div><small>齿数</small><b id="pTeeth">—</b></div>
    <div><small>传动 / 转速</small><b id="pRatio">3150:1</b></div>
  </div>
  <div class="hint">🖱 拖动旋转 · 滚轮缩放 · 右键平移<br/>👆 点击发光零件查看名称与作用 · 📱 触摸可旋转缩放</div>
</div>
<div class="controls">
  <div class="ctrl-row">
    <button id="btnPlay" class="active">⏸ 暂停</button>
    <button id="btnSlow">🐌 擒纵慢放</button>
    <button id="btnOver">🔭 总览</button>
    <button id="btnEsc">🧭 擒纵特写</button>
    <button id="btnTag" class="active">🏷 标注</button>
  </div>
  <div class="ctrl-row">
    <span style="font-size:12px;color:var(--mut)">速度</span>
    <input type="range" id="speed" min="0" max="100" value="36" />
    <span class="speed-val" id="speedVal">1.0×</span>
  </div>
</div>
<div id="toast"></div>`;
app.appendChild(ui);
const style = document.createElement('style');
document.head.appendChild(style);

const tagLayer = document.createElement('div');
tagLayer.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:4;overflow:hidden;';
app.appendChild(tagLayer);

let selected = 'overview';
let prevMats = [];
function applySelect(id) {
  selected = id;
  // 恢复
  prevMats.forEach(([m, e, i]) => { m.emissive.setHex(e); m.emissiveIntensity = i; });
  prevMats = [];
  const info = PARTS[id] || PARTS.overview;
  document.getElementById('pName').textContent = info.name;
  document.getElementById('pEn').textContent = info.en;
  document.getElementById('pDesc').textContent = info.desc;
  document.getElementById('pTeeth').textContent = info.teeth;
  document.getElementById('pRatio').textContent = info.ratio + (info.rpm && info.rpm !== '—' ? ' · ' + info.rpm : '');
  // 高亮
  if (id !== 'overview') {
    movement.traverse((o) => {
      if (o.isMesh && o.userData.partId === id && o.material && o.material.emissive) {
        const m = o.material;
        prevMats.push([m, m.emissive.getHex(), m.emissiveIntensity]);
        m.emissive.setHex(0x8a6414); m.emissiveIntensity = 0.55;
      }
    });
  }
  document.querySelectorAll('.tag3d').forEach((el) => el.classList.toggle('sel', el.dataset.id === id));
}
applySelect('overview');

/* 3D 标注 */
const labelDefs = [
  ['barrel', P.barrel, 1.4], ['center', P.center, 1.0], ['third', P.third, 1.0],
  ['fourth', P.fourth, 1.0], ['escape', P.escape, 1.0], ['pallet', P.pallet, 0.8], ['balance', P.balance, 1.2],
];
const labelEls = labelDefs.map(([id, p, dy]) => {
  const el = document.createElement('div');
  el.className = 'tag3d'; el.dataset.id = id; el.textContent = PARTS[id].name;
  el.style.display = 'block';
  tagLayer.appendChild(el);
  return { id, p, dy, el };
});
let showTags = true;
const v3 = new THREE.Vector3();
function updateTags() {
  labelEls.forEach(({ id, p, dy, el }) => {
    if (!showTags) { el.style.display = 'none'; return; }
    v3.set(p.x, (id === 'balance' ? Y.balance + 1.4 : id === 'barrel' ? 1.6 : 2.6) + dy * 0.3, p.z);
    v3.project(camera);
    if (v3.z > 1 || v3.z < -1) { el.style.display = 'none'; return; }
    el.style.display = 'block';
    el.style.left = ((v3.x * 0.5 + 0.5) * innerWidth) + 'px';
    el.style.top = ((-v3.y * 0.5 + 0.5) * innerHeight) + 'px';
    el.classList.toggle('sel', id === selected);
  });
}

/* 点击选中（区分拖动与点击） */
const ray = new THREE.Raycaster();
const ptr = new THREE.Vector2();
let downX = 0, downY = 0;
renderer.domElement.addEventListener('pointerdown', (e) => { downX = e.clientX; downY = e.clientY; });
renderer.domElement.addEventListener('pointerup', (e) => {
  if (Math.hypot(e.clientX - downX, e.clientY - downY) > 7) return;
  ptr.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(ptr, camera);
  const hits = ray.intersectObjects(pickables, false);
  if (hits.length) {
    const id = hits[0].object.userData.partId || 'overview';
    applySelect(id);
    toast(PARTS[id].name + ' · ' + PARTS[id].en);
  } else applySelect('overview');
});
let toastTimer = 0;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.style.display = 'block';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.style.display = 'none'), 1400);
}

/* 控制 */
let playing = true, speed = 1.0;
let camGoal = null;
const btnPlay = document.getElementById('btnPlay');
btnPlay.onclick = () => {
  playing = !playing;
  btnPlay.textContent = playing ? '⏸ 暂停' : '▶ 运转';
  btnPlay.classList.toggle('active', playing);
};
const speedInput = document.getElementById('speed');
const speedVal = document.getElementById('speedVal');
function sliderToSpeed(v) { return 0.1 * Math.pow(600, v / 100); }
speedInput.oninput = () => {
  speed = sliderToSpeed(+speedInput.value);
  speedVal.textContent = speed < 10 ? speed.toFixed(1) + '×' : Math.round(speed) + '×';
  document.getElementById('btnSlow').classList.toggle('active', Math.abs(speed - 0.15) < 0.03);
};
document.getElementById('btnSlow').onclick = (e) => {
  speed = 0.15; speedInput.value = String((Math.log(speed / 0.1) / Math.log(600)) * 100);
  speedVal.textContent = '0.2×'; e.currentTarget.classList.add('active');
  focusOn(P.escape, 4.2);
  toast('慢放 0.15×：看擒纵轮每次跳一齿');
};
document.getElementById('btnOver').onclick = () => focusOn({ x: 0.1, z: 0.7 }, null, new THREE.Vector3(7.6, 9.2, 11.8), new THREE.Vector3(0.1, 1.3, 0.7));
document.getElementById('btnEsc').onclick = () => { focusOn(P.escape, 4.5); toast('擒纵特写：拖动可旋转，滚轮可缩放'); };
document.getElementById('btnTag').onclick = (e) => {
  showTags = !showTags;
  e.currentTarget.classList.toggle('active', showTags);
};
function focusOn(p, dist = 5, pos = null, tgt = null) {
  if (!pos) {
    const dir = new THREE.Vector3(0.45, 0.75, 0.62).normalize();
    pos = new THREE.Vector3(p.x, 2.4, p.z).addScaledVector(dir, dist);
    tgt = new THREE.Vector3(p.x, 2.2, p.z);
  }
  camGoal = { pos, tgt };
}

/* ============ 动画：擒纵步进 + 轮系反推（保证咬合） ============ */
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
let simTime = 0, lastBeat = -1;
const clock = new THREE.Clock();
const beatEl = document.getElementById('beat');
let beatFlash = 0;

function escapeAngleAt(t) {
  const beats = t * BEATS_PER_SEC;
  const n = Math.floor(beats);
  const frac = beats - n;
  const adv = frac < 0.16 ? easeOut(frac / 0.16) : 1;
  return -((n + adv) * ESC_PITCH);
}

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  if (playing) simTime += dt * speed;

  // 摆轮 / 擒纵叉（同相位，叉做方波化急跳）
  const s = Math.sin(Math.PI * 2 * BAL_FREQ * simTime);
  balanceSpin.rotation.y = BAL_AMP * s;
  palletSpin.rotation.y = PALLET_AMP * Math.tanh(3.2 * s);
  // 游丝呼吸
  const breathe = 1 + 0.045 * s;
  hairspringMesh.scale.set(breathe, 1, breathe);
  hairspringMesh.rotation.y = 0.12 * s;

  // 擒纵轮步进 → 反推整列轮系（严格满足啮合方程）
  const esc = escapeAngleAt(simTime);
  escapeSpin.rotation.y = esc;
  const fourthA = meshInverse(esc, TEETH.fourthWheel, TEETH.escapePinion, PSI.fe);
  fourthSpin.rotation.y = fourthA;
  if (typeof secondHand !== 'undefined') {
    const dx = secondHand.children[0];
    // 秒针绕四轮中心：把针组旋转到 four 角度
    secondHand.rotation.y = 0;
    dx.parent.position.y = 0;
    secondHand.children[0].position.set(P.fourth.x, Y.fourthW + 0.25, P.fourth.z);
    secondHand.children[0].rotation.y = -fourthA + Math.PI / 2;
  }
  const thirdA = meshInverse(fourthA, TEETH.thirdWheel, TEETH.fourthPinion, PSI.tf);
  thirdSpin.rotation.y = thirdA;
  const centerA = meshInverse(thirdA, TEETH.centerWheel, TEETH.thirdPinion, PSI.ct);
  centerSpin.rotation.y = centerA;
  const barrelA = meshInverse(centerA, TEETH.barrel, TEETH.centerPinion, PSI.bc);
  barrelSpin.rotation.y = barrelA;

  // 滴答指示
  const beatIdx = Math.floor(simTime * BEATS_PER_SEC);
  if (beatIdx !== lastBeat) {
    lastBeat = beatIdx;
    beatFlash = 1;
    beatEl.classList.add('tick');
    setTimeout(() => beatEl.classList.remove('tick'), 90);
  }

  // 相机目标插值
  if (camGoal) {
    camera.position.lerp(camGoal.pos, 0.06);
    controls.target.lerp(camGoal.tgt, 0.08);
    if (camera.position.distanceTo(camGoal.pos) < 0.05) camGoal = null;
  }
  controls.update();
  updateTags();
  renderer.render(scene, camera);
}
animate();

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  // 竖屏手机拉远一点
  if (innerWidth < 760 && camera.position.length() < 14) {
    camera.position.multiplyScalar(1.15);
  }
});
// 手机竖屏初始拉远
if (innerWidth < 760) camera.position.multiplyScalar(1.25);
