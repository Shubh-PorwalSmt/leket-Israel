import {
  Checkbox,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Link,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

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
        fontWeight: 'bold',
        fontSize: "12px"
    }
}

const Login = () => {
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
          <Box display="flex" flexDirection="column" gap={3.5}>
            <Box
              component="img"
              alt=""
              src="Images/Login/LeketIsraelLogo.png"
            />
            <Box display="flex" flexDirection="column" gap={1}>
              <TextField
                variant="standard"
                label="שם משתמש"
                sx={textFieldStyle}
                required
              />
              <TextField
                variant="standard"
                label="סיסמא"
                sx={textFieldStyle}
                required
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
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link href="#" fontSize="12px" sx={{ color: "green" }}>
              ?שכחת סיסמא
            </Link>
            <FormControlLabel
              control={<Checkbox size="small" color="success" />}
              sx={checkboxStyle}
              label="זכור אותי"
              labelPlacement="start"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
