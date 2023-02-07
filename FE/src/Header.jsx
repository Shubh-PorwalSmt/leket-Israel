import { Typography, AppBar, Toolbar, Button, ButtonGroup, Box, Divider } from "@mui/material";
import { Toc, Logout } from '@mui/icons-material';
import { useState } from "react";

const Header = ({ setDensity, setSearchText, CustomSearch }) => {
    const [leftBtnColor, setLeftBtnColor]   = useState('orange');
    const [rightBtnColor, setRightBtnColor] = useState('white');

    const currentHours = new Date().getHours();
    const welcome = 5 < currentHours && currentHours < 12 ? 'בוקר טוב אלירן' : 12 < currentHours && currentHours < 17 ? 'צהריים טובים אלירן' : 'ערב טוב אלירן'; 

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
        <>
            <AppBar elevation={0} position='absolute' sx={{ backgroundColor: "#488856" }}>
                {/* sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px`, backgroundColor: "#488856" }}> */}
                <Toolbar>
                    <ButtonGroup variant="contained" sx={{ borderRadius: '10%' }}>
                        <Button elevation={9} onClick={handleClickViewBtnColor} sx={leftButtonStyle}>
                            <Box component="img" alt="" width={25} height={25} src="http://localhost:3000/images/header/gridForm.png"
                                sx={{ filter: leftBtnColor === 'orange' ? 'brightness(0) invert(1)' : 'invert(34%) sepia(56%) saturate(372%) hue-rotate(83deg) brightness(75%) contrast(87%)', }} />
                        </Button>
                        <Button elevation={9} onClick={handleClickViewBtnColor} sx={rightButtonStyle}>
                            <Toc />
                        </Button>
                    </ButtonGroup>
                    <CustomSearch setSearchText={setSearchText} />
                    <Button variant="text" startIcon={<Logout />} sx={{ color: '#b4dbbe', marginLeft: 'auto', marginRight: '4px',
                        fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontWeight: 'bold', fontSize: '13.5px', borderRadius: '10px', }}>
                        התנתקות
                    </Button>
                    <Divider orientation="vertical" variant="middle" sx={{ backgroundColor: 'white', marginTop: '32px', marginBottom: '32px' }} light flexItem />
                    <Typography sx={{ marginLeft: '10px', fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontWeight: 'bold', fontSize: '20px' }} edge="start"
                        component="span" variant="h6" color="inherit">
                        {welcome}
                    </Typography>
                    <Box component="img" sx={{ backgroundColor: '#fefaef', boxShadow: 5 }} alt="" borderRadius='0px 0px 0px 20px'
                        marginLeft={4} marginRight={-3} width={80} height={80} src="http://localhost:3000/images/sidebar/LeketIsraelLogos.png" />
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;
