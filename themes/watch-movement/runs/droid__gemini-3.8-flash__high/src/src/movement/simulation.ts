import * as THREE from 'three';
import { MovementNodes, GEAR_SPECS, POSITIONS } from './movementBuilder';

export type MotionMode = 'ticking' | 'continuous' | 'paused';

export interface SimulationState {
  time: number;
  speed: number;
  mode: MotionMode;
  explodedProgress: number; // 0 (assembled) to 1 (fully exploded)
  bridgeOpacity: number; // 1 (opaque), 0.35 (translucent), 0 (hidden)
  soundEnabled: boolean;
  balanceAngle: number;
  forkAngle: number;
  escapeAngle: number;
  secondsAngle: number;
}

export class MovementSimulation {
  private nodes: MovementNodes;
  public state: SimulationState = {
    time: 0,
    speed: 1.0,
    mode: 'ticking',
    explodedProgress: 0,
    bridgeOpacity: 1.0,
    soundEnabled: false,
    balanceAngle: 0,
    forkAngle: 0,
    escapeAngle: 0,
    secondsAngle: 0,
  };

  // Base parameters
  private readonly frequency = 2.5; // 2.5 Hz = 18,000 vibrations/hour (5 beats/sec)
  private readonly balanceAmplitude = (270 * Math.PI) / 180; // 270 degrees swing
  private readonly forkMaxAngle = (10 * Math.PI) / 180; // +/- 10 degrees

  // Base hairspring points cache for dynamic deformation
  private baseHairspringCoords: { r: number; theta: number; z: number }[] = [];
  private onTickCallback?: (beat: number) => void;
  private lastBeatIndex = -1;

  constructor(nodes: MovementNodes, onTick?: (beat: number) => void) {
    this.nodes = nodes;
    this.onTickCallback = onTick;

    // Cache hairspring polar coordinates
    this.initHairspringCache();

    // Initial tooth meshing phase offsets
    this.nodes.barrelGroup.rotation.z = 0.05;
    this.nodes.centerWheelGroup.rotation.z = Math.PI / GEAR_SPECS.centerPinion.teeth;
    this.nodes.thirdWheelGroup.rotation.z = 0.12;
    this.nodes.fourthWheelGroup.rotation.z = Math.PI / GEAR_SPECS.fourthPinion.teeth;
    this.nodes.escapeWheelGroup.rotation.z = 0.08;
  }

  private initHairspringCache() {
    const geo = this.nodes.hairspringMesh.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const count = pos.length / 3;
    const turns = 12;
    const rMin = 0.58;
    const rMax = 3.65;

    for (let i = 0; i < count; i++) {
      const u = i / (count - 1);
      const theta = u * turns * Math.PI * 2;
      const r = rMin + u * (rMax - rMin);
      const z = pos[i * 3 + 2];
      this.baseHairspringCoords.push({ r, theta, z });
    }
  }

  public update(delta: number) {
    if (this.state.mode === 'paused') {
      this.updateExploded();
      return;
    }

    const effectiveDelta = delta * this.state.speed;
    this.state.time += effectiveDelta;
    const t = this.state.time;

    // 1. Balance wheel oscillation: theta_bal = A * sin(2 * pi * f * t)
    const omega = 2 * Math.PI * this.frequency;
    const balAngle = this.balanceAmplitude * Math.sin(omega * t);
    const balVel = this.balanceAmplitude * omega * Math.cos(omega * t);
    this.state.balanceAngle = balAngle;
    this.nodes.balanceWheelGroup.rotation.z = balAngle;

    // 2. Dynamic breathing of the hairspring
    this.updateHairspring(balAngle);

    // 3. Pallet fork and Escapement stepping
    // Every half oscillation (when balAngle passes 0), a beat occurs
    const beatFraction = (omega * t) / Math.PI; // increases by 1 each half period
    const currentBeat = Math.floor(beatFraction);

    if (currentBeat !== this.lastBeatIndex) {
      this.lastBeatIndex = currentBeat;
      if (this.onTickCallback) {
        this.onTickCallback(currentBeat);
      }
    }

    // Phase within the current half-cycle: [0, 1)
    const phaseInBeat = beatFraction - currentBeat;

    let forkAngle = 0;
    let escapeProgress = 0;

    if (this.state.mode === 'ticking') {
      // The flip occurs rapidly near phase 0 (when balance passes center with max speed)
      // Transition width is about 0.15 of the beat duration
      const flipPhase = Math.min(1.0, phaseInBeat / 0.18);
      // Smooth step from 0 to 1
      const smoothFlip = flipPhase * flipPhase * (3 - 2 * flipPhase);

      const isEvenBeat = currentBeat % 2 === 0;
      if (isEvenBeat) {
        // Flipping from -maxAngle to +maxAngle
        forkAngle = -this.forkMaxAngle + 2 * this.forkMaxAngle * smoothFlip;
      } else {
        // Flipping from +maxAngle to -maxAngle
        forkAngle = this.forkMaxAngle - 2 * this.forkMaxAngle * smoothFlip;
      }

      // Escape wheel:
      // Advances by 1 step (12 degrees = 2 * PI / 30) during the unlocking impulse phase
      // then locks in place until the next beat
      const stepSize = (2 * Math.PI) / 30; // 12 deg
      const stepProgress = Math.min(1.0, phaseInBeat / 0.22);
      const smoothStep = stepProgress * stepProgress * (3 - 2 * stepProgress);

      escapeProgress = (currentBeat + smoothStep) * stepSize;
    } else {
      // Continuous smooth mode
      const isSwingingForward = balVel >= 0;
      forkAngle = isSwingingForward ? this.forkMaxAngle : -this.forkMaxAngle;

      // Continuous escape wheel: 1 rev per 6 seconds
      const escapeSpeed = (2 * Math.PI) / 6; // 60 deg/sec
      escapeProgress = t * escapeSpeed;
    }

    this.state.forkAngle = forkAngle;
    this.state.escapeAngle = escapeProgress;

    // Apply pallet fork rotation around its arbor
    const palletBaseAngle =
      Math.atan2(POSITIONS.balance.y - POSITIONS.pallet.y, POSITIONS.balance.x - POSITIONS.pallet.x) -
      Math.PI / 2;
    this.nodes.palletForkGroup.rotation.z = palletBaseAngle + forkAngle;

    // Apply escape wheel rotation
    this.nodes.escapeWheelGroup.rotation.z = escapeProgress;

    // 4. Exact Gear Train transmission ratios
    // Escape wheel (7T pinion) driven by Fourth wheel (70T) -> ratio 10:1
    const fourthAngle = -escapeProgress / 10;
    this.nodes.fourthWheelGroup.rotation.z = fourthAngle;
    this.state.secondsAngle = fourthAngle;

    // Fourth wheel (8T pinion) driven by Third wheel (60T) -> ratio 7.5:1
    const thirdAngle = -fourthAngle / 7.5;
    this.nodes.thirdWheelGroup.rotation.z = thirdAngle;

    // Third wheel (8T pinion) driven by Center wheel (64T) -> ratio 8:1
    const centerAngle = -thirdAngle / 8;
    this.nodes.centerWheelGroup.rotation.z = centerAngle;

    // Center wheel (12T pinion) driven by Mainspring barrel (72T) -> ratio 6:1
    const barrelAngle = -centerAngle / 6;
    this.nodes.barrelGroup.rotation.z = barrelAngle;

    // Exploded view
    this.updateExploded();
  }

  /**
   * Deforms the hairspring geometry according to the balance wheel rotation.
   */
  private updateHairspring(balAngle: number) {
    const geo = this.nodes.hairspringMesh.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const count = this.baseHairspringCoords.length;

    for (let i = 0; i < count; i++) {
      const { r: baseR, theta: baseTheta, z } = this.baseHairspringCoords[i];
      const u = i / (count - 1);

      // Inner end (u=0) rotates by balAngle, outer end (u=1) is fixed to stud
      const deltaTheta = balAngle * (1 - u);
      const theta = baseTheta + deltaTheta;

      // Elastic breathing contraction/expansion:
      // When wound tighter (positive angle), coils contract inward slightly
      const rFactor = 1 - 0.07 * (balAngle / this.balanceAmplitude) * (1 - u);
      const r = baseR * rFactor;

      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.sin(theta) * r;
      pos[i * 3 + 2] = z;
    }

    geo.attributes.position.needsUpdate = true;
  }

  /**
   * Applies the exploded view elevation offset along the Z-axis.
   */
  private updateExploded() {
    const p = this.state.explodedProgress;
    for (const item of this.nodes.allExplodeObjects) {
      item.object.position.z = item.originalZ + item.explodeDist * p;
    }
  }

  /**
   * Adjusts the bridge opacity (opaque, translucent, or hidden).
   */
  public setBridgeOpacity(opacity: number) {
    this.state.bridgeOpacity = opacity;
    this.nodes.bridgesGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => {
            m.transparent = opacity < 0.99;
            m.opacity = opacity;
            m.depthWrite = opacity > 0.8;
            m.visible = opacity > 0.02;
            m.needsUpdate = true;
          });
        } else if (child.material) {
          child.material.transparent = opacity < 0.99;
          child.material.opacity = opacity;
          child.material.depthWrite = opacity > 0.8;
          child.material.visible = opacity > 0.02;
          child.material.needsUpdate = true;
        }
      }
    });
  }
}
