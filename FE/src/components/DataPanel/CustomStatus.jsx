import React from 'react';
import {Chip, Menu, MenuItem} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import {careStatusOptions} from "../../constants/filterSelection";
import {useState} from "react";

const getStatusColor = (status) => {
	return status === "בטיפול"
		? "#def9e0"
		: status === "לא בטיפול"
			? "#FFDADA"
			: status === "לא עדכני"
				? "#a2c0fa"
				: status === "בטיפול רכז"
					? "#f9ecde"
					: status === "דורש בדיקה"
						? "#fca9a8"
						: "#ebf2ff";
};

const CustomStatus = ({ label, disable = false }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [rotateArrow, setRotateArrow] = useState(false);

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

	const handleMenuItemClick = (e) => {
		const status = e.target.innerText;
		console.log(status);
		// save...
	};

	return (
		<div status-column="true">
			<Chip
				label={label}
				onClick={handleClick}
				sx={{
					direction: "ltr",
					width: '130px',
					backgroundColor: disable ? 'grey' : getStatusColor(label),
					'&:hover': {
						backgroundColor: disable ? 'grey' : getStatusColor(label),
					}
				}}
				icon={
					<KeyboardArrowDown
						style={{ color: disable ? 'grey' : getStatusColor(label), filter: "brightness(85%)", rotate: rotateArrow ? "180deg" : "0deg" }}
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
					{careStatusOptions.map((status) => (
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
							onClick={handleMenuItemClick}
						>
							<div>{status}</div>
						</MenuItem>
					))}
				</Menu> :
				<></>
			}
		</div>
	);
};

export default CustomStatus;
