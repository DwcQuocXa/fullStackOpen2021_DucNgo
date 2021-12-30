import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import BlogDetail from '../components/BlogDetail';

describe('check content rendered', () => {
  let component;
  const handleAddLikes = jest.fn();
  beforeEach(() => {
    const blog = {
      author: 'Kim Son',
      title: 'How to be funny',
      url: 'https://www.scienceofpeople.com/how-to-be-funny/',
      likes: '12',
    };
    component = render(
      <BlogDetail blog={blog} handleAddLikes={handleAddLikes} />
    );
  });

  test('renders authors and title', () => {
    const blogInfo = component.container.querySelector('.blogInfo');
    expect(blogInfo).toHaveTextContent('How to be funny Kim Son');
  });

  test('url and likes are invisible', () => {
    const blogInfoExpand = component.container.querySelector('.blogInfoExpand');
    expect(blogInfoExpand).toHaveStyle('display: none');
  });

  test('after clicking the button, url and likes are shown', () => {
    const button = component.getByText('View');
    fireEvent.click(button);
    const div = component.container.querySelector('.blogInfoExpand');
    component.debug();
    expect(div).not.toHaveStyle('display: none');
  });

  test('press likes twice, props called twice', () => {
    const buttonView = component.getByText('View');
    fireEvent.click(buttonView);
    const buttonLike = component.getByText('like');

    fireEvent.click(buttonLike);
    fireEvent.click(buttonLike);
    expect(handleAddLikes.mock.calls).toHaveLength(2);
  });
});
