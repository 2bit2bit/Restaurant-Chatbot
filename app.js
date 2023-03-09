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
  expiresAfterSeconds: 60 * 60 * 24 * 14,
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: { maxAge: 60 * 60 * 24 * 14 },
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

io.on("connection", (socket) => {
  const req = socket.request;
  let navigationTree = new NavigationTree();
  const sessionData = {
    name: req.session.name || "",
    navigationTree: navigationTree,
    currentNode: navigationTree.root,
    curOrder: [],
    listStartIndex: 0,
    orders: req.session.orders || [],
  };

  socket.emit("chat message", botResponse.response(null, sessionData));

  socket.on("chat message", function (msg) {
    if (sessionData.currentNode.index === "greeting") {
      socket.emit("chat message", botResponse.response(msg, sessionData));
      socket.emit("chat message", botResponse.response(null, sessionData));
    } else {
      socket.emit("chat message", botResponse.response(msg, sessionData));
    }

    if (!Object.keys(sessionData.currentNode.children).length) {
      sessionData.currentNode = sessionData.navigationTree.start;
      sessionData.listStartIndex = 0;
      socket.emit("chat message", botResponse.response(null, sessionData));
    }
  });

  socket.on("disconnect", () => {
    req.session.orders = sessionData.orders;
    req.session.name = sessionData.name;
    req.session.save();
  });
});

////

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
