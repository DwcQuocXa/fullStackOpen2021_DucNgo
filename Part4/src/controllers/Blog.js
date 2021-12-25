// import Blog from "../models/blogSchema.js";
//import BlogService from "../services/Blog.js";
// import logger from "../utils/logger.js";
const Blog = require("../models/blogSchema");
const BlogService = require("../services/Blog");
const logger = require("../utils/logger");
const User = require("../models/userSchema");

const createBlog = async (req, res, next) => {
  try {
    const { title, url, likes, author, userId } = req.body;
    const user = await User.findById(userId);

    logger.info(title);

    const newBlog = new Blog({
      title,
      url,
      likes,
      author,
      user: user._id,
    });

    // await BlogService.create(newBlog);
    // res.json(newBlog);

    const savedBlog = await BlogService.create(newBlog);

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.json(savedBlog);
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    res.json(await BlogService.findAll());
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    res.json(await BlogService.findById(req.params.blogId));
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const update = req.body;
    const blogId = req.params.blogId;
    res.json(await BlogService.update(blogId, update));
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    res.json(await BlogService.deleteBlog(req.params.blogId));
  } catch (error) {
    next(error);
  }
};

module.exports = { findAll, createBlog, findById, updateBlog, deleteBlog };
