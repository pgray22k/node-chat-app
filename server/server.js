//server class file will be responsible for our routes within our application
require('./config/config');

const path = require('path');
const http = require('http');
const express = require( 'express');
const socketIO = require('socket.io');
//const bodyParser = require('body-parser');

const {generateMessage, generateLocationMessage} = require('./utils/message');
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
    usually we will not attach any other information to the io only within the
    connection we will create custom events

    broadcasting - when you emmit events to everyone but the specific calling user
 */
io.on('connection', (socket)=> {
    console.log( 'New User connected');

    //create an event
    //when creating an event it has to match the caller you want to emit too
    // socket.emit('newEmail', {
    //     from: 'and@example.com',
    //     text: 'Hey. What is going on',
    //     createdAt: 123
    // });
    //
    // socket.on('createEmail', (newEmail)=>{
    //     console.log('createEmail', newEmail);
    // });

    //socket.emit - sends and emit / broadcast to a single user
    // socket.emit('newMessage', {
    //     from: "Phil",
    //     text: "Hey I am in the chat room",
    //     createdAt: new Date().toString()
    // });

    //server is sending out utils to everyone connected to the app
    // socket.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'Welcome to the chat app',
    //     createdAt: new Date().toString()
    // } );

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // socket.broadcast.emit('newMessage', {
    //     from: 'Admin',
    //     text: "New User Joined",
    //     createdAt: new Date().toString()
    // });

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));


    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        //io.emmit sends an emit/broadcast to every user, browser
        // io.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().toString()
        // })

        io.emit('newMessage', generateMessage( message.from, message.text ));

        //broadcast to everyone but the caller
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().toString()
        // })

        //calling the call back function will send the information back to the frontend notifying
        //the client we got the information back
        callback({
            text: 'This is from the server'
        });
    });

    socket.on('createLocationMessage', (coords)=> {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', ()=> {
       console.log('User was disconnected');
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