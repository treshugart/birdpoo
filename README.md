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
  // `this` refers to the passed in options so this persists throughout the
  // benchmark's lifeyccle.
  this.data = { some: 'data' };

  // You call next to proceed to the benchmark() function. This can be async.
  next();
}

function benchmark(next) {
  // The options are accessible in any function. Logs: `{ some: 'data' }`.
  console.log(this.data);

  // You call next to proceed to the after() function. This can be async.
  next({ some: 'data' });
}

function after(next) {
  // The options are accessible in any function. Logs: `{ some: 'data' }`.
  console.log(this.data);

  // You call next to proceed to signify completion and to star the next cycle.
  next();
}

const time = 1000;

benchmark(benchmark, { after, before, time }).then(console.log);
```

The benchmark will probably run over the amount of time specified in the `options` due to the execution time of `before` and `after`, but only the time taken for the benchmark function to run will factor into the result.

That's pretty much it.
