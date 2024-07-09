const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(`Server Running On Port: ${port}`);
});

const io = require("socket.io")(server);
app.use(express.static(path.join(__dirname, 'Public')));

let socketConnected = new Set()

io.on('connect',onConnected)

function onConnected(socket){
    console.log(socket.id)
    socketConnected.add(socket.id)
    io.emit('clients-total',socketConnected.size)
    
    socket.on('disconnect',()=>{
        console.log('socket is disconnected:',socket.id)
        socketConnected.delete(socket.id)
        io.emit('clients-total',socketConnected.size)
    })
    socket.on('message',(messageData)=>{
        console.log(messageData)
        socket.broadcast.emit('chatmessage',messageData)
    })
}

