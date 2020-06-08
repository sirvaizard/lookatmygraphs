export default async function depthFirstSearch(vertice, toFind, canvas, sleep = 1000) {
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

      await new Promise(resolve => setTimeout(resolve, sleep))
      current.adj.forEach(edge => toVisit.unshift(edge.destination))
    }

    resolve(found)
  })
}