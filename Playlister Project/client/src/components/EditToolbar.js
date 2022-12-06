import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import { Box } from '@mui/material';

function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }

    return (
        <Box id="edit-toolbar">
            <Button disabled={!store.canAddNewSong()} id='add-song-button' onClick={handleAddNewSong} variant="contained">
                <AddIcon/> Add
            </Button>
            <Button disabled={!store.canUndo()} id='undo-button' onClick={handleUndo} variant="contained">
                <UndoIcon/> Undo
            </Button>
            <Button disabled={!store.canRedo()} id='redo-button' onClick={handleRedo} variant="contained">
                <RedoIcon/> Redo
            </Button>
        </Box>
    )
}

export default EditToolbar;