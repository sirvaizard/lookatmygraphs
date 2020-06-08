export default async function depthFirstSearch(vertice, toFind, canvas, sleep = 500) {
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
        if (edge.destination.color === 0 && !toVisit.includes(edge.destination))
          toVisit.unshift(edge.destination)
      })

      await new Promise(resolve => setTimeout(resolve, sleep))
    }

    resolve(found)
  })
}