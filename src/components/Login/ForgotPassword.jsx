import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Box, Button, Link, Typography} from "@mui/material";
import * as userActions from '../../redux/User/actions';
import Input from "../Input";
import {validateEmail} from "../../Utils/general";

const ForgotPassword = ({ textFieldStyle, handleSignMethodChange }) => {
	const dispatch = useDispatch();
	const [mail, setMail] = useState("");
	const [message, setMessage] = useState({});

	const onSubmit = async () => {
		if(!validateEmail(mail)) {
			setMessage({type: 'error', text: 'יש להקליד כתובת מייל חוקית'});
		}
		else {
			await dispatch(userActions.forgotPassword(mail));
			setMessage({type: 'success', text: 'בדוק את המייל לפרטי איפוס סיסמה'});
		}
	};

	const updateEmail = (mail) => {
		setMail(mail);
		setMessage(null);
	};

	return (
		<Box display="flex" flexDirection="column" gap={2}>
			<br/>
			<Input value={mail} onChange={updateEmail} title="* מייל" />

			<Typography
				textAlign="center"
				component="div"
				variant="h6"
				color="error"
				fontSize="12px"
				height="20px"
			>
				{ message != null && message.type && <div style={{color: message.type === 'error' ? 'red' : 'green'}}>{message.text}</div> }
			</Typography>

			<Button
				onClick={onSubmit}
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
					onClick={() => handleSignMethodChange("signin")}
					fontSize="12px"
					sx={{ color: "green" }}
				>
					לחץ כאן
				</Link>
			</Typography>
		</Box>
	);
};

export default ForgotPassword;
