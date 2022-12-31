import { Box, Card, CardContent, Typography, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { DirectionsCarFilled, KeyboardArrowDown } from '@mui/icons-material';
import { useState } from 'react'
import ExpandableMenu from "./ExpandableMenu";

const FilterCrop = ({ cardText, imageStyle, cropKind, moreCropKinds, setCropKind, setMoreCropKinds }) => {
    const handleCropSelection = (e, crop) => { setCropKind(crop); }

    const cropCard = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 110,
        height: 80,
        borderRadius: '10px',
    };

    const displayTag = <CardContent>
        <Box display="flex" flexDirection='row'>
            <KeyboardArrowDown style={{ color: "green" }} sx={imageStyle} />
            <Typography component="div" variant="h6" fontSize='16px' sx={cardText}>עוד סוגי יבול</Typography>
            <Typography component="div" variant="h6" fontSize='16px' fontWeight="bold" sx={cardText}>{moreCropKinds}</Typography>
        </Box>
    </CardContent>

    return (
        <Box display="flex" flexDirection='column'>
            <Typography variant="h5" fontSize='20px' fontWeight="bold" sx={cardText}>מסנן סוג יבול</Typography>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center" columnGap={2} marginTop="2%">
                <Box display="flex" flexDirection='row'>
                    <ExpandableMenu items={['חציל', 'קיווי', 'אבטיח', 'תות', 'אפרסמון']} displayTag={displayTag}
                        cropKind={cropKind} setCropKind={setCropKind} setOption={setMoreCropKinds} />
                </Box>
                <ToggleButtonGroup value={cropKind} onChange={handleCropSelection} color="success">
                    <ToggleButton value="גזר" sx={cropCard}>
                        {/* <Card sx={cropCard}> */}
                            <CardContent>
                                <Box component="img" sx={imageStyle} alt="" src="http://localhost:3000/images/vegetables/CarrotIcon.png" />
                                <Typography component="div" variant="h6" fontSize='16px' sx={cardText}>גזר</Typography>
                            </CardContent>
                        {/* </Card> */}
                    </ToggleButton>
                    <ToggleButton value="גמבה" sx={cropCard}>
                        {/* <Card sx={cropCard}> */}
                            <CardContent>
                                <Box component="img" sx={imageStyle} alt="" src="http://localhost:3000/images/vegetables/PapperIcon.png" />
                                <Typography component="div" variant="h6" fontSize='16px' sx={cardText}>גמבה</Typography>
                            </CardContent>
                        {/* </Card> */}
                    </ToggleButton>
                    <ToggleButton value="מלפפון" sx={cropCard}>
                        {/* <Card sx={cropCard}> */}
                            <CardContent>
                                <Box component="img" sx={imageStyle} alt="" src="http://localhost:3000/images/vegetables/CucumberIcon.png" />
                                <Typography component="div" variant="h6" fontSize='16px' sx={cardText}>מלפפון</Typography>
                            </CardContent>
                        {/* </Card> */}
                    </ToggleButton>
                    <ToggleButton value="עגבניה" sx={cropCard}>
                        {/* <Card sx={cropCard}> */}
                            <CardContent>
                                <Box component="img" sx={imageStyle} alt="" src="http://localhost:3000/images/vegetables/TomatoIcon.png" />
                                <Typography component="div" variant="h6" fontSize='16px' sx={cardText}>עגבניה</Typography>
                            </CardContent>
                        {/* </Card> */}
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
        </Box>
    )
}

export default FilterCrop;
