// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js

// Dot Challenge Starting Point

var POINT_SIZE = 10;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 100);
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
  // background();

  noStroke();
  ellipseMode(CENTER);

  lod = lod_slider.value();
  falloff = falloff_slider.value();

  noiseDetail(lod, falloff);
  // noiseDetail(5, 0.52);

  var noiseFrequency = 15;
  var amount = 30;
  // var terrainMap = new Array();

  for (y = 0; y < height; y += 10) {
    // var terrainMap[y].push(new Array();
    for (var x = 0; x < width; x += 10) {
      terrain = noise(x * 0.01 + 0.3, y * 0.01);
      // terrainMap[y][x]="";
      // terrainMap[y][x].push(terrain);
      if (terrain < 0.4) {
        terrainColor = map(terrain, 0, 1, 50, 75)
        fill(terrainColor, 100, 50);
        rect(x, y, 10, 10);
      } else if (terrain >= 0.4) {
        terrainColor = map(terrain, 0, 1, 25, 50)
        fill(terrainColor, 100, 50);
        rect(x, y, 10, 10);

      }
    }
  };

  for (var i = 0; i < 50; i++) {

    // NOISE PLACEMENT
    var x = noise(i * noiseFrequency, 0) * width;
    var y = noise(i * noiseFrequency, 1000) * height;
    // if (terrainMap[y][x]>=0.4){
    // // NOISE DISPLACEMENT
    x += noise(x * noiseFrequency, y * noiseFrequency) * amount;
    y += noise(x * noiseFrequency, y * noiseFrequency) * amount;

    // DIAMETER
    var featuresElev = map(noise(x * y * i * noiseFrequency), 0, 1, 1, 20)

    // ellipse(x, y, diameter, diameter);
    if (featuresElev >= 1 & featuresElev < 10) {
      text('🌴', x, y);
    } else if (featuresElev >= 10 & featuresElev < 15) {
      text('🏕', x, y);
    } else if (featuresElev >= 15 & featuresElev <= 20) {
      text('🌋', x, y);
    };
    // }
  }

  function mouseReleased() {
    console.log("Octave lod is " + lod_slider.value() + " & " +
      "Falloff value is " + falloff_slider.value());
  }
}
