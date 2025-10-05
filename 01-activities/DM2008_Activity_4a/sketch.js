// DM2008 – Activity 4a
// Bake a Cookie (30 min)

let cookie;

function setup() {
  createCanvas(400, 400);
  noStroke();
  cookie = new Cookie("chocolate", 80, width / 2, height / 2);

  // Step 3: make one cookie object
  // cookie = new Cookie("chocolate", 80, width/2, height/2);
}

function draw() {
  background(230);

  // Step 4: call the cookie’s show() method
  cookie.show();
  
}

// Step 1: define the Cookie class
class Cookie {
  constructor(flavor, sz, x, y) {
    // set up required properties
    this.flavor = flavor;
    this.sz = sz;
    this.x = x;
    this.y = y;
  }

  // Step 2: display the cookie
  show() {
    if (this.flavor == "chocolate") {
      fill(196, 146, 96);
    } else {
      fill(220, 180, 120);
    }
    ellipse(this.x, this.y, this.sz);
  } 
  
  // Steps 5 & 6: Implement additional methods here

// Step 5: add movement (keyboard arrows)
// function keyPressed() {}
 
  move(dir) {
    if (dir === "up") this.y -= 10;
    if (dir === "down") this.y += 10;
    if (dir === "left") this.x -= 10;
    if (dir === "right") this.x += 10;
  }
  
}

function keyPressed() {
  if (keyCode === UP_ARROW) cookie.move("up");
  else if (keyCode === DOWN_ARROW) cookie.move("down");
  else if (keyCode === LEFT_ARROW) cookie.move("left");
  else if (keyCode === RIGHT_ARROW) cookie.move("right");
}

// Step 6: add flavor randomizer (mouse click)
function mousePressed() {
  let flavors = ["chocolate", "vanilla"];
  let randomIndex = int(random(flavors.length));
  cookie.flavor = flavors[randomIndex];
}
