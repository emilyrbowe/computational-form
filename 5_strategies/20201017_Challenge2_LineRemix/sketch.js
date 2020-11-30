var amplitude_slider, frequency_slider, time_slider;

var time = 0;

function setup() {
  createCanvas(500, 300);
  colorMode(HSB, 100);


  createP('Frequency');
  frequency_slider = createSlider(0, 4000, 2000);
  createP('Amplitude');
  amplitude_slider = createSlider(0, 100, 50);
  createP('Time Speed');
  time_slider = createSlider(0, 10, 5);
}


function draw() {
  background(10);
  ellipseMode(CENTER);
  var frequency = frequency_slider.value() / 100;
  var amplitude = amplitude_slider.value() / 100;
  var timeSpeed = time_slider.value() / 100;

  time += timeSpeed

  noiseDetail(3, .2);

  noStroke();

  var startY = map(noise(0, 300), 0, 1, 0, 10);

  for (row = 0; row < height / 10; row++) {

    var startX = 60;
    var endX = 500;
    var endY = noise(0, 300);

    push()
    rotate(noise(row) * PI / 2 + PI / 8);

    for (i = 0; i < 1; i += .01) {
      var x = lerp(startX, endX, i);
      var y = lerp(startY, endY, i);

      var offsetX = noise(i * frequency + time, amplitude * 10) * amplitude *
        100 + 25;
      var offsetY = noise(i * frequency + time) * amplitude * 100 - 30;

      shapeHue = map(noise(i * frameCount + time), 0, 1, 0, 100);
      fill(shapeHue, 80, 70);

      ellipse(x + offsetX, y + offsetY, 5, 5);
    }
    pop()

    fill(map(noise(i * frameCount + time), 0, 1, 30, 50));
    push();
    rotate(-PI / 5);
    ellipse(10, 60, 120, 35);

    fill(100);
    for (x = -50; x < 60; x += 8) {
      rect(x, 60, 4, 4);
    }
    pop();
  }
}
