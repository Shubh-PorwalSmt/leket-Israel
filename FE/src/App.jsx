import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./Header";
import Sidebar from "./Sidebar";
import CustomSearch from "./CustomSearch";
import Home from "./Home";

function App() {
  const [density, setDensity] = useState('standard');
  const [searchText, setSearchText] = useState('');

  return (
    <BrowserRouter>
      <Header setDensity={setDensity} setSearchText={setSearchText} CustomSearch={CustomSearch} />
      <Sidebar />
      <br />
      <Routes>
        <Route path="/"
          element={<Home density={density} searchText={searchText} />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
