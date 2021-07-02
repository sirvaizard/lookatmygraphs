import { useEffect, useRef, useState} from 'react'

export function useCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth)
    const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight)
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>({} as CanvasRenderingContext2D)

    useEffect(() => {
        const canvasElement: HTMLCanvasElement = canvasRef.current as HTMLCanvasElement
        if(!ctx.hasOwnProperty('save'))
            setCtx(canvasElement.getContext('2d') as CanvasRenderingContext2D)
    }, [ctx])

    return { canvasRef, canvasWidth, canvasHeight, setCanvasHeight, setCanvasWidth, ctx }
}