var aws = require('aws-sdk')

module.exports = function () {
  var s3 = new aws.S3({signatureVersion: 'v4'})

  this.readAsStream = function (fileKey, bucket) {
    var stream = s3.getObject({
      Bucket: bucket,
      Key: fileKey
    }).createReadStream()
    stream.setEncoding('utf8')

    return stream
  }

  this.writeAsStream = function (fileKey, bucket, stream) {
    return new Promise((resolve, reject) => {
      s3.upload({
        Bucket: bucket,
        Key: fileKey,
        Body: stream,
        ACL: 'private'
      }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}
