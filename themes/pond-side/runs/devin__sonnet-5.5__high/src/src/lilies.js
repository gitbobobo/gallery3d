import * as THREE from 'three';
import { mulberry, clamp } from './shared.js';
import { terrainY, pondF, PIER } from './terrain.js';

const V3 = THREE.Vector3;

function padTexture() {
  const s = 256, c = document.createElement('canvas'); c.width = c.height = s;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(s / 2, s / 2, 4, s / 2, s / 2, s / 2);
  gr.addColorStop(0, '#5f9a3a'); gr.addColorStop(0.55, '#3f7d2c'); gr.addColorStop(1, '#2a5a1f');
  g.fillStyle = gr; g.fillRect(0, 0, s, s);
  g.strokeStyle = 'rgba(190,230,140,0.35)'; g.lineWidth = 1.4;
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * Math.PI * 2;
    g.beginPath(); g.moveTo(s / 2, s / 2);
    g.quadraticCurveTo(s / 2 + Math.cos(a + 0.2) * s * 0.25, s / 2 + Math.sin(a + 0.2) * s * 0.25, s / 2 + Math.cos(a) * s * 0.5, s / 2 + Math.sin(a) * s * 0.5);
    g.stroke();
  }
  const rnd = mulberry(8);
  for (let i = 0; i < 400; i++) {
    g.fillStyle = `rgba(${rnd() < 0.5 ? '20,50,15' : '120,170,70'},${0.05 + rnd() * 0.08})`;
    g.beginPath(); g.arc(rnd() * s, rnd() * s, 2 + rnd() * 9, 0, 6.28); g.fill();
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}

function padGeo(bowl, notch = 0.4) {
  const n = 40, a0 = 0.6;
  const pos = [0, 0, 0], uv = [0.5, 0.5], idx = [];
  for (let i = 0; i <= n; i++) {
    const a = a0 + notch + (i / n) * (Math.PI * 2 - notch);
    const x = Math.cos(a), z = Math.sin(a);
    pos.push(x, bowl, z); uv.push(0.5 + x * 0.5, 0.5 + z * 0.5);
  }
  const mid = [];
  for (let r = 1; r <= 2; r++) for (let i = 0; i <= n; i++) {
    const a = a0 + notch + (i / n) * (Math.PI * 2 - notch);
    const rr = r / 3;
    mid.push([Math.cos(a) * rr, bowl * rr * rr * 1.2, Math.sin(a) * rr, 0.5 + Math.cos(a) * rr * 0.5, 0.5 + Math.sin(a) * rr * 0.5]);
  }
  const P = [0, 0, 0], U = [0.5, 0.5];
  const rings = [[0, 0, 0, 0.5, 0.5]];
  const all = [];
  all.push([0, 0, 0, 0.5, 0.5]);
  const rowsN = 4;
  const verts = [[0, 0, 0, 0.5, 0.5]];
  const ringIdx = [];
  for (let r = 1; r <= rowsN; r++) {
    const rr = r / rowsN, row = [];
    for (let i = 0; i <= n; i++) {
      const a = a0 + notch + (i / n) * (Math.PI * 2 - notch);
      const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
      row.push(verts.length);
      verts.push([x, bowl * rr * rr, z, 0.5 + x * 0.5, 0.5 + z * 0.5]);
    }
    ringIdx.push(row);
  }
  const index = [];
  for (let i = 0; i < n; i++) index.push(0, ringIdx[0][i + 1], ringIdx[0][i]);
  for (let r = 0; r < rowsN - 1; r++) for (let i = 0; i < n; i++) {
    const a = ringIdx[r][i], b = ringIdx[r][i + 1], c = ringIdx[r + 1][i], d = ringIdx[r + 1][i + 1];
    index.push(a, b, c, b, d, c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(verts.flatMap(v => [v[0], v[1], v[2]]), 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(verts.flatMap(v => [v[3], v[4]]), 2));
  g.setIndex(index);
  g.computeVertexNormals();
  return g;
}

function petalGeo(L, W, H) {
  const rows = 6, pos = [], col = [], idx = [];
  for (let r = 0; r <= rows; r++) {
    const s = r / rows;
    const w = W * Math.pow(Math.sin(Math.PI * (0.12 + 0.88 * s)), 0.8) * (1 - s * 0.25) * (r === rows ? 0.02 : 1);
    for (let k = -1; k <= 1; k++) {
      pos.push(L * s, H * Math.pow(s, 1.7) + (k === 0 ? 0.008 * (1 - s) : 0), k * w);
      const t = Math.pow(s, 1.8);
      col.push(1 - 0.05 * t, 0.97 - 0.35 * t, 0.9 - 0.15 * t - 0.05 * (1 - s));
    }
  }
  for (let r = 0; r < rows; r++) for (let k = 0; k < 2; k++) {
    const a = r * 3 + k, b = a + 1, c = a + 3, d = c + 1;
    idx.push(a, b, c, b, d, c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx); g.computeVertexNormals();
  const nn = g.attributes.normal, pp = g.attributes.position;
  for (let i = 0; i < nn.count; i++) { const v = new V3(pp.getX(i) / L * 0.45, 1, 0).normalize(); nn.setXYZ(i, v.x, v.y, v.z); }
  return g;
}

export function buildLilies(scene, sim, obstacles) {
  const rnd = mulberry(2024);
  const tex = padTexture();
  const padG = padGeo(0.09), lotusG = padGeo(0.16, 0.25);
  const mats = [0xffffff, 0xd8e8c0, 0xe8e0b0].map(c => new THREE.MeshStandardMaterial({ map: tex, color: c, roughness: 0.5, side: THREE.DoubleSide, emissive: 0x16380e, emissiveIntensity: 0.28 }));
  const items = [];
  const centers = [[2.4, -0.3], [1.2, 1.9], [-2.9, -1.4], [3.2, 1.6], [0.2, -2.3]];
  const place = (r, bias) => {
    for (let t = 0; t < 400; t++) {
      const ce = centers[Math.floor(rnd() * centers.length)];
      const x = ce[0] + (rnd() - 0.5) * 2.8 * bias, z = ce[1] + (rnd() - 0.5) * 2.2 * bias;
      if (terrainY(x, z) > -0.5 || pondF(x, z) > 0.86) continue;
      if (Math.abs(x - PIER.x) < 1.2 && z > -0.2) continue;
      if (items.some(o => Math.hypot(o.x - x, o.z - z) < o.r + r + 0.12)) continue;
      return [x, z];
    }
    return null;
  };
  const defs = [];
  for (let i = 0; i < 3; i++) defs.push({ kind: 'lotus', r: 0.55 + rnd() * 0.2 });
  for (let i = 0; i < 17; i++) defs.push({ kind: 'pad', r: 0.22 + rnd() * 0.18 });
  for (let i = 0; i < 5; i++) defs.push({ kind: 'flower', r: 0.2 });
  for (const d of defs) {
    const p = place(d.r, d.kind === 'lotus' ? 1.6 : 1);
    if (!p) continue;
    const grp = new THREE.Group();
    if (d.kind === 'flower') {
      const pad = new THREE.Mesh(padG, mats[1]); pad.scale.setScalar(0.3); pad.rotation.y = rnd() * 6; pad.position.set(0.14, 0, 0.1);
      grp.add(pad);
      const flower = new THREE.Group();
      const addRing = (n, L, W, H, tilt, y) => {
        const g = petalGeo(L, W, H);
        for (let i = 0; i < n; i++) {
          const pm = new THREE.Mesh(g, flowerMat);
          pm.rotation.set(0, (i / n) * Math.PI * 2 + rnd() * 0.15, tilt);
          pm.position.y = y; pm.castShadow = true;
          flower.add(pm);
        }
      };
      addRing(9, 0.13, 0.036, 0.04, 0.0, 0.0);
      addRing(8, 0.115, 0.034, 0.075, 0.35, 0.012);
      addRing(6, 0.09, 0.03, 0.09, 0.8, 0.02);
      const st = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.03, 10), new THREE.MeshStandardMaterial({ color: 0xf2c230, roughness: 0.6 }));
      st.position.y = 0.035; flower.add(st);
      flower.position.y = 0.01; flower.scale.setScalar(0.85 + rnd() * 0.5);
      grp.add(flower);
      items.push({ x: p[0], z: p[1], r: 0.24, grp, yaw: rnd() * 6, kind: 'flower' });
      sim.addDamping(p[0], p[1], 0.3, 0.008);
    } else {
      const lotus = d.kind === 'lotus';
      const mesh = new THREE.Mesh(lotus ? lotusG : padG, mats[Math.floor(rnd() * 3)]);
      mesh.scale.setScalar(d.r / (lotus ? 0.16 * 0 + 1 : 1));
      mesh.scale.setScalar(d.r);
      mesh.rotation.y = rnd() * 6.28;
      mesh.castShadow = true; mesh.receiveShadow = true;
      grp.add(mesh);
      items.push({ x: p[0], z: p[1], r: d.r, grp, yaw: 0, kind: d.kind });
      obstacles.push({ x: p[0], z: p[1], r: d.r * 0.95 });
      sim.addDamping(p[0], p[1], d.r * 1.15, 0.012);
    }
    grp.position.set(p[0], 0.015, p[1]);
    scene.add(grp);
  }
  const up = new V3(0, 1, 0), nrm = new V3(), q = new THREE.Quaternion(), qy = new THREE.Quaternion();
  const sl = new THREE.Vector2();
  return {
    items,
    update() {
      for (const it of items) {
        const h = sim.sample(it.x, it.z);
        sim.slope(it.x, it.z, sl);
        nrm.set(-sl.x * 1.4, 1, -sl.y * 1.4).normalize();
        q.setFromUnitVectors(up, nrm);
        qy.setFromAxisAngle(up, it.yaw);
        it.grp.quaternion.copy(q).multiply(qy);
        it.grp.position.y = (it.kind === 'lotus' ? 0.036 : 0.024) + Math.max(h * 0.6, -0.012);
      }
    },
  };
}

const flowerMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, side: THREE.DoubleSide, emissive: 0x5a4a44, emissiveIntensity: 0.45 });
