function setup() {
    createCanvas(800, 600);
    noStroke();
    frameRate(5);
}

function draw() {
    side = (2 * height) / sqrt(3) * .75;
    drawTriangles(side / 2, side, 6);
}

function drawTriangles(top_x, side, level) {
    // blendMode(SOFT_LIGHT);
    fill(random(100, 255), random(100, 255), random(100, 255), random(100, 255));
    triangle(0, (side * sqrt(3)) / 2, 2 * top_x, (side * sqrt(3)) / 2, top_x, 0);
    
    translate()
    fill(random(100, 255), random(100, 255), random(100, 255), random(100, 255));
    triangle(0, 0, side / 2, side * sqrt(3) / 2, side, 0);
}