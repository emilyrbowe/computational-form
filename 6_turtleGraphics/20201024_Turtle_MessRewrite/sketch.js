// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.14/p5.js
// require /turtles/turtle/turtle.js

// code from Justin Bakse's 'mess.js' reimplemented as a Turtle: https://compform.net/js_lab/js_lab.html?/mess.js

var myTurtle;
let p5_canvas;
let resize_timeout;

// config
let color_steps = 1000;
let cell_size = 10;
let color_s = 1;
let color_b = 1;

// globals
let grid_width = 0;
let grid_height = 0;
let grid = [];
let history = [];
let cell_info = {
  x: 0,
  y: 0,
  c: 0
};

function setup() {
  noFill();
  stroke(255);
  background(0);
  // noLoop()
  p5_canvas = createCanvas(800, 800);

  colorMode(HSB, color_steps);
  noStroke();
  mess_resize();

  myTurtle = new Turtle();
}

function mess_resize() {
  grid_width = floor(windowWidth / cell_size) + 1;
  grid_height = floor(windowHeight / cell_size) + 1;
  cell_info.x = grid_width - 5;
  cell_info.y = grid_height - 5;
  for (var i = 0; i < grid_width; i++) {
    grid[i] = [];
  }

}

function draw() {
  // for (var i = 0; i < 100; i++) {
  myTurtle.penUp();
  step();
  // }
}

function step() {

  // try to find open direction
  // direction is biased right
  let directions = shuffle([1, 2, 3, 4, 2]);
  let x = 0;
  let y = 0;
  let found_open_cell = false;
  for (var i = 0; i < directions.length; i++) {
    let dir = directions[i];
    x = cell_info.x;
    y = cell_info.y;

    if (dir == 1) {
      y--;
    } else if (dir == 2) {
      x++;
    } else if (dir == 3) {
      y++;
    } else if (dir == 4) {
      x--;
    }

    x = constrain(x, 0, grid_width - 1);
    y = constrain(y, 0, grid_height - 1);
    // console.log(x,y,grid[x][y]);
    if (!grid[x][y]) {
      found_open_cell = true;
      break;
    }
  }

  // if we found a cell, move forth, otherwise move back
  if (found_open_cell) {
    // move into cell
    cell_info.c = ++cell_info.c % color_steps;
    cell_info.x = x;
    cell_info.y = y;
    grid[cell_info.x][cell_info.y] = true;
    history.push({
      x: cell_info.x,
      y: cell_info.y,
      c: cell_info.c
    });

    // draw it
    // console.log("Draw");
    fill(100, 100, 100);
    // rect(mouseX, mouseY, 0, 0);

    // fill(cell_info.c, color_steps * color_s, color_steps * color_b);
    // rect(cell_info.x * cell_size, cell_info.y * cell_size, cell_size, cell_size);
    stroke(cell_info.c, color_steps * color_s, color_steps * color_b);
    myTurtle.moveTo(cell_info.x * 3, cell_info.y * 3);
    myTurtle.penDown();
    myTurtle.moveForward(cell_size * noise(cell_info.x, cell_info.y) * 10);
    myTurtle.turnRight(90);
    myTurtle.moveForward(cell_size * noise(cell_info.x, cell_info.y) * 10);
    myTurtle.turnRight(90);
    myTurtle.moveForward(cell_size * noise(cell_info.x, cell_info.y) * 10);
    myTurtle.turnRight(90);
    myTurtle.moveForward(cell_size * noise(cell_info.x, cell_info.y) * 10);
    myTurtle.turnRight(90);
    myTurtle.penUp();

  } else {
    // hit a dead end, back up
    if (history.length) {
      cell_info = history.pop();
    } else {
      console.log("all done");
      noLoop();
    }
  }
}
