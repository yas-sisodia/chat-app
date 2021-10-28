// node server which will handle socket io connections
const express = require('express')
var app = express();
const socketio = require("socket.io");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const io = socketio(server);

// var io = require('socket.io')(server, {
//     cors: {
//         origin: '*',
//     }
// });

const port = process.env.PORT || 8000
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));


// app.get('/', function(req, res) {
//     res.send(home)
// })
const cors = require("cors")
app.use(cors())

const users={};

 io.on('connection', socket => {
     socket.on('new-user-joined', name => {
        //  console.log("user joined", name);
         users[socket.id] = name;
         socket.broadcast.emit('user-joined', name);
     });

     socket.on('send', message => {
         socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
     });
     socket.on('disconnect', name => {
         socket.broadcast.emit('left', users[socket.id]);
         delete users[socket.id];

     });
     
 });


 server.listen(port,()=>
{
    console.log("Listening at port => "+port)
});
 
