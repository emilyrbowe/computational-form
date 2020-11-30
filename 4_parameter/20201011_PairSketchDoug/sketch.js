//This base code is what I was given for the partner sketch by Doug.

//this code was based on Prof. Richard The's "fishies"
//this was a code sample used in Major Studio 1 in Fall 2019.

//i stripped the code down to more fundamentals
//added noise functions

//the key part of the original code is the class structure & the logic for hitting the sides of the canvas and changing direction
//i also started the balls in the middle so they could "explode"

//original is here
// https://github.com/anbnyc/major-studio-1-fa19/blob/master/lab10_motion/data-fish/sketch.js

//outward

let balls = [];
var offset = .1;
// let ballMaxSlider;

function preload() {}

function setup() {
  colorMode(HSB, 100);
  createCanvas(windowWidth * 0.7, windowHeight * 0.5);

  //   offsetSlider_label = createP("Offset");
  //   offsetSlider = createSlider(-2, 2, 0.5, 0.1);
  ballMaxSlider_label = createP("Maximum Number of Bouncing Balls");
  ballMaxSlider = createSlider(0, 100, 50, 10);

  xSlider_label = createP("Starting X Position")
  xSlider = createSlider(0, width, width / 2, 10);

  ySlider_label = createP("Starting Y Position")
  ySlider = createSlider(0, height, height / 2, 10);
}

function mouseClicked() {
  createBall();

}

function createBall() {
  //e is the number of balls
  for (let e = 0; e < ballMaxSlider.value(); e++) {
    //spray center starting location
    // let x = width / 2;
    // let y = height / 2;
    let x = xSlider.value();
    let y = ySlider.value();
    // let y = map(noise(), 0, 1, 0, height)

    //greyscale
    //everything is pretty random
    // let color = random(1,256);
    let hueValue = map(noise(millis()), 0, 1, 0, 100);
    let saturationValue = random(0, 100);
    let brightnessValue = random(0, 100);
    let diameter = random(20, 140);
    let speed = random(0.010, .011);
    let opacity = random(0, 100);
    balls.push(new Ball(x, y, diameter, speed, hueValue, saturationValue,
      brightnessValue, opacity));
  }
}

function draw() {
  //this is background that is dark grey
  background(0);
  offset = offset + .01;
  // offset = offset + offsetSlider.value();

  //the decision to have two funtions, updates & show were from the original code
  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].show();
  }
}

class Ball {
  // basic parameter set was from original code, but I trimmed it down a lot, added some variation to X and Y
  constructor(x, y, diameter, speed, hueValue, saturationValue, brightnessValue,
    opacity) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    // this.color = color(col, opacity);
    this.color = color(hueValue, saturationValue, brightnessValue, opacity);
    //this.speedX = random(-0.5,0.5) *speed;
    this.speedX = random(-3, 3) * speed;
    this.speedY = random(-1, 1) * speed;
    this.speed = speed;
  }

  update() {
    //this x and y * speed and the collission to the wall was from Richard The
    // added the noise
    this.x += this.x * this.speedX + noise(offset) * .1 + millis() * .0000001;
    this.y += this.y * this.speedY + noise(offset) * .1 + millis() * .0000001;
    // left right collission
    if (this.x <= this.diameter / 2 || this.x >= width - this.diameter / 2) {
      //reverse!
      this.speedX *= -1;
    }
    // top collission
    if (this.y <= this.diameter / 2 || this.y >= height - this.diameter / 2) {
      //reverse!
      this.speedY *= -1;

      // top gravity
      if (this.speed < .000004) {
        // go fast
        this.diameter += -.1; //shrink slowly
        this.speed += .0001; //get faster
      } else {
        this.diameter += 1; //expand slowly
      }
    }

  }

  show() {
    noStroke(0);
    fill(this.color);
    ellipse(this.x, this.y, this.diameter, this.diameter)
      // ellipse(this.x^2, this.y^2+1, this.diameter^2, this.diameter^2);
      // text(this.speedX, this.x, this.y)
  }
}
