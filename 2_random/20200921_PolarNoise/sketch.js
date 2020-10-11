// Modified from Daniel Shiffmans's Polar Perlin Noise Loop: https://editor.p5js.org/codingtrain/sketches/sy1p1vnQn

let phase = 0;
let zoff = 0;
let slider;
let i = 0
let circles

function setup() {
  createCanvas(400, 400);
  circles = random(10, 60);
  frameRate(5);
}

function draw() {
  background(0, 140, 190);
  translate(width / 2, height / 2);
  for (i = 0; i < circles; i++) {
    drawPerlinPolar();
  }
}

function drawPerlinPolar() {
  strokeWeight(2);
  strokeColor = stroke(color(random(200, 255)));
  noFill();
  beginShape();
  // let noiseMax = slider.value();
  let noiseMax = random(0, 20);
  let radius = random(0, 350);
  for (let a = 0; a < TWO_PI; a += radians(5)) {
    let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
    let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
    let r = map(noise(xoff, yoff, zoff), 0, 1, radius, height / 2);
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
  phase += 0.1;
  zoff += 0.04;
}
