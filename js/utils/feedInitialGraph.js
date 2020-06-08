import Vertice from '../Vertice.js'

export default function (vertices, menu) {
  vertices.push(new Vertice(560, 40, 1))
  vertices.push(new Vertice(490, 120, 2))
  vertices.push(new Vertice(630, 120, 3))
  vertices.push(new Vertice(420, 200, 4))
  vertices.push(new Vertice(530, 200, 5))
  vertices.push(new Vertice(590, 200, 6))
  vertices.push(new Vertice(700, 200, 7))
  vertices.push(new Vertice(350, 280, 8))
  vertices.push(new Vertice(475, 280, 9))
  vertices.push(new Vertice(560, 280, 10))
  vertices.push(new Vertice(645, 280, 11))
  vertices.push(new Vertice(770, 280, 12))
  vertices.push(new Vertice(550, 580, 13))
  vertices.push(new Vertice(550, 500, 14))
  vertices.push(new Vertice(640, 425, 15))
  vertices.push(new Vertice(640, 530, 16))
  vertices.push(new Vertice(640, 625, 17))
  vertices.push(new Vertice(550, 675, 18))
  vertices.push(new Vertice(460, 625, 19))
  vertices.push(new Vertice(460, 530, 20))
  vertices.push(new Vertice(460, 425, 21))
  vertices.push(new Vertice(380, 485, 22))
  vertices.push(new Vertice(345, 575, 23))
  vertices.push(new Vertice(380, 650, 24))
  vertices.push(new Vertice(460, 730, 25))
  vertices.push(new Vertice(550, 790, 26))
  vertices.push(new Vertice(640, 730, 27))
  vertices.push(new Vertice(720, 650, 28))
  vertices.push(new Vertice(755, 575, 29))
  vertices.push(new Vertice(720, 485, 30))

  vertices[0].connect(vertices[1])
  vertices[0].connect(vertices[2])
  vertices[1].connect(vertices[3])
  vertices[1].connect(vertices[4])
  vertices[2].connect(vertices[5])
  vertices[2].connect(vertices[6])
  vertices[3].connect(vertices[7])
  vertices[3].connect(vertices[8])
  vertices[4].connect(vertices[8])
  vertices[4].connect(vertices[9])
  vertices[5].connect(vertices[9])
  vertices[5].connect(vertices[10])
  vertices[6].connect(vertices[10])
  vertices[6].connect(vertices[11])

  vertices[12].connect(vertices[13])
  vertices[12].connect(vertices[15])
  vertices[12].connect(vertices[16])
  vertices[12].connect(vertices[17])
  vertices[12].connect(vertices[18])
  vertices[12].connect(vertices[19])
  vertices[13].connect(vertices[20])
  vertices[13].connect(vertices[14])
  vertices[14].connect(vertices[29])
  vertices[15].connect(vertices[29])
  vertices[15].connect(vertices[28])
  vertices[16].connect(vertices[27])
  vertices[16].connect(vertices[26])
  vertices[17].connect(vertices[25])
  vertices[18].connect(vertices[23])
  vertices[18].connect(vertices[24])
  vertices[19].connect(vertices[22])
  vertices[19].connect(vertices[21])
  vertices[21].connect(vertices[20])
  vertices[22].connect(vertices[21])
  vertices[23].connect(vertices[22])
  vertices[22].connect(vertices[23])
  vertices[23].connect(vertices[24])
  vertices[24].connect(vertices[25])
  vertices[25].connect(vertices[26])
  vertices[26].connect(vertices[27])
  vertices[27].connect(vertices[28])
  vertices[28].connect(vertices[29])
  menu.setSelected(vertices[0], 0)
}