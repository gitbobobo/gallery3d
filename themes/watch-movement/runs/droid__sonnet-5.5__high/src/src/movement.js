import * as THREE from 'three';
import * as ESC from './escapement.js';
import { DEG } from './gearMath.js';
import {
  SPEC,
  POS,
  PHASE,
  RE,
  Z,
  FRAME_ROT,
  PLATE_R,
  PLATE_CENTER,
  arborAngle,
} from './layout.js';
import {
  extrude,
  shapeFromPts,
  circlePts,
  holeFromPts,
  spokeWindows,
  wheelGeometry,
  escapeWheelGeometry,
  discGeometry,
  capsulePts,
  convexPts,
  spiralRibbon,
} from './gearGeom.js';
import { makeMaterials } from './materials.js';

const dirv = (deg) => ({ x: Math.cos(deg * DEG), y: Math.sin(deg * DEG) });
const rawToLocal = (x, y) => ({ x: x - PLATE_CENTER.x, y: y - PLATE_CENTER.y });

export function buildMovement() {
  const mat = makeMaterials();
  const root = new THREE.Group();
  root.rotation.x = -Math.PI / 2; // plane XY -> ground, +Z -> up
  const mv = new THREE.Group();
  root.add(mv);

  const parts = {}; // id -> [groups]
  const lifts = []; // [group, lift]
  const bridges = [];

  const reg = (id, group, lift = 0, { bridge = false } = {}) => {
    group.userData.partId = id;
    (parts[id] ||= []).push(group);
    group.userData.lift = lift;
    group.userData.baseZ = group.position.z;
    lifts.push(group);
    if (bridge) bridges.push(group);
    return group;
  };

  const M = (geo, material, { cast = true, receive = true } = {}) => {
    const m = new THREE.Mesh(geo, material);
    m.castShadow = cast;
    m.receiveShadow = receive;
    return m;
  };
  const cylGeo = (r, h, seg = 28) => {
    const g = new THREE.CylinderGeometry(r, r, h, seg);
    g.rotateX(Math.PI / 2);
    return g;
  };
  const cyl = (r, z0, z1, material, seg = 28) => {
    const m = M(cylGeo(r, z1 - z0, seg), material);
    m.position.z = (z0 + z1) / 2;
    return m;
  };

  // ------------------------------------------------------------------ jewels / screws
  const addJewel = (parent, x, y, z, flip = false) => {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    const ring = M(new THREE.TorusGeometry(0.52, 0.2, 14, 36), mat.brass);
    ring.scale.z = 0.6;
    ring.position.z = 0.12;
    const stone = M(new THREE.SphereGeometry(0.36, 20, 12), mat.ruby);
    stone.scale.z = 0.5;
    stone.position.z = 0.12;
    g.add(ring, stone);
    if (flip) g.rotation.x = Math.PI;
    parent.add(g);
    return g;
  };
  const addScrew = (parent, x, y, z, rot = 0) => {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    const head = cyl(0.42, 0, 0.16, mat.blued, 24);
    const slot = M(new THREE.BoxGeometry(0.8, 0.1, 0.06), mat.dark);
    slot.position.z = 0.16;
    slot.rotation.z = rot;
    g.add(head, slot);
    parent.add(g);
    return g;
  };

  // ------------------------------------------------------------------ mainplate
  const plate = new THREE.Group();
  {
    const g = new THREE.CylinderGeometry(PLATE_R, PLATE_R, 1, 160);
    g.rotateX(Math.PI / 2);
    g.translate(0, 0, -0.5);
    const base = M(g, [mat.ring, mat.plate, mat.ring]);
    base.castShadow = false;
    plate.add(base);

    const prof = [
      new THREE.Vector2(PLATE_R - 0.1, -1.4),
      new THREE.Vector2(PLATE_R + 1.8, -1.4),
      new THREE.Vector2(PLATE_R + 1.8, 0.1),
      new THREE.Vector2(PLATE_R + 1.45, 0.45),
      new THREE.Vector2(PLATE_R + 0.2, 0.45),
      new THREE.Vector2(PLATE_R - 0.1, 0.2),
    ];
    const lg = new THREE.LatheGeometry(prof, 160);
    lg.rotateX(Math.PI / 2);
    plate.add(M(lg, mat.ring));

    // engraved rings for decoration
    for (const [r, w] of [
      [PLATE_R - 1.0, 0.05],
      [PLATE_R - 1.5, 0.03],
    ]) {
      const ring = M(new THREE.RingGeometry(r - w, r + w, 160), mat.steelDark, { cast: false });
      ring.position.z = 0.012;
      plate.add(ring);
    }
  }
  mv.position.set(0, 0, 0);
  mv.add(plate);
  reg('plate', plate, 0);

  // jewel settings on the plate
  const jewelGroup = new THREE.Group();
  mv.add(jewelGroup);
  const frame = new THREE.Group();
  frame.position.set(POS.E.x, POS.E.y, 0);
  frame.rotation.z = FRAME_ROT;
  mv.add(frame);

  const lp = (nx, ny) => ({ x: nx * RE, y: ny * RE }); // normalised -> world, local frame
  const Pl = lp(ESC.P.x, ESC.P.y);
  const Bl = lp(0, -(ESC.D + ESC.FORK_TO_BALANCE));

  for (const k of ['B', 'C', 'T', 'F', 'E']) addJewel(jewelGroup, POS[k].x, POS[k].y, 0);
  reg('jewel', jewelGroup, 0);
  {
    const fj = new THREE.Group();
    frame.add(fj);
    addJewel(fj, Pl.x, Pl.y, 0);
    addJewel(fj, Bl.x, Bl.y, 0);
    reg('jewel', fj, 0);
  }

  // ------------------------------------------------------------------ helpers for wheels
  const gearMesh = (spec, opts, material, zc, thickness) => {
    const { geometry } = wheelGeometry(spec, { thickness, ...opts });
    const m = M(geometry, material);
    m.position.z = zc;
    return m;
  };
  const arbor = (r, z0, z1) => cyl(r, z0, z1, mat.steel, 16);

  // ------------------------------------------------------------------ barrel
  const barrel = new THREE.Group();
  barrel.position.set(POS.B.x, POS.B.y, 0);
  {
    const teeth = gearMesh(SPEC.barrel, {}, mat.brass, Z.s1, 0.4);
    barrel.add(teeth);
    const bz0 = 0.35;
    const bz1 = 2.08;
    const R = 6.88;
    const prof = [
      new THREE.Vector2(0.6, bz0),
      new THREE.Vector2(R - 0.2, bz0),
      new THREE.Vector2(R, bz0 + 0.12),
      new THREE.Vector2(R, bz1 - 0.12),
      new THREE.Vector2(R - 0.14, bz1),
      new THREE.Vector2(5.75, bz1),
      new THREE.Vector2(5.75, bz1 - 0.1),
      new THREE.Vector2(R - 0.45, bz1 - 0.1),
      new THREE.Vector2(R - 0.45, bz0 + 0.3),
      new THREE.Vector2(0.6, bz0 + 0.3),
    ];
    const lg = new THREE.LatheGeometry(prof, 128);
    lg.rotateX(Math.PI / 2);
    const drum = M(lg, mat.brass);
    barrel.add(drum);

    const sp = new THREE.Group();
    const ribbon = spiralRibbon({ turns: 11, r0: 1.0, r1: R - 0.55, z0: 0.65, z1: 1.95, thick: 0.13, segments: 11 * 40 });
    ribbon.set();
    sp.add(M(ribbon.geometry, mat.spring));
    // spring hook on the arbor side
    sp.add(cyl(0.95, 0.6, 1.95, mat.steelDark, 24));
    barrel.add(sp);
    reg('mainspring', sp, 0);
  }
  mv.add(barrel);
  reg('barrel', barrel, 4);

  // static barrel arbor with ratchet wheel and click
  const barrelArbor = new THREE.Group();
  barrelArbor.position.set(POS.B.x, POS.B.y, 0);
  barrelArbor.add(cyl(0.55, 0.1, 8.15, mat.steel, 32));
  mv.add(barrelArbor);
  reg('barrelArbor', barrelArbor, 4);

  const ratchet = new THREE.Group();
  ratchet.position.set(POS.B.x, POS.B.y, Z.bridgeTop + 0.1);
  {
    const n = 40;
    const R0 = 2.9;
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2;
      const a1 = ((i + 1) / n) * Math.PI * 2;
      pts.push([R0 * Math.cos(a0), R0 * Math.sin(a0)]);
      pts.push([(R0 - 0.28) * Math.cos(a0 + (a1 - a0) * 0.82), (R0 - 0.28) * Math.sin(a0 + (a1 - a0) * 0.82)]);
    }
    const shape = shapeFromPts(pts);
    shape.holes.push(...spokeWindows({ hubR: 0.9, rimIn: 2.15, n: 5, spokeW: 0.4, twist: -0.45 }));
    const w = M(extrude(shape, 0.38, { bevel: 0.03 }), mat.steel);
    w.position.z = 0.25;
    ratchet.add(w);
    ratchet.add(cyl(0.5, 0, 0.7, mat.brass, 24));
    addScrew(ratchet, 0, 0, 0.62, 0.7);
  }
  mv.add(ratchet);
  reg('ratchet', ratchet, 14);

  const click = new THREE.Group();
  {
    const pol = (deg, r) => ({ x: POS.B.x + r * Math.cos(deg * DEG), y: POS.B.y + r * Math.sin(deg * DEG) });
    const pivot = pol(68, 4.7);
    const tip = pol(86, 2.8);
    const body = M(extrude(shapeFromPts(capsulePts(pivot, tip, 0.5, 0.13)), 0.3, { bevel: 0.02 }), mat.blued);
    body.position.z = 0.15;
    click.add(body);
    const pin = cyl(0.24, 0, 0.55, mat.steel, 16);
    pin.position.x = pivot.x;
    pin.position.y = pivot.y;
    click.add(pin);
  }
  click.position.z = Z.bridgeTop + 0.25;
  mv.add(click);
  reg('click', click, 14);

  // ------------------------------------------------------------------ train arbors
  const makeStage = (id, key, pinion, pinionZ, wheel, wheelOpts, wheelZ, lift) => {
    const g = new THREE.Group();
    g.position.set(POS[key].x, POS[key].y, 0);
    g.add(arbor(key === 'E' ? 0.1 : 0.14, 0.1, 7.9));
    if (pinion) g.add(gearMesh(SPEC[pinion], {}, mat.steel, pinionZ, 0.6));
    if (wheel) {
      g.add(gearMesh(SPEC[wheel], wheelOpts, mat.brass, wheelZ, 0.4));
      g.add(cyl(0.55, wheelZ - 0.32, wheelZ + 0.32, mat.brassDark, 24));
    }
    mv.add(g);
    reg(id, g, lift);
    return g;
  };

  const center = makeStage('center', 'C', 'cPinion', Z.s1, 'cWheel', { spokes: 5, hubR: 1.25, rimWidth: 0.5, spokeW: 0.46, twist: 0.4 }, Z.s2, 6);
  const third = makeStage('third', 'T', 'tPinion', Z.s2, 'tWheel', { spokes: 5, hubR: 1.1, rimWidth: 0.5, spokeW: 0.42, twist: -0.4 }, Z.s3, 6);
  const fourth = makeStage('fourth', 'F', 'fPinion', Z.s3, 'fWheel', { spokes: 6, hubR: 1.0, rimWidth: 0.45, spokeW: 0.38, twist: 0.4 }, Z.s4, 6);

  // escape wheel (rotates in the plane, not in the escapement frame)
  const escape = new THREE.Group();
  escape.position.set(POS.E.x, POS.E.y, 0);
  escape.add(arbor(0.1, 0.1, 7.9));
  escape.add(gearMesh(SPEC.ePinion, {}, mat.steel, Z.s4, 0.6));
  {
    const ew = M(escapeWheelGeometry({ thickness: 0.4, scale: RE }), mat.brass);
    ew.position.z = Z.s5;
    escape.add(ew);
    escape.add(cyl(0.45, Z.s5 - 0.3, Z.s5 + 0.3, mat.brassDark, 24));
  }
  mv.add(escape);
  reg('escape', escape, 6);

  // ------------------------------------------------------------------ pallet fork
  const fork = new THREE.Group();
  fork.position.set(Pl.x, Pl.y, 0);
  frame.add(fork);
  const rel = (q) => ({ x: (q.x - ESC.P.x) * RE, y: (q.y - ESC.P.y) * RE });
  {
    const zc = Z.s5;
    const flat = (pts, th, material, z = zc, bevel = 0.02) => {
      const m = M(extrude(shapeFromPts(pts), th, { bevel }), material);
      m.position.z = z;
      return m;
    };
    fork.add(arbor(0.14, 0.1, 7.9));
    fork.add(flat(circlePts(0.62, 32), 0.4, mat.steel));
    fork.add(cyl(0.42, zc + 0.15, zc + 0.5, mat.brassDark, 20));

    const pallets = new THREE.Group();
    for (const key of ['entry', 'exit']) {
      const s = ESC.stones[key];
      const poly = s.local.map((q) => {
        const r = rel(q);
        return [r.x, r.y];
      });
      const cx = poly.reduce((a, p) => a + p[0], 0) / poly.length;
      const cy = poly.reduce((a, p) => a + p[1], 0) / poly.length;
      fork.add(flat(capsulePts({ x: 0, y: 0 }, { x: cx * 0.92, y: cy * 0.92 }, 0.34, 0.2), 0.36, mat.steel));
      pallets.add(flat(poly, 0.46, mat.ruby, zc, 0.015));
    }
    fork.add(pallets);
    reg('pallets', pallets, 0);

    // tail with slot
    const d = ESC.FORK_TO_BALANCE * RE;
    const rr = ESC.ROLLER_R * RE;
    const Lf = d - rr;
    const w = 0.7;
    const barY = -(Lf - 0.62);
    fork.add(flat(capsulePts({ x: 0, y: 0 }, { x: 0, y: barY }, 0.32, 0.26), 0.4, mat.steel));
    fork.add(flat(capsulePts({ x: -(w + 0.18), y: barY }, { x: w + 0.18, y: barY }, 0.22, 0.22), 0.4, mat.steel));
    for (const sx of [-1, 1]) {
      fork.add(flat(capsulePts({ x: sx * (w + 0.18), y: barY }, { x: sx * (w + 0.18), y: -(Lf + 0.07) }, 0.2, 0.18), 0.4, mat.steel));
    }
    // guard dart above the fork, tip 0.78 from the balance centre
    const dartTip = -(d - 0.78);
    fork.add(flat(capsulePts({ x: 0, y: -(Lf - 1.6) }, { x: 0, y: dartTip }, 0.16, 0.06), 0.3, mat.steel, zc + 0.35, 0.01));
  }
  reg('fork', fork, 6);

  // banking pins
  {
    const g = new THREE.Group();
    for (const sx of [-1, 1]) {
      const pin = cyl(0.2, 0.1, 6.4, mat.steel, 16);
      pin.position.x = Pl.x + sx * 0.78;
      pin.position.y = Pl.y - 3.0;
      g.add(pin);
    }
    frame.add(g);
    reg('banking', g, 0);
  }

  // ------------------------------------------------------------------ balance
  const balance = new THREE.Group();
  balance.position.set(Bl.x, Bl.y, 0);
  frame.add(balance);
  {
    balance.add(arbor(0.16, 0.1, 9.15));
    const bz = 7.2;
    const wheelShape = shapeFromPts(circlePts(5.2, 128));
    wheelShape.holes.push(...spokeWindows({ hubR: 0.95, rimIn: 4.62, n: 3, spokeW: 0.55, twist: 0.55, arc: 24 }));
    const wheel = M(extrude(wheelShape, 0.46, { bevel: 0.035 }), mat.brass);
    wheel.position.z = bz;
    const wg = new THREE.Group();
    wg.add(wheel);
    wg.add(cyl(0.55, bz - 0.35, bz + 0.5, mat.brassDark, 24));
    const nScrews = 20;
    for (let i = 0; i < nScrews; i++) {
      const a = (i / nScrews) * Math.PI * 2 + 0.1;
      const big = i % 5 === 0;
      const s = cyl(big ? 0.24 : 0.17, bz + 0.2, bz + (big ? 0.5 : 0.42), mat.steel, 16);
      s.position.x = 5.0 * Math.cos(a);
      s.position.y = 5.0 * Math.sin(a);
      wg.add(s);
    }
    // collet for the hairspring
    wg.add(cyl(0.5, 7.55, 7.85, mat.steel, 20));
    balance.add(wg);
    reg('balance', wg, 0);

    // roller table, impulse jewel and safety roller
    const rg = new THREE.Group();
    const table = M(discGeometry(1.85, 0.36, { bevel: 0.03, n: 72 }), mat.steel);
    table.position.z = 5.62;
    rg.add(table);
    const pin = cyl(0.3, 5.7, 6.3, mat.ruby, 20);
    pin.position.x = ESC.ROLLER_R * RE;
    rg.add(pin);
    {
      const rs = 0.9;
      const rc = 0.62;
      const half = 60 * DEG;
      const pts = [];
      const n = 40;
      for (let i = 0; i <= n; i++) {
        const a = half + ((2 * Math.PI - 2 * half) * i) / n;
        pts.push([rs * Math.cos(a), rs * Math.sin(a)]);
      }
      for (let i = 0; i <= 12; i++) {
        const a = -half + (2 * half * i) / 12;
        pts.push([rc * Math.cos(a), rc * Math.sin(a)]);
      }
      const safety = M(extrude(shapeFromPts(pts), 0.28, { bevel: 0.02 }), mat.steel);
      safety.position.z = 6.62;
      rg.add(safety);
      rg.add(cyl(0.3, 5.5, 6.9, mat.steel, 16));
    }
    balance.add(rg);
    reg('roller', rg, 0);
  }
  reg('balanceAssembly', balance, 6);

  // hairspring, fixed outer end, inner end follows the balance
  const hairGroup = new THREE.Group();
  hairGroup.position.set(Bl.x, Bl.y, 0);
  frame.add(hairGroup);
  const studAngle = 52 * DEG;
  const HAIR = { turns: 8, r0: 0.8, r1: 3.95 };
  const hair = spiralRibbon({ turns: HAIR.turns, r0: HAIR.r0, r1: HAIR.r1, z0: 7.62, z1: 7.8, thick: 0.07, segments: HAIR.turns * 56 });
  const hairMesh = M(hair.geometry, mat.hair);
  hairGroup.add(hairMesh);
  const studPos = { x: HAIR.r1 * Math.cos(studAngle), y: HAIR.r1 * Math.sin(studAngle) };
  const stud = cyl(0.2, 7.62, 8.58, mat.steel, 14);
  stud.position.x = studPos.x;
  stud.position.y = studPos.y;
  hairGroup.add(stud);
  reg('hairspring', hairGroup, 9);

  // ------------------------------------------------------------------ bridges & pillars
  const pillars = new THREE.Group();
  mv.add(pillars);
  const bridgeDef = (id, { z0, hubs, arms, lift, hubR }) => {
    const g = new THREE.Group();
    const th = 0.5;
    const zc = z0 + th / 2;
    const mk = (pts, holes = []) => {
      const shape = shapeFromPts(pts);
      holes.forEach((h) => shape.holes.push(holeFromPts(h)));
      const m = M(extrude(shape, th, { bevel: 0.055 }), mat.bridge);
      m.position.z = zc;
      return m;
    };
    for (const h of hubs) {
      g.add(mk(circlePts(h.r, 48, h.p.x, h.p.y), [circlePts(0.58, 24, h.p.x, h.p.y)]));
      addJewel(g, h.p.x, h.p.y, z0 + th - 0.08);
    }
    for (const a of arms) {
      const u = { x: a.to.x - a.from.x, y: a.to.y - a.from.y };
      const L = Math.hypot(u.x, u.y);
      u.x /= L;
      u.y /= L;
      const s0 = a.fromR ? { x: a.from.x + u.x * a.fromR * 0.8, y: a.from.y + u.y * a.fromR * 0.8 } : a.from;
      const s1 = a.toR ? { x: a.to.x - u.x * a.toR * 0.8, y: a.to.y - u.y * a.toR * 0.8 } : a.to;
      const m = mk(capsulePts(s0, s1, a.w0 ?? 0.65, a.w1 ?? 0.65));
      m.position.z += (Math.random() - 0.5) * 0.0008;
      g.add(m);
      if (a.pillar) {
        const head = mk(circlePts(0.95, 32, a.to.x, a.to.y));
        g.add(head);
        addScrew(g, a.to.x, a.to.y, z0 + th + 0.0, Math.random() * 3);
        const post = cyl(0.48, 0.0, z0, mat.brassDark, 20);
        post.position.x = a.to.x;
        post.position.y = a.to.y;
        pillars.add(post);
        const foot = cyl(0.7, 0, 0.12, mat.brassDark, 20);
        foot.position.x = a.to.x;
        foot.position.y = a.to.y;
        pillars.add(foot);
      }
    }
    mv.add(g);
    reg(id, g, lift, { bridge: true });
    return g;
  };
  const rl = rawToLocal;
  const ptFrom = (p, deg, r) => {
    const d = dirv(deg);
    return { x: p.x + d.x * r, y: p.y + d.y * r };
  };

  bridgeDef('bridgeBarrel', {
    z0: Z.bridgeBottom,
    lift: 14,
    hubs: [{ p: POS.B, r: 2.0 }],
    arms: [70, 163, 250].map((deg) => ({ from: POS.B, fromR: 2.0, to: ptFrom(POS.B, deg, 8.4), pillar: true, w0: 0.6, w1: 0.42 })),
  });
  {
    const p1 = rl(0, 8);
    const p2 = rl(13, 5);
    const p3 = rl(14, -8);
    bridgeDef('bridgeTrain', {
      z0: Z.bridgeBottom,
      lift: 14,
      hubs: [
        { p: POS.C, r: 1.8 },
        { p: POS.T, r: 1.6 },
        { p: POS.F, r: 1.6 },
      ],
      arms: [
        { from: POS.C, fromR: 1.8, to: POS.T, toR: 1.6, w0: 0.46, w1: 0.46 },
        { from: POS.T, fromR: 1.6, to: POS.F, toR: 1.6, w0: 0.46, w1: 0.46 },
        { from: POS.C, fromR: 1.8, to: p1, pillar: true, w0: 0.55, w1: 0.42 },
        { from: POS.T, fromR: 1.6, to: p2, pillar: true, w0: 0.5, w1: 0.42 },
        { from: POS.F, fromR: 1.6, to: p3, pillar: true, w0: 0.5, w1: 0.42 },
      ],
    });
  }
  {
    // escape / pallet bridge: lives in world coordinates, hubs follow the frame positions
    const pW = (v) => {
      const c = Math.cos(FRAME_ROT);
      const s = Math.sin(FRAME_ROT);
      return { x: POS.E.x + v.x * c - v.y * s, y: POS.E.y + v.x * s + v.y * c };
    };
    const Pw = pW(Pl);
    const q1 = rl(7.5, -10);
    const q2 = rl(2.0, -12.5);
    bridgeDef('bridgeEscape', {
      z0: Z.bridgeBottom,
      lift: 14,
      hubs: [
        { p: POS.E, r: 1.7 },
        { p: Pw, r: 1.4 },
      ],
      arms: [
        { from: POS.E, fromR: 1.7, to: Pw, toR: 1.4, w0: 0.42, w1: 0.4 },
        { from: POS.E, fromR: 1.7, to: q1, pillar: true, w0: 0.5, w1: 0.42 },
        { from: Pw, fromR: 1.4, to: q2, pillar: true, w0: 0.5, w1: 0.42 },
      ],
    });
    const Bw = pW(Bl);
    const c1 = ptFrom(Bw, 200, 8.4);
    const c2 = rl(-1.0, -17.5);
    const stW = pW({ x: studPos.x + Bl.x, y: studPos.y + Bl.y });
    const cockZ = 8.55;
    bridgeDef('bridgeBalance', {
      z0: cockZ,
      lift: 22,
      hubs: [{ p: Bw, r: 2.2 }],
      arms: [
        { from: Bw, fromR: 2.2, to: c1, pillar: true, w0: 0.6, w1: 0.42 },
        { from: Bw, fromR: 2.2, to: c2, pillar: true, w0: 0.6, w1: 0.42 },
        { from: Bw, fromR: 2.2, to: stW, w0: 0.45, w1: 0.45 },
      ],
    });
  }
  reg('pillars', pillars, 0);

  // ------------------------------------------------------------------ update
  const lastState = { p: 0, beta: 0, fork: 0 };
  const hairPhi0 = studAngle - HAIR.turns * 2 * Math.PI;
  const update = (st) => {
    Object.assign(lastState, st);
    barrel.rotation.z = arborAngle('B', st.p);
    center.rotation.z = arborAngle('C', st.p);
    third.rotation.z = arborAngle('T', st.p);
    fourth.rotation.z = arborAngle('F', st.p);
    escape.rotation.z = arborAngle('E', st.p);
    fork.rotation.z = st.fork;
    balance.rotation.z = Math.PI / 2 + st.beta;
    const b = st.beta;
    hair.set(
      (s) => b * (1 - s),
      (s) => 1 - 0.035 * (b / ESC.BALANCE_AMPLITUDE) * (1 - s),
      hairPhi0
    );
  };

  const setExplode = (e) => {
    for (const g of lifts) g.position.z = g.userData.baseZ + g.userData.lift * e;
  };
  const setBridgesVisible = (v) => {
    for (const g of bridges) g.visible = v;
    for (const id of ['ratchet', 'click']) for (const g of parts[id]) g.visible = v;
  };

  return { root, mv, parts, update, setExplode, setBridgesVisible, mat };
}
