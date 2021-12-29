//import Blog from "../models/blogSchema.js";
const Blog = require("../models/blogSchema");

const create = async (blog) => {
  return blog.save();
};

const findAll = async () => {
  return await Blog.find({}).populate("user", { username: 1, name: 1 });
};

const findById = async (blogId) => {
  return await Blog.findById(blogId);
};

const update = async (blogId, update) => {
  return await Blog.findByIdAndUpdate(blogId, update, {
    new: true,
  });
};

const deleteBlog = async (blogId) => {
  return Blog.findByIdAndRemove(blogId);
};

module.exports = { findAll, create, findById, update, deleteBlog };
