import React, {useContext, useEffect} from 'react';
import {useDispatch} from "react-redux";
import * as userActions from '../../redux/User/actions';
import {AppBar, Box, Button, Divider, Toolbar, Typography} from "@mui/material";
import {Logout} from "@mui/icons-material";

import gridOff from '../../assets/header/grid-off.png';
import gridOn from '../../assets/header/grid-on.png';
import mapOff from '../../assets/header/map-off.png';
import mapOn from '../../assets/header/map-on.png';

import gridView from '../../assets/header/grid-view.png';
import mapView from '../../assets/header/map-view.png';
import logoIcon from '../../assets/header/Logo1.jpg';
import ContextProvider from "../../hooks/ContextApi";
import CustomSearch from "../../components/Header/CustomSearch";
import useDebounce from '../../hooks/useDebounce';

const DEBOUNCED_DELAY = 1000;

const Header = ({  }) => {
	const { setMode, mode } = useContext(ContextProvider);
	const { searchText, setSearchText } = useContext(ContextProvider);
	const { setDebouncedSearchText } = useContext(ContextProvider);

	const dispatch = useDispatch();
	
	const debouncedSearchText = useDebounce(searchText, DEBOUNCED_DELAY);

	useEffect(() => {
		setDebouncedSearchText(debouncedSearchText);
	}, [debouncedSearchText]);

	const currentHour = new Date().getHours();
	let timeOfDay;
	if (currentHour >= 5 && currentHour < 12) {
		timeOfDay = 'בוקר טוב';
	} else if (currentHour >= 12 && currentHour < 17) {
		timeOfDay = 'צהריים טובים';
	} else if (currentHour >= 17 && currentHour < 21) {
		timeOfDay = 'ערב טוב';
	} else {
		timeOfDay = 'לילה טוב';
	}

	const welcome = `${timeOfDay} `;

	const handleLogout = () => {
		dispatch(userActions.signOut());
	};

	const toggleView = () => {
		setMode(mode === 'grid' ? 'map' : 'grid');
	};

	return (
		<AppBar
			elevation={0}
			position="absolute"
			sx={{ backgroundColor: "#488856" }}>
			<Toolbar>
				{/*<img src={mode === 'grid' ? gridView : mapView} onClick={toggleView} alt="" style={{width: '75px', cursor: 'pointer'}} />*/}
					{
						mode === 'grid' ?
							<div>
								<img src={mapOff} onClick={toggleView} style={{width: '47px', cursor: 'pointer'}} title="תצוגת מפה" />
								<img src={gridOn} style={{width: '47px'}} title="תצוגה טבלה" />
							</div>
							:
							<div>
								<img src={mapOn} style={{width: '47px'}} title="תצוגת מפה" />
								<img src={gridOff} onClick={toggleView} style={{width: '47px', cursor: 'pointer'}} title="תצוגה טבלה" />
							</div>
					}

				<CustomSearch setSearchText={setSearchText} />

				<Button
					variant="text"
					startIcon={<Logout style={{transform: 'rotate(180deg)'}} />}
					onClick={handleLogout}
					sx={{
						color: "#b4dbbe",
						marginLeft: "auto",
						marginRight: "4px",
						fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
						fontWeight: "bold",
						fontSize: "13.5px",
						borderRadius: "10px",
					}}
				>
					התנתקות
				</Button>
				<Divider
					orientation="vertical"
					variant="middle"
					sx={{
						backgroundColor: "white",
						marginTop: "32px",
						marginBottom: "32px",
					}}
					light
					flexItem
				/>
				<Typography
					sx={{
						marginLeft: "10px",
						fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
						fontWeight: "bold",
						fontSize: "20px",
					}}
					edge="start"
					component="span"
					variant="h6"
					color="inherit"
				>
					{welcome}
				</Typography>
				<Box
					component="img"
					sx={{ backgroundColor: "#fefaef", boxShadow: 5 }}
					alt=""
					borderRadius="0px 0px 0px 20px"
					marginLeft={4}
					marginRight={-3}
					height={80}
					src={logoIcon}
				/>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
