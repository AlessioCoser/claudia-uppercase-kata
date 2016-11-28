var assert = require('assert')
var S3EventAdapter = require('../../lib/s3_event_adapter')

describe('S3EventAdapter', function () {
  let validEvent = {Records: [{
    eventSource: 'aws:s3',
    s3: {
      bucket: {name: 'my_bucket'},
      object: {key: 'my_filekey'}
    }
  }]}

  it('returns false for invalid s3 Event', function () {
    var event = {}
    var eventAdapter = new S3EventAdapter(event)

    assert.equal(eventAdapter.isValid(), false)
  })

  it('returns true for valid s3 Event', function () {
    var eventAdapter = new S3EventAdapter(validEvent)

    assert.equal(eventAdapter.isValid(), true)
  })

  it('returns bucket for valid s3 Event', function () {
    var eventAdapter = new S3EventAdapter(validEvent)

    assert.equal(eventAdapter.getFolder(), 'my_bucket')
  })

  it('returns fileKey for valid s3 Event', function () {
    var eventAdapter = new S3EventAdapter(validEvent)

    assert.equal(eventAdapter.getFileName(), 'my_filekey')
  })
})
