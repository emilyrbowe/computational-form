// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js

var noiseFrequency = 0.03;
var amplitude = 50;
var pointX, pointY;
var index = 0;

var message = ["V", "O", "T", "E"];

function setup() {
  createCanvas(800, 500);
  colorMode(HSB, 100);
  // noLoop();
}

function draw() {
  background(100);

  noStroke();



  // writeLetters(message);

  for (let y = 0; y < height; y += height / 2) {
    for (let x = 0; x < width; x += width / 2) {
      letter = message[index];
      fill(map(noise(x, y), 0, 1, 0, 10), 100, 100);
      textSize(190);
      text(letter, x + width / 3, y + height / 2);
      index++
    }
  }

  for (let y = 0; y < 500; y++) {
    for (let x = 0; x < 800; x++) {
      // fill()'
      pointX = x;
      pointY = y;
      if (x < 400 && y < 250) {
        pointX += noise(x * noiseFrequency, y * noiseFrequency + amplitude) *
          amplitude;
        pointY += noise(x * noiseFrequency + amplitude, y * noiseFrequency) *
          amplitude;
        fill(60, 100, 100);
        ellipse(pointX * 2 - amplitude * 0.9, pointY * 2 - amplitude * 0.9, 1.5,
          1.5);
      } else if (x > 400 & y < 250) {
        fill(0, 100, 100);
        ellipse(pointX * 2 + 0.25, pointY * 2 + 0.25, 1.5, 1.5);
      }
    }
  }
}

function writeLetters(array) {

}
