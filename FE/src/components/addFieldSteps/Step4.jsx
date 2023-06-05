import React from 'react';
import { TextField, Grid } from "@mui/material";
import ErrorMessage from "./ErrorMessage";

const Step4 = (props) => {
	const {xAxis, yAxis, onChangeField, error} = props;

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignContent="center"
		>
			<TextField
				variant="standard"
				required
				error={error != null && error.name === 'xAxis'}
				label="ציר X"
				value={xAxis}
				onChange={e => onChangeField('xAxis', e.target.value)}
			/>
			{ error && error.name === 'xAxis' && <ErrorMessage text={error.text} /> }

			<TextField
				variant="standard"
				required
				error={error != null && error.name === 'yAxis'}
				label="ציר Y"
				value={yAxis}
				onChange={e => onChangeField('yAxis', e.target.value)}
			/>
			{ error && error.name === 'yAxis' && <ErrorMessage text={error.text} /> }

		</Grid>
	);
};

export default Step4;
