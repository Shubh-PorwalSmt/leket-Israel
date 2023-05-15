import React, {lazy} from "react";
import {useSelector} from 'react-redux';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import { Box, GlobalStyles } from "@mui/material";
import Header from "./components/Header/Header";
const Home = lazy(() => import("./views/Home"));
const LoginPanel = lazy(() => import("./views/LoginPanel"));
import { ContextProvider } from "./hooks/ContextApi";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
	const user = useSelector(state => state.user.user);
console.log("user = ", user);
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
