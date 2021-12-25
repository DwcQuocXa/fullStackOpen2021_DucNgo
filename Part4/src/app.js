// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";

// import config from "./utils/config.js";
// import logger from "./utils/logger.js";
// import middleware from "./utils/middleware.js";
// import blogRouter from "./routes/Blog.js";

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogRouter = require("./routes/Blog");
const userRouter = require("./routes/User");

const app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.get("/", (req, res) => {
  res.send("Deploy successfully");
});

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

//export default app;
module.exports = app;
