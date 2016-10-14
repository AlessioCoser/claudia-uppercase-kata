var aws = require('aws-sdk');
var assert = require('assert')

var uppercaseStream = require("../../lib/uppercase_stream")

var Stream = require('stream');


describe('UppercaseStream', function(){
  it('converts stream to uppercase', function(done){

    var stream = new Stream();

    outputStream = uppercaseStream(stream);

    outputStream.on('data', function(chunk) {
      console.log(chunk.toString());
      assert.equal(chunk.toString(), "QUESTA È UNA MIA STRINGA")
      done()
    })

    stream.emit("data", "questa è una mia stringa")
  })
})
