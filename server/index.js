const path = require("path");
const app = require("express")();
const logger = require("./logger");
const setup = require("./middleware");
const proxy = require("./proxy");
const isDev = process.env.NODE_ENV !== "production";
const argv = require("minimist")(process.argv.slice(2));
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require("ngrok") : null;

// manually set these paths in production instead of relying on webpack
setup(app, {
  outputPath: path.resolve(process.cwd(), "build"),
  publicPath: "/",
});

// get host and port number from args or
// use localhost and port 3000 if not provided
const host = argv.host || process.env.HOST || null;
const port = argv.port || process.env.PORT || 3000;

// start your app
const server = require("http").Server(app);
const io = require("socket.io")(server);
server.listen(port, host, (err) => {
  if (err) return logger.error(err.message);
  // connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr)
        return logger.error(innerErr);
      logger.appStarted(port, host || "localhost", url);
    });
  } else {
    logger.appStarted(port);
  }
});

proxy(app, io);
