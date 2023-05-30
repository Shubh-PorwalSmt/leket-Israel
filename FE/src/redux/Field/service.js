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
	return {
		"id": 3,
		"name": "שדה 2",
		"product_name": "TOMATO",
		"farmer_id": "77238",
		"region": "SOUTH",
		"familiarity": "NOT_KNOWN",
		"familiarity_desc": null,
		"latitude": 3889,
		"longitude": 53293,
		"latest_satelite_metric": null,
		"category": null,
		"status": "ON_HOLD",
		"status_date": null,
		"delay_date": null,
		"created_date": "2023-05-29T06:47:38.799Z"
	};

	return axios.post(`${import.meta.env.VITE_BASE_API_URL}/fields/update/status`, {fieldId, status})
		.then(async response => {
			return response.data;
		})
		.catch(response => {
			return null;
		})
};
