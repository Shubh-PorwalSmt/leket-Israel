import React from 'react';
import { TextField, Typography, Grid } from "@mui/material";
import CustomDropdown from "./CustomDropdown";
import ErrorMessage from './ErrorMessage';
import * as data from "../../constants/filterSelection";

const Step2 = (props) => {
	const {product_name, product_kind, farmer_id, region, familiarity, onChangeField, error} = props;

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
		>
			<CustomDropdown
				label="סוג יבול"
				value={product_name}
				options={data.product_nameOptions}
				onChange={value => onChangeField('product_name', value)}
			/>
			{ error && error.name === 'product_name' && <ErrorMessage text={error.text} /> }

			<CustomDropdown
				label="סוג שטח"
				value={product_kind}
				options={data.product_nameOptions}
				onChange={value => onChangeField('product_kind', value)}
			/>
			{ error && error.name === 'product_kind' && <ErrorMessage text={error.text} /> }

			<TextField
				variant="standard"
				required
				error={error != null && error.name === 'farmer_id'}
				label="מספר חקלאי"
				value={farmer_id}
				onChange={e => onChangeField('farmer_id', e.target.value)}
			/>
			{ error && error.name === 'farmer_id' && <ErrorMessage text={error.text} /> }

			<CustomDropdown
				label="איזור"
				value={region}
				options={data.areaOptions}
				onChange={value => onChangeField('region', value)}
			/>
			{ error && error.name === 'region' && <ErrorMessage text={error.text} /> }

			<CustomDropdown
				label="מצב היכרות"
				value={familiarity}
				options={data.familiarityOptions}
				onChange={value => onChangeField('familiarity', value)}
			/>
		</Grid>
	);
};

export default Step2;
