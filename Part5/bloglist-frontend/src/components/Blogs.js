import React from "react";
import BlogDetail from "./BlogDetail";
const Blogs = ({ blogs, handleAddLikes, handleDelete }) => {
  blogs.sort((a, b) => (a.likes > b.likes ? 1 : b.likes > a.likes ? -1 : 0));
  return (
    <div>
      {blogs.map((blog) => (
        <p key={blog.id}>
          <BlogDetail
            blog={blog}
            handleAddLikes={handleAddLikes}
            handleDelete={handleDelete}
          />
        </p>
      ))}
    </div>
  );
};

export default Blogs;
