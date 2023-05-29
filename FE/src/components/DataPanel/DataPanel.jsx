import React, {useContext} from 'react';
import ContextProvider from "../../hooks/ContextApi";
import DataTable from "./DataTable";
import FieldMap from "../Map/FieldMap";

const DataPanel = props => {
	const {fields} = props;
	const { searchText } = useContext(ContextProvider);
	const { mode } = useContext(ContextProvider);
	const { sortMethod } = useContext(ContextProvider);
	const { product_name } = useContext(ContextProvider);
	const { additionalProductNames } = useContext(ContextProvider);
	const { optionRegion } = useContext(ContextProvider);
	const { optionCareStatus } = useContext(ContextProvider);
	const { optionMoreFilters } = useContext(ContextProvider);

	return (
		<>
			{mode === "grid" ? (
				<DataTable
					rows={fields}
					searchText={searchText}
					product_name={product_name}
					optionRegion={optionRegion}
					optionCareStatus={optionCareStatus}
					additionalProductNames={additionalProductNames}
					optionMoreFilters={optionMoreFilters}
					sortMethod={sortMethod}
				/>
			) : (
				<FieldMap
					searchText={searchText}
					product_name={product_name}
					optionRegion={optionRegion}
					optionCareStatus={optionCareStatus}
					additionalProductNames={additionalProductNames}
					optionMoreFilters={optionMoreFilters}
					sortMethod={sortMethod}
				/>
			)}
		</>
	);
};

export default DataPanel;
