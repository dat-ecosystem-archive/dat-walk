var stream = require('async-iterator-to-stream')
var walk = require('./')

module.exports = function (dat, opts) {
  var it = walk(dat, opts)
  return stream(it)
}
