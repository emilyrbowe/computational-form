// Based off of Dan Schiffman's code for The Coding Train 11.3 "The Pixel Array":
// https://www.youtube.com/watch?v=nMUMZ5YRxHI

let n1Slider, rot1Slider, size1Slider;
let layer1FillColorPicker, layer2FillColorPicker, bgColorPicker;
let amplitude;

function setup() {

  bgText = createP('Noise Multiple');
  bgText.position(40, 0);
  // layer1Text = createP('layer 1 fill');
  // layer1Text.position(70, 25);
  // layer2Text = createP('layer 2 fill');
  // layer2Text.position(70, 50);

  noiseMultSlider = createSlider(1, 100, 50, 1);
  noiseMultSlider.position(160, 15);
  // rot1Slider = createSlider(0, TWO_PI, 0, PI/12);
  // rot1Slider.position(160, 40);
  // size1Slider = createSlider(4, 50, 12, 2);
  // size1Slider.position(160, 65);

  canvas = createCanvas(600, 600);
  canvas.position(0, 100);
  fill(200, 50, 100);
  noStroke();
  // colorMode(HSB, 100);
  // noLoop();
}


function draw() {
  background(255);
  loadPixels();
  amplitude = sin(PI / 10);

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var index = (x + y * width) * 4;
      // let nx = noise(x*0.8, y^2);
      let nx = noise(x / noiseMultSlider.value());
      // let ny = noise(x*0.1, y*9);
      let ny = noise(y * noiseMultSlider.value() / 100);
      // pixels[index] = ny*millis()/frameCount*0.1;
      pixels[index] = ny * millis() / sin(x);
      // pixels[index] = map(ny + nx, 0, 1, 0, 100);
      // pixels[index+1] = ny*y+x+nx;
      // pixels[index+1] = y+nx*y+nx+cos(millis())*0.3;
      // pixels[index+1] = map(y*nx*y*nx, 0, 600, 0, 100);
      pixels[index + 2] = (y) ^ 4 - nx * 4 + sin(millis()) * 0.1;
      pixels[index + 2] = map(nx, 0, 1, 0, 100);
      pixels[index + 3] = map((ny * nx), 0, 1, 200, 255);
      // pixels[index+3] = (x*nx-y*ny)+50;

    };
  };

  updatePixels();


}
