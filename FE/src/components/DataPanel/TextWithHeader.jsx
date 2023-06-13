import React from 'react';

const TextWithHeader = ({header, value}) => {

	return (
		<div style={{fontSize: '14px', direction: 'rtl'}}>
			<div>{header}</div>
			<div>{value}</div>
		</div>
	);
};

export default TextWithHeader;
