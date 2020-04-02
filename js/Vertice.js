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

  removeAdj(index) {
    this.adj.splice(index, 1)
  }

  drawEdges(ctx) {
    this.adj.forEach(vertice => {
      const from = {x: this.x, y: this.y, radius: this.radius}
      const to = {x: vertice.x, y: vertice.y, radius: vertice.radius}

      const arrowLength = 15;
      const angle = Math.atan(Math.abs(from.y - to.y) / Math.abs(from.x - to.x));
      const deltaY = from.radius * Math.sin(angle);
      const deltaX = to.radius * Math.cos(angle);

      ctx.beginPath();
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
      
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      ctx.save()
      ctx.lineWidth = 2
      if(from.x > to.x && from.y > to.y) {
        ctx.lineTo(to.x + arrowLength * Math.cos(angle - Math.PI / 6), to.y + arrowLength * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(to.x, to.y);
        ctx.lineTo(to.x + arrowLength * Math.cos(angle + Math.PI / 6), to.y + arrowLength * Math.sin(angle + Math.PI / 6));
      } else if(from.x < to.x && from.y > to.y) {
        ctx.lineTo(to.x - arrowLength * Math.cos(angle - Math.PI / 6), to.y + arrowLength * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(to.x, to.y);
        ctx.lineTo(to.x - arrowLength * Math.cos(angle + Math.PI / 6), to.y + arrowLength * Math.sin(angle + Math.PI / 6));
      } else if(from.x > to.x && from.y < to.y) {
        ctx.lineTo(to.x + arrowLength * Math.cos(angle - Math.PI / 6), to.y - arrowLength * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(to.x, to.y);
        ctx.lineTo(to.x + arrowLength * Math.cos(angle + Math.PI / 6), to.y - arrowLength * Math.sin(angle + Math.PI / 6));
      } else {
        ctx.lineTo(to.x - arrowLength * Math.cos(angle - Math.PI / 6), to.y - arrowLength * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(to.x, to.y);
        ctx.lineTo(to.x - arrowLength * Math.cos(angle + Math.PI / 6), to.y - arrowLength * Math.sin(angle + Math.PI / 6));
      }
      ctx.stroke();
      ctx.restore()
    })
  }

  connect(vertice) {
    this.adj.push(vertice)
  }
}

export default Vertice