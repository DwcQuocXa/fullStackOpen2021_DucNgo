// import http from "http";
// import config from "./utils/config.js";
// import logger from "./utils/logger.js";
// import app from "./app.js";

const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
