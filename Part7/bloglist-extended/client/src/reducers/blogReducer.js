/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import blogsService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITBLOGS':
      return (state = action.data);
    case 'LIKE':
      const id = action.data;
      const findBlogToChange = state.find((blog) => blog.id === id);
      const blogUpdated = {
        ...findBlogToChange,
        likes: findBlogToChange.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : blogUpdated));
    case 'CREATE_NEW':
      return (state = action.data);
    case 'DELETE_BLOG':
      return (state = action.data);
    default:
      return state;
  }
};
export const initBlogs = () => {
  return async (dispatch) => {
    const initBlogs = await blogsService.getAll();
    dispatch({
      type: 'INITBLOGS',
      data: initBlogs,
    });
  };
};

export const addLike = (blog) => {
  return async (dispatch) => {
    const blogUpdated = { ...blog, likes: blog.likes + 1 };
    const updateDb = await blogsService.update(blogUpdated);
    dispatch({
      type: 'LIKE',
      data: updateDb.id,
    });
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    await blogsService.create(blog);
    const newBlog = await blogsService.getAll();
    dispatch({
      type: 'CREATE_NEW',
      data: newBlog,
    });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    if (window.confirm('Do you want to delete this blog?')) {
      await blogsService.deleteRequest(blog.id);
      const reloadBlogs = await blogsService.getAll();
      dispatch({
        type: 'DELETE_BLOG',
        data: reloadBlogs,
      });
    }
  };
};
export default blogReducer;
