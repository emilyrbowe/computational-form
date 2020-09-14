/* Munro's instructions:
1. Draw a short vertical line starting from the bottom middle of the page.
2. Draw two more lines connected to each line drawn on the previous iteration (step), avoiding intersection with existing lines.
3. Repeat step 2.
*/

// Code based on the P5.js "Recursive Tree" example: https://p5js.org/examples/simulate-recursive-tree.html

let theta;

function setup() {
  createCanvas(400, 400);
  // noLoop();
}

function draw() {
  background(255);
  frameRate(1);

  let a = (mouseX / width) * 90;
  // Convert it to radians
  theta = radians(a);

  translate(width / 2, height);

  var treeStart = -1 * random(height * 0.1, height * 0.3)

  line(0, 0, 0, treeStart);
  translate(0, treeStart);
  branch(-1 * treeStart);
}

function branch(num) {
  num *= random(0.6, 0.9);

  if (num > 1) {
    push(); // Save the current state of transformation (i.e. where are we now)
    rotate(theta * random(0, 1)); // Rotate by theta
    let branchR = num * random(0.5, 1);
    line(0, 0, 0, -branchR); // Draw the branch
    translate(0, -branchR); // Move to the end of the branch
    branch(num); // Ok, now call myself to draw two new branches!!
    pop(); // Whenever we get back here, we "pop" in order to restore the previous matrix state

    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-theta * random(0, 1));
    let branchL = num * random(0.5, 1)
    line(0, 0, 0, -branchL);
    translate(0, -branchL);
    branch(num);
    pop();
  }
}

// class Line {
//   constructor(x1, y1, x2, y2) {
//     this.x1 = 0;
//     this.y1 = 0;
//     this.x2 = 0;
//     this.y2 = random(height * 0.3, height * 0.6);
//     this.display = function() {
//       line(this.x1, this.y1, this.x2, this.y2);
//     };
// this.branch = function(h) {
//   translate(0, this.y2);
// let end_x = random(0, 400);
// let end_y = random(0, 400);
// console.log(end_x);
// let branch1 = line(this.x2, this.y2, end_x, end_y);
// console.log(branch1);
// let branch2 = line(this.x2, this.y2, random(0,400), random(0, 400));
// }
// }
// }
