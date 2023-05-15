import * as actionTypes from './actionTypes';

const initialState = JSON.stringify({
});

function userReducer(state = JSON.parse(initialState), action) {
	switch (action.type) {

		default:
			return state;
	}
}

export default userReducer;
