var aws = require('aws-sdk');

module.exports = {
  deleteS3Object,
  putS3Object,
  readS3Object,
  waitUntilS3ObjectExists
}

function deleteS3Object(bucket, key) {
  var s3 = new aws.S3({ signatureVersion: 'v4' })

  return new Promise((resolve, reject) => {
    console.log('-- delete s3 object', bucket, key)
    s3.deleteObject({
      Bucket: bucket,
      Key: key,
    }, (err, data) => err ? reject(err) : resolve(data) )
  })
}

function putS3Object(bucket, key, body) {
  var s3 = new aws.S3({ signatureVersion: 'v4' })
  return new Promise((resolve, reject) => {
    console.log('-- put s3 object', bucket, key)
    s3.putObject({
      Bucket: bucket,
      Key: key,
      Body: body
    }, (err, data) => err ? reject(err) : resolve(data) )
  })
}

function readS3Object(bucket, key) {
  var s3 = new aws.S3({ signatureVersion: 'v4' })

  return new Promise((resolve, reject) => {
    console.log('-- read s3 object', bucket, key)
    var stream = s3.getObject({
      Bucket: bucket,
      Key: key
    }, (err, data) => err ? reject(err) : resolve(data) )
  })
}

function waitUntilS3ObjectExists(bucket, key) {
  return new Promise((resolve, reject) => {
    var retries = 0
    var intervalId = setInterval(() => {
      console.log('-- waiting until s3 object exists', bucket, key)
      readS3Object(bucket, key)
      .then(resolve)
      .catch(() => {
        console.log('-- retries', retries)
        if(retries > 10) {
          reject(new Error(`file (${key}) not found in bucket (${bucket})`))
          clearInterval(intervalId)
        }
      })
      retries++
    }, 1000)
  })
}
