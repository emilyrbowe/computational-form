// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js
var EXPORT = false;
var noiseAmp = 15;
let stars;

function setup() {
  createCanvas(500, 500);
  frameRate(60);
  pixelDensity(1);
  // noLoop();
  twinkle = createGraphics(width, height);
  twinkle.background(0, 10);
  stars = [];
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
      // let pRed = noise(x*y,tan(y/x)+0.005, frameCount*0.01)*255;
      // let pGrn = noise(sin(x*y, frameCount*0.001))*170;
      // let pBlu = noise(cos(x*0.1 +y*frameCount*0.01), frameCount*0.001)*255;

      let pRed = noise(sin(x * y), frameCount * 0.1) * 255;
      let pGrn = noise(x * 0.01, sin(frameCount)) * 255
      let pBlu = noise(x * y, tan(y / x), frameCount * 0.1) * 255
        // let pAlph = noise(x*0.1, y*0.01, frameCount*0.01)*255;
      let pAlph = 255;
      var c = color(pRed, pGrn, pBlu, pAlph);
      img.set(x, y, c);
    }
  }
  // img.updatePixels();

  noSmooth();
  //
  placeStars(100, twinkle);
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    // s.update();
    // s.display();
  }
  image(img, 0, 0, width, height);
  image(twinkle, 0, 0, width, height);



  // if (EXPORT) {
  // saveFrame("EXPORT", frameCount, "jpg", 90);
  // }
  if (frameCount > 90) {
    noLoop();
  }
}

function placeStars(_nStars, _graphic) {
  for (n = 0; n < _nStars; n++) {
    let xVal = noise(n * 0.0005 + noiseAmp, n) * width;
    let yVal = noise(n, n * 0.001 + noiseAmp) * height;
    let rad = noise(n) * 5
    _graphic.noStroke();
    _graphic.fill(255);
    let ns = new Star(xVal, yVal, rad);
    stars.push(ns);
    ns.display();
  }
}

class Star {
  constructor(_graphic, _x, _y, _rad) {
    this.pos = createVector(_x, _y);
  }
  update() {
    let n = noise(this.pos.x * this.noiseScale.x, this.pos.y * this.noiseScale
      .y);
    let angle = map(n, 0, 1, -180, 180);
    angle = (angle + frameCount / 10) % 360;
    let vel = createVector(cos(angle), sin(angle));
    this.pos.add(vel);
    this.life -= this.lifeRatio;
  }
  display() {
    // let c = lerpColor(color(this.cc), color(this.tc), 1 - this.life / 300);
    // strokeWeight(map(this._rad, 0, 3, 0, 0.5));
    strokeWeight(10);
    point(this.pos.x, this.pos.y);
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
