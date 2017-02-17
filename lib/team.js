const express = require('express');
const querystring = require('querystring');
const https = require('https');

router = express.Router()

router.all('/', (req, res) => {
  res.send('Team')
})

router.all('/:id', (req, res) => {
  console.log(req.params.id);
  id = req.params.id
  var query = new Promise(function(resolve, reject) {
    req = https.request({
      host: "3ds.pokemon-gl.com",
      path: "/frontendApi/battleTeam/getBattleTeamDetail",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "https://3ds.pokemon-gl.com/rentalteam/"
      }
    },(res) => {
      body = '';
      res.on('data',function(d){
        data = JSON.parse(d)
        if (data.status_code == "0000") {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
    });
    que = querystring.stringify({
      languageId: 9,
      battleTeamCd: id,
      timeStamp: Date.now()
    });
    req.write(que);
    req.on('error', function(e) {
      reject(e)
    });
    req.end();
  });
  query
    .then((d) => {
      res.render('teamdetail',d)
    })
    .catch((e) => {
      res.send("error: " + e)
    })
})

module.exports = router;
