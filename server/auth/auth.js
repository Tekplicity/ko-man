'use strict';

var passport = require('koa-passport')
var LocalStrategy = require('passport-local').Strategy
var jwt = require('koa-jwt');

var User = require('../api/user/user.model');
var config = require('../config/environment');

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


}))

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, { expiresIn: 1000 * 60 * 60 * 5 });
}

function *isAuthenticated(next){
    var _jwt = jwt({ secret: config.secrets.session });

    try {
        yield _jwt.call(this, function*(err){ /* Do nothing */ });
        var user = yield User.findById(this.state.user._id);
        if (!user) return this.throw(401);
        this.user = user;
    } catch(err) {
        console.log('isAuthenticated ERROR:', err)
        this.throw(err);
    }

    // console.log('isAuthenticated after', this.state);
    yield next;
    // this.throw(403,'Forbidden')
}

module.exports = {
    isAuthenticated: isAuthenticated,
    signToken: signToken
}
