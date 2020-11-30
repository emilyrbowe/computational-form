// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js
// require /turtles/turtle/turtle.js

var myTurtle;
var rows;
var crops = ["orange", "pink", "green"];

function setup() {
  createCanvas(600, 600);
  noFill();
  stroke(255);
  background(50);
  noLoop();
  colorMode(HSB);
  myTurtle = new Turtle();

  rows = floor(random(3, 6));
}

function draw() {
  var line = height - 150;

  drawPinwheels(rows, line);

  myTurtle.moveTo(250, line);
  myTurtle.turnTo(-70);
  myTurtle.penDown();
  // drawBranch(100);
}

function drawPinwheels(numRows, pinwheelDist) {
  push();
  stroke(35, 84, 38);
  strokeWeight(8);
  var drawStart = pinwheelDist + 20;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numRows; j++) {
      let rowCrop = crops[floor(random(0, 3))];
      let currentX = myTurtle.x;
      distCenter = abs(width / 2 - currentX);
      myTurtle.penUp();
      myTurtle.moveTo(width / numRows * i + width / (numRows * 2), height /
        numRows * j + height / (numRows * 2));
      push();
      strokeWeight(4);
      let rowLength = height - drawStart;
      if (rowCrop == "orange") {
        stroke(45, 100, 100)
      } else if (rowCrop == "pink") {
        stroke(325, 100, 100)
      } else if (rowCrop == "green") {
        stroke(75, 100, 100);
      }
      myTurtle.pushState()
      myTurtle.penUp();
      myTurtle.turnRight(90);
      for (let j = 0; j < rowLength; j += 2) {
        myTurtle.moveForward(j);
        myTurtle.turnLeft(90);
        myTurtle.penDown();
        myTurtle.moveForward(40 + j * 0.5);
        myTurtle.penUp();
      }
      pop();
      myTurtle.popState()
    }
  };
  pop();
};
