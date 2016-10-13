var aws = require('aws-sdk');
var uppercaseStream = require('./lib/uppercase_stream').uppercaseStream

exports.handler = function (event, context) {
  var convert = function(bucket, fileKey) {
    var s3 = new aws.S3({ signatureVersion: 'v4' });

    var readAsStream = function(bucket, fileKey){
      var stream = s3.getObject({
        Bucket: bucket,
        Key: fileKey
      }).createReadStream();
      stream.setEncoding('utf8');

      return stream;
    }

    var stream = readAsStream(bucket, fileKey)
    var uppercasedStream = uppercaseStream(stream)

    s3.upload({
      Bucket: bucket,
      Key: fileKey.replace(/^in/, 'out'),
      Body: uppercasedStream,
      ACL: 'private'
    }, context.done);
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
