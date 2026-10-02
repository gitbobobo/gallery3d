import * as THREE from 'three';

// 主夹板鱼鳞纹（perlage）——canvas 程序化生成
export function plateGrainTexture() {
  const S = 1024;
  const c = document.createElement('canvas');
  c.width = S;
  c.height = S;
  const g = c.getContext('2d');
  g.fillStyle = '#8d9198';
  g.fillRect(0, 0, S, S);
  const r = 46;
  for (let y = -r; y < S + r; y += r * 1.35) {
    for (let x = -r; x < S + r; x += r * 1.35) {
      const ox = (Math.floor(y / (r * 1.35)) % 2) * r * 0.7;
      const cx = x + ox;
      const grad = g.createRadialGradient(cx - r * 0.3, y - r * 0.3, r * 0.1, cx, y, r);
      grad.addColorStop(0, 'rgba(255,255,255,0.16)');
      grad.addColorStop(0.65, 'rgba(255,255,255,0.05)');
      grad.addColorStop(1, 'rgba(0,0,0,0.10)');
      g.fillStyle = grad;
      g.beginPath();
      g.arc(cx, y, r, 0, Math.PI * 2);
      g.fill();
    }
  }
  // 轻微划痕
  g.strokeStyle = 'rgba(255,255,255,0.05)';
  for (let i = 0; i < 220; i++) {
    g.beginPath();
    const x = Math.random() * S;
    const y = Math.random() * S;
    g.moveTo(x, y);
    g.lineTo(x + (Math.random() - 0.5) * 90, y + (Math.random() - 0.5) * 26);
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1.6, 1.6);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// 拉丝金属纹（夹板用）
export function brushedTexture() {
  const W = 512;
  const H = 512;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d');
  g.fillStyle = '#9a9ea6';
  g.fillRect(0, 0, W, H);
  for (let i = 0; i < 1400; i++) {
    const y = Math.random() * H;
    g.strokeStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
    g.beginPath();
    g.moveTo(Math.random() * W, y);
    g.lineTo(Math.random() * W + (Math.random() - 0.5) * 240, y + (Math.random() - 0.5) * 2.2);
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
