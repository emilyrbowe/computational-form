// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  img = createImage(100, 100);
  // img = createImage(500, 500);
  img.loadPixels();
  // noprotect
  // for (var y = 0; y < img.height; y++) {
  //     for (var x = 0; x < img.width; x++) {
  //         var c = color(noise(sin(x*y))*255, noise(x*0.01)*255, noise(x*y,tan(y/x)+0.005)*255, 255);
  //         img.set(x, y, c);
  //     }
  // }

  for (var y = 0; y < img.height; y++) {
    if (y % 3 == 0) {
      for (var x = 0; x < img.width; x++) {
        var c = color(255, noise(sin(x) * 40) * 255, noise((y + 2) % 3) * 255,
          255);
        img.set(x, y, c);
      }
    }
    if (y % 3 == 1) {
      for (var x = 0; x < img.width; x++) {
        var c = color(noise(cos(x)) * 255, 255, noise(y) * 255, 255);
        img.set(x, y, c);
      }
    }
    if (y % 3 == 2) {
      for (var x = 0; x < img.width; x++) {
        var c = color(noise(tan(y)) * 255, noise(x) * 255, 255, 255);
        img.set(x, y, c);
      }
    }
  }


  img.updatePixels();

  noSmooth();
  image(img, 0, 0, width, height);
  noLoop();
}
