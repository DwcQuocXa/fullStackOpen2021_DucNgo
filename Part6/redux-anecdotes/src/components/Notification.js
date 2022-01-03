import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{props.noti}</div>;
};

const mapStateToProps = (state) => {
  return {
    noti: state.noti,
  };
};

const ConnectedNoti = connect(mapStateToProps)(Notification);

export default ConnectedNoti;
