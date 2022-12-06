import { useContext } from 'react';
import AuthContext from '../auth'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function MUIAccountErrorModal() {
    const { auth } = useContext(AuthContext);

    const handleClose = () => {
        auth.toggleAccErrModal(false, auth.errMsg);
    }

    return (
        <Dialog
            open={auth.accErrModal}
            onClose={handleClose}
            aria-labelledby="modal-north"
            aria-describedby="modal-center-content">
            <DialogTitle id="modal-north" component="h6" variant="h2" style={{fontSize: 30}}>Attention!</DialogTitle> 
            <DialogContent>
                <Alert id="modal-center-content" severity="warning">{auth.errMsg}</Alert> 
            </DialogContent>
            <DialogActions> 
                <Button type="close" variant='text' onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}