import {combineReducers} from 'redux';

import userReducer from './User/reducer';
import fieldReducer from './Field/reducer';


// Combine all the reducers
export default combineReducers({
	user: userReducer,
	field: fieldReducer
});
