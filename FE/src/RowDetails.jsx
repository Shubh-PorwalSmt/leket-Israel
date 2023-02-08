import { Dialog, DialogTitle } from "@mui/material";

const RowDetails = ({ onClose, rowSet }) => {
    const [ open, id ] = rowSet;
    
    // make get request to get extra information about the field by it's id

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>sdf</DialogTitle>
        </Dialog>
    )
}

export default RowDetails;
