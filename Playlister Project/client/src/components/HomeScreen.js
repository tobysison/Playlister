import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Button, TextField, List, Tab, Tabs, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import YoutubePlayer from './YoutubePlayer';
import CommentListCard from './CommentListCard';
import AuthContext from '../auth';
import SortIcon from '@mui/icons-material/Sort';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ value, setValue ] = useState(0);
    const isMenuOpen = Boolean(anchorEl);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        store.loadIdNamePairs(store.currentCri);
    }, [])

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menu = (
        <Menu anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right',}} id='primary-search-account-menu' keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right',}} open={isMenuOpen}onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>
                Name &#91;A - Z&#93;
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                Publish Date &#91;Newest&#93;
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                Listens &#91;High - Low&#93;
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                Likes &#91;High - Low&#93;
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                Dislikes &#91;High - Low&#93;
            </MenuItem>
        </Menu>
    );

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ left: '1%', bottom: '1%', height: '100%', width: '100%', bgcolor: '#eeeeedd' }}>
                {store.idNamePairs.map((pair) => (<ListCard key={pair._id} idNamePair={pair}/>))}
            </List>;
    }  

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <Box role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
                {value === index && (<Box sx={{ p: 3 }}>{children}</Box>)}
            </Box>
        );
    }
      
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
      
    function allyProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function handleLoadHome() {
        store.setHome();
    } 

    function handleLoadListsByName() {
        store.setSearchMode("n");
    } 

    function handleLoadListsByUser() {
        store.setSearchMode("u");
    } 

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function handleSearch(event) {
        if (event.key === "Enter") {
            let criteria = event.target.value;
            store.loadIdNamePairs(criteria);
        }
    }
      
    let commentsSection =
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Player" sx={{fontWeight: 'bold', color: 'black'}} {...allyProps(0)} />
                    <Tab label="Comments" sx={{fontWeight: 'bold', color: 'black'}} {...allyProps(1)} />
                </Tabs>
            </Box> 
            <TabPanel value={value} index={0}>
                <YoutubePlayer/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CommentListCard/>
            </TabPanel>
        </Box>;

    let homeUse;
    if(auth.user.email !== "guest"){
        homeUse =
            <Button aria-label="home" id="home-button" style={{ color: "#000000" }} onClick={handleLoadHome}>
                <HomeOutlinedIcon style={{ fontSize: 50 }}/>
            </Button>;
    }

    return (
        <Box id="homescreen">
            <Box id="homescreen-heading">
                {homeUse}
                <Button aria-label="all-list" id="all-list-button" style={{ color: "#000000" }} onClick={handleLoadListsByName}>
                    <GroupsOutlinedIcon style={{ fontSize: 50 }}/>
                </Button>
                <Button aria-label="users" id="users-button" style={{ color: "#000000" }} onClick={handleLoadListsByUser}>
                    <PersonOutlineOutlinedIcon style={{ fontSize: 50 }}/>
                </Button>
                <TextField id="outlined-basic" label="Search" variant="outlined" defaultValue='' sx={{ ml: 20, height: '95%', width: 700}} onKeyPress={handleSearch}/> 
                <Button size="small" edge="end" aria-label="sort by" aria-controls='primary-search-account-menu' aria-haspopup="true" onClick={handleMenuOpen} color="inherit" endIcon={<SortIcon/>} sx={{ ml: 10, fontSize: 20}}> 
                    SORT BY
                </Button>
                { menu }
            </Box>
            <Box id="homescreen-sections">
                <Box id="playlist-selector-list">
                    {listCard}
                </Box>
                <Box id="player-comment-tab">
                    {commentsSection}
                </Box>
            </Box>
        </Box>
    )
}

export default HomeScreen;