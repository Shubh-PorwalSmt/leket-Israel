import { Box } from "@mui/material";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Signin from "../components/Login/Signin";
import Signup from "../components/Login/Signup";
import Forgotpassowrd from "../components/Login/Forgotpassowrd";

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

const checkboxStyle = {
  ".css-ahj2mt-MuiTypography-root": {
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: "bold",
    fontSize: "12px",
  },
};

const LoginPanel = () => {
  const [signMethod, setSignMethod] = useState("signin");

  const handleSignMethodChange = (method) => setSignMethod(method);

  return (
    <Box>
      <CssBaseline />
      <Box
        component="img"
        alt=""
        position="fixed"
        src="Images/Login/LoginPoligonField.png"
      />
      <Box
        borderRadius="70px 0px 0px 0px"
        padding={20}
        right={0}
        height="100%"
        width="calc(100% / 3)"
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: "#fefaef", boxShadow: 5 }}
      >
        <Box display="flex" flexDirection="column" gap={0.5}>
          <Box component="img" alt="" src="Images/Login/LeketIsraelLogo.png" />
          {signMethod === "signin" ? (
            <Signin
              textFieldStyle={textFieldStyle}
              checkboxStyle={checkboxStyle}
              handleSignMethodChange={handleSignMethodChange}
            />
          ) : signMethod === "signup" ? (
            <Signup
              textFieldStyle={textFieldStyle}
              checkboxStyle={checkboxStyle}
              handleSignMethodChange={handleSignMethodChange}
            />
          ) : (
            <Forgotpassowrd
              textFieldStyle={textFieldStyle}
              handleSignMethodChange={handleSignMethodChange}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPanel;
