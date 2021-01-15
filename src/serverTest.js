/*
Server JS Script that will run the REST API
AM2021.01/06

In this file, we import express to build the rest APIs and use express.json() 
to parses incoming requests with JSON payloads.

We also import the dotenv module to read the .env config file to 
get the port number to run the server.

Cors is used to allow cross-site HTTP requests, in this case, by using a wildcard *, 
it allows access from any origin (any domain). We're going to call app.use(cors)); before we use the routes.
*/
//mySQL Connection 
const express = require('express'),
  app = express(),
  mysql = require('mysql'), // import mysql module
  cors = require('cors'),
  bodyParser = require('body-parser');

// setup database
db = mysql.createConnection({
  host: '52.205.61.155',
  user: 'grafana',
  password: 'bluescoder1980',
  database: 'grafana.db'
})


// make server object that contain port property and the value for our server.
var server = {
  port: 4040
};

// routers
const efDataRouter = require('./routes/efData');
// use the modules
app.use(cors())
app.use(bodyParser.json());
// use router
app.use('/efData', efDataRouter);


// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));