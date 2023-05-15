import React from 'react';
import { Typography } from "@mui/material";

const CustomTextPresentation = ({ header, value }) => {
	return (
		<>
			<Typography
				variant="div"
				component="div"
				dir="rtl"
				sx={{
					fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
					fontSize: "10px"
				}}
			>
				{header}
			</Typography>
			<Typography
				variant="div"
				component="h5"
				dir="rtl"
				sx={{
					fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
					fontSize: "14px"
				}}
			>
				{value}
			</Typography>
		</>
	);
};

export default CustomTextPresentation;
