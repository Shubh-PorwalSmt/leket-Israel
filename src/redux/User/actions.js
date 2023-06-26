import * as actionTypes from './actionTypes';
import * as userService from './service'
import axios from "axios";

export const signIn = (user, pass, rememberPassword) => {
	return async (dispatch) => {

		if(user == null || user.length < 1 || pass == null || pass.length < 1) {
			await dispatch({
				type: actionTypes.USER_SIGNED_IN_FAILED,
				data: 'empty'
			});
			return;
		}

		const token = await userService.signIn(user, pass);

		if(rememberPassword) {
			const userData = {
				user,
				token
			};

			localStorage.setItem("USER", JSON.stringify(userData));
		}

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

export const setSignedInUSer = (userData) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

	return {
		type: actionTypes.USER_SIGNED_IN,
		data: userData.user
	};
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
	localStorage.removeItem("USER");
	return async (dispatch) => {
		await userService.signOut();
		await dispatch({
			type: actionTypes.USER_SIGNED_OUT
		});
	};
};
