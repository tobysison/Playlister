import { Box, Paper, Typography, IconButton } from '@mui/material'
import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import YouTube from 'react-youtube';

const YoutubePlayer = () => {
    const { store } = useContext(GlobalStoreContext);
    const [currentSong, setCurrentSong] = useState(0);
    const [eventTarget, setEventTarget] = useState();
    let playlistName="";
    let title="";
    let artist="";
    let playlist=[];

     if(store.currentList && store.currentList.songs) {
         playlist = store.currentList.songs.map((song) => (song.youTubeId));
         playlistName = store.currentList.name;
         if(store.currentList.songs.length !== 0) {
            title = store.currentList.songs[currentSong].title;
            artist = store.currentList.songs[currentSong].artist;
         }
    }

    function onPlayerReady(event) {
        setEventTarget(event.target);
        event.target.pauseVideo();
    }

    function incSong() {
        if(currentSong < store.currentList.songs.length-1) {
            let i=currentSong+1;
            setCurrentSong(i);
        }
    }

    function onPlayerStateChange(event) {
        let playerStatus = event.target.getPlayerState();
        if (playerStatus === -1) {
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            console.log("0 Video ended");
            incSong();
        } else if (playerStatus === 1) {
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            console.log("5 Video cued");
        }
    }

    function decSong() {
        if(currentSong >= 1) {
            let i = currentSong - 1;
            setCurrentSong(i);
        }
    }

    function handleStop() {
        eventTarget.stopVideo();
    }

    function handlePlay() {
        eventTarget.playVideo();
    }

    return(
        <div>
            <YouTube key={playlist[currentSong]} videoId={playlist[currentSong]} opts = {{height: 290, width: '100%', playerVars: {playsinline: 1, autoplay: 1, origin: "https://www.youtube.com"}}} onReady={onPlayerReady} onStateChange={onPlayerStateChange}/>
            <Paper id="player-info" sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', bgcolor: '#ADD8E6' }}>
                <Typography sx={{ pl: 1, pt: 1, fontWeight: 'bold' }}>Playlist:&#32;{playlistName}</Typography> 
                <Typography sx={{ pl: 1, fontWeight: 'bold' }}>Song&#32;#:&#32;{currentSong}</Typography>  
                <Typography sx={{ pl: 1, fontWeight: 'bold' }}>Title:&#32;{title}</Typography>  
                <Typography sx={{ pl: 1, fontWeight: 'bold' }}>Artist:&#32;{artist}</Typography>
                <Box display="flex" alignItems="center" justifyContent="center"> 
                    <IconButton id='prev-song-button' sx={{bgColor: 'transparent', mx: 1}} onClick={decSong} variant="contained">
                        <FastRewindIcon sx={{ fontSize: 30 }}/>
                    </IconButton>
                    <IconButton id='stop-song-button' sx={{bgColor: 'transparent', mx: 1}} onClick={handleStop} variant="contained">
                            <StopIcon sx={{ fontSize: 30 }}/>
                    </IconButton>
                    <IconButton id='play-song-button' sx={{bgColor: 'transparent', mx: 1}} onClick={handlePlay} variant="contained">
                            <PlayArrowIcon sx={{ fontSize: 30 }}/>
                    </IconButton>
                    <IconButton id='next-song-button' sx={{bgColor: 'transparent', mx: 1}} onClick={incSong} variant="contained">
                            <FastForwardIcon sx={{ fontSize: 30 }}/>
                    </IconButton>
                </Box>
            </Paper>
        </div>
    );
}

export default YoutubePlayer;