var assert = require('assert')
var sinon = require('sinon')

var Stream = require("stream")
var EventParser = require("../../lib/s3_event_parser")
var S3FileSystem = require("../../lib/s3_filesystem")
var uppercaseStream = require("../../lib/uppercase_stream")
var convertionService = require("../../lib/convertion_service")


describe('ConversionService', function(){
  let validEvent = {"Records": [{
    eventSource: "aws:s3",
    s3: {
      bucket: {name: "my-bucket"},
      object: {key: "inputfile.txt"}
    }
  }]}

  it('returns error for missing event', function(done){
    convertionService(null, null, null, function(err){
      assert.equal(err, "Event not specified")
      done()
    })
  })

  it('returns error for invalid event', function(done){
    convertionService(new EventParser({}), null, null, function(err){
      assert.equal(err, "Event is not valid")
      done()
    })
  })

  it('calls uppercasedStream function', function(){
    const uppercaseStreamSpy = sinon.spy(uppercaseStream)

    convertionService(new EventParser(validEvent), new S3FileSystem(), uppercaseStreamSpy)

    assert(uppercaseStreamSpy.called, true)
  })

  it('writes as stream on correct file and bucket', function(){
    const fileSystem = new S3FileSystem()
    const fileSystemMock = sinon.mock(fileSystem)

    fileSystemMock.expects('readAsStream').returns(new Stream()).once()
    fileSystemMock.expects('writeAsStream').withArgs('outputfile.txt', 'my-bucket').once()

    convertionService(new EventParser(validEvent), fileSystem, uppercaseStream)

    fileSystemMock.verify()
  })

})
