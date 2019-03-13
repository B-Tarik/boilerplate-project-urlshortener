'use strict';

const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const setUrl = require('./handlers/setUrl');
const getUrl = require('./handlers/getUrl');
const errorHandler = require('./handlers/error');

const cors = require('cors');

const app = express();

// Basic Configuration 
const port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
}, function(err){
  if(err){
    console.log(err);
  }else {
    console.log("Conected to DataBase.");
  }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/shorturl/:urlId", getUrl);

app.post("/api/shorturl/new", setUrl);


app.use(function(req, res, next) {
  const err = new Error('Not Found')
  next(err);
})

app.use(errorHandler);

app.listen(port, function () {
  console.log('Node.js listening ...');
});
