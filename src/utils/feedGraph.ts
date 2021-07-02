import Vertex from '../drawables/Vertex'

export default function feedGraph(): Vertex[] {
    const vertices: Vertex[] = []

    vertices.push(new Vertex(560, 40, '1'))
    vertices.push(new Vertex(490, 120, '2'))
    vertices.push(new Vertex(630, 120, '3'))
    vertices.push(new Vertex(420, 200, '4'))
    vertices.push(new Vertex(530, 200, '5'))
    vertices.push(new Vertex(590, 200, '6'))
    vertices.push(new Vertex(700, 200, '7'))
    vertices.push(new Vertex(350, 280, '8'))
    vertices.push(new Vertex(475, 280, '9'))
    vertices.push(new Vertex(560, 280, '10'))
    vertices.push(new Vertex(645, 280, '11'))
    vertices.push(new Vertex(770, 280, '12'))
    vertices.push(new Vertex(550, 580, '13'))
    vertices.push(new Vertex(550, 500, '14'))
    vertices.push(new Vertex(640, 425, '15'))
    vertices.push(new Vertex(640, 530, '16'))
    vertices.push(new Vertex(640, 625, '17'))
    vertices.push(new Vertex(550, 675, '18'))
    vertices.push(new Vertex(460, 625, '19'))
    vertices.push(new Vertex(460, 530, '20'))
    vertices.push(new Vertex(460, 425, '21'))
    vertices.push(new Vertex(380, 485, '22'))
    vertices.push(new Vertex(345, 575, '23'))
    vertices.push(new Vertex(380, 650, '24'))
    vertices.push(new Vertex(460, 730, '25'))
    vertices.push(new Vertex(550, 790, '26'))
    vertices.push(new Vertex(640, 730, '27'))
    vertices.push(new Vertex(720, 650, '28'))
    vertices.push(new Vertex(755, 575, '29'))
    vertices.push(new Vertex(720, 485, '30'))

    vertices[0].connect(vertices[1], 1)
    vertices[0].connect(vertices[2], 1)
    vertices[1].connect(vertices[3], 1)
    vertices[1].connect(vertices[4], 1)
    vertices[2].connect(vertices[5], 1)
    vertices[2].connect(vertices[6], 1)
    vertices[3].connect(vertices[7], 1)
    vertices[3].connect(vertices[8], 1)
    vertices[4].connect(vertices[8], 1)
    vertices[4].connect(vertices[9], 1)
    vertices[5].connect(vertices[9], 1)
    vertices[5].connect(vertices[10], 1)
    vertices[6].connect(vertices[10], 1)
    vertices[6].connect(vertices[11], 1)

    vertices[12].connect(vertices[13], 1)
    vertices[12].connect(vertices[15], 1)
    vertices[12].connect(vertices[16], 1)
    vertices[12].connect(vertices[17], 1)
    vertices[12].connect(vertices[18], 1)
    vertices[12].connect(vertices[19], 1)
    vertices[13].connect(vertices[20], 1)
    vertices[13].connect(vertices[14], 1)
    vertices[14].connect(vertices[29], 1)
    vertices[15].connect(vertices[29], 1)
    vertices[15].connect(vertices[28], 1)
    vertices[16].connect(vertices[27], 1)
    vertices[16].connect(vertices[26], 1)
    vertices[17].connect(vertices[25], 1)
    vertices[18].connect(vertices[24], 1)
    vertices[18].connect(vertices[23], 1)
    vertices[19].connect(vertices[22], 1)
    vertices[19].connect(vertices[21], 1)
    vertices[21].connect(vertices[20], 1)
    vertices[22].connect(vertices[21], 1)
    vertices[23].connect(vertices[22], 1)
    vertices[22].connect(vertices[23], 1)
    vertices[23].connect(vertices[24], 1)
    vertices[24].connect(vertices[25], 1)
    vertices[25].connect(vertices[26], 1)
    vertices[26].connect(vertices[27], 1)
    vertices[27].connect(vertices[28], 1)
    vertices[28].connect(vertices[29], 1)

    return vertices
}

export function feedFullScreenGraph(): Vertex[] {
    const width = window.innerWidth
    const height = window.innerHeight
    const vertices = []
    const sidebarWidth = 320
    let numY = 0
    for(let y = 50, value = 0; y < height - Vertex.radius; y += (Vertex.radius * 4), numY++) {
        for(let x = sidebarWidth; x < width - Vertex.radius; x += (Vertex.radius * 4), value++) {
            vertices.push(new Vertex(x, y, String(value)))
        }
    }

    const numX = vertices.length / numY

    for(let y = 0; y < numY; y++) {
        for(let x = 0; x < numX; x++) {
            // connect with vertex on the right
            if(x % (numX - 1) !== 0 || x % (numX + 1) === 0)
                vertices[x + y * numX].connect(vertices[x + y * numX +1])

            // connect with vertex bellow            
            if(x + y * numX + numX >= vertices.length)
                continue

            // connect with vertex diagonal
            if(x % (numX - 1) !== 0 || x % (numX + 1) === 0)
                vertices[x + y * numX].connect(vertices[x + (y+1) * numX + 1])
                
            vertices[x + y * numX].connect(vertices[x + y * numX + numX])

        }
    }

    return vertices
}