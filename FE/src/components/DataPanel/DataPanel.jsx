import React from 'react';
import {useContext} from "react";
import ContextProvider from "../../hooks/ContextApi";
import DataTable from "./DataTable";
import FieldMap from "../Map/FieldMap";
import useApi from "../../hooks/useApi";
import {data as originalRows} from "../../constants/mockGridData";

const DataPanel = () => {
	const { searchText } = useContext(ContextProvider);
	const { mode } = useContext(ContextProvider);
	const { sortMethod } = useContext(ContextProvider);
	const { product_name } = useContext(ContextProvider);
	const { moreproduct_names } = useContext(ContextProvider);
	const { optionRegion } = useContext(ContextProvider);
	const { optionCareStatus } = useContext(ContextProvider);
	const { optionMoreFilters } = useContext(ContextProvider);
	const { rows, setRows } = useContext(ContextProvider);

	const { data, error } = useApi({
		method: 'get',
		url: "/fields?limit=3&offset=0"
	});

	console.log(data);

	return (
		<>
			{mode === "grid" ? (
				<DataTable
					rows={rows}
					setRows={setRows}
					originalRows={originalRows}
					searchText={searchText}
					product_name={product_name}
					optionRegion={optionRegion}
					optionCareStatus={optionCareStatus}
					moreproduct_names={moreproduct_names}
					optionMoreFilters={optionMoreFilters}
					sortMethod={sortMethod}
				/>
			) : (
				<FieldMap
					searchText={searchText}
					product_name={product_name}
					optionRegion={optionRegion}
					optionCareStatus={optionCareStatus}
					moreproduct_names={moreproduct_names}
					optionMoreFilters={optionMoreFilters}
					sortMethod={sortMethod}
				/>
			)}
		</>
	);
};

export default DataPanel;
