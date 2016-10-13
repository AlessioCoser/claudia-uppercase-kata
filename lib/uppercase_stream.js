module.exports.uppercaseStream = function(inputStream) {
  var Transform = require('stream').Transform
  var uppercase = new Transform({decodeStrings: false})

  uppercase._transform = function (chunk, encoding, done) {
    done(null, chunk.toUpperCase());
  };

  inputStream.pipe(uppercase);

  return uppercase;
}
