/* global DatArchive */

var Fs = require('./node_modules/scoped-fs')
var fs = require('fs')
var test = require('./node_modules/tape')
var walk = require('./')

test('callbacks', async t => {
  var scope = new Fs('./')
  var walker = walk(scope, 'node_modules')

  for await (var file of walker) {
    var stats = await fs.promises.lstat(file)
    t.notOk(stats.isDirectory(), file)
  }
  t.end()
})

test('async/await', async t => {
  var dat = await DatArchive.create()
  var files = ['one.md', 'two.md', 'three.md']
  var file

  for await (file of files) {
    await dat.writeFile(file, '')
  }

  for await (file of walk(dat)) {
    t.ok(file === 'dat.json' || files.includes(file), file)
  }
  t.end()
  window.close()
})
