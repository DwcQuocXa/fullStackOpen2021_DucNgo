import React from 'react';
import { useDispatch } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { clearNoti, setNoti } from '../reducers/notiReducer';

function AnecdoteForm() {
  const dispatch = useDispatch();
  const addNewNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    dispatch(createNewAnecdote(content));
    dispatch(setNoti('New anecdote was add'));
    setTimeout(() => {
      dispatch(clearNoti());
    }, 3000);
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewNote}>
        <div>
          <input name='note' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
