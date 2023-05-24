import * as fieldService from './service'

export const saveNewField = (field) => {
	return async (dispatch) => {
		await fieldService.saveNewField(field);
	};
};

export const saveExistingField = (field) => {
	return async (dispatch) => {
		await fieldService.saveExistingField(field);
	};
};
