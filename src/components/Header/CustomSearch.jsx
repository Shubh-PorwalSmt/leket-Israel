import React from 'react';
import {Card, IconButton, InputBase} from "@mui/material";
import {Search} from "@mui/icons-material";

const searchStyle = {
	borderRadius: "12px",
	marginLeft: "24px",
	color: "#3A6E47",
	".css-zylse7-MuiButtonBase-root-MuiIconButton-root:hover": {
		backgroundColor: "white",
	},
};

const inputSearchStyle = {
	".css-yz9k0d-MuiInputBase-input": {
		padding: "0 4px",
		width: "200px",
		color: "#636363",
	},
};
const CustomSearch = ({ setSearchText }) => {
	const handleSearchBarChange = (e) => setSearchText(e.target.value);

	return (
		<Card sx={searchStyle}>
			<IconButton color="inherit">
				<Search />
			</IconButton>
			<InputBase
				sx={inputSearchStyle}
				dir="rtl"
				onChange={handleSearchBarChange}
				placeholder="הקלד שם שטח או מספר חקלאי"
			/>
		</Card>
	);
};

export default CustomSearch;
