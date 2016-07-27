# birdpoo

Simple, effective JavaScript benchmarking.

## Installing

```sh
npm install birdpoo
```

## Using

Birdpoo (or BP so we can stop chuckling like 5-year olds), is just a single function that returns a promise with the operations per second. It accepts two arguments:

1. The function that does the benchmarking.
2. Options:
  - `before` - Called before each execution to do any necessary setup and pass information to the benchmark function that it needs to run. The return value is used as the arguments passed to the bencmark function and, if passing arguments, it should be an `array`.
  - `after` - Called after each execution to do any necessary cleanup.
  - `time` - The number of milliseconds to benchmark for.

```js
function before(next) {
  // There is no `data` argument for before().
  // You call `next()` to signal completion of `before()` and to signal the
  // start of the benchmark cycle. The data you pass in is available as `data`
  // in the main benchmark function.
  next({ some: 'data' });
}

function benchmark(next, data) {
  // The `data` argumnent is whatever was passed into `next()` in the
  // `before()` callback.
  //
  // { some: 'data' }
  console.log(data[0]);

  // You call `next()` to signal completion of the benchmark cycle and to call
  // `after()`. The arguments you pass in here are passed to `after()`.
  next({ some: 'data' });
}

function after(next, data) {
  // The `data` argument is whatever was passed into `next()` in the main
  // benchmark function.
  //
  // { some: 'data' }
  console.log(data);

  // You call next to proceed to the next benchmark cycle which may call
  // `before()`. This can be async: `setTimeout(next, 100)`. Any arguments
  // passed to `next()` here are ignored.
  next();
}

const time = 1000;

benchmark(benchmark, {
  after,
  before,
}).then(console.log);
```

The benchmark will probably run over the amount of time specified in the `options` due to the execution time of `before` and `after`, but only the time taken for the benchmark function to run will factor into the result.

That's pretty much it.
