/*

1. Roll two dice (or one dice twice). Draw this number of dots in random locations on the page/canvas.

2. Draw slightly larger ellipses (these could be circles) around each of the points.

3. For each shape drawn in Step 2, draw an irregular shape that curves around it, so that it is *almost* concentric, but not perfectly so. This shape can vary in distance away from the original Step 2 shape, but try to keep the lines relatively close together.

4. Continue drawing almost-concentric shapes around the shapes from the previous iteration, adding small deviations to the concentricity as you go.

5. Repeat Step 4 until you reach the edge of the page/canvas. If any of your shapes would intersect with another shape, bend them so there are no intersecting shapes.

*/

var peaks, centerX, centerY;

function setup() {
  createCanvas(400, 400);
  // noLoop();
  frameRate(5);
  peaks = sixSided() + sixSided();
  console.log(peaks);
}

function draw() {
  background(255);
  noFill();
  // console.log(peaks);
  for (i = 1; i <= peaks; i++) {

    centerX = random(0.1 * width, 0.9 * width);
    centerY = random(0.1 * height, 0.9 * height);

    let p = new Peak;
    p.display();
    p.firstTopo();
  }
}

function sixSided() {
  return floor(random(1, 7));
}

class Peak {
  construtor(xPt, yPt) {
    this.x = xPt;
    this.y = yPt;
  }

  display() {
    strokeWeight(5);
    point(centerX, centerY);
  }

  firstTopo() {
    let diamX = random(10, 70);
    let diamY = random(10, 70);
    strokeWeight(1);
    ellipse(centerX, centerY, diamX * random(0.7, 0.9), diamY * random(0.7,
      0.9));
    ellipse(centerX, centerY, diamX * random(1 * 1.5, 1 * 1.9), diamY *
      random(1 * 1.5, 1 * 1.9))
    ellipse(centerX, centerY, diamX * random(2 * 1.5, 2 * 1.9), diamY *
      random(2 * 1.5, 2 * 1.9))
    for (let n = 1; n >= 5; n++) {
      console.log(i);
      ellipse(centerX, centerY, diam * random(i * 1.5, i * 1.9), diam *
        random(i * 1.5, i * 1.9));
    }
  }

}
