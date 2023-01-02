import { Typography, AppBar, Toolbar, Button, ButtonGroup, Box } from "@mui/material";
import { Toc, Add } from '@mui/icons-material';
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
                        <Box component="img" alt="" width={22} height={22} src="http://localhost:3000/images/header/gridForm.png"
                            sx={{ filter: leftBtnColor === 'orange' ? 'brightness(0) invert(1)' : 'invert(34%) sepia(56%) saturate(372%) hue-rotate(83deg) brightness(75%) contrast(87%)', }} />
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
                <Typography sx={{ marginLeft: 'auto', fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontWeight: 'bold', fontSize: '24px' }} edge="start"
                    component="span" variant="h6" color="inherit">
                    לקט ישראל
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
