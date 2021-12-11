import Blog from "../models/blogSchema.js";

const create = async (blog) => {
  return blog.save();
};
const findAll = async () => {
  return Blog.find({}).sort({ name: 1 });
};

export default {
  create,
  findAll,
};
