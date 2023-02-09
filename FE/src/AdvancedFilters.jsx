import { Typography, Divider, TextField, Box, Button, Slider } from "@mui/material"
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from "react";

const addCropStyle = {
    borderRadius: '16px',
    marginTop: 3,
    backgroundColor: '#498758',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '#498758'
    }
};

const AdvancedFilters = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [attractionRangeSliderValue, setAttractionRangeSliderValue] = useState([5, 15]);

    const handleChange = (event, newRange) => setAttractionRangeSliderValue(newRange);

    return (
        <Box paddingTop={2} paddingRight={4} paddingBottom={4} paddingLeft={4}>
            <Typography variant="span" component="h6" marginBottom={3}
                sx={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontWeight: 'bold', fontSize: '20px' }}>
                עוד מסננים
            </Typography>
            <Divider variant="middle" light />
            <Typography variant="span" component="h6" marginTop={3} marginBottom={3}
                sx={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontWeight: 'bold', fontSize: '15px' }}>
                מדד טווח אטרקטביות
            </Typography>
            <Slider
                sx={{ color: '#d27c35' }}
                step={0.5}
                value={attractionRangeSliderValue}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={value => `${value}`}
            />
            <Typography variant="span" component="h6" marginTop={3} gutterBottom
                sx={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontWeight: 'bold', fontSize: '13px' }}>
                הקלד טווח
            </Typography>
            <TextField variant="outlined" sx={{ width: '40%', marginBottom: 3 }} />
            <Divider variant="middle" light sx={{ marginTop: 3 }} />
            <Typography variant="span" component="h6" marginTop={3} marginBottom={3}
                sx={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontWeight: 'bold', fontSize: '15px' }}>
                טווח תאריכי סטטוס
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box display="flex" flexDirection="row" marginTop={3} gap={3}>
                    <Box display="flex" flexDirection="column" marginBottom={1}>
                        <Typography variant="span" component="h6" gutterBottom
                            sx={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontWeight: 'bold', fontSize: '13px' }}>
                            מתאריך
                        </Typography>
                        <DatePicker value={fromDate}
                                    onChange={ newFromDate => { setFromDate(newFromDate) }}
                                    renderInput={ params => <TextField dir="rtl" {...params} />} />
                    </Box>
                    <Box display="flex" flexDirection="column" marginBottom={1}>
                        <Typography variant="span" component="h6" gutterBottom
                            sx={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontWeight: 'bold', fontSize: '13px' }}>
                            עד תאריך
                        </Typography>
                        <DatePicker value={toDate}
                                    onChange={ newToDate => { setToDate(newToDate) }}
                                    renderInput={ params => <TextField dir="rtl" {...params} />} />
                    </Box>
                </Box>
            </LocalizationProvider>
            <Divider variant="middle" light sx={{ marginTop: 3 }} />
            <Button elevation={9} sx={addCropStyle}>
                סינון
            </Button>
        </Box>
    )
}

export default AdvancedFilters;
