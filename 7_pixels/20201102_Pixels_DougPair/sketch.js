//based on Dan Shiffman's Coding Train #47: Pixel Sorting:
// https://www.youtube.com/watch?v=JUDYkxU6J0o

let dougImage;
let sortedImg;
var index = 0;

let frameP;

function preload() {
  dougImg = loadImage("/img/pixelbypixel.png");
  dougImg.resize(100, 100);
}

function setup() {
  // create a place to draw
  createCanvas(200, 100);
  sortedImg = createImage(dougImg.width, dougImg.height);
  sortedImg = dougImg.get();
  console.log("Image has been copied");
  frameP = createP(frameRate());
}

function draw() {
  // frameP.html("frameRate: " + nf(frameRate(), 2, 2));

  sortedImg.loadPixels();
  console.log("sorted loaded");

  // code to sort pixels by _____ below

  for (let p = 0; p < sortedImg.pixels.length; p++) {
    console.log(p + " finished.");
    let brightest = -1;
    let pickedPix = index;
    //       for (i=index; i<sortedImg.pixels.length; i+=4){
    //         let pix = color(sortedImg.pixels[i], sortedImg.pixels[i+1], sortedImg.pixels[i+2], sortedImg.pixels[i+3]);
    //         let b = hue(pix);
    //         if (b>brightest){
    //           pickedPix = i;
    //           record = b;
    //         }
    //       }

    //       let tempArray = [];
    //       tempArray[0] = sortedImg.pixels[index]
    //       tempArray[1] = sortedImg.pixels[index + 1];
    //       tempArray[2] = sortedImg.pixels[index + 2];
    //       tempArray[3] = sortedImg.pixels[index + 3];
    //       sortedImg.pixels[index] = sortedImg.pixels[pickedPix];
    //       sortedImg.pixels[index + 1] = sortedImg.pixels[pickedPix + 1];
    //       sortedImg.pixels[index + 2] = sortedImg.pixels[pickedPix + 2];
    //       sortedImg.pixels[index + 3] = sortedImg.pixels[pickedPix + 3];
    //       sortedImg.pixels[pickedPix] = tempArray[0];
    //       sortedImg.pixels[pickedPix + 1] = tempArray[1];
    //       sortedImg.pixels[pickedPix + 2] = tempArray[2];
    //       sortedImg.pixels[pickedPix + 3] = tempArray[3];

    //       if (index < sortedImg.pixels.length - 1) {
    //         index += 4;
    //       }
  }

  sortedImg.updatePixels();
  image(dougImg, 0, 0);
  image(sortedImg, 100, 0);


}
