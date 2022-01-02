const initalState = '';
const filterReducer = (state = initalState, action) => {
  if (action.type === 'FILTER') {
    return action.data;
  }
  return state;
};
export const filterChange = (input) => {
  console.log('input');
  return {
    type: 'FILTER',
    data: input,
  };
};

export default filterReducer;
