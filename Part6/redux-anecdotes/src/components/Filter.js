import React from 'react';
import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

function Filter() {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(filterChange(e.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter
      <input onChange={handleChange} />
    </div>
  );
}

export default Filter;
