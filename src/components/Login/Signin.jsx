import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Checkbox, FormControlLabel, Grid, Link, Typography,} from "@mui/material";
import * as userActions from '../../redux/User/actions';
import Input from "../Input";

const Signin = ({ textFieldStyle, checkboxStyle }) => {
	const userLoginStatus = useSelector(state => state.user.userLoginStatus);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [rememberPassword, setRememberPassword] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(userActions.signIn(username, password, rememberPassword));
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
					<div />
					<FormControlLabel
						control={<Checkbox value={rememberPassword} onChange={(event) => {setRememberPassword(event.target.checked)}} size="small" color="success" />}
						sx={checkboxStyle}
						label="זכור אותי"
						labelPlacement="start"
					/>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Signin;
