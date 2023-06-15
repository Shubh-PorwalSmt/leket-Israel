import React from "react";
import toggleOff from '../../assets/filters/toggle-box-off.png';
import toggleOn from '../../assets/filters/toggle-like-box-on.png';

import './ToggleLike.scss';

const ToggleLike = ({ checked, onToggle, children, icon, disable }) => {

	return (
		<div onClick={!disable ? () => onToggle(children) : null} className={`toggle-filter-container-like ${!checked && 'toggle-filter-unchecked-like'}`} style={{backgroundImage: `url(${checked ? toggleOn : toggleOff})`}}>
			<img src={icon} alt="" />
			{children}
		</div>
	)
};

export default ToggleLike;
