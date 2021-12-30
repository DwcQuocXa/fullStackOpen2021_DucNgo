import React, { useState, useEffect } from 'react';
import Blog from './components/Blogs';
import blogsService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import ToggleTable from './components/ToggleTable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ type: '', content: '' });

  useEffect(() => {
    blogsService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log(user);
      window.localStorage.setItem('user', JSON.stringify(user));
      blogsService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setMessage({ type: 'noti', content: 'Logged' });
      setTimeout(() => {
        setMessage({ type: '', content: '' });
      }, 3000);
    } catch (exception) {
      setMessage({ type: 'error', content: 'Wrong credentials' });
      setTimeout(() => {
        setMessage({ type: '', content: '' });
      }, 3000);
    }
  };

  const addBlog = (newBlog) => {
    blogsService
      .create(newBlog)
      .then((newBlog) => {
        setBlogs(blogs.concat(newBlog));
        setMessage({ type: 'noti', content: 'new blog added' });
      })
      .catch((error) =>
        setMessage({ type: 'error', content: `invalid input ${error}` })
      );

    setTimeout(() => {
      setMessage({ type: '', content: '' });
    }, 3000);
  };

  const logout = () => {
    setUser(null);
    setMessage({ type: 'noti', content: 'Log out' });
    setTimeout(() => {
      setMessage({ type: '', content: '' });
    }, 3000);

    window.localStorage.removeItem('user');
  };

  const handleAddLikes = (blog) => {
    if (blog) {
      const newObject = blog;
      newObject.likes++;
      blogsService
        .update(blog.id, newObject)
        .then(() => blogsService.getAll().then((blogs) => setBlogs(blogs)));
    }
  };

  const handleDelete = (blog) => {
    if (blog) {
      window.confirm('Do you want to delete this blog?') &&
        blogsService
          .deleteBlog(blog.id)
          .then(() => blogsService.getAll().then((blogs) => setBlogs(blogs)));
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      {!user ? (
        <ToggleTable buttonLable='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </ToggleTable>
      ) : (
        <div>
          <h3>{user.username} logged in</h3>
          <button onClick={logout}>Logout</button>
          <ToggleTable buttonLable='Create new blog'>
            <BlogForm addBlog={addBlog} />
          </ToggleTable>
          <Blog
            blogs={blogs}
            handleAddLikes={handleAddLikes}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default App;
