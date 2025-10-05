// DM2008 — Activity 3a
// (Array Sampler, 25 min)

// 1. Create an array of colors (or other values)
//    You can make more than one array if you'd like
let palette = [
  "#800808",
  "#C30010",
  "#de0a26",
  "#f01e2c",
  "#f94449",
  "#ff2c2c",
];

let diction = ["POP", "SIX", "SQUISH", "CICERO", "UH UH", "LIPSCHITZ"];

let imgUrls = [
  "https://i.imghippo.com/files/MePK1271EEA.png",
  "https://i.imghippo.com/files/haGB6513dzc.png",
  "https://i.imghippo.com/files/hBe6559ivk.png",
  "https://i.imghippo.com/files/SGfi3597zxE.png",
  "https://i.imghippo.com/files/GO3079XBM.png",
  "https://i.imghippo.com/files/GeWD7618D.png",
];

// 2. A variable to track the current index
let images = [];
let currentIndex = 0;
let bars = [];

function preload() {
  for (let url of imgUrls) {
    images.push(loadImage(url));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  imageMode(CENTER);

  for (let i = 0; i < palette.length; i++) {
    bars[i] = [0, 1, 2, 3, 4];
  }
}

function draw() {
  background(0);

  let n = palette.length;
  let spacing = width / n; 
  let y = height / 2; 
  let diameter = min(width / (n + 1), height * 0.6);
  let imgSize = diameter * 0.9;

  for (let i = 0; i < n; i++) {
    let x = (i + 0.5) * spacing;

    // circle
    fill(palette[i]);
    ellipse(x, y, diameter);

    // ladies prisoners
    let img = images[i];
    if (img) image(img, x, y, diameter * 1.7, diameter * 1.7);

    // bars
    stroke(0);
    strokeWeight(5);
    let barSpacing = diameter / 6;
    for (let idx of bars[i]) {
      let bx = x - diameter / 2 + (idx + 1) * barSpacing;
      line(bx, y - diameter / 2, bx, y + diameter / 2);
    }

    //text
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(diameter * 0.2);
    textFont("Playfair Display");
    text(diction[i], x, y);
  }
}

// Splice - Free the Prisoners

function mousePressed() {
  let n = palette.length;
  let spacing = width / n;
  let y = height / 2;
  let diameter = min(width / (n + 1), height * 0.6);

  for (let i = 0; i < n; i++) {
    let x = (i + 0.5) * spacing;
    if (dist(mouseX, mouseY, x, y) <= diameter / 2) {
      if (bars[i].length > 0) {
        bars[i] = [];
      }

      break;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
