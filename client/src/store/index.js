import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevtools } from 'redux-devtools-extension';
import countriesReducer from './countries';

const reducer = combineReducers({
  countriesReducer,
});
const middleWare = composeWithDevtools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleWare);

export default store;
