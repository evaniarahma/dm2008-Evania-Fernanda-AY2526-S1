// DM2008 — Activity 3b
// (One Function Wonder, 15 min)

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(000);

  drawSparkle(200, 200, 20);
  drawSparkle(175, 225, 10);
  drawSparkle(225, 175, 10);
  drawSparkle(mouseX, mouseY, 15); // even follow your mouse!

  for (let x = 0; x <= 400; x += 50) {
  drawSparkle(x, 0, 12);
  rotate(frameCount / -50.0);
  }
  
  // TODO 1:
  // Define a function that draws something (a shape or group of shapes).
  // It should take at least one parameter (e.g., position, size, or color).

  // TODO 2:
  // Call your function multiple times with different parameter values.
  // myShape(100, 200, 50);
  // myShape(300, 200, 80);

  // TODO 3:
  // (Challenge) Call your function inside a for loop
  // to create a repeating pattern or variation.
}

function drawSparkle(x, y, s) {
  fill("#FCF4A3");
  noStroke();
  triangle(x - s * 0.3, y, x, y - s, x + s * 0.3, y);
  triangle(x - s * 0.3, y, x, y + s, x + s * 0.3, y);
  triangle(x - s, y, x, y - s * 0.3, x, y + s * 0.3);
  triangle(x + s, y, x, y - s * 0.3, x, y + s * 0.3);
}

// Example starter function:
// function myShape(x, y, s) {
//   ellipse(x, y, s, s);
// }
