var aws = require('aws-sdk');
var uppercaseStream = require('./lib/uppercase_stream')
var S3FileSystem = require('./lib/s3_filesystem')
var S3EventParser = require('./lib/s3_event_parser')

exports.handler = function (event, context) {
  var convert = function(bucket, fileKey) {
    var s3 = new aws.S3({ signatureVersion: 'v4' });
    var s3FileSystem = new S3FileSystem()
    var newFileKey = fileKey.replace(/^in/, 'out')

    var stream = s3FileSystem.readAsStream(fileKey, bucket)
    var uppercasedStream = uppercaseStream(stream)
    s3FileSystem.writeAsStream(newFileKey, bucket, uppercasedStream, context.done)
  }

  var eventParser = new S3EventParser(event)

  if(eventParser.isValid()) {
    convert( eventParser.getBucket(), eventParser.getFileKey() );
  }else{
    context.fail('must be valid s3 event source');
  }
};
