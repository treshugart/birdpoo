# birdpoo

Simple, effective JavaScript benchmarking.

## Installing

```sh
npm install birdpoo
```

## Using

Birdpoo (or BP so we can stop chuckling like 5-year olds), is just a single function that returns a promise with the operations per second. It accpets two arguments:

1. The function that does the benchmarking.
2. Options:
  - `after` - Called after each execution.
  - `before` - Called before each execution. The return value is used as the arguments passed to the bencmark function.
  - `time` - The number of milliseconds to benchmark for.

```js
benchmark(arr => arr.indexOf(1), {
  before: () => [[0, 1, 2]]
}).then(opsPerSec => console.log(opsPerSec));
```

That's pretty much it.
