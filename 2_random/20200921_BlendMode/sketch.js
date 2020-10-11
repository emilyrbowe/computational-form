//code inspired by https://www.geeksforgeeks.org/p5-js-blendmode-function/

let colorPicker;

function setup() {
  createCanvas(800, 800);
  // noLoop();

  let randomBackground = color(random(255), random(255), random(255));
  colorPicker = createColorPicker(randomBackground);
  colorPicker.position(width / 10, height / 3);

  let random1 = color(random(255), random(255), random(255));
  circle1 = createColorPicker(random1);
  circle1.position(width / 10 + colorPicker.width, height / 3);

  let random2 = color(random(255), random(255), random(255));
  circle2 = createColorPicker(random2);
  circle2.position(width / 10 + circle1.width + colorPicker.width, height / 3);

  let blendMode = [
    "BLEND",
    "ADD",
    DARKEST,
    LIGHTEST,
    DIFFERENCE,
    EXCLUSION,
    MULTIPLY,
    OVERLAY,
    HARD_LIGHT,
    SOFT_LIGHT,
    DODGE,
    BURN
  ]

  index = 0;
  currBlendMode = blendMode[index];
}

function draw() {
  background(colorPicker.color());

  fill(200);
  text("Pick the colors for the background and circles below", width / 10,
    height / 3 - 10);

  btn = createButton("Change blendMode");
  btn.position(width / 6, height / 3 * 2);
  btn.mousePressed(changeBlendMode);

  noStroke();
  fill(circle1.color());
  ellipse(width / 4 - width / 16, height / 2, width / 4, height / 4);
  fill(circle2.color());
  ellipse(width / 4 + width / 16, height / 2, width / 4, height / 4);

  push();
  noStroke();
  // Set the blend mode
  translate(width / 2, 0);
  fill(circle1.color());
  ellipse(width / 4 + width / 16, height / 2, width / 4, height / 4);
  fill(circle2.color());
  ellipse(width / 4 - width / 16, height / 2, width / 4, height / 4);
  strokeWeight(30);
  // stroke(80, 150, 255);
  // line(x / 16, y / 16, 3 * x / 16, 3 * y / 16);
  // stroke(255, 50, 50);
  // line(200, 300, 100, 400);
  pop();
}

function changeBlendMode() {
  blendMode(OVERLAY);
  // if (index < blendMode.length - 1)
  //   index++;
  // else
  //   index = 0;
  // currBlendMode = blendMode[index];
  // console.log(blendMode[index]);
}
