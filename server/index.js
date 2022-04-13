const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const passport = require('passport');
const cookieSession = require('cookie-session');
const { serverPort } = require("../constants");

const db = require("../database");

app.use(express.json());
app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());

const userRouter = require("./routes/User");
const postRouter = require("./routes/Post");

app.use("/user", userRouter);
app.use("/post", postRouter);

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit(`${msg.sender}${msg.receiver}`, msg);
  });
});

server.listen(serverPort, () => {
  console.log(`listening on port ${serverPort}`);
});
