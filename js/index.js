import Menu from './Menu.js'
import Canvas from './Canvas.js'
import Vertice from './Vertice.js'

(function () {
  const vertices = []
  const canvas = new Canvas(document.getElementById('canvas'), vertices)
  const menu = new Menu(vertices, canvas)


  function removeVertice(vertice) {
    vertice.adjs.forEach((v, index) => vertice.removeAdj(index))
    const index = vertice.findIndexOf(v => v.value = vertice.value)
    vertice.splice(index, 1)
    canvas.drawGraph(vertices)
  }

  vertices.push(new Vertice(995, 347, 10)) // 0
  vertices.push(new Vertice(1005, 202, 1)) // 1
  vertices.push(new Vertice(918, 63, 26))  // 2
  vertices.push(new Vertice(888, 303, 8))  // 3
  vertices.push(new Vertice(792, 281, 33)) // 4
  vertices.push(new Vertice(823, 129, 27)) // 5
  vertices.push(new Vertice(678, 228, 28)) // 6
  vertices.push(new Vertice(814, 396, 4))  // 7
  vertices.push(new Vertice(626, 372, 44)) // 8 
  vertices.push(new Vertice(645, 482, 40)) // 9
  vertices.push(new Vertice(665, 585, 43)) // 10
  vertices.push(new Vertice(850, 567, 18)) // 11
  vertices.push(new Vertice(946, 455, 22)) // 12
  vertices.push(new Vertice(1010, 567, 19))// 13 
  vertices.push(new Vertice(875, 657, 42)) // 14
  vertices.push(new Vertice(1175, 643, 41))// 16
  vertices.push(new Vertice(1104, 442, 21))// 17
  vertices.push(new Vertice(1173, 519, 30))// 18
  vertices.push(new Vertice(1314, 408, 24))// 19
  vertices.push(new Vertice(1163, 247, 90))// 20
  vertices.push(new Vertice(1351, 168, 25))// 21
  vertices.push(new Vertice(1153, 79, 29))// 22

  vertices[0].connect(vertices[1], 5)
  vertices[0].connect(vertices[3], 5)
  vertices[0].connect(vertices[12], 5)
  vertices[0].connect(vertices[16], 5)
  vertices[0].connect(vertices[19], 5)
  vertices[1].connect(vertices[2], 5)
  vertices[1].connect(vertices[21], 98)
  vertices[19].connect(vertices[20], 98)
  vertices[16].connect(vertices[17], 98)
  vertices[17].connect(vertices[18], 98)
  vertices[12].connect(vertices[11], 98)
  vertices[12].connect(vertices[13], 98)
  vertices[13].connect(vertices[14], 254)
  vertices[13].connect(vertices[15], 254)
  vertices[11].connect(vertices[10], 254)
  vertices[3].connect(vertices[4], 254)
  vertices[3].connect(vertices[7], 254)
  vertices[4].connect(vertices[5])
  vertices[4].connect(vertices[6])
  vertices[7].connect(vertices[8])
  vertices[7].connect(vertices[9])
  vertices[7].connect(vertices[10])

  window.addEventListener('resize', e => canvas.resize(window.innerWidth, window.innerHeight))

  menu.render()
  canvas.setMenu(menu)
  canvas.drawGraph(vertices)
})()