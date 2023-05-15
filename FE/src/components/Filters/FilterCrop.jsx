import React from 'react';
import {
	Box,
	CardContent,
	Typography,
	Grid,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import ExpandableMenu from "./ExpandableMenu";
import { useState, useContext } from "react";
import ContextProvider from "../../hooks/ContextApi";
import { cropKindOptions } from "../../constants/filterSelection";
import ToggleFilter from "../ToggleFilter";

import TomatoIcon from '../../assets/Vegetables/TomatoIcon.png';
import CucumberIcon from '../../assets/Vegetables/CucumberIcon.png';
import PapperIcon from '../../assets/Vegetables/PapperIcon.png';
import CarrotIcon from '../../assets/Vegetables/CarrotIcon.png';

const cropToggleBtn = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: 110,
	height: 80,
	borderRadius: "100px",
	boxShadow: "1px 1px 10px 1px #d4d4d4"
};

const toggleBtnText = {
	display: "flex",
	justifyContent: "center",
	fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
};

const FilterCrop = ({ cardText, imageStyle }) => {
	const { cropKind, setCropKind } = useContext(ContextProvider);
	const { moreCropKinds, setMoreCropKinds } = useContext(ContextProvider);

	const [rotateArrow, setRotateArrow] = useState(false);

	const handleCropSelection = (event, crop) => {
		setCropKind(crop);
	};

	const onToggle = (item) => {
		if(cropKind.indexOf(item) > -1) {
			setCropKind(cropKind.filter(c => c !== item));
		}
		else {
			setCropKind([...cropKind, item])
		}
	};

	const displayTag = (
		<CardContent>
			<Box display="flex" flexDirection="row">
				<KeyboardArrowDown
					style={{ color: "green", rotate: rotateArrow ? "180deg" : "0deg" }}
					sx={imageStyle}
				/>
				<div>
					<Typography
						component="div"
						variant="h6"
						fontSize="14px"
						sx={cardText}
					>
						עוד סוגי יבול
					</Typography>
					<Typography
						component="div"
						variant="h6"
						fontSize="14px"
						fontWeight="bold"
						sx={cardText}
					>
						{moreCropKinds.length === 1 ? moreCropKinds[0] : `נבחרו ${moreCropKinds.length}`}
					</Typography>
				</div>
			</Box>
		</CardContent>
	);

	return (
		<Box display="flex" flexDirection="column">
			<Typography variant="h5" fontSize="20px" fontWeight="bold" sx={cardText}>
				מסנן סוג יבול
			</Typography>
			<Grid
				container
				direction="row"
				justifyContent="flex-end"
				alignItems="center"
				columnGap={2}
				marginTop="20px"
			>
				<ExpandableMenu
					items={cropKindOptions}
					displayTag={displayTag}
					cropKind={cropKind}
					setCropKind={setCropKind}
					setOptions={setMoreCropKinds}
					options={moreCropKinds}
					rotateArrow={rotateArrow}
					setRotateArrow={setRotateArrow}
				/>

				<ToggleFilter checked={cropKind && cropKind.indexOf('עגבניה') > -1} onToggle={onToggle} icon={TomatoIcon}>עגבניה</ToggleFilter>
				<ToggleFilter checked={cropKind && cropKind.indexOf('מלפפון') > -1} onToggle={onToggle} icon={CucumberIcon}>מלפפון</ToggleFilter>
				<ToggleFilter checked={cropKind && cropKind.indexOf('גמבה') > -1} onToggle={onToggle} icon={PapperIcon}>גמבה</ToggleFilter>
				<ToggleFilter checked={cropKind && cropKind.indexOf('גזר') > -1} onToggle={onToggle} icon={CarrotIcon}>גזר</ToggleFilter>
			</Grid>
		</Box>
	);
};

export default FilterCrop;
