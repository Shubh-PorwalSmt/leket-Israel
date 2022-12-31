import { Box, CardContent, Typography, Grid, IconButton, TextField, InputBase } from "@mui/material"
import { KeyboardArrowDown, Clear } from '@mui/icons-material';
import ExpandableMenu from "./ExpandableMenu";

const MoreFilters = ({ cardText, imageStyle, handleClearFilters, optionArea, optionCareStatus, optionMoreFilters, setOptionArea, setOptionCareStatus, setOptionMoreFilters }) => {
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

    return (
        <div>
            <Box display='flex' flexDirection='column'>
                    <Typography variant="h5" fontWeight="bold" fontSize='20px' sx={cardText}>עוד מסננים</Typography>
                <Grid container direction="row" justifyContent="flex-end" alignItems="center" columnGap={2} marginTop="3%">
                    <IconButton color="error" size="large" onClick={handleClearFilters}>
                        <Clear />
                    </IconButton>
                    <Box display="flex" flexDirection='column'>
                        <ExpandableMenu items={['רמת בשלות', 'מדד אטרקטיביות', 'מספר חקלאי']} displayTag={displayMoreFiltersTag} setOption={setOptionMoreFilters} />
                        {/* TODO: need to fix moreFilters option */}
                        {/* {!!optionMoreFilters ? <TextField /> : ''} */}
                    </Box>
                    <Box display="flex" flexDirection='row'>
                        <ExpandableMenu items={['הכל', 'בטיפול', 'לא בטיפול', 'לא עדכני']} displayTag={displayCareStatusTag} setOption={setOptionCareStatus} />
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
