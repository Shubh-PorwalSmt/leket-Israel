import * as actionTypes from './actionTypes';

const initialState = JSON.stringify({
	fields: [],
	fieldsHistory: [],
	fieldCount: 0,
	fieldsLoaded: false
});

function fieldReducer(state = JSON.parse(initialState), action) {
	switch (action.type) {
		case actionTypes.LOADING_FIELDS: {
			return {
				...state,
				fieldsLoaded: false
			};
		}
		case actionTypes.FIELDS_LOADED: {
			return {
				...state,
				fields: action.data.fields,
				fieldCount: action.data.fieldCount,
				fieldsLoaded: true
			};
		}
		case actionTypes.FIELD_HISTORY_LOADED: {
			const {fieldsHistory} = state;

			if(action.data.fieldHistory && action.data.fieldHistory.length > 0) {
				let his = action.data.fieldHistory;
				his = his.sort((a, b) => new Date(b.date) - new Date(a.date));
				fieldsHistory[action.data.fieldId] = his;
			}

			return {
				...state,
				fieldsHistory
			};
		}
		case actionTypes.ADD_NEW_FIELD: {
			const f = [...state.fields, action.data];
			return {
				...state,
				fields: f,
				fieldCount: state.fieldCount + 1,
			};
		}
		case actionTypes.REMOVE_FIELD: {
			return {
				...state,
				fields: state.fields.filter(f => f.id !== action.data),
				fieldCount: state.fieldCount - 1,
			}
		}
		case actionTypes.UPDATE_FIELD: {
			const allFields = [...state.fields];
			const updatedField = action.data;
			const index = allFields.findIndex(f => f.id === updatedField.id);

			if(index > -1) {
				allFields[index] = updatedField;
			}

			return {
				...state,
				fields: allFields
			}
		}
		default:
			return state;
	}
}

export default fieldReducer;
