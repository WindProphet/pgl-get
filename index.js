const fs = require('fs');
const express = require('express');

var server = express();

port = '52311'
console.log('Pokémon-GL Rental Team QRCode getter');
console.log('Source code: https://github.com/WindProphet/pgl-get');

var server_side = false
global.option = {}
global.option.server = server_side
if (server_side) {
  // if server side use session
  var session = require('express-session')
  server.use(session({
    secret: 'recommand 128 bytes random string',
    cookie: { maxAge: 60 * 1000 }
  }))
} else {
  // use file to apply config
  config = {}
  try { config = JSON.parse(fs.readFileSync('./user_file', 'utf8')) } catch (e) {}
  server.use((req,res,next) => {
    req.session = config
    var _end = res.end
    var ended = false
    res.end = (...p) => {
      if (ended) {
        return false;
      }
      ended = true;

      fs.writeFile('./user_file', JSON.stringify(req.session), (err) => {
        if(err) {console.error('writeFile error');}
      });

      return _end.call(res,...p)
    }
    next()
  })
}

server.set('view engine', 'pug')
server.use(require('./lib/server.js'))
server.use('/team', require('./lib/team.js'))
server.listen(port, () => {
  console.log('Server Start at: http://127.0.0.1:'+port);
  require('opn')('http://127.0.0.1:'+port)
})
