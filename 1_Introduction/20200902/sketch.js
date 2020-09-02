// Heavily inspired by Kelli Anderson's Riso animation explorations: https://www.instagram.com/p/CDBykB3DqL5/?utm_source=ig_web_copy_link

// Riso dots based on this P5.js example: https://p5js.org/examples/objects-array-of-objects.html

var dots = [];

function setup() {
  createCanvas(500, 500);
  frameRate(90);
  textFont('Garamond extra bold', height * 0.2);
  // textAlign(CENTER, BASELINE);

  for (var i = 0; i < 100000; i++) {
    dots.push(new Riso());
  }
}

var r_value, g_value, b_value, x_start, y_start;

var words = [
  'I',
  'CAN',
  'MAKE',
  'THINGS',
  'THAT',
  'MAKE',
  'THINGS'
];

var index = 0;

function draw() {
  background(255);
  noStroke();

  if (index < words.length - 1) {
    index++;
  } else {
    index = 0;
  }

  // background rectangle
  fill(r_value, g_value, b_value, 155);
  r_value = random(200, 255);
  g_value = random(100, 150);
  b_value = random(100, 150);

  x_start = width * random(0.1, 0.2);
  y_start = height * random(0.1, 0.8);

  // translate just the back rectangle
  push();
  translate(random(5, 10), random(5, 10));
  rect(width / 20, height /
    20, 0.9 * width, 0.9 * height);
  fill(255, 255);
  text(words[index], x_start, y_start, 0.9 *
    width, 0.9 *
    height);

  fill(255, random(200, 255));
  for (let i = 0; i < dots.length; i++) {
    dots[i].display();
  }
  pop();

  // foreground rectangle
  fill(r_value, g_value, b_value, 155);
  r_value = random(100, 255);
  g_value = random(150, 255);
  b_value = random(100, 255);

  // translate just the front rectangle
  push();
  translate(random(10, 20), random(10, 20));
  rect(width / 20, height /
    20, 0.9 * width, 0.9 * height);
  fill(255, 170);
  text(words[index], x_start, y_start, 0.9 * width, 0.9 * height);

  fill(255, random(200, 255));
  for (let i = 0; i < dots.length; i++) {
    dots[i].display();
  }
  pop();
}

// Riso class
class Riso {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(0.5, 1);
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
