// DM2008
// Activity 1b (Georg Nees)

let x;
let y;
let w;
let colorArray;
let wordArray;

function setup() {
  createCanvas(800, 800)
  background(0);
  colorArray = [color('#D8E5F7'), color('#D8EEDF'), color('#F2D9EF'), color('#FDF1C9'), color('#FEDCDB')];
  textAlign(CENTER,CENTER);
  wordArray = ["work","school","chores","socials"];
}

function draw() {
  
  x = random(width);
  y = random(height);
  w = random(10, 80);
  
  // background(240,40);
  
  stroke(0);
  strokeWeight(random(0.5, 2));
  fill(random(colorArray));
  rect(x, y, w, w);
  strokeWeight(0);
  fill(0);
  textSize(w*0.3);
  textFont("Amatic SC");
  text(random(wordArray), x + w/2, y + w/2);
}

function mousePressed() {
     drawSticky(mouseX, mouseY, w);
}

function drawSticky(cx, cy, w) {
  stroke(0);
  strokeWeight(random(0.5, 2));
  fill(random(colorArray));
  rect(cx, cy, w, w);
  strokeWeight(0);
  fill(0);
  textSize(w*0.2);
  text("break", cx + w/2, cy + w/2);
}

function keyPressed() {
    saveCanvas("activity1b-image", "jpg");
}