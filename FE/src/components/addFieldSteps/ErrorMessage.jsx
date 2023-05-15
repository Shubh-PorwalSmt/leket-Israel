import React from "react";
import {Typography} from "@mui/material";

const ErrorMessage = ({text}) => {
	return (
		<Typography
			textAlign="center"
			component="div"
			variant="h6"
			color="error"
			fontSize="12px"
			height="20px"
		>{text}</Typography>
	)
};

export default ErrorMessage;