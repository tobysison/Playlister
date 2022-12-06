import { useContext } from 'react'
import { GlobalStoreContext } from '../store/index.js'
import { List, TextField, Box } from '@mui/material';
import CommentCard from './CommentCard.js';
import AuthContext from '../auth';

function CommentListCard() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let display;

    function handleEnter(event) {
        if(event.key === "Enter") {
            let comment = event.target.value;
            let userName = auth.user.firstName + " " + auth.user.lastName;
            store.addCommentLikeDislikeListen(userName, comment, false, false, false, store.currentList._id);
        }
    }

    let displayB;
    if(!auth.guest) {
        displayB =
        <TextField id="outlined-basic" label="Add Comment" variant="outlined" sx={{ width: '100%', backgroundColor: 'white', mt: 1}} onKeyPress={handleEnter}/>;
    }

    if(store.currentList) {
        display = 
            <Box sx={{ height: 350}} >
                <List id="playlist-cards" sx={{ pd: 5, mr: 1, height: '100%', width: '100%', bgcolor: '#eeeeedd', overflowY: 'auto', overflowX: 'hidden' }}>
                    {store.currentList.comments.map((comment, index) => (
                    <CommentCard id={'playlist-comment'+index} key={'playlist-comment'+index} comment={comment}/>))}
                </List>
                <TextField id="outlined-basic" label="Add Comment" sx={{ width: '100%', backgroundColor: 'white', mt: 1}} onKeyPress={handleEnter}/> 
            </Box>
    } 
    else {
        display =
        <Box sx={{ height: 350}}>
        <List id="playlist-cards" sx={{ pd: 5, left: '2.5%', height: '100%', width: '95%', bgcolor: '#eeeeedd', overflowY: 'auto' }}>
        </List>
        {displayB}
        </Box>
    }

    return (
        display
    )
}

export default CommentListCard;