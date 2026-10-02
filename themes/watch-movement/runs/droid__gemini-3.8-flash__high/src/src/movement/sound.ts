/**
 * Procedural mechanical watch audio synthesizer using the Web Audio API.
 * Synthesizes high-frequency metallic escapement clicks (Tick and Tock).
 */
export class WatchSoundSynthesizer {
  private ctx: AudioContext | null = null;
  private enabled = false;
  private masterGain: GainNode | null = null;

  constructor() {
    // AudioContext will be initialized upon user gesture
  }

  public setEnabled(enable: boolean) {
    this.enabled = enable;
    if (this.enabled && !this.ctx) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      } catch (err) {
        console.warn('Web Audio API not supported or blocked:', err);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended' && this.enabled) {
      this.ctx.resume();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public playTick(beat: number) {
    if (!this.enabled || !this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;
    const isTick = beat % 2 === 0;

    // Resonant frequencies for Tick vs Tock
    const baseFreq = isTick ? 3850 : 3420;
    const duration = isTick ? 0.016 : 0.02;

    // 1. High frequency damped oscillator (metallic ring of the jewel and steel tooth)
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, t + duration);

    oscGain.gain.setValueAtTime(0.45, t);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + duration);

    // 2. Highpass noise burst for initial pallet stone impact transient
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.008);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(baseFreq * 1.2, t);
    filter.Q.setValueAtTime(4.0, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.008);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    whiteNoise.start(t);
    whiteNoise.stop(t + 0.008);
  }
}
