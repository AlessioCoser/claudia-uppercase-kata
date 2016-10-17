var aws = require('aws-sdk');
var uppercaseStream = require('./lib/uppercase_stream')
var S3FileSystem = require('./lib/s3_filesystem')

exports.handler = function (event, context) {
  var convert = function(bucket, fileKey) {
    var s3 = new aws.S3({ signatureVersion: 'v4' });
    var s3FileSystem = new S3FileSystem()
    var newFileKey = fileKey.replace(/^in/, 'out')

    var stream = s3FileSystem.readAsStream(fileKey, bucket)
    var uppercasedStream = uppercaseStream(stream)
    s3FileSystem.writeAsStream(newFileKey, bucket, uppercasedStream, context.done)
  },
  eventRecord = event.Records && event.Records[0];

  if (eventRecord) {
    if (eventRecord.eventSource === 'aws:s3' && eventRecord.s3) {
      convert(
        eventRecord.s3.bucket.name,
        eventRecord.s3.object.key
      );
    } else {
      context.fail('unsupported event source');
    }
  } else {
    context.fail('no records in the event');
  }
};
