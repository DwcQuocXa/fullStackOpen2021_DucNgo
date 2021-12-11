import express from "express";

import { findAll, createBlog } from "../controllers/Blog.js";

const router = express.Router();

router.get("/", findAll);
router.post("/", createBlog);

export default router;
