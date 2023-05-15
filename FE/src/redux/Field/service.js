import axios from 'axios';

export const saveNewField = async (field) => {
	return { status: "ok" };

	// return axios.post(`${process.env.REACT_APP_HOST_URL}/field/save`, {field})
	// 	.then(async response => {
	// 		return response.data;
	// 	})
	// 	.catch(response => {
	// 		return null;
	// 	})
};
