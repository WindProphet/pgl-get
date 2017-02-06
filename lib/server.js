const express = require('express');
const login = require('./login');
const qr = require('./qr');
const path = require('path');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.all('/login', function (req, res) {
  login(req.query.username,req.query.password)
    .then((e) => {
      res.send(e)
    })
})

app.all('/qrcode', function (req, res) {
  qr(req.query.savedataId,req.query.battleTeamCd)
    .then((e) => {
      // res.set("Content-Type", "application/json;charset=UTF-8")
      console.log('get');
      img = (e) => {
        return [
          '<img src="data:image/png;base64,',
          e.toString('base64'),
          '"/>'
        ].join('')
      }
      res.send(img(e))
    })
    .catch((e) => {
      if (e.status_code) {
        switch (e.status_code) {
          case '2000':
            res.send('no such team')
            break;
          default:
            res.send(`status_code: ${e.status_code}`)
        }
      }
      else {
        res.send(e)
      }
    })
})

module.exports = app
