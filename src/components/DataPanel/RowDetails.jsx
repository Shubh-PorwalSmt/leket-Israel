import React, {useState, useEffect, Fragment} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Card, Dialog, DialogTitle, Divider, Grid, IconButton, Typography} from "@mui/material";
import {Close, Edit, Save, Undo} from "@mui/icons-material";
import {Box} from "@mui/system";
import historyRowMarker from '../../assets/history-row-marker.png';
import thumbsUp from '../../assets/likeIcons/up.svg';
import thumbsUpOn from '../../assets/likeIcons/up-on.svg';
import thumbsDown from '../../assets/likeIcons/down.svg';
import thumbsDownOn from '../../assets/likeIcons/down-on.svg';
import pipe from '../../assets/likeIcons/pipe.png';
import CustomStatus from "./CustomStatus";
import CustomTextPresentation from "./CustomTextPresentation";
import * as fieldActions from '../../redux/Field/actions';
import * as data from "../../constants/filterSelection.json";
import translator from "../../Utils/translations/translator";
import {getFieldLastUpdated, showToast} from "../../Utils/general";
import {DATE_FORMAT} from "../../Utils/constants";
import moment from 'moment';
import TextWithHeader from "./TextWithHeader";
import FieldMapArea from "../FieldMapArea";

import './RowDetails.scss';

export const TypeField = {
	DROPDOWN: "dropdown",
	TEXT: "text",
	FLOAT: "float"
};

const RowDetails = ({ onClose, rowSet }) => {
	let [index, setIndex] = useState(1);
	const [editMode, setEditMode] = useState(false);
	const dispatch = useDispatch();
	const fieldHistory = useSelector(state => state.field.fieldsHistory)[rowSet.id];

	const [editableData, setEditableData] = useState({
		id: rowSet.id,
		product_name: rowSet.product_name,
		farmer_id: rowSet.farmer_id,
		region: rowSet.region,
		status: rowSet.status,
		familiarity: rowSet.familiarity,
		familiarity_desc: rowSet.familiarity_desc,
		point: rowSet.point,
		xAxis: rowSet.point ? rowSet.point.coordinates[0] : null,
		yAxis: rowSet.point ? rowSet.point.coordinates[1] : null,
		polygon: rowSet.polygon,
		delay_date: rowSet.delay_date,
		created_date: rowSet.created_date,
		status_date: rowSet.status_date
	});

	const updateStatus = (value) => {
		if(value !== "ON_HOLD") {
			const saveData = {...editableData};
			saveData.status = value;
			saveData.delay_date = null;
			setEditableData(saveData);
		}
		else {
			updateEditableData('status', value);
		}
	};

	const updateEditableData = (key, value) => {
		console.log(key,value);
		const saveData = {...editableData};
		saveData[key] = value;
		setEditableData(saveData);
	};

	const handleSave =  () => {
		const fieldToUpdate = {};
		fieldToUpdate.id = rowSet.id;
		fieldToUpdate.point = editableData.point;
		fieldToUpdate.polygon = editableData.polygon;
		fieldToUpdate.product_name = editableData.product_name;
		fieldToUpdate.farmer_id = editableData.farmer_id;
		fieldToUpdate.region = editableData.region;
		fieldToUpdate.familiarity = editableData.familiarity;
		fieldToUpdate.familiarity_desc = editableData.familiarity_desc;

		if(editableData.status !== rowSet.status) {
			fieldToUpdate.status = editableData.status;
		}

		if(editableData.status !== "ON_HOLD") {
			fieldToUpdate.delay_date = null;
		}
		else {
			fieldToUpdate.delay_date = editableData.delay_date;
		}

		dispatch(fieldActions.updateField(fieldToUpdate, () => {
			showToast("השטח עודכן.");
			onClose();
		}));
	};

	const updateLike = (value) => {
		dispatch(fieldActions.updateLike(rowSet.id, value));
	};

	const handleUndo = () => {
		setEditableData({
			id: rowSet.id,
			product_name: rowSet.product_name,
			farmer_id: rowSet.farmer_id,
			region: rowSet.region,
			status: rowSet.status,
			familiarity: rowSet.familiarity,
			familiarity_desc: rowSet.familiarity_desc,
			point: rowSet.point,
			xAxis: rowSet.point ? rowSet.point.coordinates[0] : null,
			yAxis: rowSet.point ? rowSet.point.coordinates[1] : null,
			polygon: rowSet.polygon,
			delay_date: rowSet.delay_date,
			created_date: rowSet.created_date,
			status_date: rowSet.status_date
		});
		setEditMode(false);
	};

	const resetLocation = () => {
		console.log("resetLocation");
		const fld = {...editableData};
		fld.xAxis = rowSet.point ? rowSet.point.coordinates[0] : null;
		fld.yAxis = rowSet.point ? rowSet.point.coordinates[1] : null;
		fld.polygon = rowSet.polygon;
		setEditableData(fld);

		setIndex(Math.random());
	};

	const onMapClick = (location) => {
		if(editMode) {
			const fld = {...editableData};
			if(fld.polygon == null) {
				fld.xAxis = Math.round(location.lat * 1000000) / 1000000;
				fld.yAxis = Math.round(location.lng * 1000000) / 1000000;
				setEditableData(fld);
			}
		}
	};

	const copyDoordinates = () => {
		copyToClipboard(`[${editableData.xAxis}, ${editableData.yAxis}]`);
		showToast("המיקום הועתק.");
	};

	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text)
			.then(() => {
			})
			.catch(err => {
			});
	};

	const updateLocation = (newPolygon, newPoint) => {
		const fld = {...editableData};
		fld.point = newPoint;
		fld.xAxis = newPoint && newPoint.coordinates[0];
		fld.yAxis = newPoint && newPoint.coordinates[1];
		fld.polygon = newPolygon;
		setEditableData(fld);
	};

	const renderFieldMap = (row) => {
		const x = row.xAxis;
		const y = row.yAxis;
		const p = row.polygon ? row.polygon.coordinates : null;

		return (
			<FieldMapArea
				editable={editMode}
				width="100%"
				height={350}
				onReset={resetLocation}
				onUpdate={updateLocation}
				onClick={onMapClick}
				key={index}
				xAxis={x} yAxis={y}
				polygonCoordinates={p} />
		)
	};

	const renderAttractivenessField = (row) => {
		return (
			<div>
				<div style={{fontSize: '12px', color: '#6A6A6A', direction: 'rtl'}}>
					<div>מדד אטרקטיביות</div>
					<div className="row-content-highlight-value">{row.latest_attractiveness_metric || '-'}</div>
				</div>
				<div style={{fontSize: '14px', direction: 'rtl', display: 'flex', alignItems: 'center', opacity: 0.0}}>
					<div>תואם את השטח?</div>
					<div style={{display: 'flex', paddingRight: '10px', alignItems: 'center'}}>
						<img src={thumbsUp} alt="" style={{cursor: 'pointer'}} onClick={() => updateLike(true)} />
						<img src={pipe} alt="" style={{height: '14px', padding: '0 12px'}} />
						<img src={thumbsDown} alt="" style={{cursor: 'pointer'}} onClick={() => updateLike(false)} />
					</div>
				</div>
			</div>
		)
	};

	const renderNDVIField = (row) => {
		return (
			<div style={{fontSize: '12px', color: '#6A6A6A', direction: 'rtl'}}>
				<div>NDVI</div>
				<div className="row-content-highlight-value">{row.latest_satellite_metric ? parseInt(row.latest_satellite_metric * 100) / 100 : '-'}</div>
			</div>
		)
	};

	const handleClose = () => {
		setEditMode(false);
		onClose();
	};

	return (
		<div className="row-content-wrapper">
			<Dialog open fullWidth maxWidth={false}>
				<Card
					elevation={10}
					sx={{
						width: "100%",
						height: "100%",
						overflow: "auto"
					}}
				>

					<DialogTitle>
						{/* Header Grid */}
						<Grid container direction="row" justifyContent="space-between">
							<Grid item>
								{
									editMode ?
										<IconButton color="success" onClick={handleSave}>
											<Save />
										</IconButton>
										:
										<IconButton color="success" onClick={handleClose}>
											<Close />
										</IconButton>
								}
								{
									editMode ?
										<IconButton color="success" onClick={handleUndo}>
											<Undo />
										</IconButton>
										:
										<IconButton color="success" onClick={() => setEditMode(true)}>
											<Edit />
										</IconButton>
								}
							</Grid>
							<Grid item>
								<Box display="flex" flexDirection="column" gap={1}>
									<Typography
										variant="div"
										component="h4"
										dir="rtl"
										sx={{
											fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
										}}
									>
										{rowSet.name}
									</Typography>
									<Box display="flex" flexDirection="row" gap={1}>
										{
											editableData.delay_date &&
											<>
												<TextWithHeader
													editMode={false}
													header="*בהשהייה עד לתאריך"
													value={moment(editableData.delay_date).format(DATE_FORMAT)}
												/>
												<Divider sx={{paddingLeft: '6px', marginRight: '6px'}} orientation="vertical" flexItem />
											</>
										}
										<Box display="flex" flexDirection="column" gap={-1}>
											<TextWithHeader
												editMode={false}
												header="*תאריך עדכון סטטוס"
												value={getFieldLastUpdated(editableData)}
											/>
										</Box>
										<Divider sx={{paddingLeft: '6px', marginRight: '6px'}} orientation="vertical" flexItem />
										<CustomStatus fieldId={rowSet.id}
										              onChange={(value) => updateStatus(value)}
										              onChangeDelayDate={date => updateEditableData('delay_date', date)}
										              removeAllOption
										              status={editableData.status}
										              label={translator(editableData.status)} disable={!editMode} />
									</Box>
								</Box>
							</Grid>
						</Grid>
						{/* // Content Grid */}
						<div className="row-content-container">
							{/* // Right Side */}
							<div className="row-content-right">
								{/* // empty spacer: */}
								<div className="row-content-subtitle">&nbsp;</div>
								<div className="row-content-right-fields">
									<CustomTextPresentation
										header="סוג יבול"
										editMode={editMode}
										value={editableData.product_name}
										typeField={TypeField.DROPDOWN}
										options={data.product_nameOptions.sort((a, b) => translator(a).localeCompare(translator(b)))}
										onChange={(value) => updateEditableData('product_name', value)}
									/>
									<CustomTextPresentation
										header="מספר חקלאי"
										editMode={editMode}
										value={editableData.farmer_id}
										typeField={TypeField.TEXT}
										onChange={(value) => updateEditableData('farmer_id', value)}
									/>
									<CustomTextPresentation
										header="איזור"
										editMode={editMode}
										value={editableData.region}
										typeField={TypeField.DROPDOWN}
										options={data.areaOptions.filter(op => op !== "ALL")}
										onChange={(value) => updateEditableData('region', value)}
									/>
									{ renderNDVIField(rowSet) }
									{/*{ renderAttractivenessField(rowSet) }*/}
									<TextWithHeader
										editMode={false}
										header="תאריך הקמת השטח"
										value={moment(editableData.created_date).format(DATE_FORMAT)}
									/>
									<CustomTextPresentation
										header="מצב היכרות"
										editMode={editMode}
										value={editableData.familiarity}
										typeField={TypeField.DROPDOWN}
										options={data.familiarityOptions}
										onChange={(value) => updateEditableData('familiarity', value)}
									/>
									{
										editableData.familiarity === "IRRELEVANT" &&
										<CustomTextPresentation
											header="סיבה שלא רלוונטי"
											editMode={editMode}
											style={{gridColumn: '2/4', width: '320px'}}
											inputWidth={300}
											value={editableData.familiarity_desc}
											typeField={TypeField.TEXT}
											onChange={(value) => updateEditableData('familiarity_desc', value)}
										/>
									}
								</div>
								<div className="row-content-right-history">
									<div className="row-content-right-history-title">היסטורית השטח</div>
									{
										fieldHistory !== null && fieldHistory.length > 0 &&
										<div className="row-content-history-content">
											<div/>
											<div style={{gridColumn: '2/4', fontWeight: 'bold', color: '#616161', paddingBottom: '10px'}}>סוג גידול</div>
											<div style={{fontWeight: 'bold', color: '#616161'}}>מספר חקלאי</div>
											{
												fieldHistory.map((row, i, arr) => {
													return arr.length === 1 ? (
														<Fragment key={i}>
															<div><img src={historyRowMarker} alt="" style={{width: '18px'}} /></div>
															<div>{translator(row.product_name)}</div>
															<div />
															<div>{row.farmer_id}</div>
														</Fragment>
													) : (
														<Fragment key={i}>
															<div className="row-content-history-marker"><img src={historyRowMarker} alt="" style={{width: '18px'}} /></div>
															<div>{translator(row.product_name)}</div>
															<div />
															<div>{row.farmer_id}</div>
															{ i === arr.length-1 ? <div /> : <div className="row-content-history-marker-separator" /> }
															<div style={{gridColumn: '2/5'}} />
														</Fragment>
													)
												})
											}
										</div>
									}
								</div>
							</div>
							{/* // Left Side */}

							<div className="row-content-left">
								<div className="row-content-subtitle">נ"צ
									{ editableData.xAxis && editableData.yAxis && <span className="row-content-copy" onClick={copyDoordinates}>העתק</span> }
								</div>
								<div className="row-content-left-fields">
									<CustomTextPresentation
										editMode={editMode}
										header="X"
										value={editableData.xAxis}
										typeField={TypeField.FLOAT}
										onChange={(value) => updateEditableData('xAxis', parseFloat(value))}
									/>
									<CustomTextPresentation
										editMode={editMode}
										header="Y"
										value={editableData.yAxis}
										typeField={TypeField.FLOAT}
										onChange={(value) => updateEditableData('yAxis', parseFloat(value))}
									/>
									<TextWithHeader
										editMode={false}
										header="מספר חלקה"
										value={translator(editableData.id)}
									/>
									<div />
								</div>
								<div style={{paddingTop: '20px'}}>
									<div>
										{ renderFieldMap(editableData) }
									</div>
								</div>
							</div>
						</div>

					</DialogTitle>
				</Card>
			</Dialog>
		</div>
	);
};

export default RowDetails;
