import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()

const PORT = process.env.PORT || 3001

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
});

const rooms = {}

io.on('connection', (socket) => {
  console.log(`New connection : ${socket.id}`)

  socket.on('create-room', (payload) => {
    console.log(payload);

    socket.join(payload.roomName)

    rooms[payload.roomName] = [payload.userName]

    console.log('rooms', rooms)

    io.to(payload.roomName).emit('room-data', rooms[payload.roomName]);
  })
  
  socket.on('join-room', (payload) => {
    console.log(payload);
    
    socket.join(payload.roomName)
    
    rooms[payload.roomName].push(payload.userName)
    
    console.log('rooms', rooms)
    
    io.to(payload.roomName).emit('room-data', rooms[payload.roomName]);
  })
  
  socket.on('draw', (payload) => {
    // console.log(payload)
    socket.to(payload.roomName).emit('draw', payload);
  })

  socket.on('chat', (payload) => {
    // console.log(payload);
    socket.to(payload.roomName).emit('chat', payload);
  })
})


server.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`)
})