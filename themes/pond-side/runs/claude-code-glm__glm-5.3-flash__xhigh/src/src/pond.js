// 池塘形状与地形：JS 与 GLSL 必须使用完全一致的公式（水面深度/吸收按解析式计算）

export const POND = {
  R0: 7.4,      // 名义岸线半径
  SH: 3.6,      // 岸坡过渡宽度
  MAXD: 1.75,   // 中心最大水深
  DOMAIN: 12,   // 波动模拟域半宽（水面网格覆盖 [-DOMAIN, DOMAIN]^2）
  SIM: 224      // 波动网格分辨率
};

export const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);

// 岸线角向扰动（让池塘不是正圆）
function wobble(a) {
  return 1 + 0.16 * Math.sin(3 * a + 1.2) + 0.10 * Math.sin(5 * a + 4.0) + 0.07 * Math.sin(8 * a + 2.2);
}

// 归一化半径：rr >= 1 在岸外
export function pondNorm(x, z) {
  const r = Math.hypot(x, z);
  if (r < 1e-6) return 0;
  const a = Math.atan2(z, x);
  return r / wobble(a);
}

// 水深（水面 y=0，池底为负）
export function pondDepth(x, z) {
  const s = clamp01((POND.R0 - pondNorm(x, z)) / POND.SH);
  return POND.MAXD * (s * s * (3 - 2 * s));
}

// JS 专用小值噪声（仅用于地形网格细节，不参与 GLSL 一致性）
function hash2(x, y) {
  let h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return h - Math.floor(h);
}
export function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi), b = hash2(xi + 1, yi), c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
export function fbm(x, y, oct = 3) {
  let s = 0, amp = 0.5, f = 1;
  for (let i = 0; i < oct; i++) { s += amp * vnoise(x * f, y * f); amp *= 0.5; f *= 2.1; }
  return s;
}

// 地形高度（含岸上抬升；不含卵石级细节，细节只在网格顶点上加）
export function floorY(x, z) {
  const n = pondNorm(x, z);
  const d = pondDepth(x, z);
  if (d > 0) return -d;
  const t = n - POND.R0;
  // 岸坡抬升，远处渐平
  let h = t * 0.26;
  h = Math.min(h, 0.6 + t * 0.045);
  h += 0.25 * fbm(x * 0.16 + 9.2, z * 0.16 - 3.1, 3) * Math.min(1, t * 0.5 + 0.35);
  return h;
}

// 岸线附近采样工具：返回 {x, z, inward}（inward 为指向水内的单位向量）
export function shorelinePoint(angle, into = 0) {
  const n0 = 1 / wobble(angle);
  let r = POND.R0 * n0;
  // 数值求岸线半径（wobble 依赖角度，半径直接给定）
  const dirx = Math.cos(angle), dirz = Math.sin(angle);
  const inw = -dirx * n0; // 近似指向圆心
  const r2 = r - into;
  return { x: dirx * r2, z: dirz * r2, ix: -dirx, iz: -dirz };
}

// 与 GLSL 共用的水面/焦散代码片段
export const GLSL_POND = /* glsl */ `
  uniform float uDomain;
  float pondWobble(float a){
    return 1.0 + 0.16*sin(3.0*a+1.2) + 0.10*sin(5.0*a+4.0) + 0.07*sin(8.0*a+2.2);
  }
  float pondNorm(vec2 p){
    float r = length(p);
    if (r < 1e-6) return 0.0;
    return r / pondWobble(atan(p.y, p.x));
  }
  float pondDepth(vec2 p){
    float s = clamp((7.4 - pondNorm(p)) / 3.6, 0.0, 1.0);
    return 1.75 * s * s * (3.0 - 2.0 * s);
  }
`;
