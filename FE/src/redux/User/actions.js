import * as actionTypes from './actionTypes';
import * as userService from './service'
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

		const userData = await userService.signIn(user, pass);

		await dispatch({
			type: actionTypes.USER_SIGNED_IN_FAILED,
			data: ''
		});

		if(userData) {
			await dispatch({
				type: actionTypes.USER_SIGNED_IN,
				data: userData
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

export const signUp = (email, username, password) => {
	// UserPool.signUp(email, username, password, [], null, (err, data) => {
	// 	if (err) console.log(err);
	// 	else console.log(data);
	return async (dispatch) => {
		const userData = { name: 'אלירן'};
		await dispatch({
			type: actionTypes.USER_SIGNED_IN,
			data: userData
		});
	};
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
