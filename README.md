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
  - `before` - Called before each execution to set do any necessary setup and to pass any information to the benchmark function that it needs to run. The return value is used as the arguments passed to the bencmark function and should be an `array`, if returning.
  - `after` - Called after each execution to do any necessary cleanup.
  - `time` - The number of milliseconds to benchmark for.

```js
benchmark(arr => arr.indexOf(1), {
  before: () => [[0, 1, 2]]
}).then(opsPerSec => console.log(opsPerSec));
```

The benchmark will probably run over the amount of time specified in the `options` due to the execution time of `before` and `after`, but only the time taken for the benchmark function to run will factor into the result.

That's pretty much it.
