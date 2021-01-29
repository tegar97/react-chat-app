import React,{useEffect,useState} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
function Chat({location}) {
    const [name,setName] = useState('')
    const [room,setRoom] = useState('')
    const ENDPOINT = 'http://localhost:5000/'
    useEffect(() =>{
        const {name,room } = queryString.parse(location.search);
        const socket = io(ENDPOINT)
        setName(name)
        setRoom(name)
    },[ENDPOINT,location.search])
    return (
        <div>
            <h1>CHAT</h1>
        </div>
    )
}

export default Chat
