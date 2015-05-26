

module.exports = function(app) {

  // Insert routes below
  console.log("aaaa");

  // app.use('/users', require('./routes/user'));
  app.use('/cards', require('./routes/card'));

  app.use('/auth', require('./auth'));

  app.route("/").get(function(req, res){

    res.sendfile(app.get("appPath") + '/index.html');
  })


};
