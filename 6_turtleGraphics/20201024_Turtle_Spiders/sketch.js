var myTurtle;

function setup() {
  createCanvas(600, 600);
  noFill();
  stroke(255);
  background(50);
  noLoop();
  // frameRate(10);
  colorMode(HSB, 100);
  myTurtle = new Turtle();
}


// function drawTriangle(sideLength){
//   myTurtle.turnLeft(120);
//   myTurtle.moveForward(sideLength);
// };

//Triangle maze
function draw() {
  background(10);

  noFill();
  stroke(255);
  strokeWeight(2);

  // move to starting position (without drawing)
  myTurtle.penUp();
  myTurtle.moveTo(300, 300);

  // put the pen down to draw
  myTurtle.penDown();

  // draw the triangle
  drawTriangle(random(200, 600));

  myTurtle.penUp();
  myTurtle.moveTo(100, 300);

  myTurtle.penDown();
}

function drawTriangle(sideLength) {
  for (var i = 0; i < 3; i++) {
    stroke(100);
    myTurtle.turnLeft(120);
    myTurtle.moveForward(sideLength);
    let coinFlip = noise(sideLength);
    if (coinFlip < 0.25) {
      myTurtle.pushState();
      myTurtle.penUp();
      stroke(10, 100, 100);
      myTurtle.moveForward(random(0, sideLength * 8));
      myTurtle.penDown();
      drawSpider(1.5);
      myTurtle.popState();
    }
  }
  if (sideLength / 2 - 1 > 0) {
    myTurtle.turnLeft(60);
    drawTriangle(sideLength * 0.9);

  }


};

function drawSpider(size) {
  for (i = 0; i < 100; i++) {
    myTurtle.moveForward(size);
    myTurtle.turnRight(10);
  }
  //left legs
  for (l = 0; l < 4; l++) {
    myTurtle.pushState();
    myTurtle.turnLeft(55);
    myTurtle.moveForward(5)
    myTurtle.turnLeft(95);
    myTurtle.moveForward(8)
    myTurtle.popState();

    for (i = 0; i < 3; i++) {
      myTurtle.moveForward(size);
      myTurtle.turnRight(10);
    };
  }

  for (i = 0; i < 6; i++) {
    myTurtle.moveForward(size);
    myTurtle.turnRight(10);
  }

  for (r = 0; r < 4; r++) {
    myTurtle.pushState();
    myTurtle.turnLeft(135);
    myTurtle.moveForward(5)
    myTurtle.turnRight(105);
    myTurtle.moveForward(8)
    myTurtle.popState();

    for (i = 0; i < 3; i++) {
      myTurtle.moveForward(1.5);
      myTurtle.turnRight(10);
    };
  }
}
