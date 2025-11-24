// DM2008 – LED Challenge
// One LED blinks (digitalWrite), one LED fades (analogWrite)

int fadeLED = 9;      // PWM pin for fade control (~) FADE
int blinkLED = 13;    // Digital pin for on/off blink ON OFF
int brightness = 0;   // Current brightness level (0–255)
int fadeAmount = 10;   // How much to change brightness each frame
int constLED = 10; 
void setup() {
  // Set pins as outputs
  pinMode(fadeLED, OUTPUT);
  pinMode(blinkLED, OUTPUT);
}

void loop() {
  // Blink LED (digitalWrite)
  digitalWrite(blinkLED, HIGH);  // Turn on
  delay(100);                    // Wait 100ms
  digitalWrite(blinkLED, LOW);   // Turn off
  delay(100);                    // Wait 100ms

  // Fade LED (analogWrite)
  analogWrite(fadeLED, brightness);  // Set brightness (0–255)
  brightness += fadeAmount;          // Increase or decrease brightness
  digitalWrite(constLED,HIGH);
  // Reverse direction at brightness limits
  if (brightness <= 0 || brightness >= 255) {
    fadeAmount = -fadeAmount;
  }

  delay(10); // Small pause for smooth fading
}
