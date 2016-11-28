var aws = require('aws-sdk')

module.exports = function () {
  var s3 = new aws.S3({signatureVersion: 'v4'})

  this.readAsStream = function (folder, fileName) {
    var stream = s3.getObject({
      Bucket: folder,
      Key: fileName
    }).createReadStream()
    stream.setEncoding('utf8')

    return stream
  }

  this.writeAsStream = function (folder, fileName, stream) {
    return new Promise((resolve, reject) => {
      s3.upload({
        Bucket: folder,
        Key: fileName,
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
