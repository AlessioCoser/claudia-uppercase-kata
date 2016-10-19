var FileSystem = require('./lib/s3_filesystem')
var EventParser = require('./lib/s3_event_parser')
var uppercaseStream = require('./lib/uppercase_stream')
var convertionService = require('./lib/convertion_service')

exports.handler = function (event, context) {
  convertionService(new EventParser(event), new FileSystem(), uppercaseStream, function(err, data) {
    if(err) {
      context.fail(err)
    }else {
      context.done(data)
    }
  })
}
