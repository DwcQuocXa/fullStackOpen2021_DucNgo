import React from 'react';
import { addVote } from '../reducers/anecdoteReducer';
import { useDispatch, useSelector } from 'react-redux';
import { clearNoti, setNoti } from '../reducers/notiReducer';

function AnecdoteContent() {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter) {
      anecdotes = anecdotes.filter((anecdote) =>
        anecdote.content.includes(filter)
      );
    }
    return anecdotes;
  });

  anecdotes.sort(function (a, b) {
    return b.votes - a.votes;
  });
  const dispatch = useDispatch();

  const upVote = (anecdote) => {
    dispatch(addVote(anecdote));
    dispatch(setNoti(`You voted ${anecdote.content}`));
    setTimeout(() => {
      dispatch(clearNoti());
    }, 3000);
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => upVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteContent;
