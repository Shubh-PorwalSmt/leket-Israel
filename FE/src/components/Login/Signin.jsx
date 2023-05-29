import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Checkbox, FormControlLabel, Grid, Link, Typography,} from "@mui/material";
import * as userActions from '../../redux/User/actions';
import Input from "../Input";
// import UserPool from "../../cognito/UserPool";
// import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const Signin = ({ textFieldStyle, checkboxStyle, handleSignMethodChange }) => {
	const dispatch = useDispatch();
	const userLoginStatus = useSelector(state => state.user.userLoginStatus);

	const handleChangeToSignup = () => handleSignMethodChange("signup");

	const handleChangeToForgotpassword = () =>
		handleSignMethodChange("forgotpass");

	const [username, setUsername] = useState("user");
	const [password, setPassword] = useState("fGF#$@gB#%GHG324%H23");

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(userActions.signIn(username, password));

		// const user = new CognitoUser({
		// 	Username: username,
		// 	Pool: UserPool,
		// });
		//
		// const authDetails = new AuthenticationDetails({
		// 	Username: username,
		// 	Password: password,
		// });
		//
		// user.authenticateUser(authDetails, {
		// 	onSuccess: (data) => {
		// 		console.log("Success!: " + data);
		// 	},
		// 	onFailure: (err) => {
		// 		console.error("Error!: " + err);
		// 	},
		// 	newPasswordRequired: (data) => {
		// 		console.log("Password Required!: " + data);
		// 	},
		// });
	};

	return (
		<Grid container direction="column" justifyContent="space-between">
			<Grid item>
				<Box display="flex" flexDirection="column" gap={3.5}>
					<form onSubmit={handleSubmit}>
						<Box display="flex" flexDirection="column" gap={1}>
							<br/>
							<Input value={username} onChange={setUsername} title="שם משתמש" />
							<br/>
							<Input password value={password} onChange={setPassword} title="סיסמא" />
						</Box>

						<br/>
						<Typography
							textAlign="center"
							component="div"
							variant="h6"
							color="error"
							fontSize="12px"
						>
							{
								userLoginStatus === 'wrong' ?
									'שם המשתמש או הסיסמה שגויים' :
									userLoginStatus === 'empty' ? 'יש למלא שם משתמש וסיסמא' : null
							}&nbsp;
						</Typography>

						<Button variant="contained"
						        color="success"
						        type="submit"
						        sx={{ borderRadius: "20px", width: '100%', margin: '10px 0 10px' }}>
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
