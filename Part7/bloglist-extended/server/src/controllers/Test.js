const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");

const test = async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
};

module.exports = { test };
