const Song = require("./song");

class User {

  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.playlist = [];
  }

  static getUser(username){
    const index = this.users.findIndex(x => x.username === username);
    if (index > -1) {
      return users[index];
    }else {
      throw new Error("Unable to find the user!");
    }
  }

  fetchPlaylist() {
    return this.playlist;
  }

  addToPlaylist(song) {
    this.playlist.push(song);
    return this.playlist;
  }

  removeFromPlaylist(song) {
    const index = this.playlist.findIndex(x => x === song);
    if (index > -1) {
      this.playlist.splice(index,1);
    }else {
      throw new Error("Unable to find the song!");
    }
    return this.playlist;
  }


  static fetchAll() {
    return users;
  }


}

let users = [new User("k", "123"), new User("t", "1234")];
module.exports = User;
