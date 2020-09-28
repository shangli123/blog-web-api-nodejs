const http = require('http')

const PORT = 8083
const serverHandle = require('../app')

const server = http.createServer(serverHandle)
server.listen(PORT)
console.log('listening on', PORT)