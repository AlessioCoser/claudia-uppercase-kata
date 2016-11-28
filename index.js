var FileSystem = require('./lib/s3_filesystem')
var Event = require('./lib/s3_event_adapter')
var uppercaseStream = require('./lib/uppercase_stream')
var convertionService = require('./lib/convertion_service')

exports.handler = function (event, context) {
  convertionService(new Event(event), new FileSystem(), uppercaseStream)
  .then(context.done)
  .catch(context.fail)
}
