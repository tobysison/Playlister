import { useContext } from 'react';
import AuthContext from '../auth'
import Copyright from './Copyright'
import { Avatar, Box, Button, CssBaseline, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MUIAccountErrorModal from './MUIAccountErrorModal';

export default function LoginScreen() {
    const { auth } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        auth.loginUser(
            formData.get('email'),
            formData.get('password')
        );

    };

    return (
        <Grid container component="main" sx={{ height: '80vh' }}>
            <CssBaseline />
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
                <Box sx={{my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
                        <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <MUIAccountErrorModal></MUIAccountErrorModal>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}