// DM2008 — Activity 2b
// (Pattern Making, 40 min)

// DM2008 — Activity 2b
// (Pattern Making, 40 min)

let colorA;
let colorB;

function setup() {
  createCanvas(450, 450);
  rectMode(CENTER);
  noStroke();

  // starting colors: black and grey
  colorA = color(0);
  colorB = color("#545454");
}

function draw() {
  background(255);

  for (let i = 0; i < width; i += 50) {
    let s;
    let currentFill;

    // alternate color and size
    if (i % 100 == 0) {
      currentFill = colorA;
      s = 25;
    } else {
      currentFill = colorB;
      s = 20;
    }

    fill(currentFill);
    stroke(000);

    // draw 9 rows
    for (let j = 1; j < 10; j++) {
      rect(i + 25, (height / 10) * j, s);
    }
  }
}

// key interactions to change both colors
function keyPressed() {
  if (key === "0") {
    colorA = color("#000"); 
    colorB = color("#545454");
  } else if (key === "1") {
    colorA = color("#FF218C");
    colorB = color("#F9D9DE"); 
  } else if (key === "2") {
    colorA = color("#FFD800"); 
    colorB = color("#F6ED8D"); 
  } else if (key === "3") {
    colorA = color("#21B1FF");
    colorB = color("#A7E1E3"); 
  }


    // TODO: change ellipse to rect, triangle, or something else
    // TODO: try varying size instead of color

  // TODO: add one interaction (mouse or key) to change the rule
  // Example: if (mouseIsPressed) { fill(255, 0, 0); }
}