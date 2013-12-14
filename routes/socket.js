/*
 * Serve content over a socket
 */

module.exports = function (socket) {
    /*
     socket.emit('send:name', {
     name: 'Bob'
     });

     setInterval(function () {
     socket.emit('send:time', {
     time: (new Date()).toString()
     });
     }, 1000);
     */
    // send the new user their name and a list of users
    socket.emit('init', {
        username: 'usr ' + Date.now()
    });

    // notify other clients that a new user has joined
    socket.broadcast.emit('user:join', {
        name: 'Bob'
    });

    // broadcast a user's message to other users
    socket.on('send:message', function (message) {
        console.log("Server recieved a message from client "
            + message.username + " and text: " + message.text)
        socket.emit('respond:message', {
            username: message.username,
            text: message.text
        });
    });

};
