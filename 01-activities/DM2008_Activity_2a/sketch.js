// DDM2008 — Activity 2a
// (Mode Switch, 20 min)

let x = 0; // ellipse x-position
let w = 50;
let h = 75;
let bgColor;
let colorArray;

function setup() {
  createCanvas(400, 400);
  bgColor = color(220);
  colorArray = [color("#CC338B"), color("#43B3AE"), color("#E4D00A")];
}

function draw() {
  background(bgColor);

  x += 5;

 if (x > width + w / 2) {
    x = 0;
  }

  // Change circle into rectangle
  rect(x, width / 2, h, w);
  // Change color depending on position
  if (x > width / 5) {
    fill("#CC338B");
    if (x > width / 2) fill("#43B3AE");
  } else {
    fill("#E4D00A");
  }
  // Change height based on position
  if (x > width / 5) {
    w = 70;
    if (x > width / 2) w = 100;
  } else {
    w = 50;
  }
}

// change bg when clicked based on these 3 colors
function mousePressed() {
  bgColor = random(colorArray);
}
