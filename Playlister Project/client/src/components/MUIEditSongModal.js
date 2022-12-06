import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField, Typography} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 580,
    height: 320,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState(store.currentSong.title);
    const [ artist, setArtist ] = useState(store.currentSong.artist);
    const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);

    function handleConfirmEditSong(event) {
        event.preventDefault();
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong() {
        store.hideModals();
        setTitle(store.currentModal.title);
        setArtist(store.currentModal.artist);
        setYouTubeId(store.currentModal.youTubeId);
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    return (
        <Modal open={store.currentModal === "EDIT_SONG"}>
            <Box sx={style}>
            <Box>
                    <Typography variant='h6'>
                        Edit Song
                    </Typography>
                </Box>
                <hr></hr>
                <Box component="form" noValidate onSubmit={handleConfirmEditSong}>
                    <TextField margin="normal" required fullWidth label="Title" onChange={handleUpdateTitle} defaultValue={title} autoFocus/>
                    <TextField margin="normal" required fullWidth label="Artist" onChange={handleUpdateArtist} defaultValue={artist}/>
                    <TextField margin="normal" required fullWidth label="youTubeId" onChange={handleUpdateYouTubeId} defaultValue={youTubeId}/>
                    <Box>
                        <Button variant='contained' sx={{float: 'right', fontSize: '1.5rem'}} onClick={handleCancelEditSong}>
                            Cancel
                        </Button>
                        <Button type='submit' variant='contained' sx={{float: 'right', fontSize: '1.5rem'}}>
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}