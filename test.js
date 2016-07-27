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
    }, { time: 1 })
      .then(_ => assert.ok(called))
      .then(done, done);
  });

  it('should pass the operations per second to the promise', done => {
    let called;
    bp(next => next(), { time: 1 })
      .then((...args) => {
        assert.equal(args.length, 1);
        assert.equal(typeof args[0], 'number');
      })
      .then(done, done);
  });

  describe('before()', () => {
    it('should be called', done => {
      let called;
      bp(next => next(), {
        before(next) {
          called = true;
          next();
        },
        time: 1
      })
        .then(() => assert.ok(called))
        .then(done, done);
    });

    it('should pass args to benchmark function', done => {
      let obj = {};
      let passed;
      bp((next, data) => {
        passed = data;
        next();
      }, {
        before: next => next(obj),
        time: 1
      })
        .then(() => assert.equal(passed, obj))
        .then(done, done);
    });
  });

  describe('after()', () => {
    it('should be called', done => {
      let called;
      bp(next => next(), { 
        after(next) {
          called = true;
          next();
        },
        time: 1
      })
        .then(() => assert.ok(called))
        .then(done, done);
    });

    it('should be passed args from the benchmark function', done => {
      let obj = {};
      let passed;
      bp(next => next(obj), {
        after: (next, data) => {
          passed = data;
          next();
        },
        time: 1
      })
        .then(() => assert.equal(passed, obj))
        .then(done, done);
    });
  });
});
