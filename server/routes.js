
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

module.exports = function(app) {

  // Insert routes below

  // app.use('/users', require('./routes/user'));




  // app.use('/cards', function(req, res, next){
  //
  //   console.log(req.user);
  //   console.log(req.isAuthenticated())
  //
  //   if(req.user || req.isAuthenticated()) {
  //     next();
  //   }else {
  //     return res.status(403).send({ error: 'Not Login in...'})
  //   }
  //
  // })

  app.use('/cards', expressJwt({secret: 'karose-mean'}))


  app.use('/cards', require('./routes/card'));

  app.use('/auth', require('./auth'));


  app.route("/").get(function(req, res){

    res.sendfile(app.get("appPath") + '/index.html');

  })


};
