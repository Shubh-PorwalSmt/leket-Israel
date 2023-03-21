import { TextField, Grid } from "@mui/material";
import CustomDropdown from "./CustomDropdown";
import { cropKindOptions } from "../../constants/filterSelection";
import { areaOptions } from "../../constants/filterSelection";
import { acquaintanceModeOptions } from "../../constants/filterSelection";

const Step2 = (textFieldStyle) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
    >
      <CustomDropdown
        id="cropKind"
        label="סוג יבול"
        options={cropKindOptions}
      />
      <CustomDropdown
        id="fieldKind"
        label="סוג שטח"
        options={cropKindOptions}
      />
      <TextField
        variant="standard"
        required
        id="agriculturalNumber"
        name="agriculturalNumber"
        label="מספר חקלאי"
        sx={textFieldStyle}
      />
      <CustomDropdown id="area" label="איזור" options={areaOptions} />
      <CustomDropdown
        id="acquaintanceMode"
        label="מצב היכרות"
        options={acquaintanceModeOptions}
      />
    </Grid>
  );
};

export default Step2;
