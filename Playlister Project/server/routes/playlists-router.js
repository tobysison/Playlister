const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()
const auth = require('../auth')

router.post('/playlist', auth.verify, PlaylistController.createPlaylist)
router.delete('/playlist/:id', auth.verify, PlaylistController.deletePlaylist)
router.get('/playlist/:id/:email', PlaylistController.getPlaylistById)
router.get('/playlistpairs', auth.verify, PlaylistController.getPlaylistPairs)
router.get('/playlists/:email', PlaylistController.getPlaylists)
router.put('/playlist/:id', auth.verify, PlaylistController.updatePlaylist)
router.put('/playlist/comment/:id/:email', PlaylistController.addCommentLikeDislikeListenById)
router.put('/playlist/publish/:id', auth.verify, PlaylistController.publishPlaylistById)
router.get('/playlistpairs/name/:criteria/:email', PlaylistController.getPlaylistPairsByName)
router.get('/playlistpairs/user/:criteria/:email', PlaylistController.getPlaylistPairsByUser)
router.get('/playlistpairs/published/', PlaylistController.getAllPublishedPlaylistPairs)

module.exports = router