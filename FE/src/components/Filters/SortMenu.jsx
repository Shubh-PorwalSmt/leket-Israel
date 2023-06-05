import React, {useState} from 'react';
import {Card, Menu, MenuItem,} from "@mui/material";
import sortIcon from '../../assets/filters/sort-icon.png';

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
	const ITEM_HEIGHT = 60;

	const handleClick = (e) => {
		setRotateArrow(!rotateArrow);
		setAnchorEl(e.currentTarget);
	};

	const handleMenuItemClick = sortItem => {
		setOptions([sortItem]);
		handleClose();
	};

	const handleClose = () => {
		setRotateArrow(!rotateArrow);
		setAnchorEl(null);
	};

	const cropCard = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: 135,
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
						padding: '10px',
						maxHeight: !isAdvanced ? ITEM_HEIGHT * 4.4 : "",
					},
				}}
			>
				{
					items.map((item) => (
						<MenuItem
							sx={{
								background: options.includes(item.label) ? "" : "",
								borderRadius: "10px",
								"&:hover": {
									background: options.includes(item.label) ? "" : "#D0EACF",
								},
							}}
							key={item.key}
							onClick={() => handleMenuItemClick(item)}
						>
							<div style={{display: 'flex', alignItems: 'center'}}>
								<div style={{width: '100px'}}>{item.label}</div>
								{ item.dir && <img src={sortIcon} style={{transform: item.dir === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)'}} alt="" /> }
							</div>
						</MenuItem>
					))
				}
			</Menu>
		</>
	);
};

export default ExpandableMenu;
