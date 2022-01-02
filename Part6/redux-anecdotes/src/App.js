import React, { useEffect } from 'react';
import Anecdote from './components/Anecdote';
import AnecdoteForm from './components/AnecdoteForm';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdoteReducer';
import anecdotesServices from './services/Anecdotes';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdotesServices
      .getAll()
      .then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)));
  }, [dispatch]);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdote />
      <AnecdoteForm />
    </div>
  );
};

export default App;
