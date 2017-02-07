server = require('./lib/server.js')
port = '52311'
console.log('Pokémon-GL Rental Team QRCode getter');
console.log('Source code: https://github.com/WindProphet/pgl-get');
server.listen(port, () => {
  console.log('Server Start at: http://127.0.0.1:'+port);
  require('opn')('http://127.0.0.1:'+port)
})
