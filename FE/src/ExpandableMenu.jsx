import { Menu, MenuItem, Card } from "@mui/material";
import { useState } from 'react'

const ExpandableMenu = ({ items, displayTag, cropKind=null, setCropKind=null, setOption, rotateArrow, setRotateArrow }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    
    const open = Boolean(anchorEl);

    const handleClick = e => {
        setRotateArrow(!rotateArrow);
        setAnchorEl(e.currentTarget);
    }

    const handleMenuItemClick = e => {
        setRotateArrow(!rotateArrow);
        
        let item = e.currentTarget.firstChild.data;
        setOption(item);

        if (cropKind != null)
            setCropKind([...cropKind, item]);
        
        setAnchorEl(null);
    }

    const handleClose = () => {
        setRotateArrow(!rotateArrow);
        setAnchorEl(null);
    }

    const cropCard = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 125,
        height: 80,
        borderRadius: '10px',
    };

    return (
        <>
            <Card sx={cropCard} aria-controls={ open ? 'basic-menu' : undefined }
                aria-haspopup="true" aria-expanded={ open ? 'true' : undefined } onClick={handleClick}>
                {displayTag}
            </Card>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
                anchorOrigin={{
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
