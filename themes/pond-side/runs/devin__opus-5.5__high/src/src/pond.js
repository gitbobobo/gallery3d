import { fbm, smoothstep, vnoise } from './noise.js';

export const LOW_END =
  typeof matchMedia !== 'undefined' &&
  (matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600);
export const SIM_HALF = 11;
export const SIM_RES = LOW_END ? 256 : 512;
export const CELL = (SIM_HALF * 2) / SIM_RES;
export const TERRAIN_SIZE = 70;

export function shoreRadius(theta) {
  return (
    7.7 +
    1.05 * Math.sin(2 * theta + 0.6) +
    0.65 * Math.sin(3 * theta + 2.1) +
    0.32 * Math.sin(5 * theta + 0.3) +
    0.16 * Math.sin(7 * theta + 1.7)
  );
}

export function signedShore(x, z) {
  const r = Math.hypot(x, z);
  return r - shoreRadius(Math.atan2(z, x));
}

export function shorePoint(theta, offset = 0) {
  const r = shoreRadius(theta) + offset;
  return [Math.cos(theta) * r, Math.sin(theta) * r];
}

export const WILLOW_THETA = -2.55;
export const DOCK_THETA = -1.1;
export const willowBase = shorePoint(WILLOW_THETA, 1.25);

function baseHeight(x, z) {
  const sd = signedShore(x, z);
  let h;
  if (sd < 0) {
    const d = -sd;
    h = -(0.1 * Math.min(d, 1.6) + 0.3 * smoothstep(0.5, 2.6, d) + 1.25 * smoothstep(2.2, 6.2, d));
    h += fbm(x * 0.35, z * 0.35, 3, 11) * 0.12 * smoothstep(0.3, 2.5, d);
  } else {
    h = 0.07 * Math.min(sd, 1.2) + 0.42 * smoothstep(0.4, 3.0, sd) + 0.5 * smoothstep(3.0, 16, sd);
    h += fbm(x * 0.12, z * 0.12, 4, 3) * 0.6 * smoothstep(1.5, 8, sd);
    const wx = x - willowBase[0], wz = z - willowBase[1];
    h += 0.22 * Math.exp(-(wx * wx + wz * wz) / 3.5);
  }
  h += fbm(x * 1.3, z * 1.3, 3, 7) * 0.035;
  h += vnoise(x * 4.1, z * 4.1, 5) * 0.008;
  return h;
}

export function heightAt(x, z) {
  return baseHeight(x, z);
}

export function heightGrad(x, z, e = 0.08) {
  return [
    (heightAt(x + e, z) - heightAt(x - e, z)) / (2 * e),
    (heightAt(x, z + e) - heightAt(x, z - e)) / (2 * e),
  ];
}

// dock layout
const dockShore = shorePoint(DOCK_THETA, 1.3);
const inward = [-Math.cos(DOCK_THETA), -Math.sin(DOCK_THETA)];
export const DOCK = {
  start: dockShore,
  dir: inward,
  side: [-inward[1], inward[0]],
  length: 6.2,
  width: 1.3,
  deck: 0.48,
};

export function dockPilings() {
  const out = [];
  const { start, dir, side, length, width } = DOCK;
  for (let s = 1.0; s <= length + 0.01; s += 1.3) {
    for (const k of [-1, 1]) {
      const x = start[0] + dir[0] * s + side[0] * k * (width / 2 - 0.05);
      const z = start[1] + dir[1] * s + side[1] * k * (width / 2 - 0.05);
      out.push({ x, z, r: 0.075 });
    }
  }
  return out;
}

export const PILINGS = dockPilings();

export function insideDock(x, z, pad = 0) {
  const { start, dir, side, length, width } = DOCK;
  const dx = x - start[0], dz = z - start[1];
  const s = dx * dir[0] + dz * dir[1];
  const t = dx * side[0] + dz * side[1];
  return s > -pad - 1.5 && s < length + pad && Math.abs(t) < width / 2 + pad;
}

export const WIND_DIR = (() => {
  const x = 0.9, z = 0.3, l = Math.hypot(x, z);
  return [x / l, z / l];
})();
