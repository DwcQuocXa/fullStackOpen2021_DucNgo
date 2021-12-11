import Blog from "../models/blogSchema.js";
import BlogService from "../services/Blog.js";
import logger from "../utils/logger.js";

export const createBlog = async (req, res, next) => {
  try {
    const { title, url, likes, author } = req.body;

    logger.info(title);

    const newBlog = new Blog({
      title,
      url,
      likes,
      author,
    });

    await BlogService.create(newBlog);
    res.json(newBlog);
  } catch (error) {
    next(error);
  }
};

export const findAll = async (req, res, next) => {
  try {
    res.json(await BlogService.findAll());
  } catch (error) {
    next(error);
  }
};
