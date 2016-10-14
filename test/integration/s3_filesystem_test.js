var aws = require('aws-sdk');
var assert = require('assert')
var Stream = require('stream');
var testUtils = require('../test_utils')
var S3FileSystem = require('../../lib/s3_filesystem')

var bucketName = "claudia-uppercase-kata"
var inputFileName = "inputfile.txt"
var outputFileName = "outputfile.txt"


describe('S3FileSystem', function(){
  it('reads from S3 Bucket', function(done){
    this.timeout(30000)

    var inputContent = "lorem ipsum dolor sit amet."

    testUtils.deleteS3Object(bucketName, inputFileName)
    .then(() => testUtils.putS3Object(bucketName, inputFileName, inputContent))
    .then(() => {
      var s3FileSystem = new S3FileSystem()
      var data = []

      s3FileSystem.readAsStream(inputFileName, bucketName)
      .on('data', (chunk) => data.push(chunk))
      .on('end', () => {
        assert.equal(String.prototype.concat(data), "lorem ipsum dolor sit amet.")
        done()
      })
    })
  })
})
