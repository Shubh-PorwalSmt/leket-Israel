import { useState } from 'react'
import { Card, InputBase, IconButton } from "@mui/material";
import { Search } from '@mui/icons-material';

const CustomSearch = ({ setSearchText }) => {
    const [openSearchBar, setOpenSearchBar] = useState(false);

    const searchStyle = {
        borderRadius: openSearchBar ? '12px' : '20px',
        backgroundColor: 'rgba(254, 254, 254, 0.5)',
        marginLeft: '24px',
        color: '#3A6E47'
    };

    const handleSearchBar = () => setOpenSearchBar(!openSearchBar);

    const handleSearchBarChange = e => setSearchText(e.target.value);

    return (
        <Card sx={searchStyle}>
            <IconButton color="inherit" onClick={handleSearchBar}>
                <Search />
            </IconButton>
            {openSearchBar ? <InputBase onChange={handleSearchBarChange} placeholder="Search..."  /> : ''}
        </Card>
    )
}

export default CustomSearch;
