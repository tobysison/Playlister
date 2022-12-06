import { Paper, Box, Typography, Link } from '@mui/material';

function CommentCard(props) {
    const { comment } = props;

    return (
        <Paper sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', my: 1, width: '100%', height: 'auto', bgcolor: '#FFA500'}} variant="outlined" >
            <Box sx={{ pt: 1, pl: 2, fontSize: 20, color: "darkblue"}}>{<Link href="#">{comment.by}</Link>}</Box>
            <Typography sx={{ pt: 1, pl:3, pr:3, fontSize: 12 }}>{comment.comment}</Typography> 
        </Paper>
    );
}

export default CommentCard;