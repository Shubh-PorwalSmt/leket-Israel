import { TextField } from "@mui/material";

const Step1 = (textFieldStyle) => {
  return (
    <TextField
      variant="standard"
      label="שם שטח"
      id="fieldName"
      name="fieldName"
      sx={textFieldStyle}
    />
  );
};

export default Step1;
