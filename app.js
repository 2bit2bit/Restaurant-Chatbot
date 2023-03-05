const path = require("path");

const express = require("express");
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

io.on('connection', (socket) => {
  //if sesion dosent already exist then send the message to the user
  socket.emit('chat message', `Hi!, I am chat bot, this is your connection id:${socket.id}`);

  socket.on("chat message", function (msg) {
      // console.log(msg)
      socket.emit("chat message", `user sends ${msg}`);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
