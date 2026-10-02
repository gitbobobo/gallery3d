import { OSC_HZ, TEETH } from './layout.js';

export const BALANCE_AMP = (215 * Math.PI) / 180;

function smoothstep(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

export function sampleMotion(t, speed, forkAmp) {
  const ts = t * speed;
  const arg = 2 * Math.PI * OSC_HZ * ts - Math.PI / 2;
  const balance = BALANCE_AMP * Math.sin(arg);
  const beatPos = arg / Math.PI;
  const beatIndex = Math.floor(beatPos);
  const frac = beatPos - beatIndex;
  const parity = ((beatIndex % 2) + 2) % 2;
  const u = smoothstep(0.02, 0.14, frac);
  const fork = parity === 0 ? -forkAmp + 2 * forkAmp * u : forkAmp - 2 * forkAmp * u;
  const adv = smoothstep(0.04, 0.16, frac);
  const escapeSpin = (beatIndex + adv) * ((Math.PI * 2) / TEETH.escape);
  return { balance, fork, escapeSpin };
}

export function trainAngles(escapeSpin, phase) {
  const escape = phase.escape + escapeSpin;
  const fourth = phase.fourth - escapeSpin * (TEETH.escapePinion / TEETH.fourth);
  const third = phase.third - (fourth - phase.fourth) * (TEETH.fourthPinion / TEETH.third);
  const center = phase.center - (third - phase.third) * (TEETH.thirdPinion / TEETH.center);
  const barrel = phase.barrel - (center - phase.center) * (TEETH.centerPinion / TEETH.barrel);
  return { barrel, center, third, fourth, escape };
}
