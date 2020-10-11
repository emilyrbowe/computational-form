// Code inspired by Justin's "Horizon" code at https://compform.net/js_lab/js_lab.html?/random/sketches/horizon.js

// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js

function setup() {
  createCanvas(windowWidth, windowHeight * 0.5);
  noLoop();

  noStroke();
  fill(255, 255, 255);
}

function draw() {
  background(0, random(175, 200), random(150, 220));
  drawRow(height * 0.5);
}

function drawRow(y) {
  var x = 0;
  while (x < width) {
    drawObject(x, y);
    x += random(10, 20);
  }
}

function drawObject(x, y) {
  var r = random(100);
  if (r < 10) {
    drawGround(x, y);
  } else if (r < 70) {
    drawBuilding(x, y);
  } else if (r < 80) {
    drawTaxi(x, y);
  } else if (r > 95) {
    drawSubway(x, y);
  } else {
    drawGround(x, y);
  }
}

function drawGround(x, y) {
  push();
  fill(200);
  rect(x, y, 20, 10);
  pop();
}

function drawBuilding(x, y) {
  drawGround(x, y)
  bldgHeight = random(0, -100);
  push();
  fill(random(40, 140));
  rect(x, y, random(5, 20), bldgHeight); // base
  pop();
}

function drawTaxi(x, y) {
  drawGround(x, y);
  push();
  fill(random(200, 255), random(200, 255), 0);
  arc(x, y - 2.5, 10, 10, PI, 0);
  ellipse(x + 2, y - 1, 3, 3);
  ellipse(x - 3, y - 1, 3, 3);
  pop();
}

function drawSubway(x, y) {
  drawGround(x, y);
  platformY = random(30, 60)
  push();
  strokeWeight(4);
  strokeCap(SQUARE);
  stroke(100);
  line(x + 1, y + platformY, x + 20, y + platformY);
  pop();
  push()
  fill(100);
  rect(x + 6, y + platformY - 10, 8, 12);

  fill(random(80, 240), random(170, 255), random(130, 255));
  ellipse(x + 11, y + platformY - 6, 4, 4);
  pop();
}
