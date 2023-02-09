import { Menu, MenuItem, Card, Checkbox, FormControlLabel, Divider } from "@mui/material";
import { DeleteOutline } from '@mui/icons-material';
import React, { useState } from 'react'
import AdvancedFilters from "./AdvancedFilters";

const ExpandableMenu = ({ identifier = null, isAdvanced, items, displayTag, cropKind = null, setCropKind = null, setOption, option, rotateArrow, setRotateArrow }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const ITEM_HEIGHT = 60;

    const handleClick = e => {
        setRotateArrow(!rotateArrow);
        setAnchorEl(e.currentTarget);
    }

    const handleMenuItemClick = e => {
        setRotateArrow(!rotateArrow);

        try {
            var item = e.target.labels[0].innerText;
            setOption(item);
        } catch (e) { }

        if (cropKind != null)
            setCropKind([...cropKind, item]);

        setAnchorEl(null);
    }

    const handleClearAllClick = e => {
        setOption(identifier === 'MoreFilters' ? 'הכל' : ['']);
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
        border: open ? '1px solid green' : ''
    };

    return (
        <>
            <Card sx={cropCard} aria-controls={open ? 'basic-menu' : undefined}
                aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                {displayTag}
            </Card>
            <Menu id="basic-menu" dir="rtl" anchorEl={anchorEl} open={open} onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                PaperProps={{
                    style: {
                        maxHeight: !isAdvanced ? ITEM_HEIGHT * 4.4 : '',
                        // width: '5rem',
                    },
                }}>
                {!isAdvanced ? items.map(item => (<MenuItem sx={{
                    // width: '90%',
                    background: item === option ? '#d0eacf' : '',
                    borderRadius: '10px',
                    '&:hover': {
                        background: item === option ? '#d0eacf' : ''
                    }
                }}
                    key={item} onClick={handleMenuItemClick}>
                    <FormControlLabel sx={{
                        marginRight: 0,
                        marginLeft: 0,
                        '.css-ahj2mt-MuiTypography-root': {
                            fontWeight: item === option ? 'bold' : ''
                        }
                    }} control={
                        <Checkbox sx={{ borderRadius: '10px' }} checked={item === option ? true : false} color="success" size="small" />
                    } label={item} labelPlacement="end" />
                </MenuItem>)) : <AdvancedFilters />}
                {!isAdvanced ? <Divider /> : ''}
                {!isAdvanced ? <MenuItem onClick={handleClearAllClick} sx={{
                    justifyContent: 'center', fontSize: '14px', color: 'green',
                    fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
                }}>
                    <DeleteOutline fontSize="small" sx={{ marginLeft: 0.5 }} />
                    ניקוי הכל
                </MenuItem> : ''}
            </Menu>
        </>
    )
}

export default ExpandableMenu;
