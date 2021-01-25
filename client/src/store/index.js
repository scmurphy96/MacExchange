import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
// import { composeWithDevtools } from 'redux-devtools-extension';
import countriesReducer from './countries';
import exchangeRateReducer from './exchanges';

const reducer = combineReducers({
  countriesReducer,
  exchangeRateReducer,
});

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);

export default store;
