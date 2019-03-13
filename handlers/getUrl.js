const Url = require('../models/url');

module.exports = function getUrl(req, res, next) {
  let id = req.params.urlId;
  
  // check if NaN
  if(isNaN(+id)) return next(new Error("Wrong Format"))
  
  Url.findOne({urlId: id}, (err, data) => {
    if(err) return;
    if(data) res.redirect(data.url);
    else next(new Error('No url found')) 
  })
}
