import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import anecdoteReducer from './reducers/anecdoteReducer';
import notiReducer from './reducers/notiReducer';
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  noti: notiReducer,
  filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
