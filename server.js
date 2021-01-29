const express = require('express')
const socketIo = require('socket.io')
const http = require('http');
const cors = require('cors')
const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
    cors:{
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true

    }
})
const router = require('./router');
app.use(cors())
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