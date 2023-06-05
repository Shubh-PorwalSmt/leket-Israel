import {
	Card,
	CardContent,
	Dialog,
    Typography,
    TextField,
    Box
} from "@mui/material";
import { useState } from "react";
import ErrorMessage from "../addFieldSteps/ErrorMessage";

const dialogStyle = {
    '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
        borderRadius: '10px'
    }
}

const FamilarityCause = ({ onClose, open, editableData, updateEditableData }) => {
    const [error, setError] = useState(false);

    const handleClose = () => {
        if (!!editableData["familarityCause"]) {
            onClose();
        } else {
            setError(true);
        }
    }

  return (
    <Dialog onClose={handleClose} sx={dialogStyle} open={open}>
        <Card
            sx={{
                width: "100%",
                height: "100%",
                padding: 2
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="center" flexDirection="column" gap={1.5}>
                    <Typography
                        variant="div"
                        component="h4"
                        dir="rtl"
                        sx={{
                            fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                        }}>
                        הזן סיבה
                    </Typography>
                    <TextField
						variant="standard"
						dir="rtl"
						onChange={(e) => updateEditableData("familarityCause", e.target.value)}
                    />
                    {error ? <ErrorMessage text="יש להזין סיבה" /> : <></>}
                </Box>
            </CardContent>
        </Card>
    </Dialog>
  )
}

export default FamilarityCause;
