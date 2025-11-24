let port; // Serial Communication port
let connectBtn;

let sensorVal;
let circleSize = 50;
let targetSize = 50; // used for Option 2
let updateCol;
let roundValue;
let ballsArray=[];
function setup() {
  noStroke();
  colorMode(HSB,360,100,100,100);
  createCanvas(windowWidth, windowHeight);
  port = createSerial(); // creates the Serial Port

  // Connection helpers
  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);
  
}
class Balls{
  constructor(x,y,r){
    this.x= x;
    this.y = y;
    this.r=r;
  }
    drawBall(){
      ellipse(this.x,this.y,this.r);
    }
    updateBall(){
      // this.r-=10;
    }
  }

function draw() {
  background(100);
  fill(updateCol,100,100);
  ellipse(width / 2,height/2 + updateCol, circleSize);
  ballsArray.push( new Balls(width/2,height/2,updateCol))
  for(let i = ballsArray.length - 1; i >= 0; i--){
        ballsArray[i].drawBall();
        ballsArray[i].updateBall();
  }

  for (let i=0;i<updateCol;i++){
    ballsArray.push(new Balls(random(width),random(height),updateCol))
  }

  if(ballsArray.length>100){
    ballsArray.splice(0,100);
  }
  console.log(ballsArray.length);
  // Receive data from Arduino
  if (port.opened()) {
    sensorVal = port.readUntil("\n");
    // Only log data that has information, not empty signals
    if (sensorVal[0]) {
      // Once you verify data is coming in,
      // disable logging to improve performance
      console.log(sensorVal);

      // OPTION 1:
      // Update circle's size with sensor's data directly
      // Reduce delay() value in Ardiuno to get smoother changes

      // use float() to convert from data from string to number
      // circleSize = float(sensorVal);

      // OPTION 2:
      // Update circle's size using lerp() to smoothly change values
      // This method even works with longer delay() values in Arduino

      targetSize = float(sensorVal);
      updateCol = float(sensorVal);
      
     
      // last value in lerp() controls speed of change
      circleSize = lerp(circleSize, targetSize, 0.1);
      
    }
  }
}

// DO NOT REMOVE THIS FUNCTION
function connectBtnClick(e) {
  // If port is not already open, open on click,
  // otherwise close the port
  if (!port.opened()) {
    port.open(9600); // opens port with Baud Rate of 9600
    e.target.innerHTML = "Disconnect Arduino";
    e.target.classList.add("connected");
  } else {
    port.close();
    e.target.innerHTML = "Connect to Arduino";
    e.target.classList.remove("connected");
  }
}
