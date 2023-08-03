import React, {useState} from 'react';
import {Card, Checkbox, Divider, FormControlLabel, Menu, MenuItem} from "@mui/material";
import {DeleteOutline, Search, Clear} from "@mui/icons-material";
import AdvancedFilters from "./AdvancedFilters";
import translator from "../../Utils/translations/translator";

const ExpandableMenu = ({
	                        showFilter,
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
	const [filter, setFilter] = useState("");

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
		userSelect: 'none',
		height: 80,
		borderRadius: "10px",
		border: open ? "1px solid green" : "",
	};
	
	const toggleOption = async (option) => {
		let selectedOptions = [...options];

		if(selectedOptions.includes(option)) {
			selectedOptions = selectedOptions.filter(op => op !== option);
		}
		else {
			selectedOptions.push(option);
		}
		setOptions(selectedOptions);
	};

	const selectedOptionBoxStyle = {
		position: '',
		margin: '2px',
		cursor: 'pointer',
		userSelect: 'none',
		backgroundColor: '#D0EACF',
		fontSize: '12px',
		fontWeight: 'bold',
		display: 'inline-flex',
		alignItems: 'center',
		padding: '7px 11px',
		borderRadius: '16px'
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
						maxWidth: '400px',
						padding: '0 10px',
						overflow: 'hidden',
						maxHeight: '70vh'
					},
				}}
			>
				{
					showFilter &&
					<div style={{marginBottom: '10px'}}>
						<div style={{margin: '10px 0', border: '1px solid #C5C5C5', borderRadius: '10px', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
							<input style={{border: '0', padding: '10px 0', outline: 'none'}} type="text" placeholder="הקלד שם יבול" value={filter} onChange={(event) => setFilter(event.target.value)} />
							<Search style={{color: '#C5C5C5'}} />
						</div>
						{
							items.map((item, i) => (
								<div key={i} onClick={() => toggleOption(item)}
								     style={options.includes(item) ? selectedOptionBoxStyle : {position: 'absolute', display: 'none'}}>
									{translator(item)}
									&nbsp;
									<Clear style={{fontSize: '14px', color: '#3A6E47'}} />
									</div>
							))
						}
					</div>
				}
				<div style={{overflowY: 'auto', maxHeight: isAdvanced ? 'auto' : '60vh', minHeight: '150px'}}>
					{!isAdvanced ? (
						items.map((item) => (
							<MenuItem
								sx={{
									opacity: translator(item).indexOf(filter) > -1 ? 1 : 0,
									position: translator(item).indexOf(filter) > -1 ? '' : 'absolute',
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
				</div>
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
