import React from "react";
const Blogs = ({ blogs, logout, user }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <p key={blog.id}>
          {blog.title} {blog.author}
        </p>
      ))}
    </div>
  );
};

export default Blogs;
