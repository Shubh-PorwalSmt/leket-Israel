import React, {useContext} from 'react';
import ContextProvider from "../../hooks/ContextApi";
import DataTable from "./DataTable";
import FieldMap from "../Map/FieldMap";

const DataPanel = props => {
	const {fields} = props;
	const { mode } = useContext(ContextProvider);

	return (
		<>
			{
				mode === "grid" ? (
					<DataTable
						rows={fields}
					/>
				) : (
					<FieldMap
						rows={fields}
					/>
				)
			}
		</>
	);
};

export default DataPanel;
