import { Dialog, DialogTitle } from "@mui/material";

const AddField = ({ onClose, open }) => {
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Ola!</DialogTitle>
        </Dialog>
    )
}

export default AddField;
