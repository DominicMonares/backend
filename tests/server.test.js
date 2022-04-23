const bcrypt = require('bcryptjs');
const { setup } = require('./setup.js');
const db = require('../database/index');
const User = require('../database/models/User');
const Post = require('../database/models/Post');
const Notification = require('../database/models/Notification')

const {
  addNewUser,
  getUser,
  followUser,
  getUserMeta,
  changeProfilePhoto,
  postNotification,
  getNotification
} = require('../database/controllers/User');

const {
  uploadPost,
  getDiscoveryPosts,
  commentOnPost,
  getUserPosts
} = require("../database/controllers/Post");


setup();

describe('User Tests', () => {
  test('Test addNewUser', async () => {
    let newUser = {
      username: 'testuser',
      email: 'testuser@gmail.com',
      password: 'password'
    };
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;
    await addNewUser(newUser);

    let response =  await User.find({ username: 'testuser' });
    let addedUser = response[0];
    expect(addedUser.username).toBe('testuser');
    expect(addedUser.email).toBe('testuser@gmail.com');
  });

  test('Test getUser', async () => {
    let response = await getUser('troyqyang');
    expect(response.userInfo).toBeTruthy();
    expect(response.posts).toBeTruthy();
    expect(response.userInfo.email).toBe('troy.q.yang@gmail.com');
  });

  test('Test getUserMeta', async () => {
    let response = await getUserMeta('troyqyang');
    expect(response.email).toBe('troy.q.yang@gmail.com');
  });

  test('Test changeProfilePhoto', async () => {
    await changeProfilePhoto({
      username: 'troyqyang',
      profPhoto: 'https://cdn.wallpapersafari.com/66/93/G5flu7.png'
    });

    let response = await User.find({ username: 'troyqyang' });
    let user = response[0];
    expect(user.profPhoto).toBe('https://cdn.wallpapersafari.com/66/93/G5flu7.png');
  })

  test('Test followUser', async () => {
    let userOne = await User.find({ username: 'troyqyang' });
    let userTwo = await User.find({ username: 'josephnahm1' });
    await followUser(userOne[0]._id, userTwo[0]._id);

    let newUserOne = await User.find({ _id: userOne[0]._id });
    let newUserTwo = await User.find({ _id: userTwo[0]._id });
    expect(newUserOne[0].following[0] === userTwo[0]._id);
    expect(newUserTwo[0].followers[0] === userOne[0]._id);
  });
});

describe('Post Tests', () => {
  test('Test uploadPost', async () => {
    const newPost = {
      username: 'troyqyang',
      profPhoto: 'https://placeimg.com/100/100/animals',
      location: 'San Francisco',
      url: 'https://cdn.wallpapersafari.com/66/93/G5flu7.png',
      caption: 'test caption'
    };
    await uploadPost(newPost);
    let response = await Post.find({
      username: 'troyqyang',
      url: 'https://cdn.wallpapersafari.com/66/93/G5flu7.png',
      caption: 'test caption'
    });
    let addedPost = response[0];
    expect(addedPost.username).toBe('troyqyang');
    expect(addedPost.url).toBe('https://cdn.wallpapersafari.com/66/93/G5flu7.png');
    expect(addedPost.caption).toBe('test caption');
  });

  test('Test getUserPosts', () => {
    let response = getUserPosts('troyqyang');
    response.then((response) => {
      let addedPost = response[0];
      expect(addedPost.username).toBe('troyqyang');
      expect(addedPost.profPhoto).toBe('https://placeimg.com/100/100/animals');
      expect(addedPost.caption).toBe('test caption');
    })
  });

  test('Test getDiscoveryPosts', () => {
    let response = getDiscoveryPosts(1, 0);
    response.then((response) => {
      expect(response.length).toBe(1);
    })
  });
});