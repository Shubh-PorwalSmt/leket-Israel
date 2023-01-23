import { Card, Box, IconButton, Grid, TextField, Divider, Typography } from "@mui/material";
import { ArrowBack } from '@mui/icons-material';

const AddField = () => {
    const textNameField = {
        '.css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root': {
            color: '#2B3B1F',
            fontWeight: 'bold',
            fontSize: '20px'
        },
        '.css-1ptx2yq-MuiInputBase-root-MuiInput-root::after': {
            borderBottom: '2px solid #6A6A6A'
        },
        '.css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
            color: '#6A6A6A',
            fontWeight: 'bold'
        }
    };

    const textFieldStyle = {
        direction: 'rtl',
        '.css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root': {
            // fontFamily: 'Open Sans Hebrew'
            color: '#6A6A6A',
            fontWeight: 'bold'
        },
        '.css-1ptx2yq-MuiInputBase-root-MuiInput-root::after': {
            borderBottom: '2px solid #6A6A6A'
        },
        '.css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
            color: '#6A6A6A',
            fontWeight: 'bold'
        }
    };

    return (
        <Grid container width="90%" marginTop="50px">
            <Card elevation={9} sx={{ borderRadius: '10px' }} dir="rtl">
                <Box display='flex' paddingRight={6.5} flexDirection='row'>
                    <TextField variant="standard" sx={textNameField} label="שם השדה" />
                    <IconButton href="/" dir="ltr">
                        <ArrowBack />
                    </IconButton>
                </Box>
                <Box display='flex' flexDirection='row' paddingTop={2} paddingRight={6.5} paddingBottom={6.5} paddingLeft={6.5} marginTop={2}>
                    <Box display='flex' flexDirection='column'>
                        <Grid container gap={6} spacing={-10}>
                            <TextField variant="standard" label="סוג שטח" sx={textFieldStyle} />
                            <TextField variant="standard" label="מספר חקלאי" sx={textFieldStyle} />
                            <TextField variant="standard" label='סטטוס' sx={textFieldStyle} />
                            <TextField variant="standard" label="NDVI" sx={textFieldStyle} />
                        </Grid>
                    </Box>
                    <Box display='flex' flexDirection='column'>
                        <Grid container gap={6} spacing={-10}>
                            <TextField variant="standard" label="תאריך הקמת השטח:" sx={textFieldStyle} />
                            <TextField variant="standard" label="אזור" sx={textFieldStyle} />
                            <TextField variant="standard" label='שת"פ לקט' sx={textFieldStyle} />
                            <TextField variant="standard" label="רמת בשלות" sx={textFieldStyle} />
                        </Grid>
                    </Box>
                    <Box display='flex' flexDirection='column'>
                        <Grid container gap={6} spacing={-10}>
                            <TextField variant="standard" label="סוג יבול" sx={textFieldStyle} />
                            <TextField variant="standard" label="שיוך למנהל אזור" sx={textFieldStyle} />
                            <TextField variant="standard" label="תאריך עדכון" sx={textFieldStyle} />
                            <TextField variant="standard" label="מדד אטרקטיביות" sx={textFieldStyle} />
                        </Grid>
                    </Box>
                    <Divider light orientation="vertical" flexItem />
                    <Box display='flex' marginRight={5} flexDirection='column'>
                        <TextField variant="standard" label='נ"צ:' sx={textFieldStyle} />
                        <Typography display="ruby" marginTop={5} sx={{ color: '#6A6A6A' }} fontSize="14px" component="span">תמונה מהשטח:</Typography>
                        <Box component="img" alt="" marginTop={2} width={250} height={220} src="http://localhost:3000/images/addfield/field.png" />
                    </Box>
                </Box>
            </Card>
        </Grid>
    )
}

export default AddField;
