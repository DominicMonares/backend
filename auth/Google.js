const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const dotenv = require("dotenv").config();

const googleAuth = async () => {
  console.log('TEST')
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:3000/oauth2/redirect/google'
    },
    function(issuer, profile, cb) {
      console.log('ISSUER ', issuer);
      console.log('PROFILE ', profile);
    }
  ))
}

module.exports = googleAuth;
