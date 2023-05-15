import React from 'react';
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
import {ArrowBack, Edit} from "@mui/icons-material";
import {Box} from "@mui/system";
import CustomStatus from "./CustomStatus";
import CustomTextPresentation from "./CustomTextPresentation";

const stepperStyle = {
	".css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active, .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed":
		{
			color: "orange",
			direction: 'ltr'
		},
};

const RowDetails = ({ onClose, rowSet }) => {
	console.log(rowSet);

	// const dateUpdateStatus = rowSet.lastUpdate;
	// const cropKind = r;
	// const fieldKind = 'גד"ש';
	const agriculturalNumber = 987345;
	const area = 'דרום';
	const attractivness = 0.6;
	const NDVIness = 0.8;
	const fieldDateEstablishment = '05.11.2007';
	const aquaintanceMode = 'מוכר ולא נקטף';
	const agriculturalNumbers = [123456, 987654, 456987];
	const aquaintanceModes = ["כרוב לבן", "מלפפון", "בצל"];

	const xaxis = 31.23568446;
	const yaxis = 36.56467586;
	const fieldId = 123456789;

	if(!rowSet) {
		return <div/>
	}

	return (
		<Dialog onClose={onClose} open={rowSet != null} fullWidth maxWidth="lg">
			<Card
				sx={{
					width: "100%",
					height: "100%",
				}}
			>
				<DialogTitle>
					{/* Header Grid */}
					<Grid container direction="row" justifyContent="space-between">
						<Grid item>
							<IconButton color="success" onClick={onClose}>
								<ArrowBack />
							</IconButton>
							<IconButton color="success">
								<Edit />
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
											header="תאריך עדכון סטטוס:"
											value={rowSet.lastUpdate}
										/>
									</Box>
									<Divider orientation="vertical" flexItem />
									<CustomStatus label={rowSet.status} />
								</Box>
							</Box>
						</Grid>
					</Grid>
					{/* Content Grid */}
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
												header="ציר Y"
												value={yaxis}
											/>
										</Grid>
										<Grid item xs>
											<CustomTextPresentation
												header="ציר X"
												value={xaxis}
											/>
										</Grid>
									</Grid>
								</Grid>
								<Grid item>
									<CustomTextPresentation
										header="מספר חלקה"
										value={fieldId}
									/>
								</Grid>
							</Grid>
							<Grid container direction="column" gap={1} marginTop={3}>
								<Grid item>
									<Typography
										variant="div"
										component="h5"
										dir="rtl"
										sx={{
											fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
										}}
									>
										תמונה מהשטח:
									</Typography>
								</Grid>
								<Grid item>
									<Box
										component="img"
										sx={{
											display: "flex",
											maxHeight: { xs: "70%" },
											maxWidth: { xs: "80%" },
										}}
										dir="rtl"
										alt=""
										src="Images/RowDetails/FieldShot.png"
									/>
								</Grid>
							</Grid>
						</Grid>
						<Divider orientation="vertical" flexItem />
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
											header="מספר חקלאי"
											value={rowSet.agriculturalNumber}
										/>
									</Grid>
									<Grid item>
										<CustomTextPresentation header="סוג השטח" value={rowSet.fieldKind} />
									</Grid>
									<Grid item>
										<CustomTextPresentation header="סוג יבול" value={rowSet.cropKind} />
									</Grid>
								</Grid>
								<Grid
									container
									direction="row"
									gap={15}
									justifyContent="flex-end"
								>
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
											label={rowSet.NSVIScale}
											sx={{ display: "flex", justifyContent: "flex-start" }}
											size="small"
										/>
									</Grid>
									<Grid item sx={{direction: 'rtl'}}>
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
											label={rowSet.attractionScale}
											sx={{ display: "flex", width: 'fit-content' }}
											size="small"
										/>
									</Grid>
									<Grid item>
										<CustomTextPresentation header="אזור" value={rowSet.area} />
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
												header="מצב היכרות"
												value={aquaintanceMode}
											/>
										</Grid>
										<Grid item>
											<CustomTextPresentation
												header="תאריך הקמת שטח"
												value={fieldDateEstablishment}
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
											gap={5}
											justifyContent="flex-end"
										>
											<Grid item>
												<Box display="flex" flexDirection="column" gap={3.5}>
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
													{agriculturalNumbers.map((agriculturalNum) => (
														<Typography
															variant="div"
															component="h5"
															dir="rtl"
															sx={{
																fontFamily:
																	'"Roboto","Helvetica","Arial",sans-serif',
																fontSize: "14px",
															}}
														>
															{agriculturalNum}
														</Typography>
													))}
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
			</Card>
		</Dialog>
	);
};

export default RowDetails;
