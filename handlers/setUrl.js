const dns = require('dns');
const Url = require('../models/url');

module.exports = function setUrl(req, res, next) {
  const regUrl = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  const regHostname = /\//;
  const regHttp = /(http(s)?):\/\//;
  let url = req.body.url;
  const hostname = url.split(regHostname);
  let tmpUrl = url;
        
  // check if valide url
  if(!regUrl.test(url)) return next(new Error());

  // get hostname
  if(regHttp.test(tmpUrl)) tmpUrl = hostname[2]
  else tmpUrl = hostname[0]
  
  // check if url exist
  dns.resolve4(tmpUrl, function (err) {
    if(err) return next(new Error("invalid Hostname: " + url))
    
    // remove trailing '/'
    if (url.match(/\/$/)) url = url.slice(0,-1);
    
    // check if already exist in db
    Url.findOne({url: url}, (err, data) => {
      if(err) return;
      
      // url already in db
      if(data) res.json({original_url: url, short_url: data.urlId});
      
      else {
      
        // add url to db
        const newUrl = new Url({url: url})

        newUrl.save((err, data) => {
          if (err) return;
          res.json({original_url: url, short_url: data.urlId});
        });
      }
    })
    
  });
  
}
