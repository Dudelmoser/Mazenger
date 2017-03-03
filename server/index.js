/* eslint consistent-return:0 */

const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const logger = require("./logger");
const setup = require("./frontendMiddleware");
const isDev = process.env.NODE_ENV !== "production";
const argv = require("minimist")(process.argv.slice(2));
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require("ngrok") : false;
const io = require("socket.io")(server);
const login = require("facebook-chat-api");

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// replace with a private url?
app.use(express.static(path.join(__dirname, getPublicPath())));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: path.resolve(process.cwd(), "build"),
  publicPath: "/",
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || "localhost";
const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, host, (err) => {
  if (err)
    return logger.error(err.message);

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr)
        return logger.error(innerErr);
      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port);
  }
});

// needed for socket.io
server.listen(80);

const evtMap = {
  addUserToGroup: "userAddedToGroup",
  changeArchivedStatus: "archivedStatusChanged",
  changeGroupImage: "groupImageChanged",
  changeThreadColor: "threadColorChanged",
  changeThreadEmoji: "threadEmojiChanged",
  changeNickname: "nicknameChanged",
  deleteMessage: "messageDeleted",
  getAppState: "appStateReceived",
  getCurrentUserID: "currentUserIdReceived",
  getFriendsList: "friendsListReceived",
  getThreadHistory: "threadHistoryReceived",
  getThreadInfo: "threadInfoReceived",
  getThreadList: "threadListReceived",
  deleteThread: "threadDeleted",
  getUserID: "userIDsReceived",
  getUserInfo: "userInfoReceived",
  markAsRead: "markedAsRead",
  muteThread: "threadMuted",
  removeUserFromGroup: "userRemovedFromGroup",
  resolvePhotoUrl: "photoUrlResolved",
  searchForThread: "threadFound",
  sendTypingIndicator: "typingIndicatorSent",
  setTitle: "titleSet",
  listen: "updateReceived",
};

function getPublicPath(url = "") {
  return "static" + url;
}

function createPath(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  createPath(dirname);
  fs.mkdirSync(dirname);
}

function saveDataURL(dataURL, path) {
  let buffer = new Buffer(dataURL.split(",")[1], "base64");
  createPath(path);
  fs.writeFileSync(path, buffer);
}

function getMemeURL(userID, filetype = "jpg") {
  return "/" + userID + "/" + new Date().getTime() + "." + filetype;
}

io.on("connection", function (socket) {
  console.log(socket.handshake.address + " connected");
  socket.on("login", function(req) {
    if (req.appState) {
      console.log("Logging in with session cookie..");
      login({appState: JSON.parse(req.appState)}, callback);
    } else {
      console.log("Logging in as " + req[0].email);
      login(req[0], callback);
    }
  });

  function callback(err, api) {
    if (err) {
      socket.emit("loginFailed", err);
      return console.error(err);
    }
    const userID = api.getCurrentUserID();
    const appState = api.getAppState();
    socket.emit("loginPassed", {currentUserID: userID, appState: appState});

    api.setOptions({listenEvents: true, selfListen: true, logLevel: "silent"});

    socket.on("uploadImage", function(req) {
      console.log("uploadImage");

      const url = getMemeURL(userID);
      const path = getPublicPath(url);
      saveDataURL(req, path);
      socket.emit("imageUploaded", url);
    });

    socket.on("sendMessage", function(req) {
      console.log("sendMessage");

      if (!req || !req[0] || !req[1]) {
        console.log(req);
        return;
      }

      let msg = req[0];

      if (msg.attachment) {
        const path = getPublicPath(getMemeURL(userID));
        saveDataURL(msg.attachment, path);
        msg.attachment = fs.createReadStream(path);
      }
      api.sendMessage(msg, req[1]);
      socket.emit("messageSent", req[1]);
    });

    // map api request events to api calls and their responses
    for (let evt in evtMap) {
      socket.on(evt, function(req) {
        console.log(evt, req);
        let args = req instanceof Array ? req : [];
        args.push(function (err, res) {
          if (err) console.log(err);

          let packet = {};
          packet.data = res || {};
          packet.args = req || [];

          let event = evtMap[evt];
          if (event)
            socket.emit(event, packet);
        });
        if (req) {
          try {
            api[evt].apply(this, req);
          } catch (e) {
            console.log(e);
          }
        }
      });
    }
  }

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});
