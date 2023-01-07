import { Box, Typography, CardContent } from "@mui/material";
import { KeyboardArrowDown } from '@mui/icons-material';
import ExpandableMenu from "./ExpandableMenu";
import { useState } from "react";

const Sort = ({ cardText, sortMethod, setSortMethod }) => {
    const [rotateArrow, setRotateArrow] = useState(false);

    const displayTag = <CardContent>
        <Box display="flex" flexDirection='row'>
            <KeyboardArrowDown style={{ color: "green", alignSelf: 'center', rotate: rotateArrow ? '180deg' : '0deg' }} />
            <div>
                <Typography component="div" variant="h6" display='ruby' fontSize='16px' sx={cardText}>מסודר לפי</Typography>
                <Typography component="div" variant="h6" fontSize='14px' fontWeight="bold" sx={cardText}>{sortMethod}</Typography>
            </div>
        </Box>
    </CardContent>

    return (
        <Box display="flex" flexDirection='column' marginTop="0.4%">
            <Typography variant="h5" fontSize='20px' fontWeight="bold" marginBottom="10%" sx={cardText}>מיון</Typography>
            <ExpandableMenu items={['אטרקטביות', 'מיקום', 'דירוג', 'עדכון אחרון']} displayTag={displayTag} setOption={setSortMethod}
                rotateArrow={rotateArrow} setRotateArrow={setRotateArrow} />
        </Box>
    )
}

export default Sort;
