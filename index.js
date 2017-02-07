server = require('./lib/server.js')
const fs = require('fs');

port = '52311'
console.log('Pokémon-GL Rental Team QRCode getter');
console.log('Source code: https://github.com/WindProphet/pgl-get');
server.save = __dirname + "/user_file"
try {
  savefile = fs.readFileSync(server.save,'utf8')
  server.user = JSON.parse(savefile)
} catch (e) {
  server.user = {}
}

server.listen(port, () => {
  console.log('Server Start at: http://127.0.0.1:'+port);
  require('opn')('http://127.0.0.1:'+port)
})
