import { useState, useMemo } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SortPanel from "./SortPanel";
import CustomSearch from "./CustomSearch";
import DataTable from "./DataTable";

function App() {
  const originalRows = useMemo(() => [
    { id: 1, fieldName: 'sdff', cropKind: 'עגבניה', attractionScale: 9.5, maturityLevel: 'גבוה', NSVIScale: 0.1, area: 'דרום', agriculturalNumber: 123456, status: 'בטיפול', lastUpdate: '10.01.2022' },
    { id: 2, fieldName: 'dggh', cropKind: 'גמבה', attractionScale: 2, maturityLevel: 'גבוה', NSVIScale: 0.3, area: 'צפון', agriculturalNumber: 123456, status: 'לא בטיפול', lastUpdate: '17.12.2022' },
    { id: 3, fieldName: 'Some', cropKind: 'מלפפון', attractionScale: 8.5, maturityLevel: 'גבוה', NSVIScale: 0.2, area: 'מרכז', agriculturalNumber: 123456, status: 'לא בטיפול', lastUpdate: '10.02.2020' },
    { id: 4, fieldName: 'hghm', cropKind: 'עגבניה', attractionScale: 9, maturityLevel: 'גבוה', NSVIScale: 0.5, area: 'דרום', agriculturalNumber: 123456, status: 'לא עדכני', lastUpdate: '01.09.2012' },
    { id: 5, fieldName: 'Some', cropKind: 'מלפפון', attractionScale: 9.5, maturityLevel: 'גבוה', NSVIScale: 0.5, area: 'מרכז', agriculturalNumber: 123456, status: 'לא בטיפול', lastUpdate: '10.02.2022' },
    { id: 6, fieldName: 'nhiiy', cropKind: 'עגבניה', attractionScale: 7, maturityLevel: 'גבוה', NSVIScale: 0.1, area: 'צפון', agriculturalNumber: 123456, status: 'בטיפול', lastUpdate: '03.02.2015' },
    { id: 7, fieldName: 'aaa', cropKind: 'גמבה', attractionScale: 5, maturityLevel: 'גבוה', NSVIScale: 0.5, area: 'דרום', agriculturalNumber: 123456, status: 'בטיפול', lastUpdate: '10.02.2022' },
    { id: 8, fieldName: 'dvnh', cropKind: 'קיווי', attractionScale: 5.5, maturityLevel: 'גבוה', NSVIScale: 0.5, area: 'מרכז', agriculturalNumber: 123456, status: 'לא עדכני', lastUpdate: '21.12.2022' },
    { id: 9, fieldName: 'bnm', cropKind: 'מלפפון', attractionScale: 6, maturityLevel: 'גבוה', NSVIScale: 0.6, area: 'צפון', agriculturalNumber: 123456, status: 'בטיפול', lastUpdate: '10.02.2022' },
    { id: 10, fieldName: 'Some', cropKind: 'גמבה', attractionScale: 1, maturityLevel: 'גבוה', NSVIScale: 0.9, area: 'צפון', agriculturalNumber: 123456, status: 'בטיפול', lastUpdate: '10.02.2022' },
    { id: 11, fieldName: 'dsf', cropKind: 'גמבה', attractionScale: 2, maturityLevel: 'גבוה', NSVIScale: 0.4, area: 'מרכז', agriculturalNumber: 123456, status: 'לא עדכני', lastUpdate: '05.12.2016' },
    { id: 12, fieldName: 'dsf', cropKind: 'תות', attractionScale: 2, maturityLevel: 'גבוה', NSVIScale: 0.4, area: 'מרכז', agriculturalNumber: 123456, status: 'לא עדכני', lastUpdate: '10.02.2022' },
    { id: 13, fieldName: 'dfvve', cropKind: 'גמבה', attractionScale: 2, maturityLevel: 'גבוה', NSVIScale: 0.4, area: 'מרכז', agriculturalNumber: 123456, status: 'לא עדכני', lastUpdate: '07.08.2019' },
    { id: 14, fieldName: 'bbb', cropKind: 'חציל', attractionScale: 2, maturityLevel: 'גבוה', NSVIScale: 0.4, area: 'צפון', agriculturalNumber: 123456, status: 'לא עדכני', lastUpdate: '17.07.2018' },
    { id: 15, fieldName: 'mgjme', cropKind: 'תות', attractionScale: 2, maturityLevel: 'גבוה', NSVIScale: 0.4, area: 'מרכז', agriculturalNumber: 123456, status: 'לא עדכני', lastUpdate: '10.02.2022' },
    { id: 16, fieldName: 'asde', cropKind: 'אבטיח', attractionScale: 2, maturityLevel: 'גבוה', NSVIScale: 9.5, area: 'צפון', agriculturalNumber: 123456, status: 'לא עדכני', lastUpdate: '15.08.2017' },
    { id: 17, fieldName: 'zz', cropKind: 'קיווי', attractionScale: 2, maturityLevel: 'גבוה', NSVIScale: 0.4, area: 'דרום', agriculturalNumber: 123456, status: 'לא עדכני', lastUpdate: '21.03.2014' },
    { id: 18, fieldName: 'vfv', cropKind: 'אבטיח', attractionScale: 2, maturityLevel: 'גבוה', NSVIScale: 8.5, area: 'מרכז', agriculturalNumber: 123456, status: 'לא עדכני', lastUpdate: '10.02.2022' },
    { id: 19, fieldName: 'nhg', cropKind: 'גמבה', attractionScale: 2, maturityLevel: 'גבוה', NSVIScale: 0.4, area: 'צפון', agriculturalNumber: 123456, status: 'לא עדכני', lastUpdate: '11.08.2020' },
    { id: 10, fieldName: 'ntjh', cropKind: 'אבטיח', attractionScale: 2, maturityLevel: 'גבוה', NSVIScale: 0.4, area: 'דרום', agriculturalNumber: 123456, status: 'לא עדכני', lastUpdate: '30.12.2022' },
  ], []);

  const [sortMethod, setSortMethod] = useState('');
  const [density, setDensity] = useState('standard');
  const [searchText, setSearchText] = useState('');
  const [cropKind, setCropKind] = useState('');
  const [moreCropKinds, setMoreCropKinds] = useState('');
  const [optionArea, setOptionArea] = useState('הכל');
  const [optionCareStatus, setOptionCareStatus] = useState('הכל');
  const [optionMoreFilters, setOptionMoreFilters] = useState('');
  const [rows, setRows] = useState(originalRows);

  const handleClearFilters = () => {
    setRows(originalRows);
    setOptionArea('הכל');
    setOptionCareStatus('הכל');
    setCropKind('');
    setOptionMoreFilters('');
    setMoreCropKinds('');
  };

  return (
    <>
      <Header setDensity={setDensity} setSearchText={setSearchText} CustomSearch={CustomSearch} />
      <Sidebar />
      <br />
      <SortPanel sortMethod={sortMethod} setSortMethod={setSortMethod} handleClearFilters={handleClearFilters} cropKind={cropKind}
        setCropKind={setCropKind} moreCropKinds={moreCropKinds} setMoreCropKinds={setMoreCropKinds} optionArea={optionArea}
        optionCareStatus={optionCareStatus} optionMoreFilters={optionMoreFilters} setOptionArea={setOptionArea}
        setOptionCareStatus={setOptionCareStatus} setOptionMoreFilters={setOptionMoreFilters} />
      <DataTable rows={rows} setRows={setRows} originalRows={originalRows} density={density} searchText={searchText} cropKind={cropKind}
        optionArea={optionArea} optionCareStatus={optionCareStatus} moreCropKinds={moreCropKinds} optionMoreFilters={optionMoreFilters}
        sortMethod={sortMethod}/>
    </>
  );
}

export default App;
