import React, {useEffect, useState} from "react";
import {DEFAULT_LAT_POS, DEFAULT_LONG_POS} from "../../Utils/constants";
import {FeatureGroup, MapContainer, Polygon, TileLayer, useMap, useMapEvents} from 'react-leaflet'
import {getPolygonCenter} from "../../Utils/general";
import {EditControl} from 'react-leaflet-draw';
import L from "leaflet";

import './FieldMapArea.scss';

const FieldMapArea = props => {
	const {xAxis, yAxis, polygonCoordinates, width, height, onClick, onReset, onUpdate, editable} = props;
	const [changed, setChanged] = useState(false);
	// const [originalPolygonLayer, setOriginalPolygonLayer] = useState(null);
	const [zoom, setZoom] = useState((polygonCoordinates != null || (xAxis !== "" && yAxis !== "")) ? 15 : 7);
	const mapWidth = width || '700px';
	const mapHeight = height || '40vh';

	// hide tooltips because in small map they prevent the ability to edit
	L.drawLocal.edit.handlers.edit.tooltip.subtext = '';
	L.drawLocal.edit.handlers.edit.tooltip.text    = '';
	L.drawLocal.draw.handlers.polygon.tooltip.end = "";
	L.drawLocal.draw.handlers.polygon.tooltip.start = "";
	L.drawLocal.draw.handlers.polygon.tooltip.cont = "";

	let map;
	let center;

	useEffect(() => {
		const load = async () => {
			center = [xAxis, yAxis];
			try {
				if(map) {
					map.setView(center, zoom);
				}
			}
			catch(e) {
				console.log("map error ", e);
			}
		};
		load();
	}, [xAxis, yAxis]);

	if(xAxis == null || xAxis === "" || yAxis == null || yAxis === "") {
		center = [DEFAULT_LONG_POS, DEFAULT_LAT_POS];
	}
	else {
		center = [xAxis, yAxis];
	}

	const onDrawStop = (e) => {
		// console.log("onDrawStop");
		/*
				let polygons = 0;
				map.eachLayer(function (layer) {
					if(layer instanceof L.Polygon) {
						polygons++;
					}
				});
				// if(polygons < 1) {
				// 	onReset();
				// }*/
	};

	const onDrawStart = (e) => {
		console.log("onDrawStart");
		// setEditedPolygon(null);
		map.eachLayer(function (layer) {
			if (layer instanceof L.Polygon) {
				// if(originalPolygonLayer == null) {
				// 	setOriginalPolygonLayer(layer);
				// }
				map.removeLayer(layer);
			}
		});
		setChanged(true);
	};

	const undoChanges = () => {
		onReset();
	};

	const _onCreate = (e) => {
		console.log("_onCreate: ", e);
		const polyCoordinates = e.layer.getLatLngs()[0].map(c => [c.lat, c.lng]);
		updateFieldGeo(polyCoordinates);
		/*const newPolygon = {
			"type": "Polygon",
			"coordinates": [
				polyCoordinates
			]
		};

		const center = getPolygonCenter(polyCoordinates);
		const newPoint = {
			"type": "Point",
			"coordinates": center
		};

		onUpdate(newPolygon, newPoint);
		*/
		// setChanged(true);
	};

	const updateFieldGeo = (polyCoordinates) => {
		const newPolygon = {
			"type": "Polygon",
			"coordinates": [
				polyCoordinates
			]
		};

		const center = getPolygonCenter(polyCoordinates);
		const newPoint = {
			"type": "Point",
			"coordinates": center
		};

		onUpdate(newPolygon, newPoint);
		setChanged(true);
	};

	const onEditStart = () => {
		// console.log("onEditStart");
	};

	const _onEditedStopped = (e) => {
		// console.log("_onEditedStopped");
	};

	const _onEdited = (e) => {
		const editedLayers = e.layers;  // deleted layers
		editedLayers.eachLayer(function (layer) {
			if(layer instanceof L.Polygon) {
				const polyCoordinates = layer.getLatLngs()[0].map(c => [c.lat, c.lng]);
				updateFieldGeo(polyCoordinates);
			}
			// setTempPolygon(layer.getLatLngs());
			// if(originalPolygonLayer == null) {
			// 	setOriginalPolygonLayer(layer);
			// }
		});
		// console.log("_onEdited: ", e);
	};

	const _onDeleted = (e) => {
		// console.log("_onDeleted: ", e);
		const deletedLayers = e.layers;  // deleted layers
		deletedLayers.eachLayer(function (layer) {
			if(layer instanceof L.Polygon) {
				onUpdate(null, null);
				setChanged(true);
			}
			// if(originalPolygonLayer == null) {
			// 	setOriginalPolygonLayer(layer);
			// }

		});
		// setChanged(true);
	};

	const onMapReady = (e) => {
		console.log("onMapReady");
	};

	const MapEvents = (e) => {
		map = useMapEvents({
			click: (event) => onClick(event.latlng),
			zoomend: (event) => setZoom(event.target.zoom)
		});
		return null;
	};

	// function ChangeView({ center, zoom }) {
	// 	console.log("ChangeView");
	// const map = useMap();
	// map.setView(center, zoom);
	// return null;
	// }

	function MyMapComponent() {
		const map = useMap();

		useEffect(() => {
			map.on('load', () => {
				map.eachLayer((layer) => {
					console.log(layer); // Print out each layer
				});
			});
		}, [map]);

		return null;
	}

	return (
		<div className="field-map-wrapper">
			<div style={{display: 'flex', paddingBottom: '10px', alignItems: 'center', justifyContent: 'space-between'}}>
				<div className="field-map-title" onClick={undoChanges}>השטח:</div>
				{ changed && <div className="field-map-link" onClick={undoChanges}>בטל שינויים</div> }
			</div>
			<MapContainer center={center} zoom={zoom} whenReady={onMapReady} scrollWheelZoom={true} style={{width: mapWidth, height: mapHeight, borderRadius: '10px'}}>
				{/*<ChangeView center={center} zoom={zoom} />*/}
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url1="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}"
					url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
					subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
					foo="lang=he"
				/>
				<MyMapComponent />

				<MapEvents />
				<FeatureGroup>
					{
						editable &&
						<EditControl
							position="topright"
							onCreated={_onCreate}
							onDrawStart={onDrawStart}
							onDrawStop={onDrawStop}
							onDeleted={_onDeleted}
							onEdited={_onEdited}
							onEditStop={_onEditedStopped}
							onEditStart={onEditStart}
							draw={{
								rectangle: false,
								polyline: false,
								polygon: true,
								circle: false,
								circlemarker: false,
								marker: false,
							}}
							edit={{
								remove: true
							}}
						/>
					}
					{ polygonCoordinates && <Polygon positions={polygonCoordinates} editable={false} /> }
				</FeatureGroup>
			</MapContainer>
		</div>
	)
};

export default FieldMapArea;