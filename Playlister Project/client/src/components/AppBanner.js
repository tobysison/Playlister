import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    
    const handleLogout = () => {
        handleMenuClose();
        store.closeCurrentList();
        auth.logoutUser();
    };
    
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleGuestLogIn = () => {
        handleMenuClose();
        auth.loginGuest();
    };

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <Link to='/login/'>Login</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <Link to='/register/'>Create New Account</Link>
            </MenuItem>
            <MenuItem onClick={handleGuestLogIn}>
                <Link to='/'>Continue as Guest</Link>
            </MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>
                Logout
            </MenuItem>
        </Menu>        

    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
    }
    
    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        if (loggedIn) 
            return <div>{userInitials}</div>;
        return <AccountCircle />;
    }

    return (
        <Box sx = {{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: '#bfbfbf' }}>
                <Toolbar>
                    <Typography style={{ color:'red', fontFamily: 'Tangerine', fontSize: 60, fontWeight: 'bold'}}>                        
                        Playlister 
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex', marginLeft: 'auto' } }}> 
                        <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit" style={{ backgroundColor: 'purple' }}>
                            { getAccountMenu(auth.loggedIn) }
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            { menu }
        </Box>
    );
}