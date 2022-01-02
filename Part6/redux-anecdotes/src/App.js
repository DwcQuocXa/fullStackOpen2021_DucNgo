import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNewAnecdote } from './reducers/anecdoteReducer';
import Anecdote from './components/Anecdote';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  anecdotes.sort(function (a, b) {
    return b.votes - a.votes;
  });

  const addNewNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    dispatch(createNewAnecdote(content));
  };

  console.log(anecdotes);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdote />
      <AnecdoteForm />
    </div>
  );
};

export default App;
