var express = require("express"),
    socket = require("./routes/socket.js"),
    api = require("./routes/api.js"),
    http = require("http"),
    path = require("path");

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.logger());
// Configuration

app.configure(function () {
    app.set('views', __dirname + '/app');
    //app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/app'));
    app.use(app.router);
    app.engine('html', require('ejs').renderFile);
});

app.get('/', function (request, response) {
    //response.render('index.html')
    response.render("index.html");
});

/*
 var port = process.env.PORT || 9000;
 app.listen(port, function () {
 console.log("Listening on " + port);
 });
 */

// Socket.io Communication
io.sockets.on('connection', require('./routes/socket.js'));

/**
 * Start Server
 */

server.listen(9000, function () {
    console.log('Express server listening on port ' + 9000);
});
