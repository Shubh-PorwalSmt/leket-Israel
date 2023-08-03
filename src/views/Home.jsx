import React, {useEffect, useContext, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as fieldActions from '../redux/Field/actions';
import ContextProvider from "../hooks/ContextApi";
import { Grid } from "@mui/material";
import SortPanel from '../components/Sorters/SortPanel'
import DataPanel from "../components/DataPanel/DataPanel";
import moment from 'moment';
import {DATE_FORMAT} from "../Utils/constants";

const Home = () => {
	const [loading, setLoading] = useState(true);
	const { mode } = useContext(ContextProvider);
	const { sortMethod } = useContext(ContextProvider);
	const { mapZoom } = useContext(ContextProvider);
	const { polygonFilter } = useContext(ContextProvider);
	const { product_name } = useContext(ContextProvider);
	const { additionalProductNames } = useContext(ContextProvider);
	const { optionRegion } = useContext(ContextProvider);
	const { optionCareStatus } = useContext(ContextProvider);
	const { optionFamiliarityStatus } = useContext(ContextProvider);
	const { optionMoreFilters } = useContext(ContextProvider);
	const { debouncedSearchText } = useContext(ContextProvider);
	const { page } = useContext(ContextProvider);
	const { pageSize } = useContext(ContextProvider);

	const dispatch = useDispatch();
	const fields = useSelector(state => state.field.fields);
	const fieldsLoaded = useSelector(state => state.field.fieldsLoaded);

	// update loading state when fieldsLoaded changes to true.
	useEffect(() => {
		setLoading(!fieldsLoaded);
	}, [fieldsLoaded]);

	useEffect(() => {
		const load = async () => {
			// const filterAttractivenessRange = { attractionFrom: optionMoreFilters.attractionFrom, attractionTo: optionMoreFilters.attractionTo };
			const dateFrom = moment(optionMoreFilters.dateFrom, DATE_FORMAT).toDate();
			const dateTo = moment(optionMoreFilters.dateTo, DATE_FORMAT).toDate();
			const filterDateRange = { dateFrom, dateTo };

			const filters = {
				prefixName: debouncedSearchText,
				products: [...product_name, ...additionalProductNames],
				regions: optionRegion && optionRegion[0] === 'ALL' ? [] : optionRegion,
				careStatuses: optionCareStatus && optionCareStatus[0] === 'ALL' ? [] : optionCareStatus,
				familiarities: optionFamiliarityStatus && optionFamiliarityStatus[0] === 'ALL' ? [] : optionFamiliarityStatus,
				filterDateRange,
				polygonFilter,
				mapZoom,
				sortBy: sortMethod[0].field,
				sortDir: sortMethod[0].dir,
				page,
				pageSize
			};

			if(optionMoreFilters.ndviFrom > 0 || optionMoreFilters.ndviTo < 1) {
				filters.filterNdviRange = { ndviFrom: optionMoreFilters.ndviFrom, ndviTo: optionMoreFilters.ndviTo };
			}

			await dispatch(fieldActions.loadFields(filters, mode))
		};
		load();
	}, [debouncedSearchText, product_name, polygonFilter, mapZoom, optionRegion, optionCareStatus, optionFamiliarityStatus, additionalProductNames, optionMoreFilters, sortMethod, page, pageSize, mode]);

	return (
		<Grid container display="grid" marginTop="3%" sx={{ paddingLeft: '40px', paddingRight: '40px' }}>
			<SortPanel />
			{ !loading && fields && <DataPanel fields={fields || []} /> }
		</Grid>
	);
};

export default Home;
