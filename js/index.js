import Vertice from './Vertice.js'
import Menu from './Menu.js'


(function() {
  const canvas = document.getElementById('canvas')
  canvas.width = window.innerWidth - 250
  canvas.height = window.innerHeight
  const ctx = canvas.getContext('2d')
  let dragging = null;

  const vertices = []

  const menu = new Menu(vertices, draw)

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    vertices.forEach(vertice => vertice.draw(ctx))
  }

  vertices.push(new Vertice(990, 346, 10, 20))
  vertices.push(new Vertice(863, 342, 8, 20))
  vertices.push(new Vertice(899, 232, 1, 20))
  vertices.push(new Vertice(1028, 237, 90, 20))
  vertices.push(new Vertice(933, 459, 4, 20))
  vertices.push(new Vertice(774, 415, 33, 20))

  vertices[0].adj.push(vertices[1])
  vertices[0].adj.push(vertices[2])
  vertices[0].adj.push(vertices[3])
  vertices[1].adj.push(vertices[4])
  vertices[1].adj.push(vertices[5])

  function moveVertice(e) {
    if(dragging) {
      dragging.x = e.pageX
      dragging.y = e.pageY
      draw()
    }
  }

  canvas.addEventListener('mousedown', e => {
    const x = e.pageX
    const y = e.pageY

    // define x,y no form
    menu.setCoords(x, y)


    vertices.forEach((vertice, index) => {
      if((x > vertice.x - vertice.radius && x < vertice.x + vertice.radius)
        && (y > vertice.y - vertice.radius && y < vertice.y + vertice.radius)) {
          vertice.dragging = true
          dragging = vertice
          menu.setSelected(index)
        }
    
    canvas.addEventListener('mousemove', moveVertice)
    draw()
    })
  })

  canvas.addEventListener('mouseup', e => {
    vertices.forEach(vertice => vertice.dragging = false)
    canvas.removeEventListener('mousemove', moveVertice)
    if(dragging)
      dragging.dragging = false

    dragging = null
    draw()
  })

  menu.render()
  draw()
})()