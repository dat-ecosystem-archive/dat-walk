var { join } = require('path')
var box = require('callbox')
var stream = require('async-iterator-to-stream')

module.exports = (dat, root) => {
  var it = walk(dat, root)
  it.stream = opts => stream(it, opts)
  return it
}

async function * walk (dat, root) {
  var queue = [root || '']

  while (queue.length) {
    var path = queue.shift()
    var stats = await stat(dat, path)

    if (stats.isDirectory()) {
      var items = await readdir(dat, path)
      var paths = items.map(item => join(path, item))
      queue.push.apply(queue, paths)
      continue
    }

    yield path
  }
}

function stat (dat, path) {
  var lstat = dat.lstat ? dat.lstat.bind(dat) : dat.stat.bind(dat)
  if (lstat.constructor.name === 'AsyncFunction') {
    return lstat(path)
  }
  return box(done => lstat(path, done))
}

function readdir (dat, path) {
  if (dat.readdir.constructor.name === 'AsyncFunction') {
    return dat.readdir(path)
  }
  return box(done => dat.readdir(path, done))
}
