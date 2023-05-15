import React from 'react';
import { Typography, Box } from "@mui/material";

const Step3 = () => {
  return (
    <Box
	    sx={{
		    display: "flex",
		    flexDirection: "column"
	    }}
    >
      <Typography
        variant="h5"
        component="div"
        fontSize={16}
        sx={{ color: "#6A6A6A", fontWeight: "bold" }}
      >
        תמונה מהשטח:
      </Typography>
      {/* Choose select polygon from the map */}

	    <Box
		    component="img"
		    sx={{
			    display: "flex",
			    marginTop: { xs: 2},
			    alignSelf: { xs: "center" },
			    maxHeight: { xs: "70%" },
			    maxWidth: { xs: "80%" },
		    }}
		    dir="rtl"
		    alt=""
		    src="Images/RowDetails/FieldShot.png"
	    />
    </Box>
  );
};

export default Step3;
