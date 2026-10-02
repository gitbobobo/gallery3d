import * as THREE from 'three';

/**
 * Creates a procedural Perlage (circular graining / 鱼鳞纹) texture.
 * Classic high-end Swiss finishing applied to the mainplate and recesses.
 */
export function createPerlageTexture(size = 1024): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Base metallic fill
  ctx.fillStyle = '#e8ecf0';
  ctx.fillRect(0, 0, size, size);

  // Staggered overlapping circular swirls
  const circleRadius = 26;
  const stepX = circleRadius * 0.95;
  const stepY = circleRadius * 0.82;

  let row = 0;
  for (let y = -circleRadius; y < size + circleRadius * 2; y += stepY) {
    const offsetX = (row % 2) * (stepX * 0.5);
    for (let x = -circleRadius + offsetX; x < size + circleRadius * 2; x += stepX) {
      // Draw circular swirl with radial gradient
      const grad = ctx.createRadialGradient(
        x - circleRadius * 0.2,
        y - circleRadius * 0.2,
        1,
        x,
        y,
        circleRadius
      );
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
      grad.addColorStop(0.35, 'rgba(230, 235, 240, 0.4)');
      grad.addColorStop(0.75, 'rgba(175, 182, 192, 0.35)');
      grad.addColorStop(0.95, 'rgba(120, 128, 140, 0.28)');
      grad.addColorStop(1, 'rgba(100, 110, 125, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
      ctx.fill();

      // Fine spiral scratch ring inside each perlage spot
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, circleRadius * 0.65, 0.2, Math.PI * 1.6);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(90, 100, 115, 0.2)';
      ctx.beginPath();
      ctx.arc(x, y, circleRadius * 0.85, 2.0, Math.PI * 2.2);
      ctx.stroke();
    }
    row++;
  }

  // Add subtle high-frequency metal noise
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 14;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates a procedural Côtes de Genève (Geneva Stripes / 日内瓦波纹) texture.
 * Parallel undulating wave stripes traditionally milled into rhodium bridges.
 */
export function createGenevaStripesTexture(size = 1024): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Light rhodium base
  ctx.fillStyle = '#edf2f7';
  ctx.fillRect(0, 0, size, size);

  const stripeWidth = 56;
  const numStripes = Math.ceil(size / stripeWidth) + 1;

  for (let s = 0; s < numStripes; s++) {
    const xStart = s * stripeWidth;
    const isAlt = s % 2 === 0;

    // Linear gradient across stripe with reflection contrast
    const grad = ctx.createLinearGradient(xStart, 0, xStart + stripeWidth, 0);
    if (isAlt) {
      grad.addColorStop(0, 'rgba(240, 245, 250, 0.45)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)');
      grad.addColorStop(0.7, 'rgba(220, 228, 238, 0.5)');
      grad.addColorStop(1, 'rgba(195, 205, 218, 0.4)');
    } else {
      grad.addColorStop(0, 'rgba(210, 218, 228, 0.5)');
      grad.addColorStop(0.3, 'rgba(235, 242, 250, 0.45)');
      grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.65)');
      grad.addColorStop(1, 'rgba(230, 238, 246, 0.5)');
    }

    ctx.fillStyle = grad;
    ctx.fillRect(xStart, 0, stripeWidth, size);

    // Fine semi-circular grain lines inside each stripe mimicking the rotating abrasive lap
    ctx.save();
    ctx.beginPath();
    ctx.rect(xStart, 0, stripeWidth, size);
    ctx.clip();

    ctx.strokeStyle = 'rgba(160, 175, 195, 0.18)';
    ctx.lineWidth = 1.2;
    const arcRadius = 140;
    const arcStep = 7;
    for (let y = -arcRadius; y < size + arcRadius; y += arcStep) {
      ctx.beginPath();
      ctx.arc(xStart + stripeWidth * 0.5, y, arcRadius, 0.15, Math.PI - 0.15);
      ctx.stroke();
    }
    ctx.restore();

    // Subtle edge dividing line
    ctx.strokeStyle = 'rgba(150, 165, 185, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(xStart, 0);
    ctx.lineTo(xStart, size);
    ctx.stroke();
  }

  // Fine noise
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 8;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.5, 1.5);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates a procedural Sunburst (太阳放射纹) texture for the ratchet wheel.
 */
export function createSunburstTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2;

  // Base
  ctx.fillStyle = '#dde2e8';
  ctx.fillRect(0, 0, size, size);

  // Radial rays
  const rays = 180;
  for (let i = 0; i < rays; i++) {
    const a1 = (i / rays) * Math.PI * 2;
    const a2 = ((i + 1) / rays) * Math.PI * 2;
    const brightness = 0.4 + 0.6 * Math.abs(Math.sin(a1 * 3 + Math.sin(a1 * 7) * 0.5));
    const col = Math.floor(180 + brightness * 75);

    ctx.fillStyle = `rgb(${col}, ${col + 2}, ${col + 6})`;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, maxR, a1, a2);
    ctx.closePath();
    ctx.fill();
  }

  // Circular brushed rings
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  for (let r = 10; r < maxR; r += 4) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Sets up a procedural studio PMREM reflection environment map.
 * Gives realistic metallic reflections without needing any external HDRI!
 */
export function createStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x0c0f14);

  // Studio softbox light panels
  const addSoftbox = (
    color: number,
    intensity: number,
    pos: THREE.Vector3,
    rot: THREE.Euler,
    scale: [number, number]
  ) => {
    const geo = new THREE.PlaneGeometry(scale[0], scale[1]);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color).multiplyScalar(intensity),
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    mesh.rotation.copy(rot);
    envScene.add(mesh);
  };

  // Main overhead softbox (warm daylight)
  addSoftbox(0xfffaed, 2.5, new THREE.Vector3(0, 15, 2), new THREE.Euler(Math.PI / 2, 0, 0), [14, 14]);

  // Key light side softbox
  addSoftbox(0xffffff, 2.0, new THREE.Vector3(14, 8, 8), new THREE.Euler(0.4, -0.9, 0), [10, 18]);

  // Fill light opposite side (slightly cooler)
  addSoftbox(0xd4e5ff, 1.4, new THREE.Vector3(-14, 7, 6), new THREE.Euler(0.4, 0.9, 0), [10, 16]);

  // Rim light back sharp highlight
  addSoftbox(0xfff0db, 2.2, new THREE.Vector3(-6, 9, -12), new THREE.Euler(0.3, 2.6, 0), [12, 10]);

  // Front fill ground bounce
  addSoftbox(0xa0b0c8, 0.8, new THREE.Vector3(0, -12, 5), new THREE.Euler(-Math.PI / 3, 0, 0), [20, 15]);

  const envTexture = pmremGenerator.fromScene(envScene).texture;
  pmremGenerator.dispose();
  return envTexture;
}
