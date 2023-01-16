import { useState } from 'react'
import { Card, InputBase, IconButton } from "@mui/material";
import { Search } from '@mui/icons-material';

const CustomSearch = ({ setSearchText }) => {
    const [openSearchBar, setOpenSearchBar] = useState(false);

    const searchStyle = {
        borderRadius: openSearchBar ? '20px' : '20px',
        backgroundColor: 'rgba(254, 254, 254, 0.5)',
        marginLeft: '24px',
        color: '#3A6E47',
        '.css-zylse7-MuiButtonBase-root-MuiIconButton-root:hover': {
            backgroundColor: 'white'
        }
    };

    const inputSearchStyle = {
        '.css-yz9k0d-MuiInputBase-input': {
            paddingLeft: '5px' 
        }
    }

    const handleSearchBar = () => setOpenSearchBar(!openSearchBar);

    const handleSearchBarChange = e => setSearchText(e.target.value);

    return (
        <Card sx={searchStyle}>
            <IconButton color="inherit" onClick={handleSearchBar}>
                <Search />
            </IconButton>
            {openSearchBar ? <InputBase sx={inputSearchStyle} onChange={handleSearchBarChange} placeholder="Search..."  /> : ''}
        </Card>
    )
}

export default CustomSearch;
