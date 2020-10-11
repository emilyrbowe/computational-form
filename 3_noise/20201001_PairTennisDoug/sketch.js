//Based on Justin's Mapping Noise example at https://compform.net/noise/

// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js

function setup() {
  let cnv = createCanvas(600, 600);
  ellipseMode(CENTER);
  rectMode(CENTER)
  noStroke();
  // frameRate(60);
}


function draw() {
  let n;
  // background(n*millis(),48*n,160);
  background(150, 185, noise(millis() + 0.0002));


  for (let y = 15; y < height; y += 15) {
    for (let x = 15; x < width; x += 20) {

      // vary over x
      // n = noise(x);

      // vary over y
      // n = noise(y);

      // vary over x + y
      // n = noise(x + y);

      // vary over x and y
      // n = noise(x, y);
      // n = noise(x*.01, y*.01);
      // n = noise(x*.01, y*.05);
      // n = noise(x*.05, y*.01);

      // vary over x + time;
      // n = noise(x + millis() * .001);
      // n = noise(x * .002 + millis() * .001);

      // vary x and time, y
      // n = noise(x * .002 + millis() * .00001, y);
      n = noise(x * .007, y * .006 + millis() * .0005, millis() * 0.0001);

      // vary over x and time
      // n = noise(x, millis() * .001);

      // vary over y and time
      // n = noise(y, millis() * .001);

      // vary over x and y and time
      // n = noise(x, y, millis() * .0001);
      //n = noise(x*.003, y*.003, millis() * .001);

      // vary over distance from center
      // n = noise(dist(300, 300, x, y) * .03);
      // n = noise(dist(300, 300, x, y) * .03, millis() * .001);
      // n = noise(dist(300, 300, x, y) * .03 +  millis() * .001);



      if (n > 0.1 & n < 0.4) {
        let diameter = n * 20;
        fill(0.001 * millis(), 160, 0.0004 * millis());
        ellipse(x, y, diameter, diameter);
      } else if (n > 0.4 & n < 0.45) {
        let diameter = n * 8;
        fill(0.01 * millis(), 0.0004 * millis(), 180);
        ellipse(x, y, diameter, diameter);
      } else if (n > 0.6 & n < 0.7) {
        let side = n * 18;
        fill(150 + 0.001 * millis(), 0.01 * millis() + n, n);
        square(x, y, side);
      }


    }
  }

}
