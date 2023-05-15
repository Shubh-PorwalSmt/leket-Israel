import React from 'react';
import { TextField, Typography, Grid } from "@mui/material";
import CustomDropdown from "./CustomDropdown";
import ErrorMessage from './ErrorMessage';
import * as data from "../../constants/filterSelection";

const Step2 = (props) => {
	const {cropKind, fieldKind, agriculturalNumber, area, acquaintanceMode, onChangeField, error} = props;

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
		>
			<CustomDropdown
				label="סוג יבול"
				value={cropKind}
				options={data.cropKindOptions}
				onChange={value => onChangeField('cropKind', value)}
			/>
			{ error && error.name === 'cropKind' && <ErrorMessage text={error.text} /> }

			<CustomDropdown
				label="סוג שטח"
				value={fieldKind}
				options={data.cropKindOptions}
				onChange={value => onChangeField('fieldKind', value)}
			/>
			{ error && error.name === 'fieldKind' && <ErrorMessage text={error.text} /> }

			<TextField
				variant="standard"
				required
				error={error != null && error.name === 'agriculturalNumber'}
				label="מספר חקלאי"
				value={agriculturalNumber}
				onChange={e => onChangeField('agriculturalNumber', e.target.value)}
			/>
			{ error && error.name === 'agriculturalNumber' && <ErrorMessage text={error.text} /> }

			<CustomDropdown
				label="איזור"
				value={area}
				options={data.areaOptions}
				onChange={value => onChangeField('area', value)}
			/>
			{ error && error.name === 'area' && <ErrorMessage text={error.text} /> }

			<CustomDropdown
				label="מצב היכרות"
				value={acquaintanceMode}
				options={data.acquaintanceModeOptions}
				onChange={value => onChangeField('acquaintanceMode', value)}
			/>
		</Grid>
	);
};

export default Step2;
