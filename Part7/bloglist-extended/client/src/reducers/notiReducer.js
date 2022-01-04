const notiReducer = (state = { type: '', content: '' }, action) => {
  if (action.type === 'CLEAR NOTI') {
    return (state = { type: '', content: '' });
  }
  if (action.type === 'NOTIFICATION') {
    clearTimeout(action.delay);
    return (state = { content: action.data.content, type: action.data.type });
  }
  return state;
};
export const setNoti = (type, content, delay) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFICATION',
      data: {
        type: type,
        message: content,
        delay: setTimeout(() => {
          dispatch(clearNoti());
        }, delay),
      },
    });
  };
};
export const clearNoti = () => {
  return {
    type: 'CLEAR NOTI',
  };
};
export default notiReducer;
