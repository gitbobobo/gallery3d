import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createMovementMaterials } from './movement/materials';
import { createStudioEnvironment } from './movement/proceduralTextures';
import { buildWatchMovement, POSITIONS } from './movement/movementBuilder';
import { MovementSimulation } from './movement/simulation';
import { WatchSoundSynthesizer } from './movement/sound';
import { PARTS_DATA, PartInfo } from './movement/partsData';

// --- Global Application State ---
class WatchApp {
  private container!: HTMLElement;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;

  private simulation!: MovementSimulation;
  private sound!: WatchSoundSynthesizer;
  private lastTime = performance.now();
  private elapsedTime = 0;

  // Raycasting
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2(-9999, -9999);
  private hoveredPartKey: string | null = null;
  private selectedPartKey: string | null = null;

  // Camera animation
  private isCameraTransitioning = false;
  private cameraTargetPos = new THREE.Vector3();
  private controlsTargetPos = new THREE.Vector3();
  private cameraLerpAlpha = 0.05;

  // Selected highlight mesh
  private highlightGroup = new THREE.Group();

  constructor() {
    this.initDOM();
    this.initThree();
    this.initMovement();
    this.initEvents();
    this.animate();
  }

  private initDOM() {
    this.container = document.getElementById('canvas-container')!;
  }

  private initThree() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0c10);
    this.scene.fog = new THREE.FogExp2(0x0a0c10, 0.012);

    // Camera
    this.camera = new THREE.PerspectiveCamera(38, width / height, 0.5, 300);
    this.camera.position.set(0, -32, 38);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Procedural Studio Environment map for realistic reflections
    const envTexture = createStudioEnvironment(this.renderer);
    this.scene.environment = envTexture;

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 6;
    this.controls.maxDistance = 120;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.15; // Allow slight underside viewing
    this.controls.target.set(0, -2, 1);
    this.controls.update();

    // Lighting Setup
    // Key Light: Warm golden directional light
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.4);
    keyLight.position.set(16, -12, 28);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 5;
    keyLight.shadow.camera.far = 60;
    keyLight.shadow.camera.left = -22;
    keyLight.shadow.camera.right = 22;
    keyLight.shadow.camera.top = 22;
    keyLight.shadow.camera.bottom = -22;
    keyLight.shadow.bias = -0.0004;
    this.scene.add(keyLight);

    // Fill Light: Soft cool blue
    const fillLight = new THREE.DirectionalLight(0xa5c9ff, 1.2);
    fillLight.position.set(-18, 14, 20);
    this.scene.add(fillLight);

    // Rim Grazing Light: Sharp highlights along beveled edges
    const rimLight = new THREE.DirectionalLight(0xffecd1, 2.0);
    rimLight.position.set(0, 24, 12);
    this.scene.add(rimLight);

    // Underside Bounce Light
    const bounceLight = new THREE.DirectionalLight(0x718096, 0.7);
    bounceLight.position.set(0, 0, -20);
    this.scene.add(bounceLight);

    // Ambient soft illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    this.scene.add(ambientLight);

    // Highlight helper container
    this.scene.add(this.highlightGroup);
  }

  private initMovement() {
    this.sound = new WatchSoundSynthesizer();

    const materials = createMovementMaterials();
    const nodes = buildWatchMovement(materials);
    this.scene.add(nodes.rootGroup);

    // Instantiate simulation
    this.simulation = new MovementSimulation(nodes, (beat) => {
      this.sound.playTick(beat);
    });
  }

  private initEvents() {
    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize();

    const dom = this.renderer.domElement;
    dom.addEventListener('pointermove', this.onPointerMove.bind(this));
    dom.addEventListener('pointerdown', this.onPointerDown.bind(this));

    // UI Buttons wiring
    this.wireControls();
  }

  private onResize() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    const aspect = width / height;
    this.camera.aspect = aspect;

    // Adapt FOV on portrait/narrow screens so the full movement stays visible
    if (aspect < 1.0) {
      const baseFovRad = (42 * Math.PI) / 180;
      const targetHalfWidth = Math.tan(baseFovRad / 2) * 1.12;
      const adaptedFov = 2 * Math.atan(targetHalfWidth / aspect) * (180 / Math.PI);
      this.camera.fov = Math.min(Math.max(adaptedFov, 42), 70);
    } else {
      this.camera.fov = 42;
    }

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private pointerDownPos = new THREE.Vector2();

  private onPointerDown(e: PointerEvent) {
    this.pointerDownPos.set(e.clientX, e.clientY);

    const onPointerUp = (upEvt: PointerEvent) => {
      window.removeEventListener('pointerup', onPointerUp);
      const dist = Math.hypot(upEvt.clientX - this.pointerDownPos.x, upEvt.clientY - this.pointerDownPos.y);
      if (dist < 5) {
        this.onClick(upEvt);
      }
    };
    window.addEventListener('pointerup', onPointerUp);
  }

  private onPointerMove(e: PointerEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Raycast hover check
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    const tooltip = document.getElementById('hover-tooltip')!;

    let foundPart: string | null = null;
    for (const hit of intersects) {
      let obj: THREE.Object3D | null = hit.object;
      while (obj && obj !== this.scene) {
        if (obj.userData && obj.userData.partKey) {
          foundPart = obj.userData.partKey;
          break;
        }
        obj = obj.parent;
      }
      if (foundPart) break;
    }

    if (foundPart) {
      this.hoveredPartKey = foundPart;
      const info = PARTS_DATA[foundPart];
      if (info) {
        tooltip.textContent = `${info.name} · ${info.enName}`;
        tooltip.style.left = `${e.clientX}px`;
        tooltip.style.top = `${e.clientY}px`;
        tooltip.classList.add('visible');
        this.renderer.domElement.style.cursor = 'pointer';
        return;
      }
    }

    this.hoveredPartKey = null;
    tooltip.classList.remove('visible');
    this.renderer.domElement.style.cursor = 'default';
  }

  private onClick(e: PointerEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    for (const hit of intersects) {
      let obj: THREE.Object3D | null = hit.object;
      while (obj && obj !== this.scene) {
        if (obj.userData && obj.userData.partKey) {
          this.selectPart(obj.userData.partKey);
          return;
        }
        obj = obj.parent;
      }
    }
  }

  /**
   * Selects and inspects a watch part.
   */
  public selectPart(partKey: string) {
    const info = PARTS_DATA[partKey];
    if (!info) return;

    this.selectedPartKey = partKey;
    this.updateInfoCard(info);
    this.showInfoCard();
    this.highlightPart(partKey);
  }

  private updateInfoCard(info: PartInfo) {
    document.getElementById('card-category')!.textContent = info.category;
    document.getElementById('card-title')!.textContent = info.name;
    document.getElementById('card-en-title')!.textContent = info.enName;
    document.getElementById('card-summary')!.textContent = info.summary;
    document.getElementById('card-principle')!.textContent = info.principle;

    // Specs
    const specsContainer = document.getElementById('card-specs')!;
    specsContainer.innerHTML = '';
    for (const spec of info.specs) {
      const cell = document.createElement('div');
      cell.className = 'spec-cell';
      cell.innerHTML = `
        <div class="spec-label">${spec.label}</div>
        <div class="spec-val">${spec.value}</div>
      `;
      specsContainer.appendChild(cell);
    }

    // Highlights
    const hlContainer = document.getElementById('card-highlights')!;
    hlContainer.innerHTML = '';
    for (const hl of info.highlights) {
      const li = document.createElement('li');
      li.textContent = hl;
      hlContainer.appendChild(li);
    }
  }

  private showInfoCard() {
    const card = document.getElementById('info-card')!;
    card.classList.remove('hidden');
  }

  private hideInfoCard() {
    const card = document.getElementById('info-card')!;
    card.classList.add('hidden');
    this.selectedPartKey = null;
    this.clearHighlight();
  }

  private highlightPart(partKey: string) {
    this.clearHighlight();

    // Find center of part for subtle indicator ring
    let centerPos = new THREE.Vector3(0, 0, 1.5);
    let radius = 6;

    if (partKey === 'balance_wheel' || partKey === 'hairspring' || partKey === 'incabloc') {
      centerPos.set(POSITIONS.balance.x, POSITIONS.balance.y, 2.2);
      radius = 8.5;
    } else if (partKey === 'pallet_fork') {
      centerPos.set(POSITIONS.pallet.x, POSITIONS.pallet.y, 1.5);
      radius = 4.0;
    } else if (partKey === 'escape_wheel') {
      centerPos.set(POSITIONS.escape.x, POSITIONS.escape.y, 1.2);
      radius = 3.5;
    } else if (partKey === 'fourth_wheel') {
      centerPos.set(POSITIONS.fourth.x, POSITIONS.fourth.y, 1.0);
      radius = 6.2;
    } else if (partKey === 'third_wheel') {
      centerPos.set(POSITIONS.third.x, POSITIONS.third.y, 1.2);
      radius = 7.0;
    } else if (partKey === 'center_wheel') {
      centerPos.set(POSITIONS.center.x, POSITIONS.center.y, 1.0);
      radius = 9.4;
    } else if (partKey === 'mainspring_barrel' || partKey === 'ratchet_wheel') {
      centerPos.set(POSITIONS.barrel.x, POSITIONS.barrel.y, 1.6);
      radius = 13.0;
    }

    // Create subtle glowing indicator ring around selected part
    const ringGeo = new THREE.RingGeometry(radius * 0.96, radius * 1.02, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.copy(centerPos);
    this.highlightGroup.add(ringMesh);
  }

  private clearHighlight() {
    while (this.highlightGroup.children.length > 0) {
      const child = this.highlightGroup.children[0];
      this.highlightGroup.remove(child);
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
      }
    }
  }

  private focusOnPart(partKey: string) {
    let target = new THREE.Vector3(0, 0, 1.5);
    let camPos = new THREE.Vector3(0, -18, 20);

    if (partKey === 'balance_wheel' || partKey === 'hairspring' || partKey === 'incabloc' || partKey === 'regulator') {
      target.set(POSITIONS.balance.x, POSITIONS.balance.y, 2.5);
      camPos.set(POSITIONS.balance.x, POSITIONS.balance.y - 12, 14);
    } else if (partKey === 'pallet_fork' || partKey === 'escape_wheel') {
      target.set(POSITIONS.pallet.x * 0.5 + POSITIONS.escape.x * 0.5, POSITIONS.pallet.y * 0.5 + POSITIONS.escape.y * 0.5, 1.4);
      camPos.set(POSITIONS.escape.x, POSITIONS.escape.y - 8, 9);
    } else if (partKey === 'fourth_wheel' || partKey === 'third_wheel' || partKey === 'center_wheel') {
      target.set(POSITIONS.fourth.x, POSITIONS.fourth.y, 1.0);
      camPos.set(POSITIONS.fourth.x + 3, POSITIONS.fourth.y - 14, 15);
    } else if (partKey === 'mainspring_barrel' || partKey === 'ratchet_wheel') {
      target.set(POSITIONS.barrel.x, POSITIONS.barrel.y, 1.5);
      camPos.set(POSITIONS.barrel.x, POSITIONS.barrel.y - 16, 18);
    }

    this.transitionCameraTo(camPos, target);
  }

  private transitionCameraTo(camPos: THREE.Vector3, targetPos: THREE.Vector3) {
    this.cameraTargetPos.copy(camPos);
    this.controlsTargetPos.copy(targetPos);
    this.isCameraTransitioning = true;
    this.cameraLerpAlpha = 0.05;
  }

  private wireControls() {
    // Speed buttons
    const speedBtns = document.querySelectorAll<HTMLButtonElement>('.speed-btn');
    speedBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        speedBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const spd = parseFloat(btn.dataset.speed || '1');
        this.simulation.state.speed = spd;
      });
    });

    // Play/Pause button
    const playPauseBtn = document.getElementById('btn-play-pause')!;
    const iconPause = document.getElementById('icon-pause')!;
    const iconPlay = document.getElementById('icon-play')!;

    playPauseBtn.addEventListener('click', () => {
      if (this.simulation.state.mode === 'paused') {
        this.simulation.state.mode = 'ticking';
        iconPause.style.display = 'block';
        iconPlay.style.display = 'none';
      } else {
        this.simulation.state.mode = 'paused';
        iconPause.style.display = 'none';
        iconPlay.style.display = 'block';
      }
    });

    // Sound button
    const soundBtn = document.getElementById('btn-sound')!;
    soundBtn.addEventListener('click', () => {
      const isEnabled = !this.sound.isEnabled();
      this.sound.setEnabled(isEnabled);
      soundBtn.classList.toggle('active', isEnabled);
    });

    // Explode slider
    const explodeSlider = document.getElementById('explode-slider') as HTMLInputElement;
    const explodeVal = document.getElementById('explode-val')!;
    explodeSlider.addEventListener('input', () => {
      const val = parseFloat(explodeSlider.value);
      this.simulation.state.explodedProgress = val;
      explodeVal.textContent = `${Math.round(val * 100)}%`;
    });

    // Bridge transparency presets
    const bridgeBtns = document.querySelectorAll<HTMLButtonElement>('[data-bridge]');
    bridgeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        bridgeBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const opacity = parseFloat(btn.dataset.bridge || '1');
        this.simulation.setBridgeOpacity(opacity);
      });
    });

    // Camera view presets
    const viewBtns = document.querySelectorAll<HTMLButtonElement>('[data-view]');
    viewBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        viewBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.dataset.view;

        if (view === 'classic') {
          this.transitionCameraTo(new THREE.Vector3(0, -32, 38), new THREE.Vector3(0, -1, 1));
        } else if (view === 'top') {
          this.transitionCameraTo(new THREE.Vector3(0, 0, 48), new THREE.Vector3(0, 0, 0));
        } else if (view === 'escapement') {
          this.transitionCameraTo(
            new THREE.Vector3(POSITIONS.escape.x - 1, POSITIONS.escape.y - 8, 9),
            new THREE.Vector3(POSITIONS.pallet.x, POSITIONS.pallet.y, 1.4)
          );
        } else if (view === 'balance') {
          this.transitionCameraTo(
            new THREE.Vector3(POSITIONS.balance.x, POSITIONS.balance.y - 10, 12),
            new THREE.Vector3(POSITIONS.balance.x, POSITIONS.balance.y, 2.2)
          );
        } else if (view === 'train') {
          this.transitionCameraTo(new THREE.Vector3(5, -14, 16), new THREE.Vector3(3, -4, 1.2));
        }
      });
    });

    // Close info card button
    document.getElementById('card-close-btn')!.addEventListener('click', () => {
      this.hideInfoCard();
    });

    // Focus part button inside card
    document.getElementById('btn-focus-part')!.addEventListener('click', () => {
      if (this.selectedPartKey) {
        this.focusOnPart(this.selectedPartKey);
      }
    });
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    const now = performance.now();
    const delta = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;
    this.elapsedTime += delta;

    // Update mechanical physics simulation
    this.simulation.update(delta);

    // Smooth camera transition if active
    if (this.isCameraTransitioning) {
      this.camera.position.lerp(this.cameraTargetPos, this.cameraLerpAlpha);
      this.controls.target.lerp(this.controlsTargetPos, this.cameraLerpAlpha);

      if (
        this.camera.position.distanceTo(this.cameraTargetPos) < 0.1 &&
        this.controls.target.distanceTo(this.controlsTargetPos) < 0.1
      ) {
        this.isCameraTransitioning = false;
      }
    }

    this.controls.update();

    // Pulse highlight ring
    if (this.highlightGroup.children.length > 0) {
      const ring = this.highlightGroup.children[0] as THREE.Mesh;
      if (ring && ring.material instanceof THREE.Material) {
        const mat = ring.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.45 + 0.25 * Math.sin(this.elapsedTime * 4);
      }
    }

    this.renderer.render(this.scene, this.camera);
  };
}

// Instantiate application on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  new WatchApp();
});
