const HINTS = {
  ripple: '点按水面，激起一圈涟漪',
  stone: '点按水面，扔一颗石子',
  boat: '点按水面，放一只纸船',
  food: '点按水面，撒一把鱼食',
};
const TIMES = ['白昼', '黄昏', '夜'];

function windWord(w) {
  if (w < 0.08) return '无风';
  if (w < 0.38) return '微风';
  if (w < 0.65) return '和风';
  if (w < 0.85) return '劲风';
  return '大风';
}

export function initUI(state, { onTime, onRain }) {
  const toolBtns = [...document.querySelectorAll('[data-tool]')];
  const timeBtns = [...document.querySelectorAll('[data-time]')];
  const wind = document.getElementById('wind');
  const rain = document.getElementById('rain');
  const hint = document.getElementById('hint');
  const mood = document.getElementById('mood');
  let hintTimer = 0;

  const showHint = () => {
    hint.textContent = HINTS[state.tool];
    hint.classList.add('show');
    clearTimeout(hintTimer);
    hintTimer = setTimeout(() => hint.classList.remove('show'), 4200);
  };
  const updateMood = () => {
    mood.textContent = `${windWord(state.wind)}　${state.rain ? '雨' : '晴'}　${TIMES[state.time]}`;
  };

  const setTool = (t) => {
    state.tool = t;
    toolBtns.forEach((b) => b.setAttribute('aria-checked', String(b.dataset.tool === t)));
    showHint();
  };
  const setTime = (i) => {
    state.time = i;
    timeBtns.forEach((b) => b.setAttribute('aria-checked', String(+b.dataset.time === i)));
    onTime(i);
    updateMood();
  };
  const setRain = (on) => {
    state.rain = on;
    rain.setAttribute('aria-pressed', String(on));
    onRain(on);
    updateMood();
  };
  const setWind = (v) => {
    state.wind = Math.min(1, Math.max(0, v));
    wind.value = String(Math.round(state.wind * 100));
    wind.style.setProperty('--fill', `${state.wind * 100}%`);
    updateMood();
  };

  toolBtns.forEach((b) => b.addEventListener('click', () => setTool(b.dataset.tool)));
  timeBtns.forEach((b) => b.addEventListener('click', () => setTime(+b.dataset.time)));
  rain.addEventListener('click', () => setRain(!state.rain));
  wind.addEventListener('input', () => setWind(+wind.value / 100));

  addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement && e.key !== 'r' && e.key !== 't') return;
    const k = e.key.toLowerCase();
    if (k >= '1' && k <= '4') setTool(['ripple', 'stone', 'boat', 'food'][+k - 1]);
    else if (k === 'r') setRain(!state.rain);
    else if (k === 't') setTime((state.time + 1) % 3);
    else if (k === '[') setWind(state.wind - 0.1);
    else if (k === ']') setWind(state.wind + 0.1);
  });

  setWind(state.wind);
  updateMood();
  setTimeout(showHint, 1200);
}
