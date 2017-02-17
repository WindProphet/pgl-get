const express = require('express');
const login = require('./login');
const qr = require('./qr');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', function (req, res) {
  res.render("main",global.option)
})

router.all('/save', function(req, res) {
  if (!req.body.value) {
    res.send(req.session[req.body.id] ? req.session[req.body.id]: '')
  }
  else {
    req.session[req.body.id] = req.body.value
    res.end()
  }
})

router.all('/login', function (req, res) {
  login(req.body.username,req.body.password)
    .then((e) => {
      res.send(e)
    })
})

router.all('/qrcode', function (req, res) {
  console.log('QRCODE: '+ req.body.battleTeamCd);
  qr(req.body.savedataId,req.body.battleTeamCd)
    .then((e) => {
      // res.set("Content-Type", "application/json;charset=UTF-8")
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
          // case '2000':
//             res.send('no such team')
//             break;
          default:
            res.send(`status_code: ${e.status_code}`)
        }
      }
      else {
        res.send(e)
      }
    })
})

module.exports = router
