

'use strict';

var express = require('express');
var passport = require('passport');
var User = require("../models/user");
// Passport Configuration
require('./local/passport')(passport, User);

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;
