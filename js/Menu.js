import Vertice from './Vertice.js'

import depthFirstSearch from './utils/depthFirstSearch.js'
import breadthFirstSearch from './utils/breadthFirstSearch.js'

class Menu {
  constructor(vertices, canvas) {
    this.canvas = canvas // remover
    this.vertices = vertices
    this.verticesSelection = document.querySelector('.menu .selected-vertice-input')
    this.adjsList = document.querySelector('.menu .adjs-list')
    this.adjsSelect = document.querySelector('.menu .adjs-select')
    this.verticeBtn = document.querySelector('button[data-create-vertice]')
    this.connectBtn = document.querySelector('.create-connect-btn')
    this.verticeValue = document.getElementById('vertice-value')
    this.verticeX = document.getElementById('vertice-x')
    this.verticeY = document.getElementById('vertice-y')

    this.deleteVerticeBtn = document.querySelector('button[data-delete-vertice]')
    this.deleteGraphBtn = document.querySelector('button[data-delete-graph]')

    this.bfsButton = document.querySelector('button[data-breadth-first-search]')
    this.dfsButton = document.querySelector('button[data-depth-first-search]')
    this.valueToFind = document.querySelector('.value-to-find')
    this.searchSpeedInput = document.querySelector('.search-speed')

    this.sideModal = document.querySelector('.side-modal')
    this.closeSideModalBtn = document.querySelector('button[data-close-side-modal]')
    this.modalText = document.querySelector('.side-modal p')

    this.adjsHTML = ''
    this.verticeSelected = 0
    this.adjSelected = null
    this.selectedVertice = null

    this.isSearching = false

    this.init()
  }

  init() {
    this.verticeBtn.addEventListener('click', e => {
      e.preventDefault()

      if (this.vertices.find(ver => ver.value === Number(this.verticeValue.value)))
        return alert('Vertice com esse valor já existe')

      if (!this.verticeValue.value || !this.verticeX.value || !this.verticeY.value)
        return alert('Valores em branco')

      const vertice = new Vertice(
        Number(this.verticeX.value),
        Number(this.verticeY.value),
        Number(this.verticeValue.value))

      this.vertices.push(vertice)

      this.renderAdjs(vertice)
      this.render()
      this.setSelected(vertice, this.vertices.length - 1)
      this.canvas.drawGraph(this.vertices)
    })

    this.connectBtn.addEventListener('click', e => {
      if (!this.adjSelected || !this.verticeSelected) return

      const toConnectVertice = this.vertices.find(ver => ver.value === this.adjSelected)

      // definir uma variavel com vertice selecionado e tirar esse iterador
      // const vertice = this.vertices.find(ver => ver.selected)
      const vertice = this.vertices.find(ver => ver.value === this.verticeSelected)
      vertice.connect(toConnectVertice)

      this.adjSelected = Number(this.adjsSelect.options[this.adjsSelect.selectedIndex].value) || null

      this.renderAdjs(vertice)
      this.canvas.drawGraph(this.vertices)
    })

    this.verticesSelection.addEventListener('change', e => {
      if (this.verticesSelection.options[this.verticesSelection.selectedIndex])
        this.verticeSelected = Number(this.verticesSelection.options[this.verticesSelection.selectedIndex].value)

      const active = Number(e.target.value)
      // abstrair para um metodo!
      this.vertices.forEach(vertice => {
        if (vertice.value === active) {
          this.selectedVertice = vertice
          vertice.selected = true
          this.renderAdjs(vertice)
        } else {
          vertice.selected = false
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
      breadthFirstSearch(this.selectedVertice,
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
      depthFirstSearch(this.selectedVertice,
        Number(this.valueToFind.value),
        this.canvas,
        Math.abs(Number(this.searchSpeedInput.value)) || 1000
      ).then(found => {
        this.handleFinishSearch(found)
      })
    })

    this.closeSideModalBtn.addEventListener('click', () => {
      this.vertices.forEach(vertice => vertice.color = 0)
      this.modalText.innerHTML = 'Procurando...'
      this.closeSideModalBtn.style.visibility = 'hidden'
      this.sideModal.style.visibility = 'hidden'
      this.sideModal.style.opacity = 0
      this.canvas.drawGraph()
    })

    this.deleteVerticeBtn.addEventListener('click', this.deleteVertice)

    this.deleteGraphBtn.addEventListener('click', () => {
      while (this.selectedVertice)
        this.deleteVertice()
    })
  }

  deleteVertice = () => {
    if (!this.selectedVertice)
      return

    this.vertices.forEach(vertice => {
      vertice.adj.forEach((edge, index) => {
        if (edge.destination === this.selectedVertice)
          vertice.disconnect(index)
      })
    })

    const index = this.vertices.findIndex(vertice => vertice.value === this.selectedVertice.value)
    this.vertices.splice(index, 1)

    if (this.vertices.length === 0)
      this.selectedVertice = null

    this.setSelected(this.vertices[0], 0)
    this.render()
    this.canvas.drawGraph()
  }

  handleFinishSearch(found) {
    this.modalText.innerHTML = found ? 'Vertice encontrado uhuuu! :)' : 'Que pena, não encontramos seu vertice :('
    this.closeSideModalBtn.style.visibility = 'visible'
  }

  setCoords(x, y) {
    this.verticeX.value = x
    this.verticeY.value = y
  }

  setSelected(vertice, index) {
    if (vertice) {
      this.verticesSelection.selectedIndex = index
      if (this.selectedVertice)
        this.selectedVertice.selected = false
      vertice.selected = true
      this.selectedVertice = vertice


      if (this.verticesSelection.options[this.verticesSelection.selectedIndex])
        this.verticeSelected = Number(this.verticesSelection.options[this.verticesSelection.selectedIndex].value)
    } else {

    }

    this.renderAdjs(this.selectedVertice)
    this.canvas.drawGraph(this.vertices)
  }

  renderAdjs(vertice) {
    if (vertice) {
      this.adjsHTML = vertice.adj.reduce((html, adj, index) => {
        return html += `<li class="adj-item">
            ${adj.source.value}
            <i class="fas fa-long-arrow-alt-right fa-lg" style="color: #444;"></i>
            ${adj.destination.value}
            <button class="delete-adj-btn" data-id=${index}>
              <i class="far fa-trash-alt fa-2x" style="color: #444;"></i>
            </button>
          </li>`
      }, '')

      const adjacentSelectValue = this.vertices.reduce((html, currentVertice) => {
        if (vertice.adj.find(edge => edge.destination == currentVertice))
          return html

        if (!(vertice.value === currentVertice.value))
          return html += `<option value="${currentVertice.value}">${currentVertice.value}</option>`
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
      vertice.disconnect(button.getAttribute('data-id'))
      this.renderAdjs(vertice)
      this.canvas.drawGraph(this.vertices)
    }))

    if (this.adjsSelect.options[this.adjsSelect.selectedIndex])
      this.adjSelected = Number(this.adjsSelect.options[this.adjsSelect.selectedIndex].value)
  }

  render() {
    this.verticesSelection.innerHTML = this.vertices.reduce((html, vertice) => {
      return html += `<option value="${vertice.value}">${vertice.value}</option>`
    }, '')

    if (this.verticesSelection.options[this.verticesSelection.selectedIndex])
      this.verticeSelected = Number(this.verticesSelection.options[this.verticesSelection.selectedIndex].value)
  }
}

export default Menu