const assert = require('assert');
const bp = require('.');

function sleep(ms) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > ms) {
      break;
    }
  }
}

function work(cb, data) {
  sleep(100);
  cb(data);
}

describe('birdpoo', () => {
  it('should only run the function benchmark for the given time', done => {
    bp(next => work(next), { time: 100 }).then(done.bind(null, null));
  });

  it('should call the benchmark function', done => {
    let called;
    bp(next => {
      called = true;
      work(next);
    }, { time: 1 })
      .then(_ => assert.ok(called))
      .then(done.bind(null, null));
  });

  it('should pass the operations per second to the promise', done => {
    let called;
    bp(next => work(next), { time: 1 })
      .then((...args) => {
        assert.equal(args.length, 1);
        assert.equal(typeof args[0], 'number');
      })
      .then(done.bind(null, null));
  });

  describe('before()', () => {
    it('should be called', done => {
      let called;
      bp(next => work(next), {
        before(next) {
          called = true;
          next();
        },
        time: 1
      })
        .then(() => assert.ok(called))
        .then(done.bind(null, null));
    });

    it('should pass args to benchmark function', done => {
      let obj = {};
      let passed;
      bp((next, data) => {
        passed = data;
        work(next);
      }, {
        before: next => next(obj),
        time: 1
      })
        .then(() => assert.equal(passed, obj))
        .then(done.bind(null, null));
    });
  });

  describe('after()', () => {
    it('should be called', done => {
      let called;
      bp(next => work(next), { 
        after(next) {
          called = true;
          next();
        },
        time: 1
      })
        .then(() => assert.ok(called))
        .then(done.bind(null, null));
    });

    it('should be passed args from the benchmark function', done => {
      let obj = {};
      let passed;
      bp(next => work(next, obj), {
        after: (next, data) => {
          passed = data;
          next();
        },
        time: 1
      })
        .then(() => assert.equal(passed, obj))
        .then(done.bind(null, null));
    });
  });

  it('async', done => {
    bp(next => setTimeout(work.bind(null, next), 1), {
      after: next => setTimeout(next, 1),
      before: next => setTimeout(next, 1),
      time: 1
    }).then(done.bind(null, null));
  });
});
