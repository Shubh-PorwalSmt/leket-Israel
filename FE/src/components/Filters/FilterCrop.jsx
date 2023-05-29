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
import * as data from "../../constants/filterSelection";
import ToggleFilter from "../ToggleFilter";

import TomatoIcon from '../../assets/Vegetables/TomatoIcon.png';
import CucumberIcon from '../../assets/Vegetables/CucumberIcon.png';
import PapperIcon from '../../assets/Vegetables/PapperIcon.png';
import CarrotIcon from '../../assets/Vegetables/CarrotIcon.png';
import translator from "../../Utils/translations/translator";

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
	const { product_name, setProductName } = useContext(ContextProvider);
	const { additionalProductNames, setAdditionalProductNames } = useContext(ContextProvider);

	const [rotateArrow, setRotateArrow] = useState(false);

	const onToggle = (item) => {
		if(product_name.indexOf(item) > -1) {
			setProductName(product_name.filter(c => c !== item));
		}
		else {
			setProductName([...product_name, item])
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
						{translator(additionalProductNames.length === 1 ? additionalProductNames[0] : `נבחרו ${additionalProductNames.length}`)}
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
					items={data.product_nameOptions}
					displayTag={displayTag}
					product_name={product_name}
					setProductName={setProductName}
					setOptions={setAdditionalProductNames}
					options={additionalProductNames}
					rotateArrow={rotateArrow}
					setRotateArrow={setRotateArrow}
				/>

				<ToggleFilter checked={product_name && product_name.indexOf('TOMATO') > -1} onToggle={() => onToggle('TOMATO')} icon={TomatoIcon}>{translator('TOMATO')}</ToggleFilter>
				<ToggleFilter checked={product_name && product_name.indexOf('CUCUMBER') > -1} onToggle={() => onToggle('CUCUMBER')} icon={CucumberIcon}>{translator('CUCUMBER')}</ToggleFilter>
				<ToggleFilter checked={product_name && product_name.indexOf('GAMBA') > -1} onToggle={() => onToggle('GAMBA')} icon={PapperIcon}>{translator('GAMBA')}</ToggleFilter>
				<ToggleFilter checked={product_name && product_name.indexOf('CARROT') > -1} onToggle={() => onToggle('CARROT')} icon={CarrotIcon}>{translator('CARROT')}</ToggleFilter>
			</Grid>
		</Box>
	);
};

export default FilterCrop;
