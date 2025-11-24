let colorBtn, sizeSlider, shapeSelect;
let shapeColor;
let rotateSlider;

function setup() {
  createCanvas(640, 400);
  noStroke();
  textFont("Helvetica, Arial, sans-serif");

  // starting color
  shapeColor = color(random(255), random(255), random(255));

  // Button: change color
  colorBtn = createButton("Change Color");
  colorBtn.position(16, 16);
  colorBtn.mousePressed(randomShapeColor);

  function randomShapeColor() {
    shapeColor = color(random(255), random(255), random(255));
    shapeColorMid = color(random(255), random(255), random(255), 127);
  }

  // Slider: controls size
  createP("Size").position(0, 50).style("margin", "4px 0 0 16px");
  sizeSlider = createSlider(20, 220, 100, 1);
  sizeSlider.position(15, 70);

  // Dropdown: choose shape
  createP("Shape").position(0, 150).style("margin", "8px 0 0 16px");
  shapeSelect = createSelect();
  shapeSelect.position(16, 180);
  shapeSelect.option("ellipse");
  shapeSelect.option("rect");
  shapeSelect.option("triangle");

  createP("Rotate").position(0, 100).style("margin", "4px 0 0 16px");
  rotateSlider = createSlider(20, 220, 100, 1); // min, max, start
  rotateSlider.position(15, 110); // x and y
  rotateSlider.size(130, 50); // width and height
}

function draw() {
  background(240);

  push();
  translate(width * 0.65, height * 0.5);
  rotate(rotateSlider.value());

  let s = sizeSlider.value();

  // draw chosen shape
  let choice = shapeSelect.value();
  if (choice === "ellipse") {
    fill(shapeColor);
    ellipse(0, 0, s, s);
    fill(000, 100);
    ellipse(0, 0, s - 30, s - 30);
    fill(000, 100);
    ellipse(0, 0, s - 60, s - 60);
  } else if (choice === "rect") {
    rectMode(CENTER);
    fill(shapeColor);
    rect(0, 0, s, s);
    fill(000, 100);
    rect(0, 0, s - 30, s - 30);
    fill(000, 100);
    rect(0, 0, s - 60, s - 60);
  } else if (choice === "triangle") {
    fill(shapeColor);
    triangle(-s * 0.6, s * 0.5, 0, -s * 0.6, s * 0.6, s * 0.5);
    fill(000, 100);
    triangle(
      -s * 0.6 + 25,
      s * 0.5 - 15,
      0,
      -s * 0.6 + 30,
      s * 0.6 - 25,
      s * 0.5 - 15
    );
    fill(000, 100);
    triangle(
      -s * 0.6 + 50,
      s * 0.5 - 30,
      0,
      -s * 0.6 + 60,
      s * 0.6 - 50,
      s * 0.5 - 30
    );
  }
  pop();
}
