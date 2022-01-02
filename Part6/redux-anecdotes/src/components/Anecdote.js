import React from 'react';
import { addVote } from '../reducers/anecdoteReducer';
import { useDispatch, useSelector } from 'react-redux';

function AnecdoteContent() {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const upVote = (id) => {
    dispatch(addVote(id));
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => upVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteContent;
