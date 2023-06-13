import React from 'react';
import {Grid} from "@mui/material";
import FieldTextValue from "./FieldTextValue";
import translator from "../../Utils/translations/translator";

const Step5 = (props) => {
	const {field} = props;

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignContent="center"
		>
			<FieldTextValue title="שם השדה" value={field.name} width={90} />
			<FieldTextValue title="סוג שטח" value={translator(field.product_name)} width={90} />
			<FieldTextValue title="מספר חקלאי" value={field.farmer_id} width={90} />
			<FieldTextValue title="איזור" value={translator(field.region)} width={90} />
			<FieldTextValue title="מצב היכרות" value={translator(field.familiarity)} width={90} />
		</Grid>
	);
};

export default Step5;
