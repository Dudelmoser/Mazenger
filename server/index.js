/* eslint consistent-return:0 */

const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const logger = require('./logger');
const login = require('facebook-chat-api');
const fs = require('fs');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const path = require('path');

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

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: path.resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

server.listen(80);

// replace with a private url?
const pubDir = "static";
app.use(express.static(path.join(__dirname, pubDir)));

function saveImageForURL(dataURL, userID) {
  const relPath = "/" + userID + "/" + new Date().getTime() + ".jpg";
  let buffer = new Buffer(dataURL.split(",")[1], "base64");

  ensureDirectoryExistence(pubDir + relPath);
  fs.writeFileSync(pubDir + relPath, buffer);                     // add support for multiple users
  return relPath;
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

////////////// in /internals/webpack/webpack.dev.babel.js //////////////
////////////////////////////////////////////////////////////////////////
// const CopyWebpackPlugin = require('copy-webpack-plugin');      // ADD
//
// const plugins = [
//   new webpack.HotModuleReplacementPlugin(),
//   new webpack.NoErrorsPlugin(),
//   new HtmlWebpackPlugin({
//     inject: true,
//     templateContent: templateContent(),
//   }),
//   new CopyWebpackPlugin([{ from: 'static' }]),                 // ADD
// ];
////////////////////////////////////////////////////////////////////////

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
});

io.on('connection', function (socket) {
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

    api.setOptions({listenEvents: true, selfListen: true, logLevel: "silent"});

    const userID = api.getCurrentUserID();
    const appState = api.getAppState();
    socket.emit("loginPassed", {currentUserID: userID, appState: appState});

    socket.on("uploadImage", function(req) {
      socket.emit("imageUploaded", saveImageForURL(req, userID));
    });

    socket.on("sendMessage", function(req) {
      console.log(req);
      let msg = {}
      if (req.args && req.args[0]) {
        msg.body = req.args[0].body;

        let dataURL = req.args[0].attachment;
        let buffer = new Buffer(dataURL.split(",")[1], "base64");
        fs.writeFileSync("meme.jpg", buffer);                     // add support for multiple users

        msg.attachment = fs.createReadStream("meme.jpg");
      }

      api.sendMessage(msg, req.args[1]);
      socket.emit("messageSent", "");
    });

    for (let evt in evtMap) {
      socket.on(evt, function(req) {
        console.log(req);
        var args = req instanceof Array ? req : [];
        args.push(function (err, res) {
          if (err) console.log(err);

          var packet = {};
          packet.data = res || {};
          packet.args = req || [];

          var event = evtMap[evt];
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
