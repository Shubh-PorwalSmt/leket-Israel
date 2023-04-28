import {
  Box,
  Grid,
  TextField,
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { useState } from "react";
// import UserPool from "../../cognito/UserPool";
// import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const Signin = ({ textFieldStyle, checkboxStyle, handleSignMethodChange }) => {
  const handleChangeToSignup = () => handleSignMethodChange("signup");

  const handleChangeToForgotpassword = () =>
    handleSignMethodChange("forgotpass");

  // console.log(process.env);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("Success!: " + data);
      },
      onFailure: (err) => {
        console.error("Error!: " + err);
      },
      newPasswordRequired: (data) => {
        console.log("Password Required!: " + data);
      },
    });
  };

  return (
    <Grid container direction="column" justifyContent="space-between">
      <Grid item>
        <Box display="flex" flexDirection="column" gap={3.5}>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={1}>
              <TextField
                variant="standard"
                label="שם משתמש"
                sx={textFieldStyle}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="standard"
                label="סיסמא"
                sx={textFieldStyle}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{ borderRadius: "20px" }}
            >
              כניסה
            </Button>
          </form>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            href="#"
            onClick={handleChangeToForgotpassword}
            fontSize="12px"
            sx={{ color: "green" }}
          >
            ?שכחת סיסמא
          </Link>
          <FormControlLabel
            control={<Checkbox size="small" color="success" />}
            sx={checkboxStyle}
            label="זכור אותי"
            labelPlacement="start"
          />
        </Box>
      </Grid>
      <Grid item>
        <Typography
          textAlign="center"
          component="div"
          variant="h6"
          fontSize="12px"
        >
          עוד לא נרשמת? להרשמה{" "}
          <Link
            href="#"
            onClick={handleChangeToSignup}
            fontSize="12px"
            sx={{ color: "green" }}
          >
            לחץ כאן
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Signin;
