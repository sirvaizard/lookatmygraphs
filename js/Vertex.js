import Edge from "./Edge.js"

class Vertex {
  constructor(x, y, value, radius = 25) {
    this.x = x
    this.y = y
    this.value = value
    this.radius = radius
    this.adj = []
    this.dragging = false
    this.selected = false
    this.color = 0
  }

  disconnect(index) {
    this.adj.splice(index, 1)
  }

  connect(vertex, cost) {
    this.adj.push(new Edge(this, vertex, cost))
  }
}

export default Vertex