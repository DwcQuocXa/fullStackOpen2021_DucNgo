const Blog = require("../models/blogSchema");

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

const nonExistingId = async () => {
  const item = new Blog({
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 20,
  });
  await item.save();
  await item.remove();

  return item._id.toString();
};

const blogsInDb = async () => {
  const blog = await Blog.find({});
  return blog.map((note) => note.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
