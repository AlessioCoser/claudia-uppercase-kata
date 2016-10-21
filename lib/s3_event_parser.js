module.exports = function (lambdaEvent) {
  var eventRecord = lambdaEvent.Records && lambdaEvent.Records[0]

  this.getBucket = function () {
    return eventRecord.s3.bucket.name
  }

  this.getFileKey = function () {
    return eventRecord.s3.object.key
  }

  this.isValid = function () {
    return ((Boolean(eventRecord)) && (eventRecord.eventSource === 'aws:s3' && Boolean(eventRecord.s3)))
  }
}
