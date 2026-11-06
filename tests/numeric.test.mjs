import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
const close = (a, b, tol = 1e-12) =>
  assert.ok(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${a} != ${b}`);
test('rectangular and singleton', () => {
  for (const k of ['rectangular', 'hann', 'hamming', 'blackman']) {
    assert.deepEqual(api.window(k, 1), [1]);
    assert.deepEqual(api.window(k, 1, true), [1]);
  }
  assert.deepEqual(api.window('rectangular', 4), [1, 1, 1, 1]);
});
test('Hann analytic coefficients', () => {
  api.window('hann', 5).forEach((v, i) => close(v, [0, 0.5, 1, 0.5, 0][i]));
});
test('Hamming analytic coefficients', () => {
  api.window('hamming', 3).forEach((v, i) => close(v, [0.08, 1, 0.08][i]));
});
test('Blackman formula and symmetry', () => {
  for (const k of ['hann', 'hamming', 'blackman']) {
    const a = api.window(k, 17);
    a.forEach((v, i) => close(v, a[16 - i]));
  }
  close(api.window('blackman', 3)[1], 1);
  close(api.window('blackman', 3)[0], 0);
});
test('periodic is truncated next symmetric', () => {
  for (const k of ['hann', 'hamming', 'blackman', 'rectangular']) {
    const p = api.window(k, 16, true),
      s = api.window(k, 17);
    p.forEach((v, i) => close(v, s[i]));
  }
});
test('limits and fresh results', () => {
  for (const n of [0, -1, 1.5, NaN, Infinity, 1000001])
    assert.throws(() => api.window('hann', n), RangeError);
  assert.throws(() => api.window('bad', 4), TypeError);
  const a = api.window('hann', 3);
  a[1] = 7;
  assert.equal(api.window('hann', 3)[1], 1);
});
