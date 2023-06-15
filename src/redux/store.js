import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const middleWares = [thunk];

const initialState = { };
const store = createStore(reducers, initialState, applyMiddleware(...middleWares));

export default store;
