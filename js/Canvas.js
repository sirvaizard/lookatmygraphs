class Canvas {
  constructor(canvasElement, vertices) {
    this.canvas = canvasElement
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.ctx = this.canvas.getContext('2d')
    this.vertices = vertices
    this.menu = null

    this.canvasBackgroundColor = '#1f1e2e'

    this.font = "22px Arial"
    this.textColor = '#333'
    this.textAlign = 'center'
    this.vertexColor = '#fff'
    this.vertexColorFound = '#bf2a2a'
    this.vertexColorVisiting = '#1791c2'
    this.vertexVisitingTextColor = '#fff'
    this.selectedBorder = '#222'
    this.activeBorder = '#000'
    this.borderWidth = 3

    this.edgeLineWidth = 3
    this.edgeFont = '16px Arial'
    this.edgeFontAlign = 'left'
    this.edgeColor = '#59a4c4'
    this.edgeCostTextColor = '#fff'

    this.currentDraggingVertice = null

    this.addEventListeners()
  }

  clear() {
    this.ctx.fillStyle = this.canvasBackgroundColor
    this.ctx.fillRect(0, 0, canvas.width, canvas.height)
    // this.ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  drawGraph() {
    this.clear()
    this.drawEdges()
    this.drawVertices()
  }

  drawEdges() {
    this.vertices.forEach(vertice => {
      vertice.adj.forEach(edge => {
        const from = { x: edge.source.x, y: edge.source.y, radius: edge.source.radius }
        const to = { x: edge.destination.x, y: edge.destination.y, radius: edge.destination.radius }

        const arrowLength = 15;
        const angle = Math.atan(Math.abs(from.y - to.y) / Math.abs(from.x - to.x));
        const deltaY = from.radius * Math.sin(angle);
        const deltaX = to.radius * Math.cos(angle);

        this.ctx.beginPath();
        this.fillStyle = this.edgeColor
        if (from.x < to.x) {
          from.x += deltaX;
          to.x -= deltaX;
        } else {
          from.x -= deltaX;
          to.x += deltaX;
        }
        if (from.y < to.y) {
          from.y += deltaY;
          to.y -= deltaY;
        } else {
          from.y -= deltaY;
          to.y += deltaY;
        }

        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.stroke();
        this.ctx.save()
        this.ctx.lineWidth = this.edgeLineWidth
        if (from.x > to.x && from.y > to.y) {
          this.ctx.lineTo(to.x + arrowLength * Math.cos(angle - Math.PI / 6), to.y + arrowLength * Math.sin(angle - Math.PI / 6));
          this.ctx.moveTo(to.x, to.y);
          this.ctx.lineTo(to.x + arrowLength * Math.cos(angle + Math.PI / 6), to.y + arrowLength * Math.sin(angle + Math.PI / 6));
        } else if (from.x < to.x && from.y > to.y) {
          this.ctx.lineTo(to.x - arrowLength * Math.cos(angle - Math.PI / 6), to.y + arrowLength * Math.sin(angle - Math.PI / 6));
          this.ctx.moveTo(to.x, to.y);
          this.ctx.lineTo(to.x - arrowLength * Math.cos(angle + Math.PI / 6), to.y + arrowLength * Math.sin(angle + Math.PI / 6));
        } else if (from.x > to.x && from.y < to.y) {
          this.ctx.lineTo(to.x + arrowLength * Math.cos(angle - Math.PI / 6), to.y - arrowLength * Math.sin(angle - Math.PI / 6));
          this.ctx.moveTo(to.x, to.y);
          this.ctx.lineTo(to.x + arrowLength * Math.cos(angle + Math.PI / 6), to.y - arrowLength * Math.sin(angle + Math.PI / 6));
        } else {
          this.ctx.lineTo(to.x - arrowLength * Math.cos(angle - Math.PI / 6), to.y - arrowLength * Math.sin(angle - Math.PI / 6));
          this.ctx.moveTo(to.x, to.y);
          this.ctx.lineTo(to.x - arrowLength * Math.cos(angle + Math.PI / 6), to.y - arrowLength * Math.sin(angle + Math.PI / 6));
        }
        this.fillStyle = this.edgeColor
        this.ctx.stroke();

        if (edge.cost) {
          this.ctx.font = this.edgeFont
          this.ctx.fillStyle = this.edgeCostTextColor
          this.ctx.textAlign = this.edgeFontAlign
          this.ctx.fillText(edge.cost, (from.x + to.x) / 2, (from.y + to.y) / 2)
        }

        this.ctx.restore()
      })
    })
  }

  drawVertices() {
    this.vertices.forEach(vertice => {
      this.ctx.beginPath()
      this.ctx.arc(vertice.x, vertice.y, vertice.radius, 0, 2 * Math.PI, false)

      if (vertice.color === 2)
        this.ctx.fillStyle = this.vertexColorFound
      else
        this.ctx.fillStyle = vertice.color === 1 ? this.vertexColorVisiting : this.vertexColor
      this.ctx.fill()

      if (vertice.selected) {
        this.ctx.lineWidth = this.borderWidth
        this.ctx.strokeStyle = this.selectedBorder
        this.ctx.stroke()
        this.ctx.strokeStyle = this.activeBorder
        this.ctx.lineWidth = this.edgeLineWidth
      }

      if (vertice.dragging) {
        this.ctx.lineWidth = this.borderWidth
        this.ctx.stroke()
        this.ctx.lineWidth = this.edgeLineWidth
      }

      this.ctx.font = this.font
      this.ctx.fillStyle = vertice.color !== 0 ? this.vertexVisitingTextColor : this.textColor
      this.ctx.textAlign = this.textAlign
      this.ctx.fillText(vertice.value, vertice.x, vertice.y + 5)
    })
  }

  handleMoveVertice = (e) => {
    if (this.currentDraggingVertice) {
      this.currentDraggingVertice.x = e.pageX
      this.currentDraggingVertice.y = e.pageY
      this.drawGraph(this.vertices)
    }
  }

  handleMouseDown = (e) => {
    const x = e.pageX
    const y = e.pageY

    this.menu.setCoords(x, y)

    this.vertices.forEach((vertice, index) => {
      if ((x > vertice.x - vertice.radius && x < vertice.x + vertice.radius)
        && (y > vertice.y - vertice.radius && y < vertice.y + vertice.radius)) {
        vertice.dragging = true
        this.currentDraggingVertice = vertice
        this.menu.setSelected(vertice, index)
      }

      this.canvas.addEventListener('mousemove', this.handleMoveVertice)
      this.drawGraph(this.vertices)
    })
  }

  handleMouseUp = () => {
    this.vertices.forEach(vertice => vertice.dragging = false)
    this.canvas.removeEventListener('mousemove', this.handleMoveVertice)
    if (this.currentDraggingVertice)
      this.currentDraggingVertice.dragging = false

    this.currentDraggingVertice = null
    this.drawGraph(this.vertices)
  }

  addEventListeners() {
    this.canvas.addEventListener('mousedown', this.handleMouseDown)
    this.canvas.addEventListener('mouseup', this.handleMouseUp)
  }

  setMenu(menu) {
    this.menu = menu
  }

  resize(width, height) {
    this.canvas.width = width
    this.canvas.height = height
    this.drawGraph()
  }
}

export default Canvas