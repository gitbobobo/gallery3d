import assert from 'node:assert/strict';
import { CHAPTERS, DURATION, storyState, wrapTime } from '../dist/story.js';
import { travellerPositions } from '../dist/art.js';

assert.equal(DURATION, 80);
assert.deepEqual(CHAPTERS.map(c => c.start), [0, 16, 38, 57]);
assert.deepEqual([0, 15.99, 16, 37.99, 38, 56.99, 57, 79.99, 80].map(t => storyState(t).chapter), [0, 0, 1, 1, 2, 2, 3, 3, 0]);
assert.equal(wrapTime(-1), 79);
assert.equal(storyState(160).time, 0);
assert.equal(storyState(0).travellerVisibility, 0);
assert.equal(storyState(73).travellerVisibility, 0);
assert.equal(storyState(74).signature, 1);
assert.equal(storyState(0).signature, 0);
assert.equal(storyState(79.99).birdsVisible, false);
assert.equal(storyState(42).birdsVisible, true);

const heldX = travellerPositions(storyState(40)).last.x;
for (const t of [40, 41, 42, 43, 44, 45, 45.99]) {
  assert.ok(Math.abs(travellerPositions(storyState(t)).last.x - heldX) < 1e-9, `Last traveller moves while stopped at ${t}`);
  assert.equal(storyState(t).lastStopped, true);
}
assert.equal(storyState(52).lastOffset, 0);
assert.ok(travellerPositions(storyState(50)).last.x < heldX);
assert.equal(travellerPositions(storyState(30)).animals.length, 4);
for (let t = 0; t < 160; t += .25) {
  const state = storyState(t);
  assert.ok(state.chapter >= 0 && state.chapter < 4);
  for (const key of ['dawn','closing','route','travellerVisibility','birdFlight','signature']) {
    assert.ok(state[key] >= 0 && state[key] <= 1, `${key} outside range at ${t}`);
  }
  const positions = travellerPositions(state);
  for (let i = 1; i < 4; i++) assert.ok(positions.animals[i].x > positions.animals[i-1].x);
}
for (const key of ['mist','dawn','closing','waterfall']) {
  const a=storyState(79.999), b=storyState(0);
  if (key === 'dawn' || key === 'closing') continue;
  assert.ok(Math.abs(a[key]-b[key]) < .00001, `${key} jumps at loop boundary`);
}
console.log('Story tests passed: four acts, four mules, stationary pause, catch-up and loop continuity.');
