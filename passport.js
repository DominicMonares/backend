const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const dotenv = require("dotenv").config();

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/user/account/google'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('ISSUER ', issuer);
    console.log('PROFILE ', profile);
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
