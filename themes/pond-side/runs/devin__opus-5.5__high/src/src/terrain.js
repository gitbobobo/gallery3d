import * as THREE from 'three';
import { heightAt, TERRAIN_SIZE, signedShore } from './pond.js';
import { patchMaterial, setLayers, LAYER } from './shared.js';

export function createTerrain(quality) {
  const seg = quality > 0.6 ? 340 : 220;
  // non-uniform grid: denser near the pond
  const N = seg + 1;
  const half = TERRAIN_SIZE / 2;
  const warp = (u) => {
    // u in [-1,1] -> denser near 0
    const a = 0.55;
    return Math.sign(u) * (a * Math.abs(u) + (1 - a) * Math.pow(Math.abs(u), 2.2));
  };
  const pos = new Float32Array(N * N * 3);
  const sdArr = new Float32Array(N * N);
  let o = 0;
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const x = warp((i / seg) * 2 - 1) * half;
      const z = warp((j / seg) * 2 - 1) * half;
      pos[o++] = x;
      pos[o++] = heightAt(x, z);
      pos[o++] = z;
      sdArr[j * N + i] = signedShore(x, z);
    }
  }
  const idx = [];
  for (let j = 0; j < seg; j++)
    for (let i = 0; i < seg; i++) {
      const a = j * N + i, b = a + 1, c = a + N, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aShore', new THREE.BufferAttribute(sdArr, 1));
  geo.setIndex(idx);
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.92, metalness: 0 });
  patchMaterial(mat, {
    underwater: true,
    vertHead: 'attribute float aShore; varying float vShore;',
    begin: 'vShore = aShore;',
    fragHead: 'varying float vShore; float gBump;',
    fragColor: /* glsl */ `
      vec2 xz = vWPos.xz;
      float y = vWPos.y;
      float n1 = fbm5(xz * 0.9);
      float n2 = fbm3(xz * 4.0 + 7.0);
      float n3 = vnoise(xz * 22.0);
      // underwater bed
      vec3 mud = vec3(0.17, 0.135, 0.09);
      vec3 sand = vec3(0.33, 0.28, 0.19);
      vec3 silt = vec3(0.09, 0.1, 0.06);
      float sandK = smoothstep(0.45, 0.62, n1 + n2 * 0.25) * smoothstep(-1.0, -0.15, y);
      vec3 bed = mix(mud, sand, sandK);
      bed = mix(bed, silt, smoothstep(-0.4, -1.3, y) * (0.6 + 0.4 * n2));
      bed *= 0.85 + 0.3 * n3;
      // shore mud
      vec3 wetMud = vec3(0.13, 0.1, 0.07);
      vec3 dryMud = vec3(0.34, 0.27, 0.19);
      vec3 shore = mix(wetMud, dryMud, smoothstep(0.02, 0.32, y + (n2 - 0.5) * 0.12));
      shore *= 0.85 + 0.3 * n3;
      // grass land
      vec3 grassA = vec3(0.16, 0.25, 0.07);
      vec3 grassB = vec3(0.27, 0.32, 0.1);
      vec3 dirt = vec3(0.3, 0.24, 0.16);
      vec3 land = mix(grassA, grassB, n2);
      land = mix(land, dirt, smoothstep(0.62, 0.75, n1) * 0.8);
      land *= 0.8 + 0.4 * n3;
      float toShore = smoothstep(0.2, 1.4, vShore + (n1 - 0.5) * 1.2);
      vec3 above = mix(shore, land, toShore);
      vec3 col = mix(bed, above, smoothstep(-0.04, 0.06, y + (n3 - 0.5) * 0.03));
      diffuseColor.rgb = col;
      gBump = n3 * 0.012 + n2 * 0.03 + (1.0 - toShore) * vnoise(xz * 60.0) * 0.004;
    `,
    fragRough: /* glsl */ `
      float wetT = smoothstep(0.14, -0.02, vWPos.y);
      wetT = max(wetT, uRain * 0.6);
      roughnessFactor = mix(0.95, 0.42, wetT);
      diffuseColor.rgb *= mix(1.0, 0.72, smoothstep(0.14, 0.0, vWPos.y) * step(-0.02, vWPos.y));
    `,
    fragNormal: /* glsl */ `
      {
        vec3 dpdx = dFdx(-vViewPosition), dpdy = dFdy(-vViewPosition);
        float hx = dFdx(gBump), hy = dFdy(gBump);
        vec3 r1 = cross(dpdy, normal), r2 = cross(normal, dpdx);
        float det = dot(dpdx, r1);
        vec3 grad = sign(det) * (hx * r1 + hy * r2);
        normal = normalize(abs(det) * normal - grad);
      }
    `,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  setLayers(mesh, LAYER.MAIN, LAYER.REFL, LAYER.REFR);
  return mesh;
}
