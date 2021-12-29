import React, { useState } from "react";

function BlogDetail({ blog, handleAddLikes, handleDelete }) {
  const [visible, setVisible] = useState(false);
  const showWhenInVisible = { display: visible ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Hide" : "View"}
      </button>
      <div style={showWhenInVisible}>
        <p>{blog.url}</p>
        <span>{blog.likes}</span>
        <button onClick={() => handleAddLikes(blog)}>like</button>
        <p>{blog.user ? blog.user.username : null}</p>
        <button onClick={() => handleDelete(blog)}>remove</button>
      </div>
    </div>
  );
}

export default BlogDetail;
