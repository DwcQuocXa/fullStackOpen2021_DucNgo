const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'GOOD':
      state = { ...state, good: state.good + 1 };
      return state;
    case 'OK':
      return state;
    case 'BAD':
      return state;
    case 'ZERO':
      return state;
    default:
      return state;
  }
};

export const addGood = () => {
  return {
    type: 'GOOD',
  };
};

export default counterReducer;
