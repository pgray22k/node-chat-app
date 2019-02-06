//server class file will be responsible for our routes within our application
require('./config/config');

const path = require('path');
const express = require( 'express');
//const bodyParser = require('body-parser');

const publicPath = path.join(__dirname, '../public');
//__dirname is the current directory
//console.log(__dirname+'/../public'); //.. goes up a directory to get to public folder
//console.log(publicPath); // --- this should give me the public path directory in a cleaner way

var app = express(); //create routes, middleware, or startup the server

/*
create middleware using express - middleware gives us the ability to point to other locations to handle html, js, etc.
__dirname stores the path of your projects directory in our case it is node-web-server
 */
app.use(express.static( publicPath ));

/*
    crud -- create , read, update, and delete.

    To create a resource you use post http method and send the resource as a body
 */

//middle ware for handling json for express
//app.use( bodyParser.json() );

app.listen( process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.port}`);
});