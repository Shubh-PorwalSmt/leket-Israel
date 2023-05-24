import React from 'react';
import { createContext, useState } from "react";
import { data as originalRows } from "../constants/mockGridData.json";

const ContextApi = createContext({});

export default ContextApi;

export const ContextProvider = ({ children }) => {
	const [searchText, setSearchText] = useState("");
	const [mode, setMode] = useState("grid");
	const [sortMethod, setSortMethod] = useState("");
	const [product_name, setProductName] = useState([""]);
	const [moreproduct_names, setMoreproduct_names] = useState([]);
	const [optionRegion, setOptionRegion] = useState(["הכל"]);
	const [optionCareStatus, setOptionCareStatus] = useState(["הכל"]);
	const [optionMoreFilters, setOptionMoreFilters] = useState({attractionFrom: 0, attractionTo: 1, ndviFrom: 0, ndviTo: 1, dateFrom: new Date(), dateTo: new Date()});
	const [rows, setRows] = useState(originalRows);

	return (
		<>
			<ContextApi.Provider
				value={{
					searchText,
					setSearchText,
					mode,
					setMode,
					sortMethod,
					setSortMethod,
					product_name,
					setProductName,
					moreproduct_names,
					setMoreproduct_names,
					optionRegion,
					setOptionRegion,
					optionCareStatus,
					setOptionCareStatus,
					optionMoreFilters,
					setOptionMoreFilters,
					rows,
					setRows,
				}}
			>
				{children}
			</ContextApi.Provider>
		</>
	);
};
