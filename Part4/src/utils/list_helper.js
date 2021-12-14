const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.map((blog) => blog.likes).reduce((a, c) => a + c);

const favoriteBlog = (blogs) =>
  blogs.map((blog) => blog.likes).reduce((a, c) => (a > c ? a : c));

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
