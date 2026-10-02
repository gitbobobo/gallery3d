/* =====================================================================
 * 机械机芯 3D 展示 — Mechanical Movement Demo
 * Three.js r132 — procedural geometry, all ratios are physically coupled.
 * ===================================================================== */

(function () {
  'use strict';

  // ---------- Colour palette ---------------------------------------
  const PAL = {
    bg:           0x0a0d13,
    brass:        0xc89a4f,
    brassDark:    0x8a6a30,
    brassLight:   0xe8c378,
    steel:        0xd6d8de,
    steelDark:    0x9a9ea6,
    blued:        0x2a4a8a,
    ruby:         0xc41e3a,
    rubyDark:     0x6b0d1c,
    gold:         0xd4af37,
    palletRed:    0x8a1e2a,
    basePlate:    0x9a7a3e,
  };

  // ---------- DOM --------------------------------------------------
  const canvas   = document.getElementById('scene');
  const infoEl   = document.getElementById('info');
  const nameEl   = document.getElementById('info-name');
  const enEl     = document.getElementById('info-en');
  const descEl   = document.getElementById('info-desc');
  const statsEl  = document.getElementById('info-stats');
  const tagEl    = document.getElementById('info-tag');
  const rpmEl    = document.getElementById('rpm');
  const loader   = document.getElementById('loader');

  // ---------- Renderer ---------------------------------------------
  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: true, alpha: false, powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // ---------- Scene / Camera ---------------------------------------
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(PAL.bg);
  scene.fog = new THREE.Fog(PAL.bg, 70, 140);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 500);
  camera.position.set(36, 38, 42);
  camera.lookAt(0, 0, 0);

  // ---------- Lighting ---------------------------------------------
  scene.add(new THREE.AmbientLight(0xffffff, 0.45));

  const key = new THREE.DirectionalLight(0xffeacc, 0.95);
  key.position.set(22, 30, 16);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 80;
  key.shadow.camera.left   = -28;
  key.shadow.camera.right  =  28;
  key.shadow.camera.top    =  28;
  key.shadow.camera.bottom = -28;
  key.shadow.bias = -0.0005;
  scene.add(key);

  const fill = new THREE.DirectionalLight(0x88aaff, 0.55);
  fill.position.set(-20, 14, -10);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xfff5e0, 0.4);
  rim.position.set(0, -6, -22);
  scene.add(rim);

  // soft top down to bring out the gears
  const top = new THREE.DirectionalLight(0xffffff, 0.3);
  top.position.set(0, 35, 0);
  scene.add(top);

  // ---------- Materials --------------------------------------------
  const matBrass = new THREE.MeshStandardMaterial({
    color: PAL.brass, metalness: 0.95, roughness: 0.28
  });
  const matBrassDark = new THREE.MeshStandardMaterial({
    color: PAL.brassDark, metalness: 0.9, roughness: 0.4
  });
  const matBrassLight = new THREE.MeshStandardMaterial({
    color: PAL.brassLight, metalness: 0.95, roughness: 0.2
  });
  const matSteel = new THREE.MeshStandardMaterial({
    color: PAL.steel, metalness: 0.97, roughness: 0.18
  });
  const matSteelDark = new THREE.MeshStandardMaterial({
    color: PAL.steelDark, metalness: 0.95, roughness: 0.25
  });
  const matBlued = new THREE.MeshStandardMaterial({
    color: PAL.blued, metalness: 0.9, roughness: 0.18,
    emissive: 0x0a1a3a, emissiveIntensity: 0.22
  });
  const matGold = new THREE.MeshStandardMaterial({
    color: PAL.gold, metalness: 0.96, roughness: 0.18
  });
  const matRuby = new THREE.MeshPhysicalMaterial({
    color: PAL.ruby, metalness: 0.0, roughness: 0.08,
    transmission: 0.4, thickness: 0.25, ior: 1.76,
    emissive: PAL.rubyDark, emissiveIntensity: 0.3
  });
  const matPallet = new THREE.MeshStandardMaterial({
    color: PAL.palletRed, metalness: 0.55, roughness: 0.2,
    emissive: 0x3a0a14, emissiveIntensity: 0.18
  });
  const matBase = new THREE.MeshStandardMaterial({
    color: PAL.basePlate, metalness: 0.9, roughness: 0.42
  });

  // ===================================================================
  //  GEAR GEOMETRY  (procedural — involute-ish trapezoidal teeth)
  // ===================================================================
  function makeGearShape(teeth, pitchR, addendum, dedendum, toothFrac) {
    const outer = pitchR + addendum;
    const root  = pitchR - dedendum;
    const shape = new THREE.Shape();
    const step  = (Math.PI * 2) / teeth;
    const tip   = step * toothFrac;

    for (let i = 0; i <= teeth; i++) {
      const a = i * step;
      if (i === teeth) { shape.closePath(); break; }
      const rs = a - step * 0.5;
      const ts = a - tip   * 0.5;
      const te = a + tip   * 0.5;
      const re = a + step * 0.5;

      const x1 = Math.cos(rs) * root,  y1 = Math.sin(rs) * root;
      const x2 = Math.cos(ts) * outer, y2 = Math.sin(ts) * outer;
      const x3 = Math.cos(te) * outer, y3 = Math.sin(te) * outer;
      const x4 = Math.cos(re) * root,  y4 = Math.sin(re) * root;

      if (i === 0) shape.moveTo(x1, y1);
      else         shape.lineTo(x1, y1);
      shape.lineTo(x2, y2);
      shape.lineTo(x3, y3);
      shape.lineTo(x4, y4);
    }

    // central pivot hole
    const hole = new THREE.Path();
    hole.absarc(0, 0, pitchR * 0.08, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    return shape;
  }

  function makeSpokeHoles(pitchR, count, innerR, outerR) {
    // returns array of THREE.Path cut-outs arranged radially
    const holes = [];
    const half = ((Math.PI * 2) / count) * 0.32;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const path = new THREE.Path();
      const r1 = innerR, r2 = outerR;
      const x1 = Math.cos(a - half) * r1, y1 = Math.sin(a - half) * r1;
      const x2 = Math.cos(a + half) * r1, y2 = Math.sin(a + half) * r1;
      const x3 = Math.cos(a + half) * r2, y3 = Math.sin(a + half) * r2;
      const x4 = Math.cos(a - half) * r2, y4 = Math.sin(a - half) * r2;
      path.moveTo(x1, y1);
      path.absarc(0, 0, r1, a - half, a + half, false);
      path.lineTo(x3, y3);
      path.absarc(0, 0, r2, a + half, a - half, true);
      path.lineTo(x1, y1);
      holes.push(path);
    }
    return holes;
  }

  function extrude(shape, depth, bevel) {
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth, bevelEnabled: true,
      bevelThickness: bevel || 0.05,
      bevelSize: bevel || 0.05,
      bevelSegments: 2,
      curveSegments: 6,
      steps: 1
    });
    // lay disc flat in the XZ plane, thickness in +Y
    geom.rotateX(-Math.PI / 2);
    geom.translate(0, depth / 2, 0);
    geom.computeVertexNormals();
    return geom;
  }

  // ===================================================================
  //  WHEEL  (the visible gear disc)
  // ===================================================================
  function buildWheel(spec) {
    const { teeth, pitchR, depth, spokes, mat, withSpokes, special } = spec;
    // teeth use a fixed module (real watches use the same module everywhere)
    const addendum = special ? 0.42 : 0.30;
    const dedendum = special ? 0.26 : 0.34;

    const shape = makeGearShape(teeth, pitchR, addendum, dedendum, special ? 0.32 : 0.45);
    if (withSpokes !== false && pitchR > 3.5 && !special) {
      const rOuter = pitchR - dedendum - 0.05;
      const rInner = pitchR * 0.28;
      const spokesH = makeSpokeHoles(pitchR * 0.85, spokes || 5, rInner, rOuter);
      shape.holes.push(...spokesH);
    }
    const geom = extrude(shape, depth);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  // ===================================================================
  //  BASE PLATE  (decorated brass dial — circular with Geneva stripes)
  // ===================================================================
  function buildBasePlate() {
    const grp = new THREE.Group();
    const radius = 42, depth = 1.1;

    // base cylinder
    const baseGeom = new THREE.CylinderGeometry(radius, radius, depth, 96, 1);
    const base = new THREE.Mesh(baseGeom, matBase);
    base.position.y = -depth / 2;
    base.receiveShadow = true;
    grp.add(base);

    // brushed ring texture (procedural)
    const stripeCanvas = document.createElement('canvas');
    stripeCanvas.width = stripeCanvas.height = 1024;
    const ctx = stripeCanvas.getContext('2d');
    ctx.fillStyle = '#9a7a3e';
    ctx.fillRect(0, 0, 1024, 1024);
    // darker stripes
    ctx.strokeStyle = 'rgba(50,32,8,0.5)';
    ctx.lineWidth = 1.6;
    for (let i = 0; i < 420; i++) {
      ctx.beginPath();
      const y = Math.random() * 1024;
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(256, y + (Math.random() - 0.5) * 8,
                        768, y + (Math.random() - 0.5) * 8,
                        1024, y);
      ctx.stroke();
    }
    // bright highlights
    ctx.strokeStyle = 'rgba(240,210,140,0.25)';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 280; i++) {
      ctx.beginPath();
      const y = Math.random() * 1024;
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(256, y + (Math.random() - 0.5) * 4,
                        768, y + (Math.random() - 0.5) * 4,
                        1024, y);
      ctx.stroke();
    }
    const stripeTex = new THREE.CanvasTexture(stripeCanvas);
    stripeTex.wrapS = stripeTex.wrapT = THREE.RepeatWrapping;
    stripeTex.repeat.set(1, 1);
    stripeTex.anisotropy = 8;
    const ringMat = new THREE.MeshStandardMaterial({
      map: stripeTex,
      color: 0xb89148,
      metalness: 0.92, roughness: 0.35
    });

    // top plate (Côtes de Genève)
    const plateGeom = new THREE.CylinderGeometry(radius - 0.2, radius - 0.2, 0.15, 96, 1);
    const plate = new THREE.Mesh(plateGeom, ringMat);
    plate.position.y = 0.05;
    plate.receiveShadow = true;
    grp.add(plate);

    // engraved outer edge (thin annulus)
    const annulusGeom = new THREE.RingGeometry(radius - 0.7, radius - 0.1, 96);
    const annulusMat = new THREE.MeshStandardMaterial({
      color: 0x5a3d18, metalness: 0.7, roughness: 0.6, side: THREE.DoubleSide
    });
    const annulus = new THREE.Mesh(annulusGeom, annulusMat);
    annulus.rotation.x = -Math.PI / 2;
    annulus.position.y = 0.13;
    grp.add(annulus);

    // recessed inner ring
    const innerGeom = new THREE.RingGeometry(radius * 0.6, radius * 0.66, 64);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x6a4a1c, metalness: 0.8, roughness: 0.5, side: THREE.DoubleSide
    });
    const innerRing = new THREE.Mesh(innerGeom, innerMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = 0.13;
    grp.add(innerRing);

    // small ruby jewels around the rim
    const decJewelGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.18, 16);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      const j = new THREE.Mesh(decJewelGeom, matRuby);
      j.position.set(Math.cos(a) * (radius - 0.5), 0.18, Math.sin(a) * (radius - 0.5));
      grp.add(j);
    }

    // small screws (blued steel) on the outer ring
    const screwGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.18, 8);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const s = new THREE.Mesh(screwGeom, matBlued);
      s.position.set(Math.cos(a) * (radius - 2.2), 0.18, Math.sin(a) * (radius - 2.2));
      grp.add(s);
      // screw slot
      const slotGeom = new THREE.BoxGeometry(0.4, 0.05, 0.08);
      const slot = new THREE.Mesh(slotGeom, matSteelDark);
      slot.position.set(Math.cos(a) * (radius - 2.2), 0.27, Math.sin(a) * (radius - 2.2));
      slot.rotation.y = a;
      grp.add(slot);
    }

    return grp;
  }

  // ===================================================================
  //  MOVEMENT  —  composed group containing every interactive part
  // ===================================================================
  const movement = new THREE.Group();
  scene.add(movement);

  const interactive = []; // parts that respond to clicks

  // registry of named parts
  const parts = {};

  function registerPart(name, displayName, en, desc, stats, refs) {
    parts[name] = { name: displayName, en, desc, stats: stats || [], refs: refs || [] };
  }

  // -------- gear train specification -------------------------------
  const train = [
    { name: 'barrel',  teeth: 60, pitchR: 11.0, depth: 0.7, mat: matBrass,  spokes: 6, color: 'brass' },
    { name: 'center',  teeth: 36, pitchR:  6.6, depth: 0.7, mat: matSteel,  spokes: 4, color: 'steel' },
    { name: 'third',   teeth: 26, pitchR:  4.8, depth: 0.7, mat: matSteel,  spokes: 4, color: 'steel' },
    { name: 'fourth',  teeth: 18, pitchR:  3.4, depth: 0.7, mat: matSteel, spokes: 3, color: 'steel' },
    { name: 'escape',  teeth: 15, pitchR:  2.3, depth: 0.7, mat: matGold, special: true, color: 'gold' },
  ];

  // compute positions so each gear's pitch circle touches the previous one
  // angles describe the direction from previous gear to current gear
  const gearAngles = [0, 0, -Math.PI / 2, -Math.PI / 2, 0];
  const gearPos = {};
  let cursor = new THREE.Vector2(0, 0);
  let prevR = train[0].pitchR;
  gearPos.barrel = cursor.clone();
  for (let i = 1; i < train.length; i++) {
    const dist = prevR + train[i].pitchR;
    const a = gearAngles[i];
    cursor = new THREE.Vector2(
      cursor.x + Math.cos(a) * dist,
      cursor.y + Math.sin(a) * dist
    );
    gearPos[train[i].name] = cursor.clone();
    prevR = train[i].pitchR;
  }

  // pallet pivot — placed so its arms face the escape wheel teeth
  gearPos.pallet = new THREE.Vector2(
    gearPos.escape.x + 5.5,
    gearPos.escape.y
  );
  // balance pivot — 90° away from the pallet-escape line so the fork
  // can naturally engage the impulse pin
  gearPos.balance = new THREE.Vector2(
    gearPos.pallet.x,
    gearPos.pallet.y + 9.5
  );

  // re-center everything on the bounding box of the wheels themselves
  // (taking pitch radius into account so the plate looks balanced)
  let xMin =  Infinity, xMax = -Infinity, yMin =  Infinity, yMax = -Infinity;
  for (const n in gearPos) {
    const p = gearPos[n], r = (n === 'balance') ? 5.5 :
                               (n === 'pallet') ? 3.4 :
                               train.find(t => t.name === n).pitchR;
    xMin = Math.min(xMin, p.x - r);
    xMax = Math.max(xMax, p.x + r);
    yMin = Math.min(yMin, p.y - r);
    yMax = Math.max(yMax, p.y + r);
  }
  const layoutCentroid = new THREE.Vector2((xMin + xMax) / 2, (yMin + yMax) / 2);
  for (const k in gearPos) gearPos[k].sub(layoutCentroid);

  // -------- build the wheels --------------------------------------
  const wheels = {}; // { name: THREE.Group, mesh, phase, ratio }
  // speed (rad/s) of the barrel — visually pleasant
  const BASE_OMEGA = 0.28;

  for (let i = 0; i < train.length; i++) {
    const s = train[i];
    const grp = new THREE.Group();
    grp.position.set(gearPos[s.name].x, 0.65, gearPos[s.name].y);
    movement.add(grp);

    const mesh = buildWheel(s);
    grp.add(mesh);

    // central shaft
    const shaftR = s.pitchR * 0.13;
    const shaftGeom = new THREE.CylinderGeometry(shaftR, shaftR, s.depth * 3.5, 14);
    const shaft = new THREE.Mesh(shaftGeom, matSteelDark);
    shaft.position.y = 0;
    shaft.castShadow = true;
    grp.add(shaft);

    // ruby jewel cap on top
    const jewelGeom = new THREE.CylinderGeometry(shaftR * 1.8, shaftR * 1.8, 0.16, 18);
    const jewel = new THREE.Mesh(jewelGeom, matRuby);
    jewel.position.y = s.depth * 1.5 + 0.08;
    grp.add(jewel);
    jewel.userData.partName = s.name;

    // attach click target (whole wheel group; we'll raycast against children)
    grp.traverse((c) => { if (c.isMesh) c.userData.partName = s.name; });
    interactive.push(mesh, shaft, jewel);

    wheels[s.name] = { grp, mesh, ratio: 0, sign: 1, phase: 0 };
  }

  // compute gear ratios relative to the barrel
  // speed of gear i = barrel * (-1)^i * (N_barrel / N_i)
  let runningRatio = 1, runningSign = 1;
  for (let i = 0; i < train.length; i++) {
    if (i === 0) {
      wheels.barrel.ratio = 1; wheels.barrel.sign = 1;
    } else {
      const Nprev = train[i - 1].teeth;
      const Ncurr = train[i].teeth;
      runningSign *= -1;
      runningRatio *= (Nprev / Ncurr);
      wheels[train[i].name].ratio = runningRatio;
      wheels[train[i].name].sign = runningSign;
    }
  }

  // initial phase offsets so teeth mesh (visual alignment)
  function computePhaseOffsets() {
    for (let i = 1; i < train.length; i++) {
      const A = train[i - 1];
      const B = train[i];
      const ang = gearAngles[i]; // direction from A to B
      // contact point on B's frame = ang + PI
      // we want a tooth-gap on B at contact point.
      // tooth angle of A nearest contact = round((ang)/(2π/N_A)) * 2π/N_A
      // that tooth is at A.angle + that value.
      // for meshing we want B's nearest gap at (ang + π) in world space.
      // try several j values and pick the one closest to a smooth visual
      const N_A = A.teeth, N_B = B.teeth;
      const stepA = (Math.PI * 2) / N_A;
      const stepB = (Math.PI * 2) / N_B;
      // offset of B = -(A.angle)*N_A/N_B + (ang + π) - (gap_offset)
      // gap_offset = (k + 0.5) * stepB
      const ratio = N_A / N_B;
      // pick k such that initial phase ≈ π (so a tooth-gap faces A)
      const target = ang + Math.PI - 0.5 * stepB;
      const phase = -wheels[A.name].phase * ratio + target;
      // mod into [-π, π]
      let p = phase;
      while (p >  Math.PI) p -= Math.PI * 2;
      while (p < -Math.PI) p += Math.PI * 2;
      wheels[B.name].phase = p;
    }
  }
  computePhaseOffsets();

  // ===================================================================
  //  PALLET FORK  (anchor / 擒纵叉)
  // ===================================================================
  function buildPalletFork() {
    const grp = new THREE.Group();
    grp.position.set(gearPos.pallet.x, 0.95, gearPos.pallet.y);

    // the fork itself: a flat anchor shape lying in the XZ plane
    // build the shape in XY first then rotate to XZ
    const armLen = 3.0;
    const armW   = 0.55;

    const armShape = new THREE.Shape();
    armShape.moveTo(-armLen, -armW / 2);
    armShape.lineTo( armLen, -armW / 2);
    armShape.lineTo( armLen * 0.9,  armW / 2);
    armShape.lineTo(-armLen * 0.9,  armW / 2);
    armShape.closePath();

    const armGeom = new THREE.ExtrudeGeometry(armShape, {
      depth: 0.45, bevelEnabled: true,
      bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 2, steps: 1
    });
    armGeom.rotateX(-Math.PI / 2);
    armGeom.translate(0, 0.225, 0);

    const arm = new THREE.Mesh(armGeom, matPallet);
    arm.castShadow = true;
    arm.receiveShadow = true;
    grp.add(arm);

    // pallet stones — two ruby jewels at the ends of the arms
    const stoneGeom = new THREE.BoxGeometry(0.6, 0.5, 0.5);
    const stoneL = new THREE.Mesh(stoneGeom, matRuby);
    stoneL.position.set(-armLen - 0.05, 0.3, 0);
    grp.add(stoneL);

    const stoneR = new THREE.Mesh(stoneGeom, matRuby);
    stoneR.position.set( armLen + 0.05, 0.3, 0);
    grp.add(stoneR);

    // central pivot disc
    const pivotGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.7, 18);
    const pivot = new THREE.Mesh(pivotGeom, matSteel);
    pivot.castShadow = true;
    grp.add(pivot);

    // fork (forked tail opposite the arms — engages balance roller pin)
    // arms lie along X; the fork extends in -Z toward the balance
    const forkGeom = new THREE.BoxGeometry(0.4, 0.45, 2.4);
    const fork = new THREE.Mesh(forkGeom, matPallet);
    fork.position.set(0, 0.35, -2.6);
    fork.castShadow = true;
    grp.add(fork);

    // the fork slot — two thin parallel prongs with a gap
    const prongGeom = new THREE.BoxGeometry(0.06, 0.46, 2.4);
    const slotColor = new THREE.MeshStandardMaterial({ color: 0x1a0a0a, metalness: 0.5, roughness: 0.6 });
    const prongL = new THREE.Mesh(prongGeom, slotColor);
    prongL.position.set( 0.14, 0.36, -2.6);
    grp.add(prongL);
    const prongR = new THREE.Mesh(prongGeom, slotColor);
    prongR.position.set(-0.14, 0.36, -2.6);
    grp.add(prongR);

    grp.traverse((c) => { if (c.isMesh) c.userData.partName = 'pallet'; });
    interactive.push(arm, stoneL, stoneR, pivot, fork, prongL, prongR);
    return grp;
  }

  const palletFork = buildPalletFork();
  movement.add(palletFork);
  // orient pallet fork: arms along ±X (local), fork in -Z (local).
  // arms must reach toward the escape wheel; fork must point toward balance.
  // (these two constraints fix a single rotation around Y because the
  //  geometry has arms perpendicular to the fork).
  const dirToEsc = new THREE.Vector2(
    gearPos.escape.x - gearPos.pallet.x,
    gearPos.escape.y - gearPos.pallet.y
  ).normalize();
  // local -X must point along dirToEsc => rotation.y such that
  // (cos θ, 0, -sin θ) = -dirToEsc (world)
  // i.e. rotation.y = atan2(dirToEsc.y, -dirToEsc.x)
  palletFork.rotation.y = Math.atan2(dirToEsc.y, -dirToEsc.x);

  // ===================================================================
  //  BALANCE WHEEL + HAIRSPRING + ROLLER
  // ===================================================================
  function buildBalance() {
    const grp = new THREE.Group();
    grp.position.set(gearPos.balance.x, 0, gearPos.balance.y);

    const R = 5.8;     // balance rim radius
    const rimDepth = 0.45;
    const rimT = 0.4;  // rim thickness radially

    // outer rim (torus-like — two cylinders to fake a ring)
    const rimOuter = new THREE.Mesh(
      new THREE.CylinderGeometry(R, R, rimDepth, 64, 1, true),
      matBrass
    );
    rimOuter.castShadow = true;
    rimOuter.receiveShadow = true;
    grp.add(rimOuter);
    // inner rim wall to make it look thick
    const rimInner = new THREE.Mesh(
      new THREE.CylinderGeometry(R - rimT, R - rimT, rimDepth + 0.05, 64, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x6a4d20, metalness: 0.9, roughness: 0.4 })
    );
    rimInner.material.side = THREE.BackSide;
    grp.add(rimInner);

    // top & bottom rim caps
    const capGeom = new THREE.RingGeometry(R - rimT, R, 64);
    const capMat = matBrass;
    const capTop = new THREE.Mesh(capGeom, capMat);
    capTop.rotation.x = -Math.PI / 2;
    capTop.position.y = rimDepth / 2;
    grp.add(capTop);
    const capBot = new THREE.Mesh(capGeom, capMat);
    capBot.rotation.x = Math.PI / 2;
    capBot.position.y = -rimDepth / 2;
    grp.add(capBot);

    // spokes — 3 thin bars from hub to rim, sitting LOWER so hairspring
    // sits clearly above them.
    const spokeGeom = new THREE.BoxGeometry(R - rimT - 0.05, 0.18, 0.32);
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const s = new THREE.Mesh(spokeGeom, matBrassLight);
      s.position.set(Math.cos(a) * (R - rimT) * 0.5, -0.18, Math.sin(a) * (R - rimT) * 0.5);
      s.rotation.y = -a;
      s.castShadow = true;
      grp.add(s);
    }

    // central hub
    const hubGeom = new THREE.CylinderGeometry(0.55, 0.55, rimDepth + 0.5, 18);
    const hub = new THREE.Mesh(hubGeom, matBrassLight);
    hub.castShadow = true;
    grp.add(hub);

    // hairspring — a flat spiral, sitting clearly above the spokes
    const hairspring = buildHairspring(R * 0.55, R * 0.92, 5.5, 0.12, 0.07);
    hairspring.position.y = 0.28;
    grp.add(hairspring);

    // roller (small disc above the balance with impulse pin)
    const rollerGroup = new THREE.Group();
    rollerGroup.position.y = rimDepth / 2 + 0.35;
    const rollerGeom = new THREE.CylinderGeometry(0.95, 0.95, 0.18, 28);
    const roller = new THREE.Mesh(rollerGeom, matSteel);
    roller.castShadow = true;
    rollerGroup.add(roller);
    // impulse pin (small ruby)
    const pinGeom = new THREE.BoxGeometry(0.18, 0.42, 0.18);
    const pin = new THREE.Mesh(pinGeom, matRuby);
    pin.position.set(0.78, 0.22, 0);
    rollerGroup.add(pin);
    grp.add(rollerGroup);

    // screws on rim (visual detail)
    const screwGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.16, 8);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const sc = new THREE.Mesh(screwGeom, matBlued);
      sc.position.set(Math.cos(a) * (R - rimT * 0.5), rimDepth / 2 + 0.04, Math.sin(a) * (R - rimT * 0.5));
      grp.add(sc);
    }

    grp.traverse((c) => { if (c.isMesh) c.userData.partName = 'balance'; });
    interactive.push(rimOuter, rimInner, hub, roller, pin, hairspring);
    return { group: grp, hairspring, rollerGroup };
  }

  function buildHairspring(rMin, rMax, turns, tubeR, thick) {
    const segments = Math.floor(turns * 48);
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const a = t * turns * Math.PI * 2;
      const r = rMin + (rMax - rMin) * t;
      pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const geom = new THREE.TubeGeometry(curve, segments, tubeR, 6, false);
    const mesh = new THREE.Mesh(geom, matBlued);
    mesh.castShadow = true;
    return mesh;
  }

  const balance = buildBalance();
  movement.add(balance.group);
  // orient the balance so its impulse pin points at the pallet fork.
  // the pin extends along the local +X axis; we rotate around Y so it
  // points from the balance pivot toward the pallet pivot.
  const dirBP = new THREE.Vector2(
    gearPos.pallet.x - gearPos.balance.x,
    gearPos.pallet.y - gearPos.balance.y
  );
  // Three.js Y-axis rotation: local +X -> world (cos a, 0, -sin a)
  const a0 = Math.atan2(-dirBP.y, dirBP.x);
  balance.group.rotation.y = a0;

  // ===================================================================
  //  BASE PLATE
  // ===================================================================
  movement.add(buildBasePlate());

  // ===================================================================
  //  BRIDGES  —  decorative flat brass plates holding each pivot
  // ===================================================================
  function buildBridge(pos, w, h, rotY, mat) {
    // oval / rounded rectangle shape with a central jewel hole
    const shape = new THREE.Shape();
    const w2 = w / 2, h2 = h / 2, r = Math.min(w, h) * 0.45;
    shape.moveTo(-w2 + r, -h2);
    shape.lineTo( w2 - r, -h2);
    shape.quadraticCurveTo( w2, -h2,  w2, -h2 + r);
    shape.lineTo( w2,  h2 - r);
    shape.quadraticCurveTo( w2,  h2,  w2 - r,  h2);
    shape.lineTo(-w2 + r,  h2);
    shape.quadraticCurveTo(-w2,  h2, -w2,  h2 - r);
    shape.lineTo(-w2, -h2 + r);
    shape.quadraticCurveTo(-w2, -h2, -w2 + r, -h2);
    shape.closePath();
    // jewel hole
    const hole = new THREE.Path();
    hole.absarc(0, 0, 0.55, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.4, bevelEnabled: true,
      bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 2, steps: 1
    });
    geom.rotateX(-Math.PI / 2);
    geom.translate(0, 0.2, 0);
    const mesh = new THREE.Mesh(geom, mat || matBrassDark);
    mesh.position.set(pos.x, 1.0, pos.y);
    mesh.rotation.y = rotY || 0;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  // bridges — smaller and less obtrusive than before
  movement.add(buildBridge(gearPos.barrel, 6,  6,  0,            matBrassDark));
  movement.add(buildBridge(gearPos.center, 4.2, 4.2, Math.PI / 5, matBrassDark));
  movement.add(buildBridge(gearPos.third,  3.4, 3.4, Math.PI / 4, matBrassDark));
  movement.add(buildBridge(gearPos.fourth, 2.8, 2.8, Math.PI / 3, matBrassDark));
  movement.add(buildBridge(gearPos.pallet, 2.4, 2.4, Math.PI / 6, matBrassDark));

  // ===================================================================
  //  PART DESCRIPTIONS
  // ===================================================================
  registerPart('barrel',
    '发条盒', 'Mainspring Barrel',
    '储存能量的核心部件。发条上紧后储存在螺旋弹簧中，缓缓释放的能量驱动整个传动轮系。盒盖上的齿圈与中心轮的小齿 (pinion) 直接啮合。',
    [{ k: '齿数', v: '60T' }, { k: '材料', v: '黄铜' }, { k: '位置', v: '动力源头' }]
  );
  registerPart('center',
    '中心轮', 'Center Wheel',
    '传动轮系的第一级。它的小齿 (pinion) 与发条盒齿圈啮合并被它驱动；其大齿则带动下一级 (三轮)。在真实机芯中，中心轮的轴心贯穿机芯，用以固定分针与时针。',
    [{ k: '齿数', v: '36T' }, { k: '传动比', v: '60:36' }, { k: '作用', v: '一级减速' }]
  );
  registerPart('third',
    '三轮', 'Third Wheel',
    '传动轮系的第二级，承接中心轮的大齿，并把动力传递给四轮。在计时码表中三轮常作为秒针驱动轮；在普通机芯中它位于中央到擒纵之间的传递路径上。',
    [{ k: '齿数', v: '26T' }, { k: '传动比', v: '36:26' }, { k: '作用', v: '二级减速' }]
  );
  registerPart('fourth',
    '四轮', 'Fourth Wheel',
    '传动轮系的第三级。它的小齿与三轮大齿啮合，大齿则带动擒纵轮的 pinion。四轮的轴心通常穿过表盘，用于驱动秒针，因此又叫"秒轮"。',
    [{ k: '齿数', v: '18T' }, { k: '传动比', v: '26:18' }, { k: '作用', v: '驱动秒针' }]
  );
  registerPart('escape',
    '擒纵轮', 'Escape Wheel',
    '擒纵机构的关键部件，齿形经过专门设计 (不对称勾形)，只为单向释放。擒纵叉每次摆动都释放一个齿，它因此成为整只表的"心跳控制器"。',
    [{ k: '齿数', v: '15T' }, { k: '材料', v: '合金钢' }, { k: '特点', v: '专用齿形' }]
  );
  registerPart('pallet',
    '擒纵叉', 'Pallet Fork',
    '擒纵机构的"门"。两端的红宝石叉瓦 (pallet stones) 交替卡住和释放擒纵轮的齿，把持续的能量流切分成等距的"嘀嗒"节拍。中央的叉口 (fork) 与摆轮圆盘上的冲击钉配合。',
    [{ k: '摆幅', v: '±10°' }, { k: '叉瓦', v: '红宝石' }, { k: '动作', v: '双向摆动' }]
  );
  registerPart('balance',
    '摆轮游丝', 'Balance Wheel & Hairspring',
    '机械表的"心脏"。摆轮以固定频率来回摆动 (本演示约 1.4 Hz)，游丝 (hairspring) 提供回复力。摆轮每经过中点一次就触发擒纵叉释放一个齿，因此决定了整只表的走时精度。',
    [{ k: '频率', v: '≈ 1.4 Hz' }, { k: '摆幅', v: '±150°' }, { k: '游丝', v: '蓝钢' }]
  );

  // ===================================================================
  //  CONTROLS — orbit
  // ===================================================================
  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 18;
  controls.maxDistance = 80;
  controls.minPolarAngle = 0.15;
  controls.maxPolarAngle = Math.PI * 0.46;
  controls.enablePan = true;
  controls.panSpeed = 0.6;
  controls.rotateSpeed = 0.85;
  controls.zoomSpeed = 0.9;

  // ===================================================================
  //  RAYCASTING — click to inspect
  // ===================================================================
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let pointerDownPos = null;
  let pointerDownTime = 0;

  function setPointer(e) {
    const r = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width)  *  2 - 1;
    pointer.y = ((e.clientY - r.top)  / r.height) * -2 + 1;
  }

  function pickPart() {
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(interactive, false);
    if (!hits.length) return null;
    const obj = hits[0].object;
    return obj.userData.partName || null;
  }

  function showInfo(name) {
    const p = parts[name];
    if (!p) return;
    nameEl.textContent  = p.name;
    enEl.textContent    = p.en;
    descEl.textContent  = p.desc;
    tagEl.textContent   = (p.en || '').toUpperCase();
    statsEl.innerHTML   = p.stats.map(s =>
      `<div><div class="k">${s.k}</div><div class="v">${s.v}</div></div>`
    ).join('');
    infoEl.classList.add('show');
  }
  function hideInfo() { infoEl.classList.remove('show'); }
  infoEl.querySelector('.close').addEventListener('click', hideInfo);

  canvas.addEventListener('pointerdown', (e) => {
    pointerDownPos = { x: e.clientX, y: e.clientY };
    pointerDownTime = performance.now();
  });
  canvas.addEventListener('pointerup', (e) => {
    setPointer(e);
    const dx = e.clientX - pointerDownPos.x;
    const dy = e.clientY - pointerDownPos.y;
    const dt = performance.now() - pointerDownTime;
    if (Math.hypot(dx, dy) < 6 && dt < 350) {
      const name = pickPart();
      if (name) showInfo(name);
      else hideInfo();
    }
  });

  // ESC to close panel
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideInfo();
  });

  // ===================================================================
  //  ANIMATION
  // ===================================================================
  const clock = new THREE.Clock();

  // balance frequency (Hz) — derived from the gear train so everything
  // is physically coupled to the gear ratios.
  // ω_balance = ω_barrel × (N_barrel / N_escape) × (N_escape / 2π) / 2
  // The two beats per balance oscillation come from the pallet.
  const balanceHz = (BASE_OMEGA * (train[0].teeth / train[train.length - 1].teeth) * train[train.length - 1].teeth) / (2 * Math.PI * 2);

  function animate() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t  = clock.elapsedTime;

    // ---- gear train ----
    for (const name in wheels) {
      const w = wheels[name];
      w.grp.rotation.y = w.sign * BASE_OMEGA * w.ratio * t + w.phase;
    }

    // ---- pallet rocks twice per balance oscillation ----
    const palletAmp = 0.18; // radians
    palletFork.rotation.y = -palletAmp * Math.sin(2 * Math.PI * balanceHz * t);

    // ---- balance oscillation ----
    const balAmp = Math.PI * 0.85;
    balance.group.rotation.y = a0 + balAmp * Math.sin(2 * Math.PI * balanceHz * t);

    // hairspring breathes — inner end tracks balance, outer end fixed
    if (balance.hairspring) {
      // gentle counter-rotation to fake the spring uncoiling/contracting
      balance.hairspring.rotation.y = balAmp * 0.65 * Math.sin(2 * Math.PI * balanceHz * t + 0.1);
    }

    controls.update();
    renderer.render(scene, camera);

    // RPM / bph readout
    const bph = Math.round(balanceHz * 7200); // beats per hour
    if (rpmEl) rpmEl.textContent = bph + ' bph';

    requestAnimationFrame(animate);
  }

  // ===================================================================
  //  RESIZE
  // ===================================================================
  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  // kick off
  requestAnimationFrame(() => {
    loader.classList.add('gone');
    animate();
  });

})();
