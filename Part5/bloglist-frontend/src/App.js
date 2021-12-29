import React, { useState, useEffect } from "react";
import Blog from "./components/Blogs";
import blogsService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
const App = () => {
  const [inputBlog, setInputBlog] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ type: "", content: "" });

  useEffect(() => {
    blogsService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log(user);
      window.localStorage.setItem("C", JSON.stringify(user));
      blogsService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage({ type: "noti", content: "Logged" });
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
    } catch (exception) {
      setMessage({ type: "error", content: "Wrong credentials" });
      setTimeout(() => {
        setMessage({ type: "", content: "" });
      }, 3000);
    }
  };
  const handleChange = (event) => {
    setInputBlog({ ...inputBlog, [event.target.name]: event.target.value });
  };

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: inputBlog.title,
      author: inputBlog.author,
      url: inputBlog.url,
      likes: inputBlog.likes,
    };
    blogsService.create(newBlog).then((newBlog) => {
      setBlogs(blogs.concat(newBlog));
      setInputBlog("");
    });
    event.target.reset();
    setMessage({ type: "noti", content: "new blog added" });
    setTimeout(() => {
      setMessage({ type: "", content: "" });
    }, 3000);
  };
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        {" "}
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
  const logout = () => {
    setUser(null);
    setMessage({ type: "noti", content: "Log out" });
    setTimeout(() => {
      setMessage({ type: "", content: "" });
    }, 3000);

    window.localStorage.removeItem("user");
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h3>{user.username} logged in</h3>
          <button onClick={logout}>Logout</button>
          <BlogForm
            addBlog={addBlog}
            handleChange={handleChange}
            blogs={blogs}
          />
          <Blog blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
