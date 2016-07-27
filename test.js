const assert = require('assert');
const bp = require('.');

describe('birdpoo', () => {
  it('should only run the function benchmark for the given time', done => {
    bp(next => next(), { time: 100 }).then(done.bind(null, null));
  });

  it('should call the benchmark function', done => {
    let called;
    bp(next => {
      called = true;
      next();
    }, { time: 100 })
      .then(_ => assert.ok(called))
      .then(done, done);
  });

  it('should pass the operations per second to the promise', done => {
    let called;
    bp(next => next(), { time: 100 })
      .then((...args) => {
        assert.equal(args.length, 1);
        assert.equal(typeof args[0], 'number');
      })
      .then(done, done);
  });

  it('before()', done => {
    let called;
    bp(next => next(), {
      before(next) {
        called = true;
        next();
      },
      time: 100
    })
      .then(() => assert.ok(called))
      .then(done, done);
  });

  it('after()', done => {
    let called;
    bp(next => next(), { 
      after(next) {
        called = true;
        next();
      },
      time: 100 
    })
      .then(() => assert.ok(called))
      .then(done, done);
  });
});
