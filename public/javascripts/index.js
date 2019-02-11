//client application calls

var socket = io(); //initiating a request for the server to open a websocket

//auto scroll functionality
function scrollToBottom() {
    //Selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child'); //lets you write selector specfic to the message
    //Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if( ( clientHeight + scrollTop +  newMessageHeight + lastMessageHeight ) >= scrollHeight ) {
        messages.scrollTop( scrollHeight );
    }
}

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
    var formatedTime = moment(message.createdAt);

   var template = jQuery('#message-template').html();
   var html = Mustache.render(template, {
       text: message.text,
       from : message.from,
       createdAt: formatedTime.format('h:mm a')
   });

    jQuery('#messages').append(html);

   //using jQuery to modify the message
   //  var formatedTime = moment(message.createdAt);
   //  var li = jQuery('<li></li>');
   //  li.text(`${message.from} ${formatedTime.format('h:mm a')}: ${message.text}`)
   //z
   //  jQuery('#messages').append(li);

    scrollToBottom();
});

socket.on('newLocationMessage', (message)=> {

    var formatedTime = moment(message.createdAt);

    var template = jQuery('#location-message-template').html();

    var html = Mustache.render(template, {
        from : message.from,
        url: message.url,
        createdAt: formatedTime.format('h:mm a')
    });

    jQuery('#messages').append(html);

    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    //
    // //prevents any malcious behaviour from people injecting html
    // li.text(`${message.from} ${formatedTime.format('h:mm a')}:`);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);

    scrollToBottom();
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

    let messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function (message) {
        console.log('Got it!', JSON.stringify(message));
        messageTextBox.val(''); //clear the text once the user succusfully sends it to the screen
    });
});

//this is re-usable variable
var locationButton = jQuery('#send-location');
//function gets called when the button gets clicked
locationButton.on('click', (e)=> {
    if ( !navigator.geolocation ) {
        return alert('Geolocation not supported by your browser.');
    }
    locationButton.attr('disabled', 'disabled').text('Sending... Location');
    navigator.geolocation.getCurrentPosition(function( position){
        locationButton.removeAttr('disabled').text('Send Location');
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location.');
        locationButton.removeAttr('disabled').text('Send Location');
    });
});