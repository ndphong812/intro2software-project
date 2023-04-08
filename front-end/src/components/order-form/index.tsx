import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
    isOpen: boolean
}
const FormDialog: React.FC<Props> = ({ isOpen }) => {


    const [open, setOpen] = React.useState(isOpen);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Thông tin đơn hàng</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Đơn hàng sẽ được giao trong vòng 3-5 ngày tùy theo khoảng cách.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Địa chỉ email"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Huỷ bỏ</Button>
                    <Button onClick={handleClose}>Đặt hàng</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default FormDialog;