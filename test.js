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
    bp(next => work(next), { time: 100 })
      .then(done.bind(null, null))
      .catch(done);
  });

  it('should call the benchmark function', done => {
    let called;
    bp(next => {
      called = true;
      work(next);
    }, { time: 1 })
      .then(_ => assert.ok(called))
      .then(done.bind(null, null))
      .catch(done);
  });

  it('should pass the operations per second to the promise', done => {
    let called;
    bp(next => work(next), { time: 1 })
      .then((...args) => {
        assert.equal(args.length, 1);
        assert.equal(typeof args[0], 'number');
      })
      .then(done.bind(null, null))
      .catch(done);
  });

  it('before()', done => {
    let called;
    const opts = {
      before(next) {
        called = true;
        assert.equal(this, opts);
        next();
      },
      time: 1
    };
    bp(next => work(next), opts)
      .then(() => assert.ok(called))
      .then(done.bind(null, null))
      .catch(done);
  });

  it('after()', done => {
    let called;
    const opts = { 
      after(next) {
        called = true;
        assert.equal(this, opts);
        next();
      },
      time: 1
    };
    bp(next => work(next), opts)
      .then(() => assert.ok(called))
      .then(done.bind(null, null))
      .catch(done);
  });

  it('async', done => {
    bp(next => setTimeout(work.bind(null, next), 1), {
      after: next => setTimeout(next, 1),
      before: next => setTimeout(next, 1),
      time: 1
    })
      .then(done.bind(null, null))
      .catch(done);
  });
});
