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

const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const efDataRouter = require('./routes/user.route');

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT || 3331);

//modified code to use my url endpoint for efTracker instead of users
//app.use(`/api/v1/users`, userRouter); 
app.use(`/api/v1/users`, efDataRouter); 

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;