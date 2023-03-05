const path = require("path");

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI || "mongodb://localhost:27017/mySessions",
  collection: "mySessions",
});

const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

app.get("/", (req, res) => {
  req.session.user = "user";
  console.log(req.session);
  res.render("index");
  req.session.save();
});

io.on("connection", (socket) => {
  //if sesion dosent already exist then send the message to the user

  socket.emit(
    "chat message",
    `Hi!, I am chat bot, this is your connection id:${socket.id}`
  );

  socket.on("chat message", function (msg) {
    // console.log(msg)
    socket.emit("chat message", `user sends ${msg}`);
  });

  socket.on("disconnect", () => {
    //store chat session orders and the rest of the data
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
