import React from 'react';
import { Box, CardContent, Typography, Grid, IconButton, Link } from "@mui/material";
import { KeyboardArrowDown, Clear } from "@mui/icons-material";
import ExpandableMenu from "./ExpandableMenu";
import { useState, useContext } from "react";
import ContextProvider from "../../hooks/ContextApi";
import { data as originalRows } from "../../constants/mockGridData";
import { areaOptions } from "../../constants/filterSelection";
import { careStatusOptions } from "../../constants/filterSelection";

const areaStyle = {
	marginLeft: "45px",
	marginBottom: "20%",
	fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
};

const areaDisplayOptionStyle = {
	top: "90%",
	left: "87%",
	transform: "translate(-50%, -50%)",
	whiteSpace: "nowrap"
};

const careStyle = {
	marginLeft: "11px",
	fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
};

const MoreFilters = ({ cardText, imageStyle }) => {
	const { setRows } = useContext(ContextProvider);
	const { setProductName } = useContext(ContextProvider);
	const { setMoreproduct_names } = useContext(ContextProvider);
	const { optionRegion, setOptionRegion } = useContext(ContextProvider);
	const { optionCareStatus, setOptionCareStatus } = useContext(ContextProvider);
	const { optionMoreFilters, setOptionMoreFilters } = useContext(ContextProvider);

	const [rotateArrow1, setRotateArrow1] = useState(false);
	const [rotateArrow2, setRotateArrow2] = useState(false);
	const [rotateArrow3, setRotateArrow3] = useState(false);

	const handleClearFilters = () => {
		setRows(originalRows);
		setOptionRegion(["הכל"]);
		setOptionCareStatus(["הכל"]);
		setProductName([""]);
		setOptionMoreFilters({attractionFrom: 0, attractionTo: 1, ndviFrom: 0, ndviTo: 1, dateFrom: new Date(), dateTo: new Date()});
		setMoreproduct_names("");
	};
	console.log(optionMoreFilters);
	const TEST_SIZE = "14px";
	const MORE_FILTER_IDENTIFIER = "MoreFilters";

	const displayRegionTag = (
		<CardContent>
			<Box display="flex" position="relative" flexDirection="row">
				<KeyboardArrowDown
					style={{
						color: "green",
						alignSelf: "center",
						rotate: rotateArrow1 ? "180deg" : "0deg",
					}}
					sx={imageStyle}
				/>
				<div>
					<Typography
						component="div"
						variant="h6"
						fontSize={TEST_SIZE}
						sx={areaStyle}
					>
						אזור
					</Typography>
					<Typography
						component="div"
						variant="h6"
						position="absolute"
						fontSize={TEST_SIZE}
						fontWeight="bold"
						sx={areaDisplayOptionStyle}
					>
						{optionRegion.length === 1 ? optionRegion[0] : `נבחרו ${optionRegion.length}`}
					</Typography>
				</div>
			</Box>
		</CardContent>
	);

	const displayCareStatusTag = (
		<CardContent>
			<Box display="flex" flexDirection="row">
				<KeyboardArrowDown
					style={{
						color: "green",
						alignSelf: "center",
						rotate: rotateArrow2 ? "180deg" : "0deg",
					}}
					sx={imageStyle}
				/>
				<div>
					<Typography
						component="div"
						variant="h6"
						display="ruby"
						fontSize="14px"
						sx={careStyle}
					>
						סטטוס טיפול
					</Typography>
					<Typography
						component="div"
						variant="h6"
						fontSize={optionCareStatus === "בטיפול מ. אזור" ? "13px" : "14px"}
						fontWeight="bold"
						sx={cardText}
					>
						{optionCareStatus.length === 1 ? optionCareStatus[0] : `נבחרו ${optionCareStatus.length}`}
					</Typography>
				</div>
			</Box>
		</CardContent>
	);

	const displayMoreFiltersTag = (
		<CardContent>
			<Box display="flex" flexDirection="row">
				<KeyboardArrowDown
					style={{
						color: "green",
						alignSelf: "center",
						rotate: rotateArrow3 ? "180deg" : "0deg",
					}}
					sx={imageStyle}
				/>
				<div>
					<Typography
						component="div"
						variant="h6"
						display="ruby"
						fontSize="14px"
						sx={careStyle}
					>
						עוד מסננים
					</Typography>
					<Typography
						component="div"
						variant="h6"
						fontSize="13px"
						fontWeight="bold"
						sx={cardText}
					>
						&nbsp;
					</Typography>
				</div>
			</Box>
		</CardContent>
	);

	return (
		<Box display="flex" flexDirection="column">
			<Typography variant="h5" fontWeight="bold" fontSize="20px" sx={cardText}>
				עוד מסננים
			</Typography>
			<Grid
				container
				direction="row"
				justifyContent="flex-end"
				alignItems="center"
				columnGap={2}
				marginTop="20px"
			>
				<Link
					href="#"
					onClick={handleClearFilters}
					fontSize="16x"
					sx={{ color: "green" }}
				>
					ניקוי מסננים
				</Link>
				<Box display="flex" flexDirection="column">
					<ExpandableMenu
						isAdvanced="true"
						displayTag={displayMoreFiltersTag}
						setOptions={setOptionMoreFilters}
						options={optionMoreFilters}
						rotateArrow={rotateArrow3}
						setRotateArrow={setRotateArrow3}
					/>
				</Box>
				<Box display="flex" flexDirection="row">
					<ExpandableMenu
						identifier={MORE_FILTER_IDENTIFIER}
						items={careStatusOptions}
						displayTag={displayCareStatusTag}
						setOptions={setOptionCareStatus}
						options={optionCareStatus}
						rotateArrow={rotateArrow2}
						setRotateArrow={setRotateArrow2}
					/>
				</Box>
				<Box display="flex" flexDirection="row">
					<ExpandableMenu
						identifier={MORE_FILTER_IDENTIFIER}
						items={areaOptions}
						displayTag={displayRegionTag}
						setOptions={setOptionRegion}
						options={optionRegion}
						rotateArrow={rotateArrow1}
						setRotateArrow={setRotateArrow1}
					/>
				</Box>
			</Grid>
		</Box>
	);
};

export default MoreFilters;
