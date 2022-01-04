import React from 'react';
import { useSelector } from 'react-redux';

export default function Notification() {
  const notification = useSelector((state) => state.noti);
  if (!notification.type && !notification.content) {
    return null;
  }

  return (
    <div className='error'>
      <p className={notification.type === 'error' ? 'error' : 'noti'}>
        {notification.content}
      </p>
    </div>
  );
}
