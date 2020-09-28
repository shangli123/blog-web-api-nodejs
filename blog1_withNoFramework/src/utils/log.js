const fs = require('fs')
const path = require('path')

function writeLog(writeStream, log) {
    writeStream.write(log + '\n')
}

function createWriteStream(fileName) {
    var fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    var writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream
}

var accessWriteStream = createWriteStream('access.log')
function access(log) {
    writeLog(accessWriteStream, log)
}

var errorWriteStream = createWriteStream('error.log')
function error(log) {
    writeLog(errorWriteStream, log)
}

var eventWriteStream = createWriteStream('event.log')
function event(log) {
    writeLog(eventWriteStream, log)
}

module.exports = { access, error, event }