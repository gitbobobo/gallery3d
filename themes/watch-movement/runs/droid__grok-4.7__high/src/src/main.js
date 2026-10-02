import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Swiss lever going train, 18 000 vibrations per hour.
 *
 *   barrel  90  →  centre pinion 15      6 : 1
 *   centre  80  →  third pinion  10      8 : 1     centre: 1 rev / hour
 *   third   75  →  fourth pinion 10      7.5 : 1   fourth: 1 rev / minute
 *   fourth  80  →  escape pinion  8     10 : 1     escape: 10 rev / minute
 *   escape  15 teeth × 2 vibrations  →  18 000 vph, five beats a second
 *
 * Screen time runs 60× fast so the slow wheels stay readable.
 * Centre distance of every mesh is pitch-radius(wheel) + pitch-radius(pinion).
 * A half-pitch phase offset seats each driving tooth in a driven gap.
 */

const TIME_SCALE = 60;
const BEATS = 5;
const AMPLITUDE = (230 * Math.PI) / 180;
const MODULE = 0.072;

const PARTS = {
  barrel: {
    name: "发条盒",
    en: "Mainspring Barrel",
    role: "盒壁里卷着发条。发条松开时推动齿圈，把储存的力矩送进轮系。盒身转得很慢，力矩却是整条传动链里最大的。",
    meta: ["齿圈 48", "约 6 小时一圈", "驱动中心轮轴齿"],
  },
  center: {
    name: "中心轮",
    en: "Centre Wheel",
    role: "轮系第一级，也是分针轮。它每小时正好转一圈。大齿轮咬住三轮的轴齿，把发条盒的慢转变成较快的转动。",
    meta: ["齿轮 40 · 轴齿 8", "1 圈 / 小时", "与三轮之比 8∶1"],
  },
  third: {
    name: "三轮",
    en: "Third Wheel",
    role: "中间加速轮，不带指针。它只负责再提高一档转速，把中心轮的每小时一圈，变成四轮的每分钟一圈。",
    meta: ["齿轮 45 · 轴齿 5", "8 圈 / 小时", "与四轮之比 7.5∶1"],
  },
  fourth: {
    name: "四轮",
    en: "Fourth Wheel",
    role: "秒轮。每分钟正好转一圈，轴上那根蓝钢针就是秒针。它咬住擒纵轮的轴齿，是能量进入擒纵机构前的最后一级。",
    meta: ["齿轮 50 · 轴齿 6", "1 圈 / 分钟", "与擒纵轮之比 10∶1"],
  },
  escape: {
    name: "擒纵轮",
    en: "Escape Wheel",
    role: "十五个马齿。擒纵叉每次放行一个齿，轮子前冲半步，齿面顺势推一下叉瓦，把能量交给摆轮。转一圈放行十五次。",
    meta: ["15 齿", "10 圈 / 分钟", "每齿对应两次摆动"],
  },
  pallet: {
    name: "擒纵叉",
    en: "Pallet Fork",
    role: "杠杆擒纵的开关。一边的叉瓦锁住擒纵轮，摆轮上的冲击钉拨动叉头，另一边的叉瓦才放开一个齿，并把这一推传回摆轮。",
    meta: ["进瓦 · 出瓦", "红宝石叉瓦", "摆幅约 ±9°"],
  },
  balance: {
    name: "摆轮",
    en: "Balance",
    role: "机芯的心脏。游丝把它拉回中心，惯性又让它冲过中心，于是来回摆动。每秒五个来回，整只表的快慢都由这个节拍决定。",
    meta: ["18,000 振 / 时", "振幅约 230°", "5 次 / 秒"],
  },
  hairspring: {
    name: "游丝",
    en: "Hairspring",
    role: "一条平面阿基米德螺线。内端固定在摆轴的内桩上，外端固定在摆夹板的外桩上。摆轮偏得越远，它拉回来的力矩越大。",
    meta: ["平面螺线", "内桩 · 外桩", "决定振动周期"],
  },
  bridge: {
    name: "夹板",
    en: "Bridges",
    role: "夹板把各轮轴的上枢轴压在红宝石轴承里。条板之间留出空隙，既能看见轮系，又让各轴保持平行、啮合深度不变。",
    meta: ["轮系夹板", "红宝石轴承", "烤蓝螺丝"],
  },
  plate: {
    name: "主夹板",
    en: "Main Plate",
    role: "整枚机芯的底板。所有轮轴的下枢轴都落在这块板上的宝石孔里，齿轮的中心距由这些孔的位置一次定死。",
    meta: ["镀铑黄铜", "珍珠圈", "沉头螺丝"],
  },
};

const app = document.getElementById("app");
app.innerHTML = `
  <div class="vignette"></div>
  <div class="hud">
    <div class="brand">
      <div class="kicker">Calibre 18000 · Swiss Lever</div>
      <h1>运转中的机芯</h1>
      <p>发条盒、中心轮、三轮、四轮与擒纵轮按齿数咬合。摆轮每秒来回五次，擒纵叉逐齿放行。</p>
    </div>
    <div class="rate">
      <div class="num" id="beat">18,000</div>
      <div class="sub" id="beat-sub">vph · 5 beat / s</div>
    </div>
    <div class="card">
      <h2 id="card-name"></h2>
      <div class="en" id="card-en"></div>
      <div class="role" id="card-role"></div>
      <div class="meta" id="card-meta"></div>
    </div>
    <div class="hint">拖动旋转 · 滚轮缩放<br>点击零件 · 空格暂停</div>
  </div>
`;

function setCard(id) {
  const p = PARTS[id];
  if (!p) return;
  document.getElementById("card-name").textContent = p.name;
  document.getElementById("card-en").textContent = p.en;
  document.getElementById("card-role").textContent = p.role;
  document.getElementById("card-meta").innerHTML = p.meta.map((m) => `<span>${m}</span>`).join("");
}
setCard("balance");

/* ------------------------------------------------------------------ scene */

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
app.prepend(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1612);
scene.fog = new THREE.Fog(0x1a1612, 16, 32);

const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.02, 60);
camera.position.set(0.2, 6.8, 2.4);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0, 0.15, 0);
controls.minDistance = 2.4;
controls.maxDistance = 12;
controls.maxPolarAngle = Math.PI * 0.72;
controls.minPolarAngle = 0.05;
controls.rotateSpeed = 0.7;
controls.zoomSpeed = 0.7;
controls.enablePan = false;

scene.add(new THREE.HemisphereLight(0xfff6ea, 0x5a4030, 0.95));
const key = new THREE.DirectionalLight(0xfff3e2, 1.7);
key.position.set(3, 6, 7);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.near = 2;
key.shadow.camera.far = 22;
key.shadow.camera.left = -5;
key.shadow.camera.right = 5;
key.shadow.camera.top = 5;
key.shadow.camera.bottom = -5;
key.shadow.bias = -0.0004;
scene.add(key);
const fill = new THREE.DirectionalLight(0x9eb6d4, 0.85);
fill.position.set(-5, 3, -2);
scene.add(fill);
const rim = new THREE.PointLight(0xffb56a, 12, 14, 2);
rim.position.set(-1.6, 2.2, 2.4);
scene.add(rim);
const under = new THREE.PointLight(0xffe0aa, 4, 8, 2);
under.position.set(1.2, -1.4, 1.2);
scene.add(under);

/* --------------------------------------------------------------- materials */

const brass = new THREE.MeshStandardMaterial({ color: 0xd7ae63, metalness: 0.78, roughness: 0.34 });
const brassDark = new THREE.MeshStandardMaterial({ color: 0xb08a4e, metalness: 0.65, roughness: 0.45 });
const steel = new THREE.MeshStandardMaterial({ color: 0xd5dbe0, metalness: 0.95, roughness: 0.22 });
const steelDark = new THREE.MeshStandardMaterial({ color: 0x8e979f, metalness: 0.9, roughness: 0.35 });
const rhodium = new THREE.MeshStandardMaterial({ color: 0xc8c4bc, metalness: 0.85, roughness: 0.34 });
const plateMat = new THREE.MeshStandardMaterial({ color: 0xc49262, metalness: 0.55, roughness: 0.46 });
const ruby = new THREE.MeshStandardMaterial({
  color: 0xc42538,
  metalness: 0.25,
  roughness: 0.18,
  emissive: 0x6a1020,
  emissiveIntensity: 0.55,
});
const blued = new THREE.MeshStandardMaterial({ color: 0x2a6eb8, metalness: 0.7, roughness: 0.28 });
const springSteel = new THREE.MeshStandardMaterial({ color: 0xe7eef2, metalness: 0.9, roughness: 0.2 });

const pickables = [];
function tag(obj, id) {
  obj.traverse((o) => {
    if (o.isMesh) {
      o.userData.part = id;
      o.castShadow = true;
      o.receiveShadow = true;
      pickables.push(o);
    }
  });
}

/* ------------------------------------------------------------------ gears */

const pitchR = (teeth) => (MODULE * teeth) / 2;

function gearShape(teeth, outer, root, hole = 0) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  const tip = step * 0.16;
  const flank = step * 0.07;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts = [
      [a - tip - flank, root],
      [a - tip, outer],
      [a + tip, outer],
      [a + tip + flank, root],
    ];
    pts.forEach(([ang, r], k) => {
      const x = Math.cos(ang) * r;
      const y = Math.sin(ang) * r;
      if (i === 0 && k === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
  }
  shape.closePath();
  if (hole > 0) {
    const h = new THREE.Path();
    h.absarc(0, 0, hole, 0, Math.PI * 2, true);
    shape.holes.push(h);
  }
  return shape;
}

function extrude(shape, depth) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: Math.min(0.008, depth * 0.3),
    bevelSize: 0.004,
    bevelSegments: 1,
    curveSegments: 1,
  });
  geo.translate(0, 0, -depth / 2);
  return geo;
}

function spokedWheel(teeth, radius, thick, spokes, mat, spokeMat) {
  const g = new THREE.Group();
  const addendum = Math.max(MODULE * 1.1, radius * 0.085);
  const root = radius - addendum * 0.2;
  const toothLen = addendum * 1.15;
  const toothWid = ((Math.PI * 2 * radius) / teeth) * 0.9;
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(toothLen, toothWid, thick * 1.05), mat);
    const rad = radius + toothLen * 0.15;
    tooth.position.set(Math.cos(a) * rad, Math.sin(a) * rad, 0);
    tooth.rotation.z = a;
    g.add(tooth);
  }
  const band = new THREE.Mesh(new THREE.RingGeometry(Math.max(0.06, root - addendum * 0.35), radius + 0.004, 64), mat);
  g.add(band);
  const hubR = Math.max(0.045, radius * 0.13);
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2 + 0.2;
    const len = root - hubR - 0.02;
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(len, 0.022, thick * 0.7), spokeMat);
    spoke.position.set(Math.cos(a) * (hubR + len / 2), Math.sin(a) * (hubR + len / 2), 0);
    spoke.rotation.z = a;
    g.add(spoke);
  }
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(hubR, hubR * 0.82, thick * 1.6, 16), spokeMat);
  hub.rotation.x = Math.PI / 2;
  g.add(hub);
  return g;
}

function pinionMesh(leaves, radius, length) {
  const g = new THREE.Group();
  const outer = radius + MODULE * 0.9;
  const root = Math.max(0.028, radius * 0.55);
  const leafWid = ((Math.PI * 2 * radius) / leaves) * 0.72;
  for (let i = 0; i < leaves; i++) {
    const a = (i / leaves) * Math.PI * 2;
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(outer - root, leafWid, length), steel);
    leaf.position.set(Math.cos(a) * ((outer + root) / 2), Math.sin(a) * ((outer + root) / 2), 0);
    leaf.rotation.z = a;
    g.add(leaf);
  }
  const core = new THREE.Mesh(new THREE.CylinderGeometry(root, root, length, 12), steelDark);
  core.rotation.x = Math.PI / 2;
  g.add(core);
  return g;
}

function axle(len, r = 0.02) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 10), steel);
  m.castShadow = true;
  return m;
}

function jewel(r = 0.04) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.75, 0.02, 14), ruby));
  const chaton = new THREE.Mesh(new THREE.TorusGeometry(r * 1.25, 0.008, 6, 16), brass);
  chaton.rotation.x = Math.PI / 2;
  g.add(chaton);
  return g;
}

function screw(r = 0.038) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.02, 6), blued));
  const slot = new THREE.Mesh(new THREE.BoxGeometry(r * 1.3, 0.008, 0.008), steelDark);
  slot.position.z = 0.008;
  g.add(slot);
  return g;
}

/* --------------------------------------------------------------- layout */

const train = {
  barrel: { teeth: 48, pinion: 0 },
  center: { teeth: 40, pinion: 8 },
  third: { teeth: 45, pinion: 5 },
  fourth: { teeth: 50, pinion: 6 },
  escape: { teeth: 15, pinion: 5 },
};
for (const k of Object.keys(train)) {
  train[k].r = pitchR(train[k].teeth);
  if (train[k].pinion) train[k].pr = pitchR(train[k].pinion);
}

function place(from, to, driver, driven, angle) {
  const dist = train[driver].r + train[driven].pr + MODULE * 0.15;
  train[to].x = train[from].x + Math.cos(angle) * dist;
  train[to].y = train[from].y + Math.sin(angle) * dist;
}
train.barrel.x = 0;
train.barrel.y = 0;
place("barrel", "center", "barrel", "center", -2.6);
place("center", "third", "center", "third", -0.15);
place("third", "fourth", "third", "fourth", 2.2);
place("fourth", "escape", "fourth", "escape", -1.15);

{
  const keys = Object.keys(train);
  const cx = keys.reduce((s, k) => s + train[k].x, 0) / keys.length;
  const cy = keys.reduce((s, k) => s + train[k].y, 0) / keys.length;
  keys.forEach((k) => {
    train[k].x -= cx;
    train[k].y -= cy;
  });
}

const movement = new THREE.Group();
scene.add(movement);
const arbors = {};

function arbor(id) {
  const root = new THREE.Group();
  root.position.set(train[id].x, train[id].y, 0);
  movement.add(root);
  arbors[id] = { root };
  return root;
}

/* barrel */

{
  const root = arbor("barrel");
  const r = train.barrel.r;
  const z = 0.42;
  const toothCount = train.barrel.teeth;
  for (let i = 0; i < toothCount; i++) {
    const a = (i / toothCount) * Math.PI * 2;
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.14, ((Math.PI * 2 * r) / toothCount) * 0.82, 0.05), brass);
    const rad = r - 0.02;
    tooth.position.set(Math.cos(a) * rad, Math.sin(a) * rad, z + 0.02);
    tooth.rotation.z = a;
    root.add(tooth);
  }
  const lip = new THREE.Mesh(new THREE.RingGeometry(r * 0.72, r * 0.9, 48), brassDark);
  lip.position.z = z - 0.005;
  root.add(lip);
  const drum = new THREE.Mesh(new THREE.TorusGeometry(r * 0.78, 0.028, 8, 36), brass);
  drum.position.z = z + 0.01;
  root.add(drum);
  const pts = [];
  for (let i = 0; i <= 160; i++) {
    const t = i / 160;
    const a = t * 6 * Math.PI * 2;
    const rad = 0.1 + t * r * 0.5;
    pts.push(new THREE.Vector3(Math.cos(a) * rad, Math.sin(a) * rad, 0));
  }
  const spring = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 160, 0.016, 5, false), springSteel);
  spring.position.z = 0.44;
  root.add(spring);
  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.32, 12), steelDark);
  core.position.z = 0.44;
  root.add(core);
  root.add(axle(0.55, 0.016));
  const j = jewel(0.036);
  j.position.z = 0.015;
  root.add(j);
  tag(root, "barrel");
}

function going(id, spokes, wheelZ, pinionZ) {
  const root = arbor(id);
  const wheel = spokedWheel(train[id].teeth, train[id].r, 0.055, spokes, brass, brassDark);
  wheel.position.z = wheelZ;
  root.add(wheel);
  const pinion = pinionMesh(train[id].pinion, train[id].pr, 0.07);
  pinion.position.z = pinionZ;
  root.add(pinion);
  const shaft = axle(wheelZ + 0.12, 0.014);
  shaft.position.z = wheelZ * 0.45;
  root.add(shaft);
  const j = jewel(0.032);
  j.position.z = 0.012;
  root.add(j);
  tag(root, id);
  arbors[id].wheelZ = wheelZ;
}

going("center", 5, 0.34, 0.2);
going("third", 5, 0.5, 0.34);
going("fourth", 6, 0.66, 0.5);

{
  const hand = new THREE.Group();
  const len = train.fourth.r * 0.85;
  const blade = new THREE.Mesh(new THREE.BoxGeometry(len, 0.012, 0.006), blued);
  blade.position.x = len * 0.4;
  hand.add(blade);
  const tail = new THREE.Mesh(new THREE.BoxGeometry(len * 0.28, 0.01, 0.005), blued);
  tail.position.x = -len * 0.16;
  hand.add(tail);
  hand.position.z = 0.74;
  arbors.fourth.root.add(hand);
}

/* escape: club teeth, drawn a touch larger than its pinion pitch so the
 * fork can reach the teeth. The pinion still meshes with the fourth wheel
 * at the true centre distance. */

function escapeShape(teeth, radius) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  const root = radius * 0.55;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts = [
      [a - step * 0.22, root],
      [a - step * 0.02, radius],
      [a + step * 0.16, radius * 0.96],
      [a + step * 0.24, root],
    ];
    pts.forEach(([ang, r], k) => {
      const x = Math.cos(ang) * r;
      const y = Math.sin(ang) * r;
      if (i === 0 && k === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
  }
  shape.closePath();
  return shape;
}

{
  const root = arbor("escape");
  const visR = 0.58;
  train.escape.visR = visR;
  const wheel = new THREE.Group();
  const step = (Math.PI * 2) / 15;
  for (let i = 0; i < 15; i++) {
    const a = i * step;
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(visR * 0.42, 0.035, 0.03), brass);
    tooth.position.set(Math.cos(a) * visR * 0.72, Math.sin(a) * visR * 0.72, 0);
    tooth.rotation.z = a + 0.35;
    wheel.add(tooth);
  }
  const ring = new THREE.Mesh(new THREE.RingGeometry(visR * 0.42, visR * 0.5, 24), brassDark);
  wheel.add(ring);
  wheel.position.z = 0.86;
  root.add(wheel);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 0.2;
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(visR * 0.48, 0.016, 0.016), brassDark);
    spoke.position.set(Math.cos(a) * visR * 0.24, Math.sin(a) * visR * 0.24, 0.86);
    spoke.rotation.z = a;
    root.add(spoke);
  }
  const pinion = pinionMesh(train.escape.pinion, train.escape.pr, 0.06);
  pinion.position.z = 0.66;
  root.add(pinion);
  const shaft = axle(0.9, 0.013);
  shaft.position.z = 0.42;
  root.add(shaft);
  const j = jewel(0.03);
  j.position.z = 0.012;
  root.add(j);
  tag(root, "escape");
}

/* pallet + balance, set off the escape wheel on the side away from fourth */

// point the fork away from the train so the balance sits in the open
const palletAngle = Math.atan2(train.escape.y, train.escape.x);
const palletDist = train.escape.visR + 0.18;
const palletPos = new THREE.Vector2(
  train.escape.x + Math.cos(palletAngle) * palletDist,
  train.escape.y + Math.sin(palletAngle) * palletDist
);
const balancePos = new THREE.Vector2(
  palletPos.x + Math.cos(palletAngle) * 0.62,
  palletPos.y + Math.sin(palletAngle) * 0.62
);

const pallet = new THREE.Group();
pallet.position.set(palletPos.x, palletPos.y, 0.86);
pallet.rotation.z = palletAngle + Math.PI;
movement.add(pallet);
{
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.04, 0.028), steel);
  body.position.x = 0.1;
  pallet.add(body);
  const entry = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.026, 0.03), ruby);
  entry.position.set(0.32, 0.055, 0.008);
  entry.rotation.z = 0.4;
  pallet.add(entry);
  const exit = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.026, 0.03), ruby);
  exit.position.set(0.32, -0.06, 0.008);
  exit.rotation.z = -0.45;
  pallet.add(exit);
  const hornL = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.012, 0.014), steel);
  hornL.position.set(-0.13, 0.028, 0);
  hornL.rotation.z = 0.55;
  pallet.add(hornL);
  const hornR = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.012, 0.014), steel);
  hornR.position.set(-0.13, -0.028, 0);
  hornR.rotation.z = -0.55;
  pallet.add(hornR);
  const shaft = axle(0.7, 0.012);
  shaft.position.z = -0.32;
  pallet.add(shaft);
  tag(pallet, "pallet");
}
arbors.pallet = { root: pallet, rest: pallet.rotation.z };

const balance = new THREE.Group();
balance.position.set(balancePos.x, balancePos.y, 0);
movement.add(balance);
{
  const rimR = 0.52;
  const rim = new THREE.Mesh(new THREE.TorusGeometry(rimR, 0.032, 10, 40), brass);
  rim.position.z = 0.86;
  balance.add(rim);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(rimR * 1.85, 0.028, 0.02), brassDark);
  arm.position.z = 0.86;
  balance.add(arm);
  const arm2 = arm.clone();
  arm2.rotation.z = Math.PI / 2;
  balance.add(arm2);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.05, 14), brassDark);
  hub.position.z = 0.86;
  balance.add(hub);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + 0.2;
    const sc = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.02, 8), steel);
    sc.rotation.order = "ZXY";
    sc.rotation.z = a;
    sc.rotation.x = Math.PI / 2;
    sc.position.set(Math.cos(a) * (rimR + 0.018), Math.sin(a) * (rimR + 0.018), 0.86);
    balance.add(sc);
  }
  const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.016, 14), steelDark);
  roller.position.z = 0.7;
  balance.add(roller);
  const impulse = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.03, 8), ruby);
  impulse.rotation.x = Math.PI / 2;
  impulse.position.set(0.06, 0, 0.7);
  balance.add(impulse);

  const pts = [];
  for (let i = 0; i <= 200; i++) {
    const t = i / 200;
    const a = t * 7.5 * Math.PI * 2;
    const rad = 0.05 + t * 0.36;
    pts.push(new THREE.Vector3(Math.cos(a) * rad, Math.sin(a) * rad, 0));
  }
  const hairspring = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 200, 0.0045, 4, false), springSteel);
  hairspring.position.z = 1.0;
  balance.add(hairspring);
  const collet = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.02, 10), brassDark);
  collet.position.z = 1.0;
  balance.add(collet);

  const shaft = axle(0.95, 0.012);
  shaft.position.z = 0.46;
  balance.add(shaft);
  const j = jewel(0.03);
  j.position.z = 0.02;
  balance.add(j);
  tag(balance, "balance");
  hairspring.userData.part = "hairspring";
  pickables.push(hairspring);
  arbors.balance = { root: balance };
}

/* plate: a rounded rectangle covering every arbor */

function roundedPlate(cx, cy, rx, ry) {
  const shape = new THREE.Shape();
  const n = 64;
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const wobble = 1 + 0.018 * Math.sin(3 * a + 0.4);
    const x = cx + Math.cos(a) * rx * wobble;
    const y = cy + Math.sin(a) * ry * wobble;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  return shape;
}

const allPts = Object.values(train)
  .map((p) => [p.x, p.y])
  .concat([
    [balancePos.x, balancePos.y],
    [palletPos.x, palletPos.y],
  ]);
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
allPts.forEach(([x, y]) => {
  minX = Math.min(minX, x);
  maxX = Math.max(maxX, x);
  minY = Math.min(minY, y);
  maxY = Math.max(maxY, y);
});
const pcx = (minX + maxX) / 2;
const pcy = (minY + maxY) / 2;
const prx = (maxX - minX) / 2 + 0.85;
const pry = (maxY - minY) / 2 + 0.55;
const prx2 = (maxX - minX) / 2 + 0.62;

const plateShape = roundedPlate(pcx, pcy, prx2, pry);
// open wells so the barrel spring and the balance are visible from above
function well(shape, x, y, r) {
  const h = new THREE.Path();
  h.absarc(x, y, r, 0, Math.PI * 2, false);
  shape.holes.push(h);
}
well(plateShape, train.barrel.x, train.barrel.y, train.barrel.r + 0.08);
well(plateShape, balancePos.x, balancePos.y, 0.62);
const plate = new THREE.Mesh(extrude(plateShape, 0.055), plateMat);
plate.position.z = -0.015;
movement.add(plate);
tag(plate, "plate");

const ringMat = new THREE.MeshStandardMaterial({
  color: 0x8a5e36,
  metalness: 0.4,
  roughness: 0.7,
  side: THREE.DoubleSide,
});
for (let i = 0; i < 16; i++) {
  const a = i * 2.399;
  const rad = 0.35 + (i % 4) * 0.38;
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.07, 0.092, 12), ringMat);
  ring.position.set(pcx + Math.cos(a) * rad, pcy + Math.sin(a) * rad * 0.8, 0.012);
  movement.add(ring);
}
[
  [minX + 0.15, maxY - 0.1],
  [maxX - 0.2, maxY - 0.25],
  [maxX - 0.15, minY + 0.2],
  [minX + 0.25, minY + 0.1],
].forEach(([x, y]) => {
  const sc = screw();
  sc.position.set(x, y, 0.04);
  movement.add(sc);
  tag(sc, "plate");
});

/* bridges */

function ribbon(points, width) {
  const shape = new THREE.Shape();
  const left = [];
  const right = [];
  for (let i = 0; i < points.length; i++) {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    const dx = next[0] - prev[0];
    const dy = next[1] - prev[1];
    const len = Math.hypot(dx, dy) || 1;
    left.push([points[i][0] - (dy / len) * width, points[i][1] + (dx / len) * width]);
    right.push([points[i][0] + (dy / len) * width, points[i][1] - (dx / len) * width]);
  }
  const cap = (p, a, b) => {
    shape.absarc(p[0], p[1], width, Math.atan2(a[1] - p[1], a[0] - p[0]), Math.atan2(b[1] - p[1], b[0] - p[0]), true);
  };
  shape.moveTo(left[0][0], left[0][1]);
  left.slice(1).forEach((p) => shape.lineTo(p[0], p[1]));
  cap(points.at(-1), left.at(-1), right.at(-1));
  for (let i = right.length - 1; i >= 0; i--) shape.lineTo(right[i][0], right[i][1]);
  cap(points[0], right[0], left[0]);
  return shape;
}

const bridges = new THREE.Group();
movement.add(bridges);
function addBridge(points, z, holes) {
  const mesh = new THREE.Mesh(extrude(ribbon(points, 0.055), 0.028), rhodium);
  mesh.position.z = z;
  bridges.add(mesh);
  holes.forEach(([x, y]) => {
    const j = jewel(0.034);
    j.position.set(x, y, z + 0.035);
    bridges.add(j);
  });
  const sc = screw(0.03);
  sc.position.set(points[0][0] + 0.1, points[0][1] + 0.08, z + 0.04);
  bridges.add(sc);
}
addBridge(
  [
    [train.center.x, train.center.y],
    [train.third.x, train.third.y],
  ],
  0.46,
  [
    [train.center.x, train.center.y],
    [train.third.x, train.third.y],
  ]
);
addBridge(
  [
    [train.fourth.x, train.fourth.y],
    [train.escape.x, train.escape.y],
  ],
  0.98,
  [
    [train.fourth.x, train.fourth.y],
    [train.escape.x, train.escape.y],
  ]
);
addBridge(
  [
    [train.barrel.x - train.barrel.r * 0.55, train.barrel.y + train.barrel.r * 0.15],
    [train.barrel.x, train.barrel.y],
  ],
  0.58,
  [[train.barrel.x, train.barrel.y]]
);

{
  const cock = new THREE.Shape();
  cock.absarc(balancePos.x, balancePos.y, 0.2, 0, Math.PI * 2, false);
  const ang = palletAngle + Math.PI * 0.4;
  const fx = balancePos.x + Math.cos(ang) * 0.55;
  const fy = balancePos.y + Math.sin(ang) * 0.55;
  cock.moveTo(balancePos.x + Math.cos(ang - 0.4) * 0.12, balancePos.y + Math.sin(ang - 0.4) * 0.12);
  cock.lineTo(fx - 0.08, fy + 0.08);
  cock.lineTo(fx + 0.12, fy + 0.08);
  cock.lineTo(fx + 0.12, fy - 0.1);
  cock.lineTo(balancePos.x + Math.cos(ang + 0.5) * 0.1, balancePos.y + Math.sin(ang + 0.5) * 0.1);
  const mesh = new THREE.Mesh(extrude(cock, 0.04), rhodium);
  mesh.position.z = 1.14;
  bridges.add(mesh);
  const j = jewel(0.04);
  j.position.set(balancePos.x, balancePos.y, 1.18);
  bridges.add(j);
  const sc = screw(0.03);
  sc.position.set(fx, fy - 0.02, 1.19);
  bridges.add(sc);
  const stud = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.025, 0.02), steel);
  stud.position.set(balancePos.x + 0.18, balancePos.y + 0.1, 1.06);
  bridges.add(stud);
}
{
  const mesh = new THREE.Mesh(
    extrude(
      ribbon(
        [
          [palletPos.x, palletPos.y],
          [palletPos.x + Math.cos(palletAngle + 1.4) * 0.32, palletPos.y + Math.sin(palletAngle + 1.4) * 0.32],
        ],
        0.09
      ),
      0.032
    ),
    rhodium
  );
  mesh.position.z = 0.86;
  bridges.add(mesh);
  const j = jewel(0.03);
  j.position.set(palletPos.x, palletPos.y, 0.9);
  bridges.add(j);
}
tag(bridges, "bridge");

/* click beside the barrel */

{
  const a = 2.4;
  const x = train.barrel.x + Math.cos(a) * (train.barrel.r + 0.1);
  const y = train.barrel.y + Math.sin(a) * (train.barrel.r + 0.1);
  const click = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.025, 0.016), steel);
  click.position.set(x, y, 0.28);
  click.rotation.z = a;
  movement.add(click);
  tag(click, "barrel");
}

/* frame */

{
  const box = new THREE.Box3().setFromObject(movement);
  const center = box.getCenter(new THREE.Vector3());
  movement.position.x -= center.x;
  movement.position.y -= center.y;
  movement.position.z -= box.min.z;
  const size = box.getSize(new THREE.Vector3());
  const span = Math.max(size.x, size.y, 2);
  controls.target.set(0, 0, size.z * 0.4);
  controls.minDistance = span * 0.42;
  controls.maxDistance = span * 4;
  window.__frame = { span, tz: size.z * 0.4 };
  frameCamera();
  key.position.set(span, span * 1.4, span);
  key.target.position.set(0, 0, 0);
  key.shadow.camera.left = -span;
  key.shadow.camera.right = span;
  key.shadow.camera.top = span;
  key.shadow.camera.bottom = -span;
  rim.position.set(-span * 0.4, span * 0.5, span * 0.6);
  controls.update();
  window.__span = span;
}

/* ---------------------------------------------------------------- motion */

const CENTER_W = (TIME_SCALE / 3600) * Math.PI * 2;
// half-pitch offsets seat a driving tooth in a driven gap
const PHASE = {
  barrel: Math.PI / train.center.pinion,
  center: 0,
  third: Math.PI / train.third.pinion,
  fourth: Math.PI / train.fourth.pinion,
  escape: Math.PI / train.escape.pinion,
};

function trainAngle(id, t) {
  const c = CENTER_W * t;
  if (id === "barrel") return c / (train.barrel.teeth / train.center.pinion) + PHASE.barrel;
  if (id === "center") return -c + PHASE.center;
  if (id === "third") return c * (train.center.teeth / train.third.pinion) + PHASE.third;
  if (id === "fourth") return -c * (train.center.teeth / train.third.pinion) * (train.third.teeth / train.fourth.pinion) + PHASE.fourth;
  if (id === "escape") {
    const ratio =
      (train.center.teeth / train.third.pinion) *
      (train.third.teeth / train.fourth.pinion) *
      (train.fourth.teeth / train.escape.pinion);
    return c * ratio + PHASE.escape;
  }
  return 0;
}

let sim = 0;
let last = performance.now();
let running = true;
let speed = 1;
const TOOTH = (Math.PI * 2) / 15;
const LIFT = 0.15;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let moved = false;
let px = 0;
let py = 0;
renderer.domElement.addEventListener("pointerdown", (e) => {
  moved = false;
  px = e.clientX;
  py = e.clientY;
});
renderer.domElement.addEventListener("pointermove", (e) => {
  if (Math.hypot(e.clientX - px, e.clientY - py) > 6) moved = true;
});
renderer.domElement.addEventListener("pointerup", (e) => {
  if (moved) return;
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(pickables, false);
  if (hits.length && hits[0].object.userData.part) setCard(hits[0].object.userData.part);
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    running = !running;
    document.getElementById("beat").textContent = running ? "18,000" : "停摆";
    document.getElementById("beat-sub").textContent = running ? "vph · 5 beat / s" : "space · resume";
  }
});

function frameCamera() {
  const { span, tz } = window.__frame;
  const narrow = window.innerWidth < 740;
  controls.target.set(0, narrow ? -span * 0.04 : span * 0.02, tz);
  const aspect = window.innerWidth / Math.max(1, window.innerHeight);
  const vHalf = (camera.fov * Math.PI) / 180 / 2;
  const hHalf = Math.atan(Math.tan(vHalf) * aspect);
  const dist = (Math.max(span / 2 / Math.tan(vHalf), span / 2 / Math.tan(hHalf)) + 0.35) * (narrow ? 1.02 : 1.06);
  // Wheels lie in XY, so "above" is +Z. The offset keeps tooth rims readable.
  const dir = new THREE.Vector3(0.38, -0.28, 0.88).normalize();
  camera.position.copy(controls.target).addScaledVector(dir, dist);
  camera.near = Math.max(0.02, dist / 200);
  camera.updateProjectionMatrix();
  controls.update();
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  frameCamera();
});

const beatEl = document.getElementById("beat");

function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if (running) sim += dt * speed;

  arbors.barrel.root.rotation.z = trainAngle("barrel", sim);
  arbors.center.root.rotation.z = trainAngle("center", sim);
  arbors.third.root.rotation.z = trainAngle("third", sim);
  arbors.fourth.root.rotation.z = trainAngle("fourth", sim);

  const phase = Math.PI * BEATS * (running ? speed : 0) * sim;
  if (running) arbors.balance.root.rotation.z = AMPLITUDE * Math.sin(phase);

  const s = Math.sin(phase);
  const going = Math.cos(phase) >= 0;
  let fork;
  if (Math.abs(s) < 0.18) {
    const u = (s + 0.18) / 0.36;
    fork = going ? THREE.MathUtils.lerp(-LIFT, LIFT, u) : THREE.MathUtils.lerp(LIFT, -LIFT, 1 - u);
  } else {
    fork = going ? LIFT : -LIFT;
  }
  arbors.pallet.root.rotation.z = arbors.pallet.rest + (running ? fork : 0);

  const mean = trainAngle("escape", sim);
  const beatPhase = ((phase / Math.PI) % 1 + 1) % 1;
  const hold = 0.8;
  const drop = beatPhase < hold ? 0 : (beatPhase - hold) / (1 - hold);
  const kick = (drop - (1 - hold) * 0.5) * TOOTH * 0.42;
  arbors.escape.root.rotation.z = mean + (running ? kick : 0);

  if (!running) beatEl.textContent = "停摆";
  controls.update();
  renderer.render(scene, camera);
}
requestAnimationFrame(frame);

if (new URLSearchParams(location.search).has("shot")) {
  const shots = Number(new URLSearchParams(location.search).get("shot")) || 40;
  let n = 0;
  const grab = () => {
    n += 1;
    if (n < shots) {
      requestAnimationFrame(grab);
      return;
    }
    window.__shot = renderer.domElement.toDataURL("image/png");
    const box = new THREE.Box3().setFromObject(movement);
    document.title = "SHOT_READY";
  };
  requestAnimationFrame(grab);
}
