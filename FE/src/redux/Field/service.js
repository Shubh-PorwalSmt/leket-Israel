import axios from 'axios';

export const loadFields = async (filters) => {
	console.log("call server");
	console.log("filters: ", filters);

	return axios.post(`${import.meta.env.VITE_BASE_API_URL}/fields/get`, filters)
		.then(async response => {
			return response.data;
		})
		.catch(response => {
			return null;
		})
};

export const saveNewField = async (field) => {
	const data = {
		"name": field.name,
		"product_name": field.product_name,
		"region": field.region,
		"farmer_id": field.farmer_id,
		"familiarity": field.familiarity,
		"latitude": parseFloat(field.xAxis),
		"longitude": parseFloat(field.yAxis),
		"status": 'NOT_IN_TREATMENT'
	};

	return axios.post(`${import.meta.env.VITE_BASE_API_URL}/fields`, data)
		.then(async response => {
			return response.data;
		})
		.catch(response => {
			return null;
		})
};

export const deleteField = async (id) => {
	return axios.delete(`${import.meta.env.VITE_BASE_API_URL}/fields/${id}`)
		.then(async response => {
			return response.data;
		})
		.catch(response => {
			return null;
		})
};

export const updateFieldStatus = async (fieldId, status) => {
	return axios.post(`${import.meta.env.VITE_BASE_API_URL}/fields/update/status/${fieldId}`, {status})
		.then(async response => {
			return response.data;
		})
		.catch(response => {
			return null;
		})
};
