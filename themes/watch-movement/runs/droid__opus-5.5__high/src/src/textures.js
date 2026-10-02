import * as THREE from 'three';

function canvas(size) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  return [c, c.getContext('2d')];
}

function finish(c, repeat = 1) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.anisotropy = 8;
  return t;
}

let seed = 7;
const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

/** Perlage (overlapping circular graining) used on the main plate. */
export function perlageTexture(size = 2048, perRow = 64) {
  const [c, g] = canvas(size);
  g.fillStyle = '#c8c8c8';
  g.fillRect(0, 0, size, size);
  const step = size / perRow;
  const r = step * 0.78;
  for (let row = -1; row <= perRow + 1; row++) {
    for (let col = -1; col <= perRow + 1; col++) {
      const x = col * step + (row % 2 ? step / 2 : 0);
      const y = row * step * 0.88;
      const b = 200 + rnd() * 18;
      g.fillStyle = `rgb(${b},${b},${b + 2})`;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
      // swirl of fine concentric scratches, brighter on one side like a real graining tool mark
      for (let k = 1.5; k < r; k += 1.6) {
        const v = b + (rnd() - 0.5) * 30;
        g.strokeStyle = `rgba(${v},${v},${v + 2},0.7)`;
        g.lineWidth = 1;
        const a0 = rnd() * Math.PI * 2;
        g.beginPath();
        g.arc(x, y, k, a0, a0 + Math.PI * (1.2 + rnd() * 0.8));
        g.stroke();
      }
      g.strokeStyle = 'rgba(90,92,96,0.35)';
      g.lineWidth = 1.2;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.stroke();
    }
  }
  return finish(c, 1);
}

/** Côtes de Genève stripes used on bridges. */
export function cotesTexture(size = 512, stripes = 6) {
  const [c, g] = canvas(size);
  const w = size / stripes;
  for (let i = 0; i < stripes; i++) {
    const grad = g.createLinearGradient(i * w, 0, (i + 1) * w, 0);
    grad.addColorStop(0, '#9a9ea4');
    grad.addColorStop(0.45, '#f2f4f6');
    grad.addColorStop(0.55, '#e6e9ec');
    grad.addColorStop(1, '#8c9096');
    g.fillStyle = grad;
    g.fillRect(i * w, 0, w, size);
  }
  return finish(c, 1);
}

/** Sunray brushing radiating from the centre (used on wheels). */
export function sunburstTexture(size = 1024) {
  const [c, g] = canvas(size);
  g.fillStyle = '#e8e8e8';
  g.fillRect(0, 0, size, size);
  g.translate(size / 2, size / 2);
  for (let i = 0; i < 1400; i++) {
    const a = rnd() * Math.PI * 2;
    const v = 170 + rnd() * 85;
    g.strokeStyle = `rgba(${v},${v},${v},0.35)`;
    g.lineWidth = 1 + rnd() * 1.5;
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(Math.cos(a) * size, Math.sin(a) * size);
    g.stroke();
  }
  return finish(c, 1);
}

/** Concentric circular graining ("snailing") used on barrel cover and ratchet. */
export function snailTexture(size = 1024) {
  const [c, g] = canvas(size);
  g.fillStyle = '#d6d6d6';
  g.fillRect(0, 0, size, size);
  for (let r = 2; r < size * 0.72; r += 2.2) {
    const v = 175 + rnd() * 80;
    g.strokeStyle = `rgb(${v},${v},${v})`;
    g.lineWidth = 1.6;
    g.beginPath();
    g.arc(size / 2, size / 2, r, 0, Math.PI * 2);
    g.stroke();
  }
  return finish(c, 1);
}
