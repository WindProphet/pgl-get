const request = require('superagent')
const querystring = require('querystring')
const https = require('https');
module.exports = (a,b) => {
  // console.log(`qr ${b}`);
  return new Promise(function(resolve, reject) {
    req = https.request({
      host: "3ds.pokemon-gl.com",
      path: "/frontendApi/battleTeam/getQr",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "https://3ds.pokemon-gl.com/rentalteam/"
      }
    },(res) => {
      body = '';
      res.on('data',function(d){
        if (d[0] == 0x89 && d[1] == 0x50) {
          resolve(d)
        }
        else {
          str = ''
          str += d
          reject(JSON.parse(str))
        }
      })
    });
    query = querystring.stringify({
      savedataId: a,
      battleTeamCd: b
    });
    req.write(query);
    req.on('error', function(e) {
      reject(e)
    });
    req.end();
  });
}
