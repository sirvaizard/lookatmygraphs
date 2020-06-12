import Vertex from './Vertex.js'

import depthFirstSearch from './utils/depthFirstSearch.js'
import breadthFirstSearch from './utils/breadthFirstSearch.js'

class Menu {
  constructor(vertices, canvas) {
    this.canvas = canvas
    this.vertices = vertices
    this.isSearching = false

    this.deleteVertexBtn = document.querySelector('button[data-delete-vertex]')
    this.deleteGraphBtn = document.querySelector('button[data-delete-graph]')

    this.selectedVertexInput = document.querySelector('.menu .selected-vertex-input')

    this.adjacencyListUl = document.querySelector('.menu .adjacency-list')
    this.selectedVertexToConnectInput = document.querySelector('.menu .vertex-to-connect')
    this.connectBtn = document.querySelector('.create-connect-btn')

    this.vertexValueInput = document.getElementById('vertex-value')
    this.vertexXInput = document.getElementById('vertex-x')
    this.vertexYInput = document.getElementById('vertex-y')
    this.createVertexBtn = document.querySelector('button[data-create-vertex]')

    this.bfsButton = document.querySelector('button[data-breadth-first-search]')
    this.dfsButton = document.querySelector('button[data-depth-first-search]')
    this.valueToFindInput = document.querySelector('.value-to-find')
    this.searchSpeedInput = document.querySelector('.search-speed')

    this.sideModal = document.querySelector('.side-modal')
    this.closeSideModalBtn = document.querySelector('button[data-close-side-modal]')
    this.modalText = document.querySelector('.side-modal p')

    this.adjacencyHTMLListContent = ''
    this.adjacencyVertexToConnectValue = null
    this.selectedVertex = null


    this.init()
  }

  init() {
    this.createVertexBtn.addEventListener('click', () => {
      if (this.vertices.find(ver => ver.value === Number(this.vertexValueInput.value)))
        return alert('Vertice com esse valor já existe')

      if (!this.vertexValueInput.value || !this.vertexXInput.value || !this.vertexYInput.value)
        return alert('Valores em branco')

      const vertex = new Vertex(
        Number(this.vertexXInput.value),
        Number(this.vertexYInput.value),
        Number(this.vertexValueInput.value))

      this.vertices.push(vertex)

      this.renderAdjs(vertex)
      this.render()
      this.setSelected(vertex, this.vertices.length - 1)
      this.canvas.drawGraph(this.vertices)
    })

    this.connectBtn.addEventListener('click', e => {
      if (!this.adjacencyVertexToConnectValue) return

      const toConnectVertex = this.vertices.find(ver => ver.value === this.adjacencyVertexToConnectValue)

      this.selectedVertex.connect(toConnectVertex)

      this.adjacencyVertexToConnectValue = Number(
        this.selectedVertexToConnectInput.options[this.selectedVertexToConnectInput.selectedIndex].value
      ) || null

      this.renderAdjs(this.selectedVertex)
      this.canvas.drawGraph(this.vertices)
    })

    this.selectedVertexInput.addEventListener('change', e => {
      const active = Number(e.target.value)
      this.vertices.forEach(vertex => {
        if (vertex.value === active) {
          this.selectedVertex = vertex
          vertex.selected = true
          this.renderAdjs(vertex)
        } else {
          vertex.selected = false
        }
      })
      this.canvas.drawGraph(this.vertices)
    })

    this.selectedVertexToConnectInput.addEventListener('change', e => {
      if (this.selectedVertexToConnectInput.options[this.selectedVertexToConnectInput.selectedIndex])
        this.adjacencyVertexToConnectValue = Number(
          this.selectedVertexToConnectInput.options[this.selectedVertexToConnectInput.selectedIndex].value
        )
    })

    this.bfsButton.addEventListener('click', () => {
      this.sideModal.style.visibility = 'visible'
      this.sideModal.style.opacity = 1
      breadthFirstSearch(this.selectedVertex,
        Number(this.valueToFindInput.value),
        this.canvas,
        Math.abs(Number(this.searchSpeedInput.value)) || 1000
      ).then(found => {
        this.handleFinishSearch(found)
      })
    })

    this.dfsButton.addEventListener('click', () => {
      this.sideModal.style.visibility = 'visible'
      this.sideModal.style.opacity = 1
      depthFirstSearch(this.selectedVertex,
        Number(this.valueToFindInput.value),
        this.canvas,
        Math.abs(Number(this.searchSpeedInput.value)) || 1000
      ).then(found => {
        this.handleFinishSearch(found)
      })
    })

    this.closeSideModalBtn.addEventListener('click', () => {
      this.vertices.forEach(vertex => vertex.color = 0)
      this.modalText.innerHTML = 'Procurando...'
      this.closeSideModalBtn.style.visibility = 'hidden'
      this.sideModal.style.visibility = 'hidden'
      this.sideModal.style.opacity = 0
      this.canvas.drawGraph()
    })

    this.deleteVertexBtn.addEventListener('click', this.deleteVertex)

    this.deleteGraphBtn.addEventListener('click', () => {
      while (this.selectedVertex)
        this.deleteVertex()
    })
  }

  deleteVertex = () => {
    if (!this.selectedVertex)
      return

    this.vertices.forEach(vertex => {
      vertex.adj.forEach((edge, index) => {
        if (edge.destination === this.selectedVertex)
          vertex.disconnect(index)
      })
    })

    const index = this.vertices.findIndex(vertex => vertex.value === this.selectedVertex.value)
    this.vertices.splice(index, 1)

    if (this.vertices.length === 0)
      this.selectedVertex = null

    this.setSelected(this.vertices[0], 0)
    this.render()
    this.canvas.drawGraph()
  }

  handleFinishSearch(found) {
    this.modalText.innerHTML = found ? 'Vertice encontrado uhuuu! :)' : 'Que pena, não encontramos seu vertice :('
    this.closeSideModalBtn.style.visibility = 'visible'
  }

  setCoords(x, y) {
    this.vertexXInput.value = x
    this.vertexYInput.value = y
  }

  setSelected(vertex, index) {
    if (vertex) {
      this.selectedVertexInput.selectedIndex = index
      if (this.selectedVertex)
        this.selectedVertex.selected = false
      vertex.selected = true
      this.selectedVertex = vertex
    }

    this.renderAdjs(this.selectedVertex)
    this.canvas.drawGraph(this.vertices)
  }

  renderAdjs(vertex) {
    if (vertex) {
      this.adjacencyHTMLListContent = vertex.adj.reduce((html, adj, index) => {
        return html += `<li class="adjacency-ul-item">
            ${adj.source.value}
            <i class="fas fa-long-arrow-alt-right fa-lg" style="color: #444;"></i>
            ${adj.destination.value}
            <button class="delete-adjacency-btn" data-id=${index}>
              <i class="far fa-trash-alt fa-2x" style="color: #444;"></i>
            </button>
          </li>`
      }, '')

      const adjacentSelectValue = this.vertices.reduce((html, currentVertex) => {
        if (vertex.adj.find(edge => edge.destination == currentVertex))
          return html

        if (!(vertex.value === currentVertex.value))
          return html += `<option value="${currentVertex.value}">${currentVertex.value}</option>`
        return html
      }, '')

      this.selectedVertexToConnectInput.innerHTML = adjacentSelectValue
      this.adjacencyListUl.innerHTML = this.adjacencyHTMLListContent

      if (!adjacentSelectValue)
        this.adjacencyVertexToConnectValue = null
    } else {
      this.selectedVertexToConnectInput.innerHTML = ''
      this.adjacencyListUl.innerHTML = ''
    }

    // add event listener to all trash icons
    const buttons = document.querySelectorAll('button.delete-adj-btn')
    buttons.forEach(button => button.addEventListener('click', () => {
      vertex.disconnect(button.getAttribute('data-id'))
      this.renderAdjs(vertex)
      this.canvas.drawGraph(this.vertices)
    }))

    if (this.selectedVertexToConnectInput.options[this.selectedVertexToConnectInput.selectedIndex])
      this.adjacencyVertexToConnectValue = Number(this.selectedVertexToConnectInput.options[this.selectedVertexToConnectInput.selectedIndex].value)
  }

  render() {
    this.selectedVertexInput.innerHTML = this.vertices.reduce((html, vertex) => {
      return html += `<option value="${vertex.value}">${vertex.value}</option>`
    }, '')
  }
}

export default Menu