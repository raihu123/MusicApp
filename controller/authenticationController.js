const User = require("../model/user");
const basicAuth = require("basic-auth");
exports.login = (req, res, next) => {
  const user = basicAuth(req);
  console.log(user.name, user.pass);
  const allUser = User.fetchAll();
  const authentication = allUser.find(x => x.username === user.name && x.password === user.pass) ;
  if (authentication){
    session=req.session;
    session.userid=req.body.username;
    res.status(200).json(`{"authentication" : "success"}`);
  }else {
    res.status(401).json(`{"authentication" : "failed"}`);
  }

}

exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
}


