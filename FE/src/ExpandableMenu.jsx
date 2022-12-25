import { Menu, MenuItem, Card } from "@mui/material";
import { useState } from 'react'

const ExpandableMenu = ({ items, displayTag, setOption }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    
    const open = Boolean(anchorEl);

    const handleClick = e => setAnchorEl(e.currentTarget);

    const handleMenuItemClick = (e) => {
        setOption(e.currentTarget.firstChild.data);
        setAnchorEl(null);
    }

    const handleClose = () => setAnchorEl(null);

    const cropCard = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
        height: 80,
        borderRadius: '10px',
    };

    return (
        <>
            <Card sx={cropCard} aria-controls={ open ? 'basic-menu' : undefined }
                aria-haspopup="true" aria-expanded={ open ? 'true' : undefined } onClick={handleClick}>
                {displayTag}
            </Card>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}>
                {items.map(item => (<MenuItem key={item} onClick={handleMenuItemClick}>{item}</MenuItem>))}
            </Menu>
        </>
    )
}

export default ExpandableMenu;
