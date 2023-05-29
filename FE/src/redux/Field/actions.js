import * as fieldService from './service'
import * as actionTypes from './actionTypes';
import {showToast} from "../../Utils/general";

export const loadFields = (filters) => {
	return async (dispatch) => {
		const data = await fieldService.loadFields(filters);

		dispatch({
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
			data: newField
		})
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

export const saveExistingField = (field) => {
	return async (dispatch) => {
		await fieldService.saveExistingField(field);
	};
};

export const saveFieldStatus = (status) => {
	return async (dispatch) => {
		await fieldService.saveFieldStatus(status);
	};
};
