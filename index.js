const browser = typeof window === 'object';

function noop (next) {
  next();
}

function hrtime () {
  return browser ? performance.now() : new Date().getTime();
}

module.exports = function (func, opts = {}) {
  return new Promise(res => {
    let elapsed = 0
    let runs = 0;
    
    const after = opts.after || noop;
    const before = opts.before || noop;
    const time = opts.time || 1000;

    function benchmark() {
      if (elapsed < time) {
        before(run.bind(null, after.bind(null, proceed)));
      } else {
        res(runs / (time / 1000));
      }
    }

    function proceed() {
      setTimeout(benchmark);
    }

    function run(next, data) {
      const now = hrtime();
      func((...args) => {
        elapsed += hrtime() - now;
        ++runs;
        next(...args);
      }, data);
    }

    benchmark();
  });
};
