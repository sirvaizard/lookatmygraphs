class Menu {
  constructor() {
    this.element = document.querySelector('.menu ul')
  }

  render(vertices) {
    this.element.innerHTML = vertices.reduce((html, vertice) => {
      return html += `<li>
          Valor: <span>${vertice.value}</span>
          <button class="removeVertice">
            <i class="fas fa-trash-alt fa-2x" style="color: #e8594f"></i>
          </button>
        </li>`
    }, '')
  }
}

export default Menu