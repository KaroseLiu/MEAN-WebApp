var express = require('express');

var router = express.Router();

var passport = require('passport');

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


router.post('/login', function(req, res, next) {

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

    return res.send({ success : true, message : user });

  })(req, res, next)

})




module.exports = router;
