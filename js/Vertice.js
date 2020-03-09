class Vertice {
  constructor(x, y, value, radius = 20) {
    this.x = x
    this.y = y
    this.value = value
    this.radius = radius
    this.adj = []
    this.dragging = false
    this.selected = false
  }

  // depreciado ???
  draw(ctx) {
    this.drawEdges(ctx)
    this.drawVertices(ctx)
  }

  drawVertices(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = '#e8e8e8'
    ctx.fill()

    if(this.selected) {
      ctx.lineWidth = 3
      ctx.strokeStyle = '#888'
      ctx.stroke()
      //reseta estilo da linha
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 1
    }

    if(this.dragging) {
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.lineWidth = 1
    }

    ctx.font = "20px Arial"
    ctx.fillStyle = '#333'
    ctx.textAlign = 'center'
    ctx.fillText(this.value, this.x, this.y + 5)
  }

  drawEdges(ctx) {
    this.adj.forEach(vertice => {
      ctx.beginPath()
      ctx.moveTo(this.x, this.y)
      ctx.lineTo(vertice.x, vertice.y)
      ctx.stroke()
    })
  }

  connect(vertice) {
    this.adj.push(vertice)
  }
}

export default Vertice