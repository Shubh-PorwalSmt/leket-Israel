import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Button, Dialog, DialogTitle, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DATE_FORMAT} from "../../Utils/constants";
import * as fieldActions from '../../redux/Field/actions';

import './DelayReason.scss';

const DelayReason = props => {
	const { fieldId, onChange, onClose } = props;
	const [delayDate, setDelayDate] = useState(new Date());
	const dispatch = useDispatch();

	useEffect(() => {
		const load = async () => {

		};
		load();
	}, []);

	const updateDelayDate = () => {
		if(onChange) {
			onChange(delayDate);
			onClose();
		}
		else {
			const field = {
				id: fieldId,
				delay_date: delayDate
			};
			dispatch(fieldActions.updateField(field, () => {
				onClose();
			}))
		}
	};

	return (
		<Dialog open maxWidth="l">
			<div className="delay-reason-container">
				<DialogTitle>השהיית טיפול בשדה</DialogTitle>
				<div>
					<div>
						השהייה עד לתאריך
					</div>
					<div>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								format={DATE_FORMAT}
								value={delayDate}
								disableOpenOnEnter
								InputProps={{ onKeyDown: e => e.preventDefault() }}
								onChange={(newFromDate) => setDelayDate(newFromDate)}
								renderInput={(params) => <TextField dir="rtl" {...params} />}
							/>
						</LocalizationProvider>
					</div>
				</div>

				<div className="delay-reason-buttons">
					<Button
						variant="outlined"
						onClick={onClose}
						color="success"
						sx={{ borderRadius: "20px", padding: '5px 20px', marginLeft: '20px' }}
					>
						ללא תאריך יעד
					</Button>
					<Button
						variant="contained"
						color="success"
						onClick={updateDelayDate}
						sx={{ borderRadius: "20px", padding: '5px 20px' }}
					>
						שמור
					</Button>
				</div>
			</div>
		</Dialog>
	)
};

export default DelayReason;