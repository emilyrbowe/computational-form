// Based off of Dan Schiffman's code for The Coding Train 11.3 "The Pixel Array":
// https://www.youtube.com/watch?v=nMUMZ5YRxHI

function setup() {
  createCanvas(600, 600);
  ellipseMode(CENTER);
  fill(200, 50, 100);
  noStroke();
  pixelDensity(1);
}


function draw() {
  background(255);
  loadPixels();

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var index = (x + y * width) * 4;
      let nx = noise(x * 0.8);
      let ny = noise(y * 0.9);
      pixels[index] = x + ny * x + ny;
      // pixels[index+1] = ny*y+x+nx;
      pixels[index + 1] = y + nx * y + nx;
      pixels[index + 2] = (y) ^ 4 - nx * 4;
      // pixels[index+3] = x+y*ny-nx;
      pixels[index + 3] = (x * nx - y * ny) + 200;
    };
  };

  updatePixels();


}
