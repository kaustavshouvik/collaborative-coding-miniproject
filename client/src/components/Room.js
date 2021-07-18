import { useEffect, useState } from "react";
import DrawBoard from "./DrawBoard";

import './Room.css'

const Room = ({ roomName, userName, socket }) => {
  const [message, setMessage] = useState('');
  const [members, setMembers] = useState([])
  const [chats, setChats] = useState([])

  const handleSubmit = e => {
    e.preventDefault();

    setChats([...chats, { message, userName, roomName }]);
    socket.emit('chat', { message, userName, roomName })

    setMessage('')
  }

  const hanldeCopyLink = () => {
    const joinURL = `http://localhost:3000/join?roomName=${roomName}`;
    navigator.clipboard.writeText(joinURL);
  }

  useEffect(() => {
    socket.on('chat', (payload) => {
      // console.log(payload)
      setChats([...chats, payload]);
    })
  })

  useEffect(() => {
    socket.on('room-data', (payload) => {
      // console.log(payload)
      setMembers(payload)
    })
  })

  return (
    <div>
      <div className='room-header'>
        <button onClick={hanldeCopyLink}>Copy Link</button>
        <h1>ROOM - {roomName}</h1>
        <h3>Name - {userName}</h3>
      </div>
      <div className='room-layout'>
        <div className='member-list-box'>
          <h1>Members</h1>
          {members.map((m, i) =>
            <p key={i}>{m}</p>
          )}
        </div>
        <div className='editor-and-board'>
          <h1>Editor and Board</h1>
          <DrawBoard />
        </div>
        <div className='chat-box'>
          <h1>Chat Box</h1>
          <div>
            {chats.map((c, i) =>
              <p key={i}>{c.userName}: {c.message}</p>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              placeholder='Enter message...'
              type='text'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Room
