const browser = typeof window === 'object';

function hrtime() {
  return browser ? performance.now() : new Date().getTime();
}

function next(next) {
  next();
}

module.exports = function (func, opts = {}) {
  return new Promise(res => {
    let elapsed = 0
    let runs = 0;

    opts.after = opts.after || next;
    opts.before = opts.before || next;
    opts.time = opts.time || 1000;

    function benchmark() {
      if (elapsed < opts.time) {
        opts.before(run);
      } else {
        res(runs / (opts.time / 1000));
      }
    }

    function proceed() {
      setTimeout(benchmark);
    }

    function run() {
      const now = hrtime();
      func.call(opts, _ => {
        elapsed += hrtime() - now;
        ++runs;
        opts.after.call(opts, proceed);
      });
    }

    benchmark();
  });
};
