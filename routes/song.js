const express = require("express");
const songController = require("../controller/songController");


const router = express.Router();

router.get('/song', songController.fetchAll);
router.get('/playlist', songController.fetchUserPlaylist);
router.post('/song/:songID',songController.addToUserPlaylist);
router.delete('playlist/:songID',songController.removeFromUserPlaylist);
router.get('/song/:songID',songController.getSong);


module.exports = router;
