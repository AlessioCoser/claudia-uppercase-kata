var assert = require('assert')
var testUtils = require('../test_utils')

var bucketName = 'claudia-uppercase-kata'
var inputFileName = 'inputfile.txt'
var outputFileName = 'outputfile.txt'

describe('Uppercase Bucket Stream', function () {
  it('converts inputfile to uppercase and writes to outputfile', function () {
    this.timeout(30000)

    var inputContent = 'lorem ipsum dolor sit amet.'
    var uppercasedContent = 'LOREM IPSUM DOLOR SIT AMET.'

    return testUtils.deleteS3Object(bucketName, inputFileName)
    .then(() => testUtils.deleteS3Object(bucketName, outputFileName))
    .then(() => testUtils.putS3Object(bucketName, inputFileName, inputContent))
    .then(() => testUtils.waitUntilS3ObjectExists(bucketName, outputFileName))
    .then(data => {
      assert.equal(data.Body.toString(), uppercasedContent)
    })
  })
})
