/* INSTRUCTIONS
<> Analyze the challenge: clearly describe what the sketch does.
- looking at what happens when sliders go to zero/to max:
  - F->0 = dots move a diagonal line moving slightly left/right and moving up and down
  - A->0 = dots move to diagonal line that doesn't move at the 0 position
  - T->0 = dots freeze in place
- dots have a wave pattern that they follow
- increments over time using frameCount? or millis()? How does "Time Speed" play into this?

<> Strategize how you would achieve the same effect.

<> Study the provided starting code.

<> Recreate the challenge as closely as you can. You may use the starting code, or start from scratch.

<> Extend the example to create a unique sketch. Try to make something no one else will.

<> Post your finished sketch.

*/

// STARTER CODE

// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js
// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/addons/p5.dom.js

// draws a rectangle, where you tell it to!


var amplitude_slider, frequency_slider, time_slider;

var startX = 50;
var startY = 250;
var endX = 450;
var endY = 50;
var time = 0;


function setup() {
  createCanvas(500, 300);


  createP('Frequency');
  frequency_slider = createSlider(0, 4000, 2000);
  createP('Amplitude');
  amplitude_slider = createSlider(0, 100, 50);
  createP('Time Speed');
  time_slider = createSlider(0, 10, 5);


}


function draw() {
  background(50);
  ellipseMode(CENTER);
  var frequency = frequency_slider.value() / 100;
  var amplitude = amplitude_slider.value() / 100;
  var timeSpeed = time_slider.value() / 100;

  time += timeSpeed

  noiseDetail(3, .2);

  fill(255);
  noStroke();

  // study this loop. do you understand how the line of ellipses is created?
  for (i = 0; i < 1; i += .02) {
    var x = lerp(startX, endX, i);
    var y = lerp(startY, endY, i);


    // hint: drive offsetX and offsetY with noise() instead of random()
    // var offsetX = (random() - .5) * amplitude * 10;
    // var offsetY = (random() - .5) * amplitude * 10;
    var offsetX = noise(i * frequency + time, amplitude * 10) * amplitude * 100;
    var offsetY = noise(i * frequency + time) * amplitude * 100;

    ellipse(x + offsetX, y + offsetY, 10, 10);
  }
}
