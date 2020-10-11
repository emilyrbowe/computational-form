/*
Based on https://www.openprocessing.org/sketch/755592 by Roni Kaufman (who in turn was inpsired by Sol LeWitt's "Squiggly Brushstrokes"
*/

let particles = [];
// let n = 500;
let n;
let colors;
let squiggliness = 1 / 50;

function setup() {
  createCanvas(windowWidth * 0.75, windowHeight * 0.75);
  colorMode(HSB, 100);
  noStroke();

  let nSlider_label = createP('Number of squiggles');
  nSlider = createSlider(1, 2000, 50, 10);

  let sizeSlider_label = createP('Line width');
  sizeSlider = createSlider(0.5, 10, 4, 0.5);

  // colors = [color(0, 90, 90, 100), color(15, 90, 90, 100), color(67, 90, 90,
  //   100), color(90, 100)];

  colors = [color(map(210, 0, 360, 0, 100), 47, 70, 100), color(map(205, 0, 360,
      0, 100), 27, 100, 100), color(map(200, 0, 360, 0, 100), 37, 100, 100),
    color(map(180, 0, 360, 0, 100), 50, 100, 100)
  ];

  // background(100);
  background(95);
  updateParticles();

  // setInterval(updateParticles, 2500);
  setInterval(updateParticles, 1200);
}

function draw() {
  n = nSlider.value();
  for (let p of particles) {
    p.draw();
    p.move();
  }
}

function updateParticles() {
  particles = [];
  for (let i = 0; i < n; i++) {
    // let x_ = random(width);
    let x_ = random(width) * map(noise(height ^ 2), 0, 1, 0, 5);;
    // let y_ = random(height);
    let y_ = random(height) * map(noise(width ^ 2), 0, 1, 0, 5);
    // let s_ = 4;
    let s_ = sizeSlider.value();
    let c_ = colors[floor(random(colors.length))];
    particles.push(new Particle(x_, y_, s_, c_));
  }
}

function Particle(x_, y_, s_, c_) {
  this.x = x_;
  this.y = y_;
  this.size = s_;
  this.c = c_;

  this.alpha = 100;
  this.dist = 1;

  this.move = function() {
    // let theta = noise(this.x * squiggliness, this.y * squiggliness) * PI * 4;
    let theta = noise(this.x * squiggliness, this.y * squiggliness) * PI * 16;
    let v = p5.Vector.fromAngle(theta, this.dist);
    this.x += v.x;
    this.y += v.y;
    this.dist *= 0.9999;
    this.alpha *= 0.95;
  }

  this.draw = function() {
    this.c.setAlpha(this.alpha);
    fill(this.c);
    circle(this.x, this.y, this.size);
    this.c.setAlpha(100);
  }
}
