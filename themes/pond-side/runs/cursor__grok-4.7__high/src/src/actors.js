import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {
  WIND_DIR,
  inPond,
  pondFactor,
  pondGrad,
  simAdvance,
  simImpulse,
  surfaceAt,
  terrainHeight,
} from './pond.js';
import { U } from './env.js';
import { dressFish } from './dress.js';

const _normal = new THREE.Vector3();
const _forward = new THREE.Vector3();
const _right = new THREE.Vector3();
const _basis = new THREE.Matrix4();
const _head = new THREE.Vector3();

function noRay(obj) {
  obj.traverse((o) => {
    o.raycast = () => {};
  });
}

function smoothstep(e0, e1, x) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

export function createActors(scene, sim, world, upload) {
  const fish = createFish(scene);
  const boats = [];
  const foods = [];
  const stones = [];
  const leaves = [];
  const droplets = createDroplets(scene);
  const rain = createRain(scene);
  const flies = createFireflies(scene);
  const boatGeo = makeBoatGeo();
  const boatMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.72,
    metalness: 0,
    side: THREE.DoubleSide,
  });
  const stoneGeo = makeStoneGeo();
  const flakeGeo = new THREE.CircleGeometry(0.035, 6);
  flakeGeo.rotateX(-Math.PI / 2);
  const flakeMat = new THREE.MeshStandardMaterial({
    color: '#d7c08a',
    roughness: 0.6,
    side: THREE.DoubleSide,
  });
  const leafGeo = new THREE.PlaneGeometry(0.1, 0.042);
  const leafMat = new THREE.MeshStandardMaterial({
    color: '#8eaa45',
    roughness: 0.55,
    side: THREE.DoubleSide,
  });

  seedLeaves(leaves, leafGeo, leafMat, scene);

  const api = {
    rain: rain.group,
    flies: flies.group,
    update,
    ripple(x, z) {
      simImpulse(sim, x, z, 0.055, 0.22);
    },
    throwStone(x, z, camPos) {
      if (stones.length > 12) {
        const old = stones.find((s) => s.state === 'rest') || stones[0];
        scene.remove(old.mesh);
        stones.splice(stones.indexOf(old), 1);
      }
      const mesh = new THREE.Mesh(
        stoneGeo,
        new THREE.MeshStandardMaterial({
          color: stones.length % 2 ? '#8d8680' : '#6e675f',
          roughness: 0.7,
          metalness: 0.04,
        }),
      );
      const s = 0.055 + Math.random() * 0.035;
      mesh.scale.setScalar(s);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData.kind = 'stone';
      scene.add(mesh);
      const start = camPos.clone();
      start.y = Math.max(0.9, Math.min(start.y, 2.2));
      stones.push({
        mesh,
        state: 'fly',
        start,
        x,
        z,
        y: start.y,
        vy: 0,
        t: 0,
        duration: 0.42 + Math.hypot(start.x - x, start.z - z) * 0.05,
        radius: s,
        spin: Math.random() * 4,
      });
    },
    placeBoat(x, z) {
      if (boats.length >= 8) {
        const old = boats.shift();
        scene.remove(old.mesh);
      }
      const mesh = new THREE.Mesh(boatGeo, boatMat);
      mesh.castShadow = true;
      mesh.userData.kind = 'boat';
      scene.add(mesh);
      const placed = resolveFloat(x, z, 0.12, boats, world);
      boats.push({
        mesh,
        x: placed.x,
        z: placed.z,
        vx: 0,
        vz: 0,
        yaw: Math.random() * Math.PI * 2,
      });
      simImpulse(sim, placed.x, placed.z, 0.03, 0.16);
    },
    placeFood(x, z) {
      if (!inPond(x, z, 0.04)) return;
      if (foods.length >= 6) {
        const old = foods.shift();
        scene.remove(old.group);
      }
      const group = new THREE.Group();
      const flakes = [];
      const n = 5 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) {
        const mesh = new THREE.Mesh(flakeGeo, flakeMat);
        const ox = (Math.random() - 0.5) * 0.22;
        const oz = (Math.random() - 0.5) * 0.22;
        mesh.scale.setScalar(0.7 + Math.random() * 0.8);
        mesh.userData.kind = 'food';
        group.add(mesh);
        flakes.push({
          mesh,
          x: x + ox,
          z: z + oz,
          phase: Math.random() * 6,
          alive: true,
        });
      }
      scene.add(group);
      foods.push({ group, flakes, x, z });
      simImpulse(sim, x, z, 0.02, 0.12);
    },
  };

  function update(dt) {
    const time = U.uTime.value;
    const wind = U.uWind.value;
    const rainAmt = U.uRain.value;
    const night = U.uNight.value;

    if (rainAmt > 0.08) {
      const drops = Math.round(rainAmt * 7);
      for (let i = 0; i < drops; i++) {
        const x = (Math.random() * 2 - 1) * 6;
        const z = (Math.random() * 2 - 1) * 4.6;
        if (inPond(x, z, 0.03)) {
          simImpulse(sim, x, z, 0.01 + rainAmt * 0.008, 0.09);
          if (Math.random() < 0.35) droplets.burst(x, z, false);
        }
      }
    }

    for (const tip of world.tips) {
      const s = Math.sin(time * (1.05 + wind * 0.9) + tip.phase);
      const dip = (s * 0.5 - 0.5) * (0.02 + wind * 0.09);
      const y = tip.baseY + dip;
      const x = tip.x + s * (0.05 + wind * 0.22);
      const z = tip.z + s * 0.65 * (0.05 + wind * 0.22);
      if (y < 0.002 && !tip.wet && inPond(x, z, 0.02)) {
        simImpulse(sim, x, z, 0.07 + wind * 0.03, 0.22);
        tip.wet = true;
      }
      if (y > 0.03) tip.wet = false;
    }

    simAdvance(sim, dt);
    upload();

    for (const lily of world.lilies) {
      const srf = surfaceAt(sim, lily.x, lily.z, time, wind);
      lily.pad.position.y = srf.y + 0.012;
      _normal.set(srf.nx, srf.ny, srf.nz);
      _forward.set(0, 1, 0);
      lily.pad.quaternion.setFromUnitVectors(_forward, _normal);
    }

    updateStones(dt, time, wind);
    updateBoats(dt, time, wind);
    updateFoods(dt, time, wind);
    updateFish(dt, time, wind);
    updateLeaves(dt, time, wind);
    droplets.update(dt, sim);
    rain.update(dt, wind, rainAmt);
    flies.update(dt, time, night);
    spawnLeaves(dt, wind);
    upload();
  }

  installFishHelpers(fish, world.posts);

  function updateStones(dt) {
    for (const stone of stones) {
      if (stone.state === 'fly') {
        stone.t += dt;
        const t = Math.min(1, stone.t / stone.duration);
        const arc = Math.sin(t * Math.PI) * (0.65 + Math.hypot(stone.start.x - stone.x, stone.start.z - stone.z) * 0.1);
        const x = stone.start.x + (stone.x - stone.start.x) * t;
        const z = stone.start.z + (stone.z - stone.start.z) * t;
        const y = stone.start.y + (0.15 - stone.start.y) * t + arc;
        stone.mesh.position.set(x, y, z);
        stone.mesh.rotation.x += dt * stone.spin;
        stone.mesh.rotation.z += dt * stone.spin * 0.7;
        if (t >= 1) {
          stone.state = 'sink';
          stone.y = 0.05;
          stone.vy = -0.2;
          simImpulse(sim, stone.x, stone.z, 0.2, 0.42);
          droplets.burst(stone.x, stone.z, true);
          scareFish(stone.x, stone.z);
        }
      } else if (stone.state === 'sink') {
        stone.vy -= 3.4 * dt;
        stone.vy *= Math.exp(-1.4 * dt);
        stone.y += stone.vy * dt;
        const bottom = terrainHeight(stone.x, stone.z) + stone.radius * 0.8;
        if (stone.y <= bottom) {
          stone.y = bottom;
          stone.state = 'rest';
        }
        stone.mesh.position.set(stone.x, stone.y, stone.z);
        stone.mesh.rotation.x += dt * 0.8;
      }
    }
  }

  function updateBoats(dt, time, wind) {
    const drag = Math.exp(-0.7 * dt);
    const push = wind * (0.22 + wind);
    for (const boat of boats) {
      const srf = surfaceAt(sim, boat.x, boat.z, time, wind);
      boat.vx += WIND_DIR.x * push * 0.85 * dt;
      boat.vz += WIND_DIR.z * push * 0.85 * dt;
      boat.vx += srf.nx * 2.1 * dt;
      boat.vz += srf.nz * 2.1 * dt;
      boat.vx *= drag;
      boat.vz *= drag;
      boat.x += boat.vx * dt;
      boat.z += boat.vz * dt;
      const solved = resolveFloat(boat.x, boat.z, 0.14, boats, world, boat);
      if (solved.hit) {
        const nx = solved.nx || 0;
        const nz = solved.nz || 0;
        const vn = boat.vx * nx + boat.vz * nz;
        if (vn < 0) {
          boat.vx -= nx * vn;
          boat.vz -= nz * vn;
        }
      }
      boat.x = solved.x;
      boat.z = solved.z;
      const sp = Math.hypot(boat.vx, boat.vz);
      if (sp > 0.03) boat.yaw = Math.atan2(boat.vx, boat.vz);
      _normal.set(srf.nx, srf.ny, srf.nz);
      _forward.set(Math.sin(boat.yaw), 0, Math.cos(boat.yaw));
      _right.crossVectors(_normal, _forward);
      if (_right.lengthSq() < 1e-6) _right.set(1, 0, 0);
      _right.normalize();
      _forward.crossVectors(_right, _normal).normalize();
      _basis.makeBasis(_right, _normal, _forward);
      boat.mesh.quaternion.setFromRotationMatrix(_basis);
      boat.mesh.position.set(boat.x, srf.y + 0.02, boat.z);
    }
  }

  function updateFoods(dt, time, wind) {
    const drag = Math.exp(-1.1 * dt);
    const push = wind * (0.18 + wind * 0.8);
    for (const food of foods) {
      let cx = 0;
      let cz = 0;
      let n = 0;
      for (const flake of food.flakes) {
        if (!flake.alive) continue;
        const srf = surfaceAt(sim, flake.x, flake.z, time, wind);
        flake.vx = (flake.vx || 0) + WIND_DIR.x * push * 0.35 * dt + srf.nx * 0.8 * dt;
        flake.vz = (flake.vz || 0) + WIND_DIR.z * push * 0.35 * dt + srf.nz * 0.8 * dt;
        flake.vx *= drag;
        flake.vz *= drag;
        flake.x += flake.vx * dt;
        flake.z += flake.vz * dt;
        const solved = resolveFloat(flake.x, flake.z, 0.05, [], world);
        flake.x = solved.x;
        flake.z = solved.z;
        flake.mesh.position.set(flake.x, srf.y + 0.008, flake.z);
        flake.mesh.rotation.y = time * 0.4 + flake.phase;
        cx += flake.x;
        cz += flake.z;
        n++;
      }
      if (n > 0) {
        food.x = cx / n;
        food.z = cz / n;
      }
    }
  }

  function updateFish(dt, time, wind) {
    const foodsAlive = foods.filter((f) => f.flakes.some((fl) => fl.alive));
    for (const f of fish) {
      if (f.flee > 0) f.flee -= dt;
      let desired = null;
      let seek = null;
      if (f.flee > 0) {
        f.targetY = -0.85;
        f.speed = 1.15;
        f.amp = 1.7;
      } else if (foodsAlive.length) {
        let best = Infinity;
        for (const food of foodsAlive) {
          for (const flake of food.flakes) {
            if (!flake.alive) continue;
            const d = Math.hypot(flake.x - f.x, flake.z - f.z);
            if (d < best) {
              best = d;
              seek = flake;
            }
          }
        }
        if (seek && best < 4.8) {
          desired = _forward.set(seek.x - f.x, 0, seek.z - f.z);
          if (desired.lengthSq() > 1e-6) desired.normalize();
          f.speed = 0.78;
          f.targetY = best < 0.45 ? -0.05 : -0.16;
          f.amp = 1.35;
        }
      }
      if (!desired) {
        f.wander -= dt;
        if (f.wander <= 0) {
          f.heading += (Math.random() - 0.5) * 1.4;
          f.wander = 1.2 + Math.random() * 2.4;
        }
        if (pondFactor(f.x, f.z) > 0.72) {
          const inward = Math.atan2(-f.z, -f.x);
          f.heading += wrapAngle(inward - f.heading) * 0.08;
        }
        desired = _forward.set(Math.sin(f.heading), 0, Math.cos(f.heading));
        f.speed = 0.32 + Math.sin(time * 0.6 + f.phase) * 0.05;
        const depth = waterDepthAt(f.x, f.z);
        f.targetY = Math.max(-depth + 0.16, -0.35 - Math.sin(time * 0.35 + f.phase) * 0.12);
        f.amp = 0.85;
      } else {
        f.heading = Math.atan2(desired.x, desired.z);
      }

      const blend = 1 - Math.exp(-2.8 * dt);
      f.dir.lerp(desired, blend).normalize();
      separateFish(f);
      avoidPosts(f);
      f.dir.normalize();
      f.x += f.dir.x * f.speed * dt;
      f.z += f.dir.z * f.speed * dt;
      if (pondFactor(f.x, f.z) > 0.9) {
        const g = pondGrad(f.x, f.z);
        const gl = Math.hypot(g.x, g.z) || 1;
        f.x -= (g.x / gl) * 0.04;
        f.z -= (g.z / gl) * 0.04;
      }
      const floor = terrainHeight(f.x, f.z) + 0.08;
      f.targetY = Math.max(f.targetY, floor);
      f.y = THREE.MathUtils.damp(f.y, Math.min(f.targetY, -0.02), 3.2, dt);
      f.group.position.set(f.x, f.y, f.z);
      let pitch = THREE.MathUtils.clamp((f.y - f.targetY) * 2.2, -0.35, 0.45);
      if (seek && f.flee <= 0) {
        const d = Math.hypot(seek.x - f.x, seek.z - f.z);
        if (d < 0.42) pitch = -0.55;
        if (d < 0.16 && f.y > -0.14) {
          _head.set(0, 0.02, 0.32);
          f.group.localToWorld(_head);
          simImpulse(sim, _head.x, _head.z, 0.018, 0.08);
          seek.alive = false;
          seek.mesh.visible = false;
          f.bite = 0.35;
        }
      }
      f.group.rotation.order = 'YXZ';
      f.group.rotation.y = Math.atan2(f.dir.x, f.dir.z);
      f.group.rotation.x = pitch;
      const arr = f.ampAttr.array;
      const amp = f.amp;
      for (let i = 0; i < arr.length; i++) arr[i] = amp;
      f.ampAttr.needsUpdate = true;
    }
    for (let i = foods.length - 1; i >= 0; i--) {
      if (foods[i].flakes.every((fl) => !fl.alive)) {
        scene.remove(foods[i].group);
        foods.splice(i, 1);
      }
    }
    void wind;
  }

  function updateLeaves(dt, time, wind) {
    const push = wind * (0.2 + wind);
    for (const leaf of leaves) {
      if (leaf.state === 'fall') {
        leaf.vy = Math.max(leaf.vy - 0.7 * dt, -0.42);
        leaf.x += (WIND_DIR.x * (0.15 + wind * 0.8) + Math.sin(time * 3 + leaf.phase) * 0.15) * dt;
        leaf.z += (WIND_DIR.z * (0.15 + wind * 0.8) + Math.cos(time * 2.4 + leaf.phase) * 0.12) * dt;
        leaf.y += leaf.vy * dt;
        leaf.mesh.rotation.x += dt * 2.2;
        leaf.mesh.rotation.z += dt * 1.4;
        const srf = surfaceAt(sim, leaf.x, leaf.z, time, wind);
        if (leaf.y <= srf.y + 0.01 && inPond(leaf.x, leaf.z, 0.02)) {
          leaf.y = srf.y;
          leaf.state = 'float';
          leaf.vx = WIND_DIR.x * 0.1;
          leaf.vz = WIND_DIR.z * 0.1;
          simImpulse(sim, leaf.x, leaf.z, 0.02, 0.1);
          droplets.burst(leaf.x, leaf.z, false);
        } else if (leaf.y < terrainHeight(leaf.x, leaf.z)) {
          leaf.state = 'gone';
          leaf.mesh.visible = false;
        }
        leaf.mesh.position.set(leaf.x, leaf.y, leaf.z);
      } else if (leaf.state === 'float') {
        const srf = surfaceAt(sim, leaf.x, leaf.z, time, wind);
        leaf.vx = (leaf.vx || 0) + WIND_DIR.x * push * 0.45 * dt + srf.nx * 1.1 * dt;
        leaf.vz = (leaf.vz || 0) + WIND_DIR.z * push * 0.45 * dt + srf.nz * 1.1 * dt;
        leaf.vx *= Math.exp(-0.8 * dt);
        leaf.vz *= Math.exp(-0.8 * dt);
        leaf.x += leaf.vx * dt;
        leaf.z += leaf.vz * dt;
        const solved = resolveFloat(leaf.x, leaf.z, 0.05, [], world);
        leaf.x = solved.x;
        leaf.z = solved.z;
        leaf.mesh.position.set(leaf.x, srf.y + 0.008, leaf.z);
        leaf.mesh.rotation.y += dt * 0.4;
        leaf.mesh.rotation.z = Math.sin(time * 1.5 + leaf.phase) * 0.3;
      }
    }
  }

  let leafAcc = 1.2;
  function spawnLeaves(dt, wind) {
    leafAcc -= dt * (0.08 + wind * 0.55);
    if (leafAcc > 0) return;
    leafAcc = 0.8 + Math.random() * 1.6;
    const alive = leaves.filter((l) => l.state !== 'gone');
    if (alive.length > 14) {
      const old = leaves.find((l) => l.state === 'float');
      if (old) {
        old.state = 'gone';
        old.mesh.visible = false;
      }
    }
    const tip = world.tips[Math.floor(Math.random() * Math.max(1, world.tips.length))] || {
      x: -2.2,
      z: -0.3,
      baseY: 1.6,
      phase: 0,
    };
    const s = Math.sin(U.uTime.value * (1.05 + wind * 0.9) + (tip.phase || 0));
    let leaf = leaves.find((item) => item.state === 'gone');
    if (!leaf) {
      const mesh = new THREE.Mesh(leafGeo, leafHueMat(Math.random()));
      noRay(mesh);
      scene.add(mesh);
      leaf = { mesh, state: 'fall', x: 0, y: 1, z: 0, vy: 0, phase: 0 };
      leaves.push(leaf);
    }
    leaf.state = 'fall';
    leaf.mesh.visible = true;
    leaf.x = (tip.x || -2.2) + s * 0.1;
    leaf.y = Math.max(0.9, tip.baseY || 1.5);
    leaf.z = tip.z || -0.3;
    leaf.vy = -0.05;
    leaf.phase = Math.random() * 6;
    leaf.mesh.position.set(leaf.x, leaf.y, leaf.z);
  }

  function scareFish(x, z) {
    for (const f of fish) {
      const d = Math.hypot(f.x - x, f.z - z);
      if (d < 3.3) {
        f.flee = 2.6;
        const inv = 1 / Math.max(d, 0.2);
        f.dir.set((f.x - x) * inv, 0, (f.z - z) * inv).normalize();
        f.heading = Math.atan2(f.dir.x, f.dir.z);
      }
    }
  }

  return api;
}

function leafHueMat(randHue) {
  const color = randHue > 0.85 ? '#c6a24a' : '#7ea044';
  return new THREE.MeshStandardMaterial({ color, roughness: 0.55, side: THREE.DoubleSide });
}

function seedLeaves(leaves, geo, mat, scene) {
  const specs = [
    { x: -0.7, z: 1.15, state: 'float' },
    { x: 0.45, z: -0.35, state: 'float' },
    { x: -1.8, z: 0.15, y: 1.7, state: 'fall' },
  ];
  for (const spec of specs) {
    const mesh = new THREE.Mesh(geo, spec.state === 'fall' ? leafHueMat(0.2) : mat);
    noRay(mesh);
    scene.add(mesh);
    const leaf = {
      mesh,
      state: spec.state,
      x: spec.x,
      y: spec.y || 0,
      z: spec.z,
      vy: -0.12,
      vx: 0.02,
      vz: 0.01,
      phase: Math.random() * 6,
    };
    mesh.position.set(leaf.x, leaf.y, leaf.z);
    leaves.push(leaf);
  }
}

function waterDepthAt(x, z) {
  return Math.max(0.05, -terrainHeight(x, z));
}

function wrapAngle(a) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

function separateFish(f) {
  separateFishImpl(f);
}

function avoidPosts(f) {
  avoidPostsImpl(f);
}

function resolveFloat(x, z, radius, boats, world, self) {
  let hit = false;
  let nx = 0;
  let nz = 0;
  const f = pondFactor(x, z);
  if (f > 0.9) {
    const g = pondGrad(x, z);
    const gl = Math.hypot(g.x, g.z) || 1;
    const push = (f - 0.88) * 1.4 + radius;
    x -= (g.x / gl) * push;
    z -= (g.z / gl) * push;
    nx = -g.x / gl;
    nz = -g.z / gl;
    hit = true;
  }
  for (const lily of world.lilies) {
    const dx = x - lily.x;
    const dz = z - lily.z;
    const d = Math.hypot(dx, dz);
    const min = radius + lily.r;
    if (d < min && d > 1e-5) {
      nx = dx / d;
      nz = dz / d;
      x = lily.x + nx * min;
      z = lily.z + nz * min;
      hit = true;
    }
  }
  for (const post of world.posts) {
    const dx = x - post.x;
    const dz = z - post.z;
    const d = Math.hypot(dx, dz);
    const min = radius + post.r;
    if (d < min && d > 1e-5) {
      nx = dx / d;
      nz = dz / d;
      x = post.x + nx * min;
      z = post.z + nz * min;
      hit = true;
    }
  }
  if (boats) {
    for (const other of boats) {
      if (other === self) continue;
      const dx = x - other.x;
      const dz = z - other.z;
      const d = Math.hypot(dx, dz);
      const min = radius + 0.16;
      if (d < min && d > 1e-5) {
        nx = dx / d;
        nz = dz / d;
        x = other.x + nx * min;
        z = other.z + nz * min;
        hit = true;
      }
    }
  }
  return { x, z, hit, nx, nz };
}

function createFish(scene) {
  const mat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.32,
    metalness: 0.06,
  });
  dressFish(mat);
  const specs = [
    { x: -0.15, z: 1.55, pattern: 0, phase: 0.4, heading: 1.55 },
    { x: 1.35, z: 0.85, pattern: 1, phase: 1.7, heading: 2.4 },
    { x: -1.15, z: 0.35, pattern: 4, phase: 2.4, heading: -0.7 },
    { x: 0.55, z: -0.35, pattern: 2, phase: 0.2, heading: 2.0 },
    { x: -1.7, z: -0.55, pattern: 3, phase: 3.1, heading: 0.9 },
    { x: 1.65, z: -1.05, pattern: 1, phase: 4.2, heading: -2.2 },
  ];
  const list = [];
  const eyeWhite = new THREE.MeshStandardMaterial({ color: '#f4f1ea', roughness: 0.3 });
  const eyeBlack = new THREE.MeshStandardMaterial({ color: '#1a120e', roughness: 0.4 });
  for (const spec of specs) {
    const geo = buildFishGeo(spec.pattern, spec.phase);
    const ampAttr = geo.getAttribute('aAmp');
    ampAttr.setUsage(THREE.DynamicDrawUsage);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    noRay(mesh);
    const group = new THREE.Group();
    group.add(mesh);
    for (const side of [-1, 1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 6), eyeWhite);
      eye.position.set(side * 0.075, 0.035, 0.2);
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.009, 6, 5), eyeBlack);
      pupil.position.set(0, 0, 0.012);
      eye.add(pupil);
      noRay(eye);
      group.add(eye);
    }
    group.position.set(spec.x, -0.28, spec.z);
    scene.add(group);
    const heading = spec.heading;
    list.push({
      group,
      ampAttr,
      x: spec.x,
      y: -0.28,
      z: spec.z,
      dir: new THREE.Vector3(Math.sin(heading), 0, Math.cos(heading)),
      heading,
      wander: 1,
      speed: 0.32,
      targetY: -0.25,
      phase: spec.phase,
      flee: 0,
      amp: 1,
      bite: 0,
    });
  }
  return list;
}

function buildFishGeo(pattern, phase) {
  const body = new THREE.SphereGeometry(0.5, 18, 12);
  body.scale(0.2, 0.15, 0.58);
  const pos = body.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const z = pos.getZ(i);
    const tail = smoothstep(0.02, -0.48, z);
    const s = 1 - tail * 0.7;
    pos.setX(i, pos.getX(i) * s);
    pos.setY(i, pos.getY(i) * (1 - tail * 0.55));
  }
  const tail = new THREE.ConeGeometry(0.07, 0.2, 4);
  tail.rotateX(-Math.PI / 2);
  tail.translate(0, 0, -0.42);
  const fin = new THREE.BoxGeometry(0.012, 0.09, 0.14);
  fin.translate(0, 0.09, -0.02);
  addFishAttrs(body, pattern, phase);
  addFishAttrs(tail, pattern, phase);
  addFishAttrs(fin, pattern, phase);
  return mergeGeometries([body, tail, fin]);
}

function addFishAttrs(geo, pattern, phase) {
  const n = geo.attributes.position.count;
  const spine = new Float32Array(n);
  const pat = new Float32Array(n);
  const ph = new Float32Array(n);
  const amp = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const z = geo.attributes.position.getZ(i);
    spine[i] = THREE.MathUtils.clamp((0.22 - z) / 0.7, 0, 1);
    pat[i] = pattern;
    ph[i] = phase;
    amp[i] = 1;
  }
  geo.setAttribute('aSpine', new THREE.BufferAttribute(spine, 1));
  geo.setAttribute('aPattern', new THREE.BufferAttribute(pat, 1));
  geo.setAttribute('aPhase', new THREE.BufferAttribute(ph, 1));
  geo.setAttribute('aAmp', new THREE.BufferAttribute(amp, 1));
  geo.computeVertexNormals();
}

function makeStoneGeo() {
  const geo = new THREE.IcosahedronGeometry(1, 1);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const j = 0.82 + ((i * 17) % 7) * 0.03;
    pos.setXYZ(i, pos.getX(i) * j, pos.getY(i) * (0.7 + (i % 5) * 0.04), pos.getZ(i) * j);
  }
  geo.computeVertexNormals();
  return geo;
}

function makeBoatGeo() {
  const positions = [
    0, 0.05, 0.3,
    0, 0.045, -0.24,
    0, 0.0, 0.02,
    -0.09, 0.07, 0.1,
    0.09, 0.07, 0.1,
    -0.075, 0.065, -0.1,
    0.075, 0.065, -0.1,
    -0.1, 0.078, 0.0,
    0.1, 0.078, 0.0,
  ];
  const indices = [
    2, 0, 3, 2, 4, 0, 2, 3, 7, 2, 7, 5, 2, 5, 1, 2, 1, 6, 2, 6, 8, 2, 8, 4,
    0, 4, 3, 3, 7, 0, 0, 7, 4, 7, 8, 4,
    1, 5, 6, 5, 7, 6, 7, 8, 6,
  ];
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  const cream = new THREE.Color('#f3e6c4');
  const red = new THREE.Color('#b3392c');
  const colors = new Float32Array(9 * 3);
  for (let i = 0; i < 9; i++) {
    const gunwale = i >= 3;
    const c = gunwale ? red : cream;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geo;
}

function createDroplets(scene) {
  const geo = new THREE.SphereGeometry(1, 6, 5);
  const mat = new THREE.MeshStandardMaterial({
    color: '#e7f2f4',
    roughness: 0.12,
    metalness: 0.04,
    transparent: true,
    opacity: 0.85,
  });
  const mesh = new THREE.InstancedMesh(geo, mat, 70);
  mesh.frustumCulled = false;
  mesh.count = 70;
  noRay(mesh);
  scene.add(mesh);
  const drops = Array.from({ length: 70 }, () => ({ alive: false, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, s: 0.02 }));
  const dummy = new THREE.Object3D();
  function sync() {
    for (let i = 0; i < drops.length; i++) {
      const d = drops[i];
      if (!d.alive) {
        dummy.position.set(0, -10, 0);
        dummy.scale.setScalar(0.0001);
      } else {
        dummy.position.set(d.x, d.y, d.z);
        dummy.scale.setScalar(d.s);
      }
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }
  sync();
  return {
    burst(x, z, big) {
      const n = big ? 22 : 6;
      let made = 0;
      for (const d of drops) {
        if (d.alive) continue;
        const a = Math.random() * Math.PI * 2;
        const sp = big ? 0.7 + Math.random() * 1.5 : 0.2 + Math.random() * 0.45;
        d.alive = true;
        d.x = x + (Math.random() - 0.5) * 0.08;
        d.y = 0.05;
        d.z = z + (Math.random() - 0.5) * 0.08;
        d.vx = Math.cos(a) * sp;
        d.vz = Math.sin(a) * sp;
        d.vy = (big ? 1.5 : 0.6) + Math.random() * (big ? 1.8 : 0.7);
        d.s = big ? 0.018 + Math.random() * 0.02 : 0.01 + Math.random() * 0.012;
        made++;
        if (made >= n) break;
      }
    },
    update(dt, simRef) {
      let dirty = false;
      for (const d of drops) {
        if (!d.alive) continue;
        dirty = true;
        d.vy -= 9.2 * dt;
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        d.z += d.vz * dt;
        if (d.y < 0 && d.vy < 0) {
          if (inPond(d.x, d.z, 0.02)) simImpulse(simRef, d.x, d.z, 0.012, 0.07);
          d.alive = false;
        }
      }
      if (dirty) sync();
    },
  };
}

function createRain(scene) {
  const geo = new THREE.PlaneGeometry(0.012, 0.48);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {},
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      void main() {
        float a = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.45, vUv.y);
        gl_FragColor = vec4(0.75, 0.8, 0.84, a * 0.38);
        #include <colorspace_fragment>
      }
    `,
  });
  const count = 320;
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  mesh.frustumCulled = false;
  noRay(mesh);
  const group = new THREE.Group();
  group.add(mesh);
  group.visible = false;
  scene.add(group);
  const drops = Array.from({ length: count }, () => spawnDrop(new THREE.Vector3()));
  const dummy = new THREE.Object3D();
  function spawnDrop() {
    return {
      x: (Math.random() * 2 - 1) * 8,
      y: Math.random() * 12,
      z: (Math.random() * 2 - 1) * 7,
      sp: 7 + Math.random() * 4,
      len: 0.65 + Math.random() * 0.7,
    };
  }
  return {
    group,
    update(dt, wind, rainAmt) {
      group.visible = rainAmt > 0.04;
      if (!group.visible) return;
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        d.y -= d.sp * dt * (0.45 + rainAmt);
        d.x += WIND_DIR.x * wind * 2.2 * dt;
        d.z += WIND_DIR.z * wind * 2.2 * dt;
        if (d.y < 0) {
          d.y = 8 + Math.random() * 6;
          d.x = (Math.random() * 2 - 1) * 8;
          d.z = (Math.random() * 2 - 1) * 7;
        }
        dummy.position.set(d.x, d.y, d.z);
        dummy.rotation.set(wind * 0.45 * WIND_DIR.z, 0, -wind * 0.45 * WIND_DIR.x);
        dummy.scale.set(1, d.len, 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    },
  };
}

function createFireflies(scene) {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.25, 'rgba(230,255,170,0.7)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({
    map: tex,
    color: '#d6f58a',
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: 0,
  });
  const group = new THREE.Group();
  const bugs = [];
  for (let i = 0; i < 18; i++) {
    const sprite = new THREE.Sprite(mat);
    noRay(sprite);
    group.add(sprite);
    const overWater = i < 11;
    bugs.push({
      sprite,
      cx: overWater ? (Math.random() * 2 - 1) * 3.2 : -4.5 + Math.random() * 2,
      cy: 0.45 + Math.random() * 1.3,
      cz: overWater ? (Math.random() * 2 - 1) * 2.4 : -1.5 + Math.random(),
      rx: 0.35 + Math.random() * 0.8,
      rz: 0.3 + Math.random() * 0.7,
      p1: Math.random() * 6,
      p2: Math.random() * 6,
      p3: Math.random() * 6,
      s: 0.08 + Math.random() * 0.06,
    });
  }
  scene.add(group);
  return {
    group,
    update(dt, time, night) {
      const show = smoothstep(0.35, 0.75, night);
      mat.opacity = show;
      group.visible = show > 0.02;
      if (!group.visible) return;
      for (const b of bugs) {
        b.sprite.position.set(
          b.cx + Math.sin(time * 0.37 + b.p1) * b.rx,
          b.cy + Math.sin(time * 0.52 + b.p2) * 0.28,
          b.cz + Math.cos(time * 0.31 + b.p3) * b.rz,
        );
        const pulse = 0.85 + Math.sin(time * 4.5 + b.p1) * 0.2;
        b.sprite.scale.setScalar(b.s * pulse);
      }
      void dt;
    },
  };
}

// Fix separateFish / avoidPosts to actually use neighbors. Re-bound below after function declarations
// by patching prototypes — implemented inside updateFish via the functions defined here
// that close over nothing. The real versions are installed by rewriting updateFish calls.
// The functions above are placeholders; real logic is inlined in the replacement below.

function installFishHelpers(fishList, posts) {
  // monkeypatch by replacing methods on each fish isn't needed; updateFish calls
  // separateFish(f) and avoidPosts(f) which are empty. We'll export working versions
  // by assigning to the function bodies through this installer called from createActors.
  separateFishImpl.fish = fishList;
  avoidPostsImpl.posts = posts;
}

const separateFishImpl = (f) => {
  const fish = separateFishImpl.fish || [];
  for (const o of fish) {
    if (o === f) continue;
    const dx = f.x - o.x;
    const dz = f.z - o.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.38 && d > 1e-4) {
      f.dir.x += (dx / d) * 0.35;
      f.dir.z += (dz / d) * 0.35;
    }
  }
};

const avoidPostsImpl = (f) => {
  const posts = avoidPostsImpl.posts || [];
  for (const post of posts) {
    const dx = f.x - post.x;
    const dz = f.z - post.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.42 && d > 1e-4) {
      f.dir.x += (dx / d) * 0.5;
      f.dir.z += (dz / d) * 0.5;
    }
  }
};

// The updateFish function calls separateFish and avoidPosts which are empty stubs.
// Point those names... they were function declarations, not reassignable consts.
// I'll call the impls by editing updateFish — done via the stubs calling impl if present.
