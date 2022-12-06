import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import { Button, Typography, Box, Modal } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIDeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
    }

    function handleDeleteList(event) {
        store.deleteMarkedList();
    }

    function handleCloseModal(event) {
        store.hideModals();
    }

    return (
        <Modal open={store.listMarkedForDeletion !== null}>
            <Box sx={style}>
                <Box>
                    <Typography variant='h4'>
                        Remove <b>{name}</b>?
                    </Typography>
                </Box>  
                <hr></hr>
                <Box>
                    <Typography variant='h5'>
                        Are you sure you want to delete the playlist: <span>{name}</span>?
                    </Typography>
                </Box>
                <Box height={'2.5rem'}></Box>
                <Box>
                    <Button variant='contained' sx={{float: 'right', fontSize: '1.0rem'}} onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant='contained' sx={{float: 'right', fontSize: '1.0rem'}} onClick={handleDeleteList}>
                        Confirm
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}