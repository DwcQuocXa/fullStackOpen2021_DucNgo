const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const helper = require("../utils/test_helper");
const Blog = require("../models/blogSchema");

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("get all blog by GET request", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("verify unique identifier property of the blog post", async () => {
  const response = await api.get("/api/blogs");
  response.body.map((item) => expect(item.id).toBeDefined());
});

test("create a new blog post by POST request", async () => {
  const blog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 20,
  };
  await api
    .post("/api/blogs")
    .send(blog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
});

test("verify if likes property is missing", async () => {
  const blog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  };
  await api
    .post("/api/blogs")
    .send(blog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
});

test("verify if title and url property is missing", async () => {
  const blog = {
    author: "Robert C. Martin",
    likes: 20,
  };
  await api.post("/api/blogs").send(blog).expect(400);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("delete a blog", async () => {
  const blogList = await helper.blogsInDb();
  await api.delete(`/api/blogs/${blogList[0].id}`).expect(200);
  const blogListAfter = await helper.blogsInDb();
  expect(blogListAfter).toHaveLength(helper.initialBlogs.length - 1);
});

test("update likes", async () => {
  const blogList = await helper.blogsInDb();
  console.log("blogList", blogList);
  const updateBlog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 2205,
  };
  await api
    .put(`/api/blogs/${blogList[0].id}`)
    .send(updateBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");
  const updatedBlog = response.body.find(
    (blog) => blog.title === "Go To Statement Considered Harmful"
  );
  console.log("update test", updatedBlog);
  expect(updatedBlog.likes).toEqual(2205);
});

afterAll(() => {
  mongoose.connection.close();
});
