import React, { useEffect, useState } from 'react';
import {useDispatch} from "react-redux";
import {
	Card,
	CardContent,
	Chip,
	Dialog,
	DialogTitle,
	Divider,
	Grid,
	IconButton,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from "@mui/material";
import {ArrowBack, Edit, Save} from "@mui/icons-material";
import {Box} from "@mui/system";
import CustomStatus from "./CustomStatus";
import CheckSave from './CheckSave';
import ValidAttractivness from './ValidAttractivness';
import FamilarityCause from './FamilarityCause';
import CustomTextPresentation from "./CustomTextPresentation";
import * as data from "../../constants/filterSelection.json";
import * as fieldActions from '../../redux/Field/actions';

const stepperStyle = {
	".css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active, .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed":
		{
			color: "orange",
			direction: 'ltr'
		},
};

export const TypeField = {
	TEXT: Symbol("text"),
	NUMBER: Symbol("number"),
	FLOAT: Symbol("float"),
	DATE: Symbol("date"),
	IMAGE: Symbol("image")
}

const RowDetails = ({ onClose, rowSet }) => {
	// console.log(rowSet);

	if (!rowSet) {
		return <div />
	}

	// const dateUpdateStatus = rowSet.lastUpdate;
	// const product_name = r;
	// const fieldKind = 'גד"ש';
	// const farmer_id = 987345;
	// const region = 'דרום';
	// const attractivness = 0.6;
	// const NDVI = 0.8;
	// const aquaintanceMode = 'מוכר ולא נקטף';
	const fieldDateEstablishment = '05.11.2007';
	const farmer_ids = [123456, 987654, 456987];
	const aquaintanceModes = ["כרוב לבן", "CUCUMBER", "בצל"];

	const longitude = 31.23568446;
	const latitude = 36.56467586;
	const fieldId = 123456789;

	const [editMode, setEditMode] = useState(false);
	const [openCheckSave, setOpenCheckSave] = useState(false);
	const [openFamilarityCause, setOpenFamilarityCause] = useState(false);
	const [decision, setDecision] = useState(null);
	const [editableData, setEditableData] = useState({
		lastUpdate: new Date().toLocaleDateString('en-GB'),
		product_name: rowSet.product_name,
		farmer_id: rowSet.farmer_id,
		region: rowSet.region,
		familiarity: rowSet.familiarity,
		fieldDateEstablishment: fieldDateEstablishment, // query: rowSet.fieldDateEstablishment
		longitude: longitude, // query: rowSet.longitude
		latitude: latitude, // query: rowSet.latitude
		familarityCause: "", //familarityCause
		CheckedAttractivness: ""
	});

	const dispatch = useDispatch();

	const updateEditableData = (key, value) => {
		const saveData = {...editableData};
		saveData[key] = value;
		setEditableData(saveData);
	}

	const handleSave =  () => {
		dispatch(fieldActions.saveExistingField(editableData));
	}

	const handleCloseCheckSave = () => {
		setOpenCheckSave(false);
	}

	const handleCloseFamilarityCause = () => {
		setOpenFamilarityCause(false);
	}

	useEffect(() => {
		if (decision) {
			handleSave();
			handleClose();
		}
	}, [decision]);

	const handleEdit = () => {
		if (editMode)
			handleSave();

		setEditMode(!editMode);
	};

	const handleClose = () => {
		if (editMode) {
			setOpenCheckSave(true);
			setEditMode(false);
			return;
		}

		setOpenCheckSave(false);
		setEditMode(false);
		onClose();
	}

	return (
		<Dialog onClose={handleClose} open={rowSet != null} fullWidth maxWidth={window.innerWidth > 1700 ? "xl" : "lg"}>
			<Card
				elevation={10}
				sx={{
					width: "100%",
					height: "100%",
				}}
			>
				<DialogTitle>
					{/* Header Grid */}
					<Grid container direction="row" justifyContent="space-between">
						<Grid item>
							<IconButton color="success" onClick={handleClose}>
								<ArrowBack />
							</IconButton>
							<IconButton color="success" onClick={handleEdit}>
								{ editMode ? <Save /> : <Edit /> }
							</IconButton>
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
									משק גידולים
								</Typography>
								<Box display="flex" flexDirection="row" gap={1}>
									<Box display="flex" flexDirection="column" gap={-1}>
										<CustomTextPresentation
											editMode={editMode}
											header="תאריך עדכון סטטוס"
											value={rowSet.lastUpdate}
											setEditableData={setEditableData}
											editableData={editableData}
											saveDataKey="lastUpdate"
											typeField={TypeField.DATE}
										/>
									</Box>
									<Divider orientation="vertical" flexItem />
									<CustomStatus status={rowSet.status} label={rowSet.status} disable={!editMode} />
								</Box>
							</Box>
						</Grid>
					</Grid>
					{/* // Content Grid */}
					<Grid
						container
						direction="row"
						justifyContent="space-between"
						marginTop={3}
					>
						{/* Left Side Content */}
						<Grid item>
							<Typography
								variant="div"
								component="h5"
								dir="rtl"
								sx={{
									fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
									fontSize: "14px",
								}}
							>
								נ"צ
							</Typography>
							<Grid
								container
								direction="column"
								justifyContent="space-around"
								gap={3}
								marginTop={1.5}
								dir="rtl"
							>
								<Grid item>
									<Grid
										container
										direction="row"
										justifyContent="flex-end"
										spacing={3}
									>
										<Grid item xs>
											<CustomTextPresentation
												editMode={editMode}
												header="Y"
												value={latitude}
												typeField={TypeField.FLOAT}
												setEditableData={setEditableData}
												editableData={editableData}
												saveDataKey="latitude"
											/>
										</Grid>
										<Grid item xs>
											<CustomTextPresentation
												editMode={editMode}
												header="X"
												value={longitude}
												typeField={TypeField.FLOAT}
												setEditableData={setEditableData}
												editableData={editableData}
												saveDataKey="longitude"
											/>
										</Grid>
									</Grid>
								</Grid>
								<Grid item>
									<CustomTextPresentation
										editMode={false}
										header="מספר חלקה"
										value={fieldId}
									/>
								</Grid>
							</Grid>
							<Grid container dir="rtl" direction="column" gap={1} marginTop={3}>
								<Grid item dir="rtl">
									<CustomTextPresentation
										editMode={editMode}
										header="תמונה מהשטח"
										value="Images/RowDetails/FieldShot.png"
										typeField={TypeField.IMAGE}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Divider orientation="vertical" flexItem />
						{/* Right Side Content */}
						<Grid item>
							<Box display="flex" flexDirection="column" gap={6}>
								<Grid
									container
									direction="row"
									gap={15}
									justifyContent="flex-end"
								>
									<Grid item>
										<CustomTextPresentation
											editMode={editMode}
											header="מספר חקלאי"
											typeField={TypeField.NUMBER}
											value={rowSet.farmer_id}
											setEditableData={setEditableData}
											editableData={editableData}
											saveDataKey="farmer_id"
										/>
									</Grid>
									<Grid item>
										{/* <ValidAttractivness
											editableData={editableData}
											updateEditableData={updateEditableData}
											disable={!editMode}
										/> */}
										<CustomTextPresentation
											header="סוג השטח"
											editMode={editMode}
											typeField={TypeField.TEXT}
											textOptionsDropdown=""
											setEditableData={setEditableData}
											value={rowSet.fieldKind}
											// editableData={editableData}
											// saveDataKey="fieldId"
										/>
									</Grid>
									<Grid item>
										<CustomTextPresentation
										  	header="סוג יבול"
											editMode={editMode}
											setEditableData={setEditableData}
											typeField={TypeField.TEXT}
											textOptionsDropdown={data.cropKindOptions}
											editableData={editableData}
											saveDataKey="product_name"
										/>
									</Grid>
								</Grid>
								<Grid
									container
									direction="row"
									gap={15}
									justifyContent="flex-end"
								>
									<Grid item>
										<Box display="flex" flexDirection="row" gap={8}>
											<Grid item>
										<Typography
											variant="div"
											component="div"
											dir="rtl"
											sx={{
												fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
												fontSize: "10px",
											}}
										>
											NDVI
										</Typography>
										<Chip
													label={rowSet.NDVI}
											sx={{ display: "flex", justifyContent: "flex-start" }}
											size="small"
										/>
									</Grid>
											<Grid item>
												<ValidAttractivness
													editableData={editableData}
													updateEditableData={updateEditableData}
													disable={!editMode}
												/>
											</Grid>
											<Grid item dir="rtl">
										<Typography
											variant="div"
											component="div"
											dir="rtl"
											sx={{
												fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
												fontSize: "10px",
											}}
										>
											מדד אטרקטיביות
										</Typography>
										<Chip
													label={rowSet.attractivness}
											sx={{ display: "flex", width: 'fit-content' }}
											size="small"
										/>
											</Grid>
										</Box>
									</Grid>
									<Grid item>
										<CustomTextPresentation
											header="אזור"
											setEditableData={setEditableData}
											editMode={editMode}
											typeField={TypeField.TEXT}
											textOptionsDropdown={data.areaOptions}
											editableData={editableData}
											saveDataKey="region"
										/>
									</Grid>
								</Grid>
							</Box>
							<Grid container direction="column" gap={4}>
								<Grid item>
									<Grid
										container
										direction="row"
										marginTop={7}
										gap={10}
										justifyContent="flex-end"
									>
										<Grid item>
											<CustomTextPresentation
												setEditableData={setEditableData}
												editMode={false}
												header="תאריך הקמת שטח"
												value={fieldDateEstablishment}
											/>
										</Grid>
										<Grid item>
											<CustomTextPresentation
												setEditableData={setEditableData}
											    editMode={editMode}
												header="מצב היכרות"
												fireOpenfamilarityPopup={() => setOpenFamilarityCause(true)}
												typeField={TypeField.TEXT}
												textOptionsDropdown={data.familiarityOptions}
												editableData={editableData}
												saveDataKey="familiarity"
											/>
										</Grid>
									</Grid>
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
											היסטורית שדה
										</Typography>
										<Grid
											container
											direction="row"
											gap={15}
											justifyContent="flex-end"
										>
											<Grid item>
												<Box display="flex" flexDirection="column" gap={1.5}>
													<Typography
														variant="div"
														component="h5"
														dir="rtl"
														sx={{
															fontFamily:
																'"Roboto","Helvetica","Arial",sans-serif',
															fontSize: "12px",
														}}
													>
														מספר חקלאי
													</Typography>
													<Stepper sx={stepperStyle} activeStep={10} orientation="vertical">
														{farmer_ids.map((agriculturalNum, index) => (
															<Step key={index}>
																<StepLabel>{agriculturalNum}</StepLabel>
															</Step>
													))}
													</Stepper>
												</Box>
											</Grid>
											<Grid item>
												<Box display="flex" flexDirection="column" gap={1.5}>
													<Typography
														variant="div"
														component="h5"
														dir="rtl"
														sx={{
															fontFamily:
																'"Roboto","Helvetica","Arial",sans-serif',
															fontSize: "12px",
														}}
													>
														מצב היכרות
													</Typography>
													<Stepper sx={stepperStyle} activeStep={10} orientation="vertical">
														{aquaintanceModes.map((aquaintanceMode, index) => (
															<Step key={index}>
																<StepLabel>{aquaintanceMode}</StepLabel>
															</Step>
														))}
													</Stepper>
												</Box>
											</Grid>
										</Grid>
									</Box>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</DialogTitle>
				<CardContent></CardContent>
				<CheckSave
					onClose={handleCloseCheckSave}
					open={openCheckSave}
					setDecision={setDecision}
				/>
				<FamilarityCause
					onClose={handleCloseFamilarityCause}
					open={openFamilarityCause}
					editableData={editableData}
					updateEditableData={updateEditableData}
				/>
			</Card>
		</Dialog>
	);
};

export default RowDetails;
