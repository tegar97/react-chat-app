import React,{useEffect,useState} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
function Chat({location}) {
    const [name,setName] = useState('')
    const [room,setRoom] = useState('');
    const [messages,setMessages] = useState('')
    const ENDPOINT = 'http://localhost:5000/'
    useEffect(() =>{
        const {name,room } = queryString.parse(location.search);
        const socket = io(ENDPOINT)
        setName(name)
        setRoom(name)
        socket.emit('join',{name, room})

        return () => {
            socket.emit('disconnect')
            socket.off();
        } 
    },[ENDPOINT,location.search])

    useEffect(() => {
        socket.on('message',(message) =>{
            setMessages([...messages,message])
        })
    },[messages])
    return (
        <div>
            <h1>CHAT</h1>
        </div>
    )
}

export default Chat
