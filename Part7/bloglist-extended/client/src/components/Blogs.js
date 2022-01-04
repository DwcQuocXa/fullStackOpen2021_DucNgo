import React from 'react';
import BlogDetail from './BlogDetail';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  blogs.sort((a, b) => (a.likes > b.likes ? 1 : b.likes > a.likes ? -1 : 0));
  return (
    <div>
      {blogs.map((blog) => (
        <p key={blog.id}>
          <BlogDetail blog={blog} user={user} />
        </p>
      ))}
    </div>
  );
};

export default Blogs;

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleAddLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
