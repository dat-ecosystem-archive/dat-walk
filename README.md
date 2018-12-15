# dat-walk

Recursive directory walker for `dat` archives.

Supports both raw `hyperdrive` instances and Beaker Browser's `DatArchive` API.

## Installation

In [Beaker](https://beakerbrowser.com) or [Webrun](https://github.com/RangerMauve/webrun) you can import the module directly in your code:

```js
import walk from 'dat://brecht.pamphlets.me/lib/dat-walk/v2.1.js'
```

Note that it's advised to always use the `dat` protocol for this. HTTPS might be fine for testing, but I can't guarantee the required reliability and performance for production usage.

If you need `dat-walk` in Node.js, you can get it from NPM:

```sh
npm install dat-walk
```

## Usage

This package exports two modules. The default `require('dat-walk')` works with async iteration, whereas `require('dat-walk/stream')` uses standard Node streams. Both these examples log all file paths of a given `dat` to the console.

```js
// Async iteration
var walk = require('dat-walk')

async function main () {
  var dat = DatArchive.load(key)

  for await (var file of walk(dat)) {
    console.log(file)
  }
  console.log('done!')
}

main()

// Node stream
var hyperdrive = require('hyperdrive')
var walk = require('dat-walk/stream')

var dat = hyperdrive(key)
var stream = walk(dat, 'subdir')

stream.on('data', console.log)
stream.on('end', () => console.log('done!'))
```

## API

### walk(dat [, base])

#### dat

Type: `object` (required)

A `DatArchive`, `hyperdrive`, or `scoped-fs` instance.

#### base

Type: `string`

Subdirectory to start walking from.

### walk(dat [, opts])

#### dat

See above.

#### opts.base

See above.

#### opts.dir

Type: `boolean` (default: `false`)

Determines if `walk` outputs directories as well as files.

## License

Apache-2.0
