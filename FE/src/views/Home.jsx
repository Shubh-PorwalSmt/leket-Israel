import React from 'react';
import { Grid } from "@mui/material";
import SortPanel from '../components/Sorters/SortPanel'
import DataPanel from "../components/DataPanel/DataPanel";

const Home = () => {
	return (
		<Grid container display="grid" marginTop="3%" sx={{ paddingLeft: 7, paddingRight: 7 }}>
			<SortPanel />
			<DataPanel />
		</Grid>
	);
};

export default Home;
