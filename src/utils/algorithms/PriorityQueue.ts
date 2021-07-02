class PriorityQueue<T> {
    data: T[]
    fn: (obj: T) => number
    type: string

    constructor(fn: (obj: T) => number, type: 'max' | 'min') {
        this.fn = fn
        this.data = []
        this.type = type
    }

    get length() {
        return this.data.length
    }

    parent(i: number): number {
        return Math.floor((i-1) / 2)
    }

    right(i: number): number {
        return (i+1) * 2
    }

    left(i: number): number {
        return (i*2) + 1
    }

    heapify(i: number) {
        let left = this.left(i)
        let right = this.right(i)
        let toChange = i

        if(left < this.data.length) {
            if((this.type === 'min' && this.fn(this.data[left]) < this.fn(this.data[toChange])) ||
               (this.type === 'max' && this.fn(this.data[left]) > this.fn(this.data[toChange])))
                toChange = left
        }
        if(right < this.data.length) {
            if((this.type === 'min' && this.fn(this.data[right]) < this.fn(this.data[toChange])) ||
               (this.type === 'max' && this.fn(this.data[right]) > this.fn(this.data[toChange])))
                toChange = right
        }

        if(toChange !== i) {
            this.swap(i, toChange)
            this.heapify(toChange)
        }
    }

    pop(): T | undefined {
        if(this.data.length === 0)
            throw new Error('Heap Underflow')

        this.swap(0, this.data.length-1)
        const value = this.data.pop()
        this.heapify(0)
        return value
    }

    push(item: T) {
        this.data.push(item)
        let i = this.data.length - 1
        if(this.type === 'max') {
            while(i > 0 && this.fn(this.data[this.parent(i)]) < this.fn(this.data[i])) {
                this.swap(i, this.parent(i))
                i = this.parent(i)
            }
        } else {
            while(i > 0 && this.fn(this.data[this.parent(i)]) > this.fn(this.data[i])) {
                this.swap(i, this.parent(i))
                i = this.parent(i)
            }
        }
    }

    swap(i: number, j: number) {
        const temp = this.data[i]
        this.data[i] = this.data[j]
        this.data[j] = temp
    }
}

export default PriorityQueue
