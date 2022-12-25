import { Card, Typography, AppBar, Toolbar, IconButton, Button, ButtonGroup } from "@mui/material";
import { Search, Toc, QueueMusic } from '@mui/icons-material';
import { useState } from "react";

const Header = () => {
    const [leftBtnColor, setLeftBtnColor] = useState('orange');
    const [rightBtnColor, setRightBtnColor] = useState('white');

    const drawerWidth = 70;
    
    const rightButtonStyle = {
        backgroundColor: rightBtnColor,
        color: rightBtnColor === 'orange' ? 'white' : 'black',
        maxWidth: '20px',
        '&:hover': {
            backgroundColor: rightBtnColor
        }
    };

    const leftButtonStyle = {
        backgroundColor: leftBtnColor,
        color: leftBtnColor === 'orange' ? 'white' : 'black',
        maxWidth: '20px',
        '&:hover': {
            backgroundColor: leftBtnColor
        }
    };

    const handleClickViewBtnColor = () => {
        setLeftBtnColor(rightBtnColor);
        setRightBtnColor(leftBtnColor);
    }
    
    return (
        <AppBar elevation={0} position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }} 
             color="transparent">
            <Toolbar variant="dense">
                <ButtonGroup variant="contained" sx={{ borderRadius: '10%' }}>
                    <Button onClick={handleClickViewBtnColor} sx={rightButtonStyle}>
                        <QueueMusic />
                    </Button>
                    <Button onClick={handleClickViewBtnColor} sx={leftButtonStyle}>
                        <Toc />
                    </Button>
                </ButtonGroup>
                <Card sx={{ borderRadius: '30%', backgroundColor: 'rgba(254, 254, 254, 0.5)', marginLeft: '24px' }}>
                    <IconButton color="inherit">
                        <Search />
                    </IconButton>
                </Card>
                <Typography sx={{ marginLeft: 'auto', fontWeight: 'bold', fontSize: '24px' }} edge="start"
                    component="span" variant="h6" color="inherit">
                    לקט ישראל
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
