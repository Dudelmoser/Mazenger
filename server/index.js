/* eslint consistent-return:0 */

const path = require("path");
const express = require("express");
const app = express();
const logger = require("./logger");
const setup = require("./middleware");
const isDev = process.env.NODE_ENV !== "production";
const argv = require("minimist")(process.argv.slice(2));
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require("ngrok") : false;
const proxy = require("./proxy");

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: path.resolve(process.cwd(), "build"),
  publicPath: "/",
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let https.Server use its default IPv6/4 host
const prettyHost = customHost || "localhost";
const port = argv.port || process.env.PORT || 3000;

const publicDir = "static";

// start your app
let server = require("http").Server(app);
const io = require("socket.io")(server);
server.listen(port, host, (err) => {
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

// app.listen(port, host, (err) => {
//   if (err)
//     return logger.error(err.message);
//
//   // Connect to ngrok in dev mode
//   if (ngrok) {
//     ngrok.connect(port, (innerErr, url) => {
//       if (innerErr)
//         return logger.error(innerErr);
//       logger.appStarted(port, prettyHost, url);
//     });
//   } else {
//     logger.appStarted(port);
//   }
// });

// replace with a private URL for a non-local server
app.use(express.static(path.join(__dirname, publicDir)));

proxy(io);
