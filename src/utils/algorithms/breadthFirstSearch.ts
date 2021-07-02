import Vertex, { vertexStatus } from '../../drawables/Vertex'
import Edge from '../../drawables/Edge'
import expand from './expand'

export default function breadthFirstSearch(node: Vertex,
                                           goal: string
                                           ): Promise<boolean> {
    return new Promise(async resolve => {
        console.log(goal)
        const frontier: [Vertex, Edge | null][] = [[node, null]]
        const reached = new Set<Vertex>()
        reached.add(node)

        while(frontier.length) {
            const [node, edge] = frontier.shift() || []
            if (edge)
                edge.setStatus(vertexStatus.EXPANDED)
            if(node) {
                node.setStatus(vertexStatus.EXPANDED)
                if(node.value === goal) {
                    let solutionNode: Vertex | undefined = node
                    while(solutionNode) {
                        solutionNode.setStatus(vertexStatus.SOLUTION)
                        if(solutionNode.edgeToGet)
                            solutionNode
                                .edgeToGet
                                .setStatus(vertexStatus.SOLUTION)
                        solutionNode = solutionNode.edgeToGet?.source
                    }
                    return resolve(true)
                }
            }
            expand(node).forEach(([child, edge]) => {
                if(!reached.has(child)) {
                    reached.add(child)
                    frontier.push([child, edge])
                }
            })
            await new Promise(resolve => setTimeout(resolve, Vertex.stepMili))
        }

        return resolve(false)
    })
}
