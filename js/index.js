import Menu from './Menu.js'
import Canvas from './Canvas.js'
import feedInitalGraph from './utils/feedInitialGraph.js'

(function () {
  const vertices = []
  const canvas = new Canvas(document.getElementById('canvas'), vertices)
  const menu = new Menu(vertices, canvas)

  window.addEventListener('resize', () => canvas.resize(window.innerWidth, window.innerHeight))

  feedInitalGraph(vertices, menu)

  menu.render()
  canvas.setMenu(menu)
  canvas.drawGraph(vertices)
})()