import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Dialog,
	Grid,
	IconButton,
	Step,
	StepLabel,
	Stepper,
	Typography
} from "@mui/material";
import {Check, Close} from "@mui/icons-material";
import Step1 from "../components/addFieldSteps/Step1";
import Step2 from "../components/addFieldSteps/Step2";
import Step3 from "../components/addFieldSteps/Step3";
import Step4 from "../components/addFieldSteps/Step4";
import Step5 from "../components/addFieldSteps/Step5";
import * as fieldActions from '../redux/Field/actions';
import {showToast} from "../Utils/general";

const cardStyle = {
	display: "flex",
	justifyContent: "center",
	width: "900px",
	height: "700px"
};

const closeIconStyle = {
	position: 'absolute',
	top: 0,
	left: 0
};

const steps = [1, 2, 3, 4, 5];

const AddField = ({onClose}) => {
	const [activeStep, setActiveStep] = useState(0);
	const [step1Error, setStep1Error] = useState(null);
	const [step2Error, setStep2Error] = useState(null);
	const [step3Error, setStep3Error] = useState(null);
	const [field, setField] = useState({
		name: "",
		product_name: "",
		region: "",
		farmer_id: "",
		familiarity: "",
		xAxis: "", //32.447583195
		yAxis: "" //35.053553581
	});

	const dispatch = useDispatch();

	const CustomIcon = ({ active, completed, icon, }) => {
		const contents = completed ? <Check fontSize="inherit" /> : icon;
		return (
			<div style={{
				backgroundColor: active || completed ? "#D86D12" : "#F5F5F5",
				color: active || completed ? "#FFFFFF" : "#C0C0C0",
				minHeight: "35px",
				minWidth: "35px",
				borderRadius: "50%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				padding: "5px",
				fontSize: "1rem",
			}}>
				{contents}
			</div>
		);
	};

	const isInIsrael = (lat, lng) => {
		const israelBoundingBox = {
			minLng: 34.2676,
			maxLng: 35.8984,
			minLat: 29.4544,
			maxLat: 33.3336,
		};

		return (
			lng >= israelBoundingBox.minLng &&
			lng <= israelBoundingBox.maxLng &&
			lat >= israelBoundingBox.minLat &&
			lat <= israelBoundingBox.maxLat
		);
	};

	const handleNextSubmit = () => {
		setStep1Error(null);
		setStep2Error(null);
		setStep3Error(null);

		switch(activeStep) {
			case 0:
				if(field.name == null || field.name === "") {
					setStep1Error("יש להזין שם שטח");
					return;
				}
				break;
			case 1:
				if(field.product_name == null || field.product_name === "") {
					setStep2Error({name: 'product_name', text: "יש להזין סוג שטח"});
					return;
				} else if(field.farmer_id == null || field.farmer_id === "") {
					setStep2Error({name: 'farmer_id', text: "יש להזין מספר חקלאי"});
					return;
				}
				else if(field.region == null || field.region === "") {
					setStep2Error({name: 'region', text: "יש להזין איזור"});
					return;
				}
				else if(field.familiarity == null || field.familiarity === "") {
					setStep2Error({name: 'familiarity', text: "יש להזין מצב היכרות"});
					return;
				}
				break;
			case 2:
				if(field.xAxis && field.xAxis !== "" && field.yAxis && field.yAxis !== "" && !isInIsrael(field.xAxis, field.yAxis)) {
					setStep3Error({name: 'location', text: "המיקום אינו תקין"});
					return;
				}
		}
		if (activeStep !== 4) {
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
		else {
			// console.log(field);
			dispatch(fieldActions.saveNewField(field));
			console.log("saved!");
			showToast("השטח החדש נשמר בהצלחה.");
			onClose();
		}
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const updateField = (key, value) => {
		if(key === 'geo') {
			const fld = {...field};
			fld.point = value.point;
			fld.polygon = value.polygon;
			setField(fld);
		}
		else {
			const fld = {...field};
			fld[key] = value;
			setField(fld);
		}
	};

	return (
		<Dialog maxWidth={false} open={true}>
			<Card elevation={10} dir="rtl" sx={cardStyle}>
				<CardContent>
					<div style={closeIconStyle}>
						<IconButton color="success" onClick={onClose}>
							<Close />
						</IconButton>
					</div>
					<Grid
						container
						direction="column"
						alignItems="center"
						justifyContent="space-evenly"
						spacing={5}
					>
						<Grid item>
							<Typography
								variant="h5"
								component="div"
								sx={{ color: "#242424", fontWeight: "bold" }}
							>
								הוספת שטח חדש
							</Typography>
						</Grid>
						<Grid item>
							<Stepper activeStep={activeStep} >
								{steps.map((label) => (
									<Step key={label}>
										<StepLabel StepIconComponent={CustomIcon} />
									</Step>
								))}
							</Stepper>
						</Grid>
						<Grid item>
							{activeStep === 0 ? (
								<Step1 name={field.name} onChange={value => updateField('name', value)} error={step1Error} />
							) : activeStep === 1 ? (
								<Step2 product_name={field.product_name}
								       farmer_id={field.farmer_id}
								       region={field.region}
								       familiarity={field.familiarity}
								       error={step2Error}
								       onChangeField={updateField} />
							) : activeStep === 2 ? (
								<Step3 xAxis={field.xAxis}
								       yAxis={field.yAxis}
								       error={step3Error}
								       onChangeField={updateField} />
							) : activeStep === 3 ? (
								<Step4 xAxis={field.xAxis}
								       yAxis={field.yAxis}
								       polygon={field.polygon}
								       onChangeField={updateField} />
							) : (
								<Step5 field={field} />
							)}
						</Grid>
						<Grid item position="absolute" bottom="30px">
							<CardActions>
								<Button
									variant="outlined"
									onClick={activeStep === 0 ? onClose : handleBack}
									color="success"
									sx={{ borderRadius: "20px", padding: '5px 20px', marginLeft: '20px' }}
								>
									{activeStep === 0 ? "ביטול" : "חזור"}
								</Button>
								<Button
									variant="contained"
									color="success"
									onClick={handleNextSubmit}
									sx={{ borderRadius: "20px", padding: '5px 20px' }}
								>
									{activeStep == "4" ? "סיים" : "המשך"}
								</Button>
							</CardActions>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Dialog>
	);
};

export default AddField;
