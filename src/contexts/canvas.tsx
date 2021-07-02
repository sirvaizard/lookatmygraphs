import React, { createContext, useContext, useEffect, useCallback, useState } from 'react'

import CanvasMenu from '../components/CanvasMenu'
import { useCanvas } from '../hooks/useCanvas'
import VerticesContext from '../contexts/vertices'

interface CanvasContextProps {
    setShouldOpenRightClickMenu(b: boolean): void
    setCanvasHeight(height: number): void
    setCanvasWidth(width: number): void
    canvasHeight: number
    canvasWidth: number
    canvasRef: React.RefObject<HTMLCanvasElement>
    ctx: CanvasRenderingContext2D
}

const CanvasContext = createContext({} as CanvasContextProps)
const backgroundColor: string = '#1f1e2e'

export const CanvasProvider: React.FC = ({ children }) => {
    const { canvasRef, canvasHeight, canvasWidth,
            ctx, setCanvasHeight, setCanvasWidth } = useCanvas()

    const { vertices, currentX, currentY } = useContext(VerticesContext)

    const [shouldOpenRightClickMenu,
           setShouldOpenRightClickMenu] = useState<boolean>(false)

    const render = useCallback(() => {
        if(!ctx.save)
            return

        ctx.save()
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)

        for(const vertex of vertices) {
            for(const edge of vertex.adjacents) {
                edge.draw(ctx)
            }
        }

        for(const vertex of vertices) {
            vertex.draw(ctx)
        }

        ctx.restore()
        requestAnimationFrame(render)
    }, [ctx, canvasWidth, canvasHeight, vertices])

    useEffect(() => {
        requestAnimationFrame(render)
    }, [render])

    return (
        <CanvasContext.Provider value={{
            setShouldOpenRightClickMenu,
            setCanvasHeight,
            setCanvasWidth,
            canvasHeight,
            canvasWidth,
            canvasRef,
            ctx,
        }}>
            {children}
            {shouldOpenRightClickMenu &&
            <CanvasMenu
                top={currentY}
                left={currentX}
                setShouldOpen={setShouldOpenRightClickMenu} />}
        </CanvasContext.Provider>
    )
}

export default CanvasContext
