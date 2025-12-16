const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const { secret } = require("../config/key");

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';


module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById({ _id: jwt_payload.id }).then(user => {
      // if (err) {
      //     return done(err, false);
      // }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    }).catch((err) => {
      console.log(err);
    });
  }));
};