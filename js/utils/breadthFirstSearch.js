export default async function breadhFirstSearch(vertice, toFind, canvas, sleep = 500) {
  return new Promise(async resolve => {
    const toVisit = [vertice]
    let found = false

    while (toVisit.length) {
      let current = toVisit.shift()

      current.color = 1
      canvas.drawGraph()

      if (current.value === toFind) {
        current.color = 2
        canvas.drawGraph()
        found = true
        break
      }

      current.adj.forEach(edge => {
        if (edge.destination && edge.destination.color === 0)
          toVisit.push(edge.destination)
      })

      await new Promise(resolve => setTimeout(resolve, sleep))
    }
    resolve(found)
  })
}