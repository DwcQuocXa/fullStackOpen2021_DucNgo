import React from 'react';
import counterReducer, { addGood } from './reducers/reducer';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state);

  const good = () => {
    dispatch(addGood());
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button>neutral</button>
      <button>bad</button>
      <button>reset stats</button>
      <div>good {status.good}</div>
      <div>neutral</div>
      <div>bad</div>
    </div>
  );
};

export default App;
