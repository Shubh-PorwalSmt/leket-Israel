import { Box, Typography, CardContent } from "@mui/material";
import { KeyboardArrowDown } from '@mui/icons-material';
import ExpandableMenu from "./ExpandableMenu";

const Sort = ({ cardText, sortMethod, setSortMethod }) => {
    const displayTag = <CardContent>
        <Box display="flex" flexDirection='row'>
            <KeyboardArrowDown />
            <div>
                <Typography component="div" variant="h6" sx={cardText}>מסודר לפי</Typography>
                <Typography component="div" variant="h6" fontWeight="bold" sx={cardText}>{sortMethod}</Typography>
            </div>
        </Box>
    </CardContent>

    return (
        <Box display="flex" flexDirection='column' marginTop="0.4%">
            <Typography variant="h5" fontSize='20px' fontWeight="bold" marginBottom="10%" sx={cardText}>מיון</Typography>
            <ExpandableMenu items={['אטרקטביות', 'מיקום', 'דירוג', 'עדכון אחרון']} displayTag={displayTag} setOption={setSortMethod} />
        </Box>
    )
}

export default Sort;
