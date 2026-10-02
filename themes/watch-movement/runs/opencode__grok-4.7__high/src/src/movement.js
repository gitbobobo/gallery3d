import * as THREE from "three";
import {
  wheelGeometry,
  pinionGeometry,
  escapeWheelGeometry,
  ratchetGeometry,
  cyl,
  tube,
  springGeometry,
  hairspringGeometry,
  writeHairspring,
  pitchRadius,
} from "./gear.js";

const TB = 96;
const PC = 12;
const MB = 0.092;
const TC = 80;
const PT = 10;
const MC = 0.082;
const TT = 75;
const PF = 10;
const MT = 0.072;
const TF = 80;
const PE = 8;
const MF = 0.064;

const VPH = (TC * TT * TF * 2 * 15) / (PT * PF * PE);
if (VPH !== 18000) throw new Error("train");

const BEAT = 0.2;
const FIRST = 0.1;
const IMPULSE = 0.018;
const STEP = (12 * Math.PI) / 180;
const FORK = (11 * Math.PI) / 180;
const AMP = (270 * Math.PI) / 180;
const FREQ = 2.5;

function at(origin, dist, deg) {
  const a = (deg * Math.PI) / 180;
  return { x: origin.x + dist * Math.cos(a), y: origin.y + dist * Math.sin(a) };
}

function phaseToward(from, to) {
  return Math.atan2(to.y - from.y, to.x - from.x);
}

function perlageTexture() {
  const s = 512;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const g = c.getContext("2d");
  g.fillStyle = "#8d9591";
  g.fillRect(0, 0, s, s);
  const step = 36;
  for (let y = -step; y < s + step; y += step) {
    const row = Math.round(y / step);
    const ox = (row % 2) * step * 0.5;
    for (let x = -step; x < s + step; x += step) {
      const cx = x + ox;
      const cy = y;
      const rad = g.createRadialGradient(cx - 4, cy - 4, 1, cx, cy, 16);
      rad.addColorStop(0, "#e4eae6");
      rad.addColorStop(0.42, "#b4bbb6");
      rad.addColorStop(1, "#7a827e");
      g.fillStyle = rad;
      g.beginPath();
      g.arc(cx, cy, 15.5, 0, Math.PI * 2);
      g.fill();
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2.4, 2.4);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function genevaTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const g = c.getContext("2d");
  g.fillStyle = "#9aa39f";
  g.fillRect(0, 0, 256, 256);
  g.save();
  g.translate(128, 128);
  g.rotate(-0.55);
  for (let i = -420; i < 420; i += 8) {
    g.fillStyle = Math.abs(i / 8) % 2 === 0 ? "#c5ccc8" : "#868e8a";
    g.fillRect(i, -420, 8, 840);
  }
  g.restore();
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(0.55, 0.55);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function woodTexture() {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 256;
  const g = c.getContext("2d");
  for (let y = 0; y < 256; y++) {
    const n = Math.sin(y * 0.28) * 0.55 + Math.sin(y * 0.07 + 0.8) * 0.45;
    const v = n > 0.25 ? 122 : n < -0.4 ? 74 : 98;
    g.fillStyle = `rgb(${v + 30}, ${Math.max(40, v - 6)}, ${Math.max(24, v - 34)})`;
    g.fillRect(0, y, 64, 1);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const g = c.getContext("2d");
  const rad = g.createRadialGradient(128, 128, 30, 128, 128, 122);
  rad.addColorStop(0, "rgba(36, 48, 44, 0.28)");
  rad.addColorStop(0.7, "rgba(36, 48, 44, 0.1)");
  rad.addColorStop(1, "rgba(36, 48, 44, 0)");
  g.fillStyle = rad;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

function engraveTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const g = c.getContext("2d");
  g.clearRect(0, 0, 512, 256);
  g.fillStyle = "rgba(28, 34, 32, 0.72)";
  g.font = "600 78px Palatino, Georgia, serif";
  g.fillText("B18", 28, 96);
  g.font = "500 30px Palatino, Georgia, serif";
  g.fillStyle = "rgba(28, 34, 32, 0.58)";
  g.fillText("FIFTEEN JEWELS", 32, 148);
  g.fillText("18000  A/H", 32, 188);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function progressOf(t) {
  if (t < FIRST) return 0;
  const u = t - FIRST;
  const n = Math.floor(u / BEAT);
  const local = u - n * BEAT;
  let frac = 1;
  if (local < IMPULSE) {
    const s = local / IMPULSE;
    frac = s * s * (3 - 2 * s);
  }
  return (n + frac) * STEP;
}

function forkOf(t) {
  if (t < FIRST) return FORK;
  const u = t - FIRST;
  const n = Math.floor(u / BEAT);
  const local = u - n * BEAT;
  const from = n % 2 === 0 ? FORK : -FORK;
  const to = -from;
  let s = Math.min(1, local / IMPULSE);
  s = s * s * (3 - 2 * s);
  return from + (to - from) * s;
}

function balanceOf(t) {
  return AMP * Math.cos(2 * Math.PI * FREQ * t);
}

export function beatGlow(t) {
  if (t < FIRST) return 0;
  const local = (t - FIRST) % BEAT;
  if (local < 0.05) return 1 - local / 0.05;
  return 0;
}

export function createMovement() {
  const root = new THREE.Group();
  root.rotation.x = -Math.PI / 2;

  const perlage = perlageTexture();
  const geneva = genevaTexture();
  const wood = woodTexture();
  const byPart = new Map();

  function createMat(kind) {
    if (kind === "brass") {
      return new THREE.MeshPhysicalMaterial({
        color: 0xc9963c,
        metalness: 0.9,
        roughness: 0.32,
        envMapIntensity: 1.05,
      });
    }
    if (kind === "steel") {
      return new THREE.MeshPhysicalMaterial({
        color: 0xd5dee4,
        metalness: 0.95,
        roughness: 0.2,
        envMapIntensity: 1.2,
      });
    }
    if (kind === "blue") {
      return new THREE.MeshPhysicalMaterial({
        color: 0x1c4e8c,
        metalness: 0.74,
        roughness: 0.2,
        envMapIntensity: 1.15,
      });
    }
    if (kind === "ruby") {
      return new THREE.MeshPhysicalMaterial({
        color: 0xd2103e,
        metalness: 0.06,
        roughness: 0.07,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        emissive: 0x7a1028,
        emissiveIntensity: 0.32,
      });
    }
    if (kind === "gold") {
      return new THREE.MeshPhysicalMaterial({
        color: 0xd2ae6a,
        metalness: 0.88,
        roughness: 0.28,
        envMapIntensity: 1.08,
      });
    }
    if (kind === "spring") {
      return new THREE.MeshPhysicalMaterial({
        color: 0x2a568f,
        metalness: 0.72,
        roughness: 0.26,
        side: THREE.DoubleSide,
        envMapIntensity: 1,
      });
    }
    if (kind === "hair") {
      return new THREE.MeshPhysicalMaterial({
        color: 0x24558c,
        metalness: 0.7,
        roughness: 0.28,
        side: THREE.DoubleSide,
        envMapIntensity: 1,
      });
    }
    if (kind === "plate") {
      return new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.55,
        roughness: 0.46,
        map: perlage,
        envMapIntensity: 0.65,
      });
    }
    if (kind === "bridge") {
      return new THREE.MeshPhysicalMaterial({
        color: 0xf2f4f3,
        metalness: 0.62,
        roughness: 0.38,
        map: geneva,
        envMapIntensity: 0.7,
      });
    }
    if (kind === "wood") {
      return new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        map: wood,
        metalness: 0.04,
        roughness: 0.72,
      });
    }
    return new THREE.MeshPhysicalMaterial({ color: 0x888888, roughness: 0.5 });
  }

  function mat(id, kind) {
    const m = createMat(kind);
    m.userData.kind = kind;
    m.userData.baseEmissive = m.emissive ? m.emissive.getHex() : 0;
    m.userData.baseIntensity = m.emissiveIntensity || 0;
    if (!byPart.has(id)) byPart.set(id, []);
    byPart.get(id).push(m);
    return m;
  }

  const holeMat = new THREE.MeshPhysicalMaterial({
    color: 0x1a1e22,
    metalness: 0.4,
    roughness: 0.35,
  });
  const slotMat = new THREE.MeshPhysicalMaterial({
    color: 0x14181c,
    metalness: 0.3,
    roughness: 0.4,
  });

  function tag(object, id) {
    object.userData.partId = id;
    object.traverse((child) => {
      if (child.isMesh && !child.userData.partId) child.userData.partId = id;
    });
  }

  function jewel(r, id, material) {
    const g = new THREE.Group();
    const stone = new THREE.Mesh(cyl(r, 0.05, 18), material);
    const hole = new THREE.Mesh(cyl(r * 0.4, 0.065, 10), holeMat);
    hole.userData.partId = id;
    g.add(stone, hole);
    tag(g, id);
    return g;
  }

  function screw(x, y, z, material, r = 0.15) {
    const g = new THREE.Group();
    const head = new THREE.Mesh(cyl(r, 0.06, 16), material);
    const slot = new THREE.Mesh(new THREE.BoxGeometry(r * 1.25, 0.022, 0.028), slotMat);
    slot.position.z = 0.04;
    g.add(head, slot);
    g.position.set(x, y, z);
    return g;
  }

  function arborAt(pos) {
    const g = new THREE.Group();
    g.position.set(pos.x, pos.y, 0);
    root.add(g);
    return g;
  }

  function staff(parent, z0, z1, radius, material, id) {
    const h = Math.max(0.04, z1 - z0);
    const mesh = new THREE.Mesh(cyl(radius, h, 10), material);
    mesh.position.z = (z0 + z1) / 2;
    parent.add(mesh);
    tag(mesh, id);
    return mesh;
  }

  function spokes(parent, holeR, thickness, material, id, count = 5) {
    const hubR = 0.26;
    const hub = new THREE.Mesh(cyl(hubR, thickness + 0.02, 16), material);
    parent.add(hub);
    tag(hub, id);
    const len = holeR - hubR + 0.06;
    const geo = new THREE.BoxGeometry(len, 0.1, thickness * 0.72);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + 0.2;
      const s = new THREE.Mesh(geo, material);
      s.position.set(Math.cos(a) * (hubR + len / 2 - 0.03), Math.sin(a) * (hubR + len / 2 - 0.03), 0);
      s.rotation.z = a;
      parent.add(s);
      tag(s, id);
    }
  }

  function cock(x, y, z, angle, length, id, withJewel = true) {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    const bridgeMat = mat(id, "bridge");
    const disk = new THREE.Mesh(cyl(0.4, 0.07, 22), bridgeMat);
    g.add(disk);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(length, 0.34, 0.07), bridgeMat);
    arm.position.set((Math.cos(angle) * length) / 2, (Math.sin(angle) * length) / 2, 0);
    arm.rotation.z = angle;
    g.add(arm);
    const blue = mat(id, "blue");
    g.add(screw(Math.cos(angle) * length, Math.sin(angle) * length, 0.02, blue, 0.13));
    if (withJewel) {
      const j = jewel(0.15, "jewel", mat("jewel", "ruby"));
      j.position.z = 0.05;
      g.add(j);
    }
    tag(disk, id);
    tag(arm, id);
    root.add(g);
    return g;
  }

  const center = { x: 0, y: 0 };
  const rB = pitchRadius(TB, MB);
  const rCP = pitchRadius(PC, MB);
  const rC = pitchRadius(TC, MC);
  const rTP = pitchRadius(PT, MC);
  const rT = pitchRadius(TT, MT);
  const rFP = pitchRadius(PF, MT);
  const rF = pitchRadius(TF, MF);
  const rEP = pitchRadius(PE, MF);

  const barrelPos = at(center, rB + rCP, 148);
  const thirdPos = at(center, rC + rTP, -58);
  const fourthPos = at(thirdPos, rT + rFP, 28);
  const escapePos = at(fourthPos, rF + rEP, 78);
  const balAng = (118 * Math.PI) / 180;
  const escapeToBalance = 5.35;
  const balancePos = {
    x: escapePos.x + escapeToBalance * Math.cos(balAng),
    y: escapePos.y + escapeToBalance * Math.sin(balAng),
  };
  const palletDist = 1.95;
  const palletPos = {
    x: escapePos.x + palletDist * Math.cos(balAng),
    y: escapePos.y + palletDist * Math.sin(balAng),
  };

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(16.5, 48),
    new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false })
  );
  shadow.position.z = -0.55;
  shadow.raycast = () => {};
  root.add(shadow);

  const holder = new THREE.Mesh(new THREE.TorusGeometry(13.45, 0.46, 12, 64), createMat("wood"));
  holder.position.z = -0.12;
  holder.raycast = () => {};
  root.add(holder);

  const felt = new THREE.Mesh(
    new THREE.CircleGeometry(12.15, 48),
    new THREE.MeshPhysicalMaterial({ color: 0x3c4e47, roughness: 0.9, metalness: 0 })
  );
  felt.position.z = 0.02;
  felt.raycast = () => {};
  root.add(felt);

  const plateEdge = new THREE.Mesh(
    cyl(11.55, 0.26, 72),
    new THREE.MeshPhysicalMaterial({ color: 0xa8b0ac, metalness: 0.6, roughness: 0.42 })
  );
  plateEdge.position.z = 0.22;
  tag(plateEdge, "plate");
  root.add(plateEdge);

  const plateTop = new THREE.Mesh(new THREE.CircleGeometry(11.55, 72), mat("plate", "plate"));
  plateTop.position.z = 0.35;
  tag(plateTop, "plate");
  root.add(plateTop);

  const caseRing = new THREE.Mesh(
    tube(13.02, 11.78, 0.46, 72),
    new THREE.MeshPhysicalMaterial({ color: 0xe7eef2, metalness: 0.92, roughness: 0.18, envMapIntensity: 1.2 })
  );
  caseRing.position.z = 0.32;
  caseRing.raycast = () => {};
  root.add(caseRing);

  const engrave = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 1.7),
    new THREE.MeshBasicMaterial({ map: engraveTexture(), transparent: true, depthWrite: false })
  );
  engrave.position.set(-6.6, -5.5, 0.37);
  engrave.raycast = () => {};
  root.add(engrave);

  const bluePlate = mat("plate", "blue");
  for (const deg of [18, 198, 236, 278, 324]) {
    const p = at(center, 10.85, deg);
    const s = screw(p.x, p.y, 0.4, bluePlate, 0.16);
    tag(s, "plate");
    root.add(s);
  }

  const brassB = mat("barrel", "brass");
  const steelB = mat("barrel", "steel");
  const barrelArbor = arborAt(barrelPos);
  tag(barrelArbor, "barrel");
  const barrelTeeth = new THREE.Mesh(wheelGeometry(TB, MB, 0.22, rB - MB * 2.4), brassB);
  barrelTeeth.position.z = 0.24;
  barrelTeeth.rotation.z = phaseToward(barrelPos, center);
  barrelArbor.add(barrelTeeth);
  tag(barrelTeeth, "barrel");
  const wallR = rB - MB * 1.55;
  const wall = new THREE.Mesh(tube(wallR, wallR - 0.1, 0.5, 64), brassB);
  wall.position.z = 0.52;
  barrelArbor.add(wall);
  tag(wall, "barrel");
  const floor = new THREE.Mesh(cyl(wallR - 0.04, 0.05, 48), brassB);
  floor.position.z = 0.18;
  barrelArbor.add(floor);
  const spring = new THREE.Mesh(springGeometry(8, 0.32, wallR - 0.2, 0.3, 0.04), mat("spring", "spring"));
  spring.position.z = 0.22;
  barrelArbor.add(spring);
  tag(spring, "spring");
  staff(barrelArbor, 0.08, 0.2, 0.08, steelB, "barrel");

  const arborSquare = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.62), steelB);
  arborSquare.position.set(barrelPos.x, barrelPos.y, 0.62);
  tag(arborSquare, "barrel");
  root.add(arborSquare);

  const outAng = Math.atan2(barrelPos.y, barrelPos.x);
  const bridgeMatB = mat("barrel", "bridge");
  const bBridge = new THREE.Group();
  const bLen = 2.15;
  const bArm = new THREE.Mesh(new THREE.BoxGeometry(bLen, 0.55, 0.08), bridgeMatB);
  bArm.position.set(
    barrelPos.x + (Math.cos(outAng) * bLen) / 2,
    barrelPos.y + (Math.sin(outAng) * bLen) / 2,
    0.96
  );
  bArm.rotation.z = outAng;
  tag(bArm, "barrel");
  bBridge.add(bArm);
  const bDisk = new THREE.Mesh(cyl(0.48, 0.08, 20), bridgeMatB);
  bDisk.position.set(barrelPos.x, barrelPos.y, 0.96);
  tag(bDisk, "barrel");
  bBridge.add(bDisk);
  const bScrew = screw(
    barrelPos.x + Math.cos(outAng) * bLen,
    barrelPos.y + Math.sin(outAng) * bLen,
    0.98,
    mat("barrel", "blue"),
    0.14
  );
  tag(bScrew, "barrel");
  bBridge.add(bScrew);
  root.add(bBridge);

  const ratchet = new THREE.Mesh(ratchetGeometry(28, 1.02, 0.08), mat("ratchet", "steel"));
  ratchet.position.set(barrelPos.x, barrelPos.y, 1.12);
  tag(ratchet, "ratchet");
  root.add(ratchet);
  const click = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.08, 0.04), mat("ratchet", "steel"));
  click.position.set(
    barrelPos.x + Math.cos(outAng + 0.9) * 0.95,
    barrelPos.y + Math.sin(outAng + 0.9) * 0.95,
    1.12
  );
  click.rotation.z = outAng + 0.4;
  tag(click, "ratchet");
  root.add(click);

  const steelC = mat("center", "steel");
  const brassC = mat("center", "brass");
  const centerArbor = arborAt(center);
  tag(centerArbor, "center");
  const centerPinion = new THREE.Mesh(pinionGeometry(PC, MB, 0.42), steelC);
  centerPinion.position.z = 0.28;
  centerPinion.rotation.z = phaseToward(center, barrelPos) + Math.PI / PC;
  centerArbor.add(centerPinion);
  tag(centerPinion, "center");
  const centerHole = rC * 0.74;
  const centerWheel = new THREE.Mesh(wheelGeometry(TC, MC, 0.12, centerHole), brassC);
  centerWheel.position.z = 1.02;
  centerWheel.rotation.z = phaseToward(center, thirdPos);
  centerArbor.add(centerWheel);
  tag(centerWheel, "center");
  const centerSpokes = new THREE.Group();
  centerSpokes.position.z = 1.02;
  centerSpokes.rotation.z = centerWheel.rotation.z;
  spokes(centerSpokes, centerHole, 0.12, brassC, "center", 6);
  centerArbor.add(centerSpokes);
  staff(centerArbor, 0.36, 0.95, 0.055, steelC, "center");
  staff(centerArbor, 1.08, 1.28, 0.045, steelC, "center");

  const steelT = mat("third", "steel");
  const brassT = mat("third", "brass");
  const thirdArbor = arborAt(thirdPos);
  tag(thirdArbor, "third");
  const thirdPinion = new THREE.Mesh(pinionGeometry(PT, MC, 0.36), steelT);
  thirdPinion.position.z = 1.0;
  thirdPinion.rotation.z = phaseToward(thirdPos, center) + Math.PI / PT;
  thirdArbor.add(thirdPinion);
  tag(thirdPinion, "third");
  const thirdHole = rT * 0.72;
  const thirdWheel = new THREE.Mesh(wheelGeometry(TT, MT, 0.11, thirdHole), brassT);
  thirdWheel.position.z = 0.52;
  thirdWheel.rotation.z = phaseToward(thirdPos, fourthPos);
  thirdArbor.add(thirdWheel);
  tag(thirdWheel, "third");
  const thirdSpokes = new THREE.Group();
  thirdSpokes.position.z = 0.52;
  thirdSpokes.rotation.z = thirdWheel.rotation.z;
  spokes(thirdSpokes, thirdHole, 0.11, brassT, "third", 5);
  thirdArbor.add(thirdSpokes);
  staff(thirdArbor, 0.36, 0.46, 0.045, steelT, "third");
  staff(thirdArbor, 0.58, 1.16, 0.04, steelT, "third");

  const steelF = mat("fourth", "steel");
  const brassF = mat("fourth", "brass");
  const fourthArbor = arborAt(fourthPos);
  tag(fourthArbor, "fourth");
  const fourthPinion = new THREE.Mesh(pinionGeometry(PF, MT, 0.34), steelF);
  fourthPinion.position.z = 0.52;
  fourthPinion.rotation.z = phaseToward(fourthPos, thirdPos) + Math.PI / PF;
  fourthArbor.add(fourthPinion);
  tag(fourthPinion, "fourth");
  const fourthHole = rF * 0.72;
  const fourthWheel = new THREE.Mesh(wheelGeometry(TF, MF, 0.11, fourthHole), brassF);
  fourthWheel.position.z = 1.28;
  fourthWheel.rotation.z = phaseToward(fourthPos, escapePos);
  fourthArbor.add(fourthWheel);
  tag(fourthWheel, "fourth");
  const fourthSpokes = new THREE.Group();
  fourthSpokes.position.z = 1.28;
  fourthSpokes.rotation.z = fourthWheel.rotation.z;
  spokes(fourthSpokes, fourthHole, 0.11, brassF, "fourth", 5);
  fourthArbor.add(fourthSpokes);
  staff(fourthArbor, 0.36, 0.46, 0.04, steelF, "fourth");
  staff(fourthArbor, 1.18, 1.42, 0.038, steelF, "fourth");

  const steelE = mat("escape", "steel");
  const escapeArbor = arborAt(escapePos);
  tag(escapeArbor, "escape");
  const escapePinion = new THREE.Mesh(pinionGeometry(PE, MF, 0.32), steelE);
  escapePinion.position.z = 1.26;
  escapePinion.rotation.z = phaseToward(escapePos, fourthPos) + Math.PI / PE;
  escapeArbor.add(escapePinion);
  tag(escapePinion, "escape");
  const escapeWheel = new THREE.Mesh(escapeWheelGeometry(0.12), steelE);
  escapeWheel.position.z = 1.66;
  const span = 2.5 * ((Math.PI * 2) / 15);
  const entryAng = balAng - span / 2;
  const lockFace = -0.05;
  escapeWheel.rotation.z = entryAng - lockFace;
  escapeArbor.add(escapeWheel);
  tag(escapeWheel, "escape");
  const eSpokes = new THREE.Group();
  eSpokes.position.z = 1.66;
  eSpokes.rotation.z = escapeWheel.rotation.z;
  spokes(eSpokes, 0.72, 0.1, steelE, "escape", 5);
  escapeArbor.add(eSpokes);
  staff(escapeArbor, 1.16, 1.58, 0.035, steelE, "escape");

  cock(0, 0, 1.34, -Math.PI / 2, 1.15, "center");
  cock(thirdPos.x, thirdPos.y, 1.2, -2.4, 1.05, "third");
  cock(fourthPos.x, fourthPos.y, 1.46, -0.4, 1.05, "fourth");
  cock(escapePos.x, escapePos.y, 1.86, 0.15, 0.95, "escape");

  const steelP = mat("pallet", "steel");
  const rubyP = mat("pallet", "ruby");
  const palletArbor = new THREE.Group();
  palletArbor.position.set(palletPos.x, palletPos.y, 1.66);
  root.add(palletArbor);
  tag(palletArbor, "pallet");

  function worldToLocal(pt, swing) {
    const dx = pt.x - palletPos.x;
    const dy = pt.y - palletPos.y;
    const c = Math.cos(-swing);
    const s = Math.sin(-swing);
    return { x: dx * c - dy * s, y: dx * s + dy * c };
  }
  const lockR = 1.36;
  const entryWorld = {
    x: escapePos.x + lockR * Math.cos(entryAng),
    y: escapePos.y + lockR * Math.sin(entryAng),
  };
  const exitAng = balAng + span / 2;
  const exitWorld = {
    x: escapePos.x + lockR * Math.cos(exitAng),
    y: escapePos.y + lockR * Math.sin(exitAng),
  };
  const entryLocal = worldToLocal(entryWorld, FORK);
  const exitLocal = worldToLocal(exitWorld, -FORK);

  function armTo(local) {
    const len = Math.hypot(local.x, local.y);
    const ang = Math.atan2(local.y, local.x);
    const bar = new THREE.Mesh(new THREE.BoxGeometry(Math.max(0.12, len), 0.09, 0.06), steelP);
    bar.position.set((Math.cos(ang) * len) / 2, (Math.sin(ang) * len) / 2, 0);
    bar.rotation.z = ang;
    palletArbor.add(bar);
    const stone = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.07), rubyP);
    stone.position.set(local.x, local.y, 0.01);
    stone.rotation.z = ang + Math.PI / 2;
    palletArbor.add(stone);
    tag(bar, "pallet");
    tag(stone, "pallet");
  }
  armTo(entryLocal, "entry");
  armTo(exitLocal, "exit");

  const hub = new THREE.Mesh(cyl(0.12, 0.08, 14), steelP);
  palletArbor.add(hub);
  tag(hub, "pallet");

  const toBalX = balancePos.x - palletPos.x;
  const toBalY = balancePos.y - palletPos.y;
  const toBalL = Math.hypot(toBalX, toBalY);
  const ux = toBalX / toBalL;
  const uy = toBalY / toBalL;
  const px = -uy;
  const py = ux;
  const forkAng = Math.atan2(uy, ux);
  const shaftLen = Math.max(0.4, toBalL - 0.85);
  const body = new THREE.Mesh(new THREE.BoxGeometry(shaftLen, 0.1, 0.055), steelP);
  body.position.set(ux * shaftLen * 0.5, uy * shaftLen * 0.5, 0);
  body.rotation.z = forkAng;
  palletArbor.add(body);
  tag(body, "pallet");
  const hornLen = 0.72;
  const hornBase = toBalL - 0.22 - hornLen * 0.55;
  for (const side of [-1, 1]) {
    const horn = new THREE.Mesh(new THREE.BoxGeometry(hornLen, 0.06, 0.05), steelP);
    horn.position.set(ux * hornBase + px * side * 0.075, uy * hornBase + py * side * 0.075, 0);
    horn.rotation.z = forkAng;
    palletArbor.add(horn);
    tag(horn, "pallet");
  }
  staff(palletArbor, -1.2, -0.05, 0.04, steelP, "pallet");
  cock(palletPos.x, palletPos.y, 1.88, balAng + 0.7, 0.9, "pallet", true);

  const gold = mat("balance", "gold");
  const steelBal = mat("balance", "steel");
  const balanceArbor = new THREE.Group();
  balanceArbor.position.set(balancePos.x, balancePos.y, 0);
  root.add(balanceArbor);
  tag(balanceArbor, "balance");

  const rimOuter = 2.28;
  const rimInner = 2.02;
  const rimShape = new THREE.Shape();
  rimShape.absarc(0, 0, rimOuter, 0, Math.PI * 2, false);
  const rimHole = new THREE.Path();
  rimHole.absarc(0, 0, rimInner, 0, Math.PI * 2, true);
  rimShape.holes.push(rimHole);
  const rimGeo = new THREE.ExtrudeGeometry(rimShape, { depth: 0.12, bevelEnabled: false, curveSegments: 48 });
  rimGeo.translate(0, 0, -0.06);
  const rim = new THREE.Mesh(rimGeo, gold);
  rim.position.z = 2.08;
  balanceArbor.add(rim);
  tag(rim, "balance");
  const armGeo = new THREE.BoxGeometry(rimInner - 0.12, 0.14, 0.08);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const arm = new THREE.Mesh(armGeo, gold);
    arm.position.set(Math.cos(a) * (rimInner / 2), Math.sin(a) * (rimInner / 2), 2.08);
    arm.rotation.z = a;
    balanceArbor.add(arm);
    tag(arm, "balance");
  }
  const balHub = new THREE.Mesh(cyl(0.22, 0.14, 16), gold);
  balHub.position.z = 2.08;
  balanceArbor.add(balHub);
  for (const deg of [20, 200]) {
    const a = (deg * Math.PI) / 180;
    const sc = screw((rimOuter - 0.08) * Math.cos(a), (rimOuter - 0.08) * Math.sin(a), 2.12, mat("balance", "blue"), 0.07);
    balanceArbor.add(sc);
    tag(sc, "balance");
  }

  const roller = new THREE.Mesh(cyl(0.28, 0.06, 18), steelBal);
  roller.position.z = 1.5;
  balanceArbor.add(roller);
  const pinDirX = palletPos.x - balancePos.x;
  const pinDirY = palletPos.y - balancePos.y;
  const pinL = Math.hypot(pinDirX, pinDirY);
  const pin = new THREE.Mesh(cyl(0.045, 0.16, 10), mat("balance", "ruby"));
  pin.position.set((pinDirX / pinL) * 0.34, (pinDirY / pinL) * 0.34, 1.62);
  balanceArbor.add(pin);
  tag(pin, "balance");
  staff(balanceArbor, 0.4, 2.02, 0.04, steelBal, "balance");
  staff(balanceArbor, 2.14, 2.52, 0.035, steelBal, "balance");

  const hairGeo = hairspringGeometry(150);
  const hair = new THREE.Mesh(hairGeo, mat("hairspring", "hair"));
  hair.position.set(balancePos.x, balancePos.y, 2.28);
  tag(hair, "hairspring");
  root.add(hair);

  const studAng = 2.35;
  const stud = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.08), mat("cock", "brass"));
  stud.position.set(
    balancePos.x + Math.cos(studAng) * 1.14,
    balancePos.y + Math.sin(studAng) * 1.14,
    2.3
  );
  tag(stud, "cock");
  root.add(stud);

  const cockAng = Math.atan2(balancePos.y, balancePos.x);
  const foot = { x: Math.cos(cockAng) * 9.3, y: Math.sin(cockAng) * 9.3 };
  const cockMat = mat("cock", "bridge");
  const cockLen = Math.hypot(foot.x - balancePos.x, foot.y - balancePos.y);
  const cockArm = new THREE.Mesh(new THREE.BoxGeometry(cockLen, 0.5, 0.08), cockMat);
  cockArm.position.set((foot.x + balancePos.x) / 2, (foot.y + balancePos.y) / 2, 2.56);
  cockArm.rotation.z = Math.atan2(foot.y - balancePos.y, foot.x - balancePos.x);
  tag(cockArm, "cock");
  root.add(cockArm);
  const cockDisk = new THREE.Mesh(cyl(0.46, 0.08, 22), cockMat);
  cockDisk.position.set(balancePos.x, balancePos.y, 2.56);
  tag(cockDisk, "cock");
  root.add(cockDisk);
  const cockJewel = jewel(0.16, "jewel", mat("jewel", "ruby"));
  cockJewel.position.set(balancePos.x, balancePos.y, 2.62);
  root.add(cockJewel);
  const cockScrew = screw(foot.x, foot.y, 2.58, mat("cock", "blue"), 0.15);
  tag(cockScrew, "cock");
  root.add(cockScrew);

  const index = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.06, 0.03), mat("cock", "steel"));
  const indexAng = studAng - 0.55;
  index.position.set(
    balancePos.x + Math.cos(indexAng) * 1.35,
    balancePos.y + Math.sin(indexAng) * 1.35,
    2.4
  );
  index.rotation.z = indexAng + Math.PI / 2;
  tag(index, "cock");
  root.add(index);
  for (const bump of [-0.06, 0.06]) {
    const pinette = new THREE.Mesh(cyl(0.02, 0.08, 8), mat("cock", "steel"));
    pinette.position.set(
      balancePos.x + Math.cos(indexAng) * 1.05 + Math.cos(indexAng + Math.PI / 2) * bump,
      balancePos.y + Math.sin(indexAng) * 1.05 + Math.sin(indexAng + Math.PI / 2) * bump,
      2.36
    );
    tag(pinette, "cock");
    root.add(pinette);
  }

  const crownMat = mat("crown", "steel");
  const crown = new THREE.Group();
  crown.position.set(13.72, 0, 0.4);
  const knob = new THREE.Mesh(cyl(0.56, 0.85, 22), crownMat);
  knob.rotation.y = Math.PI / 2;
  const waist = new THREE.Mesh(cyl(0.66, 0.16, 22), crownMat);
  waist.rotation.y = Math.PI / 2;
  crown.add(knob, waist);
  tag(crown, "crown");
  root.add(crown);
  const stem = new THREE.Mesh(cyl(0.13, 0.9, 10), crownMat);
  stem.rotation.y = Math.PI / 2;
  stem.position.set(12.95, 0, 0.4);
  tag(stem, "crown");
  root.add(stem);

  let current = null;

  function clearHighlight() {
    for (const list of byPart.values()) {
      for (const m of list) {
        if (!m.emissive) continue;
        m.emissive.setHex(m.userData.baseEmissive || 0);
        m.emissiveIntensity = m.userData.baseIntensity || 0;
      }
    }
    current = null;
  }

  function setHighlight(id) {
    clearHighlight();
    if (!id || !byPart.has(id)) return;
    current = id;
    for (const m of byPart.get(id)) {
      if (!m.emissive) continue;
      if (m.userData.kind === "ruby") {
        m.emissiveIntensity = 0.9;
      } else {
        m.emissive.setHex(0xc47a3a);
        m.emissiveIntensity = 0.5;
      }
    }
  }

  function update(t) {
    const e = progressOf(t);
    const esc = -e;
    const fourthA = -esc * (PE / TF);
    const thirdA = -fourthA * (PF / TT);
    const centerA = -thirdA * (PT / TC);
    const barrelA = -centerA * (PC / TB);
    escapeArbor.rotation.z = esc;
    fourthArbor.rotation.z = fourthA;
    thirdArbor.rotation.z = thirdA;
    centerArbor.rotation.z = centerA;
    barrelArbor.rotation.z = barrelA;
    const ba = balanceOf(t);
    balanceArbor.rotation.z = ba;
    palletArbor.rotation.z = forkOf(t);
    writeHairspring(hairGeo, ba, 9.5, 0.24, 1.12, 0.042);
  }

  update(0);

  return {
    root,
    update,
    setHighlight,
    clearHighlight,
    glow: beatGlow,
  };
}
