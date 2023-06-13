import React from 'react';
import {TextField} from "@mui/material";
import {TypeField} from './RowDetails';
import CustomDropdown from '../addFieldSteps/CustomDropdown';
import translator from "../../Utils/translations/translator";

const CustomTextPresentation = props => {
	const {
		editMode,
		header,
		value,
		typeField,
		options,
		onChange,
		style,
		inputWidth
	} = props;

	const renderEditControl = () => {
		switch (typeField) {
			case TypeField.TEXT:
				return (
					<TextField
						inputProps={{ style: {fontSize: 14, width: inputWidth || 100} }}
						dir="rtl"
						onChange={(e) => onChange(e.target.value)}
						variant="standard"
						value={value || ''}
					/>
				);
			case TypeField.FLOAT:
				return (
					<TextField
						inputProps={{ style: {fontSize: 14, width: inputWidth || 100} }}
						dir="rtl"
						onChange={(e) => onChange(e.target.value)}
						variant="standard"
						value={value || ''}
						onKeyPress={(event) => {
							const pattern = /^\d+$/;

							if (!pattern.test(event.key) && event.key !== '.' && event.key !== '-') {
								event.preventDefault();
							}
						}}
					/>
				);
			case TypeField.DROPDOWN:
				return (
					<CustomDropdown
						value={value}
						options={options}
						onChange={onChange}
					/>
				);
		}
	};

	return (
		<div style={{fontSize: '14px', direction: 'rtl', ...style}}>
			<div>{header}</div>
			<div style={{height: '30px'}}>
				{
					editMode ? renderEditControl() : <div style={{paddingTop: '2px'}}>{translator(value)}</div>
				}
			</div>
		</div>
	);
};

export default CustomTextPresentation;
