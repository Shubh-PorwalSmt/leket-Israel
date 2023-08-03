import React from 'react';

const TextWithHeader = ({header, value}) => {

	return (
		<div style={{fontSize: '12px', color: '#6A6A6A', direction: 'rtl'}}>
			<div>{header}</div>
			<div style={{fontSize: '12px', color: '#000', fontWeight: 'bold'}}>{value}</div>
		</div>
	);
};

export default TextWithHeader;
