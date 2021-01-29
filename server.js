const express = require('express')
const socketIo = require('socket.io')
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo(server)

const router = require('./router');

io.on('connection',(socket =>{
    console.log('we have a new connection')
    socket.on('disconnect',() =>{
        console.log('user has left')
    })
}))
app.use(router)

const PORT = process.env.PORT || 5000 

server.listen(PORT,() =>{
    console.log('SERVER')
})