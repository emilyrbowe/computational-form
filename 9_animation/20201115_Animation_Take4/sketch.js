// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js
var EXPORT = true;
var noiseAmp = 15;
let stars = [];

function setup() {
  createCanvas(500, 500);
  frameRate(60);
  pixelDensity(1);
  // noLoop();
  twinkle = createGraphics(width, height);
  twinkle.background(0, 10);

  for (let i = 0; i < width / 10; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(0);

  // img = createImage(111, 111);
  // img = createImage(256, 256);
  img = createImage(500, 500);
  img.loadPixels();
  // noprotect
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {

      let pRed = noise(sin(x * y), frameCount * 0.1) * 255;
      let pGrn = noise(x * 0.01, sin(frameCount)) * 255
      let pBlu = noise(x * y, tan(y / x), frameCount * 0.1) * 255
      let pAlph = 255;
      var c = color(pRed, pGrn, pBlu, pAlph);
      img.set(x, y, c);
    }
  }
  img.updatePixels();

  noSmooth();

  for (let i = 0; i < stars.length; i++) {
    stars[i].createStar(twinkle);
    stars[i].twinkleStar();
  }
  image(img, 0, 0, width, height);
  image(twinkle, 0, 0, width, height);



  if (EXPORT) {
    saveFrame("EXPORT", frameCount, "jpg", 180);
  }
  if (frameCount > 180) {
    noLoop();
  }
}
//implemented Particle simulation from here: https://p5js.org/examples/simulate-particles.html

function placeStars(_nStars, _graphic) {
  for (n = 0; n < _nStars; n++) {
    _graphic.noStroke();
    _graphic.fill(255);
    let ns = new Star(xVal, yVal, rad);
    stars.push(ns);
    ns.display();
  }
}

class Star {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.r = random(1, 8);
    this.rSpeed = random(0, 1.4);
    this.sBright = random(0, 1);
    this.sBrightSpeed = random(0, 0.2);
  }

  // creation of a particle.
  createStar(_graphic) {
    _graphic.noStroke();
    _graphic.fill('rgba(240,240,240,' + this.sBright + ')');
    _graphic.circle(this.x, this.y, this.r);
  }

  // setting the particle in motion.
  twinkleStar() {
    if (this.r < 0 || this.r > 4) {
      this.rSpeed *= -1;
    }
    if (this.sBright < 0 || this.sBright > 1) {
      this.sBrightSpeed *= -1;
    }
    this.r += this.rSpeed;
    this.sBright += this.sBrightSpeed;
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
