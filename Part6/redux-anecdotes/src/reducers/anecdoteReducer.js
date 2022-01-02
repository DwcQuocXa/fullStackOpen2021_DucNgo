const getId = () => (100000 * Math.random()).toFixed(0);

const reducer = (state = [], action) => {
  if (action.type === 'INIT_STATE') {
    return action.data;
  }
  if (action.type === 'VOTE') {
    const id = action.data.id;
    const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
    const anecdoteChanged = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };
    return state.map((anecdote) =>
      anecdote.id !== id ? anecdote : anecdoteChanged
    );
  }
  if (action.type === 'CREATE_NEW') {
    console.log(action.data);
    return state.concat(action.data);
  }
  return state;
};
export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  };
};
export const createNewAnecdote = (content) => {
  return {
    type: 'CREATE_NEW',
    data: {
      content,
      votes: 0,
      id: getId(),
    },
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_STATE',
    data: anecdotes,
  };
};

export default reducer;
