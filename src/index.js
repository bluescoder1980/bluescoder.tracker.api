
//Import express package that we will use for our REST API
const { response } = require("express");
const express = require("express");

//define port to listen to
const PORT = 1234;

//Returns the express application
const app = express();

//create the rest API End point
app.get("/hello", (req, res) => {
    res.send("Hello World");
})

//Tells application to listen for any requests on port 1234.
app.listen(PORT, () => {
    console.log(`Server is listening on port : ${PORT}`);
});

