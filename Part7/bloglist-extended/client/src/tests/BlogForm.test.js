import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import BlogForm from '../components/BlogForm';

test('create a new blog', () => {
  const createBlog = jest.fn();
  const components = render(<BlogForm createBlog={createBlog} />);
  const author = components.container.querySelector('input[name="author"]');
  const url = components.container.querySelector('input[name="url"]');
  const title = components.container.querySelector('input[name="title"]');
  const likes = components.container.querySelector('input[name="likes"]');
  const form = components.container.querySelector('form');
  fireEvent.change(author, {
    target: {
      value: 'Kim Son',
    },
  });
  fireEvent.change(title, {
    target: {
      value: 'testing blog form',
    },
  });
  fireEvent.change(url, {
    target: {
      value: 'https://www.scienceofpeople.com/how-to-be-funny/',
    },
  });
  fireEvent.change(likes, {
    target: {
      value: '12',
    },
  });
  fireEvent.submit(form);

  //expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].author).toBe('Kim Son');
});
