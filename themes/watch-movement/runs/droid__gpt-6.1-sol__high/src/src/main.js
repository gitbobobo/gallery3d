import './style.css';
import { createMovement } from './scene.js';
import { PARTS } from './mechanics.js';

let movement;
let playing = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let exploded = false;

function selectPart(id) {
  const part = PARTS[id];
  if (!part) return;
  document.querySelectorAll('[data-part]').forEach((button) => {
    const active = button.dataset.part === id;
    button.classList.toggle('selected', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.getElementById('detail-category').textContent = part.category;
  document.getElementById('detail-index').textContent = `${part.index} / 05`;
  document.getElementById('detail-title').textContent = part.title;
  document.getElementById('detail-description').textContent = part.description;
  document.getElementById('metric-label').textContent = part.metric;
  const value = document.getElementById('metric-value');
  value.textContent = part.value;
  const unit = document.createElement('small');
  unit.textContent = part.unit;
  value.append(unit);
  document.getElementById('scene-label-text').textContent = part.title;
  movement?.select(id);
}
function updatePlayButton() {
  document.getElementById('play-pause').setAttribute('aria-label', playing ? '暂停机芯' : '继续机芯');
  document.getElementById('play-pause').setAttribute('aria-pressed', String(!playing));
  document.getElementById('pause-icon').toggleAttribute('hidden', !playing);
  document.getElementById('play-icon').toggleAttribute('hidden', playing);
  document.getElementById('running-label').textContent = playing ? '机芯运转中' : '机芯已暂停';
  document.querySelector('.view-caption').classList.toggle('paused', !playing);
  movement?.setPlaying(playing);
}
document.querySelectorAll('[data-part]').forEach((button) => button.addEventListener('click', () => selectPart(button.dataset.part)));
document.querySelectorAll('[data-speed]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-speed]').forEach((option) => {
      const active = option === button;
      option.classList.toggle('selected', active);
      option.setAttribute('aria-pressed', String(active));
    });
    movement?.setSpeed(Number(button.dataset.speed));
  });
});
document.getElementById('play-pause').addEventListener('click', () => { playing = !playing; updatePlayButton(); });
document.getElementById('explode').addEventListener('click', () => {
  exploded = !exploded;
  document.getElementById('explode').setAttribute('aria-pressed', String(exploded));
  document.querySelector('#explode span').textContent = exploded ? '合拢机芯' : '分层观察';
  movement?.explode(exploded);
});
document.getElementById('reset-view').addEventListener('click', () => movement?.reset());
document.getElementById('top-view').addEventListener('click', () => movement?.top());
const dialog = document.getElementById('principle-dialog');
document.getElementById('principle').addEventListener('click', () => dialog.showModal());
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
} });
document.getElementById('explore').addEventListener('click', () => { movement?.reset(); selectPart('balance'); });
document.querySelector('.brand').addEventListener('click', (event) => { event.preventDefault(); movement?.reset(); });
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && !dialog.open && (event.target === document.body || event.target.id === 'scene')) {
    event.preventDefault(); playing = !playing; updatePlayButton();
  }
});
try {
  movement = createMovement(document.getElementById('scene'), selectPart, () => {
    document.getElementById('loading').hidden = true;
    document.documentElement.dataset.ready = 'true';
  });
  updatePlayButton();
  selectPart('balance');
  // Read-only diagnostics support checking animation, ratios and canvas picking.
  window.movementStudy = { inspect: () => movement.inspect() };
} catch (error) {
  document.getElementById('loading').hidden = true;
  document.getElementById('error').hidden = false;
  console.error('3D initialization failed:', error);
}
window.addEventListener('pagehide', () => movement?.destroy(), { once: true });
