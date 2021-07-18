import { useState } from "react"
import { useHistory } from "react-router-dom";
import queryString from 'query-string'

const JoinRoom = ({ userName, roomName, setUserName, setRoomName, socket }) => {
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleJoinRoomSubmit = e => {
    e.preventDefault();

    const roomNameObject = queryString.parse(history.location.search);

    if (Object.keys(roomNameObject).length === 0 || !roomNameObject.roomName) {
      setError(true);
      return;
    }
    
    setRoomName(roomNameObject.roomName);

    // console.log(roomName);

    // if (error === false) {
    socket.emit('join-room', { userName, roomName: roomNameObject.roomName, type: 'student' })
    history.push('/room');
      // console.log('Everything is valid!');
    // }
  }

  return (
    <div>
      {error && <h2>Link is not valid!</h2>}
      <h2>Join Room</h2>
      <form onSubmit={handleJoinRoomSubmit}>
        <label htmlFor='name'>Enter name:</label>
        <br />
        <input id='name' type='text' value={userName} onChange={e => setUserName(e.target.value)} />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default JoinRoom