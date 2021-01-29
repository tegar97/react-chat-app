const express = require('express')
const socketIo = require('socket.io')
const http = require('http');
const cors = require('cors')
const app = express();
const server = http.createServer(app);
const  {addUser,removeUser,getUser,getUsersinRoom} = require('./users')
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
    socket.on('join',({name,room},callback) => {
      const {error,user} = addUser({id : socket.id,name,room});

      if(error) return callback(error)

      socket.emit('message',{user:'admin',text: `${user.name},welcome to the room ${user.room}`})
      socket.broadcast.to(user.room).emit('message',{user : 'admin',text : `${user.name},has joined!`})
      
    
      socket.join(user.room);
      callback()
    })

    socket.on("sendMessage",(message,callback) =>{
        const user = getUser(socket.id);
        io.to(user.room).emit('message',{user:user.name,text: message});
        callback()
    })
    socket.on('disconnect',() =>{
        console.log('user has left')
    })
}))
app.use(router)

const PORT = process.env.PORT || 5000 

server.listen(PORT,() =>{
    console.log('SERVER')
})