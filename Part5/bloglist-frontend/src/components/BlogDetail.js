import React, { useState } from 'react';

function BlogDetail({ blog, handleAddLikes, handleDelete, user }) {
  const [visible, setVisible] = useState(false);
  const showWhenInVisible = { display: visible ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div className='blogInfo'>
        {blog.title} {blog.author}
      </div>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'Hide' : 'View'}
      </button>
      <div style={showWhenInVisible} className='blogInfoExpand'>
        <p>{blog.url}</p>
        <span>{blog.likes}</span>
        <button className='like-btn' onClick={() => handleAddLikes(blog)}>
          like
        </button>
        <p>{blog.user ? blog.user.username : null}</p>
        <button
          onClick={() => handleDelete(blog)}
          style={{
            display: blog.user.username === user.username ? '' : 'none',
          }}
        >
          remove
        </button>
      </div>
    </div>
  );
}

export default BlogDetail;
