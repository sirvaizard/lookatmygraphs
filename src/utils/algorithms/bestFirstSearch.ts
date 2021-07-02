import Vertex, { vertexStatus } from '../../drawables/Vertex'
import Edge from '../../drawables/Edge'
import PriorityQueue from './PriorityQueue'
import expand from './expand'

function lowestPathCost(item: [Vertex, Edge | null]) {
    return item[0].pathCost
}

export default async function bestFirstSearch(
        node: Vertex,
        goal: string = '',
        fn: (item: [Vertex, Edge | null]) =>
            number = lowestPathCost): Promise<boolean> {

    return new Promise(async resolve => {
        const frontier = new PriorityQueue<[Vertex, Edge | null]>(fn, 'min')
        const reached = new Set<Vertex>()
        frontier.push([node, null])
        reached.add(node)

        while(frontier.length) {
            const [node, edge] = frontier.pop() || []
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
                    frontier.push([child, edge])
                }
            })
            await new Promise(resolve => setTimeout(resolve, Vertex.stepMili))
        }

        return resolve(false)
    })
}
