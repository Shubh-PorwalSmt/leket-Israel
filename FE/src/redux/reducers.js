import {combineReducers} from 'redux';

import userReducer from './User/reducer';

// Combine all the reducers
export default combineReducers({
	user: userReducer
});
