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
			<FieldTextValue title="שם השדה" value={field.fieldName} />
			<FieldTextValue title="סוג היבול" value={field.cropKind} />
			<FieldTextValue title="סוג שטח" value={field.fieldKind} />
			<FieldTextValue title="מספר חקלאי" value={field.agriculturalNumber} />
			<FieldTextValue title="איזור" value={field.area} />
			<FieldTextValue title="מצב היכרות" value={field.acquaintanceMode} />
			<FieldTextValue title="ציר X" value={field.xAxis} />
			<FieldTextValue title="ציר Y" value={field.yAxis} />
			<FieldTextValue title="מספר חלקה" value={field.fieldNumber} />
		</Grid>
	);
};

export default Step5;
