import React from 'react';
import {Divider, Grid} from "@mui/material";
import Sort from "./Sort";
import FilterCrop from "../Filters/FilterCrop";
import MoreFilters from "../Filters/MoreFilters";

const cardText = {
	display: "flex",
	justifyContent: "flex-end",
	fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
};

const imageStyle = {
	display: "flex",
};

const SortPanel = () => {
	return (
		<>
			<Grid
				container
				direction="row"
				justifyContent="flex-end"
				alignItems="flex-start"
				columnGap={6}
				marginTop="5%"
			>
				<MoreFilters cardText={cardText} imageStyle={imageStyle} />
				<FilterCrop cardText={cardText} imageStyle={imageStyle} />
				<Divider orientation="vertical" light flexItem />
				<Sort cardText={cardText} />
			</Grid>
		</>
	);
};

export default SortPanel;
