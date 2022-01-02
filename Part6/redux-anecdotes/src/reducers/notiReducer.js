const initialState = 'Notification';

const notiReducer = (state = initialState, action) => {
  if (action.type === 'VOTE_NOTI') {
    const message = action.message;
    return (state = message);
  }
  if (action.type === 'ADD') {
    const message = action.message;
    return (state = message);
  }
  return state;
};
export const voteNoti = (content) => {
  return {
    type: 'VOTE_NOTI',
    message: `You vote "${content}"`,
  };
};
export const addNoti = (content) => {
  return {
    type: 'ADD',
    message: `You add ${content}`,
  };
};
export default notiReducer;
