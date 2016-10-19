module.exports = function convertionService(event, fileSystem, streamConverter, callback) {
  if(!event) {
    callback("Event not specified")
    return
  }

  if(!event.isValid()) {
    callback("Event is not valid")
    return
  }

  var bucket = event.getBucket()
  var fileKey = event.getFileKey()

  var newFileKey = fileKey.replace(/^in/, 'out')

  var stream = fileSystem.readAsStream(fileKey, bucket)
  var uppercasedStream = streamConverter(stream)

  fileSystem.writeAsStream(newFileKey, bucket, uppercasedStream, callback)
}
