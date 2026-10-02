import test from 'node:test';
import assert from 'node:assert/strict';
import { MODULE, STAGES, movementAt, AMPLITUDE } from '../src/mechanics.js';

test('all four mesh distances equal the sum of pitch radii', () => {
  for (let i = 1; i < STAGES.length; i++) {
    const a = STAGES[i - 1], b = STAGES[i];
    assert.ok(Math.abs(Math.hypot(b.x - a.x, b.y - a.y) - MODULE * (a.teeth + b.pinion) / 2) < 1e-10);
  }
});
test('total train ratio is 4800 and adjacent shafts reverse', () => {
  assert.equal(STAGES.at(-1).ratio, 4800);
  for (let i = 1; i < STAGES.length; i++) assert.ok(STAGES[i].ratio * STAGES[i - 1].ratio < 0);
});
test('tooth phases stay meshed at rest and during motion', () => {
  for (const time of [0, 0.01, 0.17, 1, 18, 234]) {
    const { angles } = movementAt(time);
    for (let i = 1; i < STAGES.length; i++) {
      const a = STAGES[i - 1], b = STAGES[i], line = b.direction * Math.PI / 180;
      const phase = a.teeth * (angles[i - 1] - line) + b.pinion * (angles[i] - line - Math.PI);
      assert.ok(Math.abs(Math.sin((phase - Math.PI) / 2)) < 1e-8);
    }
  }
});
test('a minute makes fourth wheel one revolution and escape wheel ten', () => {
  const start = movementAt(0).angles, end = movementAt(60).angles;
  assert.ok(Math.abs((end[3] - start[3]) + 2 * Math.PI) < 1e-10);
  assert.ok(Math.abs((end[4] - start[4]) - 20 * Math.PI) < 1e-10);
});
test('center wheel makes one revolution per hour', () => {
  assert.ok(Math.abs(movementAt(3600).angles[1] - movementAt(0).angles[1] + 2 * Math.PI) < 1e-10);
});
test('balance completes 2.5 cycles each second at 250 degree amplitude', () => {
  assert.ok(Math.abs(movementAt(0.1).balance - AMPLITUDE) < 1e-10);
  assert.ok(Math.abs(movementAt(0.3).balance + AMPLITUDE) < 1e-10);
  assert.ok(Math.abs(movementAt(0.4).balance) < 1e-10);
});
test('escape advances half a tooth each beat and locks between releases', () => {
  assert.ok(Math.abs(movementAt(0.2).angles[4] - movementAt(0).angles[4] - Math.PI / 15) < 1e-10);
  assert.equal(movementAt(0.05).angles[4], movementAt(0.19).angles[4]);
});
