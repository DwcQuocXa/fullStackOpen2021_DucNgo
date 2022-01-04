import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLike, deleteBlog } from '../reducers/blogReducer';

function BlogDetail({ blog, user }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const showWhenInVisible = { display: visible ? '' : 'none' };

  console.log(blog);
  console.log('user', user);

  const handleLike = () => {
    dispatch(addLike(blog));
  };
  const handleDelete = (blog) => {
    dispatch(deleteBlog(blog));
  };

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
        <button className='like-btn' onClick={() => handleLike(blog)}>
          like
        </button>
        <p>{blog.user ? blog.user.username : null}</p>
        <button
          onClick={() => handleDelete(blog)}
          style={
            {
              // display: blog.user.username === user.username ? '' : 'none',
            }
          }
        >
          remove
        </button>
      </div>
    </div>
  );
}

export default BlogDetail;
