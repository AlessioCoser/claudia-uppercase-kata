var aws = require('aws-sdk');

module.exports = function s3FileSystem(){
  var s3 = new aws.S3({ signatureVersion: 'v4' });

  this.readAsStream = function(fileKey, bucket){
    var stream = s3.getObject({
      Bucket: bucket,
      Key: fileKey
    }).createReadStream();
    stream.setEncoding('utf8');

    return stream;
  }
}
