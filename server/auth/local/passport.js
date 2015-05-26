
var LocalStrategy   = require('passport-local').Strategy;
var User = require("../../models/user");
module.exports = function(passport) {

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passReqCallback: true
  },
  function(email, password, done) {

    process.nextTick(function(){

      User.findOne({'local.email': email}, function(err, user) {

        if(err) return done(err);

        if (user) {
            return done(null, false, {message: email + ' is be token, you can use it to logn in.'});
        } else {

            // if there is no user with that email
            // create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            // save the user
            newUser.save(function(err) {
                if (err)
                    throw err;
                return done(null, newUser);
            });
        }

      })


    })

  }));

  passport.use('local-login', new LocalStrategy({

    usernameField: 'email',
    passReqCallback: true

  }, function(email, password, done){

    User.findOne({'local.email': email}, function(err, user){
      
      if(err) return done(err);

      if(!user)
        return done(null, false, {message: 'The username ' + email + ' has not been activated or is blocked. Please confirm it.'});

      if(!user.validPassword(password))

        return done(null, false, {message: 'The password you entered for the username ' + email + ' is incorrect.'});

      return done(null, user);


    })

  }))


}
