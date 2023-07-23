import {toast} from 'react-toastify';
import moment from 'moment';
import {DATE_FORMAT} from "./constants";

export const validateEmail = (email) => {
	// Regular expression pattern for email validation
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Test the email against the pattern
	return emailPattern.test(email);
};

export const showToast = (msg) => {
	toast.success(msg, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
	});
};

export const showWarning = (msg) => {
	toast.warning(msg, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
	});
};

const swapPoints = points => {
	return points.map(p => {
		return [p[1], p[0]];
	});
};

export const fixFieldsGeo = (fields) => {
	fields = fields.map(field => {
		if(field.point != null && field.point !== "") {
			if(typeof field.point === 'string') {
				field.point = JSON.parse(field.point);
			}
			// field.point.coordinates = swapPoints([field.point.coordinates])[0];
		}

		if(field.polygon != null && field.polygon !== "") {
			if(typeof field.polygon === 'string') {
				field.polygon = JSON.parse(field.polygon);
			}
			// field.polygon.coordinates[0] = swapPoints(field.polygon.coordinates[0]);
		}

		return field;
	});
	return fields;
};

export const getFieldLastUpdated = (field) => {
	return moment(field.status_date || field.created_date).format(DATE_FORMAT);
};

export const arePolygonsEqual = (polygon1, polygon2) => {
	if (polygon1.length !== polygon2.length) {
		return false;
	}

	for (let i = 0; i < polygon1.length; i++) {
		if (polygon1[i].length !== polygon2[i].length) {
			return false;
		}

		for (let j = 0; j < polygon1[i].length; j++) {
			if (polygon1[i][j] !== polygon2[i][j]) {
				return false;
			}
		}
	}

	return true;
};

export const getPolygonCenter = (coordinates) => {
	let minX = Infinity;
	let maxX = -Infinity;
	let minY = Infinity;
	let maxY = -Infinity;

	// Find the minimum and maximum x and y coordinates
	for (let i = 0; i < coordinates.length; i++) {
		const [x, y] = coordinates[i];

		if (x < minX) minX = x;
		if (x > maxX) maxX = x;
		if (y < minY) minY = y;
		if (y > maxY) maxY = y;
	}

	// Calculate the center point
	let centerX = (minX + maxX) / 2;
	let centerY = (minY + maxY) / 2;

	centerX = Math.round(centerX * 1000000) / 1000000;
	centerY = Math.round(centerY * 1000000) / 1000000;

	return [centerX, centerY];
};

export const getDefaultDateFrom = () => {
	return new Date(2018, 0, 1)
};

export const getDefaultDateTo = () => {
	return new Date()
};