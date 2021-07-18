import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './CreateRoom.css'

const CreateRoom = ({ userName, roomName, setUserName, setRoomName, socket }) => {
  const history = useHistory()

  useEffect(() => {
    setRoomName(nanoid(8))
  }, [ setRoomName ])

  const handleCreateRoomSubmit = e => {
    e.preventDefault();

    socket.emit('create-room', { userName, roomName, type: 'instructor' });

    history.push('/room')
  }

  return (
    <div>
      <h1>Create a room</h1>
      <form onSubmit={handleCreateRoomSubmit}>
        <label htmlFor='name'>Enter Name:</label>
        <br />
        <input id='name' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CreateRoom
