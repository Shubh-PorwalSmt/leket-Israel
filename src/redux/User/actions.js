import * as actionTypes from './actionTypes';
import * as userService from './service'
import axios from "axios";

// import UserPool from "../../cognito/UserPool";

export const signIn = (user, pass) => {
	return async (dispatch) => {

		if(user == null || user.length < 1 || pass == null || pass.length < 1) {
			await dispatch({
				type: actionTypes.USER_SIGNED_IN_FAILED,
				data: 'empty'
			});
			return;
		}

		const token = await userService.signIn(user, pass);

		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		await dispatch({
			type: actionTypes.USER_SIGNED_IN_FAILED,
			data: ''
		});

		if(token) {
			await dispatch({
				type: actionTypes.USER_SIGNED_IN,
				data: user
			});
		}
		else {
			await dispatch({
				type: actionTypes.USER_SIGNED_IN_FAILED,
				data: 'wrong'
			});
		}
	}
};

export const signUp = (username, password) => {
	// return async (dispatch) => {
	// 	await dispatch({
	// 		type: actionTypes.USER_SIGNED_IN,
	// 		data: {username, password}
	// 	});
	// };
};

export const signOut = () => {
	return async (dispatch) => {
		await userService.signOut();
		await dispatch({
			type: actionTypes.USER_SIGNED_OUT
		});
	};
};

export const forgotPassword = email => {
	return async (dispatch) => {
		await userService.forgotPassword(email);
	};
};
