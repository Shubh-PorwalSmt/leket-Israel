import { Card, InputBase, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

const searchStyle = {
  borderRadius: "12px",
  marginLeft: "24px",
  color: "#3A6E47",
  ".css-zylse7-MuiButtonBase-root-MuiIconButton-root:hover": {
    backgroundColor: "white",
  },
};

const inputSearchStyle = {
  ".css-yz9k0d-MuiInputBase-input": {
    paddingRight: "15px",
    color: "#636363",
  },
};
const CustomSearch = ({ setSearchText }) => {
  const handleSearchBarChange = (e) => setSearchText(e.target.value);

  return (
    <Card sx={searchStyle}>
      <IconButton color="inherit">
        <Search />
      </IconButton>
      <InputBase
        sx={inputSearchStyle}
        dir="rtl"
        onChange={handleSearchBarChange}
        placeholder="הקלד שם שדה"
      />
    </Card>
  );
};

export default CustomSearch;
