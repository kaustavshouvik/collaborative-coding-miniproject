import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreateRoom from './components/CreateRoom';
import Room from './components/Room';

import io from 'socket.io-client'
import JoinRoom from './components/JoinRoom';

let socket;

// Declare all the states here in one place

function App() {
  const [roomName, setRoomName] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    socket = io('http://localhost:3001')
  }, [])

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' render={() => 
            <CreateRoom
              roomName={roomName}
              setRoomName={setRoomName}
              userName={userName}
              setUserName={setUserName}
              socket={socket}
            />
          }/>
          <Route exact path='/join' render={() =>
            <JoinRoom
              roomName={roomName}
              setRoomName={setRoomName}
              userName={userName}
              setUserName={setUserName}
              socket={socket}
            />
          } />
          <Route exact path='/room' render={() => 
            <Room
              roomName={roomName}
              userName={userName}
              socket={socket}
            />
          }/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
