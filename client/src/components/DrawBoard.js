import { useRef, useEffect, useState } from 'react'
import './DrawBoard.css'

const DrawBoard = ({ socket, roomName }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;

    // canvas.style.width = `${500}px`
    // canvas.style.height = `${500}px`

    const context = canvas.getContext('2d')
    context.scale(2, 2)
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = 5

    contextRef.current = context;
  }, [])

  useEffect(() => {
    socket.on('draw', ({ x, y }) => {
      // console.log(x, y)
      contextRef.current.lineTo(x, y)
      contextRef.current.stroke();
      contextRef.current.moveTo(x, y)
    })
  })

  const startDrawing = (e) => {
    const { clientX, clientY } = e;

    contextRef.current.beginPath()
    contextRef.current.moveTo(clientX, clientY)

    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()

    setIsDrawing(false)
  }

  const draw = (e) => {
    if (!isDrawing) return;
    
    const { clientX, clientY } = e;
    socket.emit('draw', { x: clientX, y: clientY, roomName });

    contextRef.current.lineTo(clientX, clientY)
    contextRef.current.stroke();

  }

  return (
    <div>
      <h2 className='h2'>Drawing board</h2>
      <button>Clear Board</button>

      <div className="sketch" id="sketch">
          <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
            className="board"
            id="board"
          />
      </div>
    </div>
  )
}

export default DrawBoard
