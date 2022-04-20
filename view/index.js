window.onload = function (event) {
  // alert('hi');
  document.getElementById("logout-btn").style.display = "none";
}

var userid = null;
async function validate() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  var myHeaders = new Headers();
  myHeaders.append("username", username);
  myHeaders.append("password", password);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders
    // redirect: 'follow',
    // mode: 'no-cors'
  };

  let r = undefined
  await fetch("http://localhost:3000/authentication/", requestOptions)
    .then(response => response.text())
    .then(result => {
      r = result;
    })
    .catch(error => console.log('error', error));
  const response = JSON.parse(r);

  if (response.authentication === "success") {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("logout-btn").style.display = "block";
    userid = response.userid;
    let songList = getSongList();
    let playList =  getPlayList();
    let tr = document.querySelectorAll("table tbody tr");

    // Array.from(tr).forEach(function(trArray) {
    //   let button = document.createElement("button");
    //   let td = document.createElement("td");
    //   button.innerText = "buy";
    //   button.className = "btn_buy";
    //   td.append(button);
    //   trArray.append(td);
    // });

  }
}

async function getSongList(){
  var myHeaders = new Headers();
  myHeaders.append("userid", userid);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let songList = [];
  await fetch("http://localhost:3000/song-list/song", requestOptions)
    .then(response => response.json())
    .then(data => {
      constructTable(data,'song_list');
    })
    .catch(error => console.log('error', error));
  // console.log(songList.);
  return songList;
}


async function getPlayList(){
  var myHeaders = new Headers();
  myHeaders.append("userid", userid);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let playList = [];
  await fetch("http://localhost:3000/song-list/playlist", requestOptions)
    .then(response => response.json())
    .then(data => constructTable(data,'play_list',true))
    .catch(error => console.log('error', error));
  return playList;
}


async function getSong(songID){
  var myHeaders = new Headers();
  myHeaders.append("userid", userid);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let song = [];
  await fetch(`http://localhost:3000/song-list/song/${songID}/`, requestOptions)
    .then(response => response.json())
    .then(result => result.forEach(x => song.push(x)))
    .catch(error => console.log('error', error));
  return song[0];
}

async function addToPlaylist(songID){
  var myHeaders = new Headers();
  myHeaders.append("userid", userid);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };
  let playList = [];
  await fetch(`http://localhost:3000/song-list/song/${songID}/`, requestOptions)
    .then(response => response.json())
    .then(result => result.forEach(x => playList.push(x)))
    .catch(error => console.log('error', error));
  return playList;
}


async function deleteSongFromPlayList(songID){
  var myHeaders = new Headers();
  myHeaders.append("userid", userid);

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };
  let playList = [];
  await fetch(`http://localhost:3000/song-list/song/${songID}/`, requestOptions)
    .then(response => response.json())
    .then(result => result.forEach(x => playList.push(x)))
    .catch(error => console.log('error', error));
  return playList;
}



async function logout() {
  var myHeaders = new Headers();
  console.log(userid);
  myHeaders.append("userid", userid);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/authentication/logout", requestOptions)
    .then(response => response.json())
    .then(result => {
      document.getElementById("login-form").style.display = "block";
      document.getElementById("logout-btn").style.display = "none";
    })
    .catch(error => console.log('error', error));
}



function constructTable(myList, selector,hasPlay){
  var col = [];
  for (var i = 0; i < myList.length; i++) {
    for (var key in myList[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  // Create a table.
  var table = document.createElement("table");

  // Create table header row using the extracted headers above.
  var tr = table.insertRow(-1);                   // table row.

  for (let i = 0; i < col.length-2; i++) {
    var th = document.createElement("th");      // table header.
    th.innerHTML = col[i];
    tr.appendChild(th);
  }
  th = document.createElement("th");
  th.innerHTML = 'action';
  tr.append(th);
  if(hasPlay){
    th = document.createElement("th");
    th.innerHTML = 'playSong';
    tr.append(th);
  }

  // add json data to the table as rows.
  for (let i = 0; i < myList.length; i++) {

    tr = table.insertRow(-1);

    for (var j = 0; j < col.length-2; j++) {
      console.log(j);
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = myList[i][col[j]];
    }
    var tabCell = tr.insertCell(-1);
    let btn = document.createElement("button");
    btn.innerHTML = "Add Song";
    if (hasPlay){ btn.innerHTML = 'remove Song';}
    tabCell.appendChild(btn);
    if (hasPlay){
      var tabCell = tr.insertCell(-1);
      let btn = document.createElement("button");
      btn.innerHTML = "Play Song";
      tabCell.appendChild(btn);
    }
  }

  // Now, add the newly created table with json data, to a container.
  var divShowData = document.getElementById(selector);
  divShowData.innerHTML = "";
  divShowData.appendChild(table);
}
