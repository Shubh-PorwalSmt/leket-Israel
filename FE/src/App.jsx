import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./Header";
// import Sidebar from "./Sidebar";
import CustomSearch from "./CustomSearch";
import Home from "./Home";
import AddField from "./AddField";

function App() {
  const [searchText, setSearchText] = useState('');
  const [density, setDensity]       = useState('standard');

  return (
    <BrowserRouter>
      <Header setDensity={setDensity} setSearchText={setSearchText} CustomSearch={CustomSearch} />
      {/* <Sidebar /> */}
      <br />
      <Routes>
        <Route path="/"
          element={<Home density={density} searchText={searchText} />}>
        </Route>
        <Route path="/addfield"
          element={<AddField />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
