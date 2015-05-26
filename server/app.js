
'use strict';

var express = require('express');

var app = express();

var mongoose = require('mongoose');

var config = require('./config/mongodb');

mongoose.connect(config.url);

var db = mongoose.connection;

db.on('error', function(err){
    console.error('connect to mydb error: ');
    process.exit(1);
});

db.once('open', function () {
    console.log('It has been connected. ' + config.url)
});


require('./config/express')(app);
require('./routes')(app)

app.set('port', process.env.PORT || 3000);

var debug = require('debug');

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + app.get('port'));
});

module.exports = app;
