import { Typography, Box, Button } from '@mui/material';
import AuthContext from '../auth';
import { useContext, useState } from 'react';

export default function SplashScreen() {
    const { auth } = useContext(AuthContext);
    
    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/login'
    }
    const handleRegister = () => {        
        window.location.href = 'http://localhost:3000/register'
    }

    const handleGuestLogIn = () => {
        auth.loginGuest();
    }

    return (
        <div id="splash-screen">
            <Typography style={{ color:'white', fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: 40 }}>
                Introducing the world's greatest alternative to
            </Typography>
            <Typography style={{ color:'white', fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: 40 }}>
                the already functional Youtube player.
            </Typography>
            <Typography style={{ color:'red', fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: 100 }}>
                Playlister™
            </Typography>
            <Typography style={{ color:'white', fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: 20 }}>
                Create and edit playlists of your favorite songs.
            </Typography>
            <Typography style={{ color:'white', fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: 20 }}>
                Share your playlists and listen along with your friends.
            </Typography>
            <Typography style={{ color:'white', fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: 20 }}>
                Search for new music and leave feedback.
            </Typography>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#ffffff",
                padding: "18px 36px",
                fontSize: "18px"
                }}
                onClick={handleLogin} variant="contained" sx={{bottom:20, right:20, color: '#000000'}}>
                Login
            </Button>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#ffffff",
                padding: "18px 36px",
                fontSize: "18px"
                }}
                onClick={handleRegister} variant="contained" sx={{bottom:20, color: '#000000'}}>
                Create Account
            </Button>
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#ffffff",
                padding: "18px 36px",
                fontSize: "18px"
                }}
                onClick={handleGuestLogIn} variant="contained" sx={{bottom:20, left:20, color: '#000000'}}>
                Continue as Guest
            </Button>
            <Typography style={{ color:'white', fontFamily: 'Helvetica', fontWeight: 'bold', fontSize: 10, bottom: 20}}>
                Created by Toby Sison for CSE316
            </Typography>
        </div>
        

    )  
}