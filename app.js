var express = require('express'), app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('./js'));
app.use(express.static('./css'));
app.use(express.static('./img'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
var numero = 0;
var line_history = [];
io.on('connection', function (socket) {
    socket.on('draw_line', function (a, b, c, d,x) {
        io.emit('draw_line', a, b, c, d,x);
    });
    socket.on('disconnect', function () {
        numero--;
        console.log("numero de usuario:" + numero);
    });
    numero++;
});
http.listen(3000, function () {
    console.log('listening on *:3000');
});