import React from 'react';
import {Box, CardContent, Typography} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import SortMenu from "../Filters/SortMenu";
import {useContext, useState} from "react";
import sortIcon from '../../assets/filters/sort-icon.png';
import ContextProvider from "../../hooks/ContextApi";
import sortOptions from "../../constants/sortSelection";

const Sort = ({ cardText }) => {
	const { sortMethod, setSortMethod } = useContext(ContextProvider);

	const [rotateArrow, setRotateArrow] = useState(false);

	const displayTag = (
		<CardContent>
			<Box display="flex" flexDirection="row">
				<KeyboardArrowDown
					style={{
						color: "green",
						alignSelf: "center",
						rotate: rotateArrow ? "180deg" : "0deg",
					}}
				/>
				<div>
					<Typography
						component="div"
						variant="h6"
						display="ruby"
						fontSize="16px"
						sx={cardText}
					>
						מסודר לפי
					</Typography>
					<Typography
						component="div"
						variant="h6"
						fontSize="14px"
						fontWeight="bold"
						sx={cardText}
					>
						<div style={{direction: 'rtl'}}>
							{sortMethod && sortMethod[0].label}
							{ sortMethod && sortMethod[0].dir && <img src={sortIcon} style={{padding: '0 5px', height: '14px', transform: sortMethod[0].dir === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)'}} alt="" /> }
						</div>
					</Typography>
				</div>
			</Box>
		</CardContent>
	);

	return (
		<Box display="flex" flexDirection="column" marginTop="0.4%">
			<Typography
				variant="h5"
				fontSize="20px"
				fontWeight="bold"
				marginBottom="10%"
				sx={cardText}
			>
				מיון
			</Typography>
			<SortMenu
				items={sortOptions}
				displayTag={displayTag}
				setOptions={setSortMethod}
				options={sortMethod}
				rotateArrow={rotateArrow}
				setRotateArrow={setRotateArrow}
			/>
		</Box>
	);
};

export default Sort;
