import * as fieldService from './service'

export const saveNewField = (field) => {
	return async (dispatch) => {
		await fieldService.saveNewField(field);
	};
};
