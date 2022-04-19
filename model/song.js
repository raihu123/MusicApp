songList = [];

class Song{

  constructor(songID, songTitle, releaseDate, fileLocation) {
    this.songID = songID;
    this.songTitle = songTitle;
    this.releaseDate = releaseDate;
    this.fileLocation = fileLocation;
  }

  static getSong(songID) {
    const index = songList.findIndex(x => x.songID === songID);
    if (index > -1) {
      return songList[index];
    }else {
      throw new Error("Unable to find the song!");
    }
  }

  getFileLocation(){
    return this.fileLocation;
  }

  static fetchAll() {
    return songList;
  }
}
