import { Box, Card, CardContent, Typography, Grid } from "@mui/material"
import { DirectionsCarFilled, KeyboardArrowDown } from '@mui/icons-material';
import { useState } from 'react'
import ExpandableMenu from "./ExpandableMenu";

const FilterCrop = ({ cardText, imageStyle }) => {
    const [option, setOption] = useState('');

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
            <Typography component="div" variant="h6" fontSize='16px' fontWeight="bold" sx={cardText}>{option}</Typography>
        </Box>
    </CardContent>

    return (
        <Box display="flex" flexDirection='column'>
            <Typography variant="h5" fontSize='20px' fontWeight="bold" sx={cardText}>מסנן סוג יבול</Typography>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center" columnGap={2} marginTop="2%">
                <Box display="flex" flexDirection='row'>
                    <ExpandableMenu items={['חציל', 'קיווי', 'אבטיח', 'תות', 'אפרסמון']} displayTag={displayTag} setOption={setOption} />
                </Box>
                <Card sx={cropCard}>
                    <CardContent>
                        <DirectionsCarFilled sx={imageStyle} />
                        <Typography component="div" variant="h6" fontSize='16px' sx={cardText}>גזר</Typography>
                    </CardContent>
                </Card>
                <Card sx={cropCard}>
                    <CardContent>
                        <DirectionsCarFilled sx={imageStyle} />
                        <Typography component="div" variant="h6" fontSize='16px' sx={cardText}>גמבה</Typography>
                    </CardContent>
                </Card>
                <Card sx={cropCard}>
                    <CardContent>
                        <DirectionsCarFilled sx={imageStyle} />
                        <Typography component="div" variant="h6" fontSize='16px' sx={cardText}>מלפפון</Typography>
                    </CardContent>
                </Card>
                <Card sx={cropCard}>
                    <CardContent>
                        <DirectionsCarFilled sx={imageStyle} />
                        <Typography component="div" variant="h6" fontSize='16px' sx={cardText}>עגבניה</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Box>
    )
}

export default FilterCrop;
