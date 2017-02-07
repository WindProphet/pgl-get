const express = require('express');
const login = require('./login');
const qr = require('./qr');
const path = require('path');
const fs = require('fs');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.all('/save', function(req, res) {
  if (!req.query.value) {
    res.send(app.user[req.query.id] ? app.user[req.query.id]: '')
  }
  else {
    try {
      app.user[req.query.id] = req.query.value
      fs.writeFile(app.save, JSON.stringify(app.user), (err) => {
        console.log(err);
      });
      res.send('y')
    } catch (e) {
      res.send('n')
    }
  }

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
