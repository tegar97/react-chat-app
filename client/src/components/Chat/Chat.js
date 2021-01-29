import React,{useEffect,useState} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import Input from '../Input/Input';
let socket;
const ENDPOINT = 'http://localhost:5000/'

function Chat({location}) {
    const [name,setName] = useState('')
    const [room,setRoom] = useState('');
    const [message,setMessage] = useState('')
    const [messages,setMessages] = useState([])
    useEffect(() =>{
        const {name,room } = queryString.parse(location.search);
        socket = io(ENDPOINT)

        setName(name)
        setRoom(name)

        socket.emit('join',{name, room},(error) => {
            if(error) {
                alert(error)
            }
        })

    },[ENDPOINT,location.search])

    useEffect(() => {

        socket.on('message',(message) =>{
            setMessages([...messages,message])
        })
    },[messages])

    const sendMessage = (event) => {

        event.preventDefault();
        
        if(message) {
            socket.emit('sendMessage',message,() => setMessage(''))
            
        }
    }

    console.log(message,messages)
    return (
        <div className="outerContainer">
            <div className="container">
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat
