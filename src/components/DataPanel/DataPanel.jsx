import React, {useContext, useState} from 'react';
import ContextProvider from "../../hooks/ContextApi";
import DataTable from "./DataTable";
import FieldMap from "../Map/FieldMap";
import AddField from "../../views/AddField";

const DataPanel = props => {
	const [showAddField, setShowAddField] = useState(false);
	const {fields} = props;
	const { mode } = useContext(ContextProvider);

	return (
		<>
			{ showAddField && <AddField onClose={() => setShowAddField(false)} /> }

			{
				mode === "grid" ?
					<DataTable rows={fields} onAddField={() => setShowAddField(true)} />
					:
					<FieldMap rows={fields} onAddField={() => setShowAddField(true)} />
			}
		</>
	);
};

export default DataPanel;
