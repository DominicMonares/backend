const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const Strategy = require('passport-twitter');
const dotenv = require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// passport.use(new Strategy(
//   {
//     consumerKey: process.env['TWITTER_CONSUMER_KEY'],
//     consumerSecret: process.env['TWITTER_CONSUMER_SECRET'],
//     callbackURL: 'http://127.0.0.1:3000/user/account/google',
//   }
// ))

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/user/auth/google/account'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('ISSUER ', issuer);
    console.log('PROFILE ', profile);
    return done(null, profile, accessToken);
  }
));
