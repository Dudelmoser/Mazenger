/* eslint consistent-return:0 */

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const logger = require('./logger');
const login = require('facebook-chat-api');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;

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
  sendMessage: "messageSent",
  listen: "updateReceived",
};

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

server.listen(80);

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

    socket.emit("loginPassed", {currentUserID: api.getCurrentUserID(), appState: api.getAppState()});
    api.setOptions({listenEvents: true, selfListen: true, logLevel: "silent"});

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
