// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js
// require /turtles/turtle/turtle.js

var myTurtle;
var rows;
var crops = ["carrots", "flowers", "turtleFood"];
var rainbowCols = [75, 45, 325]; //hues for lime green, orange, and pink

function setup() {
  createCanvas(600, 600);
  noFill();
  stroke(255);
  background(50);
  noLoop()
  colorMode(HSB);
  myTurtle = new Turtle();

  rows = floor(random(3, 5));
}

function draw() {
  var horizonLine = height - 150;
  drawHorizon(horizonLine)

  drawGardenRows(rows, horizonLine);

  myTurtle.moveTo(250, horizonLine);
  myTurtle.turnTo(-70);
  myTurtle.penDown();

  let startX = width / 2 + 50;
  let startY = horizonLine;

  // move to starting position for waves (bg)
  myTurtle.penUp();
  myTurtle.moveTo(startX, startY);
  myTurtle.turnTo(270);

  myTurtle.pushState();
  //draw a random lil bush
  for (let b = 0; b < width; b += 5) {
    drawBush(b, horizonLine - 10, 3);
  }
  myTurtle.popState();

  //draw a single tree
  let branchLength = 100;
  let branchThicc = 35;

  drawTree(branchLength, 20, branchThicc, 78, true);

  //draw on our tree bark! (also run in draw tree function)
  coverBark(branchLength, branchThicc, startX, startY, 25)

}

function drawGardenRows(numRows, horizon) {
  push();
  stroke(35, 84, 38);
  strokeWeight(8);
  var gardenStart = horizon + 20;

  for (let i = 0; i < numRows; i++) {
    let currentX = myTurtle.x;
    distCenter = abs(width / 2 - currentX);
    myTurtle.penUp();
    myTurtle.moveTo(width / numRows * i + width / (numRows * 2), gardenStart);
    rowCrop = crops[floor(random(0, 3))];

    //Draw crops
    push();
    strokeWeight(4);
    if (rowCrop == "carrots") {
      stroke(45, 100, 100)
    } else if (rowCrop == "flowers") {
      stroke(325, 100, 100)
    } else if (rowCrop == "turtleFood") {
      stroke(75, 80, 60);
    }
    let rowLength = height - gardenStart;
    myTurtle.pushState()
    for (let j = 0; j < rowLength; j += 5) {
      // myTurtle.moveForward(2)
      myTurtle.penDown();
      myTurtle.moveForward(28 + (j * 0.1) * 5 ^ (j * 0.2));
      myTurtle.penUp();
      myTurtle.moveBackward(random(26, 27) + (j * 0.1) * 7 ^ (j * 0.1));
      myTurtle.turnRight(90);
      myTurtle.moveForward(10);
      myTurtle.turnLeft(90);

      if (rowCrop == "turtleFood") {
        let amount = random() * 28
        let coinFlip = random();
        if (coinFlip > 0.7) {
          myTurtle.pushState();
          myTurtle.moveForward(amount);
          myTurtle.turnLeft(90);
          myTurtle.moveForward(20);
          myTurtle.turnRight(random() * 45);
          myTurtle.penDown()
          drawTurtle(myTurtle.x, myTurtle.y, 5, random(360));
          myTurtle.popState();
          stroke(75, 80, 60);
          strokeWeight(4);
        }
      }
    }
    pop();
    myTurtle.popState()

    //Draw left side of bed
    myTurtle.pushState()
    myTurtle.penDown()
    myTurtle.turnTo(map(distCenter, 0, width / 2, 100, 105))
    myTurtle.moveForward(height - gardenStart + 10);
    myTurtle.penUp();
    myTurtle.popState()

    // Draw back of bed
    // myTurtle.penUp();
    myTurtle.penDown()
    myTurtle.moveForward(40);

    //Draw right side of bed
    myTurtle.pushState()
    myTurtle.turnTo(map(distCenter, 0, width / 2, 80, 75))
    myTurtle.moveForward(height - gardenStart + 10);
    myTurtle.popState()
    myTurtle.penUp();

  }
  pop();
};

function drawHorizon(level) {
  var color1 = color(45, 100, 153);
  var color2 = color(75, 60, 100);
  var color1 = color(random() * 45, 100, 153);
  var color2 = color(random() * 75, 60, 100);

  setGradient(0, 0, width, level, color1, color2, "Y");
  fill(35, 84, 25);
  rect(0, level, width, height);
};

function drawBush(x, y, size) {
  stroke(random(100, 145), random(30, 100), random(30, 100));
  strokeWeight(4);

  myTurtle.penUp();
  myTurtle.moveTo(x, y);
  myTurtle.turnTo(270);

  myTurtle.penDown();
  for (let i = 0; i < 40; i++) {
    for (let k = 0; k < 36; k++) {
      myTurtle.turnRight(10);
      myTurtle.moveForward(random(size));
    }
  }
}

function drawTree(bLen, rotation, s, bCol, left) {
  strokeWeight(s);
  stroke(color(235, 15, bCol));

  if (left) {
    myTurtle.penDown();
    if (bLen > 5) {
      myTurtle.moveForward(bLen);
      myTurtle.turnRight(rotation); //same
      drawTree(bLen - 15, rotation, s * 0.75, bCol - 5, left);
      myTurtle.turnLeft(rotation * 2); //double
      drawTree(bLen - 10, rotation, s / 2, bCol - 10, left);
      myTurtle.turnRight(rotation); //same
      myTurtle.moveBackward(bLen);
    }
  } else {
    myTurtle.penDown();
    if (bLen > 5) {
      myTurtle.moveForward(bLen);
      myTurtle.turnLeft(rotation); //same
      drawTree(bLen - 15, rotation, s * 0.75, bCol - 5, left);
      myTurtle.turnRight(rotation * 2); //double
      drawTree(bLen - 10, rotation, s / 2, bCol - 10, left);
      myTurtle.turnLeft(rotation); //same
      myTurtle.moveBackward(bLen);
    }
  }

  coverBark(bLen, s, myTurtle.x, myTurtle.y, map(myTurtle.bearingRadians, 0,
    TWO_PI, 0, 360), s / 4);
}

function coverBark(length, thickness, x, y, r, amount) {
  for (let i = 0; i < amount; i++) {
    drawLine(random(length / 2), random(x - thickness / 2, x + thickness / 2),
      random(y, y - length), r);
    let coinFlip = random();
    if (coinFlip > 0.9) {
      drawTurtle(myTurtle.x, myTurtle.y, 5, random(360));
    }
  }
}

function drawLine(len, x, y, r) {
  myTurtle.pushState();
  stroke(color(random(rainbowCols), random(100), 75));
  strokeWeight(random(1, 5));
  myTurtle.penUp();
  myTurtle.moveTo(x, y);
  myTurtle.turnTo(r);
  myTurtle.penDown();
  myTurtle.moveForward(len);
  myTurtle.popState();
}

function drawTurtle(x, y, size, rotation) {
  stroke(90, 100, 100)
  strokeWeight(size / 6);
  myTurtle.pushState();
  //draw top right leg
  myTurtle.penUp();
  myTurtle.moveTo(x, y);
  myTurtle.turnTo(rotation + 270);
  myTurtle.penDown();

  for (let i = 0; i < 36; i++) {
    myTurtle.turnRight(7);
    myTurtle.moveForward(size / 25);
  }
  //draw right side of body
  myTurtle.turnTo(rotation + 75);
  for (let i = 0; i < 36; i++) {
    myTurtle.turnRight(1);
    myTurtle.moveForward(size / 36);
  }

  //draw right bottom foot
  myTurtle.turnTo(rotation + 0);
  for (let i = 0; i < 36; i++) {
    myTurtle.turnRight(7);
    myTurtle.moveForward(size / 25);
  }

  //draw bottom side of body
  myTurtle.turnTo(rotation + 165);
  for (let i = 0; i < 36; i++) {
    myTurtle.turnRight(1);
    myTurtle.moveForward(size / 36);
  }

  //draw left bottom foot
  myTurtle.turnTo(rotation + 90);
  for (let i = 0; i < 36; i++) {
    myTurtle.turnRight(7);
    myTurtle.moveForward(size / 25);
  }

  //draw left side of body
  myTurtle.turnTo(rotation + 255);
  for (let i = 0; i < 36; i++) {
    myTurtle.turnRight(1);
    myTurtle.moveForward(size / 36);
  }

  //draw left top foot
  myTurtle.turnTo(rotation + 180);
  for (let i = 0; i < 36; i++) {
    myTurtle.turnRight(7);
    myTurtle.moveForward(size / 25);
  }

  //draw top side of body
  myTurtle.turnTo(rotation + 0);
  myTurtle.moveForward(size * 0.22);

  //draw head
  myTurtle.turnTo(rotation + 260);
  myTurtle.moveForward(size / 2);

  myTurtle.turnTo(rotation + 225);
  for (let i = 0; i < 2; i++) {
    myTurtle.turnRight(90);
    myTurtle.moveForward(size * 0.5);
  }

  myTurtle.turnTo(rotation + 100);
  myTurtle.moveForward(size / 2);

  //draw top side of body
  myTurtle.turnTo(rotation + 10);
  myTurtle.moveForward(size * 0.22);

  myTurtle.popState();
}

// gradient function from: https://codeburst.io/sunsets-and-shooting-stars-in-p5-js-92244d238e2b
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") { // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis == "X") { // Left to right gradient
    for (let j = x; j <= x + w; j++) {
      var inter2 = map(j, x, x + w, 0, 1);
      var d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y + h);
    }
  }
}
