//import express from "express";
const express = require("express");

//import { findAll, createBlog } from "../controllers/Blog.js";
const { findAll } = require("../controllers/Blog");
const { createBlog } = require("../controllers/Blog");
const { findById } = require("../controllers/Blog");
const { updateBlog } = require("../controllers/Blog");
const { deleteBlog } = require("../controllers/Blog");

const router = express.Router();

router.get("/", findAll);
router.post("/", createBlog);
router.get("/:blogId", findById);
router.put("/:blogId", updateBlog);
router.delete("/:blogId", deleteBlog);

//export default router;
module.exports = router;
