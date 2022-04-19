'use strict';
const express = require("express");
const cors = require("cors");

const authenticationRouter = require("./routes/authentication")
const songsRouter = require("./routes/song");

const app = express();
const corsOptions ={
  origin:'*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
// app.use(express.urlencoded({extended: true}));


//
// const thirtyMin = 1000 * 60 * 30;
// app.use(sessions({
//   secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//   saveUninitialized:true,
//   cookie: { maxAge: thirtyMin },
//   resave: false
// }));

app.use('/authentication', authenticationRouter);
app.use('/song-list', songsRouter);


app.use((req, res, next) => {
  res.status(404).json({error: req.url + ' API not supported!'});
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.message === 'NOT Found') {
    res.status(404).json({error: err.message});
  } else if (err.message === 'Authentication Failure') {
    res.status(401).json({"msg": "You have no power here!", "authentication": "failure"});
  } else {
    res.status(500).json({error: 'Something is wrong! Try later'});
  }
});

app.listen(3000, () => console.log('listening to 3000...'));
