const assert = require('assert');
const bp = require('.');

describe('birdpoo', () => {
  it('should only run the function benchmark for the given time', done => {
    bp(() => {}, { time: 100 })
      .then(done.bind(null, null));
  });

  it('should produce a number', done => {
    bp(() => [0, 1, 2].indexOf(1), { time: 100 })
      .then(res => assert.equal(typeof res, 'number'))
      .then(done, done);
  });

  it('before(), return value is first argument to benchmark function', done => {
    let arr = [0, 1, 2];
    let val;
    bp((...args) => val = args, { before: () => arr, time: 100 })
      .then(() => {
        assert.equal(val.length, 1);
        assert.equal(val[0], arr);
      })
      .then(done, done);
  });

  it('after()', done => {
    let called = 0;
    bp(() => {}, { after: () => ++called, time: 100 })
      .then(() => assert.ok(called > 0))
      .then(done, done);
  });
});
