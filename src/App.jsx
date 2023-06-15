import React from "react";
import {useSelector} from 'react-redux';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as he from './Utils/translations/he';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {Box, GlobalStyles} from "@mui/material";
import Header from "./components/Header/Header";
import {ContextProvider} from "./hooks/ContextApi";
import CssBaseline from "@mui/material/CssBaseline";
import Home from './views/Home';
import LoginPanel from './views/LoginPanel';
import {ToastContainer} from 'react-toastify';

import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';

const App = () => {
	const user = useSelector(state => state.user.user);

	i18n
		.use(initReactI18next)
		.init({
			resources: {
				he: { translation: he }
			},
			lng: 'he', // Set the default language
			fallbackLng: 'he' // Set the fallback language
		});

	if(user == null) {
		return (
			<Router>
				<Routes>
					<Route path="/signin" element={<LoginPanel />} />
					<Route path="*" element={<Navigate to="/signin" />} />
				</Routes>
			</Router>
		);
	}

	return (
		<Box>
			<ToastContainer />
			<CssBaseline />
			<GlobalStyles
				styles={{
					"*, *::-webkit-scrollbar, *::-webkit-scrollbar, *::-webkit-scrollbar-track, *::-webkit-scrollbar-thumb":
						{
							scrollbarColor: "#6CA079 transparent",
						},
				}}
			/>
			<ContextProvider>
				<Header />
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Router>
			</ContextProvider>
		</Box>
	);
};

export default App;
