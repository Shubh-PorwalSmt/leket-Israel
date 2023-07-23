import React, {useEffect, useState} from 'react';
import {Box, Button, Divider, Slider, TextField, Typography} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DeleteOutline} from "@mui/icons-material";
import moment from 'moment';
import {getDefaultDateFrom, getDefaultDateTo, showWarning} from "../../Utils/general";
import {DATE_FORMAT} from "../../Utils/constants";

const addCropStyle = {
	borderRadius: "16px",
	backgroundColor: "#498758",
	color: "white",
	fontWeight: "bold",
	"&:hover": {
		backgroundColor: "#498758",
	},
};

const SliderComponent = ({title, value, onChange}) => {
	return (
		<>
			<Typography
				variant="span"
				component="h6"
				marginTop={1}
				marginBottom={1}
				sx={{
					fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
					fontWeight: "bold",
					fontSize: "15px",
				}}
			>
				{title}
			</Typography>

			<div>
				<div style={{padding: '0 10px'}}>
					<Slider
						min={0}
						max={1}
						step={0.1}
						sx={{ color: "#d27c35", paddingBottom: '0px' }}
						value={value}
						onChange={onChange}
						valueLabelDisplay="auto"
						getAriaValueText={(value) => `${value}`}
					/>
				</div>
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
					<div>מד 1</div>
					<div>0.5</div>
					<div>מד 0</div>
				</div>
			</div>

			<div style={{display: 'grid', gridTemplateColumns: '1fr 20px 1fr'}}>
				<div>
					<Typography
						variant="span"
						component="h6"
						marginTop={1}
						gutterBottom
						sx={{
							fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
							fontWeight: "normal",
							fontSize: "14px",
						}}
					>
						מטווח
					</Typography>
					<TextField size="small" value={value[0]} InputProps={{disabled: true}} variant="outlined" sx={{ width: "150px", marginBottom: 1 }} />
				</div>

				<div />

				<div>
					<Typography
						variant="span"
						component="h6"
						marginTop={1}
						gutterBottom
						sx={{
							fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
							fontWeight: "normal",
							fontSize: "14px",
						}}
					>
						עד טווח
					</Typography>
					<TextField size="small" value={value[1]} InputProps={{disabled: true}} variant="outlined" sx={{ width: "150px", marginBottom: 1 }} />
				</div>
			</div>
		</>
	)
};

const AdvancedFilters = props => {
	const {options, setOptions} = props;
	const [fromDate, setFromDate] = useState(options.dateFrom);
	const [toDate, setToDate] = useState(options.dateTo);
	const [attractionRange, setAttractionRange] = useState([options.attractionFrom, options.attractionTo]);
	const [ndviRange, setNdviRange] = useState([options.ndviFrom, options.ndviTo]);

	useEffect(() => {
		const load = async () => {
			setFromDate(options.dateFrom);
			setToDate(options.dateTo);
			setAttractionRange([options.attractionFrom, options.attractionTo]);
			setNdviRange([options.ndviFrom, options.ndviTo]);
		};
		load();
	}, [options]);

	const onUpdateOptions = () => {
		if(moment(fromDate).isAfter(toDate)) {
			showWarning("התאריכים שנבחרו אינם תקינים");
			return;
		}

		const from = moment(fromDate).format(DATE_FORMAT);
		const to = moment(toDate).format(DATE_FORMAT);
		setOptions({attractionFrom: attractionRange[0], attractionTo: attractionRange[1], ndviFrom: ndviRange[0], ndviTo: ndviRange[1], dateFrom: from, dateTo: to});
	};

	const onResetOptions = () => {
		setOptions({attractionFrom: 0, attractionTo: 1, ndviFrom: 0, ndviTo: 1, dateFrom: getDefaultDateFrom(), dateTo: getDefaultDateTo()});
	};

	const handleAttractionChange = (event, newRange) => {
		setAttractionRange(newRange);
	};

	const handleNdviChange = (event, newRange) => {
		setNdviRange(newRange);
	};

	const updateToDate = (date) => {
		setToDate(new Date(date));
	};

	const updateFromDate = (date) => {
		setFromDate(new Date(date));
	};

	return (
		<Box paddingTop={2} paddingRight={2} paddingBottom={2} paddingLeft={2}>
			<Typography
				variant="span"
				component="h6"
				marginBottom={3}
				sx={{
					fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
					fontWeight: "bold",
					fontSize: "20px",
				}}
			>
				עוד מסננים
			</Typography>
			<Divider light />

			<SliderComponent title="טווח מדד אטרקטביות" value={attractionRange} onChange={handleAttractionChange} />
			<SliderComponent title="טווח מדד NDVI" value={ndviRange} onChange={handleNdviChange} />

			<Divider light sx={{ marginTop: 1 }} />
			<Typography
				variant="span"
				component="h6"
				marginTop={1}
				marginBottom={1}
				sx={{
					fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
					fontWeight: "bold",
					fontSize: "15px",
				}}
			>
				טווח תאריכי סטטוס
			</Typography>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Box display="flex" flexDirection="row" marginTop={1} gap={3}>
					<Box display="flex" flexDirection="column" marginBottom={1} width={150}>
						<Typography
							variant="span"
							component="h6"
							gutterBottom
							sx={{
								fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
								fontWeight: "bold",
								fontSize: "13px",
							}}
						>
							מתאריך
						</Typography>
						<DatePicker
							format={DATE_FORMAT}
							value={fromDate}
							disableOpenOnEnter
							InputProps={{ onKeyDown: e => e.preventDefault() }}
							onChange={(newFromDate) => updateFromDate(newFromDate)}
							renderInput={(params) => <TextField dir="rtl" {...params} />}
						/>
					</Box>
					<Box display="flex" flexDirection="column" marginBottom={1} width={150}>
						<Typography
							variant="span"
							component="h6"
							gutterBottom
							sx={{
								fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
								fontWeight: "bold",
								fontSize: "13px",
							}}
						>
							עד תאריך
						</Typography>
						<DatePicker
							format={DATE_FORMAT}
							value={toDate}
							InputProps={{ onKeyDown: e => e.preventDefault() }}
							onChange={(newToDate) => updateToDate(newToDate)}
							renderInput={(params) => <TextField dir="rtl" {...params} />}
						/>
					</Box>
				</Box>
			</LocalizationProvider>
			<Divider light sx={{ marginTop: 1 }} />
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px'}}>

				<div style={{display: 'flex', alignItems: 'center', color: 'green', cursor: 'pointer'}} onClick={onResetOptions}>
					<DeleteOutline fontSize="small" sx={{ marginLeft: 0.5 }} />
					ניקוי הכל
				</div>

				<Button elevation={9} sx={addCropStyle} onClick={onUpdateOptions}>
					סינון
				</Button>

			</div>
		</Box>
	);
};

export default AdvancedFilters;
