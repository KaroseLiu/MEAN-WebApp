
'use strict'

var express = require('express');

var router = express.Router();

var passport = require('passport');

var auth = require("../auth.service");

router.post('/signup', function(req, res, next) {

  passport.authenticate('local-signup', function(err, user, info){
    if (err) {
      return res.send(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.send({ success : false, message : info });
    }
    return res.send({ success : true, message : 'authentication succeeded' });
  })(req, res, next);

});


// router.post('/login', function(req, res, next) {
//
//   passport.authenticate('local-login', function(err, user, info) {
//
//     if(err) {
//       return res.send(err);
//     }
//
//     if(!user) {
//       return res.status(404).send({error: info.message});
//     }
//
//     if(!user.validPassword(req.body.password)) {
//       return res.status(401).send({ error: info.message })
//     }
//
//     req.login(user, {}, function(err) {
//       if (err) { return next(err) };
//       return res.send({ success : true, message : user });
//     });
//
//   })(req, res, next)
//
// })

router.post('/login', function(req, res, next){
  passport.authenticate('local-login', function(err, user, info) {

    if(err) {
      return res.send(err);
    }

    if(!user) {
      return res.status(404).send({error: info.message});
    }

    if(!user.validPassword(req.body.password)) {
      return res.status(401).send({ error: info.message })
    }

    var token = auth.signToken(user._id);

    res.json({token: token});

  })(req, res, next)
});



module.exports = router;
