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

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "keyboard cat",
  resave: false,
  saveUninitialized: true,
  store: store,
});
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  let userData;
  const req = socket.request;

  if (req.session.userData) {
    userData = req.session.userData;
    socket.emit("chat message", `Old user with id: ${req.sessionID}`);
  } else {
    userData = [];
    socket.emit("chat message", `New user with id: ${req.sessionID}`);
  }

  socket.on("chat message", function (msg) {
    //process the mesage, and return a response
    socket.emit("chat message", `user sends ${msg}`);
    userData.push(msg);
  });

  socket.on("disconnect", () => {
    req.session.userData = userData;
    req.session.save();
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
