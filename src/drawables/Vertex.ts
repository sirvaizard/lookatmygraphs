import Drawable from "./Drawable"
import Edge from "./Edge"
import getColorFadeGenerator from './utils/colorFadeGenerator'

export enum statusColors {
    DEFAULT = '#333333',
    EXPANDED = '#e81a51',
    SOLUTION = '#a8eb17'
}

export enum vertexStatus {
  DEFAULT,
  EXPANDED,
  SOLUTION
}

class Vertex implements Drawable {
    static textAlign: CanvasTextAlign = 'center'
    static textColor: string = '#fff'
    static font: string = 'bold 16px Arial'
    static radius: number = 25
    static borderWidth: number = 3
    static borderColorSelected: string = '#b3dfea'
    static borderColorDragging: string = '#fff'
    static vertexVisitingTextColor: string = '#fff'
    static showBorder: boolean = true
    static borderColor: string = '#111'
    static stepMili: number = 300

    x: number
    y: number
    value: string
    adjacents: Edge[]
    dragging: boolean
    selected: boolean
    color: string
    pathCost: number
    changingColor: boolean
    colorGenerator: Generator | null
    edgeToGet: Edge | null


  constructor(x: number, y: number, value: string) {
    this.x = x
    this.y = y
    this.value = value
    this.adjacents = []
    this.dragging = false
    this.selected = false
    this.color = statusColors.DEFAULT
    this.pathCost = 0
    this.changingColor = false
    this.colorGenerator = null
    this.edgeToGet = null
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

  disconnect(vertex: Vertex) {
    this.adjacents.splice(
        this.adjacents.findIndex(edge => edge.destination === vertex), 1)
  }

  connect(vertex: Vertex, cost: number = 0) {
    if(this.adjacents.find(edge => edge.destination === vertex))
        return
    this.adjacents.push(new Edge(this, vertex, cost))
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.x, this.y, Vertex.radius, 0, 2 * Math.PI, false)

    if(this.changingColor && this.colorGenerator) {
        const nextColor = this.colorGenerator.next().value
        if(nextColor)
            this.color = nextColor
        else
            this.changingColor = false
    }

    ctx.fillStyle = this.color
    ctx.fill()

    if (this.dragging) {
        ctx.strokeStyle = Vertex.borderColorDragging
        ctx.lineWidth = Vertex.borderWidth
        ctx.stroke()

    } else if (this.selected) {
        ctx.lineWidth = Vertex.borderWidth
        ctx.strokeStyle = Vertex.borderColorSelected
        ctx.stroke()
    } else if(Vertex.showBorder) {
        ctx.strokeStyle = Vertex.borderColor
        ctx.lineWidth = Vertex.borderWidth
        ctx.stroke()
    }

    ctx.font = Vertex.font
    ctx.fillStyle = Vertex.textColor
    ctx.textAlign = Vertex.textAlign
    ctx.shadowColor = '#000'
    ctx.shadowBlur = 3
    ctx.shadowOffsetY = 1
    ctx.fillText(this.value, this.x, this.y + 5)
    ctx.restore()
  }

  private setColorGenerator(color: statusColors) {
    const MILI_TO_SECOND = 1000
    const animationSteps = Math.floor(30 * Vertex.stepMili/MILI_TO_SECOND)
    this.colorGenerator = getColorFadeGenerator(this.color,
                                                color,
                                                animationSteps)
  }

  restore() {
      this.setStatus(vertexStatus.DEFAULT)
      this.pathCost = 0
      this.edgeToGet = null
  }
}

export default Vertex
