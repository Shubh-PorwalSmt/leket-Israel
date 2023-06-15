import React from "react";
import toggleOff from '../../assets/filters/toggle-box-off.png';
import toggleOn from '../../assets/filters/toggle-box-on.png';

import './ToggleFilter.scss';

const ToggleFilter = props => {
	const {checked, onToggle, children, icon} = props;

	return (
		<div onClick={() => onToggle(children)} className={`toggle-filter-container ${!checked && 'toggle-filter-unchecked'}`} style={{backgroundImage: `url(${checked ? toggleOn : toggleOff})`}}>
			<img src={icon} alt="" />
			{children}
		</div>
	)
};

export default ToggleFilter;