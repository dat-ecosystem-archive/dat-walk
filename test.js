/* global DatArchive */

var Fs = require('./node_modules/scoped-fs')
var fs = require('fs')
var test = require('./node_modules/tape')

test('callbacks & stream', t => {
  var walk = require('./stream')

  var scope = new Fs('./')
  var walker = walk(scope, 'node_modules')

  walker.on('data', file => {
    var stats = fs.lstatSync(file)
    t.notOk(stats.isDirectory(), file)
  })

  walker.on('end', () => {
    t.end()
  })
})

test('async/await & iterator', async t => {
  var walk = require('./')

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
