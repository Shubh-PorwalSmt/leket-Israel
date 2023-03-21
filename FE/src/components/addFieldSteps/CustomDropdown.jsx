import { Select, FormControl, MenuItem, InputLabel } from "@mui/material";
import { useState } from "react";

const CustomDropdown = ({ id, label, options }) => {
  const [value, setValue] = useState("");
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl
      required
      variant="standard"
      size="small"
      sx={{ m: 0.5, minWidth: 80, direction: "rtl" }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        name={id}
        id={id}
        value={value}
        onChange={handleChange}
        autoWidth
        label={label}
      >
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomDropdown;
