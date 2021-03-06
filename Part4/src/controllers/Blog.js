// import Blog from "../models/blogSchema.js";
//import BlogService from "../services/Blog.js";
// import logger from "../utils/logger.js";
const jwt = require('jsonwebtoken');
const Blog = require('../models/blogSchema');
const BlogService = require('../services/Blog');
const logger = require('../utils/logger');
const config = require('../utils/config');
const User = require('../models/userSchema');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const createBlog = async (req, res, next) => {
  try {
    const { title, url, likes, author } = req.body;

    const token = req.token;
    const user = req.user;

    console.log('token new blog', token);
    console.log('user new blog', user);

    if (!token) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    logger.info(title);

    const newBlog = new Blog({
      title,
      url,
      likes,
      author,
      user: user._id,
    });

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
    if (!req.token || !req.decodedToken) {
      return res.status(401).json({ error: 'missing or invalid token' });
    }

    const blog = await Blog.findById(req.params.id);
    const user = req.user;

    console.log('blog', blog);
    console.log('user', user);

    if (blog.user.toString() !== user._id.toString()) {
      res.status(400).end();
    }
    await BlogService.deleteBlog(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = { findAll, createBlog, findById, updateBlog, deleteBlog };
