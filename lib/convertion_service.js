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

    var folder = event.getFolder()
    var fileName = event.getFileName()
    var newFileName = fileName.replace(/^in/, 'out')
    var stream = fileSystem.readAsStream(folder, fileName)

    return fileSystem.writeAsStream(folder, newFileName, streamConverter(stream))
  })
}
