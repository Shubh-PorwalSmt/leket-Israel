import React from 'react';
import { Typography, TextField, Box } from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { TypeField } from './RowDetails';
import CustomDropdown from '../addFieldSteps/CustomDropdown';
import dayjs from 'dayjs';

const inputStyle = {
	width: 90,
	height: 40,
	"input, .css-z5e0z9-MuiFormLabel-root-MuiInputLabel-root": {
		fontSize: '12px'
	}
};

const CustomTextPresentation = ({
	editMode,
	header,
	value,
	typeField,
	setEditableData,
	editableData, 
	saveDataKey,
	textOptionsDropdown,
	fireOpenfamilarityPopup
}) => {
	const determainComponentForFieldType = () => {
		switch (typeField) {
			case TypeField.TEXT:
				if (!!textOptionsDropdown) {
					return (
						<CustomDropdown
							value={editableData[saveDataKey]}
							options={textOptionsDropdown}
							onChange={value => updateSavedData(value)}
						/>
					);
				}
				break;
			case TypeField.FLOAT:
				return (
					<TextField
						sx={inputStyle}
						dir="rtl"
						onChange={handleInputChange}
						variant="standard"
						defaultValue={value}
						size="small"
						onKeyPress={(event) => {
							const pattern = /^\d+$/;
							
							if (!pattern.test(event.key) && event.key !== '.' && event.key !== '-') {
								event.preventDefault();
							}
						}}
					/>
				);
			case TypeField.NUMBER:
				return (
					<TextField
						sx={inputStyle}
						dir="rtl"
						onChange={handleInputChange}
						variant="standard"
						defaultValue={value}
						size="small"
						onKeyPress={(event) => {
							const pattern = /^\d+$/;
							
							if (!pattern.test(event.key)) {
								event.preventDefault();
							}
						}}
					/>
				);
			case TypeField.DATE:
				return (
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DesktopDatePicker
							value={dayjs(new Date())}
							readOnly={true}
							InputProps={{ onKeyDown: e => e.preventDefault() }}
							onChange={(value) => updateSavedData(new Date(value.$d).toLocaleDateString('en-GB'))}
							renderInput={(params) => <TextField variant='standard' sx={{ width: 120 }} {...params} />}
						/>
					</LocalizationProvider>
				);
			case TypeField.IMAGE:
				return (
					// TODO: add mapping component
					<Box
						component="img"
						sx={{
							display: "flex",
							maxHeight: { xs: "70%" },
							maxWidth: { xs: "80%" },
						}}
						dir="rtl"
						alt=""
						src={value}
					/>
				);
		}
	}

	const updateSavedData = (value) => {
		const saveData = {...editableData};
		saveData[saveDataKey] = value;
		setEditableData(saveData);

		if (saveDataKey === "familiarity" && value === "לא רלוונטי") {
			fireOpenfamilarityPopup();
		}

		console.log(editableData);
	}

	const handleInputChange = (e) => {
		updateSavedData(e.target.value);
		console.log(editableData);
	}

	return (
		<>
			<Typography
				variant="div"
				component="div"
				dir="rtl"
				sx={{
					fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
					fontSize: "12px"
				}}>
				{header}
			</Typography>
			{!editMode ?
				typeField === TypeField.IMAGE ?
					<Box
						component="img"
						sx={{
							display: "flex",
							maxHeight: { xs: "70%" },
							maxWidth: { xs: "80%" },
						}}
						dir="rtl"
						alt=""
						src={value}
					/> :
					<Typography
						variant="div"
						component="h5"
						dir="rtl"
						sx={{
							fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
							fontSize: "16px"
						}}
					>
						{ typeField === TypeField.TEXT && !!saveDataKey ? editableData[saveDataKey] : value }
					</Typography> :
				determainComponentForFieldType()
			}
		</>
	);
};

export default CustomTextPresentation;
