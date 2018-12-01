# dat-walk

Recursive directory walker for `dat` archives.

Supports both raw `hyperdrive` instances and Beaker Browser's `DatArchive` API.

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

## License

Apache-2.0
