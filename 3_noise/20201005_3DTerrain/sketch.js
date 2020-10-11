// Based on Dan Schiffman's Coding Challenge: 3D Terrain Generation: https://www.youtube.com/watch?v=IKB1hWWedMk

var cols, rows;
var scl = 20;
var w = 1000;
var h = 1400;

var flying = 0;

var terrain = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function draw() {

  flying -= 0.1;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -200, 300);
      xoff += 0.1;
    }
    yoff += 0.1;
  }

  background(190, 100, 170, 150);
  translate(0, 60);
  rotateX(PI / 3);
  fill(245, 130, 170, 150);;
  translate(-w / 2, -h / 2, 0);
  for (let y = 0; y < rows; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      stroke(map(noise(x, y), 0, 1, 150, 255), 100, map(noise(x, y), 0, 1, 150,
        255));
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);

    }
    endShape();
  }
}
