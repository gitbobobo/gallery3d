export const DURATION = 80;
export const CHAPTERS = [
  { start: 0, end: 16, number: '壹', title: '晨雾', subtitle: '山色初醒，溪声尚远。<br>一缕晨光，慢慢拨开千重雾。' },
  { start: 16, end: 38, number: '贰', title: '行旅', subtitle: '四头驮骡，几声蹄响。<br>行脚的人，沿着溪水走入山中。' },
  { start: 38, end: 57, number: '叁', title: '钟声', subtitle: '古寺钟鸣，惊起一林飞鸟。<br>他驻足望山，又赶上远行的脚步。' },
  { start: 57, end: 80, number: '肆', title: '入山', subtitle: '小径深处，人影渐杳。<br>云烟合拢，溪山仍在。' },
];
export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const smooth = (a, b, x) => {
  const p = clamp((x - a) / (b - a));
  return p * p * (3 - 2 * p);
};
export const wrapTime = (t) => ((t % DURATION) + DURATION) % DURATION;
export function storyState(time) {
  const t = wrapTime(time);
  const chapter = CHAPTERS.findIndex(c => t >= c.start && t < c.end);
  // The opening veil is translucent: the whole composition is visible at once.
  const dawn = 1 - smooth(0, 12, t);
  const closing = smooth(63, 76, t);
  const route = smooth(16, 70, t);
  const travellerVisibility = smooth(16, 19, t) * (1 - smooth(65, 73, t));
  const birdFlight = clamp((t - 39) / 15);
  const birdsVisible = t >= 39 && t < 54;
  let lastOffset = 0;
  if (t >= 40 && t < 46) lastOffset = (route - smooth(16, 70, 40)) * 760;
  else if (t >= 46 && t < 52) {
    const heldDistance = (smooth(16, 70, 46) - smooth(16, 70, 40)) * 760;
    lastOffset = heldDistance * (1 - smooth(46, 52, t));
  }
  return {
    time: t, chapter, dawn, closing, route, travellerVisibility,
    mist: .17 + dawn * .43 + closing * .43,
    waterfall: .22 + smooth(2, 11, t) * (1 - smooth(75, 80, t)) * .78,
    birdsVisible, birdFlight, lastOffset,
    lastStopped: t >= 40 && t < 46,
    signature: smooth(68, 73, t) * (1 - smooth(78, 80, t)),
  };
}
