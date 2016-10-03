var test = require('tape');
//import test from 'tape';

test('Failing test', (...assert) => {
  assert[0].equal(1, 2, 'Numbers 1 and 2 are the same');
  assert[0].end();
});

test('Passing test', (assert) => {
  assert.equal(2, 2, 'Numbers 2 and 2 are the same');
  assert.end();
});
