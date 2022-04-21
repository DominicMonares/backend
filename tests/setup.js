const bcrypt = require('bcryptjs');
const db = require('../database/index');
const User = require('../database/models/User');
const Post = require('../database/models/Post');

const { initUsers, initPosts } = require('./data.js');

const initializeUsers = async () => {
  for (let user of initUsers) {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(user.password, salt);
    let newUser = new User({
      username: user.username,
      email: user.email,
      password: hashedPassword,
      profPhoto: user.profPhoto
    });
   await newUser.save();
  }
}

const initializePosts = async () => {
  for (let post of initPosts) {
    let newPost = new Post(post);
    await newPost.save();
  }
}

const initialize = async () => {
  try {
    await initializeUsers();
    await initializePosts();
  } catch (err) {
    console.log(err)
  }
}

const clear = async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
}

const setup = () => {
  beforeAll(async () => {
    //insert all base user and post data
    await clear();
    await initialize();
  });

  afterEach(async () => {
    //remove all data
    //re insert all base user data
    await clear();
    await initialize();
  });

  afterAll(async () => {
    //remove all tables and db
    await clear();
    db.close();
  });
}

module.exports = {
  setup: setup,
  initialize: initialize
}