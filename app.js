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
  uri: process.env.MONGODB_URI,
  collection: "mySessions",
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: { maxAge: 24 * 60 * 60 * 1000 * 14 },
});
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

app.get("/", (req, res) => {
  res.render("index", { url: process.env.URL });
});

const botResponse = require("./modules/botResponse");
const { NavigationTree } = require("./modules/navigationTree");

////
let socketRoom = {};
io.on("connection", (socket) => {
  const req = socket.request;
  const userID = req.session.id;
  let sessionData;

  //group connection from different tabs
  if (Object.keys(socketRoom).includes(userID)) {
    socketRoom[userID].sessionMessages.forEach((message) => {
      socket.emit("chat message", message);
    });
    sessionData = socketRoom[userID];
    sessionData.sessionConnection++;
    socket.join(userID);
  } else {
    let navigationTree = new NavigationTree();
    sessionData = {
      name: req.session.name || "",
      navigationTree: navigationTree,
      currentNode: navigationTree.root,
      curOrder: [],
      listStartIndex: 0,
      orders: req.session.orders || [],
      sessionMessages: [],
      sessionConnection: 1,
    };
    socketRoom[userID] = sessionData;
    socket.join(userID);
    socket.emit("chat message", botResponse.response(null, sessionData));
  }

  socket.on("chat message", function (msg) {
    socket.to(userID).emit("chat message", { sender: "user", message: [msg] });
    if (sessionData.currentNode.index === "greeting") {
      io.to(userID).emit(
        "chat message",
        botResponse.response(msg, sessionData)
      );
      io.to(userID).emit(
        "chat message",
        botResponse.response(null, sessionData)
      );
    } else {
      io.to(userID).emit(
        "chat message",
        botResponse.response(msg, sessionData)
      );
    }

    if (!Object.keys(sessionData.currentNode.children).length) {
      sessionData.currentNode = sessionData.navigationTree.start;
      sessionData.listStartIndex = 0;
      io.to(userID).emit(
        "chat message",
        botResponse.response(null, sessionData)
      );
    }
  });

  socket.on("disconnect", () => {
    if (sessionData.sessionConnection > 1) {
      sessionData.sessionConnection--;
    } else {
      req.session.orders = sessionData.orders;
      req.session.name = sessionData.name;
      req.session.save();
      delete socketRoom[userID];
    }
  });
});

////

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
