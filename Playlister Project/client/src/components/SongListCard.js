import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import { Box, List} from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'


function SongListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { songs } = props;
    store.history = useHistory();
    let display;

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal/>;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal/>;
    }

    display = 
        <Box>
            <List id="playlist-cards" sx={{ pd: 5, left: '2.5%', height: '100%', width: '95%', bgcolor: '#eeeeedd'  }}>
                {songs.map((song, index) => (<SongCard id={'playlist-song-' + (index)} key={'playlist-song-' + (index)} index={index} song={song}/>))}
            </List>
            {modalJSX}
         </Box>            

    return (
        display
    )
}

export default SongListCard;