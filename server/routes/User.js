const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require('passport');
require('../../passport.js');
const router = express.Router();

const {
  addNewUser,
  getUser,
  followUser,
  getUserMeta,
  changeProfilePhoto,
} = require("../../database/controllers/User");

const googleAuth = require('../../auth/Google');

//GET REQUESTS

//request parameteer must include username --- returns userInfo (user metadata and posts)
router.get("/getUser/:username", async (req, res) => {
  try {
    const { userInfo, posts } = await getUser(
      req.params.username.toLowerCase()
    );
    res.send({ userInfo, posts });
  } catch (err) {
    res.send(err);
  }
});

router.get("/getUserMeta/:username", async (req, res) => {
  try {
    const { username, profPhoto } = await getUserMeta(
      req.params.username.toLowerCase()
    );
    res.send({ username, profPhoto });
  } catch (err) {
    res.send(err);
  }
});

//GOOGLE
router.get("/googleUser", passport.authenticate('google', {
  scope: [ 'profile', 'email' ]
}));

router.get('/account/google', passport.authenticate('google', {
  failureRedirect: '/googleUser/error', failureMessage: true}),
  async (req, res) => {
    res.redirect('/');
  }
);

router.get('/googleUser/error', (req, res) => {
  res.send('Auth Error');
});

//TWITTER
router.get("/twitterUser", async (req, res) => {

  res.send('AYY');
});

//POST REQUESTS

//input must be in form {username, email, password} -- returns username
router.post("/addNewUser", async (req, res) => {
  const body = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);
  const user = {
    username: body.username,
    email: body.email,
    password: hashedPassword
  };

  try {
    const newUser = await addNewUser(user);
    res.send(newUser.username);
  } catch (err) {
    if (err.code === 11000) {
      res.send("already a user");
    } else {
      res.send(err);
    }
  }
});

router.post("/followUser", async (req, res) => {
  try {
    const { currentUserID, otherID } = req.body;
    await followUser(currentUserID, otherID);
    res.send("succesfully followed");
  } catch (err) {
    res.send(err);
  }
});

router.post("/profPhoto", async (req, res) => {
  try {
    const user = await changeProfilePhoto(req.body)
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
