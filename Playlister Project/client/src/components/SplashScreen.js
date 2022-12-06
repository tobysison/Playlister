import { Typography, Box } from '@mui/material';

export default function SplashScreen() {
    return (
        <Typography id="splash-screen">
            <Typography style={{ color:'red', fontFamily: 'Tangerine', fontSize: 100 }}>
                Playlister
            </Typography>
            <Typography paragraph={true} align="center">
                Created by: Toby Sison
            </Typography>
            <Typography style={{fontSize: 100}} align="center">
                WELCOME!
            </Typography>
            <Typography paragraph={true} align="center">
                Create playlists and share your favorite songs
                with others.
            </Typography>
        </Typography>

    )  
}