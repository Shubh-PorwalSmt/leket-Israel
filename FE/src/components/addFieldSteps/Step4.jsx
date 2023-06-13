import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import * as fieldActions from '../../redux/Field/actions';
import FieldMapArea from "../FieldMapArea";

const Step4 = (props) => {
	const [loading, setLoading] = useState(true);
	const {xAxis, yAxis, polygon, onChangeField} = props;
	const [polygonCoordinates, setPolygonCoordinates] = useState(polygon && polygon.coordinates);
	let [index, setIndex] = useState(1);
	const dispatch = useDispatch();

	useEffect(() => {
		const load = async () => {
			if(xAxis !== "" && yAxis !== "") {
				const point = [xAxis, yAxis];
				await dispatch(fieldActions.findFieldByPoint(point, (field) => {
					if(field && field.polygon) {
						const polygon = JSON.parse(field.polygon);
						setPolygonCoordinates(polygon.coordinates);
					}
					setLoading(false);
				}));
			}
			else {
				setLoading(false);
			}
		};
		load();
	}, [xAxis, yAxis]);

	console.log("Step4 ");

	const resetLocation = () => {
		console.log("resetLocation");
		setIndex(Math.random());
	};

	const updateFields = (newPolygon, newPoint) => {
		console.log("updateFields");
		onChangeField('geo', { polygon: newPolygon, point: newPoint });
	};

	if(loading) {
		return <div/>;
	}

	return (
		<FieldMapArea
			editable
			onReset={resetLocation}
			onUpdate={updateFields}
			key={index}
			xAxis={xAxis} yAxis={yAxis}
			polygonCoordinates={polygonCoordinates} />
	);
};

export default Step4;
