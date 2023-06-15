import axios from 'axios';
import log from 'loglevel';

log.setLevel("error");

axios.interceptors.request.use(request => {
	log.info('Starting Request', request.url);
	return request;
});

axios.interceptors.response.use(response => {
	// console.log('Response:', response)
	return response;
});

export const signIn = async (username, password) => {
	return axios.post(`${import.meta.env.VITE_BASE_API_URL}/auth/login`, {username, password})
		.then(async response => {
			return response.data.accessToken;
		})
		.catch(response => {
			return null;
		})
};

export const signOut = async () => {
	return { status: 'ok' };
	// return axios.get(`${import.meta.env.VITE_BASE_API_URL}/user/logout`)
	// 	.then(async response => {
	// 		return response.data;
	// 	})
	// 	.catch(response => {
	// 		return null;
	// 	})
};

export const forgotPassword = async () => {
	return "ok";
};