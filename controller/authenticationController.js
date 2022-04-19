const User = require("../model/user");
const basicAuth = require("basic-auth");

let loggedInUsers = [];


exports.login = (req, res, next) => {
  const user = basicAuth(req);
  console.log(user.name, user.pass);
  const allUser = User.fetchAll();
  const authentication = allUser.find(x => x.username === user.name && x.password === user.pass) ;
  if (authentication){
    const userid = user.name + '|' + new Date().toLocaleString();
    loggedInUsers.push(userid);
    res.status(200).json({
      "authentication" : "success",
      "userid" : userid
    });
  }else {
    res.status(401).json({"authentication" : "failed"});
  }

}

exports.logout = (req, res, next) => {
  console.log(loggedInUsers);
  userid = req.header('userid');
  index = loggedInUsers.findIndex(x => x === userid);
  console.log(index);
  if (index > -1) {
    loggedInUsers.splice(index, 1);
    console.log(loggedInUsers);
    res.status(200).json({"msg" : "logout success"});
  }else{
    loggedInUsers = [];
    console.log(loggedInUsers);
    res.status(500).json({"msg" : "something went wrong!"});
  }
}


