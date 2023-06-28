import axios from 'axios';

export const loadFields = async (filters, mode) => {
	if(mode === "map") {
		filters.page = 0;
		filters.pageSize = 50;
	}
	else {
		filters.polygonFilter = null;
	}

	return axios.post(`${import.meta.env.VITE_BASE_API_URL}/fields/get-field-by-filter`, filters)
		.then(async response => {
			return response.data;
		})
		.catch(response => {
			return null;
		})
};

export const loadFieldHistory = async (fieldId) => {
	return axios.get(`${import.meta.env.VITE_BASE_API_URL}/histories/get-recent-20-histories-per-field/${fieldId}`)
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
		"status": 'NOT_IN_TREATMENT',
		"polygon": field.polygon,
		"point": field.point,
		"category": "OPEN_SPACE"
	};

	return axios.post(`${import.meta.env.VITE_BASE_API_URL}/fields/create`, data)
		.then(async response => {
			return response.data;
		})
		.catch(response => {
			return null;
		})
};

export const deleteField = async (id) => {
	return axios.delete(`${import.meta.env.VITE_BASE_API_URL}/fields/delete-field/${id}`)
		.then(async response => {
			return response.data;
		})
		.catch(response => {
			return null;
		})
};

export const findFieldByPoint = async (pt) => {

	const point = {
		"type": "Point",
		"coordinates": pt
	};

	return axios.post(`${import.meta.env.VITE_BASE_API_URL}/fields/get-field-by-point`, {point})
		.then(async response => {
			return response.data;
		})
		.catch(response => {
			return null;
		})
};

export const updateFieldStatus = async (fieldId, status, delayDate) => {
	const field = {
		id: fieldId,
		status
	};

	if(delayDate) {
		field.delay_date = delayDate;
	}

	return axios.patch(`${import.meta.env.VITE_BASE_API_URL}/fields/update-field/${fieldId}`, field)
		.then(async response => {
			return response.data;
		})
		.catch(response => {
			return null;
		})
};

export const updateField = async (field) => {
	return axios.patch(`${import.meta.env.VITE_BASE_API_URL}/fields/update-field/${field.id}`, field)
		.then(async response => {
			return response.data;
		})
		.catch(response => {
			return null;
		})
};

export const updateLike = async (fieldId, value) => {
	return axios.patch(`${import.meta.env.VITE_BASE_API_URL}/fields/update-field/${field.id}`, field)
		.then(async response => {
			return response.data;
		})
		.catch(response => {
			return null;
		})
};