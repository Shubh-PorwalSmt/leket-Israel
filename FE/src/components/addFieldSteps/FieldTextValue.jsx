import React from 'react';
import {Typography, Grid} from "@mui/material";

const FieldTextValue = ({ title, value, width }) => {
	return (
		<Grid sx={{display: 'flex', alignItems: 'center', marginBottom: 1}}>
			<Typography
				variant="div"
				component="h5"
				dir="rtl"
				sx={{
					width: `${width}px` || 'auto',
					fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
					fontSize: "14px",
					marginLeft: 2
				}}
			>
				{title}:
			</Typography>
			<Typography
				variant="div"
				dir="rtl"
				component="div"
				sx={{
					fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
					fontSize: "12px"
				}}
			>
				{value}
			</Typography>
		</Grid>
	);
};

export default FieldTextValue;
