import React, {useState} from 'react';
import {Chip, Menu, MenuItem} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import * as data from "../../constants/filterSelection";
import {useDispatch} from "react-redux";
import * as fieldActions from '../../redux/Field/actions';
import translator from "../../Utils/translations/translator";
import DelayReason from "../DelayReason";

const getStatusColor = (status) => {
	switch(status) {
		case "NOT_IN_TREATMENT":
			return "#FFDADA";
		case "IN_FOCAL_CARE":
			return "#def9e0";
		case "UNDER_THE_CARE_OF_A_COORDINATOR":
			return "#def9e0";
		case "UNDER_THE_CARE_OF_AN_AREA_MANAGER":
			return "#f9ecde";
		case "IRRELEVANT":
			return "#a2c0fa";
		case "ON_HOLD":
			return "#fca9a8";
		case "REQUIRES_CARE":
			return "#fca9a8";
		default:
			return "#ebf2ff";
	}
};

const CustomStatus = ({ fieldId, onChange, onChangeDelayDate, status, label, removeAllOption, disable = false }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [rotateArrow, setRotateArrow] = useState(false);
	const [showDelayDatePicker, setShowDelayDatePicker] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState(status);

	const dispatch = useDispatch();

	const open = Boolean(anchorEl);

	const handleClick = (e) => {
		if (!disable) {
			setRotateArrow(!rotateArrow);
			setAnchorEl(e.currentTarget);
		}
	};

	const handleClose = () => {
		if (!disable) {
			setRotateArrow(!rotateArrow);
			setAnchorEl(null);
		}
	};

	const handleMenuItemClick = status => {
		// onChange means that we change but we don't save yet. save will happen later.
		setSelectedStatus(status);
		if(onChange) {
			onChange(status);
			if(status === "ON_HOLD") {
				setShowDelayDatePicker(true);
			}
			handleClose();
		}
		// change and have to save
		else {
			// need to save but changed to ON_HOLD - first get the hold date and only then save
			if(status === "ON_HOLD") {
				setShowDelayDatePicker(true);
			}
			// not ON_HOLD so we can save immediately
			else {
				dispatch(fieldActions.updateFieldStatus(fieldId, status));
			}
			handleClose();
		}
	};

	let options = data.careStatusOptions;

	if(removeAllOption) {
		options = options.filter(o => o !== 'ALL');
	}

	const onCloseDelay = (date) => {
		setShowDelayDatePicker(false);
		// if onChange - just update the container
		if(onChange) {
			if(date) {
				onChangeDelayDate(date);
			}
		}
		// no onChange - need to save the selected status and the selected delay date
		else {
			if(date) {
				dispatch(fieldActions.updateFieldStatus(fieldId, selectedStatus, date));
			}
			else {
				dispatch(fieldActions.updateFieldStatus(fieldId, selectedStatus));
			}
		}
	};

	return (
		<div status-column="true">
			
			{ showDelayDatePicker && <DelayReason fieldId={fieldId}
			                                      onChange={delayDate => onCloseDelay(new Date(delayDate))}
			                                      onClose={() => onCloseDelay(null)} /> }

			<Chip
				label={label}
				onClick={handleClick}
				sx={{
					cursor: disable ? 'not-allowed' : 'hand',
					direction: "ltr",
					width: '130px',
					backgroundColor: disable ? '#f5f5f5' : getStatusColor(status),
					'&:hover': {
						backgroundColor: disable ? '#f5f5f5' : getStatusColor(status),
					}
				}}
				icon={
					<KeyboardArrowDown
						style={{ color: disable ? '#f5f5f5' : getStatusColor(status), filter: "brightness(85%)", rotate: rotateArrow ? "180deg" : "0deg" }}
						sx={{ display: "flex" }}
					/>
				}
			/>
			<Menu
				id="basic-menu"
				dir="rtl"
				sx={{
					'.css-6hp17o-MuiList-root-MuiMenu-list': {
						paddingBottom: 0
					},
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				PaperProps={{
					style: {
						padding: '0 8px'
					},
				}}
			>
				{options.map((status) => (
					<MenuItem
						sx={{
							marginBottom: 1,
							background: getStatusColor(status),
							borderRadius: "4px",
							"&:hover": {
								background: getStatusColor(status),
							},
						}}
						key={status}
						onClick={() => handleMenuItemClick(status)}
					>
						<div>{translator(status)}</div>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};

export default CustomStatus;
