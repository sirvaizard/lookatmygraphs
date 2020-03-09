import Vertice from './Vertice.js'

class Menu {
  constructor(vertices, draw) {
    this.draw = draw // remover
    this.vertices = vertices
    this.verticesSelection = document.querySelector('.menu .vertices-select')
    this.adjsList = document.querySelector('.menu .adjs-list')
    this.adjsSelect = document.querySelector('.menu .adjs-select')
    this.verticeBtn = document.querySelector('.create-vertice-btn')
    this.connectBtn = document.querySelector('.create-connect-btn')
    this.verticeValue = document.getElementById('vertice-value')
    this.verticeX = document.getElementById('vertice-x')
    this.verticeY = document.getElementById('vertice-y')
    this.adjsHTML = ''
    this.init()
  }

  init() {
    this.verticeBtn.addEventListener('click', e => {
      e.preventDefault()

      if(!this.verticeValue.value || !this.verticeX.value || !this.verticeY.value)
        return alert('Valores em branco')
      
      this.vertices.push(new Vertice(
        Number(this.verticeX.value),
        Number(this.verticeY.value),
        Number(this.verticeValue.value)))
      
      this.render()
      this.draw()
    })

    this.connectBtn.addEventListener('click', e => {
      const vertice = this.vertices[Number(this.adjsSelect.selectedIndex)]

      // definir uma variavel com vertice selecionado e tirar esse iterador
      this.vertices.find(ver => ver.selected).connect(vertice)
      this.draw()
    })

    this.verticesSelection.addEventListener('change', e => {
      const active = Number(e.target.value)
      // abstrair para um metodo!
      this.vertices.forEach(vertice => {
        if(vertice.value === active) {
          vertice.selected = true
          this.renderAdjs(vertice)
        } else {
          vertice.selected = false
        }
      })
      this.draw()
    })
  }

  setCoords(x, y) {
    this.verticeX.value = x
    this.verticeY.value = y
  }

  setSelected(index) {
    this.verticesSelection.selectedIndex = index
    this.vertices.forEach((vertice, i) => vertice.selected = (index === i))
    this.draw()
  }

  renderAdjs(vertice) {
    if(!vertice.adj) return

    this.adjsHTML = vertice.adj.reduce((html, adj) => {
      return html += `<li>${adj.value}</li>`
    }, '')

    this.adjsSelect.innerHTML = this.vertices.reduce((html, currentVertice) => {
      if(vertice.adj.includes(currentVertice))
        return html

      if(!(vertice.value === currentVertice.value))
        return html += `<option value="${currentVertice.value}">${currentVertice.value}</option>`
      return html
    }, '')

    this.adjsList.innerHTML = this.adjsHTML
  }

  render() {
    this.verticesSelection.innerHTML = this.vertices.reduce((html, vertice) => {
      return html += `<option value="${vertice.value}">${vertice.value}</option>`
    }, '')
  }
}

export default Menu