var socket = io(); //initiating a request for the server to open a websocket

socket.on('connect', () => {
    console.log('Connected to Server');

    // socket.emit('createEmail', {
    //     to: "phil@example.com",
    //     text: "Hey. This is Phil"
    // })

    socket.emit('createMessage', {
        to: "And",
        text: "Hey. This is And"
    })
});

socket.on('disconnect', ()=> {
    console.log('Disconnected to Server');
});

//custom event
// socket.on('newEmail', (email)=> {
//    console.log(('New email', email));
// });

socket.on('newMessage', (message) => {
   console.log('newMessage', message) ;
});