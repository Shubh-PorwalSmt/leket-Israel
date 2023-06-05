import React from 'react';
import {Card, Checkbox, Divider, FormControlLabel, Menu, MenuItem} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";
import {useState} from "react";
import AdvancedFilters from "./AdvancedFilters";
import translator from "../../Utils/translations/translator";

const ExpandableMenu = ({
	                        isAdvanced,
	                        items,
	                        displayTag,
	                        product_name = null,
	                        setProductName = null,
	                        setOptions,
	                        options,
	                        rotateArrow,
	                        setRotateArrow,
                        }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);

	const doClose = () => {
		setRotateArrow(!rotateArrow);
		setAnchorEl(null);
	};

	const updateOptions = (values) => {
		setOptions(values);
		doClose();
	};

	const handleClick = (e) => {
		setRotateArrow(!rotateArrow);
		setAnchorEl(e.currentTarget);
	};

	const handleMenuItemClick = (event, item) => {
		event.preventDefault();

		if (options.includes(item)) {
			const newOptions = options.filter(option => option !== item);
			setOptions(newOptions);
		}
		else if (item === "ALL") {
			setOptions(["ALL"]);
		}
		else if (!options.includes("ALL")) {
			setOptions(prev => [...prev, item]);
		}
		else {
			setOptions([item]);
		}
	};

	const handleClearAllClick = event => {
		event.preventDefault();

		if(items != null && items.indexOf("ALL") > -1) {
			setOptions(["ALL"]);
		}
		setOptions([]);
	};

	const handleClose = () => {
		if(items != null && options.length < 1 && items.indexOf("ALL") > -1) {
			setOptions(["ALL"]);
		}
		doClose();
	};

	const cropCard = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: 155,
		userSelect: 'none',
		height: 80,
		borderRadius: "10px",
		border: open ? "1px solid green" : "",
	};

	return (
		<>
			<Card
				sx={cropCard}
				aria-controls={open ? "basic-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				{displayTag}
			</Card>
			<Menu
				id="basic-menu"
				dir="rtl"
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
						borderRadius: '10px',
						marginTop: '5px',
						minWidth: '155px',
						padding: '0 10px',
						maxHeight: '70vh'
					},
				}}
			>
				{!isAdvanced ? (
					items.map((item) => (
						<MenuItem
							sx={{
								marginBottom: '6px',
								background: options.includes(item) ? "#d0eacf" : "",
								borderRadius: "10px",
								"&:hover": {
									background: options.includes(item) ? "#d0eacf" : "",
								},
							}}
							key={item}
							onClick={(e) => handleMenuItemClick(e, item)}
						>
							<FormControlLabel
								sx={{
									marginRight: 0,
									marginLeft: 0,
									".css-ahj2mt-MuiTypography-root": {
										fontWeight: options.includes(item) ? "bold" : "",
									},
								}}
								control={
									<Checkbox
										sx={{ borderRadius: "10px" }}
										checked={options.includes(item) ? true : false}
										color="success"
										size="small"
									/>
								}
								label={translator(item)}
								labelPlacement="end"
							/>
						</MenuItem>
					))
				) : (
					<AdvancedFilters options={options} setOptions={updateOptions} />
				)}
				{!isAdvanced ? <Divider /> : ""}
				{!isAdvanced ? (
					<MenuItem
						onClick={handleClearAllClick}
						sx={{
							justifyContent: "center",
							fontSize: "14px",
							color: "green",
							fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
						}}
					>
						<DeleteOutline fontSize="small" sx={{ marginLeft: 0.5 }} />
						ניקוי הכל
					</MenuItem>
				) : (
					""
				)}
			</Menu>
		</>
	);
};

export default ExpandableMenu;
