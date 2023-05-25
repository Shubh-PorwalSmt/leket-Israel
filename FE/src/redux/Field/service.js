import axios from 'axios';

export const saveNewField = async (field) => {
	return { status: "Field created" };

	// return axios.post(`${process.env.REACT_APP_HOST_URL}/field/save`, {field})
	// 	.then(async response => {
	// 		return response.data;
	// 	})
	// 	.catch(response => {
	// 		return null;
	// 	})
};

export const saveExistingField = async (field) => {
	console.log(field);
	return { status: "Existing field saved!" };

	// return axios.post(`${process.env.REACT_APP_HOST_URL}/field/detailsave`, {field})
	// 	.then(async response => {
	// 		return response.data;
	// 	})
	// 	.catch(response => {
	// 		return null;
	// 	})
};

export const saveFieldStatus = async (status) => {
	console.log(status);
	return { status: "Status saved!" };

	// return axios.post(`${process.env.REACT_APP_HOST_URL}/field/detailsave`, {field})
	// 	.then(async response => {
	// 		return response.data;
	// 	})
	// 	.catch(response => {
	// 		return null;
	// 	})
};
