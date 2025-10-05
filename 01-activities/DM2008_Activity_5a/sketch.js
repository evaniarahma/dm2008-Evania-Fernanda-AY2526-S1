// DM2008 – Activity 5a
// Colliding Circles (30 min)

let balls = [];

function setup() {
  createCanvas(400, 400);

  // Step 1: create two Ball objects
  balls.push(new Ball(100, 100));
  balls.push(new Ball(300, 300));
}

function draw() {
  background(230);

  // Step 2: update and display each ball
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.move();
    b.show();

    // Step 3: check collisions
    // Use dist() between ball centers
    // Trigger feedback (color, bounce, etc.)

    let b1 = balls[0];
    let b2 = balls[1];

    let d = dist(b1.pos.x, b1.pos.y, b2.pos.x, b2.pos.y);

    
    if (d < b1.r + b2.r) {
      
      let temp = b1.vel.copy();
      b1.vel = b2.vel.copy();
      b2.vel = temp;
      
      b1.color = color(random(255), random(255), random(255));
      b2.color = color(random(255), random(255), random(255));

      let overlap = b1.r + b2.r - d;
      let direction = p5.Vector.sub(b2.pos, b1.pos).normalize();
      b1.pos.sub(direction.mult(overlap / 2));
      b2.pos.add(direction.mult(overlap / 2)); 
    }
  }
}

class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 80;
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.color = color(100, 180, 220);
  }

  move() {
    this.pos.add(this.vel);

    if (this.pos.x < this.r || this.pos.x > width - this.r) {
      this.vel.x *= -1;
    }
    if (this.pos.y < this.r || this.pos.y > height - this.r) {
      this.vel.y *= -1;
    }
    // TODO: wrap around OR bounce off edges
  }
  
  show() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  // Step 4: Add a method to checkCollision(others)
  // Use dist() and respond visually
}
