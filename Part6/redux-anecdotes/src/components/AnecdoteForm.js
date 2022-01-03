import React from 'react';
import { connect } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { setNoti } from '../reducers/notiReducer';

function AnecdoteForm({ createNewAnecdote, setNoti }) {
  const addNewNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    createNewAnecdote(content);
    setNoti('New anecdote was add', 3000);
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

const mapStateToProps = () => {};

const mapDispatchToState = {
  createNewAnecdote,
  setNoti,
};

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToState
)(AnecdoteForm);

export default ConnectedAnecdoteForm;
