const Song = require("../model/song");
const User = require("../model/user");


function userValidity(req){
  let userid = req.header('userid');
  userid = userid.split('|')[0];
  var user;
  try {
    return User.getUser(userid);
  }catch (error){
    console.log(error);
    throw new Error("Authentication Failure");
  }
}


exports.getSong = (req, res, next) => {
  user = userValidity(req);
//Todo: Song Modle is not defined yet
  const song = Song.getSong(req.params.songID);
  res.status(200).json(song);
}

exports.removeFromUserPlaylist = (req, res, next) => {
  user = userValidity(req);
//  TODO: Need to add remove Playlist
  const newPlaylist = user.removeFromPlaylist(req.params.songID);
  res.status(202).json(newPlaylist);
}

exports.addToUserPlaylist = (req, res, next) => {
  user = userValidity(req);
// TODO: need to add to Playlist Only getting user is done !
  const newPlaylist = user.addToPlaylist(req.params.songID);
  res.status(202).json(newPlaylist);
}

exports.fetchUserPlaylist = (req, res, next) => {
  user = userValidity(req);
  res.status(200).json(user.fetchPlaylist());
}

exports.fetchAll = (req, res, next) => {
  user = userValidity(req);
  res.status(200).json(Song.fetchAll());
}



