const notiReducer = (state = '', action) => {
  if (action.type === 'CLEAR NOTI') {
    return (state = '');
  }
  if (action.type === 'NOTIFICATION') {
    return (state = action.message);
  }
  return state;
};
export const setNoti = (content) => {
  return {
    type: 'NOTIFICATION',
    message: content,
  };
};
export const clearNoti = () => {
  return {
    type: 'CLEAR NOTI',
  };
};
export default notiReducer;
