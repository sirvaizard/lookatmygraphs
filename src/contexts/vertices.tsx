import React, { createContext, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'

import Vertex from '../drawables/Vertex'
import feedGraph, { feedFullScreenGraph } from '../utils/feedGraph'

interface VerticesContextProps {
    vertices: Vertex[]
    selectedVertex: Vertex | null
    selectVertex(vertex: Vertex | null): void
    currentX: number
    setCurrentX(x: number): void
    currentY: number
    setCurrentY(y: number): void
    currentValue: string
    setCurrentValue(value: string): void
    createVertex(): void
    getNotConnectedVertices(): Vertex[]
    disconnectVertex(vertex: Vertex): void
    deleteVertex(): void
    editVertex(): void
    deleteGraph(): void
    randomCosts(): void
}

const VerticesContext = createContext({} as VerticesContextProps)
const fGraph = feedGraph()

export const VerticesProvider: React.FC = ({children}) => {
    const [selectedVertex, setSelectedVertex] = useState<Vertex | null>(null)
    const [currentValue, setCurrentValue] = useState<string>('')
    const [vertices, setVertices] = useState<Vertex[]>([])
    const [currentX, setCurrentX] = useState<number>(0)
    const [currentY, setCurrentY] = useState<number>(0)
    const { enqueueSnackbar } = useSnackbar()


    const selectVertex = (vertex: Vertex | null) => {
        vertices.forEach(vertice => {
            vertice.dragging = vertice.selected = false
        })
        setSelectedVertex(vertex)
        if(vertex)
            vertex.selected = true
    }

    const createVertex = () => {
        if(hasVertex(currentValue)) {
            enqueueSnackbar('Vertex with this value already exists!',
                            {variant: 'error'})
            return null
        }
        const newVertex = new Vertex(currentX, currentY, currentValue)
        vertices.push(newVertex)
        selectVertex(newVertex)
        enqueueSnackbar('Vertex created successfully!',
                        {variant: 'success'})
        return null
    }

    const editVertex = () => {
        if(hasVertex(currentValue)) {
            enqueueSnackbar('Vertex with this value already exists!',
                            {variant: 'error'})
            return
        }
        if(selectedVertex) {
            selectedVertex.value = currentValue
            enqueueSnackbar('Vertex edited successfully',
                            {variant: 'success'})
        }
    }

    const disconnectVertex = (vertex: Vertex) => {
        if(selectedVertex) {
            selectedVertex.disconnect(vertex)
            enqueueSnackbar('Vertex disconnected succesfully',
                            {variant: 'success'})
        }
    }

    const deleteVertex = () => {
        if(selectedVertex) {
            selectedVertex.adjacents.forEach(edge =>
                selectedVertex.disconnect(edge.destination))
            vertices.forEach(vertex => {
                vertex.adjacents.forEach(edge => {
                    if(edge.destination === selectedVertex)
                        vertex.disconnect(selectedVertex)})
            })
            vertices.splice(vertices.indexOf(selectedVertex), 1)
            if(vertices.length > 0)
                selectVertex(vertices[0])
            else
                selectVertex(null)
            enqueueSnackbar('Vertex deleted succesfully',
                            {variant: 'success'})
        } else {
            enqueueSnackbar('No vertex selected',
                            {variant: 'warning'})
        }
    }

    const deleteGraph = () => {
        vertices.splice(0, vertices.length)
        selectVertex(null)
        enqueueSnackbar('Graph deleted succesfully',
                        {variant: 'success'})
    }

    const hasVertex = (value: string) => {
        return vertices.some(vertex => {
            return vertex.value === value
        })
    }

    const getNotConnectedVertices = (): Vertex[] => {
        if(!selectedVertex)
            return []
        const connectedWith = selectedVertex.adjacents.map(edge =>
                                                            edge.destination)
        return vertices.filter(vertex => !connectedWith.includes(vertex))
    }

    const randomCosts = () => {
        for(const vertex of vertices)
            for(const edge of vertex.adjacents)
                edge.cost = Math.ceil(Math.random() * 100)
    }

    useEffect(() => {
        setVertices(fGraph)
    }, [])


    return (
        <VerticesContext.Provider value={{
                vertices,
                selectedVertex,
                selectVertex,
                currentX,
                setCurrentX,
                currentY,
                setCurrentY,
                currentValue,
                setCurrentValue,
                createVertex,
                getNotConnectedVertices,
                disconnectVertex,
                deleteVertex,
                editVertex,
                deleteGraph,
                randomCosts
            }}>
            {children}
        </VerticesContext.Provider>
    )
}

export default VerticesContext
