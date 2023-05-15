import React from "react";

import './Input.scss';

const Input = props => {
	const {value, onChange, placeholder, title, password} = props;

	return (
		<div className="input-container">
			<div className="input-title">{title}</div>
			<input type={password ? 'password' : 'text'} className="input-field" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
		</div>
	)
};

export default Input;
