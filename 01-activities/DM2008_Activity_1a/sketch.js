// DDM2008
// Activity 1a

// Run the sketch, then click on the preview to enable keyboard
// Use the 'Option' ('Alt' on Windows) key to view or hide the grid
// Use the 'Shift' key to change overlays between black & white
// Write the code for your creature in the space provided

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(240);

  // YOUR CODE HERE
  
  // BODY
  stroke(000);
  fill(000);
  rect(200, 350, 50, 50);
  rect(300, 350, 50, 50);
  rect(150, 300, 200, 50);
  
  // EAR
  triangle(200, 300, 250, 300, 200, 250);
  triangle(250, 300, 300, 300, 250, 250);
  
  // TAIL
  rect(350, 250, 50, 50);
  
  // EYES
  fill(255);
  ellipse(195, 315, 10, 10);
  
  // MOUTH
  stroke(255);
  strokeWeight(2);
  line(150+(8*0), 340, 150+(8*1), 330);
  line(150+(8*1), 330, 150+(8*2), 340);
  line(150+(8*2), 340, 150+(8*3), 330);
  line(150+(8*3), 330, 150+(8*4), 340);
  line(150+(8*4), 340, 150+(8*5), 330);
  // YOUR CODE HERE

  helperGrid(); // do not edit or remove this line
}
