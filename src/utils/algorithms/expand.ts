import Vertex from '../../drawables/Vertex'
import Edge from '../../drawables/Edge'

export default function expand(node: Vertex | undefined): [Vertex, Edge][] {
    if(node)
        return node.adjacents.map(edge => {
            edge.destination.pathCost = node.pathCost + edge.cost
            if(!edge.destination.edgeToGet)
                edge.destination.edgeToGet = edge
            return [edge.destination, edge]
        })
    return []
}
