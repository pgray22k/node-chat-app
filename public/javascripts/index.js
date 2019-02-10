//client application calls

var socket = io(); //initiating a request for the server to open a websocket


socket.on('connect', () => {
    console.log('Connected to Server');

    // socket.emit('createEmail', {
    //     to: "phil@example.com",
    //     text: "Hey. This is Phil"
    // })

    // socket.emit('createMessage', {
    //     to: "And",
    //     text: "Hey. This is And"
    // })
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
   //using jQuery to modify the message
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`)

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (message)=> {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    //prevents any malcious behaviour from people injecting html
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

//send a message to the server and have the server respond with an acknowledgement
//
// socket.emit('createMessage', {
//     from: "And",
//     text: "Hey. This is And"
// }, (message)=>{
//     //server acknowledge the we got the data
//     console.log('Got it!');
//     //server can send the message for any format we like, obj, string, etc.
//     console.log( JSON.stringify( message ) );
// });


// socket.on('joinChat', (welcomeMsg) => {
//     console.log('newMessage', welcomeMsg) ;
// });

// socket.on('newUserJoin', (newUserMsg) => {
//     console.log('newMessage', newUserMsg) ;
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function (message) {
        console.log('Got it!', JSON.stringify(message));
    });
});

//this is re-usable variable
var locationButton = jQuery('#send-location');
//function gets called when the button gets clicked
locationButton.on('click', (e)=> {
    if ( !navigator.geolocation ) {
        return alert('Geolocation not supported by your browser.');
    }
    navigator.geolocation.getCurrentPosition(function( position){
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location.');
    });
});