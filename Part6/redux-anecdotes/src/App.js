import React from 'react';
import Anecdote from './components/Anecdote';
import AnecdoteForm from './components/AnecdoteForm';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
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
