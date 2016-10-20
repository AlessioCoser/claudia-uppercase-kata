module.exports = function (lambdaEvent) {
  this.eventRecord = lambdaEvent.Records && lambdaEvent.Records[0]

  this.getBucket = function () {
    return this.eventRecord.s3.bucket.name
  }

  this.getFileKey = function () {
    return this.eventRecord.s3.object.key
  }

  this.isValid = function () {
    return ((Boolean(this.eventRecord)) && (this.eventRecord.eventSource === 'aws:s3' && Boolean(this.eventRecord.s3)))
  }
}
