/** Pond shape, terrain, and the height-field wave simulation. */

export const POND = { rx: 6.35, rz: 4.85 };

export const SIM = {
  nx: 256,
  nz: 224,
  x0: -8.15,
  x1: 8.15,
  z0: -6.55,
  z1: 6.55,
};

const _windx = 0.84;
const _windz = 0.46;
const _windl = Math.hypot(_windx, _windz);
export const WIND_DIR = { x: _windx / _windl, z: _windz / _windl };

export const WAVES = [
  { x: 0.86, z: 0.51, k: 0.48, a: 1.0 },
  { x: 0.18, z: 0.98, k: 0.95, a: 0.62 },
  { x: -0.78, z: 0.63, k: 1.55, a: 0.38 },
  { x: 0.62, z: -0.78, k: 2.35, a: 0.22 },
  { x: 0.97, z: 0.24, k: 4.4, a: 0.16, windMin: 0.2 },
  { x: -0.35, z: 0.94, k: 6.8, a: 0.1, windMin: 0.42 },
];

export function smoothstep(e0, e1, x) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

export function pondEdge(angle) {
  return 1
    + 0.05 * Math.sin(angle * 2 + 0.4)
    + 0.032 * Math.sin(angle * 3 - 1.15)
    + 0.02 * Math.sin(angle * 5 + 0.7);
}

export function pondFactor(x, z) {
  const angle = Math.atan2(z, x);
  return Math.hypot(x / POND.rx, z / POND.rz) / pondEdge(angle);
}

export function inPond(x, z, margin = 0) {
  return pondFactor(x, z) < 1 - margin;
}

export function waterDepth(x, z) {
  const f = pondFactor(x, z);
  if (f >= 1) return 0;
  const d = 1 - f;
  const edge = smoothstep(0, 0.1, d);
  const bowl = smoothstep(0.1, 0.62, d);
  return edge * (0.1 + bowl * bowl * 1.62);
}

function hash2(ix, iz) {
  let n = Math.imul(ix, 374761393) + Math.imul(iz, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

function valueNoise(x, z) {
  const x0 = Math.floor(x);
  const z0 = Math.floor(z);
  const fx = x - x0;
  const fz = z - z0;
  const sx = fx * fx * (3 - 2 * fx);
  const sz = fz * fz * (3 - 2 * fz);
  const a = hash2(x0, z0);
  const b = hash2(x0 + 1, z0);
  const c = hash2(x0, z0 + 1);
  const d = hash2(x0 + 1, z0 + 1);
  return a + (b - a) * sx + (c - a) * sz + (a - b - c + d) * sx * sz;
}

function fbm(x, z) {
  let v = 0;
  let a = 0.5;
  let f = 1;
  for (let i = 0; i < 4; i++) {
    v += a * valueNoise(x * f, z * f);
    f *= 2.03;
    a *= 0.5;
  }
  return v;
}

export function terrainHeight(x, z) {
  const f = pondFactor(x, z);
  const n = fbm(x * 0.37, z * 0.37);
  if (f < 1) return -waterDepth(x, z);
  const out = f - 1;
  const rise = out * 0.85 + out * out * 1.15;
  const plateau = 1 - Math.exp(-out * 2.4);
  let h = rise * 0.55 * (1 - plateau) + plateau * (0.42 + (n - 0.5) * 0.22);
  h += (n - 0.5) * 0.07 * Math.min(1, out * 5);
  const mound = Math.exp(-((x + 6.45) ** 2 + (z + 1.85) ** 2) / 7.2) * 0.28;
  const mound2 = Math.exp(-((x - 5.4) ** 2 + (z - 3.6) ** 2) / 6) * 0.16;
  return h + mound + mound2;
}

export function createSim() {
  const { nx, nz } = SIM;
  const curr = new Float32Array(nx * nz);
  const prev = new Float32Array(nx * nz);
  const next = new Float32Array(nx * nz);
  const solid = new Uint8Array(nx * nz);
  const spanX = SIM.x1 - SIM.x0;
  const spanZ = SIM.z1 - SIM.z0;
  for (let j = 0; j < nz; j++) {
    const z = SIM.z0 + (j + 0.5) / nz * spanZ;
    for (let i = 0; i < nx; i++) {
      const x = SIM.x0 + (i + 0.5) / nx * spanX;
      if (pondFactor(x, z) >= 0.978) solid[j * nx + i] = 1;
    }
  }
  for (let i = 0; i < nx; i++) {
    solid[i] = 1;
    solid[(nz - 1) * nx + i] = 1;
  }
  for (let j = 0; j < nz; j++) {
    solid[j * nx] = 1;
    solid[j * nx + nx - 1] = 1;
  }
  return { nx, nz, curr, prev, next, solid, acc: 0 };
}

export function addSolidDisc(sim, x, z, radius) {
  const { nx, nz, solid } = sim;
  const spanX = SIM.x1 - SIM.x0;
  const spanZ = SIM.z1 - SIM.z0;
  const r2 = radius * radius;
  const i0 = Math.max(1, Math.floor(((x - radius - SIM.x0) / spanX) * nx));
  const i1 = Math.min(nx - 2, Math.ceil(((x + radius - SIM.x0) / spanX) * nx));
  const j0 = Math.max(1, Math.floor(((z - radius - SIM.z0) / spanZ) * nz));
  const j1 = Math.min(nz - 2, Math.ceil(((z + radius - SIM.z0) / spanZ) * nz));
  for (let j = j0; j <= j1; j++) {
    const wz = SIM.z0 + (j + 0.5) / nz * spanZ;
    for (let i = i0; i <= i1; i++) {
      const wx = SIM.x0 + (i + 0.5) / nx * spanX;
      const dx = wx - x;
      const dz = wz - z;
      if (dx * dx + dz * dz <= r2) solid[j * nx + i] = 1;
    }
  }
}

export function simStep(sim) {
  const { nx, nz, curr, prev, next, solid } = sim;
  const damp = 0.9964;
  for (let j = 1; j < nz - 1; j++) {
    const row = j * nx;
    for (let i = 1; i < nx - 1; i++) {
      const id = row + i;
      if (solid[id]) {
        next[id] = 0;
        continue;
      }
      const c = curr[id];
      const l = solid[id - 1] ? c : curr[id - 1];
      const r = solid[id + 1] ? c : curr[id + 1];
      const d = solid[id - nx] ? c : curr[id - nx];
      const u = solid[id + nx] ? c : curr[id + nx];
      let n = (l + r + d + u) * 0.5 - prev[id];
      n *= damp;
      if (n > 0.42) n = 0.42;
      else if (n < -0.42) n = -0.42;
      next[id] = n;
    }
  }
  sim.prev = curr;
  sim.curr = next;
  sim.next = prev;
}

export function simAdvance(sim, dt) {
  sim.acc += dt;
  const step = 1 / 60;
  let guard = 0;
  while (sim.acc >= step && guard < 3) {
    simStep(sim);
    sim.acc -= step;
    guard++;
  }
  if (guard === 3) sim.acc = 0;
}

export function simImpulse(sim, x, z, amp, radius) {
  if (!inPond(x, z, 0.02)) return;
  const { nx, nz, curr, solid } = sim;
  const spanX = SIM.x1 - SIM.x0;
  const spanZ = SIM.z1 - SIM.z0;
  const i0 = Math.max(1, Math.floor(((x - radius - SIM.x0) / spanX) * nx));
  const i1 = Math.min(nx - 2, Math.ceil(((x + radius - SIM.x0) / spanX) * nx));
  const j0 = Math.max(1, Math.floor(((z - radius - SIM.z0) / spanZ) * nz));
  const j1 = Math.min(nz - 2, Math.ceil(((z + radius - SIM.z0) / spanZ) * nz));
  const r = Math.max(radius, 0.04);
  for (let j = j0; j <= j1; j++) {
    const wz = SIM.z0 + (j + 0.5) / nz * spanZ;
    const row = j * nx;
    for (let i = i0; i <= i1; i++) {
      const id = row + i;
      if (solid[id]) continue;
      const wx = SIM.x0 + (i + 0.5) / nx * spanX;
      const dx = wx - x;
      const dz = wz - z;
      const dist = Math.hypot(dx, dz);
      if (dist > r) continue;
      const w = 0.5 * (1 + Math.cos((Math.PI * dist) / r));
      curr[id] += amp * w;
    }
  }
}

export function simSample(sim, x, z) {
  const { nx, nz, curr } = sim;
  const spanX = SIM.x1 - SIM.x0;
  const spanZ = SIM.z1 - SIM.z0;
  const u = ((x - SIM.x0) / spanX) * nx - 0.5;
  const v = ((z - SIM.z0) / spanZ) * nz - 0.5;
  const x0 = Math.floor(u);
  const y0 = Math.floor(v);
  const tx = u - x0;
  const ty = v - y0;
  const h = (ix, iy) => {
    if (ix < 0 || iy < 0 || ix >= nx || iy >= nz) return 0;
    return curr[iy * nx + ix];
  };
  const a = h(x0, y0);
  const b = h(x0 + 1, y0);
  const c = h(x0, y0 + 1);
  const d = h(x0 + 1, y0 + 1);
  return a * (1 - tx) * (1 - ty) + b * tx * (1 - ty) + c * (1 - tx) * ty + d * tx * ty;
}

function waveGate(windMin, wind) {
  if (!windMin) return 1;
  return smoothstep(windMin, windMin + 0.45, wind);
}

export function gerstner(x, z, time, wind) {
  let h = 0;
  let dhdx = 0;
  let dhdz = 0;
  const ampScale = 0.42 + wind * 0.75;
  const freqScale = 1 + wind * 0.85;
  for (let i = 0; i < WAVES.length; i++) {
    const w = WAVES[i];
    const len = Math.hypot(w.x, w.z);
    const dx = w.x / len;
    const dz = w.z / len;
    const k = w.k * freqScale;
    const a = 0.125 * w.a * ampScale * waveGate(w.windMin, wind);
    const omega = Math.sqrt(9.81 * k) * 0.82;
    const phase = k * (dx * x + dz * z) - omega * time;
    const s = Math.sin(phase);
    const c = Math.cos(phase);
    h += a * s;
    dhdx += a * k * dx * c;
    dhdz += a * k * dz * c;
  }
  return { h, dhdx, dhdz };
}

export function surfaceAt(sim, x, z, time, wind) {
  const g = gerstner(x, z, time, wind);
  const h = g.h + simSample(sim, x, z);
  const e = 0.12;
  const hx = gerstner(x + e, z, time, wind).h + simSample(sim, x + e, z);
  const hz = gerstner(x, z + e, time, wind).h + simSample(sim, x, z + e);
  const dhdx = (hx - h) / e;
  const dhdz = (hz - h) / e;
  const nx = -dhdx;
  const nz = -dhdz;
  const inv = 1 / Math.hypot(nx, 1, nz);
  return { y: h, nx: nx * inv, ny: inv, nz: nz * inv };
}

export function pondGrad(x, z) {
  const e = 0.06;
  return {
    x: (pondFactor(x + e, z) - pondFactor(x - e, z)) / (2 * e),
    z: (pondFactor(x, z + e) - pondFactor(x, z - e)) / (2 * e),
  };
}

export function gerstnerGLSL() {
  const blocks = WAVES.map((w) => {
    const len = Math.hypot(w.x, w.z);
    const dx = (w.x / len).toFixed(6);
    const dz = (w.z / len).toFixed(6);
    const gate = w.windMin
      ? `smoothstep(${w.windMin.toFixed(3)}, ${(w.windMin + 0.45).toFixed(3)}, wind)`
      : '1.0';
    return `
      {
        float k = ${w.k.toFixed(4)} * freqScale;
        float gate = ${gate};
        float a = 0.125 * ${w.a.toFixed(4)} * ampScale * gate;
        float omega = sqrt(9.81 * k) * 0.82;
        float phase = k * (${dx} * xz.x + ${dz} * xz.y) - omega * t;
        float s = sin(phase);
        float c = cos(phase);
        h += a * s;
        dhdx += a * k * ${dx} * c;
        dhdz += a * k * ${dz} * c;
      }`;
  }).join('\n');

  return `
    vec3 gerstnerAll(vec2 xz, float t, float wind) {
      float ampScale = 0.42 + wind * 0.75;
      float freqScale = 1.0 + wind * 0.85;
      float h = 0.0;
      float dhdx = 0.0;
      float dhdz = 0.0;
      ${blocks}
      return vec3(h, dhdx, dhdz);
    }
  `;
}

export const POND_GLSL = `
  const float POND_RX = ${POND.rx.toFixed(4)};
  const float POND_RZ = ${POND.rz.toFixed(4)};
  float pondEdge(float a) {
    return 1.0
      + 0.05 * sin(a * 2.0 + 0.4)
      + 0.032 * sin(a * 3.0 - 1.15)
      + 0.02 * sin(a * 5.0 + 0.7);
  }
  float pondFactor(vec2 p) {
    float a = atan(p.y, p.x);
    return length(vec2(p.x / POND_RX, p.y / POND_RZ)) / pondEdge(a);
  }
`;

export const SIM_GLSL = `
  uniform sampler2D uWave;
  uniform vec2 uSimOrigin;
  uniform vec2 uSimSize;
  uniform vec2 uSimTexel;
  float simH(vec2 xz) {
    vec2 uv = (xz - uSimOrigin) / uSimSize;
    vec2 texel = uv * uSimTexel;
    vec2 f = fract(texel - 0.5);
    vec2 base = (floor(texel - 0.5) + 0.5) / uSimTexel;
    float a = texture2D(uWave, base).r;
    float b = texture2D(uWave, base + vec2(1.0 / uSimTexel.x, 0.0)).r;
    float c = texture2D(uWave, base + vec2(0.0, 1.0 / uSimTexel.y)).r;
    float d = texture2D(uWave, base + vec2(1.0 / uSimTexel.x, 1.0 / uSimTexel.y)).r;
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
`;

export const CAUSTIC_GLSL = `
  float causticLight(vec2 xz, float depth) {
    vec3 g = gerstnerAll(xz, uTime, uWind);
    float e = 0.09;
    float h0 = simH(xz);
    float hx = (simH(xz + vec2(e, 0.0)) - h0) / e + g.y;
    float hz = (simH(xz + vec2(0.0, e)) - h0) / e + g.z;
    vec2 p = xz * (1.25 + depth * 0.22) + vec2(hx, hz) * (0.7 + depth * 2.1);
    float a = sin(p.x * 6.4 + uTime * 1.35) * sin(p.y * 5.3 - uTime * 1.12);
    float b = sin((p.x * 1.25 + p.y) * 7.2 - uTime * 0.82) * sin((p.x - p.y * 1.15) * 5.5 + uTime * 1.48);
    float c = pow(max(a, 0.0), 1.7) + pow(max(b, 0.0), 1.7);
    float shallow = exp(-max(depth, 0.0) * 1.05);
    return c * shallow;
  }
`;
