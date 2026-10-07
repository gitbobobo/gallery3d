import * as THREE from 'three';

export function tube(points, radii, radial = 8, vScale = 1) {
  const n = points.length;
  const pos = [], nor = [], uv = [], idx = [];
  const tang = [];
  for (let i = 0; i < n; i++) {
    const a = points[Math.max(0, i - 1)], b = points[Math.min(n - 1, i + 1)];
    tang.push(new THREE.Vector3().subVectors(b, a).normalize());
  }
  let nrm = new THREE.Vector3(0, 0, 1);
  if (Math.abs(tang[0].dot(nrm)) > 0.9) nrm.set(1, 0, 0);
  nrm = nrm.sub(tang[0].clone().multiplyScalar(tang[0].dot(nrm))).normalize();
  let len = 0;
  for (let i = 0; i < n; i++) {
    if (i > 0) {
      len += points[i].distanceTo(points[i - 1]);
      nrm.sub(tang[i].clone().multiplyScalar(tang[i].dot(nrm))).normalize();
    }
    const bin = new THREE.Vector3().crossVectors(tang[i], nrm).normalize();
    for (let j = 0; j <= radial; j++) {
      const a = (j / radial) * Math.PI * 2;
      const c = Math.cos(a), s = Math.sin(a);
      const nx = nrm.x * c + bin.x * s, ny = nrm.y * c + bin.y * s, nz = nrm.z * c + bin.z * s;
      const r = radii[i];
      pos.push(points[i].x + nx * r, points[i].y + ny * r, points[i].z + nz * r);
      nor.push(nx, ny, nz);
      uv.push(j / radial, len * vScale);
    }
  }
  for (let i = 0; i < n - 1; i++) for (let j = 0; j < radial; j++) {
    const a = i * (radial + 1) + j, b = a + 1, c = a + radial + 1, d = c + 1;
    idx.push(a, b, c, b, d, c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

export function bezier3(p0, p1, p2, p3, n) {
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, u = 1 - t;
    out.push(new THREE.Vector3(
      u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
      u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
      u * u * u * p0.z + 3 * u * u * t * p1.z + 3 * u * t * t * p2.z + t * t * t * p3.z));
  }
  return out;
}

export function glowTexture(size = 128, stops = [[0, 'rgba(255,255,255,1)'], [0.25, 'rgba(255,255,255,0.45)'], [1, 'rgba(255,255,255,0)']]) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  for (const [o, col] of stops) gr.addColorStop(o, col);
  g.fillStyle = gr; g.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
