import React, { useState, useEffect } from 'react';
import Blog from './components/Blogs';
import blogsService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import ToggleTable from './components/ToggleTable';
import { useDispatch } from 'react-redux';
import { setNoti } from '../src/reducers/notiReducer';
import { initBlogs } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

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
      dispatch(setNoti('noti', 'Logged', 3000));
    } catch (exception) {
      dispatch(setNoti('error', 'Wrong credentials', 3000));
    }
  };

  const logout = () => {
    setUser(null);
    dispatch(setNoti('noti', 'Log out', 3000));
    window.localStorage.removeItem('user');
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
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
            <BlogForm />
          </ToggleTable>
          <Blog user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
