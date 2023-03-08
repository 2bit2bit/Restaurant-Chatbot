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
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
});
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

app.get("/", (req, res) => {
  res.render("index", { url: process.env.URL });
});

const NavigationTree = require("./modules/navigationTree").NavigationTree;
const botResponse = require("./modules/botResponse");

////

io.on("connection", (socket) => {
  const req = socket.request;
  let navigationTree = new NavigationTree();
  let currentNode = navigationTree.root;
  let curOrder = [];

  let orders;
  if (req.session.orders) {
    orders = req.session.orders;
  } else {
    orders = [];
  }

  socket.emit(
    "chat message",
    botResponse.response(null, currentNode)[0].message
  );

  socket.on("chat message", function (msg) {
    let response = botResponse.response(msg, currentNode, curOrder, orders);
    socket.emit("chat message", response[0].message);
    currentNode = response[1];

    if (!Object.keys(currentNode.children).length) {
      navigationTree = new NavigationTree();
      currentNode = navigationTree.root;
      socket.emit(
        "chat message",
        botResponse.response(null, currentNode)[0].message
      );
    }
  });

  socket.on("disconnect", () => {
    req.session.orders = orders;
    req.session.save();
  });
});

////

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
