import anecdotesServices from '../services/Anecdotes';

const reducer = (state = [], action) => {
  if (action.type === 'INIT_STATE') {
    return action.data;
  }
  if (action.type === 'VOTE') {
    const id = action.data;
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
    return state.concat(action.data);
  }
  return state;
};

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteUpdated = { ...anecdote, votes: anecdote.votes + 1 };
    const updateDb = await anecdotesServices.updateVote(anecdoteUpdated);
    dispatch({
      type: 'VOTE',
      data: updateDb.id,
    });
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdotes = await anecdotesServices.createNew(content);
    dispatch({
      type: 'CREATE_NEW',
      data: newAnecdotes,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesServices.getAll();
    dispatch({
      type: 'INIT_STATE',
      data: anecdotes,
    });
  };
};

export default reducer;
