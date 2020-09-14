/*
Doug's instructions:
1.  Roll a 1-6 die to determine wind speed.  1 is still, 3 is moderate breeze, 6 is a gusty wind.
2.  Roll a die with 00,10,20,30,40,50,60,70,80,90 to determine how many blade of grass.
3.  If you are using paper, and you rolled >30 in step 2, repeat step 2 until you roll < 30.
4.  If you rolled a 00 in step 2, go to step 2 again.
5.  Determine direction.  Roll a 1-6 die.  Odd the wind blows left.  Even the wind blows right.
6.  Draw a line from the top of the page to the bottom using the following criteria:
     The higher the windspeed, the more "curvy wave" you will have to your grass.
      The higher the windspeed, the greater the angle you will have to each blade of grass.
      The direction of the wave will determine the direction of the angle.
      The bottom third of the grass will be straight.
7.  Repeat  step 6 for each count of blade of grass you rolled in step 2.
8.  If on paper, STOP.
9.  If on computer, try to animate the grass based on the windspeed.
*/

var windSpeed, speedWords, blades, windDirection, dirWords, direction

function setup() {
  createCanvas(400, 400);
  // noLoop();
  frameRate(10);
  noFill();

  // 1.  Roll a 1-6 die to determine wind speed.  1 is still, 3 is moderate breeze, 6 is a gusty wind.
  windSpeed = sixSided();
  if (windSpeed == 1) {
    speedWords = "still";
  } else if (windSpeed == 3) {
    speedWords = "moderate breeze";
  } else if (windSpeed == 6) {
    speedWords = "gusty";
  } else {
    speedWords = null;
  }

  // 2.  Roll a die with 00,10,20,30,40,50,60,70,80,90 to determine how many blade of grass.
  blades = tenSided();

  // 5.  Determine direction.  Roll a 1-6 die.  Odd the wind blows left.  Even the wind blows right.

  windDirection = sixSided();
  console.log(windDirection);
  if (windDirection % 2 == 1) {
    dirWords = "left";
  } else {
    dirWords = "right";
  }
  console.log("Wind blows " + dirWords);

  if (dirWords == "left") {
    direction = random(0, 1);
  } else if (dirWords == "right") {
    direction = random(-1, 0);
  }
  console.log(direction);
}

function draw() {
  background(220);
  stroke('green');

  /* 6.  Draw a line from the top of the page to the bottom using the following criteria:
     The higher the windspeed, the more "curvy wave" you will have to your grass.
      The higher the windspeed, the greater the angle you will have to each blade of grass.
      The direction of the wave will determine the direction of the angle.
      The bottom third of the grass will be straight.
*/
  for (i = 1; i <= blades; i++) {
    // shearX(45);
    xValue = random(20, 380);
    yValue = random(300, 400);
    bezier(xValue, height, xValue, yValue * 0.66, xValue * direction, yValue *
      random(0.66, 0.9), xValue + random(-50, 50) * direction, yValue *
      random(0.2, 0.66));

  }

  // 7.  Repeat  step 6 for each count of blade of grass you rolled in step 2.
}

function sixSided() {
  return floor(random(1, 7));
}

function tenSided() {
  return floor(random(0, 10)) * 10;
  if (value == 0) {
    tenSided();
  }
}
