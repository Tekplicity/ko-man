'use strict';

// var User = require('../api/user/user.model');
var config = require('../config/environment');
var passport = require('koa-passport')
var LocalStrategy = require('passport-local').Strategy
var jwt = require('koa-jwt');


var user = { id: 1, username: 'test' }



passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    done(null, user)
})

passport.use(new LocalStrategy(function(username, password, done) {
  // retrieve user ...
  if (username === 'test' && password === 'test') {
    done(null, user)
  } else {
    done(null, false)
  }

  // User.findById(req.user._id, function (err, user) {
  //       if (err) return next(err);
  //       if (!user) return res.send(401);
  //
  //       req.user = user;
  //       next();
  //     });
}))

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({ _id: id },
      config.secrets.session, { expiresIn: 1000 * 60 * 60 * 5 });
}

function *isAuthenticated(next){
    console.log('isAuthenticated before')
    var _jwt = jwt({ secret: config.secrets.session });
    yield _jwt.call(this, function*(){ /* Do nothing */ });

    User.findById(this.user._id, function (err, user) {
        if (err) return this.throw(500, err);
        if (!user) return this.throw(403, 'Forbidden');

        this.user = user;
        yield next;
      });
    // console.log('isAuthenticated after', this.state);
    // yield next;
    // this.throw(403,'Forbidden')
}

module.exports = {
    isAuthenticated: isAuthenticated,
    signToken: signToken
}
