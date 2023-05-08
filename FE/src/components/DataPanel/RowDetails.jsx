import {
  Dialog,
  DialogTitle,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Divider,
  Chip,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { ArrowBack, Edit } from "@mui/icons-material";
import { Box } from "@mui/system";
import CustomStatus from "./CustomStatus";
import useApi from "../../hooks/useApi";
import CustomTextPresentation from "./CustomTextPresentation";

const stepperStyle = {
  ".css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active, .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed":
    {
      color: "orange",
    },
};

const RowDetails = ({ onClose, rowSet }) => {
  const [open, id] = rowSet;

  const { data, error } = useApi({
    method: 'get',
    url: `/fields/${id}`
  });

  console.log(data);

  // console.log(rowSet);
  // make get request to get extra information about the field by it's id
  
  const name = "משק גידולים";
  const dateUpdateStatus = "12.12.22";
  const cropKind = "מלפפון";
  const fieldKind = 'גד"ש';
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

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="lg">
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
                  {name}
                </Typography>
                <Box display="flex" flexDirection="row" gap={1}>
                  <Box display="flex" flexDirection="column" gap={-1}>
                    <CustomTextPresentation
                      header="תאריך עדכון סטטוס:"
                      value={dateUpdateStatus}
                    />
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <CustomStatus label="בטיפול" />
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
                      value={agriculturalNumber}
                    />
                  </Grid>
                  <Grid item>
                    <CustomTextPresentation header="סוג השטח" value={fieldKind} />
                  </Grid>
                  <Grid item>
                    <CustomTextPresentation header="סוג יבול" value={cropKind} />
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
                      label={NDVIness}
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                      size="small"
                    />
                  </Grid>
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
                      מדד אטרקטיביות
                    </Typography>
                    <Chip
                      label={attractivness}
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <CustomTextPresentation header="אזור" value={area} />
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
