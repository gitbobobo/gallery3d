import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createMovement, beatGlow } from "./movement.js";

const INFO = {
  barrel: {
    name: "发条盒",
    text: "发条收在这只盒子里。盒边 96 齿带动二轮的 12 叶齿轴，走时大约八小时转一圈。",
    spec: "96 齿 · 1 圈 / 8 时",
  },
  spring: {
    name: "发条",
    text: "动力从这里来。钢带外端钩在盒壁上，内端套在发条轴上，松开时带动整个轮系。",
    spec: "动力储存",
  },
  ratchet: {
    name: "棘轮",
    text: "锁住发条轴，发条才不会一下子弹开。上条时棘爪让开，走时这只轮不动。",
    spec: "上条锁定",
  },
  center: {
    name: "二轮",
    text: "一小时转一圈，分针装在这根轴上。80 齿驱动三轮的 10 叶齿轴。",
    spec: "80 齿 · 1 圈 / 时",
  },
  third: {
    name: "三轮",
    text: "轮系中间的一环。75 齿把二轮传来的转速提高，再交给四轮。",
    spec: "75 齿 · 8 圈 / 时",
  },
  fourth: {
    name: "四轮",
    text: "秒轮。一分钟转一圈。80 齿驱动擒纵轮的 8 叶齿轴。",
    spec: "80 齿 · 1 圈 / 分",
  },
  escape: {
    name: "擒纵轮",
    text: "15 个马蹄齿。摆轮每经过一次中线，它前进半个齿，一分钟转 10 圈。",
    spec: "15 齿 · 10 圈 / 分",
  },
  pallet: {
    name: "擒纵叉",
    text: "两块宝石瓦轮流卡住擒纵轮。摆轮经过中线时，叉把轮齿的冲击送回去。",
    spec: "每拍摆动一次",
  },
  balance: {
    name: "摆轮",
    text: "和游丝一起决定走时。每秒来回 2.5 次，从中线往一边大约摆开 270°。",
    spec: "2.5 Hz · 振幅 270°",
  },
  hairspring: {
    name: "游丝",
    text: "内桩跟着摆轮转，外端固定在外桩上。摆轮偏开以后，由它拉回来。",
    spec: "平面游丝",
  },
  plate: {
    name: "主夹板",
    text: "轮系的底板，表面是珍珠圈。轴孔里镶红宝石，轴尖在宝石上转。",
    spec: "珍珠圈打磨",
  },
  cock: {
    name: "摆轮夹板",
    text: "压住摆轮上轴。旁边的快慢针拨动游丝外端，用来调走时快慢。",
    spec: "快慢针",
  },
  jewel: {
    name: "宝石轴承",
    text: "人造红宝石。比铜硬，抛光后很滑，轴尖在上面能转很久。",
    spec: "朝上可见的轴眼",
  },
  crown: {
    name: "表冠",
    text: "拉出调针，推进上条。现在机芯在走时，表冠不转。",
    spec: "3 点位置",
  },
};

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const view = document.getElementById("view");
const hint = document.getElementById("hint");
const note = document.getElementById("note");
const noteTitle = document.getElementById("note-title");
const noteText = document.getElementById("note-text");
const noteSpec = document.getElementById("note-spec");
const pip = document.getElementById("pip");

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
} catch (err) {
  view.innerHTML = '<p class="fail">这个浏览器打不开三维画面。</p>';
  throw err;
}
if (!renderer.getContext()) {
  view.innerHTML = '<p class="fail">这个浏览器打不开三维画面。</p>';
} else {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.domElement.setAttribute("role", "application");
  renderer.domElement.setAttribute("aria-label", "B18 机芯，可拖动旋转，滚轮缩放，点击零件");
  view.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xd2dbd6);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.06).texture;
  scene.environmentIntensity = 0.9;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
  camera.position.set(6, 16, 18);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.rotateSpeed = 0.72;
  controls.zoomSpeed = 0.85;
  controls.minPolarAngle = 0.18;
  controls.maxPolarAngle = 1.28;

  scene.add(new THREE.HemisphereLight(0xf7f8f6, 0x8a7560, 0.55));
  const key = new THREE.DirectionalLight(0xfff3e2, 2.35);
  key.position.set(-7, 14, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xd5e6f2, 0.7);
  fill.position.set(10, 6, -4);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 0.85);
  rim.position.set(-2, 8, -12);
  scene.add(rim);

  const movement = createMovement();
  scene.add(movement.root);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let selected = null;
  let timeScale = reduced ? 0 : 1;
  let simTime = reduced ? 0.37 : 0;
  let last = performance.now();
  let hidden = false;

  function frame() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const narrow = w < 760;
    camera.aspect = w / Math.max(1, h);
    const fov = narrow ? 32 : 27;
    camera.fov = fov;
    const radius = narrow ? 14.8 : 13.2;
    const vFov = (fov * Math.PI) / 180;
    const distV = radius / Math.tan(vFov / 2);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
    const distH = radius / Math.tan(hFov / 2);
    const polar = narrow ? 0.74 : 1.08;
    const widthLimited = distH > distV;
    const pad = widthLimited ? (narrow ? 1.04 : 1.16) : 0.9;
    const dist = Math.max(distV, distH) * pad;
    const az = narrow ? 0.28 : 0.62;
    const target = new THREE.Vector3(narrow ? 0.1 : 0.55, 0.7, narrow ? 1.4 : -0.15);
    camera.position.set(
      target.x + dist * Math.sin(polar) * Math.sin(az),
      target.y + dist * Math.cos(polar),
      target.z + dist * Math.sin(polar) * Math.cos(az)
    );
    controls.target.copy(target);
    controls.minDistance = dist * 0.22;
    controls.maxDistance = dist * 2.6;
    camera.updateProjectionMatrix();
    controls.update();
  }

  function show(id) {
    const info = INFO[id];
    if (!info) {
      selected = null;
      movement.clearHighlight();
      note.hidden = true;
      hint.hidden = false;
      return;
    }
    selected = id;
    movement.setHighlight(id);
    noteTitle.textContent = info.name;
    noteText.textContent = info.text;
    noteSpec.textContent = info.spec;
    note.hidden = false;
    hint.hidden = true;
  }

  function pick(clientX, clientY) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(movement.root, true);
    for (const hit of hits) {
      let node = hit.object;
      while (node) {
        if (node.userData && node.userData.partId) return node.userData.partId;
        node = node.parent;
      }
    }
    return null;
  }

  let down = null;
  renderer.domElement.addEventListener("pointerdown", (e) => {
    down = { x: e.clientX, y: e.clientY };
  });
  renderer.domElement.addEventListener("pointerup", (e) => {
    if (!down) return;
    const dx = e.clientX - down.x;
    const dy = e.clientY - down.y;
    down = null;
    if (dx * dx + dy * dy > 36) return;
    show(pick(e.clientX, e.clientY));
  });
  renderer.domElement.addEventListener("pointermove", (e) => {
    if (down) return;
    const id = pick(e.clientX, e.clientY);
    renderer.domElement.style.cursor = id ? "pointer" : "grab";
  });

  document.querySelectorAll(".speeds button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const speed = Number(btn.dataset.speed);
      timeScale = reduced && speed === 1 ? 0 : speed;
      document.querySelectorAll(".speeds button").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") show(null);
    if (e.key === "1") document.querySelector('[data-speed="1"]').click();
    if (e.key === "2") document.querySelector('[data-speed="8"]').click();
    const step = 0.08;
    const offset = new THREE.Vector3().subVectors(camera.position, controls.target);
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      const dir = e.key === "ArrowLeft" ? 1 : -1;
      const y = offset.y;
      const hyp = Math.hypot(offset.x, offset.z) || 1;
      const az = Math.atan2(offset.x, offset.z) + dir * step;
      offset.x = Math.sin(az) * hyp;
      offset.z = Math.cos(az) * hyp;
      offset.y = y;
      camera.position.copy(controls.target).add(offset);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const polar = Math.atan2(Math.hypot(offset.x, offset.z), offset.y);
      const az = Math.atan2(offset.x, offset.z);
      const next = THREE.MathUtils.clamp(polar + (e.key === "ArrowUp" ? -step : step), 0.2, 1.25);
      const len = offset.length();
      offset.set(Math.sin(next) * Math.sin(az) * len, Math.cos(next) * len, Math.sin(next) * Math.cos(az) * len);
      camera.position.copy(controls.target).add(offset);
    }
    if (e.key === "+" || e.key === "=") {
      offset.multiplyScalar(0.9);
      camera.position.copy(controls.target).add(offset);
    }
    if (e.key === "-" || e.key === "_") {
      offset.multiplyScalar(1.1);
      camera.position.copy(controls.target).add(offset);
    }
  });

  document.addEventListener("visibilitychange", () => {
    hidden = document.hidden;
    last = performance.now();
  });

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
frame();
  });

  frame();

  function tick(now) {
    requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!hidden && timeScale > 0) simTime += dt * timeScale;
    movement.update(simTime);
    const glow = timeScale === 0 ? 0 : beatGlow(simTime);
    pip.style.opacity = String(0.32 + glow * 0.68);
    controls.update();
    renderer.render(scene, camera);
  }
  requestAnimationFrame(tick);
}
