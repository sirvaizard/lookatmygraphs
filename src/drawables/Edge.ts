import Drawable from "./Drawable"
import Vertex, { vertexStatus } from "./Vertex"
import getColorFadeGenerator from './utils/colorFadeGenerator'

export enum statusColors {
    DEFAULT = '#000000',
    EXPANDED = '#e81a51',
    SOLUTION = '#a8eb17'
}

class Edge implements Drawable {
    static showCost: boolean = true

    source: Vertex
    destination: Vertex
    cost: number
    lineWidth: number
    font: string
    textAlign: CanvasTextAlign
    costColor: string
    color: string
    colorGenerator: Generator | null
    changingColor: boolean

    constructor(source: Vertex, destination: Vertex, cost = 0) {
      this.source = source
      this.destination = destination
      this.cost = cost
      this.lineWidth = 3
      this.font = 'bold 16px Arial'
      this.textAlign = 'center'
      this.costColor = '#fff'
      this.color = '#000000'
      this.colorGenerator = null
      this.changingColor = false
    }

    setStatus(value: vertexStatus) {
        switch(value) {
          case vertexStatus.DEFAULT:
            this.setColorGenerator(statusColors.DEFAULT)
            break
          case vertexStatus.EXPANDED:
            this.setColorGenerator(statusColors.EXPANDED)
            break
          case vertexStatus.SOLUTION:
            this.setColorGenerator(statusColors.SOLUTION)
            break
        }

        this.changingColor = true
      }


    draw(ctx: CanvasRenderingContext2D) {
        const arrowLength = 15
        const angle = Math.atan(
            Math.abs(this.source.y - this.destination.y)
            / Math.abs(this.source.x - this.destination.x))

        const deltaY = Vertex.radius * Math.sin(angle)
        const deltaX = Vertex.radius * Math.cos(angle)

        const from = { x: this.source.x, y: this.source.y }
        const to = { x: this.destination.x, y: this.destination.y }

        ctx.save()
        ctx.beginPath()

        if(this.changingColor && this.colorGenerator) {
            const nextColor = this.colorGenerator.next().value
            if(nextColor)
                this.color = nextColor
            else
                this.changingColor = false
        }

        ctx.strokeStyle = this.color
        if (from.x < to.x) {
          from.x += deltaX
          to.x -= deltaX
        } else {
          from.x -= deltaX
          to.x += deltaX
        }
        if (from.y < to.y) {
          from.y += deltaY
          to.y -= deltaY
        } else {
          from.y -= deltaY
          to.y += deltaY
        }


        const middleX = Math.min(this.source.x, this.destination.x)
            + Math.abs(this.source.x - this.destination.x) / 2
        const middleY = Math.min(this.source.y, this.destination.y)
            + Math.abs(this.source.y - this.destination.y) / 2
        /*
        let radiusX = 0
        let radiusY = 0
        if (from.x > to.x && from.y > to.y) {
            radiusX = middleX + (middleX / 25) * Math.cos(angle - Math.PI / 2)
            radiusY = middleY + (middleX / 25) * Math.sin(angle - Math.PI / 2)
          } else if (from.x < to.x && from.y > to.y) {
            radiusX = middleX - (middleX / 25) * Math.cos(angle + Math.PI / 2)
            radiusY = middleY + (middleX / 25) * Math.sin(angle + Math.PI / 2)
          } else if (from.x > to.x && from.y < to.y) {
            radiusX = middleX + (middleX / 25) * Math.cos(angle + Math.PI / 2)
            radiusY = middleY - (middleX / 25) * Math.sin(angle + Math.PI / 2)
          } else {
            radiusX = middleX - (middleX / 25) * Math.cos(angle - Math.PI / 2)
            radiusY = middleY - (middleX / 25) * Math.sin(angle - Math.PI / 2)
          }

        ctx.moveTo(from.x, from.y)
        ctx.quadraticCurveTo(radiusX, radiusY, to.x, to.y)
        ctx.stroke()
        //*/

        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()
        ctx.lineWidth = this.lineWidth
        if (from.x > to.x && from.y > to.y) {
          ctx.lineTo(to.x + arrowLength * Math.cos(angle - Math.PI / 6),
                     to.y + arrowLength * Math.sin(angle - Math.PI / 6))
          ctx.moveTo(to.x, to.y)
          ctx.lineTo(to.x + arrowLength * Math.cos(angle + Math.PI / 6),
                     to.y + arrowLength * Math.sin(angle + Math.PI / 6))
        } else if (from.x < to.x && from.y > to.y) {
          ctx.lineTo(to.x - arrowLength * Math.cos(angle - Math.PI / 6),
                     to.y + arrowLength * Math.sin(angle - Math.PI / 6))
          ctx.moveTo(to.x, to.y)
          ctx.lineTo(to.x - arrowLength * Math.cos(angle + Math.PI / 6),
                     to.y + arrowLength * Math.sin(angle + Math.PI / 6))
        } else if (from.x > to.x && from.y < to.y) {
          ctx.lineTo(to.x + arrowLength * Math.cos(angle - Math.PI / 6),
                     to.y - arrowLength * Math.sin(angle - Math.PI / 6))
          ctx.moveTo(to.x, to.y)
          ctx.lineTo(to.x + arrowLength * Math.cos(angle + Math.PI / 6),
                     to.y - arrowLength * Math.sin(angle + Math.PI / 6))
        } else {
          ctx.lineTo(to.x - arrowLength * Math.cos(angle - Math.PI / 6),
                     to.y - arrowLength * Math.sin(angle - Math.PI / 6))
          ctx.moveTo(to.x, to.y)
          ctx.lineTo(to.x - arrowLength * Math.cos(angle + Math.PI / 6),
                     to.y - arrowLength * Math.sin(angle + Math.PI / 6))
        }
        ctx.stroke()

        if(Edge.showCost) {
          ctx.font = this.font
          ctx.fillStyle = this.costColor
          ctx.textAlign = this.textAlign
          ctx.fillText(String(this.cost), middleX, middleY)
        }

        ctx.restore()
    }

    setColorGenerator(color: statusColors) {
        const MILI_TO_SECOND = 1000
        const animationSteps = Math.floor(30 * Vertex.stepMili / MILI_TO_SECOND)
        this.colorGenerator = getColorFadeGenerator(this.color,
                                                      color,
                                                      animationSteps)
    }

    restore() {
        this.setStatus(vertexStatus.DEFAULT)
    }
  }

  export default Edge
