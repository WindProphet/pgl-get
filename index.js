server = require('./lib/server.js')
port = '52311'
server.listen(port, () => {
  require('opn')('http://127.0.0.1:'+port)
})
