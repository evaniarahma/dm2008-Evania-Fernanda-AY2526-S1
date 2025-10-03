// DM2008 — Mini Project
// FLAPPY BIRD (Starter Scaffold)

// Notes for students:
// 1) Add flap control in handleInput() (space / ↑ to jump)
// 2) Detect collisions between the bird and pipes → game over
// 3) Add scoring when you pass a pipe
// 4) (Stretch) Add start/pause/game-over states

/* ----------------- Globals ----------------- */
// assets
let bird;
let pipes = [];

// state
let gameOver = false;
let gameStart = false;

// interface
let button = { x: 240 - 90, y: 340, w: 180, h: 48 };
let score = 0;
let highScore = 0;

let spawnCounter = 0; // simple timer
const SPAWN_RATE = 90; // ~ every 90 frames at 60fps ≈ 1.5s
const PIPE_SPEED = 2.5;
const PIPE_GAP = 210; // gap height (try 100–160), i got skill issue so its gonna be 210
const PIPE_W = 60;
const UVULA_W = 0.6; // width relative to pipe width
const UVULA_H = 0.25; // height relative to PIPE_GAP

/* ----------------- Preload ----------------- */

function Preload() {
  sound = loadSound("assets/cartoon-jump.mp3")
}

/* ----------------- Setup & Draw ----------------- */
function setup() {
  createCanvas(480, 640);
  noStroke();
  bird = new Bird(120, height / 2);
  // Start with one pipe so there’s something to see
  pipes.push(new Pipe(width + 40));
}

/* delete the above one after you're done

function setup() {
  createCanvas(480, 640);
  noStroke();
  resetGame(); // this line replaces those two lines
}
*/

function draw() {
  background(18, 22, 28);

  // --- Start screen (before game begins) ---
  if (!gameStart) {
    bird.pos.y = height / 2 + sin(frameCount * 0.08) * 8;
    bird.show();

    // title
    fill("#FFDE21");
    textAlign(CENTER, CENTER);
    textFont("Rubik Gemstones");
    textSize(45);
    text("INFECTIOUS", width / 2, height / 2 - 110);

    fill(255);
    textAlign(CENTER, CENTER);
    textFont("Rubik");
    textSize(20);
    text("How deep can you get the virus in?", width / 2, height / 2 - 75);

    // button
    const hover =
      mouseX >= button.x &&
      mouseX <= button.x + button.w &&
      mouseY >= button.y &&
      mouseY <= button.y + button.h;
    fill(hover ? 255 : "#74C365");
    rect(button.x, button.y, button.w, button.h, 30);

    fill(000);
    textSize(18);
    text("Click to Start", width / 2, button.y + button.h / 2 + 1);

    // instructions
    fill(200);
    textSize(14);
    text("Press SPACE to jump", width / 2, height / 2 + 90);

    // score interface
    drawScore();

    return;
  }

  // 1) read input (students: add flap control here)
  handleInput();

  // 2) update world
  bird.update();

  // spawn new pipes on a simple timer
  spawnCounter++;
  if (spawnCounter >= SPAWN_RATE) {
    pipes.push(new Pipe(width + 40));
    spawnCounter = 0;
  }

  // update + draw pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();
    if (pipes[i].checkPass(bird)) {
      score++;
    }

    // TODO (students): collision check with bird
    // If collision → stop the game or reset (add a game state if you want)
    if (pipes[i].hits(bird)) {
      gameOver = true;

      fill("#FFFFFF");
      textAlign(CENTER, CENTER);
      textFont("Rubik Gemstones");
      textSize(45);
      text("GAME OVER", width / 2, height / 2);
      fill("#FFFFFF");
      textFont("Rubik");
      textSize(16);
      text("Press ENTER to restart", width / 2, height / 2 + 40);
      noLoop();
    }
  }

  // 3) draw bird last so it’s on top
  bird.show();

  drawScore();
}

function drawScore() {
  fill(255);
  textAlign(LEFT);
  textSize(15);
  text("High Score: " + highScore, 10, 20);
  text("Score: " + score, 10, 40);
}

/* ----------------- Input ----------------- */
function handleInput() {
  // TODO (students): make the bird flap on key press
  // Hints:
  // - In keyPressed(): call bird.flap();
  // - Or here: if (keyIsDown(32)) bird.flap(); // 32 = space
}

function mousePressed() {
  // before the game starts → click the button
  if (!gameStart) {
    if (
      mouseX >= button.x &&
      mouseX <= button.x + button.w &&
      mouseY >= button.y &&
      mouseY <= button.y + button.h
    ) {
      gameStart = true;
    }
    return;
  }
}

function resetGame() {
  if (score > highScore) {
    highScore = score; 
  }

  score = 0;
  gameOver = false;
  bird = new Bird(120, height / 2);
  pipes = [];
  pipes.push(new Pipe(width + 40));
  spawnCounter = 0;
  loop();
}

function keyPressed() {
  // Start game from keyboard too (optional)
  if (
    !gameStart &&
    (key === " " || keyCode === UP_ARROW || keyCode === ENTER)
  ) {
    gameStart = true;
    return;
  }

  // Flap during play
  if (gameStart && !gameOver && (key === " " || keyCode === UP_ARROW)) {
    bird.flap();
    sound.play();
  }

  // Restart after game over
  if (gameOver && keyCode === ENTER) {
    resetGame();
    gameStart = true; // jump straight back into play
  }
}

// Simple teardrop/uvula
function drawUvula(cx, cy, w, h, dir = "down") {
  push();
  noStroke();

  // bulb
  fill("#FF0735");
  ellipse(cx, cy + (dir === "down" ? h * 0.18 : -h * 0.18), w * 2, h * 1.2);

  // stem
  const stemH = h * 0.2;
  const stemW = w * 2;
  rectMode(CENTER);
  if (dir === "down") rect(cx, cy - stemH * 0.1, stemW, stemH, stemW * 0.5);
  else rect(cx, cy + stemH * 0.1, stemW, stemH, stemW * 0.5);
  pop();

  // shadow
  fill("#D2122E");
  ellipse(cx, cy + (dir === "down" ? h * 0.09 : -h * 0.09), w * 1.5, h * 0.4);

  // highlight
  fill(255);
  ellipse(cx, cy + (dir === "down" ? h * 0.6 : -h * 0.6), w * 0.9, h * 0.15);
}

/* ----------------- Classes ----------------- */
class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16; // for collision + draw
    this.gravity = 0.45; // constant downward force
    this.flapStrength = -6.0; // negative = upward

    this.isActive = true; // flappy is alive
  }

  applyForce(fy) {
    this.acc.y += fy;
  }

  flap() {
    // instant upward kick
    this.vel.y = this.flapStrength;
  }

  update() {
    if (!this.isActive) return;

    // gravity
    this.applyForce(this.gravity);

    // integrate
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // keep inside canvas vertically (simple constraints)
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y = 0;
    }
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y = 0;
      this.isActive = false;
      // TODO (students): treat touching the ground as game over
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);

    // body
    fill("#74C365");
    circle(0, 0, this.r * 2);

    // spikes around
    const spikeCount = 12;
    const spikeLen = this.r * 0.4;
    const capSize = this.r * 0.4;

    for (let i = 0; i < spikeCount; i++) {
      const angle = (TWO_PI / spikeCount) * i;
      const x1 = cos(angle) * this.r * 0.9;
      const y1 = sin(angle) * this.r * 0.9;
      const x2 = cos(angle) * (this.r + spikeLen);
      const y2 = sin(angle) * (this.r + spikeLen);

      stroke("#A8E4A0");
      strokeWeight(this.r * 0.25);
      line(x1, y1, x2, y2);

      noStroke();
      fill("#FFDE21");
      circle(x2, y2, capSize); // little bu lb at end
    }

    // eye
    fill(255);
    circle(this.r * 0.3, -this.r * 0.3, this.r * 0.7);
    fill(0);
    circle(this.r * 0.3, -this.r * 0.3, this.r * 0.35);

    pop();
  }
}

class Pipe {
  constructor(x) {
    this.x = x;
    this.w = PIPE_W;
    this.speed = PIPE_SPEED;

    // randomize gap position
    const margin = 40;
    const gapY = random(margin, height - margin - PIPE_GAP);

    this.top = gapY; // bottom of top pipe
    this.bottom = gapY + PIPE_GAP; // top of bottom pipe

    this.passed = false; // for scoring once per pipe
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill("#FF0735");
    // pipes
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, height - this.bottom);

    // --- uvula add-ons ---
    const cx = this.x + this.w / 2;
    const uW = this.w * UVULA_W;
    const uH = PIPE_GAP * UVULA_H;

    // hang from top pipe, point up from bottom pipe
    drawUvula(cx, this.top, uW, uH, "down");
    drawUvula(cx, this.bottom, uW, uH, "up");
  }

  offscreen() {
    // look at MDN to understand what 'return' does
    // we will learn more about this in Week 6
    // return a value to you
    return this.x + this.w < 0;
  }

  // TODO (students): circle-rect collision (simple)
  // 1) Check if bird within pipe's x range.
  // 2) If yes, check if bird.y is outside the gap (above top OR below bottom).
  //    Then it’s a hit.

  hits(bird) {
    const withinX =
      bird.pos.x + bird.r > this.x && bird.pos.x - bird.r < this.x + this.w;

    const aboveGap = bird.pos.y - bird.r < this.top;
    const belowGap = bird.pos.y + bird.r > this.bottom;
    if (withinX && (aboveGap || belowGap)) return true;

    // In hits() after withinX && !aboveGap && !belowGap
    const cx = this.x + this.w / 2;
    const uW = this.w * UVULA_W;
    const uH = PIPE_GAP * UVULA_H;

    // radius = half width of drawn ellipse
    const rBulb = uW * 2 * 0.5 * 0.9;

    // centers: match drawUvula’s offset
    const topCX = cx,
      topCY = this.top + uH * 0.18;
    const botCX = cx,
      botCY = this.bottom - uH * 0.18;

    const dTop = dist(bird.pos.x, bird.pos.y, topCX, topCY);
    const dBot = dist(bird.pos.x, bird.pos.y, botCX, botCY);

    if (dTop < bird.r + rBulb || dBot < bird.r + rBulb) return true;
  }

  checkPass(bird) {
    if (!this.passed && this.x + this.w < bird.pos.x) {
      this.passed = true; // mark as counted
      return true; // tell the game a pass happened
    }
    return false;
  }
}
