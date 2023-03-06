import React from "react";
import { RouterProvider } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header/Header";
import router from "./router";
import CustomSearch from './components/Header/CustomSearch'
import { ContextProvider } from "./hooks/ContextApi";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  return (
    <Box>
      <CssBaseline />
      <ContextProvider>
        <Header CustomSearch={CustomSearch} />
        <RouterProvider router={router} />
      </ContextProvider>
    </Box>
  );
};

export default App;
