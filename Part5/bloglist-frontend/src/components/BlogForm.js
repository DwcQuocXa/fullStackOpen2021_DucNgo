import React from 'react';

const BlogForm = ({ addBlog, handleChange, blogs }) => {
  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input onChange={handleChange} value={blogs.title} name='title' />
        </div>
        <div>
          author:
          <input onChange={handleChange} value={blogs.author} name='author' />
        </div>
        <div>
          url:
          <input onChange={handleChange} value={blogs.url} name='url' />
        </div>
        <div>
          likes:
          <input onChange={handleChange} value={blogs.likes} name='likes' />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
