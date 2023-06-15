import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import translator from "../../Utils/translations/translator";

const CustomDropdown = ({ label, options, value, onChange }) => {

	const handleChange = (event) => {
		onChange(event.target.value);
	};

	return (
		<FormControl
			required
			variant="standard"
			size="small"
			sx={{ m: 0, minWidth: 80, direction: "rtl" }}
		>
			{!!label ? <InputLabel>{label}</InputLabel> : <></>}
			<Select
				value={value}
				onChange={handleChange}
				autoWidth
				label={label}
			>
				{
					options.map((option, i) => (
						<MenuItem key={i} value={option}>
							{translator(option)}
						</MenuItem>
					))
				}
			</Select>
		</FormControl>
	);
};

export default CustomDropdown;
