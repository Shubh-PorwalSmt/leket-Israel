import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Dialog, DialogTitle, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DATE_FORMAT} from "../../Utils/constants";
import * as fieldActions from '../../redux/Field/actions';

import './DelayReason.scss';

const DelayReason = props => {
	const { fieldId, onChange, onClose } = props;
	const field = useSelector(state => state.field.fields).find(f => f.id === fieldId);
	const [delayDate, setDelayDate] = useState(field.delay_date || new Date());
	const dispatch = useDispatch();

	console.log(field);
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

	const styles = {
		readOnlyInput: {
			pointerEvents: 'none',
		},
	};

	return (
		<Dialog open maxWidth="l">
			<div className="delay-reason-container">
				<DialogTitle>למתי תרצה להשהות את הטיפול?</DialogTitle>
				<div>
					<div>
						לתאריך
					</div>
					<div>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								format={DATE_FORMAT}
								value={delayDate}
								minDate={new Date()}
								onChange={(newFromDate) => setDelayDate(newFromDate)}
								renderInput={(props) => (
									<TextField
										{...props}
										onFocus={(e) => {e.target.blur()}}
									/>
								)}
							/>
						</LocalizationProvider>
					</div>
				</div>

				<div className="delay-reason-buttons">
					<Button
						variant="contained"
						color="success"
						onClick={updateDelayDate}
						sx={{ borderRadius: "20px", padding: '5px 20px' }}
					>
						אישור
					</Button>
				</div>
			</div>
		</Dialog>
	)
};

export default DelayReason;