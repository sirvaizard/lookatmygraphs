import React, { useContext, useState } from 'react'
import Vertex from '../../drawables/Vertex'
import VerticesContext from '../../contexts/vertices'
import CanvasContext from '../../contexts/canvas'

const Canvas: React.FC = () => {
    const { setCurrentX, setCurrentY,
            selectVertex, vertices } = useContext(VerticesContext)

    const [draggingVertex, setDraggingVertex] = useState<Vertex>()

    const { setCanvasHeight, setCanvasWidth,
            canvasRef, canvasHeight,canvasWidth,
            setShouldOpenRightClickMenu } = useContext(CanvasContext)

    const handleMoveVertice: React.MouseEventHandler<HTMLCanvasElement> = e => {
        if (draggingVertex) {
          draggingVertex.x = e.pageX
          draggingVertex.y = e.pageY
        }
      }

    const handleMouseDown: React.MouseEventHandler<HTMLCanvasElement> = e => {
        selectVertex(null)
        const x = e.pageX
        const y = e.pageY
        setCurrentX(Number(x))
        setCurrentY(Number(y))

        vertices.some((vertex: Vertex, index: number) => {
          if ((x > vertex.x - Vertex.radius && x < vertex.x + Vertex.radius)
            && (y > vertex.y - Vertex.radius && y < vertex.y + Vertex.radius)) {
            vertex.dragging = true
            setDraggingVertex(vertex)
            return true
          }
          return false
        })
      }

    const handleMouseUp: React.MouseEventHandler<HTMLCanvasElement> = e => {
        if (draggingVertex) {
            selectVertex(draggingVertex)
        }
        if(e.button === 2)
          setShouldOpenRightClickMenu(true)
        setDraggingVertex(undefined)
      }

    const handleContextMenu: React.MouseEventHandler<HTMLCanvasElement> = e => {
        e.preventDefault()
    }

    window.addEventListener('resize', () => {
        setCanvasHeight(window.innerHeight)
        setCanvasWidth(window.innerWidth)
    })

    window.addEventListener('contextmenu', (e) => e.preventDefault())

    return (
        <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onContextMenu={handleContextMenu}
            onMouseMove={draggingVertex && handleMoveVertice}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        />
    )
}

export default Canvas
