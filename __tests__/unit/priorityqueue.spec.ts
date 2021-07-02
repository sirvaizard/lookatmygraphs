import PriorityQueue from '../../src/utils/algorithms/PriorityQueue'
import Vertex from '../../src/drawables/Vertex'

describe('Priority Queue', () => {
    it('should order objects correctly with given function ' +
            'in ascending order', () => {
        const fn = (vertex: Vertex): number => {
            return vertex.pathCost
        }

        const v1 = new Vertex(0, 0, 'a')
        v1.pathCost = 8
        const v2 = new Vertex(0, 0, 'b')
        v2.pathCost = 3
        const v3 = new Vertex(0, 0, 'c')
        v3.pathCost = 2
        const v4 = new Vertex(0, 0, 'd')
        v4.pathCost = 7
        const v5 = new Vertex(0, 0, 'e')
        v5.pathCost = 16

        const pq = new PriorityQueue<Vertex>(fn, 'min')
        pq.push(v1)
        pq.push(v2)
        pq.push(v3)
        pq.push(v4)
        pq.push(v5)

        expect(pq.pop()?.pathCost).toBe(2)
        expect(pq.pop()?.pathCost).toBe(3)
        expect(pq.pop()?.pathCost).toBe(7)
        expect(pq.pop()?.pathCost).toBe(8)
        expect(pq.pop()?.pathCost).toBe(16)
    })

    it('should order objects correctly with given function ' +
            'in descending order', () => {
        const fn = (vertex: Vertex): number => {
            return vertex.pathCost
        }

        const v1 = new Vertex(0, 0, 'a')
        v1.pathCost = 8
        const v2 = new Vertex(0, 0, 'b')
        v2.pathCost = 3
        const v3 = new Vertex(0, 0, 'c')
        v3.pathCost = 2
        const v4 = new Vertex(0, 0, 'd')
        v4.pathCost = 7
        const v5 = new Vertex(0, 0, 'e')
        v5.pathCost = 16

        const pq = new PriorityQueue<Vertex>(fn, 'max')
        pq.push(v1)
        pq.push(v2)
        pq.push(v3)
        pq.push(v4)
        pq.push(v5)

        expect(pq.pop()?.pathCost).toBe(16)
        expect(pq.pop()?.pathCost).toBe(8)
        expect(pq.pop()?.pathCost).toBe(7)
        expect(pq.pop()?.pathCost).toBe(3)
        expect(pq.pop()?.pathCost).toBe(2)
    })

    it('should throw an error when try to pop an empty Queue', () => {
        const pq = new PriorityQueue<number>((x) => x, 'min')

        expect(pq.pop.bind(pq)).toThrowError('Heap Underflow')
    })
})
