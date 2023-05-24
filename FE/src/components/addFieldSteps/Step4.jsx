import React from 'react';
import { TextField, Grid } from "@mui/material";
import ErrorMessage from "./ErrorMessage";

const Step4 = (props) => {
	const {xAxis, yAxis, field_number, onChangeField, error} = props;

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

			<TextField
				variant="standard"
				required
				error={error != null && error.name === 'field_number'}
				label="מספר חלקה"
				value={field_number}
				onChange={e => onChangeField('field_number', e.target.value)}
			/>
			{ error && error.name === 'field_number' && <ErrorMessage text={error.text} /> }

		</Grid>
	);
};

export default Step4;
