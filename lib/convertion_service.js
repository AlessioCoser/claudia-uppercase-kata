module.exports = function (event, fileSystem, streamConverter) {
  return new Promise((resolve, reject) => {
    if (!event) {
      reject('Event not specified')
      return
    }

    if (!event.isValid()) {
      reject('Event is not valid')
      return
    }

    var bucket = event.getBucket()
    var fileKey = event.getFileKey()
    var newFileKey = fileKey.replace(/^in/, 'out')
    var stream = fileSystem.readAsStream(fileKey, bucket)

    return fileSystem.writeAsStream(newFileKey, bucket, streamConverter(stream))
  })
}
