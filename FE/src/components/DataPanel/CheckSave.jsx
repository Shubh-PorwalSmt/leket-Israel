import {
	Card,
	CardContent,
	Dialog,
    Typography,
    Button,
    Box
} from "@mui/material";

const dialogStyle = {
    '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
        borderRadius: '10px'
    }
}

const CheckSave = ({ onClose, open, setDecision }) => {
    const handleYes = () => {
        setDecision(true);
        onClose();
    }

    const handleNo = () => {
        setDecision(false);
        onClose();
    }

  return (
    <Dialog onClose={onClose} sx={dialogStyle} open={open}>
        <Card
            sx={{
                width: "100%",
                height: "100%",
                padding: 2
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="center" flexDirection="column" gap={2.5}>
                    <Typography
                        variant="div"
                        component="h4"
                        dir="rtl"
                        sx={{
                            fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                        }}>
                        תרצה לשמור שינויים?
                    </Typography>
                    <div>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleYes}
                            sx={{ borderRadius: "20px", padding: '5px 20px' }}>
                            כן
                        </Button>
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={handleNo}
                            sx={{ borderRadius: "20px", padding: '5px 20px', marginLeft: '20px' }}>
                            לא
                        </Button>
                    </div>
                </Box>
            </CardContent>
        </Card>
    </Dialog>
  )
}

export default CheckSave;