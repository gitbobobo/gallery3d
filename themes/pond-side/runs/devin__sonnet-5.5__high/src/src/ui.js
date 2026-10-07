const ICONS = {
  ripple: '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="3" /><circle cx="16" cy="16" r="8" opacity=".7"/><circle cx="16" cy="16" r="13" opacity=".4"/></svg>',
  stone: '<svg viewBox="0 0 32 32"><path d="M6 20c-1-5 3-11 9-12 6-1 11 2 11 8 0 5-4 9-10 9-6 1-9-1-10-5z"/><path d="M12 13c2-1 4-1 6 0" opacity=".6"/></svg>',
  boat: '<svg viewBox="0 0 32 32"><path d="M4 20h24l-4 6H8z"/><path d="M16 5l8 13H8z" opacity=".85"/><path d="M16 5v13" opacity=".5"/></svg>',
  food: '<svg viewBox="0 0 32 32"><circle cx="10" cy="19" r="3.2"/><circle cx="20" cy="12" r="3.2"/><circle cx="22" cy="22" r="3.2"/><path d="M4 28c4 1.5 8 1.5 12 0" opacity=".45"/></svg>',
  sun: '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="5.5"/><path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M7.5 24.5l2.8-2.8M21.7 10.3l2.8-2.8"/></svg>',
  dusk: '<svg viewBox="0 0 32 32"><path d="M7 21a9 9 0 0 1 18 0"/><path d="M3 21h26M8 26h16M16 7v3M6.5 11.5l2 2M25.5 11.5l-2 2"/></svg>',
  moon: '<svg viewBox="0 0 32 32"><path d="M22 5a11 11 0 1 0 5 19A12 12 0 0 1 22 5z"/></svg>',
  rain: '<svg viewBox="0 0 32 32"><path d="M9 18a6 6 0 0 1 1-11.9A7 7 0 0 1 23.5 9 5 5 0 0 1 23 18z"/><path d="M11 22l-1.5 4M17 22l-1.5 4M23 22l-1.5 4"/></svg>',
  wind: '<svg viewBox="0 0 32 32"><path d="M4 12h15a3.5 3.5 0 1 0-3.5-3.5M4 19h21a3.5 3.5 0 1 1-3.5 3.5M4 25.5h9"/></svg>',
};

export function buildUI(root, api) {
  const tools = [['ripple', '点水'], ['stone', '石子'], ['boat', '纸船'], ['food', '鱼食']];
  const times = [['day', 'sun', '白天'], ['dusk', 'dusk', '黄昏'], ['night', 'moon', '夜晚']];
  root.innerHTML = `
    <div class="title"><span>池塘一角</span></div>
    <div class="toast" id="toast"></div>
    <section class="dock" id="dock" aria-label="控制面板">
      <button class="fold" id="fold" aria-label="收起或展开面板" aria-expanded="true"><i></i></button>
      <div class="body">
        <div class="row tools" role="radiogroup" aria-label="道具">
          ${tools.map(([k, n], i) => `<button class="tool${i ? '' : ' on'}" data-tool="${k}" role="radio" aria-checked="${i ? 'false' : 'true'}" title="${n}（${i + 1}）">${ICONS[k]}<b>${n}</b></button>`).join('')}
        </div>
        <div class="row env">
          <div class="seg" role="radiogroup" aria-label="时间">
            ${times.map(([k, ic, n], i) => `<button class="t${i ? '' : ' on'}" data-time="${k}" role="radio" aria-checked="${i ? 'false' : 'true'}">${ICONS[ic]}<b>${n}</b></button>`).join('')}
          </div>
          <button class="rain" id="rain" role="switch" aria-checked="false">${ICONS.rain}<b>下雨</b><i class="sw"></i></button>
        </div>
        <label class="row wind">${ICONS.wind}<b>风力</b><input id="wind" type="range" min="0" max="1" step="0.01" value="0.3" aria-label="风力"><output id="windv">微风</output></label>
      </div>
    </section>`;
  const $ = (s) => root.querySelector(s);
  const toolBtns = [...root.querySelectorAll('[data-tool]')];
  const timeBtns = [...root.querySelectorAll('[data-time]')];
  const setTool = (k) => {
    toolBtns.forEach(b => { const on = b.dataset.tool === k; b.classList.toggle('on', on); b.setAttribute('aria-checked', on); });
    api.onTool(k);
  };
  toolBtns.forEach(b => b.addEventListener('click', () => setTool(b.dataset.tool)));
  timeBtns.forEach(b => b.addEventListener('click', () => {
    timeBtns.forEach(o => { const on = o === b; o.classList.toggle('on', on); o.setAttribute('aria-checked', on); });
    api.onTime(b.dataset.time);
  }));
  const rain = $('#rain');
  const setRain = (on) => { rain.classList.toggle('on', on); rain.setAttribute('aria-checked', on); api.onRain(on); };
  rain.addEventListener('click', () => setRain(!rain.classList.contains('on')));
  const wind = $('#wind'), windv = $('#windv');
  const label = (v) => v < 0.08 ? '无风' : v < 0.3 ? '微风' : v < 0.55 ? '清风' : v < 0.8 ? '大风' : '狂风';
  const upd = () => { const v = +wind.value; windv.textContent = label(v); wind.style.setProperty('--p', (v * 100) + '%'); api.onWind(v); };
  wind.addEventListener('input', upd); upd();
  const dock = $('#dock');
  $('#fold').addEventListener('click', () => { const c = dock.classList.toggle('folded'); $('#fold').setAttribute('aria-expanded', !c); });
  const toast = $('#toast');
  let tt = 0;
  const say = (msg, ms = 2200) => { toast.textContent = msg; toast.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('show'), ms); };
  say('轻点水面，激起一圈涟漪', 6000);
  root.addEventListener('pointerdown', (e) => e.stopPropagation());
  return { setTool, setRain, say, toolBtns, timeBtns, rain };
}
