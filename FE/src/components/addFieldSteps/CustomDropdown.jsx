import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const CustomDropdown = ({ label, options, value, onChange }) => {

	const handleChange = (event) => {
		onChange(event.target.value);
	};

	return (
		<FormControl
			required
			variant="standard"
			size="small"
			sx={{ m: 0.5, minWidth: 80, direction: "rtl" }}
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
							{option}
						</MenuItem>
					))
				}
			</Select>
		</FormControl>
	);
};

export default CustomDropdown;
