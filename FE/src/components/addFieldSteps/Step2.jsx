import { TextField, Grid } from "@mui/material";

const Step2 = (textFieldStyle) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignContent="center"
    >
      <TextField
        variant="standard"
        id="cropKind"
        name="cropKind"
        label="סוג יבול"
        sx={textFieldStyle}
      />
      <TextField
        variant="standard"
        id="fieldKind"
        name="fieldKind"
        label="סוג שטח"
        sx={textFieldStyle}
      />
      <TextField
        variant="standard"
        id="agriculturalNumber"
        name="agriculturalNumber"
        label="מספר חקלאי"
        sx={textFieldStyle}
      />
      <TextField
        variant="standard"
        id="area"
        name="area"
        label="איזור"
        sx={textFieldStyle}
      />
      <TextField
        variant="standard"
        id="acquaintanceMode"
        name="acquaintanceMode"
        label="מצב היכרות"
        sx={textFieldStyle}
      />
    </Grid>
  );
};

export default Step2;
