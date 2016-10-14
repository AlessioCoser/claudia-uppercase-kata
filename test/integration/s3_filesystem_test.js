var aws = require('aws-sdk');
var assert = require('assert')
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
      s3FileSystem = new S3FileSystem()
      stream = s3FileSystem.readAsStream(inputFileName, bucketName)

      stream.on('data', function(chunk) {
        assert.equal(chunk.toString(), "lorem ipsum dolor sit amet.")
        done()
      })
    })
  })
})
