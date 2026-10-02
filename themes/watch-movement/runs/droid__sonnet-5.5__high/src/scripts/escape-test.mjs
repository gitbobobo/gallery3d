import { Escapement, DEG, PITCH, forkAngleUnclamped, FORK_MAX } from '../src/escapement.js';

const e = new Escapement();
const dt = 1 / 960;
const T = 0.25;
let lastBeat = 0;
const beats = [];
let pAtBeatStart = e.p;
let overlap = 0;
let maxBack = 0;
let prevP = e.p;
const log = [];
for (let i = 0; i < 960 * 2; i++) {
  e.step(dt);
  if (e.blocked(e.p)) overlap++;
  maxBack = Math.max(maxBack, prevP - e.p);
  prevP = e.p;
  if (i % 8 === 0) log.push([e.t.toFixed(4), (e.beta / DEG).toFixed(1), (e.fork / DEG).toFixed(2), (e.p / DEG).toFixed(3)]);
  const beat = Math.floor((e.t + T / 2 + 1e-9) / (T / 2));
  if (beat !== lastBeat) {
    beats.push(((e.p - pAtBeatStart) / DEG).toFixed(2));
    pAtBeatStart = e.p;
    lastBeat = beat;
  }
}
console.log('unclamped fork @ beta=±11°', (forkAngleUnclamped(11 * DEG) / DEG).toFixed(2), 'max', (FORK_MAX / DEG).toFixed(2));
console.log('advance per half period (deg):', beats.join(' '));
console.log('final p (deg)', (e.p / DEG).toFixed(3), 'expected', (16 * 12).toFixed(1), 'overlap frames', overlap, 'max backward step (deg)', (maxBack / DEG).toFixed(4), 'recoil total', (e.recoilTotal / DEG).toFixed(3));
if (process.argv[2] === 'log') for (const l of log.slice(0, 80)) console.log(l.join('\t'));
