import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ addBlog }) => {
  const [inputBlog, setInputBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: '',
  });
  const handleChange = (event) => {
    setInputBlog({ ...inputBlog, [event.target.name]: event.target.value });
  };

  const handleSumbitBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: inputBlog.title,
      author: inputBlog.author,
      url: inputBlog.url,
      likes: inputBlog.likes,
    };
    console.log(newBlog);
    addBlog(newBlog);
    setInputBlog({ title: '', author: '', url: '', likes: '' });
  };
  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSumbitBlog}>
        <div>
          title:
          <input onChange={handleChange} value={inputBlog.title} name='title' />
        </div>
        <div>
          author:
          <input
            onChange={handleChange}
            value={inputBlog.author}
            name='author'
          />
        </div>
        <div>
          url:
          <input onChange={handleChange} value={inputBlog.url} name='url' />
        </div>
        <div>
          likes:
          <input onChange={handleChange} value={inputBlog.likes} name='likes' />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};
