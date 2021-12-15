const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.map((blog) => blog.likes).reduce((a, c) => a + c);

const favoriteBlog = (blogs) =>
  blogs.map((blog) => blog.likes).reduce((a, c) => (a > c ? a : c));

const mostBlogs = (blogs) => {
  // const authorList = blogs.map((blog) => blog.author);
  // let maxOcc = { author: null, blog: 0 };
  // const res = authorList.reduce((acc, author) => {
  //   acc[author] = acc[author] ? acc[author] + 1 : 1;
  //   if (acc[author] > maxOcc.blog)
  //     maxOcc = { author: author, blog: acc[author] };
  // });
  // return res;
  const authorList = blogs.map((blog) => blog.author);
  let res = [];
  for (let x of authorList) {
    let count = 0;
    for (let i of authorList) {
      if (i == x) {
        count++;
      }
    }
    res.push(count);
  }
  return {
    author: authorList[res.indexOf(Math.max(...res))],
    blog: Math.max(...res),
  };
};

const authorHasMostLikes = (blogs) => {
  const res = blogs.reduce((a, c) => {
    let known = a.find((found) => {
      return found.author === c.author;
    });
    if (!known) {
      return a.concat({ author: c.author, likes: c.likes });
    }
    known.likes += c.likes;
    return a;
  }, []);
  const mostLike = (res) => res.reduce((a, c) => (a.likes > c.likes ? a : c));
  return mostLike(res);
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  authorHasMostLikes,
};
