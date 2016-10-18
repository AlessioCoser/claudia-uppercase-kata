module.exports = function S3EventParser(lambdaEvent) {
  this.eventRecord = lambdaEvent.Records && lambdaEvent.Records[0];

  this.getBucket = function(){
    return this.eventRecord.s3.bucket.name
  }

  this.getFileKey = function() {
    return this.eventRecord.s3.object.key
  }

  this.isValid = function(){
    return ((!!this.eventRecord) && (this.eventRecord.eventSource === 'aws:s3' && !!this.eventRecord.s3))
  }
}
