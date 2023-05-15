import * as actionTypes from './actionTypes';

const initialState = JSON.stringify({
	user: null,
	userLoginStatus: null
});

function userReducer(state = JSON.parse(initialState), action) {
	switch (action.type) {
		case actionTypes.USER_SIGNED_IN: {
			const user = action.data;
			return {
				...state,
				userLoginStatus: 'ok',
				user
			};
		}
		case actionTypes.USER_SIGNED_IN_FAILED: {
			return {
				...state,
				userLoginStatus: action.data
			};
		}
		case actionTypes.USER_SIGNED_OUT: {
			return {
				...state,
				user: null,
			};
		}
		default:
			return state;
	}
}

export default userReducer;
