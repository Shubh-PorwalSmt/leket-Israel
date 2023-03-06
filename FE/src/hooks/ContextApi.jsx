import { createContext, useState } from "react";
import { data as originalRows } from "../constants/mockGridData.json";

const ContextApi = createContext({});

export default ContextApi;

export const ContextProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [mode, setMode] = useState("grid");
  const [sortMethod, setSortMethod] = useState("");
  const [cropKind, setCropKind] = useState("");
  const [moreCropKinds, setMoreCropKinds] = useState("");
  const [optionArea, setOptionArea] = useState("הכל");
  const [optionCareStatus, setOptionCareStatus] = useState("הכל");
  const [optionMoreFilters, setOptionMoreFilters] = useState("");
  const [rows, setRows] = useState(originalRows);

  return (
    <>
      <ContextApi.Provider
        value={{
          searchText,
          setSearchText,
          mode,
          setMode,
          sortMethod,
          setSortMethod,
          cropKind,
          setCropKind,
          moreCropKinds,
          setMoreCropKinds,
          optionArea,
          setOptionArea,
          optionCareStatus,
          setOptionCareStatus,
          optionMoreFilters,
          setOptionMoreFilters,
          rows,
          setRows,
        }}
      >
        {children}
      </ContextApi.Provider>
    </>
  );
};
