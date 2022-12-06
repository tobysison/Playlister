import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Accordion, AccordionDetails, AccordionSummary, Button, Paper, Link, ListItem, TextField, IconButton } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import PublishIcon from '@mui/icons-material/Publish';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SongListCard from './SongListCard';
import EditToolbar from './EditToolbar';
import MUIDeleteModal from './MUIDeleteModal'
import PublishedSongListCard from './PublishedSongListCard';
import AuthContext from '../auth';

function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;
    const { auth } = useContext(AuthContext);

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }

    function handleLikeDislikeListen(event, type) {
        event.stopPropagation();
        if(type === 1) {
            store.addCommentLikeDislikeListen('none', 'none', true, false, false, idNamePair._id);
        }
        else if(type === 2) {
            store.addCommentLikeDislikeListen('none', 'none', false, true, false, idNamePair._id);
        }
    }

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);
            store.addCommentLikeDislikeListen('none', 'none', false, false, true, id);
        }
    }

    function handleDupe() {
        store.createNewList(idNamePair.name, idNamePair.songs);
    }

    function handlePublish() {
        store.publishList(idNamePair._id);
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleLoadUser(event) {
        console.log("loaduser")
        event.stopPropagation();
        store.loadUser(auth.user.email, idNamePair.by);
    }

    let dislikeButton;
    let likeButton;
    let duplicateButton;
    let deleteButton;
    if(!auth.guest) {
        likeButton =
        <Button aria-label="like" id="like-button" sx={{ color: "#000000", ml: 40, mr: 5}} startIcon={<ThumbUpAltOutlinedIcon style={{fontSize:'24pt'}} />} onClick={(event) => handleLikeDislikeListen(event, 1)}>
            {idNamePair.likes}
        </Button>;

        dislikeButton =
        <Button aria-label="dislike" id="dislike-button" sx={{ color: "#000000", mr: 5 }} startIcon={<ThumbDownAltOutlinedIcon style={{fontSize:'24pt'}} />} onClick={(event) => handleLikeDislikeListen(event, 2)}>
            {idNamePair.dislikes}
        </Button>;

        duplicateButton =
        <Button onClick={handleDupe} aria-label='duplicate' variant="contained"> 
            <FileCopyIcon style={{fontSize:'16pt'}} />
        </Button>;

    }

    if(auth.user.email === idNamePair.owner && !auth.guest) {
        deleteButton = 
        <Button onClick={(event) => {handleDeleteList(event, idNamePair._id)}} aria-label='delete' variant="contained"> 
            <DeleteIcon style={{fontSize:'16pt'}} />
        </Button>;
    }

    let cardElement;
    if(idNamePair.publishDate === "N/A") {
        cardElement =
        <Paper id={idNamePair._id} sx={{ margin: '10px', width: '95%', borderRadius: '5px' }}> 
            <ListItem id={idNamePair._id} key={idNamePair._id} sx={{ height: '20%', p: 1, flexWrap: 'wrap', bgcolor: '#C791FD', "&:hover":{ bgcolor: '#C791FD' }, borderTopRightRadius: '5px', borderTopLeftRadius: '5px' }} button onDoubleClick={handleToggleEdit}>
                <Box sx={{ pr: 10, pl: 1, fontSize: 30, fontWeight: 'bold', width: '100%' }}>{idNamePair.name}</Box>
                <Box sx={{ pl: 1, fontSize: 20, width: '55%'}}>By: {<Link component='button' onClick={handleLoadUser} sx={{ fontSize: 20 }}>{idNamePair.by} </Link>} </Box>
                <Box sx={{ fontSize: 15, width: '25%'}}>Published: {idNamePair.publishDate}</Box>
                <Box sx={{ fontSize: 15, width: '15%'}}>Listens: {idNamePair.listens}</Box>
            </ListItem>
            <Accordion id={idNamePair._id} sx={{ bgcolor: '#DDC2f7', '&:before': {display: 'none'} }} elevation={0} disableGutters onChange={(event, expanded) => { if(expanded) {handleLoadList(event, idNamePair._id)} }}>
                <AccordionSummary expandIcon={<KeyboardDoubleArrowDownIcon style={{ fontSize: 30, color: 'black' }}/>}/>
                <AccordionDetails sx={{ maxHeight: 400, overflowY: 'auto' }}>
                    <SongListCard songs={idNamePair.songs}/>
                    <EditToolbar/>
                    <MUIDeleteModal/>
                    <Button onClick={(event) => {handleDeleteList(event, idNamePair._id)}} aria-label='delete' variant="contained">
                        <DeleteIcon style={{fontSize:'16pt'}} />
                    </Button>
                    <Button onClick={handlePublish} aria-label='publish' variant="contained"> 
                        <PublishIcon style={{fontSize:'16pt'}} />
                    </Button>
                    <Button onClick={handleDupe} aria-label='duplicate' variant="contained"> 
                        <FileCopyIcon style={{fontSize:'16pt'}} /> 
                    </Button>
                </AccordionDetails>
            </Accordion>
        </Paper>
    }
    else {
        cardElement =
        <Paper id={idNamePair._id} sx={{ margin: '10px', width: '95%', borderRadius: '5px' }}> 
            <ListItem id={idNamePair._id} key={idNamePair._id} sx={{ height: '20%', p: 1, flexWrap: 'wrap', bgcolor: '#FAAA31', "&:hover":{ bgcolor: '#FAAA31' }, borderTopRightRadius: '5px', borderTopLeftRadius: '5px' }} button>
                <Box sx={{ pr: 10, pl: 1, fontSize: 30, fontWeight: 'bold' }}>{idNamePair.name}</Box>
                {likeButton}
                {dislikeButton}
                <Box sx={{ pl: 1, fontSize: 20, width: '55%'}}>By: {<Link component='button' onClick={handleLoadUser} sx={{ fontSize: 20 }}>{idNamePair.by}</Link>}</Box>
                <Box sx={{ fontSize: 15, width: '25%'}}>Published: {idNamePair.publishDate}</Box>
                <Box sx={{ fontSize: 15, width: '15%'}}>Listens: {idNamePair.listens}</Box>
            </ListItem>
            <Accordion id={idNamePair._id} sx={{ bgcolor: '#FCC36D', '&:before': {display: 'none'} }} elevation={0} disableGutters onChange={(event, expanded) => { if(expanded) {handleLoadList(event, idNamePair._id)} }}>
                <AccordionSummary expandIcon={ <KeyboardDoubleArrowDownIcon style={{ fontSize: 30, color: 'black' }}/> }/>
                <AccordionDetails sx={{ maxHeight: 400, overflowY: 'auto' }}>
                    <PublishedSongListCard songs={idNamePair.songs}></PublishedSongListCard>
                    <MUIDeleteModal/>
                    {deleteButton}
                    {duplicateButton}
                </AccordionDetails>
            </Accordion>
        </Paper>;
    }

    if (editActive) {
        cardElement = <TextField margin="normal" required width='100%' id={"list-" + idNamePair._id} label="Playlist Name" name="name" autoComplete="Playlist Name" className='list-card' onKeyPress={handleKeyPress} onChange={handleUpdateText} defaultValue={idNamePair.name} inputProps={{style: {fontSize: 48}}} InputLabelProps={{style: {fontSize: 24}}} autoFocus/>
    }

    return (
        cardElement
    );
}

export default ListCard;