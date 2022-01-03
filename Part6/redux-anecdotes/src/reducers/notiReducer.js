const notiReducer = (state = '', action) => {
  if (action.type === 'CLEAR NOTI') {
    return (state = '');
  }
  if (action.type === 'NOTIFICATION') {
    clearTimeout(action.delay);
    return (state = action.data.message);
  }
  return state;
};
export const setNoti = (content, delay) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFICATION',
      data: {
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
