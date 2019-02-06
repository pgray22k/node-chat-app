//server class file will be responsible for our routes within our application
require('./config/config');

const path = require('path');
const http = require('http');
const express = require( 'express');
const socketIO = require('socket.io');
//const bodyParser = require('body-parser');

const publicPath = path.join(__dirname, '../public');
//__dirname is the current directory
//console.log(__dirname+'/../public'); //.. goes up a directory to get to public folder
//console.log(publicPath); // --- this should give me the public path directory in a cleaner way

var app = express(); //create routes, middleware, or startup the server
var server = http.createServer( app );  //http and express are integrated so we just need to pass the app variable
// var server = http.createServer((request, response) =>{
//
// }); //creating server

/*
creating an io... this is how we are going to communicate between the server and the client
 */
var io = socketIO(server);

/*
    when you call this method it register for  event listener on th server
    connection - listens when there is a new connection
 */
io.on('connection', (socket)=> {
    console.log( 'New User connected');

    socket.on('disconnect', ()=> {
       console.log('Client is disconnected');
    });
});
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

server.listen( process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.port}`);
});