const browser = typeof window === 'object';

function noop () {
  // poop
}

function hrtime () {
  return browser ? performance.now() : new Date().getTime();
}

module.exports = function (func, opts = {}) {
  let elapsed = 0
  let runs = 0;
  
  const after = opts.after || noop;
  const before = opts.before || noop;
  const time = opts.time || 1000;
  
  while (elapsed < time) {
    const arg = before() || [];
    const now = hrtime();
    func.apply(null, arg);
    elapsed += hrtime() - now;
    after();
    ++runs;
  }
  
  return Promise.resolve(runs / (time / 1000));
};
