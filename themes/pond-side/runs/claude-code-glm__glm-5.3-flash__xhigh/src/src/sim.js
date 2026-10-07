import * as THREE from 'three';
import { POND, pondDepth } from './pond.js';

// 二维波动方程高度场：涟漪真实传播、衰减、叠加；岸线与障碍物（木桩）处反射
export class WaveSim {
  constructor() {
    this.n = POND.SIM;
    this.half = POND.DOMAIN;
    this.size = POND.DOMAIN * 2;
    this.cell = this.size / (this.n - 1);
    const n2 = this.n * this.n;
    this.cur = new Float32Array(n2);
    this.prev = new Float32Array(n2);
    this.mask = new Uint8Array(n2);
    this.obstacles = [];

    for (let i = 0; i < n2; i++) this.mask[i] = pondDepth(this.xOf(i % this.n), this.zOf((i / this.n) | 0)) > 0.035 ? 1 : 0;

    this.texture = new THREE.DataTexture(this.cur, this.n, this.n, THREE.RedFormat, THREE.FloatType);
    this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
    this.texture.needsUpdate = true;
    this.accumulator = 0;
  }

  xOf(i) { return -this.half + i * this.cell; }
  zOf(j) { return -this.half + j * this.cell; }

  setLinearFilter(ok) {
    const f = ok ? THREE.LinearFilter : THREE.NearestFilter;
    this.texture.magFilter = f;
    this.texture.minFilter = f;
    this.texture.needsUpdate = true;
  }

  setObstacles(list) {
    this.obstacles = list;
    const { n, cell, half } = this;
    for (let j = 0; j < n; j++) {
      const z = -half + j * cell;
      for (let i = 0; i < n; i++) {
        const x = -half + i * cell;
        const idx = j * n + i;
        if (!this.mask[idx]) continue;
        for (const o of list) {
          const dx = x - o.x, dz = z - o.z;
          if (dx * dx + dz * dz < o.r * o.r) { this.mask[idx] = 0; break; }
        }
      }
    }
  }

  addDrop(x, z, radius, amp) {
    const { n, cell, half, cur } = this;
    const ri = Math.max(1, (radius / cell) | 0);
    const ci = Math.round((x + half) / cell), cj = Math.round((z + half) / cell);
    for (let j = cj - ri; j <= cj + ri; j++) {
      if (j < 1 || j > n - 2) continue;
      for (let i = ci - ri; i <= ci + ri; i++) {
        if (i < 1 || i > n - 2) continue;
        const dx = (i - ci) * cell, dz = (j - cj) * cell;
        const d2 = (dx * dx + dz * dz) / (radius * radius);
        if (d2 > 1) continue;
        const idx = j * n + i;
        if (!this.mask[idx]) continue;
        const g = Math.exp(-d2 * 4.5);
        cur[idx] += amp * g;
        this.prev[idx] += amp * g * 0.55; // 给一点初速度，波形更圆润
      }
    }
  }

  heightAt(x, z) {
    const { n, cell, half, cur } = this;
    const fx = (x + half) / cell, fz = (z + half) / cell;
    const i = Math.floor(fx), j = Math.floor(fz);
    if (i < 0 || j < 0 || i >= n - 1 || j >= n - 1) return 0;
    const u = fx - i, v = fz - j;
    const r = j * n + i;
    return (cur[r] * (1 - u) + cur[r + 1] * u) * (1 - v) + (cur[r + n] * (1 - u) + cur[r + n + 1] * u) * v;
  }

  // 返回 {gx, gz}（每世界单位的高度梯度）
  gradAt(x, z) {
    const e = this.cell;
    return {
      gx: (this.heightAt(x + e, z) - this.heightAt(x - e, z)) / (2 * e),
      gz: (this.heightAt(x, z + e) - this.heightAt(x, z - e)) / (2 * e)
    };
  }

  step(dt) {
    this.accumulator += Math.min(dt, 0.1);
    const h = 1 / 30; // 30Hz 步进 → 波速 ≈1.9m/s，接近真实涟漪
    let steps = 0;
    while (this.accumulator >= h && steps < 2) {
      this.accumulator -= h;
      steps++;
      this.integrate();
    }
    if (steps) this.texture.needsUpdate = true;
  }

  integrate() {
    const n = this.n, cur = this.cur, prev = this.prev, mask = this.mask;
    const damp = 0.9972, k = 0.36;
    for (let j = 1; j < n - 1; j++) {
      const row = j * n;
      for (let i = 1; i < n - 1; i++) {
        const idx = row + i;
        if (!mask[idx]) { prev[idx] = 0; continue; }
        const c = cur[idx];
        const v = (2 * c - prev[idx]) + k * (cur[idx - 1] + cur[idx + 1] + cur[idx - n] + cur[idx + n] - 4 * c);
        prev[idx] = v * damp;
      }
    }
    const t = this.cur; this.cur = this.prev; this.prev = t;
    this.texture.image.data = this.cur;
  }
}

// 微风环境波（JS 侧供漂浮物起伏用，与水面 shader 的微观波近似）
const WDIRS = [
  [0.9806, 0.1961], [-0.4750, 0.8800], [0.2691, -0.9631]
].map(([x, z]) => { const l = Math.hypot(x, z); return [x / l, z / l]; });

export function ambientWave(x, z, t, wind) {
  const amp = 0.004 + wind * 0.017;
  const k = 1.6 + wind * 3.4;
  let h = 0, gx = 0, gz = 0;
  for (let i = 0; i < 3; i++) {
    const [dx, dz] = WDIRS[i];
    const ph = (x * dx + z * dz) * k * (1 + i * 0.6) + t * (0.9 + i * 0.37) * (0.6 + wind);
    const w = [0.5, 0.32, 0.22][i] * amp;
    const s = Math.sin(ph), c = Math.cos(ph);
    h += w * s;
    const kk = k * (1 + i * 0.6);
    gx += w * c * dx * kk;
    gz += w * c * dz * kk;
  }
  return { h, gx, gz };
}
