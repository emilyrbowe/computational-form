// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.min.js


var img;

function preload() {
  img = loadImage("/img/IMG_0245.jpeg");
  noLoop();
}

function setup() {
  // create a place to draw
  createCanvas(500, 375);
}


function draw() {
  // clear the background
  background(255);
  noSmooth();

  background(255, 255, 255);

  noStroke();

  img.loadPixels();

  var spacing = 500 / img.width;
  for (var y = 0; y < img.height; y += 5) {
    for (var x = 0; x < img.width; x += 5) {
      var in_color = getQuick(img, x, y);
      if (blue(in_color) > 200) {
        var dot_size = lightness(in_color) / 255 * 2;
        fill(noise(x * 0.001, y * 0.001) * 255, noise(x * 0.001, sin(y)) * 255,
          255, 180);
        ellipse(x * spacing + spacing * .5, y * spacing + spacing * .5,
          dot_size, dot_size);
      }
      if (blue(in_color) > 50 && blue(in_color) <= 150) {
        var dot_size = lightness(in_color) / 255 * 3;
        fill(255, noise(x * 0.001, y * 0.001) * 255, noise(x * 0.001, y * 0.001) *
          255);
        ellipse(x * spacing + spacing * .5, y * spacing + dot_size / 2 +
          spacing * .5, dot_size, dot_size);
      }

      if (green(in_color) > 175 && green(in_color) <= 250) {
        fill(noise(x * 0.001, y * 0.001) * 255, 255, noise(x * 0.001, y * 0.001) *
          255, 180);
        ellipse(x * spacing - dot_size / 2 + spacing * .5, y * spacing +
          spacing * .5, dot_size, dot_size);
      }

      if (red(in_color) > 175 && red(in_color) <= 250) {
        fill(255, 255, noise(x, y, ) * 255);
        // ellipse(x * spacing+dot_size/2 + spacing * .5, y * spacing + spacing * .5, dot_size, dot_size);
        // line(x, y, x+)
      }

    }
  }
}

// find the RGBA values of the pixel at x, y in the img.pixels array
// see: http://p5js.org/reference/#/p5/pixels[]
// we don't need to worry about screen pixel density here, because we are not reading from the screen

function getQuick(img, x, y) {

  var i = (y * img.width + x) * 4;
  return [
    img.pixels[i],
    img.pixels[i + 1],
    img.pixels[i + 2],
    img.pixels[i + 3],
  ];
}
