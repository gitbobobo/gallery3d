import { CHAPTERS, DURATION, storyState } from './story.js';
import { createArtwork, renderArtwork } from './art.js';

const $ = id => document.getElementById(id);
const canvas = $('landscape');
const ctx = canvas.getContext('2d', { alpha: false });
const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
let reduced = reducedQuery.matches;
let paused = false;
let time = 0;
let previousFrame = performance.now();
let lastPaint = 0;
let currentChapter = -1;
let subtitleTimer;
let soundOn = false;
let audio;
let lastBellCycle = -1;
const layers = createArtwork();

// The first complete picture is painted synchronously, before any animation.
renderArtwork(ctx, layers, storyState(0), { reduced });

function setChapter(index, immediate = false) {
  if (index === currentChapter) return;
  currentChapter = index;
  const chapter = CHAPTERS[index];
  clearTimeout(subtitleTimer);
  const write = () => {
    $('chapter-number').textContent = chapter.number;
    $('chapter-title').textContent = chapter.title;
    $('subtitle').innerHTML = chapter.subtitle;
    $('subtitle').style.opacity = '1';
  };
  if (immediate || reduced) write();
  else {
    $('subtitle').style.opacity = '0';
    subtitleTimer = setTimeout(write, 300);
  }
  document.querySelectorAll('.chapter').forEach((button, i) => {
    button.classList.toggle('active', i === index);
    if (i === index) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
}

function update(frameTime) {
  const delta = Math.min((frameTime - previousFrame) / 1000, .1);
  previousFrame = frameTime;
  if (!paused && !document.hidden) time += delta;
  if (frameTime - lastPaint >= (reduced ? 100 : 32)) {
    const state = storyState(time);
    renderArtwork(ctx, layers, state, { reduced });
    setChapter(state.chapter);
    $('progress').style.width = `${state.time / DURATION * 100}%`;
    $('signature').style.opacity = state.signature;
    const cycle = Math.floor(time / DURATION);
    if (soundOn && !paused && state.time >= 38 && state.time < 39 && cycle !== lastBellCycle) {
      ringBell();
      lastBellCycle = cycle;
    }
    lastPaint = frameTime;
  }
  requestAnimationFrame(update);
}
setChapter(0, true);
requestAnimationFrame(update);

function togglePause() {
  paused = !paused;
  $('play').setAttribute('aria-pressed', String(paused));
  $('play').setAttribute('aria-label', paused ? '继续故事' : '暂停故事');
  $('play-label').textContent = paused ? '继续' : '暂停';
  $('play-icon').setAttribute('d', paused ? 'M8 5v14l10-7-10-7Z' : 'M8 5v14M16 5v14');
  $('paused-mark').hidden = !paused;
  $('play-status').textContent = paused ? '静观山水' : '故事自动循环';
  setAudioLevel();
}
$('play').addEventListener('click', togglePause);
document.querySelectorAll('.chapter').forEach(button => {
  button.addEventListener('click', () => {
    time = Math.floor(time / DURATION) * DURATION + CHAPTERS[Number(button.dataset.chapter)].start;
    lastBellCycle = -1;
    setChapter(Number(button.dataset.chapter), true);
    renderArtwork(ctx, layers, storyState(time), { reduced });
    $('signature').style.opacity = storyState(time).signature;
  });
});
document.addEventListener('keydown', event => {
  if (event.code === 'Space' && !['BUTTON', 'A', 'INPUT'].includes(event.target.tagName)) {
    event.preventDefault();
    togglePause();
  }
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = (currentChapter + direction + CHAPTERS.length) % CHAPTERS.length;
    document.querySelector(`[data-chapter="${next}"]`).click();
  }
});
reducedQuery.addEventListener('change', event => { reduced = event.matches; });

// Optional sound is synthesized locally. Autoplay remains silent, so browsers
// never block the story or require a gesture to see any part of the painting.
function createAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = 0;
  master.connect(context.destination);
  const buffer = context.createBuffer(1, context.sampleRate * 4, context.sampleRate);
  const data = buffer.getChannelData(0);
  let low = 0;
  for (let i = 0; i < data.length; i++) {
    low = low * .96 + (Math.random() * 2 - 1) * .04;
    data[i] = low * 2;
  }
  const stream = context.createBufferSource(); stream.buffer = buffer; stream.loop = true;
  const filter = context.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 1700;
  const creekGain = context.createGain(); creekGain.gain.value = .27;
  stream.connect(filter); filter.connect(creekGain); creekGain.connect(master); stream.start();
  return { context, master };
}
function setAudioLevel() {
  if (!audio) return;
  audio.master.gain.setTargetAtTime(soundOn && !paused && !document.hidden ? .48 : 0, audio.context.currentTime, .25);
}
function ringBell() {
  if (!audio) return;
  const { context, master } = audio;
  [196, 392.8, 529, 803, 1098].forEach((frequency, index) => {
    const osc = context.createOscillator(), gain = context.createGain();
    osc.type = 'sine'; osc.frequency.value = frequency;
    const now = context.currentTime;
    gain.gain.setValueAtTime(0, now); gain.gain.linearRampToValueAtTime(.22 / (index + 1), now + .018);
    gain.gain.exponentialRampToValueAtTime(.0001, now + 7 + (4 - index) * .6);
    osc.connect(gain); gain.connect(master); osc.start(now); osc.stop(now + 10);
  });
}
$('sound').addEventListener('click', async () => {
  try {
    if (!audio) audio = createAudio();
    if (!audio) {
      $('sound-label').textContent = '声音不可用';
      return;
    }
    await audio.context.resume();
    soundOn = !soundOn;
    document.body.classList.toggle('sound-on', soundOn);
    $('sound').setAttribute('aria-pressed', String(soundOn));
    $('sound').setAttribute('aria-label', soundOn ? '关闭山水声音' : '开启山水声音');
    $('sound-label').textContent = soundOn ? '声音开' : '声音关';
    setAudioLevel();
    if (soundOn && currentChapter === 2 && !paused) {
      ringBell(); lastBellCycle = Math.floor(time / DURATION);
    }
  } catch {
    $('sound-label').textContent = '声音不可用';
  }
});
document.addEventListener('visibilitychange', () => {
  previousFrame = performance.now();
  setAudioLevel();
});

// Read-only status aids checking the four acts without altering playback.
Object.defineProperty(window, 'paintingStory', {
  get: () => ({ ...storyState(time), paused, soundOn, reduced, cycle: Math.floor(time / DURATION), elapsed: time, duration: DURATION }),
});
