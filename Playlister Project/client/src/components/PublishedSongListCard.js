import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store/index.js'
import { Typography, Paper, Box } from '@mui/material';

function PublishedSongListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { songs } = props;
    store.history = useHistory();
    let display;

    display = 
        <Paper id="published-playlist-card" sx={{ pd: 5, left: '2.5%', height: '100%', width: '95%' }}>
            {
                songs.map((song, index) => (
                    <Typography id={"published-song"+index} key={"published-song"+index} sx={{ pl: 1, py: 0.5, width: '100%', fontSize: 24, fontWeight: 'bold', bgcolor: '#2145A8', color: 'orange' }}>
                        {index + 1}. {song.title} by {song.artist}
                    </Typography>))  
            }
        </Paper>            
    return (
        display
    )
}

export default PublishedSongListCard;