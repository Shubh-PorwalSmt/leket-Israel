import * as actionTypes from './actionTypes';

const initialState = JSON.stringify({
	fields: [],
	fieldCount: 0,
	fieldsLoaded: false
});

function fieldReducer(state = JSON.parse(initialState), action) {
	switch (action.type) {
		case actionTypes.FIELDS_LOADED: {
			return {
				...state,
				fields: action.data.fields,
				fieldCount: action.data.fieldCount,
				fieldsLoaded: true
			};
		}
		case actionTypes.ADD_NEW_FIELD: {
			return {
				...state,
				fields: [...state.fields, action.data],
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
		default:
			return state;
	}
}

export default fieldReducer;
