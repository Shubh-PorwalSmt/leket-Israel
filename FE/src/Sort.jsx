import { Box, Typography, CardContent } from "@mui/material";
import { KeyboardArrowDown } from '@mui/icons-material';
import { useState } from 'react'
import ExpandableMenu from "./ExpandableMenu";

const Sort = ({ cardText }) => {
    const [option, setOption] = useState('אטרקטביות');
    
    const displayTag = <CardContent>
        <Box display="flex" flexDirection='row'>
            <KeyboardArrowDown />
            <div>
                <Typography component="div" variant="h6" sx={cardText}>מסודר לפי</Typography>
                <Typography component="div" variant="h6" fontWeight="bold" sx={cardText}>{option}</Typography>
            </div>
        </Box>
    </CardContent>

    return (
        <Box display="flex" flexDirection='column'>
            <Typography variant="h5" fontSize='20px' fontWeight="bold" marginBottom="10%" sx={cardText}>מיון</Typography>
            <ExpandableMenu items={['אטרקטביות', 'מיקום', 'דירוג']} displayTag={displayTag} setOption={setOption} />
        </Box>
    )
}

export default Sort;
