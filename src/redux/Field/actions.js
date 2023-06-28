import * as fieldService from './service'
import * as actionTypes from './actionTypes';
import {fixFieldsGeo, showToast} from "../../Utils/general";

export const loadFields = (filters, mode) => {
	return async (dispatch) => {
		// await dispatch({
		// 	type: actionTypes.LOADING_FIELDS
		// });

		const data = await fieldService.loadFields(filters, mode);
		data.fields = fixFieldsGeo(data.fields);

		await dispatch({
			type: actionTypes.FIELDS_LOADED,
			data
		})
	};
};

export const saveNewField = (field) => {
	return async (dispatch) => {
		const newField = await fieldService.saveNewField(field);
		dispatch({
			type: actionTypes.ADD_NEW_FIELD,
			data: fixFieldsGeo([newField])[0]
		})
	};
};

export const loadFieldHistory = (fieldId) => {
	return async (dispatch) => {
		const fieldHistory = await fieldService.loadFieldHistory(fieldId);

		dispatch({
			type: actionTypes.FIELD_HISTORY_LOADED,
			data: {
				fieldId,
				fieldHistory
			}
		})
	};
};

export const findFieldByPoint = (point, callback) => {
	return async (dispatch) => {
		const field = await fieldService.findFieldByPoint(point);
		callback(field);
	};
};

export const deleteField = (id) => {
	return async (dispatch) => {
		const result = await fieldService.deleteField(id);

		if(result.status === "ok") {
			await dispatch({
				type: actionTypes.REMOVE_FIELD,
				data: id
			});
			showToast("השדה נמחק בהצלחה.");
		}
	};
};


export const updateFieldStatus = (fieldId, status, delayDate) => {
	return async (dispatch) => {
		const updatedField = await fieldService.updateFieldStatus(fieldId, status, delayDate);
		await dispatch({
			type: actionTypes.UPDATE_FIELD,
			data: fixFieldsGeo([updatedField])[0]
		});
	};
};

export const updateLike = (fieldId, value) => {
	return async (dispatch) => {
		const updatedField = await fieldService.updateLike(fieldId, value);

		// await dispatch({
		// 	type: actionTypes.UPDATE_FIELD,
		// 	data: fixFieldsGeo([updatedField])[0]
		// });
	};
};

export const updateField = (field, callback) => {
	return async (dispatch) => {
		const updatedField = await fieldService.updateField(field);

		await dispatch({
			type: actionTypes.UPDATE_FIELD,
			data: fixFieldsGeo([updatedField])[0]
		});

		callback && callback();
	};
};
