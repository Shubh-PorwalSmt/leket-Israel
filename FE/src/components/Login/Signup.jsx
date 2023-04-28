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

const Signup = ({ textFieldStyle, checkboxStyle, handleSignMethodChange }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeToSignin = () => handleSignMethodChange("signin");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    UserPool.signUp(email, username, password, [], null, (err, data) => {
      if (err) console.log(err);
      else console.log(data);
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
                label="מייל"
                sx={textFieldStyle}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="standard"
                label="שם משתמש"
                sx={textFieldStyle}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="standard"
                label="סיסמא"
                sx={textFieldStyle}
                // type="password"
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
              הירשם
            </Button>
            <Typography
              textAlign="center"
              component="div"
              variant="h6"
              color="error"
              fontSize="12px"
            >Error</Typography>
          </form>
        </Box>
        <FormControlLabel
          control={<Checkbox size="small" color="success" />}
          sx={checkboxStyle}
          style={{ display: "flex" }}
          label="זכור אותי"
          labelPlacement="start"
        />
      </Grid>
      <Grid item>
        <Typography
          textAlign="center"
          component="div"
          variant="h6"
          fontSize="12px"
        >
          נזכרת שנרשמת?{" "}
          <Link
            href="#"
            onClick={handleChangeToSignin}
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

export default Signup;
