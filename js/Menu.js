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
    this.verticeSelected = 0
    this.adjSelected = null
    this.init()
  }

  init() {
    this.verticeBtn.addEventListener('click', e => {
      e.preventDefault()

      if(this.vertices.find(ver => ver.value === Number(this.verticeValue.value)))
        return alert('Vertice com esse valor já existe')

      if(!this.verticeValue.value || !this.verticeX.value || !this.verticeY.value)
        return alert('Valores em branco')
      
      const vertice = new Vertice(
        Number(this.verticeX.value),
        Number(this.verticeY.value),
        Number(this.verticeValue.value))

      this.vertices.push(vertice)

      this.renderAdjs(vertice)
      this.render()
      this.setSelected(this.vertices.length - 1)
      this.draw()
    })

    this.connectBtn.addEventListener('click', e => {
      const toConnectVertice = this.vertices.find(ver => ver.value === this.adjSelected)

      // definir uma variavel com vertice selecionado e tirar esse iterador
      // const vertice = this.vertices.find(ver => ver.selected)
      const vertice = this.vertices.find(ver => ver.value === this.verticeSelected)

      console.log(this.adjSelected, this.verticeSelected)
      vertice.connect(toConnectVertice)

      this.renderAdjs(vertice)
      this.draw()
    })

    this.verticesSelection.addEventListener('change', e => {
      this.verticeSelected = this.verticesSelection.selectedIndex
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

    this.adjsSelect.addEventListener('change', e => {
      if(this.adjsSelect.options[this.adjsSelect.selectedIndex])
        this.adjSelected = Number(this.adjsSelect.options[this.adjsSelect.selectedIndex].value)
    })
  }

  setCoords(x, y) {
    this.verticeX.value = x
    this.verticeY.value = y
  }

  setSelected(index) {
    this.verticesSelection.selectedIndex = index
    this.vertices.forEach((vertice, i) => vertice.selected = (index === i))

    this.renderAdjs(this.vertices[index])

    if(this.verticesSelection.options[this.verticesSelection.selectedIndex])
      this.verticeSelected = Number(this.verticesSelection.options[this.verticesSelection.selectedIndex].value)

    this.draw()
  }

  renderAdjs(vertice) {
    if(!vertice.adj) return

    if(this.adjsSelect.options[this.adjsSelect.selectedIndex])
      this.adjSelected = Number(this.adjsSelect.options[this.adjsSelect.selectedIndex].value)

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

    if(this.verticesSelection.options[this.verticesSelection.selectedIndex])
      this.verticeSelected = Number(this.verticesSelection.options[this.verticesSelection.selectedIndex].value)
  }
}

export default Menu