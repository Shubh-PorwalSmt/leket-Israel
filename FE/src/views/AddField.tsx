import {
  Card,
  Box,
  IconButton,
  CardContent,
  CardActions,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid
} from "@mui/material";
import { Close } from "@mui/icons-material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Step1 from "../components/addFieldSteps/Step1";
import Step2 from "../components/addFieldSteps/Step2";
import Step3 from "../components/addFieldSteps/Step3";
import Step4 from "../components/addFieldSteps/Step4";
import { fields } from "../constants/fields.json"

const stepperStyle = {
  ".css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active, .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed":
    {
      color: "orange",
    },
};

const boxStyle = {
  display: "flex",
  width: "30%",
  height: "70%",
  margin: 0,
  position: "absolute",
  right: "35%",
  bottom: "15%"
}

const cardStyle = {
  display: "flex",
  borderRadius: "10px",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignContent: "center"
};

const textFieldStyle = {
  ".css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
    // fontFamily: 'Open Sans Hebrew'
    color: "#6A6A6A",
    fontWeight: "bold",
  },
  ".css-1ptx2yq-MuiInputBase-root-MuiInput-root::after": {
    borderBottom: "2px solid #6A6A6A",
  },
  ".css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
    color: "#6A6A6A",
    fontWeight: "bold",
  },
};

const steps = [1, 2, 3, 4];

const AddField = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState({
    fieldName: "",
    cropKind: "",
    fieldKind: "",
    agriculturalNumber: "",
    area: "",
    acquaintanceMode: "",
    xaxis: "",
    yaxis: "",
    fieldNumber: "",
  });

  const navigate = useNavigate();

  const handleNextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target;

    for (var field of Object.entries(target)) {
      // TODO: need fix that all values will be added to the dataState
      if (fields.includes(field[1].name)) {
        // console.log(field[1].name);
        // console.log(field[1].value);
        setData((prevStep) => ({
          ...prevStep,
          [field[1].name]: field[1].value,
        }));
      }
    }

    console.log(data);

    if (activeStep !== 3) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Box sx={boxStyle}>
      <Card elevation={10} dir="rtl" sx={cardStyle}>
        <CardContent>
          <form onSubmit={handleNextSubmit}>
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
                <Stepper activeStep={activeStep} sx={stepperStyle}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel />
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              <Grid item>
                {activeStep === 0 ? (
                  <Step1 textFieldStyle={textFieldStyle} />
                ) : activeStep === 1 ? (
                  <Step2 textFieldStyle={textFieldStyle} />
                ) : activeStep === 2 ? (
                  <Step3 />
                ) : (
                  <Step4 textFieldStyle={textFieldStyle} />
                )}
              </Grid>
              <Grid item position="absolute" top="75%">
                <CardActions>
                  <IconButton color="success" onClick={handleClose}>
                    <Close />
                  </IconButton>
                  <Button
                    variant="outlined"
                    onClick={activeStep === 0 ? handleClose : handleBack}
                    color="success"
                    sx={{ borderRadius: "20px", marginLeft: 1 }}
                  >
                    {activeStep === 0 ? "ביטול" : "חזור"}
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    sx={{ borderRadius: "20px" }}
                  >
                    {activeStep === 3 ? "סיים" : "המשך"}
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddField;
