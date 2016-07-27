const browser = typeof window === 'object';

function noop (next) {
  next();
}

function hrtime () {
  return browser ? performance.now() : new Date().getTime();
}

module.exports = function (func, opts = {}) {
  let running = false;
  let elapsed = 0
  let runs = 0;
  
  const after = opts.after || noop;
  const before = opts.before || noop;
  const time = opts.time || 1000;

  function proceed() {
    running = false;
  }

  function run(next, data) {
    const now = hrtime();
    func(next, data);
    elapsed += hrtime() - now;
    ++runs;
  }

  while (elapsed < time) {
    if (!running) {
      running = true;
      before(run.bind(null, after.bind(null, proceed)));
    }
  }
  
  return Promise.resolve(runs / (time / 1000));
};
