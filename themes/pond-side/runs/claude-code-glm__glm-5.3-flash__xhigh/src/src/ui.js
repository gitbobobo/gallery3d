import { state } from './shared.js';

const windLabel = (w) => (w < 0.06 ? '无风' : w < 0.3 ? '微风' : w < 0.62 ? '清风' : '强风');

export function initUI() {
  const tools = document.querySelectorAll('.tool');
  tools.forEach((btn) => {
    btn.addEventListener('click', () => {
      tools.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.tool = btn.dataset.tool;
      document.getElementById('scene').style.cursor = state.tool === 'ripple' ? 'crosshair' : 'crosshair';
    });
  });

  const slider = document.getElementById('wind');
  const label = document.getElementById('windLabel');
  slider.addEventListener('input', () => {
    state.wind = slider.value / 100;
    label.textContent = windLabel(state.wind);
  });
  label.textContent = windLabel(state.wind);

  const rainBtn = document.getElementById('rainBtn');
  rainBtn.addEventListener('click', () => {
    state.rainTarget = state.rainTarget > 0.5 ? 0 : 1;
    rainBtn.classList.toggle('active', state.rainTarget > 0.5);
  });

  const segs = document.querySelectorAll('.seg');
  segs.forEach((btn) => {
    btn.addEventListener('click', () => {
      segs.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.time = btn.dataset.time;
    });
  });

  // 提示文字一段时间后淡去
  setTimeout(() => {
    const hint = document.getElementById('hint');
    if (hint) hint.style.opacity = '0.25';
  }, 12000);
}

export function applyUrlOverrides() {
  const q = new URLSearchParams(location.search);
  const t = q.get('t');
  if (t && ['day', 'dusk', 'night'].includes(t)) {
    state.time = t;
    state.weights = { day: t === 'day' ? 1 : 0, dusk: t === 'dusk' ? 1 : 0, night: t === 'night' ? 1 : 0 };
    document.querySelectorAll('.seg').forEach((b) => b.classList.toggle('active', b.dataset.time === t));
  }
  const w = parseFloat(q.get('wind'));
  if (!isNaN(w)) {
    state.wind = Math.min(1, Math.max(0, w));
    const slider = document.getElementById('wind');
    slider.value = String(Math.round(state.wind * 100));
    document.getElementById('windLabel').textContent = windLabel(state.wind);
  }
  const r = q.get('rain');
  if (r === '1' || r === 'true') {
    state.rainTarget = 1;
    state.rain = 1;
    document.getElementById('rainBtn').classList.add('active');
  }
  return {
    az: parseFloat(q.get('az')),
    el: parseFloat(q.get('el')),
    d: parseFloat(q.get('d'))
  };
}
