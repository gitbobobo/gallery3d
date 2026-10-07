import * as THREE from 'three';
import { mulberry, clamp } from './shared.js';
import { PIER, PILES } from './terrain.js';
import { patch } from './materials.js';
import { makeWoodTexture, makeBarkTexture } from './textures.js';
import { tube, glowTexture } from './geo.js';

export function buildPier(scene) {
  const rnd = mulberry(77);
  const wood = makeWoodTexture(3);
  const woodMat = new THREE.MeshStandardMaterial({ map: wood, color: 0xffeedd, roughness: 0.82 });
  const len = PIER.z0 - PIER.z1;
  const nPl = Math.floor(len / 0.165);
  const planks = new THREE.InstancedMesh(new THREE.BoxGeometry(PIER.w, 0.045, 0.15), woodMat, nPl);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), c = new THREE.Color();
  for (let i = 0; i < nPl; i++) {
    e.set((rnd() - 0.5) * 0.01, (rnd() - 0.5) * 0.012, (rnd() - 0.5) * 0.01); q.setFromEuler(e);
    m.compose(new THREE.Vector3(PIER.x + (rnd() - 0.5) * 0.02, PIER.y + (rnd() - 0.5) * 0.006, PIER.z0 - 0.1 - i * 0.165), q, new THREE.Vector3(0.96 + rnd() * 0.04, 1, 1));
    planks.setMatrixAt(i, m);
    c.setScalar(0.95 + rnd() * 0.45); c.r *= 1 + (rnd() - 0.5) * 0.1;
    planks.setColorAt(i, c);
  }
  planks.castShadow = planks.receiveShadow = true;
  scene.add(planks);

  const beamGeo = new THREE.BoxGeometry(0.09, 0.13, len + 0.2);
  const uv = beamGeo.attributes.uv;
  for (let i = 0; i < uv.count; i++) { const u = uv.getX(i), v = uv.getY(i); uv.setXY(i, v * 3, u); }
  for (const s of [-1, 1]) {
    const b = new THREE.Mesh(beamGeo, woodMat);
    b.position.set(PIER.x + s * 0.6, PIER.y - 0.09, (PIER.z0 + PIER.z1) / 2 - 0.05);
    b.castShadow = b.receiveShadow = true; scene.add(b);
  }
  const crossGeo = new THREE.BoxGeometry(PIER.w + 0.1, 0.08, 0.09);
  const pileZs = [...new Set(PILES.map(p => p.z))];
  for (const z of pileZs) {
    const b = new THREE.Mesh(crossGeo, woodMat);
    b.position.set(PIER.x, PIER.y - 0.17, z);
    b.castShadow = b.receiveShadow = true; scene.add(b);
  }

  const bark = makeBarkTexture(5, 128, 256, [168, 150, 128]);
  const pileMat = patch(new THREE.MeshStandardMaterial({ map: bark, color: 0xd8cfbf, roughness: 0.9 }), {
    fsColor: `{
      float wet = smoothstep(0.4, -0.02, vWP.y);
      diffuseColor.rgb *= mix(1.0, 0.5, wet);
      float alg = smoothstep(-0.02, -0.5, vWP.y) * 0.65 + smoothstep(0.05,-0.02,vWP.y)*smoothstep(-0.08,-0.02,vWP.y)*0.5;
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.02,0.05,0.012), alg);
    }`, key: 'pile',
  });
  const lanternPile = PILES[PILES.length - 2];
  PILES.forEach((p, i) => {
    const east = p.x > PIER.x;
    const top = east ? 1.32 : PIER.y + 0.42;
    const h = top + 2.4;
    const g = new THREE.CylinderGeometry(0.088, 0.105, h, 10);
    const pm = new THREE.Mesh(g, pileMat);
    pm.position.set(p.x, top - h / 2, p.z);
    pm.rotation.y = rnd() * 6;
    pm.castShadow = pm.receiveShadow = true;
    pm.layers.enable(1);
    scene.add(pm);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.088, 0.03, 10), woodMat);
    cap.position.set(p.x, top + 0.012, p.z); cap.castShadow = true; scene.add(cap);
  });

  const eastPiles = PILES.filter(p => p.x > PIER.x).sort((a, b) => b.z - a.z);
  const hemp = new THREE.MeshStandardMaterial({ color: 0x8c7650, roughness: 1 });
  for (const h of [1.08, 0.82]) {
    for (let i = 0; i < eastPiles.length - 1; i++) {
      const a = eastPiles[i], b = eastPiles[i + 1];
      const pts = [];
      for (let k = 0; k <= 12; k++) {
        const t = k / 12;
        pts.push(new THREE.Vector3(a.x + 0.08, h - Math.sin(t * Math.PI) * 0.09, a.z + (b.z - a.z) * t));
      }
      const r = new THREE.Mesh(tube(pts, pts.map(() => 0.013), 5, 1), hemp);
      r.castShadow = true; scene.add(r);
    }
  }

  const lp = new THREE.Vector3(lanternPile.x - 0.02, PIER.y + 0.42 + 0.02, lanternPile.z);
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.5, 0.05), woodMat);
  post.position.set(lp.x, lp.y + 0.25, lp.z); post.castShadow = true; scene.add(post);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.035, 0.035), woodMat);
  arm.position.set(lp.x + 0.12, lp.y + 0.5, lp.z); scene.add(arm);
  const lanternMat = new THREE.MeshStandardMaterial({ color: 0x2b2018, emissive: 0xff9a3c, emissiveIntensity: 0.15, roughness: 0.5 });
  const lantern = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.2, 0.14), lanternMat);
  const lpos = new THREE.Vector3(lp.x + 0.24, lp.y + 0.36, lp.z);
  lantern.position.copy(lpos); scene.add(lantern);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.09, 4), new THREE.MeshStandardMaterial({ color: 0x1c1410, roughness: 0.8 }));
  cap.position.set(lpos.x, lpos.y + 0.145, lpos.z); cap.rotation.y = Math.PI / 4; scene.add(cap);

  const light = new THREE.PointLight(0xffa24a, 0, 9, 2);
  light.position.copy(lpos); scene.add(light);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(128), color: 0xff9440, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.0, fog: false }));
  glow.position.copy(lpos); glow.scale.setScalar(1.5); scene.add(glow);

  return {
    lanternPos: lpos, blockers: [planks],
    update(env, t) {
      const L = env.out.lantern;
      const fl = 0.93 + 0.07 * Math.sin(t * 9) * Math.sin(t * 3.7 + 1);
      light.intensity = L * 2.2 * fl;
      lanternMat.emissiveIntensity = 0.1 + L * 3.2 * fl;
      glow.material.opacity = (0.12 + L * 0.7) * fl;
    },
  };
}
