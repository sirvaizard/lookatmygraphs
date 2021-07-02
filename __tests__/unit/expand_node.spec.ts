import expand from '../../src/utils/algorithms/expand'
import Vertex from '../../src/drawables/Vertex'

describe('Expand Vertex', () => {
    it('should return a list with all reachable vertex', () => {
        const v1 = new Vertex(0, 0, 'a')
        v1.connect(new Vertex(0, 0, 'b'), 0)
        v1.connect(new Vertex(0, 0, 'c'), 0)
        v1.connect(new Vertex(0, 0, 'd'), 0)
        v1.connect(new Vertex(0, 0, 'e'), 0)
        v1.connect(new Vertex(0, 0, 'f'), 0)

        const vertices = expand(v1).map(v => v[0])

        //console.log(vertices)
        for(const edge of v1.adjacents) {
            expect(vertices).toContain(edge.destination)
        }
    })

    // maybe should throw an error?
    it('should return a empty list if vertex is undefined', () => {
        const vertices = expand(undefined)

        expect(vertices.length).toBe(0)
    })
})
