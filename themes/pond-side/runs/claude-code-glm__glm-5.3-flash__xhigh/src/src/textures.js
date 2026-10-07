import * as THREE from 'three';

// 全部贴图用 Canvas 程序化生成，不使用外部素材
function make(size, draw) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function rnd(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// 地面：泥土 + 碎石颗粒
export function groundTexture() {
  return make(512, (ctx, S) => {
    const r = rnd(7);
    ctx.fillStyle = '#78624a';
    ctx.fillRect(0, 0, S, S);
    // 泥土色斑
    for (let i = 0; i < 900; i++) {
      const x = r() * S, y = r() * S, rad = 4 + r() * 26;
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
      const c1 = `rgba(${88 + (r() * 56) | 0},${70 + (r() * 46) | 0},${50 + (r() * 34) | 0},0.18)`;
      g.addColorStop(0, c1);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, rad, 0, 7); ctx.fill();
    }
    // 碎石
    for (let i = 0; i < 700; i++) {
      const x = r() * S, y = r() * S, rad = 1 + r() * 3.2;
      const v = 96 + r() * 96;
      ctx.fillStyle = `rgba(${v},${v * 0.94},${v * 0.85},${0.5 + r() * 0.4})`;
      ctx.beginPath(); ctx.ellipse(x, y, rad, rad * (0.6 + r() * 0.5), r() * 3.14, 0, 7); ctx.fill();
      ctx.fillStyle = `rgba(255,255,250,${0.12 + r() * 0.15})`;
      ctx.beginPath(); ctx.ellipse(x - rad * 0.25, y - rad * 0.3, rad * 0.45, rad * 0.3, 0, 0, 7); ctx.fill();
    }
  });
}

// 树皮
export function barkTexture() {
  return make(256, (ctx, S) => {
    const r = rnd(21);
    ctx.fillStyle = '#4a3626';
    ctx.fillRect(0, 0, S, S);
    for (let i = 0; i < 160; i++) {
      const x = r() * S, w = 2 + r() * 9;
      ctx.strokeStyle = `rgba(${25 + r() * 40},${18 + r() * 26},${12 + r() * 16},${0.35 + r() * 0.4})`;
      ctx.lineWidth = w;
      ctx.beginPath();
      let y = -10, cx = x;
      ctx.moveTo(cx, y);
      while (y < S + 10) { y += 18 + r() * 22; cx += (r() - 0.5) * 10; ctx.lineTo(cx, y); }
      ctx.stroke();
      if (r() < 0.5) {
        ctx.strokeStyle = `rgba(${120 + r() * 60},${95 + r() * 45},${60 + r() * 30},0.2)`;
        ctx.lineWidth = w * 0.4;
        ctx.beginPath(); ctx.moveTo(x + w * 0.6, 0); ctx.lineTo(x + w * 0.6, S); ctx.stroke();
      }
    }
  });
}

// 木板（栈桥）
export function woodTexture() {
  return make(512, (ctx, S) => {
    const r = rnd(33);
    ctx.fillStyle = '#7a5c3c';
    ctx.fillRect(0, 0, S, S);
    const plank = S / 8;
    for (let p = 0; p < 8; p++) {
      const base = 96 + r() * 46;
      ctx.fillStyle = `rgb(${base | 0},${(base * 0.72) | 0},${(base * 0.48) | 0})`;
      ctx.fillRect(0, p * plank, S, plank - 2);
      ctx.fillStyle = 'rgba(20,12,6,0.85)';
      ctx.fillRect(0, p * plank + plank - 2, S, 2);
      // 木纹
      for (let i = 0; i < 46; i++) {
        const y = p * plank + r() * plank;
        ctx.strokeStyle = `rgba(${30 + r() * 40},${20 + r() * 26},${10 + r() * 14},${0.14 + r() * 0.22})`;
        ctx.lineWidth = 0.8 + r() * 1.6;
        ctx.beginPath(); ctx.moveTo(0, y);
        for (let x = 0; x <= S; x += 32) ctx.lineTo(x, y + Math.sin(x * 0.02 + i) * 1.6 + (r() - 0.5) * 2);
        ctx.stroke();
      }
      // 板钉
      ctx.fillStyle = 'rgba(40,34,28,0.9)';
      ctx.beginPath(); ctx.arc(S * 0.08, p * plank + plank / 2, 2.2, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(S * 0.92, p * plank + plank / 2, 2.2, 0, 7); ctx.fill();
    }
  });
}

// 荷叶
export function lilyPadTexture() {
  return make(256, (ctx, S) => {
    const c = S / 2;
    const g = ctx.createRadialGradient(c, c, 6, c, c, c);
    g.addColorStop(0, '#3d7a33');
    g.addColorStop(0.75, '#2c6329');
    g.addColorStop(1, '#1d4a20');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(c, c, c, 0, 7); ctx.fill();
    // 放射叶脉
    ctx.strokeStyle = 'rgba(150, 205, 120, 0.5)';
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2;
      ctx.lineWidth = 1 + (i % 2);
      ctx.beginPath(); ctx.moveTo(c, c);
      ctx.quadraticCurveTo(c + Math.cos(a) * c * 0.5 + 4, c + Math.sin(a) * c * 0.5, c + Math.cos(a) * c * 0.96, c + Math.sin(a) * c * 0.96);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(20,50,25,0.8)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(c, c, c - 1.5, 0, 7); ctx.stroke();
  });
}

// 锦鲤贴图（沿 v 从头到尾）
export function koiTexture(kind) {
  return make(256, (ctx, S) => {
    const r = rnd(100 + kind * 17);
    ctx.fillStyle = kind === 3 ? '#e8e2d4' : '#f3ede0';
    ctx.fillRect(0, 0, S, S);
    const blob = (cx, cy, rad, color) => {
      for (let i = 0; i < 7; i++) {
        const a = r() * 6.28, d = r() * rad * 0.6;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.7, rad * (0.5 + r() * 0.6), rad * (0.35 + r() * 0.5), r() * 3, 0, 7);
        ctx.fill();
      }
    };
    if (kind === 0) { // 橙白
      blob(S * 0.3, S * 0.42, S * 0.16, 'rgba(230,92,26,0.95)');
      blob(S * 0.62, S * 0.6, S * 0.13, 'rgba(238,120,30,0.92)');
    } else if (kind === 1) { // 丹顶
      blob(S * 0.24, S * 0.5, S * 0.15, 'rgba(216,40,30,0.95)');
    } else if (kind === 2) { // 三色
      blob(S * 0.3, S * 0.45, S * 0.15, 'rgba(226,80,26,0.95)');
      blob(S * 0.58, S * 0.62, S * 0.12, 'rgba(30,28,32,0.9)');
      blob(S * 0.72, S * 0.36, S * 0.1, 'rgba(240,120,40,0.9)');
    } else { // 金色
      ctx.fillStyle = 'rgba(235,160,40,0.55)';
      ctx.fillRect(0, 0, S, S);
      blob(S * 0.5, S * 0.5, S * 0.3, 'rgba(220,130,20,0.7)');
    }
    // 腹部渐白
    const g = ctx.createLinearGradient(0, 0, 0, S);
    g.addColorStop(0, 'rgba(255,255,255,0.0)');
    g.addColorStop(0.18, 'rgba(255,255,255,0.45)');
    g.addColorStop(0.82, 'rgba(255,255,255,0.45)');
    g.addColorStop(1, 'rgba(255,255,255,0.0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
  });
}

// 萤火虫光晕 / 溅水泡沫环
export function glowTexture(inner = 'rgba(210,255,150,1)') {
  return make(64, (ctx, S) => {
    const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, inner);
    g.addColorStop(0.35, inner.replace(/,1\)$/, ',0.55)'));
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
  });
}

export function foamRingTexture() {
  return make(128, (ctx, S) => {
    const c = S / 2;
    const g = ctx.createRadialGradient(c, c, S * 0.28, c, c, S * 0.5);
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(0.45, 'rgba(240,250,250,0.85)');
    g.addColorStop(0.75, 'rgba(220,240,240,0.35)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
    // 泡沫颗粒
    const r = rnd(55);
    for (let i = 0; i < 90; i++) {
      const a = r() * 6.28, d = S * (0.36 + r() * 0.12);
      ctx.fillStyle = `rgba(255,255,255,${0.25 + r() * 0.5})`;
      ctx.beginPath(); ctx.arc(c + Math.cos(a) * d, c + Math.sin(a) * d, 0.8 + r() * 1.6, 0, 7); ctx.fill();
    }
  });
}

// 花瓣
export function petalTexture() {
  return make(64, (ctx, S) => {
    const g = ctx.createLinearGradient(0, 0, 0, S);
    g.addColorStop(0, '#fdeef4');
    g.addColorStop(1, '#eeaac4');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
  });
}

// 纸船
export function paperTexture() {
  return make(128, (ctx, S) => {
    ctx.fillStyle = '#f2efe4';
    ctx.fillRect(0, 0, S, S);
    const r = rnd(88);
    for (let i = 0; i < 26; i++) {
      ctx.strokeStyle = `rgba(150,145,128,${0.1 + r() * 0.16})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(r() * S, 0); ctx.lineTo(r() * S, S);
      ctx.stroke();
    }
  });
}
