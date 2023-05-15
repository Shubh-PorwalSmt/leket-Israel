import React from 'react';
import {useDispatch} from "react-redux";
import {Box, Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography,} from "@mui/material";
import {useState} from "react";
import Input from "../Input";
import {validateEmail} from "../../Utils/general";
import * as userActions from "../../redux/User/actions";

const Signup = ({ textFieldStyle, checkboxStyle, handleSignMethodChange }) => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const updateEmail = (email) => {
		setEmail(email);
		setError("");
	};

	const updateUsername = (userName) => {
		setUsername(userName);
		setError("");
	};

	const updatePassword = (password) => {
		setPassword(password);
		setError("");
	};

	const handleSubmit = () => {
		if(email === "" || username === "" || password === "") {
			setError("יש למלא את כל הפרטים");
		}
		else if(!validateEmail(email)) {
			setError("ש להזין כתובת מייל תקינה");
		}
		else {
			setError("");
			dispatch(userActions.signUp(email, username, password));
		}
	};

	return (
		<Grid container direction="column" justifyContent="space-between">
			<Grid item>
				<br/>
				<Box display="flex" flexDirection="column" gap={3}>
					<Input value={email} onChange={updateEmail} title="* מייל" />
					<Input value={username} onChange={updateUsername} title="* שם משתמש" />
					<Input value={password} onChange={updatePassword} title="* סיסמה" />
				</Box>
				<br/>
				<Typography
					textAlign="center"
					component="div"
					variant="h6"
					color="error"
					fontSize="12px"
					height="20px"
				>
					{ error }
				</Typography>
				<br/>
				<Button
					variant="contained"
					color="success"
					onClick={handleSubmit}
					sx={{ borderRadius: '20px', width: '100%' }}
				>
					הירשם
				</Button>
				<FormControlLabel
					control={<Checkbox size="small" color="success" />}
					sx={checkboxStyle}
					style={{ display: "flex" }}
					label="זכור אותי"
					labelPlacement="start"
				/>
			</Grid>
			<br/>
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
						onClick={() => handleSignMethodChange("signin")}
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
