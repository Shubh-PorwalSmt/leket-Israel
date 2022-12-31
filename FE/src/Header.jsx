import { Typography, AppBar, Toolbar, Button, ButtonGroup, Box } from "@mui/material";
import { Toc, QueueMusic, Add } from '@mui/icons-material';
import { useState } from "react";

const Header = ({ setDensity, setSearchText, CustomSearch }) => {
    const [leftBtnColor, setLeftBtnColor] = useState('orange');
    const [rightBtnColor, setRightBtnColor] = useState('white');
    
    const drawerWidth = 70;
    
    const addCropStyle = {
        borderRadius: '12px',
        marginLeft: '24px',
        backgroundColor: 'white',
        color: '#3A6E47',
        fontWeight: '700',
        '&:hover': {
            backgroundColor: 'transparent'
        }
    };

    const rightButtonStyle = {
        backgroundColor: rightBtnColor,
        color: rightBtnColor === 'orange' ? 'white' : '#3A6E47',
        maxWidth: '20px',
        '&:hover': {
            backgroundColor: rightBtnColor
        }
    };

    const leftButtonStyle = {
        backgroundColor: leftBtnColor,
        color: leftBtnColor === 'orange' ? 'white' : '#3A6E47',
        maxWidth: '20px',
        '&:hover': {
            backgroundColor: leftBtnColor
        }
    };

    const handleClickViewBtnColor = () => {
        setLeftBtnColor(rightBtnColor);
        setRightBtnColor(leftBtnColor);

        rightBtnColor === 'orange' ? setDensity('standard') : setDensity('comfortable');
    }
    
    return (
        <AppBar elevation={0} position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }} 
             color="transparent">
            <Toolbar variant="dense">
                <ButtonGroup variant="contained" sx={{ borderRadius: '10%' }}>
                    <Button onClick={handleClickViewBtnColor} sx={leftButtonStyle}>
                        {/* <QueueMusic /> */}
                        {/* TODO: need to fix color change in this icon (maybe convert first to real icon/svg?) */}
                        <Box component="img" alt="" src="http://localhost:3000/images/gridForm.png" />
                    </Button>
                    <Button onClick={handleClickViewBtnColor} sx={rightButtonStyle}>
                        <Toc />
                    </Button>
                </ButtonGroup>
                <Button variant="contained" sx={addCropStyle}>
                    <Add />
                    הוספת שטח
                </Button>
                <CustomSearch setSearchText={setSearchText} />
                <Typography sx={{ marginLeft: 'auto', fontWeight: 'bold', fontSize: '24px' }} edge="start"
                    component="span" variant="h6" color="inherit">
                    לקט ישראל
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
