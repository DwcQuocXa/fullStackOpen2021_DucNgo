import React from 'react';
import { useDispatch } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { addNoti } from '../reducers/notiReducer';

function AnecdoteForm() {
  const dispatch = useDispatch();
  const addNewNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    dispatch(createNewAnecdote(content));
    dispatch(addNoti('New anecdote was add'));
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
