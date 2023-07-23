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
				מיקום השטח:
			</Typography>
			<TextField
				variant="standard"
				error={error != null && error.name === 'xAxis'}
				label="ציר X"
				value={xAxis}
				onKeyPress={(event) => {
					const pattern = /^\d+$/;

					if (!pattern.test(event.key) && event.key !== '.' && event.key !== '-') {
						event.preventDefault();
					}
				}}
				onPaste={event => event.preventDefault()}
				onBlur={event => onChangeField('xAxis', isNaN(parseFloat(xAxis)) ? '' : parseFloat(xAxis))}
				onChange={event => onChangeField('xAxis', event.target.value)}
			/>

			<TextField
				variant="standard"
				error={error != null && error.name === 'yAxis'}
				label="ציר Y"
				value={yAxis}
				onKeyPress={(event) => {
					const pattern = /^\d+$/;

					if (!pattern.test(event.key) && event.key !== '.' && event.key !== '-') {
						event.preventDefault();
					}
				}}
				onPaste={event => event.preventDefault()}
				onBlur={event => onChangeField('yAxis', isNaN(parseFloat(yAxis)) ? '' : parseFloat(yAxis))}
				onChange={event => onChangeField('yAxis', event.target.value)}
			/>
			{ error && error.name === 'location' && <ErrorMessage text={error.text} /> }

		</Grid>
	);
};

export default Step3;
