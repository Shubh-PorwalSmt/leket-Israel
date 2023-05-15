import axios from 'axios';

axios.interceptors.request.use(request => {
	log.info('Starting Request', request.url);
	return request;
});

axios.interceptors.response.use(response => {
	// console.log('Response:', response)
	return response;
});

export const signIn = async (user, pass) => {
	if(user === 'user' && pass === 'pass') {
		return { name: 'אלירן'};
	}
	else {
		return null;
	}

	// return axios.post(`${process.env.REACT_APP_HOST_URL}/user/login`, {user, pass})
	// 	.then(async response => {
	// 		return response.data.user;
	// 	})
	// 	.catch(response => {
	// 		return null;
	// 	})
};

export const signOut = async () => {
	return { status: 'ok' };
	// return axios.get(`${process.env.REACT_APP_HOST_URL}/user/logout`)
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