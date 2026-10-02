import * as THREE from 'three';

function canvasTex(w, h, draw, { repeat = 1, srgb = true } = {}) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.anisotropy = 8;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Circular graining ("perlage"): overlapping soft rings
function perlage(size, tone) {
  return canvasTex(
    size,
    size,
    (g, w, h) => {
      g.fillStyle = tone;
      g.fillRect(0, 0, w, h);
      const r = 11;
      let seed = 7;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      for (let y = -r; y < h + r; y += r * 0.9) {
        for (let x = -r; x < w + r; x += r * 0.9) {
          const cx = x + (rnd() - 0.5) * 5;
          const cy = y + (rnd() - 0.5) * 5;
          for (const dx of [0, w]) {
            for (const dy of [0, h]) {
              const gr = g.createRadialGradient(cx - dx + 3, cy - dy - 3, 0, cx - dx, cy - dy, r);
              gr.addColorStop(0, 'rgba(255,255,255,0.32)');
              gr.addColorStop(0.55, 'rgba(255,255,255,0.03)');
              gr.addColorStop(0.9, 'rgba(0,0,0,0.2)');
              gr.addColorStop(1, 'rgba(0,0,0,0)');
              g.fillStyle = gr;
              g.beginPath();
              g.arc(cx - dx, cy - dy, r, 0, Math.PI * 2);
              g.fill();
            }
          }
        }
      }
    },
    { repeat: 1 }
  );
}

// Côtes de Genève stripes
function stripes(tone) {
  return canvasTex(
    64,
    256,
    (g, w, h) => {
      const grad = g.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#9c9c9c');
      grad.addColorStop(0.5, '#ffffff');
      grad.addColorStop(1, '#9c9c9c');
      g.fillStyle = grad;
      g.fillRect(0, 0, w, h);
      g.globalCompositeOperation = 'multiply';
      g.fillStyle = tone;
      g.fillRect(0, 0, w, h);
    },
    { repeat: 1 }
  );
}

export function makeMaterials() {
  const plateMap = perlage(512, '#8f949a');
  plateMap.repeat.set(2, 2);
  const plateBump = perlage(512, '#808080');
  plateBump.colorSpace = THREE.NoColorSpace;
  plateBump.repeat.set(2, 2);

  const geneva = stripes('#b9bdc5');
  geneva.center.set(0.5, 0.5);
  geneva.rotation = 0.55;
  geneva.repeat.set(1 / 0.8, 1 / 0.8);
  const genevaBump = stripes('#ffffff');
  genevaBump.colorSpace = THREE.NoColorSpace;
  genevaBump.center.set(0.5, 0.5);
  genevaBump.rotation = 0.55;
  genevaBump.repeat.set(1 / 0.8, 1 / 0.8);

  const std = (o) => new THREE.MeshStandardMaterial(o);
  return {
    brass: std({ color: 0xd69a2d, metalness: 1, roughness: 0.3 }),
    brassDark: std({ color: 0xa8761f, metalness: 1, roughness: 0.4 }),
    steel: std({ color: 0xc4cad2, metalness: 1, roughness: 0.22 }),
    steelDark: std({ color: 0x6d7580, metalness: 1, roughness: 0.35 }),
    blued: std({ color: 0x1d3f8f, metalness: 0.85, roughness: 0.28 }),
    spring: std({ color: 0x3a5c9c, metalness: 1, roughness: 0.3, side: THREE.DoubleSide }),
    hair: std({ color: 0x5e8bd6, metalness: 1, roughness: 0.25, side: THREE.DoubleSide, emissive: 0x0b1a33 }),
    ruby: new THREE.MeshPhysicalMaterial({ color: 0xc8102e, metalness: 0, roughness: 0.08, clearcoat: 1, emissive: 0x500010, emissiveIntensity: 0.55 }),
    plate: std({ color: 0xffffff, map: plateMap, bumpMap: plateBump, bumpScale: 0.6, metalness: 0.9, roughness: 0.45 }),
    bridge: std({ color: 0xffffff, map: geneva, bumpMap: genevaBump, bumpScale: 0.3, metalness: 0.8, roughness: 0.38 }),
    ring: std({ color: 0x2a2d33, metalness: 0.9, roughness: 0.35 }),
    dark: std({ color: 0x0a0b0d, metalness: 0.3, roughness: 0.6 }),
  };
}
