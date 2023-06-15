import React from 'react';
import {TextField} from "@mui/material";
import ErrorMessage from "./ErrorMessage";

const Step1 = ({name, onChange, error}) => {
	return (
		<>
			<TextField
				variant="standard"
				label="שם שטח"
				error={error != null}
				value={name}
				onChange={e => onChange(e.target.value)}
				required
			/>
			{ error && <ErrorMessage text="יש להזין שם שטח" /> }
		</>
	);
};

export default Step1;
