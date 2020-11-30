// implemented Bo Pace's Sierpinski code in our JS turtle
// https://bopace.github.io/python/2016/06/09/python-turtle-sierpinski/

var myTurtle;

function setup() {
  noFill();
  createCanvas(500, 500)
  stroke(0);
  background(50);
  noLoop();

  colorMode(HSB, 100);

  myTurtle = new Turtle();
}

function draw() {
  background(220);

  let vertices = [
    [50, 450],
    [450, 450],
    [250, 50]
  ]
  level = 12
  drawFractal(vertices, level)
}

function drawTriangle(vertices, color, level) {
  // stroke(color[0], color[1], color[2]);
  stroke(random() * 100, 100, 100);
  myTurtle.penUp();
  myTurtle.moveTo(vertices[0][0], vertices[0][1]);
  myTurtle.penDown()
  myTurtle.moveTo(vertices[1][0], vertices[1][1])
  myTurtle.moveTo(vertices[2][0], vertices[2][1])
  myTurtle.moveTo(vertices[0][0], vertices[0][1])

}

function findMidpoint(p1, p2) {
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2]
}

function drawFractal(vertices, level) {
  //the different colors we'll use to draw the fractals
  //in RGB format
  colors = [(0, 150, 189), (4, 150, 116), (216, 95, 30), (193, 33, 57), (129,
    41, 199), (102, 205, 135), (51, 187, 204)]
  drawTriangle(vertices, colors, level)
    //call function recursively to draw all levels of fractal
  if (level > 0) {
    // draw first segment of fractal
    // the vertices being passed in are the bottom corner of the first
    // section, the bottom corner of the second section, and the bottom
    // corner of the third secion.
    drawFractal([vertices[0],
        findMidpoint(vertices[0], vertices[1]),
        findMidpoint(vertices[0], vertices[2])
      ],
      level - 1)
    drawFractal([vertices[1],
        findMidpoint(vertices[0], vertices[1]),
        findMidpoint(vertices[1], vertices[2])
      ],
      level - 1)
    drawFractal([vertices[2],
        findMidpoint(vertices[2], vertices[1]),
        findMidpoint(vertices[0], vertices[2])
      ],
      level - 1)
  }
};
