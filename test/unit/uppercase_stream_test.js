var Stream = require('stream')
var assert = require('assert')
var uppercaseStream = require('../../lib/uppercase_stream')

describe('UppercaseStream', function () {
  it('converts stream to uppercase', function (done) {
    var stream = new Stream()

    uppercaseStream(stream)
    .on('data', function (chunk) {
      assert.equal(chunk.toString(), 'QUESTA È UNA MIA STRINGA')
      done()
    })

    stream.emit('data', 'questa è una mia stringa')
  })
})
