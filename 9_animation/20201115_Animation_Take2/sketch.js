//original code from Nick Nedashkovskiy that inspired this sketch is here: https://www.openprocessing.org/sketch/938793

var EXPORT = false;

let font;
let movers;
let alphabet = ["COMP", "FORM"];
let pallete;
let graphics;
let url = "https://coolors.co/generate/7fb7be-ff8a5b-ea526f-541388-2e294e";

function preload() {
  font = loadFont("OratorStd.otf");
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  // drawNoiseBackground(200, graphics);
  init();
}

function createPallete(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}

function drawNoiseBackground(_n, _graphics) {
  for (let i = 0; i < _n; i++) {

    // let x = random(1) * width;
    let x = noise(i * 0.001 + frameCount * 0.001, random()) * width;
    // let y = random(1) * height;
    let y = noise(i + frameCount * 0.001, random()) * height;
    let w = random(1, 2);
    let h = random(1, 2);
    _graphics.noStroke();
    _graphics.fill(0, 0, 100, 30);
    // _graphics.ellipse(x, y, w, h);
    _graphics.triangle(x, y - 2, x - 4, y + 4, x + 4, y + 4);
  }
}

function init() {
  pallete = createPallete(url);
  movers = [];
  let fontsize = width * 0.4;
  let txt = [alphabet[0], alphabet[1]];
  for (i = 0; i < txt.length; i++) {
    thisTxt = txt[i];
    let x = width / 10 - fontsize / 5;
    let y = (height / 6) * (2 * i + 2) + fontsize / 3;
    let options = {
      sampleFactor: .1,
      simplifyThreshold: 0
    };

    let bgNum = int(random(pallete.length));
    let bg = pallete[bgNum];
    pallete.splice(bgNum, 1);
    let txtNum = int(random(pallete.length));
    let tc = pallete[txtNum];
    pallete.splice(txtNum, 1);
    background(bg);
    textFont(font);
    textSize(fontsize);
    fill(tc);
    text(thisTxt, x, y);

    let points = font.textToPoints(thisTxt, x, y, fontsize, options);
    for (let p of points) {
      let m = new Mover(p.x, p.y, pallete.concat());
      movers.push(m);
    }
    image(graphics, 0, 0);
  }
}


function draw() {
  let i = 0;
  let removeArr = [];
  for (let i = 0; i < movers.length; i++) {
    let m = movers[i];
    m.update();
    m.display();
    if (m.isDead()) {
      removeArr.push(i);
    }
  }
  for (let j = removeArr.length - 1; j > 0; j--) {
    movers.splice(removeArr[j], 1);
  }
  if (EXPORT) {
    saveFrame("EXPORT", frameCount, "jpg", 90);
  }
  if (frameCount % 90 == 0) {
    init();
  }
}

class Mover {
  constructor(_x, _y, _colors) {
    this.pos = createVector(_x, _y);
    let nx = 1 / (noise(frameCount) * 50);
    let ny = 1 / (noise(frameCount) * 50);
    let nz = 1 / noise(frameCount) * random(110, 150);
    this.noiseScale = createVector(nx, ny, nz);
    this.life = 80;
    this.lifeRatio = this.life / 100;
    this.cc = _colors[int(map(noise(_x / this.noiseScale.x), 0, 1, 0, _colors
      .length))];
    this.tc = _colors[int(map(noise(_y / this.noiseScale.y), 0, 1, 0, _colors
      .length))] + "00";

  }
  update() {
    let n = noise(this.pos.x * this.noiseScale.x, this.pos.y * this.noiseScale
      .y);
    // let n = noise(this.pos.x * this.noiseScale.x, this.pos.y * this.noiseScale.y, frameCount*0.01);
    let angle = map(n, 0, 1, -180, 180);
    angle = (angle + frameCount / 10) % 360;
    let vel = createVector(cos(angle), sin(angle));
    this.pos.add(vel);
    this.life -= this.lifeRatio;
    triangle(this.pos.x, this.pos.y, this.pos.x - 8, this.pos.y + 12, this.pos
      .x + 8, this.pos.y + 12);
  }
  isDead() {
    return this.life < 0;
  }
  display() {
    let c = lerpColor(color(this.cc), color(this.tc), 1 - this.life / 300);
    strokeWeight(map(this.life, 0, 3, 0, 0.5));
    stroke(c);
    point(this.pos.x, this.pos.y);
  }
}

function mousePressed() {
  init();
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
