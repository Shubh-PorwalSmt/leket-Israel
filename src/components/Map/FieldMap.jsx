import React, {useContext, useState} from 'react';
import {useDispatch} from "react-redux";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet'
import {Button} from "@mui/material";
import {Add, Edit} from "@mui/icons-material";
import L, {divIcon, Polygon} from 'leaflet';
import * as XLSX from "xlsx/xlsx.mjs";
import ContextProvider from "../../hooks/ContextApi";
import {DATE_FORMAT, DEFAULT_LAT_POS, DEFAULT_LONG_POS, DEFAULT_MAP_ZOOM} from "../../Utils/constants";
import translator from "../../Utils/translations/translator";
import CustomStatus from "../DataPanel/CustomStatus";
import moment from "moment/moment";
import {createSvgIcon} from "@mui/material/utils/index";
import RowDetails from "../DataPanel/RowDetails";

import './FieldMap.scss';
import * as fieldActions from "../../redux/Field/actions";

const FieldInfo = ({field, label, highlightValue}) => {
	return (
		<div className="map-tooltip-body-field">
			<div className={highlightValue ? 'map-tooltip-body-field-highlight-value' : 'map-tooltip-body-field-value'}>{field || 'N/A'}</div>
			<div style={{width: '80px'}}>{label}</div>
		</div>
	)
};

const FieldMap = ({rows, onAddField}) => {
	const { setPolygonFilter, setMapZoom } = useContext(ContextProvider);
	const [editedRow, setEditedRow] = useState(null);
	const dispatch = useDispatch();

	function makeACall(bounds, zoom, zoomThreshold = 8) {
		const southWest = bounds.getSouthWest();
		const northEast = bounds.getNorthEast();
		const northWest = L.latLng(northEast.lat, southWest.lng);
		const southEast = L.latLng(southWest.lat, northEast.lng);

		const latLngs = [southWest, northWest, northEast, southEast, southWest];

		const geojsonPolygon = {
			"type": "Polygon",
			"coordinates": [latLngs.map(latLng => [latLng.lat, latLng.lng])]
		};

		setPolygonFilter(geojsonPolygon);
		setMapZoom(zoom);
	}

	const onEditField = async (field) => {
		await dispatch(fieldActions.loadFieldHistory(field.id));
		setEditedRow(field);
	};

	const onMapReady = (e) => {
		// delay is required to wait for the map to load and get the correct bounds
		setTimeout(() => {
			makeACall(e.target.getBounds(), e.target.getZoom());
		}, 200)
	};

	const MapEvents = (e) => {
		const map = useMapEvents({
			moveend: () => makeACall(map.getBounds(), map.getZoom()),
			zoomend: () => makeACall(map.getBounds(), map.getZoom())
		});
		return null;
	};

	const handleClickRowClose = () => {
		setEditedRow(null);
	};

	const PopupComponent = ({field}) => {
		return (
			<div className="map-tooltip">
				<div className="map-tooltip-header">
					<div>
						<CustomStatus fieldId={field.id} removeAllOption status={field.status} label={translator(field.status)} />
					</div>
					<div className="map-tooltip-header-title" title={field.name}>{field.name}</div>
					<div onClick={() => onEditField(field)} style={{cursor: 'pointer'}}>
						<Edit />
					</div>
				</div>
				<div className="map-tooltip-body">
					<div>
						<FieldInfo field={field.latest_attractiveness_metric} label="אטרקטיביות" highlightValue />
						<FieldInfo field={field.latest_satellite_metric ? parseInt(field.latest_satellite_metric * 100) / 100 : '-'} label="NDVI" highlightValue />
					</div>
					<div className="map-tooltip-body-center" />
					<div>
						<FieldInfo field={translator(field.product_name)} label="סוג יבול" />
						<FieldInfo field={translator(field.region)} label="איזור" />
						<FieldInfo field={moment(field.status_date).format(DATE_FORMAT)} label="תאריך עדכון" />
						<FieldInfo field={field.farmer_id} label="מספר חקלאי" />
						<FieldInfo field={translator(field.familiarity)} label="מצב היכרות" />
					</div>
				</div>
			</div>
		);
	};

	const getFieldMarker = (field) => {
		return `
			<div style="position: relative;">
				<div style="position: absolute; width: 52px; display: flex; align-items: center; justify-content: center; height: 48px;">
					<div style="font-weight: bold; background: white; padding: 8px; border-radius: 50%;">${field.latest_satellite_metric ? parseInt(field.latest_satellite_metric * 100) / 100 : 'N/A'}</div>
				</div>
				<svg width="54" height="65" viewBox="0 0 54 65" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M27 0C41.175 0 54 10.465 54 26.65C54 37.44 44.9888 50.2125 27 65C9.01125 50.2125 0 37.44 0 26.65C0 10.465 12.825 0 27 0Z" fill="${getColor(field.latest_satellite_metric || 0)}" />
				</svg>
		</div>
		`;
	};

	const getColor = (value) => {
		const hue = value * (120 - 39) + 39; // Interpolate between 39 (orange) and 120 (green)
		const color = `hsl(${hue}, 100%, 50%)`; // Convert to HSL color
		return color;
	};

	const position = [DEFAULT_LONG_POS, DEFAULT_LAT_POS];

	const GridHeaderButtons = () => {
		const addFieldStyle = {
			borderRadius: "12px",
			marginRight: "12px",
			backgroundColor: "white",
			color: "#3A6E47",
			fontWeight: "700",
			"&:hover": {
				backgroundColor: "#eaf0ee",
			},
		};

		const exportFieldsStyle = {
			direction: "ltr",
			color: "#5cb85c",
			borderRadius: "10px",
			fontWeight: "bold",
			fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
			"&:hover": {
				backgroundColor: "#eaf0ee",
			},
		};

		const handleExport = () => {
			try {
				const sRows =
					rows.size > 0 ? Array.from(rows, (entry) => entry[1]) : rows;

				// for EXCEL
				const worksheet = XLSX.utils.json_to_sheet(sRows);
				const workBook = XLSX.utils.book_new();

				XLSX.utils.book_append_sheet(workBook, worksheet, "fields");

				XLSX.writeFile(workBook, "field.xlsx");
			} catch (e) {
				console.log(e);
			}
		};

		const ExportIcon = createSvgIcon(
			<path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
			"SaveAlt"
		);

		return (
			<div style={{direction: 'rtl', marginTop: '10px'}}>
				<Button
					variant="text"
					sx={exportFieldsStyle}
					onClick={handleExport}
				>
					ייצא
					<ExportIcon sx={{ paddingRight: "10%" }} />
				</Button>
				<Button onClick={onAddField} variant="text" elevation={9} sx={addFieldStyle}>
					<Add />
					הוספת שטח
				</Button>
			</div>
		);
	};

	return (
		<div>
			{ editedRow && <RowDetails onClose={handleClickRowClose} rowSet={editedRow} /> }

			<GridHeaderButtons />
			<MapContainer center={position} zoom={DEFAULT_MAP_ZOOM} whenReady={onMapReady} scrollWheelZoom={true} className="map-container">
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url1="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}"
					url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
					subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
					foo="lang=he"
				/>
				{
					rows.map((field, i) => {
						try {
							return (
								<Marker key={i} position={field.point.coordinates}
								        icon={divIcon({ className: 'custom-marker', html: getFieldMarker(field) })}>
									<Popup autoPan autoPanPadding={[5, 5]} maxWidth={350} minWidth={350} className="map-marker-popup">
										<PopupComponent field={field} />
									</Popup>
								</Marker>
							)
						}
						catch(e) {
							return <div key={i}/>
						}
					})
				}
				<MapEvents />
			</MapContainer>
		</div>
	);
};

export default FieldMap;
