const initData = {
  users: [
    {
      username: 'troyqyang',
      email: 'troy.q.yang@gmail.com',
      password: 'password',
      profPhoto: 'https://placeimg.com/100/100/animals'
    },
    {
      username: 'josephnahm1',
      email: 'josephnahm@gmail.com',
      password: 'password',
      profPhoto: 'https://placeimg.com/100/100/animals'
    }
  ],
  posts: [
    {
      username: 'troyqyang',
      profPhoto: 'https://placeimg.com/100/100/animals',
      location: 'San Francisco',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ99rViO5rDU_pgzoAlV6gM6GoT5qwAXt008Q&usqp=CAU',
      caption: 'test caption',
      comments: [{
        username: 'testuser',
        comment: 'test comment',
        profPhoto: 'https://mydesktopwalls.com/wp-content/uploads/2020/08/Desktop-Wallpaper-4k-1.jpg',
      }]
    }
  ]
}

module.exports = {
  initUsers: initData.users,
  initPosts: initData.posts
};