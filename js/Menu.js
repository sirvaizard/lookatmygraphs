import Vertex from './Vertex.js'

import depthFirstSearch from './utils/depthFirstSearch.js'
import breadthFirstSearch from './utils/breadthFirstSearch.js'

class Menu {
  constructor(vertices, canvas) {
    this.canvas = canvas // remover
    this.vertices = vertices
    this.isSearching = false

    this.verticesSelection = document.querySelector('.menu .selected-vertex-input')
    this.adjsList = document.querySelector('.menu .adjs-list')
    this.adjsSelect = document.querySelector('.menu .adjs-select')
    this.vertexBtn = document.querySelector('button[data-create-vertex]')
    this.connectBtn = document.querySelector('.create-connect-btn')
    this.vertexValue = document.getElementById('vertex-value')
    this.vertexX = document.getElementById('vertex-x')
    this.vertexY = document.getElementById('vertex-y')

    this.deleteVertexBtn = document.querySelector('button[data-delete-vertex]')
    this.deleteGraphBtn = document.querySelector('button[data-delete-graph]')

    this.bfsButton = document.querySelector('button[data-breadth-first-search]')
    this.dfsButton = document.querySelector('button[data-depth-first-search]')
    this.valueToFind = document.querySelector('.value-to-find')
    this.searchSpeedInput = document.querySelector('.search-speed')

    this.sideModal = document.querySelector('.side-modal')
    this.closeSideModalBtn = document.querySelector('button[data-close-side-modal]')
    this.modalText = document.querySelector('.side-modal p')

    this.adjsHTML = ''
    this.vertexSelected = 0
    this.adjSelected = null
    this.selectedVertex = null


    this.init()
  }

  init() {
    this.vertexBtn.addEventListener('click', e => {
      e.preventDefault()

      if (this.vertices.find(ver => ver.value === Number(this.vertexValue.value)))
        return alert('Vertice com esse valor já existe')

      if (!this.vertexValue.value || !this.vertexX.value || !this.vertexY.value)
        return alert('Valores em branco')

      const vertex = new Vertex(
        Number(this.vertexX.value),
        Number(this.vertexY.value),
        Number(this.vertexValue.value))

      this.vertices.push(vertex)

      this.renderAdjs(vertex)
      this.render()
      this.setSelected(vertex, this.vertices.length - 1)
      this.canvas.drawGraph(this.vertices)
    })

    this.connectBtn.addEventListener('click', e => {
      if (!this.adjSelected || !this.vertexSelected) return

      const toConnectVertex = this.vertices.find(ver => ver.value === this.adjSelected)

      // definir uma variavel com vertice selecionado e tirar esse iterador
      // const vertice = this.vertices.find(ver => ver.selected)
      const vertex = this.vertices.find(ver => ver.value === this.vertexSelected)
      vertex.connect(toConnectVertex)

      this.adjSelected = Number(this.adjsSelect.options[this.adjsSelect.selectedIndex].value) || null

      this.renderAdjs(vertex)
      this.canvas.drawGraph(this.vertices)
    })

    this.verticesSelection.addEventListener('change', e => {
      if (this.verticesSelection.options[this.verticesSelection.selectedIndex])
        this.vertexSelected = Number(this.verticesSelection.options[this.verticesSelection.selectedIndex].value)

      const active = Number(e.target.value)
      // abstrair para um metodo!
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

    this.adjsSelect.addEventListener('change', e => {
      if (this.adjsSelect.options[this.adjsSelect.selectedIndex])
        this.adjSelected = Number(this.adjsSelect.options[this.adjsSelect.selectedIndex].value)
    })

    this.bfsButton.addEventListener('click', () => {
      this.sideModal.style.visibility = 'visible'
      this.sideModal.style.opacity = 1
      breadthFirstSearch(this.selectedVertex,
        Number(this.valueToFind.value),
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
        Number(this.valueToFind.value),
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
    this.vertexX.value = x
    this.vertexY.value = y
  }

  setSelected(vertex, index) {
    if (vertex) {
      this.verticesSelection.selectedIndex = index
      if (this.selectedVertex)
        this.selectedVertex.selected = false
      vertex.selected = true
      this.selectedVertex = vertex


      if (this.verticesSelection.options[this.verticesSelection.selectedIndex])
        this.vertexSelected = Number(this.verticesSelection.options[this.verticesSelection.selectedIndex].value)
    } else {

    }

    this.renderAdjs(this.selectedVertex)
    this.canvas.drawGraph(this.vertices)
  }

  renderAdjs(vertex) {
    if (vertex) {
      this.adjsHTML = vertex.adj.reduce((html, adj, index) => {
        return html += `<li class="adj-item">
            ${adj.source.value}
            <i class="fas fa-long-arrow-alt-right fa-lg" style="color: #444;"></i>
            ${adj.destination.value}
            <button class="delete-adj-btn" data-id=${index}>
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

      this.adjsSelect.innerHTML = adjacentSelectValue
      this.adjsList.innerHTML = this.adjsHTML

      if (!adjacentSelectValue)
        this.adjSelected = null
    } else {
      this.adjsSelect.innerHTML = ''
      this.adjsList.innerHTML = ''
    }

    // add event listener to all trash icons
    const buttons = document.querySelectorAll('button.delete-adj-btn')
    buttons.forEach(button => button.addEventListener('click', () => {
      vertex.disconnect(button.getAttribute('data-id'))
      this.renderAdjs(vertex)
      this.canvas.drawGraph(this.vertices)
    }))

    if (this.adjsSelect.options[this.adjsSelect.selectedIndex])
      this.adjSelected = Number(this.adjsSelect.options[this.adjsSelect.selectedIndex].value)
  }

  render() {
    this.verticesSelection.innerHTML = this.vertices.reduce((html, vertex) => {
      return html += `<option value="${vertex.value}">${vertex.value}</option>`
    }, '')

    if (this.verticesSelection.options[this.verticesSelection.selectedIndex])
      this.vertexSelected = Number(this.verticesSelection.options[this.verticesSelection.selectedIndex].value)
  }
}

export default Menu