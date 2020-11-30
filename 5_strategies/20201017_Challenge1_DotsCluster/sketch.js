/* INSTRUCTIONS
<> Analyze the challenge: clearly describe what the sketch does.
- color goes from warm to cool as size of dot increases
- very few big dots (pink/purple) and small dots (red/orange)
- most dots are clustered in the middle greens and blues (cluster to the middle suggesting noise distribution for color w/ HSB mode)
- dots are overlapping
- clustered in the middle of the square, but has some "paths" that have been cleared
- counted 100 dots in the sample, means no culling

<> Strategize how you would achieve the same effect.

<> Study the provided starting code.

<> Recreate the challenge as closely as you can. You may use the starting code, or start from scratch.

<> Extend the example to create a unique sketch. Try to make something no one else will.

<> Post your finished sketch.

*/

// -------------- STARTER CODE ---------------

// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js

// Dot Challenge Starting Point

var POINT_SIZE = 10;

function setup() {
  createCanvas(400, 400);
  save_button = createButton("Save Image");
  save_button.mousePressed(function() {

    save("dots_challenge.png");
  });


  createP('lod (Octaves to be used by Noise)');
  lod_slider = createSlider(1, 9, 5, 1);
  createP('Falloff');
  falloff_slider = createSlider(0.05, 1, 0.52, 0.01);


}


function draw() {
  background(50);
  colorMode(HSB, 100);

  noStroke();
  ellipseMode(CENTER);

  lod = lod_slider.value();
  falloff = falloff_slider.value();

  // noiseDetail(lod, falloff);
  noiseDetail(5, 0.52);

  var noiseFrequency = 15;
  var amount = 30;
  var points = [];

  for (var i = 0; i < 100; i++) {
    // these points are not scattered in the same way
    // how can you make the arrangement match the challenge?
    // var x = random(width);
    // var y = random(height);

    // NOISE PLACEMENT
    var x = noise(i * noiseFrequency, 0) * width;
    var y = noise(i * noiseFrequency, 1000) * height;
    points.push({
      x: x,
      y: y,
    });

    // // NOISE DISPLACEMENT
    // x += noise(x * noiseFrequency, y* noiseFrequency) * amount;
    // y += noise(x * noiseFrequency, y* noiseFrequency) * amount;

    // DIAMETER
    // the diameter shouldn't always be 10, it needs to vary
    // var diameter = 10;
    var diameter = map(noise(x * y * i * noiseFrequency) - 0.1, -0.1, 0.9, 1,
      20)

    // COLOR
    // the colors also need to change
    // what colorMode would be easiest to work with?
    // fill(255, 255, 255)
    let color = map(diameter, 4, 20, 1, 100);
    fill(color, 100, 100);

    ellipse(x, y, diameter, diameter);

    // points = placePointsNoise(100, width, height, noiseFrequency);
    // drawPoints(points);
  }
  relaxPoints(points, 5, 80, -0.3)
  noLoop();
}

function mouseReleased() {
  console.log("Octave lod is " + lod_slider.value() + " & " +
    "Falloff value is " + falloff_slider.value());
}

//Functions below from Justin's Point Placing Demo at https://compform.net/strategy/

function relaxPoints(points, steps, min_distance, strength) {

  for (var step = 0; step < steps; step++) {
    for (var i = 0; i < points.length; i++) {
      for (var j = 0; j < points.length; j++) {
        if (i == j)
          continue;
        var p1 = points[i];
        var p2 = points[j];


        // checking distance with dist() is slowish
        // this test (which is faster) can weed out some pairs so we don't need to test them
        // this speeds things up a bit, but this is still a very ineficient way to relax points
        // much faster solutions exist, but this one is easier to follow.
        var quickTest = abs(p1.x - p2.x) < min_distance && abs(p1.y - p2.y) <
          min_distance

        // too close, move apart
        if (quickTest && dist(p1.x, p1.y, p2.x, p2.y) < min_distance) {
          var v = subtractPoint(p1, p2); // find the vector between two points
          var nV = normalizePoint(v); // scale to 1 px unit size

          p1.x += nV.x * strength;
          p1.y += nV.y * strength;
          p2.x -= nV.x * strength;
          p2.y -= nV.y * strength;
        }

        points[i] = p1;
        points[j] = p2;

      }
    }
  }

  return points;
}

function subtractPoint(p1, p2) {
  return {
    x: p1.x - p2.x,
    y: p1.y - p2.y
  };
}

// scales point as vector to magnitude of one
function normalizePoint(p) {
  var d = dist(0, 0, p.x, p.y);
  return {
    x: p.x / d,
    y: p.y / d
  }
}
