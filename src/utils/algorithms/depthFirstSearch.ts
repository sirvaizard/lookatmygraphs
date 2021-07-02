import Vertex, { vertexStatus } from '../../drawables/Vertex'
import Edge from '../../drawables/Edge'
import expand from './expand'

export default function depthFirstSearch(node: Vertex,
                                         goal: string = '',
                                         ): Promise<boolean> {
    return new Promise(async resolve => {
        const frontier: [Vertex, Edge | null][] = [[node, null]]
        const reached = new Set<Vertex>()
        reached.add(node)

        while(frontier.length) {
            const [node, edge] = frontier.shift() || []
            if(node) {
                node.setStatus(vertexStatus.EXPANDED)
                if(node.value === goal)
                    return resolve(true)
            }
            if (edge)
                edge.setStatus(vertexStatus.EXPANDED)
            expand(node).forEach(([child, edge]) => {
                if(!reached.has(child)) {
                    reached.add(child)
                    frontier.unshift([child, edge])
                }
            })

            await new Promise(resolve => setTimeout(resolve, Vertex.stepMili))
        }

        return resolve(false)
    })
}
