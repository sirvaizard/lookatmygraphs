import Vertex from '../drawables/Vertex'

export default function restoreGraph(vertices: Vertex[]) {
    vertices.forEach(vertex => {
        vertex.restore()
        vertex.adjacents.forEach(edge => edge.restore())
    })
}
