//import express from "express";
const express = require("express");

//import { findAll, createBlog } from "../controllers/Blog.js";
const { findAll } = require("../controllers/Blog");
const { createBlog } = require("../controllers/Blog");

const router = express.Router();

router.get("/", findAll);
router.post("/", createBlog);

//export default router;
module.exports = router;
