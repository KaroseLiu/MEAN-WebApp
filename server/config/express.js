
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var compression = require('compression');
var errorHandler = require('errorhandler');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');


module.exports = function(app){


  var sessionOpts = {
    secret: 'karose-mean',
    resave: true,
    saveUninitialized: true
  }

  app.set('views', path.join(__dirname, '../views'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: false}));
  app.use(bodyParser.json());
  app.use(cookieParser(sessionOpts.secret));

  app.use(session(sessionOpts));
  app.use(passport.initialize());
  // app.use(passport.session());

  app.use(express.static(path.join(__dirname, '../../public')));
  app.set("appPath", path.join(__dirname, '../../public'));

   // persistent login sessions



  app.use(errorHandler());

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
          res.status(err.status || 500);
          res.render('error', {
              message: err.message,
              error: err
          });
      });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: {}
      });
  });
}
