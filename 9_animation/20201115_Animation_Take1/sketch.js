// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js

var EXPORT = true;
var noiseFrequency = 0.03;
var amplitude = 50;
var pointX, pointY;
var index = 0;

function setup() {
  createCanvas(800, 500);
  colorMode(HSB, 100);
  frameRate(60);
  // noLoop();
}

function draw() {
  background(100);
  noStroke();

  drawDotQuilt(width, height);
}

function drawDotQuilt(xDist, yDist) {
  for (let y = 0; y < yDist; y++) {
    for (let x = 0; x < xDist; x++) {
      pointX = x;
      pointY = y;
      pointX += noise(x * noiseFrequency, y * noiseFrequency + amplitude,
        frameCount * noiseFrequency) * amplitude;
      pointY += noise(x * noiseFrequency + amplitude, y * noiseFrequency,
        frameCount * noiseFrequency) * amplitude;
      fill(60, 100, 100);
      ellipse(pointX * 2 - amplitude, pointY * 2 - amplitude, 1.5, 1.5);
    }
  }

  if (EXPORT) {
    saveFrame("EXPORT", frameCount, "jpg", 90);
  }
  if (frameCount > 90) {
    noLoop();
  }
}

// saveFrame - a utility function to save the current frame out with a nicely formatted name
// format: name_####.extension
// name: prefix for file name
// frameNumber: number for the frame, will be zero padded
// extension: jpg or png, controls file name and image format
// maxFrame: checked against frameNumber, frames beyond maxFrame are not saved
function saveFrame(name, frameNumber, extension, maxFrame) {
  // don't save frames once we reach the max
  if (maxFrame && frameNumber > maxFrame) {
    return;
  }

  if (!extension) {
    extension = "png";
  }
  // remove the decimal part (just in case)
  frameNumber = floor(frameNumber);
  // zero-pad the number (e.g. 13 -> 0013);
  var paddedNumber = ("0000" + frameNumber).substr(-4, 4);

  save(name + "_" + paddedNumber + "." + extension);
}
