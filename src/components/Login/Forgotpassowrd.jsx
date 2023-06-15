import { Box, TextField, Link, Typography, Button } from "@mui/material";

const Forgotpassowrd = ({ textFieldStyle, handleSignMethodChange }) => {
  const handleChangeToSignin = () => handleSignMethodChange("signin");

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField variant="standard" label="מייל" sx={textFieldStyle} required />
      <Button
        variant="contained"
        color="success"
        type="submit"
        sx={{ borderRadius: "20px" }}
      >
        שלח
      </Button>
      <Typography
        textAlign="center"
        component="div"
        variant="h6"
        fontSize="12px"
      >
        נזכרת בסיסמא?{" "}
        <Link
          href="#"
          onClick={handleChangeToSignin}
          fontSize="12px"
          sx={{ color: "green" }}
        >
          לחץ כאן
        </Link>
      </Typography>
    </Box>
  );
};

export default Forgotpassowrd;
