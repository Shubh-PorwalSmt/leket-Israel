import React from 'react';
import {Grid} from "@mui/material";
import FieldTextValue from "./FieldTextValue";

const Step5 = (props) => {
	const {field} = props;

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignContent="center"
		>
			<FieldTextValue title="שם השדה" value={field.name} />
			<FieldTextValue title="סוג היבול" value={field.product_name} />
			<FieldTextValue title="סוג שטח" value={field.product_kind} />
			<FieldTextValue title="מספר חקלאי" value={field.farmer_id} />
			<FieldTextValue title="איזור" value={field.region} />
			<FieldTextValue title="מצב היכרות" value={field.familiarity} />
			<FieldTextValue title="ציר X" value={field.xAxis} />
			<FieldTextValue title="ציר Y" value={field.yAxis} />
			<FieldTextValue title="מספר חלקה" value={field.field_number} />
		</Grid>
	);
};

export default Step5;
