import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root';
import thunk from 'redux-thunk';

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
);
