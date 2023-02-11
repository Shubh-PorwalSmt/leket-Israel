import { Grid } from "@mui/material";
import { useContext } from "react";
import SortPanel from '../components/SortPanel'
import DataTable from "../components//DataTable";
import ContextProvider from "../hooks/ContextApi";
import { data as originalRows } from '../constants/mockGridData'

const Home = () => {
  const { searchText } = useContext(ContextProvider);
  const { density } = useContext(ContextProvider);
  const { sortMethod } = useContext(ContextProvider);
  const { cropKind } = useContext(ContextProvider);
  const { moreCropKinds } = useContext(ContextProvider);
  const { optionArea } = useContext(ContextProvider);
  const { optionCareStatus } = useContext(ContextProvider);
  const { optionMoreFilters } = useContext(ContextProvider);
  const { rows, setRows } = useContext(ContextProvider);

  return (
    <Grid container display="grid" marginTop="3%" sx={{ paddingLeft: 7, paddingRight: 7 }}>
      <SortPanel />
      <DataTable rows={rows} setRows={setRows} originalRows={originalRows} density={density} searchText={searchText} cropKind={cropKind}
        optionArea={optionArea} optionCareStatus={optionCareStatus} moreCropKinds={moreCropKinds} optionMoreFilters={optionMoreFilters}
        sortMethod={sortMethod}/>
    </Grid>
  );
}

export default Home;
