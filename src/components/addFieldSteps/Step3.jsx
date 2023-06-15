import React from 'react';
import { Typography, TextField, Grid } from "@mui/material";
import ErrorMessage from "./ErrorMessage";

const Step3 = (props) => {
	const {xAxis, yAxis, onChangeField, error} = props;

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignContent="center"
		>
			<Typography
				variant="h5"
				component="div"
				fontSize={16}
				sx={{ color: "#6A6A6A", fontWeight: "bold" }}
			>
				מיקום השדה:
			</Typography>
			<TextField
				variant="standard"
				error={error != null && error.name === 'xAxis'}
				label="ציר X"
				value={xAxis}
				onChange={e => onChangeField('xAxis', e.target.value)}
			/>
			{ error && error.name === 'xAxis' && <ErrorMessage text={error.text} /> }

			<TextField
				variant="standard"
				error={error != null && error.name === 'yAxis'}
				label="ציר Y"
				value={yAxis}
				onChange={e => onChangeField('yAxis', e.target.value)}
			/>
			{ error && error.name === 'yAxis' && <ErrorMessage text={error.text} /> }

		</Grid>
	);
};

export default Step3;
