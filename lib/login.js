const request = require('superagent')
const cheerio = require('cheerio')
const cookie  = require('cookie')

const hp = 'https://3ds.pokemon-gl.com' // HomePage
const sso = 'https://sso.pokemon.com/sso/login?service=https://club.pokemon.com/us/pokemon-trainer-club/pgllogin2&locale=en&renew=true'


let login = (username,password) => {
  let co = {}
  return new Promise(
    (then,reject) => {
      process.stdout.write("login [      ]\x1b[7D")
      request
        .get(hp)
        .redirects(0)
        .end((err, res) => {
          if (!err) {
            c = res.header['set-cookie'];
            process.stdout.write("=")
            co.hp = cookie.parse(c.join(';'));
            co.hp.region = 1
            co.hp.language_id = 2;
            co.hp.site = 2;
            delete co.hp.Domain
            delete co.hp.Path
            delete co.hp.DOMAIN
            delete co.hp.PATH
            request
              .get(sso)
              .redirects(0)
              .set('Cookie', cookie.serialize(co.hp))
              .end((err, res) => {
                if (!err) {
                  process.stdout.write("=")
                  co.sso = cookie.parse(res.header['set-cookie'].join(';'));
                  $ = cheerio.load(res.text);
                  form = $('#login-form');
                  act = form.attr('action');
                  post = {}
                  $('input', form).each((i, el) => {
                    post[$(el).attr('name')] = $(el).attr('value');
                  })
                  post['username'] = username
                  post['password'] = password
                  request
                    .post('https://sso.pokemon.com' + act)
                    .query(post)
                    .redirects(0)
                    .set('Cookie', cookie.serialize(co.sso))
                    .end((err,res) => {
                      if (!err) {
                        process.stdout.write("=")
                        // co.login = res.header['set-cookie']
                        $ = cheerio.load(res.text)
                        tic = /top\.location\.href=\"(.*?)\";/.exec($('script').eq(1).text())[1]
                        request
                          .get(tic)
                          .redirects(0)
                          .end((err,res) => {
                            if (!err) {
                            }
                            else {
                              if (err.status == 302) {
                                process.stdout.write("=")
                                l = res.headers.location
                                request
                                  .get(l)
                                  .redirects(0)
                                  .set('Cookie', cookie.serialize(co.hp))
                                  .end((err,res) => {
                                    process.stdout.write("=")
                                    co.login = res.header['set-cookie']
                                    // co.login = cookie.parse(c.join(';'));
                                    // co.login.region = 1
                                    // co.login.language_id = 2;
                                    // co.login.site = 2;
                                    // delete co.login.Domain
                                    // delete co.login.Path
                                    // delete co.login.DOMAIN
                                    // delete co.login.PATH
                                    then(
                                      co.login.join(';')
                                    )
                                  })
                              }
                            }
                          })
                      }
                      else {
                        // console.log(err.status);
                        reject()
                      }
                    })
                }
                else {
                  // console.log(err.status);
                  reject()
                }
              })
          }
          else {
            // console.log(err.status);
            reject()
          }
        })
    }
  )
}


module.exports = (u,p) => {
  return new Promise((then) => {
  login(u,p)
    .then((
      d
    ) => {
      request
        .post('https://3ds.pokemon-gl.com/frontendApi/getLoginStatus')
        .set('Cookie', d)
        .set('pragma', 'no-cache')
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Accept', 'application/json, text/javascript, */*; q=0.01')
        .set('Referer', 'https://3ds.pokemon-gl.com/')
        .set('Accept-Encoding', 'gzip, deflate, br')
        .send('languageId=2&timezone=America%2FNew_York')
        .redirects(0)
        .end((err,res) => {
          if (!err) {
            process.stdout.write("=\n");
            cc = cookie.parse(d);
            console.log("JSESSIONID: ",cc.JSESSIONID,";", "AWSELB: ",cc.AWSELB);
            e = JSON.parse(res.text)
            // console.log(e.savedataList[0].savedataId);
            then(e)
          }
          else {
            // console.log(err.status);
            // console.log(res.headers.location);
          }
        })
    })
  })
}
