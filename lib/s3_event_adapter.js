module.exports = function (event) {
  var eventRecord = event.Records && event.Records[0]

  this.getFolder = function () {
    return eventRecord.s3.bucket.name
  }

  this.getFileName = function () {
    return eventRecord.s3.object.key
  }

  this.isValid = function () {
    return ((Boolean(eventRecord)) && (eventRecord.eventSource === 'aws:s3' && Boolean(eventRecord.s3)))
  }
}
