import React from 'react';
import {Chip, Menu, MenuItem} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import * as data from "../../constants/filterSelection";
import {useDispatch} from "react-redux";
import * as fieldActions from '../../redux/Field/actions';
import {useState} from "react";
import translator from "../../Utils/translations/translator";
import {showToast} from "../../Utils/general";

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

const CustomStatus = ({ fieldId, status, label, removeAllOption, disable = false }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [rotateArrow, setRotateArrow] = useState(false);

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
		dispatch(fieldActions.updateFieldStatus(fieldId, status));
		handleClose();
		showToast("השדה עודכן.");
	};

	let options = data.careStatusOptions;

	if(removeAllOption) {
		options = options.filter(o => o !== 'ALL');
	}

	return (
		<div status-column="true">
			<Chip
				label={label}
				onClick={handleClick}
				sx={{
					direction: "ltr",
					width: '130px',
					backgroundColor: disable ? 'grey' : getStatusColor(status),
					'&:hover': {
						backgroundColor: disable ? 'grey' : getStatusColor(status),
					}
				}}
				icon={
					<KeyboardArrowDown
						style={{ color: disable ? 'grey' : getStatusColor(status), filter: "brightness(85%)", rotate: rotateArrow ? "180deg" : "0deg" }}
						sx={{ display: "flex" }}
					/>
				}
			/>
			{!disable ?
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
				</Menu> :
				<></>
			}
		</div>
	);
};

export default CustomStatus;
