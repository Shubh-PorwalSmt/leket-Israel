import { Box, CardContent, Typography, Grid, IconButton } from "@mui/material"
import { KeyboardArrowDown, Clear } from '@mui/icons-material';
import { useState } from "react";
import ExpandableMenu from "./ExpandableMenu";

const MoreFilters = ({ cardText, imageStyle }) => {
    const [optionArea, setOptionArea] = useState('הכל');
    const [optionCareStatus, setOptionCareStatus] = useState('הכל');
    const [optionMoreFilters, setOptionMoreFilters] = useState('');

    const displayAreaTag = <CardContent>
        <Box display="flex" flexDirection='row'>
            <KeyboardArrowDown style={{ color: "green" }} sx={imageStyle} />
            <div>
                <Typography component="div" variant="h6" fontSize='16px' sx={cardText}>אזור</Typography>
                <Typography component="div" variant="h6" fontSize='16px' fontWeight="bold" sx={cardText}>{optionArea}</Typography>
            </div>
        </Box>
    </CardContent>

    const displayCareStatusTag = <CardContent>
        <Box display="flex" flexDirection='row'>
            <KeyboardArrowDown style={{ color: "green" }} sx={imageStyle} />
            <div>
                <Typography component="div" variant="h6" fontSize='16px' sx={cardText}>סטטוס טיפול</Typography>
                <Typography component="div" variant="h6" fontSize='16px' fontWeight="bold" sx={cardText}>{optionCareStatus}</Typography>
            </div>
        </Box>
    </CardContent>

    const displayMoreFiltersTag = <CardContent>
        <Box display="flex" flexDirection='row'>
            <KeyboardArrowDown style={{ color: "green" }} sx={imageStyle} />
            <Typography component="div" variant="h6" fontSize='16px' sx={cardText}>עוד מסננים</Typography>
            <Typography component="div" variant="h6" fontSize='16px' fontWeight="bold" sx={cardText}>{optionMoreFilters}</Typography>
        </Box>
    </CardContent>

    const handleClearFilters = () => {
        setOptionArea('');
        setOptionCareStatus('');
        setOptionMoreFilters('');
    };

    return (
        <div>
            <Box display='flex' flexDirection='column'>
                <Typography variant="h5" fontWeight="bold" fontSize='20px' sx={cardText}>עוד מסננים</Typography>
                <Grid container direction="row" justifyContent="flex-end" alignItems="center" columnGap={2} marginTop="3%">
                    <IconButton color="error" size="large" onClick={handleClearFilters}>
                        <Clear />
                    </IconButton>
                    <Box display="flex" flexDirection='row'>
                        <ExpandableMenu items={['קיווי', 'אבטיח', 'תות', 'אפרסמון']} displayTag={displayMoreFiltersTag} setOption={setOptionMoreFilters} />
                    </Box>
                    <Box display="flex" flexDirection='row'>
                        <ExpandableMenu items={['הכל', 'קיווי', 'אבטיח', 'תות', 'אפרסמון']} displayTag={displayCareStatusTag} setOption={setOptionCareStatus} />
                    </Box>
                    <Box display="flex" flexDirection='row'>
                        <ExpandableMenu items={['הכל', 'מרכז', 'צפון', 'דרום']} displayTag={displayAreaTag} setOption={setOptionArea} />
                    </Box>
                </Grid>
            </Box>
        </div>
    )
}

export default MoreFilters;
