var assert = require('assert')
var S3eventParser = require('../../lib/s3_event_parser')

describe('S3EventParser', function () {
  let validEvent = {Records: [{
    eventSource: 'aws:s3',
    s3: {
      bucket: {name: 'my_bucket'},
      object: {key: 'my_filekey'}
    }
  }]}

  it('returns false for invalid s3 Event', function () {
    var event = {}
    var eventParser = new S3eventParser(event)

    assert.equal(eventParser.isValid(), false)
  })

  it('returns true for valid s3 Event', function () {
    var eventParser = new S3eventParser(validEvent)

    assert.equal(eventParser.isValid(), true)
  })

  it('returns bucket for valid s3 Event', function () {
    var eventParser = new S3eventParser(validEvent)

    assert.equal(eventParser.getBucket(), 'my_bucket')
  })

  it('returns fileKey for valid s3 Event', function () {
    var eventParser = new S3eventParser(validEvent)

    assert.equal(eventParser.getFileKey(), 'my_filekey')
  })
})
